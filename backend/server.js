const { ClicarBotaoEditarADM } = require('./scriptsAutomacaoGeral/AtivarEd');
const { loginMoodle } = require('./scriptsAutomacaoGeral/Login');
const { readExcelFileFull, readExcelFileFullXLSX } = require('./scriptsAutomacaoGeral/readExcel');
const { waitUntilthenClickFromTextEqual, waitUntilthenClickFromTextEqualX } = require('./scriptsAutomacaoGeral/waitUntilthenClickFromFileEqual');
const { waitUntilThenRunScript } = require('./scriptsAutomacaoGeral/waitUntilThenRunScript');
const { getLastDownloadedCSV, getLastDownloadedXLSX } = require('./scriptsTransformacao/getLastDownloadedCSV');
const { debugX } = require('./test/debug');
const path = require('path')
var fs = require("fs");
const { waitForDownloadCompletion, waitForAllDownloadsCompletion } = require('./scriptsAutomacaoGeral/waitDownloadFinish');
const { jsonToXlsx } = require('./scriptsTransformacao/jsonToCSV');
const { combineXLSXFiles } = require('./scriptsTransformacao/combineCSVFiles');
const { waitElementThenReturnTextContent } = require('./scriptsAutomacaoGeral/geral');
const { deleteXLSXFiles } = require('./scriptsAutomacaoGeral/deleteCSVFiles');
async function relatorioAgendamento(){
    const { Builder, By, Key,until } = require('selenium-webdriver');
    const chrome = require('selenium-webdriver/chrome');
    
    let options = new chrome.Options();
    options.addArguments('--disable-dev-shm-usage');
    options.setUserPreferences({
      'download.default_directory': path.join(__dirname,'./relatorios/relatorioAgendamento'),
      'download.prompt_for_download': false,
      'download.directory_upgrade': true,
      'safebrowsing_for_trusted_sources_enabled': false,
      'safebrowsing.enabled': false,
      'profile.default_content_settings.popups': 0,
      'profile.default_content_setting_values.automatic_downloads': 1,
      'profile.content_settings.exceptions.automatic_downloads.*.setting': 1

  });
  // primeiro item do data sao as colunas
  var headers = [
    "Nome",
    "Matricula",
    "Endereço de e-mail",
    "Grupo",
    "Escolha",
    "Data",
    "Hora",
    "Bloco",
    "Laboratorio",
    "Disciplina"
  ]
  var excelXLSX = {
    "sheetName" : "",
    "data" : []
  }
    var oneTime = false;
    let driver = new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build();
      const configs = {fs,Builder,By,Key,until,chrome,options,driver}
      
      await loginMoodle("730549335","12345678",configs);
      // await driver.get("https://ead.unifor.br/ava/course/view.php?id=74911")
      var oneTimeClickEdADM = await ClicarBotaoEditarADM(configs);
      oneTimeClickEdADM();
      const urls = [
        "https://ead.unifor.br/ava/mod/choice/report.php?id=4031704",
        "https://ead.unifor.br/ava/mod/choice/report.php?id=4031706"
    ];
    

      for (let index = 0; index < urls.length; index++) {
        // var url =  await driver.getCurrentUrl()
        configs.driver.get(urls[index])
      //   const regex = /[?&]id=(\d+)/;
      // const match = url.match(regex);
      // const id = match ? match[1] : null;
      //  await waitUntilThenRunScript("#agendamento1chamada",`[...document.querySelectorAll(".choice")][${index}].querySelector(".actions .dropdown .dropdown-menu a:nth-child(1)").click()`,configs)
       var nomeRecurso = await waitElementThenReturnTextContent(".page-header-headings h1",configs)
      //  await waitUntilThenRunScript("a",`[...document.querySelectorAll("a")].filter((e) =>   e.textContent.includes("Respostas"))[0].click()`,configs)
       await waitUntilThenRunScript("a",`[...document.querySelectorAll("button")].filter((e) =>   e.textContent.includes("Download em formato Excel"))[0].click()`,configs)
       await waitForAllDownloadsCompletion(path.join(__dirname,"./relatorios/relatorioAgendamento"))
      var pathFile = await getLastDownloadedXLSX(path.join(__dirname,"./relatorios/relatorioAgendamento"))
     
      var excelXLSX = await readExcelFileFullXLSX(pathFile)
        var data = excelXLSX[0]
        var dataWithouSheetName = data.data;
        for (let index = 1; index < dataWithouSheetName.length; index++) {
          const element = dataWithouSheetName[index];
          

          element[0] = element[1] + " " +  element[0];
          dataWithouSheetName[index].splice(1,1)
                   // Utilizando regex para encontrar os códigos dos cursos
//                    //100%
// const regex = /([A-Z]\d{3})/g; // A regex captura letras seguidas de três dígitos

// 40%
const regex = /[A-Za-z]\d{3}-(\d{2})/g;
const codigos = element[3].match(regex); // Retorna um array com os códigos

// Juntando os códigos em uma string separados por espaço
const resultado = codigos.join(' '); 

          element[3] = resultado

          var partes = element[4].split(", ")
       
          element.push(partes[0])
          element.push(partes[1])
          element.push(partes[2])
          element.push(partes[3])
          element[9] = nomeRecurso.split(" - ")[0]
        }

        data.data[0] = headers
        data.data = dataWithouSheetName;
      await debugX(data,configs)
        await jsonToXlsx(data,path.join(__dirname,"./relatorios/relatorioAgendamento/relatorioModificado"),`kek${index}.xlsx`)
       
      }
      await combineXLSXFiles(path.join(__dirname,"./relatorios/relatorioAgendamento/relatorioModificado"),path.join(__dirname,"../Downloads"),"relatorioAgendamento")
      await deleteXLSXFiles(path.join(__dirname,"./relatorios/relatorioAgendamento/relatorioModificado"))
      await deleteXLSXFiles(path.join(__dirname,"./relatorios/relatorioAgendamento"))
      return "loucura po deu foi certo oh"
}


module.exports={relatorioAgendamento}