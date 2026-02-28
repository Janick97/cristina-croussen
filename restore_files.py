import subprocess
import os

repo = r'C:\Users\ThinkCentre\.openclaw\workspace\cristina-croussen'
commit = '1d493b9'
files = ['src/components/FAQ.tsx', 'src/components/Footer.tsx', 'src/components/Hero.tsx']

for f in files:
    result = subprocess.run(
        ['git', 'show', f'{commit}:{f}'],
        capture_output=True, cwd=repo
    )
    content = result.stdout.decode('utf-8')
    # Apply font-semibold fix
    content = content.replace(
        'font-[family-name:var(--font-londrina)]',
        'font-[family-name:var(--font-londrina)] font-semibold'
    )
    out_path = os.path.join(repo, f.replace('/', os.sep))
    with open(out_path, 'w', encoding='utf-8') as out:
        out.write(content)
    print(f'Restored + fixed: {f}')
