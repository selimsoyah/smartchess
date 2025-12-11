#!/bin/bash

# Smart Chess Academy Color Palette Migration Script
# This script updates all old color references to the new palette

echo "🎨 Updating Smart Chess Academy Color Palette..."

# Define color mappings
# Old Color -> New Color
declare -A color_map=(
  ["#c49e4e"]="#f9d616"    # Primary bronze -> Candlelight yellow
  ["#9e7642"]="#ebd04b"    # Darker bronze -> Ronchi (lighter yellow)
  ["#272f2c"]="#1b0e04"    # Dark background -> Creole (darker black)
  ["#44321b"]="#443005"    # Medium dark -> Deep bronze
  ["#bac1bf"]="#b1afaa"    # Light gray -> Cloudy
  ["#745832"]="#806a1c"    # Accent brown -> Kumera (golden brown)
  ["#5a605a"]="#5b5a56"    # Text gray -> Chicago
)

# Function to replace colors in a file
replace_colors() {
  local file="$1"
  local temp_file="${file}.tmp"
  
  cp "$file" "$temp_file"
  
  for old_color in "${!color_map[@]}"; do
    new_color="${color_map[$old_color]}"
    sed -i "s/${old_color}/${new_color}/g" "$temp_file"
  done
  
  # Check if file changed
  if ! cmp -s "$file" "$temp_file"; then
    mv "$temp_file" "$file"
    echo "✓ Updated: $file"
    return 0
  else
    rm "$temp_file"
    return 1
  fi
}

# Find and update all TSX and TS files
updated_count=0
total_files=0

while IFS= read -r file; do
  ((total_files++))
  if replace_colors "$file"; then
    ((updated_count++))
  fi
done < <(find src -type f \( -name "*.tsx" -o -name "*.ts" \) ! -path "*/node_modules/*")

echo ""
echo "✨ Color palette migration complete!"
echo "📊 Updated $updated_count out of $total_files files"
echo ""
echo "🎨 New color palette:"
echo "  Primary: #f9d616 (Candlelight Yellow)"
echo "  Dark: #1b0e04 (Creole Black)"
echo "  Accent: #d6c06a (Tacha Gold)"
echo "  Text: #5b5a56 (Chicago Gray)"
