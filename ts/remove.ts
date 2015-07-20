import {VText, VTagNode, VNode, VComponent, VFragment} from './node';
import {append} from './append';
import {update} from './update';
import {normChild} from './utils';

export function remove(node:VNode, parent:VNode, childPos?:number, skipRemove?:boolean) {
    if (node instanceof VComponent) {
        node.component.componentWillUnmount();
    }
    if (node.children) {
        var skip = skipRemove || !(node instanceof VFragment);
        for (var i = 0; i < node.children.length; i++) {
            remove(node.children[i], node, i, skip);
        }
    }

    if (!skipRemove) {
        if (node instanceof VFragment) {
            parent.dom.removeChild(node.firstNode);
            parent.dom.removeChild(node.lastNode);
        }
        else {
            parent.dom.removeChild(node.dom);
        }
    }
    node.destroy();
    if (childPos != null) {
        parent.children[childPos] = null;
    }
}
