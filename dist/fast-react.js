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
	
	__webpack_require__(1);

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
	        for (var i = 0; i < vdom.children.len; i++) {
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
	
	var cacheChildren = new Array(100000);
	exports.cacheChildren = cacheChildren;
	cacheChildren.len = 0;
	
	function createElement(tag, attrs) {
	    var len = arguments.length;
	    var isFragment = tag == '@' || typeof tag == 'function';
	    var text = len == 3 && !isFragment && (typeof arguments[2] == 'string' || typeof arguments[2] == 'number') ? arguments[2] + '' : null;
	    var children = null;
	    if (!text && len > 2) {
	        if (cacheChildren.len == 0) {
	            children = Array(len - 2);
	        } else {
	            children = cacheChildren[--cacheChildren.len];
	        }
	
	        for (var i = 2; i < len; i++) {
	            children[i - 2] = arguments[i];
	        }
	        children.len = len - 2;
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
	    if (!vdom.children[i] || !vdom.children[i].tag) {
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
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	exports.VFragmentNode = VFragmentNode;
	exports.VComponent = VComponent;
	exports.getNNode = getNNode;
	exports.getTextNode = getTextNode;
	
	var _create = __webpack_require__(3);
	
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
	    }
	    this.children = children;
	    if (key) {
	        this.key = key;
	    }
	    //this.parent = null;
	    this.dom = null;
	    this.attrs = attrs;
	}
	
	classExtend(VFragmentNode, proto, { fragment: true });
	
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
	
	window.nNodes = 0;
	var nodesCache = new Array(1000000);
	nodesCache.len = 0;
	
	function NNode(tag, attrs, children, key, text) {
	    //objects.push(this);
	    window.nNodes++;
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
	        //this.dom = null;
	        //this.children = null;
	        //this.attrs = null;
	        if (this.children) {
	            _create.cacheChildren[_create.cacheChildren.len++] = this.children;
	        }
	        nodesCache[nodesCache.len++] = this;
	
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
	    item.text = text;
	    return item;
	}
	
	window.vTextNodes = 0;
	var textNodesCache = new Array(1000000);
	textNodesCache.len = 0;
	
	function VTextNode(text) {
	    this.id = id++;
	    this.dom = null;
	    this.text = text;
	    window.vTextNodes++;
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
	
	var _attrs = __webpack_require__(4);
	
	var _component = __webpack_require__(7);
	
	var _remove = __webpack_require__(9);
	
	var _utils = __webpack_require__(5);
	
	var _create = __webpack_require__(3);
	
	function update(old, vdom) {
	    _utils.DEBUG && console.log('update', vdom);
	
	    var dom = old.dom;
	    dom.updated = true;
	    vdom.dom = dom;
	    //vdom.parent = old.parent;
	    if (old.tag !== vdom.tag) {
	        return replaceNode(old, vdom);
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
	        updateChildren(old, vdom);
	    }
	    old.destroy();
	}
	
	function updateChildren(old, vdom) {
	    var oldLen = old.children ? old.children.len : 0;
	    var newLen = vdom.children ? vdom.children.len : 0;
	    if (oldLen) {
	        var parentDom = old.dom;
	        var beforeChild = (0, _utils.getFirstChild)(old);
	        if (vdom.tag == 'map' && old.tag != 'map' || vdom.tag != 'map' && old.tag == 'map') {
	            replaceNode(old, vdom);
	            return;
	        } else if (vdom.tag == 'map' && old.tag == 'map') {
	            var res = mapChildren(old, vdom, beforeChild);
	            if (res == false) {
	                replaceNode(old, vdom);
	                return;
	            }
	        } else {
	            if (oldLen === newLen) {
	                for (var i = 0; i < newLen; i++) {
	                    (0, _utils.normChild)(vdom, i);
	                    update(old.children[i], vdom.children[i]);
	                    old.children[i] = null;
	                }
	            } else {
	                for (i = 0; i < newLen; i++) {
	                    (0, _utils.normChild)(vdom, i);
	                    var newChild = vdom.children[i];
	                    (0, _create.create)(newChild, vdom.dom);
	                    insert(parentDom, newChild, beforeChild);
	                }
	                for (i = 0; i < oldLen; i++) {
	                    (0, _remove.removeChild)(old, i);
	                }
	            }
	        }
	    } else if (oldLen !== newLen) {
	        replaceNode(old, vdom);
	        return;
	    }
	}
	
	function mapChildren(old, vdom, beforeChild) {
	    var parentDom = old.dom;
	    var keyMap = old.keyMap;
	    var newKeyMap = vdom.keyMap;
	    var newChildren = vdom.children;
	    var newLen = newChildren.len;
	    var oldLen = old.children.len;
	    var found = 0;
	    for (var i = 0; i < newLen; i++) {
	        (0, _utils.normChild)(vdom, i);
	        var newChild = newChildren[i];
	        var oldChild = old.children[i];
	        var newKey = newChild.key;
	        if (newKey == null) {
	            console.warn('map without keys', vdom);
	            return false;
	        }
	        var keyChild = old.children[keyMap[newKey]];
	        if (keyChild) {
	            found++;
	            if (keyChild !== oldChild) {
	                insert(parentDom, keyChild, beforeChild);
	            }
	            update(keyChild, newChild);
	            if (keyChild == oldChild) {
	                old.children[i] = null;
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
	                (0, _remove.removeChild)(old, i);
	            }
	        }
	    }
	    return true;
	}
	
	function replaceNode(old, vdom) {
	    var parentDom = old.fragment ? old.dom : old.dom.parentNode;
	    (0, _create.create)(vdom, parentDom);
	    insert(parentDom, vdom, old.fragment ? (0, _utils.getFirstChild)(old) : old);
	    (0, _remove.remove)(old);
	    return vdom;
	}
	
	function forAttrs(old, vdom) {
	    var attr;
	    var isNotSame;
	    var dom = vdom.dom;
	    for (var attrName in vdom.attrs) {
	        vdom.allAttrs += attrName;
	        var attrVal = vdom.attrs[attrName];
	        if (attrName == 'key') {} else if ((isNotSame = attrVal !== old.attrs[attrName]) && (attr = _attrs.props[attrName])) {
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
	    }
	}
	
	function insert(parentDom, vdom, before) {
	    if (vdom.fragment) {
	        for (var i = 0; i < vdom.children.len; i++) {
	            insert(vdom.dom, vdom.children[i], before);
	        }
	        return;
	    }
	    _utils.DEBUG && console.log('Insert', vdom);
	    parentDom.insertBefore(vdom.dom, before && before.dom);
	}

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	exports.remove = remove;
	exports.removeChild = removeChild;
	
	var _component = __webpack_require__(7);
	
	var _utils = __webpack_require__(5);
	
	function remove(old) {
	    _utils.DEBUG && console.log('remove', old);
	
	    if (old.component) {
	        (0, _component.destroyComponent)(old);
	    }
	    if (old.children) {
	        for (var i = 0; i < old.children.len; i++) {
	            removeChild(old, i);
	        }
	    }
	    if (!old.fragment) {
	        old.dom.parentNode.removeChild(old.dom);
	    }
	    old.destroy();
	}
	
	function removeChild(old, i) {
	    remove(old.children[i]);
	    old.children[i] = null;
	}

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMjU3OGU3NzIzNWE5NDJkOTA2N2IiLCJ3ZWJwYWNrOi8vLy4vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Zhc3QtcmVhY3QuanM/N2RjOSIsIndlYnBhY2s6Ly8vLi9zcmMvZmFzdC1yZWFjdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY3JlYXRlLmpzIiwid2VicGFjazovLy8uL3NyYy9hdHRycy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL25vZGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXBkYXRlLmpzIiwid2VicGFjazovLy8uL3NyYy9yZW1vdmUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7OztBQ3RDQSxvQkFBTyxDQUFDLENBQXNDLENBQUMsQzs7Ozs7O0FDQS9DLDJHQUF5SixFOzs7Ozs7Ozs7Ozs7O21DQ0FuSCxDQUFVOzs7OztvQkFBdkMsTUFBTTs7Ozs7O29CQUFFLGFBQWE7Ozs7c0NBQ1MsQ0FBYTs7Ozs7dUJBQTNDLFNBQVM7Ozs7Ozt1QkFBRSxXQUFXOzs7O21DQUNSLENBQVU7Ozs7O29CQUF4QixNQUFNOzs7Ozs7Ozs7Ozs7O1NDR0MsTUFBTSxHQUFOLE1BQU07U0FRTixNQUFNLEdBQU4sTUFBTTtTQXdGTixrQkFBa0IsR0FBbEIsa0JBQWtCO1NBbUJsQixhQUFhLEdBQWIsYUFBYTs7a0NBeEhNLENBQVM7O2tDQUNiLENBQVM7O2lDQUNVLENBQVE7O3NDQUNaLENBQWE7O0FBRXBE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QUNKO0FBQ0QsU0FBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUU7QUFDZixZQUFHLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO01BQzNDO0FBQ0QsUUFBRyxDQUFDLE9BQU8sRUFBRSxDQUFDO0VBQ2pCOztBQUVNLFVBQVMsV0FBVyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUU7QUFDaEMsV0FBTSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN4QixRQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyIsImZpbGUiOiJmYXN0LXJlYWN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCAyNTc4ZTc3MjM1YTk0MmQ5MDY3YlxuICoqLyIsInJlcXVpcmUoXCJleHBvc2U/RmFzdFJlYWN0IS4vc3JjL2Zhc3QtcmVhY3QuanNcIik7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2luZGV4LmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBnbG9iYWxbXCJGYXN0UmVhY3RcIl0gPSByZXF1aXJlKFwiLSEvVXNlcnMvY29keS9EZXYvZmFzdC1yZWFjdC9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2luZGV4LmpzP3tcXFwic3RhZ2VcXFwiOjAsXFxcImxvb3NlXFxcIjpbXFxcImVzNi5jbGFzc2VzXFxcIl19IS9Vc2Vycy9jb2R5L0Rldi9mYXN0LXJlYWN0L3NyYy9mYXN0LXJlYWN0LmpzXCIpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2V4cG9zZS1sb2FkZXI/RmFzdFJlYWN0IS4vc3JjL2Zhc3QtcmVhY3QuanNcbiAqKiBtb2R1bGUgaWQgPSAxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJleHBvcnQgeyByZW5kZXIsIGNyZWF0ZUVsZW1lbnQgfSBmcm9tICcuL2NyZWF0ZSc7XG5leHBvcnQgeyBDb21wb25lbnQsIGZpbmRET01Ob2RlIH0gZnJvbSAnLi9jb21wb25lbnQnO1xuZXhwb3J0IHsgdXBkYXRlIH0gZnJvbSAnLi91cGRhdGUnO1xuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9mYXN0LXJlYWN0LmpzXG4gKiovIiwiaW1wb3J0IHthdHRycywgcHJvcHMsIGV2ZW50c30gZnJvbSAnLi9hdHRycyc7XG5pbXBvcnQge0RFQlVHLCBub3JtQ2hpbGR9IGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0IHtWRnJhZ21lbnROb2RlLCBWQ29tcG9uZW50LCBnZXROTm9kZX0gZnJvbSAnLi9ub2RlJztcbmltcG9ydCB7Y3JlYXRlQ29tcG9uZW50LCBtb3VudENvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnQnO1xuXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyKHZkb20sIGRvbSkge1xuICAgIGRvbS5hcHBlbmRDaGlsZChjcmVhdGUodmRvbSwgZG9tKSk7XG4gICAgaWYgKHZkb20uY29tcG9uZW50KSB7XG4gICAgICAgIG1vdW50Q29tcG9uZW50KHZkb20pO1xuICAgIH1cbiAgICByZXR1cm4gdmRvbTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZSh2ZG9tLCBwYXJlbnREb20pIHtcbiAgICBERUJVRyAmJiBjb25zb2xlLmxvZyhcIkNyZWF0ZVwiLCB2ZG9tKTtcbiAgICAvL3Zkb20ucGFyZW50ID0gcGFyZW50O1xuICAgIGlmICh2ZG9tLnRhZyA9PSAnIycpIHtcbiAgICAgICAgdmRvbS5kb20gPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh2ZG9tLnRleHQpO1xuICAgICAgICAvL3Zkb20uZG9tLnZpcnR1YWwgPSB2ZG9tO1xuICAgICAgICByZXR1cm4gdmRvbS5kb207XG4gICAgfVxuICAgIHZhciBkb207XG4gICAgaWYgKHZkb20uZnJhZ21lbnQpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB2ZG9tLnRhZyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY3JlYXRlQ29tcG9uZW50KHZkb20pO1xuICAgICAgICB9XG4gICAgICAgIGRvbSA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICAgICAgdmRvbS5kb20gPSBwYXJlbnREb207XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBkb20gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHZkb20udGFnKTtcbiAgICAgICAgdmRvbS5kb20gPSBkb207XG4gICAgICAgIC8vZG9tLnZpcnR1YWwgPSB2ZG9tO1xuICAgIH1cblxuICAgIGlmICh2ZG9tLmNoaWxkcmVuKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdmRvbS5jaGlsZHJlbi5sZW47IGkrKykge1xuICAgICAgICAgICAgbm9ybUNoaWxkKHZkb20sIGkpO1xuICAgICAgICAgICAgdmFyIGNoaWxkID0gdmRvbS5jaGlsZHJlbltpXTtcbiAgICAgICAgICAgIGlmICh2ZG9tLnRhZyA9PT0gJ21hcCcgJiYgY2hpbGQuYXR0cnMpIHtcbiAgICAgICAgICAgICAgICB2ZG9tLmtleU1hcFtjaGlsZC5rZXldID0gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRvbS5hcHBlbmRDaGlsZChjcmVhdGUoY2hpbGQsIHZkb20uZG9tKSk7XG4gICAgICAgICAgICBpZiAoY2hpbGQuY29tcG9uZW50KSB7XG4gICAgICAgICAgICAgICAgbW91bnRDb21wb25lbnQoY2hpbGQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKHZkb20udGV4dCkge1xuICAgICAgICBkb20udGV4dENvbnRlbnQgPSB2ZG9tLnRleHQ7XG4gICAgfVxuICAgIHZkb20uYWxsQXR0cnMgPSAnJztcbiAgICBpZiAodmRvbS5hdHRycyAmJiAhdmRvbS5mcmFnbWVudCkge1xuICAgICAgICBpZiAodmRvbS5hdHRycy5yZWYpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdmRvbS5hdHRycy5yZWYgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICB2ZG9tLmF0dHJzLnJlZih2ZG9tKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vdG9kbzpcbiAgICAgICAgICAgIC8qXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChjdXJyZW50Q29tcG9uZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudENvbXBvbmVudC5yZWZzID0gY3VycmVudENvbXBvbmVudC5yZWZzIHx8IHt9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRDb21wb25lbnQucmVmc1t2ZG9tLmF0dHJzLnJlZl0gPSB2ZG9tO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKi9cbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBhdHRyO1xuICAgICAgICB2YXIgcHJvcDtcbiAgICAgICAgdmFyIGV2ZW50O1xuICAgICAgICBmb3IgKHZhciBhdHRyTmFtZSBpbiB2ZG9tLmF0dHJzKSB7XG4gICAgICAgICAgICB2ZG9tLmFsbEF0dHJzICs9IGF0dHJOYW1lO1xuICAgICAgICAgICAgdmFyIGF0dHJWYWwgPSB2ZG9tLmF0dHJzW2F0dHJOYW1lXTtcbiAgICAgICAgICAgIGlmICgocHJvcCA9IHByb3BzW2F0dHJOYW1lXSkgJiYgYXR0clZhbCAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICBkb21bcHJvcF0gPSBhdHRyVmFsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoKGF0dHIgPSBhdHRyc1thdHRyTmFtZV0pICYmIGF0dHJWYWwgIT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgZG9tLnNldEF0dHJpYnV0ZShhdHRyLCBhdHRyVmFsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGV2ZW50ID0gZXZlbnRzW2F0dHJOYW1lXSkge1xuICAgICAgICAgICAgICAgIC8vZG9tLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGV2ZW50SGFuZGxlcihhdHRyVmFsKSk7XG4gICAgICAgICAgICAgICAgZG9tWydvbicgKyBldmVudF0gPSBhdHRyVmFsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoYXR0ck5hbWVbMF0gPT09ICdvJyAmJiBhdHRyTmFtZVsxXSA9PT0gJ24nKSB7XG4gICAgICAgICAgICAgICAgZXZlbnQgPSBhdHRyTmFtZS5zdWJzdHJpbmcoMikudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgICAgICBkb21bJ29uJyArIGV2ZW50XSA9IGF0dHJWYWw7XG4gICAgICAgICAgICAgICAgLy9kb20uYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgZXZlbnRIYW5kbGVyKGF0dHJWYWwpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGF0dHJOYW1lWzBdID09PSAnZCcgJiYgYXR0ck5hbWVbMV0gPT09ICdhJyAmJiBhdHRyTmFtZVsyXSA9PT0gJ3QnICYmIGF0dHJOYW1lWzNdID09PSAnYScgJiYgYXR0clZhbCAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICBkb20uc2V0QXR0cmlidXRlKGF0dHJOYW1lLCBhdHRyVmFsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8qXG4gICAgICAgICAgICAgZWxzZSBpZiAoa2V5ID09PSAnc3R5bGUnKSB7XG4gICAgICAgICAgICAgfVxuICAgICAgICAgICAgICovXG5cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZG9tO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVFbGVtZW50QXJyYXkodGFnLCBhdHRycywgY2hpbGRyZW4pIHtcbiAgICB2YXIgaXNGcmFnbWVudCA9IHRhZyA9PSAnQCcgfHwgdHlwZW9mIHRhZyA9PSAnZnVuY3Rpb24nO1xuLy8gICAgICAgIHZhciB0ZXh0ID0gKGNoaWxkcmVuICYmICFpc0ZyYWdtZW50ICYmICh0eXBlb2YgY2hpbGRyZW5bMF0gPT0gJ3N0cmluZycgfHwgdHlwZW9mIGNoaWxkcmVuWzBdID09ICdudW1iZXInKSkgPyBjaGlsZHJlblswXSArICcnIDogbnVsbDtcbiAgICBpZiAoaXNGcmFnbWVudCkge1xuICAgICAgICBpZiAodHlwZW9mIHRhZyA9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFZDb21wb25lbnQodGFnLCBhdHRycywgY2hpbGRyZW4sIGF0dHJzID8gYXR0cnMua2V5IDogbnVsbCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFZGcmFnbWVudE5vZGUodGFnLCBhdHRycywgY2hpbGRyZW4sIGF0dHJzID8gYXR0cnMua2V5IDogbnVsbCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBnZXROTm9kZSh0YWcsIGF0dHJzLCBjaGlsZHJlbiwgYXR0cnMgPyBhdHRycy5rZXkgOiBudWxsLCBudWxsKTtcbiAgICB9XG59XG5cbmV4cG9ydCB2YXIgY2FjaGVDaGlsZHJlbiA9IG5ldyBBcnJheSgxMDAwMDApO1xuY2FjaGVDaGlsZHJlbi5sZW4gPSAwO1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRWxlbWVudCh0YWcsIGF0dHJzKSB7XG4gICAgdmFyIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgdmFyIGlzRnJhZ21lbnQgPSB0YWcgPT0gJ0AnIHx8IHR5cGVvZiB0YWcgPT0gJ2Z1bmN0aW9uJztcbiAgICB2YXIgdGV4dCA9IChsZW4gPT0gMyAmJiAhaXNGcmFnbWVudCAmJiAodHlwZW9mIGFyZ3VtZW50c1syXSA9PSAnc3RyaW5nJyB8fCB0eXBlb2YgYXJndW1lbnRzWzJdID09ICdudW1iZXInKSkgPyBhcmd1bWVudHNbMl0gKyAnJyA6IG51bGw7XG4gICAgdmFyIGNoaWxkcmVuID0gbnVsbDtcbiAgICBpZiAoIXRleHQgJiYgbGVuID4gMikge1xuICAgICAgICBpZiAoY2FjaGVDaGlsZHJlbi5sZW4gPT0gMCkge1xuICAgICAgICAgICAgY2hpbGRyZW4gPSBBcnJheShsZW4gLSAyKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNoaWxkcmVuID0gY2FjaGVDaGlsZHJlblstLWNhY2hlQ2hpbGRyZW4ubGVuXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAodmFyIGkgPSAyOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIGNoaWxkcmVuW2kgLSAyXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgICAgICBjaGlsZHJlbi5sZW4gPSBsZW4gLSAyO1xuICAgIH1cblxuICAgIGlmIChpc0ZyYWdtZW50KSB7XG4gICAgICAgIGlmICh0eXBlb2YgdGFnID09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgVkNvbXBvbmVudCh0YWcsIGF0dHJzLCBjaGlsZHJlbiwgYXR0cnMgPyBhdHRycy5rZXkgOiBudWxsKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgVkZyYWdtZW50Tm9kZSh0YWcsIGF0dHJzLCBjaGlsZHJlbiwgYXR0cnMgPyBhdHRycy5rZXkgOiBudWxsKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGdldE5Ob2RlKHRhZywgYXR0cnMsIGNoaWxkcmVuLCBhdHRycyA/IGF0dHJzLmtleSA6IG51bGwsIHRleHQpO1xuICAgIH1cbn1cblxuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9jcmVhdGUuanNcbiAqKi8iLCJleHBvcnQgbGV0IGF0dHJzID0ge1xuICAgIGFjY2VwdDogJ2FjY2VwdCcsXG4gICAgYWNjZXB0Q2hhcnNldDogJ2FjY2VwdC1jaGFyc2V0JyxcbiAgICBhY2Nlc3NLZXk6ICdhY2Nlc3NLZXknLFxuICAgIGFjdGlvbjogJ2FjdGlvbicsXG4gICAgYWxsb3dGdWxsU2NyZWVuOiAnYWxsb3dGdWxsU2NyZWVuJyxcbiAgICBhbGxvd1RyYW5zcGFyZW5jeTogJ2FsbG93VHJhbnNwYXJlbmN5JyxcbiAgICBhbHQ6ICdhbHQnLFxuICAgIGFzeW5jOiAnYXN5bmMnLFxuICAgIGF1dG9Db21wbGV0ZTogJ2F1dG9Db21wbGV0ZScsXG4gICAgYXV0b1BsYXk6ICdhdXRvUGxheScsXG4gICAgY2FwdHVyZTogJ2NhcHR1cmUnLFxuICAgIGNlbGxQYWRkaW5nOiAnY2VsbFBhZGRpbmcnLFxuICAgIGNlbGxTcGFjaW5nOiAnY2VsbFNwYWNpbmcnLFxuICAgIGNoYXJTZXQ6ICdjaGFyU2V0JyxcbiAgICBjaGFsbGVuZ2U6ICdjaGFsbGVuZ2UnLFxuICAgIGNsYXNzSUQ6ICdjbGFzc0lEJyxcbiAgICBjb2xzOiAnY29scycsXG4gICAgY29sU3BhbjogJ2NvbFNwYW4nLFxuICAgIGNvbnRlbnQ6ICdjb250ZW50JyxcbiAgICBjb250ZW50RWRpdGFibGU6ICdjb250ZW50RWRpdGFibGUnLFxuICAgIGNvbnRleHRNZW51OiAnY29udGV4dE1lbnUnLFxuICAgIGNvb3JkczogJ2Nvb3JkcycsXG4gICAgY3Jvc3NPcmlnaW46ICdjcm9zc09yaWdpbicsXG4gICAgZGF0YTogJ2RhdGEnLFxuICAgIGRhdGVUaW1lOiAnZGF0ZVRpbWUnLFxuICAgIGRlZmVyOiAnZGVmZXInLFxuICAgIGRpcjogJ2RpcicsXG4gICAgZGlzYWJsZWQ6ICdkaXNhYmxlZCcsXG4gICAgZG93bmxvYWQ6ICdkb3dubG9hZCcsXG4gICAgZHJhZ2dhYmxlOiAnZHJhZ2dhYmxlJyxcbiAgICBlbmNUeXBlOiAnZW5jVHlwZScsXG4gICAgZm9ybTogJ2Zvcm0nLFxuICAgIGZvcm1BY3Rpb246ICdmb3JtQWN0aW9uJyxcbiAgICBmb3JtRW5jVHlwZTogJ2Zvcm1FbmNUeXBlJyxcbiAgICBmb3JtTWV0aG9kOiAnZm9ybU1ldGhvZCcsXG4gICAgZm9ybU5vVmFsaWRhdGU6ICdmb3JtTm9WYWxpZGF0ZScsXG4gICAgZm9ybVRhcmdldDogJ2Zvcm1UYXJnZXQnLFxuICAgIGZyYW1lQm9yZGVyOiAnZnJhbWVCb3JkZXInLFxuICAgIGhlYWRlcnM6ICdoZWFkZXJzJyxcbiAgICBoZWlnaHQ6ICdoZWlnaHQnLFxuICAgIGhpZGRlbjogJ2hpZGRlbicsXG4gICAgaGlnaDogJ2hpZ2gnLFxuICAgIGhyZWY6ICdocmVmJyxcbiAgICBocmVmTGFuZzogJ2hyZWZMYW5nJyxcbiAgICBodG1sRm9yOiAnZm9yJyxcbiAgICBodHRwRXF1aXY6ICdodHRwLWVxdWl2JyxcbiAgICBpY29uOiAnaWNvbicsXG4gICAgaW5wdXRNb2RlOiAnaW5wdXRNb2RlJyxcbiAgICBpczogJ2lzJyxcbiAgICBrZXlQYXJhbXM6ICdrZXlQYXJhbXMnLFxuICAgIGtleVR5cGU6ICdrZXlUeXBlJyxcbiAgICBsYWJlbDogJ2xhYmVsJyxcbiAgICBsYW5nOiAnbGFuZycsXG4gICAgbGlzdDogJ2xpc3QnLFxuICAgIGxvdzogJ2xvdycsXG4gICAgbWFuaWZlc3Q6ICdtYW5pZmVzdCcsXG4gICAgbWFyZ2luSGVpZ2h0OiAnbWFyZ2luSGVpZ2h0JyxcbiAgICBtYXJnaW5XaWR0aDogJ21hcmdpbldpZHRoJyxcbiAgICBtYXg6ICdtYXgnLFxuICAgIG1heExlbmd0aDogJ21heExlbmd0aCcsXG4gICAgbWVkaWE6ICdtZWRpYScsXG4gICAgbWVkaWFHcm91cDogJ21lZGlhR3JvdXAnLFxuICAgIG1ldGhvZDogJ21ldGhvZCcsXG4gICAgbWluOiAnbWluJyxcbiAgICBtaW5MZW5ndGg6ICdtaW5MZW5ndGgnLFxuICAgIG5hbWU6ICduYW1lJyxcbiAgICBub1ZhbGlkYXRlOiAnbm9WYWxpZGF0ZScsXG4gICAgb3BlbjogJ29wZW4nLFxuICAgIG9wdGltdW06ICdvcHRpbXVtJyxcbiAgICBwYXR0ZXJuOiAncGF0dGVybicsXG4gICAgcGxhY2Vob2xkZXI6ICdwbGFjZWhvbGRlcicsXG4gICAgcG9zdGVyOiAncG9zdGVyJyxcbiAgICBwcmVsb2FkOiAncHJlbG9hZCcsXG4gICAgcmFkaW9Hcm91cDogJ3JhZGlvR3JvdXAnLFxuICAgIHJlbDogJ3JlbCcsXG4gICAgcmVxdWlyZWQ6ICdyZXF1aXJlZCcsXG4gICAgcm9sZTogJ3JvbGUnLFxuICAgIHJvd3M6ICdyb3dzJyxcbiAgICByb3dTcGFuOiAncm93U3BhbicsXG4gICAgc2FuZGJveDogJ3NhbmRib3gnLFxuICAgIHNjb3BlOiAnc2NvcGUnLFxuICAgIHNjb3BlZDogJ3Njb3BlZCcsXG4gICAgc2Nyb2xsaW5nOiAnc2Nyb2xsaW5nJyxcbiAgICBzZWFtbGVzczogJ3NlYW1sZXNzJyxcbiAgICBzaGFwZTogJ3NoYXBlJyxcbiAgICBzaXplOiAnc2l6ZScsXG4gICAgc2l6ZXM6ICdzaXplcycsXG4gICAgc3BhbjogJ3NwYW4nLFxuICAgIHNwZWxsQ2hlY2s6ICdzcGVsbENoZWNrJyxcbiAgICBzcmM6ICdzcmMnLFxuICAgIHNyY1NldDogJ3NyY1NldCcsXG4gICAgc3RhcnQ6ICdzdGFydCcsXG4gICAgc3RlcDogJ3N0ZXAnLFxuICAgIHN0eWxlOiAnc3R5bGUnLFxuICAgIHRhYkluZGV4OiAndGFiSW5kZXgnLFxuICAgIHRhcmdldDogJ3RhcmdldCcsXG4gICAgdGl0bGU6ICd0aXRsZScsXG4gICAgdHlwZTogJ3R5cGUnLFxuICAgIHVzZU1hcDogJ3VzZU1hcCcsXG4gICAgd2lkdGg6ICd3aWR0aCcsXG4gICAgd21vZGU6ICd3bW9kZScsXG4gICAgYXV0b0NhcGl0YWxpemU6ICdhdXRvQ2FwaXRhbGl6ZScsXG4gICAgYXV0b0NvcnJlY3Q6ICdhdXRvQ29ycmVjdCcsXG4gICAgaXRlbVByb3A6ICdpdGVtUHJvcCcsXG4gICAgaXRlbVNjb3BlOiAnaXRlbVNjb3BlJyxcbiAgICBpdGVtVHlwZTogJ2l0ZW1UeXBlJyxcbiAgICBpdGVtSUQ6ICdpdGVtSUQnLFxuICAgIGl0ZW1SZWY6ICdpdGVtUmVmJyxcbiAgICBwcm9wZXJ0eTogJ3Byb3BlcnR5JyxcbiAgICBzZWN1cml0eTogJ3NlY3VyaXR5JyxcbiAgICB1bnNlbGVjdGFibGU6ICd1bnNlbGVjdGFibGUnLFxufTtcblxuZXhwb3J0IGxldCBwcm9wcyA9IHtcbiAgICBjaGVja2VkOiAnY2hlY2tlZCcsXG4gICAgY2xhc3NOYW1lOiAnY2xhc3NOYW1lJyxcbiAgICBjb250cm9sczogJ2NvbnRyb2xzJyxcbiAgICBpZDogJ2lkJyxcbiAgICBsb29wOiAnbG9vcCcsXG4gICAgbXVsdGlwbGU6ICdtdWx0aXBsZScsXG4gICAgbXV0ZWQ6ICdtdXRlZCcsXG4gICAgcmVhZE9ubHk6ICdyZWFkT25seScsXG4gICAgc2VsZWN0ZWQ6ICdzZWxlY3RlZCcsXG4gICAgc3JjRG9jOiAnc3JjZG9jJyxcbiAgICB2YWx1ZTogJ3ZhbHVlJ1xufTtcblxuZXhwb3J0IGxldCBub3RQeCA9IHtcbiAgICBib3hGbGV4OiB0cnVlLFxuICAgIGJveEZsZXhHcm91cDogdHJ1ZSxcbiAgICBjb2x1bW5Db3VudDogdHJ1ZSxcbiAgICBmaWxsT3BhY2l0eTogdHJ1ZSxcbiAgICBmbGV4OiB0cnVlLFxuICAgIGZsZXhHcm93OiB0cnVlLFxuICAgIGZsZXhQb3NpdGl2ZTogdHJ1ZSxcbiAgICBmbGV4U2hyaW5rOiB0cnVlLFxuICAgIGZsZXhOZWdhdGl2ZTogdHJ1ZSxcbiAgICBmb250V2VpZ2h0OiB0cnVlLFxuICAgIGxpbmVDbGFtcDogdHJ1ZSxcbiAgICBsaW5lSGVpZ2h0OiB0cnVlLFxuICAgIG9wYWNpdHk6IHRydWUsXG4gICAgb3JkZXI6IHRydWUsXG4gICAgb3JwaGFuczogdHJ1ZSxcbiAgICBzdHJva2VPcGFjaXR5OiB0cnVlLFxuICAgIHdpZG93czogdHJ1ZSxcbiAgICB6SW5kZXg6IHRydWUsXG4gICAgem9vbTogdHJ1ZVxufTtcblxuZXhwb3J0IGxldCBldmVudHMgPSB7XG4gICAgb25SZW5kZXI6IFwicmVuZGVyXCIsXG4gICAgb25DbGljazogKCgnb250b3VjaGVuZCcgaW4gd2luZG93KSkgPyAndG91Y2hlbmQnIDogJ2NsaWNrJyxcbiAgICBvbkRibENsaWNrOiAnZGJsY2xpY2snLFxuXG4gICAgb25Nb3VzZURvd246ICdtb3VzZWRvd24nLFxuICAgIG9uTW91c2VVcDogJ21vdXNldXAnLFxuICAgIG9uTW91c2VNb3ZlOiAnbW91c2Vtb3ZlJyxcbiAgICBvbk1vdXNlRW50ZXI6ICdtb3VzZWVudGVyJyxcbiAgICBvbk1vdXNlTGVhdmU6ICdtb3VzZWxlYXZlJyxcbiAgICBvbk1vdXNlT3ZlcjogJ21vdXNlb3ZlcicsXG4gICAgb25Nb3VzZU91dDogJ21vdXNlb3V0JyxcblxuICAgIG9uVG91Y2hTdGFydDogJ3RvdWNoc3RhcnQnLFxuICAgIG9uVG91Y2hFbmQ6ICd0b3VjaGVuZCcsXG4gICAgb25Ub3VjaE1vdmU6ICd0b3VjaG1vdmUnLFxuICAgIG9uVG91Y2hDYW5jZWw6ICd0b3VjaGNhbmNlbCcsXG4gICAgb25Ub3VjaExlYXZlOiAndG91Y2hsZWF2ZScsXG5cbiAgICBvbkNvbnRleHRNZW51OiAnY29udGV4dG1lbnUnLFxuXG4gICAgb25JbnB1dDogJ2lucHV0JyxcbiAgICBvbkZvY3VzOiAnZm9jdXMnLFxuICAgIG9uQ2hhbmdlOiAnY2hhbmdlJyxcblxuICAgIG9uS2V5RG93bjogJ2tleWRvd24nLFxuICAgIG9uS2V5UHJlc3M6ICdrZXlwcmVzcycsXG4gICAgb25LZXlVcDogJ2tleXVwJ1xufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2F0dHJzLmpzXG4gKiovIiwiaW1wb3J0IHtnZXRUZXh0Tm9kZSwgVkZyYWdtZW50Tm9kZX0gZnJvbSAnLi9ub2RlJztcblxuZXhwb3J0IGxldCBERUJVRyA9IGZhbHNlO1xuZXhwb3J0IGZ1bmN0aW9uIG5vcm1DaGlsZCh2ZG9tLCBpKSB7XG4gICAgaWYgKCF2ZG9tLmNoaWxkcmVuW2ldIHx8ICF2ZG9tLmNoaWxkcmVuW2ldLnRhZykge1xuICAgICAgICB2YXIgY2hpbGQgPSB2ZG9tLmNoaWxkcmVuW2ldO1xuICAgICAgICBpZiAodHlwZW9mIGNoaWxkID09ICdzdHJpbmcnIHx8IHR5cGVvZiBjaGlsZCA9PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgdmRvbS5jaGlsZHJlbltpXSA9IGdldFRleHROb2RlKGNoaWxkKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChjaGlsZCA9PSBudWxsKSB7XG4gICAgICAgICAgICB2ZG9tLmNoaWxkcmVuW2ldID0gZ2V0VGV4dE5vZGUoJycpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiBjaGlsZCA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIGlmIChjaGlsZCBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICAgICAgdmRvbS5jaGlsZHJlbltpXSA9IG5ldyBWRnJhZ21lbnROb2RlKCdtYXAnLCBudWxsLCBjaGlsZCwgbnVsbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB2ZG9tLmNoaWxkcmVuW2ldID0gZ2V0VGV4dE5vZGUoSlNPTi5zdHJpbmdpZnkoY2hpbGQpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0eXBlb2YgY2hpbGQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHZkb20uY2hpbGRyZW5baV0gPSBnZXRUZXh0Tm9kZSgnRnVuY3Rpb24nKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZkb20uY2hpbGRyZW5baV0gPSBnZXRUZXh0Tm9kZSgnJyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy9yZXR1cm4gdmRvbS5jaGlsZHJlbltpXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEZpcnN0Q2hpbGQob2xkKSB7XG4gICAgdmFyIGJlZm9yZUNoaWxkID0gb2xkLmNoaWxkcmVuWzBdO1xuICAgIHdoaWxlIChiZWZvcmVDaGlsZCAmJiBiZWZvcmVDaGlsZC5mcmFnbWVudCkge1xuICAgICAgICBiZWZvcmVDaGlsZCA9IGJlZm9yZUNoaWxkLmNoaWxkcmVuWzBdO1xuICAgIH1cbiAgICByZXR1cm4gYmVmb3JlQ2hpbGQ7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy91dGlscy5qc1xuICoqLyIsInZhciBpZCA9IDE7XG5pbXBvcnQge2NhY2hlQ2hpbGRyZW59IGZyb20gJy4vY3JlYXRlJztcblxudmFyIHByb3RvID0ge1xuICAgIHRleHQ6IG51bGwsXG4gICAgZG9tOiBudWxsLFxuICAgIHRhZzogbnVsbCxcbiAgICBhdHRyczogbnVsbCxcbiAgICBjaGlsZHJlbjogbnVsbCxcbiAgICBhbGxBdHRyczogbnVsbCxcbiAgICBmcmFnbWVudDogZmFsc2UsXG4gICAgY29tcG9uZW50OiBudWxsLFxuICAgIGtleTogbnVsbCxcbiAgICBrZXlNYXA6IG51bGwsXG4gICAgdm5vZGU6IHRydWUsXG4gICAgZGVzdHJveWVkOiBudWxsLFxuICAgIGRlc3Ryb3k6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5kb20gPSBudWxsO1xuICAgICAgICB0aGlzLmNoaWxkcmVuID0gbnVsbDtcbiAgICAgICAgdGhpcy5hdHRycyA9IG51bGw7XG4gICAgICAgIC8vdGhpcy5kZXN0cm95ZWQgPSB0cnVlO1xuICAgICAgICAvL3RoaXMucGFyZW50ID0gbnVsbDtcbiAgICB9XG59O1xuXG5mdW5jdGlvbiBjbGFzc0V4dGVuZChDbGFzcywgcHJvdG8sIG92ZXJyaWRlcykge1xuICAgIGZvciAodmFyIHByb3AgaW4gcHJvdG8pIHtcbiAgICAgICAgQ2xhc3MucHJvdG90eXBlW3Byb3BdID0gcHJvdG9bcHJvcF07XG4gICAgfVxuICAgIGZvciAocHJvcCBpbiBvdmVycmlkZXMpIHtcbiAgICAgICAgQ2xhc3MucHJvdG90eXBlW3Byb3BdID0gb3ZlcnJpZGVzW3Byb3BdO1xuICAgIH1cbn1cblxuLy92YXIgY2FjaGVGcmFtZW50cyA9IFtdO1xuLy92YXIgY2FjaGVDb21wb25lbnQgPSBbXTtcbnZhciBjYWNoZU5vZGUgPSBbXTtcbnZhciBjYWNoZVRleHROb2RlID0gW107XG5cblxuZXhwb3J0IGZ1bmN0aW9uIFZGcmFnbWVudE5vZGUodGFnLCBhdHRycywgY2hpbGRyZW4sIGtleSkge1xuICAgIHRoaXMuaWQgPSBpZCsrO1xuICAgIHRoaXMudGFnID0gdGFnO1xuICAgIGlmICh0YWcgPT0gJ21hcCcpIHtcbiAgICAgICAgdGhpcy5rZXlNYXAgPSB7fTtcbiAgICB9XG4gICAgdGhpcy5jaGlsZHJlbiA9IGNoaWxkcmVuO1xuICAgIGlmIChrZXkpIHtcbiAgICAgICAgdGhpcy5rZXkgPSBrZXk7XG4gICAgfVxuICAgIC8vdGhpcy5wYXJlbnQgPSBudWxsO1xuICAgIHRoaXMuZG9tID0gbnVsbDtcbiAgICB0aGlzLmF0dHJzID0gYXR0cnM7XG59XG5jbGFzc0V4dGVuZChWRnJhZ21lbnROb2RlLCBwcm90bywge2ZyYWdtZW50OiB0cnVlfSk7XG5cblxuZXhwb3J0IGZ1bmN0aW9uIFZDb21wb25lbnQodGFnLCBhdHRycywgY2hpbGRyZW4sIGtleSkge1xuICAgIC8vb2JqZWN0cy5wdXNoKHRoaXMpO1xuICAgIHRoaXMuaWQgPSBpZCsrO1xuICAgIHRoaXMudGFnID0gdGFnO1xuICAgIHRoaXMuY2hpbGRyZW4gPSBjaGlsZHJlbjtcbiAgICB0aGlzLmZyYWdtZW50ID0gdHJ1ZTtcbiAgICBpZiAoa2V5KSB7XG4gICAgICAgIHRoaXMua2V5ID0ga2V5O1xuICAgIH1cbiAgICAvL3RoaXMucGFyZW50ID0gbnVsbDtcbiAgICB0aGlzLmRvbSA9IG51bGw7XG4gICAgdGhpcy5hdHRycyA9IGF0dHJzO1xuICAgIC8vdGhpcy5kZXN0cm95ZWQgPSBudWxsO1xuICAgIC8vdGhpcy5kZXN0cm95ZWQgPSBudWxsO1xufVxuY2xhc3NFeHRlbmQoVkNvbXBvbmVudCwgcHJvdG8sIHtmcmFnbWVudDogdHJ1ZX0pO1xuXG5cbndpbmRvdy5uTm9kZXMgPSAwO1xudmFyIG5vZGVzQ2FjaGUgPSBuZXcgQXJyYXkoMTAwMDAwMCk7XG5ub2Rlc0NhY2hlLmxlbiA9IDA7XG5cbmZ1bmN0aW9uIE5Ob2RlKHRhZywgYXR0cnMsIGNoaWxkcmVuLCBrZXksIHRleHQpIHtcbiAgICAvL29iamVjdHMucHVzaCh0aGlzKTtcbiAgICB3aW5kb3cubk5vZGVzKys7XG4gICAgdGhpcy5pZCA9IGlkKys7XG4gICAgdGhpcy50YWcgPSB0YWc7XG4gICAgdGhpcy5hdHRycyA9IGF0dHJzO1xuICAgIHRoaXMuY2hpbGRyZW4gPSBjaGlsZHJlbjtcbiAgICBpZiAodGV4dCkge1xuICAgICAgICB0aGlzLnRleHQgPSB0ZXh0O1xuICAgIH1cbiAgICB0aGlzLmFsbEF0dHJzID0gJyc7XG4gICAgdGhpcy5rZXkgPSBrZXk7XG4gICAgdGhpcy5kb20gPSBudWxsO1xuICAgIC8vdGhpcy5wYXJlbnQgPSBudWxsO1xuICAgIC8vdGhpcy5kZXN0cm95ZWQgPSBudWxsO1xufVxuY2xhc3NFeHRlbmQoTk5vZGUsIHByb3RvLCB7XG4gICAgZGVzdHJveTogZnVuY3Rpb24gKCkge1xuICAgICAgICAvL3RoaXMuZG9tID0gbnVsbDtcbiAgICAgICAgLy90aGlzLmNoaWxkcmVuID0gbnVsbDtcbiAgICAgICAgLy90aGlzLmF0dHJzID0gbnVsbDtcbiAgICAgICAgaWYgKHRoaXMuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgIGNhY2hlQ2hpbGRyZW5bY2FjaGVDaGlsZHJlbi5sZW4rK10gPSB0aGlzLmNoaWxkcmVuO1xuICAgICAgICB9XG4gICAgICAgIG5vZGVzQ2FjaGVbbm9kZXNDYWNoZS5sZW4rK10gPSB0aGlzO1xuXG4gICAgICAgIC8vdGhpcy5kZXN0cm95ZWQgPSB0cnVlO1xuICAgICAgICAvL3RoaXMucGFyZW50ID0gbnVsbDtcbiAgICB9XG59KTtcbmV4cG9ydCBmdW5jdGlvbiBnZXROTm9kZSh0YWcsIGF0dHJzLCBjaGlsZHJlbiwga2V5LCB0ZXh0KSB7XG4gICAgaWYgKG5vZGVzQ2FjaGUubGVuID09IDApIHtcbiAgICAgICAgcmV0dXJuIG5ldyBOTm9kZSh0YWcsIGF0dHJzLCBjaGlsZHJlbiwga2V5LCB0ZXh0KTtcbiAgICB9XG4gICAgdmFyIGl0ZW0gPSBub2Rlc0NhY2hlWy0tbm9kZXNDYWNoZS5sZW5dO1xuICAgIGl0ZW0udGFnID0gdGFnO1xuICAgIGl0ZW0uYXR0cnMgPSBhdHRycztcbiAgICBpdGVtLmNoaWxkcmVuID0gY2hpbGRyZW47XG4gICAgaXRlbS5rZXkgPSBrZXk7XG4gICAgaXRlbS50ZXh0ID0gdGV4dDtcbiAgICByZXR1cm4gaXRlbTtcbn1cblxuXG53aW5kb3cudlRleHROb2RlcyA9IDA7XG52YXIgdGV4dE5vZGVzQ2FjaGUgPSBuZXcgQXJyYXkoMTAwMDAwMCk7XG50ZXh0Tm9kZXNDYWNoZS5sZW4gPSAwO1xuXG5mdW5jdGlvbiBWVGV4dE5vZGUodGV4dCkge1xuICAgIHRoaXMuaWQgPSBpZCsrO1xuICAgIHRoaXMuZG9tID0gbnVsbDtcbiAgICB0aGlzLnRleHQgPSB0ZXh0O1xuICAgIHdpbmRvdy52VGV4dE5vZGVzKys7XG4gICAgLy90aGlzLnBhcmVudCA9IG51bGw7XG4gICAgLy90aGlzLmRlc3Ryb3llZCA9IG51bGw7XG59XG5jbGFzc0V4dGVuZChWVGV4dE5vZGUsIHByb3RvLCB7XG4gICAgdGFnOiAnIycsXG4gICAgZGVzdHJveTogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmRvbSA9IG51bGw7XG4gICAgICAgIHRleHROb2Rlc0NhY2hlW3RleHROb2Rlc0NhY2hlLmxlbisrXSA9IHRoaXM7XG4gICAgICAgIC8vdGhpcy5kZXN0cm95ZWQgPSB0cnVlO1xuICAgICAgICAvL3RoaXMucGFyZW50ID0gbnVsbDtcbiAgICB9XG59KTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldFRleHROb2RlKHRleHQpIHtcbiAgICBpZiAodGV4dE5vZGVzQ2FjaGUubGVuID09IDApIHtcbiAgICAgICAgcmV0dXJuIG5ldyBWVGV4dE5vZGUodGV4dCk7XG4gICAgfVxuICAgIHZhciBpdGVtID0gdGV4dE5vZGVzQ2FjaGVbLS10ZXh0Tm9kZXNDYWNoZS5sZW5dO1xuICAgIGl0ZW0udGV4dCA9IHRleHQ7XG4gICAgcmV0dXJuIGl0ZW07XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9ub2RlLmpzXG4gKiovIiwiLyoqXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0gVGhlIExpZmUtQ3ljbGUgb2YgYSBDb21wb3NpdGUgQ29tcG9uZW50IC0tLS0tLS0tLS0tLS0tLS0tLVxuICpcbiAqICsgY29uc3RydWN0b3I6IEluaXRpYWxpemF0aW9uIG9mIHN0YXRlLiBUaGUgaW5zdGFuY2UgaXMgbm93IHJldGFpbmVkLlxuICogICArIGNvbXBvbmVudFdpbGxNb3VudFxuICogICArIHJlbmRlclxuICogICArIFtjaGlsZHJlbidzIGNvbnN0cnVjdG9yc11cbiAqICAgICArIFtjaGlsZHJlbidzIGNvbXBvbmVudFdpbGxNb3VudCBhbmQgcmVuZGVyXVxuICogICAgICsgW2NoaWxkcmVuJ3MgY29tcG9uZW50RGlkTW91bnRdXG4gKiAgICAgKyBjb21wb25lbnREaWRNb3VudFxuICpcbiAqICAgICAgIFVwZGF0ZSBQaGFzZXM6XG4gKiAgICAgICArIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMgKG9ubHkgY2FsbGVkIGlmIHBhcmVudCB1cGRhdGVkKVxuICogICAgICAgLSBzaG91bGRDb21wb25lbnRVcGRhdGVcbiAqICAgICAgICAgKyBjb21wb25lbnRXaWxsVXBkYXRlXG4gKiAgICAgICAgICAgKyByZW5kZXJcbiAqICAgICAgICAgICArIFtjaGlsZHJlbidzIGNvbnN0cnVjdG9ycyBvciByZWNlaXZlIHByb3BzIHBoYXNlc11cbiAqICAgICAgICAgKyBjb21wb25lbnREaWRVcGRhdGVcbiAqXG4gKiAgICAgKyBjb21wb25lbnRXaWxsVW5tb3VudFxuICogICAgICsgW2NoaWxkcmVuJ3MgY29tcG9uZW50V2lsbFVubW91bnRdXG4gKiAgIC0gW2NoaWxkcmVuIGRlc3Ryb3llZF1cbiAqIC0gKGRlc3Ryb3llZCk6IFRoZSBpbnN0YW5jZSBpcyBub3cgYmxhbmssIHJlbGVhc2VkIGJ5IFJlYWN0IGFuZCByZWFkeSBmb3IgR0MuXG4gKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuaW1wb3J0IHt1cGRhdGVDaGlsZHJlbn0gZnJvbSAnLi91cGRhdGUnO1xuaW1wb3J0IHtWQ29tcG9uZW50fSBmcm9tICcuL25vZGUnO1xuaW1wb3J0IHtERUJVR30gZnJvbSAnLi91dGlscyc7XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGZpbmRET01Ob2RlKHZkb20pIHtcbiAgICByZXR1cm4gdmRvbS5kb207XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBDb21wb25lbnQocHJvcHMpIHtcbiAgICB0aGlzLnByb3BzID0gcHJvcHM7XG59XG5cbkNvbXBvbmVudC5wcm90b3R5cGUuY29tcG9uZW50V2lsbE1vdW50ID0gZnVuY3Rpb24gKCkge307XG5Db21wb25lbnQucHJvdG90eXBlLmNvbXBvbmVudERpZE1vdW50ID0gZnVuY3Rpb24gKCkge307XG5cbkNvbXBvbmVudC5wcm90b3R5cGUuY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyA9IGZ1bmN0aW9uICgpIHt9O1xuQ29tcG9uZW50LnByb3RvdHlwZS5jb21wb25lbnRXaWxsVXBkYXRlID0gZnVuY3Rpb24gKCkge307XG5Db21wb25lbnQucHJvdG90eXBlLmNvbXBvbmVudERpZFVwZGF0ZSA9IGZ1bmN0aW9uICgpIHt9O1xuXG5Db21wb25lbnQucHJvdG90eXBlLmNvbXBvbmVudFdpbGxVbm1vdW50ID0gZnVuY3Rpb24gKCkge307XG5cblxuQ29tcG9uZW50LnByb3RvdHlwZS51cGRhdGVQcm9wcyA9IGZ1bmN0aW9uIChwcm9wcykge1xuICAgIHRoaXMuY29tcG9uZW50V2lsbFVwZGF0ZShwcm9wcyk7XG4gICAgLy92YXIgb2xkUHJvcHMgPSB0aGlzLnByb3BzO1xuICAgIHRoaXMucHJvcHMgPSBwcm9wcztcbiAgICB2YXIgbmV3Tm9kZSA9IG5ldyBWQ29tcG9uZW50KHRoaXMuY29uc3RydWN0b3IsIG51bGwsIFt0aGlzLnJlbmRlcigpXSwgbnVsbCk7XG4gICAgdXBkYXRlQ2hpbGRyZW4odGhpcy5ub2RlLCBuZXdOb2RlKTtcbiAgICB0aGlzLm5vZGUuY2hpbGRyZW4gPSBuZXdOb2RlLmNoaWxkcmVuO1xuICAgIC8vdG9kbzpjb21wb25lbnREaWRVcGRhdGUob2JqZWN0IHByZXZQcm9wcywgb2JqZWN0IHByZXZTdGF0ZSlcbiAgICB0aGlzLmNvbXBvbmVudERpZFVwZGF0ZSh0aGlzLnByb3BzKTtcbn07XG5cbkNvbXBvbmVudC5wcm90b3R5cGUuZm9yY2VVcGRhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy51cGRhdGVQcm9wcyh0aGlzLnByb3BzKTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVDb21wb25lbnQob2xkLCB2ZG9tKSB7XG4gICAgdmRvbS5jb21wb25lbnQgPSBvbGQuY29tcG9uZW50O1xuICAgIHZhciBwcm9wcyA9IHZkb20uYXR0cnMgfHwge307XG4gICAgcHJvcHMuY2hpbGRyZW4gPSB2ZG9tLmNoaWxkcmVuO1xuICAgIHZkb20uY29tcG9uZW50LmNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMocHJvcHMpO1xuICAgIHZkb20uY29tcG9uZW50LnVwZGF0ZVByb3BzKHByb3BzKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUNvbXBvbmVudCh2ZG9tKSB7XG4gICAgdmFyIHByb3BzID0gdmRvbS5hdHRycyB8fCB7fTtcbiAgICBwcm9wcy5jaGlsZHJlbiA9IHZkb20uY2hpbGRyZW47XG4gICAgdmRvbS5jb21wb25lbnQgPSBuZXcgdmRvbS50YWcocHJvcHMpO1xuICAgIHZkb20uY29tcG9uZW50LmNvbXBvbmVudFdpbGxNb3VudCgpO1xuICAgIHZkb20uY2hpbGRyZW4gPSBbdmRvbS5jb21wb25lbnQucmVuZGVyKCldO1xuICAgIHZkb20uY29tcG9uZW50Lm5vZGUgPSB2ZG9tO1xuICAgIERFQlVHICYmIGNvbnNvbGUubG9nKHZkb20pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVzdHJveUNvbXBvbmVudCh2ZG9tKSB7XG4gICAgdmRvbS5jb21wb25lbnQuY29tcG9uZW50V2lsbFVubW91bnQoKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1vdW50Q29tcG9uZW50KHZkb20pIHtcbiAgICB2ZG9tLmNvbXBvbmVudC5jb21wb25lbnREaWRNb3VudCgpO1xufVxuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9jb21wb25lbnQuanNcbiAqKi8iLCJpbXBvcnQge2F0dHJzLCBwcm9wcywgZXZlbnRzfSBmcm9tICcuL2F0dHJzJztcbmltcG9ydCB7dXBkYXRlQ29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudCc7XG5pbXBvcnQge3JlbW92ZSwgcmVtb3ZlQ2hpbGR9IGZyb20gJy4vcmVtb3ZlJztcbmltcG9ydCB7bm9ybUNoaWxkLCBnZXRGaXJzdENoaWxkLCBERUJVR30gZnJvbSAnLi91dGlscyc7XG5pbXBvcnQge2NyZWF0ZX0gZnJvbSAnLi9jcmVhdGUnO1xuXG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGUob2xkLCB2ZG9tKSB7XG4gICAgREVCVUcgJiYgY29uc29sZS5sb2coXCJ1cGRhdGVcIiwgdmRvbSk7XG5cbiAgICB2YXIgZG9tID0gb2xkLmRvbTtcbiAgICBkb20udXBkYXRlZCA9IHRydWU7XG4gICAgdmRvbS5kb20gPSBkb207XG4gICAgLy92ZG9tLnBhcmVudCA9IG9sZC5wYXJlbnQ7XG4gICAgaWYgKG9sZC50YWcgIT09IHZkb20udGFnKSB7XG4gICAgICAgIHJldHVybiByZXBsYWNlTm9kZShvbGQsIHZkb20pO1xuICAgIH1cbiAgICBpZiAob2xkLnRhZyA9PSAnIycpIHtcbiAgICAgICAgaWYgKG9sZC50ZXh0ICE9PSB2ZG9tLnRleHQpIHtcbiAgICAgICAgICAgIGRvbS50ZXh0Q29udGVudCA9IHZkb20udGV4dDtcbiAgICAgICAgfVxuICAgICAgICBvbGQuZGVzdHJveSgpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChvbGQudGV4dCAhPT0gdmRvbS50ZXh0KSB7XG4gICAgICAgIGRvbS50ZXh0Q29udGVudCA9IHZkb20udGV4dDtcbiAgICB9XG5cbiAgICBpZiAodmRvbS5mcmFnbWVudCkge1xuICAgICAgICBpZiAodmRvbS5rZXkgIT09IG9sZC5rZXkpIHtcbiAgICAgICAgICAgIHJlcGxhY2VOb2RlKG9sZCwgdmRvbSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHZkb20uYWxsQXR0cnMgPSAnJztcbiAgICAgICAgaWYgKHZkb20uYXR0cnMgJiYgb2xkLmF0dHJzKSB7XG4gICAgICAgICAgICBmb3JBdHRycyhvbGQsIHZkb20pO1xuICAgICAgICB9XG4gICAgICAgIGlmICgob2xkLmF0dHJzICYmICF2ZG9tLmF0dHJzKSB8fCAoIW9sZC5hdHRycyAmJiB2ZG9tLmF0dHJzKSB8fCBvbGQuYWxsQXR0cnMgIT09IHZkb20uYWxsQXR0cnMpIHtcbiAgICAgICAgICAgIHJlcGxhY2VOb2RlKG9sZCwgdmRvbSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKG9sZC5jb21wb25lbnQpIHtcbiAgICAgICAgdXBkYXRlQ29tcG9uZW50KG9sZCwgdmRvbSk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoIXZkb20udGV4dCkge1xuICAgICAgICB1cGRhdGVDaGlsZHJlbihvbGQsIHZkb20pO1xuICAgIH1cbiAgICBvbGQuZGVzdHJveSgpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlQ2hpbGRyZW4ob2xkLCB2ZG9tKSB7XG4gICAgdmFyIG9sZExlbiA9IG9sZC5jaGlsZHJlbiA/IG9sZC5jaGlsZHJlbi5sZW4gOiAwO1xuICAgIHZhciBuZXdMZW4gPSB2ZG9tLmNoaWxkcmVuID8gdmRvbS5jaGlsZHJlbi5sZW4gOiAwO1xuICAgIGlmIChvbGRMZW4pIHtcbiAgICAgICAgdmFyIHBhcmVudERvbSA9IG9sZC5kb207XG4gICAgICAgIHZhciBiZWZvcmVDaGlsZCA9IGdldEZpcnN0Q2hpbGQob2xkKTtcbiAgICAgICAgaWYgKCh2ZG9tLnRhZyA9PSAnbWFwJyAmJiBvbGQudGFnICE9ICdtYXAnKSB8fCAodmRvbS50YWcgIT0gJ21hcCcgJiYgb2xkLnRhZyA9PSAnbWFwJykpIHtcbiAgICAgICAgICAgIHJlcGxhY2VOb2RlKG9sZCwgdmRvbSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodmRvbS50YWcgPT0gJ21hcCcgJiYgb2xkLnRhZyA9PSAnbWFwJykge1xuICAgICAgICAgICAgdmFyIHJlcyA9IG1hcENoaWxkcmVuKG9sZCwgdmRvbSwgYmVmb3JlQ2hpbGQpO1xuICAgICAgICAgICAgaWYgKHJlcyA9PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIHJlcGxhY2VOb2RlKG9sZCwgdmRvbSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKG9sZExlbiA9PT0gbmV3TGVuKSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBuZXdMZW47IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBub3JtQ2hpbGQodmRvbSwgaSk7XG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZShvbGQuY2hpbGRyZW5baV0sIHZkb20uY2hpbGRyZW5baV0pO1xuICAgICAgICAgICAgICAgICAgICBvbGQuY2hpbGRyZW5baV0gPSBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBuZXdMZW47IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBub3JtQ2hpbGQodmRvbSwgaSk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBuZXdDaGlsZCA9IHZkb20uY2hpbGRyZW5baV07XG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZShuZXdDaGlsZCwgdmRvbS5kb20pO1xuICAgICAgICAgICAgICAgICAgICBpbnNlcnQocGFyZW50RG9tLCBuZXdDaGlsZCwgYmVmb3JlQ2hpbGQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgb2xkTGVuOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlQ2hpbGQob2xkLCBpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAob2xkTGVuICE9PSBuZXdMZW4pIHtcbiAgICAgICAgcmVwbGFjZU5vZGUob2xkLCB2ZG9tKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbn1cblxuXG5mdW5jdGlvbiBtYXBDaGlsZHJlbihvbGQsIHZkb20sIGJlZm9yZUNoaWxkKSB7XG4gICAgdmFyIHBhcmVudERvbSA9IG9sZC5kb207XG4gICAgdmFyIGtleU1hcCA9IG9sZC5rZXlNYXA7XG4gICAgdmFyIG5ld0tleU1hcCA9IHZkb20ua2V5TWFwO1xuICAgIHZhciBuZXdDaGlsZHJlbiA9IHZkb20uY2hpbGRyZW47XG4gICAgdmFyIG5ld0xlbiA9IG5ld0NoaWxkcmVuLmxlbjtcbiAgICB2YXIgb2xkTGVuID0gb2xkLmNoaWxkcmVuLmxlbjtcbiAgICB2YXIgZm91bmQgPSAwO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbmV3TGVuOyBpKyspIHtcbiAgICAgICAgbm9ybUNoaWxkKHZkb20sIGkpO1xuICAgICAgICB2YXIgbmV3Q2hpbGQgPSBuZXdDaGlsZHJlbltpXTtcbiAgICAgICAgdmFyIG9sZENoaWxkID0gb2xkLmNoaWxkcmVuW2ldO1xuICAgICAgICB2YXIgbmV3S2V5ID0gbmV3Q2hpbGQua2V5O1xuICAgICAgICBpZiAobmV3S2V5ID09IG51bGwpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignbWFwIHdpdGhvdXQga2V5cycsIHZkb20pO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHZhciBrZXlDaGlsZCA9IG9sZC5jaGlsZHJlbltrZXlNYXBbbmV3S2V5XV07XG4gICAgICAgIGlmIChrZXlDaGlsZCkge1xuICAgICAgICAgICAgZm91bmQrKztcbiAgICAgICAgICAgIGlmIChrZXlDaGlsZCAhPT0gb2xkQ2hpbGQpIHtcbiAgICAgICAgICAgICAgICBpbnNlcnQocGFyZW50RG9tLCBrZXlDaGlsZCwgYmVmb3JlQ2hpbGQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdXBkYXRlKGtleUNoaWxkLCBuZXdDaGlsZCk7XG4gICAgICAgICAgICBpZiAoa2V5Q2hpbGQgPT0gb2xkQ2hpbGQpIHtcbiAgICAgICAgICAgICAgICBvbGQuY2hpbGRyZW5baV0gPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAga2V5TWFwW25ld0tleV0gPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY3JlYXRlKG5ld0NoaWxkLCB2ZG9tLmRvbSk7XG4gICAgICAgICAgICBpbnNlcnQocGFyZW50RG9tLCBuZXdDaGlsZCwgYmVmb3JlQ2hpbGQpO1xuICAgICAgICB9XG4gICAgICAgIGJlZm9yZUNoaWxkID0gbmV3Q2hpbGQuZG9tLm5leHRTaWJsaW5nO1xuICAgICAgICBuZXdLZXlNYXBbbmV3S2V5XSA9IGk7XG4gICAgfVxuICAgIC8vb2xkLmtleU1hcCA9IG51bGw7XG5cbiAgICBpZiAoZm91bmQgIT09IG9sZExlbikge1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgb2xkTGVuOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBjaGlsZCA9IG9sZC5jaGlsZHJlbltpXTtcbiAgICAgICAgICAgIGlmIChjaGlsZCAmJiBuZXdLZXlNYXBbY2hpbGQua2V5XSA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmVtb3ZlQ2hpbGQob2xkLCBpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gcmVwbGFjZU5vZGUob2xkLCB2ZG9tKSB7XG4gICAgdmFyIHBhcmVudERvbSA9IG9sZC5mcmFnbWVudCA/IG9sZC5kb20gOiBvbGQuZG9tLnBhcmVudE5vZGU7XG4gICAgY3JlYXRlKHZkb20sIHBhcmVudERvbSk7XG4gICAgaW5zZXJ0KHBhcmVudERvbSwgdmRvbSwgb2xkLmZyYWdtZW50ID8gZ2V0Rmlyc3RDaGlsZChvbGQpIDogb2xkKTtcbiAgICByZW1vdmUob2xkKTtcbiAgICByZXR1cm4gdmRvbTtcblxufVxuXG5mdW5jdGlvbiBmb3JBdHRycyhvbGQsIHZkb20pIHtcbiAgICB2YXIgYXR0cjtcbiAgICB2YXIgaXNOb3RTYW1lO1xuICAgIHZhciBkb20gPSB2ZG9tLmRvbTtcbiAgICBmb3IgKHZhciBhdHRyTmFtZSBpbiB2ZG9tLmF0dHJzKSB7XG4gICAgICAgIHZkb20uYWxsQXR0cnMgKz0gYXR0ck5hbWU7XG4gICAgICAgIHZhciBhdHRyVmFsID0gdmRvbS5hdHRyc1thdHRyTmFtZV07XG4gICAgICAgIGlmIChhdHRyTmFtZSA9PSAna2V5Jykge31cbiAgICAgICAgZWxzZSBpZiAoKGlzTm90U2FtZSA9IGF0dHJWYWwgIT09IG9sZC5hdHRyc1thdHRyTmFtZV0pICYmIChhdHRyID0gcHJvcHNbYXR0ck5hbWVdKSkge1xuICAgICAgICAgICAgZG9tW2F0dHJdID0gYXR0clZhbDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICgoYXR0ciA9IGF0dHJzW2F0dHJOYW1lXSkgJiYgaXNOb3RTYW1lKSB7XG4gICAgICAgICAgICBpZiAoYXR0clZhbCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICBkb20ucmVtb3ZlQXR0cmlidXRlKGF0dHIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZG9tLnNldEF0dHJpYnV0ZShhdHRyLCBhdHRyVmFsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChhdHRyID0gZXZlbnRzW2F0dHJOYW1lXSAmJiBpc05vdFNhbWUpIHtcbiAgICAgICAgICAgIGRvbVsnb24nICsgYXR0cl0gPSBhdHRyVmFsO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGF0dHJOYW1lWzBdID09PSAnbycgJiYgYXR0ck5hbWVbMV0gPT09ICduJyAmJiBpc05vdFNhbWUpIHtcbiAgICAgICAgICAgIGF0dHIgPSBhdHRyTmFtZS5zdWJzdHJpbmcoMikudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgIGRvbVsnb24nICsgYXR0cl0gPSBhdHRyVmFsO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGF0dHJOYW1lWzBdID09PSAnZCcgJiYgYXR0ck5hbWVbMV0gPT09ICdhJyAmJiBhdHRyTmFtZVsyXSA9PT0gJ3QnICYmIGF0dHJOYW1lWzNdID09PSAnYScgJiYgaXNOb3RTYW1lKSB7XG4gICAgICAgICAgICBpZiAoYXR0clZhbCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICBkb20ucmVtb3ZlQXR0cmlidXRlKGF0dHJOYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGRvbS5zZXRBdHRyaWJ1dGUoYXR0ck5hbWUsIGF0dHJWYWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBpbnNlcnQocGFyZW50RG9tLCB2ZG9tLCBiZWZvcmUpIHtcbiAgICBpZiAodmRvbS5mcmFnbWVudCkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHZkb20uY2hpbGRyZW4ubGVuOyBpKyspIHtcbiAgICAgICAgICAgIGluc2VydCh2ZG9tLmRvbSwgdmRvbS5jaGlsZHJlbltpXSwgYmVmb3JlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIERFQlVHICYmIGNvbnNvbGUubG9nKFwiSW5zZXJ0XCIsIHZkb20pO1xuICAgIHBhcmVudERvbS5pbnNlcnRCZWZvcmUodmRvbS5kb20sIGJlZm9yZSAmJiBiZWZvcmUuZG9tKTtcbn1cblxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdXBkYXRlLmpzXG4gKiovIiwiaW1wb3J0IHtkZXN0cm95Q29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudCc7XG5pbXBvcnQge0RFQlVHfSBmcm9tICcuL3V0aWxzJztcblxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZShvbGQpIHtcbiAgICBERUJVRyAmJiBjb25zb2xlLmxvZyhcInJlbW92ZVwiLCBvbGQpO1xuXG4gICAgaWYgKG9sZC5jb21wb25lbnQpIHtcbiAgICAgICAgZGVzdHJveUNvbXBvbmVudChvbGQpO1xuICAgIH1cbiAgICBpZiAob2xkLmNoaWxkcmVuKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgb2xkLmNoaWxkcmVuLmxlbjsgaSsrKSB7XG4gICAgICAgICAgICByZW1vdmVDaGlsZChvbGQsIGkpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmICghb2xkLmZyYWdtZW50KSB7XG4gICAgICAgIG9sZC5kb20ucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChvbGQuZG9tKTtcbiAgICB9XG4gICAgb2xkLmRlc3Ryb3koKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZUNoaWxkKG9sZCwgaSkge1xuICAgIHJlbW92ZShvbGQuY2hpbGRyZW5baV0pO1xuICAgIG9sZC5jaGlsZHJlbltpXSA9IG51bGw7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9yZW1vdmUuanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9