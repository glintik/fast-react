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
	    vdom.children = null;
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
	        if (vdom.id === 1096) {
	            debugger;
	        }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZDk2NDkxMzgzNzk2OTE2MjEzMWUiLCJ3ZWJwYWNrOi8vLy4vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Zhc3QtcmVhY3QuanM/N2RjOSIsIndlYnBhY2s6Ly8vLi9zcmMvZmFzdC1yZWFjdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY3JlYXRlLmpzIiwid2VicGFjazovLy8uL3NyYy9hdHRycy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL25vZGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXBkYXRlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7QUN0Q0EsT0FBTSxDQUFDLE9BQU8sR0FBRyxtQkFBTyxDQUFDLENBQXNDLENBQUMsQzs7Ozs7O0FDQWhFLDJHQUFrSyxFOzs7Ozs7Ozs7Ozs7O21DQ0F4RyxDQUFVOzs7OztvQkFBM0QsTUFBTTs7Ozs7O29CQUFFLGFBQWE7Ozs7OztvQkFBRSxrQkFBa0I7Ozs7c0NBQ1gsQ0FBYTs7Ozs7dUJBQTNDLFNBQVM7Ozs7Ozt1QkFBRSxXQUFXOzs7O21DQUNSLENBQVU7Ozs7O29CQUF4QixNQUFNOzs7Ozs7Ozs7Ozs7O1NDR0MsTUFBTSxHQUFOLE1BQU07U0FRTixNQUFNLEdBQU4sTUFBTTtTQXdGTixrQkFBa0IsR0FBbEIsa0JBQWtCO1NBZ0JsQixhQUFhLEdBQWIsYUFBYTs7a0NBckhNLENBQVM7O2tDQUNiLENBQVM7O2lDQUNVLENBQVE7O3NDQUNaLENBQWE7O0FBRXBELFVBQVMsTUFBTSxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUU7QUFDOUIsUUFBRyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDbkMsU0FBSSxJQUFJLENBQUMsU0FBUyxFQUFFO0FBQ2hCLHdCQUxpQixjQUFjLEVBS2hCLElBQUksQ0FBQyxDQUFDO01BQ3hCO0FBQ0QsWUFBTyxJQUFJLENBQUM7RUFDZjs7QUFFTSxVQUFTLE1BQU0sQ0FBQyxJQUFJLEVBQUUsU0FBUyxFQUFFO0FBQ3BDLFlBYkksS0FBSyxJQWFBLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDOztBQUVyQyxTQUFJLElBQUksQ0FBQyxHQUFHLElBQUksR0FBRyxFQUFFO0FBQ2pCLGFBQUksQ0FBQyxHQUFHLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7O0FBRTlDLGdCQUFPLElBQUksQ0FBQyxHQUFHLENBQUM7TUFDbkI7QUFDRCxTQUFJLEdBQUcsQ0FBQztBQUNSLFNBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtBQUNmLGFBQUksT0FBTyxJQUFJLENBQUMsR0FBRyxLQUFLLFVBQVUsRUFBRTtBQUNoQyw0QkFyQkosZUFBZSxFQXFCSyxJQUFJLENBQUMsQ0FBQztVQUN6QjtBQUNELFlBQUcsR0FBRyxRQUFRLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztBQUN4QyxhQUFJLENBQUMsR0FBRyxHQUFHLFNBQVMsQ0FBQztNQUN4QixNQUNJO0FBQ0QsWUFBRyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3ZDLGFBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDOztNQUVsQjs7QUFFRCxTQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7QUFDZixjQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDM0Msd0JBcENHLFNBQVMsRUFvQ0YsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ25CLGlCQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzdCLGlCQUFJLElBQUksQ0FBQyxHQUFHLEtBQUssS0FBSyxJQUFJLEtBQUssQ0FBQyxLQUFLLEVBQUU7QUFDbkMscUJBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztjQUM5QjtBQUNELGdCQUFHLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDekMsaUJBQUksS0FBSyxDQUFDLFNBQVMsRUFBRTtBQUNqQixnQ0F6Q1MsY0FBYyxFQXlDUixLQUFLLENBQUMsQ0FBQztjQUN6QjtVQUNKO01BQ0osTUFDSSxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUU7QUFDaEIsWUFBRyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO01BQy9CO0FBQ0QsU0FBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7QUFDbkIsU0FBSSxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtBQUM5QixhQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFO0FBQ2hCLGlCQUFJLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEtBQUssVUFBVSxFQUFFO0FBQ3RDLHFCQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztjQUN4Qjs7Ozs7Ozs7QUFBQSxVQVFKOztBQUVELGFBQUksSUFBSSxDQUFDO0FBQ1QsYUFBSSxJQUFJLENBQUM7QUFDVCxhQUFJLEtBQUssQ0FBQztBQUNWLGNBQUssSUFBSSxRQUFRLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtBQUM3QixpQkFBSSxDQUFDLFFBQVEsSUFBSSxRQUFRLENBQUM7QUFDMUIsaUJBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDbkMsaUJBQUksQ0FBQyxJQUFJLEdBQUcsT0F4RVQsS0FBSyxDQXdFVSxRQUFRLENBQUMsS0FBSyxPQUFPLEtBQUssS0FBSyxFQUFFO0FBQy9DLG9CQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsT0FBTyxDQUFDO2NBQ3ZCLE1BQ0ksSUFBSSxDQUFDLElBQUksR0FBRyxPQTNFckIsS0FBSyxDQTJFc0IsUUFBUSxDQUFDLEtBQUssT0FBTyxLQUFLLEtBQUssRUFBRTtBQUNwRCxvQkFBRyxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7Y0FDbkMsTUFDSSxJQUFJLEtBQUssR0FBRyxPQTlFUCxNQUFNLENBOEVRLFFBQVEsQ0FBQyxFQUFFOztBQUUvQixvQkFBRyxDQUFDLElBQUksR0FBRyxLQUFLLENBQUMsR0FBRyxPQUFPLENBQUM7Y0FDL0IsTUFDSSxJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLElBQUksUUFBUSxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsRUFBRTtBQUNqRCxzQkFBSyxHQUFHLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7QUFDNUMsb0JBQUcsQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDLEdBQUcsT0FBTyxDQUFDOztjQUUvQixNQUNJLElBQUksUUFBUSxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLElBQUksUUFBUSxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsSUFBSSxPQUFPLEtBQUssS0FBSyxFQUFFO0FBQ3BILG9CQUFHLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztjQUN2Qzs7Ozs7VUFNSjtBQU5JLE1BT1I7QUFDRCxZQUFPLEdBQUcsQ0FBQztFQUNkOztBQUdNLFVBQVMsa0JBQWtCLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUU7QUFDckQsU0FBSSxVQUFVLEdBQUcsR0FBRyxJQUFJLEdBQUcsSUFBSSxPQUFPLEdBQUcsSUFBSSxVQUFVLENBQUM7O0FBRXhELFNBQUksVUFBVSxFQUFFO0FBQ1osYUFBSSxPQUFPLEdBQUcsSUFBSSxVQUFVLEVBQUU7QUFDMUIsb0JBQU8sVUF4R0ksVUFBVSxDQXdHQyxHQUFHLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxLQUFLLEdBQUcsS0FBSyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsQ0FBQztVQUN6RSxNQUNJO0FBQ0Qsb0JBQU8sVUEzR1gsYUFBYSxDQTJHZ0IsR0FBRyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsS0FBSyxHQUFHLEtBQUssQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUM7VUFDNUU7TUFDSixNQUNJO0FBQ0QsZ0JBQU8sVUEvR29CLFFBQVEsRUErR25CLEdBQUcsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLEtBQUssR0FBRyxLQUFLLENBQUMsR0FBRyxHQUFHLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztNQUN6RTtFQUNKOztBQUVNLFVBQVMsYUFBYSxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUU7QUFDdEMsU0FBSSxHQUFHLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQztBQUMzQixTQUFJLFVBQVUsR0FBRyxHQUFHLElBQUksR0FBRyxJQUFJLE9BQU8sR0FBRyxJQUFJLFVBQVUsQ0FBQztBQUN4RCxTQUFJLElBQUksR0FBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxLQUFLLE9BQU8sU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLFFBQVEsSUFBSSxPQUFPLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxRQUFRLElBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUM7QUFDeEksU0FBSSxRQUFRLEdBQUcsSUFBSSxDQUFDO0FBQ3BCLFNBQUksQ0FBQyxJQUFJLElBQUksR0FBRyxHQUFHLENBQUMsRUFBRTtBQUNsQixpQkFBUSxHQUFHLEtBQUssQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDMUIsY0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUMxQixxQkFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7VUFDbEM7TUFDSjs7QUFFRCxTQUFJLFVBQVUsRUFBRTtBQUNaLGFBQUksT0FBTyxHQUFHLElBQUksVUFBVSxFQUFFO0FBQzFCLG9CQUFPLFVBaklJLFVBQVUsQ0FpSUMsR0FBRyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsS0FBSyxHQUFHLEtBQUssQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUM7VUFDekUsTUFDSTtBQUNELG9CQUFPLFVBcElYLGFBQWEsQ0FvSWdCLEdBQUcsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLEtBQUssR0FBRyxLQUFLLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxDQUFDO1VBQzVFO01BQ0osTUFDSTtBQUNELGdCQUFPLFVBeElvQixRQUFRLEVBd0luQixHQUFHLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxLQUFLLEdBQUcsS0FBSyxDQUFDLEdBQUcsR0FBRyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7TUFDekU7Ozs7Ozs7Ozs7OztBQzNJRSxLQUFJLEtBQUssR0FBRztBQUNmLFdBQU0sRUFBRSxRQUFRO0FBQ2hCLGtCQUFhLEVBQUUsZ0JBQWdCO0FBQy9CLGNBQVMsRUFBRSxXQUFXO0FBQ3RCLFdBQU0sRUFBRSxRQUFRO0FBQ2hCLG9CQUFlLEVBQUUsaUJBQWlCO0FBQ2xDLHNCQUFpQixFQUFFLG1CQUFtQjtBQUN0QyxRQUFHLEVBQUUsS0FBSztBQUNWLFVBQUssRUFBRSxPQUFPO0FBQ2QsaUJBQVksRUFBRSxjQUFjO0FBQzVCLGFBQVEsRUFBRSxVQUFVO0FBQ3BCLFlBQU8sRUFBRSxTQUFTO0FBQ2xCLGdCQUFXLEVBQUUsYUFBYTtBQUMxQixnQkFBVyxFQUFFLGFBQWE7QUFDMUIsWUFBTyxFQUFFLFNBQVM7QUFDbEIsY0FBUyxFQUFFLFdBQVc7QUFDdEIsWUFBTyxFQUFFLFNBQVM7QUFDbEIsU0FBSSxFQUFFLE1BQU07QUFDWixZQUFPLEVBQUUsU0FBUztBQUNsQixZQUFPLEVBQUUsU0FBUztBQUNsQixvQkFBZSxFQUFFLGlCQUFpQjtBQUNsQyxnQkFBVyxFQUFFLGFBQWE7QUFDMUIsV0FBTSxFQUFFLFFBQVE7QUFDaEIsZ0JBQVcsRUFBRSxhQUFhO0FBQzFCLFNBQUksRUFBRSxNQUFNO0FBQ1osYUFBUSxFQUFFLFVBQVU7QUFDcEIsVUFBSyxFQUFFLE9BQU87QUFDZCxRQUFHLEVBQUUsS0FBSztBQUNWLGFBQVEsRUFBRSxVQUFVO0FBQ3BCLGFBQVEsRUFBRSxVQUFVO0FBQ3BCLGNBQVMsRUFBRSxXQUFXO0FBQ3RCLFlBQU8sRUFBRSxTQUFTO0FBQ2xCLFNBQUksRUFBRSxNQUFNO0FBQ1osZUFBVSxFQUFFLFlBQVk7QUFDeEIsZ0JBQVcsRUFBRSxhQUFhO0FBQzFCLGVBQVUsRUFBRSxZQUFZO0FBQ3hCLG1CQUFjLEVBQUUsZ0JBQWdCO0FBQ2hDLGVBQVUsRUFBRSxZQUFZO0FBQ3hCLGdCQUFXLEVBQUUsYUFBYTtBQUMxQixZQUFPLEVBQUUsU0FBUztBQUNsQixXQUFNLEVBQUUsUUFBUTtBQUNoQixXQUFNLEVBQUUsUUFBUTtBQUNoQixTQUFJLEVBQUUsTUFBTTtBQUNaLFNBQUksRUFBRSxNQUFNO0FBQ1osYUFBUSxFQUFFLFVBQVU7QUFDcEIsWUFBTyxFQUFFLEtBQUs7QUFDZCxjQUFTLEVBQUUsWUFBWTtBQUN2QixTQUFJLEVBQUUsTUFBTTtBQUNaLGNBQVMsRUFBRSxXQUFXO0FBQ3RCLE9BQUUsRUFBRSxJQUFJO0FBQ1IsY0FBUyxFQUFFLFdBQVc7QUFDdEIsWUFBTyxFQUFFLFNBQVM7QUFDbEIsVUFBSyxFQUFFLE9BQU87QUFDZCxTQUFJLEVBQUUsTUFBTTtBQUNaLFNBQUksRUFBRSxNQUFNO0FBQ1osUUFBRyxFQUFFLEtBQUs7QUFDVixhQUFRLEVBQUUsVUFBVTtBQUNwQixpQkFBWSxFQUFFLGNBQWM7QUFDNUIsZ0JBQVcsRUFBRSxhQUFhO0FBQzFCLFFBQUcsRUFBRSxLQUFLO0FBQ1YsY0FBUyxFQUFFLFdBQVc7QUFDdEIsVUFBSyxFQUFFLE9BQU87QUFDZCxlQUFVLEVBQUUsWUFBWTtBQUN4QixXQUFNLEVBQUUsUUFBUTtBQUNoQixRQUFHLEVBQUUsS0FBSztBQUNWLGNBQVMsRUFBRSxXQUFXO0FBQ3RCLFNBQUksRUFBRSxNQUFNO0FBQ1osZUFBVSxFQUFFLFlBQVk7QUFDeEIsU0FBSSxFQUFFLE1BQU07QUFDWixZQUFPLEVBQUUsU0FBUztBQUNsQixZQUFPLEVBQUUsU0FBUztBQUNsQixnQkFBVyxFQUFFLGFBQWE7QUFDMUIsV0FBTSxFQUFFLFFBQVE7QUFDaEIsWUFBTyxFQUFFLFNBQVM7QUFDbEIsZUFBVSxFQUFFLFlBQVk7QUFDeEIsUUFBRyxFQUFFLEtBQUs7QUFDVixhQUFRLEVBQUUsVUFBVTtBQUNwQixTQUFJLEVBQUUsTUFBTTtBQUNaLFNBQUksRUFBRSxNQUFNO0FBQ1osWUFBTyxFQUFFLFNBQVM7QUFDbEIsWUFBTyxFQUFFLFNBQVM7QUFDbEIsVUFBSyxFQUFFLE9BQU87QUFDZCxXQUFNLEVBQUUsUUFBUTtBQUNoQixjQUFTLEVBQUUsV0FBVztBQUN0QixhQUFRLEVBQUUsVUFBVTtBQUNwQixVQUFLLEVBQUUsT0FBTztBQUNkLFNBQUksRUFBRSxNQUFNO0FBQ1osVUFBSyxFQUFFLE9BQU87QUFDZCxTQUFJLEVBQUUsTUFBTTtBQUNaLGVBQVUsRUFBRSxZQUFZO0FBQ3hCLFFBQUcsRUFBRSxLQUFLO0FBQ1YsV0FBTSxFQUFFLFFBQVE7QUFDaEIsVUFBSyxFQUFFLE9BQU87QUFDZCxTQUFJLEVBQUUsTUFBTTtBQUNaLFVBQUssRUFBRSxPQUFPO0FBQ2QsYUFBUSxFQUFFLFVBQVU7QUFDcEIsV0FBTSxFQUFFLFFBQVE7QUFDaEIsVUFBSyxFQUFFLE9BQU87QUFDZCxTQUFJLEVBQUUsTUFBTTtBQUNaLFdBQU0sRUFBRSxRQUFRO0FBQ2hCLFVBQUssRUFBRSxPQUFPO0FBQ2QsVUFBSyxFQUFFLE9BQU87QUFDZCxtQkFBYyxFQUFFLGdCQUFnQjtBQUNoQyxnQkFBVyxFQUFFLGFBQWE7QUFDMUIsYUFBUSxFQUFFLFVBQVU7QUFDcEIsY0FBUyxFQUFFLFdBQVc7QUFDdEIsYUFBUSxFQUFFLFVBQVU7QUFDcEIsV0FBTSxFQUFFLFFBQVE7QUFDaEIsWUFBTyxFQUFFLFNBQVM7QUFDbEIsYUFBUSxFQUFFLFVBQVU7QUFDcEIsYUFBUSxFQUFFLFVBQVU7QUFDcEIsaUJBQVksRUFBRSxjQUFjO0VBQy9CLENBQUM7O1NBaEhTLEtBQUssR0FBTCxLQUFLO0FBa0hULEtBQUksS0FBSyxHQUFHO0FBQ2YsWUFBTyxFQUFFLFNBQVM7QUFDbEIsY0FBUyxFQUFFLFdBQVc7QUFDdEIsYUFBUSxFQUFFLFVBQVU7QUFDcEIsT0FBRSxFQUFFLElBQUk7QUFDUixTQUFJLEVBQUUsTUFBTTtBQUNaLGFBQVEsRUFBRSxVQUFVO0FBQ3BCLFVBQUssRUFBRSxPQUFPO0FBQ2QsYUFBUSxFQUFFLFVBQVU7QUFDcEIsYUFBUSxFQUFFLFVBQVU7QUFDcEIsV0FBTSxFQUFFLFFBQVE7QUFDaEIsVUFBSyxFQUFFLE9BQU87RUFDakIsQ0FBQzs7U0FaUyxLQUFLLEdBQUwsS0FBSztBQWNULEtBQUksS0FBSyxHQUFHO0FBQ2YsWUFBTyxFQUFFLElBQUk7QUFDYixpQkFBWSxFQUFFLElBQUk7QUFDbEIsZ0JBQVcsRUFBRSxJQUFJO0FBQ2pCLGdCQUFXLEVBQUUsSUFBSTtBQUNqQixTQUFJLEVBQUUsSUFBSTtBQUNWLGFBQVEsRUFBRSxJQUFJO0FBQ2QsaUJBQVksRUFBRSxJQUFJO0FBQ2xCLGVBQVUsRUFBRSxJQUFJO0FBQ2hCLGlCQUFZLEVBQUUsSUFBSTtBQUNsQixlQUFVLEVBQUUsSUFBSTtBQUNoQixjQUFTLEVBQUUsSUFBSTtBQUNmLGVBQVUsRUFBRSxJQUFJO0FBQ2hCLFlBQU8sRUFBRSxJQUFJO0FBQ2IsVUFBSyxFQUFFLElBQUk7QUFDWCxZQUFPLEVBQUUsSUFBSTtBQUNiLGtCQUFhLEVBQUUsSUFBSTtBQUNuQixXQUFNLEVBQUUsSUFBSTtBQUNaLFdBQU0sRUFBRSxJQUFJO0FBQ1osU0FBSSxFQUFFLElBQUk7RUFDYixDQUFDOztTQXBCUyxLQUFLLEdBQUwsS0FBSztBQXNCVCxLQUFJLE1BQU0sR0FBRztBQUNoQixhQUFRLEVBQUUsUUFBUTtBQUNsQixZQUFPLEVBQUUsWUFBYyxJQUFJLE1BQU0sR0FBSyxVQUFVLEdBQUcsT0FBTztBQUMxRCxlQUFVLEVBQUUsVUFBVTs7QUFFdEIsZ0JBQVcsRUFBRSxXQUFXO0FBQ3hCLGNBQVMsRUFBRSxTQUFTO0FBQ3BCLGdCQUFXLEVBQUUsV0FBVztBQUN4QixpQkFBWSxFQUFFLFlBQVk7QUFDMUIsaUJBQVksRUFBRSxZQUFZO0FBQzFCLGdCQUFXLEVBQUUsV0FBVztBQUN4QixlQUFVLEVBQUUsVUFBVTs7QUFFdEIsaUJBQVksRUFBRSxZQUFZO0FBQzFCLGVBQVUsRUFBRSxVQUFVO0FBQ3RCLGdCQUFXLEVBQUUsV0FBVztBQUN4QixrQkFBYSxFQUFFLGFBQWE7QUFDNUIsaUJBQVksRUFBRSxZQUFZOztBQUUxQixrQkFBYSxFQUFFLGFBQWE7O0FBRTVCLFlBQU8sRUFBRSxPQUFPO0FBQ2hCLFlBQU8sRUFBRSxPQUFPO0FBQ2hCLGFBQVEsRUFBRSxRQUFROztBQUVsQixjQUFTLEVBQUUsU0FBUztBQUNwQixlQUFVLEVBQUUsVUFBVTtBQUN0QixZQUFPLEVBQUUsT0FBTztFQUNuQixDQUFDO1NBNUJTLE1BQU0sR0FBTixNQUFNLEM7Ozs7Ozs7Ozs7O1NDbkpELFNBQVMsR0FBVCxTQUFTO1NBNEJULGFBQWEsR0FBYixhQUFhOztpQ0EvQlksQ0FBUTs7QUFFMUMsS0FBSSxLQUFLLEdBQUcsS0FBSyxDQUFDO1NBQWQsS0FBSyxHQUFMLEtBQUs7O0FBQ1QsVUFBUyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRTtBQUMvQixTQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLFFBQVEsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRTtBQUNqRixnQkFBTztNQUNWO0FBQ0QsU0FBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUM3QixTQUFJLE9BQU8sS0FBSyxJQUFJLFFBQVEsSUFBSSxPQUFPLEtBQUssSUFBSSxRQUFRLEVBQUU7QUFDdEQsYUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxVQVRuQixXQUFXLEVBU29CLEtBQUssQ0FBQyxDQUFDO01BQ3pDLE1BQ0ksSUFBSSxLQUFLLElBQUksSUFBSSxFQUFFO0FBQ3BCLGFBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsVUFabkIsV0FBVyxFQVlvQixFQUFFLENBQUMsQ0FBQztNQUN0QyxNQUNJLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFO0FBQ2hDLGFBQUksS0FBSyxZQUFZLEtBQUssRUFBRTtBQUN4QixpQkFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxVQWhCVixhQUFhLENBZ0JlLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO1VBQ2xFLE1BQ0k7QUFDRCxpQkFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxVQW5CdkIsV0FBVyxFQW1Cd0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1VBQ3pEO01BQ0osTUFDSSxJQUFJLE9BQU8sS0FBSyxLQUFLLFVBQVUsRUFBRTtBQUNsQyxhQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLFVBdkJuQixXQUFXLEVBdUJvQixVQUFVLENBQUMsQ0FBQztNQUM5QyxNQUNJO0FBQ0QsYUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxVQTFCbkIsV0FBVyxFQTBCb0IsRUFBRSxDQUFDLENBQUM7TUFDdEM7O0FBQUEsRUFFSjs7QUFFTSxVQUFTLGFBQWEsQ0FBQyxHQUFHLEVBQUU7QUFDL0IsU0FBSSxXQUFXLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNsQyxZQUFPLFdBQVcsSUFBSSxXQUFXLENBQUMsUUFBUSxFQUFFO0FBQ3hDLG9CQUFXLEdBQUcsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztNQUN6QztBQUNELFlBQU8sV0FBVyxDQUFDOzs7Ozs7Ozs7Ozs7U0NJUCxhQUFhLEdBQWIsYUFBYTtTQTRCYixVQUFVLEdBQVYsVUFBVTtTQThDVixRQUFRLEdBQVIsUUFBUTtTQWtDUixXQUFXLEdBQVgsV0FBVztBQXBKM0IsS0FBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDOztBQUVYLEtBQUksS0FBSyxHQUFHO0FBQ1IsU0FBSSxFQUFFLElBQUk7QUFDVixRQUFHLEVBQUUsSUFBSTtBQUNULFFBQUcsRUFBRSxJQUFJO0FBQ1QsVUFBSyxFQUFFLElBQUk7QUFDWCxhQUFRLEVBQUUsSUFBSTtBQUNkLGFBQVEsRUFBRSxJQUFJO0FBQ2QsYUFBUSxFQUFFLEtBQUs7QUFDZixjQUFTLEVBQUUsSUFBSTtBQUNmLFFBQUcsRUFBRSxJQUFJO0FBQ1QsV0FBTSxFQUFFLElBQUk7QUFDWixVQUFLLEVBQUUsSUFBSTtBQUNYLFVBQUssRUFBRSxLQUFLO0FBQ1osY0FBUyxFQUFFLElBQUk7QUFDZixZQUFPLEVBQUUsbUJBQVk7QUFDakIsYUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUM7QUFDaEIsYUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7QUFDckIsYUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7OztNQUdyQjtFQUNKLENBQUM7O0FBRUYsVUFBUyxXQUFXLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUU7QUFDMUMsVUFBSyxJQUFJLElBQUksSUFBSSxLQUFLLEVBQUU7QUFDcEIsY0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7TUFDdkM7QUFDRCxVQUFLLElBQUksSUFBSSxTQUFTLEVBQUU7QUFDcEIsY0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7TUFDM0M7RUFDSjs7OztBQUlELEtBQUksU0FBUyxHQUFHLEVBQUUsQ0FBQztBQUNuQixLQUFJLGFBQWEsR0FBRyxFQUFFLENBQUM7O0FBR2hCLFVBQVMsYUFBYSxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRTtBQUNyRCxTQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDO0FBQ2YsU0FBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7QUFDZixTQUFJLEdBQUcsSUFBSSxLQUFLLEVBQUU7QUFDZCxhQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztBQUNqQixhQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztNQUNyQjtBQUNELFNBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0FBQ3pCLFNBQUksR0FBRyxFQUFFO0FBQ0wsYUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7TUFDbEI7O0FBRUQsU0FBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUM7QUFDaEIsU0FBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7RUFDdEI7O0FBQ0QsWUFBVyxDQUFDLGFBQWEsRUFBRSxLQUFLLEVBQUU7QUFDOUIsYUFBUSxFQUFFLElBQUk7QUFDZCxZQUFPLEVBQUUsbUJBQVk7QUFDakIsYUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUM7QUFDaEIsYUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7O0FBRXJCLGFBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDOzs7TUFHdEI7RUFDSixDQUFDLENBQUM7O0FBR0ksVUFBUyxVQUFVLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFOztBQUVsRCxTQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDO0FBQ2YsU0FBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7QUFDZixTQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztBQUN6QixTQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztBQUNyQixTQUFJLEdBQUcsRUFBRTtBQUNMLGFBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO01BQ2xCOztBQUVELFNBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDO0FBQ2hCLFNBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDOzs7RUFHdEI7O0FBQ0QsWUFBVyxDQUFDLFVBQVUsRUFBRSxLQUFLLEVBQUUsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQzs7QUFHakQsS0FBSSxVQUFVLEdBQUcsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDcEMsV0FBVSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7O0FBRW5CLFVBQVMsS0FBSyxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUU7O0FBRTVDLFNBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUM7QUFDZixTQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztBQUNmLFNBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0FBQ25CLFNBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0FBQ3pCLFNBQUksSUFBSSxFQUFFO0FBQ04sYUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7TUFDcEI7QUFDRCxTQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztBQUNuQixTQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztBQUNmLFNBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDOzs7RUFHbkI7QUFDRCxZQUFXLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRTtBQUN0QixZQUFPLEVBQUUsbUJBQVk7QUFDakIsYUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUM7QUFDaEIsYUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7QUFDckIsYUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7Ozs7TUFJckI7RUFDSixDQUFDLENBQUM7O0FBQ0ksVUFBUyxRQUFRLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRTtBQUN0RCxTQUFJLFVBQVUsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFO0FBQ3JCLGdCQUFPLElBQUksS0FBSyxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztNQUNyRDtBQUNELFNBQUksSUFBSSxHQUFHLFVBQVUsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUN4QyxTQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztBQUNmLFNBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0FBQ25CLFNBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0FBQ3pCLFNBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDOztBQUVmLFlBQU8sSUFBSSxDQUFDO0VBQ2Y7O0FBR0QsS0FBSSxjQUFjLEdBQUcsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDeEMsZUFBYyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7O0FBRXZCLFVBQVMsU0FBUyxDQUFDLElBQUksRUFBRTtBQUNyQixTQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDO0FBQ2YsU0FBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUM7QUFDaEIsU0FBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7OztFQUdwQjtBQUNELFlBQVcsQ0FBQyxTQUFTLEVBQUUsS0FBSyxFQUFFO0FBQzFCLFFBQUcsRUFBRSxHQUFHO0FBQ1IsWUFBTyxFQUFFLG1CQUFZO0FBQ2pCLGFBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDO0FBQ2hCLHVCQUFjLENBQUMsY0FBYyxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDOzs7TUFHL0M7RUFDSixDQUFDLENBQUM7O0FBRUksVUFBUyxXQUFXLENBQUMsSUFBSSxFQUFFO0FBQzlCLFNBQUksY0FBYyxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUU7QUFDekIsZ0JBQU8sSUFBSSxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7TUFDOUI7QUFDRCxTQUFJLElBQUksR0FBRyxjQUFjLENBQUMsRUFBRSxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDaEQsU0FBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7QUFDakIsWUFBTyxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1NDM0hBLFdBQVcsR0FBWCxXQUFXO1NBSVgsU0FBUyxHQUFULFNBQVM7U0E2QlQsZUFBZSxHQUFmLGVBQWU7U0FTZixlQUFlLEdBQWYsZUFBZTtTQVVmLGdCQUFnQixHQUFoQixnQkFBZ0I7U0FJaEIsY0FBYyxHQUFkLGNBQWM7O21DQTdERCxDQUFVOztpQ0FDZCxDQUFROztrQ0FDYixDQUFTOztBQUd0QixVQUFTLFdBQVcsQ0FBQyxJQUFJLEVBQUU7QUFDOUIsWUFBTyxJQUFJLENBQUMsR0FBRyxDQUFDO0VBQ25COztBQUVNLFVBQVMsU0FBUyxDQUFDLEtBQUssRUFBRTtBQUM3QixTQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztFQUN0Qjs7QUFFRCxVQUFTLENBQUMsU0FBUyxDQUFDLGtCQUFrQixHQUFHLFlBQVksRUFBRSxDQUFDO0FBQ3hELFVBQVMsQ0FBQyxTQUFTLENBQUMsaUJBQWlCLEdBQUcsWUFBWSxFQUFFLENBQUM7O0FBRXZELFVBQVMsQ0FBQyxTQUFTLENBQUMseUJBQXlCLEdBQUcsWUFBWSxFQUFFLENBQUM7QUFDL0QsVUFBUyxDQUFDLFNBQVMsQ0FBQyxtQkFBbUIsR0FBRyxZQUFZLEVBQUUsQ0FBQztBQUN6RCxVQUFTLENBQUMsU0FBUyxDQUFDLGtCQUFrQixHQUFHLFlBQVksRUFBRSxDQUFDOztBQUV4RCxVQUFTLENBQUMsU0FBUyxDQUFDLG9CQUFvQixHQUFHLFlBQVksRUFBRSxDQUFDOztBQUcxRCxVQUFTLENBQUMsU0FBUyxDQUFDLFdBQVcsR0FBRyxVQUFVLEtBQUssRUFBRTtBQUMvQyxTQUFJLENBQUMsbUJBQW1CLENBQUMsS0FBSyxDQUFDLENBQUM7O0FBRWhDLFNBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0FBQ25CLFNBQUksT0FBTyxHQUFHLFVBMUJWLFVBQVUsQ0EwQmUsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUM1RSxpQkE1QkksY0FBYyxFQTRCSCxJQUFJLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ25DLFNBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUM7O0FBRXRDLFNBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7RUFDdkMsQ0FBQzs7QUFFRixVQUFTLENBQUMsU0FBUyxDQUFDLFdBQVcsR0FBRyxZQUFZO0FBQzFDLFNBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0VBQ2hDLENBQUM7O0FBRUssVUFBUyxlQUFlLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRTtBQUN2QyxTQUFJLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUM7QUFDL0IsU0FBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUM7QUFDN0IsVUFBSyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO0FBQy9CLFNBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO0FBQ3JCLFNBQUksQ0FBQyxTQUFTLENBQUMseUJBQXlCLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDaEQsU0FBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7RUFDckM7O0FBRU0sVUFBUyxlQUFlLENBQUMsSUFBSSxFQUFFO0FBQ2xDLFNBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDO0FBQzdCLFVBQUssQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztBQUMvQixTQUFJLENBQUMsU0FBUyxHQUFHLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNyQyxTQUFJLENBQUMsU0FBUyxDQUFDLGtCQUFrQixFQUFFLENBQUM7QUFDcEMsU0FBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztBQUMxQyxTQUFJLENBQUMsU0FBUyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7QUFDM0IsWUFwREksS0FBSyxJQW9EQSxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0VBQzlCOztBQUVNLFVBQVMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFO0FBQ25DLFNBQUksQ0FBQyxTQUFTLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztFQUN6Qzs7QUFFTSxVQUFTLGNBQWMsQ0FBQyxJQUFJLEVBQUU7QUFDakMsU0FBSSxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7U0NuRnZCLE1BQU0sR0FBTixNQUFNO1NBd0ROLGNBQWMsR0FBZCxjQUFjO1NBd0pkLE1BQU0sR0FBTixNQUFNOztrQ0FyTmEsQ0FBUzs7c0NBQ0ksQ0FBYTs7a0NBQ2YsQ0FBUzs7bUNBQ2xDLENBQVU7O0FBRXhCLFVBQVMsTUFBTSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUU7QUFDOUIsWUFKOEIsS0FBSyxJQUkxQixPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQzs7QUFFckMsU0FBSSxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQztBQUNsQixRQUFHLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztBQUNuQixTQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQzs7O0FBR2YsU0FBSSxHQUFHLENBQUMsR0FBRyxLQUFLLElBQUksQ0FBQyxHQUFHLEVBQUU7QUFDdEIsb0JBQVcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDdkIsZ0JBQU87TUFDVjtBQUNELFNBQUksR0FBRyxDQUFDLEdBQUcsSUFBSSxHQUFHLEVBQUU7QUFDaEIsYUFBSSxHQUFHLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxJQUFJLEVBQUU7QUFDeEIsZ0JBQUcsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztVQUMvQjtBQUNELFlBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUNkLGdCQUFPO01BQ1Y7QUFDRCxTQUFJLEdBQUcsQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLElBQUksRUFBRTtBQUN4QixZQUFHLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7TUFDL0I7O0FBRUQsU0FBSSxJQUFJLENBQUMsUUFBUSxFQUFFO0FBQ2YsYUFBSSxJQUFJLENBQUMsR0FBRyxLQUFLLEdBQUcsQ0FBQyxHQUFHLEVBQUU7QUFDdEIsd0JBQVcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDdkIsb0JBQU87VUFDVjtNQUNKLE1BQ0k7QUFDRCxhQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztBQUNuQixhQUFJLElBQUksQ0FBQyxLQUFLLElBQUksR0FBRyxDQUFDLEtBQUssRUFBRTtBQUN6QixxQkFBUSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztVQUN2QjtBQUNELGFBQUksR0FBSSxDQUFDLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLElBQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLElBQUssR0FBRyxDQUFDLFFBQVEsS0FBSyxJQUFJLENBQUMsUUFBUSxFQUFFO0FBQzVGLHdCQUFXLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ3ZCLG9CQUFPO1VBQ1Y7TUFDSjtBQUNELFNBQUksR0FBRyxDQUFDLFNBQVMsRUFBRTtBQUNmLGFBQUksSUFBSSxDQUFDLEVBQUUsS0FBSyxJQUFJLEVBQUM7QUFDakIsc0JBQVM7VUFDWjtBQUNELHdCQS9DQSxlQUFlLEVBK0NDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUMzQixnQkFBTztNQUNWOztBQUVELFNBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFO0FBQ1osYUFBSSxjQUFjLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxFQUFFO0FBQzNCLGdCQUFHLENBQUMsT0FBTyxFQUFFLENBQUM7VUFDakI7QUFDRCxnQkFBTztNQUNWO0FBQ0QsUUFBRyxDQUFDLE9BQU8sRUFBRSxDQUFDO0VBQ2pCOztBQUVNLFVBQVMsY0FBYyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUU7QUFDdEMsU0FBSSxNQUFNLEdBQUcsR0FBRyxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7QUFDcEQsU0FBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7QUFDdEQsU0FBSSxNQUFNLElBQUksTUFBTSxJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksR0FBRyxDQUFDLEtBQUssRUFBRTtBQUM3QyxvQkFBVyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsV0EvRFosYUFBYSxFQStEYSxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQzNDLGdCQUFPO01BQ1Y7O0FBRUQsU0FBSSxNQUFNLEdBQUcsQ0FBQyxFQUFFO0FBQ1osYUFBSSxNQUFNLEtBQUssTUFBTSxFQUFFO0FBQ25CLGtCQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQzdCLDRCQXRFUixTQUFTLEVBc0VTLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztBQUNuQix1QkFBTSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOztjQUU3QztVQUNKLE1BQ0k7QUFDRCxrQkFBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDekIsNEJBN0VSLFNBQVMsRUE2RVMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ25CLHFCQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2hDLDZCQTlFUixNQUFNLEVBOEVTLFFBQVEsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDM0IsdUJBQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLFFBQVEsRUFBRSxXQWhGdkIsYUFBYSxFQWdGd0IsR0FBRyxDQUFDLENBQUMsQ0FBQztjQUNqRDtBQUNELGtCQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUN6Qix1QkFBTSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7Y0FFM0I7VUFDSjtNQUNKLE1BQ0ksSUFBSSxNQUFNLEdBQUcsQ0FBQyxFQUFFO0FBQ2pCLG9CQUFXLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ3ZCLGdCQUFPO01BQ1Y7QUFDRCxZQUFPLElBQUksQ0FBQztFQUNmOztBQUdELFVBQVMsV0FBVyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFO0FBQ3pDLFNBQUksU0FBUyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUM7QUFDeEIsU0FBSSxNQUFNLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQztBQUN4QixTQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO0FBQzVCLFNBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7QUFDaEMsU0FBSSxNQUFNLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQztBQUNoQyxTQUFJLE1BQU0sR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQztBQUNqQyxTQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7QUFDZCxVQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQzdCLG9CQXpHQSxTQUFTLEVBeUdDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztBQUNuQixhQUFJLFFBQVEsR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDOUIsYUFBSSxRQUFRLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMvQixhQUFJLE1BQU0sR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDO0FBQzFCLGFBQUksTUFBTSxJQUFJLElBQUksRUFBRTtBQUNoQixvQkFBTyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUN2Qyx3QkFBVyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUN2QixvQkFBTztVQUNWO0FBQ0QsYUFBSSxRQUFRLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztBQUM1QyxhQUFJLFFBQVEsRUFBRTtBQUNWLGtCQUFLLEVBQUUsQ0FBQztBQUNSLGlCQUFJLFFBQVEsS0FBSyxRQUFRLEVBQUU7QUFDdkIsdUJBQU0sQ0FBQyxTQUFTLEVBQUUsUUFBUSxFQUFFLFdBQVcsQ0FBQyxDQUFDO2NBQzVDO0FBQ0QsbUJBQU0sQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDM0IsaUJBQUksUUFBUSxJQUFJLFFBQVEsRUFBRTtBQUN0QiwyQkFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztjQUN0QjtBQUNELG1CQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDO1VBQ3pCLE1BQ0k7QUFDRCx5QkE5SEosTUFBTSxFQThISyxRQUFRLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzNCLG1CQUFNLENBQUMsU0FBUyxFQUFFLFFBQVEsRUFBRSxXQUFXLENBQUMsQ0FBQztVQUM1QztBQUNELG9CQUFXLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUM7QUFDdkMsa0JBQVMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7TUFDekI7OztBQUdELFNBQUksS0FBSyxLQUFLLE1BQU0sRUFBRTtBQUNsQixjQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUN6QixpQkFBSSxLQUFLLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUM1QixpQkFBSSxLQUFLLElBQUksU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLEVBQUU7QUFDdkMsdUJBQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNkLDJCQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO2NBQ3RCO1VBQ0o7TUFDSjtFQUNKOztBQUVELFVBQVMsV0FBVyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUU7QUFDNUIsU0FBSSxTQUFTLEdBQUcsR0FBRyxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDO0FBQzVELGlCQW5KSSxNQUFNLEVBbUpILElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztBQUN4QixXQUFNLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxHQUFHLENBQUMsUUFBUSxHQUFHLFdBckp4QixhQUFhLEVBcUp5QixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztBQUNqRSxXQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDWixZQUFPLElBQUksQ0FBQztFQUVmOztBQUVELFVBQVMsUUFBUSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUU7QUFDekIsU0FBSSxJQUFJLENBQUM7QUFDVCxTQUFJLFNBQVMsQ0FBQztBQUNkLFNBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7QUFDbkIsVUFBSyxJQUFJLFFBQVEsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO0FBQzdCLGFBQUksQ0FBQyxRQUFRLElBQUksUUFBUSxDQUFDO0FBQzFCLGFBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDbkMsYUFBSSxRQUFRLElBQUksS0FBSyxFQUFFLEVBQUUsTUFDcEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sSUFBSSxHQUFHLE9Bckt4RSxLQUFLLENBcUt5RSxRQUFRLENBQUMsR0FBRztBQUM3RixnQkFBRyxDQUFDLElBQUksQ0FBQyxHQUFHLE9BQU8sQ0FBQztVQUN2QixNQUNJLElBQUksQ0FBQyxJQUFJLEdBQUcsT0F4S2pCLEtBQUssQ0F3S2tCLFFBQVEsQ0FBQyxLQUFLLFNBQVMsRUFBRTtBQUM1QyxpQkFBSSxPQUFPLEtBQUssS0FBSyxFQUFFO0FBQ25CLG9CQUFHLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO2NBQzdCLE1BQ0k7QUFDRCxvQkFBRyxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7Y0FDbkM7VUFDSixNQUNJLElBQUksSUFBSSxHQUFHLE9BaExGLE1BQU0sQ0FnTEcsUUFBUSxDQUFDLElBQUksU0FBUyxFQUFFO0FBQzNDLGdCQUFHLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLE9BQU8sQ0FBQztVQUM5QixNQUNJLElBQUksUUFBUSxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxJQUFJLFNBQVMsRUFBRTtBQUM5RCxpQkFBSSxHQUFHLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7QUFDM0MsZ0JBQUcsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsT0FBTyxDQUFDO1VBQzlCLE1BQ0ksSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLElBQUksUUFBUSxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxJQUFJLFNBQVMsRUFBRTtBQUM1RyxpQkFBSSxPQUFPLEtBQUssS0FBSyxFQUFFO0FBQ25CLG9CQUFHLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2NBQ2pDLE1BQ0k7QUFDRCxvQkFBRyxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7Y0FDdkM7VUFDSixNQUNJLElBQUksUUFBUSxLQUFLLEtBQUssSUFBSSxPQUFPLE9BQU8sSUFBSSxVQUFVLEVBQUU7QUFDekQsb0JBQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztVQUNqQjtNQUNKO0VBQ0o7O0FBRUQsVUFBUyxNQUFNLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUU7QUFDckMsU0FBSSxJQUFJLENBQUMsUUFBUSxFQUFFO0FBQ2YsY0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQzNDLG1CQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1VBQzlDO0FBQ0QsZ0JBQU87TUFDVjtBQUNELFlBMU04QixLQUFLLElBME0xQixPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUNyQyxjQUFTLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsTUFBTSxJQUFJLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztFQUMxRDs7QUFHRCxVQUFTLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBRTNCOztBQUVNLFVBQVMsTUFBTSxDQUFDLEdBQUcsRUFBRTtBQUN4QixZQXBOOEIsS0FBSyxJQW9OMUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUM7O0FBRXBDLFNBQUksR0FBRyxDQUFDLFNBQVMsRUFBRTtBQUNmLHdCQXhOaUIsZ0JBQWdCLEVBd05oQixHQUFHLENBQUMsQ0FBQztNQUN6QjtBQUNELFNBQUksR0FBRyxDQUFDLFFBQVEsRUFBRTtBQUNkLGNBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUMxQyxtQkFBTSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN4Qix1QkFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztVQUN0QjtNQUNKO0FBQ0QsU0FBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUU7QUFDZixZQUFHLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO01BQzNDO0FBQ0QsUUFBRyxDQUFDLE9BQU8sRUFBRSxDQUFDO0VBQ2pCIiwiZmlsZSI6ImZhc3QtcmVhY3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIGQ5NjQ5MTM4Mzc5NjkxNjIxMzFlXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZXhwb3NlP0Zhc3RSZWFjdCEuL3NyYy9mYXN0LXJlYWN0LmpzXCIpO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9pbmRleC5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZ2xvYmFsW1wiRmFzdFJlYWN0XCJdID0gcmVxdWlyZShcIi0hL1VzZXJzL2NvZHkvZGV2L2JldHB1Yi9mcm9udGVuZC9kZGQvbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9pbmRleC5qcz97XFxcInN0YWdlXFxcIjowLFxcXCJsb29zZVxcXCI6W1xcXCJlczYuY2xhc3Nlc1xcXCJdfSEvVXNlcnMvY29keS9kZXYvYmV0cHViL2Zyb250ZW5kL2RkZC9zcmMvZmFzdC1yZWFjdC5qc1wiKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9leHBvc2UtbG9hZGVyP0Zhc3RSZWFjdCEuL3NyYy9mYXN0LXJlYWN0LmpzXG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZXhwb3J0IHsgcmVuZGVyLCBjcmVhdGVFbGVtZW50LCBjcmVhdGVFbGVtZW50QXJyYXkgfSBmcm9tICcuL2NyZWF0ZSc7XG5leHBvcnQgeyBDb21wb25lbnQsIGZpbmRET01Ob2RlIH0gZnJvbSAnLi9jb21wb25lbnQnO1xuZXhwb3J0IHsgdXBkYXRlIH0gZnJvbSAnLi91cGRhdGUnO1xuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9mYXN0LXJlYWN0LmpzXG4gKiovIiwiaW1wb3J0IHthdHRycywgcHJvcHMsIGV2ZW50c30gZnJvbSAnLi9hdHRycyc7XG5pbXBvcnQge0RFQlVHLCBub3JtQ2hpbGR9IGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0IHtWRnJhZ21lbnROb2RlLCBWQ29tcG9uZW50LCBnZXROTm9kZX0gZnJvbSAnLi9ub2RlJztcbmltcG9ydCB7Y3JlYXRlQ29tcG9uZW50LCBtb3VudENvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnQnO1xuXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyKHZkb20sIGRvbSkge1xuICAgIGRvbS5hcHBlbmRDaGlsZChjcmVhdGUodmRvbSwgZG9tKSk7XG4gICAgaWYgKHZkb20uY29tcG9uZW50KSB7XG4gICAgICAgIG1vdW50Q29tcG9uZW50KHZkb20pO1xuICAgIH1cbiAgICByZXR1cm4gdmRvbTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZSh2ZG9tLCBwYXJlbnREb20pIHtcbiAgICBERUJVRyAmJiBjb25zb2xlLmxvZyhcIkNyZWF0ZVwiLCB2ZG9tKTtcbiAgICAvL3Zkb20ucGFyZW50ID0gcGFyZW50O1xuICAgIGlmICh2ZG9tLnRhZyA9PSAnIycpIHtcbiAgICAgICAgdmRvbS5kb20gPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh2ZG9tLnRleHQpO1xuICAgICAgICAvL3Zkb20uZG9tLnZpcnR1YWwgPSB2ZG9tO1xuICAgICAgICByZXR1cm4gdmRvbS5kb207XG4gICAgfVxuICAgIHZhciBkb207XG4gICAgaWYgKHZkb20uZnJhZ21lbnQpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB2ZG9tLnRhZyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY3JlYXRlQ29tcG9uZW50KHZkb20pO1xuICAgICAgICB9XG4gICAgICAgIGRvbSA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICAgICAgdmRvbS5kb20gPSBwYXJlbnREb207XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBkb20gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHZkb20udGFnKTtcbiAgICAgICAgdmRvbS5kb20gPSBkb207XG4gICAgICAgIC8vZG9tLnZpcnR1YWwgPSB2ZG9tO1xuICAgIH1cblxuICAgIGlmICh2ZG9tLmNoaWxkcmVuKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdmRvbS5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbm9ybUNoaWxkKHZkb20sIGkpO1xuICAgICAgICAgICAgdmFyIGNoaWxkID0gdmRvbS5jaGlsZHJlbltpXTtcbiAgICAgICAgICAgIGlmICh2ZG9tLnRhZyA9PT0gJ21hcCcgJiYgY2hpbGQuYXR0cnMpIHtcbiAgICAgICAgICAgICAgICB2ZG9tLmtleU1hcFtjaGlsZC5rZXldID0gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRvbS5hcHBlbmRDaGlsZChjcmVhdGUoY2hpbGQsIHZkb20uZG9tKSk7XG4gICAgICAgICAgICBpZiAoY2hpbGQuY29tcG9uZW50KSB7XG4gICAgICAgICAgICAgICAgbW91bnRDb21wb25lbnQoY2hpbGQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKHZkb20udGV4dCkge1xuICAgICAgICBkb20udGV4dENvbnRlbnQgPSB2ZG9tLnRleHQ7XG4gICAgfVxuICAgIHZkb20uYWxsQXR0cnMgPSAnJztcbiAgICBpZiAodmRvbS5hdHRycyAmJiAhdmRvbS5mcmFnbWVudCkge1xuICAgICAgICBpZiAodmRvbS5hdHRycy5yZWYpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdmRvbS5hdHRycy5yZWYgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICB2ZG9tLmF0dHJzLnJlZih2ZG9tKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vdG9kbzpcbiAgICAgICAgICAgIC8qXG4gICAgICAgICAgICAgZWxzZSBpZiAoY3VycmVudENvbXBvbmVudCkge1xuICAgICAgICAgICAgIGN1cnJlbnRDb21wb25lbnQucmVmcyA9IGN1cnJlbnRDb21wb25lbnQucmVmcyB8fCB7fTtcbiAgICAgICAgICAgICBjdXJyZW50Q29tcG9uZW50LnJlZnNbdmRvbS5hdHRycy5yZWZdID0gdmRvbTtcbiAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgKi9cbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBhdHRyO1xuICAgICAgICB2YXIgcHJvcDtcbiAgICAgICAgdmFyIGV2ZW50O1xuICAgICAgICBmb3IgKHZhciBhdHRyTmFtZSBpbiB2ZG9tLmF0dHJzKSB7XG4gICAgICAgICAgICB2ZG9tLmFsbEF0dHJzICs9IGF0dHJOYW1lO1xuICAgICAgICAgICAgdmFyIGF0dHJWYWwgPSB2ZG9tLmF0dHJzW2F0dHJOYW1lXTtcbiAgICAgICAgICAgIGlmICgocHJvcCA9IHByb3BzW2F0dHJOYW1lXSkgJiYgYXR0clZhbCAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICBkb21bcHJvcF0gPSBhdHRyVmFsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoKGF0dHIgPSBhdHRyc1thdHRyTmFtZV0pICYmIGF0dHJWYWwgIT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgZG9tLnNldEF0dHJpYnV0ZShhdHRyLCBhdHRyVmFsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGV2ZW50ID0gZXZlbnRzW2F0dHJOYW1lXSkge1xuICAgICAgICAgICAgICAgIC8vZG9tLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGV2ZW50SGFuZGxlcihhdHRyVmFsKSk7XG4gICAgICAgICAgICAgICAgZG9tWydvbicgKyBldmVudF0gPSBhdHRyVmFsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoYXR0ck5hbWVbMF0gPT09ICdvJyAmJiBhdHRyTmFtZVsxXSA9PT0gJ24nKSB7XG4gICAgICAgICAgICAgICAgZXZlbnQgPSBhdHRyTmFtZS5zdWJzdHJpbmcoMikudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgICAgICBkb21bJ29uJyArIGV2ZW50XSA9IGF0dHJWYWw7XG4gICAgICAgICAgICAgICAgLy9kb20uYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgZXZlbnRIYW5kbGVyKGF0dHJWYWwpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGF0dHJOYW1lWzBdID09PSAnZCcgJiYgYXR0ck5hbWVbMV0gPT09ICdhJyAmJiBhdHRyTmFtZVsyXSA9PT0gJ3QnICYmIGF0dHJOYW1lWzNdID09PSAnYScgJiYgYXR0clZhbCAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICBkb20uc2V0QXR0cmlidXRlKGF0dHJOYW1lLCBhdHRyVmFsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8qXG4gICAgICAgICAgICAgZWxzZSBpZiAoa2V5ID09PSAnc3R5bGUnKSB7XG4gICAgICAgICAgICAgfVxuICAgICAgICAgICAgICovXG5cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZG9tO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVFbGVtZW50QXJyYXkodGFnLCBhdHRycywgY2hpbGRyZW4pIHtcbiAgICB2YXIgaXNGcmFnbWVudCA9IHRhZyA9PSAnQCcgfHwgdHlwZW9mIHRhZyA9PSAnZnVuY3Rpb24nO1xuLy8gICAgICAgIHZhciB0ZXh0ID0gKGNoaWxkcmVuICYmICFpc0ZyYWdtZW50ICYmICh0eXBlb2YgY2hpbGRyZW5bMF0gPT0gJ3N0cmluZycgfHwgdHlwZW9mIGNoaWxkcmVuWzBdID09ICdudW1iZXInKSkgPyBjaGlsZHJlblswXSArICcnIDogbnVsbDtcbiAgICBpZiAoaXNGcmFnbWVudCkge1xuICAgICAgICBpZiAodHlwZW9mIHRhZyA9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFZDb21wb25lbnQodGFnLCBhdHRycywgY2hpbGRyZW4sIGF0dHJzID8gYXR0cnMua2V5IDogbnVsbCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFZGcmFnbWVudE5vZGUodGFnLCBhdHRycywgY2hpbGRyZW4sIGF0dHJzID8gYXR0cnMua2V5IDogbnVsbCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBnZXROTm9kZSh0YWcsIGF0dHJzLCBjaGlsZHJlbiwgYXR0cnMgPyBhdHRycy5rZXkgOiBudWxsLCBudWxsKTtcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVFbGVtZW50KHRhZywgYXR0cnMpIHtcbiAgICB2YXIgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICB2YXIgaXNGcmFnbWVudCA9IHRhZyA9PSAnQCcgfHwgdHlwZW9mIHRhZyA9PSAnZnVuY3Rpb24nO1xuICAgIHZhciB0ZXh0ID0gKGxlbiA9PSAzICYmICFpc0ZyYWdtZW50ICYmICh0eXBlb2YgYXJndW1lbnRzWzJdID09ICdzdHJpbmcnIHx8IHR5cGVvZiBhcmd1bWVudHNbMl0gPT0gJ251bWJlcicpKSA/IGFyZ3VtZW50c1syXSArICcnIDogbnVsbDtcbiAgICB2YXIgY2hpbGRyZW4gPSBudWxsO1xuICAgIGlmICghdGV4dCAmJiBsZW4gPiAyKSB7XG4gICAgICAgIGNoaWxkcmVuID0gQXJyYXkobGVuIC0gMik7XG4gICAgICAgIGZvciAodmFyIGkgPSAyOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIGNoaWxkcmVuW2kgLSAyXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlmIChpc0ZyYWdtZW50KSB7XG4gICAgICAgIGlmICh0eXBlb2YgdGFnID09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgVkNvbXBvbmVudCh0YWcsIGF0dHJzLCBjaGlsZHJlbiwgYXR0cnMgPyBhdHRycy5rZXkgOiBudWxsKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgVkZyYWdtZW50Tm9kZSh0YWcsIGF0dHJzLCBjaGlsZHJlbiwgYXR0cnMgPyBhdHRycy5rZXkgOiBudWxsKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGdldE5Ob2RlKHRhZywgYXR0cnMsIGNoaWxkcmVuLCBhdHRycyA/IGF0dHJzLmtleSA6IG51bGwsIHRleHQpO1xuICAgIH1cbn1cblxuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9jcmVhdGUuanNcbiAqKi8iLCJleHBvcnQgbGV0IGF0dHJzID0ge1xuICAgIGFjY2VwdDogJ2FjY2VwdCcsXG4gICAgYWNjZXB0Q2hhcnNldDogJ2FjY2VwdC1jaGFyc2V0JyxcbiAgICBhY2Nlc3NLZXk6ICdhY2Nlc3NLZXknLFxuICAgIGFjdGlvbjogJ2FjdGlvbicsXG4gICAgYWxsb3dGdWxsU2NyZWVuOiAnYWxsb3dGdWxsU2NyZWVuJyxcbiAgICBhbGxvd1RyYW5zcGFyZW5jeTogJ2FsbG93VHJhbnNwYXJlbmN5JyxcbiAgICBhbHQ6ICdhbHQnLFxuICAgIGFzeW5jOiAnYXN5bmMnLFxuICAgIGF1dG9Db21wbGV0ZTogJ2F1dG9Db21wbGV0ZScsXG4gICAgYXV0b1BsYXk6ICdhdXRvUGxheScsXG4gICAgY2FwdHVyZTogJ2NhcHR1cmUnLFxuICAgIGNlbGxQYWRkaW5nOiAnY2VsbFBhZGRpbmcnLFxuICAgIGNlbGxTcGFjaW5nOiAnY2VsbFNwYWNpbmcnLFxuICAgIGNoYXJTZXQ6ICdjaGFyU2V0JyxcbiAgICBjaGFsbGVuZ2U6ICdjaGFsbGVuZ2UnLFxuICAgIGNsYXNzSUQ6ICdjbGFzc0lEJyxcbiAgICBjb2xzOiAnY29scycsXG4gICAgY29sU3BhbjogJ2NvbFNwYW4nLFxuICAgIGNvbnRlbnQ6ICdjb250ZW50JyxcbiAgICBjb250ZW50RWRpdGFibGU6ICdjb250ZW50RWRpdGFibGUnLFxuICAgIGNvbnRleHRNZW51OiAnY29udGV4dE1lbnUnLFxuICAgIGNvb3JkczogJ2Nvb3JkcycsXG4gICAgY3Jvc3NPcmlnaW46ICdjcm9zc09yaWdpbicsXG4gICAgZGF0YTogJ2RhdGEnLFxuICAgIGRhdGVUaW1lOiAnZGF0ZVRpbWUnLFxuICAgIGRlZmVyOiAnZGVmZXInLFxuICAgIGRpcjogJ2RpcicsXG4gICAgZGlzYWJsZWQ6ICdkaXNhYmxlZCcsXG4gICAgZG93bmxvYWQ6ICdkb3dubG9hZCcsXG4gICAgZHJhZ2dhYmxlOiAnZHJhZ2dhYmxlJyxcbiAgICBlbmNUeXBlOiAnZW5jVHlwZScsXG4gICAgZm9ybTogJ2Zvcm0nLFxuICAgIGZvcm1BY3Rpb246ICdmb3JtQWN0aW9uJyxcbiAgICBmb3JtRW5jVHlwZTogJ2Zvcm1FbmNUeXBlJyxcbiAgICBmb3JtTWV0aG9kOiAnZm9ybU1ldGhvZCcsXG4gICAgZm9ybU5vVmFsaWRhdGU6ICdmb3JtTm9WYWxpZGF0ZScsXG4gICAgZm9ybVRhcmdldDogJ2Zvcm1UYXJnZXQnLFxuICAgIGZyYW1lQm9yZGVyOiAnZnJhbWVCb3JkZXInLFxuICAgIGhlYWRlcnM6ICdoZWFkZXJzJyxcbiAgICBoZWlnaHQ6ICdoZWlnaHQnLFxuICAgIGhpZGRlbjogJ2hpZGRlbicsXG4gICAgaGlnaDogJ2hpZ2gnLFxuICAgIGhyZWY6ICdocmVmJyxcbiAgICBocmVmTGFuZzogJ2hyZWZMYW5nJyxcbiAgICBodG1sRm9yOiAnZm9yJyxcbiAgICBodHRwRXF1aXY6ICdodHRwLWVxdWl2JyxcbiAgICBpY29uOiAnaWNvbicsXG4gICAgaW5wdXRNb2RlOiAnaW5wdXRNb2RlJyxcbiAgICBpczogJ2lzJyxcbiAgICBrZXlQYXJhbXM6ICdrZXlQYXJhbXMnLFxuICAgIGtleVR5cGU6ICdrZXlUeXBlJyxcbiAgICBsYWJlbDogJ2xhYmVsJyxcbiAgICBsYW5nOiAnbGFuZycsXG4gICAgbGlzdDogJ2xpc3QnLFxuICAgIGxvdzogJ2xvdycsXG4gICAgbWFuaWZlc3Q6ICdtYW5pZmVzdCcsXG4gICAgbWFyZ2luSGVpZ2h0OiAnbWFyZ2luSGVpZ2h0JyxcbiAgICBtYXJnaW5XaWR0aDogJ21hcmdpbldpZHRoJyxcbiAgICBtYXg6ICdtYXgnLFxuICAgIG1heExlbmd0aDogJ21heExlbmd0aCcsXG4gICAgbWVkaWE6ICdtZWRpYScsXG4gICAgbWVkaWFHcm91cDogJ21lZGlhR3JvdXAnLFxuICAgIG1ldGhvZDogJ21ldGhvZCcsXG4gICAgbWluOiAnbWluJyxcbiAgICBtaW5MZW5ndGg6ICdtaW5MZW5ndGgnLFxuICAgIG5hbWU6ICduYW1lJyxcbiAgICBub1ZhbGlkYXRlOiAnbm9WYWxpZGF0ZScsXG4gICAgb3BlbjogJ29wZW4nLFxuICAgIG9wdGltdW06ICdvcHRpbXVtJyxcbiAgICBwYXR0ZXJuOiAncGF0dGVybicsXG4gICAgcGxhY2Vob2xkZXI6ICdwbGFjZWhvbGRlcicsXG4gICAgcG9zdGVyOiAncG9zdGVyJyxcbiAgICBwcmVsb2FkOiAncHJlbG9hZCcsXG4gICAgcmFkaW9Hcm91cDogJ3JhZGlvR3JvdXAnLFxuICAgIHJlbDogJ3JlbCcsXG4gICAgcmVxdWlyZWQ6ICdyZXF1aXJlZCcsXG4gICAgcm9sZTogJ3JvbGUnLFxuICAgIHJvd3M6ICdyb3dzJyxcbiAgICByb3dTcGFuOiAncm93U3BhbicsXG4gICAgc2FuZGJveDogJ3NhbmRib3gnLFxuICAgIHNjb3BlOiAnc2NvcGUnLFxuICAgIHNjb3BlZDogJ3Njb3BlZCcsXG4gICAgc2Nyb2xsaW5nOiAnc2Nyb2xsaW5nJyxcbiAgICBzZWFtbGVzczogJ3NlYW1sZXNzJyxcbiAgICBzaGFwZTogJ3NoYXBlJyxcbiAgICBzaXplOiAnc2l6ZScsXG4gICAgc2l6ZXM6ICdzaXplcycsXG4gICAgc3BhbjogJ3NwYW4nLFxuICAgIHNwZWxsQ2hlY2s6ICdzcGVsbENoZWNrJyxcbiAgICBzcmM6ICdzcmMnLFxuICAgIHNyY1NldDogJ3NyY1NldCcsXG4gICAgc3RhcnQ6ICdzdGFydCcsXG4gICAgc3RlcDogJ3N0ZXAnLFxuICAgIHN0eWxlOiAnc3R5bGUnLFxuICAgIHRhYkluZGV4OiAndGFiSW5kZXgnLFxuICAgIHRhcmdldDogJ3RhcmdldCcsXG4gICAgdGl0bGU6ICd0aXRsZScsXG4gICAgdHlwZTogJ3R5cGUnLFxuICAgIHVzZU1hcDogJ3VzZU1hcCcsXG4gICAgd2lkdGg6ICd3aWR0aCcsXG4gICAgd21vZGU6ICd3bW9kZScsXG4gICAgYXV0b0NhcGl0YWxpemU6ICdhdXRvQ2FwaXRhbGl6ZScsXG4gICAgYXV0b0NvcnJlY3Q6ICdhdXRvQ29ycmVjdCcsXG4gICAgaXRlbVByb3A6ICdpdGVtUHJvcCcsXG4gICAgaXRlbVNjb3BlOiAnaXRlbVNjb3BlJyxcbiAgICBpdGVtVHlwZTogJ2l0ZW1UeXBlJyxcbiAgICBpdGVtSUQ6ICdpdGVtSUQnLFxuICAgIGl0ZW1SZWY6ICdpdGVtUmVmJyxcbiAgICBwcm9wZXJ0eTogJ3Byb3BlcnR5JyxcbiAgICBzZWN1cml0eTogJ3NlY3VyaXR5JyxcbiAgICB1bnNlbGVjdGFibGU6ICd1bnNlbGVjdGFibGUnLFxufTtcblxuZXhwb3J0IGxldCBwcm9wcyA9IHtcbiAgICBjaGVja2VkOiAnY2hlY2tlZCcsXG4gICAgY2xhc3NOYW1lOiAnY2xhc3NOYW1lJyxcbiAgICBjb250cm9sczogJ2NvbnRyb2xzJyxcbiAgICBpZDogJ2lkJyxcbiAgICBsb29wOiAnbG9vcCcsXG4gICAgbXVsdGlwbGU6ICdtdWx0aXBsZScsXG4gICAgbXV0ZWQ6ICdtdXRlZCcsXG4gICAgcmVhZE9ubHk6ICdyZWFkT25seScsXG4gICAgc2VsZWN0ZWQ6ICdzZWxlY3RlZCcsXG4gICAgc3JjRG9jOiAnc3JjZG9jJyxcbiAgICB2YWx1ZTogJ3ZhbHVlJ1xufTtcblxuZXhwb3J0IGxldCBub3RQeCA9IHtcbiAgICBib3hGbGV4OiB0cnVlLFxuICAgIGJveEZsZXhHcm91cDogdHJ1ZSxcbiAgICBjb2x1bW5Db3VudDogdHJ1ZSxcbiAgICBmaWxsT3BhY2l0eTogdHJ1ZSxcbiAgICBmbGV4OiB0cnVlLFxuICAgIGZsZXhHcm93OiB0cnVlLFxuICAgIGZsZXhQb3NpdGl2ZTogdHJ1ZSxcbiAgICBmbGV4U2hyaW5rOiB0cnVlLFxuICAgIGZsZXhOZWdhdGl2ZTogdHJ1ZSxcbiAgICBmb250V2VpZ2h0OiB0cnVlLFxuICAgIGxpbmVDbGFtcDogdHJ1ZSxcbiAgICBsaW5lSGVpZ2h0OiB0cnVlLFxuICAgIG9wYWNpdHk6IHRydWUsXG4gICAgb3JkZXI6IHRydWUsXG4gICAgb3JwaGFuczogdHJ1ZSxcbiAgICBzdHJva2VPcGFjaXR5OiB0cnVlLFxuICAgIHdpZG93czogdHJ1ZSxcbiAgICB6SW5kZXg6IHRydWUsXG4gICAgem9vbTogdHJ1ZVxufTtcblxuZXhwb3J0IGxldCBldmVudHMgPSB7XG4gICAgb25SZW5kZXI6IFwicmVuZGVyXCIsXG4gICAgb25DbGljazogKCgnb250b3VjaGVuZCcgaW4gd2luZG93KSkgPyAndG91Y2hlbmQnIDogJ2NsaWNrJyxcbiAgICBvbkRibENsaWNrOiAnZGJsY2xpY2snLFxuXG4gICAgb25Nb3VzZURvd246ICdtb3VzZWRvd24nLFxuICAgIG9uTW91c2VVcDogJ21vdXNldXAnLFxuICAgIG9uTW91c2VNb3ZlOiAnbW91c2Vtb3ZlJyxcbiAgICBvbk1vdXNlRW50ZXI6ICdtb3VzZWVudGVyJyxcbiAgICBvbk1vdXNlTGVhdmU6ICdtb3VzZWxlYXZlJyxcbiAgICBvbk1vdXNlT3ZlcjogJ21vdXNlb3ZlcicsXG4gICAgb25Nb3VzZU91dDogJ21vdXNlb3V0JyxcblxuICAgIG9uVG91Y2hTdGFydDogJ3RvdWNoc3RhcnQnLFxuICAgIG9uVG91Y2hFbmQ6ICd0b3VjaGVuZCcsXG4gICAgb25Ub3VjaE1vdmU6ICd0b3VjaG1vdmUnLFxuICAgIG9uVG91Y2hDYW5jZWw6ICd0b3VjaGNhbmNlbCcsXG4gICAgb25Ub3VjaExlYXZlOiAndG91Y2hsZWF2ZScsXG5cbiAgICBvbkNvbnRleHRNZW51OiAnY29udGV4dG1lbnUnLFxuXG4gICAgb25JbnB1dDogJ2lucHV0JyxcbiAgICBvbkZvY3VzOiAnZm9jdXMnLFxuICAgIG9uQ2hhbmdlOiAnY2hhbmdlJyxcblxuICAgIG9uS2V5RG93bjogJ2tleWRvd24nLFxuICAgIG9uS2V5UHJlc3M6ICdrZXlwcmVzcycsXG4gICAgb25LZXlVcDogJ2tleXVwJ1xufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2F0dHJzLmpzXG4gKiovIiwiaW1wb3J0IHtnZXRUZXh0Tm9kZSwgVkZyYWdtZW50Tm9kZX0gZnJvbSAnLi9ub2RlJztcblxuZXhwb3J0IGxldCBERUJVRyA9IGZhbHNlO1xuZXhwb3J0IGZ1bmN0aW9uIG5vcm1DaGlsZCh2ZG9tLCBpKSB7XG4gICAgaWYgKHZkb20uY2hpbGRyZW5baV0gJiYgdHlwZW9mIHZkb20uY2hpbGRyZW5baV0gPT0gJ29iamVjdCcgJiYgdmRvbS5jaGlsZHJlbltpXS50YWcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgY2hpbGQgPSB2ZG9tLmNoaWxkcmVuW2ldO1xuICAgIGlmICh0eXBlb2YgY2hpbGQgPT0gJ3N0cmluZycgfHwgdHlwZW9mIGNoaWxkID09ICdudW1iZXInKSB7XG4gICAgICAgIHZkb20uY2hpbGRyZW5baV0gPSBnZXRUZXh0Tm9kZShjaGlsZCk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGNoaWxkID09IG51bGwpIHtcbiAgICAgICAgdmRvbS5jaGlsZHJlbltpXSA9IGdldFRleHROb2RlKCcnKTtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGNoaWxkID09PSAnb2JqZWN0Jykge1xuICAgICAgICBpZiAoY2hpbGQgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgdmRvbS5jaGlsZHJlbltpXSA9IG5ldyBWRnJhZ21lbnROb2RlKCdtYXAnLCBudWxsLCBjaGlsZCwgbnVsbCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2ZG9tLmNoaWxkcmVuW2ldID0gZ2V0VGV4dE5vZGUoSlNPTi5zdHJpbmdpZnkoY2hpbGQpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgY2hpbGQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdmRvbS5jaGlsZHJlbltpXSA9IGdldFRleHROb2RlKCdGdW5jdGlvbicpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdmRvbS5jaGlsZHJlbltpXSA9IGdldFRleHROb2RlKCcnKTtcbiAgICB9XG4gICAgLy9yZXR1cm4gdmRvbS5jaGlsZHJlbltpXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEZpcnN0Q2hpbGQob2xkKSB7XG4gICAgdmFyIGJlZm9yZUNoaWxkID0gb2xkLmNoaWxkcmVuWzBdO1xuICAgIHdoaWxlIChiZWZvcmVDaGlsZCAmJiBiZWZvcmVDaGlsZC5mcmFnbWVudCkge1xuICAgICAgICBiZWZvcmVDaGlsZCA9IGJlZm9yZUNoaWxkLmNoaWxkcmVuWzBdO1xuICAgIH1cbiAgICByZXR1cm4gYmVmb3JlQ2hpbGQ7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy91dGlscy5qc1xuICoqLyIsInZhciBpZCA9IDE7XG5cbnZhciBwcm90byA9IHtcbiAgICB0ZXh0OiBudWxsLFxuICAgIGRvbTogbnVsbCxcbiAgICB0YWc6IG51bGwsXG4gICAgYXR0cnM6IG51bGwsXG4gICAgY2hpbGRyZW46IG51bGwsXG4gICAgYWxsQXR0cnM6IG51bGwsXG4gICAgZnJhZ21lbnQ6IGZhbHNlLFxuICAgIGNvbXBvbmVudDogbnVsbCxcbiAgICBrZXk6IG51bGwsXG4gICAga2V5TWFwOiBudWxsLFxuICAgIHZub2RlOiB0cnVlLFxuICAgIGlzTWFwOiBmYWxzZSxcbiAgICBkZXN0cm95ZWQ6IG51bGwsXG4gICAgZGVzdHJveTogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmRvbSA9IG51bGw7XG4gICAgICAgIHRoaXMuY2hpbGRyZW4gPSBudWxsO1xuICAgICAgICB0aGlzLmF0dHJzID0gbnVsbDtcbiAgICAgICAgLy90aGlzLmRlc3Ryb3llZCA9IHRydWU7XG4gICAgICAgIC8vdGhpcy5wYXJlbnQgPSBudWxsO1xuICAgIH1cbn07XG5cbmZ1bmN0aW9uIGNsYXNzRXh0ZW5kKENsYXNzLCBwcm90bywgb3ZlcnJpZGVzKSB7XG4gICAgZm9yICh2YXIgcHJvcCBpbiBwcm90bykge1xuICAgICAgICBDbGFzcy5wcm90b3R5cGVbcHJvcF0gPSBwcm90b1twcm9wXTtcbiAgICB9XG4gICAgZm9yIChwcm9wIGluIG92ZXJyaWRlcykge1xuICAgICAgICBDbGFzcy5wcm90b3R5cGVbcHJvcF0gPSBvdmVycmlkZXNbcHJvcF07XG4gICAgfVxufVxuXG4vL3ZhciBjYWNoZUZyYW1lbnRzID0gW107XG4vL3ZhciBjYWNoZUNvbXBvbmVudCA9IFtdO1xudmFyIGNhY2hlTm9kZSA9IFtdO1xudmFyIGNhY2hlVGV4dE5vZGUgPSBbXTtcblxuXG5leHBvcnQgZnVuY3Rpb24gVkZyYWdtZW50Tm9kZSh0YWcsIGF0dHJzLCBjaGlsZHJlbiwga2V5KSB7XG4gICAgdGhpcy5pZCA9IGlkKys7XG4gICAgdGhpcy50YWcgPSB0YWc7XG4gICAgaWYgKHRhZyA9PSAnbWFwJykge1xuICAgICAgICB0aGlzLmtleU1hcCA9IHt9O1xuICAgICAgICB0aGlzLmlzTWFwID0gdHJ1ZTtcbiAgICB9XG4gICAgdGhpcy5jaGlsZHJlbiA9IGNoaWxkcmVuO1xuICAgIGlmIChrZXkpIHtcbiAgICAgICAgdGhpcy5rZXkgPSBrZXk7XG4gICAgfVxuICAgIC8vdGhpcy5wYXJlbnQgPSBudWxsO1xuICAgIHRoaXMuZG9tID0gbnVsbDtcbiAgICB0aGlzLmF0dHJzID0gYXR0cnM7XG59XG5jbGFzc0V4dGVuZChWRnJhZ21lbnROb2RlLCBwcm90bywge1xuICAgIGZyYWdtZW50OiB0cnVlLFxuICAgIGRlc3Ryb3k6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5kb20gPSBudWxsO1xuICAgICAgICB0aGlzLmNoaWxkcmVuID0gbnVsbDtcbiAgICAgICAgLy90aGlzLmF0dHJzID0gbnVsbDtcbiAgICAgICAgdGhpcy5rZXlNYXAgPSBudWxsO1xuICAgICAgICAvL3RoaXMuZGVzdHJveWVkID0gdHJ1ZTtcbiAgICAgICAgLy90aGlzLnBhcmVudCA9IG51bGw7XG4gICAgfVxufSk7XG5cblxuZXhwb3J0IGZ1bmN0aW9uIFZDb21wb25lbnQodGFnLCBhdHRycywgY2hpbGRyZW4sIGtleSkge1xuICAgIC8vb2JqZWN0cy5wdXNoKHRoaXMpO1xuICAgIHRoaXMuaWQgPSBpZCsrO1xuICAgIHRoaXMudGFnID0gdGFnO1xuICAgIHRoaXMuY2hpbGRyZW4gPSBjaGlsZHJlbjtcbiAgICB0aGlzLmZyYWdtZW50ID0gdHJ1ZTtcbiAgICBpZiAoa2V5KSB7XG4gICAgICAgIHRoaXMua2V5ID0ga2V5O1xuICAgIH1cbiAgICAvL3RoaXMucGFyZW50ID0gbnVsbDtcbiAgICB0aGlzLmRvbSA9IG51bGw7XG4gICAgdGhpcy5hdHRycyA9IGF0dHJzO1xuICAgIC8vdGhpcy5kZXN0cm95ZWQgPSBudWxsO1xuICAgIC8vdGhpcy5kZXN0cm95ZWQgPSBudWxsO1xufVxuY2xhc3NFeHRlbmQoVkNvbXBvbmVudCwgcHJvdG8sIHtmcmFnbWVudDogdHJ1ZX0pO1xuXG5cbnZhciBub2Rlc0NhY2hlID0gbmV3IEFycmF5KDEwMDAwMDApO1xubm9kZXNDYWNoZS5sZW4gPSAwO1xuXG5mdW5jdGlvbiBOTm9kZSh0YWcsIGF0dHJzLCBjaGlsZHJlbiwga2V5LCB0ZXh0KSB7XG4gICAgLy9vYmplY3RzLnB1c2godGhpcyk7XG4gICAgdGhpcy5pZCA9IGlkKys7XG4gICAgdGhpcy50YWcgPSB0YWc7XG4gICAgdGhpcy5hdHRycyA9IGF0dHJzO1xuICAgIHRoaXMuY2hpbGRyZW4gPSBjaGlsZHJlbjtcbiAgICBpZiAodGV4dCkge1xuICAgICAgICB0aGlzLnRleHQgPSB0ZXh0O1xuICAgIH1cbiAgICB0aGlzLmFsbEF0dHJzID0gJyc7XG4gICAgdGhpcy5rZXkgPSBrZXk7XG4gICAgdGhpcy5kb20gPSBudWxsO1xuICAgIC8vdGhpcy5wYXJlbnQgPSBudWxsO1xuICAgIC8vdGhpcy5kZXN0cm95ZWQgPSBudWxsO1xufVxuY2xhc3NFeHRlbmQoTk5vZGUsIHByb3RvLCB7XG4gICAgZGVzdHJveTogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmRvbSA9IG51bGw7XG4gICAgICAgIHRoaXMuY2hpbGRyZW4gPSBudWxsO1xuICAgICAgICB0aGlzLmF0dHJzID0gbnVsbDtcbiAgICAgICAgLy9ub2Rlc0NhY2hlW25vZGVzQ2FjaGUubGVuKytdID0gdGhpcztcbiAgICAgICAgLy90aGlzLmRlc3Ryb3llZCA9IHRydWU7XG4gICAgICAgIC8vdGhpcy5wYXJlbnQgPSBudWxsO1xuICAgIH1cbn0pO1xuZXhwb3J0IGZ1bmN0aW9uIGdldE5Ob2RlKHRhZywgYXR0cnMsIGNoaWxkcmVuLCBrZXksIHRleHQpIHtcbiAgICBpZiAobm9kZXNDYWNoZS5sZW4gPT0gMCkge1xuICAgICAgICByZXR1cm4gbmV3IE5Ob2RlKHRhZywgYXR0cnMsIGNoaWxkcmVuLCBrZXksIHRleHQpO1xuICAgIH1cbiAgICB2YXIgaXRlbSA9IG5vZGVzQ2FjaGVbLS1ub2Rlc0NhY2hlLmxlbl07XG4gICAgaXRlbS50YWcgPSB0YWc7XG4gICAgaXRlbS5hdHRycyA9IGF0dHJzO1xuICAgIGl0ZW0uY2hpbGRyZW4gPSBjaGlsZHJlbjtcbiAgICBpdGVtLmtleSA9IGtleTtcbiAgICAvL2l0ZW0udGV4dCA9IHRleHQ7XG4gICAgcmV0dXJuIGl0ZW07XG59XG5cblxudmFyIHRleHROb2Rlc0NhY2hlID0gbmV3IEFycmF5KDEwMDAwMDApO1xudGV4dE5vZGVzQ2FjaGUubGVuID0gMDtcblxuZnVuY3Rpb24gVlRleHROb2RlKHRleHQpIHtcbiAgICB0aGlzLmlkID0gaWQrKztcbiAgICB0aGlzLmRvbSA9IG51bGw7XG4gICAgdGhpcy50ZXh0ID0gdGV4dDtcbiAgICAvL3RoaXMucGFyZW50ID0gbnVsbDtcbiAgICAvL3RoaXMuZGVzdHJveWVkID0gbnVsbDtcbn1cbmNsYXNzRXh0ZW5kKFZUZXh0Tm9kZSwgcHJvdG8sIHtcbiAgICB0YWc6ICcjJyxcbiAgICBkZXN0cm95OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuZG9tID0gbnVsbDtcbiAgICAgICAgdGV4dE5vZGVzQ2FjaGVbdGV4dE5vZGVzQ2FjaGUubGVuKytdID0gdGhpcztcbiAgICAgICAgLy90aGlzLmRlc3Ryb3llZCA9IHRydWU7XG4gICAgICAgIC8vdGhpcy5wYXJlbnQgPSBudWxsO1xuICAgIH1cbn0pO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0VGV4dE5vZGUodGV4dCkge1xuICAgIGlmICh0ZXh0Tm9kZXNDYWNoZS5sZW4gPT0gMCkge1xuICAgICAgICByZXR1cm4gbmV3IFZUZXh0Tm9kZSh0ZXh0KTtcbiAgICB9XG4gICAgdmFyIGl0ZW0gPSB0ZXh0Tm9kZXNDYWNoZVstLXRleHROb2Rlc0NhY2hlLmxlbl07XG4gICAgaXRlbS50ZXh0ID0gdGV4dDtcbiAgICByZXR1cm4gaXRlbTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL25vZGUuanNcbiAqKi8iLCIvKipcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLSBUaGUgTGlmZS1DeWNsZSBvZiBhIENvbXBvc2l0ZSBDb21wb25lbnQgLS0tLS0tLS0tLS0tLS0tLS0tXG4gKlxuICogKyBjb25zdHJ1Y3RvcjogSW5pdGlhbGl6YXRpb24gb2Ygc3RhdGUuIFRoZSBpbnN0YW5jZSBpcyBub3cgcmV0YWluZWQuXG4gKiAgICsgY29tcG9uZW50V2lsbE1vdW50XG4gKiAgICsgcmVuZGVyXG4gKiAgICsgW2NoaWxkcmVuJ3MgY29uc3RydWN0b3JzXVxuICogICAgICsgW2NoaWxkcmVuJ3MgY29tcG9uZW50V2lsbE1vdW50IGFuZCByZW5kZXJdXG4gKiAgICAgKyBbY2hpbGRyZW4ncyBjb21wb25lbnREaWRNb3VudF1cbiAqICAgICArIGNvbXBvbmVudERpZE1vdW50XG4gKlxuICogICAgICAgVXBkYXRlIFBoYXNlczpcbiAqICAgICAgICsgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyAob25seSBjYWxsZWQgaWYgcGFyZW50IHVwZGF0ZWQpXG4gKiAgICAgICAtIHNob3VsZENvbXBvbmVudFVwZGF0ZVxuICogICAgICAgICArIGNvbXBvbmVudFdpbGxVcGRhdGVcbiAqICAgICAgICAgICArIHJlbmRlclxuICogICAgICAgICAgICsgW2NoaWxkcmVuJ3MgY29uc3RydWN0b3JzIG9yIHJlY2VpdmUgcHJvcHMgcGhhc2VzXVxuICogICAgICAgICArIGNvbXBvbmVudERpZFVwZGF0ZVxuICpcbiAqICAgICArIGNvbXBvbmVudFdpbGxVbm1vdW50XG4gKiAgICAgKyBbY2hpbGRyZW4ncyBjb21wb25lbnRXaWxsVW5tb3VudF1cbiAqICAgLSBbY2hpbGRyZW4gZGVzdHJveWVkXVxuICogLSAoZGVzdHJveWVkKTogVGhlIGluc3RhbmNlIGlzIG5vdyBibGFuaywgcmVsZWFzZWQgYnkgUmVhY3QgYW5kIHJlYWR5IGZvciBHQy5cbiAqXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5pbXBvcnQge3VwZGF0ZUNoaWxkcmVufSBmcm9tICcuL3VwZGF0ZSc7XG5pbXBvcnQge1ZDb21wb25lbnR9IGZyb20gJy4vbm9kZSc7XG5pbXBvcnQge0RFQlVHfSBmcm9tICcuL3V0aWxzJztcblxuXG5leHBvcnQgZnVuY3Rpb24gZmluZERPTU5vZGUodmRvbSkge1xuICAgIHJldHVybiB2ZG9tLmRvbTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIENvbXBvbmVudChwcm9wcykge1xuICAgIHRoaXMucHJvcHMgPSBwcm9wcztcbn1cblxuQ29tcG9uZW50LnByb3RvdHlwZS5jb21wb25lbnRXaWxsTW91bnQgPSBmdW5jdGlvbiAoKSB7fTtcbkNvbXBvbmVudC5wcm90b3R5cGUuY29tcG9uZW50RGlkTW91bnQgPSBmdW5jdGlvbiAoKSB7fTtcblxuQ29tcG9uZW50LnByb3RvdHlwZS5jb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzID0gZnVuY3Rpb24gKCkge307XG5Db21wb25lbnQucHJvdG90eXBlLmNvbXBvbmVudFdpbGxVcGRhdGUgPSBmdW5jdGlvbiAoKSB7fTtcbkNvbXBvbmVudC5wcm90b3R5cGUuY29tcG9uZW50RGlkVXBkYXRlID0gZnVuY3Rpb24gKCkge307XG5cbkNvbXBvbmVudC5wcm90b3R5cGUuY29tcG9uZW50V2lsbFVubW91bnQgPSBmdW5jdGlvbiAoKSB7fTtcblxuXG5Db21wb25lbnQucHJvdG90eXBlLnVwZGF0ZVByb3BzID0gZnVuY3Rpb24gKHByb3BzKSB7XG4gICAgdGhpcy5jb21wb25lbnRXaWxsVXBkYXRlKHByb3BzKTtcbiAgICAvL3ZhciBvbGRQcm9wcyA9IHRoaXMucHJvcHM7XG4gICAgdGhpcy5wcm9wcyA9IHByb3BzO1xuICAgIHZhciBuZXdOb2RlID0gbmV3IFZDb21wb25lbnQodGhpcy5jb25zdHJ1Y3RvciwgbnVsbCwgW3RoaXMucmVuZGVyKCldLCBudWxsKTtcbiAgICB1cGRhdGVDaGlsZHJlbih0aGlzLm5vZGUsIG5ld05vZGUpO1xuICAgIHRoaXMubm9kZS5jaGlsZHJlbiA9IG5ld05vZGUuY2hpbGRyZW47XG4gICAgLy90b2RvOmNvbXBvbmVudERpZFVwZGF0ZShvYmplY3QgcHJldlByb3BzLCBvYmplY3QgcHJldlN0YXRlKVxuICAgIHRoaXMuY29tcG9uZW50RGlkVXBkYXRlKHRoaXMucHJvcHMpO1xufTtcblxuQ29tcG9uZW50LnByb3RvdHlwZS5mb3JjZVVwZGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnVwZGF0ZVByb3BzKHRoaXMucHJvcHMpO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZUNvbXBvbmVudChvbGQsIHZkb20pIHtcbiAgICB2ZG9tLmNvbXBvbmVudCA9IG9sZC5jb21wb25lbnQ7XG4gICAgdmFyIHByb3BzID0gdmRvbS5hdHRycyB8fCB7fTtcbiAgICBwcm9wcy5jaGlsZHJlbiA9IHZkb20uY2hpbGRyZW47XG4gICAgdmRvbS5jaGlsZHJlbiA9IG51bGw7XG4gICAgdmRvbS5jb21wb25lbnQuY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhwcm9wcyk7XG4gICAgdmRvbS5jb21wb25lbnQudXBkYXRlUHJvcHMocHJvcHMpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQ29tcG9uZW50KHZkb20pIHtcbiAgICB2YXIgcHJvcHMgPSB2ZG9tLmF0dHJzIHx8IHt9O1xuICAgIHByb3BzLmNoaWxkcmVuID0gdmRvbS5jaGlsZHJlbjtcbiAgICB2ZG9tLmNvbXBvbmVudCA9IG5ldyB2ZG9tLnRhZyhwcm9wcyk7XG4gICAgdmRvbS5jb21wb25lbnQuY29tcG9uZW50V2lsbE1vdW50KCk7XG4gICAgdmRvbS5jaGlsZHJlbiA9IFt2ZG9tLmNvbXBvbmVudC5yZW5kZXIoKV07XG4gICAgdmRvbS5jb21wb25lbnQubm9kZSA9IHZkb207XG4gICAgREVCVUcgJiYgY29uc29sZS5sb2codmRvbSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZXN0cm95Q29tcG9uZW50KHZkb20pIHtcbiAgICB2ZG9tLmNvbXBvbmVudC5jb21wb25lbnRXaWxsVW5tb3VudCgpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbW91bnRDb21wb25lbnQodmRvbSkge1xuICAgIHZkb20uY29tcG9uZW50LmNvbXBvbmVudERpZE1vdW50KCk7XG59XG5cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2NvbXBvbmVudC5qc1xuICoqLyIsImltcG9ydCB7YXR0cnMsIHByb3BzLCBldmVudHN9IGZyb20gJy4vYXR0cnMnO1xuaW1wb3J0IHt1cGRhdGVDb21wb25lbnQsIGRlc3Ryb3lDb21wb25lbnR9IGZyb20gJy4vY29tcG9uZW50JztcbmltcG9ydCB7bm9ybUNoaWxkLCBnZXRGaXJzdENoaWxkLCBERUJVR30gZnJvbSAnLi91dGlscyc7XG5pbXBvcnQge2NyZWF0ZX0gZnJvbSAnLi9jcmVhdGUnO1xuXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlKG9sZCwgdmRvbSkge1xuICAgIERFQlVHICYmIGNvbnNvbGUubG9nKFwidXBkYXRlXCIsIHZkb20pO1xuXG4gICAgdmFyIGRvbSA9IG9sZC5kb207XG4gICAgZG9tLnVwZGF0ZWQgPSB0cnVlO1xuICAgIHZkb20uZG9tID0gZG9tO1xuXG4gICAgLy92ZG9tLnBhcmVudCA9IG9sZC5wYXJlbnQ7XG4gICAgaWYgKG9sZC50YWcgIT09IHZkb20udGFnKSB7XG4gICAgICAgIHJlcGxhY2VOb2RlKG9sZCwgdmRvbSk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKG9sZC50YWcgPT0gJyMnKSB7XG4gICAgICAgIGlmIChvbGQudGV4dCAhPT0gdmRvbS50ZXh0KSB7XG4gICAgICAgICAgICBkb20udGV4dENvbnRlbnQgPSB2ZG9tLnRleHQ7XG4gICAgICAgIH1cbiAgICAgICAgb2xkLmRlc3Ryb3koKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAob2xkLnRleHQgIT09IHZkb20udGV4dCkge1xuICAgICAgICBkb20udGV4dENvbnRlbnQgPSB2ZG9tLnRleHQ7XG4gICAgfVxuXG4gICAgaWYgKHZkb20uZnJhZ21lbnQpIHtcbiAgICAgICAgaWYgKHZkb20ua2V5ICE9PSBvbGQua2V5KSB7XG4gICAgICAgICAgICByZXBsYWNlTm9kZShvbGQsIHZkb20pO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB2ZG9tLmFsbEF0dHJzID0gJyc7XG4gICAgICAgIGlmICh2ZG9tLmF0dHJzICYmIG9sZC5hdHRycykge1xuICAgICAgICAgICAgZm9yQXR0cnMob2xkLCB2ZG9tKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoKG9sZC5hdHRycyAmJiAhdmRvbS5hdHRycykgfHwgKCFvbGQuYXR0cnMgJiYgdmRvbS5hdHRycykgfHwgb2xkLmFsbEF0dHJzICE9PSB2ZG9tLmFsbEF0dHJzKSB7XG4gICAgICAgICAgICByZXBsYWNlTm9kZShvbGQsIHZkb20pO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChvbGQuY29tcG9uZW50KSB7XG4gICAgICAgIGlmICh2ZG9tLmlkID09PSAxMDk2KXtcbiAgICAgICAgICAgIGRlYnVnZ2VyO1xuICAgICAgICB9XG4gICAgICAgIHVwZGF0ZUNvbXBvbmVudChvbGQsIHZkb20pO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKCF2ZG9tLnRleHQpIHtcbiAgICAgICAgaWYgKHVwZGF0ZUNoaWxkcmVuKG9sZCwgdmRvbSkpIHtcbiAgICAgICAgICAgIG9sZC5kZXN0cm95KCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBvbGQuZGVzdHJveSgpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlQ2hpbGRyZW4ob2xkLCB2ZG9tKSB7XG4gICAgdmFyIG9sZExlbiA9IG9sZC5jaGlsZHJlbiA/IG9sZC5jaGlsZHJlbi5sZW5ndGggOiAwO1xuICAgIHZhciBuZXdMZW4gPSB2ZG9tLmNoaWxkcmVuID8gdmRvbS5jaGlsZHJlbi5sZW5ndGggOiAwO1xuICAgIGlmIChvbGRMZW4gJiYgbmV3TGVuICYmIHZkb20uaXNNYXAgJiYgb2xkLmlzTWFwKSB7XG4gICAgICAgIG1hcENoaWxkcmVuKG9sZCwgdmRvbSwgZ2V0Rmlyc3RDaGlsZChvbGQpKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChvbGRMZW4gPiAwKSB7XG4gICAgICAgIGlmIChvbGRMZW4gPT09IG5ld0xlbikge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBuZXdMZW47IGkrKykge1xuICAgICAgICAgICAgICAgIG5vcm1DaGlsZCh2ZG9tLCBpKTtcbiAgICAgICAgICAgICAgICB1cGRhdGUob2xkLmNoaWxkcmVuW2ldLCB2ZG9tLmNoaWxkcmVuW2ldKTtcbiAgICAgICAgICAgICAgICAvL2NsZWFyQ2hpbGQob2xkLCBpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBuZXdMZW47IGkrKykge1xuICAgICAgICAgICAgICAgIG5vcm1DaGlsZCh2ZG9tLCBpKTtcbiAgICAgICAgICAgICAgICB2YXIgbmV3Q2hpbGQgPSB2ZG9tLmNoaWxkcmVuW2ldO1xuICAgICAgICAgICAgICAgIGNyZWF0ZShuZXdDaGlsZCwgdmRvbS5kb20pO1xuICAgICAgICAgICAgICAgIGluc2VydChvbGQuZG9tLCBuZXdDaGlsZCwgZ2V0Rmlyc3RDaGlsZChvbGQpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBvbGRMZW47IGkrKykge1xuICAgICAgICAgICAgICAgIHJlbW92ZShvbGQuY2hpbGRyZW5baV0pO1xuICAgICAgICAgICAgICAgIC8vY2xlYXJDaGlsZChvbGQsIGkpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAobmV3TGVuID4gMCkge1xuICAgICAgICByZXBsYWNlTm9kZShvbGQsIHZkb20pO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xufVxuXG5cbmZ1bmN0aW9uIG1hcENoaWxkcmVuKG9sZCwgdmRvbSwgYmVmb3JlQ2hpbGQpIHtcbiAgICB2YXIgcGFyZW50RG9tID0gb2xkLmRvbTtcbiAgICB2YXIga2V5TWFwID0gb2xkLmtleU1hcDtcbiAgICB2YXIgbmV3S2V5TWFwID0gdmRvbS5rZXlNYXA7XG4gICAgdmFyIG5ld0NoaWxkcmVuID0gdmRvbS5jaGlsZHJlbjtcbiAgICB2YXIgbmV3TGVuID0gbmV3Q2hpbGRyZW4ubGVuZ3RoO1xuICAgIHZhciBvbGRMZW4gPSBvbGQuY2hpbGRyZW4ubGVuZ3RoO1xuICAgIHZhciBmb3VuZCA9IDA7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBuZXdMZW47IGkrKykge1xuICAgICAgICBub3JtQ2hpbGQodmRvbSwgaSk7XG4gICAgICAgIHZhciBuZXdDaGlsZCA9IG5ld0NoaWxkcmVuW2ldO1xuICAgICAgICB2YXIgb2xkQ2hpbGQgPSBvbGQuY2hpbGRyZW5baV07XG4gICAgICAgIHZhciBuZXdLZXkgPSBuZXdDaGlsZC5rZXk7XG4gICAgICAgIGlmIChuZXdLZXkgPT0gbnVsbCkge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKCdtYXAgd2l0aG91dCBrZXlzJywgdmRvbSk7XG4gICAgICAgICAgICByZXBsYWNlTm9kZShvbGQsIHZkb20pO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBrZXlDaGlsZCA9IG9sZC5jaGlsZHJlbltrZXlNYXBbbmV3S2V5XV07XG4gICAgICAgIGlmIChrZXlDaGlsZCkge1xuICAgICAgICAgICAgZm91bmQrKztcbiAgICAgICAgICAgIGlmIChrZXlDaGlsZCAhPT0gb2xkQ2hpbGQpIHtcbiAgICAgICAgICAgICAgICBpbnNlcnQocGFyZW50RG9tLCBrZXlDaGlsZCwgYmVmb3JlQ2hpbGQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdXBkYXRlKGtleUNoaWxkLCBuZXdDaGlsZCk7XG4gICAgICAgICAgICBpZiAoa2V5Q2hpbGQgPT0gb2xkQ2hpbGQpIHtcbiAgICAgICAgICAgICAgICBjbGVhckNoaWxkKG9sZCwgaSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBrZXlNYXBbbmV3S2V5XSA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjcmVhdGUobmV3Q2hpbGQsIHZkb20uZG9tKTtcbiAgICAgICAgICAgIGluc2VydChwYXJlbnREb20sIG5ld0NoaWxkLCBiZWZvcmVDaGlsZCk7XG4gICAgICAgIH1cbiAgICAgICAgYmVmb3JlQ2hpbGQgPSBuZXdDaGlsZC5kb20ubmV4dFNpYmxpbmc7XG4gICAgICAgIG5ld0tleU1hcFtuZXdLZXldID0gaTtcbiAgICB9XG4gICAgLy9vbGQua2V5TWFwID0gbnVsbDtcblxuICAgIGlmIChmb3VuZCAhPT0gb2xkTGVuKSB7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBvbGRMZW47IGkrKykge1xuICAgICAgICAgICAgdmFyIGNoaWxkID0gb2xkLmNoaWxkcmVuW2ldO1xuICAgICAgICAgICAgaWYgKGNoaWxkICYmIG5ld0tleU1hcFtjaGlsZC5rZXldID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZW1vdmUoY2hpbGQpO1xuICAgICAgICAgICAgICAgIGNsZWFyQ2hpbGQob2xkLCBpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gcmVwbGFjZU5vZGUob2xkLCB2ZG9tKSB7XG4gICAgdmFyIHBhcmVudERvbSA9IG9sZC5mcmFnbWVudCA/IG9sZC5kb20gOiBvbGQuZG9tLnBhcmVudE5vZGU7XG4gICAgY3JlYXRlKHZkb20sIHBhcmVudERvbSk7XG4gICAgaW5zZXJ0KHBhcmVudERvbSwgdmRvbSwgb2xkLmZyYWdtZW50ID8gZ2V0Rmlyc3RDaGlsZChvbGQpIDogb2xkKTtcbiAgICByZW1vdmUob2xkKTtcbiAgICByZXR1cm4gdmRvbTtcblxufVxuXG5mdW5jdGlvbiBmb3JBdHRycyhvbGQsIHZkb20pIHtcbiAgICB2YXIgYXR0cjtcbiAgICB2YXIgaXNOb3RTYW1lO1xuICAgIHZhciBkb20gPSB2ZG9tLmRvbTtcbiAgICBmb3IgKHZhciBhdHRyTmFtZSBpbiB2ZG9tLmF0dHJzKSB7XG4gICAgICAgIHZkb20uYWxsQXR0cnMgKz0gYXR0ck5hbWU7XG4gICAgICAgIHZhciBhdHRyVmFsID0gdmRvbS5hdHRyc1thdHRyTmFtZV07XG4gICAgICAgIGlmIChhdHRyTmFtZSA9PSAna2V5Jykge31cbiAgICAgICAgZWxzZSBpZiAoKGlzTm90U2FtZSA9IHZkb20uYXR0cnNbYXR0ck5hbWVdICE9PSBvbGQuYXR0cnNbYXR0ck5hbWVdKSAmJiAoYXR0ciA9IHByb3BzW2F0dHJOYW1lXSkpIHtcbiAgICAgICAgICAgIGRvbVthdHRyXSA9IGF0dHJWYWw7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoKGF0dHIgPSBhdHRyc1thdHRyTmFtZV0pICYmIGlzTm90U2FtZSkge1xuICAgICAgICAgICAgaWYgKGF0dHJWYWwgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgZG9tLnJlbW92ZUF0dHJpYnV0ZShhdHRyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGRvbS5zZXRBdHRyaWJ1dGUoYXR0ciwgYXR0clZhbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoYXR0ciA9IGV2ZW50c1thdHRyTmFtZV0gJiYgaXNOb3RTYW1lKSB7XG4gICAgICAgICAgICBkb21bJ29uJyArIGF0dHJdID0gYXR0clZhbDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChhdHRyTmFtZVswXSA9PT0gJ28nICYmIGF0dHJOYW1lWzFdID09PSAnbicgJiYgaXNOb3RTYW1lKSB7XG4gICAgICAgICAgICBhdHRyID0gYXR0ck5hbWUuc3Vic3RyaW5nKDIpLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICBkb21bJ29uJyArIGF0dHJdID0gYXR0clZhbDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChhdHRyTmFtZVswXSA9PT0gJ2QnICYmIGF0dHJOYW1lWzFdID09PSAnYScgJiYgYXR0ck5hbWVbMl0gPT09ICd0JyAmJiBhdHRyTmFtZVszXSA9PT0gJ2EnICYmIGlzTm90U2FtZSkge1xuICAgICAgICAgICAgaWYgKGF0dHJWYWwgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgZG9tLnJlbW92ZUF0dHJpYnV0ZShhdHRyTmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBkb20uc2V0QXR0cmlidXRlKGF0dHJOYW1lLCBhdHRyVmFsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChhdHRyTmFtZSA9PT0gJ3JlZicgJiYgdHlwZW9mIGF0dHJWYWwgPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgYXR0clZhbCh2ZG9tKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gaW5zZXJ0KHBhcmVudERvbSwgdmRvbSwgYmVmb3JlKSB7XG4gICAgaWYgKHZkb20uZnJhZ21lbnQpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB2ZG9tLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpbnNlcnQodmRvbS5kb20sIHZkb20uY2hpbGRyZW5baV0sIGJlZm9yZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBERUJVRyAmJiBjb25zb2xlLmxvZyhcIkluc2VydFwiLCB2ZG9tKTtcbiAgICBwYXJlbnREb20uaW5zZXJ0QmVmb3JlKHZkb20uZG9tLCBiZWZvcmUgJiYgYmVmb3JlLmRvbSk7XG59XG5cblxuZnVuY3Rpb24gY2xlYXJDaGlsZChvbGQsIGkpIHtcbiAgICAvL29sZC5jaGlsZHJlbltpXSA9IG51bGw7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmUob2xkKSB7XG4gICAgREVCVUcgJiYgY29uc29sZS5sb2coXCJyZW1vdmVcIiwgb2xkKTtcblxuICAgIGlmIChvbGQuY29tcG9uZW50KSB7XG4gICAgICAgIGRlc3Ryb3lDb21wb25lbnQob2xkKTtcbiAgICB9XG4gICAgaWYgKG9sZC5jaGlsZHJlbikge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9sZC5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgcmVtb3ZlKG9sZC5jaGlsZHJlbltpXSk7XG4gICAgICAgICAgICBjbGVhckNoaWxkKG9sZCwgaSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKCFvbGQuZnJhZ21lbnQpIHtcbiAgICAgICAgb2xkLmRvbS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG9sZC5kb20pO1xuICAgIH1cbiAgICBvbGQuZGVzdHJveSgpO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdXBkYXRlLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==