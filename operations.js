const path = require('path');

const operations = ['up', 'cd', 'ls', 'cat', 'add', 'rn', 'cp', 'mv', 'rm'];

const parseCommand = (command) => {
    const keys = command.split(' ');
    const lowerOpr = keys[0].toLowerCase();
    const operation = operations.includes(lowerOpr) ? lowerOpr : '';
    const params = keys.slice(1);
    return { operation, params };
};

const operate = (operation, params) => {
    switch (operation) {
        case 'up':
            up();
            break;
        case 'cd':
            cd(params[0]);
            break;
    }
};

const up = () => {
    process.chdir(path.join(process.cwd(), '..'));
};

const cd = (pathToDir) => {
    process.chdir(path.resolve(process.cwd(), pathToDir));
};

module.exports = { parseCommand, operate };
