import {VText, VTagNode, VNode, VComponent, VFragment} from './node';
import {normChild} from './utils';
import {createComponent} from './component';
import {createAttrs} from './attrs';
export function append(parent:VNode, childPos:number, beforeChild?:Node) {
    if (beforeChild == null && parent instanceof VFragment) {
        beforeChild = parent.lastNode;
    }
    let node = parent.children[childPos];
    if (node.key != null) {
        if (typeof parent.keyMap == 'undefined') {
            parent.keyMap = {}
        }
        parent.keyMap[node.key] = childPos;
    }
    if (node instanceof VFragment) {
        node.dom = parent.dom;
        node.firstNode = document.createComment('start fragment ' + node.id);
        node.lastNode = document.createComment('end fragment ' + node.id);
        node.firstNode.skip = true;
        node.lastNode.skip = true;
        parent.dom.insertBefore(node.firstNode, beforeChild);
        parent.dom.insertBefore(node.lastNode, beforeChild);

        if (node instanceof VComponent) {
            createComponent(node);
        }
    }
    else {
        if (node instanceof VText) {
            node.dom = document.createTextNode(node.text);
        }
        if (node instanceof VTagNode) {
            node.dom = document.createElement(node.tag);
            if (node.attrs) {
                createAttrs(node);
            }
        }
        parent.dom.insertBefore(node.dom, beforeChild);
    }

    if (node.children) {
        for (var i = 0; i < node.children.length; i++) {
            normChild(node, i);
            append(node, i);
        }
    }

    if (node instanceof VComponent) {
        node.component.componentDidMount();
    }
}
