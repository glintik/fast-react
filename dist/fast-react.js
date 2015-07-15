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

	"use strict";
	
	module.exports = __webpack_require__(1);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {module.exports = global["FastReact"] = __webpack_require__(2);
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _create = __webpack_require__(3);
	
	Object.defineProperty(exports, 'render', {
	  enumerable: true,
	  get: function get() {
	    return _create.render;
	  }
	});
	Object.defineProperty(exports, 'createElement', {
	  enumerable: true,
	  get: function get() {
	    return _create.createElement;
	  }
	});
	Object.defineProperty(exports, 'createElementArray', {
	  enumerable: true,
	  get: function get() {
	    return _create.createElementArray;
	  }
	});
	
	var _component = __webpack_require__(7);
	
	Object.defineProperty(exports, 'Component', {
	  enumerable: true,
	  get: function get() {
	    return _component.Component;
	  }
	});
	Object.defineProperty(exports, 'findDOMNode', {
	  enumerable: true,
	  get: function get() {
	    return _component.findDOMNode;
	  }
	});
	
	var _update = __webpack_require__(8);
	
	Object.defineProperty(exports, 'update', {
	  enumerable: true,
	  get: function get() {
	    return _update.update;
	  }
	});

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	exports.render = render;
	exports.create = create;
	exports.createElementArray = createElementArray;
	exports.createElement = createElement;
	
	var _attrs = __webpack_require__(4);
	
	var _utils = __webpack_require__(5);
	
	var _node = __webpack_require__(6);
	
	var _component = __webpack_require__(7);
	
	function render(vdom, dom) {
	    dom.appendChild(create(vdom, dom));
	    if (vdom.component) {
	        (0, _component.mountComponent)(vdom);
	    }
	    return vdom;
	}
	
	function create(vdom, parentDom) {
	    _utils.DEBUG && console.log('Create', vdom);
	    //vdom.parent = parent;
	    if (vdom.tag == '#') {
	        vdom.dom = document.createTextNode(vdom.text);
	        //vdom.dom.virtual = vdom;
	        return vdom.dom;
	    }
	    var dom;
	    if (vdom.fragment) {
	        if (typeof vdom.tag === 'function') {
	            (0, _component.createComponent)(vdom);
	        }
	        dom = document.createDocumentFragment();
	        vdom.dom = parentDom;
	    } else {
	        dom = document.createElement(vdom.tag);
	        vdom.dom = dom;
	        //dom.virtual = vdom;
	    }
	
	    if (vdom.children) {
	        for (var i = 0; i < vdom.children.length; i++) {
	            (0, _utils.normChild)(vdom, i);
	            var child = vdom.children[i];
	            if (vdom.tag === 'map' && child.attrs) {
	                vdom.keyMap[child.key] = i;
	            }
	            dom.appendChild(create(child, vdom.dom));
	            if (child.component) {
	                (0, _component.mountComponent)(child);
	            }
	        }
	    } else if (vdom.text) {
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
	            if ((prop = _attrs.props[attrName]) && attrVal !== false) {
	                dom[prop] = attrVal;
	            } else if ((attr = _attrs.attrs[attrName]) && attrVal !== false) {
	                dom.setAttribute(attr, attrVal);
	            } else if (event = _attrs.events[attrName]) {
	                //dom.addEventListener(event, eventHandler(attrVal));
	                dom['on' + event] = attrVal;
	            } else if (attrName[0] === 'o' && attrName[1] === 'n') {
	                event = attrName.substring(2).toLowerCase();
	                dom['on' + event] = attrVal;
	                //dom.addEventListener(event, eventHandler(attrVal));
	            } else if (attrName[0] === 'd' && attrName[1] === 'a' && attrName[2] === 't' && attrName[3] === 'a' && attrVal !== false) {
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
	
	function createElementArray(tag, attrs, children) {
	    var isFragment = tag == '@' || typeof tag == 'function';
	    //        var text = (children && !isFragment && (typeof children[0] == 'string' || typeof children[0] == 'number')) ? children[0] + '' : null;
	    if (isFragment) {
	        if (typeof tag == 'function') {
	            return new _node.VComponent(tag, attrs, children, attrs ? attrs.key : null);
	        } else {
	            return new _node.VFragmentNode(tag, attrs, children, attrs ? attrs.key : null);
	        }
	    } else {
	        return (0, _node.getNNode)(tag, attrs, children, attrs ? attrs.key : null, null);
	    }
	}
	
	function createElement(tag, attrs) {
	    var len = arguments.length;
	    var isFragment = tag == '@' || typeof tag == 'function';
	    var text = len == 3 && !isFragment && (typeof arguments[2] == 'string' || typeof arguments[2] == 'number') ? arguments[2] + '' : null;
	    var children = null;
	    if (!text && len > 2) {
	        children = Array(len - 2);
	        for (var i = 2; i < len; i++) {
	            children[i - 2] = arguments[i];
	        }
	    }
	
	    if (isFragment) {
	        if (typeof tag == 'function') {
	            return new _node.VComponent(tag, attrs, children, attrs ? attrs.key : null);
	        } else {
	            return new _node.VFragmentNode(tag, attrs, children, attrs ? attrs.key : null);
	        }
	    } else {
	        return (0, _node.getNNode)(tag, attrs, children, attrs ? attrs.key : null, text);
	    }
	}

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	var attrs = {
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
	    unselectable: 'unselectable'
	};
	
	exports.attrs = attrs;
	var props = {
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
	
	exports.props = props;
	var notPx = {
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
	
	exports.notPx = notPx;
	var events = {
	    onRender: 'render',
	    onClick: 'ontouchend' in window ? 'touchend' : 'click',
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
	exports.events = events;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	exports.normChild = normChild;
	exports.getFirstChild = getFirstChild;
	
	var _node = __webpack_require__(6);
	
	var DEBUG = false;
	exports.DEBUG = DEBUG;
	
	function normChild(vdom, i) {
	    if (vdom.children[i] && typeof vdom.children[i] == 'object' && vdom.children[i].tag) {
	        return;
	    }
	    var child = vdom.children[i];
	    if (typeof child == 'string' || typeof child == 'number') {
	        vdom.children[i] = (0, _node.getTextNode)(child);
	    } else if (child == null) {
	        vdom.children[i] = (0, _node.getTextNode)('');
	    } else if (typeof child === 'object') {
	        if (child instanceof Array) {
	            vdom.children[i] = new _node.VFragmentNode('map', null, child, null);
	        } else {
	            vdom.children[i] = (0, _node.getTextNode)(JSON.stringify(child));
	        }
	    } else if (typeof child === 'function') {
	        vdom.children[i] = (0, _node.getTextNode)('Function');
	    } else {
	        vdom.children[i] = (0, _node.getTextNode)('');
	    }
	    //return vdom.children[i];
	}
	
	function getFirstChild(old) {
	    var beforeChild = old.children[0];
	    while (beforeChild && beforeChild.fragment) {
	        beforeChild = beforeChild.children[0];
	    }
	    return beforeChild;
	}

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	exports.VFragmentNode = VFragmentNode;
	exports.VComponent = VComponent;
	exports.getNNode = getNNode;
	exports.getTextNode = getTextNode;
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
	    destroy: function destroy() {
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
	
	function VFragmentNode(tag, attrs, children, key) {
	    this.id = id++;
	    this.tag = tag;
	    if (tag == 'map') {
	        this.keyMap = {};
	        this.isMap = true;
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
	    destroy: function destroy() {
	        this.dom = null;
	        this.children = null;
	        //this.attrs = null;
	        this.keyMap = null;
	        //this.destroyed = true;
	        //this.parent = null;
	    }
	});
	
	function VComponent(tag, attrs, children, key) {
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
	
	classExtend(VComponent, proto, { fragment: true });
	
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
	    destroy: function destroy() {
	        this.dom = null;
	        this.children = null;
	        this.attrs = null;
	        //nodesCache[nodesCache.len++] = this;
	        //this.destroyed = true;
	        //this.parent = null;
	    }
	});
	
	function getNNode(tag, attrs, children, key, text) {
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
	    destroy: function destroy() {
	        this.dom = null;
	        textNodesCache[textNodesCache.len++] = this;
	        //this.destroyed = true;
	        //this.parent = null;
	    }
	});
	
	function getTextNode(text) {
	    if (textNodesCache.len == 0) {
	        return new VTextNode(text);
	    }
	    var item = textNodesCache[--textNodesCache.len];
	    item.text = text;
	    return item;
	}

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * ------------------ The Life-Cycle of a Composite Component ------------------
	 *
	 * + constructor: Initialization of state. The instance is now retained.
	 *   + componentWillMount
	 *   + render
	 *   + [children's constructors]
	 *     + [children's componentWillMount and render]
	 *     + [children's componentDidMount]
	 *     + componentDidMount
	 *
	 *       Update Phases:
	 *       + componentWillReceiveProps (only called if parent updated)
	 *       - shouldComponentUpdate
	 *         + componentWillUpdate
	 *           + render
	 *           + [children's constructors or receive props phases]
	 *         + componentDidUpdate
	 *
	 *     + componentWillUnmount
	 *     + [children's componentWillUnmount]
	 *   - [children destroyed]
	 * - (destroyed): The instance is now blank, released by React and ready for GC.
	 *
	 * -----------------------------------------------------------------------------
	 */
	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	exports.findDOMNode = findDOMNode;
	exports.Component = Component;
	exports.updateComponent = updateComponent;
	exports.createComponent = createComponent;
	exports.destroyComponent = destroyComponent;
	exports.mountComponent = mountComponent;
	
	var _update = __webpack_require__(8);
	
	var _node = __webpack_require__(6);
	
	var _utils = __webpack_require__(5);
	
	function findDOMNode(vdom) {
	    return vdom.dom;
	}
	
	function Component(props) {
	    this.props = props;
	}
	
	Component.prototype.componentWillMount = function () {};
	Component.prototype.componentDidMount = function () {};
	
	Component.prototype.componentWillReceiveProps = function () {};
	Component.prototype.componentWillUpdate = function () {};
	Component.prototype.componentDidUpdate = function () {};
	
	Component.prototype.componentWillUnmount = function () {};
	
	Component.prototype.updateProps = function (props) {
	    this.componentWillUpdate(props);
	    //var oldProps = this.props;
	    this.props = props;
	    var newNode = new _node.VComponent(this.constructor, null, [this.render()], null);
	    (0, _update.updateChildren)(this.node, newNode);
	    this.node.children = newNode.children;
	    //todo:componentDidUpdate(object prevProps, object prevState)
	    this.componentDidUpdate(this.props);
	};
	
	Component.prototype.forceUpdate = function () {
	    this.updateProps(this.props);
	};
	
	function updateComponent(old, vdom) {
	    vdom.component = old.component;
	    var props = vdom.attrs || {};
	    props.children = vdom.children;
	    vdom.component.componentWillReceiveProps(props);
	    vdom.component.updateProps(props);
	}
	
	function createComponent(vdom) {
	    var props = vdom.attrs || {};
	    props.children = vdom.children;
	    vdom.component = new vdom.tag(props);
	    vdom.component.componentWillMount();
	    vdom.children = [vdom.component.render()];
	    vdom.component.node = vdom;
	    _utils.DEBUG && console.log(vdom);
	}
	
	function destroyComponent(vdom) {
	    vdom.component.componentWillUnmount();
	}
	
	function mountComponent(vdom) {
	    vdom.component.componentDidMount();
	}

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	exports.update = update;
	exports.updateChildren = updateChildren;
	exports.remove = remove;
	
	var _attrs = __webpack_require__(4);
	
	var _component = __webpack_require__(7);
	
	var _utils = __webpack_require__(5);
	
	var _create = __webpack_require__(3);
	
	function update(old, vdom) {
	    _utils.DEBUG && console.log('update', vdom);
	
	    var dom = old.dom;
	    dom.updated = true;
	    vdom.dom = dom;
	    //vdom.parent = old.parent;
	    if (old.tag !== vdom.tag) {
	        replaceNode(old, vdom);
	        return;
	    }
	    if (old.tag == '#') {
	        if (old.text !== vdom.text) {
	            dom.textContent = vdom.text;
	        }
	        old.destroy();
	        return;
	    }
	    if (old.text !== vdom.text) {
	        dom.textContent = vdom.text;
	    }
	
	    if (vdom.fragment) {
	        if (vdom.key !== old.key) {
	            replaceNode(old, vdom);
	            return;
	        }
	    } else {
	        vdom.allAttrs = '';
	        if (vdom.attrs && old.attrs) {
	            forAttrs(old, vdom);
	        }
	        if (old.attrs && !vdom.attrs || !old.attrs && vdom.attrs || old.allAttrs !== vdom.allAttrs) {
	            replaceNode(old, vdom);
	            return;
	        }
	    }
	    if (old.component) {
	        (0, _component.updateComponent)(old, vdom);
	        return;
	    }
	
	    if (!vdom.text) {
	        if (updateChildren(old, vdom)) {
	            old.destroy();
	        }
	        return;
	    }
	    old.destroy();
	}
	
	function updateChildren(old, vdom) {
	    var oldLen = old.children ? old.children.length : 0;
	    var newLen = vdom.children ? vdom.children.length : 0;
	    if (oldLen && newLen && vdom.isMap && old.isMap) {
	        mapChildren(old, vdom, (0, _utils.getFirstChild)(old));
	        return;
	    }
	
	    if (oldLen > 0) {
	        if (oldLen === newLen) {
	            for (var i = 0; i < newLen; i++) {
	                (0, _utils.normChild)(vdom, i);
	                update(old.children[i], vdom.children[i]);
	                //clearChild(old, i);
	            }
	        } else {
	            for (i = 0; i < newLen; i++) {
	                (0, _utils.normChild)(vdom, i);
	                var newChild = vdom.children[i];
	                (0, _create.create)(newChild, vdom.dom);
	                insert(old.dom, newChild, (0, _utils.getFirstChild)(old));
	            }
	            for (i = 0; i < oldLen; i++) {
	                remove(old.children[i]);
	                //clearChild(old, i)
	            }
	        }
	    } else if (newLen > 0) {
	        replaceNode(old, vdom);
	        return;
	    }
	    return true;
	}
	
	function mapChildren(old, vdom, beforeChild) {
	    var parentDom = old.dom;
	    var keyMap = old.keyMap;
	    var newKeyMap = vdom.keyMap;
	    var newChildren = vdom.children;
	    var newLen = newChildren.length;
	    var oldLen = old.children.length;
	    var found = 0;
	    for (var i = 0; i < newLen; i++) {
	        (0, _utils.normChild)(vdom, i);
	        var newChild = newChildren[i];
	        var oldChild = old.children[i];
	        var newKey = newChild.key;
	        if (newKey == null) {
	            console.warn('map without keys', vdom);
	            replaceNode(old, vdom);
	            return;
	        }
	        var keyChild = old.children[keyMap[newKey]];
	        if (keyChild) {
	            found++;
	            if (keyChild !== oldChild) {
	                insert(parentDom, keyChild, beforeChild);
	            }
	            update(keyChild, newChild);
	            if (keyChild == oldChild) {
	                clearChild(old, i);
	            }
	            keyMap[newKey] = null;
	        } else {
	            (0, _create.create)(newChild, vdom.dom);
	            insert(parentDom, newChild, beforeChild);
	        }
	        beforeChild = newChild.dom.nextSibling;
	        newKeyMap[newKey] = i;
	    }
	    //old.keyMap = null;
	
	    if (found !== oldLen) {
	        for (i = 0; i < oldLen; i++) {
	            var child = old.children[i];
	            if (child && newKeyMap[child.key] == null) {
	                remove(child);
	                clearChild(old, i);
	            }
	        }
	    }
	}
	
	function replaceNode(old, vdom) {
	    var parentDom = old.fragment ? old.dom : old.dom.parentNode;
	    (0, _create.create)(vdom, parentDom);
	    insert(parentDom, vdom, old.fragment ? (0, _utils.getFirstChild)(old) : old);
	    remove(old);
	    return vdom;
	}
	
	function forAttrs(old, vdom) {
	    var attr;
	    var isNotSame;
	    var dom = vdom.dom;
	    for (var attrName in vdom.attrs) {
	        vdom.allAttrs += attrName;
	        var attrVal = vdom.attrs[attrName];
	        if (attrName == 'key') {} else if ((isNotSame = vdom.attrs[attrName] !== old.attrs[attrName]) && (attr = _attrs.props[attrName])) {
	            dom[attr] = attrVal;
	        } else if ((attr = _attrs.attrs[attrName]) && isNotSame) {
	            if (attrVal === false) {
	                dom.removeAttribute(attr);
	            } else {
	                dom.setAttribute(attr, attrVal);
	            }
	        } else if (attr = _attrs.events[attrName] && isNotSame) {
	            dom['on' + attr] = attrVal;
	        } else if (attrName[0] === 'o' && attrName[1] === 'n' && isNotSame) {
	            attr = attrName.substring(2).toLowerCase();
	            dom['on' + attr] = attrVal;
	        } else if (attrName[0] === 'd' && attrName[1] === 'a' && attrName[2] === 't' && attrName[3] === 'a' && isNotSame) {
	            if (attrVal === false) {
	                dom.removeAttribute(attrName);
	            } else {
	                dom.setAttribute(attrName, attrVal);
	            }
	        }
	        /*
	         else if (attrName === 'ref' && typeof attrVal == 'function') {
	         //debugger;
	         attrVal(vdom);
	         }
	         */
	    }
	}
	
	function insert(parentDom, vdom, before) {
	    if (vdom.fragment) {
	        for (var i = 0; i < vdom.children.length; i++) {
	            insert(vdom.dom, vdom.children[i], before);
	        }
	        return;
	    }
	    _utils.DEBUG && console.log('Insert', vdom);
	    parentDom.insertBefore(vdom.dom, before && before.dom);
	}
	
	function clearChild(old, i) {}
	
	function remove(old) {
	    _utils.DEBUG && console.log('remove', old);
	
	    if (old.component) {
	        (0, _component.destroyComponent)(old);
	    }
	    if (old.children) {
	        for (var i = 0; i < old.children.length; i++) {
	            remove(old.children[i]);
	            clearChild(old, i);
	        }
	    }
	    if (!old.fragment) {
	        old.dom.parentNode.removeChild(old.dom);
	    }
	    old.destroy();
	}
	
	//old.children[i] = null;

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMGQ3NzllODZiZmYxYWUyMjQxMjgiLCJ3ZWJwYWNrOi8vLy4vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Zhc3QtcmVhY3QuanM/N2RjOSIsIndlYnBhY2s6Ly8vLi9zcmMvZmFzdC1yZWFjdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY3JlYXRlLmpzIiwid2VicGFjazovLy8uL3NyYy9hdHRycy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL25vZGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXBkYXRlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7QUN0Q0EsT0FBTSxDQUFDLE9BQU8sR0FBRyxtQkFBTyxDQUFDLENBQXNDLENBQUMsQzs7Ozs7O0FDQWhFLDJHQUFrSyxFOzs7Ozs7Ozs7Ozs7O21DQ0F4RyxDQUFVOzs7OztvQkFBM0QsTUFBTTs7Ozs7O29CQUFFLGFBQWE7Ozs7OztvQkFBRSxrQkFBa0I7Ozs7c0NBQ1gsQ0FBYTs7Ozs7dUJBQTNDLFNBQVM7Ozs7Ozt1QkFBRSxXQUFXOzs7O21DQUNSLENBQVU7Ozs7O29CQUF4QixNQUFNOzs7Ozs7Ozs7Ozs7O1NDR0MsTUFBTSxHQUFOLE1BQU07U0FRTixNQUFNLEdBQU4sTUFBTTtTQXdGTixrQkFBa0IsR0FBbEIsa0JBQWtCO1NBZ0JsQixhQUFhLEdBQWIsYUFBYTs7a0NBckhNLENBQVM7O2tDQUNiLENBQVM7O2lDQUNVLENBQVE7O3NDQUNaLENB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QUMsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUUzQjs7QUFFTSxVQUFTLE1BQU0sQ0FBQyxHQUFHLEVBQUU7QUFDeEIsWUFwTjhCLEtBQUssSUFvTjFCLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDOztBQUVwQyxTQUFJLEdBQUcsQ0FBQyxTQUFTLEVBQUU7QUFDZix3QkF4TmlCLGdCQUFnQixFQXdOaEIsR0FBRyxDQUFDLENBQUM7TUFDekI7QUFDRCxTQUFJLEdBQUcsQ0FBQyxRQUFRLEVBQUU7QUFDZCxjQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDMUMsbUJBQU0sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDeEIsdUJBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7VUFDdEI7TUFDSjtBQUNELFNBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFO0FBQ2YsWUFBRyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztNQUMzQztBQUNELFFBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztFQUNqQiIsImZpbGUiOiJmYXN0LXJlYWN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCAwZDc3OWU4NmJmZjFhZTIyNDEyOFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImV4cG9zZT9GYXN0UmVhY3QhLi9zcmMvZmFzdC1yZWFjdC5qc1wiKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vaW5kZXguanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGdsb2JhbFtcIkZhc3RSZWFjdFwiXSA9IHJlcXVpcmUoXCItIS9Vc2Vycy9jb2R5L2Rldi9iZXRwdWIvZnJvbnRlbmQvZGRkL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvaW5kZXguanM/e1xcXCJzdGFnZVxcXCI6MCxcXFwibG9vc2VcXFwiOltcXFwiZXM2LmNsYXNzZXNcXFwiXX0hL1VzZXJzL2NvZHkvZGV2L2JldHB1Yi9mcm9udGVuZC9kZGQvc3JjL2Zhc3QtcmVhY3QuanNcIik7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vZXhwb3NlLWxvYWRlcj9GYXN0UmVhY3QhLi9zcmMvZmFzdC1yZWFjdC5qc1xuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImV4cG9ydCB7IHJlbmRlciwgY3JlYXRlRWxlbWVudCwgY3JlYXRlRWxlbWVudEFycmF5IH0gZnJvbSAnLi9jcmVhdGUnO1xuZXhwb3J0IHsgQ29tcG9uZW50LCBmaW5kRE9NTm9kZSB9IGZyb20gJy4vY29tcG9uZW50JztcbmV4cG9ydCB7IHVwZGF0ZSB9IGZyb20gJy4vdXBkYXRlJztcblxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvZmFzdC1yZWFjdC5qc1xuICoqLyIsImltcG9ydCB7YXR0cnMsIHByb3BzLCBldmVudHN9IGZyb20gJy4vYXR0cnMnO1xuaW1wb3J0IHtERUJVRywgbm9ybUNoaWxkfSBmcm9tICcuL3V0aWxzJztcbmltcG9ydCB7VkZyYWdtZW50Tm9kZSwgVkNvbXBvbmVudCwgZ2V0Tk5vZGV9IGZyb20gJy4vbm9kZSc7XG5pbXBvcnQge2NyZWF0ZUNvbXBvbmVudCwgbW91bnRDb21wb25lbnR9IGZyb20gJy4vY29tcG9uZW50JztcblxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlcih2ZG9tLCBkb20pIHtcbiAgICBkb20uYXBwZW5kQ2hpbGQoY3JlYXRlKHZkb20sIGRvbSkpO1xuICAgIGlmICh2ZG9tLmNvbXBvbmVudCkge1xuICAgICAgICBtb3VudENvbXBvbmVudCh2ZG9tKTtcbiAgICB9XG4gICAgcmV0dXJuIHZkb207XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGUodmRvbSwgcGFyZW50RG9tKSB7XG4gICAgREVCVUcgJiYgY29uc29sZS5sb2coXCJDcmVhdGVcIiwgdmRvbSk7XG4gICAgLy92ZG9tLnBhcmVudCA9IHBhcmVudDtcbiAgICBpZiAodmRvbS50YWcgPT0gJyMnKSB7XG4gICAgICAgIHZkb20uZG9tID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodmRvbS50ZXh0KTtcbiAgICAgICAgLy92ZG9tLmRvbS52aXJ0dWFsID0gdmRvbTtcbiAgICAgICAgcmV0dXJuIHZkb20uZG9tO1xuICAgIH1cbiAgICB2YXIgZG9tO1xuICAgIGlmICh2ZG9tLmZyYWdtZW50KSB7XG4gICAgICAgIGlmICh0eXBlb2YgdmRvbS50YWcgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNyZWF0ZUNvbXBvbmVudCh2ZG9tKTtcbiAgICAgICAgfVxuICAgICAgICBkb20gPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gICAgICAgIHZkb20uZG9tID0gcGFyZW50RG9tO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgZG9tID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh2ZG9tLnRhZyk7XG4gICAgICAgIHZkb20uZG9tID0gZG9tO1xuICAgICAgICAvL2RvbS52aXJ0dWFsID0gdmRvbTtcbiAgICB9XG5cbiAgICBpZiAodmRvbS5jaGlsZHJlbikge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHZkb20uY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIG5vcm1DaGlsZCh2ZG9tLCBpKTtcbiAgICAgICAgICAgIHZhciBjaGlsZCA9IHZkb20uY2hpbGRyZW5baV07XG4gICAgICAgICAgICBpZiAodmRvbS50YWcgPT09ICdtYXAnICYmIGNoaWxkLmF0dHJzKSB7XG4gICAgICAgICAgICAgICAgdmRvbS5rZXlNYXBbY2hpbGQua2V5XSA9IGk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkb20uYXBwZW5kQ2hpbGQoY3JlYXRlKGNoaWxkLCB2ZG9tLmRvbSkpO1xuICAgICAgICAgICAgaWYgKGNoaWxkLmNvbXBvbmVudCkge1xuICAgICAgICAgICAgICAgIG1vdW50Q29tcG9uZW50KGNoaWxkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmICh2ZG9tLnRleHQpIHtcbiAgICAgICAgZG9tLnRleHRDb250ZW50ID0gdmRvbS50ZXh0O1xuICAgIH1cbiAgICB2ZG9tLmFsbEF0dHJzID0gJyc7XG4gICAgaWYgKHZkb20uYXR0cnMgJiYgIXZkb20uZnJhZ21lbnQpIHtcbiAgICAgICAgaWYgKHZkb20uYXR0cnMucmVmKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHZkb20uYXR0cnMucmVmID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgdmRvbS5hdHRycy5yZWYodmRvbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL3RvZG86XG4gICAgICAgICAgICAvKlxuICAgICAgICAgICAgIGVsc2UgaWYgKGN1cnJlbnRDb21wb25lbnQpIHtcbiAgICAgICAgICAgICBjdXJyZW50Q29tcG9uZW50LnJlZnMgPSBjdXJyZW50Q29tcG9uZW50LnJlZnMgfHwge307XG4gICAgICAgICAgICAgY3VycmVudENvbXBvbmVudC5yZWZzW3Zkb20uYXR0cnMucmVmXSA9IHZkb207XG4gICAgICAgICAgICAgfVxuICAgICAgICAgICAgICovXG4gICAgICAgIH1cblxuICAgICAgICB2YXIgYXR0cjtcbiAgICAgICAgdmFyIHByb3A7XG4gICAgICAgIHZhciBldmVudDtcbiAgICAgICAgZm9yICh2YXIgYXR0ck5hbWUgaW4gdmRvbS5hdHRycykge1xuICAgICAgICAgICAgdmRvbS5hbGxBdHRycyArPSBhdHRyTmFtZTtcbiAgICAgICAgICAgIHZhciBhdHRyVmFsID0gdmRvbS5hdHRyc1thdHRyTmFtZV07XG4gICAgICAgICAgICBpZiAoKHByb3AgPSBwcm9wc1thdHRyTmFtZV0pICYmIGF0dHJWYWwgIT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgZG9tW3Byb3BdID0gYXR0clZhbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKChhdHRyID0gYXR0cnNbYXR0ck5hbWVdKSAmJiBhdHRyVmFsICE9PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIGRvbS5zZXRBdHRyaWJ1dGUoYXR0ciwgYXR0clZhbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChldmVudCA9IGV2ZW50c1thdHRyTmFtZV0pIHtcbiAgICAgICAgICAgICAgICAvL2RvbS5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBldmVudEhhbmRsZXIoYXR0clZhbCkpO1xuICAgICAgICAgICAgICAgIGRvbVsnb24nICsgZXZlbnRdID0gYXR0clZhbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGF0dHJOYW1lWzBdID09PSAnbycgJiYgYXR0ck5hbWVbMV0gPT09ICduJykge1xuICAgICAgICAgICAgICAgIGV2ZW50ID0gYXR0ck5hbWUuc3Vic3RyaW5nKDIpLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgZG9tWydvbicgKyBldmVudF0gPSBhdHRyVmFsO1xuICAgICAgICAgICAgICAgIC8vZG9tLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGV2ZW50SGFuZGxlcihhdHRyVmFsKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChhdHRyTmFtZVswXSA9PT0gJ2QnICYmIGF0dHJOYW1lWzFdID09PSAnYScgJiYgYXR0ck5hbWVbMl0gPT09ICd0JyAmJiBhdHRyTmFtZVszXSA9PT0gJ2EnICYmIGF0dHJWYWwgIT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgZG9tLnNldEF0dHJpYnV0ZShhdHRyTmFtZSwgYXR0clZhbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvKlxuICAgICAgICAgICAgIGVsc2UgaWYgKGtleSA9PT0gJ3N0eWxlJykge1xuICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAqL1xuXG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGRvbTtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRWxlbWVudEFycmF5KHRhZywgYXR0cnMsIGNoaWxkcmVuKSB7XG4gICAgdmFyIGlzRnJhZ21lbnQgPSB0YWcgPT0gJ0AnIHx8IHR5cGVvZiB0YWcgPT0gJ2Z1bmN0aW9uJztcbi8vICAgICAgICB2YXIgdGV4dCA9IChjaGlsZHJlbiAmJiAhaXNGcmFnbWVudCAmJiAodHlwZW9mIGNoaWxkcmVuWzBdID09ICdzdHJpbmcnIHx8IHR5cGVvZiBjaGlsZHJlblswXSA9PSAnbnVtYmVyJykpID8gY2hpbGRyZW5bMF0gKyAnJyA6IG51bGw7XG4gICAgaWYgKGlzRnJhZ21lbnQpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB0YWcgPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBWQ29tcG9uZW50KHRhZywgYXR0cnMsIGNoaWxkcmVuLCBhdHRycyA/IGF0dHJzLmtleSA6IG51bGwpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBWRnJhZ21lbnROb2RlKHRhZywgYXR0cnMsIGNoaWxkcmVuLCBhdHRycyA/IGF0dHJzLmtleSA6IG51bGwpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gZ2V0Tk5vZGUodGFnLCBhdHRycywgY2hpbGRyZW4sIGF0dHJzID8gYXR0cnMua2V5IDogbnVsbCwgbnVsbCk7XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRWxlbWVudCh0YWcsIGF0dHJzKSB7XG4gICAgdmFyIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgdmFyIGlzRnJhZ21lbnQgPSB0YWcgPT0gJ0AnIHx8IHR5cGVvZiB0YWcgPT0gJ2Z1bmN0aW9uJztcbiAgICB2YXIgdGV4dCA9IChsZW4gPT0gMyAmJiAhaXNGcmFnbWVudCAmJiAodHlwZW9mIGFyZ3VtZW50c1syXSA9PSAnc3RyaW5nJyB8fCB0eXBlb2YgYXJndW1lbnRzWzJdID09ICdudW1iZXInKSkgPyBhcmd1bWVudHNbMl0gKyAnJyA6IG51bGw7XG4gICAgdmFyIGNoaWxkcmVuID0gbnVsbDtcbiAgICBpZiAoIXRleHQgJiYgbGVuID4gMikge1xuICAgICAgICBjaGlsZHJlbiA9IEFycmF5KGxlbiAtIDIpO1xuICAgICAgICBmb3IgKHZhciBpID0gMjsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICBjaGlsZHJlbltpIC0gMl0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoaXNGcmFnbWVudCkge1xuICAgICAgICBpZiAodHlwZW9mIHRhZyA9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFZDb21wb25lbnQodGFnLCBhdHRycywgY2hpbGRyZW4sIGF0dHJzID8gYXR0cnMua2V5IDogbnVsbCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFZGcmFnbWVudE5vZGUodGFnLCBhdHRycywgY2hpbGRyZW4sIGF0dHJzID8gYXR0cnMua2V5IDogbnVsbCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBnZXROTm9kZSh0YWcsIGF0dHJzLCBjaGlsZHJlbiwgYXR0cnMgPyBhdHRycy5rZXkgOiBudWxsLCB0ZXh0KTtcbiAgICB9XG59XG5cblxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvY3JlYXRlLmpzXG4gKiovIiwiZXhwb3J0IGxldCBhdHRycyA9IHtcbiAgICBhY2NlcHQ6ICdhY2NlcHQnLFxuICAgIGFjY2VwdENoYXJzZXQ6ICdhY2NlcHQtY2hhcnNldCcsXG4gICAgYWNjZXNzS2V5OiAnYWNjZXNzS2V5JyxcbiAgICBhY3Rpb246ICdhY3Rpb24nLFxuICAgIGFsbG93RnVsbFNjcmVlbjogJ2FsbG93RnVsbFNjcmVlbicsXG4gICAgYWxsb3dUcmFuc3BhcmVuY3k6ICdhbGxvd1RyYW5zcGFyZW5jeScsXG4gICAgYWx0OiAnYWx0JyxcbiAgICBhc3luYzogJ2FzeW5jJyxcbiAgICBhdXRvQ29tcGxldGU6ICdhdXRvQ29tcGxldGUnLFxuICAgIGF1dG9QbGF5OiAnYXV0b1BsYXknLFxuICAgIGNhcHR1cmU6ICdjYXB0dXJlJyxcbiAgICBjZWxsUGFkZGluZzogJ2NlbGxQYWRkaW5nJyxcbiAgICBjZWxsU3BhY2luZzogJ2NlbGxTcGFjaW5nJyxcbiAgICBjaGFyU2V0OiAnY2hhclNldCcsXG4gICAgY2hhbGxlbmdlOiAnY2hhbGxlbmdlJyxcbiAgICBjbGFzc0lEOiAnY2xhc3NJRCcsXG4gICAgY29sczogJ2NvbHMnLFxuICAgIGNvbFNwYW46ICdjb2xTcGFuJyxcbiAgICBjb250ZW50OiAnY29udGVudCcsXG4gICAgY29udGVudEVkaXRhYmxlOiAnY29udGVudEVkaXRhYmxlJyxcbiAgICBjb250ZXh0TWVudTogJ2NvbnRleHRNZW51JyxcbiAgICBjb29yZHM6ICdjb29yZHMnLFxuICAgIGNyb3NzT3JpZ2luOiAnY3Jvc3NPcmlnaW4nLFxuICAgIGRhdGE6ICdkYXRhJyxcbiAgICBkYXRlVGltZTogJ2RhdGVUaW1lJyxcbiAgICBkZWZlcjogJ2RlZmVyJyxcbiAgICBkaXI6ICdkaXInLFxuICAgIGRpc2FibGVkOiAnZGlzYWJsZWQnLFxuICAgIGRvd25sb2FkOiAnZG93bmxvYWQnLFxuICAgIGRyYWdnYWJsZTogJ2RyYWdnYWJsZScsXG4gICAgZW5jVHlwZTogJ2VuY1R5cGUnLFxuICAgIGZvcm06ICdmb3JtJyxcbiAgICBmb3JtQWN0aW9uOiAnZm9ybUFjdGlvbicsXG4gICAgZm9ybUVuY1R5cGU6ICdmb3JtRW5jVHlwZScsXG4gICAgZm9ybU1ldGhvZDogJ2Zvcm1NZXRob2QnLFxuICAgIGZvcm1Ob1ZhbGlkYXRlOiAnZm9ybU5vVmFsaWRhdGUnLFxuICAgIGZvcm1UYXJnZXQ6ICdmb3JtVGFyZ2V0JyxcbiAgICBmcmFtZUJvcmRlcjogJ2ZyYW1lQm9yZGVyJyxcbiAgICBoZWFkZXJzOiAnaGVhZGVycycsXG4gICAgaGVpZ2h0OiAnaGVpZ2h0JyxcbiAgICBoaWRkZW46ICdoaWRkZW4nLFxuICAgIGhpZ2g6ICdoaWdoJyxcbiAgICBocmVmOiAnaHJlZicsXG4gICAgaHJlZkxhbmc6ICdocmVmTGFuZycsXG4gICAgaHRtbEZvcjogJ2ZvcicsXG4gICAgaHR0cEVxdWl2OiAnaHR0cC1lcXVpdicsXG4gICAgaWNvbjogJ2ljb24nLFxuICAgIGlucHV0TW9kZTogJ2lucHV0TW9kZScsXG4gICAgaXM6ICdpcycsXG4gICAga2V5UGFyYW1zOiAna2V5UGFyYW1zJyxcbiAgICBrZXlUeXBlOiAna2V5VHlwZScsXG4gICAgbGFiZWw6ICdsYWJlbCcsXG4gICAgbGFuZzogJ2xhbmcnLFxuICAgIGxpc3Q6ICdsaXN0JyxcbiAgICBsb3c6ICdsb3cnLFxuICAgIG1hbmlmZXN0OiAnbWFuaWZlc3QnLFxuICAgIG1hcmdpbkhlaWdodDogJ21hcmdpbkhlaWdodCcsXG4gICAgbWFyZ2luV2lkdGg6ICdtYXJnaW5XaWR0aCcsXG4gICAgbWF4OiAnbWF4JyxcbiAgICBtYXhMZW5ndGg6ICdtYXhMZW5ndGgnLFxuICAgIG1lZGlhOiAnbWVkaWEnLFxuICAgIG1lZGlhR3JvdXA6ICdtZWRpYUdyb3VwJyxcbiAgICBtZXRob2Q6ICdtZXRob2QnLFxuICAgIG1pbjogJ21pbicsXG4gICAgbWluTGVuZ3RoOiAnbWluTGVuZ3RoJyxcbiAgICBuYW1lOiAnbmFtZScsXG4gICAgbm9WYWxpZGF0ZTogJ25vVmFsaWRhdGUnLFxuICAgIG9wZW46ICdvcGVuJyxcbiAgICBvcHRpbXVtOiAnb3B0aW11bScsXG4gICAgcGF0dGVybjogJ3BhdHRlcm4nLFxuICAgIHBsYWNlaG9sZGVyOiAncGxhY2Vob2xkZXInLFxuICAgIHBvc3RlcjogJ3Bvc3RlcicsXG4gICAgcHJlbG9hZDogJ3ByZWxvYWQnLFxuICAgIHJhZGlvR3JvdXA6ICdyYWRpb0dyb3VwJyxcbiAgICByZWw6ICdyZWwnLFxuICAgIHJlcXVpcmVkOiAncmVxdWlyZWQnLFxuICAgIHJvbGU6ICdyb2xlJyxcbiAgICByb3dzOiAncm93cycsXG4gICAgcm93U3BhbjogJ3Jvd1NwYW4nLFxuICAgIHNhbmRib3g6ICdzYW5kYm94JyxcbiAgICBzY29wZTogJ3Njb3BlJyxcbiAgICBzY29wZWQ6ICdzY29wZWQnLFxuICAgIHNjcm9sbGluZzogJ3Njcm9sbGluZycsXG4gICAgc2VhbWxlc3M6ICdzZWFtbGVzcycsXG4gICAgc2hhcGU6ICdzaGFwZScsXG4gICAgc2l6ZTogJ3NpemUnLFxuICAgIHNpemVzOiAnc2l6ZXMnLFxuICAgIHNwYW46ICdzcGFuJyxcbiAgICBzcGVsbENoZWNrOiAnc3BlbGxDaGVjaycsXG4gICAgc3JjOiAnc3JjJyxcbiAgICBzcmNTZXQ6ICdzcmNTZXQnLFxuICAgIHN0YXJ0OiAnc3RhcnQnLFxuICAgIHN0ZXA6ICdzdGVwJyxcbiAgICBzdHlsZTogJ3N0eWxlJyxcbiAgICB0YWJJbmRleDogJ3RhYkluZGV4JyxcbiAgICB0YXJnZXQ6ICd0YXJnZXQnLFxuICAgIHRpdGxlOiAndGl0bGUnLFxuICAgIHR5cGU6ICd0eXBlJyxcbiAgICB1c2VNYXA6ICd1c2VNYXAnLFxuICAgIHdpZHRoOiAnd2lkdGgnLFxuICAgIHdtb2RlOiAnd21vZGUnLFxuICAgIGF1dG9DYXBpdGFsaXplOiAnYXV0b0NhcGl0YWxpemUnLFxuICAgIGF1dG9Db3JyZWN0OiAnYXV0b0NvcnJlY3QnLFxuICAgIGl0ZW1Qcm9wOiAnaXRlbVByb3AnLFxuICAgIGl0ZW1TY29wZTogJ2l0ZW1TY29wZScsXG4gICAgaXRlbVR5cGU6ICdpdGVtVHlwZScsXG4gICAgaXRlbUlEOiAnaXRlbUlEJyxcbiAgICBpdGVtUmVmOiAnaXRlbVJlZicsXG4gICAgcHJvcGVydHk6ICdwcm9wZXJ0eScsXG4gICAgc2VjdXJpdHk6ICdzZWN1cml0eScsXG4gICAgdW5zZWxlY3RhYmxlOiAndW5zZWxlY3RhYmxlJyxcbn07XG5cbmV4cG9ydCBsZXQgcHJvcHMgPSB7XG4gICAgY2hlY2tlZDogJ2NoZWNrZWQnLFxuICAgIGNsYXNzTmFtZTogJ2NsYXNzTmFtZScsXG4gICAgY29udHJvbHM6ICdjb250cm9scycsXG4gICAgaWQ6ICdpZCcsXG4gICAgbG9vcDogJ2xvb3AnLFxuICAgIG11bHRpcGxlOiAnbXVsdGlwbGUnLFxuICAgIG11dGVkOiAnbXV0ZWQnLFxuICAgIHJlYWRPbmx5OiAncmVhZE9ubHknLFxuICAgIHNlbGVjdGVkOiAnc2VsZWN0ZWQnLFxuICAgIHNyY0RvYzogJ3NyY2RvYycsXG4gICAgdmFsdWU6ICd2YWx1ZSdcbn07XG5cbmV4cG9ydCBsZXQgbm90UHggPSB7XG4gICAgYm94RmxleDogdHJ1ZSxcbiAgICBib3hGbGV4R3JvdXA6IHRydWUsXG4gICAgY29sdW1uQ291bnQ6IHRydWUsXG4gICAgZmlsbE9wYWNpdHk6IHRydWUsXG4gICAgZmxleDogdHJ1ZSxcbiAgICBmbGV4R3JvdzogdHJ1ZSxcbiAgICBmbGV4UG9zaXRpdmU6IHRydWUsXG4gICAgZmxleFNocmluazogdHJ1ZSxcbiAgICBmbGV4TmVnYXRpdmU6IHRydWUsXG4gICAgZm9udFdlaWdodDogdHJ1ZSxcbiAgICBsaW5lQ2xhbXA6IHRydWUsXG4gICAgbGluZUhlaWdodDogdHJ1ZSxcbiAgICBvcGFjaXR5OiB0cnVlLFxuICAgIG9yZGVyOiB0cnVlLFxuICAgIG9ycGhhbnM6IHRydWUsXG4gICAgc3Ryb2tlT3BhY2l0eTogdHJ1ZSxcbiAgICB3aWRvd3M6IHRydWUsXG4gICAgekluZGV4OiB0cnVlLFxuICAgIHpvb206IHRydWVcbn07XG5cbmV4cG9ydCBsZXQgZXZlbnRzID0ge1xuICAgIG9uUmVuZGVyOiBcInJlbmRlclwiLFxuICAgIG9uQ2xpY2s6ICgoJ29udG91Y2hlbmQnIGluIHdpbmRvdykpID8gJ3RvdWNoZW5kJyA6ICdjbGljaycsXG4gICAgb25EYmxDbGljazogJ2RibGNsaWNrJyxcblxuICAgIG9uTW91c2VEb3duOiAnbW91c2Vkb3duJyxcbiAgICBvbk1vdXNlVXA6ICdtb3VzZXVwJyxcbiAgICBvbk1vdXNlTW92ZTogJ21vdXNlbW92ZScsXG4gICAgb25Nb3VzZUVudGVyOiAnbW91c2VlbnRlcicsXG4gICAgb25Nb3VzZUxlYXZlOiAnbW91c2VsZWF2ZScsXG4gICAgb25Nb3VzZU92ZXI6ICdtb3VzZW92ZXInLFxuICAgIG9uTW91c2VPdXQ6ICdtb3VzZW91dCcsXG5cbiAgICBvblRvdWNoU3RhcnQ6ICd0b3VjaHN0YXJ0JyxcbiAgICBvblRvdWNoRW5kOiAndG91Y2hlbmQnLFxuICAgIG9uVG91Y2hNb3ZlOiAndG91Y2htb3ZlJyxcbiAgICBvblRvdWNoQ2FuY2VsOiAndG91Y2hjYW5jZWwnLFxuICAgIG9uVG91Y2hMZWF2ZTogJ3RvdWNobGVhdmUnLFxuXG4gICAgb25Db250ZXh0TWVudTogJ2NvbnRleHRtZW51JyxcblxuICAgIG9uSW5wdXQ6ICdpbnB1dCcsXG4gICAgb25Gb2N1czogJ2ZvY3VzJyxcbiAgICBvbkNoYW5nZTogJ2NoYW5nZScsXG5cbiAgICBvbktleURvd246ICdrZXlkb3duJyxcbiAgICBvbktleVByZXNzOiAna2V5cHJlc3MnLFxuICAgIG9uS2V5VXA6ICdrZXl1cCdcbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9hdHRycy5qc1xuICoqLyIsImltcG9ydCB7Z2V0VGV4dE5vZGUsIFZGcmFnbWVudE5vZGV9IGZyb20gJy4vbm9kZSc7XG5cbmV4cG9ydCBsZXQgREVCVUcgPSBmYWxzZTtcbmV4cG9ydCBmdW5jdGlvbiBub3JtQ2hpbGQodmRvbSwgaSkge1xuICAgIGlmICh2ZG9tLmNoaWxkcmVuW2ldICYmIHR5cGVvZiB2ZG9tLmNoaWxkcmVuW2ldID09ICdvYmplY3QnICYmIHZkb20uY2hpbGRyZW5baV0udGFnKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIGNoaWxkID0gdmRvbS5jaGlsZHJlbltpXTtcbiAgICBpZiAodHlwZW9mIGNoaWxkID09ICdzdHJpbmcnIHx8IHR5cGVvZiBjaGlsZCA9PSAnbnVtYmVyJykge1xuICAgICAgICB2ZG9tLmNoaWxkcmVuW2ldID0gZ2V0VGV4dE5vZGUoY2hpbGQpO1xuICAgIH1cbiAgICBlbHNlIGlmIChjaGlsZCA9PSBudWxsKSB7XG4gICAgICAgIHZkb20uY2hpbGRyZW5baV0gPSBnZXRUZXh0Tm9kZSgnJyk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiBjaGlsZCA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgaWYgKGNoaWxkIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgIHZkb20uY2hpbGRyZW5baV0gPSBuZXcgVkZyYWdtZW50Tm9kZSgnbWFwJywgbnVsbCwgY2hpbGQsIG51bGwpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdmRvbS5jaGlsZHJlbltpXSA9IGdldFRleHROb2RlKEpTT04uc3RyaW5naWZ5KGNoaWxkKSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGNoaWxkID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHZkb20uY2hpbGRyZW5baV0gPSBnZXRUZXh0Tm9kZSgnRnVuY3Rpb24nKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHZkb20uY2hpbGRyZW5baV0gPSBnZXRUZXh0Tm9kZSgnJyk7XG4gICAgfVxuICAgIC8vcmV0dXJuIHZkb20uY2hpbGRyZW5baV07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRGaXJzdENoaWxkKG9sZCkge1xuICAgIHZhciBiZWZvcmVDaGlsZCA9IG9sZC5jaGlsZHJlblswXTtcbiAgICB3aGlsZSAoYmVmb3JlQ2hpbGQgJiYgYmVmb3JlQ2hpbGQuZnJhZ21lbnQpIHtcbiAgICAgICAgYmVmb3JlQ2hpbGQgPSBiZWZvcmVDaGlsZC5jaGlsZHJlblswXTtcbiAgICB9XG4gICAgcmV0dXJuIGJlZm9yZUNoaWxkO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdXRpbHMuanNcbiAqKi8iLCJ2YXIgaWQgPSAxO1xuXG52YXIgcHJvdG8gPSB7XG4gICAgdGV4dDogbnVsbCxcbiAgICBkb206IG51bGwsXG4gICAgdGFnOiBudWxsLFxuICAgIGF0dHJzOiBudWxsLFxuICAgIGNoaWxkcmVuOiBudWxsLFxuICAgIGFsbEF0dHJzOiBudWxsLFxuICAgIGZyYWdtZW50OiBmYWxzZSxcbiAgICBjb21wb25lbnQ6IG51bGwsXG4gICAga2V5OiBudWxsLFxuICAgIGtleU1hcDogbnVsbCxcbiAgICB2bm9kZTogdHJ1ZSxcbiAgICBpc01hcDogZmFsc2UsXG4gICAgZGVzdHJveWVkOiBudWxsLFxuICAgIGRlc3Ryb3k6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5kb20gPSBudWxsO1xuICAgICAgICB0aGlzLmNoaWxkcmVuID0gbnVsbDtcbiAgICAgICAgdGhpcy5hdHRycyA9IG51bGw7XG4gICAgICAgIC8vdGhpcy5kZXN0cm95ZWQgPSB0cnVlO1xuICAgICAgICAvL3RoaXMucGFyZW50ID0gbnVsbDtcbiAgICB9XG59O1xuXG5mdW5jdGlvbiBjbGFzc0V4dGVuZChDbGFzcywgcHJvdG8sIG92ZXJyaWRlcykge1xuICAgIGZvciAodmFyIHByb3AgaW4gcHJvdG8pIHtcbiAgICAgICAgQ2xhc3MucHJvdG90eXBlW3Byb3BdID0gcHJvdG9bcHJvcF07XG4gICAgfVxuICAgIGZvciAocHJvcCBpbiBvdmVycmlkZXMpIHtcbiAgICAgICAgQ2xhc3MucHJvdG90eXBlW3Byb3BdID0gb3ZlcnJpZGVzW3Byb3BdO1xuICAgIH1cbn1cblxuLy92YXIgY2FjaGVGcmFtZW50cyA9IFtdO1xuLy92YXIgY2FjaGVDb21wb25lbnQgPSBbXTtcbnZhciBjYWNoZU5vZGUgPSBbXTtcbnZhciBjYWNoZVRleHROb2RlID0gW107XG5cblxuZXhwb3J0IGZ1bmN0aW9uIFZGcmFnbWVudE5vZGUodGFnLCBhdHRycywgY2hpbGRyZW4sIGtleSkge1xuICAgIHRoaXMuaWQgPSBpZCsrO1xuICAgIHRoaXMudGFnID0gdGFnO1xuICAgIGlmICh0YWcgPT0gJ21hcCcpIHtcbiAgICAgICAgdGhpcy5rZXlNYXAgPSB7fTtcbiAgICAgICAgdGhpcy5pc01hcCA9IHRydWU7XG4gICAgfVxuICAgIHRoaXMuY2hpbGRyZW4gPSBjaGlsZHJlbjtcbiAgICBpZiAoa2V5KSB7XG4gICAgICAgIHRoaXMua2V5ID0ga2V5O1xuICAgIH1cbiAgICAvL3RoaXMucGFyZW50ID0gbnVsbDtcbiAgICB0aGlzLmRvbSA9IG51bGw7XG4gICAgdGhpcy5hdHRycyA9IGF0dHJzO1xufVxuY2xhc3NFeHRlbmQoVkZyYWdtZW50Tm9kZSwgcHJvdG8sIHtcbiAgICBmcmFnbWVudDogdHJ1ZSxcbiAgICBkZXN0cm95OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuZG9tID0gbnVsbDtcbiAgICAgICAgdGhpcy5jaGlsZHJlbiA9IG51bGw7XG4gICAgICAgIC8vdGhpcy5hdHRycyA9IG51bGw7XG4gICAgICAgIHRoaXMua2V5TWFwID0gbnVsbDtcbiAgICAgICAgLy90aGlzLmRlc3Ryb3llZCA9IHRydWU7XG4gICAgICAgIC8vdGhpcy5wYXJlbnQgPSBudWxsO1xuICAgIH1cbn0pO1xuXG5cbmV4cG9ydCBmdW5jdGlvbiBWQ29tcG9uZW50KHRhZywgYXR0cnMsIGNoaWxkcmVuLCBrZXkpIHtcbiAgICAvL29iamVjdHMucHVzaCh0aGlzKTtcbiAgICB0aGlzLmlkID0gaWQrKztcbiAgICB0aGlzLnRhZyA9IHRhZztcbiAgICB0aGlzLmNoaWxkcmVuID0gY2hpbGRyZW47XG4gICAgdGhpcy5mcmFnbWVudCA9IHRydWU7XG4gICAgaWYgKGtleSkge1xuICAgICAgICB0aGlzLmtleSA9IGtleTtcbiAgICB9XG4gICAgLy90aGlzLnBhcmVudCA9IG51bGw7XG4gICAgdGhpcy5kb20gPSBudWxsO1xuICAgIHRoaXMuYXR0cnMgPSBhdHRycztcbiAgICAvL3RoaXMuZGVzdHJveWVkID0gbnVsbDtcbiAgICAvL3RoaXMuZGVzdHJveWVkID0gbnVsbDtcbn1cbmNsYXNzRXh0ZW5kKFZDb21wb25lbnQsIHByb3RvLCB7ZnJhZ21lbnQ6IHRydWV9KTtcblxuXG52YXIgbm9kZXNDYWNoZSA9IG5ldyBBcnJheSgxMDAwMDAwKTtcbm5vZGVzQ2FjaGUubGVuID0gMDtcblxuZnVuY3Rpb24gTk5vZGUodGFnLCBhdHRycywgY2hpbGRyZW4sIGtleSwgdGV4dCkge1xuICAgIC8vb2JqZWN0cy5wdXNoKHRoaXMpO1xuICAgIHRoaXMuaWQgPSBpZCsrO1xuICAgIHRoaXMudGFnID0gdGFnO1xuICAgIHRoaXMuYXR0cnMgPSBhdHRycztcbiAgICB0aGlzLmNoaWxkcmVuID0gY2hpbGRyZW47XG4gICAgaWYgKHRleHQpIHtcbiAgICAgICAgdGhpcy50ZXh0ID0gdGV4dDtcbiAgICB9XG4gICAgdGhpcy5hbGxBdHRycyA9ICcnO1xuICAgIHRoaXMua2V5ID0ga2V5O1xuICAgIHRoaXMuZG9tID0gbnVsbDtcbiAgICAvL3RoaXMucGFyZW50ID0gbnVsbDtcbiAgICAvL3RoaXMuZGVzdHJveWVkID0gbnVsbDtcbn1cbmNsYXNzRXh0ZW5kKE5Ob2RlLCBwcm90bywge1xuICAgIGRlc3Ryb3k6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5kb20gPSBudWxsO1xuICAgICAgICB0aGlzLmNoaWxkcmVuID0gbnVsbDtcbiAgICAgICAgdGhpcy5hdHRycyA9IG51bGw7XG4gICAgICAgIC8vbm9kZXNDYWNoZVtub2Rlc0NhY2hlLmxlbisrXSA9IHRoaXM7XG4gICAgICAgIC8vdGhpcy5kZXN0cm95ZWQgPSB0cnVlO1xuICAgICAgICAvL3RoaXMucGFyZW50ID0gbnVsbDtcbiAgICB9XG59KTtcbmV4cG9ydCBmdW5jdGlvbiBnZXROTm9kZSh0YWcsIGF0dHJzLCBjaGlsZHJlbiwga2V5LCB0ZXh0KSB7XG4gICAgaWYgKG5vZGVzQ2FjaGUubGVuID09IDApIHtcbiAgICAgICAgcmV0dXJuIG5ldyBOTm9kZSh0YWcsIGF0dHJzLCBjaGlsZHJlbiwga2V5LCB0ZXh0KTtcbiAgICB9XG4gICAgdmFyIGl0ZW0gPSBub2Rlc0NhY2hlWy0tbm9kZXNDYWNoZS5sZW5dO1xuICAgIGl0ZW0udGFnID0gdGFnO1xuICAgIGl0ZW0uYXR0cnMgPSBhdHRycztcbiAgICBpdGVtLmNoaWxkcmVuID0gY2hpbGRyZW47XG4gICAgaXRlbS5rZXkgPSBrZXk7XG4gICAgLy9pdGVtLnRleHQgPSB0ZXh0O1xuICAgIHJldHVybiBpdGVtO1xufVxuXG5cbnZhciB0ZXh0Tm9kZXNDYWNoZSA9IG5ldyBBcnJheSgxMDAwMDAwKTtcbnRleHROb2Rlc0NhY2hlLmxlbiA9IDA7XG5cbmZ1bmN0aW9uIFZUZXh0Tm9kZSh0ZXh0KSB7XG4gICAgdGhpcy5pZCA9IGlkKys7XG4gICAgdGhpcy5kb20gPSBudWxsO1xuICAgIHRoaXMudGV4dCA9IHRleHQ7XG4gICAgLy90aGlzLnBhcmVudCA9IG51bGw7XG4gICAgLy90aGlzLmRlc3Ryb3llZCA9IG51bGw7XG59XG5jbGFzc0V4dGVuZChWVGV4dE5vZGUsIHByb3RvLCB7XG4gICAgdGFnOiAnIycsXG4gICAgZGVzdHJveTogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmRvbSA9IG51bGw7XG4gICAgICAgIHRleHROb2Rlc0NhY2hlW3RleHROb2Rlc0NhY2hlLmxlbisrXSA9IHRoaXM7XG4gICAgICAgIC8vdGhpcy5kZXN0cm95ZWQgPSB0cnVlO1xuICAgICAgICAvL3RoaXMucGFyZW50ID0gbnVsbDtcbiAgICB9XG59KTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldFRleHROb2RlKHRleHQpIHtcbiAgICBpZiAodGV4dE5vZGVzQ2FjaGUubGVuID09IDApIHtcbiAgICAgICAgcmV0dXJuIG5ldyBWVGV4dE5vZGUodGV4dCk7XG4gICAgfVxuICAgIHZhciBpdGVtID0gdGV4dE5vZGVzQ2FjaGVbLS10ZXh0Tm9kZXNDYWNoZS5sZW5dO1xuICAgIGl0ZW0udGV4dCA9IHRleHQ7XG4gICAgcmV0dXJuIGl0ZW07XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9ub2RlLmpzXG4gKiovIiwiLyoqXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0gVGhlIExpZmUtQ3ljbGUgb2YgYSBDb21wb3NpdGUgQ29tcG9uZW50IC0tLS0tLS0tLS0tLS0tLS0tLVxuICpcbiAqICsgY29uc3RydWN0b3I6IEluaXRpYWxpemF0aW9uIG9mIHN0YXRlLiBUaGUgaW5zdGFuY2UgaXMgbm93IHJldGFpbmVkLlxuICogICArIGNvbXBvbmVudFdpbGxNb3VudFxuICogICArIHJlbmRlclxuICogICArIFtjaGlsZHJlbidzIGNvbnN0cnVjdG9yc11cbiAqICAgICArIFtjaGlsZHJlbidzIGNvbXBvbmVudFdpbGxNb3VudCBhbmQgcmVuZGVyXVxuICogICAgICsgW2NoaWxkcmVuJ3MgY29tcG9uZW50RGlkTW91bnRdXG4gKiAgICAgKyBjb21wb25lbnREaWRNb3VudFxuICpcbiAqICAgICAgIFVwZGF0ZSBQaGFzZXM6XG4gKiAgICAgICArIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMgKG9ubHkgY2FsbGVkIGlmIHBhcmVudCB1cGRhdGVkKVxuICogICAgICAgLSBzaG91bGRDb21wb25lbnRVcGRhdGVcbiAqICAgICAgICAgKyBjb21wb25lbnRXaWxsVXBkYXRlXG4gKiAgICAgICAgICAgKyByZW5kZXJcbiAqICAgICAgICAgICArIFtjaGlsZHJlbidzIGNvbnN0cnVjdG9ycyBvciByZWNlaXZlIHByb3BzIHBoYXNlc11cbiAqICAgICAgICAgKyBjb21wb25lbnREaWRVcGRhdGVcbiAqXG4gKiAgICAgKyBjb21wb25lbnRXaWxsVW5tb3VudFxuICogICAgICsgW2NoaWxkcmVuJ3MgY29tcG9uZW50V2lsbFVubW91bnRdXG4gKiAgIC0gW2NoaWxkcmVuIGRlc3Ryb3llZF1cbiAqIC0gKGRlc3Ryb3llZCk6IFRoZSBpbnN0YW5jZSBpcyBub3cgYmxhbmssIHJlbGVhc2VkIGJ5IFJlYWN0IGFuZCByZWFkeSBmb3IgR0MuXG4gKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuaW1wb3J0IHt1cGRhdGVDaGlsZHJlbn0gZnJvbSAnLi91cGRhdGUnO1xuaW1wb3J0IHtWQ29tcG9uZW50fSBmcm9tICcuL25vZGUnO1xuaW1wb3J0IHtERUJVR30gZnJvbSAnLi91dGlscyc7XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGZpbmRET01Ob2RlKHZkb20pIHtcbiAgICByZXR1cm4gdmRvbS5kb207XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBDb21wb25lbnQocHJvcHMpIHtcbiAgICB0aGlzLnByb3BzID0gcHJvcHM7XG59XG5cbkNvbXBvbmVudC5wcm90b3R5cGUuY29tcG9uZW50V2lsbE1vdW50ID0gZnVuY3Rpb24gKCkge307XG5Db21wb25lbnQucHJvdG90eXBlLmNvbXBvbmVudERpZE1vdW50ID0gZnVuY3Rpb24gKCkge307XG5cbkNvbXBvbmVudC5wcm90b3R5cGUuY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyA9IGZ1bmN0aW9uICgpIHt9O1xuQ29tcG9uZW50LnByb3RvdHlwZS5jb21wb25lbnRXaWxsVXBkYXRlID0gZnVuY3Rpb24gKCkge307XG5Db21wb25lbnQucHJvdG90eXBlLmNvbXBvbmVudERpZFVwZGF0ZSA9IGZ1bmN0aW9uICgpIHt9O1xuXG5Db21wb25lbnQucHJvdG90eXBlLmNvbXBvbmVudFdpbGxVbm1vdW50ID0gZnVuY3Rpb24gKCkge307XG5cblxuQ29tcG9uZW50LnByb3RvdHlwZS51cGRhdGVQcm9wcyA9IGZ1bmN0aW9uIChwcm9wcykge1xuICAgIHRoaXMuY29tcG9uZW50V2lsbFVwZGF0ZShwcm9wcyk7XG4gICAgLy92YXIgb2xkUHJvcHMgPSB0aGlzLnByb3BzO1xuICAgIHRoaXMucHJvcHMgPSBwcm9wcztcbiAgICB2YXIgbmV3Tm9kZSA9IG5ldyBWQ29tcG9uZW50KHRoaXMuY29uc3RydWN0b3IsIG51bGwsIFt0aGlzLnJlbmRlcigpXSwgbnVsbCk7XG4gICAgdXBkYXRlQ2hpbGRyZW4odGhpcy5ub2RlLCBuZXdOb2RlKTtcbiAgICB0aGlzLm5vZGUuY2hpbGRyZW4gPSBuZXdOb2RlLmNoaWxkcmVuO1xuICAgIC8vdG9kbzpjb21wb25lbnREaWRVcGRhdGUob2JqZWN0IHByZXZQcm9wcywgb2JqZWN0IHByZXZTdGF0ZSlcbiAgICB0aGlzLmNvbXBvbmVudERpZFVwZGF0ZSh0aGlzLnByb3BzKTtcbn07XG5cbkNvbXBvbmVudC5wcm90b3R5cGUuZm9yY2VVcGRhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy51cGRhdGVQcm9wcyh0aGlzLnByb3BzKTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVDb21wb25lbnQob2xkLCB2ZG9tKSB7XG4gICAgdmRvbS5jb21wb25lbnQgPSBvbGQuY29tcG9uZW50O1xuICAgIHZhciBwcm9wcyA9IHZkb20uYXR0cnMgfHwge307XG4gICAgcHJvcHMuY2hpbGRyZW4gPSB2ZG9tLmNoaWxkcmVuO1xuICAgIHZkb20uY29tcG9uZW50LmNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMocHJvcHMpO1xuICAgIHZkb20uY29tcG9uZW50LnVwZGF0ZVByb3BzKHByb3BzKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUNvbXBvbmVudCh2ZG9tKSB7XG4gICAgdmFyIHByb3BzID0gdmRvbS5hdHRycyB8fCB7fTtcbiAgICBwcm9wcy5jaGlsZHJlbiA9IHZkb20uY2hpbGRyZW47XG4gICAgdmRvbS5jb21wb25lbnQgPSBuZXcgdmRvbS50YWcocHJvcHMpO1xuICAgIHZkb20uY29tcG9uZW50LmNvbXBvbmVudFdpbGxNb3VudCgpO1xuICAgIHZkb20uY2hpbGRyZW4gPSBbdmRvbS5jb21wb25lbnQucmVuZGVyKCldO1xuICAgIHZkb20uY29tcG9uZW50Lm5vZGUgPSB2ZG9tO1xuICAgIERFQlVHICYmIGNvbnNvbGUubG9nKHZkb20pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVzdHJveUNvbXBvbmVudCh2ZG9tKSB7XG4gICAgdmRvbS5jb21wb25lbnQuY29tcG9uZW50V2lsbFVubW91bnQoKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1vdW50Q29tcG9uZW50KHZkb20pIHtcbiAgICB2ZG9tLmNvbXBvbmVudC5jb21wb25lbnREaWRNb3VudCgpO1xufVxuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9jb21wb25lbnQuanNcbiAqKi8iLCJpbXBvcnQge2F0dHJzLCBwcm9wcywgZXZlbnRzfSBmcm9tICcuL2F0dHJzJztcbmltcG9ydCB7dXBkYXRlQ29tcG9uZW50LCBkZXN0cm95Q29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudCc7XG5pbXBvcnQge25vcm1DaGlsZCwgZ2V0Rmlyc3RDaGlsZCwgREVCVUd9IGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0IHtjcmVhdGV9IGZyb20gJy4vY3JlYXRlJztcblxuXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlKG9sZCwgdmRvbSkge1xuICAgIERFQlVHICYmIGNvbnNvbGUubG9nKFwidXBkYXRlXCIsIHZkb20pO1xuXG4gICAgdmFyIGRvbSA9IG9sZC5kb207XG4gICAgZG9tLnVwZGF0ZWQgPSB0cnVlO1xuICAgIHZkb20uZG9tID0gZG9tO1xuICAgIC8vdmRvbS5wYXJlbnQgPSBvbGQucGFyZW50O1xuICAgIGlmIChvbGQudGFnICE9PSB2ZG9tLnRhZykge1xuICAgICAgICByZXBsYWNlTm9kZShvbGQsIHZkb20pO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChvbGQudGFnID09ICcjJykge1xuICAgICAgICBpZiAob2xkLnRleHQgIT09IHZkb20udGV4dCkge1xuICAgICAgICAgICAgZG9tLnRleHRDb250ZW50ID0gdmRvbS50ZXh0O1xuICAgICAgICB9XG4gICAgICAgIG9sZC5kZXN0cm95KCk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKG9sZC50ZXh0ICE9PSB2ZG9tLnRleHQpIHtcbiAgICAgICAgZG9tLnRleHRDb250ZW50ID0gdmRvbS50ZXh0O1xuICAgIH1cblxuICAgIGlmICh2ZG9tLmZyYWdtZW50KSB7XG4gICAgICAgIGlmICh2ZG9tLmtleSAhPT0gb2xkLmtleSkge1xuICAgICAgICAgICAgcmVwbGFjZU5vZGUob2xkLCB2ZG9tKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdmRvbS5hbGxBdHRycyA9ICcnO1xuICAgICAgICBpZiAodmRvbS5hdHRycyAmJiBvbGQuYXR0cnMpIHtcbiAgICAgICAgICAgIGZvckF0dHJzKG9sZCwgdmRvbSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKChvbGQuYXR0cnMgJiYgIXZkb20uYXR0cnMpIHx8ICghb2xkLmF0dHJzICYmIHZkb20uYXR0cnMpIHx8IG9sZC5hbGxBdHRycyAhPT0gdmRvbS5hbGxBdHRycykge1xuICAgICAgICAgICAgcmVwbGFjZU5vZGUob2xkLCB2ZG9tKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAob2xkLmNvbXBvbmVudCkge1xuICAgICAgICB1cGRhdGVDb21wb25lbnQob2xkLCB2ZG9tKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICghdmRvbS50ZXh0KSB7XG4gICAgICAgIGlmICh1cGRhdGVDaGlsZHJlbihvbGQsIHZkb20pKSB7XG4gICAgICAgICAgICBvbGQuZGVzdHJveSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgb2xkLmRlc3Ryb3koKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZUNoaWxkcmVuKG9sZCwgdmRvbSkge1xuICAgIHZhciBvbGRMZW4gPSBvbGQuY2hpbGRyZW4gPyBvbGQuY2hpbGRyZW4ubGVuZ3RoIDogMDtcbiAgICB2YXIgbmV3TGVuID0gdmRvbS5jaGlsZHJlbiA/IHZkb20uY2hpbGRyZW4ubGVuZ3RoIDogMDtcbiAgICBpZiAob2xkTGVuICYmIG5ld0xlbiAmJiB2ZG9tLmlzTWFwICYmIG9sZC5pc01hcCkge1xuICAgICAgICBtYXBDaGlsZHJlbihvbGQsIHZkb20sIGdldEZpcnN0Q2hpbGQob2xkKSk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAob2xkTGVuID4gMCkge1xuICAgICAgICBpZiAob2xkTGVuID09PSBuZXdMZW4pIHtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbmV3TGVuOyBpKyspIHtcbiAgICAgICAgICAgICAgICBub3JtQ2hpbGQodmRvbSwgaSk7XG4gICAgICAgICAgICAgICAgdXBkYXRlKG9sZC5jaGlsZHJlbltpXSwgdmRvbS5jaGlsZHJlbltpXSk7XG4gICAgICAgICAgICAgICAgLy9jbGVhckNoaWxkKG9sZCwgaSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbmV3TGVuOyBpKyspIHtcbiAgICAgICAgICAgICAgICBub3JtQ2hpbGQodmRvbSwgaSk7XG4gICAgICAgICAgICAgICAgdmFyIG5ld0NoaWxkID0gdmRvbS5jaGlsZHJlbltpXTtcbiAgICAgICAgICAgICAgICBjcmVhdGUobmV3Q2hpbGQsIHZkb20uZG9tKTtcbiAgICAgICAgICAgICAgICBpbnNlcnQob2xkLmRvbSwgbmV3Q2hpbGQsIGdldEZpcnN0Q2hpbGQob2xkKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgb2xkTGVuOyBpKyspIHtcbiAgICAgICAgICAgICAgICByZW1vdmUob2xkLmNoaWxkcmVuW2ldKTtcbiAgICAgICAgICAgICAgICAvL2NsZWFyQ2hpbGQob2xkLCBpKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKG5ld0xlbiA+IDApIHtcbiAgICAgICAgcmVwbGFjZU5vZGUob2xkLCB2ZG9tKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbn1cblxuXG5mdW5jdGlvbiBtYXBDaGlsZHJlbihvbGQsIHZkb20sIGJlZm9yZUNoaWxkKSB7XG4gICAgdmFyIHBhcmVudERvbSA9IG9sZC5kb207XG4gICAgdmFyIGtleU1hcCA9IG9sZC5rZXlNYXA7XG4gICAgdmFyIG5ld0tleU1hcCA9IHZkb20ua2V5TWFwO1xuICAgIHZhciBuZXdDaGlsZHJlbiA9IHZkb20uY2hpbGRyZW47XG4gICAgdmFyIG5ld0xlbiA9IG5ld0NoaWxkcmVuLmxlbmd0aDtcbiAgICB2YXIgb2xkTGVuID0gb2xkLmNoaWxkcmVuLmxlbmd0aDtcbiAgICB2YXIgZm91bmQgPSAwO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbmV3TGVuOyBpKyspIHtcbiAgICAgICAgbm9ybUNoaWxkKHZkb20sIGkpO1xuICAgICAgICB2YXIgbmV3Q2hpbGQgPSBuZXdDaGlsZHJlbltpXTtcbiAgICAgICAgdmFyIG9sZENoaWxkID0gb2xkLmNoaWxkcmVuW2ldO1xuICAgICAgICB2YXIgbmV3S2V5ID0gbmV3Q2hpbGQua2V5O1xuICAgICAgICBpZiAobmV3S2V5ID09IG51bGwpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignbWFwIHdpdGhvdXQga2V5cycsIHZkb20pO1xuICAgICAgICAgICAgcmVwbGFjZU5vZGUob2xkLCB2ZG9tKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIga2V5Q2hpbGQgPSBvbGQuY2hpbGRyZW5ba2V5TWFwW25ld0tleV1dO1xuICAgICAgICBpZiAoa2V5Q2hpbGQpIHtcbiAgICAgICAgICAgIGZvdW5kKys7XG4gICAgICAgICAgICBpZiAoa2V5Q2hpbGQgIT09IG9sZENoaWxkKSB7XG4gICAgICAgICAgICAgICAgaW5zZXJ0KHBhcmVudERvbSwga2V5Q2hpbGQsIGJlZm9yZUNoaWxkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHVwZGF0ZShrZXlDaGlsZCwgbmV3Q2hpbGQpO1xuICAgICAgICAgICAgaWYgKGtleUNoaWxkID09IG9sZENoaWxkKSB7XG4gICAgICAgICAgICAgICAgY2xlYXJDaGlsZChvbGQsIGkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAga2V5TWFwW25ld0tleV0gPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY3JlYXRlKG5ld0NoaWxkLCB2ZG9tLmRvbSk7XG4gICAgICAgICAgICBpbnNlcnQocGFyZW50RG9tLCBuZXdDaGlsZCwgYmVmb3JlQ2hpbGQpO1xuICAgICAgICB9XG4gICAgICAgIGJlZm9yZUNoaWxkID0gbmV3Q2hpbGQuZG9tLm5leHRTaWJsaW5nO1xuICAgICAgICBuZXdLZXlNYXBbbmV3S2V5XSA9IGk7XG4gICAgfVxuICAgIC8vb2xkLmtleU1hcCA9IG51bGw7XG5cbiAgICBpZiAoZm91bmQgIT09IG9sZExlbikge1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgb2xkTGVuOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBjaGlsZCA9IG9sZC5jaGlsZHJlbltpXTtcbiAgICAgICAgICAgIGlmIChjaGlsZCAmJiBuZXdLZXlNYXBbY2hpbGQua2V5XSA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmVtb3ZlKGNoaWxkKTtcbiAgICAgICAgICAgICAgICBjbGVhckNoaWxkKG9sZCwgaSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIHJlcGxhY2VOb2RlKG9sZCwgdmRvbSkge1xuICAgIHZhciBwYXJlbnREb20gPSBvbGQuZnJhZ21lbnQgPyBvbGQuZG9tIDogb2xkLmRvbS5wYXJlbnROb2RlO1xuICAgIGNyZWF0ZSh2ZG9tLCBwYXJlbnREb20pO1xuICAgIGluc2VydChwYXJlbnREb20sIHZkb20sIG9sZC5mcmFnbWVudCA/IGdldEZpcnN0Q2hpbGQob2xkKSA6IG9sZCk7XG4gICAgcmVtb3ZlKG9sZCk7XG4gICAgcmV0dXJuIHZkb207XG5cbn1cblxuZnVuY3Rpb24gZm9yQXR0cnMob2xkLCB2ZG9tKSB7XG4gICAgdmFyIGF0dHI7XG4gICAgdmFyIGlzTm90U2FtZTtcbiAgICB2YXIgZG9tID0gdmRvbS5kb207XG4gICAgZm9yICh2YXIgYXR0ck5hbWUgaW4gdmRvbS5hdHRycykge1xuICAgICAgICB2ZG9tLmFsbEF0dHJzICs9IGF0dHJOYW1lO1xuICAgICAgICB2YXIgYXR0clZhbCA9IHZkb20uYXR0cnNbYXR0ck5hbWVdO1xuICAgICAgICBpZiAoYXR0ck5hbWUgPT0gJ2tleScpIHt9XG4gICAgICAgIGVsc2UgaWYgKChpc05vdFNhbWUgPSB2ZG9tLmF0dHJzW2F0dHJOYW1lXSAhPT0gb2xkLmF0dHJzW2F0dHJOYW1lXSkgJiYgKGF0dHIgPSBwcm9wc1thdHRyTmFtZV0pKSB7XG4gICAgICAgICAgICBkb21bYXR0cl0gPSBhdHRyVmFsO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKChhdHRyID0gYXR0cnNbYXR0ck5hbWVdKSAmJiBpc05vdFNhbWUpIHtcbiAgICAgICAgICAgIGlmIChhdHRyVmFsID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIGRvbS5yZW1vdmVBdHRyaWJ1dGUoYXR0cik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBkb20uc2V0QXR0cmlidXRlKGF0dHIsIGF0dHJWYWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGF0dHIgPSBldmVudHNbYXR0ck5hbWVdICYmIGlzTm90U2FtZSkge1xuICAgICAgICAgICAgZG9tWydvbicgKyBhdHRyXSA9IGF0dHJWYWw7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoYXR0ck5hbWVbMF0gPT09ICdvJyAmJiBhdHRyTmFtZVsxXSA9PT0gJ24nICYmIGlzTm90U2FtZSkge1xuICAgICAgICAgICAgYXR0ciA9IGF0dHJOYW1lLnN1YnN0cmluZygyKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgZG9tWydvbicgKyBhdHRyXSA9IGF0dHJWYWw7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoYXR0ck5hbWVbMF0gPT09ICdkJyAmJiBhdHRyTmFtZVsxXSA9PT0gJ2EnICYmIGF0dHJOYW1lWzJdID09PSAndCcgJiYgYXR0ck5hbWVbM10gPT09ICdhJyAmJiBpc05vdFNhbWUpIHtcbiAgICAgICAgICAgIGlmIChhdHRyVmFsID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIGRvbS5yZW1vdmVBdHRyaWJ1dGUoYXR0ck5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZG9tLnNldEF0dHJpYnV0ZShhdHRyTmFtZSwgYXR0clZhbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLypcbiAgICAgICAgIGVsc2UgaWYgKGF0dHJOYW1lID09PSAncmVmJyAmJiB0eXBlb2YgYXR0clZhbCA9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAvL2RlYnVnZ2VyO1xuICAgICAgICAgYXR0clZhbCh2ZG9tKTtcbiAgICAgICAgIH1cbiAgICAgICAgICovXG4gICAgfVxufVxuXG5mdW5jdGlvbiBpbnNlcnQocGFyZW50RG9tLCB2ZG9tLCBiZWZvcmUpIHtcbiAgICBpZiAodmRvbS5mcmFnbWVudCkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHZkb20uY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGluc2VydCh2ZG9tLmRvbSwgdmRvbS5jaGlsZHJlbltpXSwgYmVmb3JlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIERFQlVHICYmIGNvbnNvbGUubG9nKFwiSW5zZXJ0XCIsIHZkb20pO1xuICAgIHBhcmVudERvbS5pbnNlcnRCZWZvcmUodmRvbS5kb20sIGJlZm9yZSAmJiBiZWZvcmUuZG9tKTtcbn1cblxuXG5mdW5jdGlvbiBjbGVhckNoaWxkKG9sZCwgaSkge1xuICAgIC8vb2xkLmNoaWxkcmVuW2ldID0gbnVsbDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZShvbGQpIHtcbiAgICBERUJVRyAmJiBjb25zb2xlLmxvZyhcInJlbW92ZVwiLCBvbGQpO1xuXG4gICAgaWYgKG9sZC5jb21wb25lbnQpIHtcbiAgICAgICAgZGVzdHJveUNvbXBvbmVudChvbGQpO1xuICAgIH1cbiAgICBpZiAob2xkLmNoaWxkcmVuKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgb2xkLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICByZW1vdmUob2xkLmNoaWxkcmVuW2ldKTtcbiAgICAgICAgICAgIGNsZWFyQ2hpbGQob2xkLCBpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAoIW9sZC5mcmFnbWVudCkge1xuICAgICAgICBvbGQuZG9tLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQob2xkLmRvbSk7XG4gICAgfVxuICAgIG9sZC5kZXN0cm95KCk7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy91cGRhdGUuanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9