// Usando a API exposta pelo preload.js
window.electronAPI.onUpdateAvailable(() => {
    alert('Atualização disponível! O download será iniciado em breve.');
});

window.electronAPI.onUpdateDownloaded(() => {
    const userResponse = confirm('Atualização baixada. Deseja instalar agora?');
    if (userResponse) {
        window.electronAPI.sendToMain('install-update');
    }
});
