const path = require('path');
const fs = require('fs/promises');
const { statSync } = require('fs');
const { printMessage } = require('./lib/helper');

const operations = ['up', 'cd', 'ls', 'cat', 'add', 'rn', 'cp', 'mv', 'rm'];

const operate = async (operation, params) => {
    switch (operation) {
        case 'up':
            up();
            break;
        case 'cd':
            cd(params[0]);
            break;
        case 'ls':
            await ls();
            break;
    }
};

const up = () => {
    process.chdir(path.join(process.cwd(), '..'));
};

const cd = (pathToDir) => {
    process.chdir(path.resolve(process.cwd(), pathToDir));
};

const ls = async () => {
    const cwd = process.cwd();
    try {
        const dirBox = [];
        const fileBox = [];
        const files = await fs.readdir(cwd);
        const filePaths = files.map((file) => path.join(process.cwd(), file));
        filePaths.forEach((path, index) => {
            const stats = statSync(path);
            if (stats.isFile()) {
                fileBox.push(files[index]);
            } else if (stats.isDirectory()) {
                dirBox.push(files[index]);
            }
        });
        const res = [...dirBox.sort(), ...fileBox.sort()];
        console.log(dirBox);
        console.log(fileBox);
    } catch (err) {
        throw err;
    }
};

module.exports = { operations, operate };
