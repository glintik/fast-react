import {VText, VTagNode, VNode, VComponent, VFragment} from './node';
import {append} from './append';
import {update} from './update';
import {remove} from './remove';
import {normChild} from './utils';

export function updateChildren(old:VNode, node:VNode) {
    var oldChildren = old.children;
    var newChildren = node.children;
    if (newChildren) {
        var fitCount = 0;
        for (var i = 0; i < newChildren.length; i++) {
            normChild(node, i);
            var fitPos:number = null;
            var newChild = newChildren[i]; // only use before update
            var oldChild = oldChildren && oldChildren[i];
            if (typeof old.keyMap == 'object') {
                if (typeof newChild.key != 'undefined') {
                    fitPos = old.keyMap[newChild.key];
                }
                else {
                    if (oldChild && typeof oldChild.key == 'undefined') {
                        fitPos = i;
                    }
                }
            }
            else if (oldChild) {
                fitPos = i;
            }

            if (fitPos == null || fitPos !== i) {
                if (i == 0) {
                    var beforeChild = node instanceof VFragment
                        ? node.firstNode.nextSibling
                        : node.dom.firstChild;
                }
                else {
                    beforeChild = newChildren[i - 1] instanceof VFragment
                        ? (<VFragment>newChildren[i - 1]).lastNode.nextSibling
                        : newChildren[i - 1].dom.nextSibling;
                }
            }

            if (fitPos != null) {
                fitCount++;
                update(oldChildren[fitPos], node, i);
                if (fitPos !== i) {
                    move(node.children[i], node, beforeChild);
                }
                oldChildren[fitPos] = null;
            }
            else {
                append(node, i, beforeChild);
            }
        }
    }

    if (oldChildren && oldChildren.length !== fitCount) {
        for (var i = 0; i < oldChildren.length; i++) {
            var oldChild = oldChildren[i];
            if (oldChild) {
                remove(oldChild, old, i)
            }
            oldChildren[i] = null;
        }
    }
}

function move(node:VNode, parent:VNode, beforeChild:Node) {
    if (node instanceof VFragment) {
        var nextDom:Node;
        var dom = node.firstNode;
        var endNode = node.lastNode;
        while (true) {
            nextDom = dom.nextSibling;
            parent.dom.insertBefore(dom, beforeChild);
            if (dom == endNode) {
                break;
            }
            dom = nextDom;
        }
    }
    else {
        parent.dom.insertBefore(node.dom, beforeChild);
    }
}