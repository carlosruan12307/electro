const {  waitUntilThenSendKeys } = require("./geral");

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


module.exports = {loginMoodle}