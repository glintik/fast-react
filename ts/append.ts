import {NodeType, VText, VTagNode, VNode, VComponent, VFragment} from './node';
import {normChild} from './utils';
import {createComponent} from './component';
import {createAttrs} from './attrs';
export function append(parent:VNode, childPos:number, beforeChild?:Node) {
    if (beforeChild == null && (parent.type == NodeType.FRAGMENT || parent.type == NodeType.COMPONENT)) {
        beforeChild = (<VFragment>parent).lastNode;
    }
    let parentDom = parent.dom;
    let node = parent.children[childPos];
    if (typeof node.key !== 'undefined') {
        if (typeof parent.keyMap == 'undefined') {
            parent.keyMap = {}
        }
        parent.keyMap[node.key] = childPos;
    }

    if (node.type == NodeType.TEXT) {
        node.dom = document.createTextNode((<VText>node).text);
        parentDom.insertBefore(node.dom, beforeChild);
        return;
    }

    if (node.type == NodeType.TAG) {
        node.dom = document.createElement((<VTagNode>node).tag);
        if ((<VTagNode>node).attrs) {
            createAttrs(<VTagNode>node);
        }
        parentDom.insertBefore(node.dom, beforeChild);
    }
    else if (node.type == NodeType.FRAGMENT || node.type == NodeType.COMPONENT) {
        node.dom = parentDom;
        let txt = node.type == NodeType.COMPONENT ? (<any>(<VComponent>node).ctor).name + ':' + node.id : '#';
        (<VFragment>node).firstNode = document.createComment(' ' + txt + ' ');
        (<VFragment>node).lastNode = document.createComment(' :' + txt + ' ');
        (<any>(<VFragment>node).firstNode).skip = true;
        (<any>(<VFragment>node).lastNode).skip = true;
        parentDom.insertBefore((<VFragment>node).firstNode, beforeChild);
        parentDom.insertBefore((<VFragment>node).lastNode, beforeChild);

        if (node.type == NodeType.COMPONENT) {
            createComponent(<VComponent>node);
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
