# Project Template Manager

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://marketplace.visualstudio.com/items?itemName=sherinjosephroy.project-template-manager)
[![Downloads](https://img.shields.io/badge/downloads-0-brightgreen.svg)](https://marketplace.visualstudio.com/items?itemName=sherinjosephroy.project-template-manager)
[![Rating](https://img.shields.io/badge/rating-0.0-yellow.svg)](https://marketplace.visualstudio.com/items?itemName=sherinjosephroy.project-template-manager)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![VS Code](https://img.shields.io/badge/VS%20Code-1.74.0+-blue.svg)](https://code.visualstudio.com/)

A powerful VS Code extension for creating, managing, and using project templates with advanced variable substitution capabilities.

## 🚀 Features

### ✨ Core Functionality
- **Template Creation**: Create templates from existing projects
- **Variable Substitution**: Support for string, select, and boolean variables
- **Project Generation**: Generate new projects from templates with interactive forms
- **Template Management**: Organize, edit, duplicate, and delete templates
- **Import/Export**: Share templates via ZIP files

### 🎯 Advanced Features
- **Sidebar Integration**: Dedicated sidebar for template management
- **Webview Panels**: Interactive variable input and template preview
- **Context Menus**: Right-click actions for quick template operations
- **Command Palette**: Full command palette integration
- **Configuration**: Customizable template storage and settings

### 🔧 Technical Features
- **TypeScript Support**: Full TypeScript compilation and type safety
- **Error Handling**: Comprehensive error handling and user feedback
- **Git Integration**: Automatic author/email detection from Git config
- **File Processing**: Handle various file types and binary files
- **Validation**: Input validation and error prevention

## 📦 Installation

### From VS Code Marketplace
1. Open VS Code
2. Go to Extensions (Ctrl+Shift+X)
3. Search for "Project Template Manager"
4. Click Install

### From VSIX File
1. Download the `.vsix` file from releases
2. In VS Code, go to Extensions
3. Click the "..." menu and select "Install from VSIX..."
4. Select the downloaded file

## 🎮 Quick Start

### 1. Create Your First Template
1. Open a project you want to use as a template
2. Press `Ctrl+Shift+P` and run "Create Template from Current Project"
3. Fill in the template details and variables
4. Your template is now ready to use!

### 2. Generate a Project
1. Open the Project Templates sidebar
2. Right-click on a template and select "Create Project from Template"
3. Fill in the variable values
4. Choose your project location
5. Your new project is generated with all variables substituted!

### 3. Manage Templates
- **Import**: Right-click in sidebar → "Import Template"
- **Export**: Right-click on template → "Export Template"
- **Edit**: Right-click on template → "Edit Template"
- **Delete**: Right-click on template → "Delete Template"

## 🎨 Variable Types

### String Variables
```json
{
  "name": "projectName",
  "type": "string",
  "label": "Project Name",
  "default": "My Project",
  "required": true
}
```

### Select Variables
```json
{
  "name": "framework",
  "type": "select",
  "label": "Framework",
  "options": ["React", "Vue", "Angular"],
  "default": "React"
}
```

### Boolean Variables
```json
{
  "name": "useTypeScript",
  "type": "boolean",
  "label": "Use TypeScript",
  "default": true
}
```

## ⚙️ Configuration

### Template Storage Path
```json
{
  "projectTemplateManager.templatesPath": "~/.vscode/templates"
}
```

### Default Author Information
```json
{
  "projectTemplateManager.defaultAuthor": "Your Name",
  "projectTemplateManager.defaultEmail": "your.email@example.com"
}
```

### Auto Refresh
```json
{
  "projectTemplateManager.autoRefresh": true
}
```

## 🎯 Use Cases

### Web Development
- React/Vue/Angular project templates
- Full-stack application templates
- Component library templates

### Backend Development
- API server templates
- Database project templates
- Microservice templates

### Documentation
- Documentation site templates
- API documentation templates
- Technical writing templates

### Learning Projects
- Tutorial project templates
- Example code templates
- Practice project templates

## 🛠️ Commands

| Command | Description | Shortcut |
|---------|-------------|----------|
| `Create Template from Current Project` | Create a new template from the current workspace | - |
| `Create Project from Template` | Generate a new project from a template | - |
| `Import Template` | Import a template from a ZIP file | - |
| `Export Template` | Export a template to a ZIP file | - |
| `Refresh Templates` | Refresh the template list | - |
| `Edit Template` | Edit template metadata and variables | - |
| `Delete Template` | Delete a template | - |
| `Duplicate Template` | Create a copy of a template | - |
| `Preview Template` | Preview template structure and variables | - |

## 📁 Sample Templates

The extension includes sample templates to get you started:

### React TypeScript Template
- Complete React + TypeScript setup
- ESLint and Prettier configuration
- Component structure
- Variable substitution examples

## 🔧 Development

### Prerequisites
- Node.js 16+
- VS Code
- Git

### Setup
```bash
git clone https://github.com/Sherin-SEF-AI/project-template-manager-VS-Code-Extension.git
cd project-template-manager-VS-Code-Extension
npm install
npm run compile
```

### Running in Development
1. Open the project in VS Code
2. Press `F5` to launch the extension development host
3. Test the extension in the new VS Code window

### Testing
```bash
npm test
node test-features.js
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Setup
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 Changelog

### Version 1.0.0
- Initial release
- Complete template management system
- Variable substitution engine
- Sidebar integration
- Import/export functionality
- Sample templates included

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Sherin Joseph Roy**  
📧 Email: [sherin.joseph2217@gmail.com](mailto:sherin.joseph2217@gmail.com)  
🌐 Website: [https://sherin-sef-ai.github.io/](https://sherin-sef-ai.github.io/)  
📦 Publisher: [sherinjosephroy](https://marketplace.visualstudio.com/publishers/sherinjosephroy)

## 🆘 Support

- **Issues**: [GitHub Issues](https://github.com/Sherin-SEF-AI/project-template-manager-VS-Code-Extension/issues)
- **Email**: [sherin.joseph2217@gmail.com](mailto:sherin.joseph2217@gmail.com)
- **Website**: [https://sherin-sef-ai.github.io/](https://sherin-sef-ai.github.io/)

## ⭐ Star History

[![Star History Chart](https://api.star-history.com/svg?repos=Sherin-SEF-AI/project-template-manager-VS-Code-Extension&type=Date)](https://star-history.com/#Sherin-SEF-AI/project-template-manager-VS-Code-Extension&Date)

---

**Made with ❤️ by Sherin Joseph Roy**

If you find this extension helpful, please consider giving it a ⭐ on GitHub! 