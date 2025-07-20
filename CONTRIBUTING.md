# Contributing to Project Template Manager

Thank you for your interest in contributing to Project Template Manager! This document provides guidelines and information for contributors.

## Author Information

**Sherin Joseph Roy**  
📧 Email: [sherin.joseph2217@gmail.com](mailto:sherin.joseph2217@gmail.com)  
🌐 Website: [https://sherin-sef-ai.github.io/](https://sherin-sef-ai.github.io/)  
📦 Publisher: [sherin-sef-ai](https://marketplace.visualstudio.com/publishers/sherin-sef-ai)

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- VS Code
- Git

### Development Setup

1. **Fork the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/project-template-manager-VS-Code-Extension.git
   cd project-template-manager-VS-Code-Extension
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Compile the extension**
   ```bash
   npm run compile
   ```

4. **Run in development mode**
   - Open the project in VS Code
   - Press `F5` to launch the extension development host

## Development Guidelines

### Code Style

- Use TypeScript for all new code
- Follow the existing code style and formatting
- Use meaningful variable and function names
- Add comments for complex logic
- Keep functions small and focused

### Testing

- Write tests for new features
- Ensure all existing tests pass
- Test the extension manually before submitting

### Commit Messages

Use conventional commit format:
```
type(scope): description

[optional body]

[optional footer]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Test changes
- `chore`: Build/tooling changes

### Pull Request Process

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Write your code
   - Add tests if applicable
   - Update documentation

3. **Test your changes**
   ```bash
   npm run compile
   npm run lint
   npm test
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add new template feature"
   ```

5. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request**
   - Go to your fork on GitHub
   - Click "New Pull Request"
   - Select your feature branch
   - Fill out the PR template

## Project Structure

```
src/
├── extension.ts              # Main extension entry point
├── types.ts                  # TypeScript interfaces
├── templateManager.ts        # Core template management logic
├── utils/                    # Utility functions
│   ├── variableSubstitutor.ts
│   └── gitUtils.ts
└── providers/               # UI providers
    ├── templateExplorerProvider.ts
    ├── variableInputProvider.ts
    ├── templatePreviewProvider.ts
    └── templateEditorProvider.ts
```

## Available Scripts

- `npm run compile` - Compile TypeScript to JavaScript
- `npm run watch` - Watch for changes and recompile
- `npm run lint` - Run ESLint
- `npm test` - Run tests
- `npm run package` - Package the extension

## Reporting Issues

Before reporting an issue:

1. Check if the issue has already been reported
2. Try to reproduce the issue
3. Include detailed steps to reproduce
4. Provide environment information
5. Include error messages and screenshots

## Feature Requests

When suggesting new features:

1. Describe the problem you're trying to solve
2. Explain how the feature would help
3. Provide examples of similar features
4. Consider implementation complexity

## Code of Conduct

- Be respectful and inclusive
- Help others learn and grow
- Provide constructive feedback
- Follow the project's coding standards

## Contact

For questions or support:

- **Email**: [sherin.joseph2217@gmail.com](mailto:sherin.joseph2217@gmail.com)
- **Website**: [https://sherin-sef-ai.github.io/](https://sherin-sef-ai.github.io/)
- **GitHub Issues**: [Create an issue](https://github.com/Sherin-SEF-AI/project-template-manager-VS-Code-Extension/issues)

Thank you for contributing to Project Template Manager! 🚀 