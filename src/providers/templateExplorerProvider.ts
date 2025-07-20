import * as vscode from 'vscode';
import { Template } from '../types';
import { TemplateManager } from '../templateManager';

export class TemplateExplorerProvider implements vscode.TreeDataProvider<BaseTreeItem> {
    private _onDidChangeTreeData: vscode.EventEmitter<BaseTreeItem | undefined | null | void> = new vscode.EventEmitter<BaseTreeItem | undefined | null | void>();
    readonly onDidChangeTreeData: vscode.Event<BaseTreeItem | undefined | null | void> = this._onDidChangeTreeData.event;

    constructor(private templateManager: TemplateManager) {}

    refresh(): void {
        this._onDidChangeTreeData.fire();
    }

    getTreeItem(element: BaseTreeItem): vscode.TreeItem {
        return element;
    }

    async getChildren(element?: BaseTreeItem): Promise<BaseTreeItem[]> {
        if (element) {
            // Return children of the element
            return element.getChildren();
        } else {
            // Return root level items (categories)
            const templates = await this.templateManager.getAllTemplates();
            return this.groupTemplatesByCategory(templates);
        }
    }

    private groupTemplatesByCategory(templates: Template[]): BaseTreeItem[] {
        const categories = new Map<string, Template[]>();
        
        // Group templates by category
        for (const template of templates) {
            const category = template.config.category || 'Uncategorized';
            if (!categories.has(category)) {
                categories.set(category, []);
            }
            categories.get(category)!.push(template);
        }

        // Create category items
        const categoryItems: BaseTreeItem[] = [];
        for (const [categoryName, categoryTemplates] of categories) {
            const categoryItem = new CategoryTreeItem(categoryName, categoryTemplates);
            categoryItems.push(categoryItem);
        }

        return categoryItems.sort((a, b) => (a.label as string).localeCompare(b.label as string));
    }
}

export abstract class BaseTreeItem extends vscode.TreeItem {
    abstract getChildren(): Promise<BaseTreeItem[]>;
}

export class CategoryTreeItem extends BaseTreeItem {
    constructor(
        public readonly label: string,
        private templates: Template[]
    ) {
        super(label, vscode.TreeItemCollapsibleState.Collapsed);
        this.iconPath = new vscode.ThemeIcon('folder');
        this.contextValue = 'category';
    }

    async getChildren(): Promise<BaseTreeItem[]> {
        return this.templates.map(template => new TemplateTreeItem(template));
    }
}

export class TemplateTreeItem extends BaseTreeItem {
    constructor(public readonly template: Template) {
        super(template.config.name, vscode.TreeItemCollapsibleState.None);
        
        this.tooltip = template.config.description;
        this.description = `${template.fileCount} files`;
        this.iconPath = new vscode.ThemeIcon('file');
        this.contextValue = 'template';
        
        // Add command to create project from template
        this.command = {
            command: 'projectTemplateManager.createProjectFromTemplate',
            title: 'Create Project from Template',
            arguments: [template]
        };
    }

    async getChildren(): Promise<BaseTreeItem[]> {
        return [];
    }
} 