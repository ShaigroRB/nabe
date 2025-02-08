#!/bin/bash
# script that generate img exports for react & textures export for pixi


# Directory containing PNG files
dir="../src/assets/textures"
# Directory containing PNG files from project POV
import_dir="./assets/textures"
# Output TypeScript files
react_textures_file="react_textures.ts"
pixi_textures_file="textures.ts"

# Start writing the TypeScript files
echo "" > "$react_textures_file"
echo "" > "$pixi_textures_file"

# Iterate through all PNG files in the directory
imports=""
exports=""
texture_keys=""
for file in "$dir"/*.png; do
  # Extract filename without path and extension
  filename=$(basename -- "$file")
  name_no_ext="${filename%.png}"

  # Convert filename to PascalCase
  pascal_case=$(echo "$name_no_ext" | sed -E 's/(^|_)([a-z])/\U\2/g')

  # Append to import and export statements
  imports+="import Texture$pascal_case from '$import_dir/$filename'\n"
  exports+="  Texture$pascal_case,\n"
  texture_keys+="  $name_no_ext: await Assets.load(Texture$pascal_case),\n"
done

# Write the imports and exports to the img_exports.ts file
echo -e "$imports\nexport {\n$exports}" >> "$react_textures_file"

# Trim the trailing comma from the last export
sed -i '$s/,$//' "$react_textures_file"

# Generate pixi_textures.ts
echo -e "import { Assets } from 'pixi.js'\n" > "$pixi_textures_file"
echo -e "import {\n$exports} from '../react_textures'\n" >> "$pixi_textures_file"
echo "export const TEXTURES = {" >> "$pixi_textures_file"
echo -e "$texture_keys" >> "$pixi_textures_file"
echo "}" >> "$pixi_textures_file"

# Trim the trailing comma from the last texture key
sed -i '$s/,$//' "$pixi_textures_file"

echo "Generated $react_textures_file and $pixi_textures_file successfully."

# Move the generated files to the correct directory
mv "$react_textures_file" "../src/"
mv "$pixi_textures_file" "../src/canvas/"