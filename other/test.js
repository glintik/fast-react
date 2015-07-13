var copy = JSON.parse(JSON.stringify(node));
console.time('native');
//console.profile('native');
var doc = create(node);
//update(node, copy);
//console.profileEnd('native');
//document.body.appendChild(doc);
console.timeEnd('native');

/*

 console.time('inner');
 var docInner = document.createElement('div');
 docInner.innerHTML = html;
 console.timeEnd('inner');*/

/*console.time('createInner');
 var dd = document.createElement('div');
 for (var i = 0; i < 10000; i++) {
 //dd.innerHTML = '<div class="wow">wtf?</div>';
 dd.innerHTML = '';
 }
 console.timeEnd('createInner');
 console.time('createDom');
 for (var i = 0; i < 10000; i++) {
 var d = document.createElement('div');
 d.className = 'wow';
 d.appendChild(document.createTextNode('wtf?'));
 }
 console.timeEnd('createDom');*/

function to(dom) {
    if (dom instanceof Text) {
        if (dom.textContent.trim()) {
            return {tag: '#', text: dom.textContent};
        }
        return null;
    }

    var className = null;
    var href = null;
    var id = null;
    var title = null;
    var attrs = null;
    if (dom.attributes) {
        for (var i = 0; i < dom.attributes.length; i++) {
            var attr = dom.attributes[i];
            /*if (attr.name == 'class') {
             className = attr.value;
             }
             else if (attr.name == 'href') {
             href = attr.value;
             }
             else if (attr.name == 'title') {
             title = attr.value;
             }
             else if (attr.name == 'id') {
             id = attr.value;
             }*/
            if (false) {
                ;
            }
            else {
                attrs = attrs || {};
                attrs[attr.name] = attr.value;
            }
        }
    }
    var children = [];
    for (var i = 0; i < dom.childNodes.length; i++) {
        var child = to(dom.childNodes[i]);
        if (child) {
            children.push(child);
        }
    }
    return {tag: dom.tagName, id: id, title: title, href: href, class: className, attrs: attrs, children: children}
}
//copy(JSON.stringify(to(document.body)));
