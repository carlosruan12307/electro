const fs = require('fs');
const path = require('path')

async function getLastDownloadedCSV(directory){
    return new Promise((resolve,reject) => {
        const files = fs.readdirSync(directory)
        .map(file => ({
          name: file,
          time: fs.statSync(path.join(directory, file)).mtime.getTime()
        }))
        .filter(file => file.name.endsWith('.csv'))
        .sort((a, b) => b.time - a.time);
      
        resolve(files.length > 0 ? path.join(directory, files[0].name) : null)
      })
}
async function getLastDownloadedXLSX(directory){
  return new Promise((resolve,reject) => {
      const files = fs.readdirSync(directory)
      .map(file => ({
        name: file,
        time: fs.statSync(path.join(directory, file)).mtime.getTime()
      }))
      .filter(file => file.name.endsWith('.xlsx'))
      .sort((a, b) => b.time - a.time);
    
      resolve(files.length > 0 ? path.join(directory, files[0].name) : null)
    })
}
module.exports={getLastDownloadedCSV,getLastDownloadedXLSX}