import os
import re

components_dir = r'C:\Users\ThinkCentre\.openclaw\workspace\cristina-croussen\src\components'

fixed = []
errors = []

for filename in os.listdir(components_dir):
    if not filename.endswith('.tsx'):
        continue
    path = os.path.join(components_dir, filename)
    try:
        with open(path, 'r', encoding='utf-8') as f:
            content = f.read()
        # Fix double font-semibold
        content = re.sub(
            r'font-\[family-name:var\(--font-londrina\)\]( font-semibold)+',
            'font-[family-name:var(--font-londrina)] font-semibold',
            content
        )
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)
        fixed.append(filename)
    except UnicodeDecodeError:
        errors.append(filename)

print(f"OK: {len(fixed)} files")
if errors:
    print(f"ENCODING ERRORS: {errors}")
