const electron = require('electron');
const path = require('path');
const TimerTray = require('./app/time_tray');
const MainWindow = require('./app/main_window');

const { app, BrowserWindow, Tray, Menu, ipcMain } = electron;

let mainWindow;
let tray;

app.on('ready', () => {
    process.platform === 'darwin' ? app.dock.hide() : null;
    const windowPath = `file://${__dirname}/src/index.html`
    mainWindow = new MainWindow(windowPath);


    const iconName = process.platform ===
        'win32' ? 'windows-icon.png' : 'iconTemplate.png';
    const iconPath = path.join(__dirname, `src/assets/${iconName}`);

    tray = new TimerTray(iconPath, mainWindow);
    tray.setTitle("This is working");
}); // end of app.on(...)

ipcMain.on('update-timer', (event, timeLeft) => {
    tray.setTitle(timeLeft);
})