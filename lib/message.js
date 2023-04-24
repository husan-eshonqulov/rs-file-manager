const welcome = (username) => {
    return `Welcome to the File Manager, ${username}!`;
};

const goodBye = (username) => {
    return `Thank you for using File Manager, ${username}, goodbye!`;
};

const workingDir = (path) => {
    return `You are currently in ${path}`;
};

const invalidInput = () => {
    return 'Invalid input';
};

const operationFaild = () => {
    return 'Operation failed';
};

module.exports = { welcome, goodBye, workingDir, invalidInput, operationFaild };
