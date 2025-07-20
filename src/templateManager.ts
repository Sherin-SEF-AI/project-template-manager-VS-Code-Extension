import * as vscode from 'vscode';
import * as fs from 'fs-extra';
import * as path from 'path';
import * as os from 'os';
import * as archiver from 'archiver';
import extract from 'extract-zip';
import { Template, TemplateConfig, TemplateVariable, TemplateVariableValue, ProjectCreationOptions } from './types';
import { VariableSubstitutor } from './utils/variableSubstitutor';
import { GitUtils } from './utils/gitUtils';

export class TemplateManager {
    private context: vscode.ExtensionContext;
    private templatesPath: string;

    constructor(context: vscode.ExtensionContext) {
        this.context = context;
        this.templatesPath = this.getTemplatesPath();
        this.ensureTemplatesDirectory();
    }

    public getTemplatesPath(): string {
        const config = vscode.workspace.getConfiguration('templateHub');
        const configuredPath = config.get('templatesPath', '~/.vscode/templates');
        return configuredPath.replace('~', os.homedir());
    }

    private async ensureTemplatesDirectory(): Promise<void> {
        try {
            await fs.ensureDir(this.templatesPath);
        } catch (error) {
            vscode.window.showErrorMessage(`Failed to create templates directory: ${error}`);
        }
    }

    public async getAllTemplates(): Promise<Template[]> {
        const templates: Template[] = [];
        
        try {
            const templateDirs = await fs.readdir(this.templatesPath);
            
            for (const dir of templateDirs) {
                const templatePath = path.join(this.templatesPath, dir);
                const configPath = path.join(templatePath, '.template-config.json');
                
                if (await fs.pathExists(configPath)) {
                    try {
                        const configContent = await fs.readFile(configPath, 'utf8');
                        const config: TemplateConfig = JSON.parse(configContent);
                        
                        const stats = await fs.stat(templatePath);
                        const fileCount = await this.countFiles(templatePath);
                        
                        templates.push({
                            id: dir,
                            path: templatePath,
                            config,
                            fileCount,
                            size: stats.size
                        });
                    } catch (error) {
                        console.warn(`Failed to load template ${dir}:`, error);
                    }
                }
            }
        } catch (error) {
            vscode.window.showErrorMessage(`Failed to load templates: ${error}`);
        }
        
        return templates;
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

    public async createTemplateFromCurrentProject(): Promise<void> {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders || workspaceFolders.length === 0) {
            vscode.window.showErrorMessage('No workspace folder open');
            return;
        }

        const projectPath = workspaceFolders[0].uri.fsPath;
        
        // Get template name
        const templateName = await vscode.window.showInputBox({
            prompt: 'Enter template name',
            placeHolder: 'my-template'
        });

        if (!templateName) return;

        // Get template description
        const description = await vscode.window.showInputBox({
            prompt: 'Enter template description',
            placeHolder: 'A template for...'
        });

        if (!description) return;

        // Get category
        const category = await vscode.window.showInputBox({
            prompt: 'Enter template category',
            placeHolder: 'web, mobile, backend, etc.'
        });

        if (!category) return;

        try {
            const templateId = this.generateTemplateId(templateName);
            const templatePath = path.join(this.templatesPath, templateId);
            
            // Copy project files
            await fs.copy(projectPath, templatePath);
            
            // Create template config
            const config: TemplateConfig = {
                name: templateName,
                description: description,
                author: await GitUtils.getAuthorName(),
                email: await GitUtils.getAuthorEmail(),
                version: '1.0.0',
                tags: [],
                category: category,
                variables: [],
                excludePatterns: ['.git/**', 'node_modules/**', '.vscode/**'],
                includePatterns: ['**/*'],
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };

            await fs.writeFile(
                path.join(templatePath, '.template-config.json'),
                JSON.stringify(config, null, 2)
            );

            vscode.window.showInformationMessage(`Template "${templateName}" created successfully!`);
        } catch (error) {
            vscode.window.showErrorMessage(`Failed to create template: ${error}`);
        }
    }

    public async createProjectFromTemplate(template: Template): Promise<void> {
        try {
            // Get project name
            const projectName = await vscode.window.showInputBox({
                prompt: 'Enter project name',
                placeHolder: 'my-project'
            });

            if (!projectName) return;

            // Get target directory
            const targetUri = await vscode.window.showOpenDialog({
                canSelectFiles: false,
                canSelectFolders: true,
                canSelectMany: false,
                openLabel: 'Select Target Directory'
            });

            if (!targetUri || targetUri.length === 0) return;

            const targetPath = path.join(targetUri[0].fsPath, projectName);

            // Check if target already exists
            if (await fs.pathExists(targetPath)) {
                const overwrite = await vscode.window.showWarningMessage(
                    `Directory "${projectName}" already exists. Overwrite?`,
                    'Yes', 'No'
                );
                if (overwrite !== 'Yes') return;
            }

            // Collect variable values
            const variables = await this.collectVariableValues(template.config.variables);

            // Create project
            await this.generateProject({
                template,
                targetPath,
                projectName,
                variables
            });

            vscode.window.showInformationMessage(`Project "${projectName}" created successfully!`);
            
            // Open the new project
            const newWorkspaceUri = vscode.Uri.file(targetPath);
            await vscode.commands.executeCommand('vscode.openFolder', newWorkspaceUri);
        } catch (error) {
            vscode.window.showErrorMessage(`Failed to create project: ${error}`);
        }
    }

