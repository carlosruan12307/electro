// Função para obter o nome do arquivo temporário (.crdownload)
const fs = require('fs');
function getCrdownloadFile(downloadDir) {
    const files = fs.readdirSync(downloadDir);
    return files.find(file => file.endsWith('.crdownload'));
  }
  function waitForAllDownloadsCompletion(downloadDir, stabilizationTime = 3000) {
    return new Promise((resolve, reject) => {
      let previousFileCount = 0;
      let stableTime = 0;
      
      const checkInterval = setInterval(() => {
        const files = fs.readdirSync(downloadDir);
        const currentFileCount = files.length;
  
        // Verifica se a contagem de arquivos no diretório está estável
        if (currentFileCount === previousFileCount) {
          stableTime += 1000;
        } else {
          stableTime = 0; // Reinicia o tempo estável quando há mudança
        }
  
        previousFileCount = currentFileCount;
  
        // Se o diretório estiver estável pelo tempo especificado, consideramos o download completo
        if (stableTime >= stabilizationTime) {
          clearInterval(checkInterval);
          resolve();
        }
      }, 1000); // Verifica a cada 1 segundo
    });
  }
  // Função para esperar o download terminar (o arquivo .crdownload desaparecer)
  function waitForDownloadCompletion(downloadDir) {
    return new Promise((resolve, reject) => {
        const checkInterval = setInterval(() => {
            const crdownloadFile = getCrdownloadFile(downloadDir);
            if (!crdownloadFile) {
                clearInterval(checkInterval);
                resolve();  // O arquivo .crdownload sumiu, o download está completo
            }
        }, 1000); // Verifica a cada 1 segundo
    });
  }

  module.exports={getCrdownloadFile,waitForDownloadCompletion,waitForAllDownloadsCompletion}