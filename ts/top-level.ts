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
    return node;
}

export function createElement(tag:string | IComponent, attrs?:any, ...children:any[]):VNode {
    var key = attrs ? attrs.key : null;
    if (children.length == 0) {
        children = null;
    }
    if (tag == '@') {
        return new VFragment(children, key);
    }
    if (typeof tag == 'string') {
        return new VTagNode(<string>tag, attrs, children, key);
    }
    if (typeof tag == 'function') {
        return new VComponent(<IComponent>tag, attrs, children, key);
    }
}