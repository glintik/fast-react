var esprima = require('esprima-fb');
module.exports = function (code) {

//var code = 'call(<div hello={213} key={item} ref="name" foo="adf" {...bar}><span key="123" class={wow}>{<italic>wtf</italic>}1{item}2</span></div>); ' +
//    'var answer = <div {...props} className={123}>{<div title={5}>{2,<div title={6}><Component><span></span>{<strong>123</strong>}</Component></div>}</div>}</div>';

    var syntax = esprima.parse(code, {range: true});

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

    function replace(range, text) {
        var newRange = getFixedRange(range);
        //console.log(text, range, newRange, stack);
        var preffix = code.substring(0, newRange[0]);
        var suffix = code.substring(newRange[1]);

        code = preffix + text + suffix;
        var oldLen = newRange[1] - newRange[0];
        //console.log(stack);
        //console.log(preffix, '/', text, '/', suffix, range, newRange);
        //console.log('');
        stack.push({range: newRange, diff: text.length - oldLen});
        stack.sort(function (a, b) {return a[0] > b[0] ? 1 : -1});
    }

    /*var ranges = [[0, 1], [2, 3], [4, 5], [6, 7]];
     var code = '1-2-3-4';


     for (var i = 0; i < ranges.length; i++) {
     var range = ranges[i];
     replace(range, 'hello');
     }

     replace([4, 5], 'x');

     console.log(code);*/

    function recur(parent, data) {
        if (data && typeof data == 'object') {

            /*if (data.type == 'JSXExpressionContainer') {
             replace([data.range[0], data.range[0]], '$');
             }
             if (data.type == 'JSXSpreadAttribute') {
             replace([data.range[0], data.range[0]], '$');
             }
             if (data.type == 'JSXElement') {

             }*/

            if (data.type == 'JSXElement' && (parent.type != 'JSXElement')) {
                var s = generateTemplate(data);
                return;
                //replace([data.range[0], data.range[0]], 't7`');
                //replace([data.range[1], data.range[1]], '`');
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


    function spaceDeep(spaceDeep) {
        var s = '';
        for (var i = 0; i < spaceDeep; i++) {
            s += '   ';
        }
        return s;
    }

    function generateTemplate(JSXElement) {
        globTemplates.level++;
        var t = '_t' + templateId++;
        var glob = {
            args: [],
            pos: 2,
            template: t,
            element: JSXElement,
            globLevel: globTemplates.level,
            templates: [],
            level: -1,
            spaceDeep: 0
        };
        globTemplates.push(glob);


        var s = 'var ' + t + ' = new FastReact(function(d){\n';
        s += '/*' + getText(JSXElement.range) + '*/\n';
        s += '' + templateFn(JSXElement, glob);
        var refs = [];
        var attrTypes = [];
        for (var i = 0; i < glob.args.length; i++) {
            var arg = glob.args[i];
            attrTypes.push('["' + arg.type + '", ' + JSON.stringify(arg.name) + ']');
        }

        var refsS = [];
        for (var i = 0; i < glob.templates.length; i++) {
            var template = glob.templates[i];
            if (template.args.length) {
                s += 'd[' + glob.pos++ + '] = ' + template.dom + '\n';
                refsS.push('null');
                for (var j = 0; j < template.args.length; j++) {
                    var arg = template.args[j];
                    refs[arg - 2] = i;
                }
            }
            //refs.push(template);

        }
        //console.log(glob.templates);


        var keyPos = -1;
        if (glob.key != null) {
            keyPos += ++glob.pos;
        }

        s += '}, [' + attrTypes.join(', ') + '], ' + keyPos + ', [' + refs.join(', ') + '])';
        //console.log(s);
        globTemplates.level--;

        var childs = [];
        for (var i = 0; i < glob.args.length; i++) {
            var args = glob.args[i];
            childs.push(args.value);
        }
        glob.data = '[' + t + ', null' +
            (childs.length > 0 ? ', ' + childs.join(', ') : '') +
            (refsS.length > 0 ? ', ' + refsS.join(', ') : '') +
            (glob.key ? ', ' + glob.key : '') + ']';
        replace(JSXElement.range, glob.data);
        glob.templateCode = s;
        return s;
    }

    function getVal(attr) {
        return getText(attr.type == 'JSXExpressionContainer' ? attr.expression.range : attr.range)
    }

    function templateFn(JSXElement, glob) {
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
                glob.key = getVal(attr.value);
                continue;
            }
            if (attr.type == 'JSXAttribute') {
                if (attr.value.type == 'JSXExpressionContainer') {
                    template.args.push(glob.pos);
                    glob.args.push({type: 'attr', name: attr.name.name, value: getVal(attr.value)});
                    value = 'd[' + glob.pos + ']';
                    glob.pos++;
                }
                else {
                    value = attr.value.raw;
                }
                s += space + dom + '.setAttribute("' + attr.name.name + '", ' + value + ')\n';
            }
            if (attr.type == 'JSXSpreadAttribute') {
                template.args.push(glob.pos);
                glob.args.push({type: 'attrs', name: null, value: getVal(attr)});
                value = 'd[' + glob.pos + ']';
                glob.pos++;
                s += space + 'FastReact.setAttrs(' + dom + ', ' + value + ')\n';
            }

        }

        var childrenPos = 0;
        if (JSXElement.children) {
            for (var i = 0; i < JSXElement.children.length; i++) {
                var child = JSXElement.children[i];
                childrenPos++;
                if (child.type == 'Literal') {
                    //console.log(child);
                    if (child.raw.trim()) {
                        s += space + dom + '.appendChild(document.createTextNode(' + JSON.stringify(child.raw) + '))\n';
                    }
                }
                else if (child.type == 'JSXExpressionContainer') {
                    recur(JSXElement, child);
                    glob.args.push({type: 'children', name: childrenPos, value: getVal(child)});
                    template.args.push(glob.pos);
                    //s += space + 'FastReact.create(' + dom + ', d, ' + glob.pos++ + ')\n';
                    s += space + 'FastReact.create(d[' + glob.pos + '], d, ' + glob.pos + ', ' + dom + ')\n';
                    glob.pos++;
                }
                else if (child.type == 'JSXElement') {
                    //glob.args.push({type: 'children', name: childrenPos, value: null});
                    s += templateFn(child, glob);
                    var _dom = glob.templates[glob.templates.length - 1].dom;
                    s += space + dom + '.appendChild(' + _dom + ')\n';
                    glob.pos++;
                }
                else {
                    //recur(JSXElement, child);
                }
            }
        }
        if (startRef < glob.pos) {
            //s += space + '.setRef(d, @REF[' + startRef + '-' + glob.pos + ']@)\n';
        }
        glob.spaceDeep -= 2;
        glob.level--;
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
    return code;
};


//var orange = syntax.body[0].declarations[0].init.children[0].range;
//console.log(code.substring(orange[0], orange[1]));


//console.log(JSON.stringify(syntax, null, '| '));
