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
	        this.text = null;
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
	    if (node instanceof node_1.VTagNode) {
	        node.dom = document.createElement(node.tag);
	        if (node.attrs) {
	            attrs_1.createAttrs(node);
	        }
	        parentDom.insertBefore(node.dom, beforeChild);
	        if (node.children && node.children.length == 1) {
	            utils_1.normChild(node, 0);
	            var child = node.children[0];
	            if (child instanceof node_1.VText) {
	                node.text = node.dom.textContent = child.text;
	                node.children = null;
	                return;
	            }
	        }
	    }
	    else if (node instanceof node_1.VText) {
	        node.dom = document.createTextNode(node.text);
	        parentDom.insertBefore(node.dom, beforeChild);
	        return;
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
	var utils_1 = __webpack_require__(5);
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
	        if (node.children && node.children.length == 1) {
	            utils_1.normChild(node, 0);
	            var child = node.children[0];
	            if (child instanceof node_1.VText) {
	                node.text = child.text;
	                if (node.text !== old.text) {
	                    node.dom.textContent = child.text;
	                }
	                node.children = null;
	                old.destroy();
	                return;
	            }
	        }
	        else if (old.text != null) {
	            old.dom.removeChild(old.dom.firstChild);
	        }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZmQ2NWE1MThiNWU3MjA5NTI4YjYiLCJ3ZWJwYWNrOi8vLy4vaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vdHMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vdHMvdG9wLWxldmVsLnRzIiwid2VicGFjazovLy8uL3RzL25vZGUudHMiLCJ3ZWJwYWNrOi8vLy4vdHMvYXBwZW5kLnRzIiwid2VicGFjazovLy8uL3RzL3V0aWxzLnRzIiwid2VicGFjazovLy8uL3RzL2NvbXBvbmVudC50cyIsIndlYnBhY2s6Ly8vLi90cy91cGRhdGUtY2hpbGRyZW4udHMiLCJ3ZWJwYWNrOi8vLy4vdHMvdXBkYXRlLnRzIiwid2VicGFjazovLy8uL3RzL3JlbW92ZS50cyIsIndlYnBhY2s6Ly8vLi90cy9hdHRycy50cyIsIndlYnBhY2s6Ly8vLi90cy9jb25zdC1hdHRycy50cyJdLCJuYW1lcyI6WyJBcHAiLCJBcHAuY29uc3RydWN0b3IiLCJBcHAuY2xpY2siLCJBcHAucmVuZGVyIiwiV293IiwiV293LmNvbnN0cnVjdG9yIiwiV293LmNsaWNrIiwiV293LnJlbmRlciIsInJlbmRlciIsInVwZGF0ZXIiLCJjcmVhdGVFbGVtZW50IiwiVk5vZGUiLCJWTm9kZS5jb25zdHJ1Y3RvciIsIlZOb2RlLmRlc3Ryb3kiLCJWRnJhZ21lbnQiLCJWRnJhZ21lbnQuY29uc3RydWN0b3IiLCJWQ29tcG9uZW50IiwiVkNvbXBvbmVudC5jb25zdHJ1Y3RvciIsIlZUYWdOb2RlIiwiVlRhZ05vZGUuY29uc3RydWN0b3IiLCJWVGFnTm9kZS5kZXN0cm95IiwiZ2V0VlRleHQiLCJWVGV4dCIsIlZUZXh0LmNvbnN0cnVjdG9yIiwiVlRleHQuZGVzdHJveSIsImFwcGVuZCIsIm5vcm1DaGlsZCIsIkNvbXBvbmVudCIsIkNvbXBvbmVudC5jb25zdHJ1Y3RvciIsIkNvbXBvbmVudC5jb21wb25lbnRXaWxsTW91bnQiLCJDb21wb25lbnQuY29tcG9uZW50RGlkTW91bnQiLCJDb21wb25lbnQuY29tcG9uZW50V2lsbFVwZGF0ZSIsIkNvbXBvbmVudC5jb21wb25lbnREaWRVcGRhdGUiLCJDb21wb25lbnQuY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyIsIkNvbXBvbmVudC5jb21wb25lbnRXaWxsVW5tb3VudCIsIkNvbXBvbmVudC5yZW5kZXIiLCJDb21wb25lbnQuZm9yY2VVcGRhdGUiLCJmaW5kRE9NTm9kZSIsImNyZWF0ZUNvbXBvbmVudCIsInVwZGF0ZUNvbXBvbmVudCIsInVwZGF0ZUNoaWxkcmVuIiwibW92ZSIsInVwZGF0ZSIsInJlcGxhY2VOb2RlIiwicmVtb3ZlIiwidXBkYXRlQXR0cnMiLCJjcmVhdGVBdHRycyIsInJlbW92ZUF0dHJzIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7OztBQ3RDQSxtQ0FBK0MsQ0FBWSxDQUFDO0FBRTVEO0tBQWtCQSx1QkFBU0E7S0FBM0JBO1NBQWtCQyw4QkFBU0E7U0FDdkJBLFlBQU9BLEdBQUdBLENBQUNBLENBQUNBO0tBZ0JoQkEsQ0FBQ0E7S0FkR0QsbUJBQUtBLEdBQUxBO1NBQ0lFLElBQUlBLENBQUNBLE9BQU9BLEVBQUVBLENBQUNBO1NBQ2ZBLElBQUlBLENBQUNBLFdBQVdBLEVBQUVBLENBQUNBO0tBQ3ZCQSxDQUFDQTtLQUVERixvQkFBTUEsR0FBTkE7U0FBQUcsaUJBUUNBO1NBUEdBLE1BQU1BLENBQUNBLHFCQUFhQSxDQUFDQSxLQUFLQSxFQUFFQSxFQUFDQSxLQUFLQSxFQUFFQSxJQUFJQSxDQUFDQSxPQUFPQSxFQUFDQSxFQUFFQSxPQUFPQSxFQUN0REEscUJBQWFBLENBQUNBLFFBQVFBLEVBQUVBLEVBQUNBLE9B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R0FBR0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsVUFBVUEsQ0FBQ0E7S0FDOUJBLGlCQUFTQSxDQUFDQSxJQUFJQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQTtLQUNuQkEsZUFBTUEsQ0FBQ0EsR0FBR0EsRUFBRUEsSUFBSUEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7S0FDckJBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO0FBQzVCQSxFQUFDQTtBQU5lLGdCQUFPLFVBTXRCO0FBR0Qsd0JBQThCLEdBQXVCLEVBQUUsS0FBVTtLQUM3REMsRUFBRUEsQ0FBQ0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7U0FDUkEsSUFBSUEsR0FBR0EsR0FBR0EsT0FBT0EsS0FBS0EsQ0FBQ0EsR0FBR0EsSUFBSUEsV0FBV0EsR0FBR0EsU0FBU0EsR0FBR0EsS0FBS0EsQ0FBQ0EsR0FBR0EsQ0FBQ0E7S0FFdEVBLENBQUNBO0tBQ0RBLElBQUlBLEdBQUdBLEdBQUdBLFNBQVNBLENBQUNBLE1BQU1BLENBQUNBO0tBQzNCQSxJQUFJQSxRQUFRQSxHQUFTQSxJQUFJQSxDQUFDQTtLQUMxQkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7U0FDVkEsUUFBUUEsR0FBR0EsS0FBS0EsQ0FBQ0EsR0FBR0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7U0FDMUJBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLEdBQUdBLEVBQUVBLENBQUNBLEVBQUVBLEVBQUVBLENBQUNBO2FBQzNCQSxRQUFRQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxTQUFTQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtTQUNuQ0EsQ0FBQ0E7S0FDTEEsQ0FBQ0E7S0FDREEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsR0FBR0EsQ0FB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LENBQUNBLFFBQVFBLENBQUNBLFFBQVFBLENBQUNBLENBQUNBO0tBQ3JDQSxFQUFFQSxDQUFDQSxDQUFDQSxPQUFPQSxJQUFJQSxDQUFDQSxHQUFHQSxLQUFLQSxXQUFXQSxDQUFDQSxDQUFDQSxDQUFDQTtTQUNsQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsT0FBT0EsTUFBTUEsQ0FBQ0EsTUFBTUEsSUFBSUEsV0FBV0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7YUFDdENBLE1BQU1BLENBQUNBLE1BQU1BLEdBQUdBLEVBQUVBO1NBQ3RCQSxDQUFDQTtTQUNEQSxNQUFNQSxDQUFDQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxRQUFRQSxDQUFDQTtLQUN2Q0EsQ0FBQ0E7S0FFREEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsWUFBWUEsZUFBUUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7U0FDM0JBLElBQUlBLENBQUNBLEdBQUdBLEdBQUdBLFFBQVFBLENBQUNBLGFBQWFBLENBQUNBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1NBQzVDQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQTthQUNiQSxtQkFBV0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7U0FDdEJBLENBQUNBO1NBQ0RBLFNBQVNBLENBQUNBLFlBQVlBLENBQUNBLElBQUlBLENBQUNBLEdBQUdBLEVBQUVBLFdBQVdBLENBQUNBLENBQUNBO1NBQzlDQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxRQUFRQSxJQUFJQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQSxNQUFNQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTthQUM3Q0EsaUJBQVNBLENBQUNBLElBQUlBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBO2FBQ25CQSxJQUFJQSxLQUFLQSxHQUFHQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTthQUM3QkEsRUFBRUEsQ0FB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Q0FBQ0E7S0FDMUNBLEVBQUVBLENBQUNBLENBQUNBLE9BQU9BLElBQUlBLElBQUlBLFFBQVFBLElBQUlBLElBQUlBLElBQUlBLElBQUlBLFlBQVlBLFlBQUtBLENBQUNBLENBQUNBLENBQUNBO1NBQzNEQSxNQUFNQSxDQUFDQTtLQUNYQSxDQUFDQTtLQUNEQSxFQUFFQSxDQUFDQSxDQUFDQSxPQUFPQSxJQUFJQSxJQUFJQSxRQUFRQSxJQUFJQSxPQUFPQSxJQUFJQSxJQUFJQSxRQUFRQSxDQUFDQSxDQUFDQSxDQUFDQTtTQUNyREEsTUFBTUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsR0FBR0EsZUFBUUEsQ0FBQ0EsSUFBSUEsR0FBR0EsRUFBRUEsQ0FBQ0EsQ0FBQ0E7U0FDaERBLE1BQU1BLENBQUNBO0tBQ1hBLENBQUNBO0tBQ0RBLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLElBQUlBLElBQUlBLENBQUNBLENBQUNBLENBQUNBO1NBQ2ZBLE1BQU1BLENBQUNBLFFBQVFBLENBQUNBLFFBQVFBLENBQUNBLEdBQUdBLGVBQVFBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBO1NBQ3pDQSxNQUFNQSxDQUFDQTtLQUNYQSxDQUFDQTtLQUNEQSxFQUFFQSxDQUFDQSxDQUFDQSxPQUFPQSxJQUFJQSxLQUFLQSxRQUFRQSxDQUFDQSxDQUFDQSxDQUFDQTtTQUMzQkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsWUFBWUEsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7YUFDeEJBLE1BQU1BLENBQUNBLFFBQVFBLENBQUNBLFFBQVFBLENBQUNBLEdBQUdBLElBQUlBLGdCQUFTQSxDQUFDQSxJQUFJQSxFQUFFQSxJQUFJQSxDQUFDQSxDQUFDQTtTQUMxREEsQ0FBQ0E7U0FDREEsSUFBSUEsQ0FBQ0EsQ0FBQ0E7YUFDRkEsTUFBTUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsR0FBR0EsZUFBUUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7U0FD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QUFDQTtpQkFDaEJBLE1BQU1BLEdBQUdBLENBQUNBLENBQUNBO2FBQ2ZBLENBQUNBO2FBRURBLEVBQUVBLENBQUNBLENBQUNBLE1BQU1BLElBQUlBLElBQUlBLENBQUNBLENBQUNBLENBQUNBO2lCQUNqQkEsUUFBUUEsRUFBRUEsQ0FBQ0E7aUJBQ1hBLGVBQU1BLENBQUNBLFdBQVdBLENBQUNBLE1BQU1BLENBQUNBLEVBQUVBLElBQUlBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBO2lCQUNyQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsTUFBTUEsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7cUJBQ2ZBLE9BQU9BLENBQUNBLE9BQU9BLENBQUNBLEdBQUdBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO2lCQUUvQkEsQ0FBQ0E7aUJBQ0RBLFdBQVdBLENBQUNBLE1BQU1BLENBQUNBLEdBQUdBLElBQUlBLENBQUNBO2FBQy9CQSxDQUFDQTthQUNEQSxJQUFJQSxDQUFDQSxDQUFDQTtpQkFDRkEsT0FBT0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsR0FBR0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7YUFFL0JBLENBQUNBO1NBQ0xBLENBQUNBO0tBQ0xBLENBQUNBO0tBRURBLEVBQUVBLENBQUNBLENBQUNBLFdBQVdBLElBQUlBLFdBQVdBLENBQUNBLE1BQU1BLEtBQUtBLFFBQVFBLENBQUNBLENBQUNBLENBQUNBO1NBQ2pEQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxXQUFXQSxDQUFDQSxNQUFNQSxFQUFFQSxDQUFDQSxFQUFFQSxFQUFFQSxDQUFDQTthQUMxQ0EsSUFBSUEsUUFBUUEsR0FBR0EsV0FBV0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7YUFDOUJBLEVBQUVBLENBQUNBLENBQUNBLFFBQVFBLENBQUNBLENBQUNBLENBQUNBO2lCQUNYQSxlQUFNQSxDQUFDQSxRQUFRQSxFQUFFQSxHQUFHQSxFQUFFQSxD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V0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7YUFDdENBLE1BQU1BLENBQUNBLE1BQU1BLEdBQUdBLEVBQUVBO1NBQ3RCQSxDQUFDQTtTQUNEQSxNQUFNQSxDQUFDQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxRQUFRQSxDQUFDQTtLQUN2Q0EsQ0FBQ0E7S0FFREEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsWUFBWUEsZUFBUUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7U0FDM0JBLEVBQUVBLENBQUNBLENBQVlBLEdBQUlBLENBQUNBLEdBQUdBLEtBQUtBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBO2FBQ25DQSxXQUFXQSxDQUFDQSxHQUFHQSxFQUFFQSxNQUFNQSxFQUFFQSxRQUFRQSxDQUFDQSxDQUFDQTthQUNuQ0EsTUFBTUEsQ0FBQ0E7U0FDWEEsQ0FBQ0E7U0FDREEsSUFBSUEsQ0FBQ0EsR0FBR0EsR0FBY0EsR0FBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0E7U0FFL0JBLG1CQUFXQSxDQUFXQSxHQUFHQSxFQUFFQSxNQUFNQSxFQUFFQSxRQUFRQSxDQUFDQSxDQUFDQTtTQUU3Q0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsUUFBUUEsSUFBSUEsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsTUFBTUEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7YUFDN0NBLGlCQUFTQSxDQUFDQSxJQUFJQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQTthQUNuQkEsSUFBSUEsS0FBS0EsR0FBR0EsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7YUFDN0JBLEVBQUVBLENBQUNBLENBQUNBLEtBQUtBLFlBQVlBLFlBQUtBLENBQUNBLENBQUNBLENBQUNBO2lCQUN6QkEsSUFBSUEsQ0FBQ0EsSUFBSUEsR0FBR0EsS0FBS0EsQ0FBQ0EsSUFBSUEsQ0FBQ0E7aUJBQ3ZCQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxJQUFJQSxLQUFnQkEsR0FBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7cUJBQ3JDQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxXQUFXQSxHQUFHQSxLQUFLQSxDQUFDQSxJQUFJQSxDQUFDQTtpQkFDdENBLENBQUNBO2lCQUNEQSxJQUFJQSxDQUFDQSxRQUFRQSxHQUFHQSxJQUFJQSxDQUFDQTtpQkFDckJBLEdBQUdBLENBQUNBLE9BQU9BLEVBQUVBLENBQUNBO2lCQUNkQSxNQUFNQSxDQUFDQTthQUNYQSxDQUFDQTtTQUNMQSxDQUFDQTtTQUNEQSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFZQSxHQUFJQSxDQUFDQSxJQUFJQSxJQUFJQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQTthQUNwQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsV0FBV0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsVUFBVUEsQ0FBQ0EsQ0FBQ0E7U0FDNUNBLENBQUNBO0tBQ0xBLENBQUNBO0tBQ0RBLElBQUlBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLFlBQVlBLGdCQUFTQSxDQUFDQSxDQUFDQSxDQUFDQTtTQUNqQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsWUFBWUEsaUJBQVVBLENBQUNBLENBQUNBLENBQUNBO2FBQzdCQSxFQUFFQSxDQUFDQSxDQUFjQSxHQUFJQSxDQUFDQSxJQUFJQSxLQUFLQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQTtpQkFDdkNBLFdBQVdBLENBQUNBLEdBQUdBLEVBQUVBLE1BQU1BLEVBQUVBLFFBQVFBLENBQUNBLENBQUNBO2lCQUNuQ0EsTUFBTUEsQ0FBQ0E7YUFDWEEsQ0FBQ0E7YUFDREEsMkJBQWVBLENBQWFBLEdBQUdBLEVBQUVBLE1BQU1BLEVBQUVBLFFBQVFBLENBQUNBLENBQUNBO2FBQ25EQSxNQUFNQSxDQUFDQTtTQUNYQSxDQUFDQTtTQUNEQSxJQUFJQSxDQUFDQSxRQUFRQSxHQUFlQSxHQUFJQSxDQUFDQSxRQUFRQSxDQUFDQTtTQUMxQ0EsSUFBSUEsQ0FBQ0EsU0FBU0EsR0FBZUEsR0FBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0E7U0FDNUNBLElBQUlBLENBQUNBLEdBQUdBLEdBQWVBLEdBQUlBLENBQUNBLEdBQUdBLENBQUNBO0tBQ3BDQSxDQUFDQTtLQUVEQSxnQ0FBY0EsQ0FBQ0EsR0FBR0EsRUFBRUEsSUFBSUEsQ0FBQ0EsQ0FBQ0E7S0FDMUJBLEdBQUdBLENBQUNBLE9BQU9BLEVBQUVBLENBQUNBO0FBQ2xCQSxFQUFDQTtBQWpFZSxlQUFNLFNBaUVyQjtBQUVELHNCQUE0QixHQUFTLEVBQUUsTUFBWSxFQUFFLFFBQWU7S0FDaEVDLGVBQU1BLENBQUNBLE1BQU1BLEVBQUVBLFFBQVFBLEVBQUVBLEdBQUdBLFlBQVlBLGdCQUFTQSxHQUFHQSxHQUFHQSxDQUFDQSxTQUFTQSxHQUFjQSxHQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtLQUN6RkEsZUFBTUEsQ0FBQ0EsR0FBR0EsRUFBRUEsTUFBTUEsQ0FBQ0EsQ0FBQ0E7QUFDeEJBLEVBQUNBO0FBSGUsb0JBQVcsY0FHMUI7Ozs7Ozs7QUM5RUQsa0NBQTRELENBQVEsQ0FBQztBQUtyRSxpQkFBdUIsSUFBVSxFQUFFLE1BQVksRUFBRSxRQUFnQixFQUFFLFVBQW1CO0tBQ2xGQyxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxZQUFZQSxpQkFBVUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7U0FDN0JBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLG9CQUFvQkEsRUFBRUEsQ0FBQ0E7S0FDMUNBLENBQUNBO0tBQ0RBLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLENBQUNBLENBQUNBO1NBQ2hCQSxJQUFJQSxJQUFJQSxHQUFHQSxVQUFVQSxJQUFJQSxDQUFDQSxDQUFDQSxJQUFJQSxZQUFZQSxnQkFBU0EsQ0FBQ0EsQ0FBQ0E7U0FDdERBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLE1BQU1BLEVBQUVBLENBQUNBLEVBQUVBLEVBQUVBLENBQUNBO2FBQzVDQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxJQUFJQSxFQUFFQSxDQUFDQSxFQUFFQSxJQUFJQSxDQUFDQSxDQUFDQTtTQUM1Q0EsQ0FBQ0E7S0FDTEEsQ0FBQ0E7S0FFREEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsVUFBVUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7U0FDZEEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsWUFBWUEsZ0JBQVNBLENBQUNBLENBQUNBLENBQUNBO2FBQzVCQSxNQUFNQSxDQUFDQSxHQUFHQSxDQUFDQSxXQUFXQSxDQUFDQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxDQUFDQTthQUN2Q0EsTUFBTUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsV0FBV0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsQ0FBQ0E7U0FDMUNBLENBQUNBO1NBQ0RBLElBQUlBLENBQUNBLENBQUNBO2FBQ0ZBLE1BQU1BLENBQUNBLEdBQUdBLENBQUNBLFdBQVdBLENBQUNBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1NBQ3JDQSxDQUFDQTtLQUNMQSxDQUFDQTtLQUNEQSxJQUFJQSxDQUFDQSxPQUFPQSxFQUFFQSxDQUFDQTtLQUNmQSxFQUFFQSxDQUFDQSxDQUFDQSxRQUFRQSxJQUFJQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQTtTQUNuQkEsTUFBTUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0E7S0FDckNBLENBQUNBO0FBQ0xBLEVBQUNBO0FBeEJlLGVBQU0sU0F3QnJCOzs7Ozs7O0FDekJELHlDQUFtQyxFQUFlLENBQUM7QUFDbkQsdUNBQW9CLENBQWEsQ0FBQztBQUVsQyxzQkFBNEIsR0FBWSxFQUFFLE1BQVksRUFBRSxRQUFlO0tBQ25FQyxJQUFJQSxJQUFJQSxHQUFhQSxNQUFNQSxDQUFDQSxRQUFRQSxDQUFDQSxRQUFRQSxDQUFDQSxDQUFDQTtLQUMvQ0EsSUFBSUEsR0FBR0EsR0FBR0EsSUFBSUEsQ0FBQ0E7S0FDZkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7U0FDYkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7YUFDWkEsV0FBV0EsQ0FBQ0EsSUFBSUEsRUFBRUEsR0FBR0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0Esd0JBQXdCQTthQUN0REEsR0FBR0EsR0FBR0EsR0FBR0EsQ0FBQ0EsU0FBU0EsS0FBS0EsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0E7U0FDM0NBLENBQUNBO1NBQ0RBLElBQUlBLENBQUNBLENBQUNBO2FBQ0ZBLEdBQUdBLEdBQUdBLEtBQUtBLENBQUNBO1NBQ2hCQSxDQUFDQTtLQUNMQSxDQUFDQTtLQUNEQSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQTtTQUNqQkEsR0FBR0EsR0FBR0EsS0FBS0EsQ0FBQ0E7S0FDaEJBLENBQUNBO0tBQ0RBLEVBQUVBLENBQUNBLENBQUNBLEdBQUdBLEtBQUtBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBO1NBQ2hCQSxXQUFXQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtTQUNqQkEsV0FBV0EsQ0FBQ0EsSUFBSUEsRUFBRUEsR0FBR0EsQ0FBQ0EsQ0FBQ0E7S0FDM0JBLENBQUNBO0FBQ0xBLEVBQUNBO0FBbkJlLG9CQUFXLGNBbUIxQjtBQUdELHNCQUE0QixJQUFhLEVBQUUsUUFBYTtLQUNwREMsSUFBSUEsR0FBR0EsR0FBT0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0E7S0FDdkJBLElBQUlBLElBQVdBLENBQUNBO0tBQ2hCQSxJQUFJQSxJQUFXQSxDQUFDQTtLQUNoQkEsSUFBSUEsS0FBWUEsQ0FBQ0E7S0FDakJBLElBQUlBLENBQUNBLFNBQVNBLEdBQUdBLEVBQUVBLENBQUNBO0tBQ3BCQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxRQUFRQSxJQUFJQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQTtTQUM5QkEsSUFBSUEsQ0FBQ0EsU0FBU0EsSUFBSUEsUUFBUUEsQ0FBQ0E7U0FDM0JBLElBQUlBLE9BQU9BLEdBQUdBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLFFBQVFBLENBQUNBLENBQUNBO1NBQ25DQSxFQUFFQSxDQUFDQSxDQUFDQSxRQUFRQSxJQUFJQSxLQUFLQSxJQUFJQSxDQUFDQSxRQUFRQSxJQUFJQSxRQUFRQSxDQUFDQSxRQUFRQSxDQUFDQSxLQUFLQSxPQUFPQSxJQUFJQSxRQUFRQSxLQUFLQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTthQUMxRkEsUUFBUUEsQ0FBQ0E7U0FDYkEsQ0FBQ0E7U0FDREEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsR0FBR0EsbUJBQUtBLENBQUNBLFFBQVFBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO2FBQ3pCQSxFQUFFQSxDQUFDQSxDQUFDQSxPQUFPQSxJQUFJQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQTtpQkFDbEJBLEdBQUdBLENBQUNBLElBQUlBLENBQUNBLEdBQUdBLEVBQUVBLENBQUNBO2FBQ25CQSxDQUFDQTthQUNEQSxJQUFJQSxDQUFDQSxDQUFDQTtpQkFDRkEsR0FBR0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsT0FBT0EsQ0FBQ0E7YUFDeEJBLENBQUNBO1NBQ0xBLENBQUNBO1NBQ0RBLElBQUlBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLEdBQUdBLG1CQUFLQSxDQUFDQSxRQUFRQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTthQUM5QkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsT0FBT0EsSUFBSUEsSUFBSUEsSUFBSUEsT0FBT0EsS0FBS0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7aUJBQ3ZDQSxHQUFHQSxDQUFDQSxlQUFlQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTthQUM5QkEsQ0FBQ0E7YUFDREEsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsT0FBT0EsT0FBT0EsS0FBS0EsUUFBUUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7aUJBQ25DQSxHQUFHQSxDQUFDQSxZQUFZQSxDQUFDQSxJQUFJQSxFQUFFQSxPQUFPQSxDQUFDQSxDQUFDQTthQUNwQ0EsQ0FBQ0E7U0FDTEEsQ0FBQ0E7U0FDREEsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsS0FBS0EsR0FBR0Esb0JBQU1BLENBQUNBLFFBQVFBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO2FBQ2hDQSxHQUFHQSxDQUFDQSxJQUFJQSxHQUFHQSxLQUFLQSxDQUFDQSxHQUFHQSxPQUFPQSxDQUFDQTtTQUNoQ0EsQ0FBQ0E7U0FDREEsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsUUFBUUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsS0FBS0EsR0FBR0EsSUFBSUEsUUFBUUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsS0FBS0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7YUFDbERBLEtBQUtBLEdBQUdBLFFBQVFBLENBQUNBLFNBQVNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLFdBQVdBLEVBQUVBLENBQUNBO2FBQzVDQSxHQUFHQSxDQUFDQSxJQUFJQSxHQUFHQSxLQUFLQSxDQUFDQSxHQUFHQSxPQUFPQSxDQUFDQTtTQUNoQ0EsQ0FBQ0E7U0FDREEsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsUUFBUUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsS0FBS0EsR0FBR0EsSUFBSUEsUUFBUUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsS0FBS0EsR0FBR0EsSUFBSUEsUUFBUUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsS0FBS0EsR0FBR0EsSUFBSUEsUUFBUUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsS0FBS0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7YUFFaEdBLEVBQUVBLENBQUNBLENBQUNBLE9B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ZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCBmZDY1YTUxOGI1ZTcyMDk1MjhiNlxuICoqLyIsImltcG9ydCB7cmVuZGVyLCBjcmVhdGVFbGVtZW50LCBDb21wb25lbnR9IGZyb20gJy4vdHMvaW5kZXgnO1xuXG5jbGFzcyBBcHAgZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIGNvdW50ZXIgPSAwO1xuXG4gICAgY2xpY2soKSB7XG4gICAgICAgIHRoaXMuY291bnRlcisrO1xuICAgICAgICB0aGlzLmZvcmNlVXBkYXRlKCk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gY3JlYXRlRWxlbWVudCgnZGl2Jywge3RpdGxlOiB0aGlzLmNvdW50ZXJ9LCAnSGVsbG8nLFxuICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnYnV0dG9uJywge29uQ2xpY2s6ICgpPT50aGlzLmNsaWNrKCl9LCAnU3VwZXJDbGljaycpLFxuICAgICAgICAgICAgdGhpcy5jb3VudGVyLFxuICAgICAgICAgICAgdGhpcy5jb3VudGVyICUgMiA/XG4gICAgICAgICAgICAgICAgY3JlYXRlRWxlbWVudChXb3cpXG4gICAgICAgICAgICAgICAgOiBbMSwyLDNdXG4gICAgICAgICk7XG4gICAgfVxufVxuXG5jbGFzcyBXb3cgZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIGNvdW50ZXIgPSAwO1xuXG4gICAgY2xpY2soKSB7XG4gICAgICAgIHRoaXMuY291bnRlcisrO1xuICAgICAgICB0aGlzLmZvcmNlVXBkYXRlKCk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gY3JlYXRlRWxlbWVudCgnZGl2Jywge2lkOiB0aGlzLmNvdW50ZXJ9LFxuICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnYnV0dG9uJywge29uQ2xpY2s6ICgpPT50aGlzLmNsaWNrKCl9LCAnQ2xpY2snKSxcbiAgICAgICAgICAgICdXb3cnLCBbMSwgMiwgM10sIFs0LCA1LCA2XSwgdGhpcy5jb3VudGVyKTtcbiAgICB9XG59XG5cbnJlbmRlcihjcmVhdGVFbGVtZW50KEFwcCksIGRvY3VtZW50LmJvZHkpO1xuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2luZGV4LnRzXG4gKiovIiwiaW1wb3J0IHtyZW5kZXIsIGNyZWF0ZUVsZW1lbnQsIENvbXBvbmVudCwgZmluZERPTU5vZGUsIHVwZGF0ZXJ9IGZyb20gJy4vdG9wLWxldmVsJztcbmV4cG9ydCB7cmVuZGVyLCBjcmVhdGVFbGVtZW50LCBDb21wb25lbnQsIGZpbmRET01Ob2RlfTtcbig8YW55PndpbmRvdykuRmFzdFJlYWN0ID0ge1xuICAgIHJlbmRlciwgY3JlYXRlRWxlbWVudCwgQ29tcG9uZW50LCBmaW5kRE9NTm9kZSwgdXBkYXRlOiB1cGRhdGVyXG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdHMvaW5kZXgudHNcbiAqKi8iLCJpbXBvcnQge1ZUZXh0LCBWVGFnTm9kZSwgVk5vZGUsIFZDb21wb25lbnQsIFZGcmFnbWVudH0gZnJvbSAnLi9ub2RlJztcbmltcG9ydCB7SUNvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnQnO1xuaW1wb3J0IHthcHBlbmR9IGZyb20gJy4vYXBwZW5kJztcbmltcG9ydCB7dXBkYXRlfSBmcm9tICcuL3VwZGF0ZSc7XG5pbXBvcnQge25vcm1DaGlsZH0gZnJvbSAnLi91dGlscyc7XG5cbmV4cG9ydCB7Q29tcG9uZW50LCBmaW5kRE9NTm9kZX0gZnJvbSAnLi9jb21wb25lbnQnO1xuXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyKG5vZGU6Vk5vZGUsIGRvbTpOb2RlKSB7XG4gICAgdmFyIHJvb3QgPSBuZXcgVlRhZ05vZGUobnVsbCwgbnVsbCwgW25vZGVdLCBudWxsKTtcbiAgICByb290LmRvbSA9IGRvbTtcbiAgICBub3JtQ2hpbGQocm9vdCwgMCk7XG4gICAgYXBwZW5kKHJvb3QsIDApO1xuICAgIHJldHVybiBub2RlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlcihvbGQ6Vk5vZGUsIG5vZGU6Vk5vZGUpIHtcbiAgICB2YXIgcm9vdCA9IG5ldyBWVGFnTm9kZShudWxsLCBudWxsLCBbbm9kZV0sIG51bGwpO1xuICAgIHJvb3QuZG9tID0gb2xkLmRvbS5wYXJlbnROb2RlO1xuICAgIG5vcm1DaGlsZChyb290LCAwKTtcbiAgICB1cGRhdGUob2xkLCByb290LCAwKTtcbiAgICByZXR1cm4gcm9vdC5jaGlsZHJlblswXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQodGFnOnN0cmluZyB8IElDb21wb25lbnQsIGF0dHJzPzphbnksIC4uLmNoaWxkcmVuOmFueVtdKTpWTm9kZTtcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVFbGVtZW50KHRhZzpzdHJpbmcgfCBJQ29tcG9uZW50LCBhdHRycz86YW55KTpWTm9kZSB7XG4gICAgaWYgKGF0dHJzKSB7XG4gICAgICAgIHZhciBrZXkgPSB0eXBlb2YgYXR0cnMua2V5ID09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogYXR0cnMua2V5O1xuICAgICAgICAvL3ZhciByZWYgPSB0eXBlb2YgYXR0cnMucmVmID09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogYXR0cnMucmVmO1xuICAgIH1cbiAgICB2YXIgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICB2YXIgY2hpbGRyZW46YW55W10gPSBudWxsO1xuICAgIGlmIChsZW4gPiAyKSB7XG4gICAgICAgIGNoaWxkcmVuID0gQXJyYXkobGVuIC0gMik7XG4gICAgICAgIGZvciAodmFyIGkgPSAyOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIGNoaWxkcmVuW2kgLSAyXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAodGFnID09ICdAJykge1xuICAgICAgICByZXR1cm4gbmV3IFZGcmFnbWVudChjaGlsZHJlbiwga2V5KTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiB0YWcgPT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBWVGFnTm9kZSg8c3RyaW5nPnRhZywgYXR0cnMsIGNoaWxkcmVuLCBrZXkpO1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgdGFnID09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBWQ29tcG9uZW50KDxJQ29tcG9uZW50PnRhZywgYXR0cnMsIGNoaWxkcmVuLCBrZXkpO1xuICAgIH1cbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3RzL3RvcC1sZXZlbC50c1xuICoqLyIsImltcG9ydCB7SUNvbXBvbmVudCwgQ29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudCc7XG5cbnZhciBpZCA9IDE7XG5cbmV4cG9ydCBjbGFzcyBWTm9kZSB7XG4gICAgaWQ6bnVtYmVyO1xuICAgIGNoaWxkcmVuOlZOb2RlW107XG4gICAga2V5TWFwOntbaW5kZXg6IHN0cmluZ106bnVtYmVyfTtcbiAgICBrZXk6c3RyaW5nO1xuICAgIGRlc3Ryb3llZDpib29sZWFuO1xuICAgIGRvbTpOb2RlO1xuICAgIHJlZjpzdHJpbmc7XG5cbiAgICBkZXN0cm95KCkge1xuICAgICAgICAvKlxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRlc3Ryb3llZCkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBcIk5vZGUgeWV0IGRlc3Ryb3llZFwiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmRlc3Ryb3llZCA9IHRydWU7XG4gICAgICAgICovXG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgVkZyYWdtZW50IGV4dGVuZHMgVk5vZGUge1xuICAgIGxhc3ROb2RlOk5vZGU7XG4gICAgZmlyc3ROb2RlOk5vZGU7XG5cbiAgICBjb25zdHJ1Y3RvcihjaGlsZHJlbjpWTm9kZVtdLCBrZXk6c3RyaW5nKSB7XG4gICAgICAgIGlmIChmYWxzZSkge1xuICAgICAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmlkID0gaWQrKztcbiAgICAgICAgdGhpcy5kb20gPSBudWxsO1xuICAgICAgICB0aGlzLmxhc3ROb2RlID0gbnVsbDtcbiAgICAgICAgdGhpcy5maXJzdE5vZGUgPSBudWxsO1xuICAgICAgICB0aGlzLmNoaWxkcmVuID0gY2hpbGRyZW47XG4gICAgICAgIHRoaXMua2V5ID0ga2V5O1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFZDb21wb25lbnQgZXh0ZW5kcyBWRnJhZ21lbnQge1xuICAgIGF0dHJzOmFueTtcbiAgICAvL3RvZG9cbiAgICBjb21wb25lbnQ6Q29tcG9uZW50O1xuICAgIGN0b3I6SUNvbXBvbmVudDtcblxuICAgIGNvbnN0cnVjdG9yKGN0b3I6SUNvbXBvbmVudCwgYXR0cnM6YW55LCBjaGlsZHJlbjpWTm9kZVtdLCBrZXk6c3RyaW5nKSB7XG4gICAgICAgIGlmIChmYWxzZSkge1xuICAgICAgICAgICAgc3VwZXIobnVsbCwgbnVsbCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pZCA9IGlkKys7XG4gICAgICAgIHRoaXMuZG9tID0gbnVsbDtcbiAgICAgICAgdGhpcy5sYXN0Tm9kZSA9IG51bGw7XG4gICAgICAgIHRoaXMuZmlyc3ROb2RlID0gbnVsbDtcbiAgICAgICAgdGhpcy5jdG9yID0gY3RvcjtcbiAgICAgICAgdGhpcy5hdHRycyA9IGF0dHJzO1xuICAgICAgICB0aGlzLmNoaWxkcmVuID0gY2hpbGRyZW47XG4gICAgICAgIHRoaXMua2V5ID0ga2V5O1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFZUYWdOb2RlIGV4dGVuZHMgVk5vZGUge1xuICAgIGF0dHJzOmFueTtcbiAgICBhdHRyc0NvZGU6c3RyaW5nO1xuICAgIHRhZzpzdHJpbmc7XG4gICAgdGV4dDpzdHJpbmc7XG5cbiAgICBjb25zdHJ1Y3Rvcih0YWc6c3RyaW5nLCBhdHRyczphbnksIGNoaWxkcmVuOlZOb2RlW10sIGtleTpzdHJpbmcpIHtcbiAgICAgICAgaWYgKGZhbHNlKSB7XG4gICAgICAgICAgICBzdXBlcigpO1xuICAgICAgICB9XG4gICAgICAgIC8vdGhpcy5pZCA9IGlkKys7XG4gICAgICAgIHRoaXMuZG9tID0gbnVsbDtcbiAgICAgICAgdGhpcy50YWcgPSB0YWc7XG4gICAgICAgIHRoaXMudGV4dCA9IG51bGw7XG4gICAgICAgIHRoaXMuYXR0cnMgPSBhdHRycztcbiAgICAgICAgdGhpcy5hdHRyc0NvZGUgPSAnJztcbiAgICAgICAgdGhpcy5jaGlsZHJlbiA9IGNoaWxkcmVuO1xuICAgICAgICB0aGlzLmtleSA9IGtleTtcbiAgICB9XG5cbiAgICBkZXN0cm95KCkge1xuICAgICAgICB0aGlzLmRvbSA9IG51bGw7XG4gICAgICAgIHRoaXMuYXR0cnMgPSBudWxsO1xuICAgICAgICB0aGlzLmNoaWxkcmVuID0gbnVsbDtcbiAgICB9XG59XG5cbnZhciB0ZXh0Q2FjaGUgPSA8YW55Pm5ldyBBcnJheSgxMDAwMDApO1xudGV4dENhY2hlLmxlbiA9IDA7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRWVGV4dCh0ZXh0OnN0cmluZykge1xuICAgIGlmICh0ZXh0Q2FjaGUubGVuID4gMCkge1xuICAgICAgICB2YXIgaXRlbSA9IHRleHRDYWNoZVstLXRleHRDYWNoZS5sZW5dO1xuICAgICAgICBpdGVtLnRleHQgPSB0ZXh0O1xuICAgICAgICByZXR1cm4gaXRlbTtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBWVGV4dCh0ZXh0KTtcbn1cblxuZXhwb3J0IGNsYXNzIFZUZXh0IGV4dGVuZHMgVk5vZGUge1xuICAgIHRleHQ6c3RyaW5nO1xuXG4gICAgY29uc3RydWN0b3IodGV4dDpzdHJpbmcpIHtcbiAgICAgICAgaWYgKGZhbHNlKSB7XG4gICAgICAgICAgICBzdXBlcigpO1xuICAgICAgICB9XG4gICAgICAgIC8vdGhpcy5pZCA9IGlkKys7XG4gICAgICAgIHRoaXMuZG9tID0gbnVsbDtcbiAgICAgICAgdGhpcy50ZXh0ID0gdGV4dDtcbiAgICB9XG5cbiAgICBkZXN0cm95KCkge1xuICAgICAgICAvL3RoaXMuZG9tID0gbnVsbDtcbiAgICAgICAgdGV4dENhY2hlW3RleHRDYWNoZS5sZW4rK10gPSB0aGlzO1xuICAgIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdHMvbm9kZS50c1xuICoqLyIsImltcG9ydCB7VlRleHQsIFZUYWdOb2RlLCBWTm9kZSwgVkNvbXBvbmVudCwgVkZyYWdtZW50fSBmcm9tICcuL25vZGUnO1xuaW1wb3J0IHtub3JtQ2hpbGR9IGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0IHtjcmVhdGVDb21wb25lbnR9IGZyb20gJy4vY29tcG9uZW50JztcbmltcG9ydCB7Y3JlYXRlQXR0cnN9IGZyb20gJy4vYXR0cnMnO1xuZXhwb3J0IGZ1bmN0aW9uIGFwcGVuZChwYXJlbnQ6Vk5vZGUsIGNoaWxkUG9zOm51bWJlciwgYmVmb3JlQ2hpbGQ/Ok5vZGUpIHtcbiAgICBpZiAoYmVmb3JlQ2hpbGQgPT0gbnVsbCAmJiBwYXJlbnQgaW5zdGFuY2VvZiBWRnJhZ21lbnQpIHtcbiAgICAgICAgYmVmb3JlQ2hpbGQgPSBwYXJlbnQubGFzdE5vZGU7XG4gICAgfVxuICAgIGxldCBwYXJlbnREb20gPSBwYXJlbnQuZG9tO1xuICAgIGxldCBub2RlID0gcGFyZW50LmNoaWxkcmVuW2NoaWxkUG9zXTtcbiAgICBpZiAodHlwZW9mIG5vZGUua2V5ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBpZiAodHlwZW9mIHBhcmVudC5rZXlNYXAgPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHBhcmVudC5rZXlNYXAgPSB7fVxuICAgICAgICB9XG4gICAgICAgIHBhcmVudC5rZXlNYXBbbm9kZS5rZXldID0gY2hpbGRQb3M7XG4gICAgfVxuXG4gICAgaWYgKG5vZGUgaW5zdGFuY2VvZiBWVGFnTm9kZSkge1xuICAgICAgICBub2RlLmRvbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQobm9kZS50YWcpO1xuICAgICAgICBpZiAobm9kZS5hdHRycykge1xuICAgICAgICAgICAgY3JlYXRlQXR0cnMobm9kZSk7XG4gICAgICAgIH1cbiAgICAgICAgcGFyZW50RG9tLmluc2VydEJlZm9yZShub2RlLmRvbSwgYmVmb3JlQ2hpbGQpO1xuICAgICAgICBpZiAobm9kZS5jaGlsZHJlbiAmJiBub2RlLmNoaWxkcmVuLmxlbmd0aCA9PSAxKSB7XG4gICAgICAgICAgICBub3JtQ2hpbGQobm9kZSwgMCk7XG4gICAgICAgICAgICB2YXIgY2hpbGQgPSBub2RlLmNoaWxkcmVuWzBdO1xuICAgICAgICAgICAgaWYgKGNoaWxkIGluc3RhbmNlb2YgVlRleHQpe1xuICAgICAgICAgICAgICAgIG5vZGUudGV4dCA9IG5vZGUuZG9tLnRleHRDb250ZW50ID0gY2hpbGQudGV4dDtcbiAgICAgICAgICAgICAgICBub2RlLmNoaWxkcmVuID0gbnVsbDtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAobm9kZSBpbnN0YW5jZW9mIFZUZXh0KSB7XG4gICAgICAgIG5vZGUuZG9tID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUobm9kZS50ZXh0KTtcbiAgICAgICAgcGFyZW50RG9tLmluc2VydEJlZm9yZShub2RlLmRvbSwgYmVmb3JlQ2hpbGQpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGVsc2UgaWYgKG5vZGUgaW5zdGFuY2VvZiBWRnJhZ21lbnQpIHtcbiAgICAgICAgbm9kZS5kb20gPSBwYXJlbnREb207XG4gICAgICAgIGxldCB0eHQgPSBub2RlIGluc3RhbmNlb2YgVkNvbXBvbmVudCA/ICg8YW55Pm5vZGUuY3RvcikubmFtZSArICc6JyArIG5vZGUuaWQgOiAnIyc7XG4gICAgICAgIG5vZGUuZmlyc3ROb2RlID0gZG9jdW1lbnQuY3JlYXRlQ29tbWVudCgnICcgKyB0eHQgKyAnICcpO1xuICAgICAgICBub2RlLmxhc3ROb2RlID0gZG9jdW1lbnQuY3JlYXRlQ29tbWVudCgnIDonICsgdHh0ICsgJyAnKTtcbiAgICAgICAgKDxhbnk+bm9kZS5maXJzdE5vZGUpLnNraXAgPSB0cnVlO1xuICAgICAgICAoPGFueT5ub2RlLmxhc3ROb2RlKS5za2lwID0gdHJ1ZTtcbiAgICAgICAgcGFyZW50RG9tLmluc2VydEJlZm9yZShub2RlLmZpcnN0Tm9kZSwgYmVmb3JlQ2hpbGQpO1xuICAgICAgICBwYXJlbnREb20uaW5zZXJ0QmVmb3JlKG5vZGUubGFzdE5vZGUsIGJlZm9yZUNoaWxkKTtcblxuICAgICAgICBpZiAobm9kZSBpbnN0YW5jZW9mIFZDb21wb25lbnQpIHtcbiAgICAgICAgICAgIGNyZWF0ZUNvbXBvbmVudChub2RlKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlmIChub2RlLmNoaWxkcmVuKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbm9kZS5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbm9ybUNoaWxkKG5vZGUsIGkpO1xuICAgICAgICAgICAgYXBwZW5kKG5vZGUsIGkpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90cy9hcHBlbmQudHNcbiAqKi8iLCJpbXBvcnQge1ZUZXh0LCBWVGFnTm9kZSwgVk5vZGUsIFZDb21wb25lbnQsIFZGcmFnbWVudCwgZ2V0VlRleHR9IGZyb20gJy4vbm9kZSc7XG5leHBvcnQgZnVuY3Rpb24gbm9ybUNoaWxkKHBhcmVudDpWTm9kZSwgY2hpbGRQb3M6bnVtYmVyKSB7XG4gICAgdmFyIG5vZGUgPSA8YW55PnBhcmVudC5jaGlsZHJlbltjaGlsZFBvc107XG4gICAgaWYgKHR5cGVvZiBub2RlID09ICdvYmplY3QnICYmIG5vZGUgJiYgbm9kZSBpbnN0YW5jZW9mIFZOb2RlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBub2RlID09ICdzdHJpbmcnIHx8IHR5cGVvZiBub2RlID09ICdudW1iZXInKSB7XG4gICAgICAgIHBhcmVudC5jaGlsZHJlbltjaGlsZFBvc10gPSBnZXRWVGV4dChub2RlICsgJycpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChub2RlID09IG51bGwpIHtcbiAgICAgICAgcGFyZW50LmNoaWxkcmVuW2NoaWxkUG9zXSA9IGdldFZUZXh0KCcnKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIG5vZGUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIGlmIChub2RlIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgIHBhcmVudC5jaGlsZHJlbltjaGlsZFBvc10gPSBuZXcgVkZyYWdtZW50KG5vZGUsIG51bGwpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcGFyZW50LmNoaWxkcmVuW2NoaWxkUG9zXSA9IGdldFZUZXh0KEpTT04uc3RyaW5naWZ5KG5vZGUpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0eXBlb2Ygbm9kZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBwYXJlbnQuY2hpbGRyZW5bY2hpbGRQb3NdID0gZ2V0VlRleHQoJ0Z1bmN0aW9uJyk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcGFyZW50LmNoaWxkcmVuW2NoaWxkUG9zXSA9IGdldFZUZXh0KCcnKTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdHMvdXRpbHMudHNcbiAqKi8iLCJpbXBvcnQge1ZUZXh0LCBWVGFnTm9kZSwgVk5vZGUsIFZDb21wb25lbnQsIFZGcmFnbWVudH0gZnJvbSAnLi9ub2RlJztcbmltcG9ydCB7YXBwZW5kfSBmcm9tICcuL2FwcGVuZCc7XG5pbXBvcnQge3VwZGF0ZX0gZnJvbSAnLi91cGRhdGUnO1xuaW1wb3J0IHt1cGRhdGVDaGlsZHJlbn0gZnJvbSAnLi91cGRhdGUtY2hpbGRyZW4nO1xuaW1wb3J0IHtub3JtQ2hpbGR9IGZyb20gJy4vdXRpbHMnO1xuZXhwb3J0IGxldCBnbG9iczp7Y29tcG9uZW50OiBDb21wb25lbnR9ID0ge2NvbXBvbmVudDogbnVsbH07XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUNvbXBvbmVudCB7XG4gICAgbmV3KHByb3BzOmFueSk6IENvbXBvbmVudDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBQcm9wcyB7XG4gICAgY2hpbGRyZW46IFZOb2RlW107XG59XG5cbmV4cG9ydCBjbGFzcyBDb21wb25lbnQge1xuICAgIG5vZGU6VkNvbXBvbmVudDtcbiAgICBwcm9wczpQcm9wcztcbiAgICByZWZzOntbaW5kZXg6IHN0cmluZ106IFZOb2RlfTtcblxuICAgIGNvbnN0cnVjdG9yKHByb3BzOlByb3BzKSB7XG4gICAgICAgIHRoaXMucHJvcHMgPSBwcm9wcztcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsTW91bnQoKSB7XG5cbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcblxuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxVcGRhdGUoKSB7XG5cbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRVcGRhdGUoKSB7XG5cbiAgICB9XG5cbiAgICAvL3RvZG9cbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKHByb3BzOlByb3BzKSB7XG5cbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcblxuICAgIH1cblxuICAgIHJlbmRlcigpOlZOb2RlIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgZm9yY2VVcGRhdGUoKSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50V2lsbFVwZGF0ZSgpO1xuXG4gICAgICAgIHZhciBjaGlsZHJlbiA9IFt0aGlzLnJlbmRlcigpXTtcbiAgICAgICAgdmFyIHRlbXAgPSBuZXcgVkNvbXBvbmVudChudWxsLCBudWxsLCBjaGlsZHJlbiwgbnVsbCk7XG4gICAgICAgIHRlbXAuZmlyc3ROb2RlID0gdGhpcy5ub2RlLmZpcnN0Tm9kZTtcbiAgICAgICAgdGVtcC5sYXN0Tm9kZSA9IHRoaXMubm9kZS5sYXN0Tm9kZTtcbiAgICAgICAgdGVtcC5kb20gPSB0aGlzLm5vZGUuZG9tO1xuICAgICAgICBsZXQgcHJldkNvbXBvbmVudCA9IGdsb2JzLmNvbXBvbmVudDtcbiAgICAgICAgZ2xvYnMuY29tcG9uZW50ID0gdGhpcztcbiAgICAgICAgdXBkYXRlQ2hpbGRyZW4odGhpcy5ub2RlLCB0ZW1wKTsgLy8gY2xlYXIgdGhpcy5ub2RlLmNoaWxkcmVuXG4gICAgICAgIGdsb2JzLmNvbXBvbmVudCA9IHByZXZDb21wb25lbnQ7XG4gICAgICAgIHRoaXMubm9kZS5jaGlsZHJlbiA9IHRlbXAuY2hpbGRyZW47XG4gICAgICAgIHRoaXMuY29tcG9uZW50RGlkVXBkYXRlKCk7XG4gICAgICAgIC8vdGVtcC5kZXN0cm95KCk7XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZmluZERPTU5vZGUobm9kZTpWVGFnTm9kZSB8IFZUZXh0KSB7XG4gICAgcmV0dXJuIG5vZGUuZG9tO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQ29tcG9uZW50KG5vZGU6VkNvbXBvbmVudCkge1xuICAgIHZhciBwcm9wcyA9IG5vZGUuYXR0cnMgfHwge307XG4gICAgcHJvcHMuY2hpbGRyZW4gPSBub2RlLmNoaWxkcmVuO1xuICAgIHZhciBjb21wb25lbnQgPSBuZXcgbm9kZS5jdG9yKHByb3BzKTtcbiAgICBjb21wb25lbnQubm9kZSA9IG5vZGU7XG4gICAgbm9kZS5jb21wb25lbnQgPSBjb21wb25lbnQ7XG4gICAgY29tcG9uZW50LmNvbXBvbmVudFdpbGxNb3VudCgpO1xuICAgIG5vZGUuY2hpbGRyZW4gPSBbY29tcG9uZW50LnJlbmRlcigpXTtcbiAgICBsZXQgcHJldkNvbXBvbmVudCA9IGdsb2JzLmNvbXBvbmVudDtcbiAgICBnbG9icy5jb21wb25lbnQgPSBjb21wb25lbnQ7XG4gICAgaWYgKG5vZGUuY2hpbGRyZW4pIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBub2RlLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBub3JtQ2hpbGQobm9kZSwgaSk7XG4gICAgICAgICAgICBhcHBlbmQobm9kZSwgaSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2xvYnMuY29tcG9uZW50ID0gcHJldkNvbXBvbmVudDtcbiAgICBub2RlLmNvbXBvbmVudC5jb21wb25lbnREaWRNb3VudCgpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlQ29tcG9uZW50KG9sZDpWQ29tcG9uZW50LCBwYXJlbnQ6Vk5vZGUsIGNoaWxkUG9zOm51bWJlcikge1xuICAgIHZhciBuZXdOb2RlID0gPFZDb21wb25lbnQ+cGFyZW50LmNoaWxkcmVuW2NoaWxkUG9zXTtcbiAgICB2YXIgcHJvcHMgPSBuZXdOb2RlLmF0dHJzIHx8IHt9O1xuICAgIHByb3BzLmNoaWxkcmVuID0gbmV3Tm9kZS5jaGlsZHJlbjtcbiAgICBvbGQuY29tcG9uZW50LmNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMocHJvcHMpO1xuICAgIG9sZC5jb21wb25lbnQucHJvcHMgPSBwcm9wcztcbiAgICBvbGQuY29tcG9uZW50LmZvcmNlVXBkYXRlKCk7XHQgLy8gYWZmZWN0IG5vZGUgY2hpbGRyZW5cbiAgICBwYXJlbnQuY2hpbGRyZW5bY2hpbGRQb3NdID0gb2xkO1xuICAgIG5ld05vZGUuZGVzdHJveSgpO1xuICAgIC8vbm8gZGVzdHJveSBvbGRcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdHMvY29tcG9uZW50LnRzXG4gKiovIiwiaW1wb3J0IHtWVGV4dCwgVlRhZ05vZGUsIFZOb2RlLCBWQ29tcG9uZW50LCBWRnJhZ21lbnR9IGZyb20gJy4vbm9kZSc7XG5pbXBvcnQge2FwcGVuZH0gZnJvbSAnLi9hcHBlbmQnO1xuaW1wb3J0IHt1cGRhdGV9IGZyb20gJy4vdXBkYXRlJztcbmltcG9ydCB7cmVtb3ZlfSBmcm9tICcuL3JlbW92ZSc7XG5pbXBvcnQge25vcm1DaGlsZH0gZnJvbSAnLi91dGlscyc7XG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVDaGlsZHJlbihvbGQ6Vk5vZGUsIG5vZGU6Vk5vZGUpIHtcbiAgICB2YXIgb2xkQ2hpbGRyZW4gPSBvbGQuY2hpbGRyZW47XG4gICAgdmFyIG5ld0NoaWxkcmVuID0gbm9kZS5jaGlsZHJlbjtcbiAgICB2YXIgaW5zZXJ0czphbnkgPSBuZXcgQXJyYXkoMTAwMDAwKTtcbiAgICBpbnNlcnRzLmxlbiA9IDA7XG4gICAgaWYgKG5ld0NoaWxkcmVuKSB7XG4gICAgICAgIHZhciBmaXRDb3VudCA9IDA7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbmV3Q2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIG5vcm1DaGlsZChub2RlLCBpKTtcbiAgICAgICAgICAgIHZhciBmaXRQb3M6bnVtYmVyID0gbnVsbDtcbiAgICAgICAgICAgIHZhciBuZXdDaGlsZCA9IG5ld0NoaWxkcmVuW2ldOyAvLyBvbmx5IHVzZSBiZWZvcmUgdXBkYXRlXG4gICAgICAgICAgICB2YXIgb2xkQ2hpbGQgPSBvbGRDaGlsZHJlbiAmJiBvbGRDaGlsZHJlbltpXTtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygb2xkLmtleU1hcCA9PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgbmV3Q2hpbGQua2V5ICE9ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIGZpdFBvcyA9IG9sZC5rZXlNYXBbbmV3Q2hpbGQua2V5XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChvbGRDaGlsZCAmJiB0eXBlb2Ygb2xkQ2hpbGQua2V5ID09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmaXRQb3MgPSBpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAob2xkQ2hpbGQpIHtcbiAgICAgICAgICAgICAgICBmaXRQb3MgPSBpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZml0UG9zICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICBmaXRDb3VudCsrO1xuICAgICAgICAgICAgICAgIHVwZGF0ZShvbGRDaGlsZHJlbltmaXRQb3NdLCBub2RlLCBpKTtcbiAgICAgICAgICAgICAgICBpZiAoZml0UG9zICE9PSBpKSB7XG4gICAgICAgICAgICAgICAgICAgIGluc2VydHNbaW5zZXJ0cy5sZW4rK10gPSBpO1xuICAgICAgICAgICAgICAgICAgICAvL21vdmUobm9kZS5jaGlsZHJlbltpXSwgbm9kZSwgYmVmb3JlQ2hpbGQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBvbGRDaGlsZHJlbltmaXRQb3NdID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGluc2VydHNbaW5zZXJ0cy5sZW4rK10gPSBpO1xuICAgICAgICAgICAgICAgIC8vYXBwZW5kKG5vZGUsIGksIGJlZm9yZUNoaWxkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlmIChvbGRDaGlsZHJlbiAmJiBvbGRDaGlsZHJlbi5sZW5ndGggIT09IGZpdENvdW50KSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgb2xkQ2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBvbGRDaGlsZCA9IG9sZENoaWxkcmVuW2ldO1xuICAgICAgICAgICAgaWYgKG9sZENoaWxkKSB7XG4gICAgICAgICAgICAgICAgcmVtb3ZlKG9sZENoaWxkLCBvbGQsIGkpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvbGRDaGlsZHJlbltpXSA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKHZhciBpID0gaW5zZXJ0cy5sZW4gLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICB2YXIgcG9zOm51bWJlciA9IGluc2VydHNbaV07XG5cbiAgICAgICAgaWYgKGkgPT0gaW5zZXJ0cy5sZW4gLSAxKSB7XG4gICAgICAgICAgICB2YXIgYmVmb3JlQ2hpbGQgPSBub2RlIGluc3RhbmNlb2YgVkZyYWdtZW50XG4gICAgICAgICAgICAgICAgPyBub2RlLmxhc3ROb2RlXG4gICAgICAgICAgICAgICAgOiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgYmVmb3JlQ2hpbGQgPSBuZXdDaGlsZHJlbltpICsgMV0gaW5zdGFuY2VvZiBWRnJhZ21lbnRcbiAgICAgICAgICAgICAgICA/ICg8VkZyYWdtZW50Pm5ld0NoaWxkcmVuW2kgKyAxXSkuZmlyc3ROb2RlXG4gICAgICAgICAgICAgICAgOiBuZXdDaGlsZHJlbltpICsgMV0uZG9tO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG5ld0NoaWxkcmVuW3Bvc10uZG9tKSB7XG4gICAgICAgICAgICBtb3ZlKG5ld0NoaWxkcmVuW3Bvc10sIG5vZGUsIGJlZm9yZUNoaWxkKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGFwcGVuZChub2RlLCBwb3MsIGJlZm9yZUNoaWxkKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gbW92ZShub2RlOlZOb2RlLCBwYXJlbnQ6Vk5vZGUsIGJlZm9yZUNoaWxkOk5vZGUpIHtcbiAgICBpZiAobm9kZSBpbnN0YW5jZW9mIFZGcmFnbWVudCkge1xuICAgICAgICB2YXIgcHJldkRvbTpOb2RlO1xuICAgICAgICB2YXIgZG9tID0gbm9kZS5sYXN0Tm9kZTtcbiAgICAgICAgdmFyIGVuZE5vZGUgPSBub2RlLmZpcnN0Tm9kZTtcbiAgICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgICAgIHByZXZEb20gPSBkb20ucHJldmlvdXNTaWJsaW5nO1xuICAgICAgICAgICAgaWYgKGRvbS5wcmV2aW91c1NpYmxpbmcgIT09IGJlZm9yZUNoaWxkKSB7XG4gICAgICAgICAgICAgICAgcGFyZW50LmRvbS5pbnNlcnRCZWZvcmUoZG9tLCBiZWZvcmVDaGlsZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBiZWZvcmVDaGlsZCA9IGRvbTtcbiAgICAgICAgICAgIGlmIChkb20gPT0gZW5kTm9kZSkge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZG9tID0gcHJldkRvbTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcGFyZW50LmRvbS5pbnNlcnRCZWZvcmUobm9kZS5kb20sIGJlZm9yZUNoaWxkKTtcbiAgICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3RzL3VwZGF0ZS1jaGlsZHJlbi50c1xuICoqLyIsImltcG9ydCB7VlRleHQsIFZUYWdOb2RlLCBWTm9kZSwgVkNvbXBvbmVudCwgVkZyYWdtZW50fSBmcm9tICcuL25vZGUnO1xuaW1wb3J0IHtub3JtQ2hpbGR9IGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0IHtyZW1vdmV9IGZyb20gJy4vcmVtb3ZlJztcbmltcG9ydCB7YXBwZW5kfSBmcm9tICcuL2FwcGVuZCc7XG5pbXBvcnQge3VwZGF0ZUNoaWxkcmVufSBmcm9tICcuL3VwZGF0ZS1jaGlsZHJlbic7XG5pbXBvcnQge3VwZGF0ZUF0dHJzfSBmcm9tICcuL2F0dHJzJztcbmltcG9ydCB7dXBkYXRlQ29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudCc7XG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGUob2xkOlZOb2RlLCBwYXJlbnQ6Vk5vZGUsIGNoaWxkUG9zOm51bWJlcikge1xuICAgIHZhciBub2RlID0gcGFyZW50LmNoaWxkcmVuW2NoaWxkUG9zXTtcblxuICAgIGlmIChvbGQuY29uc3RydWN0b3IgIT09IG5vZGUuY29uc3RydWN0b3IpIHtcbiAgICAgICAgcmVwbGFjZU5vZGUob2xkLCBwYXJlbnQsIGNoaWxkUG9zKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAobm9kZSBpbnN0YW5jZW9mIFZUZXh0KSB7XG4gICAgICAgIG5vZGUuZG9tID0gKDxWVGV4dD5vbGQpLmRvbTtcbiAgICAgICAgaWYgKCg8VlRleHQ+b2xkKS50ZXh0ICE9PSBub2RlLnRleHQpIHtcbiAgICAgICAgICAgIG5vZGUuZG9tLnRleHRDb250ZW50ID0gbm9kZS50ZXh0O1xuICAgICAgICB9XG4gICAgICAgIG9sZC5kZXN0cm95KCk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIG5vZGUua2V5ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBpZiAodHlwZW9mIHBhcmVudC5rZXlNYXAgPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHBhcmVudC5rZXlNYXAgPSB7fVxuICAgICAgICB9XG4gICAgICAgIHBhcmVudC5rZXlNYXBbbm9kZS5rZXldID0gY2hpbGRQb3M7XG4gICAgfVxuXG4gICAgaWYgKG5vZGUgaW5zdGFuY2VvZiBWVGFnTm9kZSkge1xuICAgICAgICBpZiAoKDxWVGFnTm9kZT5vbGQpLnRhZyAhPT0gbm9kZS50YWcpIHtcbiAgICAgICAgICAgIHJlcGxhY2VOb2RlKG9sZCwgcGFyZW50LCBjaGlsZFBvcyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbm9kZS5kb20gPSAoPFZUYWdOb2RlPm9sZCkuZG9tO1xuXG4gICAgICAgIHVwZGF0ZUF0dHJzKDxWVGFnTm9kZT5vbGQsIHBhcmVudCwgY2hpbGRQb3MpO1xuXG4gICAgICAgIGlmIChub2RlLmNoaWxkcmVuICYmIG5vZGUuY2hpbGRyZW4ubGVuZ3RoID09IDEpIHtcbiAgICAgICAgICAgIG5vcm1DaGlsZChub2RlLCAwKTtcbiAgICAgICAgICAgIHZhciBjaGlsZCA9IG5vZGUuY2hpbGRyZW5bMF07XG4gICAgICAgICAgICBpZiAoY2hpbGQgaW5zdGFuY2VvZiBWVGV4dCkge1xuICAgICAgICAgICAgICAgIG5vZGUudGV4dCA9IGNoaWxkLnRleHQ7XG4gICAgICAgICAgICAgICAgaWYgKG5vZGUudGV4dCAhPT0gKDxWVGFnTm9kZT5vbGQpLnRleHQpIHtcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5kb20udGV4dENvbnRlbnQgPSBjaGlsZC50ZXh0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBub2RlLmNoaWxkcmVuID0gbnVsbDtcbiAgICAgICAgICAgICAgICBvbGQuZGVzdHJveSgpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICgoPFZUYWdOb2RlPm9sZCkudGV4dCAhPSBudWxsKSB7XG4gICAgICAgICAgICBvbGQuZG9tLnJlbW92ZUNoaWxkKG9sZC5kb20uZmlyc3RDaGlsZCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAobm9kZSBpbnN0YW5jZW9mIFZGcmFnbWVudCkge1xuICAgICAgICBpZiAobm9kZSBpbnN0YW5jZW9mIFZDb21wb25lbnQpIHtcbiAgICAgICAgICAgIGlmICgoPFZDb21wb25lbnQ+b2xkKS5jdG9yICE9PSBub2RlLmN0b3IpIHtcbiAgICAgICAgICAgICAgICByZXBsYWNlTm9kZShvbGQsIHBhcmVudCwgY2hpbGRQb3MpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHVwZGF0ZUNvbXBvbmVudCg8VkNvbXBvbmVudD5vbGQsIHBhcmVudCwgY2hpbGRQb3MpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIG5vZGUubGFzdE5vZGUgPSAoPFZGcmFnbWVudD5vbGQpLmxhc3ROb2RlO1xuICAgICAgICBub2RlLmZpcnN0Tm9kZSA9ICg8VkZyYWdtZW50Pm9sZCkuZmlyc3ROb2RlO1xuICAgICAgICBub2RlLmRvbSA9ICg8VkZyYWdtZW50Pm9sZCkuZG9tO1xuICAgIH1cblxuICAgIHVwZGF0ZUNoaWxkcmVuKG9sZCwgbm9kZSk7XG4gICAgb2xkLmRlc3Ryb3koKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlcGxhY2VOb2RlKG9sZDpWTm9kZSwgcGFyZW50OlZOb2RlLCBjaGlsZFBvczpudW1iZXIpIHtcbiAgICBhcHBlbmQocGFyZW50LCBjaGlsZFBvcywgb2xkIGluc3RhbmNlb2YgVkZyYWdtZW50ID8gb2xkLmZpcnN0Tm9kZSA6ICg8VlRhZ05vZGU+b2xkKS5kb20pO1xuICAgIHJlbW92ZShvbGQsIHBhcmVudCk7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3RzL3VwZGF0ZS50c1xuICoqLyIsImltcG9ydCB7VlRleHQsIFZUYWdOb2RlLCBWTm9kZSwgVkNvbXBvbmVudCwgVkZyYWdtZW50fSBmcm9tICcuL25vZGUnO1xuaW1wb3J0IHthcHBlbmR9IGZyb20gJy4vYXBwZW5kJztcbmltcG9ydCB7dXBkYXRlfSBmcm9tICcuL3VwZGF0ZSc7XG5pbXBvcnQge25vcm1DaGlsZH0gZnJvbSAnLi91dGlscyc7XG5cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmUobm9kZTpWTm9kZSwgcGFyZW50OlZOb2RlLCBjaGlsZFBvcz86bnVtYmVyLCBza2lwUmVtb3ZlPzpib29sZWFuKSB7XG4gICAgaWYgKG5vZGUgaW5zdGFuY2VvZiBWQ29tcG9uZW50KSB7XG4gICAgICAgIG5vZGUuY29tcG9uZW50LmNvbXBvbmVudFdpbGxVbm1vdW50KCk7XG4gICAgfVxuICAgIGlmIChub2RlLmNoaWxkcmVuKSB7XG4gICAgICAgIHZhciBza2lwID0gc2tpcFJlbW92ZSB8fCAhKG5vZGUgaW5zdGFuY2VvZiBWRnJhZ21lbnQpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5vZGUuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHJlbW92ZShub2RlLmNoaWxkcmVuW2ldLCBub2RlLCBpLCBza2lwKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlmICghc2tpcFJlbW92ZSkge1xuICAgICAgICBpZiAobm9kZSBpbnN0YW5jZW9mIFZGcmFnbWVudCkge1xuICAgICAgICAgICAgcGFyZW50LmRvbS5yZW1vdmVDaGlsZChub2RlLmZpcnN0Tm9kZSk7XG4gICAgICAgICAgICBwYXJlbnQuZG9tLnJlbW92ZUNoaWxkKG5vZGUubGFzdE5vZGUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcGFyZW50LmRvbS5yZW1vdmVDaGlsZChub2RlLmRvbSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgbm9kZS5kZXN0cm95KCk7XG4gICAgaWYgKGNoaWxkUG9zICE9IG51bGwpIHtcbiAgICAgICAgcGFyZW50LmNoaWxkcmVuW2NoaWxkUG9zXSA9IG51bGw7XG4gICAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90cy9yZW1vdmUudHNcbiAqKi8iLCJpbXBvcnQge1ZUZXh0LCBWVGFnTm9kZSwgVk5vZGUsIFZDb21wb25lbnQsIFZGcmFnbWVudH0gZnJvbSAnLi9ub2RlJztcbmltcG9ydCB7YXBwZW5kfSBmcm9tICcuL2FwcGVuZCc7XG5pbXBvcnQge3VwZGF0ZSwgcmVwbGFjZU5vZGV9IGZyb20gJy4vdXBkYXRlJztcbmltcG9ydCB7bm9ybUNoaWxkfSBmcm9tICcuL3V0aWxzJztcbmltcG9ydCB7YXR0cnMsIHByb3BzLCBldmVudHN9IGZyb20gJy4vY29uc3QtYXR0cnMnO1xuaW1wb3J0IHtnbG9ic30gZnJvbSAnLi9jb21wb25lbnQnO1xuXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlQXR0cnMob2xkOlZUYWdOb2RlLCBwYXJlbnQ6Vk5vZGUsIGNoaWxkUG9zOm51bWJlcikge1xuICAgIHZhciBub2RlID0gPFZUYWdOb2RlPnBhcmVudC5jaGlsZHJlbltjaGlsZFBvc107XG4gICAgdmFyIHJlcyA9IHRydWU7XG4gICAgaWYgKG5vZGUuYXR0cnMpIHtcbiAgICAgICAgaWYgKG9sZC5hdHRycykge1xuICAgICAgICAgICAgY3JlYXRlQXR0cnMobm9kZSwgb2xkLmF0dHJzKTsgLy8gYWZmZWN0IG5vZGUuYXR0cnNDb2RlXG4gICAgICAgICAgICByZXMgPSBvbGQuYXR0cnNDb2RlID09PSBub2RlLmF0dHJzQ29kZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJlcyA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKG9sZC5hdHRycykge1xuICAgICAgICByZXMgPSBmYWxzZTtcbiAgICB9XG4gICAgaWYgKHJlcyA9PT0gZmFsc2UpIHtcbiAgICAgICAgcmVtb3ZlQXR0cnMob2xkKTtcbiAgICAgICAgY3JlYXRlQXR0cnMobm9kZSwgb2xkKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUF0dHJzKG5vZGU6VlRhZ05vZGUsIG9sZEF0dHJzPzphbnkpIHtcbiAgICB2YXIgZG9tOmFueSA9IG5vZGUuZG9tO1xuICAgIHZhciBhdHRyOnN0cmluZztcbiAgICB2YXIgcHJvcDpzdHJpbmc7XG4gICAgdmFyIGV2ZW50OnN0cmluZztcbiAgICBub2RlLmF0dHJzQ29kZSA9ICcnO1xuICAgIGZvciAodmFyIGF0dHJOYW1lIGluIG5vZGUuYXR0cnMpIHtcbiAgICAgICAgbm9kZS5hdHRyc0NvZGUgKz0gYXR0ck5hbWU7XG4gICAgICAgIHZhciBhdHRyVmFsID0gbm9kZS5hdHRyc1thdHRyTmFtZV07XG4gICAgICAgIGlmIChhdHRyTmFtZSA9PSAna2V5JyB8fCAob2xkQXR0cnMgJiYgb2xkQXR0cnNbYXR0ck5hbWVdID09PSBhdHRyVmFsICYmIGF0dHJOYW1lICE9PSAncmVmJykpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcm9wID0gcHJvcHNbYXR0ck5hbWVdKSB7XG4gICAgICAgICAgICBpZiAoYXR0clZhbCA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgZG9tW3Byb3BdID0gJyc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBkb21bcHJvcF0gPSBhdHRyVmFsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGF0dHIgPSBhdHRyc1thdHRyTmFtZV0pIHtcbiAgICAgICAgICAgIGlmIChhdHRyVmFsID09IG51bGwgfHwgYXR0clZhbCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICBkb20ucmVtb3ZlQXR0cmlidXRlKGF0dHIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAodHlwZW9mIGF0dHJWYWwgIT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgZG9tLnNldEF0dHJpYnV0ZShhdHRyLCBhdHRyVmFsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChldmVudCA9IGV2ZW50c1thdHRyTmFtZV0pIHtcbiAgICAgICAgICAgIGRvbVsnb24nICsgZXZlbnRdID0gYXR0clZhbDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChhdHRyTmFtZVswXSA9PT0gJ28nICYmIGF0dHJOYW1lWzFdID09PSAnbicpIHtcbiAgICAgICAgICAgIGV2ZW50ID0gYXR0ck5hbWUuc3Vic3RyaW5nKDIpLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICBkb21bJ29uJyArIGV2ZW50XSA9IGF0dHJWYWw7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoYXR0ck5hbWVbMF0gPT09ICdkJyAmJiBhdHRyTmFtZVsxXSA9PT0gJ2EnICYmIGF0dHJOYW1lWzJdID09PSAndCcgJiYgYXR0ck5hbWVbM10gPT09ICdhJykge1xuXG4gICAgICAgICAgICBpZiAoYXR0clZhbCA9PSBudWxsIHx8IGF0dHJWYWwgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgZG9tLnJlbW92ZUF0dHJpYnV0ZShhdHRyTmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBkb20uc2V0QXR0cmlidXRlKGF0dHJOYW1lLCBhdHRyVmFsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChhdHRyTmFtZSA9PT0gJ3N0eWxlJykge1xuICAgICAgICAgICAgLy90b2RvOlxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGF0dHJOYW1lID09ICdyZWYnKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGF0dHJWYWwgPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIGF0dHJWYWwobm9kZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChnbG9icy5jb21wb25lbnQpIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGdsb2JzLmNvbXBvbmVudC5yZWZzID09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIGdsb2JzLmNvbXBvbmVudC5yZWZzID0ge307XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGdsb2JzLmNvbXBvbmVudC5yZWZzW2F0dHJWYWxdID0gbm9kZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gcmVtb3ZlQXR0cnMob2xkOlZUYWdOb2RlKSB7XG4gICAgdmFyIGRvbTphbnkgPSBvbGQuZG9tO1xuXG4gICAgdmFyIGF0dHI6c3RyaW5nO1xuICAgIHZhciBwcm9wOnN0cmluZztcbiAgICB2YXIgZXZlbnQ6c3RyaW5nO1xuXG4gICAgZm9yICh2YXIgYXR0ck5hbWUgaW4gb2xkLmF0dHJzKSB7XG4gICAgICAgIHZhciBhdHRyVmFsID0gb2xkLmF0dHJzW2F0dHJOYW1lXTtcbiAgICAgICAgaWYgKHByb3AgPSBwcm9wc1thdHRyTmFtZV0pIHtcbiAgICAgICAgICAgIGRvbVtwcm9wXSA9ICcnO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGF0dHIgPSBhdHRyc1thdHRyTmFtZV0pIHtcbiAgICAgICAgICAgIGRvbS5yZW1vdmVBdHRyaWJ1dGUoYXR0cik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoYXR0ck5hbWUuc3Vic3RyaW5nKDAsIDQpID09ICdkYXRhJykge1xuICAgICAgICAgICAgZG9tLnJlbW92ZUF0dHJpYnV0ZShhdHRyTmFtZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZXZlbnQgPSBldmVudHNbYXR0ck5hbWVdKSB7XG4gICAgICAgICAgICBkb21bJ29uJyArIGV2ZW50XSA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoYXR0ck5hbWUuc3Vic3RyaW5nKDAsIDIpID09ICdvbicpIHtcbiAgICAgICAgICAgIGV2ZW50ID0gYXR0ck5hbWUuc3Vic3RyaW5nKDIpLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICBkb21bJ29uJyArIGV2ZW50XSA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoYXR0ck5hbWUgPT09ICdzdHlsZScpIHtcbiAgICAgICAgICAgIC8vdG9kbzpcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChhdHRyTmFtZSA9PSAncmVmJykge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBhdHRyVmFsID09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGdsb2JzLmNvbXBvbmVudCkge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgZ2xvYnMuY29tcG9uZW50LnJlZnMgPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgZ2xvYnMuY29tcG9uZW50LnJlZnMgPSB7fTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZ2xvYnMuY29tcG9uZW50LnJlZnNbYXR0clZhbF0gPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90cy9hdHRycy50c1xuICoqLyIsImV4cG9ydCBsZXQgYXR0cnM6e1tpbmRleDpzdHJpbmddOnN0cmluZ30gPSB7XG4gICAgYWNjZXB0OiAnYWNjZXB0JyxcbiAgICBhY2NlcHRDaGFyc2V0OiAnYWNjZXB0LWNoYXJzZXQnLFxuICAgIGFjY2Vzc0tleTogJ2FjY2Vzc0tleScsXG4gICAgYWN0aW9uOiAnYWN0aW9uJyxcbiAgICBhbGxvd0Z1bGxTY3JlZW46ICdhbGxvd0Z1bGxTY3JlZW4nLFxuICAgIGFsbG93VHJhbnNwYXJlbmN5OiAnYWxsb3dUcmFuc3BhcmVuY3knLFxuICAgIGFsdDogJ2FsdCcsXG4gICAgYXN5bmM6ICdhc3luYycsXG4gICAgYXV0b0NvbXBsZXRlOiAnYXV0b0NvbXBsZXRlJyxcbiAgICBhdXRvUGxheTogJ2F1dG9QbGF5JyxcbiAgICBjYXB0dXJlOiAnY2FwdHVyZScsXG4gICAgY2VsbFBhZGRpbmc6ICdjZWxsUGFkZGluZycsXG4gICAgY2VsbFNwYWNpbmc6ICdjZWxsU3BhY2luZycsXG4gICAgY2hhclNldDogJ2NoYXJTZXQnLFxuICAgIGNoYWxsZW5nZTogJ2NoYWxsZW5nZScsXG4gICAgY2xhc3NJRDogJ2NsYXNzSUQnLFxuICAgIGNvbHM6ICdjb2xzJyxcbiAgICBjb2xTcGFuOiAnY29sU3BhbicsXG4gICAgY29udGVudDogJ2NvbnRlbnQnLFxuICAgIGNvbnRlbnRFZGl0YWJsZTogJ2NvbnRlbnRFZGl0YWJsZScsXG4gICAgY29udGV4dE1lbnU6ICdjb250ZXh0TWVudScsXG4gICAgY29vcmRzOiAnY29vcmRzJyxcbiAgICBjcm9zc09yaWdpbjogJ2Nyb3NzT3JpZ2luJyxcbiAgICBkYXRhOiAnZGF0YScsXG4gICAgZGF0ZVRpbWU6ICdkYXRlVGltZScsXG4gICAgZGVmZXI6ICdkZWZlcicsXG4gICAgZGlyOiAnZGlyJyxcbiAgICBkaXNhYmxlZDogJ2Rpc2FibGVkJyxcbiAgICBkb3dubG9hZDogJ2Rvd25sb2FkJyxcbiAgICBkcmFnZ2FibGU6ICdkcmFnZ2FibGUnLFxuICAgIGVuY1R5cGU6ICdlbmNUeXBlJyxcbiAgICBmb3JtOiAnZm9ybScsXG4gICAgZm9ybUFjdGlvbjogJ2Zvcm1BY3Rpb24nLFxuICAgIGZvcm1FbmNUeXBlOiAnZm9ybUVuY1R5cGUnLFxuICAgIGZvcm1NZXRob2Q6ICdmb3JtTWV0aG9kJyxcbiAgICBmb3JtTm9WYWxpZGF0ZTogJ2Zvcm1Ob1ZhbGlkYXRlJyxcbiAgICBmb3JtVGFyZ2V0OiAnZm9ybVRhcmdldCcsXG4gICAgZnJhbWVCb3JkZXI6ICdmcmFtZUJvcmRlcicsXG4gICAgaGVhZGVyczogJ2hlYWRlcnMnLFxuICAgIGhlaWdodDogJ2hlaWdodCcsXG4gICAgaGlkZGVuOiAnaGlkZGVuJyxcbiAgICBoaWdoOiAnaGlnaCcsXG4gICAgaHJlZjogJ2hyZWYnLFxuICAgIGhyZWZMYW5nOiAnaHJlZkxhbmcnLFxuICAgIGh0bWxGb3I6ICdmb3InLFxuICAgIGh0dHBFcXVpdjogJ2h0dHAtZXF1aXYnLFxuICAgIGljb246ICdpY29uJyxcbiAgICBpbnB1dE1vZGU6ICdpbnB1dE1vZGUnLFxuICAgIGlzOiAnaXMnLFxuICAgIGtleVBhcmFtczogJ2tleVBhcmFtcycsXG4gICAga2V5VHlwZTogJ2tleVR5cGUnLFxuICAgIGxhYmVsOiAnbGFiZWwnLFxuICAgIGxhbmc6ICdsYW5nJyxcbiAgICBsaXN0OiAnbGlzdCcsXG4gICAgbG93OiAnbG93JyxcbiAgICBtYW5pZmVzdDogJ21hbmlmZXN0JyxcbiAgICBtYXJnaW5IZWlnaHQ6ICdtYXJnaW5IZWlnaHQnLFxuICAgIG1hcmdpbldpZHRoOiAnbWFyZ2luV2lkdGgnLFxuICAgIG1heDogJ21heCcsXG4gICAgbWF4TGVuZ3RoOiAnbWF4TGVuZ3RoJyxcbiAgICBtZWRpYTogJ21lZGlhJyxcbiAgICBtZWRpYUdyb3VwOiAnbWVkaWFHcm91cCcsXG4gICAgbWV0aG9kOiAnbWV0aG9kJyxcbiAgICBtaW46ICdtaW4nLFxuICAgIG1pbkxlbmd0aDogJ21pbkxlbmd0aCcsXG4gICAgbmFtZTogJ25hbWUnLFxuICAgIG5vVmFsaWRhdGU6ICdub1ZhbGlkYXRlJyxcbiAgICBvcGVuOiAnb3BlbicsXG4gICAgb3B0aW11bTogJ29wdGltdW0nLFxuICAgIHBhdHRlcm46ICdwYXR0ZXJuJyxcbiAgICBwbGFjZWhvbGRlcjogJ3BsYWNlaG9sZGVyJyxcbiAgICBwb3N0ZXI6ICdwb3N0ZXInLFxuICAgIHByZWxvYWQ6ICdwcmVsb2FkJyxcbiAgICByYWRpb0dyb3VwOiAncmFkaW9Hcm91cCcsXG4gICAgcmVsOiAncmVsJyxcbiAgICByZXF1aXJlZDogJ3JlcXVpcmVkJyxcbiAgICByb2xlOiAncm9sZScsXG4gICAgcm93czogJ3Jvd3MnLFxuICAgIHJvd1NwYW46ICdyb3dTcGFuJyxcbiAgICBzYW5kYm94OiAnc2FuZGJveCcsXG4gICAgc2NvcGU6ICdzY29wZScsXG4gICAgc2NvcGVkOiAnc2NvcGVkJyxcbiAgICBzY3JvbGxpbmc6ICdzY3JvbGxpbmcnLFxuICAgIHNlYW1sZXNzOiAnc2VhbWxlc3MnLFxuICAgIHNoYXBlOiAnc2hhcGUnLFxuICAgIHNpemU6ICdzaXplJyxcbiAgICBzaXplczogJ3NpemVzJyxcbiAgICBzcGFuOiAnc3BhbicsXG4gICAgc3BlbGxDaGVjazogJ3NwZWxsQ2hlY2snLFxuICAgIHNyYzogJ3NyYycsXG4gICAgc3JjU2V0OiAnc3JjU2V0JyxcbiAgICBzdGFydDogJ3N0YXJ0JyxcbiAgICBzdGVwOiAnc3RlcCcsXG4gICAgc3R5bGU6ICdzdHlsZScsXG4gICAgdGFiSW5kZXg6ICd0YWJJbmRleCcsXG4gICAgdGFyZ2V0OiAndGFyZ2V0JyxcbiAgICB0aXRsZTogJ3RpdGxlJyxcbiAgICB0eXBlOiAndHlwZScsXG4gICAgdXNlTWFwOiAndXNlTWFwJyxcbiAgICB3aWR0aDogJ3dpZHRoJyxcbiAgICB3bW9kZTogJ3dtb2RlJyxcbiAgICBhdXRvQ2FwaXRhbGl6ZTogJ2F1dG9DYXBpdGFsaXplJyxcbiAgICBhdXRvQ29ycmVjdDogJ2F1dG9Db3JyZWN0JyxcbiAgICBpdGVtUHJvcDogJ2l0ZW1Qcm9wJyxcbiAgICBpdGVtU2NvcGU6ICdpdGVtU2NvcGUnLFxuICAgIGl0ZW1UeXBlOiAnaXRlbVR5cGUnLFxuICAgIGl0ZW1JRDogJ2l0ZW1JRCcsXG4gICAgaXRlbVJlZjogJ2l0ZW1SZWYnLFxuICAgIHByb3BlcnR5OiAncHJvcGVydHknLFxuICAgIHNlY3VyaXR5OiAnc2VjdXJpdHknLFxuICAgIHVuc2VsZWN0YWJsZTogJ3Vuc2VsZWN0YWJsZScsXG59O1xuXG5leHBvcnQgbGV0IHByb3BzOntbaW5kZXg6c3RyaW5nXTpzdHJpbmd9ID0ge1xuICAgIGNoZWNrZWQ6ICdjaGVja2VkJyxcbiAgICBjbGFzc05hbWU6ICdjbGFzc05hbWUnLFxuICAgIGNvbnRyb2xzOiAnY29udHJvbHMnLFxuICAgIGlkOiAnaWQnLFxuICAgIGxvb3A6ICdsb29wJyxcbiAgICBtdWx0aXBsZTogJ211bHRpcGxlJyxcbiAgICBtdXRlZDogJ211dGVkJyxcbiAgICByZWFkT25seTogJ3JlYWRPbmx5JyxcbiAgICBzZWxlY3RlZDogJ3NlbGVjdGVkJyxcbiAgICBzcmNEb2M6ICdzcmNkb2MnLFxuICAgIHZhbHVlOiAndmFsdWUnXG59O1xuXG5leHBvcnQgbGV0IGlzVW5pdGxlc3NOdW1iZXI6e1tpbmRleDpzdHJpbmddOmJvb2xlYW59ID0ge1xuICAgIGJveEZsZXg6IHRydWUsXG4gICAgYm94RmxleEdyb3VwOiB0cnVlLFxuICAgIGNvbHVtbkNvdW50OiB0cnVlLFxuICAgIGZsZXg6IHRydWUsXG4gICAgZmxleEdyb3c6IHRydWUsXG4gICAgZmxleFBvc2l0aXZlOiB0cnVlLFxuICAgIGZsZXhTaHJpbms6IHRydWUsXG4gICAgZmxleE5lZ2F0aXZlOiB0cnVlLFxuICAgIGZvbnRXZWlnaHQ6IHRydWUsXG4gICAgbGluZUNsYW1wOiB0cnVlLFxuICAgIGxpbmVIZWlnaHQ6IHRydWUsXG4gICAgb3BhY2l0eTogdHJ1ZSxcbiAgICBvcmRlcjogdHJ1ZSxcbiAgICBvcnBoYW5zOiB0cnVlLFxuICAgIHdpZG93czogdHJ1ZSxcbiAgICB6SW5kZXg6IHRydWUsXG4gICAgem9vbTogdHJ1ZSxcblxuICAgIC8vIFNWRy1yZWxhdGVkIHByb3BlcnRpZXNcbiAgICBmaWxsT3BhY2l0eTogdHJ1ZSxcbiAgICBzdHJva2VEYXNob2Zmc2V0OiB0cnVlLFxuICAgIHN0cm9rZU9wYWNpdHk6IHRydWUsXG4gICAgc3Ryb2tlV2lkdGg6IHRydWVcbn07XG5cbmV4cG9ydCBsZXQgZXZlbnRzOntbaW5kZXg6c3RyaW5nXTpzdHJpbmd9ID0ge1xuICAgIG9uUmVuZGVyOiBcInJlbmRlclwiLFxuICAgIG9uQ2xpY2s6ICgoJ29udG91Y2hlbmQnIGluIHdpbmRvdykpID8gJ3RvdWNoZW5kJyA6ICdjbGljaycsXG4gICAgb25EYmxDbGljazogJ2RibGNsaWNrJyxcblxuICAgIG9uTW91c2VEb3duOiAnbW91c2Vkb3duJyxcbiAgICBvbk1vdXNlVXA6ICdtb3VzZXVwJyxcbiAgICBvbk1vdXNlTW92ZTogJ21vdXNlbW92ZScsXG4gICAgb25Nb3VzZUVudGVyOiAnbW91c2VlbnRlcicsXG4gICAgb25Nb3VzZUxlYXZlOiAnbW91c2VsZWF2ZScsXG4gICAgb25Nb3VzZU92ZXI6ICdtb3VzZW92ZXInLFxuICAgIG9uTW91c2VPdXQ6ICdtb3VzZW91dCcsXG5cbiAgICBvblRvdWNoU3RhcnQ6ICd0b3VjaHN0YXJ0JyxcbiAgICBvblRvdWNoRW5kOiAndG91Y2hlbmQnLFxuICAgIG9uVG91Y2hNb3ZlOiAndG91Y2htb3ZlJyxcbiAgICBvblRvdWNoQ2FuY2VsOiAndG91Y2hjYW5jZWwnLFxuICAgIG9uVG91Y2hMZWF2ZTogJ3RvdWNobGVhdmUnLFxuXG4gICAgb25Db250ZXh0TWVudTogJ2NvbnRleHRtZW51JyxcblxuICAgIG9uSW5wdXQ6ICdpbnB1dCcsXG4gICAgb25Gb2N1czogJ2ZvY3VzJyxcbiAgICBvbkNoYW5nZTogJ2NoYW5nZScsXG5cbiAgICBvbktleURvd246ICdrZXlkb3duJyxcbiAgICBvbktleVByZXNzOiAna2V5cHJlc3MnLFxuICAgIG9uS2V5VXA6ICdrZXl1cCdcbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3RzL2NvbnN0LWF0dHJzLnRzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==