import os
import json
# To run: python3 ./project_structure.py
# Create the project structure
project_structure = {
    'calendar-site/': {
        'index.html': 'main_html',
        'css/': {
            'style.css': 'styles',
            'responsive.css': 'responsive_styles'
        },
        'js/': {
            'main.js': 'javascript',
            'calendar-config.js': 'calendar_config'
        },
        'assets/': {
            'images/': {
                '.gitkeep': 'placeholder'
            },
            'fonts/': {
                '.gitkeep': 'placeholder'
            }
        },
        'docs/': {
            'README.md': 'readme',
            'SETUP.md': 'setup_guide'
        },
        '.gitignore': 'gitignore',
        'README.md': 'main_readme',
        'LICENSE': 'license'
    }
}

def create_structure(base_path, structure):
    """Recursively create folder structure"""
    for name, content in structure.items():
        path = os.path.join(base_path, name)
        if name.endswith('/'):
            # It's a directory
            os.makedirs(path, exist_ok=True)
            if isinstance(content, dict):
                create_structure(path, content)
        else:
            # It's a file - we'll create it
            pass

# Just print the structure for now
def print_structure(structure, indent=0):
    for name, content in structure.items():
        print('  ' * indent + name)
        if isinstance(content, dict):
            print_structure(content, indent + 1)

print("Project Structure:")
print("=" * 50)
print_structure(project_structure)
