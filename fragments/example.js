var t1 = new FastReact.VTemplate(function (vdom) {
    vdom[1] = document.createElement('div').setRef(vdom, 8)
        .setAttr('class', 'peow')
        .addChild(document.createElement('div').setRef(vdom, 9)
            .setAttrs(vdom[2])
            .addValueChild(vdom, 3))
        .addChild('Wow')
        .addValueChild(vdom, 4)
        .addChild(document.createElement(vdom[5]).setRef(vdom, 10)
            .setAttr('class', vdom[6])
            .setStyle('color', vdom[7])
            .addChild(1))
}, [['attrs'], ['children', 0], ['children', 2], ['tag'], ['attr', 'class'], ['style', 'color']], 6, -1, [0, 0, 9, 9, 8, 10, 10, 10]);

var t2 = new FastReact.VTemplate(function (vdom) {
    vdom[1] = document.createElement('div').setRef(vdom, 4)
        .setAttr('title', vdom[2])
        .addChild(document.createElement('span').setRef(vdom, 5)
            .addValueChild(vdom, 3))
}, [['attr', 'title'], ['children', 0]], 2, false, [0, 0, 4, 5]);

var k = 0;
function component() {
    var items = [100, ++k, 500];
    items = items.map(function (item) {return [t2, null, item, item, null, null]});
    return [t1, null, {class: 'hey'}, items, 'Hello' + k++, k % 2 ? 'div' : 'span', 'foo' + k++, k % 2 ? 'red' : 'blue', null, null, null];
}

var node = FastReact.render(component(), document.body.appendChild(document.createElement('div')));
console.log(node);

setTimeout(function () {
    //node = FastReact.update(node, component());
    //console.log(node);
}, 2000);
