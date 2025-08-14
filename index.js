const { app, BrowserWindow, Menu } = require('electron');

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 380,
        height: 580,
        resizable: false,
        maximizable: false,
        fullscreenable: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    });

    // Remove the menu completely
    Menu.setApplicationMenu(null);

    mainWindow.loadFile('index.html');

    mainWindow.on('closed', () => {
        mainWindow = null;
    });

}
    app.whenReady().then(createWindow);