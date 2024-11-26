import { is } from '@electron-toolkit/utils';
import { app, BrowserWindow, dialog, ipcMain } from 'electron';
import path, { join } from 'path';

if (process.defaultApp) {
  if (process.argv.length >= 2) {
    app.setAsDefaultProtocolClient('nacado', process.execPath, [
      path.resolve(process.argv[1]),
    ]);
  } else {
    app.setAsDefaultProtocolClient('nacado');
  }
}

var windows: BrowserWindow | null = null;

const createWindow = (): void => {
  windows = new BrowserWindow({
    height: 650,
    width: 1000,
    resizable: false,
    autoHideMenuBar: true,
    frame: false,
    transparent: true,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: false,
    },
  });

  const session = windows.webContents.session;

  session.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': [
          "default-src 'self'; connect-src 'self' http://3.25.58.118:8888; script-src 'self' 'unsafe-eval' 'unsafe-inline' http://3.25.58.118:8888; style-src 'self' 'unsafe-inline'; img-src http: file:",
        ],
      },
    });
  });

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    windows.loadURL(process.env['ELECTRON_RENDERER_URL']);
  } else {
    windows.loadFile(join(__dirname, '../renderer/index.html'));
  }
};
const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit();
} else {
  app.on('second-instance', (event, argv, workingDir, props) => {
    if (windows) {
      if (windows.isMinimized()) windows.restore();
      windows.focus();
    }

    console.log(argv);

    dialog.showErrorBox('Welcome Back', `You arrived from: ${argv.pop()}`);
  });

  app.on('ready', createWindow);

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });

  ipcMain.on('close-win', () => {
    app.quit();
  });

  ipcMain.on('minimize-win', () => {
    windows?.minimize();
  });
}
