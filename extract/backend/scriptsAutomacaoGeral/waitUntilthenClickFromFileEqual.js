async function waitUntilthenClickFromTextEqual(tagOrClassButtonWhereText,textClick,tagOrClassButton,configs){ // percorre todos os selectors do selectorText entao colocar selector generico

    try {
        var x =  await configs.driver.wait(configs.until.elementLocated(configs.By.css(`${tagOrClassButtonWhereText}`)),10000).then((e) => configs.driver.executeScript(`return [...document.querySelectorAll("${tagOrClassButtonWhereText}")].filter((e) =>   e.textContent.includes(${textClick}))[0].closest("${tagOrClassButton}").click()`))
        return x;
       } catch (error) {
         console.log(error)
         return false;
       }

}
async function waitUntilthenClickFromTextEqualX(tagOrClassButtonWhereText,textClick,configs){ // percorre todos os selectors do selectorText entao colocar selector generico

  try {
      var x =  await configs.driver.wait(configs.until.elementLocated(configs.By.css(`${tagOrClassButtonWhereText}`)),10000).then((e) => configs.driver.executeScript(`return [...document.querySelectorAll("${tagOrClassButtonWhereText}")].filter((e) =>   e.textContent.includes(${textClick}))[0].click()`))
      return x;
     } catch (error) {
       console.log(error)
       return false;
     }

}
module.exports={waitUntilthenClickFromTextEqual,waitUntilthenClickFromTextEqualX}