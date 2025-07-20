# Changelog

All notable changes to the "Template Hub" extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.2] - 2024-07-20

### Fixed
- Fixed extension activation by using `onStartupFinished` activation event
- Added comprehensive error handling and logging
- Fixed command registration issues that prevented commands from being found
- Improved extension reliability and startup process

### Changed
- Simplified activation events for better compatibility
- Enhanced error reporting and debugging information
- Updated extension logging for better troubleshooting

## [1.0.1] - 2024-07-20

### Fixed
- Fixed command registration issues - commands now appear under "Template Hub" category
- Added missing `openTemplateHub` and `useTemplate` commands
- Fixed extension activation and command discovery
- Improved error handling for template operations
- Fixed .vscodeignore configuration for proper packaging

### Added
- New command: `Template Hub: Open Template Hub` - Opens the sidebar directly
- New command: `Template Hub: Use Template` - Quick template selection
- Enhanced template selection workflow
- Better user feedback for template operations

### Changed
- Updated command categories from "Project Template Manager" to "Template Hub"
- Improved extension packaging and distribution
- Enhanced documentation with usage guides

## [1.0.0] - 2024-07-19

### Added
- Initial release of Template Hub
- Create, manage, and use project templates
- Variable substitution system
- Template import/export functionality
- Sidebar integration with VS Code
- Template preview and editing capabilities
- Git integration for author information
- Comprehensive documentation and guides 