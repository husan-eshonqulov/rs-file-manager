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

module.exports = { checkRunCommand, printMessage, getUsername };
