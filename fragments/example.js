var t1 = {
    render: function (vdom, parentNode) {
        vdom.node = document.createElement('div')
            .setAttr('class', 'peow')
            .addChild(document.createElement('div')
                .setAttrs(vdom.values[0]).setRef(vdom, 0)
                .addValueChild(vdom, 1).setRef(vdom, 1))
            .addChild('Wow')
            .addValueChild(vdom, 2).setRef(vdom, 2)
            .addChild(document.createElement(vdom.values[3]).setRef(vdom, 3)
                .setAttr('class', vdom.values[4]).setRef(vdom, 4)
                .setStyle('color', vdom.values[5]).setRef(vdom, 5)
                .addChild(1))
        if (parentNode) {
            parentNode.appendChild(vdom.node);
        }
        return vdom;
    }, argTypes: [['attrs'], ['children', 0], ['children', 2], ['tag'], ['attr', 'class'], ['style', 'color']]
};

var t2 = {
    render: function (vdom, parentNode) {
        vdom.node = document.createElement('div')
            .setAttr('title', vdom.values[0]).setRef(vdom, 0)
            .addChild(document.createElement('span')
                .addValueChild(vdom, 1).setRef(vdom, 1))

        if (parentNode) {
            parentNode.appendChild(vdom.node);
        }
        return vdom;
    }, argTypes: [['attr', 'title'], ['children']]
};

var k = 0;
function component() {
    var items = [100, k++, 500];
    return {
        tag: 'template',
        template: t1,
        node: null,
        values: [{class: 'hey'}, items.map(function (item) {
            return {
                tag: 'template',
                key: item,
                template: t2,
                node: null,
                values: [item, item],
                domNodes: new Array(2)
            }
        }), 'Hello' + k++, k % 2 ? 'div' : 'span', 'foo' + k++, k % 2 ? 'red' : 'blue'],
        domNodes: new Array(5)
    };
}

var node = FastReact.render(component(), document.body.appendChild(document.createElement('div')));
console.log(node);

setTimeout(function () {
    node = FastReact.update(node, component());
    console.log(node);
}, 2000);
