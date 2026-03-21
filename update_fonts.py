import re
import os
import glob

print("Updating fonts...")

# Read style.css
with open(r'd:\Complete-Jay-site\style.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Replace Imports
css = re.sub(
    r"@import url\([^\)]+\);",
    r"@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,100..900;1,9..144,100..900&family=Great+Vibes&family=Work+Sans:ital,wght@0,100..900;1,100..900&display=swap');",
    css, count=1
)

# Headings to Fraunces (previously Playfair Display or Times New Roman)
css = re.sub(r"font-family:\s*['\"]Playfair Display['\"],\s*serif;", "font-family: 'Fraunces', serif;", css)
css = re.sub(r"font-family:\s*['\"]Times New Roman['\"],\s*serif;", "font-family: 'Fraunces', serif;", css)

# Body text to Work Sans (previously Lato or sans-serif)
css = re.sub(r"font-family:\s*['\"]Lato['\"],\s*sans-serif;", "font-family: 'Work Sans', sans-serif;", css)
css = re.sub(r"font-family:\s*['\"]sans-serif['\"];?", "font-family: 'Work Sans', sans-serif;", css)
css = re.sub(r"font-family:\s*sans-serif;", "font-family: 'Work Sans', sans-serif;", css)

if ".signatureFont {" not in css:
    css += "\n\n/* Global Signature Utility Class */\n.signatureFont {\n    font-family: 'Great Vibes', cursive;\n    font-size: 2rem;\n    color: var(--archer-red);\n}\n"

with open(r'd:\Complete-Jay-site\style.css', 'w', encoding='utf-8') as f:
    f.write(css)

print("Updated style.css")

# Update all html files
for html_file in glob.glob(r'd:\Complete-Jay-site\*.html'):
    with open(html_file, 'r', encoding='utf-8') as f:
        html = f.read()
    
    html = re.sub(r"font-family:\s*['\"]Lato['\"],\s*sans-serif;?", "font-family: 'Work Sans', sans-serif;", html)
    html = re.sub(r"font-family:\s*['\"]Playfair Display['\"],\s*serif;?", "font-family: 'Fraunces', serif;", html)
    
    with open(html_file, 'w', encoding='utf-8') as f:
        f.write(html)
    print(f"Updated {html_file}")

print("Done.")
