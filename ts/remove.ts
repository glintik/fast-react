import {VText, VTagNode, VNode, VComponent, VFragment} from './node';
import {append} from './append';
import {update} from './update';
import {normChild} from './utils';

export function remove(node:VNode, parent:VNode, childPos?:number) {
    if (node instanceof VComponent) {
        node.component.componentWillUnmount();
    }
    if (node.children) {
        for (var i = 0; i < node.children.length; i++) {
            remove(node.children[i], node, i)
        }
    }

    if (node instanceof VFragment) {
        node.dom.removeChild(node.lastNode);
    }
    else {
        parent.dom.removeChild(node.dom);
    }
    node.destroy();
    if (childPos != null) {
        parent.children[childPos] = null;
    }
}
