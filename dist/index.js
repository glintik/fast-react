/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var index_1 = __webpack_require__(1);
	var App = (function (_super) {
	    __extends(App, _super);
	    function App() {
	        _super.apply(this, arguments);
	        this.counter = 0;
	    }
	    App.prototype.click = function () {
	        this.counter++;
	        this.forceUpdate();
	    };
	    App.prototype.render = function () {
	        var _this = this;
	        return index_1.createElement('div', { title: this.counter }, 'Hello', index_1.createElement('button', { onClick: function () { return _this.click(); } }, 'SuperClick'), this.counter, this.counter % 2 ?
	            index_1.createElement(Wow)
	            : [1, 2, 3]);
	    };
	    return App;
	})(index_1.Component);
	var Wow = (function (_super) {
	    __extends(Wow, _super);
	    function Wow() {
	        _super.apply(this, arguments);
	        this.counter = 0;
	    }
	    Wow.prototype.click = function () {
	        this.counter++;
	        this.forceUpdate();
	    };
	    Wow.prototype.render = function () {
	        var _this = this;
	        return index_1.createElement('div', { id: this.counter }, index_1.createElement('button', { onClick: function () { return _this.click(); } }, 'Click'), 'Wow', [1, 2, 3], [4, 5, 6], this.counter);
	    };
	    return Wow;
	})(index_1.Component);
	index_1.render(index_1.createElement(App), document.body);
	//# sourceMappingURL=index.js.map

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var top_level_1 = __webpack_require__(2);
	exports.render = top_level_1.render;
	exports.createElement = top_level_1.createElement;
	exports.Component = top_level_1.Component;
	exports.findDOMNode = top_level_1.findDOMNode;
	window.FastReact = {
	    render: top_level_1.render, createElement: top_level_1.createElement, Component: top_level_1.Component, findDOMNode: top_level_1.findDOMNode, update: top_level_1.updater
	};
	//# sourceMappingURL=index.js.map

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var node_1 = __webpack_require__(3);
	var append_1 = __webpack_require__(4);
	var update_1 = __webpack_require__(8);
	var utils_1 = __webpack_require__(5);
	var component_1 = __webpack_require__(6);
	exports.Component = component_1.Component;
	exports.findDOMNode = component_1.findDOMNode;
	function render(node, dom) {
	    var root = new node_1.VTagNode(null, null, [node], null);
	    root.dom = dom;
	    utils_1.normChild(root, 0);
	    append_1.append(root, 0);
	    return node;
	}
	exports.render = render;
	function updater(old, node) {
	    var root = new node_1.VTagNode(null, null, [node], null);
	    root.dom = old.dom.parentNode;
	    utils_1.normChild(root, 0);
	    update_1.update(old, root, 0);
	    return root.children[0];
	}
	exports.updater = updater;
	function createElement(tag, attrs) {
	    if (attrs) {
	        var key = typeof attrs.key == 'undefined' ? undefined : attrs.key;
	    }
	    var len = arguments.length;
	    var children = null;
	    if (len > 2) {
	        children = Array(len - 2);
	        for (var i = 2; i < len; i++) {
	            children[i - 2] = arguments[i];
	        }
	    }
	    if (tag == '@') {
	        return new node_1.VFragment(children, key);
	    }
	    if (typeof tag == 'string') {
	        return new node_1.VTagNode(tag, attrs, children, key);
	    }
	    else if (typeof tag == 'function') {
	        return new node_1.VComponent(tag, attrs, children, key);
	    }
	}
	exports.createElement = createElement;
	//# sourceMappingURL=top-level.js.map

