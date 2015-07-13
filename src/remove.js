import {destroyComponent} from './component';
import {DEBUG} from './utils';

export function remove(old, i) {
    if (i !== void 0) {
        old = old.children[i];
    }
    DEBUG && console.log("remove", old);

    if (old.component) {
        destroyComponent(old);
    }
    if (old.children) {
        for (var i = 0; i < old.children.length; i++) {
            remove(old, i);
            //old.children[i] = null;
        }
    }
    if (!old.fragment) {
        old.dom.parentNode.removeChild(old.dom);
    }
    //old.dom = null;
    //old.attrs = null;
    //old.children = null;
    //old.parent = null;
}

export function removeChild(){
    if (i !== void 0) {
        old = old.children[i];
    }
    DEBUG && console.log("remove", old);

    if (old.component) {
        destroyComponent(old);
    }
    if (old.children) {
        for (var i = 0; i < old.children.length; i++) {
            remove(old, i);
            //old.children[i] = null;
        }
    }
    if (!old.fragment) {
        old.dom.parentNode.removeChild(old.dom);
    }
    //old.dom = null;
    //old.attrs = null;
    //old.children = null;
    //old.parent = null;
}
