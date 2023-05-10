const fs = require('fs');
const path = require('path');
const process = require('process');
const dirPath = path.join(__dirname, '/secret-folder');
const resultData = [];

fs.readdir(
  dirPath,
  {withFileTypes: true},
  (error, files) => {
    if (!error) {
      files.forEach((files) => {
        let ext = '';
        let name = '';
        let size = '';
        let result = '';
        if (files.isFile()) {
          ext = path.extname(files.name)
          name = (files.name).slice(0, - (ext.length));
          fs.stat(`${dirPath}/${files.name}`, (error, stats) => {
            if (error) {
              console.error(error);
            } else {
              size = stats.size;
              result = `${name} - ` + `${ext} - ` + `${size}b`;
              resultData.push(result);
              console.log(result);
            }
          });
        }
      });
    } else {
      console.error(error);
    }
});


