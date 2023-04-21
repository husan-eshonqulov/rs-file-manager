const checkRunCommand = (process) => {
    const { argv } = process;
    return argv.length === 3 && argv[2].toLowerCase().startsWith('--username=');
};

const printMessage = (message) => {
    console.log(message);
};

const getUsername = (process) => {
    return process.argv[2].slice(11);
};

const parseCommand = (command) => {
    const { operations } = require('../operations');
    const keys = command.split(' ');
    const lowerOpr = keys[0].toLowerCase();
    const operation = operations.includes(lowerOpr) ? lowerOpr : '';
    const params = keys.slice(1);
    return { operation, params };
};

const eraseWhiteSpace = (str) => {
    str = str.trim();
    let erasedStr = '';
    for (let i = 0; i < str.length; i++) {
        erasedStr +=
            str[i] !== ' ' || (str[i + 1] !== undefined && str[i + 1] !== ' ')
                ? str[i]
                : '';
    }
    return erasedStr;
};

module.exports = {
    checkRunCommand,
    printMessage,
    getUsername,
    eraseWhiteSpace,
    parseCommand,
};
