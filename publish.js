require('dotenv').config();
const { exec } = require('child_process');

const ghToken = process.env.GH_TOKEN;

if (!ghToken) {
  console.error("Erro: GH_TOKEN não está definido!");
  process.exit(1);
}

const command = `npx electron-builder --publish always --config.publish.token ${ghToken}`;

exec(command, (err, stdout, stderr) => {
  if (err) {
    console.error(`Exec Error: ${err}`);
    return;
  }
  console.log(stdout);
  console.error(stderr);
});
