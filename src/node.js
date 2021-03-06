var id = 1;

var proto = {
    text: null,
    dom: null,
    tag: null,
    attrs: null,
    children: null,
    allAttrs: null,
    fragment: false,
    component: null,
    key: null,
    keyMap: null,
    vnode: true,
    isMap: false,
    destroyed: null,
    destroy: function () {
        if (this.dom == null){
            debugger;
        }

        this.dom = null;
        this.children = null;
        this.attrs = null;
        //this.destroyed = true;
        //this.parent = null;
    }
};

function classExtend(Class, proto, overrides) {
    for (var prop in proto) {
        Class.prototype[prop] = proto[prop];
    }
    for (prop in overrides) {
        Class.prototype[prop] = overrides[prop];
    }
}

//var cacheFraments = [];
//var cacheComponent = [];
var cacheNode = [];
var cacheTextNode = [];


export function VFragmentNode(tag, attrs, children, key) {
    this.id = id++;
    this.tag = tag;
    if (tag == 'map') {
        this.keyMap = {};
        this.isMap = true;
        //todo:
        //this.key = Math.random();
    }
    this.children = children;
    if (key) {
        this.key = key;
    }
    //this.parent = null;
    this.dom = null;
    this.attrs = attrs;
}
classExtend(VFragmentNode, proto, {
    fragment: true,
    destroy: function () {
        if (this.dom == null){
            debugger;
        }
        this.dom = null;
        this.children = null;
        //this.attrs = null;
        this.keyMap = null;
        //this.destroyed = true;
        //this.parent = null;
    }
});


export function VComponent(tag, attrs, children, key) {
    //objects.push(this);
    this.id = id++;
    this.tag = tag;
    this.children = children;
    this.fragment = true;
    if (key) {
        this.key = key;
    }
    //this.parent = null;
    this.dom = null;
    this.attrs = attrs;
    //this.destroyed = null;
    //this.destroyed = null;
}
classExtend(VComponent, proto, {fragment: true});


var nodesCache = new Array(1000000);
nodesCache.len = 0;

function NNode(tag, attrs, children, key, text) {
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
    //this.parent = null;
    //this.destroyed = null;
}
classExtend(NNode, proto, {
    destroy: function () {
        if (this.dom == null){
            debugger;
        }
        this.dom = null;
        this.children = null;
        this.attrs = null;
        //nodesCache[nodesCache.len++] = this;
        //this.destroyed = true;
        //this.parent = null;
    }
});
export function getNNode(tag, attrs, children, key, text) {
    if (nodesCache.len == 0) {
        return new NNode(tag, attrs, children, key, text);
    }
    var item = nodesCache[--nodesCache.len];
    item.tag = tag;
    item.attrs = attrs;
    item.children = children;
    item.key = key;
    //item.text = text;
    return item;
}


var textNodesCache = new Array(1000000);
textNodesCache.len = 0;

function VTextNode(text) {
    this.id = id++;
    this.dom = null;
    this.text = text;
    //this.parent = null;
    //this.destroyed = null;
}
classExtend(VTextNode, proto, {
    tag: '#',
    destroy: function () {
        if (this.dom == null){
            debugger;
        }
        this.dom = null;
        textNodesCache[textNodesCache.len++] = this;
        //this.destroyed = true;
        //this.parent = null;
    }
});

export function getTextNode(text) {
    if (textNodesCache.len == 0) {
        return new VTextNode(text);
    }
    var item = textNodesCache[--textNodesCache.len];
    item.text = text;
    return item;
}
