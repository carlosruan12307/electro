
const fs = require('fs');
const sharp = require('sharp');
const { waitElementExistThenReturn } = require('./geral');
// meio bugado tem que ver
async function screenshotFullElement(selector, path, configs) {
  const element = await configs.driver.findElement(configs.By.css(selector));
    const elementHeight = await configs.driver.executeScript("return arguments[0].scrollHeight", element);

    let offsetY = 0;
    const viewportHeight = await configs.driver.executeScript("return window.innerHeight");
    const screenshotBuffers = [];

    while (offsetY < elementHeight) {
        await configs.driver.executeScript("arguments[0].scrollIntoView(true); window.scrollBy(0, -arguments[1]);", element, 0);
        const screenshot = await configs.driver.takeScreenshot();
        const imgBuffer = Buffer.from(screenshot, 'base64');

        const sharpImg = sharp(imgBuffer);
        const { height: imgHeight } = await sharpImg.metadata();

        // Determine the portion of the image to extract
        const sliceHeight = Math.min(viewportHeight, imgHeight);
        const buffer = await sharpImg
            .extract({ left: 0, top: 0, width: imgHeight, height: sliceHeight })
            .toBuffer();

        screenshotBuffers.push(buffer);
        configs.driver.executeScript("arguments[0].scrollIntoView(true); window.scrollBy(0, -arguments[1]);", element, navbarHeight);
        offsetY += viewportHeight;
        await configs.driver.executeScript("window.scrollBy(0, arguments[0]);", viewportHeight);
    }

    // Combina todos os buffers de imagem capturados verticalmente
    return await combineScreenshotsVertically([],path,configs,screenshotBuffers);
}

async function screenshotElement(selector,path,configs){
    // Encontre o elemento usando querySelector
    const element = await configs.driver.findElement(configs.By.css(`${selector}`)); // Substitua pelo seletor do seu elemento
    await scrollToElement(element,configs)
    // Obtenha a posição e o tamanho do elemento
    const rect = await configs.driver.executeScript(function (element) {
      const { x, y, width, height } = element.getBoundingClientRect();
      return { x, y, width, height };
    }, element);

    console.log('Posição e tamanho do elemento:', rect);

    // Tire uma captura de tela da página inteira
    const screenshot = await configs.driver.takeScreenshot();

    // Salve a captura de tela como um buffer
    const imgBuffer = Buffer.from(screenshot, 'base64');

    // Obtenha as dimensões da imagem original
    const image = sharp(imgBuffer);
    const { width: imgWidth, height: imgHeight } = await image.metadata();

    console.log('Dimensões da imagem:', { imgWidth, imgHeight });

    // Verifique se as coordenadas e dimensões estão dentro dos limites da imagem

    const left = Math.max(0, Math.min(rect.x, imgWidth - rect.width));
    const top = Math.max(0, Math.min(rect.y, imgHeight - rect.height));
    const width = Math.min(rect.width, imgWidth - left);
    const height = Math.min(rect.height, imgHeight - top);
      // Recorte a imagem para incluir apenas o elemento
      sharp(imgBuffer)
        .extract({
          left: left,
          top: top,
          width: width,
          height: height
        })
        .toFile(path, (err, info) => {
          if (err) {
            console.error('Erro ao recortar a imagem:', err);
          } else {
            console.log('Captura de tela salva como element-screenshot.png');
          }
        });
    
}
async function screenshotElementParamElement(elementX,path,configs){
    // Encontre o elemento usando querySelector
    const element = elementX // Substitua pelo seletor do seu elemento
    await scrollToElement(element,configs)
    // Obtenha a posição e o tamanho do elemento
    const rect = await configs.driver.executeScript(function (element) {
      const { x, y, width, height } = element.getBoundingClientRect();
      return { x, y, width, height };
    }, element);

    console.log('Posição e tamanho do elemento:', rect);

    // Tire uma captura de tela da página inteira
    const screenshot = await configs.driver.takeScreenshot();

    // Salve a captura de tela como um buffer
    const imgBuffer = Buffer.from(screenshot, 'base64');

    // Obtenha as dimensões da imagem original
    const image = sharp(imgBuffer);
    const { width: imgWidth, height: imgHeight } = await image.metadata();

    console.log('Dimensões da imagem:', { imgWidth, imgHeight });

    // Verifique se as coordenadas e dimensões estão dentro dos limites da imagem
    if (rect.x >= 0 && rect.y >= 0 &&
        rect.x + rect.width <= imgWidth &&
        rect.y + rect.height <= imgHeight) {

      // Recorte a imagem para incluir apenas o elemento
     await sharp(imgBuffer)
        .extract({
          left: Math.round(rect.x),
          top: Math.round(rect.y),
          width: Math.round(rect.width),
          height: Math.round(rect.height)
        })
        .toFile(path, (err, info) => {
          if (err) {
            console.error('Erro ao recortar a imagem:', err);
          } else {
            console.log('Captura de tela salva como element-screenshot.png');
          }
        });
    }else {
      console.error('Área de recorte está fora dos limites da imagem.');
    }
  
}

async function scrollToElement(element, configs, navbarHeight = 120) {
    await configs.driver.executeScript("arguments[0].scrollIntoView(true); window.scrollBy(0, -arguments[1]);", element, navbarHeight);
}

async function screenshotElementBuffer(selector, configs) {
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
      
      return croppedBuffer;
    } else {
      console.error('Área de recorte está fora dos limites da imagem.');
      return null;
    }
}

async function combineScreenshotsVertically(selectors, outputPath, configs,screenshotBuffersZ = []) {
    const screenshotBuffers = screenshotBuffersZ;

    for (const selector of selectors) {
        const buffer = await screenshotElementBuffer(selector, configs);
        if (buffer) {
            screenshotBuffers.push(buffer);
        }
    }

    if (screenshotBuffers.length === 0) {
        console.error('Nenhuma imagem foi capturada.');
        return;
    }

    const images = screenshotBuffers.map(buffer => sharp(buffer));
    const imageInfos = await Promise.all(images.map(img => img.metadata()));

    const totalHeight = imageInfos.reduce((sum, info) => sum + info.height, 0);
    const maxWidth = Math.max(...imageInfos.map(info => info.width));

    const compositeImages = [];
    let offset = 0;
    for (const img of images) {
        compositeImages.push({
            input: await img.toBuffer(),
            top: offset,
            left: 0
        });
        offset += (await img.metadata()).height;
    }

    await sharp({
        create: {
            width: maxWidth,
            height: totalHeight,
            channels: 4,
            background: { r: 255, g: 255, b: 255, alpha: 0 }
        }
    })
    .composite(compositeImages)
    .toFile(outputPath);

    console.log(`Imagem combinada salva como ${outputPath}`);
}
module.exports={screenshotElement,screenshotElementParamElement,combineScreenshotsVertically,scrollToElement,screenshotFullElement}