    private async collectVariableValues(variables: TemplateVariable[]): Promise<TemplateVariableValue[]> {
        const values: TemplateVariableValue[] = [];
        
        for (const variable of variables) {
            let value: string | boolean;
            
            switch (variable.type) {
                case 'string':
                    value = await vscode.window.showInputBox({
                        prompt: variable.description,
                        placeHolder: variable.name,
                        value: variable.defaultValue as string || ''
                    }) || '';
                    break;
                    
                case 'select':
                    if (!variable.options || variable.options.length === 0) {
                        value = '';
                        break;
                    }
                    const selected = await vscode.window.showQuickPick(variable.options, {
                        placeHolder: variable.description
                    });
                    value = selected || '';
                    break;
                    
                case 'boolean':
                    const yesNo = await vscode.window.showQuickPick(['Yes', 'No'], {
                        placeHolder: variable.description
                    });
                    value = yesNo === 'Yes';
                    break;
                    
                default:
                    value = '';
            }
            
            values.push({ name: variable.name, value });
        }
        
        return values;
    }

    private async generateProject(options: ProjectCreationOptions): Promise<void> {
        const { template, targetPath, projectName, variables } = options;
        
        // Copy template files
        await fs.copy(template.path, targetPath);
        
        // Remove template config file
        await fs.remove(path.join(targetPath, '.template-config.json'));
        
        // Apply variable substitution
        await VariableSubstitutor.substituteVariables(targetPath, {
            projectName,
            author: await GitUtils.getAuthorName(),
            email: await GitUtils.getAuthorEmail(),
            date: new Date().toLocaleDateString(),
            year: new Date().getFullYear().toString(),
            ...Object.fromEntries(variables.map(v => [v.name, v.value]))
        });
    }

    public async importTemplate(): Promise<void> {
        const fileUri = await vscode.window.showOpenDialog({
            canSelectFiles: true,
            canSelectFolders: false,
            canSelectMany: false,
            filters: {
                'Template Files': ['zip']
            },
            openLabel: 'Select Template File'
        });

        if (!fileUri || fileUri.length === 0) return;

        try {
            const zipPath = fileUri[0].fsPath;
            const extractPath = path.join(this.templatesPath, path.basename(zipPath, '.zip'));
            
            await extract(zipPath, { dir: extractPath });
            
            vscode.window.showInformationMessage('Template imported successfully!');
        } catch (error) {
            vscode.window.showErrorMessage(`Failed to import template: ${error}`);
        }
    }

    public async exportTemplate(template: Template): Promise<void> {
        const saveUri = await vscode.window.showSaveDialog({
            filters: {
                'Template Files': ['zip']
            }
        });

        if (!saveUri) return;

        try {
            const output = fs.createWriteStream(saveUri.fsPath);
            const archive = archiver.create('zip', { zlib: { level: 9 } });

            output.on('close', () => {
                vscode.window.showInformationMessage('Template exported successfully!');
            });

            archive.on('error', (err: any) => {
                vscode.window.showErrorMessage(`Failed to export template: ${err}`);
            });

            archive.pipe(output);
            archive.directory(template.path, false);
            await archive.finalize();
        } catch (error) {
            vscode.window.showErrorMessage(`Failed to export template: ${error}`);
        }
    }

    public async deleteTemplate(template: Template): Promise<void> {
        const confirm = await vscode.window.showWarningMessage(
            `Are you sure you want to delete template "${template.config.name}"?`,
            'Yes', 'No'
        );

        if (confirm === 'Yes') {
            try {
                await fs.remove(template.path);
                vscode.window.showInformationMessage('Template deleted successfully!');
            } catch (error) {
                vscode.window.showErrorMessage(`Failed to delete template: ${error}`);
            }
        }
    }

    public async duplicateTemplate(template: Template): Promise<void> {
        const newName = await vscode.window.showInputBox({
            prompt: 'Enter new template name',
            value: `${template.config.name} (Copy)`
        });

        if (!newName) return;

        try {
            const newId = this.generateTemplateId(newName);
            const newPath = path.join(this.templatesPath, newId);
            
            await fs.copy(template.path, newPath);
            
            // Update config
            const configPath = path.join(newPath, '.template-config.json');
            const config = await fs.readJson(configPath);
            config.name = newName;
            config.updatedAt = new Date().toISOString();
            
            await fs.writeJson(configPath, config, { spaces: 2 });
            
            vscode.window.showInformationMessage('Template duplicated successfully!');
        } catch (error) {
            vscode.window.showErrorMessage(`Failed to duplicate template: ${error}`);
        }
    }

    public async editTemplate(template: Template): Promise<void> {
        // Open template config file for editing
        const configPath = path.join(template.path, '.template-config.json');
        const document = await vscode.workspace.openTextDocument(configPath);
        await vscode.window.showTextDocument(document);
    }

    public async previewTemplate(template: Template): Promise<void> {
        // This will be handled by the preview provider
        vscode.commands.executeCommand('projectTemplateManager.templatePreview.focus');
    }

    private generateTemplateId(name: string): string {
        return name.toLowerCase()
            .replace(/[^a-z0-9]/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '');
    }

    public async showTemplateSelection(): Promise<void> {
        const templates = await this.getAllTemplates();
        
        if (templates.length === 0) {
            vscode.window.showInformationMessage('No templates available. Create a template first!');
            return;
        }

        const templateNames = templates.map(t => t.config.name);
        const selectedTemplateName = await vscode.window.showQuickPick(templateNames, {
            placeHolder: 'Select a template to use'
        });

        if (selectedTemplateName) {
            const selectedTemplate = templates.find(t => t.config.name === selectedTemplateName);
            if (selectedTemplate) {
                await this.createProjectFromTemplate(selectedTemplate);
            }
        }
    }
} 