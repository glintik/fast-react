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
        var prevNode:Node;
        for (var i = 0; i < newChildren.length; i++) {
            normChild(node, i);
            var fitPos:number = null;
            var newChild = newChildren[i];
            var oldChild = oldChildren && oldChildren[i];
            if (typeof old.keyMap == 'object') {
                if (newChild.key != null) {
                    fitPos = old.keyMap[newChild.key];
                }
                else {
                    if (oldChild && oldChild.key == null) {
                        fitPos = i;
                    }
                }
            }
            else if (oldChild) {
                fitPos = i;
            }
            if (fitPos != null) {
                fitCount++;
                update(oldChildren[fitPos], node, i);
                if (fitPos !== i) {
                    moveToEnd(newChild, node);
                }
                oldChildren[fitPos] = null;
            }
            else {
                append(node, i);
            }

        }
    }

    if (oldChildren && oldChildren.length !== fitCount) {
        for (var i = 0; i < oldChildren.length; i++) {
            var oldChild = oldChildren[i];
            if (oldChild) {
                remove(oldChild, old, i)
            }
        }
    }
}

function moveToEnd(node:VNode, parent:VNode) {
    node.dom.parentNode.insertBefore(node.dom, parent instanceof VFragment ? parent.lastNode : null)
}