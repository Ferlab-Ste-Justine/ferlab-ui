#!/usr/bin/env node
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires */

const fs = require('fs');
const path = require('path');

// eslint-disable-next-line no-undef
const lessPath = process.argv[2];
const lessFile = process.argv[3];
const outputPath = process.argv[4] || path.join(process.argv[2], 'dist');

if (lessPath === undefined || lessFile === undefined) {
    console.log('Error no less specified');
    console.log('Usage: npx ferlabui-less2css path lessfile');
    console.log('eg.  npx ferlabui-less2css style/themes/kids-first colors.less');
    process.exit(1);
}
const STYLE_PATH = path.join(process.cwd(), lessPath);
const LESS_INPUT_FILE = path.join(STYLE_PATH, lessFile);
const OUTPUT_PATH = path.join(process.cwd(), outputPath);
const CSS_OUTPUT_FILE = path.join(OUTPUT_PATH, lessFile.replace('.less', '.css'));

// Get less file
const less = fs.readFileSync(LESS_INPUT_FILE);

// Replace var declaration (@something to --something)
let css = less.toString().replace(/@([^:\s]+):/g, '\t--$1:');

// Replace var assignation (@something to --something)
css = css.replace(/:\s*@(.*);/g, ': var(--$1);');

// Replace comments (// to /* ... */)
css = css.replace(/\/\/(.+)/g, '\t/*$1: */');

// Add :root
css = ':root{\n' + css + '\n}';

// Write css file
fs.writeFileSync(CSS_OUTPUT_FILE, css);
