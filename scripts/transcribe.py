import whisper
import json
import sys
import os
import io

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8')

model = whisper.load_model("base")

files = [
    ("n5-clip-01", r"C:\Users\saeri\OneDrive\Desktop\narezki\ca8wcrqIX8nS3N904Dw3+4r6EUB5_GOs.mp4"),
    ("n5-clip-02", r"C:\Users\saeri\OneDrive\Desktop\narezki\cz2VLlajMlP9cAAKKyxE+ZcKxZfyEFBc.mp4"),
    ("n5-listening-sushi", r"C:\Users\saeri\OneDrive\Desktop\narezki\Japanese_Listening_Practice_With_A_Story_#5___Conveyor_Belt_Sushi.mp4"),
    ("n5-clip-03", r"C:\Users\saeri\OneDrive\Desktop\narezki\OtL0FHKCYt5u4KxYY6fA+8bLk5Nu8eRY.mp4"),
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
