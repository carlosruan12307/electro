const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { relatorioAgendamento } = require('./backend/server');

let mainWindow;

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
};

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
