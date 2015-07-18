var render = FastReact.render;
var Component = FastReact.Component;
var createElement = FastReact.createElement;
var d = FastReact.createElement;
var update = function (old, vdom) {
    return FastReact.update(old, vdom);
};


function div() {
    var children = [];
    for (var i = 0; i < arguments.length; i++) {
        children.push(arguments[i]);
    }
    return {tag: 'div', children: children};
}
function udiv() {
    var children = [];
    for (var i = 0; i < arguments.length; i++) {
        children.push(arguments[i]);
    }
    return {tag: 'div', updated: true, children: children};
}

console.warn = function () {
};

function text(text) {
    return {tag: '#', text: text + ''};
}

function utext(text) {
    return {tag: '#', updated: true, text: text + ''};
}

function compare(dom, d) {
    expect(d).toBeDefined();
    if (!d){
        return;
    }

    //console.error(d);
    if (d.tag !== '#') {
        if (d.updated !== dom.updated) {
            //console.log(d.updated, dom.updated, d);
        }
        //expect(d.updated).toBe(dom.updated);
    }
    if (dom instanceof Text) {
        expect(d.text).toBe(dom.textContent);
    }
    else {
        expect(d.tag).toBe(dom.tagName.toLowerCase());
    }
    if (dom.childNodes) {
        var skipped = 0;
        for (var i = 0; i < dom.childNodes.length; i++) {
            var child = dom.childNodes[i];
            if (child.skip) {
                skipped++;
                continue;
            }
            compare(child, d.children[i - skipped]);
        }
    }
}
