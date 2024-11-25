const fs = require('fs');
const path = require('path')
async function deleteCSVFiles(directoryPath) {
    return new Promise((resolve,reject) => {
      fs.readdir(directoryPath, (err, files) => {
        if (err) {
            console.error('Erro ao ler o diretório:', err);
            return;
        }
  
        files.forEach(file => {
            if (path.extname(file) === '.csv') {
                const filePath = path.join(directoryPath, file);
  
                fs.unlink(filePath, err => {
                    if (err) {
                        console.error('Erro ao deletar o arquivo:', err);
                    } else {
                        resolve("deletados")
                    }
                });
            }
        });
    });
    })
  }

  module.exports={deleteCSVFiles}