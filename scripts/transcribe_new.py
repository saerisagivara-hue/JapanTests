import whisper
import json
import sys
import os
import io

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8')

model = whisper.load_model("base")

narezki = r"C:\Users\saeri\OneDrive\Desktop\narezki"
files = [
    ("n5-video-1", os.path.join(narezki, "1.mp4")),
    ("n5-video-2", os.path.join(narezki, "2.mp4")),
    ("n5-video-3", os.path.join(narezki, "3.mp4")),
]

out_dir = os.path.join(os.path.dirname(__file__), "..", "transcripts")
os.makedirs(out_dir, exist_ok=True)

for name, path in files:
    print(f"\n=== Transcribing: {name} ===")
    if not os.path.exists(path):
        print(f"  FILE NOT FOUND: {path}")
        continue

    result = model.transcribe(path, language="ja", verbose=False)

    segments = []
    for seg in result["segments"]:
        segments.append({
            "start": round(seg["start"], 1),
            "end": round(seg["end"], 1),
            "text": seg["text"].strip(),
        })

    out_path = os.path.join(out_dir, f"{name}.json")
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump({"text": result["text"], "segments": segments}, f, ensure_ascii=False, indent=2)

    print(f"  Segments: {len(segments)}")
    print(f"  Saved to: {out_path}")

print("\n=== Done! ===")
