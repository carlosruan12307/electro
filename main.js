const { app, BrowserWindow } = require('electron');
const path = require('path');
const { spawn } = require('child_process');

let mainWindow;
let backendProcess;

const startBackend = () => {
    const backendPath = app.isPackaged
        ? path.join(process.resourcesPath, 'backend/server.js')
        : path.join(__dirname, 'backend/server.js');

    console.log(`Starting backend from: ${backendPath}`); // Log do caminho

    backendProcess = spawn('node', [backendPath], {
        detached: true,
        stdio: 'ignore',
    });

    backendProcess.on('error', (err) => {
        console.error('Failed to start backend:', err);
    });

    backendProcess.unref();
};


// Cria a janela principal do Electron
const createMainWindow = () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
    });

    // Carrega o frontend
    mainWindow.loadFile(path.join(__dirname, 'frontend/public/index.html'));
};

app.whenReady().then(() => {
    startBackend(); // Inicia o backend
    createMainWindow(); // Cria a janela do Electron
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        if (backendProcess) {
            backendProcess.kill(); // Finaliza o backend ao fechar o aplicativo
        }
        app.quit();
    }
});
