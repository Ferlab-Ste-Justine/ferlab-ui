#!/usr/bin/env node
'use strict';
const commandLineArgs = require('command-line-args');
const spawn = require('cross-spawn');

const optionDefinitions = [
    { defaultOption: true, multiple: false, name: 'scriptName' },
    { alias: 's', name: 'source', type: String },
    { alias: 'd', name: 'dest', type: String },
    { name: 'inputFile', type: String },
    { name: 'outputFile', type: String },
    { name: 'inputColors', type: String },
    { name: 'outputColors', type: String },
    { alias: 't', name: 'theme', type: String },
];

const options = commandLineArgs(optionDefinitions);

if (!options['scriptName']) {
    console.warn('Not enough arguments: missing script name');
    process.exit(0);
}

const scriptName = options['scriptName'];
let scriptParams = [require.resolve('../scripts/' + scriptName)];

for (let cmd in options) {
    if (cmd === 'scriptName') continue;
    scriptParams.push(`--${cmd}`, options[cmd]);
}

switch (scriptName) {
    case 'compile':
        const compile = spawn.sync('node', scriptParams, {
            stdio: 'inherit',
        });
        process.exit(compile.status);
    case 'colors':
        const colors = spawn.sync('node', [require.resolve('../scripts/' + scriptName)], {
            stdio: 'inherit',
        });
        process.exit(colors.status);
    default:
        break;
}
