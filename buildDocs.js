const fs = require('fs');
const path = require('path');

const sourceDir = './dist/job-listings/browser';
const targetDir = './docs';

const deleteFilesInDirectory = (directory) => {
    if (fs.existsSync(directory)) {
        fs.readdirSync(directory).forEach(file => {
            const filePath = path.join(directory, file);
            if (filePath === targetDir) {
                return;
            }
            if (fs.lstatSync(filePath).isDirectory()) {
                deleteFilesInDirectory(filePath);
            } else {
                fs.unlinkSync(filePath);
                console.log(`Deleted ${filePath}`);
            }
        });
        if (directory !== targetDir) {
            fs.rmdirSync(directory);
            console.log(`Deleted directory ${directory}`);
        }
    }
};

if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir);
} else {
    deleteFilesInDirectory(targetDir);
}

const copyFiles = (source, target) => {
    fs.readdir(source, (err, files) => {
        if (err) {
            console.error(`Error reading directory ${source}:`, err);
            return;
        }
        files.forEach(file => {
            const sourceFile = path.join(source, file);
            const targetFile = path.join(target, file);
            fs.stat(sourceFile, (err, stats) => {
                if (err) {
                    console.error(`Error stating file ${sourceFile}:`, err);
                    return;
                }
                if (stats.isDirectory()) {
                    fs.mkdir(targetFile, err => {
                        if (err) {
                            console.error(`Error creating directory ${targetFile}:`, err);
                        } else {
                            console.log(`Created directory ${targetFile}`);
                            copyFiles(sourceFile, targetFile);
                        }
                    });
                } else {
                    fs.copyFile(sourceFile, targetFile, err => {
                        if (err) {
                            console.error(`Error copying ${sourceFile} to ${targetFile}:`, err);
                        } else {
                            console.log(`Copied ${sourceFile} to ${targetFile}`);
                        }
                    });
                }
            });
        });
    });
};

copyFiles(sourceDir, targetDir);
