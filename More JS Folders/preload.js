const { ipcRenderer, globalShortcut } = require('electron');

document.addEventListener('DOMContentLoaded', () => {
    const ret = globalShortcut.register('CommandOrControl+H', () => {
        ipcRenderer.send('toggleBlocks');
    });

    if (!ret) {
        console.log('Registration for Keyboard Shortcuts Failed');
    
    }});