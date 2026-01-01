# Windows 11 - Quick Reference Card

## 🎯 You're on Windows 11? Here's What To Do!

### Step 1: Install Node.js (if not already installed)
1. Download from https://nodejs.org/
2. Install the LTS version
3. Restart your terminal/PowerShell

### Step 2: Install pnpm
Open PowerShell and run:
```powershell
npm install -g pnpm
```

### Step 3: Navigate to Project
Open PowerShell in the DivePlan project folder (where this file is located)

### Step 4: Install Dependencies
```powershell
pnpm install
```
Wait 1-2 minutes for dependencies to download.

### Step 5: Build the Desktop App
```powershell
pnpm run build:electron:win
```
Wait 2-3 minutes for the build to complete.

### Step 6: Run Your App!
Navigate to the `release` folder and double-click:
**`DivePlan 1.0.0.exe`** (portable version - no installation needed!)

---

## 📁 Where to Find Your App

```
YourProject/
└── release/
    ├── DivePlan 1.0.0.exe          ← Double-click this!
    └── DivePlan Setup 1.0.0.exe    ← Or use the installer
```

## ⚡ Quick Launch Script

Just double-click: **`launch-desktop.bat`**

This script will automatically find and run the portable version for you!

---

## 🔧 Common Issues

**"pnpm: command not found"**
→ Install pnpm: `npm install -g pnpm`

**Build fails**
→ Make sure Node.js is installed
→ Try running PowerShell as Administrator

**App won't start**
→ Check if antivirus is blocking it
→ Try running as Administrator (right-click → Run as administrator)

---

## 📖 Need More Help?

See **[WINDOWS_BUILD_GUIDE.md](WINDOWS_BUILD_GUIDE.md)** for detailed instructions and troubleshooting!

---

**Total time: ~5-10 minutes for first build**
**Result: Professional desktop app that works offline!** 🤿
