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

	var top_level_1 = __webpack_require__(1);
	exports.render = top_level_1.render;
	exports.createElement = top_level_1.createElement;
	exports.Component = top_level_1.Component;
	exports.findDOMNode = top_level_1.findDOMNode;
	window.FastReact = {
	    render: top_level_1.render, createElement: top_level_1.createElement, Component: top_level_1.Component, findDOMNode: top_level_1.findDOMNode
	};
	//# sourceMappingURL=index.js.map

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var node_1 = __webpack_require__(2);
	var append_1 = __webpack_require__(3);
	var update_1 = __webpack_require__(7);
	var utils_1 = __webpack_require__(4);
	var component_1 = __webpack_require__(5);
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
	    utils_1.normChild(root, 0);
	    update_1.update(old, root, 0);
	    return node;
	}
	exports.updater = updater;
	function createElement(tag, attrs) {
	    var children = [];
	    for (var _i = 2; _i < arguments.length; _i++) {
	        children[_i - 2] = arguments[_i];
	    }
	    var key = attrs ? attrs.key : null;
	    if (children.length == 0) {
	        children = null;
	    }
	    if (typeof tag == 'string') {
	        return new node_1.VTagNode(tag, attrs, children, key);
	    }
	    if (typeof tag == 'function') {
	        return new node_1.VComponent(tag, attrs, children, key);
	    }
	    if (tag == '@') {
	        return new node_1.VFragment(children, key);
	    }
	}
	exports.createElement = createElement;
	//# sourceMappingURL=top-level.js.map

