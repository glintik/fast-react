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
	            if (!vdom.children[i] || !vdom.children[i].tag) {
	                (0, _utils.normChild)(vdom, i);
	            }
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
	        //this.dom = null;
	        //this.children = null;
	        //this.attrs = null;
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
	        var res = updateChildren(old, vdom);
	        if (res) {
	            old.destroy();
	        }
	        return;
	    }
	    old.destroy();
	}
	
	function updateChildren(old, vdom) {
	    var oldLen = old.children ? old.children.length : 0;
	    var newLen = vdom.children ? vdom.children.length : 0;
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
	                    if (!vdom.children[i] || !vdom.children[i].tag) {
	                        (0, _utils.normChild)(vdom, i);
	                    }
	                    update(old.children[i], vdom.children[i]);
	                    clearChild(old, i);
	                }
	            } else {
	                for (i = 0; i < newLen; i++) {
	                    if (!vdom.children[i] || !vdom.children[i].tag) {
	                        (0, _utils.normChild)(vdom, i);
	                    }
	                    var newChild = vdom.children[i];
	                    (0, _create.create)(newChild, vdom.dom);
	                    insert(parentDom, newChild, beforeChild);
	                }
	                for (i = 0; i < oldLen; i++) {
	                    remove(old.children[i]);
	                    clearChild(old, i);
	                }
	            }
	        }
	    } else if (oldLen !== newLen) {
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
	        if (!vdom.children[i] || !vdom.children[i].tag) {
	            (0, _utils.normChild)(vdom, i);
	        }
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
	    return true;
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
	        for (var i = 0; i < vdom.children.length; i++) {
	            insert(vdom.dom, vdom.children[i], before);
	        }
	        return;
	    }
	    _utils.DEBUG && console.log('Insert', vdom);
	    parentDom.insertBefore(vdom.dom, before && before.dom);
	}
	
	function clearChild(old, i) {
	    old.children[i] = null;
	}
	
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

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNDlmYTYzMmRjYTYzOTBlNjBmZjEiLCJ3ZWJwYWNrOi8vLy4vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Zhc3QtcmVhY3QuanM/N2RjOSIsIndlYnBhY2s6Ly8vLi9zcmMvZmFzdC1yZWFjdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY3JlYXRlLmpzIiwid2VicGFjazovLy8uL3NyYy9hdHRycy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL25vZGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXBkYXRlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7QUN0Q0EsT0FBTSxDQUFDLE9BQU8sR0FBRyxtQkFBTyxDQUFDLENBQXNDLENBQUMsQzs7Ozs7O0FDQWhFLDJHQUFrSyxFOzs7Ozs7Ozs7Ozs7O21DQ0F4RyxDQUFVOzs7OztvQkFBM0QsTUFBTTs7Ozs7O29CQUFFLGFBQWE7Ozs7OztvQkFBRSxrQkFBa0I7Ozs7c0NBQ1gsQ0FBYTs7Ozs7dUJBQTNDLFNBQVM7Ozs7Ozt1QkFBRSxXQUFXOzs7O21DQUNSLENBQVU7Ozs7O29CQUF4QixNQUFNOzs7Ozs7Ozs7Ozs7O1NDR0MsTUFBTSxHQUFOLE1BQU07U0FRTixNQUFNLEdBQU4sTUFBTTtTQTBGTixrQkFBa0IsR0FBbEIsa0JBQWtCO1NBZ0JsQixhQUFhLEdBQWIsYUFBYTs7a0NBdkhNLENBQVM7O2tDQUNiLENBQVM7O2lDQUNVLENBQVE7O3NDQUNaLENB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QkFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztVQUN0QjtNQUNKO0FBQ0QsU0FBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUU7QUFDZixZQUFHLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO01BQzNDO0FBQ0QsUUFBRyxDQUFDLE9BQU8sRUFBRSxDQUFDIiwiZmlsZSI6ImZhc3QtcmVhY3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDQ5ZmE2MzJkY2E2MzkwZTYwZmYxXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZXhwb3NlP0Zhc3RSZWFjdCEuL3NyYy9mYXN0LXJlYWN0LmpzXCIpO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9pbmRleC5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZ2xvYmFsW1wiRmFzdFJlYWN0XCJdID0gcmVxdWlyZShcIi0hL1VzZXJzL2NvZHkvZGV2L2JldHB1Yi9mcm9udGVuZC9kZGQvbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9pbmRleC5qcz97XFxcInN0YWdlXFxcIjowLFxcXCJsb29zZVxcXCI6W1xcXCJlczYuY2xhc3Nlc1xcXCJdfSEvVXNlcnMvY29keS9kZXYvYmV0cHViL2Zyb250ZW5kL2RkZC9zcmMvZmFzdC1yZWFjdC5qc1wiKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9leHBvc2UtbG9hZGVyP0Zhc3RSZWFjdCEuL3NyYy9mYXN0LXJlYWN0LmpzXG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZXhwb3J0IHsgcmVuZGVyLCBjcmVhdGVFbGVtZW50LCBjcmVhdGVFbGVtZW50QXJyYXkgfSBmcm9tICcuL2NyZWF0ZSc7XG5leHBvcnQgeyBDb21wb25lbnQsIGZpbmRET01Ob2RlIH0gZnJvbSAnLi9jb21wb25lbnQnO1xuZXhwb3J0IHsgdXBkYXRlIH0gZnJvbSAnLi91cGRhdGUnO1xuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9mYXN0LXJlYWN0LmpzXG4gKiovIiwiaW1wb3J0IHthdHRycywgcHJvcHMsIGV2ZW50c30gZnJvbSAnLi9hdHRycyc7XG5pbXBvcnQge0RFQlVHLCBub3JtQ2hpbGR9IGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0IHtWRnJhZ21lbnROb2RlLCBWQ29tcG9uZW50LCBnZXROTm9kZX0gZnJvbSAnLi9ub2RlJztcbmltcG9ydCB7Y3JlYXRlQ29tcG9uZW50LCBtb3VudENvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnQnO1xuXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyKHZkb20sIGRvbSkge1xuICAgIGRvbS5hcHBlbmRDaGlsZChjcmVhdGUodmRvbSwgZG9tKSk7XG4gICAgaWYgKHZkb20uY29tcG9uZW50KSB7XG4gICAgICAgIG1vdW50Q29tcG9uZW50KHZkb20pO1xuICAgIH1cbiAgICByZXR1cm4gdmRvbTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZSh2ZG9tLCBwYXJlbnREb20pIHtcbiAgICBERUJVRyAmJiBjb25zb2xlLmxvZyhcIkNyZWF0ZVwiLCB2ZG9tKTtcbiAgICAvL3Zkb20ucGFyZW50ID0gcGFyZW50O1xuICAgIGlmICh2ZG9tLnRhZyA9PSAnIycpIHtcbiAgICAgICAgdmRvbS5kb20gPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh2ZG9tLnRleHQpO1xuICAgICAgICAvL3Zkb20uZG9tLnZpcnR1YWwgPSB2ZG9tO1xuICAgICAgICByZXR1cm4gdmRvbS5kb207XG4gICAgfVxuICAgIHZhciBkb207XG4gICAgaWYgKHZkb20uZnJhZ21lbnQpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB2ZG9tLnRhZyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY3JlYXRlQ29tcG9uZW50KHZkb20pO1xuICAgICAgICB9XG4gICAgICAgIGRvbSA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICAgICAgdmRvbS5kb20gPSBwYXJlbnREb207XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBkb20gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHZkb20udGFnKTtcbiAgICAgICAgdmRvbS5kb20gPSBkb207XG4gICAgICAgIC8vZG9tLnZpcnR1YWwgPSB2ZG9tO1xuICAgIH1cblxuICAgIGlmICh2ZG9tLmNoaWxkcmVuKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdmRvbS5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKCF2ZG9tLmNoaWxkcmVuW2ldIHx8ICF2ZG9tLmNoaWxkcmVuW2ldLnRhZyl7XG4gICAgICAgICAgICAgICAgbm9ybUNoaWxkKHZkb20sIGkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGNoaWxkID0gdmRvbS5jaGlsZHJlbltpXTtcbiAgICAgICAgICAgIGlmICh2ZG9tLnRhZyA9PT0gJ21hcCcgJiYgY2hpbGQuYXR0cnMpIHtcbiAgICAgICAgICAgICAgICB2ZG9tLmtleU1hcFtjaGlsZC5rZXldID0gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRvbS5hcHBlbmRDaGlsZChjcmVhdGUoY2hpbGQsIHZkb20uZG9tKSk7XG4gICAgICAgICAgICBpZiAoY2hpbGQuY29tcG9uZW50KSB7XG4gICAgICAgICAgICAgICAgbW91bnRDb21wb25lbnQoY2hpbGQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKHZkb20udGV4dCkge1xuICAgICAgICBkb20udGV4dENvbnRlbnQgPSB2ZG9tLnRleHQ7XG4gICAgfVxuICAgIHZkb20uYWxsQXR0cnMgPSAnJztcbiAgICBpZiAodmRvbS5hdHRycyAmJiAhdmRvbS5mcmFnbWVudCkge1xuICAgICAgICBpZiAodmRvbS5hdHRycy5yZWYpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdmRvbS5hdHRycy5yZWYgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICB2ZG9tLmF0dHJzLnJlZih2ZG9tKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vdG9kbzpcbi8qXG4gICAgICAgICAgICBlbHNlIGlmIChjdXJyZW50Q29tcG9uZW50KSB7XG4gICAgICAgICAgICAgICAgY3VycmVudENvbXBvbmVudC5yZWZzID0gY3VycmVudENvbXBvbmVudC5yZWZzIHx8IHt9O1xuICAgICAgICAgICAgICAgIGN1cnJlbnRDb21wb25lbnQucmVmc1t2ZG9tLmF0dHJzLnJlZl0gPSB2ZG9tO1xuICAgICAgICAgICAgfVxuKi9cbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBhdHRyO1xuICAgICAgICB2YXIgcHJvcDtcbiAgICAgICAgdmFyIGV2ZW50O1xuICAgICAgICBmb3IgKHZhciBhdHRyTmFtZSBpbiB2ZG9tLmF0dHJzKSB7XG4gICAgICAgICAgICB2ZG9tLmFsbEF0dHJzICs9IGF0dHJOYW1lO1xuICAgICAgICAgICAgdmFyIGF0dHJWYWwgPSB2ZG9tLmF0dHJzW2F0dHJOYW1lXTtcbiAgICAgICAgICAgIGlmICgocHJvcCA9IHByb3BzW2F0dHJOYW1lXSkgJiYgYXR0clZhbCAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICBkb21bcHJvcF0gPSBhdHRyVmFsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoKGF0dHIgPSBhdHRyc1thdHRyTmFtZV0pICYmIGF0dHJWYWwgIT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgZG9tLnNldEF0dHJpYnV0ZShhdHRyLCBhdHRyVmFsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGV2ZW50ID0gZXZlbnRzW2F0dHJOYW1lXSkge1xuICAgICAgICAgICAgICAgIC8vZG9tLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGV2ZW50SGFuZGxlcihhdHRyVmFsKSk7XG4gICAgICAgICAgICAgICAgZG9tWydvbicgKyBldmVudF0gPSBhdHRyVmFsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoYXR0ck5hbWVbMF0gPT09ICdvJyAmJiBhdHRyTmFtZVsxXSA9PT0gJ24nKSB7XG4gICAgICAgICAgICAgICAgZXZlbnQgPSBhdHRyTmFtZS5zdWJzdHJpbmcoMikudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgICAgICBkb21bJ29uJyArIGV2ZW50XSA9IGF0dHJWYWw7XG4gICAgICAgICAgICAgICAgLy9kb20uYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgZXZlbnRIYW5kbGVyKGF0dHJWYWwpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGF0dHJOYW1lWzBdID09PSAnZCcgJiYgYXR0ck5hbWVbMV0gPT09ICdhJyAmJiBhdHRyTmFtZVsyXSA9PT0gJ3QnICYmIGF0dHJOYW1lWzNdID09PSAnYScgJiYgYXR0clZhbCAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICBkb20uc2V0QXR0cmlidXRlKGF0dHJOYW1lLCBhdHRyVmFsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8qXG4gICAgICAgICAgICAgZWxzZSBpZiAoa2V5ID09PSAnc3R5bGUnKSB7XG4gICAgICAgICAgICAgfVxuICAgICAgICAgICAgICovXG5cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZG9tO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVFbGVtZW50QXJyYXkodGFnLCBhdHRycywgY2hpbGRyZW4pIHtcbiAgICB2YXIgaXNGcmFnbWVudCA9IHRhZyA9PSAnQCcgfHwgdHlwZW9mIHRhZyA9PSAnZnVuY3Rpb24nO1xuLy8gICAgICAgIHZhciB0ZXh0ID0gKGNoaWxkcmVuICYmICFpc0ZyYWdtZW50ICYmICh0eXBlb2YgY2hpbGRyZW5bMF0gPT0gJ3N0cmluZycgfHwgdHlwZW9mIGNoaWxkcmVuWzBdID09ICdudW1iZXInKSkgPyBjaGlsZHJlblswXSArICcnIDogbnVsbDtcbiAgICBpZiAoaXNGcmFnbWVudCkge1xuICAgICAgICBpZiAodHlwZW9mIHRhZyA9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFZDb21wb25lbnQodGFnLCBhdHRycywgY2hpbGRyZW4sIGF0dHJzID8gYXR0cnMua2V5IDogbnVsbCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFZGcmFnbWVudE5vZGUodGFnLCBhdHRycywgY2hpbGRyZW4sIGF0dHJzID8gYXR0cnMua2V5IDogbnVsbCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBnZXROTm9kZSh0YWcsIGF0dHJzLCBjaGlsZHJlbiwgYXR0cnMgPyBhdHRycy5rZXkgOiBudWxsLCBudWxsKTtcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVFbGVtZW50KHRhZywgYXR0cnMpIHtcbiAgICB2YXIgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICB2YXIgaXNGcmFnbWVudCA9IHRhZyA9PSAnQCcgfHwgdHlwZW9mIHRhZyA9PSAnZnVuY3Rpb24nO1xuICAgIHZhciB0ZXh0ID0gKGxlbiA9PSAzICYmICFpc0ZyYWdtZW50ICYmICh0eXBlb2YgYXJndW1lbnRzWzJdID09ICdzdHJpbmcnIHx8IHR5cGVvZiBhcmd1bWVudHNbMl0gPT0gJ251bWJlcicpKSA/IGFyZ3VtZW50c1syXSArICcnIDogbnVsbDtcbiAgICB2YXIgY2hpbGRyZW4gPSBudWxsO1xuICAgIGlmICghdGV4dCAmJiBsZW4gPiAyKSB7XG4gICAgICAgIGNoaWxkcmVuID0gQXJyYXkobGVuIC0gMik7XG4gICAgICAgIGZvciAodmFyIGkgPSAyOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIGNoaWxkcmVuW2kgLSAyXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlmIChpc0ZyYWdtZW50KSB7XG4gICAgICAgIGlmICh0eXBlb2YgdGFnID09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgVkNvbXBvbmVudCh0YWcsIGF0dHJzLCBjaGlsZHJlbiwgYXR0cnMgPyBhdHRycy5rZXkgOiBudWxsKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgVkZyYWdtZW50Tm9kZSh0YWcsIGF0dHJzLCBjaGlsZHJlbiwgYXR0cnMgPyBhdHRycy5rZXkgOiBudWxsKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGdldE5Ob2RlKHRhZywgYXR0cnMsIGNoaWxkcmVuLCBhdHRycyA/IGF0dHJzLmtleSA6IG51bGwsIHRleHQpO1xuICAgIH1cbn1cblxuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9jcmVhdGUuanNcbiAqKi8iLCJleHBvcnQgbGV0IGF0dHJzID0ge1xuICAgIGFjY2VwdDogJ2FjY2VwdCcsXG4gICAgYWNjZXB0Q2hhcnNldDogJ2FjY2VwdC1jaGFyc2V0JyxcbiAgICBhY2Nlc3NLZXk6ICdhY2Nlc3NLZXknLFxuICAgIGFjdGlvbjogJ2FjdGlvbicsXG4gICAgYWxsb3dGdWxsU2NyZWVuOiAnYWxsb3dGdWxsU2NyZWVuJyxcbiAgICBhbGxvd1RyYW5zcGFyZW5jeTogJ2FsbG93VHJhbnNwYXJlbmN5JyxcbiAgICBhbHQ6ICdhbHQnLFxuICAgIGFzeW5jOiAnYXN5bmMnLFxuICAgIGF1dG9Db21wbGV0ZTogJ2F1dG9Db21wbGV0ZScsXG4gICAgYXV0b1BsYXk6ICdhdXRvUGxheScsXG4gICAgY2FwdHVyZTogJ2NhcHR1cmUnLFxuICAgIGNlbGxQYWRkaW5nOiAnY2VsbFBhZGRpbmcnLFxuICAgIGNlbGxTcGFjaW5nOiAnY2VsbFNwYWNpbmcnLFxuICAgIGNoYXJTZXQ6ICdjaGFyU2V0JyxcbiAgICBjaGFsbGVuZ2U6ICdjaGFsbGVuZ2UnLFxuICAgIGNsYXNzSUQ6ICdjbGFzc0lEJyxcbiAgICBjb2xzOiAnY29scycsXG4gICAgY29sU3BhbjogJ2NvbFNwYW4nLFxuICAgIGNvbnRlbnQ6ICdjb250ZW50JyxcbiAgICBjb250ZW50RWRpdGFibGU6ICdjb250ZW50RWRpdGFibGUnLFxuICAgIGNvbnRleHRNZW51OiAnY29udGV4dE1lbnUnLFxuICAgIGNvb3JkczogJ2Nvb3JkcycsXG4gICAgY3Jvc3NPcmlnaW46ICdjcm9zc09yaWdpbicsXG4gICAgZGF0YTogJ2RhdGEnLFxuICAgIGRhdGVUaW1lOiAnZGF0ZVRpbWUnLFxuICAgIGRlZmVyOiAnZGVmZXInLFxuICAgIGRpcjogJ2RpcicsXG4gICAgZGlzYWJsZWQ6ICdkaXNhYmxlZCcsXG4gICAgZG93bmxvYWQ6ICdkb3dubG9hZCcsXG4gICAgZHJhZ2dhYmxlOiAnZHJhZ2dhYmxlJyxcbiAgICBlbmNUeXBlOiAnZW5jVHlwZScsXG4gICAgZm9ybTogJ2Zvcm0nLFxuICAgIGZvcm1BY3Rpb246ICdmb3JtQWN0aW9uJyxcbiAgICBmb3JtRW5jVHlwZTogJ2Zvcm1FbmNUeXBlJyxcbiAgICBmb3JtTWV0aG9kOiAnZm9ybU1ldGhvZCcsXG4gICAgZm9ybU5vVmFsaWRhdGU6ICdmb3JtTm9WYWxpZGF0ZScsXG4gICAgZm9ybVRhcmdldDogJ2Zvcm1UYXJnZXQnLFxuICAgIGZyYW1lQm9yZGVyOiAnZnJhbWVCb3JkZXInLFxuICAgIGhlYWRlcnM6ICdoZWFkZXJzJyxcbiAgICBoZWlnaHQ6ICdoZWlnaHQnLFxuICAgIGhpZGRlbjogJ2hpZGRlbicsXG4gICAgaGlnaDogJ2hpZ2gnLFxuICAgIGhyZWY6ICdocmVmJyxcbiAgICBocmVmTGFuZzogJ2hyZWZMYW5nJyxcbiAgICBodG1sRm9yOiAnZm9yJyxcbiAgICBodHRwRXF1aXY6ICdodHRwLWVxdWl2JyxcbiAgICBpY29uOiAnaWNvbicsXG4gICAgaW5wdXRNb2RlOiAnaW5wdXRNb2RlJyxcbiAgICBpczogJ2lzJyxcbiAgICBrZXlQYXJhbXM6ICdrZXlQYXJhbXMnLFxuICAgIGtleVR5cGU6ICdrZXlUeXBlJyxcbiAgICBsYWJlbDogJ2xhYmVsJyxcbiAgICBsYW5nOiAnbGFuZycsXG4gICAgbGlzdDogJ2xpc3QnLFxuICAgIGxvdzogJ2xvdycsXG4gICAgbWFuaWZlc3Q6ICdtYW5pZmVzdCcsXG4gICAgbWFyZ2luSGVpZ2h0OiAnbWFyZ2luSGVpZ2h0JyxcbiAgICBtYXJnaW5XaWR0aDogJ21hcmdpbldpZHRoJyxcbiAgICBtYXg6ICdtYXgnLFxuICAgIG1heExlbmd0aDogJ21heExlbmd0aCcsXG4gICAgbWVkaWE6ICdtZWRpYScsXG4gICAgbWVkaWFHcm91cDogJ21lZGlhR3JvdXAnLFxuICAgIG1ldGhvZDogJ21ldGhvZCcsXG4gICAgbWluOiAnbWluJyxcbiAgICBtaW5MZW5ndGg6ICdtaW5MZW5ndGgnLFxuICAgIG5hbWU6ICduYW1lJyxcbiAgICBub1ZhbGlkYXRlOiAnbm9WYWxpZGF0ZScsXG4gICAgb3BlbjogJ29wZW4nLFxuICAgIG9wdGltdW06ICdvcHRpbXVtJyxcbiAgICBwYXR0ZXJuOiAncGF0dGVybicsXG4gICAgcGxhY2Vob2xkZXI6ICdwbGFjZWhvbGRlcicsXG4gICAgcG9zdGVyOiAncG9zdGVyJyxcbiAgICBwcmVsb2FkOiAncHJlbG9hZCcsXG4gICAgcmFkaW9Hcm91cDogJ3JhZGlvR3JvdXAnLFxuICAgIHJlbDogJ3JlbCcsXG4gICAgcmVxdWlyZWQ6ICdyZXF1aXJlZCcsXG4gICAgcm9sZTogJ3JvbGUnLFxuICAgIHJvd3M6ICdyb3dzJyxcbiAgICByb3dTcGFuOiAncm93U3BhbicsXG4gICAgc2FuZGJveDogJ3NhbmRib3gnLFxuICAgIHNjb3BlOiAnc2NvcGUnLFxuICAgIHNjb3BlZDogJ3Njb3BlZCcsXG4gICAgc2Nyb2xsaW5nOiAnc2Nyb2xsaW5nJyxcbiAgICBzZWFtbGVzczogJ3NlYW1sZXNzJyxcbiAgICBzaGFwZTogJ3NoYXBlJyxcbiAgICBzaXplOiAnc2l6ZScsXG4gICAgc2l6ZXM6ICdzaXplcycsXG4gICAgc3BhbjogJ3NwYW4nLFxuICAgIHNwZWxsQ2hlY2s6ICdzcGVsbENoZWNrJyxcbiAgICBzcmM6ICdzcmMnLFxuICAgIHNyY1NldDogJ3NyY1NldCcsXG4gICAgc3RhcnQ6ICdzdGFydCcsXG4gICAgc3RlcDogJ3N0ZXAnLFxuICAgIHN0eWxlOiAnc3R5bGUnLFxuICAgIHRhYkluZGV4OiAndGFiSW5kZXgnLFxuICAgIHRhcmdldDogJ3RhcmdldCcsXG4gICAgdGl0bGU6ICd0aXRsZScsXG4gICAgdHlwZTogJ3R5cGUnLFxuICAgIHVzZU1hcDogJ3VzZU1hcCcsXG4gICAgd2lkdGg6ICd3aWR0aCcsXG4gICAgd21vZGU6ICd3bW9kZScsXG4gICAgYXV0b0NhcGl0YWxpemU6ICdhdXRvQ2FwaXRhbGl6ZScsXG4gICAgYXV0b0NvcnJlY3Q6ICdhdXRvQ29ycmVjdCcsXG4gICAgaXRlbVByb3A6ICdpdGVtUHJvcCcsXG4gICAgaXRlbVNjb3BlOiAnaXRlbVNjb3BlJyxcbiAgICBpdGVtVHlwZTogJ2l0ZW1UeXBlJyxcbiAgICBpdGVtSUQ6ICdpdGVtSUQnLFxuICAgIGl0ZW1SZWY6ICdpdGVtUmVmJyxcbiAgICBwcm9wZXJ0eTogJ3Byb3BlcnR5JyxcbiAgICBzZWN1cml0eTogJ3NlY3VyaXR5JyxcbiAgICB1bnNlbGVjdGFibGU6ICd1bnNlbGVjdGFibGUnLFxufTtcblxuZXhwb3J0IGxldCBwcm9wcyA9IHtcbiAgICBjaGVja2VkOiAnY2hlY2tlZCcsXG4gICAgY2xhc3NOYW1lOiAnY2xhc3NOYW1lJyxcbiAgICBjb250cm9sczogJ2NvbnRyb2xzJyxcbiAgICBpZDogJ2lkJyxcbiAgICBsb29wOiAnbG9vcCcsXG4gICAgbXVsdGlwbGU6ICdtdWx0aXBsZScsXG4gICAgbXV0ZWQ6ICdtdXRlZCcsXG4gICAgcmVhZE9ubHk6ICdyZWFkT25seScsXG4gICAgc2VsZWN0ZWQ6ICdzZWxlY3RlZCcsXG4gICAgc3JjRG9jOiAnc3JjZG9jJyxcbiAgICB2YWx1ZTogJ3ZhbHVlJ1xufTtcblxuZXhwb3J0IGxldCBub3RQeCA9IHtcbiAgICBib3hGbGV4OiB0cnVlLFxuICAgIGJveEZsZXhHcm91cDogdHJ1ZSxcbiAgICBjb2x1bW5Db3VudDogdHJ1ZSxcbiAgICBmaWxsT3BhY2l0eTogdHJ1ZSxcbiAgICBmbGV4OiB0cnVlLFxuICAgIGZsZXhHcm93OiB0cnVlLFxuICAgIGZsZXhQb3NpdGl2ZTogdHJ1ZSxcbiAgICBmbGV4U2hyaW5rOiB0cnVlLFxuICAgIGZsZXhOZWdhdGl2ZTogdHJ1ZSxcbiAgICBmb250V2VpZ2h0OiB0cnVlLFxuICAgIGxpbmVDbGFtcDogdHJ1ZSxcbiAgICBsaW5lSGVpZ2h0OiB0cnVlLFxuICAgIG9wYWNpdHk6IHRydWUsXG4gICAgb3JkZXI6IHRydWUsXG4gICAgb3JwaGFuczogdHJ1ZSxcbiAgICBzdHJva2VPcGFjaXR5OiB0cnVlLFxuICAgIHdpZG93czogdHJ1ZSxcbiAgICB6SW5kZXg6IHRydWUsXG4gICAgem9vbTogdHJ1ZVxufTtcblxuZXhwb3J0IGxldCBldmVudHMgPSB7XG4gICAgb25SZW5kZXI6IFwicmVuZGVyXCIsXG4gICAgb25DbGljazogKCgnb250b3VjaGVuZCcgaW4gd2luZG93KSkgPyAndG91Y2hlbmQnIDogJ2NsaWNrJyxcbiAgICBvbkRibENsaWNrOiAnZGJsY2xpY2snLFxuXG4gICAgb25Nb3VzZURvd246ICdtb3VzZWRvd24nLFxuICAgIG9uTW91c2VVcDogJ21vdXNldXAnLFxuICAgIG9uTW91c2VNb3ZlOiAnbW91c2Vtb3ZlJyxcbiAgICBvbk1vdXNlRW50ZXI6ICdtb3VzZWVudGVyJyxcbiAgICBvbk1vdXNlTGVhdmU6ICdtb3VzZWxlYXZlJyxcbiAgICBvbk1vdXNlT3ZlcjogJ21vdXNlb3ZlcicsXG4gICAgb25Nb3VzZU91dDogJ21vdXNlb3V0JyxcblxuICAgIG9uVG91Y2hTdGFydDogJ3RvdWNoc3RhcnQnLFxuICAgIG9uVG91Y2hFbmQ6ICd0b3VjaGVuZCcsXG4gICAgb25Ub3VjaE1vdmU6ICd0b3VjaG1vdmUnLFxuICAgIG9uVG91Y2hDYW5jZWw6ICd0b3VjaGNhbmNlbCcsXG4gICAgb25Ub3VjaExlYXZlOiAndG91Y2hsZWF2ZScsXG5cbiAgICBvbkNvbnRleHRNZW51OiAnY29udGV4dG1lbnUnLFxuXG4gICAgb25JbnB1dDogJ2lucHV0JyxcbiAgICBvbkZvY3VzOiAnZm9jdXMnLFxuICAgIG9uQ2hhbmdlOiAnY2hhbmdlJyxcblxuICAgIG9uS2V5RG93bjogJ2tleWRvd24nLFxuICAgIG9uS2V5UHJlc3M6ICdrZXlwcmVzcycsXG4gICAgb25LZXlVcDogJ2tleXVwJ1xufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2F0dHJzLmpzXG4gKiovIiwiaW1wb3J0IHtnZXRUZXh0Tm9kZSwgVkZyYWdtZW50Tm9kZX0gZnJvbSAnLi9ub2RlJztcblxuZXhwb3J0IGxldCBERUJVRyA9IGZhbHNlO1xuZXhwb3J0IGZ1bmN0aW9uIG5vcm1DaGlsZCh2ZG9tLCBpKSB7XG4gICAgdmFyIGNoaWxkID0gdmRvbS5jaGlsZHJlbltpXTtcbiAgICBpZiAodHlwZW9mIGNoaWxkID09ICdzdHJpbmcnIHx8IHR5cGVvZiBjaGlsZCA9PSAnbnVtYmVyJykge1xuICAgICAgICB2ZG9tLmNoaWxkcmVuW2ldID0gZ2V0VGV4dE5vZGUoY2hpbGQpO1xuICAgIH1cbiAgICBlbHNlIGlmIChjaGlsZCA9PSBudWxsKSB7XG4gICAgICAgIHZkb20uY2hpbGRyZW5baV0gPSBnZXRUZXh0Tm9kZSgnJyk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiBjaGlsZCA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgaWYgKGNoaWxkIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgIHZkb20uY2hpbGRyZW5baV0gPSBuZXcgVkZyYWdtZW50Tm9kZSgnbWFwJywgbnVsbCwgY2hpbGQsIG51bGwpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdmRvbS5jaGlsZHJlbltpXSA9IGdldFRleHROb2RlKEpTT04uc3RyaW5naWZ5KGNoaWxkKSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGNoaWxkID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHZkb20uY2hpbGRyZW5baV0gPSBnZXRUZXh0Tm9kZSgnRnVuY3Rpb24nKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHZkb20uY2hpbGRyZW5baV0gPSBnZXRUZXh0Tm9kZSgnJyk7XG4gICAgfVxuICAgIC8vcmV0dXJuIHZkb20uY2hpbGRyZW5baV07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRGaXJzdENoaWxkKG9sZCkge1xuICAgIHZhciBiZWZvcmVDaGlsZCA9IG9sZC5jaGlsZHJlblswXTtcbiAgICB3aGlsZSAoYmVmb3JlQ2hpbGQgJiYgYmVmb3JlQ2hpbGQuZnJhZ21lbnQpIHtcbiAgICAgICAgYmVmb3JlQ2hpbGQgPSBiZWZvcmVDaGlsZC5jaGlsZHJlblswXTtcbiAgICB9XG4gICAgcmV0dXJuIGJlZm9yZUNoaWxkO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdXRpbHMuanNcbiAqKi8iLCJ2YXIgaWQgPSAxO1xuXG52YXIgcHJvdG8gPSB7XG4gICAgdGV4dDogbnVsbCxcbiAgICBkb206IG51bGwsXG4gICAgdGFnOiBudWxsLFxuICAgIGF0dHJzOiBudWxsLFxuICAgIGNoaWxkcmVuOiBudWxsLFxuICAgIGFsbEF0dHJzOiBudWxsLFxuICAgIGZyYWdtZW50OiBmYWxzZSxcbiAgICBjb21wb25lbnQ6IG51bGwsXG4gICAga2V5OiBudWxsLFxuICAgIGtleU1hcDogbnVsbCxcbiAgICB2bm9kZTogdHJ1ZSxcbiAgICBkZXN0cm95ZWQ6IG51bGwsXG4gICAgZGVzdHJveTogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmRvbSA9IG51bGw7XG4gICAgICAgIHRoaXMuY2hpbGRyZW4gPSBudWxsO1xuICAgICAgICB0aGlzLmF0dHJzID0gbnVsbDtcbiAgICAgICAgLy90aGlzLmRlc3Ryb3llZCA9IHRydWU7XG4gICAgICAgIC8vdGhpcy5wYXJlbnQgPSBudWxsO1xuICAgIH1cbn07XG5cbmZ1bmN0aW9uIGNsYXNzRXh0ZW5kKENsYXNzLCBwcm90bywgb3ZlcnJpZGVzKSB7XG4gICAgZm9yICh2YXIgcHJvcCBpbiBwcm90bykge1xuICAgICAgICBDbGFzcy5wcm90b3R5cGVbcHJvcF0gPSBwcm90b1twcm9wXTtcbiAgICB9XG4gICAgZm9yIChwcm9wIGluIG92ZXJyaWRlcykge1xuICAgICAgICBDbGFzcy5wcm90b3R5cGVbcHJvcF0gPSBvdmVycmlkZXNbcHJvcF07XG4gICAgfVxufVxuXG4vL3ZhciBjYWNoZUZyYW1lbnRzID0gW107XG4vL3ZhciBjYWNoZUNvbXBvbmVudCA9IFtdO1xudmFyIGNhY2hlTm9kZSA9IFtdO1xudmFyIGNhY2hlVGV4dE5vZGUgPSBbXTtcblxuXG5leHBvcnQgZnVuY3Rpb24gVkZyYWdtZW50Tm9kZSh0YWcsIGF0dHJzLCBjaGlsZHJlbiwga2V5KSB7XG4gICAgdGhpcy5pZCA9IGlkKys7XG4gICAgdGhpcy50YWcgPSB0YWc7XG4gICAgaWYgKHRhZyA9PSAnbWFwJykge1xuICAgICAgICB0aGlzLmtleU1hcCA9IHt9O1xuICAgIH1cbiAgICB0aGlzLmNoaWxkcmVuID0gY2hpbGRyZW47XG4gICAgaWYgKGtleSkge1xuICAgICAgICB0aGlzLmtleSA9IGtleTtcbiAgICB9XG4gICAgLy90aGlzLnBhcmVudCA9IG51bGw7XG4gICAgdGhpcy5kb20gPSBudWxsO1xuICAgIHRoaXMuYXR0cnMgPSBhdHRycztcbn1cbmNsYXNzRXh0ZW5kKFZGcmFnbWVudE5vZGUsIHByb3RvLCB7ZnJhZ21lbnQ6IHRydWV9KTtcblxuXG5leHBvcnQgZnVuY3Rpb24gVkNvbXBvbmVudCh0YWcsIGF0dHJzLCBjaGlsZHJlbiwga2V5KSB7XG4gICAgLy9vYmplY3RzLnB1c2godGhpcyk7XG4gICAgdGhpcy5pZCA9IGlkKys7XG4gICAgdGhpcy50YWcgPSB0YWc7XG4gICAgdGhpcy5jaGlsZHJlbiA9IGNoaWxkcmVuO1xuICAgIHRoaXMuZnJhZ21lbnQgPSB0cnVlO1xuICAgIGlmIChrZXkpIHtcbiAgICAgICAgdGhpcy5rZXkgPSBrZXk7XG4gICAgfVxuICAgIC8vdGhpcy5wYXJlbnQgPSBudWxsO1xuICAgIHRoaXMuZG9tID0gbnVsbDtcbiAgICB0aGlzLmF0dHJzID0gYXR0cnM7XG4gICAgLy90aGlzLmRlc3Ryb3llZCA9IG51bGw7XG4gICAgLy90aGlzLmRlc3Ryb3llZCA9IG51bGw7XG59XG5jbGFzc0V4dGVuZChWQ29tcG9uZW50LCBwcm90bywge2ZyYWdtZW50OiB0cnVlfSk7XG5cblxudmFyIG5vZGVzQ2FjaGUgPSBuZXcgQXJyYXkoMTAwMDAwMCk7XG5ub2Rlc0NhY2hlLmxlbiA9IDA7XG5cbmZ1bmN0aW9uIE5Ob2RlKHRhZywgYXR0cnMsIGNoaWxkcmVuLCBrZXksIHRleHQpIHtcbiAgICAvL29iamVjdHMucHVzaCh0aGlzKTtcbiAgICB0aGlzLmlkID0gaWQrKztcbiAgICB0aGlzLnRhZyA9IHRhZztcbiAgICB0aGlzLmF0dHJzID0gYXR0cnM7XG4gICAgdGhpcy5jaGlsZHJlbiA9IGNoaWxkcmVuO1xuICAgIGlmICh0ZXh0KSB7XG4gICAgICAgIHRoaXMudGV4dCA9IHRleHQ7XG4gICAgfVxuICAgIHRoaXMuYWxsQXR0cnMgPSAnJztcbiAgICB0aGlzLmtleSA9IGtleTtcbiAgICB0aGlzLmRvbSA9IG51bGw7XG4gICAgLy90aGlzLnBhcmVudCA9IG51bGw7XG4gICAgLy90aGlzLmRlc3Ryb3llZCA9IG51bGw7XG59XG5jbGFzc0V4dGVuZChOTm9kZSwgcHJvdG8sIHtcbiAgICBkZXN0cm95OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vdGhpcy5kb20gPSBudWxsO1xuICAgICAgICAvL3RoaXMuY2hpbGRyZW4gPSBudWxsO1xuICAgICAgICAvL3RoaXMuYXR0cnMgPSBudWxsO1xuICAgICAgICBub2Rlc0NhY2hlW25vZGVzQ2FjaGUubGVuKytdID0gdGhpcztcblxuICAgICAgICAvL3RoaXMuZGVzdHJveWVkID0gdHJ1ZTtcbiAgICAgICAgLy90aGlzLnBhcmVudCA9IG51bGw7XG4gICAgfVxufSk7XG5leHBvcnQgZnVuY3Rpb24gZ2V0Tk5vZGUodGFnLCBhdHRycywgY2hpbGRyZW4sIGtleSwgdGV4dCkge1xuICAgIGlmIChub2Rlc0NhY2hlLmxlbiA9PSAwKSB7XG4gICAgICAgIHJldHVybiBuZXcgTk5vZGUodGFnLCBhdHRycywgY2hpbGRyZW4sIGtleSwgdGV4dCk7XG4gICAgfVxuICAgIHZhciBpdGVtID0gbm9kZXNDYWNoZVstLW5vZGVzQ2FjaGUubGVuXTtcbiAgICBpdGVtLnRhZyA9IHRhZztcbiAgICBpdGVtLmF0dHJzID0gYXR0cnM7XG4gICAgaXRlbS5jaGlsZHJlbiA9IGNoaWxkcmVuO1xuICAgIGl0ZW0ua2V5ID0ga2V5O1xuICAgIGl0ZW0udGV4dCA9IHRleHQ7XG4gICAgcmV0dXJuIGl0ZW07XG59XG5cblxudmFyIHRleHROb2Rlc0NhY2hlID0gbmV3IEFycmF5KDEwMDAwMDApO1xudGV4dE5vZGVzQ2FjaGUubGVuID0gMDtcblxuZnVuY3Rpb24gVlRleHROb2RlKHRleHQpIHtcbiAgICB0aGlzLmlkID0gaWQrKztcbiAgICB0aGlzLmRvbSA9IG51bGw7XG4gICAgdGhpcy50ZXh0ID0gdGV4dDtcbiAgICAvL3RoaXMucGFyZW50ID0gbnVsbDtcbiAgICAvL3RoaXMuZGVzdHJveWVkID0gbnVsbDtcbn1cbmNsYXNzRXh0ZW5kKFZUZXh0Tm9kZSwgcHJvdG8sIHtcbiAgICB0YWc6ICcjJyxcbiAgICBkZXN0cm95OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuZG9tID0gbnVsbDtcbiAgICAgICAgdGV4dE5vZGVzQ2FjaGVbdGV4dE5vZGVzQ2FjaGUubGVuKytdID0gdGhpcztcbiAgICAgICAgLy90aGlzLmRlc3Ryb3llZCA9IHRydWU7XG4gICAgICAgIC8vdGhpcy5wYXJlbnQgPSBudWxsO1xuICAgIH1cbn0pO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0VGV4dE5vZGUodGV4dCkge1xuICAgIGlmICh0ZXh0Tm9kZXNDYWNoZS5sZW4gPT0gMCkge1xuICAgICAgICByZXR1cm4gbmV3IFZUZXh0Tm9kZSh0ZXh0KTtcbiAgICB9XG4gICAgdmFyIGl0ZW0gPSB0ZXh0Tm9kZXNDYWNoZVstLXRleHROb2Rlc0NhY2hlLmxlbl07XG4gICAgaXRlbS50ZXh0ID0gdGV4dDtcbiAgICByZXR1cm4gaXRlbTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL25vZGUuanNcbiAqKi8iLCIvKipcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLSBUaGUgTGlmZS1DeWNsZSBvZiBhIENvbXBvc2l0ZSBDb21wb25lbnQgLS0tLS0tLS0tLS0tLS0tLS0tXG4gKlxuICogKyBjb25zdHJ1Y3RvcjogSW5pdGlhbGl6YXRpb24gb2Ygc3RhdGUuIFRoZSBpbnN0YW5jZSBpcyBub3cgcmV0YWluZWQuXG4gKiAgICsgY29tcG9uZW50V2lsbE1vdW50XG4gKiAgICsgcmVuZGVyXG4gKiAgICsgW2NoaWxkcmVuJ3MgY29uc3RydWN0b3JzXVxuICogICAgICsgW2NoaWxkcmVuJ3MgY29tcG9uZW50V2lsbE1vdW50IGFuZCByZW5kZXJdXG4gKiAgICAgKyBbY2hpbGRyZW4ncyBjb21wb25lbnREaWRNb3VudF1cbiAqICAgICArIGNvbXBvbmVudERpZE1vdW50XG4gKlxuICogICAgICAgVXBkYXRlIFBoYXNlczpcbiAqICAgICAgICsgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyAob25seSBjYWxsZWQgaWYgcGFyZW50IHVwZGF0ZWQpXG4gKiAgICAgICAtIHNob3VsZENvbXBvbmVudFVwZGF0ZVxuICogICAgICAgICArIGNvbXBvbmVudFdpbGxVcGRhdGVcbiAqICAgICAgICAgICArIHJlbmRlclxuICogICAgICAgICAgICsgW2NoaWxkcmVuJ3MgY29uc3RydWN0b3JzIG9yIHJlY2VpdmUgcHJvcHMgcGhhc2VzXVxuICogICAgICAgICArIGNvbXBvbmVudERpZFVwZGF0ZVxuICpcbiAqICAgICArIGNvbXBvbmVudFdpbGxVbm1vdW50XG4gKiAgICAgKyBbY2hpbGRyZW4ncyBjb21wb25lbnRXaWxsVW5tb3VudF1cbiAqICAgLSBbY2hpbGRyZW4gZGVzdHJveWVkXVxuICogLSAoZGVzdHJveWVkKTogVGhlIGluc3RhbmNlIGlzIG5vdyBibGFuaywgcmVsZWFzZWQgYnkgUmVhY3QgYW5kIHJlYWR5IGZvciBHQy5cbiAqXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5pbXBvcnQge3VwZGF0ZUNoaWxkcmVufSBmcm9tICcuL3VwZGF0ZSc7XG5pbXBvcnQge1ZDb21wb25lbnR9IGZyb20gJy4vbm9kZSc7XG5pbXBvcnQge0RFQlVHfSBmcm9tICcuL3V0aWxzJztcblxuXG5leHBvcnQgZnVuY3Rpb24gZmluZERPTU5vZGUodmRvbSkge1xuICAgIHJldHVybiB2ZG9tLmRvbTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIENvbXBvbmVudChwcm9wcykge1xuICAgIHRoaXMucHJvcHMgPSBwcm9wcztcbn1cblxuQ29tcG9uZW50LnByb3RvdHlwZS5jb21wb25lbnRXaWxsTW91bnQgPSBmdW5jdGlvbiAoKSB7fTtcbkNvbXBvbmVudC5wcm90b3R5cGUuY29tcG9uZW50RGlkTW91bnQgPSBmdW5jdGlvbiAoKSB7fTtcblxuQ29tcG9uZW50LnByb3RvdHlwZS5jb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzID0gZnVuY3Rpb24gKCkge307XG5Db21wb25lbnQucHJvdG90eXBlLmNvbXBvbmVudFdpbGxVcGRhdGUgPSBmdW5jdGlvbiAoKSB7fTtcbkNvbXBvbmVudC5wcm90b3R5cGUuY29tcG9uZW50RGlkVXBkYXRlID0gZnVuY3Rpb24gKCkge307XG5cbkNvbXBvbmVudC5wcm90b3R5cGUuY29tcG9uZW50V2lsbFVubW91bnQgPSBmdW5jdGlvbiAoKSB7fTtcblxuXG5Db21wb25lbnQucHJvdG90eXBlLnVwZGF0ZVByb3BzID0gZnVuY3Rpb24gKHByb3BzKSB7XG4gICAgdGhpcy5jb21wb25lbnRXaWxsVXBkYXRlKHByb3BzKTtcbiAgICAvL3ZhciBvbGRQcm9wcyA9IHRoaXMucHJvcHM7XG4gICAgdGhpcy5wcm9wcyA9IHByb3BzO1xuICAgIHZhciBuZXdOb2RlID0gbmV3IFZDb21wb25lbnQodGhpcy5jb25zdHJ1Y3RvciwgbnVsbCwgW3RoaXMucmVuZGVyKCldLCBudWxsKTtcbiAgICB1cGRhdGVDaGlsZHJlbih0aGlzLm5vZGUsIG5ld05vZGUpO1xuICAgIHRoaXMubm9kZS5jaGlsZHJlbiA9IG5ld05vZGUuY2hpbGRyZW47XG4gICAgLy90b2RvOmNvbXBvbmVudERpZFVwZGF0ZShvYmplY3QgcHJldlByb3BzLCBvYmplY3QgcHJldlN0YXRlKVxuICAgIHRoaXMuY29tcG9uZW50RGlkVXBkYXRlKHRoaXMucHJvcHMpO1xufTtcblxuQ29tcG9uZW50LnByb3RvdHlwZS5mb3JjZVVwZGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnVwZGF0ZVByb3BzKHRoaXMucHJvcHMpO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZUNvbXBvbmVudChvbGQsIHZkb20pIHtcbiAgICB2ZG9tLmNvbXBvbmVudCA9IG9sZC5jb21wb25lbnQ7XG4gICAgdmFyIHByb3BzID0gdmRvbS5hdHRycyB8fCB7fTtcbiAgICBwcm9wcy5jaGlsZHJlbiA9IHZkb20uY2hpbGRyZW47XG4gICAgdmRvbS5jb21wb25lbnQuY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhwcm9wcyk7XG4gICAgdmRvbS5jb21wb25lbnQudXBkYXRlUHJvcHMocHJvcHMpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQ29tcG9uZW50KHZkb20pIHtcbiAgICB2YXIgcHJvcHMgPSB2ZG9tLmF0dHJzIHx8IHt9O1xuICAgIHByb3BzLmNoaWxkcmVuID0gdmRvbS5jaGlsZHJlbjtcbiAgICB2ZG9tLmNvbXBvbmVudCA9IG5ldyB2ZG9tLnRhZyhwcm9wcyk7XG4gICAgdmRvbS5jb21wb25lbnQuY29tcG9uZW50V2lsbE1vdW50KCk7XG4gICAgdmRvbS5jaGlsZHJlbiA9IFt2ZG9tLmNvbXBvbmVudC5yZW5kZXIoKV07XG4gICAgdmRvbS5jb21wb25lbnQubm9kZSA9IHZkb207XG4gICAgREVCVUcgJiYgY29uc29sZS5sb2codmRvbSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZXN0cm95Q29tcG9uZW50KHZkb20pIHtcbiAgICB2ZG9tLmNvbXBvbmVudC5jb21wb25lbnRXaWxsVW5tb3VudCgpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbW91bnRDb21wb25lbnQodmRvbSkge1xuICAgIHZkb20uY29tcG9uZW50LmNvbXBvbmVudERpZE1vdW50KCk7XG59XG5cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2NvbXBvbmVudC5qc1xuICoqLyIsImltcG9ydCB7YXR0cnMsIHByb3BzLCBldmVudHN9IGZyb20gJy4vYXR0cnMnO1xuaW1wb3J0IHt1cGRhdGVDb21wb25lbnQsIGRlc3Ryb3lDb21wb25lbnR9IGZyb20gJy4vY29tcG9uZW50JztcbmltcG9ydCB7bm9ybUNoaWxkLCBnZXRGaXJzdENoaWxkLCBERUJVR30gZnJvbSAnLi91dGlscyc7XG5pbXBvcnQge2NyZWF0ZX0gZnJvbSAnLi9jcmVhdGUnO1xuXG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGUob2xkLCB2ZG9tKSB7XG4gICAgREVCVUcgJiYgY29uc29sZS5sb2coXCJ1cGRhdGVcIiwgdmRvbSk7XG5cbiAgICB2YXIgZG9tID0gb2xkLmRvbTtcbiAgICBkb20udXBkYXRlZCA9IHRydWU7XG4gICAgdmRvbS5kb20gPSBkb207XG4gICAgLy92ZG9tLnBhcmVudCA9IG9sZC5wYXJlbnQ7XG4gICAgaWYgKG9sZC50YWcgIT09IHZkb20udGFnKSB7XG4gICAgICAgIHJlcGxhY2VOb2RlKG9sZCwgdmRvbSk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKG9sZC50YWcgPT0gJyMnKSB7XG4gICAgICAgIGlmIChvbGQudGV4dCAhPT0gdmRvbS50ZXh0KSB7XG4gICAgICAgICAgICBkb20udGV4dENvbnRlbnQgPSB2ZG9tLnRleHQ7XG4gICAgICAgIH1cbiAgICAgICAgb2xkLmRlc3Ryb3koKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAob2xkLnRleHQgIT09IHZkb20udGV4dCkge1xuICAgICAgICBkb20udGV4dENvbnRlbnQgPSB2ZG9tLnRleHQ7XG4gICAgfVxuXG4gICAgaWYgKHZkb20uZnJhZ21lbnQpIHtcbiAgICAgICAgaWYgKHZkb20ua2V5ICE9PSBvbGQua2V5KSB7XG4gICAgICAgICAgICByZXBsYWNlTm9kZShvbGQsIHZkb20pO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB2ZG9tLmFsbEF0dHJzID0gJyc7XG4gICAgICAgIGlmICh2ZG9tLmF0dHJzICYmIG9sZC5hdHRycykge1xuICAgICAgICAgICAgZm9yQXR0cnMob2xkLCB2ZG9tKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoKG9sZC5hdHRycyAmJiAhdmRvbS5hdHRycykgfHwgKCFvbGQuYXR0cnMgJiYgdmRvbS5hdHRycykgfHwgb2xkLmFsbEF0dHJzICE9PSB2ZG9tLmFsbEF0dHJzKSB7XG4gICAgICAgICAgICByZXBsYWNlTm9kZShvbGQsIHZkb20pO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChvbGQuY29tcG9uZW50KSB7XG4gICAgICAgIHVwZGF0ZUNvbXBvbmVudChvbGQsIHZkb20pO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKCF2ZG9tLnRleHQpIHtcbiAgICAgICAgdmFyIHJlcyA9IHVwZGF0ZUNoaWxkcmVuKG9sZCwgdmRvbSk7XG4gICAgICAgIGlmIChyZXMpe1xuICAgICAgICAgICAgb2xkLmRlc3Ryb3koKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIG9sZC5kZXN0cm95KCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVDaGlsZHJlbihvbGQsIHZkb20pIHtcbiAgICB2YXIgb2xkTGVuID0gb2xkLmNoaWxkcmVuID8gb2xkLmNoaWxkcmVuLmxlbmd0aCA6IDA7XG4gICAgdmFyIG5ld0xlbiA9IHZkb20uY2hpbGRyZW4gPyB2ZG9tLmNoaWxkcmVuLmxlbmd0aCA6IDA7XG4gICAgaWYgKG9sZExlbikge1xuICAgICAgICB2YXIgcGFyZW50RG9tID0gb2xkLmRvbTtcbiAgICAgICAgdmFyIGJlZm9yZUNoaWxkID0gZ2V0Rmlyc3RDaGlsZChvbGQpO1xuICAgICAgICBpZiAoKHZkb20udGFnID09ICdtYXAnICYmIG9sZC50YWcgIT0gJ21hcCcpIHx8ICh2ZG9tLnRhZyAhPSAnbWFwJyAmJiBvbGQudGFnID09ICdtYXAnKSkge1xuICAgICAgICAgICAgcmVwbGFjZU5vZGUob2xkLCB2ZG9tKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh2ZG9tLnRhZyA9PSAnbWFwJyAmJiBvbGQudGFnID09ICdtYXAnKSB7XG4gICAgICAgICAgICB2YXIgcmVzID0gbWFwQ2hpbGRyZW4ob2xkLCB2ZG9tLCBiZWZvcmVDaGlsZCk7XG4gICAgICAgICAgICBpZiAocmVzID09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgcmVwbGFjZU5vZGUob2xkLCB2ZG9tKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAob2xkTGVuID09PSBuZXdMZW4pIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5ld0xlbjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghdmRvbS5jaGlsZHJlbltpXSB8fCAhdmRvbS5jaGlsZHJlbltpXS50YWcpe1xuICAgICAgICAgICAgICAgICAgICAgICAgbm9ybUNoaWxkKHZkb20sIGkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZShvbGQuY2hpbGRyZW5baV0sIHZkb20uY2hpbGRyZW5baV0pO1xuICAgICAgICAgICAgICAgICAgICBjbGVhckNoaWxkKG9sZCwgaSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IG5ld0xlbjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghdmRvbS5jaGlsZHJlbltpXSB8fCAhdmRvbS5jaGlsZHJlbltpXS50YWcpe1xuICAgICAgICAgICAgICAgICAgICAgICAgbm9ybUNoaWxkKHZkb20sIGkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHZhciBuZXdDaGlsZCA9IHZkb20uY2hpbGRyZW5baV07XG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZShuZXdDaGlsZCwgdmRvbS5kb20pO1xuICAgICAgICAgICAgICAgICAgICBpbnNlcnQocGFyZW50RG9tLCBuZXdDaGlsZCwgYmVmb3JlQ2hpbGQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgb2xkTGVuOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlKG9sZC5jaGlsZHJlbltpXSk7XG4gICAgICAgICAgICAgICAgICAgIGNsZWFyQ2hpbGQob2xkLCBpKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmIChvbGRMZW4gIT09IG5ld0xlbikge1xuICAgICAgICByZXBsYWNlTm9kZShvbGQsIHZkb20pO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xufVxuXG5cbmZ1bmN0aW9uIG1hcENoaWxkcmVuKG9sZCwgdmRvbSwgYmVmb3JlQ2hpbGQpIHtcbiAgICB2YXIgcGFyZW50RG9tID0gb2xkLmRvbTtcbiAgICB2YXIga2V5TWFwID0gb2xkLmtleU1hcDtcbiAgICB2YXIgbmV3S2V5TWFwID0gdmRvbS5rZXlNYXA7XG4gICAgdmFyIG5ld0NoaWxkcmVuID0gdmRvbS5jaGlsZHJlbjtcbiAgICB2YXIgbmV3TGVuID0gbmV3Q2hpbGRyZW4ubGVuZ3RoO1xuICAgIHZhciBvbGRMZW4gPSBvbGQuY2hpbGRyZW4ubGVuZ3RoO1xuICAgIHZhciBmb3VuZCA9IDA7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBuZXdMZW47IGkrKykge1xuICAgICAgICBpZiAoIXZkb20uY2hpbGRyZW5baV0gfHwgIXZkb20uY2hpbGRyZW5baV0udGFnKXtcbiAgICAgICAgICAgIG5vcm1DaGlsZCh2ZG9tLCBpKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgbmV3Q2hpbGQgPSBuZXdDaGlsZHJlbltpXTtcbiAgICAgICAgdmFyIG9sZENoaWxkID0gb2xkLmNoaWxkcmVuW2ldO1xuICAgICAgICB2YXIgbmV3S2V5ID0gbmV3Q2hpbGQua2V5O1xuICAgICAgICBpZiAobmV3S2V5ID09IG51bGwpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignbWFwIHdpdGhvdXQga2V5cycsIHZkb20pO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHZhciBrZXlDaGlsZCA9IG9sZC5jaGlsZHJlbltrZXlNYXBbbmV3S2V5XV07XG4gICAgICAgIGlmIChrZXlDaGlsZCkge1xuICAgICAgICAgICAgZm91bmQrKztcbiAgICAgICAgICAgIGlmIChrZXlDaGlsZCAhPT0gb2xkQ2hpbGQpIHtcbiAgICAgICAgICAgICAgICBpbnNlcnQocGFyZW50RG9tLCBrZXlDaGlsZCwgYmVmb3JlQ2hpbGQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdXBkYXRlKGtleUNoaWxkLCBuZXdDaGlsZCk7XG4gICAgICAgICAgICBpZiAoa2V5Q2hpbGQgPT0gb2xkQ2hpbGQpIHtcbiAgICAgICAgICAgICAgICBjbGVhckNoaWxkKG9sZCwgaSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBrZXlNYXBbbmV3S2V5XSA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjcmVhdGUobmV3Q2hpbGQsIHZkb20uZG9tKTtcbiAgICAgICAgICAgIGluc2VydChwYXJlbnREb20sIG5ld0NoaWxkLCBiZWZvcmVDaGlsZCk7XG4gICAgICAgIH1cbiAgICAgICAgYmVmb3JlQ2hpbGQgPSBuZXdDaGlsZC5kb20ubmV4dFNpYmxpbmc7XG4gICAgICAgIG5ld0tleU1hcFtuZXdLZXldID0gaTtcbiAgICB9XG4gICAgLy9vbGQua2V5TWFwID0gbnVsbDtcblxuICAgIGlmIChmb3VuZCAhPT0gb2xkTGVuKSB7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBvbGRMZW47IGkrKykge1xuICAgICAgICAgICAgdmFyIGNoaWxkID0gb2xkLmNoaWxkcmVuW2ldO1xuICAgICAgICAgICAgaWYgKGNoaWxkICYmIG5ld0tleU1hcFtjaGlsZC5rZXldID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZW1vdmUoY2hpbGQpO1xuICAgICAgICAgICAgICAgIGNsZWFyQ2hpbGQob2xkLCBpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gcmVwbGFjZU5vZGUob2xkLCB2ZG9tKSB7XG4gICAgdmFyIHBhcmVudERvbSA9IG9sZC5mcmFnbWVudCA/IG9sZC5kb20gOiBvbGQuZG9tLnBhcmVudE5vZGU7XG4gICAgY3JlYXRlKHZkb20sIHBhcmVudERvbSk7XG4gICAgaW5zZXJ0KHBhcmVudERvbSwgdmRvbSwgb2xkLmZyYWdtZW50ID8gZ2V0Rmlyc3RDaGlsZChvbGQpIDogb2xkKTtcbiAgICByZW1vdmUob2xkKTtcbiAgICByZXR1cm4gdmRvbTtcblxufVxuXG5mdW5jdGlvbiBmb3JBdHRycyhvbGQsIHZkb20pIHtcbiAgICB2YXIgYXR0cjtcbiAgICB2YXIgaXNOb3RTYW1lO1xuICAgIHZhciBkb20gPSB2ZG9tLmRvbTtcbiAgICBmb3IgKHZhciBhdHRyTmFtZSBpbiB2ZG9tLmF0dHJzKSB7XG4gICAgICAgIHZkb20uYWxsQXR0cnMgKz0gYXR0ck5hbWU7XG4gICAgICAgIHZhciBhdHRyVmFsID0gdmRvbS5hdHRyc1thdHRyTmFtZV07XG4gICAgICAgIGlmIChhdHRyTmFtZSA9PSAna2V5Jykge31cbiAgICAgICAgZWxzZSBpZiAoKGlzTm90U2FtZSA9IGF0dHJWYWwgIT09IG9sZC5hdHRyc1thdHRyTmFtZV0pICYmIChhdHRyID0gcHJvcHNbYXR0ck5hbWVdKSkge1xuICAgICAgICAgICAgZG9tW2F0dHJdID0gYXR0clZhbDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICgoYXR0ciA9IGF0dHJzW2F0dHJOYW1lXSkgJiYgaXNOb3RTYW1lKSB7XG4gICAgICAgICAgICBpZiAoYXR0clZhbCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICBkb20ucmVtb3ZlQXR0cmlidXRlKGF0dHIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZG9tLnNldEF0dHJpYnV0ZShhdHRyLCBhdHRyVmFsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChhdHRyID0gZXZlbnRzW2F0dHJOYW1lXSAmJiBpc05vdFNhbWUpIHtcbiAgICAgICAgICAgIGRvbVsnb24nICsgYXR0cl0gPSBhdHRyVmFsO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGF0dHJOYW1lWzBdID09PSAnbycgJiYgYXR0ck5hbWVbMV0gPT09ICduJyAmJiBpc05vdFNhbWUpIHtcbiAgICAgICAgICAgIGF0dHIgPSBhdHRyTmFtZS5zdWJzdHJpbmcoMikudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgIGRvbVsnb24nICsgYXR0cl0gPSBhdHRyVmFsO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGF0dHJOYW1lWzBdID09PSAnZCcgJiYgYXR0ck5hbWVbMV0gPT09ICdhJyAmJiBhdHRyTmFtZVsyXSA9PT0gJ3QnICYmIGF0dHJOYW1lWzNdID09PSAnYScgJiYgaXNOb3RTYW1lKSB7XG4gICAgICAgICAgICBpZiAoYXR0clZhbCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICBkb20ucmVtb3ZlQXR0cmlidXRlKGF0dHJOYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGRvbS5zZXRBdHRyaWJ1dGUoYXR0ck5hbWUsIGF0dHJWYWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBpbnNlcnQocGFyZW50RG9tLCB2ZG9tLCBiZWZvcmUpIHtcbiAgICBpZiAodmRvbS5mcmFnbWVudCkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHZkb20uY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGluc2VydCh2ZG9tLmRvbSwgdmRvbS5jaGlsZHJlbltpXSwgYmVmb3JlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIERFQlVHICYmIGNvbnNvbGUubG9nKFwiSW5zZXJ0XCIsIHZkb20pO1xuICAgIHBhcmVudERvbS5pbnNlcnRCZWZvcmUodmRvbS5kb20sIGJlZm9yZSAmJiBiZWZvcmUuZG9tKTtcbn1cblxuXG5mdW5jdGlvbiBjbGVhckNoaWxkKG9sZCwgaSl7XG4gICAgb2xkLmNoaWxkcmVuW2ldID0gbnVsbDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZShvbGQpIHtcbiAgICBERUJVRyAmJiBjb25zb2xlLmxvZyhcInJlbW92ZVwiLCBvbGQpO1xuXG4gICAgaWYgKG9sZC5jb21wb25lbnQpIHtcbiAgICAgICAgZGVzdHJveUNvbXBvbmVudChvbGQpO1xuICAgIH1cbiAgICBpZiAob2xkLmNoaWxkcmVuKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgb2xkLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICByZW1vdmUob2xkLmNoaWxkcmVuW2ldKTtcbiAgICAgICAgICAgIGNsZWFyQ2hpbGQob2xkLCBpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAoIW9sZC5mcmFnbWVudCkge1xuICAgICAgICBvbGQuZG9tLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQob2xkLmRvbSk7XG4gICAgfVxuICAgIG9sZC5kZXN0cm95KCk7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy91cGRhdGUuanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9