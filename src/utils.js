import {VTextNode, VFragmentNode} from './node';

export let DEBUG = false;
export function normChild(vdom, i) {
    if (!vdom.children[i] || !vdom.children[i].tag) {
        var child = vdom.children[i];
        if (typeof child == 'string' || typeof child == 'number') {
            vdom.children[i] = new VTextNode(child);
        }
        else if (child == null) {
            vdom.children[i] = new VTextNode('');
        }
        else if (typeof child === 'object') {
            if (child instanceof Array) {
                vdom.children[i] = new VFragmentNode('map', null, child, null);
            }
            else {
                vdom.children[i] = new VTextNode(JSON.stringify(child));
            }
        }
        else if (typeof child === 'function') {
            vdom.children[i] = new VTextNode('Function');
        }
        else {
            vdom.children[i] = new VTextNode('');
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
