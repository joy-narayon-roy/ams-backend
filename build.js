// build.js
const exe = require('@angablue/exe');

exe({
    entry: './index.js',
    out: './dist/MyExpressApp.exe',
    target: 'node18-win-x64', // Adjust your target
    icon: './public/favicon.ico', // Path to your .ico file
    properties: {
        FileDescription: 'My Express API Server',
        ProductName: 'My Express App'
    }
}).then(() => {
    console.log('Executable built with icon!');
});

