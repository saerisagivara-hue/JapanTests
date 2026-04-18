import whisper
import json
import sys
import os
import io
import shutil

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")
sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding="utf-8")

def _ensure_real_ffmpeg_on_path() -> None:
    """
    Whisper uses `ffmpeg` for decoding. On some Windows setups a small stub `ffmpeg.exe`
    can appear earlier in PATH. We try to prepend the WinGet FFmpeg bin directory if present.
    """
    ff = shutil.which("ffmpeg")
    if ff:
        try:
            if os.path.getsize(ff) > 5_000_000:
                return
        except OSError:
            pass

    localappdata = os.environ.get("LOCALAPPDATA")
    if not localappdata:
        return

    winget_bin = os.path.join(
        localappdata,
        "Microsoft",
        "WinGet",
        "Packages",
        "Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe",
        "ffmpeg-8.1-full_build",
        "bin",
    )
    if os.path.exists(os.path.join(winget_bin, "ffmpeg.exe")):
        os.environ["PATH"] = f"{winget_bin};{os.environ.get('PATH', '')}"


def main() -> int:
    _ensure_real_ffmpeg_on_path()
    model = whisper.load_model("base")

    root = os.path.join(os.path.dirname(__file__), "..")
    videos_dir = os.path.join(root, "public", "videos")
    out_dir = os.path.join(root, "transcripts")
    os.makedirs(out_dir, exist_ok=True)

    files = [
        ("narezki-01", os.path.join(videos_dir, "narezki-01.mp4")),
        ("narezki-02", os.path.join(videos_dir, "narezki-02.mp4")),
        ("narezki-03", os.path.join(videos_dir, "narezki-03.mp4")),
        ("narezki-04", os.path.join(videos_dir, "narezki-04.mp4")),
        ("narezki-05", os.path.join(videos_dir, "narezki-05.mp4")),
        ("narezki-06", os.path.join(videos_dir, "narezki-06.mp4")),
        ("narezki-07", os.path.join(videos_dir, "narezki-07.mp4")),
    ]

    for name, path in files:
        print(f"\n=== Transcribing: {name} ===")
        if not os.path.exists(path):
            print(f"  FILE NOT FOUND: {path}")
            continue

        result = model.transcribe(path, language="ja", verbose=False)

        segments = []
        for seg in result["segments"]:
            segments.append(
                {
                    "start": round(seg["start"], 1),
                    "end": round(seg["end"], 1),
                    "text": seg["text"].strip(),
                }
            )

        out_path = os.path.join(out_dir, f"{name}.json")
        with open(out_path, "w", encoding="utf-8") as f:
            json.dump(
                {"text": result["text"], "segments": segments},
                f,
                ensure_ascii=False,
                indent=2,
            )

        print(f"  Segments: {len(segments)}")
        print(f"  Saved to: {out_path}")

    print("\n=== Done! ===")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

