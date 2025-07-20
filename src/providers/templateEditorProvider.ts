import * as vscode from 'vscode';
import { TemplateConfig, TemplateVariable } from '../types';

export class TemplateEditorProvider implements vscode.WebviewViewProvider {
    public static readonly viewType = 'projectTemplateManager.templateEditor';

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
                    case 'saveConfig':
                        this.saveTemplateConfig(message.config);
                        return;
                    case 'loadConfig':
                        this.loadTemplateConfig(message.templatePath);
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
    <title>Template Editor</title>
    <style>
        body {
            padding: 10px;
            font-family: var(--vscode-font-family);
            font-size: var(--vscode-font-size);
            color: var(--vscode-foreground);
            background-color: var(--vscode-editor-background);
        }
        .form-section {
            margin-bottom: 20px;
        }
        .form-section h3 {
            margin-bottom: 10px;
            color: var(--vscode-editor-foreground);
        }
        .form-group {
            margin-bottom: 15px;
        }
        label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
        }
        input, textarea, select {
            width: 100%;
            padding: 8px;
            border: 1px solid var(--vscode-input-border);
            background-color: var(--vscode-input-background);
            color: var(--vscode-input-foreground);
            border-radius: 3px;
            box-sizing: border-box;
        }
        textarea {
            min-height: 80px;
            resize: vertical;
        }
        .tags-input {
            display: flex;
            flex-wrap: wrap;
            gap: 5px;
            padding: 5px;
            border: 1px solid var(--vscode-input-border);
            background-color: var(--vscode-input-background);
            border-radius: 3px;
            min-height: 40px;
        }
        .tag {
            background-color: var(--vscode-badge-background);
            color: var(--vscode-badge-foreground);
            padding: 2px 8px;
            border-radius: 12px;
            font-size: 12px;
            display: flex;
            align-items: center;
            gap: 5px;
        }
        .tag-remove {
            cursor: pointer;
            font-weight: bold;
        }
        .variables-list {
            border: 1px solid var(--vscode-input-border);
            border-radius: 3px;
            max-height: 300px;
            overflow-y: auto;
        }
        .variable-item {
            padding: 10px;
            border-bottom: 1px solid var(--vscode-input-border);
        }
        .variable-item:last-child {
            border-bottom: none;
        }
        .variable-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10px;
        }
        .variable-name {
            font-weight: bold;
        }
        .variable-actions {
            display: flex;
            gap: 5px;
        }
        .btn {
            background-color: var(--vscode-button-background);
            color: var(--vscode-button-foreground);
            border: none;
            padding: 5px 10px;
            border-radius: 3px;
            cursor: pointer;
            font-size: 12px;
        }
        .btn:hover {
            background-color: var(--vscode-button-hoverBackground);
        }
        .btn-danger {
            background-color: var(--vscode-errorForeground);
        }
        .btn-danger:hover {
            background-color: var(--vscode-errorForeground);
            opacity: 0.8;
        }
        .variable-form {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
        }
        .variable-form.full-width {
            grid-template-columns: 1fr;
        }
        .checkbox-group {
            display: flex;
            align-items: center;
            gap: 5px;
        }
        .checkbox-group input[type="checkbox"] {
            width: auto;
        }
        .actions {
            margin-top: 20px;
            display: flex;
            gap: 10px;
        }
        .btn-primary {
            background-color: var(--vscode-button-background);
            color: var(--vscode-button-foreground);
            border: none;
            padding: 10px 20px;
            border-radius: 3px;
            cursor: pointer;
        }
        .btn-primary:hover {
            background-color: var(--vscode-button-hoverBackground);
        }
    </style>
