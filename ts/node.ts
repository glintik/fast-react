import {IComponent, Component} from './component';

export class BaseNode {
    dom:Node;
    children:VNode[];
    keyMap:{[index: string]:number};
    key:string;

    destroy() {

    }
}

export class VFragment extends BaseNode {
    lastNode:Node;
    constructor(children:VNode[], key:string) {
        if (false) {
            super();
        }
        this.dom = null;
        this.children = children;
        this.key = key;
    }
}

export class VComponent extends VFragment {
    attrs:any;
    //todo
    component:Component;
    ctor:IComponent;

    constructor(ctor:IComponent, attrs:any, children:VNode[], key:string) {
        if (false) {
            super(null, null);
        }
        this.dom = null;
        this.ctor = ctor;
        this.attrs = attrs;
        this.children = children;
        this.key = key;
    }
}

export class VTagNode extends BaseNode {
    attrs:any;
    attrsCode:string;
    tag:string;

    constructor(tag:string, attrs:any, children:VNode[], key:string) {
        if (false) {
            super();
        }
        this.dom = null;
        this.tag = tag;
        this.attrs = attrs;
        this.children = children;
        this.key = key;
    }
}

export class VText extends BaseNode {
    text:string;

    constructor(text:string) {
        if (false) {
            super();
        }
        this.dom = null;
        this.text = text;
    }
}

export type VNode = VTagNode | VComponent | VFragment | VText;