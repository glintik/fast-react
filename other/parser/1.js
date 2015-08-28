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
    var sourcemaping = [];
    var sourcemapConsumer = new SourceMapConsumer(sourceMaps);
    sourcemapConsumer.eachMapping(function (item) {
        sourcemaping.push({
            source: item.source,
            original: {line: item.originalLine, column: item.originalColumn},
            generated: {line: item.generatedLine, column: item.generatedColumn}
        })
    }, null, SourceMapConsumer.ORIGINAL_ORDER);

    var origin = sourceMaps.sourcesContent[0];

    setPosToMappings();


    function generateMap(code) {
        var _code = code.split('\n');
        var pos = 0;
        var codeMap = [];
        for (var i = 0; i < _code.length; i++) {
            var line = _code[i];
            codeMap[i + 1] = new Array(line.length);
            for (var j = 0; j <= line.length; j++) {
                codeMap[i + 1][j] = pos;
                pos++;
            }
        }
        return codeMap;
    }

    function setPosToMappings() {
        var codeMap = generateMap(code);
        //console.log(codeMap);
        for (var i = 0; i < sourcemaping.length; i++) {
            var map = sourcemaping[i];
            map.generated.pos = codeMap[map.generated.line][map.generated.column];
            //console.log(map.generated);
        }
    }


    function fixGenPosToLineColumn() {
        var _code = code.split('\n');
        var pos = 0;
        var codeMapPos = [];
        for (i = 0; i < _code.length; i++) {
            var line = _code[i];
            for (var j = 0; j <= line.length; j++) {
                codeMapPos[pos] = {line: i + 1, column: j, pos: pos};
                pos++;
            }
        }
        for (var i = 0; i < sourcemaping.length; i++) {
            var map = sourcemaping[i];
            //console.log(codeMapPos[map.generated.pos]);
            var pps = codeMapPos[map.generated.pos];
            if (!pps) {
                //console.log(codeMapPos);
                //console.error('pos not found', map.generated.pos);
                throw new Error('Pos not found:' + map.generated.pos + ', max:' + (codeMapPos.length - 1) + ', i=' + i);
            }
            else {
                map.generated.line = pps.line;
                map.generated.column = pps.column;
            }

        }
    }


    function printMaps() {
        var prev;
        var originMap = generateMap(origin);
        var codeMap = generateMap(code);
        for (var i = 0; i < sourcemaping.length; i++) {
            var map = sourcemaping[i];
            if (prev) {
                var currOriginPos = originMap[map.original.line][map.original.column];
                var lastOriginPos = originMap[prev.original.line][prev.original.column];
                var currCodePos = codeMap[map.generated.line][map.generated.column];
                var lastCodePos = codeMap[prev.generated.line][prev.generated.column];
                //console.log(lastOriginPos, currOriginPos);
                //console.log(origin.substring(lastOriginPos, currOriginPos));
                for (var j = prev.original.column; j < map.original.column; j++) {
                    //var pos = sourcemapConsumer.generatedPositionFor({line: map.original.line, column:});
                }

                var oo = origin.substring(lastOriginPos, currOriginPos).trim();
                var vv = code.substring(lastCodePos, currCodePos).trim();
                if (oo) {
                    console.log('** ', oo, '=======', vv);
                }
                /*
                 if (currOriginPos!=null && lastOriginPos!=null && lastCodePos!=null && currCodePos!=null){
                 console.log(origin.substring(lastOriginPos, currOriginPos), '=======',
                 code.substring(lastCodePos, currCodePos)
                 );
                 }
                 */
                //console.log(lastOriginPos, currOriginPos, map.original);


                //codeMap[map.generated.line][map.generated.column] = 1;
                //console.log(origin.substring(lastOriginPos, currOriginPos));
            }
            //console.log(map.original.line, map.original.column);
            prev = map;
        }
        //console.log(originMap);
    }


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

    function replace(range, text, movedMaps) {
        var newRange = getFixedRange(range);
        if (newRange[0] < 0 || newRange[1] > code.length) {
            throw new Error('Out of range' + code.length + newRange + text);
        }
        var preffix = code.substring(0, newRange[0]);
        var replaced = code.substring(newRange[0], newRange[1]);
        var suffix = code.substring(newRange[1]);


        var oldLen = newRange[1] - newRange[0];
        //console.log("--- replace ---- ", newRange, 'diff:', text.length - oldLen, '/-----');
        //console.log(stack);
        //console.log(preffix, '/', text, '/', suffix, range, newRange);
        //console.log('');
        var diff = text.length - oldLen;
        //console.log("--- replace ---- ", newRange, diff, [newRange[0], newRange[1] + diff], text, ' #### ', replaced, '/-----');

        stack.push({range: newRange, diff: text.length - oldLen});
        //console.log(code.length, newRange, newRange[1] + diff);
        /*
         for (var i = 0; i < diff; i++) {
         code += " ";
         }
         */
        //sourcemaps.shiftGenRight(sourcemap, getNewLoc(newRange[1]), getNewLoc(newRange[1] + diff));
        for (var i = 0; i < sourcemaping.length; i++) {
            var map = sourcemaping[i];
            if (map.generated.skip) {
                continue;
            }
            // spread
            if (diff > 0) {
                if (map.generated.pos >= newRange[1]) {
                    map.generated.pos += diff;
                }
                if (map.generated.pos >= newRange[0] && map.generated.pos < newRange[1] + diff) {
                    //map.generated.pos = 0;
                }
            }
            else {
                if (map.generated.pos >= newRange[1] + diff) {
                    map.generated.pos += diff;
                }
                if (map.generated.pos >= newRange[0] && map.generated.pos < newRange[1]) {
                    //map.generated.pos = 0;
                }
            }
        }
        //console.log("replace", newRange);
        code = preffix + text + suffix;

        //console.log('---------- new code: \n', code);
        if (movedMaps) {
            for (var i = 0; i < movedMaps.length; i++) {
                movedMaps[i].generated.skip = false;
                //sourcemaping.push(movedMaps[i]);
            }
        }

        fixGenPosToLineColumn();
        //console.log("after replace", sourcemaping);
        //console.log("after code", code);


        //console.log("after replace ####\n", code, "\n######");
        //stack.sort(function (a, b) {return a[0] > b[0] ? 1 : -1});
    }

    function moveSourceMap(movedMaps, range, to) {
        var diff = to - range[0];
        range = getFixedRange(range);
        to = getFixedRange([to, 0])[0];
        var start = range[0];
        var end = range[1];
        //console.log("----- move ---- ", range, [to, end + diff], diff, code.substring(range[0], range[1]), '/------');
        //var diff = start - to;
        //console.log("before move", sourcemaping);
        //console.log("before replaced", code);

        for (var i = 0; i < sourcemaping.length; i++) {
            var map = sourcemaping[i];
            if (map.generated.skip) {
                continue;
            }
            if (map.generated.pos >= start && map.generated.pos < end) {
                map.generated.pos += diff;
                map.generated.skip = true;
                //sourcemaping.splice(i, 1);
                movedMaps.push(map);
                //console.log("Diff", map);
            }
        }
        //fixGenPosToLineColumn();
        //console.log("after move", sourcemaping);
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

    function getExpressionRange(child) {
        if (child.type == 'JSXExpressionContainer') {
            return child.range;
        }
        return child.range;
    }

    function generateComponent(JSXElement) {
        //[VComponent, node, parentNode, Ctor, instance, props, children, ref, key]
        var props = [];
        var children = [];
        var key = null;
        var keyRange;
        var ref = null;
        var refRange;
        var tag = JSXElement.openingElement;
        var startPos = JSXElement.range[0];
        var s = '[FastReact.VComponent, null, null, ' + JSXElement.openingElement.name.name + ', null, {';
        //props.join(', ') + '}, null' + (ref ? ', ' + ref : '') + (key ? ', ' + key : '') + ']';

        var movedMaps = [];

        var attrk = 0;
        for (var i = 0; i < tag.attributes.length; i++) {
            var attr = tag.attributes[i];
            if (attr.name && attr.name.name == 'key') {
                key = getVal(attr.value, JSXElement);
                keyRange = getExpressionRange(attr.value);
                continue;
            }
            if (attr.name && attr.name.name == 'ref') {
                ref = getVal(attr.value, JSXElement);
                refRange = getExpressionRange(attr.value);
                continue;
            }

            if (attr.type == 'JSXAttribute') {
                if (attr.value.type == 'JSXExpressionContainer') {
                    var val = getVal(attr.value, JSXElement);
                    moveSourceMap(movedMaps, attr.value.expression.range, startPos + s.length);
                }
                else {
                    val = attr.value.raw;
                }
                s += attr.name.name + ': ' + val;
            }
            if (attr.type == 'JSXSpreadAttribute') {
                s += '...' + getVal(attr.argument, JSXElement);
                //moveSourceMap(attr.argument.range, startPos + s.length);
            }
            s += ', ';
            attrk++;
        }
        s += 'children: [';
        var childk = 0;
        if (JSXElement.children) {
            for (var i = 0; i < JSXElement.children.length; i++) {
                var child = JSXElement.children[i];
                if (child.type == 'Literal') {
                    //console.log(child);
                    var childS = cleanJSXElementLiteralChild(child);
                    if (!childS) {
                        continue;
                    }
                    s += JSON.stringify(childS);
                    s += ', ';
                    childk++;
                }
                else if (child.type == 'JSXExpressionContainer') {
                    var val = getVal(child, JSXElement);
                    moveSourceMap(movedMaps, child.expression.range, startPos + s.length);
                    s += val;
                    s += ', ';
                    childk++;
                }
                else if (child.type == 'JSXElement') {
                    recur(JSXElement, child, 'children');
                    moveSourceMap(movedMaps, child.range, startPos + s.length);
                    s += getText(child.range);
                    s += ', ';
                    childk++;
                }
            }
        }

        if (childk > 0) {
            s = s.substring(0, s.length - 2);
        }

        s += ']}, null, ';

        if (ref) {
            moveSourceMap(movedMaps, refRange, startPos + s.length);
            s += ref;
        }
        else {
            s += 'null'
        }
        s += ',';
        if (key) {
            moveSourceMap(movedMaps, keyRange, startPos + s.length);
            s += key;
        }
        else {
            s += 'null'
        }
        s += ']';

        replace(JSXElement.range, s, movedMaps);
        return;
    }

    function generateTemplate(JSXElement) {
        var isComponent = Boolean(JSXElement.openingElement.name.name[0].match(/[A-Z]/));
        if (isComponent) {
            return generateComponent(JSXElement);
        }
        var movedMaps = [];

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
        var aaa = [];
        for (var i = 0; i < glob.args.length; i++) {
            var args = glob.args[i];
            //console.log(args);
            jsx += ', ';
            //console.log("prevMove");
            moveSourceMap(movedMaps, args.range, startPos + jsx.length);
            aaa.push([args.range, startPos + jsx.length]);
            jsx += args.value;
        }
        jsx += (refsS.length > 0 ? ', ' + refsS.join(', ') : '');
        jsx += (glob.key ? ', ' + glob.key : '');
        jsx += ']';
        glob.data = jsx;
        replace(JSXElement.range, jsx, movedMaps);
        //console.log("movesss");
        for (var i = 0; i < aaa.length; i++) {
            var item = aaa[i];
            var moveSize = item[0][1] - item[0][0];
            //console.log('move2', moveSize, getText([item[1], item[1] + moveSize]));
        }
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
                        value: getVal(attr.value, JSXElement),
                        range: getRange(attr.value),
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
                    value: getVal(attr.argument, JSXElement),
                    range: getRange(attr.argument),
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
                    if (child.type == 'JSXElement') {
                        recur(JSXElement, child, 'children');
                    }
                    glob.args.push({
                        type: 'children',
                        name: null,
                        value: getVal(child, JSXElement, 'children'),
                        range: getRange(child),
                    });

                    //console.log('------- ', getText(child.range));
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
    globTemplates.sort(function (a, b) {
        return b.globLevel - a.globLevel
    });
    for (var i = 0; i < globTemplates.length; i++) {
        var globTemplate = globTemplates[i];
        ss += globTemplate.templateCode + '\n';
        //replace(globTemplate.element.range, globTemplate.data);
        //replace(JSXElement.range, globTemplate.data);

        //console.log(globTemplate);
    }
    //console.log(code);

    replace([0, 0], ss);


    fixGenPosToLineColumn();
    //console.log(code);
    var generator = SourceMapGenerator.fromSourceMap(sourcemapConsumer);
    for (var i = 0; i < sourcemaping.length; i++) {
        generator.addMapping(sourcemaping[i]);
        //console.log(sourcemaping[i]);
    }
    //console.log(sourcemaping);

    //printMaps();
    this.callback(null, code, generator.toString());


    //this.callback(null, code, sourceMaps);
};


//var orange = syntax.body[0].declarations[0].init.children[0].range;
//console.log(code.substring(orange[0], orange[1]));


//console.log(JSON.stringify(syntax, null, '| '));
