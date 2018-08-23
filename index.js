const electron = require("electron");
const path = require('path');
const { app, BrowserWindow, Tray } = electron;
const TimerTray = require("./app/timer_tray");

let mainWindow;
let tray;

const windows = process.platform === "win32";
const mac = process.platform === "darwin";

app.on("ready", () => {
	mainWindow = new BrowserWindow({
		height: 500,
		width: 300,
		frame: false,
		resizable: false,
		show: false
	});
	mainWindow.loadURL(`file://${__dirname}/src/index.html`);

	const iconName =
		windows ? "windowns-icon.png" : "iconTemplate.png";
	const iconPath = path.join(__dirname, `./src/assets/${iconName}`);
	tray = new TimerTray(iconPath);


	tray.on('click', (event, bounds) => {
		// Click event bounds
		const { x, y } = bounds;

		// Window heigh and width
		const { height, width } = mainWindow.getBounds();

		if (mainWindow.isVisible()) {
			mainWindow.hide();
		} else {
			// Modify y height for windows at botoom
			const yPosition = mac ? y : y - height;
			mainWindow.setBounds({
				x:  x - (width / 2.0),
				y: yPosition,
				height,
				width
			});
			mainWindow.show();
		}
	});
});
