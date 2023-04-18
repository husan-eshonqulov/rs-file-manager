const readline = require('readline');

const { checkRunCom, printMessage, getUsername } = require('./lib/helper');
const { welcome, goodBye, workingDir } = require('./lib/message');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

if (!checkRunCom(process)) {
    console.log(
        `Run command should be like this: 'npm run start -- --username=USERNAME'`
    );
    process.exit(1);
}

const start = () => {
    const username = getUsername(process);
    printMessage(welcome(username));
    printMessage(workingDir(__dirname));

    rl.on('line', (input) => {
        if (input.toLowerCase() === '.exit') return rl.close();
        printMessage(workingDir(__dirname));
    });

    rl.on('close', () => {
        printMessage(goodBye(username));
    });
};

start();
