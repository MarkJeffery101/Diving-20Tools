# Building DivePlan Desktop App on Windows 11

## Quick Start for Windows Users

Since you're on Windows 11, you can build the desktop application directly on your Windows machine!

## Prerequisites

1. **Install Node.js**
   - Download from: https://nodejs.org/ (LTS version recommended)
   - Version 18 or higher required
   - This includes npm automatically

2. **Install pnpm** (package manager)
   - Open PowerShell or Command Prompt as Administrator
   - Run: `npm install -g pnpm`

## Building the Windows Desktop App

### Step 1: Install Dependencies

Open PowerShell or Command Prompt in the project directory and run:

```powershell
pnpm install
```

This will install all required dependencies including Electron.

### Step 2: Build the Desktop Application

Run the build command for Windows:

```powershell
pnpm run build:electron:win
```

This will:
1. Build the React frontend
2. Build the Express server
3. Package everything into a Windows desktop application
4. Create two versions:
   - **Installer** (DivePlan Setup 1.0.0.exe) - Standard Windows installer
   - **Portable** (DivePlan 1.0.0.exe) - No installation needed, just run it

### Step 3: Find Your Application

After the build completes, you'll find the applications in:

```
release/
├── DivePlan Setup 1.0.0.exe     ← Installer version
├── DivePlan 1.0.0.exe           ← Portable version (recommended)
└── win-unpacked/                 ← Unpacked application files
```

### Step 4: Run the Application

**Option A: Portable Version (Easiest)**
- Navigate to the `release` folder
- Double-click `DivePlan 1.0.0.exe`
- The app will start immediately!

**Option B: Install Version**
- Double-click `DivePlan Setup 1.0.0.exe`
- Follow the installation wizard
- Launch from your Start Menu or Desktop shortcut

## Development Mode (Optional)

If you want to develop or test changes with hot-reload:

```powershell
pnpm run dev:electron
```

This opens the app in development mode with:
- Hot-reload for code changes
- Developer tools enabled
- Console logging for debugging

## Troubleshooting

### "pnpm: command not found" or "pnpm is not recognized"

Install pnpm globally:
```powershell
npm install -g pnpm
```

Then close and reopen your terminal.

### Build fails with "node-gyp" errors

Install Windows Build Tools:
```powershell
npm install -g windows-build-tools
```

### "Port 8080 already in use"

The app uses port 8080 internally. If something else is using it:
1. Close other applications using that port
2. Or modify the port in `electron/main.js` (line with `serverPort`)

### Antivirus blocking the app

Your antivirus might flag the app as unknown:
1. This is normal for unsigned applications
2. Add an exception for DivePlan.exe
3. Or temporarily disable antivirus during build

### App won't start

1. Make sure you built it first: `pnpm run build:electron:win`
2. Check if any antivirus is blocking it
3. Try running as Administrator (right-click → Run as administrator)

## Using the Launcher Script

For convenience, I've included `launch-desktop.bat`:

```batch
# Just double-click this file or run from command line:
launch-desktop.bat
```

This will automatically find and launch the portable version if it exists.

## Expected Build Times

- **First build**: 5-10 minutes (downloads Electron and dependencies)
- **Subsequent builds**: 20-60 seconds (uses cache)

## File Sizes

- Portable EXE: ~180-200 MB
- Installer: ~180-200 MB
- The size includes:
  - Electron runtime
  - Node.js runtime
  - All application code and assets
  - All dependencies

## Features in Windows Desktop App

✅ **Runs without browser** - Native Windows application
✅ **Works offline** - No internet needed after installation
✅ **Fast startup** - Opens in 2-5 seconds
✅ **Professional UI** - Native Windows window with menus
✅ **All features included**:
  - TUP Calculator
  - Dive Tables Browser
  - All Dive Tools (EAD, Bail Out, Nitrox Failure, etc.)
  - Emergency Procedures
  - Treatment Protocols
  - Supporting Information

## Distribution

Once built, you can:
1. **Use it yourself** - Just run the portable .exe
2. **Share with others** - Copy the portable .exe to USB or email it
3. **Install on multiple computers** - Use the installer .exe

The portable version is recommended because:
- No installation needed
- Can run from USB drive
- Easier to update (just replace the file)
- No admin rights needed

## Next Steps After Building

1. Find the .exe in the `release/` folder
2. Double-click to run
3. Create a desktop shortcut if you want
4. Start planning dives!

---

**Need Help?**
- Check the main README.md
- Review DESKTOP_APP_GUIDE.md
- Open an issue on GitHub

**Enjoy your desktop diving app!** 🤿
