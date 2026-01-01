# DivePlan Desktop Application - Quick Start Guide

## What is This?

DivePlan is now available as a **standalone desktop application** that runs on your computer without needing a web browser or internet connection!

## Download & Installation

### For Windows 11 Users 🪟

**You need to build the app on your Windows machine!**

👉 **See [WINDOWS_BUILD_GUIDE.md](WINDOWS_BUILD_GUIDE.md) for complete step-by-step instructions.**

**Quick steps:**
1. Open PowerShell or Command Prompt in the project folder
2. Run: `pnpm install`
3. Run: `pnpm run build:electron:win`
4. Find the app in `release/DivePlan 1.0.0.exe`
5. Double-click to run!

The build creates:
- **DivePlan 1.0.0.exe** - Portable version (recommended, no installation needed)
- **DivePlan Setup 1.0.0.exe** - Standard Windows installer

### For Linux Users 🐧

Pre-built applications are available in the `release/` folder:

#### Option 1: AppImage (Recommended - Works on ALL Linux distributions)
1. Download `DivePlan-1.0.0.AppImage` from the release folder
2. Make it executable: `chmod +x DivePlan-1.0.0.AppImage`
3. Double-click to run, or run from terminal: `./DivePlan-1.0.0.AppImage`

#### Option 2: Debian Package (For Ubuntu/Debian/Mint users)
1. Download `diveplan_1.0.0_amd64.deb`
2. Install it: `sudo dpkg -i diveplan_1.0.0_amd64.deb`
3. Run from Applications menu or terminal: `diveplan`

### For macOS Users 🍎

To build for macOS:
```bash
pnpm run build:electron:mac
```

This creates:
- **DivePlan-1.0.0.dmg** - Disk image installer
- **DivePlan-1.0.0-mac.zip** - Portable archive

## Features

✅ **Runs on Your Desktop** - Native application, no browser needed
✅ **Works Offline** - All dive tables and calculators work without internet
✅ **Professional Tools** - Complete dive planning suite
✅ **Fast & Responsive** - Native performance
✅ **Secure** - Your data stays on your computer

## What's Included

- **TUP Calculator** - Transfer Under Pressure diving calculations
- **Dive Tables Browser** - Complete decompression tables (ND15, SIL15, SOX15, etc.)
- **Dive Tools** - EAD, Bail Out, Nitrox Failure, OTU/ESOT calculators
- **Emergency Procedures** - Quick reference for emergencies
- **Treatment Protocols** - Decompression illness treatment guides
- **Supporting Information** - Comprehensive diving reference materials

## System Requirements

- **Linux**: Any modern distribution (64-bit)
- **Windows**: Windows 10 or later (64-bit)
- **macOS**: macOS 10.13 High Sierra or later
- **RAM**: 512 MB minimum
- **Storage**: 500 MB available space

## Troubleshooting

### Linux: "Permission Denied" when running AppImage
```bash
chmod +x DivePlan-1.0.0.AppImage
```

### Linux: AppImage doesn't run
Install FUSE:
```bash
# Ubuntu/Debian
sudo apt install fuse libfuse2

# Fedora
sudo dnf install fuse fuse-libs
```

### Application won't start
- Check that no other instance is running
- Try restarting your computer
- Make sure port 8080 is not in use

### Can't see the interface
- Wait 5-10 seconds after launch for the server to start
- Check if your antivirus is blocking it
- Try running as administrator (Windows) or with sudo (Linux)

## Building from Source

If you want to build the desktop app yourself:

```bash
# Install dependencies
pnpm install

# Build for your current platform
pnpm run build:electron

# Or build for specific platforms
pnpm run build:electron:linux
pnpm run build:electron:win
pnpm run build:electron:mac
```

## Development Mode

To run the app in development mode with hot-reload:

```bash
pnpm run dev:electron
```

This will:
1. Start the Vite development server
2. Launch the Electron app
3. Enable hot-reload for both frontend and backend

## Updates

The desktop app will notify you when updates are available. You can then download the latest version and reinstall.

## Privacy & Security

- All data is stored locally on your computer
- No telemetry or tracking
- No internet connection required for operation
- Secure context isolation enabled

## Support

For issues or questions:
1. Check the built-in Help section
2. Review the documentation at `/help`
3. Submit issues on the GitHub repository

## Safety Notice

⚠️ **IMPORTANT**: These tools are calculation aids only:
- Always follow your dive training and certification
- Use in conjunction with official dive tables
- Consult dive masters and safety officers
- Never rely solely on electronic calculations
- Follow IMCA and manufacturer recommendations

---

**Version**: 1.0.0
**Status**: Production Ready
**License**: Private

Enjoy safe diving! 🤿
