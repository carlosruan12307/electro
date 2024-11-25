
const sleep = 3000;
var responses = []




async function waitElementThenClearInput(selector,configs){
  try {

   await configs.driver.wait(configs.until.elementLocated(configs.By.css(`${selector}`)),10000).then((e) => e.clear())
   return true;
   } catch (error) {
    console.log("erro: " + error);
    return false;
   }
}

async function waitElementExistThenReturn(selector,configs){
   
  try {
    await configs.driver.wait(configs.until.elementLocated(configs.By.css(`${selector}`)),3000) 
    return true;
  } catch (error) {
    console.log("erro: " + error);
    return false;
   
  }

}
//use after changes inside codemirror
async function waitThenClickSaveCodeMirror(configs){

  await waitUntilThenClickJS("#id_generalhdr .atto_collapse_button",configs)

  await waitUntilThenClickJS("#id_generalhdr  .atto_html_button",configs)
 
}
async function waitThenClickSaveCodeMirrorRotulo(configs){
 
  await waitUntilThenClickJS("#id_generalhdr .atto_collapse_button",configs)
 
  await waitUntilThenClickJS("#id_generalhdr  .atto_html_button",configs)
 
}
//use after changes inside codemirror
async function waitThenClickSaveCodeMirrorResourceDescription(configs){
 
  await waitUntilThenClickJS("#id_general .atto_collapse_button",configs)
 
    await waitUntilThenClickJS("#id_general  .atto_html_button",configs)
   
}
async function waitThenClickSaveCodeMirrorContent(configs){
 
  await waitUntilThenClickJS("#id_contentsectioncontainer .atto_collapse_button",configs)
 
    await waitUntilThenClickJS("#id_contentsectioncontainer  .atto_html_button",configs)
   
 
}
async function waitElementExistThenReturnHTML(selector,configs){
  try {
  
    return await configs.driver.wait(configs.until.elementLocated(configs.By.css(`${selector}`)),10000).then((e) => configs.driver.executeScript(`return document.querySelector('${selector}').innerHTML`))
 
  } catch (error) {
    console.log(error)
   return error;
  }
}
async function waitUntilThenQuerySelectorAllThenChangeAttrs(selector,attr,newValue,configs){

  try {
  
  return  await configs.driver.wait(configs.until.elementLocated(configs.By.css(`${selector}`)),10000).then((e) => configs.driver.executeScript(`return document.querySelectorAll(\`${selector}\`).forEach((e) => e.setAttribute(\`${attr}\`,\`${newValue}\`))`))
   return true;
  
  } catch (error) {
    console.log(error)
    return false;
  }
}
async function waitUntilThenClick(selector,configs){
try {
  
  await configs.driver.wait(configs.until.elementLocated(configs.By.css(`${selector}`)),10000).then((e) => e.click())
 return true;
} catch (error) {
  console.log(error)
  return false;
}
}
async function waitUntilThenClickJS(selector,configs){
  console.log(`document.querySelector(\`${selector}\`).click()`)
  try {
  
    await configs.driver.wait(configs.until.elementLocated(configs.By.css(`${selector}`)),100000).then((e) => configs.driver.executeScript(`return document.querySelector(\`${selector}\`).click()`))
   return true;
  } catch (error) {
    console.log(error)
    return false;
  }
}
  async function waitUntilThenClickJSChild(selector,child,configs){
    console.log(`document.querySelector(\`${selector}\`).click()`)
    try {
    
      await configs.driver.wait(configs.until.elementLocated(configs.By.css(`${selector}`)),10000).then((e) => configs.driver.executeScript(`return document.querySelectorAll(\`${selector}\`)[${child}].click()`))
     return true;
    } catch (error) {
      console.log(error)
      return false;
    }
  }
  async function waitUntilThenQuerySelectorAllThenReturnAttr(selector,attr,configs){
    console.log(`document.querySelector(\`${selector}\`).click()`)
    try {
    
    return  await configs.driver.wait(configs.until.elementLocated(configs.By.css(`${selector}`)),10000).then((e) => configs.driver.executeScript(`return document.querySelectorAll(\`${selector}\`).${attr}`))
     
    
    } catch (error) {
      console.log(error)
      return false;
    }
  }
