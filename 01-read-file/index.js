const fs = require('fs');
const path = require('path');

// fs.readFile(
//   path.join('/documents', '/coding', '/html-builder', '/01-read-file', '/text.txt'),
//   'utf-8',
//   (err, data) => {
//     if (err) throw err;
//     console.log(data);
//   }
// );

const read = fs.createReadStream(
  path.join('/documents', '/coding', '/html-builder', '/01-read-file', '/text.txt'),
  'utf-8'
);
read.on('data', chunk => console.log(chunk));