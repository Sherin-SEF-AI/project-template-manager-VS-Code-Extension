import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export class GitUtils {
    public static async getAuthorName(): Promise<string> {
        try {
            const { stdout } = await execAsync('git config --global user.name');
            return stdout.trim();
        } catch (error) {
            return 'Unknown Author';
        }
    }

    public static async getAuthorEmail(): Promise<string> {
        try {
            const { stdout } = await execAsync('git config --global user.email');
            return stdout.trim();
        } catch (error) {
            return 'unknown@example.com';
        }
    }

    public static async getLocalAuthorName(): Promise<string> {
        try {
            const { stdout } = await execAsync('git config user.name');
            return stdout.trim();
        } catch (error) {
            return await this.getAuthorName();
        }
    }

    public static async getLocalAuthorEmail(): Promise<string> {
        try {
            const { stdout } = await execAsync('git config user.email');
            return stdout.trim();
        } catch (error) {
            return await this.getAuthorEmail();
        }
    }
} 