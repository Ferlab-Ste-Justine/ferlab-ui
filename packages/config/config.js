#!/usr/bin/env node

const process = require('process');
const fs = require('fs');
const os = require('os');


const templatePackageJsonFile = `${__dirname}/templates/package.template.json`;
const templateFile = require(templatePackageJsonFile);
const packageJsonFile = `${process.cwd()}/package.json`;
const file = require(packageJsonFile);

const copyCommitLintFile = () => {
    const source = `${__dirname}/templates/commitlint.config.js`;
    const target = `${process.cwd()}/commitlint.config.js`;

    fs.copyFile(source, target, err => {
        err ? console.log('ERROR: ', err)
            : console.log(`SUCCESS: ~${target.replace(os.homedir(), '')} is now updated`);
    })
}

const huskyConfig = () => {
    const dest = `${process.cwd()}/.husky`
    fs.cp(`${__dirname}/.husky`, `${dest}`, {recursive: true},  err => {
        err ? console.log('ERROR: ', err)
            : console.log(`SUCCESS: ~${dest.replace(os.homedir(), '')} is now updated`);
    })
}

const updatePackageJson = () => {
    const newPackageJson = {...file};

    Object.entries(templateFile).forEach((e) => {
        if (e.length !== 2) {
            return;
        }

        newPackageJson[e[0]] = {
            ...file[e[0]],
            ...templateFile[e[0]]
        }
    })

    fs.writeFile(packageJsonFile, JSON.stringify(newPackageJson,null,2), (err) => {
        err ? console.log('ERROR: ', err)
            : console.log(`SUCCESS: ~${packageJsonFile.replace(os.homedir(), '')} is now updated`);
    })
}

const args = process.argv;

console.log('args : ', args);

switch (args[2]) {
    case 'commitlint':
        copyEslintFile();
        copyCommitLintFile();
        break;
    case 'husky':
        huskyConfig();
        break;
    case 'updateDep':
        updatePackageJson()
        break;
    default:
        console.log('= ======================== =');
        console.log('Options are : [lint, husky, updateDep]');
        console.log('eg. npx @ferlab/config lint');
}

