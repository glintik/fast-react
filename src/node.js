function VNode() {};

VNode.prototype.text = null;
VNode.prototype.dom = null;
VNode.prototype.tag = '#';
VNode.prototype.attrs = null;
VNode.prototype.children = null;
VNode.prototype.allAttrs = null;
VNode.prototype.fragment = false;
VNode.prototype.key = null;
VNode.prototype.vnode = true;

//var cacheFraments = [];
//var cacheComponent = [];
var cacheNode = [];
var cacheTextNode = [];


export function VFragmentNode(tag, attrs, children, key) {
    this.id = id++;
    this.tag = tag;
    if (tag == 'map') {
        this.keyMap = {};
    }
    this.children = children;
    this.fragment = true;
    if (key) {
        this.key = key;
    }
    this.parent = null;
    this.dom = null;
    this.attrs = attrs;
}

VFragmentNode.prototype = VNode.prototype;

export function VComponent(tag, attrs, children, key) {
    //objects.push(this);
    this.id = id++;
    this.tag = tag;
    this.children = children;
    this.fragment = true;
    if (key) {
        this.key = key;
    }
    this.parent = null;
    this.dom = null;
    this.attrs = attrs;
    //this.destroyed = null;
}

VComponent.prototype = VNode.prototype;

var id = 1;

export function NNode(tag, attrs, children, key, text) {
    //objects.push(this);
    this.id = id++;
    this.tag = tag;
    this.attrs = attrs;
    this.children = children;
    if (text) {
        this.text = text;
    }
    this.allAttrs = '';
    this.key = key;
    this.dom = null;
    this.parent = null;
};

function getNNode(tag, attrs, children, key, text) {
    if (cacheNode.length > 0) {
        var item = cacheNode.pop();
        item.tag = tag;
        item.attrs = attrs;
        item.children = children;
        item.key = key;
        item.text = text;
        item.allAttrs = '';
        return item;
    }
    else {
        return new NNode(tag, attrs, children, key, text);
    }
}

NNode.prototype = VNode.prototype;

export function VTextNode(text) {
//        this.id = id++;
    this.dom = null;
    this.text = text;
    //this.parent = null;
}

function getVTextNode(text) {
    if (cacheTextNode.length > 0) {
        var item = cacheTextNode.pop();
        item.text = text;
        return item;
    }
    else {
        return new VTextNode(text);
    }
}


VTextNode.prototype = VNode.prototype;
