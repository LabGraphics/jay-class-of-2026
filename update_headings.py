import re

with open(r'd:\Complete-Jay-site\style.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Make headings Fraunces weight 600 and soft
def heading_replacement(match):
    block = match.group(0)
    block = re.sub(r'font-weight:\s*\d+;', 'font-weight: 600;', block)
    if 'letter-spacing' not in block:
        block = block.rstrip()
        block = block[:-1] + "    letter-spacing: 0.5px;\n    line-height: 1.3;\n}"
    return block

css = re.sub(r'h1,\s*h2,\s*h3\s*\{[^}]+\}', heading_replacement, css)
css = css.replace("h1, h2, h3 {", "h1, h2, h3, h4 {")

def class_title_replacement(match):
    block = match.group(0)
    block = re.sub(r'font-weight:\s*\d+;', 'font-weight: 600;', block)
    if 'letter-spacing' not in block:
        block = block.rstrip()
        block = block[:-1] + "    letter-spacing: 0.5px;\n    line-height: 1.2;\n}"
    return block

# Apply to all relevant heading classes
css = re.sub(r'\.story-v8-title\s*\{[^}]+\}', class_title_replacement, css)
css = re.sub(r'\.event-layout-title\s*\{[^}]+\}', class_title_replacement, css)
css = re.sub(r'\.rsvp-layout-title,\s*\.rsvp-layout-subheading\s*\{[^}]+\}', class_title_replacement, css)
css = re.sub(r'\.rsvp-card-title\s*\{[^}]+\}', class_title_replacement, css)
css = re.sub(r'\#celebration-wall-section h2\s*\{[^}]+\}', class_title_replacement, css)

with open(r'd:\Complete-Jay-site\style.css', 'w', encoding='utf-8') as f:
    f.write(css)

print("Updated style.css headings.")
