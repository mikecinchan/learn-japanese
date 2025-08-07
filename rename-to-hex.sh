#!/bin/bash

TARGET_DIR="./animCJK/svgsJaKana"

# Ensure directory exists
if [ ! -d "$TARGET_DIR" ]; then
  echo "❌ Folder not found: $TARGET_DIR"
  exit 1
fi

echo "🔁 Renaming files in: $TARGET_DIR"

for file in "$TARGET_DIR"/*.svg; do
  filename=$(basename "$file")
  base="${filename%.svg}"

  # Make sure it's all digits
  if [[ "$base" =~ ^[0-9]+$ ]]; then
    hex=$(printf "%04X" "$base")
    newfile="${TARGET_DIR}/${hex}.svg"

    echo "🔄 Renaming $filename → $hex.svg"
    mv "$file" "$newfile"
  else
    echo "⚠️ Skipped: $filename (not numeric)"
  fi
done

echo "✅ Done renaming files."
