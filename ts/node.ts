import {IComponent, Component} from './component';

var id = 1;

export class VNode {
    id:number;
    dom:Node;
    children:VNode[];
    keyMap:{[index: string]:number};
    key:string;
    destroyed: boolean;

    destroy() {
        this.destroyed = true;
    }
}

export class VFragment extends VNode {
    lastNode:Node;
    firstNode:Node;

    constructor(children:VNode[], key:string) {
        if (false) {
            super();
        }
        this.id = id++;
        this.dom = null;
        this.lastNode = null;
        this.firstNode = null;
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
        this.id = id++;
        this.dom = null;
        this.lastNode = null;
        this.firstNode = null;
        this.ctor = ctor;
        this.attrs = attrs;
        this.children = children;
        this.key = key;
    }
}

export class VTagNode extends VNode {
    attrs:any;
    attrsCode:string;
    tag:string;

    constructor(tag:string, attrs:any, children:VNode[], key:string) {
        if (false) {
            super();
        }
        this.id = id++;
        this.dom = null;
        this.tag = tag;
        this.attrs = attrs;
        this.children = children;
        this.key = key;
    }
}

export class VText extends VNode {
    text:string;

    constructor(text:string) {
        if (false) {
            super();
        }
        this.id = id++;
        this.dom = null;
        this.text = text;
    }
}
