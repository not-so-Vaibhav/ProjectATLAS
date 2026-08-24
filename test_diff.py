import cv2
import numpy as np

img1 = cv2.imread("public/cinematic/arrival/center.png")
img2 = cv2.imread("public/cinematic/arrival/up-right.png")

diff = cv2.absdiff(img1, img2)
# enhance diff
diff = cv2.multiply(diff, 5)
cv2.imwrite("/Users/vaibhavbariyar/.gemini/antigravity-ide/brain/dd1b6e12-13c9-4dbd-b5b1-f6733cb5eb0f/diff.png", diff)

