#!/bin/bash

echo "🚀 Project Template Manager - Quick Start"
echo "=========================================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the Project Template Manager directory"
    exit 1
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Compile the extension
echo "🔨 Compiling extension..."
npm run compile

if [ $? -eq 0 ]; then
    echo "✅ Extension compiled successfully!"
else
    echo "❌ Compilation failed!"
    exit 1
fi

# Check if VS Code is installed
if ! command -v code &> /dev/null; then
    echo "❌ VS Code is not installed or not in PATH"
    echo "Please install VS Code and try again"
    exit 1
fi

echo ""
echo "🎉 Ready to run the extension!"
echo ""
echo "📋 Next steps:"
echo "1. VS Code should open automatically"
echo "2. Press F5 to run the extension"
echo "3. Test the features using the demo guide"
echo ""
echo "📖 For detailed instructions, see: demo-features.md"
echo "🧪 For feature verification, run: node test-features.js"
echo ""

# Open VS Code
echo "🔧 Opening VS Code..."
code .

echo ""
echo "✨ Project Template Manager is ready!"
echo "   Press F5 in VS Code to launch the extension" 