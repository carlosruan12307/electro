const { ipcRenderer } = require('electron');

// Escuta eventos de atualização
ipcRenderer.on('update-available', () => {
    alert('Atualização disponível! O download será iniciado em breve.');
});

ipcRenderer.on('update-downloaded', () => {
    const userResponse = confirm('Atualização baixada. Deseja instalar agora?');
    if (userResponse) {
        ipcRenderer.send('install-update');
    }
});
