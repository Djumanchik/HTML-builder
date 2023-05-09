const fs = require('fs');
const path = require('path');
const http = require('http');

const dirPath = path.join('/documents', '/coding', '/html-builder', '/06-build-page');

fs.mkdir(`${dirPath}/project-dist/assets/fonts`, { recursive: true }, (err) => {
  if (!err) {
    fs.readdir(
      `${dirPath}/assets/fonts`, {withFileTypes: true}, (err, files) => {
        if (!err) {
          files.forEach((files) => {
            fs.copyFile(`${dirPath}/assets/fonts/${files.name}`, `${dirPath}/project-dist/assets/fonts/${files.name}`, () => {
            });
          });
        }
      }
    );
  }
});

fs.mkdir(`${dirPath}/project-dist/assets/img`, { recursive: true }, (err) => {
  if (!err) {
    fs.readdir(
      `${dirPath}/assets/img`, {withFileTypes: true}, (err, files) => {
        if (!err) {
          files.forEach((files) => {
            fs.copyFile(`${dirPath}/assets/img/${files.name}`, `${dirPath}/project-dist/assets/img/${files.name}`, () => {
            });
          });
        }
      }
    );
  }
});

fs.mkdir(`${dirPath}/project-dist/assets/svg`, { recursive: true }, (err) => {
  if (!err) {
    fs.readdir(
      `${dirPath}/assets/svg`, {withFileTypes: true}, (err, files) => {
        if (!err) {
          files.forEach((files) => {
            fs.copyFile(`${dirPath}/assets/svg/${files.name}`, `${dirPath}/project-dist/assets/svg/${files.name}`, () => {
            });
          });
        }
      }
    );
  }
});

const writeStream = fs.createWriteStream(`${dirPath}/project-dist/style.css`);

fs.readdir(`${dirPath}/styles`, {withFileTypes: true}, (err, files) => {
  if (!err) {
    files.forEach((files) => {
          const readStream = fs.createReadStream(`${dirPath}/styles/${files.name}`, 'utf-8');
          readStream.pipe(writeStream, {end: false});
    });
  };
}); 

function copyIndex () {
  const readTemp = fs.createReadStream(`${dirPath}/template.html`, 'utf-8');
  const writeTemp = fs.createWriteStream(`${dirPath}/project-dist/index.html`);
  readTemp.pipe(writeTemp);
}
copyIndex();

fs.readFile(`${dirPath}/template.html`, 'utf-8', (err, fileContent) => {
  if (!err) {
    fs.readFile(`${dirPath}/components/header.html`, 'utf8', (errorHeader, fileContentHeader) => {
      if(errorHeader) throw errorHeader;
      fileContent = fileContent.replace(/\{\{header\}\}/, fileContentHeader);

      fs.readFile(`${dirPath}/components/footer.html`, 'utf8', (errorFooter, fileContentFooter) => {
        if(errorFooter) throw errorFooter;
        fileContent = fileContent.replace(/\{\{footer\}\}/, fileContentFooter);
        
        fs.readFile(`${dirPath}/components/articles.html`, 'utf8', (errorArticles, fileContentArticles) => {
          if(errorArticles) throw errorArticles;
          fileContent = fileContent.replace(/\{\{articles\}\}/, fileContentArticles);
          console.log(fileContent);
          fs.writeFile(`${dirPath}/project-dist/index.html`, fileContent, (err) => {
            if (err) throw err;
          });
        });
      }); 
    });
  }
});
