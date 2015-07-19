import {VText, VTagNode, VNode, VComponent, VFragment} from './node';
import {IComponent} from './component';
import {append} from './append';
import {update} from './update';
import {normChild} from './utils';

export {Component, findDOMNode} from './component';

export function render(node:VNode, dom:Node) {
    var root = new VTagNode(null, null, [node], null);
    root.dom = dom;
    normChild(root, 0);
    append(root, 0);
    return node;
}

export function updater(old:VNode, node:VNode) {
    var root = new VTagNode(null, null, [node], null);
    root.dom = old.dom.parentNode;
    normChild(root, 0);
    update(old, root, 0);
    return root.children[0];
}

export function createElement(tag:string | IComponent, attrs?:any, ...children:any[]):VNode;
export function createElement(tag:string | IComponent, attrs?:any):VNode {
    if (attrs) {
        var key = typeof attrs.key == 'undefined' ? undefined : attrs.key;
        //var ref = typeof attrs.ref == 'undefined' ? undefined : attrs.ref;
    }
    var len = arguments.length;
    var children:any[] = null;
    if (len > 2) {
        children = Array(len - 2);
        for (var i = 2; i < len; i++) {
            children[i - 2] = arguments[i];
        }
    }
    if (tag == '@') {
        return new VFragment(children, key);
    }
    if (typeof tag == 'string') {
        return new VTagNode(<string>tag, attrs, children, key);
    }
    else if (typeof tag == 'function') {
        return new VComponent(<IComponent>tag, attrs, children, key);
    }
}