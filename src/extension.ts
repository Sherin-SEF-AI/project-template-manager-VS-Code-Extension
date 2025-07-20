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
        vscode.window.registerTreeDataProvider('templateHub.templateExplorer', templateExplorerProvider);

        // Register webview providers
        const variableInputProvider = new VariableInputProvider(context.extensionUri);
        const templatePreviewProvider = new TemplatePreviewProvider(context.extensionUri);
        const templateEditorProvider = new TemplateEditorProvider(context.extensionUri);

        context.subscriptions.push(
            vscode.window.registerWebviewViewProvider('templateHub.variableInput', variableInputProvider),
            vscode.window.registerWebviewViewProvider('templateHub.templatePreview', templatePreviewProvider),
            vscode.window.registerWebviewViewProvider('templateHub.templateEditor', templateEditorProvider)
        );

        // Register all commands with simple implementations
        const commands = [
            // Test command - this should definitely work
            vscode.commands.registerCommand('templateHub.test', () => {
                vscode.window.showInformationMessage('🎉 Template Hub is working perfectly!');
                console.log('Template Hub test command executed successfully');
            }),

            // Open Template Hub command
            vscode.commands.registerCommand('templateHub.openHub', () => {
                vscode.window.showInformationMessage('Opening Template Hub sidebar...');
                vscode.commands.executeCommand('workbench.view.extension.templateHub-sidebar');
            }),

            // Use Template command
            vscode.commands.registerCommand('templateHub.useTemplate', () => {
                vscode.window.showInformationMessage('Use Template command executed!');
                templateManager.showTemplateSelection();
            }),

            // Create Template command
            vscode.commands.registerCommand('templateHub.createTemplate', () => {
                vscode.window.showInformationMessage('Create Template command executed!');
                templateManager.createTemplateFromCurrentProject();
            }),

            // Import Template command
            vscode.commands.registerCommand('templateHub.importTemplate', () => {
                vscode.window.showInformationMessage('Import Template command executed!');
                templateManager.importTemplate();
            }),

            // Export Template command
            vscode.commands.registerCommand('templateHub.exportTemplate', (template) => {
                vscode.window.showInformationMessage('Export Template command executed!');
                templateManager.exportTemplate(template);
            }),

            // Refresh Templates command
            vscode.commands.registerCommand('templateHub.refreshTemplates', () => {
                vscode.window.showInformationMessage('Refreshing templates...');
                templateExplorerProvider.refresh();
            }),

            // Edit Template command
            vscode.commands.registerCommand('templateHub.editTemplate', (template) => {
                vscode.window.showInformationMessage('Edit Template command executed!');
                templateManager.editTemplate(template);
            }),

            // Delete Template command
            vscode.commands.registerCommand('templateHub.deleteTemplate', (template) => {
                vscode.window.showInformationMessage('Delete Template command executed!');
                templateManager.deleteTemplate(template);
            }),

            // Duplicate Template command
            vscode.commands.registerCommand('templateHub.duplicateTemplate', (template) => {
                vscode.window.showInformationMessage('Duplicate Template command executed!');
                templateManager.duplicateTemplate(template);
            }),

            // Preview Template command
            vscode.commands.registerCommand('templateHub.previewTemplate', (template) => {
                vscode.window.showInformationMessage('Preview Template command executed!');
                templateManager.previewTemplate(template);
            })
        ];

        context.subscriptions.push(...commands);

        // Set up file watchers for auto-refresh
        const config = vscode.workspace.getConfiguration('templateHub');
        if (config.get('autoRefresh', true)) {
            const templatesPath = templateManager.getTemplatesPath();
            const fileWatcher = vscode.workspace.createFileSystemWatcher(`${templatesPath}/**/*`);
            
            fileWatcher.onDidChange(() => templateExplorerProvider.refresh());
            fileWatcher.onDidCreate(() => templateExplorerProvider.refresh());
            fileWatcher.onDidDelete(() => templateExplorerProvider.refresh());
            
            context.subscriptions.push(fileWatcher);
        }

        console.log('Template Hub commands registered successfully!');
        vscode.window.showInformationMessage('🚀 Template Hub is now active and ready to use!');
        
    } catch (error) {
        console.error('Failed to activate Template Hub:', error);
        vscode.window.showErrorMessage(`Failed to activate Template Hub: ${error}`);
    }
}

export function deactivate() {
    console.log('Template Hub is now deactivated!');
} 