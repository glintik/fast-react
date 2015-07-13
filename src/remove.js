import {destroyComponent} from './component';
import {DEBUG} from './utils';

export function remove(old) {
    DEBUG && console.log("remove", old);

    if (old.component) {
        destroyComponent(old);
    }
    if (old.children) {
        for (var i = 0; i < old.children.len; i++) {
            removeChild(old, i);
        }
    }
    if (!old.fragment) {
        old.dom.parentNode.removeChild(old.dom);
    }
    old.destroy();
}

export function removeChild(old, i) {
    remove(old.children[i]);
    old.children[i] = null;
}
