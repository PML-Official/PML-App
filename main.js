//import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

const fs = require('fs');
const { app, BrowserWindow, shell } = require('electron');

function createWindow() {
  const win = new BrowserWindow({
    width: 1600,
    height: 1000,
    webPreferences: {
      nodeIntegration: true, // Enable Node.js integration in renderer process
      contextIsolation: false,
    },
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

// Quit when all windows are closed
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});