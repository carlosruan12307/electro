const fs = require('fs');
const path = require('path')
const csv = require('csv-parser');
const fastcsv = require('fast-csv');
const xlsx = require('xlsx');
const {filterData} = require("../scriptsTransformacao/filterData")
const {debugX} = require("../test/debug")
async function combineCSVFiles(directoryPath, outputPath,filterUsers,filterDatas,nomeArquivo,configs) {
    const files = fs.readdirSync(directoryPath).filter(file => file.endsWith('.csv'));
    let data = [];
  
    for (const file of files) {
      const filePath = path.join(directoryPath, file);
      const fileData = [];
  
      await new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
          .pipe(csv())
          .on('data', (row) => fileData.push(row))
          .on('end', () => {
            // Use Array.prototype.push.apply() para evitar o operador spread
            Array.prototype.push.apply(data, fileData);
            resolve();
          })
          .on('error', reject);
      });
    }
  
    // Chama a função `t` para manipular os dados
    data = await filterData(data,filterUsers,filterDatas)
    // await debugX(data,configs)
    // Cria o arquivo CSV combinado
    const outputFilePath = path.join(outputPath, 'RelatorioLogs.csv');
    const ws = fs.createWriteStream(outputFilePath);
    fastcsv.write(data, { headers: true }).pipe(ws);
  

    // //ws
    // const outputFilePathWS = path.join(outputPath, 'RelatorioLogsWS.csv');
    // const wsWS = fs.createWriteStream(outputFilePathWS);
    // fastcsv.write(dataWS, { headers: true }).pipe(wsWS);


    
    console.log('Os arquivos CSV foram combinados em', outputFilePath);
  }


  
  async function combineXLSXFiles(directoryPath, outputPath,nomeArquivo) {
    const files = fs.readdirSync(directoryPath).filter(file => file.endsWith('.xlsx'));
    let allData = []; // Armazena todas as linhas de dados com colunas diferentes
    let allColumns = new Set(); // Conjunto para identificar todas as colunas únicas

    // Itera pelos arquivos para coletar todas as colunas únicas
    for (const file of files) {
        const filePath = path.join(directoryPath, file);
        const workbook = xlsx.readFile(filePath);
        const sheetNames = workbook.SheetNames;

        sheetNames.forEach(sheetName => {
            const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1 });
            
            if (sheetData.length > 0) {
                // Adiciona todas as colunas da primeira linha ao conjunto
                sheetData[0].forEach(header => allColumns.add(header));
                
                // Adiciona os dados (excluindo a linha de cabeçalho)
                sheetData.slice(1).forEach(row => allData.push({ row, headers: sheetData[0], file })); // Guarda a linha com o nome do arquivo para referência
            }
        });
    }

    // Converte o conjunto de colunas para um array e prepara a estrutura do arquivo de saída
    allColumns = Array.from(allColumns);
    const combinedData = [allColumns]; // A primeira linha é o cabeçalho com todas as colunas

    // Preenche os dados combinados, garantindo que todas as colunas estejam presentes
    allData.forEach(({ row, headers }) => {
        // Cria uma linha para a saída com valores vazios em todas as colunas
        const rowData = allColumns.map(col => {
            const colIndex = headers.indexOf(col);
            return colIndex !== -1 ? row[colIndex] : ""; // Preenche vazio se a coluna não existir
        });
        combinedData.push(rowData);
    });

    // Cria um novo workbook e adiciona os dados combinados
    const newWorkbook = xlsx.utils.book_new();
    const newWorksheet = xlsx.utils.aoa_to_sheet(combinedData);
    xlsx.utils.book_append_sheet(newWorkbook, newWorksheet, nomeArquivo);

    // Salva o arquivo combinado em .xlsx
    const outputFilePath = path.join(outputPath, `${nomeArquivo}.xlsx`);
    xlsx.writeFile(newWorkbook, outputFilePath);

    console.log('Os arquivos XLSX foram combinados em', outputFilePath);
}
  

  
  module.exports={combineCSVFiles,combineXLSXFiles}