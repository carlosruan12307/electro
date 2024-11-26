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
  async function deleteXLSXFiles(directoryPath) {
    return new Promise((resolve, reject) => {
        fs.readdir(directoryPath, (err, files) => {
            if (err) {
                console.error('Erro ao ler o diretório:', err);
                reject(err);
                return;
            }

            let filesDeleted = 0;

            files.forEach(file => {
                if (path.extname(file) === '.xlsx') {
                    const filePath = path.join(directoryPath, file);

                    fs.unlink(filePath, err => {
                        if (err) {
                            console.error('Erro ao deletar o arquivo:', err);
                        } else {
                            filesDeleted++;
                        }
                    });
                }
            });

            resolve(`${filesDeleted} arquivos .xlsx deletados`);
        });
    });
}
  module.exports={deleteCSVFiles,deleteXLSXFiles}