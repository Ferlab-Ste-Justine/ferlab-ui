const commandLineArgs = require('command-line-args');
const spawn = require('cross-spawn');
const path = require('path');

const optionDefinitions = [
    { name: 'source', alias: 's', type: String, defaultValue: 'src/style/themes/default' },
    { name: 'dest', alias: 'd', type: String, defaultValue: 'src/style/dist/themes/default' },
    { name: 'inputFile', type: String, defaultValue: 'antd/antd.less' },
    { name: 'outputFile', type: String, defaultValue: 'antd.css' },
    { name: 'inputColors', type: String, defaultValue: 'antd/_colors.less' },
    { name: 'outputColors', type: String, defaultValue: '_colors.scss' },
    { name: 'theme', alias: 't', type: String },
];

const options = commandLineArgs(optionDefinitions);

// default input folder and file
const defaultFolderSource = path.resolve(`${options['source']}`);
const defaultInFile = options['inputFile'];

let srcFolder = `${defaultFolderSource}/`
let inputFile = defaultInFile;

// default output folder and file
const defaultDestFolder = path.resolve(`${options['dest']}`)
const defaultOutFile = options['outputFile'];

const outFolder = `${defaultDestFolder}/`;
let outputFile = defaultOutFile;

// Manage theming
const theme = options['theme'];
if (theme) {
    srcFolder = `${path.resolve(`${__dirname}/../themes/${theme}`)}/`;
}
spawn.sync('lessc', ['--js', `${srcFolder}${inputFile}`, `${outFolder}${outputFile}`], {
    stdio: 'inherit'
});

// colors output
inputFile = options['inputColors'];
outputFile = options['outputColors'];

if (!theme) {
    spawn.sync('less2sass', [`${srcFolder}${inputFile}`], {
        stdio: 'inherit'
    });
    
    spawn.sync('mv', [`${srcFolder}${inputFile.replace('.less', '.scss')}`,`${outFolder}${outputFile}`], {
        stdio: 'inherit'
    }); 
}
