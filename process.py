import cv2
import os
import json

folder = "First page "
files = sorted([f for f in os.listdir(folder) if f.endswith(".png")])

results_data = []

# Fallback: using Haar cascades as mediapipe is failing on this environment
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
eye_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_eye.xml')

for filename in files:
    filepath = os.path.join(folder, filename)
    image = cv2.imread(filepath)
    if image is None: continue
    
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, 1.3, 5)
    
    if len(faces) > 0:
        x, y, w, h = faces[0]
        
        results_data.append({
            "file": filename,
            "center": {"x": x + w/2, "y": y + h/2},
            "box": {"x": int(x), "y": int(y), "w": int(w), "h": int(h)}
        })
    else:
        # Fallback to center of image if face not found
        h, w = image.shape[:2]
        results_data.append({
            "file": filename,
            "center": {"x": w/2, "y": h/2},
            "box": {"x": 0, "y": 0, "w": 0, "h": 0}
        })

with open("face_data.json", "w") as f:
    json.dump(results_data, f, indent=2)

print("Done processing faces")
