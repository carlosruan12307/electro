const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { relatorioAgendamento } = require('./backend/server');

let mainWindow;

const { autoUpdater } = require('electron-updater');


const createWindow = () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true, // Importante para segurança
            enableRemoteModule: false,
            nodeIntegration: true,
        },
    });

    mainWindow.loadFile('./frontend/public/index.html');

     // Verifica atualizações
     autoUpdater.checkForUpdatesAndNotify();

     // Listeners para eventos do autoUpdater
     autoUpdater.on('update-available', () => {
         mainWindow.webContents.send('update-available');
     });
 
     autoUpdater.on('update-downloaded', () => {
         mainWindow.webContents.send('update-downloaded');
     });
};
// Instala a atualização quando o usuário confirma
ipcMain.on('install-update', () => {
    autoUpdater.quitAndInstall();
});
// Evento para processar mensagens do frontend
ipcMain.handle('fetch-data', async (event, args) => {
    // Simula uma operação no backend
    const data = await relatorioAgendamento(args);
    return data; // Retorna a resposta para o frontend
});



app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
