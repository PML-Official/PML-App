//import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

const { app, BrowserWindow, shell, globalShortcut, dialog } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1600,
    height: 1000,
    webPreferences: {
      nodeIntegration: true, // Enable Node.js integration in renderer process
      contextIsolation: false,
    },
    // Icon Programmability
    icon: process.platform === 'win32' ? path.join(__dirname, 'Windows Icon.ico') : path.join(__dirname, 'Mac-Icon.icns')
  });

  win.webContents.openDevTools();

  win.webContents.on('will-navigate', (event, url) => {
    event.preventDefault(); // Prevent default navigation behavior
    shell.openExternal(url); // Open the link in the default system browser
  });

  win.loadFile('index.html');
}

// Quit app when all windows are closed
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Create window once app is opened
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// Create window when app is ready
app.whenReady().then(() => {
  createWindow();

  // Keyboard shortcuts

  // ctrl/cmnd Q
  globalShortcut.register('CommandOrControl+Q', () => {
    console.log('CommandOrControl+Q was pressed');
    dialog.showMessageBox({
      type: 'error',
      message: 'Keyboard Shortcut Pressed',
      detail: 'Command Q was pressed.',
      buttons: ['OK']
    });
  });

  // ctrl/cmnd H
  globalShortcut.register('CommandOrControl+H', () => {
    console.log('CommandOrControl+H was pressed');
  });
});

// Unregister all shortcuts when the app is about to quit
app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});