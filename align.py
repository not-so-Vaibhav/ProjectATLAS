import cv2
import numpy as np
import os
import json

base_dir = "public/cinematic/arrival"
center_path = os.path.join(base_dir, "center.png")
center_img = cv2.imread(center_path, cv2.IMREAD_GRAYSCALE)
center_f32 = np.float32(center_img)

images = ["center.png", "down.png", "left.png", "right.png", "down-left.png", "down-right.png", "up-left.png", "up-right.png", "up.png"]

offsets = {}

for img_name in images:
    if img_name == "center.png":
        offsets["center"] = {"x": 0, "y": 0}
        continue
        
    img_path = os.path.join(base_dir, img_name)
    if not os.path.exists(img_path): continue
    
    img = cv2.imread(img_path, cv2.IMREAD_GRAYSCALE)
    if img is None: continue
    
    img_f32 = np.float32(img)
    
    # Calculate phase correlation to find translation offset
    (x_shift, y_shift), response = cv2.phaseCorrelate(center_f32, img_f32)
    
    # We want the offset to apply to the drawing, so if img is shifted right by x_shift, 
    # we need to draw it at -x_shift. Let's just store x_shift, y_shift directly.
    key = img_name.replace(".png", "")
    offsets[key] = {
        "x": float(x_shift),
        "y": float(y_shift)
    }
    
print(json.dumps(offsets, indent=2))
