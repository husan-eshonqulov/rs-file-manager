const path = require('path');
const fs = require('fs/promises');
const { statSync, createReadStream } = require('fs');
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
        case 'cat':
            cat(params[0]);
            break;
        case 'add':
            add(params[0]);
            break;
        default:
            throw new Error('Operation failed');
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
        let dirBox = [];
        let fileBox = [];
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
        dirBox.sort();
        fileBox.sort();
        dirBox = dirBox.map((dir) => ({ name: dir, type: 'directory' }));
        fileBox = fileBox.map((file) => ({ name: file, type: 'file' }));
        const table = [...dirBox, ...fileBox];
        console.table(table);
    } catch (err) {
        throw err;
    }
};

const cat = (pathToFile) => {
    const readStream = createReadStream(pathToFile, { encoding: 'utf8' });
    readStream.on('data', (chunk) => {
        printMessage(chunk);
    });
};

const add = (fileName) => {
    const filePath = path.join(process.cwd(), fileName);
    fs.writeFile(filePath, '');
};

module.exports = { operations, operate };
