async function formatDate(inputDate) {
    return new Promise((resolve,reject) => {
     
         // Define um array com os nomes dos meses em português
      const months = [
        'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
        'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
    ];
  
    // Usa regex para capturar o dia, o mês e o ano
    const regex = /(\d{1,2}) de (\w+) de (\d{4})/;
    const match = inputDate.match(regex);
  
    if (match) {
        const [_, day, monthName, year] = match;
        // Encontra o índice do mês no array (começa em 0, então adiciona 1)
        const monthIndex = months.indexOf(monthName);
        
        if (monthIndex !== -1) {
            // Formata o mês para duas casas decimais
            const formattedMonth = String(monthIndex + 1).padStart(2, '0');
            // Formata o ano para dois dígitos
            const formattedYear = year.slice(-2);
            // Retorna a data no formato desejado
            return resolve(`${day}/${formattedMonth}/${formattedYear}`);
        }
    }
  
    throw new Error('Data no formato esperado não encontrada');
  
    })
  }
  // formatar data com as casas certas
  function formatDateString(dateString) {
    // Divide a string em partes: dia, mês e ano
    const [day, month, year] = dateString.split('/');

    // Formata o dia e o mês para duas casas decimais
    const formattedDay = String(day).padStart(2, '0');
    const formattedMonth = String(month).padStart(2, '0');
    const formattedYear = String(year).padStart(2, '0'); // Para garantir que tenha duas casas

    // Retorna a data formatada
    return `${formattedDay}/${formattedMonth}/${formattedYear}`;
}

  module.exports={formatDate,formatDateString}