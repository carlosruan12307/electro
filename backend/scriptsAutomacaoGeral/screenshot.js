
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const moment = require('moment-timezone');
const { scrollToElement } = require('./screenshotElement');
// Função para adicionar data e hora na imagem
// async function addTimestampToImage(originalImagePath, tempImagePath,x,y) {
//     const timestamp = moment().tz('America/Sao_Paulo').format('YYYY-MM-DD HH:mm:ss');
//   const image = sharp(originalImagePath);
//   const { width, height } = await image.metadata();

//   const textOverlay = Buffer.from(
//     `<svg width="${width}" height="${height}">
//        <text x="${x}" y="${y}" font-size="36" fill="red">${timestamp}</text>
//      </svg>`
//   );

//   await image
//     .composite([{ input: textOverlay, gravity: 'northwest' }])
//     .toFile(tempImagePath);  // Salvar em um arquivo temporário
// }
async function addTimestampToImage(originalImagePath, tempImagePath, x, y) {
  const timestamp = moment().tz('America/Sao_Paulo').format('YYYY-MM-DD HH:mm:ss');
  const image = sharp(originalImagePath);
  const { width, height } = await image.metadata();

  const barHeight = 50;

  // Criar uma barra branca na parte superior da imagem
  const whiteBar = Buffer.from(
    `<svg width="${width}" height="${barHeight}">
       <rect width="100%" height="100%" fill="white"/>
     </svg>`
  );

  const textOverlay = Buffer.from(
    `<svg width="${width}" height="${barHeight}">
       <text x="${x}" y="${y}" font-size="36" fill="red">${timestamp}</text>
     </svg>`
  );

  // Combinar a barra branca e o texto com a imagem original
  await sharp({
    create: {
      width: width,
      height: height + barHeight,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    }
  })
  .composite([
    { input: whiteBar, top: 0, left: 0 },
    { input: await image.toBuffer(), top: barHeight, left: 0 },
    { input: textOverlay, top: 0, left: 0 }
  ])
  .toFile(tempImagePath);  // Salvar em um arquivo temporário
}
async function screenshot(configs,path,x,y) {
 


    const screenshot = await configs.driver.takeScreenshot();
    const screenshotPath = 'screenshot.png';
    const tempScreenshotPath = 'temp_screenshot.png';

    // Salvar a captura de tela
    fs.writeFileSync(path, screenshot, 'base64');

    // Adicionar data e hora na captura de tela
    await addTimestampToImage(path, tempScreenshotPath,x,y);

    // Substituir a imagem original pela imagem com timestamp
    fs.renameSync(tempScreenshotPath, path);

    console.log(`Captura de tela salva em ${screenshotPath}`);
  
};
async function addWhiteBarAndText(inputImagePath, outputImagePath) {
  const timestamp = moment().tz('America/Sao_Paulo').format('YYYY-MM-DD HH:mm:ss');
  const barHeight = 50; // Altura da barra branca

  // Cria a barra branca com texto
  const whiteBar = Buffer.from(
      `<svg width="100%" height="${barHeight}">
          <rect width="100%" height="100%" fill="white"/>
      </svg>`
  );

  const textOverlay = Buffer.from(
      `<svg width="100%" height="${barHeight}">
          <text x="10" y="40" font-size="36" fill="red">${timestamp}</text>
      </svg>`
  );

  // Carrega a imagem cortada
  const croppedImage = sharp(inputImagePath);
  const { width: croppedWidth, height: croppedHeight } = await croppedImage.metadata();

  // Cria a imagem final com a barra branca e o texto
  await sharp({
      create: {
          width: croppedWidth,
          height: croppedHeight + barHeight,
          channels: 4,
          background: { r: 255, g: 255, b: 255, alpha: 0 }
      }
  })
  .composite([
      { input: whiteBar, top: 0, left: 0 },   // Adiciona a barra branca na parte superior
      { input: textOverlay, top: 0, left: 0 }, // Adiciona o texto sobre a barra
      { input: await croppedImage.toBuffer(), top: barHeight, left: 0 }  // Adiciona a imagem cortada abaixo da barra
  ])
  .toFile(outputImagePath); // Salva a imagem final

  console.log('Imagem final salva como output-image.png');
}

async function screenshotElementWithTimestampWhiteBar(selector, configs, tempImagePath) {
  const element = await configs.driver.findElement(configs.By.css(`${selector}`));
  await configs.driver.sleep(2000); 
  await scrollToElement(element, configs);
  await configs.driver.sleep(2000); 
  const rect = await configs.driver.executeScript(function (element) {
    const { x, y, width, height } = element.getBoundingClientRect();
    return { x, y, width, height };
  }, element);

  console.log('Posição e tamanho do elemento:', rect);

  const screenshot = await configs.driver.takeScreenshot();
  const imgBuffer = Buffer.from(screenshot, 'base64');
  const image = sharp(imgBuffer);
  const { width: imgWidth, height: imgHeight } = await image.metadata();

  console.log('Dimensões da imagem:', { imgWidth, imgHeight });

  if (rect.x >= 0 && rect.y >= 0 &&
      rect.x + rect.width <= imgWidth &&
      rect.y + rect.height <= imgHeight) {
    const croppedBuffer = await sharp(imgBuffer)
      .extract({
        left: Math.round(rect.x),
        top: Math.round(rect.y),
        width: Math.round(rect.width),
        height: Math.round(rect.height)
      })
      .toBuffer();
    
    const timestamp = moment().tz('America/Sao_Paulo').format('YYYY-MM-DD HH:mm:ss');
    const croppedImage = sharp(croppedBuffer);
    const { width: croppedWidth, height: croppedHeight } = await croppedImage.metadata();

    const barHeight = 50;

    // Criar uma barra branca na parte superior da imagem cortada
    const whiteBar = Buffer.from(
      `<svg width="${croppedWidth}" height="${barHeight}">
         <rect width="100%" height="100%" fill="white"/>
       </svg>`
    );

    const textOverlay = Buffer.from(
      `<svg width="${croppedWidth}" height="${barHeight}">
         <text x="${10}" y="${40}" font-size="36" fill="red">${timestamp}</text>
       </svg>`
    );

    // Combinar a barra branca e o texto com a imagem cortada
    await sharp({
      create: {
        width: croppedWidth,
        height: croppedHeight + barHeight,
        channels: 4,
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      }
    })
    .composite([
      { input: whiteBar, top: 0, left: 0 },
      { input: await croppedImage.toBuffer(), top: barHeight, left: 0 },
      { input: textOverlay, top: 0, left: 0 }
    ])
    .toFile(tempImagePath);  // Salvar em um arquivo temporário

    return tempImagePath;
  } else {
    console.error('Área de recorte está fora dos limites da imagem.');
    return null;
  }
}
module.exports={screenshot,screenshotElementWithTimestampWhiteBar,addTimestampToImage}