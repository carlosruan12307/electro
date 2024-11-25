async function criarPasta(dir){
    const fs = require('fs');
    const path = require('path');
    
    // Caminho da pasta que você quer criar
    const dirPath = dir;
    
     // Verificar se a pasta já existe
  fs.access(dirPath, fs.constants.F_OK, (err) => {
    if (err) {
      // Pasta não existe, criar a pasta de forma assíncrona
      fs.mkdir(dirPath, { recursive: true }, (err) => {
        if (err) {
          return console.error(`Erro ao criar a pasta: ${err.message}`);
        }
        console.log(`Pasta criada com sucesso em: ${dirPath}`);
      });
    } else {
      console.log(`Pasta já existe em: ${dirPath}`);
    }
  });
}

module.exports={criarPasta}