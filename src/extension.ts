import * as vscode from 'vscode';
import { TemplateManager } from './templateManager';
import { TemplateExplorerProvider } from './providers/templateExplorerProvider';
import { VariableInputProvider } from './providers/variableInputProvider';
import { TemplatePreviewProvider } from './providers/templatePreviewProvider';
import { TemplateEditorProvider } from './providers/templateEditorProvider';

export function activate(context: vscode.ExtensionContext) {
    console.log('Template Hub is now active!');

    try {
        // Initialize template manager
        const templateManager = new TemplateManager(context);

        // Register template explorer provider
        const templateExplorerProvider = new TemplateExplorerProvider(templateManager);
        vscode.window.registerTreeDataProvider('projectTemplateManager.templateExplorer', templateExplorerProvider);

        // Register webview providers
        const variableInputProvider = new VariableInputProvider(context.extensionUri);
        const templatePreviewProvider = new TemplatePreviewProvider(context.extensionUri);
        const templateEditorProvider = new TemplateEditorProvider(context.extensionUri);

        context.subscriptions.push(
            vscode.window.registerWebviewViewProvider('projectTemplateManager.variableInput', variableInputProvider),
            vscode.window.registerWebviewViewProvider('projectTemplateManager.templatePreview', templatePreviewProvider),
            vscode.window.registerWebviewViewProvider('projectTemplateManager.templateEditor', templateEditorProvider)
        );

        // Register basic commands with simple implementations
        const commands = [
            // Simple test command
            vscode.commands.registerCommand('projectTemplateManager.test', () => {
                vscode.window.showInformationMessage('Template Hub is working!');
            }),

            // Open Template Hub command
            vscode.commands.registerCommand('projectTemplateManager.openTemplateHub', () => {
                vscode.window.showInformationMessage('Opening Template Hub...');
                vscode.commands.executeCommand('workbench.view.extension.projectTemplateManager-sidebar');
            }),

            // Use Template command
            vscode.commands.registerCommand('projectTemplateManager.useTemplate', () => {
                vscode.window.showInformationMessage('Use Template command triggered!');
                templateManager.showTemplateSelection();
            }),

            // Create Template command
            vscode.commands.registerCommand('projectTemplateManager.createTemplate', () => {
                vscode.window.showInformationMessage('Create Template command triggered!');
                templateManager.createTemplateFromCurrentProject();
            }),

            // Create Project from Template command
            vscode.commands.registerCommand('projectTemplateManager.createProjectFromTemplate', (template) => {
                vscode.window.showInformationMessage('Create Project from Template command triggered!');
                templateManager.createProjectFromTemplate(template);
            }),

            // Import Template command
            vscode.commands.registerCommand('projectTemplateManager.importTemplate', () => {
                vscode.window.showInformationMessage('Import Template command triggered!');
                templateManager.importTemplate();
            }),

            // Export Template command
            vscode.commands.registerCommand('projectTemplateManager.exportTemplate', (template) => {
                vscode.window.showInformationMessage('Export Template command triggered!');
                templateManager.exportTemplate(template);
            }),

            // Refresh Templates command
            vscode.commands.registerCommand('projectTemplateManager.refreshTemplates', () => {
                vscode.window.showInformationMessage('Refreshing templates...');
                templateExplorerProvider.refresh();
            }),

            // Edit Template command
            vscode.commands.registerCommand('projectTemplateManager.editTemplate', (template) => {
                vscode.window.showInformationMessage('Edit Template command triggered!');
                templateManager.editTemplate(template);
            }),

            // Delete Template command
            vscode.commands.registerCommand('projectTemplateManager.deleteTemplate', (template) => {
                vscode.window.showInformationMessage('Delete Template command triggered!');
                templateManager.deleteTemplate(template);
            }),

            // Duplicate Template command
            vscode.commands.registerCommand('projectTemplateManager.duplicateTemplate', (template) => {
                vscode.window.showInformationMessage('Duplicate Template command triggered!');
                templateManager.duplicateTemplate(template);
            }),

            // Preview Template command
            vscode.commands.registerCommand('projectTemplateManager.previewTemplate', (template) => {
                vscode.window.showInformationMessage('Preview Template command triggered!');
                templateManager.previewTemplate(template);
            })
        ];

        context.subscriptions.push(...commands);

        // Set up file watchers for auto-refresh
        const config = vscode.workspace.getConfiguration('projectTemplateManager');
        if (config.get('autoRefresh', true)) {
            const templatesPath = templateManager.getTemplatesPath();
            const fileWatcher = vscode.workspace.createFileSystemWatcher(`${templatesPath}/**/*`);
            
            fileWatcher.onDidChange(() => templateExplorerProvider.refresh());
            fileWatcher.onDidCreate(() => templateExplorerProvider.refresh());
            fileWatcher.onDidDelete(() => templateExplorerProvider.refresh());
            
            context.subscriptions.push(fileWatcher);
        }

        console.log('Template Hub commands registered successfully!');
        vscode.window.showInformationMessage('Template Hub is now active and ready to use!');
        
    } catch (error) {
        console.error('Failed to activate Template Hub:', error);
        vscode.window.showErrorMessage(`Failed to activate Template Hub: ${error}`);
    }
}

export function deactivate() {
    console.log('Template Hub is now deactivated!');
} 