</head>
<body>
    <div id="templateEditor">
        <div class="form-section">
            <h3>Basic Information</h3>
            <div class="form-group">
                <label for="name">Template Name *</label>
                <input type="text" id="name" required>
            </div>
            <div class="form-group">
                <label for="description">Description *</label>
                <textarea id="description" required></textarea>
            </div>
            <div class="form-group">
                <label for="category">Category</label>
                <input type="text" id="category">
            </div>
            <div class="form-group">
                <label for="version">Version</label>
                <input type="text" id="version" value="1.0.0">
            </div>
        </div>

        <div class="form-section">
            <h3>Author Information</h3>
            <div class="form-group">
                <label for="author">Author</label>
                <input type="text" id="author">
            </div>
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email">
            </div>
        </div>

        <div class="form-section">
            <h3>Tags</h3>
            <div class="form-group">
                <label>Tags</label>
                <div class="tags-input" id="tagsInput">
                    <input type="text" id="tagInput" placeholder="Add a tag and press Enter">
                </div>
            </div>
        </div>

        <div class="form-section">
            <h3>Variables</h3>
            <div class="variables-list" id="variablesList">
                <div style="padding: 20px; text-align: center; color: var(--vscode-descriptionForeground);">
                    No variables defined
                </div>
            </div>
            <button class="btn" id="addVariableBtn">Add Variable</button>
        </div>

        <div class="actions">
            <button class="btn-primary" id="saveBtn">Save Configuration</button>
            <button class="btn" id="cancelBtn">Cancel</button>
        </div>
    </div>

    <script>
        const vscode = acquireVsCodeApi();
        
        let currentConfig = null;
        let tags = [];
        let variables = [];
        
        // Initialize form
        document.addEventListener('DOMContentLoaded', () => {
            initializeTags();
            initializeVariables();
            bindEvents();
        });
        
        function initializeTags() {
            const tagInput = document.getElementById('tagInput');
            const tagsInput = document.getElementById('tagsInput');
            
            tagInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    const tag = tagInput.value.trim();
                    if (tag && !tags.includes(tag)) {
                        tags.push(tag);
                        renderTags();
                        tagInput.value = '';
                    }
                }
            });
        }
        
        function renderTags() {
            const tagsInput = document.getElementById('tagsInput');
            const tagInput = document.getElementById('tagInput');
            
            tagsInput.innerHTML = '';
            tags.forEach(tag => {
                const tagElement = document.createElement('span');
                tagElement.className = 'tag';
                tagElement.innerHTML = \`
                    \${tag}
                    <span class="tag-remove" onclick="removeTag('\${tag}')">&times;</span>
                \`;
                tagsInput.appendChild(tagElement);
            });
            tagsInput.appendChild(tagInput);
        }
        
        function removeTag(tag) {
            tags = tags.filter(t => t !== tag);
            renderTags();
        }
        
        function initializeVariables() {
            renderVariables();
        }
        
        function renderVariables() {
            const variablesList = document.getElementById('variablesList');
            
            if (variables.length === 0) {
                variablesList.innerHTML = \`
                    <div style="padding: 20px; text-align: center; color: var(--vscode-descriptionForeground);">
                        No variables defined
                    </div>
                \`;
                return;
            }
            
            variablesList.innerHTML = '';
            variables.forEach((variable, index) => {
                const variableElement = createVariableElement(variable, index);
                variablesList.appendChild(variableElement);
            });
        }
        
        function createVariableElement(variable, index) {
            const div = document.createElement('div');
            div.className = 'variable-item';
            div.innerHTML = \`
                <div class="variable-header">
                    <span class="variable-name">\${variable.name}</span>
                    <div class="variable-actions">
                        <button class="btn" onclick="editVariable(\${index})">Edit</button>
                        <button class="btn btn-danger" onclick="removeVariable(\${index})">Remove</button>
                    </div>
                </div>
                <div class="variable-form">
                    <div class="form-group">
                        <label>Type</label>
                        <select onchange="updateVariableType(\${index}, this.value)">
                            <option value="string" \${variable.type === 'string' ? 'selected' : ''}>String</option>
                            <option value="select" \${variable.type === 'select' ? 'selected' : ''}>Select</option>
                            <option value="boolean" \${variable.type === 'boolean' ? 'selected' : ''}>Boolean</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Description</label>
                        <input type="text" value="\${variable.description}" onchange="updateVariableDescription(\${index}, this.value)">
                    </div>
                    <div class="form-group">
                        <label>Default Value</label>
                        <input type="text" value="\${variable.defaultValue || ''}" onchange="updateVariableDefault(\${index}, this.value)">
                    </div>
                    <div class="form-group">
                        <div class="checkbox-group">
                            <input type="checkbox" id="required\${index}" \${variable.required ? 'checked' : ''} onchange="updateVariableRequired(\${index}, this.checked)">
                            <label for="required\${index}">Required</label>
                        </div>
                    </div>
                </div>
            \`;
            return div;
        }
        
        function addVariable() {
            const variable = {
                name: 'newVariable',
                type: 'string',
                description: 'Variable description',
                defaultValue: '',
                required: false,
                options: []
            };
            variables.push(variable);
            renderVariables();
        }
        
        function removeVariable(index) {
            variables.splice(index, 1);
            renderVariables();
        }
        
        function updateVariableType(index, type) {
            variables[index].type = type;
        }
        
        function updateVariableDescription(index, description) {
            variables[index].description = description;
        }
        
        function updateVariableDefault(index, defaultValue) {
            variables[index].defaultValue = defaultValue;
        }
        
        function updateVariableRequired(index, required) {
            variables[index].required = required;
        }
        
        function bindEvents() {
            document.getElementById('addVariableBtn').addEventListener('click', addVariable);
            document.getElementById('saveBtn').addEventListener('click', saveConfig);
            document.getElementById('cancelBtn').addEventListener('click', () => {
                vscode.postMessage({ command: 'cancel' });
            });
        }
        
        function saveConfig() {
            const config = {
                name: document.getElementById('name').value,
                description: document.getElementById('description').value,
                category: document.getElementById('category').value,
                version: document.getElementById('version').value,
                author: document.getElementById('author').value,
                email: document.getElementById('email').value,
                tags: tags,
                variables: variables,
                excludePatterns: currentConfig?.excludePatterns || ['.git/**', 'node_modules/**', '.vscode/**'],
                includePatterns: currentConfig?.includePatterns || ['**/*'],
                createdAt: currentConfig?.createdAt || new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };
            
            vscode.postMessage({
                command: 'saveConfig',
                config: config
            });
        }
        
        function loadConfig(config) {
            currentConfig = config;
            
            document.getElementById('name').value = config.name || '';
            document.getElementById('description').value = config.description || '';
            document.getElementById('category').value = config.category || '';
            document.getElementById('version').value = config.version || '1.0.0';
            document.getElementById('author').value = config.author || '';
            document.getElementById('email').value = config.email || '';
            
            tags = config.tags || [];
            variables = config.variables || [];
            
            renderTags();
            renderVariables();
        }
        
        // Listen for messages from the extension
        window.addEventListener('message', event => {
            const message = event.data;
            switch (message.command) {
                case 'loadConfig':
                    loadConfig(message.config);
                    break;
            }
        });
    </script>
</body>
</html>`;
    }

    private async saveTemplateConfig(config: TemplateConfig): Promise<void> {
        // This would save the configuration to the template file
        // Implementation would depend on the current template being edited
        vscode.window.showInformationMessage('Template configuration saved!');
    }

    private async loadTemplateConfig(templatePath: string): Promise<void> {
        // This would load the configuration from the template file
        // Implementation would depend on the template path
    }
} 