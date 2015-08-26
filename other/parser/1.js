var babel = require('babel-core');
var sourcemaps = require('./sourcemaps');
var SourceMapConsumer = require("source-map").SourceMapConsumer;
var SourceMapGenerator = require("source-map").SourceMapGenerator;
module.exports = function (code, sourceMaps) {
    var original = code;


//var code = 'call(<div hello={213} key={item} ref="name" foo="adf" {...bar}><span key="123" class={wow}>{<italic>wtf</italic>}1{item}2</span></div>); ' +
//    'var answer = <div {...props} className={123}>{<div title={5}>{2,<div title={6}><Component><span></span>{<strong>123</strong>}</Component></div>}</div>}</div>';

    var bb = babel.transform(code, {stage: 0, whitelist: []});
    var syntax = bb.ast;

    var sourcemap = [];
/*
    var sourcemapConsumer = new SourceMapConsumer(sourceMaps);
    sourcemapConsumer.eachMapping(function (item) {
        sourcemap.push({
            source: item.source,
            original: {line: item.originalLine, column: item.originalColumn},
            generated: {line: item.generatedLine, column: item.generatedColumn}
        })
    });
*/
    //console.log(sourcemap);

    var stack = [];

    var templateId = 1;
    var globTemplates = [];
    globTemplates.level = 0;


    function getFixedRange(range) {
        var newRange = range.slice();
        for (var i = 0; i < stack.length; i++) {
            var stackItem = stack[i];
            if (stackItem.range[0] < newRange[0]) {
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

    function getLoc(code, pos, skipIfError) {
        var lines = code.split('\n');
        var currPos = 0;
        for (var i = 0; i < lines.length; i++) {
            var line = lines[i];
            //console.log("line", currPos, currPos + line.length, pos);
            if (currPos <= pos && currPos + line.length >= pos) {
                return {line: i, column: pos - currPos, _pos: pos};
            }
            currPos += line.length + 1;
        }
        if (skipIfError) {
            return {line: lines.length, column: line.length - 1};
        }
        console.error("Not Found", code.length, pos);
    }

    function getOrigLoc(range) {
        return [getLoc(original, range[0]), getLoc(original, range[1])];
    }

    function getNewLoc(pos) {
        return getLoc(code, pos, true);
    }

    function replace(range, text) {
        var newRange = getFixedRange(range);
        if (newRange[0] < 0 || newRange[1] > code.length) {
            console.error('Out of range', code.length, newRange, text);
        }
        var preffix = code.substring(0, newRange[0]);
        var replaced = code.substring(newRange[0], newRange[1]);
        var suffix = code.substring(newRange[1]);

        //console.log(text, replaced, newRange);

        var oldLen = newRange[1] - newRange[0];
        //console.log(stack);
        //console.log(preffix, '/', text, '/', suffix, range, newRange);
        //console.log('');
        var diff = text.length - oldLen;
        stack.push({range: newRange, diff: text.length - oldLen});
        //console.log(code.length, newRange, newRange[1] + diff);
        for (var i = 0; i < diff; i++) {
            code += " ";
        }
        sourcemaps.shiftGenRight(sourcemap, getNewLoc(newRange[1]), getNewLoc(newRange[1] + diff));

        code = preffix + text + suffix;

        //stack.sort(function (a, b) {return a[0] > b[0] ? 1 : -1});
    }

    /*var ranges = [[0, 1], [2, 3], [4, 5], [6, 7]];
     var code = '1-2-3-4';


     for (var i = 0; i < ranges.length; i++) {
     var range = ranges[i];
     replace(range, 'hello');
     }

     replace([4, 5], 'x');

     console.log(code);*/

    function recur(parent, data, prop) {
        if (prop == 'tokens' || prop == '_scopeInfo' || prop == '_paths' || prop == 'loc' || prop == 'range' || prop == 'start' || prop == 'end') {
            return;
        }

        if (data && typeof data == 'object') {

            /*if (data.type == 'JSXExpressionContainer') {
             replace([data.range[0], data.range[0]], '$');
             }
             if (data.type == 'JSXSpreadAttribute') {
             replace([data.range[0], data.range[0]], '$');
             }
             if (data.type == 'JSXElement') {

             }*/

            if (data.type == 'JSXElement') {
                var s = generateTemplate(data);
                return;
                //replace([data.range[0], data.range[0]], 't7`');
                //replace([data.range[1], data.range[1]], '`');
            }
            if (data instanceof Array) {
                for (var i = 0; i < data.length; i++) {
                    recur(parent, data[i], prop);
                }
                return;
            }
            for (var prop in data) {
                recur(data, data[prop], prop);
            }
        }
    }

    recur({}, syntax, null);


    function spaceDeep(spaceDeep) {
        var s = '';
        for (var i = 0; i < spaceDeep; i++) {
            s += '   ';
        }
        return s;
    }

    function generateComponent(JSXElement) {
        //[VComponent, node, parentNode, Ctor, instance, props, children, ref, key]
        var props = [];
        var children = [];
        var key = null;
        var ref = null;
        var tag = JSXElement.openingElement;
        for (var i = 0; i < tag.attributes.length; i++) {
            var attr = tag.attributes[i];
            if (attr.name && attr.name.name == 'key') {
                key = getVal(attr.value, JSXElement);
                continue;
            }
            if (attr.name && attr.name.name == 'ref') {
                ref = getVal(attr.value, JSXElement);
                continue;
            }
            if (attr.type == 'JSXAttribute') {
                if (attr.value.type == 'JSXExpressionContainer') {
                    var val = getVal(attr.value, JSXElement);
                }
                else {
                    val = attr.value.raw;
                }
                props.push(attr.name.name + ': ' + val);
            }
            if (attr.type == 'JSXSpreadAttribute') {
                props.push('...' + getVal(attr.argument, JSXElement));
            }
        }

        if (JSXElement.children) {
            for (var i = 0; i < JSXElement.children.length; i++) {
                var child = JSXElement.children[i];
                if (child.type == 'Literal') {
                    //console.log(child);
                    var childS = cleanJSXElementLiteralChild(child);
                    if (!childS) {
                        continue;
                    }
                    children.push(JSON.stringify(childS));
                }
                else if (child.type == 'JSXExpressionContainer') {
                    recur(JSXElement, child, 'children');
                    children.push(getText(child.expression.range));
                }
                else if (child.type == 'JSXElement') {
                    recur(JSXElement, child, 'children');
                    children.push(getText(child.range));
                }

            }
        }
        props.push('children: [' + children.join(', ') + ']');

        var s = '[FastReact.VComponent, null, null, ' + JSXElement.openingElement.name.name + ', null, {' + props.join(', ') + '}, null' + (ref ? ', ' + ref : '') + (key ? ', ' + key : '') + ']';
        replace(JSXElement.range, s);
        //sourcemaps.move(sourcemap, getLoc(range[0]), getLoc(range[1]));
        return;
    }

    function generateTemplate(JSXElement) {
        var isComponent = Boolean(JSXElement.openingElement.name.name[0].match(/[A-Z]/));
        if (isComponent) {
            return generateComponent(JSXElement);
        }

        var t = '_t' + templateId++;
        globTemplates.level++;
        var glob = {
            args: [],
            templateCode: '',
            isComponent: isComponent,
            pos: 2,
            template: t,
            element: JSXElement,
            globLevel: globTemplates.level,
            templates: [],
            level: -1,
            spaceDeep: 0
        };
        globTemplates.push(glob);


        var s = 'var ' + t + ' = new FastReact.VTemplate(function(d, topComponent){\n';
        var origin = getText(JSXElement.range);
        s += '' + templateFn(JSXElement, glob);
        var refs = [];
        var attrTypes = [];
        for (var i = 0; i < glob.args.length; i++) {
            var arg = glob.args[i];
            attrTypes.push('["' + arg.type + '", ' + JSON.stringify(arg.name) + ']');
        }

        var refsS = [];
        s += 'd[1] = p1;\n';
        for (var i = 0; i < glob.templates.length; i++) {
            var template = glob.templates[i];
            if (template.args.length) {
                s += 'd[' + glob.pos + '] = ' + template.dom + '\n';
                incRefs(glob, 'ref');
                refsS.push('null');
                for (var j = 0; j < template.args.length; j++) {
                    var arg = template.args[j];
                    refs[arg - 2] = glob.pos - 1;
                }
            }
            //refs.push(template);

        }
        //console.log(glob.templates);


        var keyPos = -1;
        if (glob.key != null) {
            incRefs(glob, 'key');
            keyPos += glob.pos;
        }

        s += '}, [' + attrTypes.join(', ') + '], ' + attrTypes.length + ', ' + keyPos + ', [' + refs.join(', ') + '], ' + JSON.stringify(origin) + ')';
        //console.log(s);
        globTemplates.level--;


        var jsx = '[' + t + ', null';
        var startPos = JSXElement.range[0];
        for (var i = 0; i < glob.args.length; i++) {
            var args = glob.args[i];
            //console.log(args);
            sourcemaps.move(sourcemap, getOrigLoc(args.range), getNewLoc(startPos + jsx.length));
            jsx += ', ' + args.value;
        }
        jsx += (refsS.length > 0 ? ', ' + refsS.join(', ') : '');
        jsx += (glob.key ? ', ' + glob.key : '');
        jsx += ']';
        glob.data = jsx;
        replace(JSXElement.range, glob.data);
        glob.templateCode = s;
        return s;
    }

    function getVal(attr, parent, prop) {
        recur(parent, attr.expression, prop);
        return getText(getRange(attr));
    }

    function getRange(attr) {
        return attr.type == 'JSXExpressionContainer' ? attr.expression.range : attr.range;
    }

    function incRefs(glob, type) {
        //console.log('inc', glob.pos, type);
        glob.pos++;

    }

    function cleanJSXElementLiteralChild(child) {
        var lines = child.value.split(/\r\n|\n|\r/);

        var lastNonEmptyLine = 0;

        for (var i = 0; i < lines.length; i++) {
            if (lines[i].match(/[^ \t]/)) {
                lastNonEmptyLine = i;
            }
        }

        var str = "";

        for (var i = 0; i < lines.length; i++) {
            var line = lines[i];

            var isFirstLine = i === 0;
            var isLastLine = i === lines.length - 1;
            var isLastNonEmptyLine = i === lastNonEmptyLine;

            // replace rendered whitespace tabs with spaces
            var trimmedLine = line.replace(/\t/g, " ");

            // trim whitespace touching a newline
            if (!isFirstLine) {
                trimmedLine = trimmedLine.replace(/^[ ]+/, "");
            }

            // trim whitespace touching an endline
            if (!isLastLine) {
                trimmedLine = trimmedLine.replace(/[ ]+$/, "");
            }

            if (trimmedLine) {
                if (!isLastNonEmptyLine) {
                    trimmedLine += " ";
                }

                str += trimmedLine;
            }
        }
        return str;
        //if (str) args.push(t.literal(str));
    }


    function templateFn(JSXElement, glob, parentTemplate) {
        var template = {args: []};
        glob.templates.push(template);
        glob.spaceDeep += 2;
        var dom = 'p' + glob.templates.length;
        template.dom = dom;
        glob.level++;
        var tag = JSXElement.openingElement;
        var tagName = tag.name.name;
        var space = spaceDeep(glob.spaceDeep);
        var s = 'var ' + dom + ' = document.createElement("' + tagName + '")\n';
        var value;
        var startRef = glob.pos;
        var refs = [];
        space = spaceDeep(glob.spaceDeep + 1);
        space = '';
        for (var i = 0; i < tag.attributes.length; i++) {
            var attr = tag.attributes[i];
            if (attr.name && attr.name.name == 'key' && glob.level == 0) {
                glob.key = getVal(attr.value, JSXElement);
                continue;
            }
            if (attr.name && attr.name.name == 'ref' && glob.level == 0) {
                var ref = getVal(attr.value, JSXElement);
                s += space + 'FastReact.setRef(topComponent, ' + ref + ', ' + dom + ')\n';
                continue;
            }
            if (attr.type == 'JSXAttribute') {
                if (attr.value.type == 'JSXExpressionContainer') {
                    template.args.push(glob.pos);
                    glob.args.push({
                        type: 'attr',
                        name: attr.name.name,
                        range: getRange(attr.value),
                        value: getVal(attr.value, JSXElement)
                    });
                    value = 'd[' + glob.pos + ']';
                    incRefs(glob, 'attr');
                }
                else {
                    value = attr.value.raw;
                }
                s += space + dom + '.setAttribute("' + attr.name.name + '", ' + value + ')\n';
            }
            if (attr.type == 'JSXSpreadAttribute') {
                template.args.push(glob.pos);
                glob.args.push({
                    type: 'attrs',
                    name: null,
                    range: getRange(attr.argument),
                    value: getVal(attr.argument, JSXElement)
                });
                value = 'd[' + glob.pos + ']';
                incRefs(glob, 'attrs');
                s += space + 'FastReact.setAttrs(' + dom + ', ' + value + ')\n';
            }

        }

        var childrenPos = 0;
        if (JSXElement.children) {
            var prevChild;
            for (var i = 0; i < JSXElement.children.length; i++) {
                var child = JSXElement.children[i];
                if (child.type == 'Literal') {
                    //console.log(child);
                    var childS = cleanJSXElementLiteralChild(child);
                    if (!childS) {
                        continue;
                    }
                    childrenPos++;
                    s += space + dom + '.appendChild(document.createTextNode(' + JSON.stringify(childS) + '))\n';
                }
                else if (child.type == 'JSXExpressionContainer' || (child.type == 'JSXElement' && child.openingElement.name.name[0].match(/[A-Z]/))) {
                    glob.args.push({type: 'children', name: null, range: getRange(child), value: getVal(child, JSXElement, 'children')});
                    template.args.push(glob.pos);
                    //s += space + 'FastReact.create(' + dom + ', d, ' + glob.pos++ + ')\n';
                    childrenPos++;
                    s += space + 'FastReact.create(d[' + glob.pos + '], d, ' + glob.pos + ', ' + dom + ')\n';
                    incRefs(glob, 'customchild');
                }
                else if (child.type == 'JSXElement') {

                    //glob.args.push({type: 'children', name: childrenPos, value: null});
                    childrenPos++;
                    s += templateFn(child, glob, template);
                    //incRefs(glob, 'child');
                }
                else {
                    //recur(JSXElement, child);
                }
                prevChild = child;
            }
        }
        if (startRef < glob.pos) {
            //s += space + '.setRef(d, @REF[' + startRef + '-' + glob.pos + ']@)\n';
        }
        glob.spaceDeep -= 2;
        glob.level--;
        if (parentTemplate) {
            s += space + parentTemplate.dom + '.appendChild(' + dom + ')\n';
        }
        return s;
    }


    var ss = '';
    globTemplates.sort(function (a, b) {return b.globLevel - a.globLevel});
    for (var i = 0; i < globTemplates.length; i++) {
        var globTemplate = globTemplates[i];
        ss += globTemplate.templateCode + '\n';
        //replace(globTemplate.element.range, globTemplate.data);
        //replace(JSXElement.range, globTemplate.data);

        //console.log(globTemplate);
    }
    //console.log(code);

    replace([0, 0], ss);


/*
    var generator = SourceMapGenerator.fromSourceMap(sourcemapConsumer);
    for (var i = 0; i < sourcemap.length; i++) {
        generator.addMapping(sourcemap[i]);
        //console.log(sourcemap[i].generated.line);
    }
    console.log(code.split('\n').length);

*/
    //this.callback(null, code, generator.toString());
    this.callback(null, code, sourceMaps);
};


//var orange = syntax.body[0].declarations[0].init.children[0].range;
//console.log(code.substring(orange[0], orange[1]));


//console.log(JSON.stringify(syntax, null, '| '));
