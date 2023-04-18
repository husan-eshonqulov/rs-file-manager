const welcome = (username) => {
    return `Welcome to the File Manager, ${username}!`;
};

const goodBye = (username) => {
    return `Thank you for using File Manager, ${username}, goodbye!`;
};

const workingDir = (path) => {
    return `You are currently in ${path}`;
};

module.exports = { welcome, goodBye, workingDir };
