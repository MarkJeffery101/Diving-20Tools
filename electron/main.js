const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');
const { spawn } = require('child_process');

// Keep a global reference of the window object
let mainWindow;
let serverProcess;

const isDev = process.env.NODE_ENV === 'development';
const serverPort = process.env.PORT || 8080;

function createWindow() {
  // Create the browser window
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    },
    icon: path.join(__dirname, '../public/icon.png'),
    show: false, // Don't show until ready
  });

  // Load the app
  if (isDev) {
    // In development, use the vite dev server
    mainWindow.loadURL(`http://localhost:${serverPort}`);
    // Open DevTools in development
    mainWindow.webContents.openDevTools();
  } else {
    // In production, load from the built files
    const serverPath = path.join(__dirname, '../dist/server/node-build.mjs');
    
    // Start the Express server
    serverProcess = spawn('node', [serverPath], {
      env: { ...process.env, PORT: serverPort },
      stdio: 'inherit'
    });

    serverProcess.on('error', (err) => {
      console.error('Failed to start server:', err);
    });

    // Give server a moment to start, then load
    setTimeout(() => {
      mainWindow.loadURL(`http://localhost:${serverPort}`);
    }, 1000);
  }

  // Show window when ready to show
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  // Emitted when the window is closed
  mainWindow.on('closed', function () {
    mainWindow = null;
  });

  // Create application menu
  const template = [
    {
      label: 'File',
      submenu: [
        { role: 'quit' }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'selectAll' }
      ]
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forceReload' },
        { role: 'toggleDevTools' },
        { type: 'separator' },
        { role: 'resetZoom' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { type: 'separator' },
        { role: 'togglefullscreen' }
      ]
    },
    {
      label: 'Window',
      submenu: [
        { role: 'minimize' },
        { role: 'zoom' }
      ]
    },
    {
      label: 'Help',
      submenu: [
        {
          label: 'About DivePlan',
          click: async () => {
            const { shell } = require('electron');
            // Open help in the app
          }
        }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

// This method will be called when Electron has finished initialization
app.whenReady().then(createWindow);

// Quit when all windows are closed
app.on('window-all-closed', function () {
  // On macOS it is common for applications to stay open until the user quits explicitly
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the dock icon is clicked
  if (mainWindow === null) {
    createWindow();
  }
});

// Clean up server process when app quits
app.on('will-quit', () => {
  if (serverProcess) {
    serverProcess.kill();
  }
});
