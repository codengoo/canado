import { electronAPI } from '@electron-toolkit/preload';
import { contextBridge, ipcRenderer } from 'electron';
import path from 'path';

const api = {
  closeWindows: () => ipcRenderer.send('close-win'),
  minimizeWindows: () => ipcRenderer.send('minimize-win'),
  startDrag: (fileName: string) =>
    ipcRenderer.send('ondragstart', path.join(process.cwd(), fileName)),
};

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI);
    contextBridge.exposeInMainWorld('api', api);
  } catch (error) {
    console.error(error);
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI;
  // @ts-ignore (define in dts)
  window.api = api;
}
