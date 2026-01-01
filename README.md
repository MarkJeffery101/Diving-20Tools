# DivePlan - Professional Dive Planning Tools

A comprehensive dive planning application available as both a web application and a **desktop application** for Windows, macOS, and Linux.

## 🎯 What's New: Desktop Application!

DivePlan is now available as a standalone desktop application! No browser or internet connection required.

### Quick Start (Desktop)

1. **Download** the application for your platform from the `release/` folder
2. **Linux**: Run `DivePlan-1.0.0.AppImage` or install `diveplan_1.0.0_amd64.deb`
3. **Windows**: Run the installer or portable `.exe`
4. **macOS**: Open the `.dmg` or extract the `.zip`

See [DESKTOP_APP_GUIDE.md](DESKTOP_APP_GUIDE.md) for detailed instructions.

## Features

### Core Capabilities

✅ **TUP Calculator** - Transfer Under Pressure diving calculations with complete CSV datasets
✅ **Dive Tables Browser** - Access to comprehensive decompression tables
- No-Stop Limits (ND15, LND15)
- Standard Air Tables (SIL15 variants)
- Surface/Oxygen Tables (SOX15 variants)
- Backup Air Tables (SAB15 variants)
- Nitrox Decompression Tables (NIA/NIB)
- Bell Air/Oxygen Tables (BOX15)

✅ **Dive Calculators**
- EAD (Equivalent Air Depth)
- Bail Out Calculator
- Nitrox Failure Calculator
- OTU & ESOT Calculator
- Residual ESOT Calculator

✅ **Emergency Resources**
- Emergency Procedures Reference
- Treatment Protocols
- Guidance & Safety Information

### Platform Options

- 🖥️ **Desktop App** - Native application for Windows, macOS, Linux
- 🌐 **Web App** - Modern React SPA with Express backend
- 📱 **Mobile Responsive** - Works on tablets and phones
- 📴 **Offline Capable** - All functionality available offline

## Installation & Usage

### Desktop Application

**For End Users:**
See [DESKTOP_APP_GUIDE.md](DESKTOP_APP_GUIDE.md) for installation instructions.

**For Developers:**
```bash
# Install dependencies
pnpm install

# Run in development mode
pnpm run dev:electron

# Build for production
pnpm run build:electron:linux   # Linux
pnpm run build:electron:win     # Windows
pnpm run build:electron:mac     # macOS
```

See [ELECTRON_README.md](ELECTRON_README.md) for developer documentation.

### Web Application

```bash
# Install dependencies
pnpm install

# Development
pnpm run dev

# Production build
pnpm run build

# Start production server
pnpm start
```

## Project Structure

```
client/                   # React frontend
├── pages/               # Route components
├── components/ui/       # UI component library
└── App.tsx             # SPA routing setup

server/                  # Express backend
├── index.ts            # Server setup
└── routes/             # API endpoints

electron/               # Desktop app (NEW!)
├── main.js            # Electron main process
└── preload.js         # Preload script

public/
├── data/              # Dive tables CSV data
└── manifest.json      # PWA manifest

shared/                # Shared TypeScript types
```

## Tech Stack

### Frontend
- React 18 + TypeScript
- React Router 6 (SPA mode)
- TailwindCSS 3
- Radix UI components
- Vite build tool

### Backend
- Express 5
- Node.js
- Supabase integration

### Desktop
- Electron 39
- Electron Builder

## Development

### Prerequisites
- Node.js 18+
- pnpm package manager

### Scripts

```bash
# Web Development
pnpm dev              # Start dev server
pnpm build            # Build for production
pnpm start            # Start production server

# Desktop Development
pnpm dev:electron     # Start desktop app in dev mode
pnpm build:electron   # Build desktop app

# Testing & Quality
pnpm test             # Run tests
pnpm typecheck        # TypeScript validation
pnpm format.fix       # Format code
```

## Building Desktop Applications

### All Platforms
```bash
pnpm run build:electron
```

### Platform-Specific
```bash
pnpm run build:electron:linux    # AppImage + .deb
pnpm run build:electron:win      # NSIS installer + portable
pnpm run build:electron:mac      # .dmg + .zip
```

Outputs are in the `release/` directory.

## Deployment

### Desktop
- Build the application for your target platform
- Distribute the installer or portable version
- Users can run offline without any server

### Web
- Build: `pnpm run build`
- Deploy `dist/` folder to any static host
- Or use `pnpm start` for Node.js hosting
- Netlify/Vercel compatible

## Documentation

- [DESKTOP_APP_GUIDE.md](DESKTOP_APP_GUIDE.md) - End user guide for desktop app
- [ELECTRON_README.md](ELECTRON_README.md) - Developer docs for desktop app
- [WIDGETS_README.md](WIDGETS_README.md) - Standalone HTML widgets
- [DIVE_TABLES_WIDGET_SETUP.md](DIVE_TABLES_WIDGET_SETUP.md) - Widget setup guide

## Safety Notice

⚠️ **IMPORTANT**: These tools are calculation aids only:
- Always follow your dive training and certification standards
- Use in conjunction with official dive tables
- Consult with dive masters and safety officers
- Never rely solely on these calculations
- Follow local regulations and safety protocols
- IMCA and manufacturer recommendations apply

## Features Comparison

| Feature | Desktop App | Web App | Widgets |
|---------|-------------|---------|---------|
| Offline | ✅ Full | ⚠️ Limited | ✅ Full |
| Installation | Required | None | None |
| Auto-update | ✅ | ✅ | ❌ |
| Performance | ⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐ |
| All Features | ✅ | ✅ | ⚠️ Partial |

## Contributing

This is a private repository. For authorized contributors:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## Version

- **Application Version**: 1.0.0
- **Desktop App**: Production Ready
- **Web App**: Production Ready
- **Widgets**: Production Ready

## License

Private - All rights reserved

---

**Built for professional divers by divers** 🤿

For questions, issues, or support, please open an issue on the repository.
