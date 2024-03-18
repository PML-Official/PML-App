//import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

const { app, BrowserWindow, shell, globalShortcut, dialog } = require('electron');

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


// Keyboard shortcuts

// ctrl/cmnd Q

app.whenReady().then(() => {
  createWindow();

  globalShortcut.register('CommandOrControl+Q', () => {
    console.log('CommandOrControl+Q was pressed');
    dialog.showMessageBox({
      type: 'error',
      message: 'Keyboard Shortcut Pressed',
      detail: 'Command Q was pressed.',
      buttons: ['OK']
    });
  });
});

// ctrl/cmnd H

app.whenReady().then(() => {
  createWindow();

  globalShortcut.register('CommandOrControl+H', () => {
    console.log('CommandOrControl+H was pressed');
  });

  mainWindow.loadURL(`file://${path.join(__dirname,'../../Desktop/PML-App/index.html')}`)

});







// Unregister all shortcuts when the app is about to quit
app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});