const fs = require('fs');
const path = require('path');
const dirPath = path.join(__dirname);

fs.mkdir(`${dirPath}/project-dist`, { recursive: true }, (err) => {
  if (err) throw err;
});

const writeStream = fs.createWriteStream(`${dirPath}/project-dist/bundle.css`);

fs.readdir(`${dirPath}/styles`, {withFileTypes: true}, (err, files) => {
  if (!err) {
    files.forEach((files) => {
      if (files.isFile()) {
        if ('.css' === path.extname(files.name)) {
          const readStream = fs.createReadStream(`${dirPath}/styles/${files.name}`, 'utf-8');
          readStream.pipe(writeStream, {end: false});
        };
      };
    });
  };
  console.log('All styles copyed!');
});
