const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    fetchData: (args) => ipcRenderer.invoke('fetch-data', args), // Expondo o evento de IPC
    onUpdateAvailable: (callback) => ipcRenderer.on('update-available', callback), // Expondo o evento de atualização disponível
    onUpdateDownloaded: (callback) => ipcRenderer.on('update-downloaded', callback), // Expondo o evento de atualização baixada
    sendToMain: (channel, data) => ipcRenderer.send(channel, data), // Expondo a função para enviar eventos ao main
});
