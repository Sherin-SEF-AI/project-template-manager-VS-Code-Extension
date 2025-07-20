import * as vscode from 'vscode';
import { TemplateVariable } from '../types';

export class VariableInputProvider implements vscode.WebviewViewProvider {
    public static readonly viewType = 'projectTemplateManager.variableInput';

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
            message => {
                switch (message.command) {
                    case 'submitVariables':
                        this.handleVariableSubmission(message.variables);
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
    <title>Template Variables</title>
    <style>
        body {
            padding: 10px;
            font-family: var(--vscode-font-family);
            font-size: var(--vscode-font-size);
            color: var(--vscode-foreground);
            background-color: var(--vscode-editor-background);
        }
        .form-group {
            margin-bottom: 15px;
        }
        label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
        }
        input, select, textarea {
            width: 100%;
            padding: 8px;
            border: 1px solid var(--vscode-input-border);
            background-color: var(--vscode-input-background);
            color: var(--vscode-input-foreground);
            border-radius: 3px;
        }
        button {
            background-color: var(--vscode-button-background);
            color: var(--vscode-button-foreground);
            border: none;
            padding: 8px 16px;
            border-radius: 3px;
            cursor: pointer;
            margin-right: 8px;
        }
        button:hover {
            background-color: var(--vscode-button-hoverBackground);
        }
        .error {
            color: var(--vscode-errorForeground);
            font-size: 12px;
            margin-top: 5px;
        }
    </style>
</head>
<body>
    <div id="variableForm">
        <h3>Template Variables</h3>
        <div id="variables"></div>
        <div style="margin-top: 20px;">
            <button id="submitBtn">Create Project</button>
            <button id="cancelBtn">Cancel</button>
        </div>
    </div>

    <script>
        const vscode = acquireVsCodeApi();
        
        let variables = [];
        
        function createVariableInput(variable) {
            const container = document.createElement('div');
            container.className = 'form-group';
            
            const label = document.createElement('label');
            label.textContent = variable.name + (variable.required ? ' *' : '');
            label.title = variable.description;
            
            const input = document.createElement('input');
            input.id = variable.name;
            input.required = variable.required;
            
            if (variable.type === 'select' && variable.options) {
                input.type = 'hidden';
                const select = document.createElement('select');
                select.id = variable.name;
                select.required = variable.required;
                
                const defaultOption = document.createElement('option');
                defaultOption.value = '';
                defaultOption.textContent = 'Select an option...';
                select.appendChild(defaultOption);
                
                variable.options.forEach(option => {
                    const optionElement = document.createElement('option');
                    optionElement.value = option;
                    optionElement.textContent = option;
                    if (option === variable.defaultValue) {
                        optionElement.selected = true;
                    }
                    select.appendChild(optionElement);
                });
                
                container.appendChild(label);
                container.appendChild(select);
            } else if (variable.type === 'boolean') {
                input.type = 'checkbox';
                input.checked = variable.defaultValue || false;
                container.appendChild(label);
                container.appendChild(input);
            } else {
                input.type = 'text';
                input.placeholder = variable.description;
                input.value = variable.defaultValue || '';
                container.appendChild(label);
                container.appendChild(input);
            }
            
            return container;
        }
        
        function loadVariables(vars) {
            variables = vars;
            const container = document.getElementById('variables');
            container.innerHTML = '';
            
            vars.forEach(variable => {
                container.appendChild(createVariableInput(variable));
            });
        }
        
        function collectVariables() {
            const values = [];
            variables.forEach(variable => {
                const element = document.getElementById(variable.name);
                let value;
                
                if (variable.type === 'boolean') {
                    value = element.checked;
                } else {
                    value = element.value;
                }
                
                values.push({
                    name: variable.name,
                    value: value
                });
            });
            return values;
        }
        
        document.getElementById('submitBtn').addEventListener('click', () => {
            const variableValues = collectVariables();
            vscode.postMessage({
                command: 'submitVariables',
                variables: variableValues
            });
        });
        
        document.getElementById('cancelBtn').addEventListener('click', () => {
            vscode.postMessage({
                command: 'cancel'
            });
        });
        
        // Listen for messages from the extension
        window.addEventListener('message', event => {
            const message = event.data;
            switch (message.command) {
                case 'loadVariables':
                    loadVariables(message.variables);
                    break;
            }
        });
    </script>
</body>
</html>`;
    }

    private handleVariableSubmission(variables: any[]) {
        // This will be handled by the template manager
        vscode.commands.executeCommand('projectTemplateManager.createProjectWithVariables', variables);
    }
} 