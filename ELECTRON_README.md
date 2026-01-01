# DivePlan Desktop Application

This is the desktop version of DivePlan - a professional dive planning and calculation tool.

## Features

- **Standalone Desktop App**: Runs on Windows, macOS, and Linux
- **Offline Capable**: Works without an internet connection
- **Professional Dive Planning**: Complete dive tables, calculators, and planning tools
- **TUP Calculator**: Transfer Under Pressure calculations
- **Dive Tables Browser**: Access to comprehensive decompression tables
- **Dive Tools**: EAD, Bail Out, Nitrox Failure, OTU/ESOT, and more

## Development

### Prerequisites

- Node.js 18+ and pnpm installed

### Running in Development Mode

```bash
# Install dependencies
pnpm install

# Run the desktop app in development mode
pnpm run dev:electron
```

This will start the Vite dev server and launch the Electron app.

### Building for Production

Build the desktop app for your current platform:

```bash
pnpm run build:electron
```

Or build for specific platforms:

```bash
# Windows
pnpm run build:electron:win

# macOS
pnpm run build:electron:mac

# Linux
pnpm run build:electron:linux
```

The built applications will be in the `release/` directory.

## Distribution

After building, you'll find the installable packages in the `release/` directory:

- **Windows**: `.exe` installer and portable `.exe`
- **macOS**: `.dmg` disk image and `.zip` archive
- **Linux**: `.AppImage` and `.deb` package

## Usage

Simply launch the application from your desktop or applications folder. The app will start with a local server running in the background to serve the application.

## Architecture

The desktop app uses:
- **Electron**: To create the desktop application wrapper
- **Express**: Backend server for API endpoints
- **React + Vite**: Frontend application
- **Embedded Server**: The Express server runs locally within the app

## Security

- Context isolation is enabled
- Node integration is disabled in the renderer process
- Secure IPC communication via preload script

## License

Private - All rights reserved
