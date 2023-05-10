const fs = require('fs');
const path = require('path');
const readline = require('readline');
const process = require('process');

const output = fs.createWriteStream(
  path.join(__dirname, '/text.txt')
);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'Здравствуйте!',
});

rl.prompt();

rl.on('line', (input) => {

  console.log(`Вы ввели текст: ${input}`);
  if (input === 'exit') return exitTask();

  output.write(`\n${input}`, (err) => {
      if (err) throw err;
    });
});

rl.on('SIGINT', () => {
  exitTask();
}); 

function exitTask() {
  console.log('До свидания.');
  output.end();
  rl.close();
};
