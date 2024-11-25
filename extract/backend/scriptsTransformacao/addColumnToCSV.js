async function addColumnToCSV(inputFile, outputFile, newColumnName, newColumnValue){
    const createCsvWriter = require('csv-writer').createObjectCsvWriter;
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
      path: outputFile,
      header: headers,
    });
  
    // Escrever no novo arquivo CSV
    await csvWriter.writeRecords(records);
    console.log('Novo arquivo CSV criado com sucesso!');
}

module.exports={addColumnToCSV}