async function waitElementThenReturnTextContent(selector,configs){
 try {
  return await configs.driver.wait(configs.until.elementLocated(configs.By.css(`${selector}`)),10000).then((e) => e.getText())
 } catch (error) {
  console.log("erro: " + error);
  throw error;
 }
}
async function waitElementThenReturnAttrAways(selector,attr,configs){
  try {
   return await configs.driver.wait(configs.until.elementLocated(configs.By.css(`${selector}`)),10000).then((e) => configs.driver.executeScript(`return document.querySelector(\`${selector}\`).${attr}`))
  } catch (error) {
  //  console.log("erro: " + error);
  // return false;
  throw(error);
  }
 }
 async function waitElementThenReturnAttrCheck(selector,attr,configs){
  try {
   return await configs.driver.wait(configs.until.elementLocated(configs.By.css(`${selector}`)),10000).then((e) => configs.driver.executeScript(`return document.querySelector(\`${selector}\`).${attr}`))
   
  } catch (error) {
   console.log("erro: " + error);
  return false;
  // throw(error);
  }
 }
 async function waitElementThenReturnAttrGet(selector,attr,configs){
  try {
   return await configs.driver.wait(configs.until.elementLocated(configs.By.css(`${selector}`)),10000).then((e) => configs.driver.executeScript(`return document.querySelector(\`${selector}\`).getAttribute(\`${attr}\`)`))
  } catch (error) {
  //  console.log("erro: " + error);
  // return false;
  throw(error);
  }
 }
async function waitUntilThenSendKeys(selector,text,configs){
  try {
    configs.driver.sleep(sleep)
    await waitElementThenClearInput(selector,configs);
   await configs.driver.wait(configs.until.elementLocated(configs.By.css(`${selector}`)),10000).then((e) => e.sendKeys(text)).then(() => configs.driver.sleep(sleep))
    return true;
   } catch (error) {
    console.log("erro: " + error);
    return false;
   }
}


async function waitUntilThenRemoveJS(selector,configs){
  try {
  
    await configs.driver.wait(configs.until.elementLocated(configs.By.css(`${selector}`)),10000).then((e) => configs.driver.executeScript(`return document.querySelector('${selector}').remove()`))
   return true;
  } catch (error) {
    console.log(error)
    return false;
  }
}
async function waitUntilThenChangeInnerHTML(selector,newvalue,configs){
  try {
  console.log("AAAAAAAAAAAAAXXX" + `document.querySelector('${selector}').innerHTML = \` ${newvalue} \``)
   var x =  await configs.driver.wait(configs.until.elementLocated(configs.By.css(`${selector}`)),10000).then((e) => configs.driver.executeScript(`return document.querySelector('${selector}').innerHTML = \` ${newvalue} \``))
   
   return true;
  } catch (error) {
    console.log(error)
    return false;
  }
}
async function waitUntilThenAddClassList(selector,classValue,configs){
  try {
    console.log("KKK: " + `document.querySelector('${selector}').classList.add(${classValue})`)
    var x =  await configs.driver.wait(configs.until.elementLocated(configs.By.css(`${selector}`)),10000).then((e) => configs.driver.executeScript(`return document.querySelector('${selector}').classList.add(\`${classValue}\`)`))
    console.log("KKK: " + x)
    return true;
   } catch (error) {
     console.log(error)
     return false;
   }
}
async function waitUntilThenChangeAttr(selector,attr,valueAttr,configs){
  try {
    var x =  await configs.driver.wait(configs.until.elementLocated(configs.By.css(`${selector}`)),10000).then((e) => configs.driver.executeScript(`return document.querySelector('${selector}').setAttribute(\`${attr}\`,\`${valueAttr}\`)`))
    console.log("KKK: " + x)
    return true;
   } catch (error) {
     console.log(error)
     return false;
   }
}
async function removeElement(selector,configs){
  try {
    var x =  await configs.driver.wait(configs.until.elementLocated(configs.By.css(`${selector}`)),10000).then((e) => configs.driver.executeScript(`return document.querySelector('${selector}').remove()`))
    console.log("KKK: " + x)
    return true;
   } catch (error) {
     console.log(error)
     return false;
   }
}
async function waitUntilThenRemoveAttr(selector,attr,configs){
  try {
    var x =  await configs.driver.wait(configs.until.elementLocated(configs.By.css(`${selector}`)),10000).then((e) => configs.driver.executeScript(`return document.querySelector('${selector}').removeAttribute(\`${attr}\`)`))
    console.log("KKK: " + x)
    return true;
   } catch (error) {
     console.log(error)
     return false;
   }
}

