const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    fetchData: (args) => ipcRenderer.invoke('fetch-data', args), // Expondo o evento de IPC
});
