const cheerio = require('cheerio');
async function tableHTMLToCSV(tableHTML){

    const $ = cheerio.load(tableHTML);
    let csv = [];

    // Loop através das linhas da tabela
    $('tr').each(function () {
        let row = [];
        // Captura os valores das células (<td> e <th>)
        $(this).find('td, th').each(function () {
            row.push($(this).text().trim());
        });
        csv.push(row.join(';'));
    });

    // Junta todas as linhas em uma string CSV
    return csv.join('\n');
}
module.exports={tableHTMLToCSV}