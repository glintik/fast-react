var parser = require('./1');
var fs = require('fs');
var file = fs.readFileSync(__dirname + '/../../fragments/example2.js');
parser.call({callback: function(){}}, file.toString());