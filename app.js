const readline = require('readline');

const { printMessage, getUsername } = require('./lib/helper');
const { welcome, goodBye, workingDir } = require('./lib/message');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const start = () => {
    const username = getUsername(process);
    printMessage(welcome(username));
    printMessage(workingDir(__dirname));

    rl.on('line', (input) => {
        if (input.toLowerCase() === '.exit') {
            rl.close();
        }
    });

    rl.on('close', () => {
        console.log('\n closed');
    });
};

start();
