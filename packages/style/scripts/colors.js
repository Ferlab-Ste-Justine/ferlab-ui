const spawn = require('cross-spawn');
const path = require('path');

// Once we have more themes, loop through all of them to generate the colors from antd
spawn.sync('less2sass', [`./themes/cqdg/antd/_colors.less`], {
    stdio: 'inherit'
});
