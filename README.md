# DivePlan - Professional Dive Planning Reference

A comprehensive web-based dive planning system for commercial, air, and nitrox diving operations. Access decompression tables, calculators, and safety information all in one platform.

![DivePlan](https://cdn.builder.io/api/v1/image/assets%2Fab9db6a681044b748ef518df8cd48de8%2Fda50c80fe0dc4a209294b70ea30291e0?format=webp&width=300)

## 🌊 Features

- **TUP Calculator** - Transfer Under Pressure calculations for bell diving operations
- **Dive Tables** - Browse all decompression tables (air, nitrox, treatment, specialty)
- **Table Selection** - Interactive decision tree to find the right table
- **Table Use Guide** - Detailed procedures for safe table usage
- **Dive Tools** - Calculators for EAD, OTU, ESOT, bail-out planning, and more
- **Supporting Info** - Critical reference on safety limits, oxygen toxicity, and emergency procedures
- **Offline Widgets** - Standalone HTML tools that work without internet

## 📥 Download to Your Desktop

### Option 1: Standalone Widgets (Easiest - No Installation)

Perfect for end users who want offline access without technical setup.

**What you get:**
- Single HTML files that work in any web browser
- No internet required after download
- No installation needed
- Can copy to USB drives

**Available Widgets:**
- `widget-tup-complete.html` - TUP Calculator
- `widget-tables-complete.html` - Dive Tables Browser  
- `widget-tools-complete.html` - Complete Dive Tools
- `widget-table-selection-tool.html` - Table Selection
- `widget-emergency-procedures.html` - Emergency Procedures
- `widget-guidance-safety.html` - Guidance & Safety

**How to use:**
1. Go to [GitHub Repository](https://github.com/MarkJeffery101/Diving-20Tools)
2. Click on any `widget-*.html` file
3. Click "Download" or "Raw" button
4. Save to your desktop
5. Double-click the file to open in your browser
6. Works 100% offline!

**Quick example:**
```bash
# Download a specific widget (example using curl)
curl -O https://raw.githubusercontent.com/MarkJeffery101/Diving-20Tools/main/widget-tup-complete.html

# Or download the entire repository as ZIP
# Go to GitHub → Click "Code" → "Download ZIP"
```

### Option 2: Full Application (For Developers)

Perfect for those who want to run the complete web application locally or customize it.

**Prerequisites:**
- Git
- Node.js (v18 or higher)
- pnpm (recommended) or npm

**Installation:**

```bash
# Clone the repository
git clone https://github.com/MarkJeffery101/Diving-20Tools.git

# Navigate to the directory
cd Diving-20Tools

# Install dependencies
pnpm install
# or: npm install

# Start development server
pnpm dev
# or: npm run dev

# Open your browser to http://localhost:8080
```

**Build for production:**

```bash
# Build the application
pnpm build
# or: npm run build

# Start production server
pnpm start
# or: npm start
```

## 🚀 Quick Start

### Using Online (No Download)
Simply visit the deployed application at [your-deployment-url] and start using immediately.

### Using Offline with Widgets

1. **Download** any widget file from the repository
2. **Save** to a convenient location (Desktop, Documents, USB drive)
3. **Open** by double-clicking the file
4. **Use** all features without internet

**Example workflow:**
```
Download widget-tup-complete.html
→ Copy to Desktop
→ Double-click to open in Chrome/Firefox/Safari
→ Use TUP calculator offline
```

## 📚 Documentation

- **QUICK_START.txt** - Simple guide for using standalone widgets
- **WIDGETS_README.md** - Comprehensive widget documentation
- **DIVE_TABLES_WIDGET_SETUP.md** - Detailed table widget setup
- **NETLIFY_IDENTITY_SETUP.md** - Authentication setup guide

## 🛠️ Technology Stack

- **Frontend:** React 18 + TypeScript + Vite + TailwindCSS 3
- **Backend:** Express server (integrated with Vite dev server)
- **Routing:** React Router 6 (SPA mode)
- **UI Components:** Radix UI + Custom components
- **Icons:** Lucide React
- **Testing:** Vitest
- **Database:** Supabase (optional for user features)

## 📁 Project Structure

```
client/                  # React frontend
  ├── pages/            # Route components
  ├── components/       # Reusable components
  └── global.css        # Styling and themes

server/                 # Express backend
  ├── index.ts          # Server setup
  └── routes/           # API handlers

shared/                 # Shared types
  └── api.ts            # API interfaces

widget-*.html           # Standalone offline tools
public/                 # Static assets
```

## 🎯 Use Cases

### For Dive Operations
- Plan dives with appropriate decompression tables
- Calculate EAD for nitrox dives
- Reference emergency procedures
- Track oxygen exposure (OTU/ESOT)

### For Training
- Study decompression theory
- Learn table selection logic
- Practice dive planning scenarios
- Reference safety limits

### For Offline Use
- Download widgets to USB drives
- Use on dive boats without internet
- Emergency reference in remote locations
- Backup reference material

## ⚠️ Safety Notice

**IMPORTANT:** DivePlan is a reference and planning aid. 

- Always use official physical dive tables for actual diving operations
- Follow your certification training and agency guidelines
- Consult with dive masters and safety officers
- Verify all calculations independently
- Never rely solely on digital tools for dive planning
- Follow IMCA, OSHA, and local regulatory requirements

## 🔧 Development

### Available Scripts

```bash
pnpm dev          # Start development server (client + server)
pnpm build        # Production build
pnpm start        # Start production server
pnpm test         # Run tests
pnpm typecheck    # TypeScript validation
pnpm format.fix   # Format code with Prettier
```

### Adding New Features

See the inline README in the project for guidance on:
- Adding new API routes
- Creating new page routes
- Styling with TailwindCSS
- Using the component library

## 📦 Deployment Options

- **Online:** Deploy to Netlify, Vercel, or any static hosting
- **Self-hosted:** Run on your own server with Node.js
- **Offline:** Use standalone widget HTML files
- **USB Drive:** Copy widgets to portable storage

## 🤝 Contributing

This is a professional diving reference tool. Contributions should:
- Maintain safety-first approach
- Follow established diving standards (IMCA, NOAA, USN)
- Include proper documentation
- Verify calculations against official tables

## 📄 License

See LICENSE file for details.

## 📞 Support

For questions about:
- **Diving procedures:** Consult your certification agency
- **Technical issues:** Check documentation or create an issue
- **Safety concerns:** Contact qualified dive professionals

## 🌟 Features Highlights

### Complete Reference System
- All IMCA-compliant tables
- Treatment tables (USN-5, USN-6, COMEX)
- Air, Nitrox, and specialty tables

### Smart Navigation
- Linked dive planning workflow
- Context-aware recommendations
- Mobile-responsive design

### Professional Tools
- TUP (Transfer Under Pressure) calculator
- EAD (Equivalent Air Depth) calculator
- OTU/ESOT oxygen toxicity tracking
- Bail-out gas planning
- Nitrox failure scenarios

### Offline Capability
- Standalone widget files
- No internet required
- All data embedded
- USB-portable

---

**Version:** 1.0  
**Last Updated:** January 2024  
**Status:** Production Ready

For the latest version and updates, visit [GitHub Repository](https://github.com/MarkJeffery101/Diving-20Tools)
