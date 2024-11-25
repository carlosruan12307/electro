
const {getLastDownloadedCSV} = require("../scriptsTransformacao/getLastDownloadedCSV")
const fs = require('fs');
const csv = require('csv-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
async function addColumnToLastDownloadedCSV(directory, newColumnName, newColumnValue){
    const inputFile = await getLastDownloadedCSV(directory);

    if (!inputFile) {
      console.error('Nenhum arquivo CSV encontrado no diretório especificado.');
      return;
    }
  
    const records = [];
  
    // Leitura do CSV existente
    await new Promise((resolve, reject) => {
      fs.createReadStream(inputFile)
        .pipe(csv())
        .on('data', (row) => {
          // Adiciona a nova coluna e seu valor para cada linha existente
          row[newColumnName] = newColumnValue;
          records.push(row);
        })
        .on('end', resolve)
        .on('error', reject);
    });
  
    // Especificação das colunas para o novo CSV
    const headers = Object.keys(records[0]).map((key) => ({ id: key, title: key }));
  
    const csvWriter = createCsvWriter({
      path: inputFile, // Sobrescreve o arquivo original
      header: headers,
    });
  
    // Escrever no novo arquivo CSV
    await csvWriter.writeRecords(records);
    console.log(`Arquivo CSV atualizado com sucesso: ${inputFile}`);
}
module.exports={addColumnToLastDownloadedCSV}
