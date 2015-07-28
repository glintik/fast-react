import {VText, VTagNode, VNode, VComponent, VFragment} from './node';
import {normChild} from './utils';
import {createComponent} from './component';
import {createAttrs} from './attrs';
export function append(parent:VNode, childPos:number, beforeChild?:Node) {
    if (beforeChild == null && parent instanceof VFragment) {
        beforeChild = parent.lastNode;
    }
    let parentDom = parent.dom;
    let node = parent.children[childPos];
    if (typeof node.key !== 'undefined') {
        if (typeof parent.keyMap == 'undefined') {
            parent.keyMap = {}
        }
        parent.keyMap[node.key] = childPos;
    }

    if (node instanceof VTagNode) {
        node.dom = document.createElement(node.tag);
        if (node.attrs) {
            createAttrs(node);
        }
        parentDom.insertBefore(node.dom, beforeChild);
        if (node.children && node.children.length == 1) {
            normChild(node, 0);
            var child = node.children[0];
            if (child instanceof VText){
                node.text = node.dom.textContent = child.text;
                node.children = null;
                return;
            }
        }
    }
    else if (node instanceof VText) {
        node.dom = document.createTextNode(node.text);
        parentDom.insertBefore(node.dom, beforeChild);
        return;
    }
    else if (node instanceof VFragment) {
        node.dom = parentDom;
        let txt = node instanceof VComponent ? (<any>node.ctor).name + ':' + node.id : '#';
        node.firstNode = document.createComment(' ' + txt + ' ');
        node.lastNode = document.createComment(' :' + txt + ' ');
        (<any>node.firstNode).skip = true;
        (<any>node.lastNode).skip = true;
        parentDom.insertBefore(node.firstNode, beforeChild);
        parentDom.insertBefore(node.lastNode, beforeChild);

        if (node instanceof VComponent) {
            createComponent(node);
            return;
        }
    }

    if (node.children) {
        for (var i = 0; i < node.children.length; i++) {
            normChild(node, i);
            append(node, i);
        }
    }
}
