const fs = require('fs');
const csv = require('csv-parser');
const { transform } = require('../scripts/transform');
const { readJson } = require('../scripts/readJson');
async function readExcelThenTransform(dirExcel,dirWherePutJsonExcel,dirWherePutJsonTransform,columnsToSelect,mainColumn){

  // Nome do arquivo CSV que você deseja ler
  const csvFileName = dirExcel;

  // Array para armazenar os dados selecionados
  const selectedData = [];

  // Retorna uma nova Promise
  return new Promise((resolve, reject) => {
    // Leitura do arquivo CSV e seleção das colunas desejadas
    fs.createReadStream(csvFileName)
      .pipe(csv())
      .on('data', (row) => {
        const selectedRow = {};
        columnsToSelect.forEach(column => {
          selectedRow[column] = row[column];
        });
        selectedData.push(selectedRow);
      })
      .on('end', async () => {
        try {
          // Escrever os dados JSON em um arquivo
          var transformD = await transform(selectedData, columnsToSelect, mainColumn, dirWherePutJsonTransform);
          fs.writeFileSync(dirWherePutJsonExcel, JSON.stringify(selectedData, null, 2));
          resolve(transformD); // Resolve a Promise com os dados selecionados
        } catch (error) {
          reject(error); // Rejeita a Promise em caso de erro
        }
      })
      .on('error', reject); // Rejeita a Promise em caso de erro de leitura
  });
}

module.exports={readExcelThenTransform}
  