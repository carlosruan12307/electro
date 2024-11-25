const { parse } = require('json2csv');
const fs = require('fs').promises;
const ExcelJS = require('exceljs');
const path = require('path')
async function jsonToCSV(jsonData,dirOutput){
    try {
     
        const csv = parse(jsonData);

        // Salva o arquivo CSV
        await fs.writeFile(dirOutput, csv, 'utf8');
        console.log('Arquivo CSV criado com sucesso!');
      } catch (err) {
        console.error('Erro ao converter JSON para CSV:', err);
      }
}
async function jsonToXlsx(data, outputDir = './', fileName = 'output.xlsx') {
  try {
    // Cria uma nova pasta de trabalho
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(data.sheetName || 'Dados');

    // Verifica se o JSON contém o array de dados
    if (Array.isArray(data.data) && data.data.length > 0) {
      // Adiciona cada linha de dados
      data.data.forEach((row) => {
        worksheet.addRow(row);
      });
    } else {
      throw new Error('O JSON deve conter uma propriedade "data" com um array de arrays.');
    }

    // Garante que o diretório de saída exista
    const filePath = path.join(outputDir, fileName);
    await fs.mkdir(path.dirname(filePath), { recursive: true });

    // Salva o arquivo
    await workbook.xlsx.writeFile(filePath);
    console.log(`Arquivo salvo com sucesso em: ${filePath}`);
  } catch (error) {
    console.error('Erro ao converter JSON para XLSX:', error);
  }
}

module.exports={jsonToCSV,jsonToXlsx}