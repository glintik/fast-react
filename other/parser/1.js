var esprima = require('esprima-fb');
var code = 'call(<div/>); var answer = <div {...props} className={123}>{1, <div title={5}>{2,<div title={6}><Component><span></span>{<strong>123</strong>}</Component></div>}</div>}</div>';
var syntax = esprima.parse(code, {range: true});

var stack = [];


//var code = '1-2-3-4';
function getFixedRange(range) {
    var newRange = range.slice();
    for (var i = 0; i < stack.length; i++) {
        var stackItem = stack[i];
        if (stackItem.range[0] <= newRange[0]) {
            newRange[0] += stackItem.diff;
        }
        if (stackItem.range[1] <= newRange[1]) {
            newRange[1] += stackItem.diff;
        }
    }
    return newRange;
}

function getText(range) {
    var newRange = getFixedRange(range);
    return code.substring(newRange[0], newRange[1]);
}

function replace(range, text) {

    var newRange = getFixedRange(range);
    var preffix = code.substring(0, newRange[0]);
    var suffix = code.substring(newRange[1]);

    code = preffix + text + suffix;
    var oldLen = newRange[1] - newRange[0];
    //stack.sort(function (a, b) {return a[0] > b[0] ? 1 : -1});
    //console.log(stack);
    //console.log(preffix, '/', text, '/', suffix, range, newRange);
    //console.log('');
    stack.push({range: newRange, diff: text.length - oldLen});

}

/*
var ranges = [[0, 1], [2, 3], [4, 5], [6, 7]];
replace([0, 0], '%');

for (var i = 0; i < ranges.length; i++) {
    var range = ranges[i];
    replace(range, 'hello');
}
*/
//console.log(code);

function recur(parent, data) {
    if (data && typeof data == 'object') {

        if (data.type == 'JSXExpressionContainer') {
            replace([data.range[0], data.range[0]], '$');
        }
        if (data.type == 'JSXSpreadAttribute') {
            replace([data.range[0], data.range[0]], '$');
        }
        if (data.type == 'JSXElement') {
            console.log(parent.type);

        }

        if (data.type == 'JSXElement' && (parent.type != 'JSXElement')) {
            replace([data.range[0], data.range[0]], 't7`');
            replace([data.range[1], data.range[1]], '`');
        }
        if (data instanceof Array) {
            for (var i = 0; i < data.length; i++) {
                recur(parent, data[i]);
            }
            return;
        }
        for (var prop in data) {
            recur(data, data[prop]);
        }
    }
}
recur({}, syntax);
console.log(code);


//var orange = syntax.body[0].declarations[0].init.children[0].range;
//console.log(code.substring(orange[0], orange[1]));


console.log(JSON.stringify(syntax, null, 1));
