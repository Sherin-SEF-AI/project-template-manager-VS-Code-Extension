# 🎯 Template Hub - Quick Demo Guide

## 🚀 5-Minute Quick Start

### Step 1: Open Template Hub
1. **Press `Ctrl+Shift+P`** (Command Palette)
2. **Type**: "Template Hub"
3. **Select**: "Template Hub: Open Template Hub"
4. **Result**: Template Hub sidebar opens on the left

### Step 2: Create Your First Template
1. **Click the "+" button** in Template Hub sidebar
2. **Fill in details**:
   - Name: `My First Template`
   - Description: `A simple web project template`
   - Category: `Web Development`
   - Tags: `html, css, javascript`

### Step 3: Add Template Files
1. **Click "Add Files"** in the template editor
2. **Create this structure**:
   ```
   my-project/
   ├── index.html
   ├── style.css
   ├── script.js
   └── README.md
   ```

3. **Add content with variables**:

**index.html:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{projectName}}</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>{{projectName}}</h1>
    <p>{{description}}</p>
    <p>Created by {{author}}</p>
    <script src="script.js"></script>
</body>
</html>
```

**README.md:**
```markdown
# {{projectName}}

{{description}}

## Author
{{author}}

## Getting Started
1. Open index.html in your browser
2. Start coding!
```

### Step 4: Define Variables
In the template editor, add these variables:

```json
{
  "variables": {
    "projectName": {
      "type": "string",
      "prompt": "Enter project name:",
      "default": "my-web-project"
    },
    "description": {
      "type": "string",
      "prompt": "Enter project description:",
      "default": "A simple web project"
    },
    "author": {
      "type": "string",
      "prompt": "Enter your name:",
      "default": "{{git.name}}"
    }
  }
}
```

### Step 5: Save and Use Template
1. **Click "Save Template"**
2. **Your template appears in the sidebar**
3. **Click the play button** (▶️) to use it
4. **Fill in the variables** when prompted
5. **Choose destination folder**
6. **Click "Create Project"**

---

## 🎨 Real-World Examples

### Example 1: React Template
**Template Structure:**
```
react-app/
├── package.json
├── tsconfig.json
├── src/
│   ├── App.tsx
│   ├── index.tsx
│   └── components/
│       └── {{componentName}}.tsx
├── public/
│   └── index.html
└── README.md
```

**Variables:**
```json
{
  "projectName": {
    "type": "string",
    "prompt": "Project name:",
    "default": "my-react-app"
  },
  "componentName": {
    "type": "string",
    "prompt": "Main component name:",
    "default": "App"
  },
  "useTypeScript": {
    "type": "boolean",
    "prompt": "Use TypeScript?",
    "default": true
  }
}
```

### Example 2: Node.js API Template
**Template Structure:**
```
node-api/
├── package.json
├── server.js
├── routes/
│   └── {{routeName}}.js
├── models/
├── config/
│   └── database.js
└── README.md
```

**Variables:**
```json
{
  "projectName": {
    "type": "string",
    "prompt": "API name:",
    "default": "my-api"
  },
  "routeName": {
    "type": "string",
    "prompt": "Main route name:",
    "default": "users"
  },
  "port": {
    "type": "number",
    "prompt": "Port number:",
    "default": 3000
  },
  "database": {
    "type": "select",
    "prompt": "Database:",
    "options": ["MongoDB", "PostgreSQL", "MySQL"],
    "default": "MongoDB"
  }
}
```

---

## 🔧 Advanced Usage

### Using Built-in Variables
```javascript
// Automatically gets your Git info
const author = "{{git.name}} <{{git.email}}>";

// Gets current date/time
const created = "{{date}} at {{time}}";

// Unique identifier
const id = "{{timestamp}}";
```

### Conditional Content
```html
<!-- Use different content based on variables -->
{{#if useTypeScript}}
<script src="app.ts"></script>
{{else}}
<script src="app.js"></script>
{{/if}}
```

### File Name Variables
```
src/components/{{componentName}}.tsx
public/{{projectName}}-logo.png
docs/{{projectName}}-guide.md
```

---

## 📱 Template Hub Commands

### Quick Commands (Ctrl+Shift+P)
- `Template Hub: Open Template Hub` - Open sidebar
- `Template Hub: Create New Template` - Create template
- `Template Hub: Use Template` - Use existing template
- `Template Hub: Import Template` - Import from ZIP
- `Template Hub: Export Template` - Export to ZIP

### Context Menu Commands
- **Right-click in File Explorer** → "Template Hub: Use Template"
- **Right-click template in sidebar** → Edit/Delete/Duplicate

---

## 🎯 Pro Tips

### 1. Organize with Categories
- Web Development
- Mobile Development
- Backend Services
- Documentation
- Testing

### 2. Use Descriptive Tags
- `react`, `vue`, `angular`
- `typescript`, `javascript`
- `node`, `python`, `java`
- `docker`, `kubernetes`

### 3. Template Best Practices
- Keep templates focused and specific
- Use meaningful variable names
- Provide helpful defaults
- Include documentation
- Test templates before sharing

### 4. Sharing Templates
1. **Export template** as ZIP
2. **Share with team** via email/cloud
3. **Import** into their Template Hub
4. **Collaborate** on template improvements

---

## 🚀 What's Next?

1. **Create more templates** for your common project types
2. **Share templates** with your team
3. **Explore advanced features** like template preview
4. **Contribute** to the open-source project
5. **Rate and review** on VS Code Marketplace

**Happy templating!** 🎉 