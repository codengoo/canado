import { is } from '@electron-toolkit/utils';
import {
  app,
  BrowserWindow,
  ipcMain,
  Menu,
  MenuItem,
  Notification,
  session,
  Tray,
} from 'electron';
import path, { join } from 'path';
import { Worker } from 'worker_threads';

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
var tray: Tray;

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
      navigateOnDragDrop: true,
    },
  });

  const session = windows.webContents.session;

  session.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': [
          "default-src 'self'; connect-src 'self' http:; script-src 'self' 'unsafe-eval' 'unsafe-inline' http:; style-src 'self' 'unsafe-inline'; img-src http: file:",
        ],
      },
    });
  });

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    windows.loadURL(process.env['ELECTRON_RENDERER_URL']);
  } else {
    windows.loadFile(join(__dirname, '../renderer/index.html'));
  }

  windows.webContents.openDevTools();
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

    try {
      var url = argv[argv.length - 1] as string;
      var a = new URLSearchParams(new URL(url).search);

      session.defaultSession.cookies.set({
        name: 'token',
        value: a.get('token') || '',
        url: 'http://localhost',
      });
    } catch {}
  });

  app.on('ready', () => {
    createWindow();

    tray = new Tray('C:\\Work\\nacado\\resources\\icon.png');

    tray.setContextMenu(
      Menu.buildFromTemplate([
        { label: 'Item1', type: 'radio' },
        { label: 'Item2', type: 'radio' },
        { label: 'Item3', type: 'radio', checked: true },
        { label: 'Item4', type: 'radio' },
      ]),
    );

    new Notification({
      title: 'Hello, app started',
      body: 'hehhe',
    }).show();
  });

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

  // Events
  ipcMain.on('close-win', () => {
    app.quit();
  });

  ipcMain.on('minimize-win', () => {
    // dialog.showMessageBox(windows!, {message: process.execPath})
    windows?.minimize();
  });

  ipcMain.on('ondragstart', () => {
    console.log('hello world ');
  });

  // quick action
  app.setUserTasks([
    {
      program: process.execPath,
      arguments: '--new-task',
      iconPath: 'C:\\plus-circle.ico',
      iconIndex: 0,
      title: 'New task',
      description: 'Create a new task',
    },
  ]);

  const menu = new Menu();
  menu.append(
    new MenuItem({
      label: 'Electron',
      submenu: [
        {
          role: 'help',
          accelerator:
            process.platform === 'darwin' ? 'Alt+Cmd+I' : 'Alt+Shift+I',
          click: () => {
            console.log('Electron rocks!');
          },
        },
      ],
    }),
  );

  Menu.setApplicationMenu(menu);

  const worker = new Worker('./src/main/scripts/block.js');

  worker.on('message', (result) => {
    console.log('Result from worker:', result);
  });

  worker.postMessage(42); // Send data to worker
}
