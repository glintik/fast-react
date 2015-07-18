import {VText, VTagNode, VNode, VComponent, VFragment} from './node';
export function normChild(parent:VNode, childPos:number) {
    var node = <any>parent.children[childPos];
    if (node instanceof VNode) {
        return;
    }
    if (typeof node == 'string' || typeof node == 'number') {
        parent.children[childPos] = new VText(node + '');
        return;
    }
    if (node == null) {
        parent.children[childPos] = new VText('');
        return;
    }
    if (typeof node === 'object') {
        if (node instanceof Array) {
            parent.children[childPos] = new VFragment(node, null);
        }
        else {
            parent.children[childPos] = new VText(JSON.stringify(node));
        }
        return;
    }
    if (typeof node === 'function') {
        parent.children[childPos] = new VText('Function');
        return;
    }
    parent.children[childPos] = new VText('');
}
