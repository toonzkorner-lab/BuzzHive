from PIL import Image
import sys
import os

def remove_white_bg(input_path, output_path):
    try:
        img = Image.open(input_path).convert("RGBA")
        datas = img.getdata()

        newData = []
        for item in datas:
            # If pixel is close to white, make it transparent
            if item[0] > 230 and item[1] > 230 and item[2] > 230:
                newData.append((255, 255, 255, 0))
            else:
                newData.append(item)

        img.putdata(newData)
        img.save(output_path, "PNG")
        print(f"Processed {input_path}")
    except Exception as e:
        print(f"Error processing {input_path}: {e}")

input_files = [
    r"C:\Users\ToonZ\.gemini\antigravity\scratch\buzzhive\public\bees\bee1.png",
    r"C:\Users\ToonZ\.gemini\antigravity\scratch\buzzhive\public\bees\bee2.png",
    r"C:\Users\ToonZ\.gemini\antigravity\scratch\buzzhive\public\bees\bee3.png"
]

for file in input_files:
    if os.path.exists(file):
        remove_white_bg(file, file)
    else:
        print(f"File not found: {file}")
