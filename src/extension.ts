import * as vscode from 'vscode';
import { TemplateManager } from './templateManager';
import { TemplateExplorerProvider } from './providers/templateExplorerProvider';
import { VariableInputProvider } from './providers/variableInputProvider';
import { TemplatePreviewProvider } from './providers/templatePreviewProvider';
import { TemplateEditorProvider } from './providers/templateEditorProvider';

export function activate(context: vscode.ExtensionContext) {
    console.log('Project Template Manager is now active!');

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

    // Register commands
    const commands = [
        vscode.commands.registerCommand('projectTemplateManager.createTemplate', () => {
            templateManager.createTemplateFromCurrentProject();
        }),
        vscode.commands.registerCommand('projectTemplateManager.createProjectFromTemplate', (template) => {
            templateManager.createProjectFromTemplate(template);
        }),
        vscode.commands.registerCommand('projectTemplateManager.importTemplate', () => {
            templateManager.importTemplate();
        }),
        vscode.commands.registerCommand('projectTemplateManager.exportTemplate', (template) => {
            templateManager.exportTemplate(template);
        }),
        vscode.commands.registerCommand('projectTemplateManager.refreshTemplates', () => {
            templateExplorerProvider.refresh();
        }),
        vscode.commands.registerCommand('projectTemplateManager.editTemplate', (template) => {
            templateManager.editTemplate(template);
        }),
        vscode.commands.registerCommand('projectTemplateManager.deleteTemplate', (template) => {
            templateManager.deleteTemplate(template);
        }),
        vscode.commands.registerCommand('projectTemplateManager.duplicateTemplate', (template) => {
            templateManager.duplicateTemplate(template);
        }),
        vscode.commands.registerCommand('projectTemplateManager.previewTemplate', (template) => {
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
}

export function deactivate() {
    console.log('Project Template Manager is now deactivated!');
} 