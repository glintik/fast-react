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
	        dom = document.createDocumentFragment();
	        vdom.firstNode = document.createTextNode('');
	        vdom.firstNode.skip = true;
	        dom.appendChild(vdom.firstNode);
	        vdom.dom = parentDom;
	        if (typeof vdom.tag === 'function') {
	            (0, _component.createComponent)(vdom);
	        }
	    } else {
	        dom = document.createElement(vdom.tag);
	        vdom.dom = dom;
	        dom.vdom = vdom;
	        //dom.virtual = vdom;
	    }
	
	    if (vdom.children) {
	        for (var i = 0; i < vdom.children.length; i++) {
	            (0, _utils.normChild)(vdom, i);
	            var child = vdom.children[i];
	            if (vdom.isMap) {
	                vdom.keyMap[child.key] = i;
	                if (child.key == null) {
	                    console.warn('map without keys', vdom);
	                    debugger;
	                }
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
	        if (this.dom == null) {
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
	
	function VFragmentNode(tag, attrs, children, key) {
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
	    destroy: function destroy() {
	        if (this.dom == null) {
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
	        if (this.dom == null) {
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
	        if (this.dom == null) {
	            debugger;
	        }
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
	
	Component.prototype.forceUpdate = function () {
	    this.updateProps(this.props);
	};
	
	Component.prototype.updateProps = function (props) {
	    this.componentWillUpdate(props);
	    //var oldProps = this.props;
	    this.props = props;
	    var newNode = new _node.VComponent(this.constructor, null, [this.render()], null);
	    (0, _update.updateDom)(this.node, newNode);
	    (0, _update.updateChildren)(this.node, newNode);
	    this.node.children = newNode.children;
	    //todo:componentDidUpdate(object prevProps, object prevState)
	    this.componentDidUpdate(this.props);
	};
	
	function updateComponent(old, vdom) {
	    vdom.component = old.component;
	    var props = vdom.attrs || {};
	    props.children = vdom.children ? new _node.VFragmentNode('@', null, vdom.children) : null;
	    vdom.component.componentWillReceiveProps(props);
	    vdom.component.updateProps(props);
	    //vdom.children = vdom.component.node.children;
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
	exports.updateDom = updateDom;
	exports.update = update;
	exports.updateChildren = updateChildren;
	exports.remove = remove;
	
	var _attrs = __webpack_require__(4);
	
	var _component = __webpack_require__(7);
	
	var _utils = __webpack_require__(5);
	
	var _create = __webpack_require__(3);
	
	function updateDom(old, vdom) {
	    old.dom.updated = true;
	    vdom.dom = old.dom;
	}
	
	function update(old, vdom) {
	    _utils.DEBUG && console.log('update', vdom);
	    updateDom(old, vdom);
	    var dom = old.dom;
	
	    //vdom.parent = old.parent;
	    if (old.tag !== vdom.tag) {
	        return replaceNode(old, vdom);
	    }
	    if (old.tag == '#') {
	        if (old.text !== vdom.text) {
	            dom.textContent = vdom.text;
	        }
	        old.destroy();
	        return vdom;
	    }
	    if (old.text !== vdom.text) {
	        dom.textContent = vdom.text;
	    }
	
	    if (vdom.fragment) {
	        if (vdom.key !== old.key) {
	            return replaceNode(old, vdom);
	        }
	    } else {
	        vdom.allAttrs = '';
	        if (vdom.attrs && old.attrs) {
	            forAttrs(old, vdom);
	        }
	        if (old.attrs && !vdom.attrs || !old.attrs && vdom.attrs || old.allAttrs !== vdom.allAttrs) {
	            return replaceNode(old, vdom);
	        }
	    }
	    if (old.component) {
	        (0, _component.updateComponent)(old, vdom);
	        return vdom;
	    }
	
	    if (!vdom.text) {
	        updateChildren(old, vdom);
	    }
	    old.destroy();
	    return vdom;
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
	                vdom.children[i] = update(old.children[i], vdom.children[i]);
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
	        return replaceChildren(old, vdom);
	    }
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
	            debugger;
	            return replaceChildren(old, vdom);
	        }
	        var keyChild = old.children[keyMap[newKey]];
	        if (keyChild) {
	            found++;
	            if (keyChild !== oldChild) {
	                insert(parentDom, keyChild, beforeChild);
	            }
	            newChildren[i] = update(keyChild, newChild);
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
	
	function replaceChildren(old, vdom) {
	    if (vdom.children) {
	        for (var i = 0; i < vdom.children.length; i++) {
	            (0, _utils.normChild)(vdom, i);
	            var child = vdom.children[i];
	            (0, _create.create)(child, vdom.dom);
	            insert(vdom.dom, child, vdom.fragment ? vdom.firstNode : null);
	        }
	    }
	
	    if (old.children) {
	        for (var i = 0; i < old.children.length; i++) {
	            var child = old.children[i];
	            remove(child);
	            child.destroy();
	        }
	    }
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
	        } else if (attrName === 'ref' && typeof attrVal == 'function') {
	            attrVal(vdom);
	        }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMTkyZjRjMTkxMDdmMGU3N2JhYWEiLCJ3ZWJwYWNrOi8vLy4vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Zhc3QtcmVhY3QuanM/N2RjOSIsIndlYnBhY2s6Ly8vLi9zcmMvZmFzdC1yZWFjdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY3JlYXRlLmpzIiwid2VicGFjazovLy8uL3NyYy9hdHRycy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL25vZGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXBkYXRlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7QUN0Q0EsT0FBTSxDQUFDLE9BQU8sR0FBRyxtQkFBTyxDQUFDLENBQXNDLENBQUMsQzs7Ozs7O0FDQWhFLDJHQUFrSyxFOzs7Ozs7Ozs7Ozs7O21DQ0F4RyxDQUFVOzs7OztvQkFBM0QsTUFBTTs7Ozs7O29CQUFFLGFBQWE7Ozs7OztvQkFBRSxrQkFBa0I7Ozs7c0NBQ1gsQ0FBYTs7Ozs7dUJBQTNDLFNBQVM7Ozs7Ozt1QkFBRSxXQUFXOzs7O21DQUNSLENBQVU7Ozs7O29CQUF4QixNQUFNOzs7Ozs7Ozs7Ozs7O1NDR0MsTUFBTSxHQUFOLE1BQU07U0FRTixNQUFNLEdBQU4sTUFBTTtTQWlHTixrQkFBa0IsR0FBbEIsa0JBQWtCO1NBZ0JsQixhQUFhLEdBQWIsYUFBYTs7a0NBOUhNLENBQVM7O2tDQUNiLENBQVM7O2lDQUNVLENBQVE7O3NDQUNaLENB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QUFHLENBQUMsUUFBUSxFQUFFO0FBQ2QsY0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQzFDLG1CQUFNLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3hCLHVCQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1VBQ3RCO01BQ0o7QUFDRCxTQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRTtBQUNmLFlBQUcsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7TUFDM0M7QUFDRCxRQUFHLENBQUMsT0FBTyxFQUFFLENBQUM7RUFDakIiLCJmaWxlIjoiZmFzdC1yZWFjdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgMTkyZjRjMTkxMDdmMGU3N2JhYWFcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJleHBvc2U/RmFzdFJlYWN0IS4vc3JjL2Zhc3QtcmVhY3QuanNcIik7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2luZGV4LmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBnbG9iYWxbXCJGYXN0UmVhY3RcIl0gPSByZXF1aXJlKFwiLSEvVXNlcnMvY29keS9kZXYvYmV0cHViL2Zyb250ZW5kL2RkZC9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2luZGV4LmpzP3tcXFwic3RhZ2VcXFwiOjAsXFxcImxvb3NlXFxcIjpbXFxcImVzNi5jbGFzc2VzXFxcIl19IS9Vc2Vycy9jb2R5L2Rldi9iZXRwdWIvZnJvbnRlbmQvZGRkL3NyYy9mYXN0LXJlYWN0LmpzXCIpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2V4cG9zZS1sb2FkZXI/RmFzdFJlYWN0IS4vc3JjL2Zhc3QtcmVhY3QuanNcbiAqKiBtb2R1bGUgaWQgPSAxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJleHBvcnQgeyByZW5kZXIsIGNyZWF0ZUVsZW1lbnQsIGNyZWF0ZUVsZW1lbnRBcnJheSB9IGZyb20gJy4vY3JlYXRlJztcbmV4cG9ydCB7IENvbXBvbmVudCwgZmluZERPTU5vZGUgfSBmcm9tICcuL2NvbXBvbmVudCc7XG5leHBvcnQgeyB1cGRhdGUgfSBmcm9tICcuL3VwZGF0ZSc7XG5cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2Zhc3QtcmVhY3QuanNcbiAqKi8iLCJpbXBvcnQge2F0dHJzLCBwcm9wcywgZXZlbnRzfSBmcm9tICcuL2F0dHJzJztcbmltcG9ydCB7REVCVUcsIG5vcm1DaGlsZH0gZnJvbSAnLi91dGlscyc7XG5pbXBvcnQge1ZGcmFnbWVudE5vZGUsIFZDb21wb25lbnQsIGdldE5Ob2RlfSBmcm9tICcuL25vZGUnO1xuaW1wb3J0IHtjcmVhdGVDb21wb25lbnQsIG1vdW50Q29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudCc7XG5cbmV4cG9ydCBmdW5jdGlvbiByZW5kZXIodmRvbSwgZG9tKSB7XG4gICAgZG9tLmFwcGVuZENoaWxkKGNyZWF0ZSh2ZG9tLCBkb20pKTtcbiAgICBpZiAodmRvbS5jb21wb25lbnQpIHtcbiAgICAgICAgbW91bnRDb21wb25lbnQodmRvbSk7XG4gICAgfVxuICAgIHJldHVybiB2ZG9tO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlKHZkb20sIHBhcmVudERvbSkge1xuICAgIERFQlVHICYmIGNvbnNvbGUubG9nKFwiQ3JlYXRlXCIsIHZkb20pO1xuICAgIC8vdmRvbS5wYXJlbnQgPSBwYXJlbnQ7XG4gICAgaWYgKHZkb20udGFnID09ICcjJykge1xuICAgICAgICB2ZG9tLmRvbSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHZkb20udGV4dCk7XG4gICAgICAgIC8vdmRvbS5kb20udmlydHVhbCA9IHZkb207XG4gICAgICAgIHJldHVybiB2ZG9tLmRvbTtcbiAgICB9XG4gICAgdmFyIGRvbTtcbiAgICBpZiAodmRvbS5mcmFnbWVudCkge1xuICAgICAgICBkb20gPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gICAgICAgIHZkb20uZmlyc3ROb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJycpO1xuICAgICAgICB2ZG9tLmZpcnN0Tm9kZS5za2lwID0gdHJ1ZTtcbiAgICAgICAgZG9tLmFwcGVuZENoaWxkKHZkb20uZmlyc3ROb2RlKTtcbiAgICAgICAgdmRvbS5kb20gPSBwYXJlbnREb207XG4gICAgICAgIGlmICh0eXBlb2YgdmRvbS50YWcgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNyZWF0ZUNvbXBvbmVudCh2ZG9tKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgZG9tID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh2ZG9tLnRhZyk7XG4gICAgICAgIHZkb20uZG9tID0gZG9tO1xuICAgICAgICBkb20udmRvbSA9IHZkb207XG4gICAgICAgIC8vZG9tLnZpcnR1YWwgPSB2ZG9tO1xuICAgIH1cblxuXG4gICAgaWYgKHZkb20uY2hpbGRyZW4pIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB2ZG9tLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBub3JtQ2hpbGQodmRvbSwgaSk7XG4gICAgICAgICAgICB2YXIgY2hpbGQgPSB2ZG9tLmNoaWxkcmVuW2ldO1xuICAgICAgICAgICAgaWYgKHZkb20uaXNNYXApIHtcbiAgICAgICAgICAgICAgICB2ZG9tLmtleU1hcFtjaGlsZC5rZXldID0gaTtcbiAgICAgICAgICAgICAgICBpZiAoY2hpbGQua2V5ID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKCdtYXAgd2l0aG91dCBrZXlzJywgdmRvbSk7XG4gICAgICAgICAgICAgICAgICAgIGRlYnVnZ2VyO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRvbS5hcHBlbmRDaGlsZChjcmVhdGUoY2hpbGQsIHZkb20uZG9tKSk7XG4gICAgICAgICAgICBpZiAoY2hpbGQuY29tcG9uZW50KSB7XG4gICAgICAgICAgICAgICAgbW91bnRDb21wb25lbnQoY2hpbGQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKHZkb20udGV4dCkge1xuICAgICAgICBkb20udGV4dENvbnRlbnQgPSB2ZG9tLnRleHQ7XG4gICAgfVxuICAgIHZkb20uYWxsQXR0cnMgPSAnJztcbiAgICBpZiAodmRvbS5hdHRycyAmJiAhdmRvbS5mcmFnbWVudCkge1xuICAgICAgICBpZiAodmRvbS5hdHRycy5yZWYpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdmRvbS5hdHRycy5yZWYgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICB2ZG9tLmF0dHJzLnJlZih2ZG9tKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vdG9kbzpcbiAgICAgICAgICAgIC8qXG4gICAgICAgICAgICAgZWxzZSBpZiAoY3VycmVudENvbXBvbmVudCkge1xuICAgICAgICAgICAgIGN1cnJlbnRDb21wb25lbnQucmVmcyA9IGN1cnJlbnRDb21wb25lbnQucmVmcyB8fCB7fTtcbiAgICAgICAgICAgICBjdXJyZW50Q29tcG9uZW50LnJlZnNbdmRvbS5hdHRycy5yZWZdID0gdmRvbTtcbiAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgKi9cbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBhdHRyO1xuICAgICAgICB2YXIgcHJvcDtcbiAgICAgICAgdmFyIGV2ZW50O1xuICAgICAgICBmb3IgKHZhciBhdHRyTmFtZSBpbiB2ZG9tLmF0dHJzKSB7XG4gICAgICAgICAgICB2ZG9tLmFsbEF0dHJzICs9IGF0dHJOYW1lO1xuICAgICAgICAgICAgdmFyIGF0dHJWYWwgPSB2ZG9tLmF0dHJzW2F0dHJOYW1lXTtcbiAgICAgICAgICAgIGlmICgocHJvcCA9IHByb3BzW2F0dHJOYW1lXSkgJiYgYXR0clZhbCAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICBkb21bcHJvcF0gPSBhdHRyVmFsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoKGF0dHIgPSBhdHRyc1thdHRyTmFtZV0pICYmIGF0dHJWYWwgIT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgZG9tLnNldEF0dHJpYnV0ZShhdHRyLCBhdHRyVmFsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGV2ZW50ID0gZXZlbnRzW2F0dHJOYW1lXSkge1xuICAgICAgICAgICAgICAgIC8vZG9tLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGV2ZW50SGFuZGxlcihhdHRyVmFsKSk7XG4gICAgICAgICAgICAgICAgZG9tWydvbicgKyBldmVudF0gPSBhdHRyVmFsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoYXR0ck5hbWVbMF0gPT09ICdvJyAmJiBhdHRyTmFtZVsxXSA9PT0gJ24nKSB7XG4gICAgICAgICAgICAgICAgZXZlbnQgPSBhdHRyTmFtZS5zdWJzdHJpbmcoMikudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgICAgICBkb21bJ29uJyArIGV2ZW50XSA9IGF0dHJWYWw7XG4gICAgICAgICAgICAgICAgLy9kb20uYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgZXZlbnRIYW5kbGVyKGF0dHJWYWwpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGF0dHJOYW1lWzBdID09PSAnZCcgJiYgYXR0ck5hbWVbMV0gPT09ICdhJyAmJiBhdHRyTmFtZVsyXSA9PT0gJ3QnICYmIGF0dHJOYW1lWzNdID09PSAnYScgJiYgYXR0clZhbCAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICBkb20uc2V0QXR0cmlidXRlKGF0dHJOYW1lLCBhdHRyVmFsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8qXG4gICAgICAgICAgICAgZWxzZSBpZiAoa2V5ID09PSAnc3R5bGUnKSB7XG4gICAgICAgICAgICAgfVxuICAgICAgICAgICAgICovXG5cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZG9tO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVFbGVtZW50QXJyYXkodGFnLCBhdHRycywgY2hpbGRyZW4pIHtcbiAgICB2YXIgaXNGcmFnbWVudCA9IHRhZyA9PSAnQCcgfHwgdHlwZW9mIHRhZyA9PSAnZnVuY3Rpb24nO1xuLy8gICAgICAgIHZhciB0ZXh0ID0gKGNoaWxkcmVuICYmICFpc0ZyYWdtZW50ICYmICh0eXBlb2YgY2hpbGRyZW5bMF0gPT0gJ3N0cmluZycgfHwgdHlwZW9mIGNoaWxkcmVuWzBdID09ICdudW1iZXInKSkgPyBjaGlsZHJlblswXSArICcnIDogbnVsbDtcbiAgICBpZiAoaXNGcmFnbWVudCkge1xuICAgICAgICBpZiAodHlwZW9mIHRhZyA9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFZDb21wb25lbnQodGFnLCBhdHRycywgY2hpbGRyZW4sIGF0dHJzID8gYXR0cnMua2V5IDogbnVsbCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFZGcmFnbWVudE5vZGUodGFnLCBhdHRycywgY2hpbGRyZW4sIGF0dHJzID8gYXR0cnMua2V5IDogbnVsbCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBnZXROTm9kZSh0YWcsIGF0dHJzLCBjaGlsZHJlbiwgYXR0cnMgPyBhdHRycy5rZXkgOiBudWxsLCBudWxsKTtcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVFbGVtZW50KHRhZywgYXR0cnMpIHtcbiAgICB2YXIgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICB2YXIgaXNGcmFnbWVudCA9IHRhZyA9PSAnQCcgfHwgdHlwZW9mIHRhZyA9PSAnZnVuY3Rpb24nO1xuICAgIHZhciB0ZXh0ID0gKGxlbiA9PSAzICYmICFpc0ZyYWdtZW50ICYmICh0eXBlb2YgYXJndW1lbnRzWzJdID09ICdzdHJpbmcnIHx8IHR5cGVvZiBhcmd1bWVudHNbMl0gPT0gJ251bWJlcicpKSA/IGFyZ3VtZW50c1syXSArICcnIDogbnVsbDtcbiAgICB2YXIgY2hpbGRyZW4gPSBudWxsO1xuICAgIGlmICghdGV4dCAmJiBsZW4gPiAyKSB7XG4gICAgICAgIGNoaWxkcmVuID0gQXJyYXkobGVuIC0gMik7XG4gICAgICAgIGZvciAodmFyIGkgPSAyOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIGNoaWxkcmVuW2kgLSAyXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlmIChpc0ZyYWdtZW50KSB7XG4gICAgICAgIGlmICh0eXBlb2YgdGFnID09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgVkNvbXBvbmVudCh0YWcsIGF0dHJzLCBjaGlsZHJlbiwgYXR0cnMgPyBhdHRycy5rZXkgOiBudWxsKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgVkZyYWdtZW50Tm9kZSh0YWcsIGF0dHJzLCBjaGlsZHJlbiwgYXR0cnMgPyBhdHRycy5rZXkgOiBudWxsKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGdldE5Ob2RlKHRhZywgYXR0cnMsIGNoaWxkcmVuLCBhdHRycyA/IGF0dHJzLmtleSA6IG51bGwsIHRleHQpO1xuICAgIH1cbn1cblxuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9jcmVhdGUuanNcbiAqKi8iLCJleHBvcnQgbGV0IGF0dHJzID0ge1xuICAgIGFjY2VwdDogJ2FjY2VwdCcsXG4gICAgYWNjZXB0Q2hhcnNldDogJ2FjY2VwdC1jaGFyc2V0JyxcbiAgICBhY2Nlc3NLZXk6ICdhY2Nlc3NLZXknLFxuICAgIGFjdGlvbjogJ2FjdGlvbicsXG4gICAgYWxsb3dGdWxsU2NyZWVuOiAnYWxsb3dGdWxsU2NyZWVuJyxcbiAgICBhbGxvd1RyYW5zcGFyZW5jeTogJ2FsbG93VHJhbnNwYXJlbmN5JyxcbiAgICBhbHQ6ICdhbHQnLFxuICAgIGFzeW5jOiAnYXN5bmMnLFxuICAgIGF1dG9Db21wbGV0ZTogJ2F1dG9Db21wbGV0ZScsXG4gICAgYXV0b1BsYXk6ICdhdXRvUGxheScsXG4gICAgY2FwdHVyZTogJ2NhcHR1cmUnLFxuICAgIGNlbGxQYWRkaW5nOiAnY2VsbFBhZGRpbmcnLFxuICAgIGNlbGxTcGFjaW5nOiAnY2VsbFNwYWNpbmcnLFxuICAgIGNoYXJTZXQ6ICdjaGFyU2V0JyxcbiAgICBjaGFsbGVuZ2U6ICdjaGFsbGVuZ2UnLFxuICAgIGNsYXNzSUQ6ICdjbGFzc0lEJyxcbiAgICBjb2xzOiAnY29scycsXG4gICAgY29sU3BhbjogJ2NvbFNwYW4nLFxuICAgIGNvbnRlbnQ6ICdjb250ZW50JyxcbiAgICBjb250ZW50RWRpdGFibGU6ICdjb250ZW50RWRpdGFibGUnLFxuICAgIGNvbnRleHRNZW51OiAnY29udGV4dE1lbnUnLFxuICAgIGNvb3JkczogJ2Nvb3JkcycsXG4gICAgY3Jvc3NPcmlnaW46ICdjcm9zc09yaWdpbicsXG4gICAgZGF0YTogJ2RhdGEnLFxuICAgIGRhdGVUaW1lOiAnZGF0ZVRpbWUnLFxuICAgIGRlZmVyOiAnZGVmZXInLFxuICAgIGRpcjogJ2RpcicsXG4gICAgZGlzYWJsZWQ6ICdkaXNhYmxlZCcsXG4gICAgZG93bmxvYWQ6ICdkb3dubG9hZCcsXG4gICAgZHJhZ2dhYmxlOiAnZHJhZ2dhYmxlJyxcbiAgICBlbmNUeXBlOiAnZW5jVHlwZScsXG4gICAgZm9ybTogJ2Zvcm0nLFxuICAgIGZvcm1BY3Rpb246ICdmb3JtQWN0aW9uJyxcbiAgICBmb3JtRW5jVHlwZTogJ2Zvcm1FbmNUeXBlJyxcbiAgICBmb3JtTWV0aG9kOiAnZm9ybU1ldGhvZCcsXG4gICAgZm9ybU5vVmFsaWRhdGU6ICdmb3JtTm9WYWxpZGF0ZScsXG4gICAgZm9ybVRhcmdldDogJ2Zvcm1UYXJnZXQnLFxuICAgIGZyYW1lQm9yZGVyOiAnZnJhbWVCb3JkZXInLFxuICAgIGhlYWRlcnM6ICdoZWFkZXJzJyxcbiAgICBoZWlnaHQ6ICdoZWlnaHQnLFxuICAgIGhpZGRlbjogJ2hpZGRlbicsXG4gICAgaGlnaDogJ2hpZ2gnLFxuICAgIGhyZWY6ICdocmVmJyxcbiAgICBocmVmTGFuZzogJ2hyZWZMYW5nJyxcbiAgICBodG1sRm9yOiAnZm9yJyxcbiAgICBodHRwRXF1aXY6ICdodHRwLWVxdWl2JyxcbiAgICBpY29uOiAnaWNvbicsXG4gICAgaW5wdXRNb2RlOiAnaW5wdXRNb2RlJyxcbiAgICBpczogJ2lzJyxcbiAgICBrZXlQYXJhbXM6ICdrZXlQYXJhbXMnLFxuICAgIGtleVR5cGU6ICdrZXlUeXBlJyxcbiAgICBsYWJlbDogJ2xhYmVsJyxcbiAgICBsYW5nOiAnbGFuZycsXG4gICAgbGlzdDogJ2xpc3QnLFxuICAgIGxvdzogJ2xvdycsXG4gICAgbWFuaWZlc3Q6ICdtYW5pZmVzdCcsXG4gICAgbWFyZ2luSGVpZ2h0OiAnbWFyZ2luSGVpZ2h0JyxcbiAgICBtYXJnaW5XaWR0aDogJ21hcmdpbldpZHRoJyxcbiAgICBtYXg6ICdtYXgnLFxuICAgIG1heExlbmd0aDogJ21heExlbmd0aCcsXG4gICAgbWVkaWE6ICdtZWRpYScsXG4gICAgbWVkaWFHcm91cDogJ21lZGlhR3JvdXAnLFxuICAgIG1ldGhvZDogJ21ldGhvZCcsXG4gICAgbWluOiAnbWluJyxcbiAgICBtaW5MZW5ndGg6ICdtaW5MZW5ndGgnLFxuICAgIG5hbWU6ICduYW1lJyxcbiAgICBub1ZhbGlkYXRlOiAnbm9WYWxpZGF0ZScsXG4gICAgb3BlbjogJ29wZW4nLFxuICAgIG9wdGltdW06ICdvcHRpbXVtJyxcbiAgICBwYXR0ZXJuOiAncGF0dGVybicsXG4gICAgcGxhY2Vob2xkZXI6ICdwbGFjZWhvbGRlcicsXG4gICAgcG9zdGVyOiAncG9zdGVyJyxcbiAgICBwcmVsb2FkOiAncHJlbG9hZCcsXG4gICAgcmFkaW9Hcm91cDogJ3JhZGlvR3JvdXAnLFxuICAgIHJlbDogJ3JlbCcsXG4gICAgcmVxdWlyZWQ6ICdyZXF1aXJlZCcsXG4gICAgcm9sZTogJ3JvbGUnLFxuICAgIHJvd3M6ICdyb3dzJyxcbiAgICByb3dTcGFuOiAncm93U3BhbicsXG4gICAgc2FuZGJveDogJ3NhbmRib3gnLFxuICAgIHNjb3BlOiAnc2NvcGUnLFxuICAgIHNjb3BlZDogJ3Njb3BlZCcsXG4gICAgc2Nyb2xsaW5nOiAnc2Nyb2xsaW5nJyxcbiAgICBzZWFtbGVzczogJ3NlYW1sZXNzJyxcbiAgICBzaGFwZTogJ3NoYXBlJyxcbiAgICBzaXplOiAnc2l6ZScsXG4gICAgc2l6ZXM6ICdzaXplcycsXG4gICAgc3BhbjogJ3NwYW4nLFxuICAgIHNwZWxsQ2hlY2s6ICdzcGVsbENoZWNrJyxcbiAgICBzcmM6ICdzcmMnLFxuICAgIHNyY1NldDogJ3NyY1NldCcsXG4gICAgc3RhcnQ6ICdzdGFydCcsXG4gICAgc3RlcDogJ3N0ZXAnLFxuICAgIHN0eWxlOiAnc3R5bGUnLFxuICAgIHRhYkluZGV4OiAndGFiSW5kZXgnLFxuICAgIHRhcmdldDogJ3RhcmdldCcsXG4gICAgdGl0bGU6ICd0aXRsZScsXG4gICAgdHlwZTogJ3R5cGUnLFxuICAgIHVzZU1hcDogJ3VzZU1hcCcsXG4gICAgd2lkdGg6ICd3aWR0aCcsXG4gICAgd21vZGU6ICd3bW9kZScsXG4gICAgYXV0b0NhcGl0YWxpemU6ICdhdXRvQ2FwaXRhbGl6ZScsXG4gICAgYXV0b0NvcnJlY3Q6ICdhdXRvQ29ycmVjdCcsXG4gICAgaXRlbVByb3A6ICdpdGVtUHJvcCcsXG4gICAgaXRlbVNjb3BlOiAnaXRlbVNjb3BlJyxcbiAgICBpdGVtVHlwZTogJ2l0ZW1UeXBlJyxcbiAgICBpdGVtSUQ6ICdpdGVtSUQnLFxuICAgIGl0ZW1SZWY6ICdpdGVtUmVmJyxcbiAgICBwcm9wZXJ0eTogJ3Byb3BlcnR5JyxcbiAgICBzZWN1cml0eTogJ3NlY3VyaXR5JyxcbiAgICB1bnNlbGVjdGFibGU6ICd1bnNlbGVjdGFibGUnLFxufTtcblxuZXhwb3J0IGxldCBwcm9wcyA9IHtcbiAgICBjaGVja2VkOiAnY2hlY2tlZCcsXG4gICAgY2xhc3NOYW1lOiAnY2xhc3NOYW1lJyxcbiAgICBjb250cm9sczogJ2NvbnRyb2xzJyxcbiAgICBpZDogJ2lkJyxcbiAgICBsb29wOiAnbG9vcCcsXG4gICAgbXVsdGlwbGU6ICdtdWx0aXBsZScsXG4gICAgbXV0ZWQ6ICdtdXRlZCcsXG4gICAgcmVhZE9ubHk6ICdyZWFkT25seScsXG4gICAgc2VsZWN0ZWQ6ICdzZWxlY3RlZCcsXG4gICAgc3JjRG9jOiAnc3JjZG9jJyxcbiAgICB2YWx1ZTogJ3ZhbHVlJ1xufTtcblxuZXhwb3J0IGxldCBub3RQeCA9IHtcbiAgICBib3hGbGV4OiB0cnVlLFxuICAgIGJveEZsZXhHcm91cDogdHJ1ZSxcbiAgICBjb2x1bW5Db3VudDogdHJ1ZSxcbiAgICBmaWxsT3BhY2l0eTogdHJ1ZSxcbiAgICBmbGV4OiB0cnVlLFxuICAgIGZsZXhHcm93OiB0cnVlLFxuICAgIGZsZXhQb3NpdGl2ZTogdHJ1ZSxcbiAgICBmbGV4U2hyaW5rOiB0cnVlLFxuICAgIGZsZXhOZWdhdGl2ZTogdHJ1ZSxcbiAgICBmb250V2VpZ2h0OiB0cnVlLFxuICAgIGxpbmVDbGFtcDogdHJ1ZSxcbiAgICBsaW5lSGVpZ2h0OiB0cnVlLFxuICAgIG9wYWNpdHk6IHRydWUsXG4gICAgb3JkZXI6IHRydWUsXG4gICAgb3JwaGFuczogdHJ1ZSxcbiAgICBzdHJva2VPcGFjaXR5OiB0cnVlLFxuICAgIHdpZG93czogdHJ1ZSxcbiAgICB6SW5kZXg6IHRydWUsXG4gICAgem9vbTogdHJ1ZVxufTtcblxuZXhwb3J0IGxldCBldmVudHMgPSB7XG4gICAgb25SZW5kZXI6IFwicmVuZGVyXCIsXG4gICAgb25DbGljazogKCgnb250b3VjaGVuZCcgaW4gd2luZG93KSkgPyAndG91Y2hlbmQnIDogJ2NsaWNrJyxcbiAgICBvbkRibENsaWNrOiAnZGJsY2xpY2snLFxuXG4gICAgb25Nb3VzZURvd246ICdtb3VzZWRvd24nLFxuICAgIG9uTW91c2VVcDogJ21vdXNldXAnLFxuICAgIG9uTW91c2VNb3ZlOiAnbW91c2Vtb3ZlJyxcbiAgICBvbk1vdXNlRW50ZXI6ICdtb3VzZWVudGVyJyxcbiAgICBvbk1vdXNlTGVhdmU6ICdtb3VzZWxlYXZlJyxcbiAgICBvbk1vdXNlT3ZlcjogJ21vdXNlb3ZlcicsXG4gICAgb25Nb3VzZU91dDogJ21vdXNlb3V0JyxcblxuICAgIG9uVG91Y2hTdGFydDogJ3RvdWNoc3RhcnQnLFxuICAgIG9uVG91Y2hFbmQ6ICd0b3VjaGVuZCcsXG4gICAgb25Ub3VjaE1vdmU6ICd0b3VjaG1vdmUnLFxuICAgIG9uVG91Y2hDYW5jZWw6ICd0b3VjaGNhbmNlbCcsXG4gICAgb25Ub3VjaExlYXZlOiAndG91Y2hsZWF2ZScsXG5cbiAgICBvbkNvbnRleHRNZW51OiAnY29udGV4dG1lbnUnLFxuXG4gICAgb25JbnB1dDogJ2lucHV0JyxcbiAgICBvbkZvY3VzOiAnZm9jdXMnLFxuICAgIG9uQ2hhbmdlOiAnY2hhbmdlJyxcblxuICAgIG9uS2V5RG93bjogJ2tleWRvd24nLFxuICAgIG9uS2V5UHJlc3M6ICdrZXlwcmVzcycsXG4gICAgb25LZXlVcDogJ2tleXVwJ1xufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2F0dHJzLmpzXG4gKiovIiwiaW1wb3J0IHtnZXRUZXh0Tm9kZSwgVkZyYWdtZW50Tm9kZX0gZnJvbSAnLi9ub2RlJztcblxuZXhwb3J0IGxldCBERUJVRyA9IGZhbHNlO1xuZXhwb3J0IGZ1bmN0aW9uIG5vcm1DaGlsZCh2ZG9tLCBpKSB7XG4gICAgaWYgKHZkb20uY2hpbGRyZW5baV0gJiYgdHlwZW9mIHZkb20uY2hpbGRyZW5baV0gPT0gJ29iamVjdCcgJiYgdmRvbS5jaGlsZHJlbltpXS50YWcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgY2hpbGQgPSB2ZG9tLmNoaWxkcmVuW2ldO1xuICAgIGlmICh0eXBlb2YgY2hpbGQgPT0gJ3N0cmluZycgfHwgdHlwZW9mIGNoaWxkID09ICdudW1iZXInKSB7XG4gICAgICAgIHZkb20uY2hpbGRyZW5baV0gPSBnZXRUZXh0Tm9kZShjaGlsZCk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGNoaWxkID09IG51bGwpIHtcbiAgICAgICAgdmRvbS5jaGlsZHJlbltpXSA9IGdldFRleHROb2RlKCcnKTtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGNoaWxkID09PSAnb2JqZWN0Jykge1xuICAgICAgICBpZiAoY2hpbGQgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgdmRvbS5jaGlsZHJlbltpXSA9IG5ldyBWRnJhZ21lbnROb2RlKCdtYXAnLCBudWxsLCBjaGlsZCwgbnVsbCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2ZG9tLmNoaWxkcmVuW2ldID0gZ2V0VGV4dE5vZGUoSlNPTi5zdHJpbmdpZnkoY2hpbGQpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgY2hpbGQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdmRvbS5jaGlsZHJlbltpXSA9IGdldFRleHROb2RlKCdGdW5jdGlvbicpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdmRvbS5jaGlsZHJlbltpXSA9IGdldFRleHROb2RlKCcnKTtcbiAgICB9XG4gICAgLy9yZXR1cm4gdmRvbS5jaGlsZHJlbltpXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEZpcnN0Q2hpbGQob2xkKSB7XG4gICAgdmFyIGJlZm9yZUNoaWxkID0gb2xkLmNoaWxkcmVuWzBdO1xuICAgIHdoaWxlIChiZWZvcmVDaGlsZCAmJiBiZWZvcmVDaGlsZC5mcmFnbWVudCkge1xuICAgICAgICBiZWZvcmVDaGlsZCA9IGJlZm9yZUNoaWxkLmNoaWxkcmVuWzBdO1xuICAgIH1cbiAgICByZXR1cm4gYmVmb3JlQ2hpbGQ7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy91dGlscy5qc1xuICoqLyIsInZhciBpZCA9IDE7XG5cbnZhciBwcm90byA9IHtcbiAgICB0ZXh0OiBudWxsLFxuICAgIGRvbTogbnVsbCxcbiAgICB0YWc6IG51bGwsXG4gICAgYXR0cnM6IG51bGwsXG4gICAgY2hpbGRyZW46IG51bGwsXG4gICAgYWxsQXR0cnM6IG51bGwsXG4gICAgZnJhZ21lbnQ6IGZhbHNlLFxuICAgIGNvbXBvbmVudDogbnVsbCxcbiAgICBrZXk6IG51bGwsXG4gICAga2V5TWFwOiBudWxsLFxuICAgIHZub2RlOiB0cnVlLFxuICAgIGlzTWFwOiBmYWxzZSxcbiAgICBkZXN0cm95ZWQ6IG51bGwsXG4gICAgZGVzdHJveTogZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5kb20gPT0gbnVsbCl7XG4gICAgICAgICAgICBkZWJ1Z2dlcjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZG9tID0gbnVsbDtcbiAgICAgICAgdGhpcy5jaGlsZHJlbiA9IG51bGw7XG4gICAgICAgIHRoaXMuYXR0cnMgPSBudWxsO1xuICAgICAgICAvL3RoaXMuZGVzdHJveWVkID0gdHJ1ZTtcbiAgICAgICAgLy90aGlzLnBhcmVudCA9IG51bGw7XG4gICAgfVxufTtcblxuZnVuY3Rpb24gY2xhc3NFeHRlbmQoQ2xhc3MsIHByb3RvLCBvdmVycmlkZXMpIHtcbiAgICBmb3IgKHZhciBwcm9wIGluIHByb3RvKSB7XG4gICAgICAgIENsYXNzLnByb3RvdHlwZVtwcm9wXSA9IHByb3RvW3Byb3BdO1xuICAgIH1cbiAgICBmb3IgKHByb3AgaW4gb3ZlcnJpZGVzKSB7XG4gICAgICAgIENsYXNzLnByb3RvdHlwZVtwcm9wXSA9IG92ZXJyaWRlc1twcm9wXTtcbiAgICB9XG59XG5cbi8vdmFyIGNhY2hlRnJhbWVudHMgPSBbXTtcbi8vdmFyIGNhY2hlQ29tcG9uZW50ID0gW107XG52YXIgY2FjaGVOb2RlID0gW107XG52YXIgY2FjaGVUZXh0Tm9kZSA9IFtdO1xuXG5cbmV4cG9ydCBmdW5jdGlvbiBWRnJhZ21lbnROb2RlKHRhZywgYXR0cnMsIGNoaWxkcmVuLCBrZXkpIHtcbiAgICB0aGlzLmlkID0gaWQrKztcbiAgICB0aGlzLnRhZyA9IHRhZztcbiAgICBpZiAodGFnID09ICdtYXAnKSB7XG4gICAgICAgIHRoaXMua2V5TWFwID0ge307XG4gICAgICAgIHRoaXMuaXNNYXAgPSB0cnVlO1xuICAgICAgICAvL3RvZG86XG4gICAgICAgIC8vdGhpcy5rZXkgPSBNYXRoLnJhbmRvbSgpO1xuICAgIH1cbiAgICB0aGlzLmNoaWxkcmVuID0gY2hpbGRyZW47XG4gICAgaWYgKGtleSkge1xuICAgICAgICB0aGlzLmtleSA9IGtleTtcbiAgICB9XG4gICAgLy90aGlzLnBhcmVudCA9IG51bGw7XG4gICAgdGhpcy5kb20gPSBudWxsO1xuICAgIHRoaXMuYXR0cnMgPSBhdHRycztcbn1cbmNsYXNzRXh0ZW5kKFZGcmFnbWVudE5vZGUsIHByb3RvLCB7XG4gICAgZnJhZ21lbnQ6IHRydWUsXG4gICAgZGVzdHJveTogZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5kb20gPT0gbnVsbCl7XG4gICAgICAgICAgICBkZWJ1Z2dlcjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRvbSA9IG51bGw7XG4gICAgICAgIHRoaXMuY2hpbGRyZW4gPSBudWxsO1xuICAgICAgICAvL3RoaXMuYXR0cnMgPSBudWxsO1xuICAgICAgICB0aGlzLmtleU1hcCA9IG51bGw7XG4gICAgICAgIC8vdGhpcy5kZXN0cm95ZWQgPSB0cnVlO1xuICAgICAgICAvL3RoaXMucGFyZW50ID0gbnVsbDtcbiAgICB9XG59KTtcblxuXG5leHBvcnQgZnVuY3Rpb24gVkNvbXBvbmVudCh0YWcsIGF0dHJzLCBjaGlsZHJlbiwga2V5KSB7XG4gICAgLy9vYmplY3RzLnB1c2godGhpcyk7XG4gICAgdGhpcy5pZCA9IGlkKys7XG4gICAgdGhpcy50YWcgPSB0YWc7XG4gICAgdGhpcy5jaGlsZHJlbiA9IGNoaWxkcmVuO1xuICAgIHRoaXMuZnJhZ21lbnQgPSB0cnVlO1xuICAgIGlmIChrZXkpIHtcbiAgICAgICAgdGhpcy5rZXkgPSBrZXk7XG4gICAgfVxuICAgIC8vdGhpcy5wYXJlbnQgPSBudWxsO1xuICAgIHRoaXMuZG9tID0gbnVsbDtcbiAgICB0aGlzLmF0dHJzID0gYXR0cnM7XG4gICAgLy90aGlzLmRlc3Ryb3llZCA9IG51bGw7XG4gICAgLy90aGlzLmRlc3Ryb3llZCA9IG51bGw7XG59XG5jbGFzc0V4dGVuZChWQ29tcG9uZW50LCBwcm90bywge2ZyYWdtZW50OiB0cnVlfSk7XG5cblxudmFyIG5vZGVzQ2FjaGUgPSBuZXcgQXJyYXkoMTAwMDAwMCk7XG5ub2Rlc0NhY2hlLmxlbiA9IDA7XG5cbmZ1bmN0aW9uIE5Ob2RlKHRhZywgYXR0cnMsIGNoaWxkcmVuLCBrZXksIHRleHQpIHtcbiAgICAvL29iamVjdHMucHVzaCh0aGlzKTtcbiAgICB0aGlzLmlkID0gaWQrKztcbiAgICB0aGlzLnRhZyA9IHRhZztcbiAgICB0aGlzLmF0dHJzID0gYXR0cnM7XG4gICAgdGhpcy5jaGlsZHJlbiA9IGNoaWxkcmVuO1xuICAgIGlmICh0ZXh0KSB7XG4gICAgICAgIHRoaXMudGV4dCA9IHRleHQ7XG4gICAgfVxuICAgIHRoaXMuYWxsQXR0cnMgPSAnJztcbiAgICB0aGlzLmtleSA9IGtleTtcbiAgICB0aGlzLmRvbSA9IG51bGw7XG4gICAgLy90aGlzLnBhcmVudCA9IG51bGw7XG4gICAgLy90aGlzLmRlc3Ryb3llZCA9IG51bGw7XG59XG5jbGFzc0V4dGVuZChOTm9kZSwgcHJvdG8sIHtcbiAgICBkZXN0cm95OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLmRvbSA9PSBudWxsKXtcbiAgICAgICAgICAgIGRlYnVnZ2VyO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZG9tID0gbnVsbDtcbiAgICAgICAgdGhpcy5jaGlsZHJlbiA9IG51bGw7XG4gICAgICAgIHRoaXMuYXR0cnMgPSBudWxsO1xuICAgICAgICAvL25vZGVzQ2FjaGVbbm9kZXNDYWNoZS5sZW4rK10gPSB0aGlzO1xuICAgICAgICAvL3RoaXMuZGVzdHJveWVkID0gdHJ1ZTtcbiAgICAgICAgLy90aGlzLnBhcmVudCA9IG51bGw7XG4gICAgfVxufSk7XG5leHBvcnQgZnVuY3Rpb24gZ2V0Tk5vZGUodGFnLCBhdHRycywgY2hpbGRyZW4sIGtleSwgdGV4dCkge1xuICAgIGlmIChub2Rlc0NhY2hlLmxlbiA9PSAwKSB7XG4gICAgICAgIHJldHVybiBuZXcgTk5vZGUodGFnLCBhdHRycywgY2hpbGRyZW4sIGtleSwgdGV4dCk7XG4gICAgfVxuICAgIHZhciBpdGVtID0gbm9kZXNDYWNoZVstLW5vZGVzQ2FjaGUubGVuXTtcbiAgICBpdGVtLnRhZyA9IHRhZztcbiAgICBpdGVtLmF0dHJzID0gYXR0cnM7XG4gICAgaXRlbS5jaGlsZHJlbiA9IGNoaWxkcmVuO1xuICAgIGl0ZW0ua2V5ID0ga2V5O1xuICAgIC8vaXRlbS50ZXh0ID0gdGV4dDtcbiAgICByZXR1cm4gaXRlbTtcbn1cblxuXG52YXIgdGV4dE5vZGVzQ2FjaGUgPSBuZXcgQXJyYXkoMTAwMDAwMCk7XG50ZXh0Tm9kZXNDYWNoZS5sZW4gPSAwO1xuXG5mdW5jdGlvbiBWVGV4dE5vZGUodGV4dCkge1xuICAgIHRoaXMuaWQgPSBpZCsrO1xuICAgIHRoaXMuZG9tID0gbnVsbDtcbiAgICB0aGlzLnRleHQgPSB0ZXh0O1xuICAgIC8vdGhpcy5wYXJlbnQgPSBudWxsO1xuICAgIC8vdGhpcy5kZXN0cm95ZWQgPSBudWxsO1xufVxuY2xhc3NFeHRlbmQoVlRleHROb2RlLCBwcm90bywge1xuICAgIHRhZzogJyMnLFxuICAgIGRlc3Ryb3k6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuZG9tID09IG51bGwpe1xuICAgICAgICAgICAgZGVidWdnZXI7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kb20gPSBudWxsO1xuICAgICAgICB0ZXh0Tm9kZXNDYWNoZVt0ZXh0Tm9kZXNDYWNoZS5sZW4rK10gPSB0aGlzO1xuICAgICAgICAvL3RoaXMuZGVzdHJveWVkID0gdHJ1ZTtcbiAgICAgICAgLy90aGlzLnBhcmVudCA9IG51bGw7XG4gICAgfVxufSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRUZXh0Tm9kZSh0ZXh0KSB7XG4gICAgaWYgKHRleHROb2Rlc0NhY2hlLmxlbiA9PSAwKSB7XG4gICAgICAgIHJldHVybiBuZXcgVlRleHROb2RlKHRleHQpO1xuICAgIH1cbiAgICB2YXIgaXRlbSA9IHRleHROb2Rlc0NhY2hlWy0tdGV4dE5vZGVzQ2FjaGUubGVuXTtcbiAgICBpdGVtLnRleHQgPSB0ZXh0O1xuICAgIHJldHVybiBpdGVtO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvbm9kZS5qc1xuICoqLyIsIi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tIFRoZSBMaWZlLUN5Y2xlIG9mIGEgQ29tcG9zaXRlIENvbXBvbmVudCAtLS0tLS0tLS0tLS0tLS0tLS1cbiAqXG4gKiArIGNvbnN0cnVjdG9yOiBJbml0aWFsaXphdGlvbiBvZiBzdGF0ZS4gVGhlIGluc3RhbmNlIGlzIG5vdyByZXRhaW5lZC5cbiAqICAgKyBjb21wb25lbnRXaWxsTW91bnRcbiAqICAgKyByZW5kZXJcbiAqICAgKyBbY2hpbGRyZW4ncyBjb25zdHJ1Y3RvcnNdXG4gKiAgICAgKyBbY2hpbGRyZW4ncyBjb21wb25lbnRXaWxsTW91bnQgYW5kIHJlbmRlcl1cbiAqICAgICArIFtjaGlsZHJlbidzIGNvbXBvbmVudERpZE1vdW50XVxuICogICAgICsgY29tcG9uZW50RGlkTW91bnRcbiAqXG4gKiAgICAgICBVcGRhdGUgUGhhc2VzOlxuICogICAgICAgKyBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzIChvbmx5IGNhbGxlZCBpZiBwYXJlbnQgdXBkYXRlZClcbiAqICAgICAgIC0gc2hvdWxkQ29tcG9uZW50VXBkYXRlXG4gKiAgICAgICAgICsgY29tcG9uZW50V2lsbFVwZGF0ZVxuICogICAgICAgICAgICsgcmVuZGVyXG4gKiAgICAgICAgICAgKyBbY2hpbGRyZW4ncyBjb25zdHJ1Y3RvcnMgb3IgcmVjZWl2ZSBwcm9wcyBwaGFzZXNdXG4gKiAgICAgICAgICsgY29tcG9uZW50RGlkVXBkYXRlXG4gKlxuICogICAgICsgY29tcG9uZW50V2lsbFVubW91bnRcbiAqICAgICArIFtjaGlsZHJlbidzIGNvbXBvbmVudFdpbGxVbm1vdW50XVxuICogICAtIFtjaGlsZHJlbiBkZXN0cm95ZWRdXG4gKiAtIChkZXN0cm95ZWQpOiBUaGUgaW5zdGFuY2UgaXMgbm93IGJsYW5rLCByZWxlYXNlZCBieSBSZWFjdCBhbmQgcmVhZHkgZm9yIEdDLlxuICpcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cbmltcG9ydCB7dXBkYXRlQ2hpbGRyZW4sIHVwZGF0ZURvbX0gZnJvbSAnLi91cGRhdGUnO1xuaW1wb3J0IHtWQ29tcG9uZW50LCBWRnJhZ21lbnROb2RlfSBmcm9tICcuL25vZGUnO1xuaW1wb3J0IHtERUJVR30gZnJvbSAnLi91dGlscyc7XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGZpbmRET01Ob2RlKHZkb20pIHtcbiAgICByZXR1cm4gdmRvbS5kb207XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBDb21wb25lbnQocHJvcHMpIHtcbiAgICB0aGlzLnByb3BzID0gcHJvcHM7XG59XG5cbkNvbXBvbmVudC5wcm90b3R5cGUuY29tcG9uZW50V2lsbE1vdW50ID0gZnVuY3Rpb24gKCkge307XG5Db21wb25lbnQucHJvdG90eXBlLmNvbXBvbmVudERpZE1vdW50ID0gZnVuY3Rpb24gKCkge307XG5cbkNvbXBvbmVudC5wcm90b3R5cGUuY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyA9IGZ1bmN0aW9uICgpIHt9O1xuQ29tcG9uZW50LnByb3RvdHlwZS5jb21wb25lbnRXaWxsVXBkYXRlID0gZnVuY3Rpb24gKCkge307XG5Db21wb25lbnQucHJvdG90eXBlLmNvbXBvbmVudERpZFVwZGF0ZSA9IGZ1bmN0aW9uICgpIHt9O1xuXG5Db21wb25lbnQucHJvdG90eXBlLmNvbXBvbmVudFdpbGxVbm1vdW50ID0gZnVuY3Rpb24gKCkge307XG5cbkNvbXBvbmVudC5wcm90b3R5cGUuZm9yY2VVcGRhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy51cGRhdGVQcm9wcyh0aGlzLnByb3BzKTtcbn07XG5cbkNvbXBvbmVudC5wcm90b3R5cGUudXBkYXRlUHJvcHMgPSBmdW5jdGlvbiAocHJvcHMpIHtcbiAgICB0aGlzLmNvbXBvbmVudFdpbGxVcGRhdGUocHJvcHMpO1xuICAgIC8vdmFyIG9sZFByb3BzID0gdGhpcy5wcm9wcztcbiAgICB0aGlzLnByb3BzID0gcHJvcHM7XG4gICAgdmFyIG5ld05vZGUgPSBuZXcgVkNvbXBvbmVudCh0aGlzLmNvbnN0cnVjdG9yLCBudWxsLCBbdGhpcy5yZW5kZXIoKV0sIG51bGwpO1xuICAgIHVwZGF0ZURvbSh0aGlzLm5vZGUsIG5ld05vZGUpO1xuICAgIHVwZGF0ZUNoaWxkcmVuKHRoaXMubm9kZSwgbmV3Tm9kZSk7XG4gICAgdGhpcy5ub2RlLmNoaWxkcmVuID0gbmV3Tm9kZS5jaGlsZHJlbjtcbiAgICAvL3RvZG86Y29tcG9uZW50RGlkVXBkYXRlKG9iamVjdCBwcmV2UHJvcHMsIG9iamVjdCBwcmV2U3RhdGUpXG4gICAgdGhpcy5jb21wb25lbnREaWRVcGRhdGUodGhpcy5wcm9wcyk7XG59O1xuXG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVDb21wb25lbnQob2xkLCB2ZG9tKSB7XG4gICAgdmRvbS5jb21wb25lbnQgPSBvbGQuY29tcG9uZW50O1xuICAgIHZhciBwcm9wcyA9IHZkb20uYXR0cnMgfHwge307XG4gICAgcHJvcHMuY2hpbGRyZW4gPSB2ZG9tLmNoaWxkcmVuID8gbmV3IFZGcmFnbWVudE5vZGUoJ0AnLCBudWxsLCB2ZG9tLmNoaWxkcmVuKSA6IG51bGw7XG4gICAgdmRvbS5jb21wb25lbnQuY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhwcm9wcyk7XG4gICAgdmRvbS5jb21wb25lbnQudXBkYXRlUHJvcHMocHJvcHMpO1xuICAgIC8vdmRvbS5jaGlsZHJlbiA9IHZkb20uY29tcG9uZW50Lm5vZGUuY2hpbGRyZW47XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVDb21wb25lbnQodmRvbSkge1xuICAgIHZhciBwcm9wcyA9IHZkb20uYXR0cnMgfHwge307XG4gICAgcHJvcHMuY2hpbGRyZW4gPSB2ZG9tLmNoaWxkcmVuO1xuICAgIHZkb20uY29tcG9uZW50ID0gbmV3IHZkb20udGFnKHByb3BzKTtcbiAgICB2ZG9tLmNvbXBvbmVudC5jb21wb25lbnRXaWxsTW91bnQoKTtcbiAgICB2ZG9tLmNoaWxkcmVuID0gW3Zkb20uY29tcG9uZW50LnJlbmRlcigpXTtcbiAgICB2ZG9tLmNvbXBvbmVudC5ub2RlID0gdmRvbTtcbiAgICBERUJVRyAmJiBjb25zb2xlLmxvZyh2ZG9tKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlc3Ryb3lDb21wb25lbnQodmRvbSkge1xuICAgIHZkb20uY29tcG9uZW50LmNvbXBvbmVudFdpbGxVbm1vdW50KCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtb3VudENvbXBvbmVudCh2ZG9tKSB7XG4gICAgdmRvbS5jb21wb25lbnQuY29tcG9uZW50RGlkTW91bnQoKTtcbn1cblxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvY29tcG9uZW50LmpzXG4gKiovIiwiaW1wb3J0IHthdHRycywgcHJvcHMsIGV2ZW50c30gZnJvbSAnLi9hdHRycyc7XG5pbXBvcnQge3VwZGF0ZUNvbXBvbmVudCwgZGVzdHJveUNvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnQnO1xuaW1wb3J0IHtub3JtQ2hpbGQsIGdldEZpcnN0Q2hpbGQsIERFQlVHfSBmcm9tICcuL3V0aWxzJztcbmltcG9ydCB7Y3JlYXRlfSBmcm9tICcuL2NyZWF0ZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVEb20ob2xkLCB2ZG9tKSB7XG4gICAgb2xkLmRvbS51cGRhdGVkID0gdHJ1ZTtcbiAgICB2ZG9tLmRvbSA9IG9sZC5kb207XG59XG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlKG9sZCwgdmRvbSkge1xuICAgIERFQlVHICYmIGNvbnNvbGUubG9nKFwidXBkYXRlXCIsIHZkb20pO1xuICAgIHVwZGF0ZURvbShvbGQsIHZkb20pO1xuICAgIHZhciBkb20gPSBvbGQuZG9tO1xuXG4gICAgLy92ZG9tLnBhcmVudCA9IG9sZC5wYXJlbnQ7XG4gICAgaWYgKG9sZC50YWcgIT09IHZkb20udGFnKSB7XG4gICAgICAgIHJldHVybiByZXBsYWNlTm9kZShvbGQsIHZkb20pO1xuICAgIH1cbiAgICBpZiAob2xkLnRhZyA9PSAnIycpIHtcbiAgICAgICAgaWYgKG9sZC50ZXh0ICE9PSB2ZG9tLnRleHQpIHtcbiAgICAgICAgICAgIGRvbS50ZXh0Q29udGVudCA9IHZkb20udGV4dDtcbiAgICAgICAgfVxuICAgICAgICBvbGQuZGVzdHJveSgpO1xuICAgICAgICByZXR1cm4gdmRvbTtcbiAgICB9XG4gICAgaWYgKG9sZC50ZXh0ICE9PSB2ZG9tLnRleHQpIHtcbiAgICAgICAgZG9tLnRleHRDb250ZW50ID0gdmRvbS50ZXh0O1xuICAgIH1cblxuICAgIGlmICh2ZG9tLmZyYWdtZW50KSB7XG4gICAgICAgIGlmICh2ZG9tLmtleSAhPT0gb2xkLmtleSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlcGxhY2VOb2RlKG9sZCwgdmRvbSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHZkb20uYWxsQXR0cnMgPSAnJztcbiAgICAgICAgaWYgKHZkb20uYXR0cnMgJiYgb2xkLmF0dHJzKSB7XG4gICAgICAgICAgICBmb3JBdHRycyhvbGQsIHZkb20pO1xuICAgICAgICB9XG4gICAgICAgIGlmICgob2xkLmF0dHJzICYmICF2ZG9tLmF0dHJzKSB8fCAoIW9sZC5hdHRycyAmJiB2ZG9tLmF0dHJzKSB8fCBvbGQuYWxsQXR0cnMgIT09IHZkb20uYWxsQXR0cnMpIHtcbiAgICAgICAgICAgIHJldHVybiByZXBsYWNlTm9kZShvbGQsIHZkb20pO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChvbGQuY29tcG9uZW50KSB7XG4gICAgICAgIHVwZGF0ZUNvbXBvbmVudChvbGQsIHZkb20pO1xuICAgICAgICByZXR1cm4gdmRvbTtcbiAgICB9XG5cbiAgICBpZiAoIXZkb20udGV4dCkge1xuICAgICAgICB1cGRhdGVDaGlsZHJlbihvbGQsIHZkb20pO1xuICAgIH1cbiAgICBvbGQuZGVzdHJveSgpO1xuICAgIHJldHVybiB2ZG9tO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlQ2hpbGRyZW4ob2xkLCB2ZG9tKSB7XG4gICAgdmFyIG9sZExlbiA9IG9sZC5jaGlsZHJlbiA/IG9sZC5jaGlsZHJlbi5sZW5ndGggOiAwO1xuICAgIHZhciBuZXdMZW4gPSB2ZG9tLmNoaWxkcmVuID8gdmRvbS5jaGlsZHJlbi5sZW5ndGggOiAwO1xuICAgIGlmIChvbGRMZW4gJiYgbmV3TGVuICYmIHZkb20uaXNNYXAgJiYgb2xkLmlzTWFwKSB7XG4gICAgICAgIG1hcENoaWxkcmVuKG9sZCwgdmRvbSwgZ2V0Rmlyc3RDaGlsZChvbGQpKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChvbGRMZW4gPiAwKSB7XG4gICAgICAgIGlmIChvbGRMZW4gPT09IG5ld0xlbikge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBuZXdMZW47IGkrKykge1xuICAgICAgICAgICAgICAgIG5vcm1DaGlsZCh2ZG9tLCBpKTtcbiAgICAgICAgICAgICAgICB2ZG9tLmNoaWxkcmVuW2ldID0gdXBkYXRlKG9sZC5jaGlsZHJlbltpXSwgdmRvbS5jaGlsZHJlbltpXSk7XG4gICAgICAgICAgICAgICAgLy9jbGVhckNoaWxkKG9sZCwgaSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbmV3TGVuOyBpKyspIHtcbiAgICAgICAgICAgICAgICBub3JtQ2hpbGQodmRvbSwgaSk7XG4gICAgICAgICAgICAgICAgdmFyIG5ld0NoaWxkID0gdmRvbS5jaGlsZHJlbltpXTtcbiAgICAgICAgICAgICAgICBjcmVhdGUobmV3Q2hpbGQsIHZkb20uZG9tKTtcbiAgICAgICAgICAgICAgICBpbnNlcnQob2xkLmRvbSwgbmV3Q2hpbGQsIGdldEZpcnN0Q2hpbGQob2xkKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgb2xkTGVuOyBpKyspIHtcbiAgICAgICAgICAgICAgICByZW1vdmUob2xkLmNoaWxkcmVuW2ldKTtcbiAgICAgICAgICAgICAgICAvL2NsZWFyQ2hpbGQob2xkLCBpKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKG5ld0xlbiA+IDApIHtcbiAgICAgICAgcmV0dXJuIHJlcGxhY2VDaGlsZHJlbihvbGQsIHZkb20pO1xuICAgIH1cbn1cblxuXG5mdW5jdGlvbiBtYXBDaGlsZHJlbihvbGQsIHZkb20sIGJlZm9yZUNoaWxkKSB7XG4gICAgdmFyIHBhcmVudERvbSA9IG9sZC5kb207XG4gICAgdmFyIGtleU1hcCA9IG9sZC5rZXlNYXA7XG4gICAgdmFyIG5ld0tleU1hcCA9IHZkb20ua2V5TWFwO1xuICAgIHZhciBuZXdDaGlsZHJlbiA9IHZkb20uY2hpbGRyZW47XG4gICAgdmFyIG5ld0xlbiA9IG5ld0NoaWxkcmVuLmxlbmd0aDtcbiAgICB2YXIgb2xkTGVuID0gb2xkLmNoaWxkcmVuLmxlbmd0aDtcbiAgICB2YXIgZm91bmQgPSAwO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbmV3TGVuOyBpKyspIHtcbiAgICAgICAgbm9ybUNoaWxkKHZkb20sIGkpO1xuICAgICAgICB2YXIgbmV3Q2hpbGQgPSBuZXdDaGlsZHJlbltpXTtcbiAgICAgICAgdmFyIG9sZENoaWxkID0gb2xkLmNoaWxkcmVuW2ldO1xuICAgICAgICB2YXIgbmV3S2V5ID0gbmV3Q2hpbGQua2V5O1xuICAgICAgICBpZiAobmV3S2V5ID09IG51bGwpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignbWFwIHdpdGhvdXQga2V5cycsIHZkb20pO1xuICAgICAgICAgICAgZGVidWdnZXI7XG4gICAgICAgICAgICByZXR1cm4gcmVwbGFjZUNoaWxkcmVuKG9sZCwgdmRvbSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGtleUNoaWxkID0gb2xkLmNoaWxkcmVuW2tleU1hcFtuZXdLZXldXTtcbiAgICAgICAgaWYgKGtleUNoaWxkKSB7XG4gICAgICAgICAgICBmb3VuZCsrO1xuICAgICAgICAgICAgaWYgKGtleUNoaWxkICE9PSBvbGRDaGlsZCkge1xuICAgICAgICAgICAgICAgIGluc2VydChwYXJlbnREb20sIGtleUNoaWxkLCBiZWZvcmVDaGlsZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBuZXdDaGlsZHJlbltpXSA9IHVwZGF0ZShrZXlDaGlsZCwgbmV3Q2hpbGQpO1xuICAgICAgICAgICAgaWYgKGtleUNoaWxkID09IG9sZENoaWxkKSB7XG4gICAgICAgICAgICAgICAgY2xlYXJDaGlsZChvbGQsIGkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAga2V5TWFwW25ld0tleV0gPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY3JlYXRlKG5ld0NoaWxkLCB2ZG9tLmRvbSk7XG4gICAgICAgICAgICBpbnNlcnQocGFyZW50RG9tLCBuZXdDaGlsZCwgYmVmb3JlQ2hpbGQpO1xuICAgICAgICB9XG4gICAgICAgIGJlZm9yZUNoaWxkID0gbmV3Q2hpbGQuZG9tLm5leHRTaWJsaW5nO1xuICAgICAgICBuZXdLZXlNYXBbbmV3S2V5XSA9IGk7XG4gICAgfVxuICAgIC8vb2xkLmtleU1hcCA9IG51bGw7XG5cbiAgICBpZiAoZm91bmQgIT09IG9sZExlbikge1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgb2xkTGVuOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBjaGlsZCA9IG9sZC5jaGlsZHJlbltpXTtcbiAgICAgICAgICAgIGlmIChjaGlsZCAmJiBuZXdLZXlNYXBbY2hpbGQua2V5XSA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmVtb3ZlKGNoaWxkKTtcbiAgICAgICAgICAgICAgICBjbGVhckNoaWxkKG9sZCwgaSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIHJlcGxhY2VOb2RlKG9sZCwgdmRvbSkge1xuICAgIHZhciBwYXJlbnREb20gPSBvbGQuZnJhZ21lbnQgPyBvbGQuZG9tIDogb2xkLmRvbS5wYXJlbnROb2RlO1xuICAgIGNyZWF0ZSh2ZG9tLCBwYXJlbnREb20pO1xuICAgIGluc2VydChwYXJlbnREb20sIHZkb20sIG9sZC5mcmFnbWVudCA/IGdldEZpcnN0Q2hpbGQob2xkKSA6IG9sZCk7XG4gICAgcmVtb3ZlKG9sZCk7XG4gICAgcmV0dXJuIHZkb207XG59XG5cbmZ1bmN0aW9uIHJlcGxhY2VDaGlsZHJlbihvbGQsIHZkb20pIHtcbiAgICBpZiAodmRvbS5jaGlsZHJlbil7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdmRvbS5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbm9ybUNoaWxkKHZkb20sIGkpO1xuICAgICAgICAgICAgdmFyIGNoaWxkID0gdmRvbS5jaGlsZHJlbltpXTtcbiAgICAgICAgICAgIGNyZWF0ZShjaGlsZCwgdmRvbS5kb20pO1xuICAgICAgICAgICAgaW5zZXJ0KHZkb20uZG9tLCBjaGlsZCwgdmRvbS5mcmFnbWVudCA/IHZkb20uZmlyc3ROb2RlIDogbnVsbCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAob2xkLmNoaWxkcmVuKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgb2xkLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgY2hpbGQgPSBvbGQuY2hpbGRyZW5baV07XG4gICAgICAgICAgICByZW1vdmUoY2hpbGQpO1xuICAgICAgICAgICAgY2hpbGQuZGVzdHJveSgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB2ZG9tO1xufVxuXG5mdW5jdGlvbiBmb3JBdHRycyhvbGQsIHZkb20pIHtcbiAgICB2YXIgYXR0cjtcbiAgICB2YXIgaXNOb3RTYW1lO1xuICAgIHZhciBkb20gPSB2ZG9tLmRvbTtcbiAgICBmb3IgKHZhciBhdHRyTmFtZSBpbiB2ZG9tLmF0dHJzKSB7XG4gICAgICAgIHZkb20uYWxsQXR0cnMgKz0gYXR0ck5hbWU7XG4gICAgICAgIHZhciBhdHRyVmFsID0gdmRvbS5hdHRyc1thdHRyTmFtZV07XG4gICAgICAgIGlmIChhdHRyTmFtZSA9PSAna2V5Jykge31cbiAgICAgICAgZWxzZSBpZiAoKGlzTm90U2FtZSA9IHZkb20uYXR0cnNbYXR0ck5hbWVdICE9PSBvbGQuYXR0cnNbYXR0ck5hbWVdKSAmJiAoYXR0ciA9IHByb3BzW2F0dHJOYW1lXSkpIHtcbiAgICAgICAgICAgIGRvbVthdHRyXSA9IGF0dHJWYWw7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoKGF0dHIgPSBhdHRyc1thdHRyTmFtZV0pICYmIGlzTm90U2FtZSkge1xuICAgICAgICAgICAgaWYgKGF0dHJWYWwgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgZG9tLnJlbW92ZUF0dHJpYnV0ZShhdHRyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGRvbS5zZXRBdHRyaWJ1dGUoYXR0ciwgYXR0clZhbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoYXR0ciA9IGV2ZW50c1thdHRyTmFtZV0gJiYgaXNOb3RTYW1lKSB7XG4gICAgICAgICAgICBkb21bJ29uJyArIGF0dHJdID0gYXR0clZhbDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChhdHRyTmFtZVswXSA9PT0gJ28nICYmIGF0dHJOYW1lWzFdID09PSAnbicgJiYgaXNOb3RTYW1lKSB7XG4gICAgICAgICAgICBhdHRyID0gYXR0ck5hbWUuc3Vic3RyaW5nKDIpLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICBkb21bJ29uJyArIGF0dHJdID0gYXR0clZhbDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChhdHRyTmFtZVswXSA9PT0gJ2QnICYmIGF0dHJOYW1lWzFdID09PSAnYScgJiYgYXR0ck5hbWVbMl0gPT09ICd0JyAmJiBhdHRyTmFtZVszXSA9PT0gJ2EnICYmIGlzTm90U2FtZSkge1xuICAgICAgICAgICAgaWYgKGF0dHJWYWwgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgZG9tLnJlbW92ZUF0dHJpYnV0ZShhdHRyTmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBkb20uc2V0QXR0cmlidXRlKGF0dHJOYW1lLCBhdHRyVmFsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChhdHRyTmFtZSA9PT0gJ3JlZicgJiYgdHlwZW9mIGF0dHJWYWwgPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgYXR0clZhbCh2ZG9tKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gaW5zZXJ0KHBhcmVudERvbSwgdmRvbSwgYmVmb3JlKSB7XG4gICAgaWYgKHZkb20uZnJhZ21lbnQpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB2ZG9tLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpbnNlcnQodmRvbS5kb20sIHZkb20uY2hpbGRyZW5baV0sIGJlZm9yZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBERUJVRyAmJiBjb25zb2xlLmxvZyhcIkluc2VydFwiLCB2ZG9tKTtcbiAgICBwYXJlbnREb20uaW5zZXJ0QmVmb3JlKHZkb20uZG9tLCBiZWZvcmUgJiYgYmVmb3JlLmRvbSk7XG59XG5cblxuZnVuY3Rpb24gY2xlYXJDaGlsZChvbGQsIGkpIHtcbiAgICAvL29sZC5jaGlsZHJlbltpXSA9IG51bGw7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmUob2xkKSB7XG4gICAgREVCVUcgJiYgY29uc29sZS5sb2coXCJyZW1vdmVcIiwgb2xkKTtcblxuICAgIGlmIChvbGQuY29tcG9uZW50KSB7XG4gICAgICAgIGRlc3Ryb3lDb21wb25lbnQob2xkKTtcbiAgICB9XG4gICAgaWYgKG9sZC5jaGlsZHJlbikge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9sZC5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgcmVtb3ZlKG9sZC5jaGlsZHJlbltpXSk7XG4gICAgICAgICAgICBjbGVhckNoaWxkKG9sZCwgaSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKCFvbGQuZnJhZ21lbnQpIHtcbiAgICAgICAgb2xkLmRvbS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG9sZC5kb20pO1xuICAgIH1cbiAgICBvbGQuZGVzdHJveSgpO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdXBkYXRlLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==