# Project Template Manager - VS Code Extension

[![VS Code Extension](https://img.shields.io/badge/VS%20Code-Extension-blue?logo=visual-studio-code)](https://marketplace.visualstudio.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Version](https://img.shields.io/badge/Version-1.0.0-orange.svg)](package.json)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-black?logo=github)](https://github.com/Sherin-SEF-AI/project-template-manager-VS-Code-Extension)

A powerful VS Code extension that allows developers to create, manage, and use project templates with advanced variable substitution capabilities.

## 🚀 Features

- ✅ **Template Creation** - Create templates from existing projects
- ✅ **Template Management** - Browse, edit, duplicate, and delete templates
- ✅ **Variable Substitution** - Advanced variable system with validation
- ✅ **Project Generation** - Generate new projects with interactive forms
- ✅ **Import/Export** - Share templates via ZIP files
- ✅ **Sidebar Integration** - Visual template management
- ✅ **Webview Panels** - Rich UI for template editing and variable input

## 👨‍💻 Author

**Sherin Joseph Roy**  
📧 Email: [sherin.joseph2217@gmail.com](mailto:sherin.joseph2217@gmail.com)  
🌐 Website: [https://sherin-sef-ai.github.io/](https://sherin-sef-ai.github.io/)  
📦 Publisher: [sherin-sef-ai](https://marketplace.visualstudio.com/publishers/sherin-sef-ai)

## 📦 Installation

### From Source
```bash
# Clone the repository
git clone https://github.com/Sherin-SEF-AI/project-template-manager-VS-Code-Extension.git

# Navigate to the directory
cd project-template-manager-VS-Code-Extension

# Install dependencies
npm install

# Compile the extension
npm run compile

# Open in VS Code
code .

# Press F5 to run the extension
```

### Quick Start Script
```bash
# Run the quick start script
./quick-start.sh
```

## 🎯 Usage

### Creating a Template
1. Open a project folder in VS Code
2. Press `Ctrl+Shift+P` to open Command Palette
3. Run "Project Template Manager: Create Template from Current Project"
4. Enter template details (name, description, category)

### Using a Template
1. Click the Project Templates icon in the sidebar
2. Right-click on a template
3. Select "Create Project from Template"
4. Fill in variables and choose target directory

### Variable Substitution
The extension supports built-in and custom variables:

**Built-in Variables:**
- `{{projectName}}` - Project name
- `{{author}}` - Git author name
- `{{email}}` - Git author email
- `{{date}}` - Current date
- `{{year}}` - Current year

**Custom Variables:**
- String, Select, Boolean types
- Validation rules and default values
- Required/optional marking

## 🔧 Development

### Project Structure
```
src/
├── extension.ts              # Main entry point
├── types.ts                  # TypeScript interfaces
├── templateManager.ts        # Core logic
├── utils/                    # Utility functions
└── providers/               # UI providers
```

### Available Commands
- `createTemplate` - Create from current project
- `createProjectFromTemplate` - Generate new project
- `importTemplate` - Import from ZIP
- `exportTemplate` - Export to ZIP
- `refreshTemplates` - Refresh list
- `editTemplate` - Edit configuration
- `deleteTemplate` - Remove template
- `duplicateTemplate` - Create copy
- `previewTemplate` - Show structure

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/Sherin-SEF-AI/project-template-manager-VS-Code-Extension/issues)
- **Email**: [sherin.joseph2217@gmail.com](mailto:sherin.joseph2217@gmail.com)
- **Website**: [https://sherin-sef-ai.github.io/](https://sherin-sef-ai.github.io/)

## ⭐ Star History

[![Star History Chart](https://api.star-history.com/svg?repos=Sherin-SEF-AI/project-template-manager-VS-Code-Extension&type=Date)](https://star-history.com/#Sherin-SEF-AI/project-template-manager-VS-Code-Extension&Date) 