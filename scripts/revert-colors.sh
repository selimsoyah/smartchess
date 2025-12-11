#!/bin/bash

# Revert to old color palette

echo "🔄 Reverting to original color palette..."

# Define color mappings (NEW -> OLD)
declare -A color_map=(
  ["#f9d616"]="#c49e4e"    # Candlelight yellow -> Primary bronze
  ["#ebd04b"]="#9e7642"    # Ronchi -> Darker bronze
  ["#1b0e04"]="#272f2c"    # Creole -> Dark background
  ["#443005"]="#44321b"    # Deep bronze -> Medium dark
  ["#b1afaa"]="#bac1bf"    # Cloudy -> Light gray
  ["#806a1c"]="#745832"    # Kumera -> Accent brown
  ["#5b5a56"]="#5a605a"    # Chicago -> Text gray
)

# Function to replace colors in a file
replace_colors() {
  local file="$1"
  local temp_file="${file}.tmp"
  
  cp "$file" "$temp_file"
  
  for new_color in "${!color_map[@]}"; do
    old_color="${color_map[$new_color]}"
    sed -i "s/${new_color}/${old_color}/g" "$temp_file"
  done
  
  # Check if file changed
  if ! cmp -s "$file" "$temp_file"; then
    mv "$temp_file" "$file"
    echo "✓ Reverted: $file"
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
echo "✨ Revert complete!"
echo "📊 Reverted $updated_count out of $total_files files"
