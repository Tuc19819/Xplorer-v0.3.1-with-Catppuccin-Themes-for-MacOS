import isTauri from '../Util/is-tauri';
let windowName: string;
if (isTauri) {
	const window = require('@tauri-apps/api/window');
	windowName = window.getCurrent().label;
} else windowName = location.pathname;

const listenWindowClose = (): Promise<void> => {
	if (isTauri) {
		const { event } = require('@tauri-apps/api');
		return new Promise((resolve) => {
			event.listen('tauri://close-requested', () => {
				const { appWindow } = require('@tauri-apps/api/window');
				resolve();
				appWindow.close();
			});
		});
	} else {
		return new Promise((resolve) => {
			window.addEventListener('beforeunload', () => {
				resolve();
			});
		});
	}
};

const createNewWindow = (): void => {
	if (isTauri) {
		const { WebviewWindow } = require('@tauri-apps/api/window');
		new WebviewWindow(Math.random().toString(), {
			decorations: true,
			transparent: true,
			title: 'Xplorer',
			hiddenTitle: true,
			fullscreen: false,
			resizable: true,
			width: 900,
			height: 600,
			minWidth: 400,
			minHeight: 200,
			// macOS specific settings
			titleBarStyle: process.platform === 'darwin' ? 'hiddenInset' : undefined,
			skipTaskbar: false,
			focus: true,
			visible: false, // Start hidden and show after setup
		}).once('tauri://created', function () {
			// Wait a bit for the window to be properly created
			setTimeout(() => {
				this.show();
				this.setDecorations(true);
			}, 100);
		});
	}
};

const changeWindowTitle = (title: string): void => {
	if (isTauri) {
		const { window } = require('@tauri-apps/api');
		window.getCurrent().setTitle(`${title} - Xplorer`);
	} else document.title = `${title} - Xplorer`;
};

const setDecorations = (decorations: boolean): void => {
	if (isTauri) {
		const { window } = require('@tauri-apps/api');
		window.getCurrent().setDecorations(decorations);
	}
};
const listenUpdateTheme = (cb: () => void): void => {
	if (isTauri) {
		const { event } = require('@tauri-apps/api');
		event.listen('update_theme', () => cb());
	}
};

export default windowName;
export { listenWindowClose, createNewWindow, changeWindowTitle, setDecorations, listenUpdateTheme };
