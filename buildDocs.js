const fs = require('fs');
const path = require('path');

const sourceDir = './dist/job-listings/browser';
const targetDir = './docs';

// Function to delete all files in a directory
const deleteFilesInDirectory = (directory) => {
    if (fs.existsSync(directory)) {
        fs.readdirSync(directory).forEach(file => {
            const filePath = path.join(directory, file);
            if (filePath === targetDir) {
                return; // Skip deleting the target directory itself
            }
            if (fs.lstatSync(filePath).isDirectory()) {
                deleteFilesInDirectory(filePath); // Recursively delete sub-directory
            } else {
                fs.unlinkSync(filePath); // Delete file
                console.log(`Deleted ${filePath}`);
            }
        });
        if (directory !== targetDir) {
            fs.rmdirSync(directory); // Delete empty directory, except for the target directory
            console.log(`Deleted directory ${directory}`);
        }
    }
};

// Ensure target directory exists, create it if not
if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir);
} else {
    // If target directory exists, delete all existing files
    deleteFilesInDirectory(targetDir);
}

// Function to copy files from source to target directory
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
                    // If the file is a directory, recursively copy its contents
                    fs.mkdir(targetFile, err => {
                        if (err) {
                            console.error(`Error creating directory ${targetFile}:`, err);
                        } else {
                            console.log(`Created directory ${targetFile}`);
                            copyFiles(sourceFile, targetFile);
                        }
                    });
                } else {
                    // If the file is not a directory, copy it
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

// Copy files from source directory to target directory
copyFiles(sourceDir, targetDir);
