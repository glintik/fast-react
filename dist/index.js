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
	var top_level_2 = __webpack_require__(2);
	exports.render = top_level_2.render;
	exports.createElement = top_level_2.createElement;
	exports.Component = top_level_2.Component;
	exports.findDOMNode = top_level_2.findDOMNode;
	exports.updater = top_level_2.updater;
	exports.VTagNode = top_level_2.VTagNode;
	window.FastReact = {
	    render: top_level_1.render, createElement: top_level_1.createElement, Component: top_level_1.Component, findDOMNode: top_level_1.findDOMNode, update: top_level_1.updater
	};
	//# sourceMappingURL=index.js.map

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var node_1 = __webpack_require__(4);
	var append_1 = __webpack_require__(5);
	var update_1 = __webpack_require__(8);
	var utils_1 = __webpack_require__(3);
	var component_1 = __webpack_require__(6);
	exports.Component = component_1.Component;
	exports.findDOMNode = component_1.findDOMNode;
	var node_2 = __webpack_require__(4);
	exports.VTagNode = node_2.VTagNode;
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
/***/ function(module, exports, __webpack_require__) {

	var node_1 = __webpack_require__(4);
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
/* 4 */
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
	        if (this.destroyed) {
	            throw "Node yet destroyed";
	        }
	        this.destroyed = true;
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
	        this.id = id++;
	        this.dom = null;
	        this.tag = tag;
	        this.attrs = attrs;
	        this.attrsCode = '';
	        this.key = key;
	        /*if (children && children.length == 1) {
	            var child = children[0];
	            if (typeof child == 'string' || typeof child == 'number') {
	                this.text = child + '';
	                children = null;
	            }
	        }*/
	        this.children = children;
	    }
	    VTagNode.prototype.destroy = function () {
	        this.dom = null;
	        this.attrs = null;
	        this.children = null;
	    };
	    return VTagNode;
	})(VNode);
	exports.VTagNode = VTagNode;
	VTagNode.prototype.text = null;
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
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var node_1 = __webpack_require__(4);
	var utils_1 = __webpack_require__(3);
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
	        if (node.text != null) {
	            node.dom.textContent = node.text;
	            return;
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
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var node_1 = __webpack_require__(4);
	var append_1 = __webpack_require__(5);
	var update_children_1 = __webpack_require__(7);
	var utils_1 = __webpack_require__(3);
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

	var node_1 = __webpack_require__(4);
	var append_1 = __webpack_require__(5);
	var update_1 = __webpack_require__(8);
	var remove_1 = __webpack_require__(9);
	var utils_1 = __webpack_require__(3);
	function updateChildren(old, node) {
	    var oldChildren = old.children;
	    var newChildren = node.children;
	    var inserts = [];
	    if (!oldChildren && newChildren) {
	        var beforeChild = node instanceof node_1.VFragment ? node.lastNode : null;
	        for (var i = 0; i < newChildren.length; i++) {
	            utils_1.normChild(node, i);
	            append_1.append(node, i, beforeChild);
	        }
	        return;
	    }
	    if (oldChildren && !newChildren) {
	        for (var i = 0; i < oldChildren.length; i++) {
	            remove_1.remove(oldChildren[i], old, i);
	        }
	        return;
	    }
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
	                    inserts.push(i);
	                }
	                oldChildren[fitPos] = null;
	            }
	            else {
	                inserts.push(i);
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
	    if (inserts.length) {
	        for (var i = inserts.length - 1; i >= 0; i--) {
	            var pos = inserts[i];
	            if (i == inserts.length - 1) {
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

	var node_1 = __webpack_require__(4);
	var remove_1 = __webpack_require__(9);
	var append_1 = __webpack_require__(5);
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
	            node.dom.nodeValue = node.text;
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
	        if (node.text != null) {
	            if (old.text !== node.text) {
	                node.dom.textContent = node.text;
	            }
	            old.destroy();
	            return;
	        }
	        if (old.text != null) {
	            node.dom.parentNode.removeChild(node.dom);
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

	var node_1 = __webpack_require__(4);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNjYwOGY3YWI1YzUwZWYxOWUyZmUiLCJ3ZWJwYWNrOi8vLy4vaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vdHMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vdHMvdG9wLWxldmVsLnRzIiwid2VicGFjazovLy8uL3RzL3V0aWxzLnRzIiwid2VicGFjazovLy8uL3RzL25vZGUudHMiLCJ3ZWJwYWNrOi8vLy4vdHMvYXBwZW5kLnRzIiwid2VicGFjazovLy8uL3RzL2NvbXBvbmVudC50cyIsIndlYnBhY2s6Ly8vLi90cy91cGRhdGUtY2hpbGRyZW4udHMiLCJ3ZWJwYWNrOi8vLy4vdHMvdXBkYXRlLnRzIiwid2VicGFjazovLy8uL3RzL3JlbW92ZS50cyIsIndlYnBhY2s6Ly8vLi90cy9hdHRycy50cyIsIndlYnBhY2s6Ly8vLi90cy9jb25zdC1hdHRycy50cyJdLCJuYW1lcyI6WyJBcHAiLCJBcHAuY29uc3RydWN0b3IiLCJBcHAuY2xpY2siLCJBcHAucmVuZGVyIiwiV293IiwiV293LmNvbnN0cnVjdG9yIiwiV293LmNsaWNrIiwiV293LnJlbmRlciIsInJlbmRlciIsInVwZGF0ZXIiLCJjcmVhdGVFbGVtZW50Iiwibm9ybUNoaWxkIiwiVk5vZGUiLCJWTm9kZS5jb25zdHJ1Y3RvciIsIlZOb2RlLmRlc3Ryb3kiLCJWRnJhZ21lbnQiLCJWRnJhZ21lbnQuY29uc3RydWN0b3IiLCJWQ29tcG9uZW50IiwiVkNvbXBvbmVudC5jb25zdHJ1Y3RvciIsIlZUYWdOb2RlIiwiVlRhZ05vZGUuY29uc3RydWN0b3IiLCJWVGFnTm9kZS5kZXN0cm95IiwiZ2V0VlRleHQiLCJWVGV4dCIsIlZUZXh0LmNvbnN0cnVjdG9yIiwiVlRleHQuZGVzdHJveSIsImFwcGVuZCIsIkNvbXBvbmVudCIsIkNvbXBvbmVudC5jb25zdHJ1Y3RvciIsIkNvbXBvbmVudC5jb21wb25lbnRXaWxsTW91bnQiLCJDb21wb25lbnQuY29tcG9uZW50RGlkTW91bnQiLCJDb21wb25lbnQuY29tcG9uZW50V2lsbFVwZGF0ZSIsIkNvbXBvbmVudC5jb21wb25lbnREaWRVcGRhdGUiLCJDb21wb25lbnQuY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyIsIkNvbXBvbmVudC5jb21wb25lbnRXaWxsVW5tb3VudCIsIkNvbXBvbmVudC5yZW5kZXIiLCJDb21wb25lbnQuZm9yY2VVcGRhdGUiLCJmaW5kRE9NTm9kZSIsImNyZWF0ZUNvbXBvbmVudCIsInVwZGF0ZUNvbXBvbmVudCIsInVwZGF0ZUNoaWxkcmVuIiwibW92ZSIsInVwZGF0ZSIsInJlcGxhY2VOb2RlIiwicmVtb3ZlIiwidXBkYXRlQXR0cnMiLCJjcmVhdGVBdHRycyIsInJlbW92ZUF0dHJzIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7OztBQ3RDQSxtQ0FBd0QsQ0FBWSxDQUFDO0FBRXJFO0tBQWtCQSx1QkFBU0E7S0FBM0JBO1NBQWtCQyw4QkFBU0E7U0FDdkJBLFlBQU9BLEdBQUdBLENBQUNBLENBQUNBO0tBZ0JoQkEsQ0FBQ0E7S0FkR0QsbUJBQUtBLEdBQUxBO1NBQ0lFLElBQUlBLENBQUNBLE9BQU9BLEVBQUVBLENBQUNBO1NBQ2ZBLElBQUlBLENBQUNBLFdBQVdBLEVBQUVBLENBQUNBO0tBQ3ZCQSxDQUFDQTtLQUVERixvQkFBTUEsR0FBTkE7U0FBQUcsaUJBUUNBO1NBUEdBLE1BQU1BLENBQUNBLHFCQUFhQSxDQUFDQSxLQUFLQSxFQUFFQSxFQUFDQSxLQUFLQSxFQUFFQSxJQUFJQSxDQUFDQSxPQUFPQSxFQUFDQSxFQUFFQSxPQUFPQSxFQUN0REEscUJBQWFBLENBQUNBLFFBQVFBLEVBQUVBLEVBQUNBLE9B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QU1BLENBQUNBLE1BQU1BLEdBQUdBLEVBQUVBO1NBQ3RCQSxDQUFDQTtTQUNEQSxNQUFNQSxDQUFDQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxRQUFRQSxDQUFDQTtLQUN2Q0EsQ0FBQ0E7S0FFREEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsWUFBWUEsZUFBUUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7U0FDM0JBLElBQUlBLENBQUNBLEdBQUdBLEdBQUdBLFFBQVFBLENBQUNBLGFBQWFBLENBQUNBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1NBQzVDQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQTthQUNiQSxtQkFBV0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7U0FDdEJBLENBQUNBO1NBQ0RBLFNBQVNBLENBQUNBLFlBQVlBLENBQUNBLElBQUlBLENBQUNBLEdBQUdBLEVBQUVBLFdBQVdBLENBQUNBLENBQUNBO1NBQzlDQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxJQUFJQSxJQUFJQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQTthQUNwQkEsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsV0FBV0EsR0FBR0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7YUFDakNBLE1BQU1BLENBQUNBO1NBQ1hBLENBQUNBO0tBQ0xBLENBQUNBO0tBQ0RBLElBQUlBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLFlBQVlBLFlBQUtBLENBQUNBLENBQUNBLENBQUNBO1NBQzdCQSxJQUFJQSxDQUFDQSxHQUFHQSxHQUFHQSxRQUFRQSxDQUFDQSxjQUFjQSxDQUFDQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtTQUM5Q0EsU0FBU0EsQ0FBQ0EsWUFBWUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsRUFBRUEsV0FBV0EsQ0FBQ0EsQ0FBQ0E7U0FDOUNBLE1BQU1BLENBQUNBO0tBQ1hBLENBQUNBO0tB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LENBQUNBLFFBQVFBLEdBQUdBLElBQUlBLENBQUNBO1NBQ25FQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxXQUFXQSxDQUFDQSxNQUFNQSxFQUFFQSxDQUFDQSxFQUFFQSxFQUFFQSxDQUFDQTthQUMxQ0EsaUJBQVNBLENBQUNBLElBQUlBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBO2FBQ25CQSxlQUFNQSxDQUFDQSxJQUFJQSxFQUFFQSxDQUFDQSxFQUFFQSxXQUFXQSxDQUFDQSxDQUFDQTtTQUNqQ0EsQ0FBQ0E7U0FDREEsTUFBTUEsQ0FBQ0E7S0FDWEEsQ0FBQ0E7S0FDREEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsV0FBV0EsSUFBSUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7U0FDOUJBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLFdBQVdBLENBQUNBLE1BQU1BLEVBQUVBLENBQUNBLEVBQUVBLEVBQUVBLENBQUNBO2FBQzFDQSxlQUFNQSxDQUFDQSxXQUFXQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxHQUFHQSxFQUFFQSxDQUFDQSxDQUFDQTtTQUNsQ0EsQ0FBQ0E7U0FDREEsTUFBTUEsQ0FBQ0E7S0FDWEEsQ0FBQ0E7S0FFREEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsV0FBV0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7U0FDZEEsSUFBSUEsUUFBUUEsR0FBR0EsQ0FBQ0EsQ0FBQ0E7U0FDakJBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLFdBQVdBLENBQUNBLE1BQU1BLEVBQUVBLENBQUNBLEVBQUVBLEVBQUVBLENBQUNBO2FBQzFDQSxpQkFBU0EsQ0FBQ0EsSUFBSUEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7YUFDbkJBLElBQUlBLE1BQU1BLEdBQVVBLElBQUlBLENBQUNBO2FBQ3pCQSxJQUFJQSxRQUFRQSxHQUFHQSxXQUFXQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSx5QkFBeUJBO2FBQ3hEQSxJQUFJQSxRQUFRQSxHQUFHQSxXQUFXQSxJQUFJQSxXQUFXQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTthQUM3Q0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsT0FBT0EsR0FBR0EsQ0FBQ0EsTUFBTUEsSUFBSUEsUUFBUUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7aUJBQ2hDQSxFQUFFQSxDQUFDQSxDQUFDQSxPQUFPQSxRQUFRQSxDQUFDQSxHQUFHQSxJQUFJQSxXQUFXQSxDQUFDQSxDQUFDQSxDQUFDQTtxQkFDckNBLE1BQU1BLEdBQUdBLEdBQUdBLENBQUNBLE1BQU1BLENBQUNBLFFBQVFBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO2lCQUN0Q0EsQ0FBQ0E7aUJBQ0RBLElBQUlBLENBQUNBLENBQUNBO3FCQUNGQSxFQUFFQSxDQUFDQSxDQUFDQSxRQUFRQSxJQUFJQSxPQUFPQSxRQUFRQSxDQUFDQSxHQUFHQSxJQUFJQSxXQUFXQSxDQUFDQSxDQUFDQSxDQUFDQTt5QkFDakRBLE1BQU1BLEdBQUdBLENBQUNBLENBQUNBO3FCQUNmQSxDQUFDQTtpQkFDTEEsQ0FBQ0E7YUFDTEEsQ0FBQ0E7YUFDREEsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsUUFBUUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7aUJBQ2hCQSxNQUFNQSxHQUFHQSxDQUFDQSxDQUFDQTthQUNmQSxDQUFDQTthQUVEQSxFQUFFQSxDQUFDQSxDQUFDQSxNQUFNQSxJQUFJQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQTtpQkFDakJBLFFBQVFBLEVBQUVBLENBQUNBO2lCQUNYQSxlQUFNQSxDQUFDQSxXQUFXQSxDQUFDQSxNQUFNQSxDQUFDQSxFQUFFQSxJQUFJQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQTtpQkFDckNBLEVBQUVBLENBQUNBLENBQUNBLE1BQU1BLEtBQUtBLENBQUNBLENBQUNBLENBQUNBLENBQUNB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Q0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsV0FBV0EsS0FBS0EsSUFBSUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7U0FDdkNBLFdBQVdBLENBQUNBLEdBQUdBLEVBQUVBLE1BQU1BLEVBQUVBLFFBQVFBLENBQUNBLENBQUNBO1NBQ25DQSxNQUFNQSxDQUFDQTtLQUNYQSxDQUFDQTtLQUNEQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxZQUFZQSxZQUFLQSxDQUFDQSxDQUFDQSxDQUFDQTtTQUN4QkEsSUFBSUEsQ0FBQ0EsR0FBR0EsR0FBV0EsR0FBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0E7U0FDNUJBLEVBQUVBLENBQUNBLENBQVNBLEdBQUlBLENBQUNBLElBQUlBLEtBQUtBLElBQUlBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLENBQUNBO2FBQ2xDQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxTQUFTQSxHQUFHQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQTtTQUNuQ0EsQ0FBQ0E7U0FDREEsR0FBR0EsQ0FBQ0EsT0FBT0EsRUFBRUEsQ0FBQ0E7U0FDZEEsTUFBTUEsQ0FBQ0E7S0FDWEEsQ0FBQ0E7S0FFREEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsT0FBT0EsSUFBSUEsQ0FBQ0EsR0FBR0EsS0FBS0EsV0FBV0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7U0FDbENBLEVBQUVBLENBQUNBLENBQUNBLE9BQU9BLE1BQU1BLENBQUNBLE1BQU1BLElBQUlBLFdBQVdBLENBQUNBLENBQUNBLENBQUNBO2FBQ3RDQSxNQUFNQSxDQUFDQSxNQUFNQSxHQUFHQSxFQUFFQTtTQUN0QkEsQ0FBQ0E7U0FDREEsTUFBTUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsUUFBUUEsQ0FBQ0E7S0FDdkNBLENBQUNBO0tBRURBLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLFlBQVlBLGVBQVFBLENBQUNBLENBQUNBLENBQUNBO1NBQzNCQSxFQUFFQSxDQUFDQSxDQUFZQSxHQUFJQSxDQUFDQSxHQUFH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Q0FBQ0E7U0FDN0JBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLG9CQUFvQkEsRUFBRUEsQ0FBQ0E7S0FDMUNBLENBQUNBO0tBQ0RBLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLENBQUNBLENBQUNBO1NBQ2hCQSxJQUFJQSxJQUFJQSxHQUFHQSxVQUFVQSxJQUFJQSxDQUFDQSxDQUFDQSxJQUFJQSxZQUFZQSxnQkFBU0EsQ0FBQ0EsQ0FBQ0E7U0FDdERBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLE1BQU1BLEVBQUVBLENBQUNBLEVBQUVBLEVBQUVBLENBQUNBO2FBQzVDQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxJQUFJQSxFQUFFQSxDQUFDQSxFQUFFQSxJQUFJQSxDQUFDQSxDQUFDQTtTQUM1Q0EsQ0FBQ0E7S0FDTEEsQ0FBQ0E7S0FFREEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsVUFBVUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7U0FDZEEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsWUFBWUEsZ0JBQVNBLENBQUNBLENBQUNBLENBQUNBO2FBQzVCQSxNQUFNQSxDQUFDQSxHQUFHQSxDQUFDQSxXQUFXQSxDQUFDQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxDQUFDQTthQUN2Q0EsTUFBTUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsV0FBV0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsQ0FBQ0E7U0FDMUNBLENBQUNBO1NBQ0RBLElBQUlBLENBQUNBLENBQUNBO2FBQ0ZBLE1BQU1BLENBQUNBLEdBQUdBLENBQUNBLFdBQVdBLENBQUNBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1NBQ3JDQSxDQUFDQTtLQUNMQSxDQUFDQTtLQUNEQSxJQUFJQSxDQUFDQSxPQUFPQSxFQUFFQSxDQUFD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QSxLQUFLQSxDQUFDQSxHQUFHQSxPQUFPQSxDQUFDQTtTQUNoQ0EsQ0FBQ0E7U0FDREEsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsUUFBUUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsS0FBS0EsR0FBR0EsSUFBSUEsUUFBUUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsS0FBS0EsR0FBR0EsSUFBSUEsUUFBUUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsS0FBS0EsR0FBR0EsSUFBSUEsUUFBUUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsS0FBS0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7YUFFaEdBLEVBQUVBLENBQUNBLENBQUNBLE9BQU9BLElBQUlBLElBQUlBLElBQUlBLE9BQU9BLEtBQUtBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBO2lCQUN2Q0EsR0FBR0EsQ0FBQ0EsZUFBZUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsQ0FBQ0E7YUFDbENBLENBQUNBO2FBQ0RBLElBQUlBLENBQUNBLENBQUNBO2lCQUNGQSxHQUFHQSxDQUFDQSxZQUFZQSxDQUFDQSxRQUFRQSxFQUFFQSxPQUFPQSxDQUFDQSxDQUFDQTthQUN4Q0EsQ0FBQ0E7U0FDTEEsQ0FBQ0E7U0FDREEsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsUUFBUUEsS0FBS0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7U0FFaENBLENBQUNBO1NBQ0RBLElBQUlBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLFFBQVFBLElBQUlBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBO2FBQ3pCQSxFQUFFQSxDQUFDQSxDQUFDQSxPQUFPQSxPQUFPQSxJQUFJQSxVQUFVQSxDQUFDQSxDQUFDQSxDQUFDQTtpQkFDL0JBLE9BQU9BLENBQUNBLElBQUlBLENBQUNBLENBQUNBO2FBQ2xCQSxDQUFDQTthQUNEQSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxpQkFBS0EsQ0FBQ0EsU0FBU0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7aUJBQ3ZCQSxFQUFFQSxDQUFDQSxDQUFDQSxPQUFPQSxp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QUFVLEVBQUUsVUFBVTtLQUV0QixZQUFZLEVBQUUsWUFBWTtLQUMxQixVQUFVLEVBQUUsVUFBVTtLQUN0QixXQUFXLEVBQUUsV0FBVztLQUN4QixhQUFhLEVBQUUsYUFBYTtLQUM1QixZQUFZLEVBQUUsWUFBWTtLQUUxQixhQUFhLEVBQUUsYUFBYTtLQUU1QixPQUFPLEVBQUUsT0FBTztLQUNoQixPQUFPLEVBQUUsT0FBTztLQUNoQixRQUFRLEVBQUUsUUFBUTtLQUVsQixTQUFTLEVBQUUsU0FBUztLQUNwQixVQUFVLEVBQUUsVUFBVTtLQUN0QixPQUFPLEVBQUUsT0FBTztFQUNuQixDQUFDIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCA2NjA4ZjdhYjVjNTBlZjE5ZTJmZVxuICoqLyIsImltcG9ydCB7cmVuZGVyLCB1cGRhdGVyLCBjcmVhdGVFbGVtZW50LCBDb21wb25lbnR9IGZyb20gJy4vdHMvaW5kZXgnO1xuXG5jbGFzcyBBcHAgZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIGNvdW50ZXIgPSAwO1xuXG4gICAgY2xpY2soKSB7XG4gICAgICAgIHRoaXMuY291bnRlcisrO1xuICAgICAgICB0aGlzLmZvcmNlVXBkYXRlKCk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gY3JlYXRlRWxlbWVudCgnZGl2Jywge3RpdGxlOiB0aGlzLmNvdW50ZXJ9LCAnSGVsbG8nLFxuICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnYnV0dG9uJywge29uQ2xpY2s6ICgpPT50aGlzLmNsaWNrKCl9LCAnU3VwZXJDbGljaycpLFxuICAgICAgICAgICAgdGhpcy5jb3VudGVyLFxuICAgICAgICAgICAgdGhpcy5jb3VudGVyICUgMiA/XG4gICAgICAgICAgICAgICAgY3JlYXRlRWxlbWVudChXb3cpXG4gICAgICAgICAgICAgICAgOiBbMSwyLDNdXG4gICAgICAgICk7XG4gICAgfVxufVxuXG5jbGFzcyBXb3cgZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIGNvdW50ZXIgPSAwO1xuXG4gICAgY2xpY2soKSB7XG4gICAgICAgIHRoaXMuY291bnRlcisrO1xuICAgICAgICB0aGlzLmZvcmNlVXBkYXRlKCk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gY3JlYXRlRWxlbWVudCgnZGl2Jywge2lkOiB0aGlzLmNvdW50ZXJ9LFxuICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnYnV0dG9uJywge29uQ2xpY2s6ICgpPT50aGlzLmNsaWNrKCl9LCAnQ2xpY2snKSxcbiAgICAgICAgICAgICdXb3cnLCBbMSwgMiwgM10sIFs0LCA1LCA2XSwgdGhpcy5jb3VudGVyKTtcbiAgICB9XG59XG5cbnJlbmRlcihjcmVhdGVFbGVtZW50KEFwcCksIGRvY3VtZW50LmJvZHkpO1xuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2luZGV4LnRzXG4gKiovIiwiaW1wb3J0IHtyZW5kZXIsIGNyZWF0ZUVsZW1lbnQsIENvbXBvbmVudCwgZmluZERPTU5vZGUsIHVwZGF0ZXJ9IGZyb20gJy4vdG9wLWxldmVsJztcbmV4cG9ydCB7cmVuZGVyLCBjcmVhdGVFbGVtZW50LCBDb21wb25lbnQsIGZpbmRET01Ob2RlLCB1cGRhdGVyLCBWVGFnTm9kZX0gZnJvbSAnLi90b3AtbGV2ZWwnO1xuKDxhbnk+d2luZG93KS5GYXN0UmVhY3QgPSB7XG4gICAgcmVuZGVyLCBjcmVhdGVFbGVtZW50LCBDb21wb25lbnQsIGZpbmRET01Ob2RlLCB1cGRhdGU6IHVwZGF0ZXJcbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3RzL2luZGV4LnRzXG4gKiovIiwiaW1wb3J0IHtWVGV4dCwgVlRhZ05vZGUsIFZOb2RlLCBWQ29tcG9uZW50LCBWRnJhZ21lbnR9IGZyb20gJy4vbm9kZSc7XG5pbXBvcnQge0lDb21wb25lbnR9IGZyb20gJy4vY29tcG9uZW50JztcbmltcG9ydCB7YXBwZW5kfSBmcm9tICcuL2FwcGVuZCc7XG5pbXBvcnQge3VwZGF0ZX0gZnJvbSAnLi91cGRhdGUnO1xuaW1wb3J0IHtub3JtQ2hpbGR9IGZyb20gJy4vdXRpbHMnO1xuXG5leHBvcnQge0NvbXBvbmVudCwgZmluZERPTU5vZGV9IGZyb20gJy4vY29tcG9uZW50JztcbmV4cG9ydCB7VlRhZ05vZGV9IGZyb20gJy4vbm9kZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiByZW5kZXIobm9kZTpWTm9kZSwgZG9tOk5vZGUpIHtcbiAgICB2YXIgcm9vdCA9IG5ldyBWVGFnTm9kZShudWxsLCBudWxsLCBbbm9kZV0sIG51bGwpO1xuICAgIHJvb3QuZG9tID0gZG9tO1xuICAgIG5vcm1DaGlsZChyb290LCAwKTtcbiAgICBhcHBlbmQocm9vdCwgMCk7XG4gICAgcmV0dXJuIG5vZGU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVyKG9sZDpWTm9kZSwgbm9kZTpWTm9kZSkge1xuICAgIHZhciByb290ID0gbmV3IFZUYWdOb2RlKG51bGwsIG51bGwsIFtub2RlXSwgbnVsbCk7XG4gICAgcm9vdC5kb20gPSBvbGQuZG9tLnBhcmVudE5vZGU7XG4gICAgbm9ybUNoaWxkKHJvb3QsIDApO1xuICAgIHVwZGF0ZShvbGQsIHJvb3QsIDApO1xuICAgIHJldHVybiByb290LmNoaWxkcmVuWzBdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRWxlbWVudCh0YWc6c3RyaW5nIHwgSUNvbXBvbmVudCwgYXR0cnM/OmFueSwgLi4uY2hpbGRyZW46YW55W10pOlZOb2RlO1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQodGFnOnN0cmluZyB8IElDb21wb25lbnQsIGF0dHJzPzphbnkpOlZOb2RlIHtcbiAgICBpZiAoYXR0cnMpIHtcbiAgICAgICAgdmFyIGtleSA9IHR5cGVvZiBhdHRycy5rZXkgPT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBhdHRycy5rZXk7XG4gICAgICAgIC8vdmFyIHJlZiA9IHR5cGVvZiBhdHRycy5yZWYgPT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBhdHRycy5yZWY7XG4gICAgfVxuICAgIHZhciBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgIHZhciBjaGlsZHJlbjphbnlbXSA9IG51bGw7XG4gICAgaWYgKGxlbiA+IDIpIHtcbiAgICAgICAgY2hpbGRyZW4gPSBBcnJheShsZW4gLSAyKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDI7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgY2hpbGRyZW5baSAtIDJdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmICh0YWcgPT0gJ0AnKSB7XG4gICAgICAgIHJldHVybiBuZXcgVkZyYWdtZW50KGNoaWxkcmVuLCBrZXkpO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIHRhZyA9PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm4gbmV3IFZUYWdOb2RlKDxzdHJpbmc+dGFnLCBhdHRycywgY2hpbGRyZW4sIGtleSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiB0YWcgPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICByZXR1cm4gbmV3IFZDb21wb25lbnQoPElDb21wb25lbnQ+dGFnLCBhdHRycywgY2hpbGRyZW4sIGtleSk7XG4gICAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90cy90b3AtbGV2ZWwudHNcbiAqKi8iLCJpbXBvcnQge1ZUZXh0LCBWVGFnTm9kZSwgVk5vZGUsIFZDb21wb25lbnQsIFZGcmFnbWVudCwgZ2V0VlRleHR9IGZyb20gJy4vbm9kZSc7XG5leHBvcnQgZnVuY3Rpb24gbm9ybUNoaWxkKHBhcmVudDpWTm9kZSwgY2hpbGRQb3M6bnVtYmVyKSB7XG4gICAgdmFyIG5vZGUgPSA8YW55PnBhcmVudC5jaGlsZHJlbltjaGlsZFBvc107XG4gICAgaWYgKHR5cGVvZiBub2RlID09ICdvYmplY3QnICYmIG5vZGUgJiYgbm9kZSBpbnN0YW5jZW9mIFZOb2RlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBub2RlID09ICdzdHJpbmcnIHx8IHR5cGVvZiBub2RlID09ICdudW1iZXInKSB7XG4gICAgICAgIHBhcmVudC5jaGlsZHJlbltjaGlsZFBvc10gPSBnZXRWVGV4dChub2RlICsgJycpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChub2RlID09IG51bGwpIHtcbiAgICAgICAgcGFyZW50LmNoaWxkcmVuW2NoaWxkUG9zXSA9IGdldFZUZXh0KCcnKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIG5vZGUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIGlmIChub2RlIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgIHBhcmVudC5jaGlsZHJlbltjaGlsZFBvc10gPSBuZXcgVkZyYWdtZW50KG5vZGUsIG51bGwpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcGFyZW50LmNoaWxkcmVuW2NoaWxkUG9zXSA9IGdldFZUZXh0KEpTT04uc3RyaW5naWZ5KG5vZGUpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0eXBlb2Ygbm9kZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBwYXJlbnQuY2hpbGRyZW5bY2hpbGRQb3NdID0gZ2V0VlRleHQoJ0Z1bmN0aW9uJyk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcGFyZW50LmNoaWxkcmVuW2NoaWxkUG9zXSA9IGdldFZUZXh0KCcnKTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdHMvdXRpbHMudHNcbiAqKi8iLCJpbXBvcnQge0lDb21wb25lbnQsIENvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnQnO1xuXG52YXIgaWQgPSAxO1xuXG5leHBvcnQgY2xhc3MgVk5vZGUge1xuICAgIGlkOm51bWJlcjtcbiAgICBjaGlsZHJlbjpWTm9kZVtdO1xuICAgIGtleU1hcDp7W2luZGV4OiBzdHJpbmddOm51bWJlcn07XG4gICAga2V5OnN0cmluZztcbiAgICBkZXN0cm95ZWQ6Ym9vbGVhbjtcbiAgICBkb206Tm9kZTtcbiAgICByZWY6c3RyaW5nO1xuXG4gICAgZGVzdHJveSgpIHtcbiAgICAgICAgaWYgKHRoaXMuZGVzdHJveWVkKSB7XG4gICAgICAgICAgICB0aHJvdyBcIk5vZGUgeWV0IGRlc3Ryb3llZFwiO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZGVzdHJveWVkID0gdHJ1ZTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBWRnJhZ21lbnQgZXh0ZW5kcyBWTm9kZSB7XG4gICAgbGFzdE5vZGU6Tm9kZTtcbiAgICBmaXJzdE5vZGU6Tm9kZTtcblxuICAgIGNvbnN0cnVjdG9yKGNoaWxkcmVuOlZOb2RlW10sIGtleTpzdHJpbmcpIHtcbiAgICAgICAgaWYgKGZhbHNlKSB7XG4gICAgICAgICAgICBzdXBlcigpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaWQgPSBpZCsrO1xuICAgICAgICB0aGlzLmRvbSA9IG51bGw7XG4gICAgICAgIHRoaXMubGFzdE5vZGUgPSBudWxsO1xuICAgICAgICB0aGlzLmZpcnN0Tm9kZSA9IG51bGw7XG4gICAgICAgIHRoaXMuY2hpbGRyZW4gPSBjaGlsZHJlbjtcbiAgICAgICAgdGhpcy5rZXkgPSBrZXk7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgVkNvbXBvbmVudCBleHRlbmRzIFZGcmFnbWVudCB7XG4gICAgYXR0cnM6YW55O1xuICAgIC8vdG9kb1xuICAgIGNvbXBvbmVudDpDb21wb25lbnQ7XG4gICAgY3RvcjpJQ29tcG9uZW50O1xuXG4gICAgY29uc3RydWN0b3IoY3RvcjpJQ29tcG9uZW50LCBhdHRyczphbnksIGNoaWxkcmVuOlZOb2RlW10sIGtleTpzdHJpbmcpIHtcbiAgICAgICAgaWYgKGZhbHNlKSB7XG4gICAgICAgICAgICBzdXBlcihudWxsLCBudWxsKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmlkID0gaWQrKztcbiAgICAgICAgdGhpcy5kb20gPSBudWxsO1xuICAgICAgICB0aGlzLmxhc3ROb2RlID0gbnVsbDtcbiAgICAgICAgdGhpcy5maXJzdE5vZGUgPSBudWxsO1xuICAgICAgICB0aGlzLmN0b3IgPSBjdG9yO1xuICAgICAgICB0aGlzLmF0dHJzID0gYXR0cnM7XG4gICAgICAgIHRoaXMuY2hpbGRyZW4gPSBjaGlsZHJlbjtcbiAgICAgICAgdGhpcy5rZXkgPSBrZXk7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgVlRhZ05vZGUgZXh0ZW5kcyBWTm9kZSB7XG4gICAgYXR0cnM6YW55O1xuICAgIGF0dHJzQ29kZTpzdHJpbmc7XG4gICAgdGFnOnN0cmluZztcbiAgICB0ZXh0OnN0cmluZztcblxuICAgIGNvbnN0cnVjdG9yKHRhZzpzdHJpbmcsIGF0dHJzOmFueSwgY2hpbGRyZW46Vk5vZGVbXSwga2V5OnN0cmluZykge1xuICAgICAgICBpZiAoZmFsc2UpIHtcbiAgICAgICAgICAgIHN1cGVyKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pZCA9IGlkKys7XG4gICAgICAgIHRoaXMuZG9tID0gbnVsbDtcbiAgICAgICAgdGhpcy50YWcgPSB0YWc7XG4gICAgICAgIHRoaXMuYXR0cnMgPSBhdHRycztcbiAgICAgICAgdGhpcy5hdHRyc0NvZGUgPSAnJztcbiAgICAgICAgdGhpcy5rZXkgPSBrZXk7XG4gICAgICAgIC8qaWYgKGNoaWxkcmVuICYmIGNoaWxkcmVuLmxlbmd0aCA9PSAxKSB7XG4gICAgICAgICAgICB2YXIgY2hpbGQgPSBjaGlsZHJlblswXTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgY2hpbGQgPT0gJ3N0cmluZycgfHwgdHlwZW9mIGNoaWxkID09ICdudW1iZXInKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50ZXh0ID0gY2hpbGQgKyAnJztcbiAgICAgICAgICAgICAgICBjaGlsZHJlbiA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0qL1xuICAgICAgICB0aGlzLmNoaWxkcmVuID0gY2hpbGRyZW47XG4gICAgfVxuXG4gICAgZGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5kb20gPSBudWxsO1xuICAgICAgICB0aGlzLmF0dHJzID0gbnVsbDtcbiAgICAgICAgdGhpcy5jaGlsZHJlbiA9IG51bGw7XG4gICAgfVxufVxuVlRhZ05vZGUucHJvdG90eXBlLnRleHQgPSBudWxsO1xuXG52YXIgdGV4dENhY2hlID0gPGFueT5uZXcgQXJyYXkoMTAwMDAwKTtcbnRleHRDYWNoZS5sZW4gPSAwO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0VlRleHQodGV4dDpzdHJpbmcpIHtcbiAgICBpZiAodGV4dENhY2hlLmxlbiA+IDApIHtcbiAgICAgICAgdmFyIGl0ZW0gPSB0ZXh0Q2FjaGVbLS10ZXh0Q2FjaGUubGVuXTtcbiAgICAgICAgaXRlbS50ZXh0ID0gdGV4dDtcbiAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgfVxuICAgIHJldHVybiBuZXcgVlRleHQodGV4dCk7XG59XG5cbmV4cG9ydCBjbGFzcyBWVGV4dCBleHRlbmRzIFZOb2RlIHtcbiAgICB0ZXh0OnN0cmluZztcblxuICAgIGNvbnN0cnVjdG9yKHRleHQ6c3RyaW5nKSB7XG4gICAgICAgIGlmIChmYWxzZSkge1xuICAgICAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgfVxuICAgICAgICAvL3RoaXMuaWQgPSBpZCsrO1xuICAgICAgICB0aGlzLmRvbSA9IG51bGw7XG4gICAgICAgIHRoaXMudGV4dCA9IHRleHQ7XG4gICAgfVxuXG4gICAgZGVzdHJveSgpIHtcbiAgICAgICAgLy90aGlzLmRvbSA9IG51bGw7XG4gICAgICAgIHRleHRDYWNoZVt0ZXh0Q2FjaGUubGVuKytdID0gdGhpcztcbiAgICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3RzL25vZGUudHNcbiAqKi8iLCJpbXBvcnQge1ZUZXh0LCBWVGFnTm9kZSwgVk5vZGUsIFZDb21wb25lbnQsIFZGcmFnbWVudH0gZnJvbSAnLi9ub2RlJztcbmltcG9ydCB7bm9ybUNoaWxkfSBmcm9tICcuL3V0aWxzJztcbmltcG9ydCB7Y3JlYXRlQ29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudCc7XG5pbXBvcnQge2NyZWF0ZUF0dHJzfSBmcm9tICcuL2F0dHJzJztcbmV4cG9ydCBmdW5jdGlvbiBhcHBlbmQocGFyZW50OlZOb2RlLCBjaGlsZFBvczpudW1iZXIsIGJlZm9yZUNoaWxkPzpOb2RlKSB7XG4gICAgaWYgKGJlZm9yZUNoaWxkID09IG51bGwgJiYgcGFyZW50IGluc3RhbmNlb2YgVkZyYWdtZW50KSB7XG4gICAgICAgIGJlZm9yZUNoaWxkID0gcGFyZW50Lmxhc3ROb2RlO1xuICAgIH1cbiAgICBsZXQgcGFyZW50RG9tID0gcGFyZW50LmRvbTtcbiAgICBsZXQgbm9kZSA9IHBhcmVudC5jaGlsZHJlbltjaGlsZFBvc107XG4gICAgaWYgKHR5cGVvZiBub2RlLmtleSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBwYXJlbnQua2V5TWFwID09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBwYXJlbnQua2V5TWFwID0ge31cbiAgICAgICAgfVxuICAgICAgICBwYXJlbnQua2V5TWFwW25vZGUua2V5XSA9IGNoaWxkUG9zO1xuICAgIH1cblxuICAgIGlmIChub2RlIGluc3RhbmNlb2YgVlRhZ05vZGUpIHtcbiAgICAgICAgbm9kZS5kb20gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KG5vZGUudGFnKTtcbiAgICAgICAgaWYgKG5vZGUuYXR0cnMpIHtcbiAgICAgICAgICAgIGNyZWF0ZUF0dHJzKG5vZGUpO1xuICAgICAgICB9XG4gICAgICAgIHBhcmVudERvbS5pbnNlcnRCZWZvcmUobm9kZS5kb20sIGJlZm9yZUNoaWxkKTtcbiAgICAgICAgaWYgKG5vZGUudGV4dCAhPSBudWxsKSB7XG4gICAgICAgICAgICBub2RlLmRvbS50ZXh0Q29udGVudCA9IG5vZGUudGV4dDtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmIChub2RlIGluc3RhbmNlb2YgVlRleHQpIHtcbiAgICAgICAgbm9kZS5kb20gPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShub2RlLnRleHQpO1xuICAgICAgICBwYXJlbnREb20uaW5zZXJ0QmVmb3JlKG5vZGUuZG9tLCBiZWZvcmVDaGlsZCk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZWxzZSBpZiAobm9kZSBpbnN0YW5jZW9mIFZGcmFnbWVudCkge1xuICAgICAgICBub2RlLmRvbSA9IHBhcmVudERvbTtcbiAgICAgICAgbGV0IHR4dCA9IG5vZGUgaW5zdGFuY2VvZiBWQ29tcG9uZW50ID8gKDxhbnk+bm9kZS5jdG9yKS5uYW1lICsgJzonICsgbm9kZS5pZCA6ICcjJztcbiAgICAgICAgbm9kZS5maXJzdE5vZGUgPSBkb2N1bWVudC5jcmVhdGVDb21tZW50KCcgJyArIHR4dCArICcgJyk7XG4gICAgICAgIG5vZGUubGFzdE5vZGUgPSBkb2N1bWVudC5jcmVhdGVDb21tZW50KCcgOicgKyB0eHQgKyAnICcpO1xuICAgICAgICAoPGFueT5ub2RlLmZpcnN0Tm9kZSkuc2tpcCA9IHRydWU7XG4gICAgICAgICg8YW55Pm5vZGUubGFzdE5vZGUpLnNraXAgPSB0cnVlO1xuICAgICAgICBwYXJlbnREb20uaW5zZXJ0QmVmb3JlKG5vZGUuZmlyc3ROb2RlLCBiZWZvcmVDaGlsZCk7XG4gICAgICAgIHBhcmVudERvbS5pbnNlcnRCZWZvcmUobm9kZS5sYXN0Tm9kZSwgYmVmb3JlQ2hpbGQpO1xuXG4gICAgICAgIGlmIChub2RlIGluc3RhbmNlb2YgVkNvbXBvbmVudCkge1xuICAgICAgICAgICAgY3JlYXRlQ29tcG9uZW50KG5vZGUpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYgKG5vZGUuY2hpbGRyZW4pIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBub2RlLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBub3JtQ2hpbGQobm9kZSwgaSk7XG4gICAgICAgICAgICBhcHBlbmQobm9kZSwgaSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3RzL2FwcGVuZC50c1xuICoqLyIsImltcG9ydCB7VlRleHQsIFZUYWdOb2RlLCBWTm9kZSwgVkNvbXBvbmVudCwgVkZyYWdtZW50fSBmcm9tICcuL25vZGUnO1xuaW1wb3J0IHthcHBlbmR9IGZyb20gJy4vYXBwZW5kJztcbmltcG9ydCB7dXBkYXRlfSBmcm9tICcuL3VwZGF0ZSc7XG5pbXBvcnQge3VwZGF0ZUNoaWxkcmVufSBmcm9tICcuL3VwZGF0ZS1jaGlsZHJlbic7XG5pbXBvcnQge25vcm1DaGlsZH0gZnJvbSAnLi91dGlscyc7XG5leHBvcnQgbGV0IGdsb2JzOntjb21wb25lbnQ6IENvbXBvbmVudH0gPSB7Y29tcG9uZW50OiBudWxsfTtcblxuZXhwb3J0IGludGVyZmFjZSBJQ29tcG9uZW50IHtcbiAgICBuZXcocHJvcHM6YW55KTogQ29tcG9uZW50O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFByb3BzIHtcbiAgICBjaGlsZHJlbjogVk5vZGVbXTtcbn1cblxuZXhwb3J0IGNsYXNzIENvbXBvbmVudCB7XG4gICAgbm9kZTpWQ29tcG9uZW50O1xuICAgIHByb3BzOlByb3BzO1xuICAgIHJlZnM6e1tpbmRleDogc3RyaW5nXTogVk5vZGV9O1xuXG4gICAgY29uc3RydWN0b3IocHJvcHM6UHJvcHMpIHtcbiAgICAgICAgdGhpcy5wcm9wcyA9IHByb3BzO1xuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcblxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuXG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFVwZGF0ZSgpIHtcblxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcblxuICAgIH1cblxuICAgIC8vdG9kb1xuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMocHJvcHM6UHJvcHMpIHtcblxuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuXG4gICAgfVxuXG4gICAgcmVuZGVyKCk6Vk5vZGUge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBmb3JjZVVwZGF0ZSgpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnRXaWxsVXBkYXRlKCk7XG5cbiAgICAgICAgdmFyIGNoaWxkcmVuID0gW3RoaXMucmVuZGVyKCldO1xuICAgICAgICB2YXIgdGVtcCA9IG5ldyBWQ29tcG9uZW50KG51bGwsIG51bGwsIGNoaWxkcmVuLCBudWxsKTtcbiAgICAgICAgdGVtcC5maXJzdE5vZGUgPSB0aGlzLm5vZGUuZmlyc3ROb2RlO1xuICAgICAgICB0ZW1wLmxhc3ROb2RlID0gdGhpcy5ub2RlLmxhc3ROb2RlO1xuICAgICAgICB0ZW1wLmRvbSA9IHRoaXMubm9kZS5kb207XG4gICAgICAgIGxldCBwcmV2Q29tcG9uZW50ID0gZ2xvYnMuY29tcG9uZW50O1xuICAgICAgICBnbG9icy5jb21wb25lbnQgPSB0aGlzO1xuICAgICAgICB1cGRhdGVDaGlsZHJlbih0aGlzLm5vZGUsIHRlbXApOyAvLyBjbGVhciB0aGlzLm5vZGUuY2hpbGRyZW5cbiAgICAgICAgZ2xvYnMuY29tcG9uZW50ID0gcHJldkNvbXBvbmVudDtcbiAgICAgICAgdGhpcy5ub2RlLmNoaWxkcmVuID0gdGVtcC5jaGlsZHJlbjtcbiAgICAgICAgdGhpcy5jb21wb25lbnREaWRVcGRhdGUoKTtcbiAgICAgICAgLy90ZW1wLmRlc3Ryb3koKTtcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmaW5kRE9NTm9kZShub2RlOlZUYWdOb2RlIHwgVlRleHQpIHtcbiAgICByZXR1cm4gbm9kZS5kb207XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVDb21wb25lbnQobm9kZTpWQ29tcG9uZW50KSB7XG4gICAgdmFyIHByb3BzID0gbm9kZS5hdHRycyB8fCB7fTtcbiAgICBwcm9wcy5jaGlsZHJlbiA9IG5vZGUuY2hpbGRyZW47XG4gICAgdmFyIGNvbXBvbmVudCA9IG5ldyBub2RlLmN0b3IocHJvcHMpO1xuICAgIGNvbXBvbmVudC5ub2RlID0gbm9kZTtcbiAgICBub2RlLmNvbXBvbmVudCA9IGNvbXBvbmVudDtcbiAgICBjb21wb25lbnQuY29tcG9uZW50V2lsbE1vdW50KCk7XG4gICAgbm9kZS5jaGlsZHJlbiA9IFtjb21wb25lbnQucmVuZGVyKCldO1xuICAgIGxldCBwcmV2Q29tcG9uZW50ID0gZ2xvYnMuY29tcG9uZW50O1xuICAgIGdsb2JzLmNvbXBvbmVudCA9IGNvbXBvbmVudDtcbiAgICBpZiAobm9kZS5jaGlsZHJlbikge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5vZGUuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIG5vcm1DaGlsZChub2RlLCBpKTtcbiAgICAgICAgICAgIGFwcGVuZChub2RlLCBpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBnbG9icy5jb21wb25lbnQgPSBwcmV2Q29tcG9uZW50O1xuICAgIG5vZGUuY29tcG9uZW50LmNvbXBvbmVudERpZE1vdW50KCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVDb21wb25lbnQob2xkOlZDb21wb25lbnQsIHBhcmVudDpWTm9kZSwgY2hpbGRQb3M6bnVtYmVyKSB7XG4gICAgdmFyIG5ld05vZGUgPSA8VkNvbXBvbmVudD5wYXJlbnQuY2hpbGRyZW5bY2hpbGRQb3NdO1xuICAgIHZhciBwcm9wcyA9IG5ld05vZGUuYXR0cnMgfHwge307XG4gICAgcHJvcHMuY2hpbGRyZW4gPSBuZXdOb2RlLmNoaWxkcmVuO1xuICAgIG9sZC5jb21wb25lbnQuY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhwcm9wcyk7XG4gICAgb2xkLmNvbXBvbmVudC5wcm9wcyA9IHByb3BzO1xuICAgIG9sZC5jb21wb25lbnQuZm9yY2VVcGRhdGUoKTtcdCAvLyBhZmZlY3Qgbm9kZSBjaGlsZHJlblxuICAgIHBhcmVudC5jaGlsZHJlbltjaGlsZFBvc10gPSBvbGQ7XG4gICAgbmV3Tm9kZS5kZXN0cm95KCk7XG4gICAgLy9ubyBkZXN0cm95IG9sZFxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90cy9jb21wb25lbnQudHNcbiAqKi8iLCJpbXBvcnQge1ZUZXh0LCBWVGFnTm9kZSwgVk5vZGUsIFZDb21wb25lbnQsIFZGcmFnbWVudH0gZnJvbSAnLi9ub2RlJztcbmltcG9ydCB7YXBwZW5kfSBmcm9tICcuL2FwcGVuZCc7XG5pbXBvcnQge3VwZGF0ZX0gZnJvbSAnLi91cGRhdGUnO1xuaW1wb3J0IHtyZW1vdmV9IGZyb20gJy4vcmVtb3ZlJztcbmltcG9ydCB7bm9ybUNoaWxkfSBmcm9tICcuL3V0aWxzJztcblxuXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlQ2hpbGRyZW4ob2xkOlZOb2RlLCBub2RlOlZOb2RlKSB7XG4gICAgdmFyIG9sZENoaWxkcmVuID0gb2xkLmNoaWxkcmVuO1xuICAgIHZhciBuZXdDaGlsZHJlbiA9IG5vZGUuY2hpbGRyZW47XG4gICAgdmFyIGluc2VydHM6bnVtYmVyW10gPSBbXTtcbiAgICBpZiAoIW9sZENoaWxkcmVuICYmIG5ld0NoaWxkcmVuKSB7XG4gICAgICAgIHZhciBiZWZvcmVDaGlsZCA9IG5vZGUgaW5zdGFuY2VvZiBWRnJhZ21lbnQgPyBub2RlLmxhc3ROb2RlIDogbnVsbDtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBuZXdDaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbm9ybUNoaWxkKG5vZGUsIGkpO1xuICAgICAgICAgICAgYXBwZW5kKG5vZGUsIGksIGJlZm9yZUNoaWxkKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChvbGRDaGlsZHJlbiAmJiAhbmV3Q2hpbGRyZW4pIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBvbGRDaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgcmVtb3ZlKG9sZENoaWxkcmVuW2ldLCBvbGQsIGkpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChuZXdDaGlsZHJlbikge1xuICAgICAgICB2YXIgZml0Q291bnQgPSAwO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5ld0NoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBub3JtQ2hpbGQobm9kZSwgaSk7XG4gICAgICAgICAgICB2YXIgZml0UG9zOm51bWJlciA9IG51bGw7XG4gICAgICAgICAgICB2YXIgbmV3Q2hpbGQgPSBuZXdDaGlsZHJlbltpXTsgLy8gb25seSB1c2UgYmVmb3JlIHVwZGF0ZVxuICAgICAgICAgICAgdmFyIG9sZENoaWxkID0gb2xkQ2hpbGRyZW4gJiYgb2xkQ2hpbGRyZW5baV07XG4gICAgICAgICAgICBpZiAodHlwZW9mIG9sZC5rZXlNYXAgPT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG5ld0NoaWxkLmtleSAhPSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICBmaXRQb3MgPSBvbGQua2V5TWFwW25ld0NoaWxkLmtleV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAob2xkQ2hpbGQgJiYgdHlwZW9mIG9sZENoaWxkLmtleSA9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZml0UG9zID0gaTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKG9sZENoaWxkKSB7XG4gICAgICAgICAgICAgICAgZml0UG9zID0gaTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGZpdFBvcyAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgZml0Q291bnQrKztcbiAgICAgICAgICAgICAgICB1cGRhdGUob2xkQ2hpbGRyZW5bZml0UG9zXSwgbm9kZSwgaSk7XG4gICAgICAgICAgICAgICAgaWYgKGZpdFBvcyAhPT0gaSkge1xuICAgICAgICAgICAgICAgICAgICBpbnNlcnRzLnB1c2goaSk7XG4gICAgICAgICAgICAgICAgICAgIC8vbW92ZShub2RlLmNoaWxkcmVuW2ldLCBub2RlLCBiZWZvcmVDaGlsZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG9sZENoaWxkcmVuW2ZpdFBvc10gPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaW5zZXJ0cy5wdXNoKGkpO1xuICAgICAgICAgICAgICAgIC8vYXBwZW5kKG5vZGUsIGksIGJlZm9yZUNoaWxkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgaWYgKG9sZENoaWxkcmVuICYmIG9sZENoaWxkcmVuLmxlbmd0aCAhPT0gZml0Q291bnQpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBvbGRDaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIG9sZENoaWxkID0gb2xkQ2hpbGRyZW5baV07XG4gICAgICAgICAgICBpZiAob2xkQ2hpbGQpIHtcbiAgICAgICAgICAgICAgICByZW1vdmUob2xkQ2hpbGQsIG9sZCwgaSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9sZENoaWxkcmVuW2ldID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlmIChpbnNlcnRzLmxlbmd0aCkge1xuICAgICAgICBmb3IgKHZhciBpID0gaW5zZXJ0cy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgdmFyIHBvczpudW1iZXIgPSBpbnNlcnRzW2ldO1xuXG4gICAgICAgICAgICBpZiAoaSA9PSBpbnNlcnRzLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgICAgICB2YXIgYmVmb3JlQ2hpbGQgPSBub2RlIGluc3RhbmNlb2YgVkZyYWdtZW50XG4gICAgICAgICAgICAgICAgICAgID8gbm9kZS5sYXN0Tm9kZVxuICAgICAgICAgICAgICAgICAgICA6IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBiZWZvcmVDaGlsZCA9IG5ld0NoaWxkcmVuW2kgKyAxXSBpbnN0YW5jZW9mIFZGcmFnbWVudFxuICAgICAgICAgICAgICAgICAgICA/ICg8VkZyYWdtZW50Pm5ld0NoaWxkcmVuW2kgKyAxXSkuZmlyc3ROb2RlXG4gICAgICAgICAgICAgICAgICAgIDogbmV3Q2hpbGRyZW5baSArIDFdLmRvbTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG5ld0NoaWxkcmVuW3Bvc10uZG9tKSB7XG4gICAgICAgICAgICAgICAgbW92ZShuZXdDaGlsZHJlbltwb3NdLCBub2RlLCBiZWZvcmVDaGlsZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBhcHBlbmQobm9kZSwgcG9zLCBiZWZvcmVDaGlsZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIG1vdmUobm9kZTpWTm9kZSwgcGFyZW50OlZOb2RlLCBiZWZvcmVDaGlsZDpOb2RlKSB7XG4gICAgaWYgKG5vZGUgaW5zdGFuY2VvZiBWRnJhZ21lbnQpIHtcbiAgICAgICAgdmFyIHByZXZEb206Tm9kZTtcbiAgICAgICAgdmFyIGRvbSA9IG5vZGUubGFzdE5vZGU7XG4gICAgICAgIHZhciBlbmROb2RlID0gbm9kZS5maXJzdE5vZGU7XG4gICAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgICAgICBwcmV2RG9tID0gZG9tLnByZXZpb3VzU2libGluZztcbiAgICAgICAgICAgIGlmIChkb20ucHJldmlvdXNTaWJsaW5nICE9PSBiZWZvcmVDaGlsZCkge1xuICAgICAgICAgICAgICAgIHBhcmVudC5kb20uaW5zZXJ0QmVmb3JlKGRvbSwgYmVmb3JlQ2hpbGQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYmVmb3JlQ2hpbGQgPSBkb207XG4gICAgICAgICAgICBpZiAoZG9tID09IGVuZE5vZGUpIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRvbSA9IHByZXZEb207XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHBhcmVudC5kb20uaW5zZXJ0QmVmb3JlKG5vZGUuZG9tLCBiZWZvcmVDaGlsZCk7XG4gICAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90cy91cGRhdGUtY2hpbGRyZW4udHNcbiAqKi8iLCJpbXBvcnQge1ZUZXh0LCBWVGFnTm9kZSwgVk5vZGUsIFZDb21wb25lbnQsIFZGcmFnbWVudH0gZnJvbSAnLi9ub2RlJztcbmltcG9ydCB7bm9ybUNoaWxkfSBmcm9tICcuL3V0aWxzJztcbmltcG9ydCB7cmVtb3ZlfSBmcm9tICcuL3JlbW92ZSc7XG5pbXBvcnQge2FwcGVuZH0gZnJvbSAnLi9hcHBlbmQnO1xuaW1wb3J0IHt1cGRhdGVDaGlsZHJlbn0gZnJvbSAnLi91cGRhdGUtY2hpbGRyZW4nO1xuaW1wb3J0IHt1cGRhdGVBdHRyc30gZnJvbSAnLi9hdHRycyc7XG5pbXBvcnQge3VwZGF0ZUNvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnQnO1xuXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlKG9sZDpWTm9kZSwgcGFyZW50OlZOb2RlLCBjaGlsZFBvczpudW1iZXIpIHtcbiAgICB2YXIgbm9kZSA9IHBhcmVudC5jaGlsZHJlbltjaGlsZFBvc107XG5cbiAgICBpZiAob2xkLmNvbnN0cnVjdG9yICE9PSBub2RlLmNvbnN0cnVjdG9yKSB7XG4gICAgICAgIHJlcGxhY2VOb2RlKG9sZCwgcGFyZW50LCBjaGlsZFBvcyk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKG5vZGUgaW5zdGFuY2VvZiBWVGV4dCkge1xuICAgICAgICBub2RlLmRvbSA9ICg8VlRleHQ+b2xkKS5kb207XG4gICAgICAgIGlmICgoPFZUZXh0Pm9sZCkudGV4dCAhPT0gbm9kZS50ZXh0KSB7XG4gICAgICAgICAgICBub2RlLmRvbS5ub2RlVmFsdWUgPSBub2RlLnRleHQ7XG4gICAgICAgIH1cbiAgICAgICAgb2xkLmRlc3Ryb3koKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2Ygbm9kZS5rZXkgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGlmICh0eXBlb2YgcGFyZW50LmtleU1hcCA9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgcGFyZW50LmtleU1hcCA9IHt9XG4gICAgICAgIH1cbiAgICAgICAgcGFyZW50LmtleU1hcFtub2RlLmtleV0gPSBjaGlsZFBvcztcbiAgICB9XG5cbiAgICBpZiAobm9kZSBpbnN0YW5jZW9mIFZUYWdOb2RlKSB7XG4gICAgICAgIGlmICgoPFZUYWdOb2RlPm9sZCkudGFnICE9PSBub2RlLnRhZykge1xuICAgICAgICAgICAgcmVwbGFjZU5vZGUob2xkLCBwYXJlbnQsIGNoaWxkUG9zKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBub2RlLmRvbSA9ICg8VlRhZ05vZGU+b2xkKS5kb207XG5cbiAgICAgICAgdXBkYXRlQXR0cnMoPFZUYWdOb2RlPm9sZCwgcGFyZW50LCBjaGlsZFBvcyk7XG5cbiAgICAgICAgaWYgKG5vZGUudGV4dCAhPSBudWxsKXtcbiAgICAgICAgICAgIGlmICgoPFZUZXh0Pm9sZCkudGV4dCAhPT0gbm9kZS50ZXh0KSB7XG4gICAgICAgICAgICAgICAgbm9kZS5kb20udGV4dENvbnRlbnQgPSBub2RlLnRleHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvbGQuZGVzdHJveSgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCg8VlRhZ05vZGU+b2xkKS50ZXh0ICE9IG51bGwpe1xuICAgICAgICAgICAgbm9kZS5kb20ucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChub2RlLmRvbSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAobm9kZSBpbnN0YW5jZW9mIFZGcmFnbWVudCkge1xuICAgICAgICBpZiAobm9kZSBpbnN0YW5jZW9mIFZDb21wb25lbnQpIHtcbiAgICAgICAgICAgIGlmICgoPFZDb21wb25lbnQ+b2xkKS5jdG9yICE9PSBub2RlLmN0b3IpIHtcbiAgICAgICAgICAgICAgICByZXBsYWNlTm9kZShvbGQsIHBhcmVudCwgY2hpbGRQb3MpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHVwZGF0ZUNvbXBvbmVudCg8VkNvbXBvbmVudD5vbGQsIHBhcmVudCwgY2hpbGRQb3MpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIG5vZGUubGFzdE5vZGUgPSAoPFZGcmFnbWVudD5vbGQpLmxhc3ROb2RlO1xuICAgICAgICBub2RlLmZpcnN0Tm9kZSA9ICg8VkZyYWdtZW50Pm9sZCkuZmlyc3ROb2RlO1xuICAgICAgICBub2RlLmRvbSA9ICg8VkZyYWdtZW50Pm9sZCkuZG9tO1xuICAgIH1cblxuICAgIHVwZGF0ZUNoaWxkcmVuKG9sZCwgbm9kZSk7XG4gICAgb2xkLmRlc3Ryb3koKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlcGxhY2VOb2RlKG9sZDpWTm9kZSwgcGFyZW50OlZOb2RlLCBjaGlsZFBvczpudW1iZXIpIHtcbiAgICBhcHBlbmQocGFyZW50LCBjaGlsZFBvcywgb2xkIGluc3RhbmNlb2YgVkZyYWdtZW50ID8gb2xkLmZpcnN0Tm9kZSA6ICg8VlRhZ05vZGU+b2xkKS5kb20pO1xuICAgIHJlbW92ZShvbGQsIHBhcmVudCk7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3RzL3VwZGF0ZS50c1xuICoqLyIsImltcG9ydCB7VlRleHQsIFZUYWdOb2RlLCBWTm9kZSwgVkNvbXBvbmVudCwgVkZyYWdtZW50fSBmcm9tICcuL25vZGUnO1xuaW1wb3J0IHthcHBlbmR9IGZyb20gJy4vYXBwZW5kJztcbmltcG9ydCB7dXBkYXRlfSBmcm9tICcuL3VwZGF0ZSc7XG5pbXBvcnQge25vcm1DaGlsZH0gZnJvbSAnLi91dGlscyc7XG5cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmUobm9kZTpWTm9kZSwgcGFyZW50OlZOb2RlLCBjaGlsZFBvcz86bnVtYmVyLCBza2lwUmVtb3ZlPzpib29sZWFuKSB7XG4gICAgaWYgKG5vZGUgaW5zdGFuY2VvZiBWQ29tcG9uZW50KSB7XG4gICAgICAgIG5vZGUuY29tcG9uZW50LmNvbXBvbmVudFdpbGxVbm1vdW50KCk7XG4gICAgfVxuICAgIGlmIChub2RlLmNoaWxkcmVuKSB7XG4gICAgICAgIHZhciBza2lwID0gc2tpcFJlbW92ZSB8fCAhKG5vZGUgaW5zdGFuY2VvZiBWRnJhZ21lbnQpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5vZGUuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHJlbW92ZShub2RlLmNoaWxkcmVuW2ldLCBub2RlLCBpLCBza2lwKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlmICghc2tpcFJlbW92ZSkge1xuICAgICAgICBpZiAobm9kZSBpbnN0YW5jZW9mIFZGcmFnbWVudCkge1xuICAgICAgICAgICAgcGFyZW50LmRvbS5yZW1vdmVDaGlsZChub2RlLmZpcnN0Tm9kZSk7XG4gICAgICAgICAgICBwYXJlbnQuZG9tLnJlbW92ZUNoaWxkKG5vZGUubGFzdE5vZGUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcGFyZW50LmRvbS5yZW1vdmVDaGlsZChub2RlLmRvbSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgbm9kZS5kZXN0cm95KCk7XG4gICAgaWYgKGNoaWxkUG9zICE9IG51bGwpIHtcbiAgICAgICAgcGFyZW50LmNoaWxkcmVuW2NoaWxkUG9zXSA9IG51bGw7XG4gICAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90cy9yZW1vdmUudHNcbiAqKi8iLCJpbXBvcnQge1ZUZXh0LCBWVGFnTm9kZSwgVk5vZGUsIFZDb21wb25lbnQsIFZGcmFnbWVudH0gZnJvbSAnLi9ub2RlJztcbmltcG9ydCB7YXBwZW5kfSBmcm9tICcuL2FwcGVuZCc7XG5pbXBvcnQge3VwZGF0ZSwgcmVwbGFjZU5vZGV9IGZyb20gJy4vdXBkYXRlJztcbmltcG9ydCB7bm9ybUNoaWxkfSBmcm9tICcuL3V0aWxzJztcbmltcG9ydCB7YXR0cnMsIHByb3BzLCBldmVudHN9IGZyb20gJy4vY29uc3QtYXR0cnMnO1xuaW1wb3J0IHtnbG9ic30gZnJvbSAnLi9jb21wb25lbnQnO1xuXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlQXR0cnMob2xkOlZUYWdOb2RlLCBwYXJlbnQ6Vk5vZGUsIGNoaWxkUG9zOm51bWJlcikge1xuICAgIHZhciBub2RlID0gPFZUYWdOb2RlPnBhcmVudC5jaGlsZHJlbltjaGlsZFBvc107XG4gICAgdmFyIHJlcyA9IHRydWU7XG4gICAgaWYgKG5vZGUuYXR0cnMpIHtcbiAgICAgICAgaWYgKG9sZC5hdHRycykge1xuICAgICAgICAgICAgY3JlYXRlQXR0cnMobm9kZSwgb2xkLmF0dHJzKTsgLy8gYWZmZWN0IG5vZGUuYXR0cnNDb2RlXG4gICAgICAgICAgICByZXMgPSBvbGQuYXR0cnNDb2RlID09PSBub2RlLmF0dHJzQ29kZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJlcyA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKG9sZC5hdHRycykge1xuICAgICAgICByZXMgPSBmYWxzZTtcbiAgICB9XG4gICAgaWYgKHJlcyA9PT0gZmFsc2UpIHtcbiAgICAgICAgcmVtb3ZlQXR0cnMob2xkKTtcbiAgICAgICAgY3JlYXRlQXR0cnMobm9kZSwgb2xkKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUF0dHJzKG5vZGU6VlRhZ05vZGUsIG9sZEF0dHJzPzphbnkpIHtcbiAgICB2YXIgZG9tOmFueSA9IG5vZGUuZG9tO1xuICAgIHZhciBhdHRyOnN0cmluZztcbiAgICB2YXIgcHJvcDpzdHJpbmc7XG4gICAgdmFyIGV2ZW50OnN0cmluZztcbiAgICBub2RlLmF0dHJzQ29kZSA9ICcnO1xuICAgIGZvciAodmFyIGF0dHJOYW1lIGluIG5vZGUuYXR0cnMpIHtcbiAgICAgICAgbm9kZS5hdHRyc0NvZGUgKz0gYXR0ck5hbWU7XG4gICAgICAgIHZhciBhdHRyVmFsID0gbm9kZS5hdHRyc1thdHRyTmFtZV07XG4gICAgICAgIGlmIChhdHRyTmFtZSA9PSAna2V5JyB8fCAob2xkQXR0cnMgJiYgb2xkQXR0cnNbYXR0ck5hbWVdID09PSBhdHRyVmFsICYmIGF0dHJOYW1lICE9PSAncmVmJykpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcm9wID0gcHJvcHNbYXR0ck5hbWVdKSB7XG4gICAgICAgICAgICBpZiAoYXR0clZhbCA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgZG9tW3Byb3BdID0gJyc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBkb21bcHJvcF0gPSBhdHRyVmFsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGF0dHIgPSBhdHRyc1thdHRyTmFtZV0pIHtcbiAgICAgICAgICAgIGlmIChhdHRyVmFsID09IG51bGwgfHwgYXR0clZhbCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICBkb20ucmVtb3ZlQXR0cmlidXRlKGF0dHIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAodHlwZW9mIGF0dHJWYWwgIT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgZG9tLnNldEF0dHJpYnV0ZShhdHRyLCBhdHRyVmFsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChldmVudCA9IGV2ZW50c1thdHRyTmFtZV0pIHtcbiAgICAgICAgICAgIGRvbVsnb24nICsgZXZlbnRdID0gYXR0clZhbDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChhdHRyTmFtZVswXSA9PT0gJ28nICYmIGF0dHJOYW1lWzFdID09PSAnbicpIHtcbiAgICAgICAgICAgIGV2ZW50ID0gYXR0ck5hbWUuc3Vic3RyaW5nKDIpLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICBkb21bJ29uJyArIGV2ZW50XSA9IGF0dHJWYWw7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoYXR0ck5hbWVbMF0gPT09ICdkJyAmJiBhdHRyTmFtZVsxXSA9PT0gJ2EnICYmIGF0dHJOYW1lWzJdID09PSAndCcgJiYgYXR0ck5hbWVbM10gPT09ICdhJykge1xuXG4gICAgICAgICAgICBpZiAoYXR0clZhbCA9PSBudWxsIHx8IGF0dHJWYWwgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgZG9tLnJlbW92ZUF0dHJpYnV0ZShhdHRyTmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBkb20uc2V0QXR0cmlidXRlKGF0dHJOYW1lLCBhdHRyVmFsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChhdHRyTmFtZSA9PT0gJ3N0eWxlJykge1xuICAgICAgICAgICAgLy90b2RvOlxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGF0dHJOYW1lID09ICdyZWYnKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGF0dHJWYWwgPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIGF0dHJWYWwobm9kZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChnbG9icy5jb21wb25lbnQpIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGdsb2JzLmNvbXBvbmVudC5yZWZzID09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIGdsb2JzLmNvbXBvbmVudC5yZWZzID0ge307XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGdsb2JzLmNvbXBvbmVudC5yZWZzW2F0dHJWYWxdID0gbm9kZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gcmVtb3ZlQXR0cnMob2xkOlZUYWdOb2RlKSB7XG4gICAgdmFyIGRvbTphbnkgPSBvbGQuZG9tO1xuXG4gICAgdmFyIGF0dHI6c3RyaW5nO1xuICAgIHZhciBwcm9wOnN0cmluZztcbiAgICB2YXIgZXZlbnQ6c3RyaW5nO1xuXG4gICAgZm9yICh2YXIgYXR0ck5hbWUgaW4gb2xkLmF0dHJzKSB7XG4gICAgICAgIHZhciBhdHRyVmFsID0gb2xkLmF0dHJzW2F0dHJOYW1lXTtcbiAgICAgICAgaWYgKHByb3AgPSBwcm9wc1thdHRyTmFtZV0pIHtcbiAgICAgICAgICAgIGRvbVtwcm9wXSA9ICcnO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGF0dHIgPSBhdHRyc1thdHRyTmFtZV0pIHtcbiAgICAgICAgICAgIGRvbS5yZW1vdmVBdHRyaWJ1dGUoYXR0cik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoYXR0ck5hbWUuc3Vic3RyaW5nKDAsIDQpID09ICdkYXRhJykge1xuICAgICAgICAgICAgZG9tLnJlbW92ZUF0dHJpYnV0ZShhdHRyTmFtZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZXZlbnQgPSBldmVudHNbYXR0ck5hbWVdKSB7XG4gICAgICAgICAgICBkb21bJ29uJyArIGV2ZW50XSA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoYXR0ck5hbWUuc3Vic3RyaW5nKDAsIDIpID09ICdvbicpIHtcbiAgICAgICAgICAgIGV2ZW50ID0gYXR0ck5hbWUuc3Vic3RyaW5nKDIpLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICBkb21bJ29uJyArIGV2ZW50XSA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoYXR0ck5hbWUgPT09ICdzdHlsZScpIHtcbiAgICAgICAgICAgIC8vdG9kbzpcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChhdHRyTmFtZSA9PSAncmVmJykge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBhdHRyVmFsID09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGdsb2JzLmNvbXBvbmVudCkge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgZ2xvYnMuY29tcG9uZW50LnJlZnMgPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgZ2xvYnMuY29tcG9uZW50LnJlZnMgPSB7fTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZ2xvYnMuY29tcG9uZW50LnJlZnNbYXR0clZhbF0gPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90cy9hdHRycy50c1xuICoqLyIsImV4cG9ydCBsZXQgYXR0cnM6e1tpbmRleDpzdHJpbmddOnN0cmluZ30gPSB7XG4gICAgYWNjZXB0OiAnYWNjZXB0JyxcbiAgICBhY2NlcHRDaGFyc2V0OiAnYWNjZXB0LWNoYXJzZXQnLFxuICAgIGFjY2Vzc0tleTogJ2FjY2Vzc0tleScsXG4gICAgYWN0aW9uOiAnYWN0aW9uJyxcbiAgICBhbGxvd0Z1bGxTY3JlZW46ICdhbGxvd0Z1bGxTY3JlZW4nLFxuICAgIGFsbG93VHJhbnNwYXJlbmN5OiAnYWxsb3dUcmFuc3BhcmVuY3knLFxuICAgIGFsdDogJ2FsdCcsXG4gICAgYXN5bmM6ICdhc3luYycsXG4gICAgYXV0b0NvbXBsZXRlOiAnYXV0b0NvbXBsZXRlJyxcbiAgICBhdXRvUGxheTogJ2F1dG9QbGF5JyxcbiAgICBjYXB0dXJlOiAnY2FwdHVyZScsXG4gICAgY2VsbFBhZGRpbmc6ICdjZWxsUGFkZGluZycsXG4gICAgY2VsbFNwYWNpbmc6ICdjZWxsU3BhY2luZycsXG4gICAgY2hhclNldDogJ2NoYXJTZXQnLFxuICAgIGNoYWxsZW5nZTogJ2NoYWxsZW5nZScsXG4gICAgY2xhc3NJRDogJ2NsYXNzSUQnLFxuICAgIGNvbHM6ICdjb2xzJyxcbiAgICBjb2xTcGFuOiAnY29sU3BhbicsXG4gICAgY29udGVudDogJ2NvbnRlbnQnLFxuICAgIGNvbnRlbnRFZGl0YWJsZTogJ2NvbnRlbnRFZGl0YWJsZScsXG4gICAgY29udGV4dE1lbnU6ICdjb250ZXh0TWVudScsXG4gICAgY29vcmRzOiAnY29vcmRzJyxcbiAgICBjcm9zc09yaWdpbjogJ2Nyb3NzT3JpZ2luJyxcbiAgICBkYXRhOiAnZGF0YScsXG4gICAgZGF0ZVRpbWU6ICdkYXRlVGltZScsXG4gICAgZGVmZXI6ICdkZWZlcicsXG4gICAgZGlyOiAnZGlyJyxcbiAgICBkaXNhYmxlZDogJ2Rpc2FibGVkJyxcbiAgICBkb3dubG9hZDogJ2Rvd25sb2FkJyxcbiAgICBkcmFnZ2FibGU6ICdkcmFnZ2FibGUnLFxuICAgIGVuY1R5cGU6ICdlbmNUeXBlJyxcbiAgICBmb3JtOiAnZm9ybScsXG4gICAgZm9ybUFjdGlvbjogJ2Zvcm1BY3Rpb24nLFxuICAgIGZvcm1FbmNUeXBlOiAnZm9ybUVuY1R5cGUnLFxuICAgIGZvcm1NZXRob2Q6ICdmb3JtTWV0aG9kJyxcbiAgICBmb3JtTm9WYWxpZGF0ZTogJ2Zvcm1Ob1ZhbGlkYXRlJyxcbiAgICBmb3JtVGFyZ2V0OiAnZm9ybVRhcmdldCcsXG4gICAgZnJhbWVCb3JkZXI6ICdmcmFtZUJvcmRlcicsXG4gICAgaGVhZGVyczogJ2hlYWRlcnMnLFxuICAgIGhlaWdodDogJ2hlaWdodCcsXG4gICAgaGlkZGVuOiAnaGlkZGVuJyxcbiAgICBoaWdoOiAnaGlnaCcsXG4gICAgaHJlZjogJ2hyZWYnLFxuICAgIGhyZWZMYW5nOiAnaHJlZkxhbmcnLFxuICAgIGh0bWxGb3I6ICdmb3InLFxuICAgIGh0dHBFcXVpdjogJ2h0dHAtZXF1aXYnLFxuICAgIGljb246ICdpY29uJyxcbiAgICBpbnB1dE1vZGU6ICdpbnB1dE1vZGUnLFxuICAgIGlzOiAnaXMnLFxuICAgIGtleVBhcmFtczogJ2tleVBhcmFtcycsXG4gICAga2V5VHlwZTogJ2tleVR5cGUnLFxuICAgIGxhYmVsOiAnbGFiZWwnLFxuICAgIGxhbmc6ICdsYW5nJyxcbiAgICBsaXN0OiAnbGlzdCcsXG4gICAgbG93OiAnbG93JyxcbiAgICBtYW5pZmVzdDogJ21hbmlmZXN0JyxcbiAgICBtYXJnaW5IZWlnaHQ6ICdtYXJnaW5IZWlnaHQnLFxuICAgIG1hcmdpbldpZHRoOiAnbWFyZ2luV2lkdGgnLFxuICAgIG1heDogJ21heCcsXG4gICAgbWF4TGVuZ3RoOiAnbWF4TGVuZ3RoJyxcbiAgICBtZWRpYTogJ21lZGlhJyxcbiAgICBtZWRpYUdyb3VwOiAnbWVkaWFHcm91cCcsXG4gICAgbWV0aG9kOiAnbWV0aG9kJyxcbiAgICBtaW46ICdtaW4nLFxuICAgIG1pbkxlbmd0aDogJ21pbkxlbmd0aCcsXG4gICAgbmFtZTogJ25hbWUnLFxuICAgIG5vVmFsaWRhdGU6ICdub1ZhbGlkYXRlJyxcbiAgICBvcGVuOiAnb3BlbicsXG4gICAgb3B0aW11bTogJ29wdGltdW0nLFxuICAgIHBhdHRlcm46ICdwYXR0ZXJuJyxcbiAgICBwbGFjZWhvbGRlcjogJ3BsYWNlaG9sZGVyJyxcbiAgICBwb3N0ZXI6ICdwb3N0ZXInLFxuICAgIHByZWxvYWQ6ICdwcmVsb2FkJyxcbiAgICByYWRpb0dyb3VwOiAncmFkaW9Hcm91cCcsXG4gICAgcmVsOiAncmVsJyxcbiAgICByZXF1aXJlZDogJ3JlcXVpcmVkJyxcbiAgICByb2xlOiAncm9sZScsXG4gICAgcm93czogJ3Jvd3MnLFxuICAgIHJvd1NwYW46ICdyb3dTcGFuJyxcbiAgICBzYW5kYm94OiAnc2FuZGJveCcsXG4gICAgc2NvcGU6ICdzY29wZScsXG4gICAgc2NvcGVkOiAnc2NvcGVkJyxcbiAgICBzY3JvbGxpbmc6ICdzY3JvbGxpbmcnLFxuICAgIHNlYW1sZXNzOiAnc2VhbWxlc3MnLFxuICAgIHNoYXBlOiAnc2hhcGUnLFxuICAgIHNpemU6ICdzaXplJyxcbiAgICBzaXplczogJ3NpemVzJyxcbiAgICBzcGFuOiAnc3BhbicsXG4gICAgc3BlbGxDaGVjazogJ3NwZWxsQ2hlY2snLFxuICAgIHNyYzogJ3NyYycsXG4gICAgc3JjU2V0OiAnc3JjU2V0JyxcbiAgICBzdGFydDogJ3N0YXJ0JyxcbiAgICBzdGVwOiAnc3RlcCcsXG4gICAgc3R5bGU6ICdzdHlsZScsXG4gICAgdGFiSW5kZXg6ICd0YWJJbmRleCcsXG4gICAgdGFyZ2V0OiAndGFyZ2V0JyxcbiAgICB0aXRsZTogJ3RpdGxlJyxcbiAgICB0eXBlOiAndHlwZScsXG4gICAgdXNlTWFwOiAndXNlTWFwJyxcbiAgICB3aWR0aDogJ3dpZHRoJyxcbiAgICB3bW9kZTogJ3dtb2RlJyxcbiAgICBhdXRvQ2FwaXRhbGl6ZTogJ2F1dG9DYXBpdGFsaXplJyxcbiAgICBhdXRvQ29ycmVjdDogJ2F1dG9Db3JyZWN0JyxcbiAgICBpdGVtUHJvcDogJ2l0ZW1Qcm9wJyxcbiAgICBpdGVtU2NvcGU6ICdpdGVtU2NvcGUnLFxuICAgIGl0ZW1UeXBlOiAnaXRlbVR5cGUnLFxuICAgIGl0ZW1JRDogJ2l0ZW1JRCcsXG4gICAgaXRlbVJlZjogJ2l0ZW1SZWYnLFxuICAgIHByb3BlcnR5OiAncHJvcGVydHknLFxuICAgIHNlY3VyaXR5OiAnc2VjdXJpdHknLFxuICAgIHVuc2VsZWN0YWJsZTogJ3Vuc2VsZWN0YWJsZScsXG59O1xuXG5leHBvcnQgbGV0IHByb3BzOntbaW5kZXg6c3RyaW5nXTpzdHJpbmd9ID0ge1xuICAgIGNoZWNrZWQ6ICdjaGVja2VkJyxcbiAgICBjbGFzc05hbWU6ICdjbGFzc05hbWUnLFxuICAgIGNvbnRyb2xzOiAnY29udHJvbHMnLFxuICAgIGlkOiAnaWQnLFxuICAgIGxvb3A6ICdsb29wJyxcbiAgICBtdWx0aXBsZTogJ211bHRpcGxlJyxcbiAgICBtdXRlZDogJ211dGVkJyxcbiAgICByZWFkT25seTogJ3JlYWRPbmx5JyxcbiAgICBzZWxlY3RlZDogJ3NlbGVjdGVkJyxcbiAgICBzcmNEb2M6ICdzcmNkb2MnLFxuICAgIHZhbHVlOiAndmFsdWUnXG59O1xuXG5leHBvcnQgbGV0IGlzVW5pdGxlc3NOdW1iZXI6e1tpbmRleDpzdHJpbmddOmJvb2xlYW59ID0ge1xuICAgIGJveEZsZXg6IHRydWUsXG4gICAgYm94RmxleEdyb3VwOiB0cnVlLFxuICAgIGNvbHVtbkNvdW50OiB0cnVlLFxuICAgIGZsZXg6IHRydWUsXG4gICAgZmxleEdyb3c6IHRydWUsXG4gICAgZmxleFBvc2l0aXZlOiB0cnVlLFxuICAgIGZsZXhTaHJpbms6IHRydWUsXG4gICAgZmxleE5lZ2F0aXZlOiB0cnVlLFxuICAgIGZvbnRXZWlnaHQ6IHRydWUsXG4gICAgbGluZUNsYW1wOiB0cnVlLFxuICAgIGxpbmVIZWlnaHQ6IHRydWUsXG4gICAgb3BhY2l0eTogdHJ1ZSxcbiAgICBvcmRlcjogdHJ1ZSxcbiAgICBvcnBoYW5zOiB0cnVlLFxuICAgIHdpZG93czogdHJ1ZSxcbiAgICB6SW5kZXg6IHRydWUsXG4gICAgem9vbTogdHJ1ZSxcblxuICAgIC8vIFNWRy1yZWxhdGVkIHByb3BlcnRpZXNcbiAgICBmaWxsT3BhY2l0eTogdHJ1ZSxcbiAgICBzdHJva2VEYXNob2Zmc2V0OiB0cnVlLFxuICAgIHN0cm9rZU9wYWNpdHk6IHRydWUsXG4gICAgc3Ryb2tlV2lkdGg6IHRydWVcbn07XG5cbmV4cG9ydCBsZXQgZXZlbnRzOntbaW5kZXg6c3RyaW5nXTpzdHJpbmd9ID0ge1xuICAgIG9uUmVuZGVyOiBcInJlbmRlclwiLFxuICAgIG9uQ2xpY2s6ICgoJ29udG91Y2hlbmQnIGluIHdpbmRvdykpID8gJ3RvdWNoZW5kJyA6ICdjbGljaycsXG4gICAgb25EYmxDbGljazogJ2RibGNsaWNrJyxcblxuICAgIG9uTW91c2VEb3duOiAnbW91c2Vkb3duJyxcbiAgICBvbk1vdXNlVXA6ICdtb3VzZXVwJyxcbiAgICBvbk1vdXNlTW92ZTogJ21vdXNlbW92ZScsXG4gICAgb25Nb3VzZUVudGVyOiAnbW91c2VlbnRlcicsXG4gICAgb25Nb3VzZUxlYXZlOiAnbW91c2VsZWF2ZScsXG4gICAgb25Nb3VzZU92ZXI6ICdtb3VzZW92ZXInLFxuICAgIG9uTW91c2VPdXQ6ICdtb3VzZW91dCcsXG5cbiAgICBvblRvdWNoU3RhcnQ6ICd0b3VjaHN0YXJ0JyxcbiAgICBvblRvdWNoRW5kOiAndG91Y2hlbmQnLFxuICAgIG9uVG91Y2hNb3ZlOiAndG91Y2htb3ZlJyxcbiAgICBvblRvdWNoQ2FuY2VsOiAndG91Y2hjYW5jZWwnLFxuICAgIG9uVG91Y2hMZWF2ZTogJ3RvdWNobGVhdmUnLFxuXG4gICAgb25Db250ZXh0TWVudTogJ2NvbnRleHRtZW51JyxcblxuICAgIG9uSW5wdXQ6ICdpbnB1dCcsXG4gICAgb25Gb2N1czogJ2ZvY3VzJyxcbiAgICBvbkNoYW5nZTogJ2NoYW5nZScsXG5cbiAgICBvbktleURvd246ICdrZXlkb3duJyxcbiAgICBvbktleVByZXNzOiAna2V5cHJlc3MnLFxuICAgIG9uS2V5VXA6ICdrZXl1cCdcbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3RzL2NvbnN0LWF0dHJzLnRzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==