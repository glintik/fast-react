import {attrs, props, events} from './attrs';
import {updateComponent} from './component';
import {remove} from './remove';
import {normChild, getFirstChild, DEBUG} from './utils';
import {create} from './create';


export function update(old, vdom) {
    DEBUG && console.log("update", vdom);

    var dom = old.dom;
    dom.updated = true;
    vdom.dom = dom;
    vdom.parent = old.parent;
    if (old.tag !== vdom.tag) {
        return replaceNode(old, vdom);
    }
    if (old.tag == '#') {
        if (old.text !== vdom.text) {
            dom.textContent = vdom.text;
        }
        old.destroy();
        //todo:
        //old.parent = null;
        //old.dom = null;
        //node.cacheTextNode.push(old);
        return vdom;
    }
    if (old.text !== vdom.text) {
        dom.textContent = vdom.text;
        //dom.firstChild.updated = true;
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
    }
    else if (!vdom.text) {
        updateChildren(old, vdom);
    }
    //old.attrs = null;
    //todo:broke tests
    //old.children = null;
    //old.dom = null;
    //old.parent = null;
    return vdom;
}

export function updateChildren(old, vdom) {
    var oldLen = old.children ? old.children.length : 0;
    var newLen = vdom.children ? vdom.children.length : 0;
    if (oldLen) {
        var parentDom = old.dom;
        var beforeChild = getFirstChild(old);
        if ((vdom.tag == 'map' && old.tag != 'map') || (vdom.tag != 'map' && old.tag == 'map')) {
            return replaceNode(old, vdom);
        }
        else if (vdom.tag == 'map' && old.tag == 'map') {
            var res = mapChildren(old, vdom, beforeChild);
            if (res == false) {
                return replaceNode(old, vdom);
            }
        }
        else {
            if (oldLen === newLen) {
                for (var i = 0; i < newLen; i++) {
                    normChild(vdom, i);
                    update(old.children[i], vdom.children[i]);
                    //old.children[i] = null;
                }
            }
            else {
                for (i = 0; i < newLen; i++) {
                    normChild(vdom, i);
                    var newChild = vdom.children[i];
                    create(newChild, vdom);
                    insert(parentDom, newChild, beforeChild);
                }
                for (i = 0; i < oldLen; i++) {
                    remove(old, i);
                    //todo:
                    //old.children[i] = null;
                }
            }
        }
    }
    else if (oldLen !== newLen) {
        return replaceNode(old, vdom);
    }
    //old.children = null;
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
            return false;
        }
        var keyChild = old.children[keyMap[newKey]];
        if (keyChild) {
            found++;
            if (keyChild !== oldChild) {
                insert(parentDom, keyChild, beforeChild);
            }
            update(keyChild, newChild);
            if (keyChild == oldChild) {
                //old.children[i] = null;
            }
            keyMap[newKey] = null;
        }
        else {
            create(newChild, vdom);
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
                remove(old, i);
                //old.children[i] = null;
            }
        }
    }
    return true;
}

function replaceNode(old, vdom) {
    var parentDom = old.fragment ? old.dom : old.dom.parentNode;
    create(vdom, old.parent);
    insert(parentDom, vdom, old.fragment ? getFirstChild(old) : old);
    remove(old);
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
        else if ((isNotSame = attrVal !== old.attrs[attrName]) && (attr = props[attrName])) {
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

