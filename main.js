const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { relatorioAgendamento } = require('./backend/server');

let mainWindow;

const { autoUpdater } = require('electron-updater');
const { loginMoodle, loginMoodleApart } = require('./backend/scriptsAutomacaoGeral/Login');
require('electron-reload')(__dirname, {
    electron: require(`${__dirname}/node_modules/electron`),
    ignored: /node_modules|[\/\\]\./,
});

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
    // mainWindow.loadURL('http://localhost:3000');
    mainWindow.loadFile('./frontend/public/index.html');
    mainWindow.on('close', (event) => {
        // Fecha o aplicativo completamente ao clicar no X
        app.quit();
    });
autoUpdater.on('error', (error) => {
    console.error('Erro no autoUpdater:', error);
});

autoUpdater.on('checking-for-update', () => {
    console.log('Procurando por atualizações...');
});

autoUpdater.on('update-available', (info) => {
    console.log('Atualização disponível:', info);
});

autoUpdater.on('update-not-available', (info) => {
    console.log('Nenhuma atualização disponível:', info);
});

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
    var response =  await relatorioAgendamento();
   return  response;
});


ipcMain.handle('login', async (event, args) => {
   
    var response =  await loginMoodleApart(args.matricula,args.password);
   return  response;
});


app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