/***/ },
/* 2 */
/***/ function(module, exports) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var BaseNode = (function () {
	    function BaseNode() {
	    }
	    BaseNode.prototype.destroy = function () {
	    };
	    return BaseNode;
	})();
	exports.BaseNode = BaseNode;
	var VFragment = (function (_super) {
	    __extends(VFragment, _super);
	    function VFragment(children, key) {
	        if (false) {
	            _super.call(this);
	        }
	        this.dom = null;
	        this.children = children;
	        this.key = key;
	    }
	    return VFragment;
	})(BaseNode);
	exports.VFragment = VFragment;
	var VComponent = (function (_super) {
	    __extends(VComponent, _super);
	    function VComponent(ctor, attrs, children, key) {
	        if (false) {
	            _super.call(this, null, null);
	        }
	        this.dom = null;
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
	        this.dom = null;
	        this.tag = tag;
	        this.attrs = attrs;
	        this.children = children;
	        this.key = key;
	    }
	    return VTagNode;
	})(BaseNode);
	exports.VTagNode = VTagNode;
	var VText = (function (_super) {
	    __extends(VText, _super);
	    function VText(text) {
	        if (false) {
	            _super.call(this);
	        }
	        this.dom = null;
	        this.text = text;
	    }
	    return VText;
	})(BaseNode);
	exports.VText = VText;
	//# sourceMappingURL=node.js.map

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var node_1 = __webpack_require__(2);
	var utils_1 = __webpack_require__(4);
	var component_1 = __webpack_require__(5);
	var attrs_1 = __webpack_require__(9);
	function append(parent, childPos) {
	    var node = parent.children[childPos];
	    if (node.key != null) {
	        if (typeof parent.keyMap == 'undefined') {
	            parent.keyMap = {};
	        }
	        parent.keyMap[node.key] = childPos;
	    }
	    if (node instanceof node_1.VFragment) {
	        node.dom = parent.dom;
	        node.lastNode = document.createTextNode('');
	        parent.dom.insertBefore(node.lastNode, parent instanceof node_1.VFragment ? parent.lastNode : null);
	        if (node instanceof node_1.VComponent) {
	            component_1.createComponent(node);
	        }
	    }
	    else {
	        if (node instanceof node_1.VText) {
	            node.dom = document.createTextNode(node.text);
	        }
	        if (node instanceof node_1.VTagNode) {
	            node.dom = document.createElement(node.tag);
	            if (node.attrs) {
	                attrs_1.createAttrs(node);
	            }
	        }
	        parent.dom.insertBefore(node.dom, parent instanceof node_1.VFragment ? parent.lastNode : null);
	    }
	    if (node.children) {
	        for (var i = 0; i < node.children.length; i++) {
	            utils_1.normChild(node, i);
	            append(node, i);
	        }
	    }
	    if (node instanceof node_1.VComponent) {
	        node.component.componentDidMount();
	    }
	}
	exports.append = append;
	//# sourceMappingURL=append.js.map

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var node_1 = __webpack_require__(2);
	function normChild(parent, childPos) {
	    var node = parent.children[childPos];
	    if (node instanceof node_1.BaseNode) {
	        return;
	    }
	    if (typeof node == 'string' || typeof node == 'number') {
	        parent.children[childPos] = new node_1.VText(node + '');
	        return;
	    }
	    if (node == null) {
	        parent.children[childPos] = new node_1.VText('');
	        return;
	    }
	    if (typeof node === 'object') {
	        if (node instanceof Array) {
	            parent.children[childPos] = new node_1.VFragment(node, null);
	        }
	        else {
	            parent.children[childPos] = new node_1.VText(JSON.stringify(node));
	        }
	        return;
	    }
	    if (typeof node === 'function') {
	        parent.children[childPos] = new node_1.VText('Function');
	        return;
	    }
	    parent.children[childPos] = new node_1.VText('');
	}
	exports.normChild = normChild;
	//# sourceMappingURL=utils.js.map

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var node_1 = __webpack_require__(2);
	var update_children_1 = __webpack_require__(6);
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
	        update_children_1.updateChildren(this.node, temp); // clear this.node.children
	        this.node.children = children;
	        this.componentDidUpdate();
	        temp.destroy();
	    };
	    return Component;
	})();
	exports.Component = Component;
	function findDOMNode(node) {
	    return node.dom;
	}
	exports.findDOMNode = findDOMNode;
	function createComponent(node) {
	    var props = node.attrs;
	    props.children = node.children;
	    var component = new node.ctor(props);
	    component.node = node;
	    component.componentWillMount();
	    node.children = [component.render()];
	}
	exports.createComponent = createComponent;
	function updateComponent(old, parent, childPos) {
	    var newNode = parent.children[childPos];
	    var props = newNode.attrs;
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
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var node_1 = __webpack_require__(2);
	var append_1 = __webpack_require__(3);
	var update_1 = __webpack_require__(7);
	var remove_1 = __webpack_require__(8);
	var utils_1 = __webpack_require__(4);
	function updateChildren(old, node) {
	    var oldChildren = old.children;
	    var newChildren = node.children;
	    if (newChildren) {
	        var fitCount = 0;
	        for (var i = 0; i < newChildren.length; i++) {
	            utils_1.normChild(node, i);
	            var fitPos;
	            var newChild = newChildren[i];
	            var oldChild = oldChildren[i];
	            if (old.keyMap) {
	                if (newChild.key != null) {
	                    fitPos = old.keyMap[newChild.key];
	                }
	                else {
	                    if (oldChild && oldChild.key == null) {
	                        fitPos = i;
	                    }
	                }
	            }
	            else {
	                fitPos = i;
	            }
	            if (fitPos != null) {
	                fitCount++;
	                update_1.update(oldChildren[fitPos], node, i);
	                if (fitPos !== i) {
	                    moveToEnd(newChild, node);
	                }
	            }
	            else {
	                append_1.append(node, i);
	            }
	        }
	    }
	    if (oldChildren && oldChildren.length !== fitCount) {
	        for (var i = 0; i < oldChildren.length; i++) {
	            var oldChild = oldChildren[i];
	            if (oldChild) {
	                remove_1.remove(oldChild, old, i);
	            }
	        }
	    }
	}
	exports.updateChildren = updateChildren;
	function moveToEnd(node, parent) {
	    node.dom.parentNode.insertBefore(node.dom, parent instanceof node_1.VFragment ? parent.lastNode : null);
	}
	//# sourceMappingURL=update-children.js.map

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var node_1 = __webpack_require__(2);
	var remove_1 = __webpack_require__(8);
	var append_1 = __webpack_require__(3);
	var update_children_1 = __webpack_require__(6);
	var attrs_1 = __webpack_require__(9);
	var component_1 = __webpack_require__(5);
	function update(old, parent, childPos) {
	    var node = parent.children[childPos];
	    node.dom = old.dom;
	    if (node.key != null) {
	        if (typeof parent.keyMap == 'undefined') {
	            parent.keyMap = {};
	        }
	        parent.keyMap[node.key] = childPos;
	    }
	    if (old.constructor !== node.constructor) {
	        replaceNode(old, parent, childPos);
	        return;
	    }
	    if (node instanceof node_1.VComponent) {
	        if (old.ctor !== node.ctor) {
	            replaceNode(old, parent, childPos);
	            return;
	        }
	        component_1.updateComponent(old, parent, childPos);
	        return;
	    }
	    if (node instanceof node_1.VText) {
	        node.dom.textContent = node.text;
	        old.destroy();
	        return;
	    }
	    if (node instanceof node_1.VTagNode) {
	        if (old.tag !== node.tag) {
	            replaceNode(old, parent, childPos);
	            return;
	        }
	        var successAttrs = attrs_1.updateAttrs(old, parent, childPos);
	        if (!successAttrs) {
	            replaceNode(old, parent, childPos);
	            return;
	        }
	    }
	    update_children_1.updateChildren(old, node);
	    old.destroy();
	}
	exports.update = update;
	function replaceNode(old, parent, childPos) {
	    remove_1.remove(old, parent);
	    append_1.append(parent, childPos);
	}
	exports.replaceNode = replaceNode;
	//# sourceMappingURL=update.js.map

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var node_1 = __webpack_require__(2);
	function remove(node, parent, childPos) {
	    if (node instanceof node_1.VComponent) {
	        node.component.componentWillUnmount();
	    }
	    if (node.children) {
	        for (var i = 0; i < node.children.length; i++) {
	            remove(node.children[i], node, i);
	        }
	    }
	    if (node instanceof node_1.VFragment) {
	        node.dom.removeChild(node.lastNode);
	    }
	    node.destroy();
	    if (childPos != null) {
	        parent.children[childPos] = null;
	    }
	}
	exports.remove = remove;
	//# sourceMappingURL=remove.js.map

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var const_attrs_1 = __webpack_require__(10);
	function createAttrs(node) {
	    _updateAttrs(null, node);
	}
	exports.createAttrs = createAttrs;
	function updateAttrs(old, parent, childPos) {
	    var node = parent.children[childPos];
	    if (node.attrs) {
	        if (old.attrs) {
	            _updateAttrs(node, old.attrs); // affect node.attrsCode
	            return old.attrsCode === node.attrsCode;
	        }
	        else {
	            return false;
	        }
	    }
	    else if (old.attrs) {
	        return false;
	    }
	    return true;
	}
	exports.updateAttrs = updateAttrs;
	function _updateAttrs(node, oldAttrs) {
	    var dom = node.dom;
	    var attr;
	    var prop;
	    var event;
	    for (var attrName in node.attrs) {
	        node.attrsCode += attrName;
	        var attrVal = node.attrs[attrName];
	        if (oldAttrs && oldAttrs[attrName] === attrVal) {
	            continue;
	        }
	        if (attrName == 'key') {
	        }
	        else if (prop = const_attrs_1.props[attrName]) {
	            dom[prop] = attrVal;
	        }
	        else if (attr = const_attrs_1.attrs[attrName]) {
	            dom.setAttribute(attr, attrVal);
	        }
	        else if (event = const_attrs_1.events[attrName]) {
	            dom['on' + event] = attrVal;
	        }
	        else if (attrName[0] === 'o' && attrName[1] === 'n') {
	            event = attrName.substring(2).toLowerCase();
	            dom['on' + event] = attrVal;
	        }
	        else if (attrName[0] === 'd' && attrName[1] === 'a' && attrName[2] === 't' && attrName[3] === 'a') {
	            dom.setAttribute(attrName, attrVal);
	        }
	        else if (attrName === 'style') {
	        }
	    }
	}
	//# sourceMappingURL=attrs.js.map

/***/ },
/* 10 */
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
	exports.notPx = {
	    boxFlex: true,
	    boxFlexGroup: true,
	    columnCount: true,
	    fillOpacity: true,
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
	    strokeOpacity: true,
	    widows: true,
	    zIndex: true,
	    zoom: true
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMDUyMDcwOGI0YjRjYzFlYTI3MmMiLCJ3ZWJwYWNrOi8vLy4vdHMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vdHMvdG9wLWxldmVsLnRzIiwid2VicGFjazovLy8uL3RzL25vZGUudHMiLCJ3ZWJwYWNrOi8vLy4vdHMvYXBwZW5kLnRzIiwid2VicGFjazovLy8uL3RzL3V0aWxzLnRzIiwid2VicGFjazovLy8uL3RzL2NvbXBvbmVudC50cyIsIndlYnBhY2s6Ly8vLi90cy91cGRhdGUtY2hpbGRyZW4udHMiLCJ3ZWJwYWNrOi8vLy4vdHMvdXBkYXRlLnRzIiwid2VicGFjazovLy8uL3RzL3JlbW92ZS50cyIsIndlYnBhY2s6Ly8vLi90cy9hdHRycy50cyIsIndlYnBhY2s6Ly8vLi90cy9jb25zdC1hdHRycy50cyJdLCJuYW1lcyI6WyJyZW5kZXIiLCJ1cGRhdGVyIiwiY3JlYXRlRWxlbWVudCIsIkJhc2VOb2RlIiwiQmFzZU5vZGUuY29uc3RydWN0b3IiLCJCYXNlTm9kZS5kZXN0cm95IiwiVkZyYWdtZW50IiwiVkZyYWdtZW50LmNvbnN0cnVjdG9yIiwiVkNvbXBvbmVudCIsIlZDb21wb25lbnQuY29uc3RydWN0b3IiLCJWVGFnTm9kZSIsIlZUYWdOb2RlLmNvbnN0cnVjdG9yIiwiVlRleHQiLCJWVGV4dC5jb25zdHJ1Y3RvciIsImFwcGVuZCIsIm5vcm1DaGlsZCIsIkNvbXBvbmVudCIsIkNvbXBvbmVudC5jb25zdHJ1Y3RvciIsIkNvbXBvbmVudC5jb21wb25lbnRXaWxsTW91bnQiLCJDb21wb25lbnQuY29tcG9uZW50RGlkTW91bnQiLCJDb21wb25lbnQuY29tcG9uZW50V2lsbFVwZGF0ZSIsIkNvbXBvbmVudC5jb21wb25lbnREaWRVcGRhdGUiLCJDb21wb25lbnQuY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyIsIkNvbXBvbmVudC5jb21wb25lbnRXaWxsVW5tb3VudCIsIkNvbXBvbmVudC5yZW5kZXIiLCJDb21wb25lbnQuZm9yY2VVcGRhdGUiLCJmaW5kRE9NTm9kZSIsImNyZWF0ZUNvbXBvbmVudCIsInVwZGF0ZUNvbXBvbmVudCIsInVwZGF0ZUNoaWxkcmVuIiwibW92ZVRvRW5kIiwidXBkYXRlIiwicmVwbGFjZU5vZGUiLCJyZW1vdmUiLCJjcmVhdGVBdHRycyIsInVwZGF0ZUF0dHJzIiwiX3VwZGF0ZUF0dHJzIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7OztBQ3RDQSx1Q0FBNEQsQ0FBYSxDQUFDO0FBQ2xFLGVBQU07QUFBRSxzQkFBYTtBQUFFLGtCQUFTO0FBQUUsb0JBQVcsMkJBRHFCO0FBRXBFLE9BQU8sQ0FBQyxTQUFTLEdBQUc7S0FDdEIsTUFBTSxzQkFBRSxhQUFhLDZCQUFFLFNBQVMseUJBQUUsV0FBVztFQUNoRCxDQUFDOzs7Ozs7O0FDSkYsa0NBQTRELENBQVEsQ0FBQztBQUVyRSxvQ0FBcUIsQ0FBVSxDQUFDO0FBQ2hDLG9DQUFxQixDQUFVLENBQUM7QUFDaEMsbUNBQXdCLENBQVMsQ0FBQztBQUVsQyx1Q0FBcUMsQ0FBYSxDQUFDO0FBQTNDLDJDQUFTO0FBQUUsK0NBQWdDO0FBRW5ELGlCQUF1QixJQUFVLEVBQUUsR0FBUTtLQUN2Q0EsSUFBSUEsSUFBSUEsR0FBR0EsSUFBSUEsZUFBUUEsQ0FBQ0EsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsRUFBRUEsSUFBSUEsQ0FBQ0EsQ0FBQ0E7S0FDbERBLElBQUlBLENBQUNBLEdBQUdBLEdBQUdBLEdBQUdBLENBQUNBO0tBQ2ZBLGlCQUFTQSxDQUFDQSxJQUFJQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQTtLQUNuQkEsZUFBTUEs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LG1CQUFLQSxDQUFDQSxRQUFRQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTthQUN4QkEsR0FBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsT0FBT0EsQ0FBQ0E7U0FDL0JBLENBQUNBO1NBQ0RBLElBQUlBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLEdBQUdBLG1CQUFLQSxDQUFDQSxRQUFRQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTthQUM5QkEsR0FBR0EsQ0FBQ0EsWUFBWUEsQ0FBQ0EsSUFBSUEsRUFBRUEsT0FBT0EsQ0FBQ0EsQ0FBQ0E7U0FDcENBLENBQUNBO1NBQ0RBLElBQUlBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLEtBQUtBLEdBQUdBLG9CQUFNQSxDQUFDQSxRQUFRQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTthQUMxQkEsR0FBSUEsQ0FBQ0EsSUFBSUEsR0FBR0EsS0FBS0EsQ0FBQ0EsR0FBR0EsT0FBT0EsQ0FBQ0E7U0FDdkNBLENBQUNBO1NBQ0RBLElBQUlBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLFFBQVFBLENBQUNBLENBQUNBLENBQUNBLEtBQUtBLEdBQUdBLElBQUlBLFFBQVFBLENBQUNBLENBQUNBLENBQUNBLEtBQUtBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBO2FBQ2xEQSxLQUFLQSxHQUFHQSxRQUFRQSxDQUFDQSxTQUFTQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxXQUFXQSxFQUFFQSxDQUFDQTthQUN0Q0EsR0FBSUEsQ0FBQ0EsSUFBSUEsR0FBR0EsS0FBS0EsQ0FBQ0EsR0FBR0EsT0FBT0EsQ0FBQ0E7U0FDdkNBLENBQUNBO1NBQ0RBLElBQUlBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLFFBQVFBLENBQUNBLENBQUNBLENBQUNBLEtBQUtBLEdBQUdBLElBQUlBLFFBQVFBLENBQUNBLENBQUNBLENBQUNBLEtBQUtBLEdBQUdBLElBQUlBLFFBQVFBLENBQUNBLENBQUNBLENBQUNBLEtBQUtBLEdBQUdBLElBQUlBLFFBQVFBLENBQUNBLENBQUNB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QUFZLEVBQUUsWUFBWTtLQUUxQixhQUFhLEVBQUUsYUFBYTtLQUU1QixPQUFPLEVBQUUsT0FBTztLQUNoQixPQUFPLEVBQUUsT0FBTztLQUNoQixRQUFRLEVBQUUsUUFBUTtLQUVsQixTQUFTLEVBQUUsU0FBUztLQUNwQixVQUFVLEVBQUUsVUFBVTtLQUN0QixPQUFPLEVBQUUsT0FBTztFQUNuQixDQUFDIiwiZmlsZSI6ImZhc3QtcmVhY3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDA1MjA3MDhiNGI0Y2MxZWEyNzJjXG4gKiovIiwiaW1wb3J0IHtyZW5kZXIsIGNyZWF0ZUVsZW1lbnQsIENvbXBvbmVudCwgZmluZERPTU5vZGV9IGZyb20gJy4vdG9wLWxldmVsJztcbmV4cG9ydCB7cmVuZGVyLCBjcmVhdGVFbGVtZW50LCBDb21wb25lbnQsIGZpbmRET01Ob2RlfTtcbig8YW55PndpbmRvdykuRmFzdFJlYWN0ID0ge1xuICAgIHJlbmRlciwgY3JlYXRlRWxlbWVudCwgQ29tcG9uZW50LCBmaW5kRE9NTm9kZVxufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3RzL2luZGV4LnRzXG4gKiovIiwiaW1wb3J0IHtWVGV4dCwgVlRhZ05vZGUsIFZOb2RlLCBWQ29tcG9uZW50LCBWRnJhZ21lbnR9IGZyb20gJy4vbm9kZSc7XG5pbXBvcnQge0lDb21wb25lbnR9IGZyb20gJy4vY29tcG9uZW50JztcbmltcG9ydCB7YXBwZW5kfSBmcm9tICcuL2FwcGVuZCc7XG5pbXBvcnQge3VwZGF0ZX0gZnJvbSAnLi91cGRhdGUnO1xuaW1wb3J0IHtub3JtQ2hpbGR9IGZyb20gJy4vdXRpbHMnO1xuXG5leHBvcnQge0NvbXBvbmVudCwgZmluZERPTU5vZGV9IGZyb20gJy4vY29tcG9uZW50JztcblxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlcihub2RlOlZOb2RlLCBkb206Tm9kZSkge1xuICAgIHZhciByb290ID0gbmV3IFZUYWdOb2RlKG51bGwsIG51bGwsIFtub2RlXSwgbnVsbCk7XG4gICAgcm9vdC5kb20gPSBkb207XG4gICAgbm9ybUNoaWxkKHJvb3QsIDApO1xuICAgIGFwcGVuZChyb290LCAwKTtcbiAgICByZXR1cm4gbm9kZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZXIob2xkOlZOb2RlLCBub2RlOlZOb2RlKSB7XG4gICAgdmFyIHJvb3QgPSBuZXcgVlRhZ05vZGUobnVsbCwgbnVsbCwgW25vZGVdLCBudWxsKTtcbiAgICBub3JtQ2hpbGQocm9vdCwgMCk7XG4gICAgdXBkYXRlKG9sZCwgcm9vdCwgMCk7XG4gICAgcmV0dXJuIG5vZGU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVFbGVtZW50KHRhZzpzdHJpbmcgfCBJQ29tcG9uZW50LCBhdHRyczphbnksIC4uLmNoaWxkcmVuOmFueVtdKTpWTm9kZSB7XG4gICAgdmFyIGtleSA9IGF0dHJzID8gYXR0cnMua2V5IDogbnVsbDtcbiAgICBpZiAoY2hpbGRyZW4ubGVuZ3RoID09IDApIHtcbiAgICAgICAgY2hpbGRyZW4gPSBudWxsO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIHRhZyA9PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm4gbmV3IFZUYWdOb2RlKDxzdHJpbmc+dGFnLCBhdHRycywgY2hpbGRyZW4sIGtleSk7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgdGFnID09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBWQ29tcG9uZW50KDxJQ29tcG9uZW50PnRhZywgYXR0cnMsIGNoaWxkcmVuLCBrZXkpO1xuICAgIH1cbiAgICBpZiAodGFnID09ICdAJykge1xuICAgICAgICByZXR1cm4gbmV3IFZGcmFnbWVudChjaGlsZHJlbiwga2V5KTtcbiAgICB9XG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90cy90b3AtbGV2ZWwudHNcbiAqKi8iLCJpbXBvcnQge0lDb21wb25lbnQsIENvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnQnO1xuXG5leHBvcnQgY2xhc3MgQmFzZU5vZGUge1xuICAgIGRvbTpOb2RlO1xuICAgIGNoaWxkcmVuOlZOb2RlW107XG4gICAga2V5TWFwOntbaW5kZXg6IHN0cmluZ106bnVtYmVyfTtcbiAgICBrZXk6c3RyaW5nO1xuXG4gICAgZGVzdHJveSgpIHtcblxuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFZGcmFnbWVudCBleHRlbmRzIEJhc2VOb2RlIHtcbiAgICBsYXN0Tm9kZTpOb2RlO1xuICAgIGNvbnN0cnVjdG9yKGNoaWxkcmVuOlZOb2RlW10sIGtleTpzdHJpbmcpIHtcbiAgICAgICAgaWYgKGZhbHNlKSB7XG4gICAgICAgICAgICBzdXBlcigpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZG9tID0gbnVsbDtcbiAgICAgICAgdGhpcy5jaGlsZHJlbiA9IGNoaWxkcmVuO1xuICAgICAgICB0aGlzLmtleSA9IGtleTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBWQ29tcG9uZW50IGV4dGVuZHMgVkZyYWdtZW50IHtcbiAgICBhdHRyczphbnk7XG4gICAgLy90b2RvXG4gICAgY29tcG9uZW50OkNvbXBvbmVudDtcbiAgICBjdG9yOklDb21wb25lbnQ7XG5cbiAgICBjb25zdHJ1Y3RvcihjdG9yOklDb21wb25lbnQsIGF0dHJzOmFueSwgY2hpbGRyZW46Vk5vZGVbXSwga2V5OnN0cmluZykge1xuICAgICAgICBpZiAoZmFsc2UpIHtcbiAgICAgICAgICAgIHN1cGVyKG51bGwsIG51bGwpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZG9tID0gbnVsbDtcbiAgICAgICAgdGhpcy5jdG9yID0gY3RvcjtcbiAgICAgICAgdGhpcy5hdHRycyA9IGF0dHJzO1xuICAgICAgICB0aGlzLmNoaWxkcmVuID0gY2hpbGRyZW47XG4gICAgICAgIHRoaXMua2V5ID0ga2V5O1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFZUYWdOb2RlIGV4dGVuZHMgQmFzZU5vZGUge1xuICAgIGF0dHJzOmFueTtcbiAgICBhdHRyc0NvZGU6c3RyaW5nO1xuICAgIHRhZzpzdHJpbmc7XG5cbiAgICBjb25zdHJ1Y3Rvcih0YWc6c3RyaW5nLCBhdHRyczphbnksIGNoaWxkcmVuOlZOb2RlW10sIGtleTpzdHJpbmcpIHtcbiAgICAgICAgaWYgKGZhbHNlKSB7XG4gICAgICAgICAgICBzdXBlcigpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZG9tID0gbnVsbDtcbiAgICAgICAgdGhpcy50YWcgPSB0YWc7XG4gICAgICAgIHRoaXMuYXR0cnMgPSBhdHRycztcbiAgICAgICAgdGhpcy5jaGlsZHJlbiA9IGNoaWxkcmVuO1xuICAgICAgICB0aGlzLmtleSA9IGtleTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBWVGV4dCBleHRlbmRzIEJhc2VOb2RlIHtcbiAgICB0ZXh0OnN0cmluZztcblxuICAgIGNvbnN0cnVjdG9yKHRleHQ6c3RyaW5nKSB7XG4gICAgICAgIGlmIChmYWxzZSkge1xuICAgICAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRvbSA9IG51bGw7XG4gICAgICAgIHRoaXMudGV4dCA9IHRleHQ7XG4gICAgfVxufVxuXG5leHBvcnQgdHlwZSBWTm9kZSA9IFZUYWdOb2RlIHwgVkNvbXBvbmVudCB8IFZGcmFnbWVudCB8IFZUZXh0O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdHMvbm9kZS50c1xuICoqLyIsImltcG9ydCB7VlRleHQsIFZUYWdOb2RlLCBWTm9kZSwgVkNvbXBvbmVudCwgVkZyYWdtZW50fSBmcm9tICcuL25vZGUnO1xuaW1wb3J0IHtub3JtQ2hpbGR9IGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0IHtjcmVhdGVDb21wb25lbnR9IGZyb20gJy4vY29tcG9uZW50JztcbmltcG9ydCB7Y3JlYXRlQXR0cnN9IGZyb20gJy4vYXR0cnMnO1xuZXhwb3J0IGZ1bmN0aW9uIGFwcGVuZChwYXJlbnQ6Vk5vZGUsIGNoaWxkUG9zOm51bWJlcikge1xuICAgIGxldCBub2RlID0gcGFyZW50LmNoaWxkcmVuW2NoaWxkUG9zXTtcbiAgICBpZiAobm9kZS5rZXkgIT0gbnVsbCkge1xuICAgICAgICBpZiAodHlwZW9mIHBhcmVudC5rZXlNYXAgPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHBhcmVudC5rZXlNYXAgPSB7fVxuICAgICAgICB9XG4gICAgICAgIHBhcmVudC5rZXlNYXBbbm9kZS5rZXldID0gY2hpbGRQb3M7XG4gICAgfVxuICAgIGlmIChub2RlIGluc3RhbmNlb2YgVkZyYWdtZW50KSB7XG4gICAgICAgIG5vZGUuZG9tID0gcGFyZW50LmRvbTtcbiAgICAgICAgbm9kZS5sYXN0Tm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCcnKTtcbiAgICAgICAgcGFyZW50LmRvbS5pbnNlcnRCZWZvcmUobm9kZS5sYXN0Tm9kZSwgcGFyZW50IGluc3RhbmNlb2YgVkZyYWdtZW50ID8gcGFyZW50Lmxhc3ROb2RlIDogbnVsbCk7XG5cbiAgICAgICAgaWYgKG5vZGUgaW5zdGFuY2VvZiBWQ29tcG9uZW50KSB7XG4gICAgICAgICAgICBjcmVhdGVDb21wb25lbnQobm9kZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGlmIChub2RlIGluc3RhbmNlb2YgVlRleHQpIHtcbiAgICAgICAgICAgIG5vZGUuZG9tID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUobm9kZS50ZXh0KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobm9kZSBpbnN0YW5jZW9mIFZUYWdOb2RlKSB7XG4gICAgICAgICAgICBub2RlLmRvbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQobm9kZS50YWcpO1xuICAgICAgICAgICAgaWYgKG5vZGUuYXR0cnMpIHtcbiAgICAgICAgICAgICAgICBjcmVhdGVBdHRycyhub2RlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBwYXJlbnQuZG9tLmluc2VydEJlZm9yZShub2RlLmRvbSwgcGFyZW50IGluc3RhbmNlb2YgVkZyYWdtZW50ID8gcGFyZW50Lmxhc3ROb2RlIDogbnVsbCk7XG4gICAgfVxuXG4gICAgaWYgKG5vZGUuY2hpbGRyZW4pIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBub2RlLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBub3JtQ2hpbGQobm9kZSwgaSk7XG4gICAgICAgICAgICBhcHBlbmQobm9kZSwgaSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAobm9kZSBpbnN0YW5jZW9mIFZDb21wb25lbnQpIHtcbiAgICAgICAgbm9kZS5jb21wb25lbnQuY29tcG9uZW50RGlkTW91bnQoKTtcbiAgICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3RzL2FwcGVuZC50c1xuICoqLyIsImltcG9ydCB7QmFzZU5vZGUsIFZUZXh0LCBWVGFnTm9kZSwgVk5vZGUsIFZDb21wb25lbnQsIFZGcmFnbWVudH0gZnJvbSAnLi9ub2RlJztcbmV4cG9ydCBmdW5jdGlvbiBub3JtQ2hpbGQocGFyZW50OlZOb2RlLCBjaGlsZFBvczpudW1iZXIpIHtcbiAgICB2YXIgbm9kZSA9IHBhcmVudC5jaGlsZHJlbltjaGlsZFBvc107XG4gICAgaWYgKG5vZGUgaW5zdGFuY2VvZiBCYXNlTm9kZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0eXBlb2Ygbm9kZSA9PSAnc3RyaW5nJyB8fCB0eXBlb2Ygbm9kZSA9PSAnbnVtYmVyJykge1xuICAgICAgICBwYXJlbnQuY2hpbGRyZW5bY2hpbGRQb3NdID0gbmV3IFZUZXh0KG5vZGUgKyAnJyk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKG5vZGUgPT0gbnVsbCkge1xuICAgICAgICBwYXJlbnQuY2hpbGRyZW5bY2hpbGRQb3NdID0gbmV3IFZUZXh0KCcnKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIG5vZGUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIGlmIChub2RlIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgIHBhcmVudC5jaGlsZHJlbltjaGlsZFBvc10gPSBuZXcgVkZyYWdtZW50KDxWTm9kZVtdPm5vZGUsIG51bGwpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcGFyZW50LmNoaWxkcmVuW2NoaWxkUG9zXSA9IG5ldyBWVGV4dChKU09OLnN0cmluZ2lmeShub2RlKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIG5vZGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcGFyZW50LmNoaWxkcmVuW2NoaWxkUG9zXSA9IG5ldyBWVGV4dCgnRnVuY3Rpb24nKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBwYXJlbnQuY2hpbGRyZW5bY2hpbGRQb3NdID0gbmV3IFZUZXh0KCcnKTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdHMvdXRpbHMudHNcbiAqKi8iLCJpbXBvcnQge1ZUZXh0LCBWVGFnTm9kZSwgVk5vZGUsIFZDb21wb25lbnQsIFZGcmFnbWVudH0gZnJvbSAnLi9ub2RlJztcbmltcG9ydCB7YXBwZW5kfSBmcm9tICcuL2FwcGVuZCc7XG5pbXBvcnQge3VwZGF0ZX0gZnJvbSAnLi91cGRhdGUnO1xuaW1wb3J0IHt1cGRhdGVDaGlsZHJlbn0gZnJvbSAnLi91cGRhdGUtY2hpbGRyZW4nO1xuaW1wb3J0IHtub3JtQ2hpbGR9IGZyb20gJy4vdXRpbHMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIElDb21wb25lbnQge1xuICAgIG5ldyhwcm9wczphbnkpOiBDb21wb25lbnQ7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUHJvcHMge1xuICAgIGNoaWxkcmVuOiBWTm9kZVtdO1xufVxuXG5leHBvcnQgY2xhc3MgQ29tcG9uZW50IHtcbiAgICBub2RlOlZOb2RlO1xuICAgIHByb3BzOlByb3BzO1xuXG4gICAgY29uc3RydWN0b3IocHJvcHM6IFByb3BzKXtcbiAgICAgICAgdGhpcy5wcm9wcyA9IHByb3BzO1xuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcblxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuXG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFVwZGF0ZSgpIHtcblxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcblxuICAgIH1cblxuICAgIC8vdG9kb1xuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMocHJvcHM6UHJvcHMpIHtcblxuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuXG4gICAgfVxuXG4gICAgcmVuZGVyKCk6Vk5vZGUge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBmb3JjZVVwZGF0ZSgpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnRXaWxsVXBkYXRlKCk7XG4gICAgICAgIHZhciBjaGlsZHJlbiA9IFt0aGlzLnJlbmRlcigpXTtcbiAgICAgICAgdmFyIHRlbXAgPSBuZXcgVkNvbXBvbmVudChudWxsLCBudWxsLCBjaGlsZHJlbiwgbnVsbCk7XG4gICAgICAgIHVwZGF0ZUNoaWxkcmVuKHRoaXMubm9kZSwgdGVtcCk7IC8vIGNsZWFyIHRoaXMubm9kZS5jaGlsZHJlblxuICAgICAgICB0aGlzLm5vZGUuY2hpbGRyZW4gPSBjaGlsZHJlbjtcbiAgICAgICAgdGhpcy5jb21wb25lbnREaWRVcGRhdGUoKTtcbiAgICAgICAgdGVtcC5kZXN0cm95KClcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmaW5kRE9NTm9kZShub2RlOiBWTm9kZSkge1xuICAgIHJldHVybiBub2RlLmRvbTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUNvbXBvbmVudChub2RlOlZDb21wb25lbnQpIHtcbiAgICB2YXIgcHJvcHMgPSBub2RlLmF0dHJzO1xuICAgIHByb3BzLmNoaWxkcmVuID0gbm9kZS5jaGlsZHJlbjtcbiAgICB2YXIgY29tcG9uZW50ID0gbmV3IG5vZGUuY3Rvcihwcm9wcyk7XG4gICAgY29tcG9uZW50Lm5vZGUgPSBub2RlO1xuICAgIGNvbXBvbmVudC5jb21wb25lbnRXaWxsTW91bnQoKTtcbiAgICBub2RlLmNoaWxkcmVuID0gW2NvbXBvbmVudC5yZW5kZXIoKV07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVDb21wb25lbnQob2xkOlZDb21wb25lbnQsIHBhcmVudDpWTm9kZSwgY2hpbGRQb3M6bnVtYmVyKSB7XG4gICAgdmFyIG5ld05vZGUgPSA8VkNvbXBvbmVudD5wYXJlbnQuY2hpbGRyZW5bY2hpbGRQb3NdO1xuICAgIHZhciBwcm9wcyA9IG5ld05vZGUuYXR0cnM7XG4gICAgcHJvcHMuY2hpbGRyZW4gPSBuZXdOb2RlLmNoaWxkcmVuO1xuICAgIG9sZC5jb21wb25lbnQuY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhwcm9wcyk7XG4gICAgb2xkLmNvbXBvbmVudC5wcm9wcyA9IHByb3BzO1xuICAgIG9sZC5jb21wb25lbnQuZm9yY2VVcGRhdGUoKTtcdCAvLyBhZmZlY3Qgbm9kZSBjaGlsZHJlblxuICAgIHBhcmVudC5jaGlsZHJlbltjaGlsZFBvc10gPSBvbGQ7XG4gICAgbmV3Tm9kZS5kZXN0cm95KCk7XG4gICAgLy9ubyBkZXN0cm95IG9sZFxufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdHMvY29tcG9uZW50LnRzXG4gKiovIiwiaW1wb3J0IHtWVGV4dCwgVlRhZ05vZGUsIFZOb2RlLCBWQ29tcG9uZW50LCBWRnJhZ21lbnR9IGZyb20gJy4vbm9kZSc7XG5pbXBvcnQge2FwcGVuZH0gZnJvbSAnLi9hcHBlbmQnO1xuaW1wb3J0IHt1cGRhdGV9IGZyb20gJy4vdXBkYXRlJztcbmltcG9ydCB7cmVtb3ZlfSBmcm9tICcuL3JlbW92ZSc7XG5pbXBvcnQge25vcm1DaGlsZH0gZnJvbSAnLi91dGlscyc7XG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVDaGlsZHJlbihvbGQ6Vk5vZGUsIG5vZGU6Vk5vZGUpIHtcbiAgICB2YXIgb2xkQ2hpbGRyZW4gPSBvbGQuY2hpbGRyZW47XG4gICAgdmFyIG5ld0NoaWxkcmVuID0gbm9kZS5jaGlsZHJlbjtcbiAgICBpZiAobmV3Q2hpbGRyZW4pe1xuICAgICAgICB2YXIgZml0Q291bnQgPSAwO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5ld0NoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBub3JtQ2hpbGQobm9kZSwgaSk7XG4gICAgICAgICAgICB2YXIgZml0UG9zOiBudW1iZXI7XG4gICAgICAgICAgICB2YXIgbmV3Q2hpbGQgPSBuZXdDaGlsZHJlbltpXTtcbiAgICAgICAgICAgIHZhciBvbGRDaGlsZCA9IG9sZENoaWxkcmVuW2ldO1xuICAgICAgICAgICAgaWYgKG9sZC5rZXlNYXApe1xuICAgICAgICAgICAgICAgIGlmIChuZXdDaGlsZC5rZXkgIT0gbnVsbCl7XG4gICAgICAgICAgICAgICAgICAgIGZpdFBvcyA9IG9sZC5rZXlNYXBbbmV3Q2hpbGQua2V5XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChvbGRDaGlsZCAmJiBvbGRDaGlsZC5rZXkgPT0gbnVsbCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBmaXRQb3MgPSBpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZml0UG9zID0gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChmaXRQb3MgIT0gbnVsbCl7XG4gICAgICAgICAgICAgICAgZml0Q291bnQrKztcbiAgICAgICAgICAgICAgICB1cGRhdGUob2xkQ2hpbGRyZW5bZml0UG9zXSwgbm9kZSwgaSk7XG4gICAgICAgICAgICAgICAgaWYgKGZpdFBvcyAhPT0gaSl7XG4gICAgICAgICAgICAgICAgICAgIG1vdmVUb0VuZChuZXdDaGlsZCwgbm9kZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgYXBwZW5kKG5vZGUsIGkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYgKG9sZENoaWxkcmVuICYmIG9sZENoaWxkcmVuLmxlbmd0aCAhPT0gZml0Q291bnQpe1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9sZENoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgb2xkQ2hpbGQgPSBvbGRDaGlsZHJlbltpXTtcbiAgICAgICAgICAgIGlmIChvbGRDaGlsZCl7XG4gICAgICAgICAgICAgICAgcmVtb3ZlKG9sZENoaWxkLCBvbGQsIGkpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIG1vdmVUb0VuZChub2RlOlZOb2RlLCBwYXJlbnQ6Vk5vZGUpIHtcbiAgICBub2RlLmRvbS5wYXJlbnROb2RlLmluc2VydEJlZm9yZShub2RlLmRvbSwgcGFyZW50IGluc3RhbmNlb2YgVkZyYWdtZW50ID8gcGFyZW50Lmxhc3ROb2RlIDogbnVsbClcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3RzL3VwZGF0ZS1jaGlsZHJlbi50c1xuICoqLyIsImltcG9ydCB7VlRleHQsIFZUYWdOb2RlLCBWTm9kZSwgVkNvbXBvbmVudCwgVkZyYWdtZW50fSBmcm9tICcuL25vZGUnO1xuaW1wb3J0IHtub3JtQ2hpbGR9IGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0IHtyZW1vdmV9IGZyb20gJy4vcmVtb3ZlJztcbmltcG9ydCB7YXBwZW5kfSBmcm9tICcuL2FwcGVuZCc7XG5pbXBvcnQge3VwZGF0ZUNoaWxkcmVufSBmcm9tICcuL3VwZGF0ZS1jaGlsZHJlbic7XG5pbXBvcnQge3VwZGF0ZUF0dHJzfSBmcm9tICcuL2F0dHJzJztcbmltcG9ydCB7dXBkYXRlQ29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudCc7XG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGUob2xkOlZOb2RlLCBwYXJlbnQ6Vk5vZGUsIGNoaWxkUG9zOm51bWJlcikge1xuICAgIHZhciBub2RlID0gcGFyZW50LmNoaWxkcmVuW2NoaWxkUG9zXTtcbiAgICBub2RlLmRvbSA9IG9sZC5kb207XG4gICAgaWYgKG5vZGUua2V5ICE9IG51bGwpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBwYXJlbnQua2V5TWFwID09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBwYXJlbnQua2V5TWFwID0ge31cbiAgICAgICAgfVxuICAgICAgICBwYXJlbnQua2V5TWFwW25vZGUua2V5XSA9IGNoaWxkUG9zO1xuICAgIH1cbiAgICBpZiAob2xkLmNvbnN0cnVjdG9yICE9PSBub2RlLmNvbnN0cnVjdG9yKSB7XG4gICAgICAgIHJlcGxhY2VOb2RlKG9sZCwgcGFyZW50LCBjaGlsZFBvcyk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKG5vZGUgaW5zdGFuY2VvZiBWQ29tcG9uZW50KSB7XG4gICAgICAgIGlmICgoPFZDb21wb25lbnQ+b2xkKS5jdG9yICE9PSBub2RlLmN0b3IpIHtcbiAgICAgICAgICAgIHJlcGxhY2VOb2RlKG9sZCwgcGFyZW50LCBjaGlsZFBvcyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdXBkYXRlQ29tcG9uZW50KDxWQ29tcG9uZW50Pm9sZCwgcGFyZW50LCBjaGlsZFBvcyk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKG5vZGUgaW5zdGFuY2VvZiBWVGV4dCkge1xuICAgICAgICBub2RlLmRvbS50ZXh0Q29udGVudCA9IG5vZGUudGV4dDtcbiAgICAgICAgb2xkLmRlc3Ryb3koKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAobm9kZSBpbnN0YW5jZW9mIFZUYWdOb2RlKSB7XG4gICAgICAgIGlmICgoPFZUYWdOb2RlPm9sZCkudGFnICE9PSBub2RlLnRhZykge1xuICAgICAgICAgICAgcmVwbGFjZU5vZGUob2xkLCBwYXJlbnQsIGNoaWxkUG9zKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBzdWNjZXNzQXR0cnMgPSB1cGRhdGVBdHRycyg8VlRhZ05vZGU+b2xkLCBwYXJlbnQsIGNoaWxkUG9zKTtcbiAgICAgICAgaWYgKCFzdWNjZXNzQXR0cnMpe1xuICAgICAgICAgICAgcmVwbGFjZU5vZGUob2xkLCBwYXJlbnQsIGNoaWxkUG9zKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgIH1cbiAgICB1cGRhdGVDaGlsZHJlbihvbGQsIG5vZGUpO1xuICAgIG9sZC5kZXN0cm95KCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZXBsYWNlTm9kZShvbGQ6Vk5vZGUsIHBhcmVudDpWTm9kZSwgY2hpbGRQb3M6bnVtYmVyKSB7XG4gICAgcmVtb3ZlKG9sZCwgcGFyZW50KTtcbiAgICBhcHBlbmQocGFyZW50LCBjaGlsZFBvcyk7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3RzL3VwZGF0ZS50c1xuICoqLyIsImltcG9ydCB7VlRleHQsIFZUYWdOb2RlLCBWTm9kZSwgVkNvbXBvbmVudCwgVkZyYWdtZW50fSBmcm9tICcuL25vZGUnO1xuaW1wb3J0IHthcHBlbmR9IGZyb20gJy4vYXBwZW5kJztcbmltcG9ydCB7dXBkYXRlfSBmcm9tICcuL3VwZGF0ZSc7XG5pbXBvcnQge25vcm1DaGlsZH0gZnJvbSAnLi91dGlscyc7XG5cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmUobm9kZTpWTm9kZSwgcGFyZW50OlZOb2RlLCBjaGlsZFBvcz86bnVtYmVyKSB7XG4gICAgaWYgKG5vZGUgaW5zdGFuY2VvZiBWQ29tcG9uZW50KSB7XG4gICAgICAgIG5vZGUuY29tcG9uZW50LmNvbXBvbmVudFdpbGxVbm1vdW50KCk7XG4gICAgfVxuICAgIGlmIChub2RlLmNoaWxkcmVuKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbm9kZS5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgcmVtb3ZlKG5vZGUuY2hpbGRyZW5baV0sIG5vZGUsIGkpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAobm9kZSBpbnN0YW5jZW9mIFZGcmFnbWVudCkge1xuICAgICAgICBub2RlLmRvbS5yZW1vdmVDaGlsZChub2RlLmxhc3ROb2RlKTtcbiAgICB9XG4gICAgbm9kZS5kZXN0cm95KCk7XG4gICAgaWYgKGNoaWxkUG9zICE9IG51bGwpIHtcbiAgICAgICAgcGFyZW50LmNoaWxkcmVuW2NoaWxkUG9zXSA9IG51bGw7XG4gICAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90cy9yZW1vdmUudHNcbiAqKi8iLCJpbXBvcnQge1ZUZXh0LCBWVGFnTm9kZSwgVk5vZGUsIFZDb21wb25lbnQsIFZGcmFnbWVudH0gZnJvbSAnLi9ub2RlJztcbmltcG9ydCB7YXBwZW5kfSBmcm9tICcuL2FwcGVuZCc7XG5pbXBvcnQge3VwZGF0ZSwgcmVwbGFjZU5vZGV9IGZyb20gJy4vdXBkYXRlJztcbmltcG9ydCB7bm9ybUNoaWxkfSBmcm9tICcuL3V0aWxzJztcbmltcG9ydCB7YXR0cnMsIHByb3BzLCBldmVudHN9IGZyb20gJy4vY29uc3QtYXR0cnMnO1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQXR0cnMobm9kZTpWVGFnTm9kZSkge1xuICAgIF91cGRhdGVBdHRycyhudWxsLCBub2RlKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVBdHRycyhvbGQ6VlRhZ05vZGUsIHBhcmVudDpWTm9kZSwgY2hpbGRQb3M6bnVtYmVyKTpib29sZWFuIHtcbiAgICB2YXIgbm9kZSA9IDxWVGFnTm9kZT5wYXJlbnQuY2hpbGRyZW5bY2hpbGRQb3NdO1xuICAgIGlmIChub2RlLmF0dHJzKSB7XG4gICAgICAgIGlmIChvbGQuYXR0cnMpIHtcbiAgICAgICAgICAgIF91cGRhdGVBdHRycyhub2RlLCBvbGQuYXR0cnMpOyAvLyBhZmZlY3Qgbm9kZS5hdHRyc0NvZGVcbiAgICAgICAgICAgIHJldHVybiBvbGQuYXR0cnNDb2RlID09PSBub2RlLmF0dHJzQ29kZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmIChvbGQuYXR0cnMpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gX3VwZGF0ZUF0dHJzKG5vZGU6VlRhZ05vZGUsIG9sZEF0dHJzOmFueSkge1xuICAgIHZhciBkb20gPSA8SFRNTEVsZW1lbnQ+bm9kZS5kb207XG4gICAgdmFyIGF0dHI6c3RyaW5nO1xuICAgIHZhciBwcm9wOnN0cmluZztcbiAgICB2YXIgZXZlbnQ6c3RyaW5nO1xuICAgIGZvciAodmFyIGF0dHJOYW1lIGluIG5vZGUuYXR0cnMpIHtcbiAgICAgICAgbm9kZS5hdHRyc0NvZGUgKz0gYXR0ck5hbWU7XG4gICAgICAgIHZhciBhdHRyVmFsID0gbm9kZS5hdHRyc1thdHRyTmFtZV07XG4gICAgICAgIGlmIChvbGRBdHRycyAmJiBvbGRBdHRyc1thdHRyTmFtZV0gPT09IGF0dHJWYWwpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChhdHRyTmFtZSA9PSAna2V5Jykge1xuXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAocHJvcCA9IHByb3BzW2F0dHJOYW1lXSkge1xuICAgICAgICAgICAgKDxhbnk+ZG9tKVtwcm9wXSA9IGF0dHJWYWw7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoYXR0ciA9IGF0dHJzW2F0dHJOYW1lXSkge1xuICAgICAgICAgICAgZG9tLnNldEF0dHJpYnV0ZShhdHRyLCBhdHRyVmFsKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChldmVudCA9IGV2ZW50c1thdHRyTmFtZV0pIHtcbiAgICAgICAgICAgICg8YW55PmRvbSlbJ29uJyArIGV2ZW50XSA9IGF0dHJWYWw7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoYXR0ck5hbWVbMF0gPT09ICdvJyAmJiBhdHRyTmFtZVsxXSA9PT0gJ24nKSB7XG4gICAgICAgICAgICBldmVudCA9IGF0dHJOYW1lLnN1YnN0cmluZygyKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgKDxhbnk+ZG9tKVsnb24nICsgZXZlbnRdID0gYXR0clZhbDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChhdHRyTmFtZVswXSA9PT0gJ2QnICYmIGF0dHJOYW1lWzFdID09PSAnYScgJiYgYXR0ck5hbWVbMl0gPT09ICd0JyAmJiBhdHRyTmFtZVszXSA9PT0gJ2EnKSB7XG4gICAgICAgICAgICBkb20uc2V0QXR0cmlidXRlKGF0dHJOYW1lLCBhdHRyVmFsKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChhdHRyTmFtZSA9PT0gJ3N0eWxlJykge1xuICAgICAgICAgICAgLy90b2RvOlxuICAgICAgICB9XG4gICAgfVxufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdHMvYXR0cnMudHNcbiAqKi8iLCJleHBvcnQgbGV0IGF0dHJzOntbaW5kZXg6c3RyaW5nXTpzdHJpbmd9ID0ge1xuICAgIGFjY2VwdDogJ2FjY2VwdCcsXG4gICAgYWNjZXB0Q2hhcnNldDogJ2FjY2VwdC1jaGFyc2V0JyxcbiAgICBhY2Nlc3NLZXk6ICdhY2Nlc3NLZXknLFxuICAgIGFjdGlvbjogJ2FjdGlvbicsXG4gICAgYWxsb3dGdWxsU2NyZWVuOiAnYWxsb3dGdWxsU2NyZWVuJyxcbiAgICBhbGxvd1RyYW5zcGFyZW5jeTogJ2FsbG93VHJhbnNwYXJlbmN5JyxcbiAgICBhbHQ6ICdhbHQnLFxuICAgIGFzeW5jOiAnYXN5bmMnLFxuICAgIGF1dG9Db21wbGV0ZTogJ2F1dG9Db21wbGV0ZScsXG4gICAgYXV0b1BsYXk6ICdhdXRvUGxheScsXG4gICAgY2FwdHVyZTogJ2NhcHR1cmUnLFxuICAgIGNlbGxQYWRkaW5nOiAnY2VsbFBhZGRpbmcnLFxuICAgIGNlbGxTcGFjaW5nOiAnY2VsbFNwYWNpbmcnLFxuICAgIGNoYXJTZXQ6ICdjaGFyU2V0JyxcbiAgICBjaGFsbGVuZ2U6ICdjaGFsbGVuZ2UnLFxuICAgIGNsYXNzSUQ6ICdjbGFzc0lEJyxcbiAgICBjb2xzOiAnY29scycsXG4gICAgY29sU3BhbjogJ2NvbFNwYW4nLFxuICAgIGNvbnRlbnQ6ICdjb250ZW50JyxcbiAgICBjb250ZW50RWRpdGFibGU6ICdjb250ZW50RWRpdGFibGUnLFxuICAgIGNvbnRleHRNZW51OiAnY29udGV4dE1lbnUnLFxuICAgIGNvb3JkczogJ2Nvb3JkcycsXG4gICAgY3Jvc3NPcmlnaW46ICdjcm9zc09yaWdpbicsXG4gICAgZGF0YTogJ2RhdGEnLFxuICAgIGRhdGVUaW1lOiAnZGF0ZVRpbWUnLFxuICAgIGRlZmVyOiAnZGVmZXInLFxuICAgIGRpcjogJ2RpcicsXG4gICAgZGlzYWJsZWQ6ICdkaXNhYmxlZCcsXG4gICAgZG93bmxvYWQ6ICdkb3dubG9hZCcsXG4gICAgZHJhZ2dhYmxlOiAnZHJhZ2dhYmxlJyxcbiAgICBlbmNUeXBlOiAnZW5jVHlwZScsXG4gICAgZm9ybTogJ2Zvcm0nLFxuICAgIGZvcm1BY3Rpb246ICdmb3JtQWN0aW9uJyxcbiAgICBmb3JtRW5jVHlwZTogJ2Zvcm1FbmNUeXBlJyxcbiAgICBmb3JtTWV0aG9kOiAnZm9ybU1ldGhvZCcsXG4gICAgZm9ybU5vVmFsaWRhdGU6ICdmb3JtTm9WYWxpZGF0ZScsXG4gICAgZm9ybVRhcmdldDogJ2Zvcm1UYXJnZXQnLFxuICAgIGZyYW1lQm9yZGVyOiAnZnJhbWVCb3JkZXInLFxuICAgIGhlYWRlcnM6ICdoZWFkZXJzJyxcbiAgICBoZWlnaHQ6ICdoZWlnaHQnLFxuICAgIGhpZGRlbjogJ2hpZGRlbicsXG4gICAgaGlnaDogJ2hpZ2gnLFxuICAgIGhyZWY6ICdocmVmJyxcbiAgICBocmVmTGFuZzogJ2hyZWZMYW5nJyxcbiAgICBodG1sRm9yOiAnZm9yJyxcbiAgICBodHRwRXF1aXY6ICdodHRwLWVxdWl2JyxcbiAgICBpY29uOiAnaWNvbicsXG4gICAgaW5wdXRNb2RlOiAnaW5wdXRNb2RlJyxcbiAgICBpczogJ2lzJyxcbiAgICBrZXlQYXJhbXM6ICdrZXlQYXJhbXMnLFxuICAgIGtleVR5cGU6ICdrZXlUeXBlJyxcbiAgICBsYWJlbDogJ2xhYmVsJyxcbiAgICBsYW5nOiAnbGFuZycsXG4gICAgbGlzdDogJ2xpc3QnLFxuICAgIGxvdzogJ2xvdycsXG4gICAgbWFuaWZlc3Q6ICdtYW5pZmVzdCcsXG4gICAgbWFyZ2luSGVpZ2h0OiAnbWFyZ2luSGVpZ2h0JyxcbiAgICBtYXJnaW5XaWR0aDogJ21hcmdpbldpZHRoJyxcbiAgICBtYXg6ICdtYXgnLFxuICAgIG1heExlbmd0aDogJ21heExlbmd0aCcsXG4gICAgbWVkaWE6ICdtZWRpYScsXG4gICAgbWVkaWFHcm91cDogJ21lZGlhR3JvdXAnLFxuICAgIG1ldGhvZDogJ21ldGhvZCcsXG4gICAgbWluOiAnbWluJyxcbiAgICBtaW5MZW5ndGg6ICdtaW5MZW5ndGgnLFxuICAgIG5hbWU6ICduYW1lJyxcbiAgICBub1ZhbGlkYXRlOiAnbm9WYWxpZGF0ZScsXG4gICAgb3BlbjogJ29wZW4nLFxuICAgIG9wdGltdW06ICdvcHRpbXVtJyxcbiAgICBwYXR0ZXJuOiAncGF0dGVybicsXG4gICAgcGxhY2Vob2xkZXI6ICdwbGFjZWhvbGRlcicsXG4gICAgcG9zdGVyOiAncG9zdGVyJyxcbiAgICBwcmVsb2FkOiAncHJlbG9hZCcsXG4gICAgcmFkaW9Hcm91cDogJ3JhZGlvR3JvdXAnLFxuICAgIHJlbDogJ3JlbCcsXG4gICAgcmVxdWlyZWQ6ICdyZXF1aXJlZCcsXG4gICAgcm9sZTogJ3JvbGUnLFxuICAgIHJvd3M6ICdyb3dzJyxcbiAgICByb3dTcGFuOiAncm93U3BhbicsXG4gICAgc2FuZGJveDogJ3NhbmRib3gnLFxuICAgIHNjb3BlOiAnc2NvcGUnLFxuICAgIHNjb3BlZDogJ3Njb3BlZCcsXG4gICAgc2Nyb2xsaW5nOiAnc2Nyb2xsaW5nJyxcbiAgICBzZWFtbGVzczogJ3NlYW1sZXNzJyxcbiAgICBzaGFwZTogJ3NoYXBlJyxcbiAgICBzaXplOiAnc2l6ZScsXG4gICAgc2l6ZXM6ICdzaXplcycsXG4gICAgc3BhbjogJ3NwYW4nLFxuICAgIHNwZWxsQ2hlY2s6ICdzcGVsbENoZWNrJyxcbiAgICBzcmM6ICdzcmMnLFxuICAgIHNyY1NldDogJ3NyY1NldCcsXG4gICAgc3RhcnQ6ICdzdGFydCcsXG4gICAgc3RlcDogJ3N0ZXAnLFxuICAgIHN0eWxlOiAnc3R5bGUnLFxuICAgIHRhYkluZGV4OiAndGFiSW5kZXgnLFxuICAgIHRhcmdldDogJ3RhcmdldCcsXG4gICAgdGl0bGU6ICd0aXRsZScsXG4gICAgdHlwZTogJ3R5cGUnLFxuICAgIHVzZU1hcDogJ3VzZU1hcCcsXG4gICAgd2lkdGg6ICd3aWR0aCcsXG4gICAgd21vZGU6ICd3bW9kZScsXG4gICAgYXV0b0NhcGl0YWxpemU6ICdhdXRvQ2FwaXRhbGl6ZScsXG4gICAgYXV0b0NvcnJlY3Q6ICdhdXRvQ29ycmVjdCcsXG4gICAgaXRlbVByb3A6ICdpdGVtUHJvcCcsXG4gICAgaXRlbVNjb3BlOiAnaXRlbVNjb3BlJyxcbiAgICBpdGVtVHlwZTogJ2l0ZW1UeXBlJyxcbiAgICBpdGVtSUQ6ICdpdGVtSUQnLFxuICAgIGl0ZW1SZWY6ICdpdGVtUmVmJyxcbiAgICBwcm9wZXJ0eTogJ3Byb3BlcnR5JyxcbiAgICBzZWN1cml0eTogJ3NlY3VyaXR5JyxcbiAgICB1bnNlbGVjdGFibGU6ICd1bnNlbGVjdGFibGUnLFxufTtcblxuZXhwb3J0IGxldCBwcm9wczp7W2luZGV4OnN0cmluZ106c3RyaW5nfSA9IHtcbiAgICBjaGVja2VkOiAnY2hlY2tlZCcsXG4gICAgY2xhc3NOYW1lOiAnY2xhc3NOYW1lJyxcbiAgICBjb250cm9sczogJ2NvbnRyb2xzJyxcbiAgICBpZDogJ2lkJyxcbiAgICBsb29wOiAnbG9vcCcsXG4gICAgbXVsdGlwbGU6ICdtdWx0aXBsZScsXG4gICAgbXV0ZWQ6ICdtdXRlZCcsXG4gICAgcmVhZE9ubHk6ICdyZWFkT25seScsXG4gICAgc2VsZWN0ZWQ6ICdzZWxlY3RlZCcsXG4gICAgc3JjRG9jOiAnc3JjZG9jJyxcbiAgICB2YWx1ZTogJ3ZhbHVlJ1xufTtcblxuZXhwb3J0IGxldCBub3RQeDp7W2luZGV4OnN0cmluZ106Ym9vbGVhbn0gPSB7XG4gICAgYm94RmxleDogdHJ1ZSxcbiAgICBib3hGbGV4R3JvdXA6IHRydWUsXG4gICAgY29sdW1uQ291bnQ6IHRydWUsXG4gICAgZmlsbE9wYWNpdHk6IHRydWUsXG4gICAgZmxleDogdHJ1ZSxcbiAgICBmbGV4R3JvdzogdHJ1ZSxcbiAgICBmbGV4UG9zaXRpdmU6IHRydWUsXG4gICAgZmxleFNocmluazogdHJ1ZSxcbiAgICBmbGV4TmVnYXRpdmU6IHRydWUsXG4gICAgZm9udFdlaWdodDogdHJ1ZSxcbiAgICBsaW5lQ2xhbXA6IHRydWUsXG4gICAgbGluZUhlaWdodDogdHJ1ZSxcbiAgICBvcGFjaXR5OiB0cnVlLFxuICAgIG9yZGVyOiB0cnVlLFxuICAgIG9ycGhhbnM6IHRydWUsXG4gICAgc3Ryb2tlT3BhY2l0eTogdHJ1ZSxcbiAgICB3aWRvd3M6IHRydWUsXG4gICAgekluZGV4OiB0cnVlLFxuICAgIHpvb206IHRydWVcbn07XG5cbmV4cG9ydCBsZXQgZXZlbnRzOntbaW5kZXg6c3RyaW5nXTpzdHJpbmd9ID0ge1xuICAgIG9uUmVuZGVyOiBcInJlbmRlclwiLFxuICAgIG9uQ2xpY2s6ICgoJ29udG91Y2hlbmQnIGluIHdpbmRvdykpID8gJ3RvdWNoZW5kJyA6ICdjbGljaycsXG4gICAgb25EYmxDbGljazogJ2RibGNsaWNrJyxcblxuICAgIG9uTW91c2VEb3duOiAnbW91c2Vkb3duJyxcbiAgICBvbk1vdXNlVXA6ICdtb3VzZXVwJyxcbiAgICBvbk1vdXNlTW92ZTogJ21vdXNlbW92ZScsXG4gICAgb25Nb3VzZUVudGVyOiAnbW91c2VlbnRlcicsXG4gICAgb25Nb3VzZUxlYXZlOiAnbW91c2VsZWF2ZScsXG4gICAgb25Nb3VzZU92ZXI6ICdtb3VzZW92ZXInLFxuICAgIG9uTW91c2VPdXQ6ICdtb3VzZW91dCcsXG5cbiAgICBvblRvdWNoU3RhcnQ6ICd0b3VjaHN0YXJ0JyxcbiAgICBvblRvdWNoRW5kOiAndG91Y2hlbmQnLFxuICAgIG9uVG91Y2hNb3ZlOiAndG91Y2htb3ZlJyxcbiAgICBvblRvdWNoQ2FuY2VsOiAndG91Y2hjYW5jZWwnLFxuICAgIG9uVG91Y2hMZWF2ZTogJ3RvdWNobGVhdmUnLFxuXG4gICAgb25Db250ZXh0TWVudTogJ2NvbnRleHRtZW51JyxcblxuICAgIG9uSW5wdXQ6ICdpbnB1dCcsXG4gICAgb25Gb2N1czogJ2ZvY3VzJyxcbiAgICBvbkNoYW5nZTogJ2NoYW5nZScsXG5cbiAgICBvbktleURvd246ICdrZXlkb3duJyxcbiAgICBvbktleVByZXNzOiAna2V5cHJlc3MnLFxuICAgIG9uS2V5VXA6ICdrZXl1cCdcbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3RzL2NvbnN0LWF0dHJzLnRzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==