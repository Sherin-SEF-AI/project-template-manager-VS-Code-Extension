export interface TemplateVariable {
    name: string;
    type: 'string' | 'select' | 'boolean';
    description: string;
    defaultValue?: string | boolean;
    required: boolean;
    options?: string[]; // For select type
    validation?: {
        pattern?: string;
        minLength?: number;
        maxLength?: number;
    };
}

export interface TemplateConfig {
    name: string;
    description: string;
    author: string;
    email: string;
    version: string;
    tags: string[];
    category: string;
    variables: TemplateVariable[];
    excludePatterns: string[];
    includePatterns: string[];
    createdAt: string;
    updatedAt: string;
}

export interface Template {
    id: string;
    path: string;
    config: TemplateConfig;
    fileCount: number;
    size: number;
}

export interface TemplateVariableValue {
    name: string;
    value: string | boolean;
}

export interface ProjectCreationOptions {
    template: Template;
    targetPath: string;
    projectName: string;
    variables: TemplateVariableValue[];
}

export interface TemplateFile {
    path: string;
    isDirectory: boolean;
    size: number;
    children?: TemplateFile[];
}

export interface TemplatePreview {
    template: Template;
    fileStructure: TemplateFile[];
    variables: TemplateVariable[];
} 