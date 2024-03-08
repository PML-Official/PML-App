//import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

const fs = require('fs');
const { app, BrowserWindow } = require('electron');

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true, // Enable Node.js integration in renderer process
      contextIsolation: false,
    },
  });
  win.openDevTools();

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

