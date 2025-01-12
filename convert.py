import os
import json
import shutil
from PIL import Image

# Directory containing the files
base_directory = "images"

# Path to the JSON file
json_path = "data.json"

# Convert images to WebP
def convert_images_to_webp(base_directory):
    for root, _, files in os.walk(base_directory):
        if root.endswith("backup") or "/backup/" in root or "\\backup\\" in root:
            continue

        backup_folder = os.path.join(root, "backup")
        os.makedirs(backup_folder, exist_ok=True)

        for file in files:
            if file.lower().endswith((".jpg", ".png")):
                filepath = os.path.join(root, file)
                output_path = os.path.splitext(filepath)[0] + ".webp"

                with Image.open(filepath) as img:
                    img.save(output_path, "webp")
                
                print(f"Converted: {filepath} -> {output_path}")

                backup_path = os.path.join(backup_folder, file)
                shutil.move(filepath, backup_path)
                print(f"Moved: {filepath} -> {backup_path}")

# Update the JSON file
def update_json_file(json_path):
    with open(json_path, "r", encoding="utf-8") as f:
        data = json.load(f)
    
    def update_image_paths(obj):
        if isinstance(obj, dict):
            for key, value in obj.items():
                if key == "images" and isinstance(value, list):
                    obj[key] = [
                        img.replace(".jpg", ".webp").replace(".png", ".webp") for img in value
                    ]
                else:
                    update_image_paths(value)
        elif isinstance(obj, list):
            for item in obj:
                update_image_paths(item)

    update_image_paths(data)

    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=4, ensure_ascii=False)

    print("JSON updated!")

# Execute the steps
convert_images_to_webp(base_directory)
update_json_file(json_path)
