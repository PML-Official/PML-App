//import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

const { app, BrowserWindow, shell, globalShortcut, dialog, ipcMain, Menu, MenuItem } = require('electron');
const path = require('path');
const { mainModule } = require('process');


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


// stuff for settings


// settings undo recent
ipcMain.on('show-settings-dialog-for-undo-settings', () => {
  dialog.showMessageBox({
    type: "warning",
    message: 'Are you sure you want restore to default settings?',
    buttons: ['Restore', 'Cancel']
  }).then((result) => {
    const response = result.response;
    
    if (response === 0) {
    
    } else if (response === 1) {

    } 
  })
});
// Customize menu?
/*
const template = [
  // File
  {
    label: 'PML',
    submenu: [
      // About PML App
      {
        label: 'About PML App',
        accelerator: 'CmdOrCtrl+Shift+A',
        click: () => {
          dialog.showMessageBox({
            type: 'info',
            title: 'About was clicked',
            buttons: ['OK']
          });
        }
      },
      // Line
      { type: 'separator' },
      // Refresh
      {
        label: 'Refresh',
        accelerator: 'CmdOrCtrl+R',
        click: () => {
          if (mainWindow) {
            mainWindow.reload();
          }
        }
      },
      // Quit
      {
        label: 'Quit',
        accelerator: 'CmdOrCtrl+Q',
        click: () => {
          app.quit()
        }
      },
      // Line
      { type: 'separator' },
      // Hide PML App
      {
        label: 'Hide PML App',
        accelerator: 'CmdOrCtrl+H',
        click: () => {
          if (mainWindow) {
            mainWindow.minimize();
          }
        }
      },
      // Hide Others
      {
        label: 'Hide Others',
        accelerator: 'CmdOrCtrl+Shift+H',
        click: () => {
          const allWindows = BrowserWindow.getAllWindows();
          const currentWindow = BrowserWindow.getFocusedWindow();

          allWindows.forEach(window => {
            if (window !== currentWindow) {
              window.minimize();
            }
          });
        }
      }
    ]
  },
  // Edit
  {
    label: 'Edit',
    submenu: [
      // Cut
      { label: 'Cut', role: 'cut' },
      // Copy
      { label: 'Copy', role: 'copy' },
      // Paste
      { label: 'Paste', role: 'paste' },
      // Line
      { type: 'separator' },
      // Select All
      { label: 'Select All', role: 'selectAll' },
      {
        label: 'Delete',
        accelerator: 'Backspace',
        click: () => {
          if (mainWindow) {
            mainWindow.webContents.executeJavaScript(`
              var selection = window.getSelection().toString();
              if (selection) {
                var newText = document.activeElement.value.replace(selection, '');
                document.activeElement.value = newText;
              }
            `);
          }
        }
      }
    ]
  }
  // Add more menu items as needed
];

const menu = Menu.buildFromTemplate(template);

Menu.setApplicationMenu(menu);

*/