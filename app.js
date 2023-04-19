const readline = require('readline');
const os = require('os');

const { checkRunCommand, printMessage, getUsername } = require('./lib/helper');
const {
    welcome,
    goodBye,
    workingDir,
    invalidInput,
    operationFaild,
} = require('./lib/message');
const { parseCommand, operate } = require('./operations');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const homeDir = os.homedir();

if (!checkRunCommand(process)) {
    console.log(
        `Run command should be like this: 'npm run start -- --username=USERNAME'`
    );
    process.exit(1);
}

process.chdir(homeDir);

const start = () => {
    const username = getUsername(process);
    printMessage(welcome(username));
    printMessage(workingDir(process.cwd()));

    rl.on('line', (input) => {
        input = input.trim();
        if (input.toLowerCase() === '.exit') return rl.close();

        const { operation, params } = parseCommand(input);
        if (!operation) return printMessage(invalidInput());

        try {
            operate(operation, params);
        } catch (err) {
            return printMessage(operationFaild());
        }

        printMessage(workingDir(process.cwd()));
    });

    rl.on('close', () => {
        printMessage(goodBye(username));
    });
};

start();
