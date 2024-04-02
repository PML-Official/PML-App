//import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

const { app, BrowserWindow, shell, globalShortcut, dialog, ipcMain } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  const win = new BrowserWindow({
    width: 1600,
    height: 1010,
    maxHeight: 1205,
    minHeight: 900,
    webPreferences: {
      nodeIntegration: true, // Enable Node.js integration in renderer process
      contextIsolation: false,
      preload: path.join(__dirname, 'preload.js')
    },
    icon: process.platform === 'win32' ? path.join(__dirname, 'Windows Icon.ico') : path.join(__dirname, 'Mac-Icon.icns')
  });
  win.openDevTools();
  win.webContents.on('will-navigate', (event, url) => {
    if (url.substring(0, 4) != "file") {
      event.preventDefault(); // Prevent default navigation behavior
      shell.openExternal(url); // Open the link in the default system browser
    }

  });

  // Load your HTML file (e.g., index.html)
  win.loadFile('index.html');
}

app.whenReady().then(createWindow);

// Quit app when all windows are closed
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
      app.quit();
  }
});

// Create window once app is activated (for macOS)
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
  }
});




// Keyboard Shortcuts

// Command + Q
app.on('ready', () => {
    // Call createWindow function to create the main window
    mainWindow = createWindow();

    // Register global shortcut
    const ret = globalShortcut.register('CommandOrControl+Q', () => {
        console.log('CommandOrControl+Q was pressed');
        if (mainWindow) {
            mainWindow.webContents.send('togglePageVisibilityTest');
            
        }
    });

    if (!ret) {
        console.log('Registration of Keyboard Shortcuts failed');
    }

    console.log(globalShortcut.isRegistered('CommandOrControl+Q'));
});


// Unregister all shortcuts when the app is about to quit

app.on('will-quit', () => {
    globalShortcut.unregisterAll();
});


