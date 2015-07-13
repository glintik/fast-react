var render = FastReact.render;
var Component = FastReact.Component;
var createElement = FastReact.createElement;
var d = FastReact.createElement;
var update = function (old, vdom) {
    FastReact.update(old, vdom);
    return vdom;
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

    //console.error(d);
    if (d.tag !== '#') {
        if (d.updated !== dom.updated) {
            console.log(d.updated, dom.updated, d);
        }
        expect(d.updated).toBe(dom.updated);
    }
    if (dom instanceof Text) {
        expect(d.text).toBe(dom.textContent);
    }
    else {
        expect(d.tag).toBe(dom.tagName.toLowerCase());
    }
    if (dom.childNodes) {
        for (var i = 0; i < dom.childNodes.length; i++) {
            var child = dom.childNodes[i];
            compare(child, d.children[i]);
        }
    }
}
