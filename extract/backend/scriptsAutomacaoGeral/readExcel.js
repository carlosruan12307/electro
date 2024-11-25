
const ExcelJS = require('exceljs');
const fs = require('fs');
const csvParser = require('csv-parser');

async function readExcel(Dir,columnsArray){
  return new Promise((resolve, reject) => {
    var data = ""

    var fs = require("fs");
    const csv = require('csv-parser');
      // const csvFileName = 'C:/Users/951550362/Desktop/BACKSEPARADO/Automacao_SeleniumJS/automacoes/excels/placeholders-encontros (1).csv';
      var csvFileName = Dir;
  // Colunas que você deseja selecionar (por exemplo, 'coluna1', 'coluna2', 'coluna3')
  var columnsToSelect = columnsArray;
  
  // Array para armazenar os dados selecionados
  var selectedData = [];
  
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
    // .on('end', () => {
    //   // Escrever os dados JSON em um arquivo
    //   fs.writeFileSync('../jsons/excelPlaceholders.json', JSON.stringify(selectedData, null, 2));
    //   console.log('Arquivo JSON gerado com sucesso!');
    // });
    .on('end', () => {

    resolve(selectedData);

    })
  })
 

  // var data = await readJson("C:/Users/951550362/Desktop/BACKSEPARADO/Automacao_SeleniumJS/automacoes/jsons/excelPlaceholders.json",configs)


}
async function readExcelFileFull(filePath) {
  return new Promise((resolve, reject) => {
      const results = [];
      
      fs.createReadStream(filePath, {encoding: 'utf-8'})
          .pipe(csvParser())
          .on('data', (data) => results.push(data)) // Adiciona cada linha ao array results
          .on('end', () => resolve(results)) // Resolve a Promise com os dados lidos
          .on('error', (error) => reject(error)); // Rejeita a Promise em caso de erro
  });
}
async function readExcelFileFullXLSX(filePath) {
  try {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);

    const results = [];
    
    workbook.eachSheet((sheet) => {
      const sheetData = [];
      
      sheet.eachRow((row) => {
        sheetData.push(row.values.slice(1)); // Remove o índice zero que está vazio
      });

      results.push({ sheetName: sheet.name, data: sheetData });
    });

    return results;
  } catch (error) {
    throw new Error(`Erro ao ler o arquivo Excel: ${error.message}`);
  }
}

module.exports={readExcel,readExcelFileFull,readExcelFileFullXLSX}