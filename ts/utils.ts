import {NodeType, VText, VTagNode, VNode, VComponent, VFragment, getVText} from './node';
export function normChild(parent:VNode, childPos:number) {
    var node = <any>parent.children[childPos];
    if (node && typeof node == 'object' && node.type > 0) {
        return;
    }
    if (typeof node == 'string' || typeof node == 'number') {
        parent.children[childPos] = <any>{type: NodeType.TEXT, dom: null, text: node};
        return;
    }
    if (node == null) {
        parent.children[childPos] = getVText('');
        return;
    }
    if (typeof node === 'object') {
        if (node instanceof Array) {
            parent.children[childPos] = <any>{type: NodeType.FRAGMENT, lastNode: null, firstNode: null, children: node, dom: null};
        }
        else {
            parent.children[childPos] = getVText(JSON.stringify(node));
        }
        return;
    }
    if (typeof node === 'function') {
        parent.children[childPos] = getVText('Function');
        return;
    }
    parent.children[childPos] = getVText('');
}

export function destroy(node: VNode){
    //node.dom = null;
}
