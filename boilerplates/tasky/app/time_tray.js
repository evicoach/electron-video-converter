const electron = require('electron');

const { Tray, Menu } = electron; // destructure Tray from electron

class TimerTray extends Tray {
    constructor(iconPath, mainWindow) {
        super(iconPath); // call the parent class constructor

        const contextMenu = Menu.buildFromTemplate([
            {
                label: 'Toggle',
                click: (event) => {
                    // click event bounds
                    const { x, y } = electron.screen.getCursorScreenPoint();

                    // window height and width
                    const { height, width } = mainWindow.getBounds();
                    if (mainWindow.isVisible()) {
                        mainWindow.hide();
                    } else {
                        const yPos = process.platform === 'win32' ? y - height : y
                        mainWindow.setBounds({
                            x: x - (width * .5), // subtract half the width of the app container
                            y: yPos,
                            height: height,
                            width: width
                        })
                        mainWindow.show();
                    }
                }
            },
            { label: 'Settings' },
            {
                label: 'Exit',
                click: () => {
                    app.exit();
                }
            },
        ]);
        this.setToolTip('This is my application.');
        this.setContextMenu(contextMenu);
    }



}

module.exports = TimerTray; // export TimerTray