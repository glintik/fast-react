import {getTextNode, VFragmentNode} from './node';

export let DEBUG = false;
export function normChild(vdom, i) {
    if (!vdom.children[i] || !vdom.children[i].tag) {
        var child = vdom.children[i];
        if (typeof child == 'string' || typeof child == 'number') {
            vdom.children[i] = getTextNode(child);
        }
        else if (child == null) {
            vdom.children[i] = getTextNode('');
        }
        else if (typeof child === 'object') {
            if (child instanceof Array) {
                child.len = child.length;
                vdom.children[i] = new VFragmentNode('map', null, child, null);
            }
            else {
                vdom.children[i] = getTextNode(JSON.stringify(child));
            }
        }
        else if (typeof child === 'function') {
            vdom.children[i] = getTextNode('Function');
        }
        else {
            vdom.children[i] = getTextNode('');
        }
    }
    //return vdom.children[i];
}

export function getFirstChild(old) {
    var beforeChild = old.children[0];
    while (beforeChild && beforeChild.fragment) {
        beforeChild = beforeChild.children[0];
    }
    return beforeChild;
}

var cacheArray = new Array(100000);
cacheArray.len = 0;
export function getCacheArray(size) {
    if (cacheArray.len == 0) {
        var item = new Array(size);
        item.len = size;
        return item;
    }
    else {
        var item = cacheArray[--cacheArray.len];
        item.len = size;
        return item;
    }
}
