const readline = require('readline');
const os = require('os');

const { operate } = require('./operations');
const {
    checkRunCommand,
    printMessage,
    getUsername,
    eraseWhiteSpace,
    parseCommand,
} = require('./lib/helper');
const {
    welcome,
    goodBye,
    workingDir,
    invalidInput,
    operationFaild,
} = require('./lib/message');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const homeDir = os.homedir();

if (!checkRunCommand(process)) {
    console.log(
        `Run command should be like this: 'npm run start -- --username=USERNAME'`
    );
    process.exit();
}

process.chdir(homeDir);

const start = () => {
    const username = getUsername(process);
    printMessage(welcome(username));
    printMessage(workingDir(process.cwd()));

    rl.on('line', async (command) => {
        command = eraseWhiteSpace(command);
        if (command.toLowerCase() === '.exit') return rl.close();

        const { operation, params } = parseCommand(command);
        if (!operation) return printMessage(invalidInput());

        try {
            await operate(operation, params);
        } catch (err) {
            return printMessage(operationFaild());
        }

        printMessage(workingDir(process.cwd()));
    });

    rl.on('close', () => {
        return printMessage(goodBye(username));
    });
};

start();
