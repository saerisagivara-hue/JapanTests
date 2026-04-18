import type { SubtitleLine } from "./content";

interface SrtEntry {
  index: number;
  startSec: number;
  endSec: number;
  text: string;
}

function timeToSeconds(time: string): number {
  const [h, m, rest] = time.split(":");
  const [s, ms] = rest.split(",");
  return parseInt(h) * 3600 + parseInt(m) * 60 + parseInt(s) + parseInt(ms) / 1000;
}

function parseSrtRaw(srt: string): SrtEntry[] {
  const normalized = srt.replace(/\r\n/g, "\n").replace(/\r/g, "\n").trim();
  const blocks = normalized.split(/\n\n+/);
  const entries: SrtEntry[] = [];

  for (const block of blocks) {
    const lines = block.split("\n");
    if (lines.length < 2) continue;

    const indexLine = lines[0].trim();
    const index = parseInt(indexLine);
    if (isNaN(index)) continue;

    const timeLine = lines.find((l) => l.includes("-->"));
    if (!timeLine) continue;

    const [startStr, endStr] = timeLine.split("-->").map((s) => s.trim());
    const startSec = timeToSeconds(startStr);
    const endSec = timeToSeconds(endStr);

    const timeIdx = lines.indexOf(timeLine);
    const text = lines
      .slice(timeIdx + 1)
      .join("\n")
      .trim();

    if (text) {
      entries.push({ index, startSec, endSec, text });
    }
  }

  return entries;
}

const SOUND_EFFECT_RE = /^（[^）]*）$/;
const MUSIC_RE = /^[♪～♩♫♬\s]+$/;
const SPEAKER_PREFIX_RE = /^（[^）]+）/;
const FURIGANA_RE = /([一-龥々〇]+)\(([ぁ-んァ-ヶー]+)\)/g;

function isSoundEffectOnly(text: string): boolean {
  const cleaned = text.replace(/\n/g, "");
  return SOUND_EFFECT_RE.test(cleaned) || MUSIC_RE.test(cleaned);
}

function extractFurigana(text: string): string {
  let furigana = text;
  furigana = furigana.replace(FURIGANA_RE, "$2");
  furigana = furigana.replace(SPEAKER_PREFIX_RE, "");
  furigana = furigana.replace(/\n/g, " ").trim();
  return furigana || text;
}

function cleanDialogueText(text: string): string {
  let cleaned = text.replace(SPEAKER_PREFIX_RE, "");
  cleaned = cleaned.replace(/\n/g, " ").trim();
  return cleaned;
}

export function parseSrtToSubtitles(srt: string): SubtitleLine[] {
  const raw = parseSrtRaw(srt);
  const subtitles: SubtitleLine[] = [];

  for (const entry of raw) {
    if (isSoundEffectOnly(entry.text)) continue;

    let text = entry.text;
    if (text.includes("\n")) {
      const lines = text.split("\n");
      const firstIsSfx = SOUND_EFFECT_RE.test(lines[0].trim());
      if (firstIsSfx && lines.length > 1) {
        text = lines.slice(1).join("\n");
      }
    }

    const ja = cleanDialogueText(text);
    if (!ja || MUSIC_RE.test(ja)) continue;

    const furigana = extractFurigana(text);

    subtitles.push({
      startSec: Math.round(entry.startSec * 100) / 100,
      endSec: Math.round(entry.endSec * 100) / 100,
      ja,
      furigana,
    });
  }

  return subtitles;
}

export function parseSrtRawEntries(srt: string): SrtEntry[] {
  return parseSrtRaw(srt);
}
