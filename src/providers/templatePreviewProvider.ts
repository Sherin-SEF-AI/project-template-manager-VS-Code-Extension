import * as vscode from 'vscode';
import * as fs from 'fs-extra';
import * as path from 'path';
import { Template, TemplateFile } from '../types';

export class TemplatePreviewProvider implements vscode.WebviewViewProvider {
    public static readonly viewType = 'projectTemplateManager.templatePreview';

    constructor(private readonly _extensionUri: vscode.Uri) {}

    public resolveWebviewView(
        webviewView: vscode.WebviewView,
        context: vscode.WebviewViewResolveContext,
        _token: vscode.CancellationToken,
    ) {
        webviewView.webview.options = {
            enableScripts: true,
            localResourceRoots: [this._extensionUri]
        };

        webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);

        // Handle messages from the webview
        webviewView.webview.onDidReceiveMessage(
            (message: any) => {
                switch (message.command) {
                    case 'loadTemplate':
                        this.loadTemplatePreview(message.templatePath);
                        return;
                }
            }
        );
    }

    private _getHtmlForWebview(webview: vscode.Webview) {
        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Template Preview</title>
    <style>
        body {
            padding: 10px;
            font-family: var(--vscode-font-family);
            font-size: var(--vscode-font-size);
            color: var(--vscode-foreground);
            background-color: var(--vscode-editor-background);
        }
        .template-info {
            margin-bottom: 20px;
            padding: 10px;
            background-color: var(--vscode-editor-inactiveSelectionBackground);
            border-radius: 5px;
        }
        .template-name {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 5px;
        }
        .template-description {
            color: var(--vscode-descriptionForeground);
            margin-bottom: 10px;
        }
        .template-meta {
            font-size: 12px;
            color: var(--vscode-descriptionForeground);
        }
        .file-tree {
            font-family: 'Courier New', monospace;
            font-size: 13px;
        }
        .file-item {
            padding: 2px 0;
            cursor: pointer;
        }
        .file-item:hover {
            background-color: var(--vscode-list-hoverBackground);
        }
        .file-item.directory {
            font-weight: bold;
        }
        .file-item.file {
            padding-left: 20px;
        }
        .file-icon {
            margin-right: 5px;
        }
        .variables-section {
            margin-top: 20px;
            padding: 10px;
            background-color: var(--vscode-editor-inactiveSelectionBackground);
            border-radius: 5px;
        }
        .variable-item {
            margin: 5px 0;
            padding: 5px;
            background-color: var(--vscode-input-background);
            border-radius: 3px;
        }
        .variable-name {
            font-weight: bold;
        }
        .variable-type {
            color: var(--vscode-descriptionForeground);
            font-size: 12px;
        }
        .variable-description {
            color: var(--vscode-descriptionForeground);
            font-size: 12px;
            margin-top: 2px;
        }
    </style>
</head>
<body>
    <div id="templatePreview">
        <div class="template-info" id="templateInfo">
            <div class="template-name">Select a template to preview</div>
        </div>
        
        <div class="file-tree" id="fileTree">
            <div>No template selected</div>
        </div>
        
        <div class="variables-section" id="variablesSection" style="display: none;">
            <h4>Template Variables</h4>
            <div id="variablesList"></div>
        </div>
    </div>

    <script>
        const vscode = acquireVsCodeApi();
        
        function renderTemplateInfo(template) {
            const infoDiv = document.getElementById('templateInfo');
            infoDiv.innerHTML = \`
                <div class="template-name">\${template.config.name}</div>
                <div class="template-description">\${template.config.description}</div>
                <div class="template-meta">
                    Author: \${template.config.author} | 
                    Category: \${template.config.category} | 
                    Files: \${template.fileCount} | 
                    Version: \${template.config.version}
                </div>
            \`;
        }
        
        function renderFileTree(files) {
            const treeDiv = document.getElementById('fileTree');
            treeDiv.innerHTML = '';
            
            function renderFile(file, level = 0) {
                const fileDiv = document.createElement('div');
                fileDiv.className = 'file-item ' + (file.isDirectory ? 'directory' : 'file');
                fileDiv.style.paddingLeft = (level * 20) + 'px';
                
                const icon = document.createElement('span');
                icon.className = 'file-icon';
                icon.textContent = file.isDirectory ? '📁' : '📄';
                
                const name = document.createElement('span');
                name.textContent = file.path.split('/').pop();
                
                fileDiv.appendChild(icon);
                fileDiv.appendChild(name);
                
                if (file.isDirectory && file.children) {
                    file.children.forEach(child => {
                        fileDiv.appendChild(renderFile(child, level + 1));
                    });
                }
                
                return fileDiv;
            }
            
            files.forEach(file => {
                treeDiv.appendChild(renderFile(file));
            });
        }
        
        function renderVariables(variables) {
            const section = document.getElementById('variablesSection');
            const list = document.getElementById('variablesList');
            
            if (variables.length === 0) {
                section.style.display = 'none';
                return;
            }
            
            section.style.display = 'block';
            list.innerHTML = '';
            
            variables.forEach(variable => {
                const varDiv = document.createElement('div');
                varDiv.className = 'variable-item';
                varDiv.innerHTML = \`
                    <div class="variable-name">\${variable.name}\${variable.required ? ' *' : ''}</div>
                    <div class="variable-type">Type: \${variable.type}</div>
                    <div class="variable-description">\${variable.description}</div>
                \`;
                list.appendChild(varDiv);
            });
        }
        
        // Listen for messages from the extension
        window.addEventListener('message', event => {
            const message = event.data;
            switch (message.command) {
                case 'updatePreview':
                    if (message.template) {
                        renderTemplateInfo(message.template);
                        renderFileTree(message.fileStructure);
                        renderVariables(message.variables);
                    }
                    break;
            }
        });
    </script>
</body>
</html>`;
    }

    private async loadTemplatePreview(templatePath: string) {
        try {
            const template = await this.loadTemplate(templatePath);
            const fileStructure = await this.getFileStructure(templatePath);
            
            // Send data to webview
            // This would be implemented with a proper message passing system
        } catch (error) {
            console.error('Failed to load template preview:', error);
        }
    }

    private async loadTemplate(templatePath: string): Promise<Template> {
        const configPath = path.join(templatePath, '.template-config.json');
        const configContent = await fs.readFile(configPath, 'utf8');
        const config = JSON.parse(configContent);
        
        const stats = await fs.stat(templatePath);
        const fileCount = await this.countFiles(templatePath);
        
        return {
            id: path.basename(templatePath),
            path: templatePath,
            config,
            fileCount,
            size: stats.size
        };
    }

    private async getFileStructure(templatePath: string): Promise<TemplateFile[]> {
        const files: TemplateFile[] = [];
        
        async function scanDirectory(dirPath: string, relativePath: string = ''): Promise<TemplateFile[]> {
            const items = await fs.readdir(dirPath);
            const result: TemplateFile[] = [];
            
            for (const item of items) {
                if (item === '.template-config.json') continue;
                
                const itemPath = path.join(dirPath, item);
                const itemRelativePath = relativePath ? path.join(relativePath, item) : item;
                const stats = await fs.stat(itemPath);
                
                if (stats.isDirectory()) {
                    const children = await scanDirectory(itemPath, itemRelativePath);
                    result.push({
                        path: itemRelativePath,
                        isDirectory: true,
                        size: 0,
                        children
                    });
                } else {
                    result.push({
                        path: itemRelativePath,
                        isDirectory: false,
                        size: stats.size
                    });
                }
            }
            
            return result;
        }
        
        return scanDirectory(templatePath);
    }

    private async countFiles(dirPath: string): Promise<number> {
        let count = 0;
        const items = await fs.readdir(dirPath);
        
        for (const item of items) {
            if (item === '.template-config.json') continue;
            
            const itemPath = path.join(dirPath, item);
            const stats = await fs.stat(itemPath);
            
            if (stats.isDirectory()) {
                count += await this.countFiles(itemPath);
            } else {
                count++;
            }
        }
        
        return count;
    }
} 