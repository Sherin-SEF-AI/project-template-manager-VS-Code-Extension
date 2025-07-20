import * as fs from 'fs-extra';
import * as path from 'path';

export class VariableSubstitutor {
    public static async substituteVariables(targetPath: string, variables: Record<string, string | boolean>): Promise<void> {
        await this.processDirectory(targetPath, variables);
    }

    private static async processDirectory(dirPath: string, variables: Record<string, string | boolean>): Promise<void> {
        const items = await fs.readdir(dirPath);
        
        for (const item of items) {
            const itemPath = path.join(dirPath, item);
            const stats = await fs.stat(itemPath);
            
            if (stats.isDirectory()) {
                // Process subdirectory
                await this.processDirectory(itemPath, variables);
                
                // Rename directory if it contains variables
                const newName = this.substituteInString(item, variables);
                if (newName !== item) {
                    const newPath = path.join(dirPath, newName);
                    await fs.move(itemPath, newPath);
                }
            } else {
                // Process file
                await this.processFile(itemPath, variables);
                
                // Rename file if it contains variables
                const newName = this.substituteInString(item, variables);
                if (newName !== item) {
                    const newPath = path.join(dirPath, newName);
                    await fs.move(itemPath, newPath);
                }
            }
        }
    }

    private static async processFile(filePath: string, variables: Record<string, string | boolean>): Promise<void> {
        try {
            const content = await fs.readFile(filePath, 'utf8');
            const newContent = this.substituteInString(content, variables);
            
            if (newContent !== content) {
                await fs.writeFile(filePath, newContent, 'utf8');
            }
        } catch (error) {
            // Skip binary files or files that can't be read as text
            console.warn(`Skipping file ${filePath}: ${error}`);
        }
    }

    private static substituteInString(text: string, variables: Record<string, string | boolean>): string {
        let result = text;
        
        for (const [key, value] of Object.entries(variables)) {
            const pattern = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
            result = result.replace(pattern, String(value));
        }
        
        return result;
    }
} 