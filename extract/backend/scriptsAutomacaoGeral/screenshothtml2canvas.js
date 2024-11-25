const { addTimestampToImage } = require("./screenshot");
const { waitUntilThenRunScript, waitUntilThenRunScriptThenReturn } = require("./waitUntilThenRunScript");
const fs = require('fs');
async function screenshothtml2canvas(selector,path,configs){
       // Captura o screenshot de um elemento específico
       const dataUrl = await waitUntilThenRunScriptThenReturn(selector,`html2canvas(document.querySelector("${selector}")).then(canvas => {
                return canvas.toDataURL('image/png');
            });`,configs)
   
   // Remove a URL de dados e converte para buffer
   const base64Data = dataUrl.replace(/^data:image\/png;base64,/, "");
   fs.writeFileSync(path, base64Data, 'base64');
   console.log('Screenshot salva como screenshot.png');

   await addTimestampToImage(path,path,10,40)

}
async function screenshothtml2canvasElement(element,selectorwait,path,configs){
    // Captura o screenshot de um elemento específico
    const et = element;
    const dataUrl = await waitUntilThenRunScriptThenReturn(selectorwait,`return html2canvas(${et}).then(canvas => {
                return canvas.toDataURL('image/png');
            });`,configs)

const base64Data = dataUrl.replace(/^data:image\/png;base64,/, "");
fs.writeFileSync(path, base64Data, 'base64');
console.log('Screenshot salva como screenshot.png');

await addTimestampToImage(path,path,10,40)

}

module.exports={screenshothtml2canvas,screenshothtml2canvasElement}