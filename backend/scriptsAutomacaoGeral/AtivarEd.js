//importar função

const { waitUntilThenClickJS } = require("./geral");


//funções que executam apenas uma vez
async function ClicarBotaoEditarADM(configs) {
  let executado = false;
  return async function() {
    if (!executado) {
      await waitUntilThenClickJS(".editmode-switch-form .custom-control-input",configs)
      executado = true;
     }
  }

 
}

module.exports = { ClicarBotaoEditarADM }