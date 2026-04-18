interface ElectronVideoAPI {
  selectFile: (opts?: { type?: "video" | "srt" }) => Promise<string | null>;
  selectMultiple: () => Promise<string[]>;
  registerPath: (id: string, filePath: string) => Promise<boolean>;
}

interface ElectronSrtAPI {
  readFile: (filePath: string) => Promise<{ error: string | null; content: string }>;
}

interface ElectronWhisperAPI {
  getKey: () => Promise<string>;
  setKey: (key: string) => Promise<boolean>;
  transcribe: (audioBase64: string) => Promise<{ error: string | null; text: string }>;
}

interface ElectronUserLessonsAPI {
  getAll: () => Promise<unknown[]>;
  save: (lesson: unknown) => Promise<boolean>;
  delete: (lessonId: string) => Promise<boolean>;
}

interface ElectronWindowAPI {
  toggleFullscreen: () => Promise<boolean>;
  isFullscreen: () => Promise<boolean>;
}

interface ElectronVideoDirsAPI {
  get: () => Promise<string[]>;
  getResolved: () => Promise<string[]>;
  add: () => Promise<string | null>;
  remove: (dir: string) => Promise<boolean>;
  checkFiles: (filenames: string[]) => Promise<Record<string, boolean>>;
}

interface ElectronAutoTranscribeAPI {
  run: (videoFilePath: string, groqKey: string) => Promise<{
    error: string | null;
    subtitles: Array<{ startSec: number; endSec: number; ja: string; furigana: string }>;
  }>;
  resolveVideoPath: (filename: string) => Promise<string | null>;
  resolveUserVideoPath: (lessonId: string) => Promise<string | null>;
}

interface ElectronGroqKeyAPI {
  get: () => Promise<string>;
  set: (key: string) => Promise<boolean>;
}

interface ElectronAPI {
  isElectron: true;
  whisper: ElectronWhisperAPI;
  video: ElectronVideoAPI;
  videoDirs: ElectronVideoDirsAPI;
  srt: ElectronSrtAPI;
  autoTranscribe: ElectronAutoTranscribeAPI;
  groqKey: ElectronGroqKeyAPI;
  userLessons: ElectronUserLessonsAPI;
  window: ElectronWindowAPI;
}

interface Window {
  electronAPI?: ElectronAPI;
}
