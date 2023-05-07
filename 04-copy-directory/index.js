const fs = require('fs');
const path = require('path');
const dirPath = path.join('/documents', '/coding', '/html-builder', '/04-copy-directory');

fs.mkdir(`${dirPath}/files-copy`, { recursive: true }, (err) => {
    if (err) {
      throw err;
    } else {
      fs.readdir(
        `${dirPath}/files`, {withFileTypes: true}, (err, files) => {
          if (!err) {
            files.forEach((files) => {
              fs.copyFile(`${dirPath}/files/${files.name}`, `${dirPath}/files-copy/${files.name}`, () => {
              });
            });
            console.log('Job well done!');
          }
        }  
      );
    }
});
