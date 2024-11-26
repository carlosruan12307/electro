const {  waitUntilThenSendKeys } = require("./geral");
const path = require('path')
var fs = require("fs");
async function  loginMoodle(username,password,configs) {
    try {
        await configs.driver.get("https://ead.unifor.br")
        await waitUntilThenSendKeys(`#username`,username,configs)
        // const password = await configs.driver.findElement(configs.By.xpath('//*[@id="password"]'))
        // await password.sendKeys('adminEAD2023!');
        await waitUntilThenSendKeys(`#password`,password,configs)
        await waitUntilThenSendKeys(`button`,configs.Key.ENTER,configs)
       
        // await password.sendKeys(configs.Key.ENTER)
        return {"message" : "login realizado com sucesso"}
        // await configs.driver.sleep(3000)
    } catch (error) {
        return {"error" : "usuario ou senha incorretos"}
    }
}
async function  loginMoodleApart(username,password) {
    const { Builder, By, Key,until } = require('selenium-webdriver');
    const chrome = require('selenium-webdriver/chrome');
    
    let options = new chrome.Options();
    options.addArguments('--disable-dev-shm-usage') // Para evitar problemas com a memória compartilhada


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
   
    let driver = new Builder()
  .forBrowser('chrome')
  .setChromeOptions(options)
  .build();
  const configs = {fs,Builder,By,Key,until,chrome,options,driver}
    try {
        console.log("AAA")
        console.log(username)
       
        await driver.get("https://ead.unifor.br")
        await waitUntilThenSendKeys(`#username`,username,configs)
        // const password = await configs.driver.findElement(configs.By.xpath('//*[@id="password"]'))
        // await password.sendKeys('adminEAD2023!');
        await waitUntilThenSendKeys(`#password`,password,configs)
        await waitUntilThenSendKeys(`button`,configs.Key.ENTER,configs)
        await configs.driver.wait(configs.until.urlContains('my'), 1000); // Ajuste a URL para o destino esperado pós-login]
       await configs.driver.quit()
        // await password.sendKeys(configs.Key.ENTER)
        return {"message" : "login realizado com sucesso"}
        // await configs.driver.sleep(3000)
    } catch (error) {
       
        await configs.driver.quit()
        return {"message" : "usuario ou senha incorretos"}
    }
}

module.exports = {loginMoodle,loginMoodleApart}