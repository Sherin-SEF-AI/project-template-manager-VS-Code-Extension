# 🚀 Template Hub - Complete Usage Guide

## 📋 Table of Contents
1. [Getting Started](#getting-started)
2. [Creating Templates](#creating-templates)
3. [Using Templates](#using-templates)
4. [Managing Templates](#managing-templates)
5. [Variable System](#variable-system)
6. [Import/Export](#importexport)
7. [Advanced Features](#advanced-features)
8. [Troubleshooting](#troubleshooting)

---

## 🎯 Getting Started

### Installing the Extension
1. Open VS Code
2. Go to Extensions (`Ctrl+Shift+X`)
3. Search for "Template Hub"
4. Click "Install"

### Opening Template Hub
- **Method 1**: Press `Ctrl+Shift+P` → Type "Template Hub" → Select "Template Hub: Open Template Hub"
- **Method 2**: Click the Template Hub icon in the Activity Bar (left sidebar)
- **Method 3**: Use the Command Palette and search for "Template Hub"

---

## 🛠️ Creating Templates

### Step 1: Create a New Template
1. Open Template Hub sidebar
2. Click the "+" button or use `Ctrl+Shift+P` → "Template Hub: Create New Template"
3. Fill in the template details:
   - **Name**: My React App
   - **Description**: A modern React application with TypeScript
   - **Category**: Web Development
   - **Tags**: react, typescript, modern

### Step 2: Add Template Files
1. Click "Add Files" in the template editor
2. Create your template structure:

```
my-react-app/
├── package.json
├── tsconfig.json
├── src/
│   ├── App.tsx
│   ├── index.tsx
│   └── components/
│       └── Header.tsx
├── public/
│   └── index.html
└── README.md
```

### Step 3: Add Variables
Use variables in your template files:

**package.json:**
```json
{
  "name": "{{projectName}}",
  "version": "{{version}}",
  "description": "{{description}}",
  "author": "{{author}}",
  "license": "{{license}}"
}
```

**README.md:**
```markdown
# {{projectName}}

{{description}}

## Author
{{author}}

## License
{{license}}
```

### Step 4: Define Variable Prompts
In the template editor, define how variables should be prompted:

```json
{
  "variables": {
    "projectName": {
      "type": "string",
      "prompt": "Enter project name:",
      "default": "my-app"
    },
    "version": {
      "type": "string", 
      "prompt": "Enter version:",
      "default": "1.0.0"
    },
    "author": {
      "type": "string",
      "prompt": "Enter author name:",
      "default": "{{git.name}}"
    },
    "license": {
      "type": "select",
      "prompt": "Choose license:",
      "options": ["MIT", "Apache-2.0", "GPL-3.0"],
      "default": "MIT"
    }
  }
}
```

---

## 🎨 Using Templates

### Method 1: From Template Hub Sidebar
1. Open Template Hub sidebar
2. Find your template in the list
3. Click the "Use Template" button (play icon)
4. Fill in the variable prompts
5. Choose destination folder
6. Click "Create Project"

### Method 2: From Command Palette
1. Press `Ctrl+Shift+P`
2. Type "Template Hub: Use Template"
3. Select your template
4. Fill in variables
5. Choose destination

### Method 3: From File Explorer Context Menu
1. Right-click in File Explorer
2. Select "Template Hub: Use Template"
3. Choose template and fill variables

### Method 4: From Welcome Page
1. Open Template Hub
2. Click "Quick Start" on welcome page
3. Select template and proceed

---

## 📁 Managing Templates

### Viewing Templates
- **All Templates**: See all templates in the sidebar
- **By Category**: Filter by category (Web, Mobile, Desktop, etc.)
- **By Tags**: Search by tags
- **Favorites**: Star templates for quick access

### Editing Templates
1. Right-click template in sidebar
2. Select "Edit Template"
3. Modify files, variables, or metadata
4. Save changes

### Deleting Templates
1. Right-click template in sidebar
2. Select "Delete Template"
3. Confirm deletion

### Duplicating Templates
1. Right-click template in sidebar
2. Select "Duplicate Template"
3. Modify the copy as needed

---

## 🔧 Variable System

### Variable Types

#### String Variables
```json
{
  "projectName": {
    "type": "string",
    "prompt": "Enter project name:",
    "default": "my-project"
  }
}
```

#### Select Variables
```json
{
  "framework": {
    "type": "select",
    "prompt": "Choose framework:",
    "options": ["React", "Vue", "Angular"],
    "default": "React"
  }
}
```

#### Boolean Variables
```json
{
  "useTypeScript": {
    "type": "boolean",
    "prompt": "Use TypeScript?",
    "default": true
  }
}
```

#### Number Variables
```json
{
  "port": {
    "type": "number",
    "prompt": "Enter port number:",
    "default": 3000
  }
}
```

### Built-in Variables
- `{{git.name}}` - Git user name
- `{{git.email}}` - Git user email
- `{{date}}` - Current date
- `{{time}}` - Current time
- `{{timestamp}}` - Current timestamp

### Variable Usage in Files
- **File Names**: `{{projectName}}-config.json`
- **File Content**: Any text content
- **Folder Names**: `src/{{componentName}}/`

---

## 📦 Import/Export

### Exporting Templates
1. Right-click template in sidebar
2. Select "Export Template"
3. Choose export format (ZIP)
4. Save to desired location

### Importing Templates
1. Click "Import Template" in sidebar
2. Select ZIP file
3. Template will be added to your collection

### Sharing Templates
- Export as ZIP file
- Share with team members
- Import into their Template Hub

---

## ⚡ Advanced Features

### Template Preview
1. Right-click template in sidebar
2. Select "Preview Template"
3. See how template will look with sample variables

### Template Categories
Organize templates by category:
- Web Development
- Mobile Development
- Desktop Applications
- Backend Services
- Documentation
- Custom categories

### Template Tags
Add tags for better organization:
- `react`, `vue`, `angular`
- `typescript`, `javascript`
- `node`, `python`, `java`
- `docker`, `kubernetes`

### Quick Actions
- **Star Templates**: Click star icon to favorite
- **Search Templates**: Use search bar in sidebar
- **Sort Templates**: By name, date, category

---

## 🔍 Troubleshooting

### Common Issues

#### Template Not Appearing
- Check if template is saved properly
- Refresh Template Hub sidebar
- Restart VS Code

#### Variables Not Substituting
- Ensure variable syntax is correct: `{{variableName}}`
- Check variable definitions in template config
- Verify variable names match exactly

#### Import/Export Issues
- Ensure ZIP file is not corrupted
- Check file permissions
- Verify template structure is valid

#### Performance Issues
- Limit number of large files in templates
- Use `.vscodeignore` to exclude unnecessary files
- Optimize template structure

### Getting Help
- Check the README.md file
- Review CONTRIBUTING.md for development
- Open issues on GitHub repository
- Check VS Code extension marketplace reviews

---

## 🎯 Best Practices

### Template Design
1. **Keep it Simple**: Start with essential files only
2. **Use Variables**: Make templates flexible and reusable
3. **Add Documentation**: Include README files
4. **Test Templates**: Verify they work before sharing

### Variable Naming
1. **Use Descriptive Names**: `projectName` not `name`
2. **Be Consistent**: Use same naming convention
3. **Provide Defaults**: Always include sensible defaults
4. **Add Validation**: Use appropriate variable types

### Organization
1. **Use Categories**: Organize by project type
2. **Add Tags**: Make templates searchable
3. **Version Control**: Keep templates in Git
4. **Documentation**: Explain template purpose and usage

---

## 🚀 Quick Reference

### Keyboard Shortcuts
- `Ctrl+Shift+P` → Open Command Palette
- `Ctrl+Shift+X` → Open Extensions
- `Ctrl+Shift+E` → Open File Explorer

### Commands
- `Template Hub: Open Template Hub`
- `Template Hub: Create New Template`
- `Template Hub: Use Template`
- `Template Hub: Import Template`
- `Template Hub: Export Template`

### File Extensions
- `.template-config.json` - Template configuration
- `.vscodeignore` - Files to ignore
- `.zip` - Template export format

---

## 🎉 Congratulations!

You're now ready to use Template Hub effectively! Start by creating your first template and explore all the features. The extension will help you save time and maintain consistency across your projects.

**Happy templating!** 🚀 