/***/ },
/* 3 */
/***/ function(module, exports) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var id = 1;
	var VNode = (function () {
	    function VNode() {
	    }
	    VNode.prototype.destroy = function () {
	        /*
	                if (this.destroyed) {
	                    throw "Node yet destroyed";
	                }
	                this.destroyed = true;
	        */
	    };
	    return VNode;
	})();
	exports.VNode = VNode;
	var VFragment = (function (_super) {
	    __extends(VFragment, _super);
	    function VFragment(children, key) {
	        if (false) {
	            _super.call(this);
	        }
	        this.id = id++;
	        this.dom = null;
	        this.lastNode = null;
	        this.firstNode = null;
	        this.children = children;
	        this.key = key;
	    }
	    return VFragment;
	})(VNode);
	exports.VFragment = VFragment;
	var VComponent = (function (_super) {
	    __extends(VComponent, _super);
	    function VComponent(ctor, attrs, children, key) {
	        if (false) {
	            _super.call(this, null, null);
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
	    return VComponent;
	})(VFragment);
	exports.VComponent = VComponent;
	var VTagNode = (function (_super) {
	    __extends(VTagNode, _super);
	    function VTagNode(tag, attrs, children, key) {
	        if (false) {
	            _super.call(this);
	        }
	        //this.id = id++;
	        this.dom = null;
	        this.tag = tag;
	        this.attrs = attrs;
	        this.attrsCode = '';
	        this.children = children;
	        this.key = key;
	    }
	    VTagNode.prototype.destroy = function () {
	        this.dom = null;
	        this.attrs = null;
	        this.children = null;
	    };
	    return VTagNode;
	})(VNode);
	exports.VTagNode = VTagNode;
	var textCache = new Array(100000);
	textCache.len = 0;
	function getVText(text) {
	    if (textCache.len > 0) {
	        var item = textCache[--textCache.len];
	        item.text = text;
	        return item;
	    }
	    return new VText(text);
	}
	exports.getVText = getVText;
	var VText = (function (_super) {
	    __extends(VText, _super);
	    function VText(text) {
	        if (false) {
	            _super.call(this);
	        }
	        //this.id = id++;
	        this.dom = null;
	        this.text = text;
	    }
	    VText.prototype.destroy = function () {
	        //this.dom = null;
	        textCache[textCache.len++] = this;
	    };
	    return VText;
	})(VNode);
	exports.VText = VText;
	//# sourceMappingURL=node.js.map

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var node_1 = __webpack_require__(3);
	var utils_1 = __webpack_require__(5);
	var component_1 = __webpack_require__(6);
	var attrs_1 = __webpack_require__(10);
	function append(parent, childPos, beforeChild) {
	    if (beforeChild == null && parent instanceof node_1.VFragment) {
	        beforeChild = parent.lastNode;
	    }
	    var parentDom = parent.dom;
	    var node = parent.children[childPos];
	    if (typeof node.key !== 'undefined') {
	        if (typeof parent.keyMap == 'undefined') {
	            parent.keyMap = {};
	        }
	        parent.keyMap[node.key] = childPos;
	    }
	    if (node instanceof node_1.VText) {
	        node.dom = document.createTextNode(node.text);
	        parentDom.insertBefore(node.dom, beforeChild);
	        return;
	    }
	    if (node instanceof node_1.VTagNode) {
	        node.dom = document.createElement(node.tag);
	        if (node.attrs) {
	            attrs_1.createAttrs(node);
	        }
	        parentDom.insertBefore(node.dom, beforeChild);
	    }
	    else if (node instanceof node_1.VFragment) {
	        node.dom = parentDom;
	        var txt = node instanceof node_1.VComponent ? node.ctor.name + ':' + node.id : '#';
	        node.firstNode = document.createComment(' ' + txt + ' ');
	        node.lastNode = document.createComment(' :' + txt + ' ');
	        node.firstNode.skip = true;
	        node.lastNode.skip = true;
	        parentDom.insertBefore(node.firstNode, beforeChild);
	        parentDom.insertBefore(node.lastNode, beforeChild);
	        if (node instanceof node_1.VComponent) {
	            component_1.createComponent(node);
	            return;
	        }
	    }
	    if (node.children) {
	        for (var i = 0; i < node.children.length; i++) {
	            utils_1.normChild(node, i);
	            append(node, i);
	        }
	    }
	}
	exports.append = append;
	//# sourceMappingURL=append.js.map

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var node_1 = __webpack_require__(3);
	function normChild(parent, childPos) {
	    var node = parent.children[childPos];
	    if (typeof node == 'object' && node && node instanceof node_1.VNode) {
	        return;
	    }
	    if (typeof node == 'string' || typeof node == 'number') {
	        parent.children[childPos] = node_1.getVText(node + '');
	        return;
	    }
	    if (node == null) {
	        parent.children[childPos] = node_1.getVText('');
	        return;
	    }
	    if (typeof node === 'object') {
	        if (node instanceof Array) {
	            parent.children[childPos] = new node_1.VFragment(node, null);
	        }
	        else {
	            parent.children[childPos] = node_1.getVText(JSON.stringify(node));
	        }
	        return;
	    }
	    if (typeof node === 'function') {
	        parent.children[childPos] = node_1.getVText('Function');
	        return;
	    }
	    parent.children[childPos] = node_1.getVText('');
	}
	exports.normChild = normChild;
	//# sourceMappingURL=utils.js.map

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var node_1 = __webpack_require__(3);
	var append_1 = __webpack_require__(4);
	var update_children_1 = __webpack_require__(7);
	var utils_1 = __webpack_require__(5);
	exports.globs = { component: null };
	var Component = (function () {
	    function Component(props) {
	        this.props = props;
	    }
	    Component.prototype.componentWillMount = function () {
	    };
	    Component.prototype.componentDidMount = function () {
	    };
	    Component.prototype.componentWillUpdate = function () {
	    };
	    Component.prototype.componentDidUpdate = function () {
	    };
	    //todo
	    Component.prototype.componentWillReceiveProps = function (props) {
	    };
	    Component.prototype.componentWillUnmount = function () {
	    };
	    Component.prototype.render = function () {
	        return null;
	    };
	    Component.prototype.forceUpdate = function () {
	        this.componentWillUpdate();
	        var children = [this.render()];
	        var temp = new node_1.VComponent(null, null, children, null);
	        temp.firstNode = this.node.firstNode;
	        temp.lastNode = this.node.lastNode;
	        temp.dom = this.node.dom;
	        var prevComponent = exports.globs.component;
	        exports.globs.component = this;
	        update_children_1.updateChildren(this.node, temp); // clear this.node.children
	        exports.globs.component = prevComponent;
	        this.node.children = temp.children;
	        this.componentDidUpdate();
	        //temp.destroy();
	    };
	    return Component;
	})();
	exports.Component = Component;
	function findDOMNode(node) {
	    return node.dom;
	}
	exports.findDOMNode = findDOMNode;
	function createComponent(node) {
	    var props = node.attrs || {};
	    props.children = node.children;
	    var component = new node.ctor(props);
	    component.node = node;
	    node.component = component;
	    component.componentWillMount();
	    node.children = [component.render()];
	    var prevComponent = exports.globs.component;
	    exports.globs.component = component;
	    if (node.children) {
	        for (var i = 0; i < node.children.length; i++) {
	            utils_1.normChild(node, i);
	            append_1.append(node, i);
	        }
	    }
	    exports.globs.component = prevComponent;
	    node.component.componentDidMount();
	}
	exports.createComponent = createComponent;
	function updateComponent(old, parent, childPos) {
	    var newNode = parent.children[childPos];
	    var props = newNode.attrs || {};
	    props.children = newNode.children;
	    old.component.componentWillReceiveProps(props);
	    old.component.props = props;
	    old.component.forceUpdate(); // affect node children
	    parent.children[childPos] = old;
	    newNode.destroy();
	    //no destroy old
	}
	exports.updateComponent = updateComponent;
	//# sourceMappingURL=component.js.map

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var node_1 = __webpack_require__(3);
	var append_1 = __webpack_require__(4);
	var update_1 = __webpack_require__(8);
	var remove_1 = __webpack_require__(9);
	var utils_1 = __webpack_require__(5);
	function updateChildren(old, node) {
	    var oldChildren = old.children;
	    var newChildren = node.children;
	    var inserts = new Array(100000);
	    inserts.len = 0;
	    if (newChildren) {
	        var fitCount = 0;
	        for (var i = 0; i < newChildren.length; i++) {
	            utils_1.normChild(node, i);
	            var fitPos = null;
	            var newChild = newChildren[i]; // only use before update
	            var oldChild = oldChildren && oldChildren[i];
	            if (typeof old.keyMap == 'object') {
	                if (typeof newChild.key != 'undefined') {
	                    fitPos = old.keyMap[newChild.key];
	                }
	                else {
	                    if (oldChild && typeof oldChild.key == 'undefined') {
	                        fitPos = i;
	                    }
	                }
	            }
	            else if (oldChild) {
	                fitPos = i;
	            }
	            if (fitPos != null) {
	                fitCount++;
	                update_1.update(oldChildren[fitPos], node, i);
	                if (fitPos !== i) {
	                    inserts[inserts.len++] = i;
	                }
	                oldChildren[fitPos] = null;
	            }
	            else {
	                inserts[inserts.len++] = i;
	            }
	        }
	    }
	    if (oldChildren && oldChildren.length !== fitCount) {
	        for (var i = 0; i < oldChildren.length; i++) {
	            var oldChild = oldChildren[i];
	            if (oldChild) {
	                remove_1.remove(oldChild, old, i);
	            }
	            oldChildren[i] = null;
	        }
	    }
	    for (var i = inserts.len - 1; i >= 0; i--) {
	        var pos = inserts[i];
	        if (i == inserts.len - 1) {
	            var beforeChild = node instanceof node_1.VFragment
	                ? node.lastNode
	                : null;
	        }
	        else {
	            beforeChild = newChildren[i + 1] instanceof node_1.VFragment
	                ? newChildren[i + 1].firstNode
	                : newChildren[i + 1].dom;
	        }
	        if (newChildren[pos].dom) {
	            move(newChildren[pos], node, beforeChild);
	        }
	        else {
	            append_1.append(node, pos, beforeChild);
	        }
	    }
	}
	exports.updateChildren = updateChildren;
	function move(node, parent, beforeChild) {
	    if (node instanceof node_1.VFragment) {
	        var prevDom;
	        var dom = node.lastNode;
	        var endNode = node.firstNode;
	        while (true) {
	            prevDom = dom.previousSibling;
	            if (dom.previousSibling !== beforeChild) {
	                parent.dom.insertBefore(dom, beforeChild);
	            }
	            beforeChild = dom;
	            if (dom == endNode) {
	                break;
	            }
	            dom = prevDom;
	        }
	    }
	    else {
	        parent.dom.insertBefore(node.dom, beforeChild);
	    }
	}
	//# sourceMappingURL=update-children.js.map

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var node_1 = __webpack_require__(3);
	var remove_1 = __webpack_require__(9);
	var append_1 = __webpack_require__(4);
	var update_children_1 = __webpack_require__(7);
	var attrs_1 = __webpack_require__(10);
	var component_1 = __webpack_require__(6);
	function update(old, parent, childPos) {
	    var node = parent.children[childPos];
	    if (old.constructor !== node.constructor) {
	        replaceNode(old, parent, childPos);
	        return;
	    }
	    if (node instanceof node_1.VText) {
	        node.dom = old.dom;
	        if (old.text !== node.text) {
	            node.dom.textContent = node.text;
	        }
	        old.destroy();
	        return;
	    }
	    if (typeof node.key !== 'undefined') {
	        if (typeof parent.keyMap == 'undefined') {
	            parent.keyMap = {};
	        }
	        parent.keyMap[node.key] = childPos;
	    }
	    if (node instanceof node_1.VTagNode) {
	        if (old.tag !== node.tag) {
	            replaceNode(old, parent, childPos);
	            return;
	        }
	        node.dom = old.dom;
	        attrs_1.updateAttrs(old, parent, childPos);
	    }
	    else if (node instanceof node_1.VFragment) {
	        if (node instanceof node_1.VComponent) {
	            if (old.ctor !== node.ctor) {
	                replaceNode(old, parent, childPos);
	                return;
	            }
	            component_1.updateComponent(old, parent, childPos);
	            return;
	        }
	        node.lastNode = old.lastNode;
	        node.firstNode = old.firstNode;
	        node.dom = old.dom;
	    }
	    update_children_1.updateChildren(old, node);
	    old.destroy();
	}
	exports.update = update;
	function replaceNode(old, parent, childPos) {
	    append_1.append(parent, childPos, old instanceof node_1.VFragment ? old.firstNode : old.dom);
	    remove_1.remove(old, parent);
	}
	exports.replaceNode = replaceNode;
	//# sourceMappingURL=update.js.map

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var node_1 = __webpack_require__(3);
	function remove(node, parent, childPos, skipRemove) {
	    if (node instanceof node_1.VComponent) {
	        node.component.componentWillUnmount();
	    }
	    if (node.children) {
	        var skip = skipRemove || !(node instanceof node_1.VFragment);
	        for (var i = 0; i < node.children.length; i++) {
	            remove(node.children[i], node, i, skip);
	        }
	    }
	    if (!skipRemove) {
	        if (node instanceof node_1.VFragment) {
	            parent.dom.removeChild(node.firstNode);
	            parent.dom.removeChild(node.lastNode);
	        }
	        else {
	            parent.dom.removeChild(node.dom);
	        }
	    }
	    node.destroy();
	    if (childPos != null) {
	        parent.children[childPos] = null;
	    }
	}
	exports.remove = remove;
	//# sourceMappingURL=remove.js.map

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var const_attrs_1 = __webpack_require__(11);
	var component_1 = __webpack_require__(6);
	function updateAttrs(old, parent, childPos) {
	    var node = parent.children[childPos];
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
	exports.updateAttrs = updateAttrs;
	function createAttrs(node, oldAttrs) {
	    var dom = node.dom;
	    var attr;
	    var prop;
	    var event;
	    node.attrsCode = '';
	    for (var attrName in node.attrs) {
	        node.attrsCode += attrName;
	        var attrVal = node.attrs[attrName];
	        if (attrName == 'key' || (oldAttrs && oldAttrs[attrName] === attrVal && attrName !== 'ref')) {
	            continue;
	        }
	        if (prop = const_attrs_1.props[attrName]) {
	            if (attrVal == null) {
	                dom[prop] = '';
	            }
	            else {
	                dom[prop] = attrVal;
	            }
	        }
	        else if (attr = const_attrs_1.attrs[attrName]) {
	            if (attrVal == null || attrVal === false) {
	                dom.removeAttribute(attr);
	            }
	            else if (typeof attrVal !== 'object') {
	                dom.setAttribute(attr, attrVal);
	            }
	        }
	        else if (event = const_attrs_1.events[attrName]) {
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
	        }
	        else if (attrName == 'ref') {
	            if (typeof attrVal == 'function') {
	                attrVal(node);
	            }
	            else if (component_1.globs.component) {
	                if (typeof component_1.globs.component.refs == 'undefined') {
	                    component_1.globs.component.refs = {};
	                }
	                component_1.globs.component.refs[attrVal] = node;
	            }
	        }
	    }
	}
	exports.createAttrs = createAttrs;
	function removeAttrs(old) {
	    var dom = old.dom;
	    var attr;
	    var prop;
	    var event;
	    for (var attrName in old.attrs) {
	        var attrVal = old.attrs[attrName];
	        if (prop = const_attrs_1.props[attrName]) {
	            dom[prop] = '';
	        }
	        else if (attr = const_attrs_1.attrs[attrName]) {
	            dom.removeAttribute(attr);
	        }
	        else if (attrName.substring(0, 4) == 'data') {
	            dom.removeAttribute(attrName);
	        }
	        else if (event = const_attrs_1.events[attrName]) {
	            dom['on' + event] = null;
	        }
	        else if (attrName.substring(0, 2) == 'on') {
	            event = attrName.substring(2).toLowerCase();
	            dom['on' + event] = null;
	        }
	        else if (attrName === 'style') {
	        }
	        else if (attrName == 'ref') {
	            if (typeof attrVal == 'function') {
	            }
	            else if (component_1.globs.component) {
	                if (typeof component_1.globs.component.refs == 'undefined') {
	                    component_1.globs.component.refs = {};
	                }
	                component_1.globs.component.refs[attrVal] = null;
	            }
	        }
	    }
	}
	//# sourceMappingURL=attrs.js.map

/***/ },
/* 11 */
/***/ function(module, exports) {

	exports.attrs = {
	    accept: 'accept',
	    acceptCharset: 'accept-charset',
	    accessKey: 'accessKey',
	    action: 'action',
	    allowFullScreen: 'allowFullScreen',
	    allowTransparency: 'allowTransparency',
	    alt: 'alt',
	    async: 'async',
	    autoComplete: 'autoComplete',
	    autoPlay: 'autoPlay',
	    capture: 'capture',
	    cellPadding: 'cellPadding',
	    cellSpacing: 'cellSpacing',
	    charSet: 'charSet',
	    challenge: 'challenge',
	    classID: 'classID',
	    cols: 'cols',
	    colSpan: 'colSpan',
	    content: 'content',
	    contentEditable: 'contentEditable',
	    contextMenu: 'contextMenu',
	    coords: 'coords',
	    crossOrigin: 'crossOrigin',
	    data: 'data',
	    dateTime: 'dateTime',
	    defer: 'defer',
	    dir: 'dir',
	    disabled: 'disabled',
	    download: 'download',
	    draggable: 'draggable',
	    encType: 'encType',
	    form: 'form',
	    formAction: 'formAction',
	    formEncType: 'formEncType',
	    formMethod: 'formMethod',
	    formNoValidate: 'formNoValidate',
	    formTarget: 'formTarget',
	    frameBorder: 'frameBorder',
	    headers: 'headers',
	    height: 'height',
	    hidden: 'hidden',
	    high: 'high',
	    href: 'href',
	    hrefLang: 'hrefLang',
	    htmlFor: 'for',
	    httpEquiv: 'http-equiv',
	    icon: 'icon',
	    inputMode: 'inputMode',
	    is: 'is',
	    keyParams: 'keyParams',
	    keyType: 'keyType',
	    label: 'label',
	    lang: 'lang',
	    list: 'list',
	    low: 'low',
	    manifest: 'manifest',
	    marginHeight: 'marginHeight',
	    marginWidth: 'marginWidth',
	    max: 'max',
	    maxLength: 'maxLength',
	    media: 'media',
	    mediaGroup: 'mediaGroup',
	    method: 'method',
	    min: 'min',
	    minLength: 'minLength',
	    name: 'name',
	    noValidate: 'noValidate',
	    open: 'open',
	    optimum: 'optimum',
	    pattern: 'pattern',
	    placeholder: 'placeholder',
	    poster: 'poster',
	    preload: 'preload',
	    radioGroup: 'radioGroup',
	    rel: 'rel',
	    required: 'required',
	    role: 'role',
	    rows: 'rows',
	    rowSpan: 'rowSpan',
	    sandbox: 'sandbox',
	    scope: 'scope',
	    scoped: 'scoped',
	    scrolling: 'scrolling',
	    seamless: 'seamless',
	    shape: 'shape',
	    size: 'size',
	    sizes: 'sizes',
	    span: 'span',
	    spellCheck: 'spellCheck',
	    src: 'src',
	    srcSet: 'srcSet',
	    start: 'start',
	    step: 'step',
	    style: 'style',
	    tabIndex: 'tabIndex',
	    target: 'target',
	    title: 'title',
	    type: 'type',
	    useMap: 'useMap',
	    width: 'width',
	    wmode: 'wmode',
	    autoCapitalize: 'autoCapitalize',
	    autoCorrect: 'autoCorrect',
	    itemProp: 'itemProp',
	    itemScope: 'itemScope',
	    itemType: 'itemType',
	    itemID: 'itemID',
	    itemRef: 'itemRef',
	    property: 'property',
	    security: 'security',
	    unselectable: 'unselectable',
	};
	exports.props = {
	    checked: 'checked',
	    className: 'className',
	    controls: 'controls',
	    id: 'id',
	    loop: 'loop',
	    multiple: 'multiple',
	    muted: 'muted',
	    readOnly: 'readOnly',
	    selected: 'selected',
	    srcDoc: 'srcdoc',
	    value: 'value'
	};
	exports.isUnitlessNumber = {
	    boxFlex: true,
	    boxFlexGroup: true,
	    columnCount: true,
	    flex: true,
	    flexGrow: true,
	    flexPositive: true,
	    flexShrink: true,
	    flexNegative: true,
	    fontWeight: true,
	    lineClamp: true,
	    lineHeight: true,
	    opacity: true,
	    order: true,
	    orphans: true,
	    widows: true,
	    zIndex: true,
	    zoom: true,
	    // SVG-related properties
	    fillOpacity: true,
	    strokeDashoffset: true,
	    strokeOpacity: true,
	    strokeWidth: true
	};
	exports.events = {
	    onRender: "render",
	    onClick: (('ontouchend' in window)) ? 'touchend' : 'click',
	    onDblClick: 'dblclick',
	    onMouseDown: 'mousedown',
	    onMouseUp: 'mouseup',
	    onMouseMove: 'mousemove',
	    onMouseEnter: 'mouseenter',
	    onMouseLeave: 'mouseleave',
	    onMouseOver: 'mouseover',
	    onMouseOut: 'mouseout',
	    onTouchStart: 'touchstart',
	    onTouchEnd: 'touchend',
	    onTouchMove: 'touchmove',
	    onTouchCancel: 'touchcancel',
	    onTouchLeave: 'touchleave',
	    onContextMenu: 'contextmenu',
	    onInput: 'input',
	    onFocus: 'focus',
	    onChange: 'change',
	    onKeyDown: 'keydown',
	    onKeyPress: 'keypress',
	    onKeyUp: 'keyup'
	};
	//# sourceMappingURL=const-attrs.js.map

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYzBjYjUyNjUxMTRmMzQxZWRhODEiLCJ3ZWJwYWNrOi8vLy4vaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vdHMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vdHMvdG9wLWxldmVsLnRzIiwid2VicGFjazovLy8uL3RzL25vZGUudHMiLCJ3ZWJwYWNrOi8vLy4vdHMvYXBwZW5kLnRzIiwid2VicGFjazovLy8uL3RzL3V0aWxzLnRzIiwid2VicGFjazovLy8uL3RzL2NvbXBvbmVudC50cyIsIndlYnBhY2s6Ly8vLi90cy91cGRhdGUtY2hpbGRyZW4udHMiLCJ3ZWJwYWNrOi8vLy4vdHMvdXBkYXRlLnRzIiwid2VicGFjazovLy8uL3RzL3JlbW92ZS50cyIsIndlYnBhY2s6Ly8vLi90cy9hdHRycy50cyIsIndlYnBhY2s6Ly8vLi90cy9jb25zdC1hdHRycy50cyJdLCJuYW1lcyI6WyJBcHAiLCJBcHAuY29uc3RydWN0b3IiLCJBcHAuY2xpY2siLCJBcHAucmVuZGVyIiwiV293IiwiV293LmNvbnN0cnVjdG9yIiwiV293LmNsaWNrIiwiV293LnJlbmRlciIsInJlbmRlciIsInVwZGF0ZXIiLCJjcmVhdGVFbGVtZW50IiwiVk5vZGUiLCJWTm9kZS5jb25zdHJ1Y3RvciIsIlZOb2RlLmRlc3Ryb3kiLCJWRnJhZ21lbnQiLCJWRnJhZ21lbnQuY29uc3RydWN0b3IiLCJWQ29tcG9uZW50IiwiVkNvbXBvbmVudC5jb25zdHJ1Y3RvciIsIlZUYWdOb2RlIiwiVlRhZ05vZGUuY29uc3RydWN0b3IiLCJWVGFnTm9kZS5kZXN0cm95IiwiZ2V0VlRleHQiLCJWVGV4dCIsIlZUZXh0LmNvbnN0cnVjdG9yIiwiVlRleHQuZGVzdHJveSIsImFwcGVuZCIsIm5vcm1DaGlsZCIsIkNvbXBvbmVudCIsIkNvbXBvbmVudC5jb25zdHJ1Y3RvciIsIkNvbXBvbmVudC5jb21wb25lbnRXaWxsTW91bnQiLCJDb21wb25lbnQuY29tcG9uZW50RGlkTW91bnQiLCJDb21wb25lbnQuY29tcG9uZW50V2lsbFVwZGF0ZSIsIkNvbXBvbmVudC5jb21wb25lbnREaWRVcGRhdGUiLCJDb21wb25lbnQuY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyIsIkNvbXBvbmVudC5jb21wb25lbnRXaWxsVW5tb3VudCIsIkNvbXBvbmVudC5yZW5kZXIiLCJDb21wb25lbnQuZm9yY2VVcGRhdGUiLCJmaW5kRE9NTm9kZSIsImNyZWF0ZUNvbXBvbmVudCIsInVwZGF0ZUNvbXBvbmVudCIsInVwZGF0ZUNoaWxkcmVuIiwibW92ZSIsInVwZGF0ZSIsInJlcGxhY2VOb2RlIiwicmVtb3ZlIiwidXBkYXRlQXR0cnMiLCJjcmVhdGVBdHRycyIsInJlbW92ZUF0dHJzIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7OztBQ3RDQSxtQ0FBK0MsQ0FBWSxDQUFDO0FBRTVEO0tBQWtCQSx1QkFBU0E7S0FBM0JBO1NBQWtCQyw4QkFBU0E7U0FDdkJBLFlBQU9BLEdBQUdBLENBQUNBLENBQUNBO0tBZ0JoQkEsQ0FBQ0E7S0FkR0QsbUJBQUtBLEdBQUxBO1NBQ0lFLElBQUlBLENBQUNBLE9BQU9BLEVBQUVBLENBQUNBO1NBQ2ZBLElBQUlBLENBQUNBLFdBQVdBLEVBQUVBLENBQUNBO0tBQ3ZCQSxDQUFDQTtLQUVERixvQkFBTUEsR0FBTkE7U0FBQUcsaUJBUUNBO1NBUEdBLE1BQU1BLENBQUNBLHFCQUFhQSxDQUFDQSxLQUFLQSxFQUFFQSxFQUFDQSxLQUFLQSxFQUFFQSxJQUFJQSxDQUFDQSxPQUFPQSxFQUFDQSxFQUFFQSxPQUFPQSxFQUN0REEscUJBQWFBLENBQUNBLFFBQVFBLEVBQUVBLEVBQUNBLE9B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R0FBR0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsVUFBVUEsQ0FBQ0E7S0FDOUJBLGlCQUFTQSxDQUFDQSxJQUFJQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQTtLQUNuQkEsZUFBTUEsQ0FBQ0EsR0FBR0EsRUFBRUEsSUFBSUEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7S0FDckJBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO0FBQzVCQSxFQUFDQTtBQU5lLGdCQUFPLFVBTXRCO0FBR0Qsd0JBQThCLEdBQXVCLEVBQUUsS0FBVTtLQUM3REMsRUFBRUEsQ0FBQ0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7U0FDUkEsSUFBSUEsR0FBR0EsR0FBR0EsT0FBT0EsS0FBS0EsQ0FBQ0EsR0FBR0EsSUFBSUEsV0FBV0EsR0FBR0EsU0FBU0EsR0FBR0EsS0FBS0EsQ0FBQ0EsR0FBR0EsQ0FBQ0E7S0FFdEVBLENBQUNBO0tBQ0RBLElBQUlBLEdBQUdBLEdBQUdBLFNBQVNBLENBQUNBLE1BQU1BLENBQUNBO0tBQzNCQSxJQUFJQSxRQUFRQSxHQUFTQSxJQUFJQSxDQUFDQTtLQUMxQkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7U0FDVkEsUUFBUUEsR0FBR0EsS0FBS0EsQ0FBQ0EsR0FBR0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7U0FDMUJBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLEdBQUdBLEVBQUVBLENBQUNBLEVBQUVBLEVBQUVBLENBQUNBO2FBQzNCQSxRQUFRQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxTQUFTQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtTQUNuQ0EsQ0FBQ0E7S0FDTEEsQ0FBQ0E7S0FDREEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsR0FBR0EsQ0FB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LEVBQUVBLENBQUNBLENBQUNBLE9BQU9BLElBQUlBLENBQUNBLEdBQUdBLEtBQUtBLFdBQVdBLENBQUNBLENBQUNBLENBQUNBO1NBQ2xDQSxFQUFFQSxDQUFDQSxDQUFDQSxPQUFPQSxNQUFNQSxDQUFDQSxNQUFNQSxJQUFJQSxXQUFXQSxDQUFDQSxDQUFDQSxDQUFDQTthQUN0Q0EsTUFBTUEsQ0FBQ0EsTUFBTUEsR0FBR0EsRUFBRUE7U0FDdEJBLENBQUNBO1NBQ0RBLE1BQU1BLENBQUNBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLFFBQVFBLENBQUNBO0tBQ3ZDQSxDQUFDQTtLQUVEQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxZQUFZQSxZQUFLQSxDQUFDQSxDQUFDQSxDQUFDQTtTQUN4QkEsSUFBSUEsQ0FBQ0EsR0FBR0EsR0FBR0EsUUFBUUEsQ0FBQ0EsY0FBY0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7U0FDOUNBLFNBQVNBLENBQUNBLFlBQVlBLENBQUNBLElBQUlBLENBQUNBLEdBQUdBLEVBQUVBLFdBQVdBLENBQUNBLENBQUNBO1NBQzlDQSxNQUFNQSxDQUFDQTtLQUNYQSxDQUFDQTtLQUVEQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxZQUFZQSxlQUFRQSxDQUFDQSxDQUFDQSxDQUFDQTtTQUMzQkEsSUFBSUEsQ0FBQ0EsR0FBR0EsR0FBR0EsUUFBUUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7U0FDNUNBLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBO2FBQ2JBLG1CQUFXQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtTQUN0QkEsQ0FBQ0E7U0FDREEsU0FBU0EsQ0FBQ0EsWUFBWUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsRUFBRUEsV0FBV0EsQ0FBQ0EsQ0FBQ0E7S0FDbERBLENBQUNBO0tBQ0RBLElBQUlBLENBQUNBLEVBQUVB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QSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTthQUN6QkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsT0FBT0EsSUFBSUEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7aUJBQ2xCQSxHQUFHQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxFQUFFQSxDQUFDQTthQUNuQkEsQ0FBQ0E7YUFDREEsSUFBSUEsQ0FBQ0EsQ0FBQ0E7aUJBQ0ZBLEdBQUdBLENBQUNBLElBQUlBLENBQUNBLEdBQUdBLE9BQU9BLENBQUNBO2FBQ3hCQSxDQUFDQTtTQUNMQSxDQUFDQTtTQUNEQSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxHQUFHQSxtQkFBS0EsQ0FBQ0EsUUFBUUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7YUFDOUJBLEVBQUVBLENBQUNBLENBQUNBLE9BQU9BLElBQUlBLElBQUlBLElBQUlBLE9BQU9BLEtBQUtBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBO2lCQUN2Q0EsR0FBR0EsQ0FBQ0EsZUFBZUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7YUFDOUJBLENBQUNBO2FBQ0RBLElBQUlBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLE9BQU9BLE9BQU9BLEtBQUtBLFFBQVFBLENBQUNBLENBQUNBLENBQUNBO2lCQUNuQ0EsR0FBR0EsQ0FBQ0EsWUFBWUEsQ0FBQ0EsSUFBSUEsRUFBRUEsT0FBT0EsQ0FBQ0EsQ0FBQ0E7YUFDcENBLENBQUNBO1NBQ0xBLENBQUNBO1NBQ0RBLElBQUlBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLEtBQUtBLEdBQUdBLG9CQUFNQSxDQUFDQSxRQUFRQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTthQUNoQ0EsR0FBR0EsQ0FBQ0EsSUFBSUEsR0FBR0EsS0FBS0EsQ0FBQ0EsR0FBR0EsT0FBT0EsQ0FBQ0E7U0FDaENBLENBQUNBO1NBQ0RBLElBQUlBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLFFBQVFBLENBQUNBLENBQUNBLENBQUNBLEtBQUtBLEdBQUdBLElBQUlBLFFBQVFBLENBQUNBLENBQUNBLENBQUNBLEtBQUtBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBO2FBQ2xEQSxLQUFLQSxHQUFHQSxRQUFRQSxDQUFDQSxTQUFTQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxXQUFXQSxFQUFFQSxDQUFDQTthQUM1Q0EsR0FBR0EsQ0FBQ0EsSUFBSUEsR0FBR0EsS0FBS0EsQ0FBQ0EsR0FBR0EsT0FBT0EsQ0FBQ0E7U0FDaENBLENBQUNBO1NBQ0RBLElBQUlBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLFFBQVFBLENBQUNBLENBQUNBLENBQUNBLEtBQUtBLEdBQUdBLElBQUlBLFFBQVFBLENBQUNBLENBQUNBLENBQUNBLEtBQUtBLEdBQUdBLElBQUlBLFFBQVFBLENBQUNBLENBQUNBLENBQUNBLEtBQUtBLEdBQUdBLElBQUlBLFFBQVFBLENBQUNBLENBQUNBLENBQUNBLEtBQUtBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBO2FBRWhHQSxFQUFFQSxDQUFDQSxDQUFDQSxPQUFPQSxJQUFJQSxJQUFJQSxJQUFJQSxPQUFPQSxLQUFLQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQTtpQkFDdkNBLEdBQUdBLENBQUNBLGVBQWVBLENBQUNBLFFBQVFBLENBQUNBLENBQUNBO2FBQ2xDQSxDQUFDQTthQUNEQSxJQUFJQSxDQUFDQSxDQUFDQTtpQkFDRkEsR0FBR0EsQ0FBQ0EsWUFBWUEsQ0FBQ0EsUUFBUUEsRUFBRUEsT0FBT0EsQ0FBQ0EsQ0FBQ0E7YUFDeENBLENBQUNBO1NBQ0xBLENBQUNBO1NBQ0RBLElBQUlBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLFFBQVFBLEtBQUtBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBO1NBRWhDQSxDQUFDQTtTQUNEQSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxRQUFRQSxJQUFJQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQTthQUN6QkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsT0FBT0EsT0FBT0EsSUFBSUEsVUFBVUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7aUJBQy9CQSxPQUFPQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTthQUNsQkEsQ0FBQ0E7YUFDREEsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsaUJBQUtBLENBQUNBLFNBQVNBLENBQUNBLENBQUNBLENBQUNBO2lCQUN2QkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsT0FBT0EsaUJBQUtBLENBQUNBLFNBQVNBLENBQUNBLElBQUlBLElBQUlBLFdBQVdBLENBQUNBLENBQUNBLENBQUNBO3FCQUM3Q0EsaUJBQUtBLENBQUNBLFNBQVNBLENBQUNBLElBQUlBLEdBQUdBLEVBQUVBLENBQUNBO2lCQUM5QkEsQ0FBQ0E7aUJBQ0RBLGlCQUFLQSxDQUFDQSxTQUFTQSxDQUFDQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQTthQUN6Q0EsQ0FBQ0E7U0FDTEEsQ0FBQ0E7S0FDTEEsQ0FBQ0E7QUFDTEEsRUFBQ0E7QUEzRGUsb0JBQVcsY0EyRDFCO0FBRUQsc0JBQXFCLEdBQVk7S0FDN0JDLElBQUlBLEdBQUdBLEdBQU9BLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBO0tBRXRCQSxJQUFJQSxJQUFXQSxDQUFDQTtLQUNoQkEsSUFBSUEsSUFBV0EsQ0FBQ0E7S0FDaEJBLElBQUlBLEtBQVlBLENBQUNBO0tBRWpCQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxRQUFRQSxJQUFJQSxHQUFHQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQTtTQUM3QkEsSUFBSUEsT0FBT0EsR0FBR0EsR0FBR0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsUUFBUUEsQ0FBQ0EsQ0FBQ0E7U0FDbENBLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLEdBQUdBLG1CQUFLQSxDQUFDQSxRQUFRQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTthQUN6QkEsR0FBR0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsRUFBRUEsQ0FBQ0E7U0FDbkJBLENBQUNBO1NBQ0RBLElBQUlBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLEdBQUdBLG1CQUFLQSxDQUFDQSxRQUFRQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTthQUM5QkEsR0FBR0EsQ0FBQ0EsZUFBZUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7U0FDOUJBLENBQUNBO1NBQ0RBLElBQUlBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLFFBQVFBLENBQUNBLFNBQVNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBO2FBQzFDQSxHQUFHQSxDQUFDQSxlQUFlQSxDQUFDQSxRQUFRQSxDQUFDQSxDQUFDQTtTQUNsQ0EsQ0FBQ0E7U0FDREEsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsS0FBS0EsR0FBR0Esb0JBQU1BLENBQUNBLFFBQVFBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO2FBQ2hDQSxHQUFHQSxDQUFDQSxJQUFJQSxHQUFHQSxLQUFLQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQTtTQUM3QkEsQ0FBQ0E7U0FDREEsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsUUFBUUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7YUFDeENBLEtBQUtBLEdBQUdBLFFBQVFBLENBQUNBLFNBQVNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLFdBQVdBLEVBQUVBLENBQUNBO2FBQzVDQSxHQUFHQSxDQUFDQSxJQUFJQSxHQUFHQSxLQUFLQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQTtTQUM3QkEsQ0FBQ0E7U0FDREEsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsUUFBUUEsS0FBS0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7U0FFaENBLENBQUNBO1NBQ0RBLElBQUlBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLFFBQVFBLElBQUlBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBO2FBQ3pCQSxFQUFFQSxDQUFD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QU87S0FDMUQsVUFBVSxFQUFFLFVBQVU7S0FFdEIsV0FBVyxFQUFFLFdBQVc7S0FDeEIsU0FBUyxFQUFFLFNBQVM7S0FDcEIsV0FBVyxFQUFFLFdBQVc7S0FDeEIsWUFBWSxFQUFFLFlBQVk7S0FDMUIsWUFBWSxFQUFFLFlBQVk7S0FDMUIsV0FBVyxFQUFFLFdBQVc7S0FDeEIsVUFBVSxFQUFFLFVBQVU7S0FFdEIsWUFBWSxFQUFFLFlBQVk7S0FDMUIsVUFBVSxFQUFFLFVBQVU7S0FDdEIsV0FBVyxFQUFFLFdBQVc7S0FDeEIsYUFBYSxFQUFFLGFBQWE7S0FDNUIsWUFBWSxFQUFFLFlBQVk7S0FFMUIsYUFBYSxFQUFFLGFBQWE7S0FFNUIsT0FBTyxFQUFFLE9BQU87S0FDaEIsT0FBTyxFQUFFLE9BQU87S0FDaEIsUUFBUSxFQUFFLFFBQVE7S0FFbEIsU0FBUyxFQUFFLFNBQVM7S0FDcEIsVUFBVSxFQUFFLFVBQVU7S0FDdEIsT0FBTyxFQUFFLE9BQU87RUFDbkIsQ0FBQyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgYzBjYjUyNjUxMTRmMzQxZWRhODFcbiAqKi8iLCJpbXBvcnQge3JlbmRlciwgY3JlYXRlRWxlbWVudCwgQ29tcG9uZW50fSBmcm9tICcuL3RzL2luZGV4JztcblxuY2xhc3MgQXBwIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICBjb3VudGVyID0gMDtcblxuICAgIGNsaWNrKCkge1xuICAgICAgICB0aGlzLmNvdW50ZXIrKztcbiAgICAgICAgdGhpcy5mb3JjZVVwZGF0ZSgpO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHt0aXRsZTogdGhpcy5jb3VudGVyfSwgJ0hlbGxvJyxcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicsIHtvbkNsaWNrOiAoKT0+dGhpcy5jbGljaygpfSwgJ1N1cGVyQ2xpY2snKSxcbiAgICAgICAgICAgIHRoaXMuY291bnRlcixcbiAgICAgICAgICAgIHRoaXMuY291bnRlciAlIDIgP1xuICAgICAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoV293KVxuICAgICAgICAgICAgICAgIDogWzEsMiwzXVxuICAgICAgICApO1xuICAgIH1cbn1cblxuY2xhc3MgV293IGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICBjb3VudGVyID0gMDtcblxuICAgIGNsaWNrKCkge1xuICAgICAgICB0aGlzLmNvdW50ZXIrKztcbiAgICAgICAgdGhpcy5mb3JjZVVwZGF0ZSgpO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtpZDogdGhpcy5jb3VudGVyfSxcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicsIHtvbkNsaWNrOiAoKT0+dGhpcy5jbGljaygpfSwgJ0NsaWNrJyksXG4gICAgICAgICAgICAnV293JywgWzEsIDIsIDNdLCBbNCwgNSwgNl0sIHRoaXMuY291bnRlcik7XG4gICAgfVxufVxuXG5yZW5kZXIoY3JlYXRlRWxlbWVudChBcHApLCBkb2N1bWVudC5ib2R5KTtcblxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9pbmRleC50c1xuICoqLyIsImltcG9ydCB7cmVuZGVyLCBjcmVhdGVFbGVtZW50LCBDb21wb25lbnQsIGZpbmRET01Ob2RlLCB1cGRhdGVyfSBmcm9tICcuL3RvcC1sZXZlbCc7XG5leHBvcnQge3JlbmRlciwgY3JlYXRlRWxlbWVudCwgQ29tcG9uZW50LCBmaW5kRE9NTm9kZX07XG4oPGFueT53aW5kb3cpLkZhc3RSZWFjdCA9IHtcbiAgICByZW5kZXIsIGNyZWF0ZUVsZW1lbnQsIENvbXBvbmVudCwgZmluZERPTU5vZGUsIHVwZGF0ZTogdXBkYXRlclxufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3RzL2luZGV4LnRzXG4gKiovIiwiaW1wb3J0IHtWVGV4dCwgVlRhZ05vZGUsIFZOb2RlLCBWQ29tcG9uZW50LCBWRnJhZ21lbnR9IGZyb20gJy4vbm9kZSc7XG5pbXBvcnQge0lDb21wb25lbnR9IGZyb20gJy4vY29tcG9uZW50JztcbmltcG9ydCB7YXBwZW5kfSBmcm9tICcuL2FwcGVuZCc7XG5pbXBvcnQge3VwZGF0ZX0gZnJvbSAnLi91cGRhdGUnO1xuaW1wb3J0IHtub3JtQ2hpbGR9IGZyb20gJy4vdXRpbHMnO1xuXG5leHBvcnQge0NvbXBvbmVudCwgZmluZERPTU5vZGV9IGZyb20gJy4vY29tcG9uZW50JztcblxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlcihub2RlOlZOb2RlLCBkb206Tm9kZSkge1xuICAgIHZhciByb290ID0gbmV3IFZUYWdOb2RlKG51bGwsIG51bGwsIFtub2RlXSwgbnVsbCk7XG4gICAgcm9vdC5kb20gPSBkb207XG4gICAgbm9ybUNoaWxkKHJvb3QsIDApO1xuICAgIGFwcGVuZChyb290LCAwKTtcbiAgICByZXR1cm4gbm9kZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZXIob2xkOlZOb2RlLCBub2RlOlZOb2RlKSB7XG4gICAgdmFyIHJvb3QgPSBuZXcgVlRhZ05vZGUobnVsbCwgbnVsbCwgW25vZGVdLCBudWxsKTtcbiAgICByb290LmRvbSA9IG9sZC5kb20ucGFyZW50Tm9kZTtcbiAgICBub3JtQ2hpbGQocm9vdCwgMCk7XG4gICAgdXBkYXRlKG9sZCwgcm9vdCwgMCk7XG4gICAgcmV0dXJuIHJvb3QuY2hpbGRyZW5bMF07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVFbGVtZW50KHRhZzpzdHJpbmcgfCBJQ29tcG9uZW50LCBhdHRycz86YW55LCAuLi5jaGlsZHJlbjphbnlbXSk6Vk5vZGU7XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRWxlbWVudCh0YWc6c3RyaW5nIHwgSUNvbXBvbmVudCwgYXR0cnM/OmFueSk6Vk5vZGUge1xuICAgIGlmIChhdHRycykge1xuICAgICAgICB2YXIga2V5ID0gdHlwZW9mIGF0dHJzLmtleSA9PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IGF0dHJzLmtleTtcbiAgICAgICAgLy92YXIgcmVmID0gdHlwZW9mIGF0dHJzLnJlZiA9PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IGF0dHJzLnJlZjtcbiAgICB9XG4gICAgdmFyIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgdmFyIGNoaWxkcmVuOmFueVtdID0gbnVsbDtcbiAgICBpZiAobGVuID4gMikge1xuICAgICAgICBjaGlsZHJlbiA9IEFycmF5KGxlbiAtIDIpO1xuICAgICAgICBmb3IgKHZhciBpID0gMjsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICBjaGlsZHJlbltpIC0gMl0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRhZyA9PSAnQCcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBWRnJhZ21lbnQoY2hpbGRyZW4sIGtleSk7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgdGFnID09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybiBuZXcgVlRhZ05vZGUoPHN0cmluZz50YWcsIGF0dHJzLCBjaGlsZHJlbiwga2V5KTtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIHRhZyA9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHJldHVybiBuZXcgVkNvbXBvbmVudCg8SUNvbXBvbmVudD50YWcsIGF0dHJzLCBjaGlsZHJlbiwga2V5KTtcbiAgICB9XG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90cy90b3AtbGV2ZWwudHNcbiAqKi8iLCJpbXBvcnQge0lDb21wb25lbnQsIENvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnQnO1xuXG52YXIgaWQgPSAxO1xuXG5leHBvcnQgY2xhc3MgVk5vZGUge1xuICAgIGlkOm51bWJlcjtcbiAgICBjaGlsZHJlbjpWTm9kZVtdO1xuICAgIGtleU1hcDp7W2luZGV4OiBzdHJpbmddOm51bWJlcn07XG4gICAga2V5OnN0cmluZztcbiAgICBkZXN0cm95ZWQ6Ym9vbGVhbjtcbiAgICBkb206Tm9kZTtcbiAgICByZWY6c3RyaW5nO1xuXG4gICAgZGVzdHJveSgpIHtcbiAgICAgICAgLypcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kZXN0cm95ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgXCJOb2RlIHlldCBkZXN0cm95ZWRcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5kZXN0cm95ZWQgPSB0cnVlO1xuICAgICAgICAqL1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFZGcmFnbWVudCBleHRlbmRzIFZOb2RlIHtcbiAgICBsYXN0Tm9kZTpOb2RlO1xuICAgIGZpcnN0Tm9kZTpOb2RlO1xuXG4gICAgY29uc3RydWN0b3IoY2hpbGRyZW46Vk5vZGVbXSwga2V5OnN0cmluZykge1xuICAgICAgICBpZiAoZmFsc2UpIHtcbiAgICAgICAgICAgIHN1cGVyKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pZCA9IGlkKys7XG4gICAgICAgIHRoaXMuZG9tID0gbnVsbDtcbiAgICAgICAgdGhpcy5sYXN0Tm9kZSA9IG51bGw7XG4gICAgICAgIHRoaXMuZmlyc3ROb2RlID0gbnVsbDtcbiAgICAgICAgdGhpcy5jaGlsZHJlbiA9IGNoaWxkcmVuO1xuICAgICAgICB0aGlzLmtleSA9IGtleTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBWQ29tcG9uZW50IGV4dGVuZHMgVkZyYWdtZW50IHtcbiAgICBhdHRyczphbnk7XG4gICAgLy90b2RvXG4gICAgY29tcG9uZW50OkNvbXBvbmVudDtcbiAgICBjdG9yOklDb21wb25lbnQ7XG5cbiAgICBjb25zdHJ1Y3RvcihjdG9yOklDb21wb25lbnQsIGF0dHJzOmFueSwgY2hpbGRyZW46Vk5vZGVbXSwga2V5OnN0cmluZykge1xuICAgICAgICBpZiAoZmFsc2UpIHtcbiAgICAgICAgICAgIHN1cGVyKG51bGwsIG51bGwpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaWQgPSBpZCsrO1xuICAgICAgICB0aGlzLmRvbSA9IG51bGw7XG4gICAgICAgIHRoaXMubGFzdE5vZGUgPSBudWxsO1xuICAgICAgICB0aGlzLmZpcnN0Tm9kZSA9IG51bGw7XG4gICAgICAgIHRoaXMuY3RvciA9IGN0b3I7XG4gICAgICAgIHRoaXMuYXR0cnMgPSBhdHRycztcbiAgICAgICAgdGhpcy5jaGlsZHJlbiA9IGNoaWxkcmVuO1xuICAgICAgICB0aGlzLmtleSA9IGtleTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBWVGFnTm9kZSBleHRlbmRzIFZOb2RlIHtcbiAgICBhdHRyczphbnk7XG4gICAgYXR0cnNDb2RlOnN0cmluZztcbiAgICB0YWc6c3RyaW5nO1xuXG4gICAgY29uc3RydWN0b3IodGFnOnN0cmluZywgYXR0cnM6YW55LCBjaGlsZHJlbjpWTm9kZVtdLCBrZXk6c3RyaW5nKSB7XG4gICAgICAgIGlmIChmYWxzZSkge1xuICAgICAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgfVxuICAgICAgICAvL3RoaXMuaWQgPSBpZCsrO1xuICAgICAgICB0aGlzLmRvbSA9IG51bGw7XG4gICAgICAgIHRoaXMudGFnID0gdGFnO1xuICAgICAgICB0aGlzLmF0dHJzID0gYXR0cnM7XG4gICAgICAgIHRoaXMuYXR0cnNDb2RlID0gJyc7XG4gICAgICAgIHRoaXMuY2hpbGRyZW4gPSBjaGlsZHJlbjtcbiAgICAgICAgdGhpcy5rZXkgPSBrZXk7XG4gICAgfVxuXG4gICAgZGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5kb20gPSBudWxsO1xuICAgICAgICB0aGlzLmF0dHJzID0gbnVsbDtcbiAgICAgICAgdGhpcy5jaGlsZHJlbiA9IG51bGw7XG4gICAgfVxufVxuXG52YXIgdGV4dENhY2hlID0gPGFueT5uZXcgQXJyYXkoMTAwMDAwKTtcbnRleHRDYWNoZS5sZW4gPSAwO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0VlRleHQodGV4dDpzdHJpbmcpIHtcbiAgICBpZiAodGV4dENhY2hlLmxlbiA+IDApIHtcbiAgICAgICAgdmFyIGl0ZW0gPSB0ZXh0Q2FjaGVbLS10ZXh0Q2FjaGUubGVuXTtcbiAgICAgICAgaXRlbS50ZXh0ID0gdGV4dDtcbiAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgfVxuICAgIHJldHVybiBuZXcgVlRleHQodGV4dCk7XG59XG5cbmV4cG9ydCBjbGFzcyBWVGV4dCBleHRlbmRzIFZOb2RlIHtcbiAgICB0ZXh0OnN0cmluZztcblxuICAgIGNvbnN0cnVjdG9yKHRleHQ6c3RyaW5nKSB7XG4gICAgICAgIGlmIChmYWxzZSkge1xuICAgICAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgfVxuICAgICAgICAvL3RoaXMuaWQgPSBpZCsrO1xuICAgICAgICB0aGlzLmRvbSA9IG51bGw7XG4gICAgICAgIHRoaXMudGV4dCA9IHRleHQ7XG4gICAgfVxuXG4gICAgZGVzdHJveSgpIHtcbiAgICAgICAgLy90aGlzLmRvbSA9IG51bGw7XG4gICAgICAgIHRleHRDYWNoZVt0ZXh0Q2FjaGUubGVuKytdID0gdGhpcztcbiAgICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3RzL25vZGUudHNcbiAqKi8iLCJpbXBvcnQge1ZUZXh0LCBWVGFnTm9kZSwgVk5vZGUsIFZDb21wb25lbnQsIFZGcmFnbWVudH0gZnJvbSAnLi9ub2RlJztcbmltcG9ydCB7bm9ybUNoaWxkfSBmcm9tICcuL3V0aWxzJztcbmltcG9ydCB7Y3JlYXRlQ29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudCc7XG5pbXBvcnQge2NyZWF0ZUF0dHJzfSBmcm9tICcuL2F0dHJzJztcbmV4cG9ydCBmdW5jdGlvbiBhcHBlbmQocGFyZW50OlZOb2RlLCBjaGlsZFBvczpudW1iZXIsIGJlZm9yZUNoaWxkPzpOb2RlKSB7XG4gICAgaWYgKGJlZm9yZUNoaWxkID09IG51bGwgJiYgcGFyZW50IGluc3RhbmNlb2YgVkZyYWdtZW50KSB7XG4gICAgICAgIGJlZm9yZUNoaWxkID0gcGFyZW50Lmxhc3ROb2RlO1xuICAgIH1cbiAgICBsZXQgcGFyZW50RG9tID0gcGFyZW50LmRvbTtcbiAgICBsZXQgbm9kZSA9IHBhcmVudC5jaGlsZHJlbltjaGlsZFBvc107XG4gICAgaWYgKHR5cGVvZiBub2RlLmtleSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBwYXJlbnQua2V5TWFwID09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBwYXJlbnQua2V5TWFwID0ge31cbiAgICAgICAgfVxuICAgICAgICBwYXJlbnQua2V5TWFwW25vZGUua2V5XSA9IGNoaWxkUG9zO1xuICAgIH1cblxuICAgIGlmIChub2RlIGluc3RhbmNlb2YgVlRleHQpIHtcbiAgICAgICAgbm9kZS5kb20gPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShub2RlLnRleHQpO1xuICAgICAgICBwYXJlbnREb20uaW5zZXJ0QmVmb3JlKG5vZGUuZG9tLCBiZWZvcmVDaGlsZCk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAobm9kZSBpbnN0YW5jZW9mIFZUYWdOb2RlKSB7XG4gICAgICAgIG5vZGUuZG9tID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChub2RlLnRhZyk7XG4gICAgICAgIGlmIChub2RlLmF0dHJzKSB7XG4gICAgICAgICAgICBjcmVhdGVBdHRycyhub2RlKTtcbiAgICAgICAgfVxuICAgICAgICBwYXJlbnREb20uaW5zZXJ0QmVmb3JlKG5vZGUuZG9tLCBiZWZvcmVDaGlsZCk7XG4gICAgfVxuICAgIGVsc2UgaWYgKG5vZGUgaW5zdGFuY2VvZiBWRnJhZ21lbnQpIHtcbiAgICAgICAgbm9kZS5kb20gPSBwYXJlbnREb207XG4gICAgICAgIGxldCB0eHQgPSBub2RlIGluc3RhbmNlb2YgVkNvbXBvbmVudCA/ICg8YW55Pm5vZGUuY3RvcikubmFtZSArICc6JyArIG5vZGUuaWQgOiAnIyc7XG4gICAgICAgIG5vZGUuZmlyc3ROb2RlID0gZG9jdW1lbnQuY3JlYXRlQ29tbWVudCgnICcgKyB0eHQgKyAnICcpO1xuICAgICAgICBub2RlLmxhc3ROb2RlID0gZG9jdW1lbnQuY3JlYXRlQ29tbWVudCgnIDonICsgdHh0ICsgJyAnKTtcbiAgICAgICAgKDxhbnk+bm9kZS5maXJzdE5vZGUpLnNraXAgPSB0cnVlO1xuICAgICAgICAoPGFueT5ub2RlLmxhc3ROb2RlKS5za2lwID0gdHJ1ZTtcbiAgICAgICAgcGFyZW50RG9tLmluc2VydEJlZm9yZShub2RlLmZpcnN0Tm9kZSwgYmVmb3JlQ2hpbGQpO1xuICAgICAgICBwYXJlbnREb20uaW5zZXJ0QmVmb3JlKG5vZGUubGFzdE5vZGUsIGJlZm9yZUNoaWxkKTtcblxuICAgICAgICBpZiAobm9kZSBpbnN0YW5jZW9mIFZDb21wb25lbnQpIHtcbiAgICAgICAgICAgIGNyZWF0ZUNvbXBvbmVudChub2RlKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlmIChub2RlLmNoaWxkcmVuKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbm9kZS5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbm9ybUNoaWxkKG5vZGUsIGkpO1xuICAgICAgICAgICAgYXBwZW5kKG5vZGUsIGkpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90cy9hcHBlbmQudHNcbiAqKi8iLCJpbXBvcnQge1ZUZXh0LCBWVGFnTm9kZSwgVk5vZGUsIFZDb21wb25lbnQsIFZGcmFnbWVudCwgZ2V0VlRleHR9IGZyb20gJy4vbm9kZSc7XG5leHBvcnQgZnVuY3Rpb24gbm9ybUNoaWxkKHBhcmVudDpWTm9kZSwgY2hpbGRQb3M6bnVtYmVyKSB7XG4gICAgdmFyIG5vZGUgPSA8YW55PnBhcmVudC5jaGlsZHJlbltjaGlsZFBvc107XG4gICAgaWYgKHR5cGVvZiBub2RlID09ICdvYmplY3QnICYmIG5vZGUgJiYgbm9kZSBpbnN0YW5jZW9mIFZOb2RlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBub2RlID09ICdzdHJpbmcnIHx8IHR5cGVvZiBub2RlID09ICdudW1iZXInKSB7XG4gICAgICAgIHBhcmVudC5jaGlsZHJlbltjaGlsZFBvc10gPSBnZXRWVGV4dChub2RlICsgJycpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChub2RlID09IG51bGwpIHtcbiAgICAgICAgcGFyZW50LmNoaWxkcmVuW2NoaWxkUG9zXSA9IGdldFZUZXh0KCcnKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIG5vZGUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIGlmIChub2RlIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgIHBhcmVudC5jaGlsZHJlbltjaGlsZFBvc10gPSBuZXcgVkZyYWdtZW50KG5vZGUsIG51bGwpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcGFyZW50LmNoaWxkcmVuW2NoaWxkUG9zXSA9IGdldFZUZXh0KEpTT04uc3RyaW5naWZ5KG5vZGUpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0eXBlb2Ygbm9kZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBwYXJlbnQuY2hpbGRyZW5bY2hpbGRQb3NdID0gZ2V0VlRleHQoJ0Z1bmN0aW9uJyk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcGFyZW50LmNoaWxkcmVuW2NoaWxkUG9zXSA9IGdldFZUZXh0KCcnKTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdHMvdXRpbHMudHNcbiAqKi8iLCJpbXBvcnQge1ZUZXh0LCBWVGFnTm9kZSwgVk5vZGUsIFZDb21wb25lbnQsIFZGcmFnbWVudH0gZnJvbSAnLi9ub2RlJztcbmltcG9ydCB7YXBwZW5kfSBmcm9tICcuL2FwcGVuZCc7XG5pbXBvcnQge3VwZGF0ZX0gZnJvbSAnLi91cGRhdGUnO1xuaW1wb3J0IHt1cGRhdGVDaGlsZHJlbn0gZnJvbSAnLi91cGRhdGUtY2hpbGRyZW4nO1xuaW1wb3J0IHtub3JtQ2hpbGR9IGZyb20gJy4vdXRpbHMnO1xuZXhwb3J0IGxldCBnbG9iczp7Y29tcG9uZW50OiBDb21wb25lbnR9ID0ge2NvbXBvbmVudDogbnVsbH07XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUNvbXBvbmVudCB7XG4gICAgbmV3KHByb3BzOmFueSk6IENvbXBvbmVudDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBQcm9wcyB7XG4gICAgY2hpbGRyZW46IFZOb2RlW107XG59XG5cbmV4cG9ydCBjbGFzcyBDb21wb25lbnQge1xuICAgIG5vZGU6VkNvbXBvbmVudDtcbiAgICBwcm9wczpQcm9wcztcbiAgICByZWZzOntbaW5kZXg6IHN0cmluZ106IFZOb2RlfTtcblxuICAgIGNvbnN0cnVjdG9yKHByb3BzOlByb3BzKSB7XG4gICAgICAgIHRoaXMucHJvcHMgPSBwcm9wcztcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsTW91bnQoKSB7XG5cbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcblxuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxVcGRhdGUoKSB7XG5cbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRVcGRhdGUoKSB7XG5cbiAgICB9XG5cbiAgICAvL3RvZG9cbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKHByb3BzOlByb3BzKSB7XG5cbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcblxuICAgIH1cblxuICAgIHJlbmRlcigpOlZOb2RlIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgZm9yY2VVcGRhdGUoKSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50V2lsbFVwZGF0ZSgpO1xuXG4gICAgICAgIHZhciBjaGlsZHJlbiA9IFt0aGlzLnJlbmRlcigpXTtcbiAgICAgICAgdmFyIHRlbXAgPSBuZXcgVkNvbXBvbmVudChudWxsLCBudWxsLCBjaGlsZHJlbiwgbnVsbCk7XG4gICAgICAgIHRlbXAuZmlyc3ROb2RlID0gdGhpcy5ub2RlLmZpcnN0Tm9kZTtcbiAgICAgICAgdGVtcC5sYXN0Tm9kZSA9IHRoaXMubm9kZS5sYXN0Tm9kZTtcbiAgICAgICAgdGVtcC5kb20gPSB0aGlzLm5vZGUuZG9tO1xuICAgICAgICBsZXQgcHJldkNvbXBvbmVudCA9IGdsb2JzLmNvbXBvbmVudDtcbiAgICAgICAgZ2xvYnMuY29tcG9uZW50ID0gdGhpcztcbiAgICAgICAgdXBkYXRlQ2hpbGRyZW4odGhpcy5ub2RlLCB0ZW1wKTsgLy8gY2xlYXIgdGhpcy5ub2RlLmNoaWxkcmVuXG4gICAgICAgIGdsb2JzLmNvbXBvbmVudCA9IHByZXZDb21wb25lbnQ7XG4gICAgICAgIHRoaXMubm9kZS5jaGlsZHJlbiA9IHRlbXAuY2hpbGRyZW47XG4gICAgICAgIHRoaXMuY29tcG9uZW50RGlkVXBkYXRlKCk7XG4gICAgICAgIC8vdGVtcC5kZXN0cm95KCk7XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZmluZERPTU5vZGUobm9kZTpWVGFnTm9kZSB8IFZUZXh0KSB7XG4gICAgcmV0dXJuIG5vZGUuZG9tO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQ29tcG9uZW50KG5vZGU6VkNvbXBvbmVudCkge1xuICAgIHZhciBwcm9wcyA9IG5vZGUuYXR0cnMgfHwge307XG4gICAgcHJvcHMuY2hpbGRyZW4gPSBub2RlLmNoaWxkcmVuO1xuICAgIHZhciBjb21wb25lbnQgPSBuZXcgbm9kZS5jdG9yKHByb3BzKTtcbiAgICBjb21wb25lbnQubm9kZSA9IG5vZGU7XG4gICAgbm9kZS5jb21wb25lbnQgPSBjb21wb25lbnQ7XG4gICAgY29tcG9uZW50LmNvbXBvbmVudFdpbGxNb3VudCgpO1xuICAgIG5vZGUuY2hpbGRyZW4gPSBbY29tcG9uZW50LnJlbmRlcigpXTtcbiAgICBsZXQgcHJldkNvbXBvbmVudCA9IGdsb2JzLmNvbXBvbmVudDtcbiAgICBnbG9icy5jb21wb25lbnQgPSBjb21wb25lbnQ7XG4gICAgaWYgKG5vZGUuY2hpbGRyZW4pIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBub2RlLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBub3JtQ2hpbGQobm9kZSwgaSk7XG4gICAgICAgICAgICBhcHBlbmQobm9kZSwgaSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2xvYnMuY29tcG9uZW50ID0gcHJldkNvbXBvbmVudDtcbiAgICBub2RlLmNvbXBvbmVudC5jb21wb25lbnREaWRNb3VudCgpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlQ29tcG9uZW50KG9sZDpWQ29tcG9uZW50LCBwYXJlbnQ6Vk5vZGUsIGNoaWxkUG9zOm51bWJlcikge1xuICAgIHZhciBuZXdOb2RlID0gPFZDb21wb25lbnQ+cGFyZW50LmNoaWxkcmVuW2NoaWxkUG9zXTtcbiAgICB2YXIgcHJvcHMgPSBuZXdOb2RlLmF0dHJzIHx8IHt9O1xuICAgIHByb3BzLmNoaWxkcmVuID0gbmV3Tm9kZS5jaGlsZHJlbjtcbiAgICBvbGQuY29tcG9uZW50LmNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMocHJvcHMpO1xuICAgIG9sZC5jb21wb25lbnQucHJvcHMgPSBwcm9wcztcbiAgICBvbGQuY29tcG9uZW50LmZvcmNlVXBkYXRlKCk7XHQgLy8gYWZmZWN0IG5vZGUgY2hpbGRyZW5cbiAgICBwYXJlbnQuY2hpbGRyZW5bY2hpbGRQb3NdID0gb2xkO1xuICAgIG5ld05vZGUuZGVzdHJveSgpO1xuICAgIC8vbm8gZGVzdHJveSBvbGRcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdHMvY29tcG9uZW50LnRzXG4gKiovIiwiaW1wb3J0IHtWVGV4dCwgVlRhZ05vZGUsIFZOb2RlLCBWQ29tcG9uZW50LCBWRnJhZ21lbnR9IGZyb20gJy4vbm9kZSc7XG5pbXBvcnQge2FwcGVuZH0gZnJvbSAnLi9hcHBlbmQnO1xuaW1wb3J0IHt1cGRhdGV9IGZyb20gJy4vdXBkYXRlJztcbmltcG9ydCB7cmVtb3ZlfSBmcm9tICcuL3JlbW92ZSc7XG5pbXBvcnQge25vcm1DaGlsZH0gZnJvbSAnLi91dGlscyc7XG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVDaGlsZHJlbihvbGQ6Vk5vZGUsIG5vZGU6Vk5vZGUpIHtcbiAgICB2YXIgb2xkQ2hpbGRyZW4gPSBvbGQuY2hpbGRyZW47XG4gICAgdmFyIG5ld0NoaWxkcmVuID0gbm9kZS5jaGlsZHJlbjtcbiAgICB2YXIgaW5zZXJ0czphbnkgPSBuZXcgQXJyYXkoMTAwMDAwKTtcbiAgICBpbnNlcnRzLmxlbiA9IDA7XG4gICAgaWYgKG5ld0NoaWxkcmVuKSB7XG4gICAgICAgIHZhciBmaXRDb3VudCA9IDA7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbmV3Q2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIG5vcm1DaGlsZChub2RlLCBpKTtcbiAgICAgICAgICAgIHZhciBmaXRQb3M6bnVtYmVyID0gbnVsbDtcbiAgICAgICAgICAgIHZhciBuZXdDaGlsZCA9IG5ld0NoaWxkcmVuW2ldOyAvLyBvbmx5IHVzZSBiZWZvcmUgdXBkYXRlXG4gICAgICAgICAgICB2YXIgb2xkQ2hpbGQgPSBvbGRDaGlsZHJlbiAmJiBvbGRDaGlsZHJlbltpXTtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygb2xkLmtleU1hcCA9PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgbmV3Q2hpbGQua2V5ICE9ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIGZpdFBvcyA9IG9sZC5rZXlNYXBbbmV3Q2hpbGQua2V5XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChvbGRDaGlsZCAmJiB0eXBlb2Ygb2xkQ2hpbGQua2V5ID09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmaXRQb3MgPSBpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAob2xkQ2hpbGQpIHtcbiAgICAgICAgICAgICAgICBmaXRQb3MgPSBpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZml0UG9zICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICBmaXRDb3VudCsrO1xuICAgICAgICAgICAgICAgIHVwZGF0ZShvbGRDaGlsZHJlbltmaXRQb3NdLCBub2RlLCBpKTtcbiAgICAgICAgICAgICAgICBpZiAoZml0UG9zICE9PSBpKSB7XG4gICAgICAgICAgICAgICAgICAgIGluc2VydHNbaW5zZXJ0cy5sZW4rK10gPSBpO1xuICAgICAgICAgICAgICAgICAgICAvL21vdmUobm9kZS5jaGlsZHJlbltpXSwgbm9kZSwgYmVmb3JlQ2hpbGQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBvbGRDaGlsZHJlbltmaXRQb3NdID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGluc2VydHNbaW5zZXJ0cy5sZW4rK10gPSBpO1xuICAgICAgICAgICAgICAgIC8vYXBwZW5kKG5vZGUsIGksIGJlZm9yZUNoaWxkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlmIChvbGRDaGlsZHJlbiAmJiBvbGRDaGlsZHJlbi5sZW5ndGggIT09IGZpdENvdW50KSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgb2xkQ2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBvbGRDaGlsZCA9IG9sZENoaWxkcmVuW2ldO1xuICAgICAgICAgICAgaWYgKG9sZENoaWxkKSB7XG4gICAgICAgICAgICAgICAgcmVtb3ZlKG9sZENoaWxkLCBvbGQsIGkpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvbGRDaGlsZHJlbltpXSA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKHZhciBpID0gaW5zZXJ0cy5sZW4gLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICB2YXIgcG9zOm51bWJlciA9IGluc2VydHNbaV07XG5cbiAgICAgICAgaWYgKGkgPT0gaW5zZXJ0cy5sZW4gLSAxKSB7XG4gICAgICAgICAgICB2YXIgYmVmb3JlQ2hpbGQgPSBub2RlIGluc3RhbmNlb2YgVkZyYWdtZW50XG4gICAgICAgICAgICAgICAgPyBub2RlLmxhc3ROb2RlXG4gICAgICAgICAgICAgICAgOiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgYmVmb3JlQ2hpbGQgPSBuZXdDaGlsZHJlbltpICsgMV0gaW5zdGFuY2VvZiBWRnJhZ21lbnRcbiAgICAgICAgICAgICAgICA/ICg8VkZyYWdtZW50Pm5ld0NoaWxkcmVuW2kgKyAxXSkuZmlyc3ROb2RlXG4gICAgICAgICAgICAgICAgOiBuZXdDaGlsZHJlbltpICsgMV0uZG9tO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG5ld0NoaWxkcmVuW3Bvc10uZG9tKSB7XG4gICAgICAgICAgICBtb3ZlKG5ld0NoaWxkcmVuW3Bvc10sIG5vZGUsIGJlZm9yZUNoaWxkKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGFwcGVuZChub2RlLCBwb3MsIGJlZm9yZUNoaWxkKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gbW92ZShub2RlOlZOb2RlLCBwYXJlbnQ6Vk5vZGUsIGJlZm9yZUNoaWxkOk5vZGUpIHtcbiAgICBpZiAobm9kZSBpbnN0YW5jZW9mIFZGcmFnbWVudCkge1xuICAgICAgICB2YXIgcHJldkRvbTpOb2RlO1xuICAgICAgICB2YXIgZG9tID0gbm9kZS5sYXN0Tm9kZTtcbiAgICAgICAgdmFyIGVuZE5vZGUgPSBub2RlLmZpcnN0Tm9kZTtcbiAgICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgICAgIHByZXZEb20gPSBkb20ucHJldmlvdXNTaWJsaW5nO1xuICAgICAgICAgICAgaWYgKGRvbS5wcmV2aW91c1NpYmxpbmcgIT09IGJlZm9yZUNoaWxkKSB7XG4gICAgICAgICAgICAgICAgcGFyZW50LmRvbS5pbnNlcnRCZWZvcmUoZG9tLCBiZWZvcmVDaGlsZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBiZWZvcmVDaGlsZCA9IGRvbTtcbiAgICAgICAgICAgIGlmIChkb20gPT0gZW5kTm9kZSkge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZG9tID0gcHJldkRvbTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcGFyZW50LmRvbS5pbnNlcnRCZWZvcmUobm9kZS5kb20sIGJlZm9yZUNoaWxkKTtcbiAgICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3RzL3VwZGF0ZS1jaGlsZHJlbi50c1xuICoqLyIsImltcG9ydCB7VlRleHQsIFZUYWdOb2RlLCBWTm9kZSwgVkNvbXBvbmVudCwgVkZyYWdtZW50fSBmcm9tICcuL25vZGUnO1xuaW1wb3J0IHtub3JtQ2hpbGR9IGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0IHtyZW1vdmV9IGZyb20gJy4vcmVtb3ZlJztcbmltcG9ydCB7YXBwZW5kfSBmcm9tICcuL2FwcGVuZCc7XG5pbXBvcnQge3VwZGF0ZUNoaWxkcmVufSBmcm9tICcuL3VwZGF0ZS1jaGlsZHJlbic7XG5pbXBvcnQge3VwZGF0ZUF0dHJzfSBmcm9tICcuL2F0dHJzJztcbmltcG9ydCB7dXBkYXRlQ29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudCc7XG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGUob2xkOlZOb2RlLCBwYXJlbnQ6Vk5vZGUsIGNoaWxkUG9zOm51bWJlcikge1xuICAgIHZhciBub2RlID0gcGFyZW50LmNoaWxkcmVuW2NoaWxkUG9zXTtcblxuICAgIGlmIChvbGQuY29uc3RydWN0b3IgIT09IG5vZGUuY29uc3RydWN0b3IpIHtcbiAgICAgICAgcmVwbGFjZU5vZGUob2xkLCBwYXJlbnQsIGNoaWxkUG9zKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAobm9kZSBpbnN0YW5jZW9mIFZUZXh0KSB7XG4gICAgICAgIG5vZGUuZG9tID0gKDxWVGV4dD5vbGQpLmRvbTtcbiAgICAgICAgaWYgKCg8VlRleHQ+b2xkKS50ZXh0ICE9PSBub2RlLnRleHQpIHtcbiAgICAgICAgICAgIG5vZGUuZG9tLnRleHRDb250ZW50ID0gbm9kZS50ZXh0O1xuICAgICAgICB9XG4gICAgICAgIG9sZC5kZXN0cm95KCk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIG5vZGUua2V5ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBpZiAodHlwZW9mIHBhcmVudC5rZXlNYXAgPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHBhcmVudC5rZXlNYXAgPSB7fVxuICAgICAgICB9XG4gICAgICAgIHBhcmVudC5rZXlNYXBbbm9kZS5rZXldID0gY2hpbGRQb3M7XG4gICAgfVxuXG4gICAgaWYgKG5vZGUgaW5zdGFuY2VvZiBWVGFnTm9kZSkge1xuICAgICAgICBpZiAoKDxWVGFnTm9kZT5vbGQpLnRhZyAhPT0gbm9kZS50YWcpIHtcbiAgICAgICAgICAgIHJlcGxhY2VOb2RlKG9sZCwgcGFyZW50LCBjaGlsZFBvcyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbm9kZS5kb20gPSAoPFZUYWdOb2RlPm9sZCkuZG9tO1xuXG4gICAgICAgIHVwZGF0ZUF0dHJzKDxWVGFnTm9kZT5vbGQsIHBhcmVudCwgY2hpbGRQb3MpO1xuICAgIH1cbiAgICBlbHNlIGlmIChub2RlIGluc3RhbmNlb2YgVkZyYWdtZW50KSB7XG4gICAgICAgIGlmIChub2RlIGluc3RhbmNlb2YgVkNvbXBvbmVudCkge1xuICAgICAgICAgICAgaWYgKCg8VkNvbXBvbmVudD5vbGQpLmN0b3IgIT09IG5vZGUuY3Rvcikge1xuICAgICAgICAgICAgICAgIHJlcGxhY2VOb2RlKG9sZCwgcGFyZW50LCBjaGlsZFBvcyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdXBkYXRlQ29tcG9uZW50KDxWQ29tcG9uZW50Pm9sZCwgcGFyZW50LCBjaGlsZFBvcyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbm9kZS5sYXN0Tm9kZSA9ICg8VkZyYWdtZW50Pm9sZCkubGFzdE5vZGU7XG4gICAgICAgIG5vZGUuZmlyc3ROb2RlID0gKDxWRnJhZ21lbnQ+b2xkKS5maXJzdE5vZGU7XG4gICAgICAgIG5vZGUuZG9tID0gKDxWRnJhZ21lbnQ+b2xkKS5kb207XG4gICAgfVxuXG4gICAgdXBkYXRlQ2hpbGRyZW4ob2xkLCBub2RlKTtcbiAgICBvbGQuZGVzdHJveSgpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVwbGFjZU5vZGUob2xkOlZOb2RlLCBwYXJlbnQ6Vk5vZGUsIGNoaWxkUG9zOm51bWJlcikge1xuICAgIGFwcGVuZChwYXJlbnQsIGNoaWxkUG9zLCBvbGQgaW5zdGFuY2VvZiBWRnJhZ21lbnQgPyBvbGQuZmlyc3ROb2RlIDogKDxWVGFnTm9kZT5vbGQpLmRvbSk7XG4gICAgcmVtb3ZlKG9sZCwgcGFyZW50KTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdHMvdXBkYXRlLnRzXG4gKiovIiwiaW1wb3J0IHtWVGV4dCwgVlRhZ05vZGUsIFZOb2RlLCBWQ29tcG9uZW50LCBWRnJhZ21lbnR9IGZyb20gJy4vbm9kZSc7XG5pbXBvcnQge2FwcGVuZH0gZnJvbSAnLi9hcHBlbmQnO1xuaW1wb3J0IHt1cGRhdGV9IGZyb20gJy4vdXBkYXRlJztcbmltcG9ydCB7bm9ybUNoaWxkfSBmcm9tICcuL3V0aWxzJztcblxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZShub2RlOlZOb2RlLCBwYXJlbnQ6Vk5vZGUsIGNoaWxkUG9zPzpudW1iZXIsIHNraXBSZW1vdmU/OmJvb2xlYW4pIHtcbiAgICBpZiAobm9kZSBpbnN0YW5jZW9mIFZDb21wb25lbnQpIHtcbiAgICAgICAgbm9kZS5jb21wb25lbnQuY29tcG9uZW50V2lsbFVubW91bnQoKTtcbiAgICB9XG4gICAgaWYgKG5vZGUuY2hpbGRyZW4pIHtcbiAgICAgICAgdmFyIHNraXAgPSBza2lwUmVtb3ZlIHx8ICEobm9kZSBpbnN0YW5jZW9mIFZGcmFnbWVudCk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbm9kZS5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgcmVtb3ZlKG5vZGUuY2hpbGRyZW5baV0sIG5vZGUsIGksIHNraXApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCFza2lwUmVtb3ZlKSB7XG4gICAgICAgIGlmIChub2RlIGluc3RhbmNlb2YgVkZyYWdtZW50KSB7XG4gICAgICAgICAgICBwYXJlbnQuZG9tLnJlbW92ZUNoaWxkKG5vZGUuZmlyc3ROb2RlKTtcbiAgICAgICAgICAgIHBhcmVudC5kb20ucmVtb3ZlQ2hpbGQobm9kZS5sYXN0Tm9kZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBwYXJlbnQuZG9tLnJlbW92ZUNoaWxkKG5vZGUuZG9tKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBub2RlLmRlc3Ryb3koKTtcbiAgICBpZiAoY2hpbGRQb3MgIT0gbnVsbCkge1xuICAgICAgICBwYXJlbnQuY2hpbGRyZW5bY2hpbGRQb3NdID0gbnVsbDtcbiAgICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3RzL3JlbW92ZS50c1xuICoqLyIsImltcG9ydCB7VlRleHQsIFZUYWdOb2RlLCBWTm9kZSwgVkNvbXBvbmVudCwgVkZyYWdtZW50fSBmcm9tICcuL25vZGUnO1xuaW1wb3J0IHthcHBlbmR9IGZyb20gJy4vYXBwZW5kJztcbmltcG9ydCB7dXBkYXRlLCByZXBsYWNlTm9kZX0gZnJvbSAnLi91cGRhdGUnO1xuaW1wb3J0IHtub3JtQ2hpbGR9IGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0IHthdHRycywgcHJvcHMsIGV2ZW50c30gZnJvbSAnLi9jb25zdC1hdHRycyc7XG5pbXBvcnQge2dsb2JzfSBmcm9tICcuL2NvbXBvbmVudCc7XG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVBdHRycyhvbGQ6VlRhZ05vZGUsIHBhcmVudDpWTm9kZSwgY2hpbGRQb3M6bnVtYmVyKSB7XG4gICAgdmFyIG5vZGUgPSA8VlRhZ05vZGU+cGFyZW50LmNoaWxkcmVuW2NoaWxkUG9zXTtcbiAgICB2YXIgcmVzID0gdHJ1ZTtcbiAgICBpZiAobm9kZS5hdHRycykge1xuICAgICAgICBpZiAob2xkLmF0dHJzKSB7XG4gICAgICAgICAgICBjcmVhdGVBdHRycyhub2RlLCBvbGQuYXR0cnMpOyAvLyBhZmZlY3Qgbm9kZS5hdHRyc0NvZGVcbiAgICAgICAgICAgIHJlcyA9IG9sZC5hdHRyc0NvZGUgPT09IG5vZGUuYXR0cnNDb2RlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmVzID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAob2xkLmF0dHJzKSB7XG4gICAgICAgIHJlcyA9IGZhbHNlO1xuICAgIH1cbiAgICBpZiAocmVzID09PSBmYWxzZSkge1xuICAgICAgICByZW1vdmVBdHRycyhvbGQpO1xuICAgICAgICBjcmVhdGVBdHRycyhub2RlLCBvbGQpO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQXR0cnMobm9kZTpWVGFnTm9kZSwgb2xkQXR0cnM/OmFueSkge1xuICAgIHZhciBkb206YW55ID0gbm9kZS5kb207XG4gICAgdmFyIGF0dHI6c3RyaW5nO1xuICAgIHZhciBwcm9wOnN0cmluZztcbiAgICB2YXIgZXZlbnQ6c3RyaW5nO1xuICAgIG5vZGUuYXR0cnNDb2RlID0gJyc7XG4gICAgZm9yICh2YXIgYXR0ck5hbWUgaW4gbm9kZS5hdHRycykge1xuICAgICAgICBub2RlLmF0dHJzQ29kZSArPSBhdHRyTmFtZTtcbiAgICAgICAgdmFyIGF0dHJWYWwgPSBub2RlLmF0dHJzW2F0dHJOYW1lXTtcbiAgICAgICAgaWYgKGF0dHJOYW1lID09ICdrZXknIHx8IChvbGRBdHRycyAmJiBvbGRBdHRyc1thdHRyTmFtZV0gPT09IGF0dHJWYWwgJiYgYXR0ck5hbWUgIT09ICdyZWYnKSkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb3AgPSBwcm9wc1thdHRyTmFtZV0pIHtcbiAgICAgICAgICAgIGlmIChhdHRyVmFsID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBkb21bcHJvcF0gPSAnJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGRvbVtwcm9wXSA9IGF0dHJWYWw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoYXR0ciA9IGF0dHJzW2F0dHJOYW1lXSkge1xuICAgICAgICAgICAgaWYgKGF0dHJWYWwgPT0gbnVsbCB8fCBhdHRyVmFsID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIGRvbS5yZW1vdmVBdHRyaWJ1dGUoYXR0cik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh0eXBlb2YgYXR0clZhbCAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICBkb20uc2V0QXR0cmlidXRlKGF0dHIsIGF0dHJWYWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGV2ZW50ID0gZXZlbnRzW2F0dHJOYW1lXSkge1xuICAgICAgICAgICAgZG9tWydvbicgKyBldmVudF0gPSBhdHRyVmFsO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGF0dHJOYW1lWzBdID09PSAnbycgJiYgYXR0ck5hbWVbMV0gPT09ICduJykge1xuICAgICAgICAgICAgZXZlbnQgPSBhdHRyTmFtZS5zdWJzdHJpbmcoMikudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgIGRvbVsnb24nICsgZXZlbnRdID0gYXR0clZhbDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChhdHRyTmFtZVswXSA9PT0gJ2QnICYmIGF0dHJOYW1lWzFdID09PSAnYScgJiYgYXR0ck5hbWVbMl0gPT09ICd0JyAmJiBhdHRyTmFtZVszXSA9PT0gJ2EnKSB7XG5cbiAgICAgICAgICAgIGlmIChhdHRyVmFsID09IG51bGwgfHwgYXR0clZhbCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICBkb20ucmVtb3ZlQXR0cmlidXRlKGF0dHJOYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGRvbS5zZXRBdHRyaWJ1dGUoYXR0ck5hbWUsIGF0dHJWYWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGF0dHJOYW1lID09PSAnc3R5bGUnKSB7XG4gICAgICAgICAgICAvL3RvZG86XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoYXR0ck5hbWUgPT0gJ3JlZicpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgYXR0clZhbCA9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgYXR0clZhbChub2RlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGdsb2JzLmNvbXBvbmVudCkge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgZ2xvYnMuY29tcG9uZW50LnJlZnMgPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgZ2xvYnMuY29tcG9uZW50LnJlZnMgPSB7fTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZ2xvYnMuY29tcG9uZW50LnJlZnNbYXR0clZhbF0gPSBub2RlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiByZW1vdmVBdHRycyhvbGQ6VlRhZ05vZGUpIHtcbiAgICB2YXIgZG9tOmFueSA9IG9sZC5kb207XG5cbiAgICB2YXIgYXR0cjpzdHJpbmc7XG4gICAgdmFyIHByb3A6c3RyaW5nO1xuICAgIHZhciBldmVudDpzdHJpbmc7XG5cbiAgICBmb3IgKHZhciBhdHRyTmFtZSBpbiBvbGQuYXR0cnMpIHtcbiAgICAgICAgdmFyIGF0dHJWYWwgPSBvbGQuYXR0cnNbYXR0ck5hbWVdO1xuICAgICAgICBpZiAocHJvcCA9IHByb3BzW2F0dHJOYW1lXSkge1xuICAgICAgICAgICAgZG9tW3Byb3BdID0gJyc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoYXR0ciA9IGF0dHJzW2F0dHJOYW1lXSkge1xuICAgICAgICAgICAgZG9tLnJlbW92ZUF0dHJpYnV0ZShhdHRyKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChhdHRyTmFtZS5zdWJzdHJpbmcoMCwgNCkgPT0gJ2RhdGEnKSB7XG4gICAgICAgICAgICBkb20ucmVtb3ZlQXR0cmlidXRlKGF0dHJOYW1lKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChldmVudCA9IGV2ZW50c1thdHRyTmFtZV0pIHtcbiAgICAgICAgICAgIGRvbVsnb24nICsgZXZlbnRdID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChhdHRyTmFtZS5zdWJzdHJpbmcoMCwgMikgPT0gJ29uJykge1xuICAgICAgICAgICAgZXZlbnQgPSBhdHRyTmFtZS5zdWJzdHJpbmcoMikudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgIGRvbVsnb24nICsgZXZlbnRdID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChhdHRyTmFtZSA9PT0gJ3N0eWxlJykge1xuICAgICAgICAgICAgLy90b2RvOlxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGF0dHJOYW1lID09ICdyZWYnKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGF0dHJWYWwgPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoZ2xvYnMuY29tcG9uZW50KSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBnbG9icy5jb21wb25lbnQucmVmcyA9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICBnbG9icy5jb21wb25lbnQucmVmcyA9IHt9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBnbG9icy5jb21wb25lbnQucmVmc1thdHRyVmFsXSA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3RzL2F0dHJzLnRzXG4gKiovIiwiZXhwb3J0IGxldCBhdHRyczp7W2luZGV4OnN0cmluZ106c3RyaW5nfSA9IHtcbiAgICBhY2NlcHQ6ICdhY2NlcHQnLFxuICAgIGFjY2VwdENoYXJzZXQ6ICdhY2NlcHQtY2hhcnNldCcsXG4gICAgYWNjZXNzS2V5OiAnYWNjZXNzS2V5JyxcbiAgICBhY3Rpb246ICdhY3Rpb24nLFxuICAgIGFsbG93RnVsbFNjcmVlbjogJ2FsbG93RnVsbFNjcmVlbicsXG4gICAgYWxsb3dUcmFuc3BhcmVuY3k6ICdhbGxvd1RyYW5zcGFyZW5jeScsXG4gICAgYWx0OiAnYWx0JyxcbiAgICBhc3luYzogJ2FzeW5jJyxcbiAgICBhdXRvQ29tcGxldGU6ICdhdXRvQ29tcGxldGUnLFxuICAgIGF1dG9QbGF5OiAnYXV0b1BsYXknLFxuICAgIGNhcHR1cmU6ICdjYXB0dXJlJyxcbiAgICBjZWxsUGFkZGluZzogJ2NlbGxQYWRkaW5nJyxcbiAgICBjZWxsU3BhY2luZzogJ2NlbGxTcGFjaW5nJyxcbiAgICBjaGFyU2V0OiAnY2hhclNldCcsXG4gICAgY2hhbGxlbmdlOiAnY2hhbGxlbmdlJyxcbiAgICBjbGFzc0lEOiAnY2xhc3NJRCcsXG4gICAgY29sczogJ2NvbHMnLFxuICAgIGNvbFNwYW46ICdjb2xTcGFuJyxcbiAgICBjb250ZW50OiAnY29udGVudCcsXG4gICAgY29udGVudEVkaXRhYmxlOiAnY29udGVudEVkaXRhYmxlJyxcbiAgICBjb250ZXh0TWVudTogJ2NvbnRleHRNZW51JyxcbiAgICBjb29yZHM6ICdjb29yZHMnLFxuICAgIGNyb3NzT3JpZ2luOiAnY3Jvc3NPcmlnaW4nLFxuICAgIGRhdGE6ICdkYXRhJyxcbiAgICBkYXRlVGltZTogJ2RhdGVUaW1lJyxcbiAgICBkZWZlcjogJ2RlZmVyJyxcbiAgICBkaXI6ICdkaXInLFxuICAgIGRpc2FibGVkOiAnZGlzYWJsZWQnLFxuICAgIGRvd25sb2FkOiAnZG93bmxvYWQnLFxuICAgIGRyYWdnYWJsZTogJ2RyYWdnYWJsZScsXG4gICAgZW5jVHlwZTogJ2VuY1R5cGUnLFxuICAgIGZvcm06ICdmb3JtJyxcbiAgICBmb3JtQWN0aW9uOiAnZm9ybUFjdGlvbicsXG4gICAgZm9ybUVuY1R5cGU6ICdmb3JtRW5jVHlwZScsXG4gICAgZm9ybU1ldGhvZDogJ2Zvcm1NZXRob2QnLFxuICAgIGZvcm1Ob1ZhbGlkYXRlOiAnZm9ybU5vVmFsaWRhdGUnLFxuICAgIGZvcm1UYXJnZXQ6ICdmb3JtVGFyZ2V0JyxcbiAgICBmcmFtZUJvcmRlcjogJ2ZyYW1lQm9yZGVyJyxcbiAgICBoZWFkZXJzOiAnaGVhZGVycycsXG4gICAgaGVpZ2h0OiAnaGVpZ2h0JyxcbiAgICBoaWRkZW46ICdoaWRkZW4nLFxuICAgIGhpZ2g6ICdoaWdoJyxcbiAgICBocmVmOiAnaHJlZicsXG4gICAgaHJlZkxhbmc6ICdocmVmTGFuZycsXG4gICAgaHRtbEZvcjogJ2ZvcicsXG4gICAgaHR0cEVxdWl2OiAnaHR0cC1lcXVpdicsXG4gICAgaWNvbjogJ2ljb24nLFxuICAgIGlucHV0TW9kZTogJ2lucHV0TW9kZScsXG4gICAgaXM6ICdpcycsXG4gICAga2V5UGFyYW1zOiAna2V5UGFyYW1zJyxcbiAgICBrZXlUeXBlOiAna2V5VHlwZScsXG4gICAgbGFiZWw6ICdsYWJlbCcsXG4gICAgbGFuZzogJ2xhbmcnLFxuICAgIGxpc3Q6ICdsaXN0JyxcbiAgICBsb3c6ICdsb3cnLFxuICAgIG1hbmlmZXN0OiAnbWFuaWZlc3QnLFxuICAgIG1hcmdpbkhlaWdodDogJ21hcmdpbkhlaWdodCcsXG4gICAgbWFyZ2luV2lkdGg6ICdtYXJnaW5XaWR0aCcsXG4gICAgbWF4OiAnbWF4JyxcbiAgICBtYXhMZW5ndGg6ICdtYXhMZW5ndGgnLFxuICAgIG1lZGlhOiAnbWVkaWEnLFxuICAgIG1lZGlhR3JvdXA6ICdtZWRpYUdyb3VwJyxcbiAgICBtZXRob2Q6ICdtZXRob2QnLFxuICAgIG1pbjogJ21pbicsXG4gICAgbWluTGVuZ3RoOiAnbWluTGVuZ3RoJyxcbiAgICBuYW1lOiAnbmFtZScsXG4gICAgbm9WYWxpZGF0ZTogJ25vVmFsaWRhdGUnLFxuICAgIG9wZW46ICdvcGVuJyxcbiAgICBvcHRpbXVtOiAnb3B0aW11bScsXG4gICAgcGF0dGVybjogJ3BhdHRlcm4nLFxuICAgIHBsYWNlaG9sZGVyOiAncGxhY2Vob2xkZXInLFxuICAgIHBvc3RlcjogJ3Bvc3RlcicsXG4gICAgcHJlbG9hZDogJ3ByZWxvYWQnLFxuICAgIHJhZGlvR3JvdXA6ICdyYWRpb0dyb3VwJyxcbiAgICByZWw6ICdyZWwnLFxuICAgIHJlcXVpcmVkOiAncmVxdWlyZWQnLFxuICAgIHJvbGU6ICdyb2xlJyxcbiAgICByb3dzOiAncm93cycsXG4gICAgcm93U3BhbjogJ3Jvd1NwYW4nLFxuICAgIHNhbmRib3g6ICdzYW5kYm94JyxcbiAgICBzY29wZTogJ3Njb3BlJyxcbiAgICBzY29wZWQ6ICdzY29wZWQnLFxuICAgIHNjcm9sbGluZzogJ3Njcm9sbGluZycsXG4gICAgc2VhbWxlc3M6ICdzZWFtbGVzcycsXG4gICAgc2hhcGU6ICdzaGFwZScsXG4gICAgc2l6ZTogJ3NpemUnLFxuICAgIHNpemVzOiAnc2l6ZXMnLFxuICAgIHNwYW46ICdzcGFuJyxcbiAgICBzcGVsbENoZWNrOiAnc3BlbGxDaGVjaycsXG4gICAgc3JjOiAnc3JjJyxcbiAgICBzcmNTZXQ6ICdzcmNTZXQnLFxuICAgIHN0YXJ0OiAnc3RhcnQnLFxuICAgIHN0ZXA6ICdzdGVwJyxcbiAgICBzdHlsZTogJ3N0eWxlJyxcbiAgICB0YWJJbmRleDogJ3RhYkluZGV4JyxcbiAgICB0YXJnZXQ6ICd0YXJnZXQnLFxuICAgIHRpdGxlOiAndGl0bGUnLFxuICAgIHR5cGU6ICd0eXBlJyxcbiAgICB1c2VNYXA6ICd1c2VNYXAnLFxuICAgIHdpZHRoOiAnd2lkdGgnLFxuICAgIHdtb2RlOiAnd21vZGUnLFxuICAgIGF1dG9DYXBpdGFsaXplOiAnYXV0b0NhcGl0YWxpemUnLFxuICAgIGF1dG9Db3JyZWN0OiAnYXV0b0NvcnJlY3QnLFxuICAgIGl0ZW1Qcm9wOiAnaXRlbVByb3AnLFxuICAgIGl0ZW1TY29wZTogJ2l0ZW1TY29wZScsXG4gICAgaXRlbVR5cGU6ICdpdGVtVHlwZScsXG4gICAgaXRlbUlEOiAnaXRlbUlEJyxcbiAgICBpdGVtUmVmOiAnaXRlbVJlZicsXG4gICAgcHJvcGVydHk6ICdwcm9wZXJ0eScsXG4gICAgc2VjdXJpdHk6ICdzZWN1cml0eScsXG4gICAgdW5zZWxlY3RhYmxlOiAndW5zZWxlY3RhYmxlJyxcbn07XG5cbmV4cG9ydCBsZXQgcHJvcHM6e1tpbmRleDpzdHJpbmddOnN0cmluZ30gPSB7XG4gICAgY2hlY2tlZDogJ2NoZWNrZWQnLFxuICAgIGNsYXNzTmFtZTogJ2NsYXNzTmFtZScsXG4gICAgY29udHJvbHM6ICdjb250cm9scycsXG4gICAgaWQ6ICdpZCcsXG4gICAgbG9vcDogJ2xvb3AnLFxuICAgIG11bHRpcGxlOiAnbXVsdGlwbGUnLFxuICAgIG11dGVkOiAnbXV0ZWQnLFxuICAgIHJlYWRPbmx5OiAncmVhZE9ubHknLFxuICAgIHNlbGVjdGVkOiAnc2VsZWN0ZWQnLFxuICAgIHNyY0RvYzogJ3NyY2RvYycsXG4gICAgdmFsdWU6ICd2YWx1ZSdcbn07XG5cbmV4cG9ydCBsZXQgaXNVbml0bGVzc051bWJlcjp7W2luZGV4OnN0cmluZ106Ym9vbGVhbn0gPSB7XG4gICAgYm94RmxleDogdHJ1ZSxcbiAgICBib3hGbGV4R3JvdXA6IHRydWUsXG4gICAgY29sdW1uQ291bnQ6IHRydWUsXG4gICAgZmxleDogdHJ1ZSxcbiAgICBmbGV4R3JvdzogdHJ1ZSxcbiAgICBmbGV4UG9zaXRpdmU6IHRydWUsXG4gICAgZmxleFNocmluazogdHJ1ZSxcbiAgICBmbGV4TmVnYXRpdmU6IHRydWUsXG4gICAgZm9udFdlaWdodDogdHJ1ZSxcbiAgICBsaW5lQ2xhbXA6IHRydWUsXG4gICAgbGluZUhlaWdodDogdHJ1ZSxcbiAgICBvcGFjaXR5OiB0cnVlLFxuICAgIG9yZGVyOiB0cnVlLFxuICAgIG9ycGhhbnM6IHRydWUsXG4gICAgd2lkb3dzOiB0cnVlLFxuICAgIHpJbmRleDogdHJ1ZSxcbiAgICB6b29tOiB0cnVlLFxuXG4gICAgLy8gU1ZHLXJlbGF0ZWQgcHJvcGVydGllc1xuICAgIGZpbGxPcGFjaXR5OiB0cnVlLFxuICAgIHN0cm9rZURhc2hvZmZzZXQ6IHRydWUsXG4gICAgc3Ryb2tlT3BhY2l0eTogdHJ1ZSxcbiAgICBzdHJva2VXaWR0aDogdHJ1ZVxufTtcblxuZXhwb3J0IGxldCBldmVudHM6e1tpbmRleDpzdHJpbmddOnN0cmluZ30gPSB7XG4gICAgb25SZW5kZXI6IFwicmVuZGVyXCIsXG4gICAgb25DbGljazogKCgnb250b3VjaGVuZCcgaW4gd2luZG93KSkgPyAndG91Y2hlbmQnIDogJ2NsaWNrJyxcbiAgICBvbkRibENsaWNrOiAnZGJsY2xpY2snLFxuXG4gICAgb25Nb3VzZURvd246ICdtb3VzZWRvd24nLFxuICAgIG9uTW91c2VVcDogJ21vdXNldXAnLFxuICAgIG9uTW91c2VNb3ZlOiAnbW91c2Vtb3ZlJyxcbiAgICBvbk1vdXNlRW50ZXI6ICdtb3VzZWVudGVyJyxcbiAgICBvbk1vdXNlTGVhdmU6ICdtb3VzZWxlYXZlJyxcbiAgICBvbk1vdXNlT3ZlcjogJ21vdXNlb3ZlcicsXG4gICAgb25Nb3VzZU91dDogJ21vdXNlb3V0JyxcblxuICAgIG9uVG91Y2hTdGFydDogJ3RvdWNoc3RhcnQnLFxuICAgIG9uVG91Y2hFbmQ6ICd0b3VjaGVuZCcsXG4gICAgb25Ub3VjaE1vdmU6ICd0b3VjaG1vdmUnLFxuICAgIG9uVG91Y2hDYW5jZWw6ICd0b3VjaGNhbmNlbCcsXG4gICAgb25Ub3VjaExlYXZlOiAndG91Y2hsZWF2ZScsXG5cbiAgICBvbkNvbnRleHRNZW51OiAnY29udGV4dG1lbnUnLFxuXG4gICAgb25JbnB1dDogJ2lucHV0JyxcbiAgICBvbkZvY3VzOiAnZm9jdXMnLFxuICAgIG9uQ2hhbmdlOiAnY2hhbmdlJyxcblxuICAgIG9uS2V5RG93bjogJ2tleWRvd24nLFxuICAgIG9uS2V5UHJlc3M6ICdrZXlwcmVzcycsXG4gICAgb25LZXlVcDogJ2tleXVwJ1xufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdHMvY29uc3QtYXR0cnMudHNcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9