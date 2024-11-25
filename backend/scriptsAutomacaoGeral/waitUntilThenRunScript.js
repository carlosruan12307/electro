async function waitUntilThenRunScript(selector, scriptC, configs) {
  try {
      const scriptToExecute = `
          (function() {
             return ${scriptC}
          })();
      `;
      await configs.driver.sleep(3000)
      var x = await configs.driver.wait(configs.until.elementLocated(configs.By.css(`${selector}`)), 10000)
                    .then(() => configs.driver.executeScript(scriptToExecute));
      return x;
  } catch (error) {
       return error;
  }
}

async function waitUntilThenRunScriptThenReturn(selector, scriptC, configs) {
    try {
        const scriptToExecute = `
           return (function() {
               return ${scriptC}
            })();
        `;
    
        var x = await configs.driver.wait(configs.until.elementLocated(configs.By.css(`${selector}`)), 10000)
                      .then(() => configs.driver.executeScript(scriptToExecute));
        return x;
    } catch (error) {
         return false
    }
  }
  async function waitUntilThenRunScriptThenReturnElementOrNot3000(selector, scriptC, configs) {
    try {
        const scriptToExecute = `
           return (function() {
                ${scriptC}
            })();
        `;
        await configs.driver.sleep(3000)
        var x = await configs.driver.wait(configs.until.elementLocated(configs.By.css(`${selector}`)), 3000)
                      .then(() => configs.driver.executeScript(scriptToExecute));
                      console.log(x)
        return true;
        
    } catch (error) {
         return false;
    }
  }
// Exemplo de chamada
// await waitUntilThenRunScript("li[role='option']", "console.log('AA'); console.log('BB');", configs);

module.exports = { waitUntilThenRunScript,waitUntilThenRunScriptThenReturn,waitUntilThenRunScriptThenReturnElementOrNot3000 };
