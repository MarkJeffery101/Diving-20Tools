#!/bin/bash
# DivePlan Desktop App Launcher
# Quick launcher script for the DivePlan desktop application

echo "=========================================="
echo "  DivePlan Desktop Application Launcher"
echo "=========================================="
echo ""

# Check if we're in the right directory
if [ ! -d "release" ]; then
    echo "Error: 'release' directory not found."
    echo "Please make sure you're in the DivePlan project root directory."
    echo ""
    echo "Or build the desktop app first with:"
    echo "  pnpm run build:electron:linux"
    exit 1
fi

# Look for the AppImage
APPIMAGE=$(find release -name "*.AppImage" -type f | head -n 1)

if [ -z "$APPIMAGE" ]; then
    echo "Error: No AppImage found in release/ directory."
    echo ""
    echo "Please build the desktop app first with:"
    echo "  pnpm run build:electron:linux"
    exit 1
fi

echo "Found: $APPIMAGE"
echo ""

# Make it executable if it isn't
if [ ! -x "$APPIMAGE" ]; then
    echo "Making AppImage executable..."
    chmod +x "$APPIMAGE"
fi

echo "Launching DivePlan Desktop App..."
echo ""

# Launch the app
"$APPIMAGE"
