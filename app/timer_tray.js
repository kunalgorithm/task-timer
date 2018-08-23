const electron = require("electron");
const { Tray, Menu, app } = electron;

class TimerTray extends Tray {
	constructor(iconPath, mainWindow) {
		super(iconPath);
		this.mainWindow = mainWindow;
		this.setToolTip("Timer App");

		// run the onClick method for the built-in click event
		this.on("click", this.onClick.bind(this));
		this.on("right-click", this.onRightClick.bind(this));
	}

	onClick(event, bounds) {
		// Click event bounds
		const { x, y } = bounds;
		// Window heigh and width
		const { height, width } = this.mainWindow.getBounds();

		if (this.mainWindow.isVisible()) {
			this.mainWindow.hide();
		} else {
			// Modify y height for windows at botoom
			const yPosition = process.platform === "darwin" ? y : y - height;
			this.mainWindow.setBounds({
				x: x - width / 2.0,
				y: yPosition,
				height,
				width
			});
			this.mainWindow.show();
		}
	}

	onRightClick() {
		const menuConfig = Menu.buildFromTemplate([
			{
				label: "Quit",
				click: () => app.quit()
			}
		]);
		this.popUpContextMenu(menuConfig);
	}
}

module.exports = TimerTray;
