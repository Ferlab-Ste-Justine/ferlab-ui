#!/usr/bin/env node

const process = require('process');
const fs = require('fs');
const os = require('os');


const templatePackageJsonFile = `${__dirname}/templates/package.template.json`;
const templateFile = require(templatePackageJsonFile);
const packageJsonFile = `${process.cwd()}/package.json`;
const file = require(packageJsonFile);

const copyEslintFile = () => {
    const esconfigSource = `${__dirname}/templates/.eslintrc.json`;
    const esconfigTarget = `${process.cwd()}/.eslintrc.json`;

    fs.copyFile(esconfigSource, esconfigTarget, err => {
        err ? console.log('ERROR: ', err)
            : console.log(`SUCCESS: ~${esconfigTarget.replace(os.homedir(), '')} is now updated`);
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


updatePackageJson();
copyEslintFile();
huskyConfig();
