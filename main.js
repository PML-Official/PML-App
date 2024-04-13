//import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

const { app, BrowserWindow, shell, globalShortcut, dialog, ipcMain, Menu, MenuItem } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  const win = new BrowserWindow({
    width: 1600,
    height: 1010,
    maxHeight: 1205,
    minHeight: 900,
    minWidth: 865,
    webPreferences: {
      nodeIntegration: true, 
      contextIsolation: false,
      preload: path.join(__dirname, '/More JS Folders/preload.js')
    },
    icon: process.platform === 'win32' ? path.join(__dirname, 'Windows Icon.ico') : path.join(__dirname, 'Mac-Icon.icns')
  });
  win.openDevTools();
  win.webContents.on('will-navigate', (event, url) => {
    if (url.substring(0, 4) != "file") {
      event.preventDefault(); 
      shell.openExternal(url); 
    }

  });

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


// Customize menu?

const template = [
  {
      label: 'PML',
      submenu: [
        {
          label: 'About PML App',
          accelerator: 'CmdOrCtrl+Shift+Q',
          click: () => {
            dialog.showMessageBox({
              type: 'info',
              title: 'About was clicked',
              buttons: ['OK']
            });
          }
        },
        {
          label: 'Quit',
          accelerator: 'CmdOrCtrl+Q',
          click: () => {
            app.quit()
          }
        },
        { type: 'separator'},
        {
          label: 'Hide PML App',
          accelerator: 'CmdOrCtrl+H',
          click: () => {
            if (mainWindow) {
              mainWindow.minimize();
            }
          }
        }
      ]
  },
  {
      label: 'Edit',
      submenu: [
          { label: 'Cut', role: 'cut' },
          { label: 'Copy', role: 'copy' },
          { label: 'Paste', role: 'paste' },
          { type: 'separator' },
          { label: 'Select All', role: 'selectAll' }
      ]
  },
  // Add more menu items as needed
];

const menu = Menu.buildFromTemplate(template);

Menu.setApplicationMenu(menu);


