const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
        },
    });
    //mainWindow.loadFile(path.join(__dirname, 'index.html'));
    // for deployment in production
    //mainWindow.loadFile(path.join(__dirname, 'react-ui', 'build', 'index.html'));
    // for hot reloading in development 
    mainWindow.loadURL('http://localhost:3000');
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
