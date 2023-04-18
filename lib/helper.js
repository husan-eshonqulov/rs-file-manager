const printMessage = (message) => {
    console.log(message);
};

const getUsername = (process) => {
    return process.argv[2].slice(11);
};

const getWorkingDir = () => {
    // return
};

module.exports = { printMessage, getUsername };
