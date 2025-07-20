# 🚀 Template Hub - Marketplace Update Guide

## 📋 Overview

This guide explains how to update your "Template Hub" extension on the VS Code Marketplace with new features, bug fixes, and improvements.

---

## 🔄 Update Process

### **Step 1: Prepare Your Changes**

1. **Make your code changes** in the source files
2. **Test thoroughly** to ensure everything works
3. **Update version number** in `package.json`
4. **Update CHANGELOG.md** with new changes
5. **Commit and push** to GitHub

### **Step 2: Version Numbering**

Follow [Semantic Versioning](https://semver.org/):
- **MAJOR.MINOR.PATCH** (e.g., 1.0.1)
- **PATCH** (1.0.0 → 1.0.1): Bug fixes
- **MINOR** (1.0.0 → 1.1.0): New features, backward compatible
- **MAJOR** (1.0.0 → 2.0.0): Breaking changes

**Example:**
```json
{
  "version": "1.0.1"
}
```

### **Step 3: Update CHANGELOG.md**

Document all changes:
```markdown
## [1.0.1] - 2024-07-20

### Fixed
- Fixed command registration issues
- Added missing commands

### Added
- New feature X
- Enhanced Y

### Changed
- Improved Z
```

### **Step 4: Compile and Package**

```bash
# Compile TypeScript
npm run compile

# Package extension
npx vsce package --no-dependencies
```

### **Step 5: Publish to Marketplace**

#### **Method A: Web Interface (Recommended)**

1. **Go to**: https://marketplace.visualstudio.com/manage
2. **Sign in** with your Microsoft account
3. **Find "Template Hub"** in your extensions
4. **Click "Update"** or "Upload new version"
5. **Upload** the new `.vsix` file
6. **Add release notes** (copy from CHANGELOG.md)
7. **Submit for review**

#### **Method B: Command Line**

```bash
# Install vsce globally (if not already installed)
npm install -g @vscode/vsce

# Login to marketplace
vsce login sherinjosephroy

# Publish directly
vsce publish patch  # or minor, major
```

---

## 📦 Current Update (v1.0.1)

### **What's New in v1.0.1**

✅ **Fixed Command Registration**
- Commands now appear under "Template Hub" category
- Fixed extension activation issues
- Added missing commands

✅ **New Commands**
- `Template Hub: Open Template Hub`
- `Template Hub: Use Template`

✅ **Improved User Experience**
- Better error handling
- Enhanced template selection
- Improved feedback

### **Files to Upload**

- **VSIX Package**: `vscode-project-templates-1.0.1.vsix`
- **Release Notes**: Copy from `CHANGELOG.md`

---

## 🎯 Step-by-Step Update Instructions

### **1. Verify Current Status**

```bash
# Check current version
cat package.json | grep version

# Check if extension is working
code --list-extensions | grep template
```

### **2. Prepare Update**

```bash
# Update version (already done)
# Update CHANGELOG.md (already done)

# Compile changes
npm run compile

# Package extension
npx vsce package --no-dependencies
```

### **3. Upload to Marketplace**

#### **Option A: Web Interface**

1. **Visit**: https://marketplace.visualstudio.com/manage
2. **Login** with your Microsoft account
3. **Find "Template Hub"** extension
4. **Click "Update"**
5. **Upload**: `vscode-project-templates-1.0.1.vsix`
6. **Add Release Notes**:
   ```
   ## What's New in v1.0.1
   
   ### Fixed
   - Fixed command registration issues - commands now appear under "Template Hub" category
   - Added missing `openTemplateHub` and `useTemplate` commands
   - Fixed extension activation and command discovery
   - Improved error handling for template operations
   - Fixed .vscodeignore configuration for proper packaging
   
   ### Added
   - New command: `Template Hub: Open Template Hub` - Opens the sidebar directly
   - New command: `Template Hub: Use Template` - Quick template selection
   - Enhanced template selection workflow
   - Better user feedback for template operations
   
   ### Changed
   - Updated command categories from "Project Template Manager" to "Template Hub"
   - Improved extension packaging and distribution
   - Enhanced documentation with usage guides
   ```
7. **Submit for Review**

#### **Option B: Command Line**

```bash
# Login to marketplace
vsce login sherinjosephroy

# Publish update
vsce publish patch
```

### **4. Monitor Update**

- **Review Process**: Usually takes 5-15 minutes
- **Check Status**: Visit your extension page
- **User Notifications**: Users will be notified of updates

---

## 🔍 Troubleshooting

### **Common Issues**

#### **1. Version Already Exists**
```bash
# Error: Version 1.0.1 already exists
# Solution: Increment version number
# Change to 1.0.2 in package.json
```

#### **2. Package Too Large**
```bash
# Error: Package exceeds size limit
# Solution: Check .vscodeignore
# Remove unnecessary files
```

#### **3. Authentication Issues**
```bash
# Error: Login failed
# Solution: Use web interface instead
# Or regenerate Personal Access Token
```

#### **4. Compilation Errors**
```bash
# Error: TypeScript compilation failed
# Solution: Fix errors first
npm run compile
```

### **Verification Steps**

1. **Test Locally**:
   ```bash
   code --install-extension vscode-project-templates-1.0.1.vsix
   ```

2. **Check Commands**:
   - Press `Ctrl+Shift+P`
   - Type "Template Hub"
   - Verify all commands appear

3. **Test Features**:
   - Open Template Hub sidebar
   - Create a test template
   - Use a template

---

## 📈 Best Practices

### **Before Publishing**

✅ **Test Thoroughly**
- Test all features locally
- Verify commands work
- Check for errors

✅ **Update Documentation**
- Update README.md if needed
- Update CHANGELOG.md
- Update usage guides

✅ **Version Appropriately**
- Use semantic versioning
- Document breaking changes
- Keep changelog current

### **After Publishing**

✅ **Monitor Feedback**
- Check marketplace reviews
- Monitor GitHub issues
- Respond to user feedback

✅ **Plan Next Update**
- Collect user requests
- Plan new features
- Maintain roadmap

---

## 🎉 Success Checklist

- [ ] Version number updated in `package.json`
- [ ] CHANGELOG.md updated with new changes
- [ ] Code compiled successfully (`npm run compile`)
- [ ] Extension packaged (`npx vsce package`)
- [ ] VSIX file created (`vscode-project-templates-1.0.1.vsix`)
- [ ] Uploaded to VS Code Marketplace
- [ ] Release notes added
- [ ] Submitted for review
- [ ] Update appears on marketplace page
- [ ] Users receive update notifications

---

## 📞 Support

If you encounter issues:

1. **Check this guide** for troubleshooting
2. **Review marketplace documentation**: https://code.visualstudio.com/api/working-with-extensions/publishing-extension
3. **Check GitHub repository** for issues
4. **Contact marketplace support** if needed

**Happy publishing!** 🚀 