async function waitElementThenChangeCodeMirrorRemoving_ChangeElement(configs){
try {
  var id = await input("digite o selector do elemento:")
    var elementoZ = await waitElementExistThenReturn(id,configs)
  var ans = await input("voce quer deletar(0) ou modificar(1)")
if(ans == 0){
await waitUntilThenRemoveFromCodeMirror(id,configs)
var continuar = await input("deseja mais alguma mudança? 0 para sim e 1 para nao")
if(continuar == 1){
  responses.push({
    change: "deleted",
    id: id
  })
  await waitElementThenChangeCodeMirrorRemoving_ChangeElement(configs)
}else{
  return responses;
}
// return ["deleted",id]
}
if(ans == 1){
  var newV = await input("innerHTML ok?")
  while(newV != "ok"){
     newV = await input("innerHTML ok?")
    
  }
    var html = await readHTML("C:/Users/951550362/Desktop/BACKSEPARADO/Automacao_SeleniumJS/automacoes/html/teste1.html")
    await waitUntilThenModifyFromCodeMirror(id,html,configs)
    responses.push({
      change: "modify",
      id: id,
      html: html
    })
    // return await waitElementExistThenReturnHTML(`.CodeMirror-lines .CodeMirror-code`,configs)
    var continuar = await input("deseja mais alguma mudança? 0 para sim e 1 para nao")
    if(continuar == 0){
     await waitElementThenChangeCodeMirrorRemoving_ChangeElement(configs)
    }else{
      return responses;
    }
    // return ["modify",id,html]

}
    // await waitUntilThenClickJS(".atto_html_button",configs)
    // var cont = await waitElementThenReturnTextContent(".CodeMirror-lines .CodeMirror-code",configs)
    // await createHTML(pathHTML,"<h1>a</h1>")
    // var html = await readHTML(pathHTML)
    //  await configs.driver.wait(configs.until.elementLocated(configs.By.css(`#id_introeditoreditable`)),10000).then((e) => configs.driver.executeScript(`return document.querySelector('#id_introeditoreditable').innerHTML = \`\ ${html} \``))
    //   await waitUntilThenClickJS(".atto_html_button",configs)
    //   await configs.driver.wait(configs.until.elementLocated(configs.By.css(`.CodeMirror-lines .CodeMirror-code`)),10000).then((e) => configs.driver.executeScript(`return document.querySelector('.CodeMirror-lines .CodeMirror-code').innerHTML = \`\ ${html} \``))
} catch (error) {
  
}
}
async function waitElementThenChangeCodeMirrorFromHTML(pathHTML,configs){
  try {
    
    // await input()
    // await waitUntilThenClickJS(".atto_html_button",configs)
    // var cont = await waitElementThenReturnTextContent(".CodeMirror-lines .CodeMirror-code",configs)
    // await createHTML(pathHTML,"<h1>a</h1>")
    var html = await readHTML(pathHTML)
     await configs.driver.wait(configs.until.elementLocated(configs.By.css(`#id_introeditoreditable`)),10000).then((e) => configs.driver.executeScript(`return document.querySelector('#id_introeditoreditable').innerHTML = \`\ ${html} \``))
      await waitUntilThenClickJS(".atto_html_button",configs)
      await configs.driver.wait(configs.until.elementLocated(configs.By.css(`.CodeMirror-lines .CodeMirror-code`)),10000).then((e) => configs.driver.executeScript(`return document.querySelector('.CodeMirror-lines .CodeMirror-code').innerHTML = \`\ ${html} \``))
   } catch (error) {
    console.log("erro: " + error);
    throw error;
   }
}
async function waitUntilThenChangeSelectIndexOption(selector,indexOption,configs){
  try {
   
     await configs.driver.wait(configs.until.elementLocated(configs.By.css(`${selector}`)),10000).then((e) => configs.driver.executeScript(`var element = document.querySelector(\`${selector}\`);
    var event = new Event('change', { bubbles: true, cancelable: true });
    var optionV = [...document.querySelectorAll("${selector} option")][${indexOption}].value
    element.value = optionV;
    element.dispatchEvent(event);
    `)).then(async () => "")
    return true;
 
  } catch (error) {
    console.log(error)
   return error;
  }
}
async function waitUntilThenChangeSelect(selector,nomeSelect,configs){
  try {
   
     await configs.driver.wait(configs.until.elementLocated(configs.By.css(`${selector}`)),10000).then((e) => configs.driver.executeScript(`var element = document.querySelector(\`${selector}\`);
    var event = new Event('change', { bubbles: true, cancelable: true });
    var optionV = [...document.querySelectorAll("${selector} option")].filter((e) => e.textContent.includes("${nomeSelect}"))[0].value
    element.value = optionV;
    element.dispatchEvent(event);
    `)).then(async () => "")
    return true;
 
  } catch (error) {
    console.log(error)
   return error;
  }
}
// number  = 0 , 1 ,2 qual corresponde ele no select, 0 é o primeiro 1 o segundo e assim por diante
async function waitUntilThenChangeSelectByOrder(selector,number,configs){
  try {
    await configs.driver.sleep(3000)
     await configs.driver.wait(configs.until.elementLocated(configs.By.css(`${selector}`)),10000).then((e) => configs.driver.executeScript(`var element = document.querySelector(\`${selector}\`);
    var event = new Event('change', { bubbles: true, cancelable: true });
    var optionV = [...document.querySelectorAll("${selector} option")][${number}].value
    element.value = optionV;
    element.dispatchEvent(event);
    `)).then(async () => await configs.driver.sleep(3000))
    return true;
 
  } catch (error) {
    console.log(error)
   return error;
  }
}
module.exports = {waitUntilThenChangeSelectByOrder,waitElementThenReturnTextContent,waitUntilThenChangeSelectIndexOption,waitThenClickSaveCodeMirrorRotulo,waitThenClickSaveCodeMirrorContent,waitUntilThenQuerySelectorAllThenReturnAttr,waitUntilThenChangeInnerHTML,waitUntilThenRemoveAttr,waitUntilThenClickJSChild,waitUntilThenAddClassList,waitUntilThenClick,waitElementExistThenReturn,waitUntilThenClickJS,waitUntilThenSendKeys,waitElementThenChangeCodeMirrorFromHTML,waitElementThenChangeCodeMirrorRemoving_ChangeElement,waitElementExistThenReturnHTML,waitUntilThenChangeAttr,waitElementThenReturnAttrCheck,waitElementThenReturnAttrAways,waitUntilThenChangeSelect,waitUntilThenRemoveJS,waitElementThenClearInput,removeElement,waitUntilThenQuerySelectorAllThenChangeAttrs,waitThenClickSaveCodeMirror,waitThenClickSaveCodeMirrorResourceDescription,waitElementThenReturnAttrGet}