import {attrs, props, events} from './attrs';
import {DEBUG, normChild} from './utils';
import {VFragmentNode, VComponent, getNNode} from './node';
import {createComponent, mountComponent} from './component';

export function render(vdom, dom) {
    dom.appendChild(create(vdom, dom));
    if (vdom.component) {
        mountComponent(vdom);
    }
    return vdom;
}

export function create(vdom, parentDom) {
    DEBUG && console.log("Create", vdom);
    //vdom.parent = parent;
    if (vdom.tag == '#') {
        vdom.dom = document.createTextNode(vdom.text);
        //vdom.dom.virtual = vdom;
        return vdom.dom;
    }
    var dom;
    if (vdom.fragment) {
        if (typeof vdom.tag === 'function') {
            createComponent(vdom);
        }
        dom = document.createDocumentFragment();
        vdom.dom = parentDom;
    }
    else {
        dom = document.createElement(vdom.tag);
        vdom.dom = dom;
        //dom.virtual = vdom;
    }

    if (vdom.children) {
        for (var i = 0; i < vdom.children.length; i++) {
            if (!vdom.children[i] || !vdom.children[i].tag){
                normChild(vdom, i);
            }
            var child = vdom.children[i];
            if (vdom.tag === 'map' && child.attrs) {
                vdom.keyMap[child.key] = i;
            }
            dom.appendChild(create(child, vdom.dom));
            if (child.component) {
                mountComponent(child);
            }
        }
    }
    else if (vdom.text) {
        dom.textContent = vdom.text;
    }
    vdom.allAttrs = '';
    if (vdom.attrs && !vdom.fragment) {
        if (vdom.attrs.ref) {
            if (typeof vdom.attrs.ref === 'function') {
                vdom.attrs.ref(vdom);
            }
            //todo:
/*
            else if (currentComponent) {
                currentComponent.refs = currentComponent.refs || {};
                currentComponent.refs[vdom.attrs.ref] = vdom;
            }
*/
        }

        var attr;
        var prop;
        var event;
        for (var attrName in vdom.attrs) {
            vdom.allAttrs += attrName;
            var attrVal = vdom.attrs[attrName];
            if ((prop = props[attrName]) && attrVal !== false) {
                dom[prop] = attrVal;
            }
            else if ((attr = attrs[attrName]) && attrVal !== false) {
                dom.setAttribute(attr, attrVal);
            }
            else if (event = events[attrName]) {
                //dom.addEventListener(event, eventHandler(attrVal));
                dom['on' + event] = attrVal;
            }
            else if (attrName[0] === 'o' && attrName[1] === 'n') {
                event = attrName.substring(2).toLowerCase();
                dom['on' + event] = attrVal;
                //dom.addEventListener(event, eventHandler(attrVal));
            }
            else if (attrName[0] === 'd' && attrName[1] === 'a' && attrName[2] === 't' && attrName[3] === 'a' && attrVal !== false) {
                dom.setAttribute(attrName, attrVal);
            }
            /*
             else if (key === 'style') {
             }
             */

        }
    }
    return dom;
}


export function createElementArray(tag, attrs, children) {
    var isFragment = tag == '@' || typeof tag == 'function';
//        var text = (children && !isFragment && (typeof children[0] == 'string' || typeof children[0] == 'number')) ? children[0] + '' : null;
    if (isFragment) {
        if (typeof tag == 'function') {
            return new VComponent(tag, attrs, children, attrs ? attrs.key : null);
        }
        else {
            return new VFragmentNode(tag, attrs, children, attrs ? attrs.key : null);
        }
    }
    else {
        return getNNode(tag, attrs, children, attrs ? attrs.key : null, null);
    }
}

export function createElement(tag, attrs) {
    var len = arguments.length;
    var isFragment = tag == '@' || typeof tag == 'function';
    var text = (len == 3 && !isFragment && (typeof arguments[2] == 'string' || typeof arguments[2] == 'number')) ? arguments[2] + '' : null;
    var children = null;
    if (!text && len > 2) {
        children = Array(len - 2);
        for (var i = 2; i < len; i++) {
            children[i - 2] = arguments[i];
        }
    }

    if (isFragment) {
        if (typeof tag == 'function') {
            return new VComponent(tag, attrs, children, attrs ? attrs.key : null);
        }
        else {
            return new VFragmentNode(tag, attrs, children, attrs ? attrs.key : null);
        }
    }
    else {
        return getNNode(tag, attrs, children, attrs ? attrs.key : null, text);
    }
}


