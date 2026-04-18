import type { SubtitleLine } from "./content";

const GROQ_WHISPER_URL = "https://api.groq.com/openai/v1/audio/transcriptions";

export function getGroqKeyFromStorage(): string | null {
  try {
    return localStorage.getItem("jt.groq-key") || null;
  } catch {
    return null;
  }
}

export function saveGroqKeyToStorage(key: string): void {
  try {
    localStorage.setItem("jt.groq-key", key);
  } catch { /* ignore */ }
}

async function extractAudioBlob(videoFile: File): Promise<Blob> {
  const arrayBuffer = await videoFile.arrayBuffer();
  const audioCtx = new OfflineAudioContext(1, 1, 16000);

  let audioBuffer: AudioBuffer;
  try {
    audioBuffer = await audioCtx.decodeAudioData(arrayBuffer.slice(0));
  } catch {
    return videoFile;
  }

  const sampleRate = 16000;
  const numChannels = 1;
  const duration = Math.min(audioBuffer.duration, 1500);
  const numFrames = Math.floor(duration * audioBuffer.sampleRate);

  const offlineCtx = new OfflineAudioContext(numChannels, Math.floor(duration * sampleRate), sampleRate);
  const source = offlineCtx.createBufferSource();
  source.buffer = audioBuffer;
  source.connect(offlineCtx.destination);
  source.start(0, 0, duration);

  const rendered = await offlineCtx.startRendering();
  const pcm = rendered.getChannelData(0);

  const wavBuffer = encodeWav(pcm, sampleRate);
  return new Blob([wavBuffer], { type: "audio/wav" });
}

function encodeWav(samples: Float32Array, sampleRate: number): ArrayBuffer {
  const buffer = new ArrayBuffer(44 + samples.length * 2);
  const view = new DataView(buffer);

  function writeStr(offset: number, s: string) {
    for (let i = 0; i < s.length; i++) view.setUint8(offset + i, s.charCodeAt(i));
  }

  writeStr(0, "RIFF");
  view.setUint32(4, 36 + samples.length * 2, true);
  writeStr(8, "WAVE");
  writeStr(12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  writeStr(36, "data");
  view.setUint32(40, samples.length * 2, true);

  let offset = 44;
  for (let i = 0; i < samples.length; i++, offset += 2) {
    const s = Math.max(-1, Math.min(1, samples[i]));
    view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
  }

  return buffer;
}

export async function transcribeVideoInBrowser(
  videoFile: File,
  groqKey: string,
  onProgress?: (msg: string) => void,
): Promise<{ subtitles: SubtitleLine[]; error?: string }> {
  try {
    onProgress?.("Извлечение аудио из видео...");

    let audioBlob: Blob;
    try {
      audioBlob = await extractAudioBlob(videoFile);
    } catch {
      audioBlob = videoFile;
    }

    const maxSize = 24 * 1024 * 1024;
    if (audioBlob.size > maxSize) {
      audioBlob = audioBlob.slice(0, maxSize, audioBlob.type);
    }

    onProgress?.("Отправка на Groq Whisper...");

    const formData = new FormData();
    formData.append("file", audioBlob, "audio.wav");
    formData.append("model", "whisper-large-v3");
    formData.append("language", "ja");
    formData.append("response_format", "verbose_json");
    formData.append("timestamp_granularities[]", "segment");

    const response = await fetch(GROQ_WHISPER_URL, {
      method: "POST",
      headers: { Authorization: `Bearer ${groqKey}` },
      body: formData,
    });

    if (!response.ok) {
      const text = await response.text();
      return { subtitles: [], error: `Groq API error ${response.status}: ${text.slice(0, 200)}` };
    }

    const data = await response.json();

    onProgress?.("Обработка результатов...");

    const segments: Array<{ start: number; end: number; text: string }> = data.segments ?? [];
    if (segments.length === 0 && data.text) {
      return {
        subtitles: [{ startSec: 0, endSec: 5, ja: data.text, furigana: "" }],
      };
    }

    const subtitles: SubtitleLine[] = segments.map((seg) => ({
      startSec: seg.start,
      endSec: seg.end,
      ja: seg.text.trim(),
      furigana: "",
    }));

    return { subtitles };
  } catch (err) {
    return { subtitles: [], error: String(err) };
  }
}
