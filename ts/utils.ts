import {VText, VTagNode, VNode, VComponent, VFragment, getVText} from './node';
export function normChild(parent:VNode, childPos:number) {
    var node = <any>parent.children[childPos];
    if (typeof node == 'object' && node && node instanceof VNode) {
        return;
    }
    if (typeof node == 'string' || typeof node == 'number') {
        parent.children[childPos] = getVText(node + '');
        return;
    }
    if (node == null) {
        parent.children[childPos] = getVText('');
        return;
    }
    if (typeof node === 'object') {
        if (node instanceof Array) {
            parent.children[childPos] = new VFragment(node, null);
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
