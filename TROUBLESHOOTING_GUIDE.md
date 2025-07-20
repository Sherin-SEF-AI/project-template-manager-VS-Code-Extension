# 🔧 Template Hub - Troubleshooting Guide

## 🚨 **Quick Fix Steps**

If Template Hub commands are not working, follow these steps in order:

### **Step 1: Verify Extension Installation**
```bash
# Check if extension is installed
code --list-extensions | grep template

# Should show: sherinjosephroy.vscode-project-templates@1.0.3
```

### **Step 2: Test Basic Command**
1. **Press `Ctrl+Shift+P`**
2. **Type**: "Test Template Hub"
3. **Select**: "Template Hub: Test Template Hub"
4. **Expected**: You should see "Template Hub is working!" message

### **Step 3: Check Extension Activation**
1. **Press `Ctrl+Shift+P`**
2. **Type**: "Developer: Show Logs"
3. **Select**: "Extension Host"
4. **Look for**: "Template Hub is now active!" message

### **Step 4: Force Reload**
1. **Press `Ctrl+Shift+P`**
2. **Type**: "Developer: Reload Window"
3. **Press Enter**

---

## 🔍 **Common Issues and Solutions**

### **Issue 1: Commands Not Found**

**Symptoms:**
- Error: "command 'projectTemplateManager.xxx' not found"
- Commands don't appear in Command Palette

**Solutions:**
1. **Restart VS Code completely**
2. **Check extension version**: Should be 1.0.3
3. **Reinstall extension**:
   ```bash
   code --uninstall-extension sherinjosephroy.vscode-project-templates
   code --install-extension vscode-project-templates-1.0.3.vsix
   ```

### **Issue 2: Extension Not Activating**

**Symptoms:**
- No "Template Hub is now active!" message in logs
- Extension appears installed but doesn't work

**Solutions:**
1. **Check activation events** in package.json
2. **Verify workspace**: Open a folder in VS Code
3. **Check for errors** in Extension Host logs
4. **Reinstall extension** with fresh copy

### **Issue 3: Sidebar Not Appearing**

**Symptoms:**
- Template Hub icon not visible in Activity Bar
- Sidebar commands don't work

**Solutions:**
1. **Look for icon** in Activity Bar (left sidebar)
2. **Try command**: "Template Hub: Open Template Hub"
3. **Check view container** registration in package.json
4. **Restart VS Code**

### **Issue 4: Commands Work But Features Don't**

**Symptoms:**
- Commands execute but show errors
- Template operations fail

**Solutions:**
1. **Check file permissions** for templates directory
2. **Verify Git configuration** (for author info)
3. **Check workspace folder** is open
4. **Review error messages** in Output panel

---

## 🛠️ **Advanced Troubleshooting**

### **Step 1: Check Extension Logs**

1. **Open Command Palette**: `Ctrl+Shift+P`
2. **Type**: "Developer: Show Logs"
3. **Select**: "Extension Host"
4. **Look for these messages**:
   ```
   Template Hub is now active!
   Template Hub commands registered successfully!
   Template Hub is now active and ready to use!
   ```

### **Step 2: Check Output Panel**

1. **Open Output Panel**: `Ctrl+Shift+U`
2. **Select**: "Template Hub" from dropdown
3. **Look for error messages**

### **Step 3: Check Developer Console**

1. **Open Command Palette**: `Ctrl+Shift+P`
2. **Type**: "Developer: Toggle Developer Tools"
3. **Check Console tab** for errors

### **Step 4: Verify File Structure**

```bash
# Check if extension files exist
ls -la ~/.vscode/extensions/sherinjosephroy.vscode-project-templates-1.0.3/

# Should show:
# - extension.js
# - package.json
# - out/ directory
```

---

## 🎯 **Test Commands**

### **Basic Test Commands**

1. **Test Template Hub**:
   - Command: `projectTemplateManager.test`
   - Expected: "Template Hub is working!" message

2. **Open Template Hub**:
   - Command: `projectTemplateManager.openTemplateHub`
   - Expected: "Opening Template Hub..." message + sidebar opens

3. **Use Template**:
   - Command: `projectTemplateManager.useTemplate`
   - Expected: "Use Template command triggered!" message

### **Advanced Test Commands**

4. **Create Template**:
   - Command: `projectTemplateManager.createTemplate`
   - Expected: "Create Template command triggered!" message

5. **Import Template**:
   - Command: `projectTemplateManager.importTemplate`
   - Expected: "Import Template command triggered!" message

---

## 🔄 **Reinstallation Process**

### **Complete Reinstall**

```bash
# 1. Uninstall extension
code --uninstall-extension sherinjosephroy.vscode-project-templates

# 2. Close VS Code completely

# 3. Install fresh copy
code --install-extension vscode-project-templates-1.0.3.vsix

# 4. Open VS Code and test
```

### **Verify Installation**

```bash
# Check version
code --list-extensions --show-versions | grep template

# Should show: sherinjosephroy.vscode-project-templates@1.0.3
```

---

## 📋 **Diagnostic Checklist**

- [ ] Extension version is 1.0.3
- [ ] "Template Hub is now active!" appears in logs
- [ ] "Test Template Hub" command works
- [ ] Template Hub icon appears in Activity Bar
- [ ] Commands appear under "Template Hub" category
- [ ] No errors in Extension Host logs
- [ ] Workspace folder is open
- [ ] VS Code was restarted after installation

---

## 🆘 **If Nothing Works**

### **Last Resort Solutions**

1. **Reset VS Code Settings**:
   - Close VS Code
   - Delete `~/.config/Code/User/settings.json`
   - Restart VS Code

2. **Clear Extension Cache**:
   ```bash
   rm -rf ~/.vscode/extensions/sherinjosephroy.vscode-project-templates-*
   ```

3. **Use Different VS Code Installation**:
   - Try VS Code Insiders
   - Or portable VS Code installation

4. **Check System Requirements**:
   - Node.js version
   - VS Code version (should be 1.74.0+)
   - Operating system compatibility

---

## 📞 **Getting Help**

### **Before Asking for Help**

1. **Complete the diagnostic checklist above**
2. **Try all troubleshooting steps**
3. **Collect error messages and logs**
4. **Note your VS Code version and OS**

### **Information to Provide**

- VS Code version
- Operating system
- Extension version
- Error messages
- Steps to reproduce
- Logs from Extension Host

### **Support Channels**

1. **GitHub Issues**: https://github.com/Sherin-SEF-AI/project-template-manager-VS-Code-Extension/issues
2. **VS Code Marketplace**: Extension page comments
3. **Documentation**: Check README.md and other guides

---

## 🎉 **Success Indicators**

When Template Hub is working correctly, you should see:

✅ **Extension Activation**:
- "Template Hub is now active!" in logs
- "Template Hub is now active and ready to use!" notification

✅ **Commands Working**:
- All commands appear under "Template Hub" category
- "Test Template Hub" shows success message
- No "command not found" errors

✅ **UI Elements**:
- Template Hub icon in Activity Bar
- Sidebar opens when clicked
- All buttons and menus work

✅ **Functionality**:
- Can create templates
- Can use templates
- Can import/export templates
- Variable substitution works

**If you see all these indicators, Template Hub is working correctly!** 🚀 