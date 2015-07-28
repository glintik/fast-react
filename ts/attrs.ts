import {VText, VTagNode, VNode, VComponent, VFragment} from './node';
import {append} from './append';
import {update, replaceNode} from './update';
import {normChild} from './utils';
import {attrs, props, events} from './const-attrs';
import {globs} from './component';

export function updateAttrs(old:VTagNode, parent:VNode, childPos:number) {
    var node = <VTagNode>parent.children[childPos];
    var res = true;
    if (node.attrs) {
        if (old.attrs) {
            createAttrs(node, old.attrs); // affect node.attrsCode
            res = old.attrsCode === node.attrsCode;
        }
        else {
            res = false;
        }
    }
    else if (old.attrs) {
        res = false;
    }
    if (res === false) {
        removeAttrs(old);
        createAttrs(node, old);
    }
}


export function createAttrs(node:VTagNode, oldAttrs?:any) {
    var dom:any = node.dom;
    var attr:string;
    var prop:string;
    var event:string;
    node.attrsCode = '';
    for (var attrName in node.attrs) {
        node.attrsCode += attrName;
        var attrVal = node.attrs[attrName];
        if (attrName == 'key' || (oldAttrs && oldAttrs[attrName] === attrVal && attrName !== 'ref')) {
            continue;
        }
        if (prop = props[attrName]) {
            if (attrVal == null) {
                dom[prop] = '';
            }
            else {
                dom[prop] = attrVal;
            }
        }
        else if (attr = attrs[attrName]) {
            if (attrVal == null || attrVal === false) {
                dom.removeAttribute(attr);
            }
            else if (typeof attrVal !== 'object') {
                dom.setAttribute(attr, attrVal);
            }
        }
        else if (event = events[attrName]) {
            dom['on' + event] = attrVal;
        }
        else if (attrName[0] === 'o' && attrName[1] === 'n') {
            event = attrName.substring(2).toLowerCase();
            dom['on' + event] = attrVal;
        }
        else if (attrName[0] === 'd' && attrName[1] === 'a' && attrName[2] === 't' && attrName[3] === 'a') {

            if (attrVal == null || attrVal === false) {
                dom.removeAttribute(attrName);
            }
            else {
                dom.setAttribute(attrName, attrVal);
            }
        }
        else if (attrName === 'style') {
            //todo:
        }
        else if (attrName == 'ref') {
            if (typeof attrVal == 'function') {
                attrVal(node);
            }
            else if (globs.component) {
                if (typeof globs.component.refs == 'undefined') {
                    globs.component.refs = {};
                }
                globs.component.refs[attrVal] = node;
            }
        }
    }
}

function removeAttrs(old:VTagNode) {
    var dom:any = old.dom;

    var attr:string;
    var prop:string;
    var event:string;

    for (var attrName in old.attrs) {
        var attrVal = old.attrs[attrName];
        if (prop = props[attrName]) {
            dom[prop] = '';
        }
        else if (attr = attrs[attrName]) {
            dom.removeAttribute(attr);
        }
        else if (attrName.substring(0, 4) == 'data') {
            dom.removeAttribute(attrName);
        }
        else if (event = events[attrName]) {
            dom['on' + event] = null;
        }
        else if (attrName.substring(0, 2) == 'on') {
            event = attrName.substring(2).toLowerCase();
            dom['on' + event] = null;
        }
        else if (attrName === 'style') {
            //todo:
        }
        else if (attrName == 'ref') {
            if (typeof attrVal == 'function') {
            }
            else if (globs.component) {
                if (typeof globs.component.refs == 'undefined') {
                    globs.component.refs = {};
                }
                globs.component.refs[attrVal] = null;
            }
        }
    }
}
