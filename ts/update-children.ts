import {VText, VTagNode, VNode, VComponent, VFragment} from './node';
import {append} from './append';
import {update} from './update';
import {remove} from './remove';
import {normChild} from './utils';

export function updateChildren(old:VNode, node:VNode) {
    var oldChildren = old.children;
    var newChildren = node.children;
    var inserts:any = new Array(100000);
    inserts.len = 0;
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

            if (fitPos != null) {
                fitCount++;
                update(oldChildren[fitPos], node, i);
                if (fitPos !== i) {
                    inserts[inserts.len++] = i;
                    //move(node.children[i], node, beforeChild);
                }
                oldChildren[fitPos] = null;
            }
            else {
                inserts[inserts.len++] = i;
                //append(node, i, beforeChild);
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

    for (var i = inserts.len - 1; i >= 0; i--) {
        var pos:number = inserts[i];

        if (i == inserts.len - 1) {
            var beforeChild = node instanceof VFragment
                ? node.lastNode
                : null;
        }
        else {
            beforeChild = newChildren[i + 1] instanceof VFragment
                ? (<VFragment>newChildren[i + 1]).firstNode
                : newChildren[i + 1].dom;
        }

        if (newChildren[pos].dom) {
            move(newChildren[pos], node, beforeChild);
        }
        else {
            append(node, pos, beforeChild);
        }
    }
}

function move(node:VNode, parent:VNode, beforeChild:Node) {
    if (node instanceof VFragment) {
        var prevDom:Node;
        var dom = node.lastNode;
        var endNode = node.firstNode;
        while (true) {
            prevDom = dom.previousSibling;
            if (dom.previousSibling !== beforeChild) {
                parent.dom.insertBefore(dom, beforeChild);
            }
            beforeChild = dom;
            if (dom == endNode) {
                break;
            }
            dom = prevDom;
        }
    }
    else {
        parent.dom.insertBefore(node.dom, beforeChild);
    }
}
