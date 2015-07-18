import {VText, VTagNode, VNode, VComponent, VFragment} from './node';
import {normChild} from './utils';
import {remove} from './remove';
import {append} from './append';
import {updateChildren} from './update-children';
import {updateAttrs} from './attrs';
import {updateComponent} from './component';

export function update(old:VNode, parent:VNode, childPos:number) {
    var node = parent.children[childPos];

    if (node.key != null) {
        if (typeof parent.keyMap == 'undefined') {
            parent.keyMap = {}
        }
        parent.keyMap[node.key] = childPos;
    }
    if (old.constructor !== node.constructor) {
        replaceNode(old, parent, childPos);
        return;
    }
    if (node instanceof VComponent) {
        if ((<VComponent>old).ctor !== node.ctor) {
            replaceNode(old, parent, childPos);
            return;
        }
        updateComponent(<VComponent>old, parent, childPos);
        return;
    }
    if (node instanceof VFragment) {
        node.lastNode = (<VFragment>old).lastNode;
        node.firstNode = (<VFragment>old).firstNode;
        node.parentDom = (<VFragment>old).parentDom;
    }
    if (node instanceof VText) {
        node.dom = (<VText>old).dom;
        node.dom.textContent = node.text;
        old.destroy();
        return;
    }
    if (node instanceof VTagNode) {
        if ((<VTagNode>old).tag !== node.tag) {
            replaceNode(old, parent, childPos);
            return;
        }
        node.dom = (<VTagNode>old).dom;

        let successAttrs = updateAttrs(<VTagNode>old, parent, childPos);
        if (!successAttrs) {
            replaceNode(old, parent, childPos);
            return;
        }
    }
    updateChildren(old, node);
    old.destroy();
}

export function replaceNode(old:VNode, parent:VNode, childPos:number) {
    append(parent, childPos, old instanceof VFragment ? old.firstNode : (<VTagNode>old).dom);
    remove(old, parent);
}
