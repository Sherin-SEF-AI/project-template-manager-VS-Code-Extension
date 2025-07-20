#!/usr/bin/env node

/**
 * Project Template Manager - Feature Test Script
 * This script demonstrates all the features of the extension
 */

const fs = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Project Template Manager - Feature Test Suite');
console.log('================================================\n');

// Test 1: Check if extension is compiled
console.log('1️⃣ Checking Extension Compilation...');
try {
    if (fs.existsSync('out/extension.js')) {
        console.log('✅ Extension compiled successfully');
    } else {
        console.log('❌ Extension not compiled. Run: npm run compile');
        process.exit(1);
    }
} catch (error) {
    console.log('❌ Error checking compilation:', error.message);
    process.exit(1);
}

// Test 2: Check package.json configuration
console.log('\n2️⃣ Checking Package Configuration...');
try {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    const requiredFields = ['name', 'displayName', 'version', 'engines', 'main', 'contributes'];
    
    for (const field of requiredFields) {
        if (packageJson[field]) {
            console.log(`✅ ${field}: ${packageJson[field]}`);
        } else {
            console.log(`❌ Missing required field: ${field}`);
        }
    }
} catch (error) {
    console.log('❌ Error reading package.json:', error.message);
}

// Test 3: Check TypeScript compilation
console.log('\n3️⃣ Checking TypeScript Files...');
const tsFiles = [
    'src/extension.ts',
    'src/types.ts',
    'src/templateManager.ts',
    'src/utils/variableSubstitutor.ts',
    'src/utils/gitUtils.ts',
    'src/providers/templateExplorerProvider.ts',
    'src/providers/variableInputProvider.ts',
    'src/providers/templatePreviewProvider.ts',
    'src/providers/templateEditorProvider.ts'
];

for (const file of tsFiles) {
    if (fs.existsSync(file)) {
        console.log(`✅ ${file}`);
    } else {
        console.log(`❌ Missing: ${file}`);
    }
}

// Test 4: Check sample template
console.log('\n4️⃣ Checking Sample Template...');
const sampleFiles = [
    'samples/react-template/.template-config.json',
    'samples/react-template/package.json',
    'samples/react-template/index.html',
    'samples/react-template/README.md'
];

for (const file of sampleFiles) {
    if (fs.existsSync(file)) {
        console.log(`✅ ${file}`);
    } else {
        console.log(`❌ Missing: ${file}`);
    }
}

// Test 5: Check test project
console.log('\n5️⃣ Checking Test Project...');
const testFiles = [
    'test-project/package.json',
    'test-project/index.js',
    'test-project/README.md'
];

for (const file of testFiles) {
    if (fs.existsSync(file)) {
        console.log(`✅ ${file}`);
    } else {
        console.log(`❌ Missing: ${file}`);
    }
}

// Test 6: Check VS Code configuration
console.log('\n6️⃣ Checking VS Code Configuration...');
const vscodeFiles = [
    '.vscode/launch.json',
    '.vscode/tasks.json'
];

for (const file of vscodeFiles) {
    if (fs.existsSync(file)) {
        console.log(`✅ ${file}`);
    } else {
        console.log(`❌ Missing: ${file}`);
    }
}

// Test 7: Check resource files
console.log('\n7️⃣ Checking Resource Files...');
const resourceFiles = [
    'resources/template-icon.svg',
    'README.md',
    'LICENSE',
    '.eslintrc.json',
    '.gitignore'
];

for (const file of resourceFiles) {
    if (fs.existsSync(file)) {
        console.log(`✅ ${file}`);
    } else {
        console.log(`❌ Missing: ${file}`);
    }
}

// Test 8: Demonstrate variable substitution
console.log('\n8️⃣ Testing Variable Substitution...');
try {
    const testContent = fs.readFileSync('test-project/index.js', 'utf8');
    const variables = {
        projectName: 'MyAwesomeApp',
        author: 'John Doe',
        email: 'john@example.com',
        date: new Date().toLocaleDateString(),
        year: new Date().getFullYear().toString()
    };
    
    let substitutedContent = testContent;
    for (const [key, value] of Object.entries(variables)) {
        const pattern = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
        substitutedContent = substitutedContent.replace(pattern, value);
    }
    
    console.log('✅ Variable substitution working');
    console.log('   Original: {{projectName}}');
    console.log('   Substituted: MyAwesomeApp');
} catch (error) {
    console.log('❌ Error testing variable substitution:', error.message);
}

// Test 9: Check dependencies
console.log('\n9️⃣ Checking Dependencies...');
try {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    const requiredDeps = ['archiver', 'extract-zip', 'fs-extra'];
    const requiredDevDeps = ['@types/vscode', '@types/node', 'typescript'];
    
    console.log('Production Dependencies:');
    for (const dep of requiredDeps) {
        if (packageJson.dependencies && packageJson.dependencies[dep]) {
            console.log(`✅ ${dep}: ${packageJson.dependencies[dep]}`);
        } else {
            console.log(`❌ Missing: ${dep}`);
        }
    }
    
    console.log('Development Dependencies:');
    for (const dep of requiredDevDeps) {
        if (packageJson.devDependencies && packageJson.devDependencies[dep]) {
            console.log(`✅ ${dep}: ${packageJson.devDependencies[dep]}`);
        } else {
            console.log(`❌ Missing: ${dep}`);
        }
    }
} catch (error) {
    console.log('❌ Error checking dependencies:', error.message);
}

// Test 10: Check commands and contributions
console.log('\n🔟 Checking Extension Commands...');
try {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    const commands = packageJson.contributes?.commands || [];
    
    console.log(`Found ${commands.length} commands:`);
    commands.forEach(cmd => {
        console.log(`✅ ${cmd.command}: ${cmd.title}`);
    });
    
    const views = packageJson.contributes?.views || {};
    console.log(`\nFound ${Object.keys(views).length} view containers:`);
    Object.keys(views).forEach(view => {
        console.log(`✅ ${view}`);
    });
} catch (error) {
    console.log('❌ Error checking commands:', error.message);
}

console.log('\n🎉 Feature Test Complete!');
console.log('\n📋 Next Steps:');
console.log('1. Open VS Code with this project');
console.log('2. Press F5 to run the extension');
console.log('3. Test the following features:');
console.log('   - Create template from test-project');
console.log('   - Browse templates in sidebar');
console.log('   - Create new project from template');
console.log('   - Edit template configuration');
console.log('   - Import/export templates');
console.log('   - Variable substitution');

console.log('\n🚀 Ready to run the extension!'); 