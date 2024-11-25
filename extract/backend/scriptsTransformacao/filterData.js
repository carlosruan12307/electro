async function filterData(data,filterUsers,filterDates){
    return new Promise(async (resolve, reject) => {
      try {
       
        const filteredData = data.filter(row => filterUsers.includes(row["Nome completo"]) && filterDates.includes(row["Data"]));
        // const webServiceData = data.filter(row => row["Origem"].includes("ws"))
        console.log(filteredData)
  
      
  //        await configs.fs.writeFile('./relatorioLogs/teste.json', JSON.stringify(filteredData,null,4), (err) => {
  //     if (err) {
  //         console.error('Ocorreu um erro ao escrever o arquivo:', err);
  //         return;
  //     }
  //     console.log('Arquivo JSON escrito com sucesso!');
  // });
  
        resolve(filteredData);
      } catch (error) {
        reject(error); // Lida com erros e rejeita a Promise
      }
    });
  }

  module.exports={filterData}