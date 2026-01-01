# Windows Build Process - Visual Flowchart

```
┌─────────────────────────────────────────────────────────┐
│          Windows 11 Desktop App Build Process          │
└─────────────────────────────────────────────────────────┘

Step 1: Prerequisites
┌──────────────────┐
│  Install Node.js │
│  (from nodejs.org)│
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  Install pnpm    │
│ npm install -g   │
│      pnpm        │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ Open PowerShell  │
│  in project dir  │
└────────┬─────────┘
         │
         ▼

Step 2: Install Dependencies
┌──────────────────┐
│  pnpm install    │
│                  │
│  ⏱ 1-2 minutes   │
└────────┬─────────┘
         │
         ▼

Step 3: Build Desktop App
┌──────────────────────┐
│ pnpm run             │
│ build:electron:win   │
│                      │
│ ⏱ 2-3 minutes        │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────────────────────┐
│  Building...                         │
│  ├─ Compiling React app              │
│  ├─ Bundling Express server          │
│  ├─ Packaging with Electron          │
│  ├─ Creating installer                │
│  └─ Creating portable executable     │
└──────────┬───────────────────────────┘
           │
           ▼

Step 4: Output Files Created
┌────────────────────────────────────────┐
│  release/                              │
│  ├─ DivePlan 1.0.0.exe        ✅       │
│  │  (Portable - No install needed)     │
│  │  Size: ~180-200 MB                  │
│  │                                     │
│  └─ DivePlan Setup 1.0.0.exe  ✅       │
│     (Installer)                        │
│     Size: ~180-200 MB                  │
└────────┬───────────────────────────────┘
         │
         ▼

Step 5: Run the App!
┌──────────────────────┐
│  Double-click:       │
│  DivePlan 1.0.0.exe  │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────────────────┐
│  🖥️  DivePlan Desktop App       │
│                                  │
│  ✅ Running on Windows           │
│  ✅ No browser needed            │
│  ✅ Works offline                │
│  ✅ All features available       │
└──────────────────────────────────┘
```

## Alternative: Use the Launcher Script

```
Double-click launch-desktop.bat
           │
           ▼
    Automatically finds
    and runs portable .exe
           │
           ▼
    DivePlan Desktop App opens!
```

## What You Get

```
┌─────────────────────────────────────────┐
│  DivePlan Desktop Application           │
├─────────────────────────────────────────┤
│                                         │
│  📊 TUP Calculator                      │
│  📋 Dive Tables Browser                 │
│  🔧 Dive Tools Suite                    │
│     • EAD Calculator                    │
│     • Bail Out Calculator               │
│     • Nitrox Failure Calculator         │
│     • OTU & ESOT Calculator             │
│     • Residual ESOT Calculator          │
│  🚨 Emergency Procedures                │
│  💊 Treatment Protocols                 │
│  📚 Supporting Information              │
│                                         │
│  ✅ All working offline                 │
│  ✅ Native Windows experience           │
│  ✅ Professional desktop UI             │
│                                         │
└─────────────────────────────────────────┘
```

## Timeline

```
First Time Build:
├─ Install Node.js ............. 2-3 minutes
├─ Install pnpm ................ 30 seconds
├─ pnpm install ................ 1-2 minutes
└─ Build desktop app ........... 2-3 minutes
                         TOTAL: ~8-10 minutes

Subsequent Builds:
└─ Build desktop app ........... 30-60 seconds
```

## File Size Breakdown

```
DivePlan 1.0.0.exe (Portable)
├─ Electron runtime .......... ~100 MB
├─ Node.js runtime ........... ~30 MB
├─ Your app code & assets .... ~40 MB
├─ Dependencies .............. ~20 MB
└─ TOTAL ..................... ~190 MB

Why so large?
✅ Includes complete runtime environment
✅ No external dependencies needed
✅ Works on any Windows 11 machine
✅ Completely self-contained
```

## Distribution Options

```
Share the Portable Version:
┌─────────────────────┐
│ DivePlan 1.0.0.exe  │
└──────────┬──────────┘
           │
    ┌──────┴──────┬──────────┬──────────┐
    │             │          │          │
    ▼             ▼          ▼          ▼
  Email      USB Drive   Cloud    Network
           (if <200MB)   Storage   Share
```

---

**Need help? Check:**
- WINDOWS_QUICK_START.md (Quick reference)
- WINDOWS_BUILD_GUIDE.md (Detailed guide)
- README.md (General info)
