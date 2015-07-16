import {attrs, props, events} from './attrs';
import {updateComponent, destroyComponent} from './component';
import {normChild, getFirstChild, DEBUG} from './utils';
import {create} from './create';

export function updateDom(old, vdom) {
    old.dom.updated = true;
    vdom.dom = old.dom;
}
export function update(old, vdom) {
    DEBUG && console.log("update", vdom);
    updateDom(old, vdom);
    var dom = old.dom;

    //vdom.parent = old.parent;
    if (old.tag !== vdom.tag) {
        return replaceNode(old, vdom);
    }
    if (old.tag == '#') {
        if (old.text !== vdom.text) {
            dom.textContent = vdom.text;
        }
        old.destroy();
        return vdom;
    }
    if (old.text !== vdom.text) {
        dom.textContent = vdom.text;
    }

    if (vdom.fragment) {
        if (vdom.key !== old.key) {
            return replaceNode(old, vdom);
        }
    }
    else {
        vdom.allAttrs = '';
        if (vdom.attrs && old.attrs) {
            forAttrs(old, vdom);
        }
        if ((old.attrs && !vdom.attrs) || (!old.attrs && vdom.attrs) || old.allAttrs !== vdom.allAttrs) {
            return replaceNode(old, vdom);
        }
    }
    if (old.component) {
        updateComponent(old, vdom);
        return vdom;
    }

    if (!vdom.text) {
        updateChildren(old, vdom);
    }
    old.destroy();
    return vdom;
}

export function updateChildren(old, vdom) {
    var oldLen = old.children ? old.children.length : 0;
    var newLen = vdom.children ? vdom.children.length : 0;
    if (oldLen && newLen && vdom.isMap && old.isMap) {
        mapChildren(old, vdom, getFirstChild(old));
        return;
    }

    if (oldLen > 0) {
        if (oldLen === newLen) {
            for (var i = 0; i < newLen; i++) {
                normChild(vdom, i);
                vdom.children[i] = update(old.children[i], vdom.children[i]);
                //clearChild(old, i);
            }
        }
        else {
            for (i = 0; i < newLen; i++) {
                normChild(vdom, i);
                var newChild = vdom.children[i];
                create(newChild, vdom.dom);
                insert(old.dom, newChild, getFirstChild(old));
            }
            for (i = 0; i < oldLen; i++) {
                remove(old.children[i]);
                //clearChild(old, i)
            }
        }
    }
    else if (newLen > 0) {
        return replaceChildren(old, vdom);
    }
}


function mapChildren(old, vdom, beforeChild) {
    var parentDom = old.dom;
    var keyMap = old.keyMap;
    var newKeyMap = vdom.keyMap;
    var newChildren = vdom.children;
    var newLen = newChildren.length;
    var oldLen = old.children.length;
    var found = 0;
    for (var i = 0; i < newLen; i++) {
        normChild(vdom, i);
        var newChild = newChildren[i];
        var oldChild = old.children[i];
        var newKey = newChild.key;
        if (newKey == null) {
            console.warn('map without keys', vdom);
            debugger;
            return replaceChildren(old, vdom);
        }
        var keyChild = old.children[keyMap[newKey]];
        if (keyChild) {
            found++;
            if (keyChild !== oldChild) {
                insert(parentDom, keyChild, beforeChild);
            }
            newChildren[i] = update(keyChild, newChild);
            if (keyChild == oldChild) {
                clearChild(old, i);
            }
            keyMap[newKey] = null;
        }
        else {
            create(newChild, vdom.dom);
            insert(parentDom, newChild, beforeChild);
        }
        beforeChild = newChild.dom.nextSibling;
        newKeyMap[newKey] = i;
    }
    //old.keyMap = null;

    if (found !== oldLen) {
        for (i = 0; i < oldLen; i++) {
            var child = old.children[i];
            if (child && newKeyMap[child.key] == null) {
                remove(child);
                clearChild(old, i);
            }
        }
    }
}

function replaceNode(old, vdom) {
    var parentDom = old.fragment ? old.dom : old.dom.parentNode;
    create(vdom, parentDom);
    insert(parentDom, vdom, old.fragment ? getFirstChild(old) : old);
    remove(old);
    return vdom;
}

function replaceChildren(old, vdom) {
    if (vdom.children){
        for (var i = 0; i < vdom.children.length; i++) {
            normChild(vdom, i);
            var child = vdom.children[i];
            create(child, vdom.dom);
            insert(vdom.dom, child, vdom.fragment ? vdom.firstNode : null);
        }
    }

    if (old.children) {
        for (var i = 0; i < old.children.length; i++) {
            var child = old.children[i];
            remove(child);
            child.destroy();
        }
    }
    return vdom;
}

function forAttrs(old, vdom) {
    var attr;
    var isNotSame;
    var dom = vdom.dom;
    for (var attrName in vdom.attrs) {
        vdom.allAttrs += attrName;
        var attrVal = vdom.attrs[attrName];
        if (attrName == 'key') {}
        else if ((isNotSame = vdom.attrs[attrName] !== old.attrs[attrName]) && (attr = props[attrName])) {
            dom[attr] = attrVal;
        }
        else if ((attr = attrs[attrName]) && isNotSame) {
            if (attrVal === false) {
                dom.removeAttribute(attr);
            }
            else {
                dom.setAttribute(attr, attrVal);
            }
        }
        else if (attr = events[attrName] && isNotSame) {
            dom['on' + attr] = attrVal;
        }
        else if (attrName[0] === 'o' && attrName[1] === 'n' && isNotSame) {
            attr = attrName.substring(2).toLowerCase();
            dom['on' + attr] = attrVal;
        }
        else if (attrName[0] === 'd' && attrName[1] === 'a' && attrName[2] === 't' && attrName[3] === 'a' && isNotSame) {
            if (attrVal === false) {
                dom.removeAttribute(attrName);
            }
            else {
                dom.setAttribute(attrName, attrVal);
            }
        }
        else if (attrName === 'ref' && typeof attrVal == 'function') {
            attrVal(vdom);
        }
    }
}

function insert(parentDom, vdom, before) {
    if (vdom.fragment) {
        for (var i = 0; i < vdom.children.length; i++) {
            insert(vdom.dom, vdom.children[i], before);
        }
        return;
    }
    DEBUG && console.log("Insert", vdom);
    parentDom.insertBefore(vdom.dom, before && before.dom);
}


function clearChild(old, i) {
    //old.children[i] = null;
}

export function remove(old) {
    DEBUG && console.log("remove", old);

    if (old.component) {
        destroyComponent(old);
    }
    if (old.children) {
        for (var i = 0; i < old.children.length; i++) {
            remove(old.children[i]);
            clearChild(old, i);
        }
    }
    if (!old.fragment) {
        old.dom.parentNode.removeChild(old.dom);
    }
    old.destroy();
}
