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
	        } else if (attrName === 'ref' && typeof attrVal == 'function') {
	            //debugger;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZWZlNjZhMGMwMzY5ZjAwODg5OTEiLCJ3ZWJwYWNrOi8vLy4vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Zhc3QtcmVhY3QuanM/N2RjOSIsIndlYnBhY2s6Ly8vLi9zcmMvZmFzdC1yZWFjdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY3JlYXRlLmpzIiwid2VicGFjazovLy8uL3NyYy9hdHRycy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL25vZGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXBkYXRlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7QUN0Q0EsT0FBTSxDQUFDLE9BQU8sR0FBRyxtQkFBTyxDQUFDLENBQXNDLENBQUMsQzs7Ozs7O0FDQWhFLDJHQUFrSyxFOzs7Ozs7Ozs7Ozs7O21DQ0F4RyxDQUFVOzs7OztvQkFBM0QsTUFBTTs7Ozs7O29CQUFFLGFBQWE7Ozs7OztvQkFBRSxrQkFBa0I7Ozs7c0NBQ1gsQ0FBYTs7Ozs7dUJBQTNDLFNBQVM7Ozs7Ozt1QkFBRSxXQUFXOzs7O21DQUNSLENBQVU7Ozs7O29CQUF4QixNQUFNOzs7Ozs7Ozs7Ozs7O1NDR0MsTUFBTSxHQUFOLE1BQU07U0FRTixNQUFNLEdBQU4sTUFBTTtTQTBGTixrQkFBa0IsR0FBbEIsa0JBQWtCO1NBZ0JsQixhQUFhLEdBQWIsYUFBYTs7a0NBdkhNLENBQVM7O2tDQUNiLENBQVM7O2lDQUNVLENBQVE7O3NDQUNaLENB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Q0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDMUMsbUJBQU0sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDeEIsdUJBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7VUFDdEI7TUFDSjtBQUNELFNBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFO0FBQ2YsWUFBRyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztNQUMzQztBQUNELFFBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyIsImZpbGUiOiJmYXN0LXJlYWN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCBlZmU2NmEwYzAzNjlmMDA4ODk5MVxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImV4cG9zZT9GYXN0UmVhY3QhLi9zcmMvZmFzdC1yZWFjdC5qc1wiKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vaW5kZXguanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGdsb2JhbFtcIkZhc3RSZWFjdFwiXSA9IHJlcXVpcmUoXCItIS9Vc2Vycy9jb2R5L2Rldi9iZXRwdWIvZnJvbnRlbmQvZGRkL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvaW5kZXguanM/e1xcXCJzdGFnZVxcXCI6MCxcXFwibG9vc2VcXFwiOltcXFwiZXM2LmNsYXNzZXNcXFwiXX0hL1VzZXJzL2NvZHkvZGV2L2JldHB1Yi9mcm9udGVuZC9kZGQvc3JjL2Zhc3QtcmVhY3QuanNcIik7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vZXhwb3NlLWxvYWRlcj9GYXN0UmVhY3QhLi9zcmMvZmFzdC1yZWFjdC5qc1xuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImV4cG9ydCB7IHJlbmRlciwgY3JlYXRlRWxlbWVudCwgY3JlYXRlRWxlbWVudEFycmF5IH0gZnJvbSAnLi9jcmVhdGUnO1xuZXhwb3J0IHsgQ29tcG9uZW50LCBmaW5kRE9NTm9kZSB9IGZyb20gJy4vY29tcG9uZW50JztcbmV4cG9ydCB7IHVwZGF0ZSB9IGZyb20gJy4vdXBkYXRlJztcblxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvZmFzdC1yZWFjdC5qc1xuICoqLyIsImltcG9ydCB7YXR0cnMsIHByb3BzLCBldmVudHN9IGZyb20gJy4vYXR0cnMnO1xuaW1wb3J0IHtERUJVRywgbm9ybUNoaWxkfSBmcm9tICcuL3V0aWxzJztcbmltcG9ydCB7VkZyYWdtZW50Tm9kZSwgVkNvbXBvbmVudCwgZ2V0Tk5vZGV9IGZyb20gJy4vbm9kZSc7XG5pbXBvcnQge2NyZWF0ZUNvbXBvbmVudCwgbW91bnRDb21wb25lbnR9IGZyb20gJy4vY29tcG9uZW50JztcblxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlcih2ZG9tLCBkb20pIHtcbiAgICBkb20uYXBwZW5kQ2hpbGQoY3JlYXRlKHZkb20sIGRvbSkpO1xuICAgIGlmICh2ZG9tLmNvbXBvbmVudCkge1xuICAgICAgICBtb3VudENvbXBvbmVudCh2ZG9tKTtcbiAgICB9XG4gICAgcmV0dXJuIHZkb207XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGUodmRvbSwgcGFyZW50RG9tKSB7XG4gICAgREVCVUcgJiYgY29uc29sZS5sb2coXCJDcmVhdGVcIiwgdmRvbSk7XG4gICAgLy92ZG9tLnBhcmVudCA9IHBhcmVudDtcbiAgICBpZiAodmRvbS50YWcgPT0gJyMnKSB7XG4gICAgICAgIHZkb20uZG9tID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodmRvbS50ZXh0KTtcbiAgICAgICAgLy92ZG9tLmRvbS52aXJ0dWFsID0gdmRvbTtcbiAgICAgICAgcmV0dXJuIHZkb20uZG9tO1xuICAgIH1cbiAgICB2YXIgZG9tO1xuICAgIGlmICh2ZG9tLmZyYWdtZW50KSB7XG4gICAgICAgIGlmICh0eXBlb2YgdmRvbS50YWcgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNyZWF0ZUNvbXBvbmVudCh2ZG9tKTtcbiAgICAgICAgfVxuICAgICAgICBkb20gPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gICAgICAgIHZkb20uZG9tID0gcGFyZW50RG9tO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgZG9tID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh2ZG9tLnRhZyk7XG4gICAgICAgIHZkb20uZG9tID0gZG9tO1xuICAgICAgICAvL2RvbS52aXJ0dWFsID0gdmRvbTtcbiAgICB9XG5cbiAgICBpZiAodmRvbS5jaGlsZHJlbikge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHZkb20uY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICghdmRvbS5jaGlsZHJlbltpXSB8fCAhdmRvbS5jaGlsZHJlbltpXS50YWcpe1xuICAgICAgICAgICAgICAgIG5vcm1DaGlsZCh2ZG9tLCBpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBjaGlsZCA9IHZkb20uY2hpbGRyZW5baV07XG4gICAgICAgICAgICBpZiAodmRvbS50YWcgPT09ICdtYXAnICYmIGNoaWxkLmF0dHJzKSB7XG4gICAgICAgICAgICAgICAgdmRvbS5rZXlNYXBbY2hpbGQua2V5XSA9IGk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkb20uYXBwZW5kQ2hpbGQoY3JlYXRlKGNoaWxkLCB2ZG9tLmRvbSkpO1xuICAgICAgICAgICAgaWYgKGNoaWxkLmNvbXBvbmVudCkge1xuICAgICAgICAgICAgICAgIG1vdW50Q29tcG9uZW50KGNoaWxkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmICh2ZG9tLnRleHQpIHtcbiAgICAgICAgZG9tLnRleHRDb250ZW50ID0gdmRvbS50ZXh0O1xuICAgIH1cbiAgICB2ZG9tLmFsbEF0dHJzID0gJyc7XG4gICAgaWYgKHZkb20uYXR0cnMgJiYgIXZkb20uZnJhZ21lbnQpIHtcbiAgICAgICAgaWYgKHZkb20uYXR0cnMucmVmKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHZkb20uYXR0cnMucmVmID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgdmRvbS5hdHRycy5yZWYodmRvbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL3RvZG86XG4vKlxuICAgICAgICAgICAgZWxzZSBpZiAoY3VycmVudENvbXBvbmVudCkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRDb21wb25lbnQucmVmcyA9IGN1cnJlbnRDb21wb25lbnQucmVmcyB8fCB7fTtcbiAgICAgICAgICAgICAgICBjdXJyZW50Q29tcG9uZW50LnJlZnNbdmRvbS5hdHRycy5yZWZdID0gdmRvbTtcbiAgICAgICAgICAgIH1cbiovXG4gICAgICAgIH1cblxuICAgICAgICB2YXIgYXR0cjtcbiAgICAgICAgdmFyIHByb3A7XG4gICAgICAgIHZhciBldmVudDtcbiAgICAgICAgZm9yICh2YXIgYXR0ck5hbWUgaW4gdmRvbS5hdHRycykge1xuICAgICAgICAgICAgdmRvbS5hbGxBdHRycyArPSBhdHRyTmFtZTtcbiAgICAgICAgICAgIHZhciBhdHRyVmFsID0gdmRvbS5hdHRyc1thdHRyTmFtZV07XG4gICAgICAgICAgICBpZiAoKHByb3AgPSBwcm9wc1thdHRyTmFtZV0pICYmIGF0dHJWYWwgIT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgZG9tW3Byb3BdID0gYXR0clZhbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKChhdHRyID0gYXR0cnNbYXR0ck5hbWVdKSAmJiBhdHRyVmFsICE9PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIGRvbS5zZXRBdHRyaWJ1dGUoYXR0ciwgYXR0clZhbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChldmVudCA9IGV2ZW50c1thdHRyTmFtZV0pIHtcbiAgICAgICAgICAgICAgICAvL2RvbS5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBldmVudEhhbmRsZXIoYXR0clZhbCkpO1xuICAgICAgICAgICAgICAgIGRvbVsnb24nICsgZXZlbnRdID0gYXR0clZhbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGF0dHJOYW1lWzBdID09PSAnbycgJiYgYXR0ck5hbWVbMV0gPT09ICduJykge1xuICAgICAgICAgICAgICAgIGV2ZW50ID0gYXR0ck5hbWUuc3Vic3RyaW5nKDIpLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgZG9tWydvbicgKyBldmVudF0gPSBhdHRyVmFsO1xuICAgICAgICAgICAgICAgIC8vZG9tLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGV2ZW50SGFuZGxlcihhdHRyVmFsKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChhdHRyTmFtZVswXSA9PT0gJ2QnICYmIGF0dHJOYW1lWzFdID09PSAnYScgJiYgYXR0ck5hbWVbMl0gPT09ICd0JyAmJiBhdHRyTmFtZVszXSA9PT0gJ2EnICYmIGF0dHJWYWwgIT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgZG9tLnNldEF0dHJpYnV0ZShhdHRyTmFtZSwgYXR0clZhbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvKlxuICAgICAgICAgICAgIGVsc2UgaWYgKGtleSA9PT0gJ3N0eWxlJykge1xuICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAqL1xuXG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGRvbTtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRWxlbWVudEFycmF5KHRhZywgYXR0cnMsIGNoaWxkcmVuKSB7XG4gICAgdmFyIGlzRnJhZ21lbnQgPSB0YWcgPT0gJ0AnIHx8IHR5cGVvZiB0YWcgPT0gJ2Z1bmN0aW9uJztcbi8vICAgICAgICB2YXIgdGV4dCA9IChjaGlsZHJlbiAmJiAhaXNGcmFnbWVudCAmJiAodHlwZW9mIGNoaWxkcmVuWzBdID09ICdzdHJpbmcnIHx8IHR5cGVvZiBjaGlsZHJlblswXSA9PSAnbnVtYmVyJykpID8gY2hpbGRyZW5bMF0gKyAnJyA6IG51bGw7XG4gICAgaWYgKGlzRnJhZ21lbnQpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB0YWcgPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBWQ29tcG9uZW50KHRhZywgYXR0cnMsIGNoaWxkcmVuLCBhdHRycyA/IGF0dHJzLmtleSA6IG51bGwpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBWRnJhZ21lbnROb2RlKHRhZywgYXR0cnMsIGNoaWxkcmVuLCBhdHRycyA/IGF0dHJzLmtleSA6IG51bGwpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gZ2V0Tk5vZGUodGFnLCBhdHRycywgY2hpbGRyZW4sIGF0dHJzID8gYXR0cnMua2V5IDogbnVsbCwgbnVsbCk7XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRWxlbWVudCh0YWcsIGF0dHJzKSB7XG4gICAgdmFyIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgdmFyIGlzRnJhZ21lbnQgPSB0YWcgPT0gJ0AnIHx8IHR5cGVvZiB0YWcgPT0gJ2Z1bmN0aW9uJztcbiAgICB2YXIgdGV4dCA9IChsZW4gPT0gMyAmJiAhaXNGcmFnbWVudCAmJiAodHlwZW9mIGFyZ3VtZW50c1syXSA9PSAnc3RyaW5nJyB8fCB0eXBlb2YgYXJndW1lbnRzWzJdID09ICdudW1iZXInKSkgPyBhcmd1bWVudHNbMl0gKyAnJyA6IG51bGw7XG4gICAgdmFyIGNoaWxkcmVuID0gbnVsbDtcbiAgICBpZiAoIXRleHQgJiYgbGVuID4gMikge1xuICAgICAgICBjaGlsZHJlbiA9IEFycmF5KGxlbiAtIDIpO1xuICAgICAgICBmb3IgKHZhciBpID0gMjsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICBjaGlsZHJlbltpIC0gMl0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoaXNGcmFnbWVudCkge1xuICAgICAgICBpZiAodHlwZW9mIHRhZyA9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFZDb21wb25lbnQodGFnLCBhdHRycywgY2hpbGRyZW4sIGF0dHJzID8gYXR0cnMua2V5IDogbnVsbCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFZGcmFnbWVudE5vZGUodGFnLCBhdHRycywgY2hpbGRyZW4sIGF0dHJzID8gYXR0cnMua2V5IDogbnVsbCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBnZXROTm9kZSh0YWcsIGF0dHJzLCBjaGlsZHJlbiwgYXR0cnMgPyBhdHRycy5rZXkgOiBudWxsLCB0ZXh0KTtcbiAgICB9XG59XG5cblxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvY3JlYXRlLmpzXG4gKiovIiwiZXhwb3J0IGxldCBhdHRycyA9IHtcbiAgICBhY2NlcHQ6ICdhY2NlcHQnLFxuICAgIGFjY2VwdENoYXJzZXQ6ICdhY2NlcHQtY2hhcnNldCcsXG4gICAgYWNjZXNzS2V5OiAnYWNjZXNzS2V5JyxcbiAgICBhY3Rpb246ICdhY3Rpb24nLFxuICAgIGFsbG93RnVsbFNjcmVlbjogJ2FsbG93RnVsbFNjcmVlbicsXG4gICAgYWxsb3dUcmFuc3BhcmVuY3k6ICdhbGxvd1RyYW5zcGFyZW5jeScsXG4gICAgYWx0OiAnYWx0JyxcbiAgICBhc3luYzogJ2FzeW5jJyxcbiAgICBhdXRvQ29tcGxldGU6ICdhdXRvQ29tcGxldGUnLFxuICAgIGF1dG9QbGF5OiAnYXV0b1BsYXknLFxuICAgIGNhcHR1cmU6ICdjYXB0dXJlJyxcbiAgICBjZWxsUGFkZGluZzogJ2NlbGxQYWRkaW5nJyxcbiAgICBjZWxsU3BhY2luZzogJ2NlbGxTcGFjaW5nJyxcbiAgICBjaGFyU2V0OiAnY2hhclNldCcsXG4gICAgY2hhbGxlbmdlOiAnY2hhbGxlbmdlJyxcbiAgICBjbGFzc0lEOiAnY2xhc3NJRCcsXG4gICAgY29sczogJ2NvbHMnLFxuICAgIGNvbFNwYW46ICdjb2xTcGFuJyxcbiAgICBjb250ZW50OiAnY29udGVudCcsXG4gICAgY29udGVudEVkaXRhYmxlOiAnY29udGVudEVkaXRhYmxlJyxcbiAgICBjb250ZXh0TWVudTogJ2NvbnRleHRNZW51JyxcbiAgICBjb29yZHM6ICdjb29yZHMnLFxuICAgIGNyb3NzT3JpZ2luOiAnY3Jvc3NPcmlnaW4nLFxuICAgIGRhdGE6ICdkYXRhJyxcbiAgICBkYXRlVGltZTogJ2RhdGVUaW1lJyxcbiAgICBkZWZlcjogJ2RlZmVyJyxcbiAgICBkaXI6ICdkaXInLFxuICAgIGRpc2FibGVkOiAnZGlzYWJsZWQnLFxuICAgIGRvd25sb2FkOiAnZG93bmxvYWQnLFxuICAgIGRyYWdnYWJsZTogJ2RyYWdnYWJsZScsXG4gICAgZW5jVHlwZTogJ2VuY1R5cGUnLFxuICAgIGZvcm06ICdmb3JtJyxcbiAgICBmb3JtQWN0aW9uOiAnZm9ybUFjdGlvbicsXG4gICAgZm9ybUVuY1R5cGU6ICdmb3JtRW5jVHlwZScsXG4gICAgZm9ybU1ldGhvZDogJ2Zvcm1NZXRob2QnLFxuICAgIGZvcm1Ob1ZhbGlkYXRlOiAnZm9ybU5vVmFsaWRhdGUnLFxuICAgIGZvcm1UYXJnZXQ6ICdmb3JtVGFyZ2V0JyxcbiAgICBmcmFtZUJvcmRlcjogJ2ZyYW1lQm9yZGVyJyxcbiAgICBoZWFkZXJzOiAnaGVhZGVycycsXG4gICAgaGVpZ2h0OiAnaGVpZ2h0JyxcbiAgICBoaWRkZW46ICdoaWRkZW4nLFxuICAgIGhpZ2g6ICdoaWdoJyxcbiAgICBocmVmOiAnaHJlZicsXG4gICAgaHJlZkxhbmc6ICdocmVmTGFuZycsXG4gICAgaHRtbEZvcjogJ2ZvcicsXG4gICAgaHR0cEVxdWl2OiAnaHR0cC1lcXVpdicsXG4gICAgaWNvbjogJ2ljb24nLFxuICAgIGlucHV0TW9kZTogJ2lucHV0TW9kZScsXG4gICAgaXM6ICdpcycsXG4gICAga2V5UGFyYW1zOiAna2V5UGFyYW1zJyxcbiAgICBrZXlUeXBlOiAna2V5VHlwZScsXG4gICAgbGFiZWw6ICdsYWJlbCcsXG4gICAgbGFuZzogJ2xhbmcnLFxuICAgIGxpc3Q6ICdsaXN0JyxcbiAgICBsb3c6ICdsb3cnLFxuICAgIG1hbmlmZXN0OiAnbWFuaWZlc3QnLFxuICAgIG1hcmdpbkhlaWdodDogJ21hcmdpbkhlaWdodCcsXG4gICAgbWFyZ2luV2lkdGg6ICdtYXJnaW5XaWR0aCcsXG4gICAgbWF4OiAnbWF4JyxcbiAgICBtYXhMZW5ndGg6ICdtYXhMZW5ndGgnLFxuICAgIG1lZGlhOiAnbWVkaWEnLFxuICAgIG1lZGlhR3JvdXA6ICdtZWRpYUdyb3VwJyxcbiAgICBtZXRob2Q6ICdtZXRob2QnLFxuICAgIG1pbjogJ21pbicsXG4gICAgbWluTGVuZ3RoOiAnbWluTGVuZ3RoJyxcbiAgICBuYW1lOiAnbmFtZScsXG4gICAgbm9WYWxpZGF0ZTogJ25vVmFsaWRhdGUnLFxuICAgIG9wZW46ICdvcGVuJyxcbiAgICBvcHRpbXVtOiAnb3B0aW11bScsXG4gICAgcGF0dGVybjogJ3BhdHRlcm4nLFxuICAgIHBsYWNlaG9sZGVyOiAncGxhY2Vob2xkZXInLFxuICAgIHBvc3RlcjogJ3Bvc3RlcicsXG4gICAgcHJlbG9hZDogJ3ByZWxvYWQnLFxuICAgIHJhZGlvR3JvdXA6ICdyYWRpb0dyb3VwJyxcbiAgICByZWw6ICdyZWwnLFxuICAgIHJlcXVpcmVkOiAncmVxdWlyZWQnLFxuICAgIHJvbGU6ICdyb2xlJyxcbiAgICByb3dzOiAncm93cycsXG4gICAgcm93U3BhbjogJ3Jvd1NwYW4nLFxuICAgIHNhbmRib3g6ICdzYW5kYm94JyxcbiAgICBzY29wZTogJ3Njb3BlJyxcbiAgICBzY29wZWQ6ICdzY29wZWQnLFxuICAgIHNjcm9sbGluZzogJ3Njcm9sbGluZycsXG4gICAgc2VhbWxlc3M6ICdzZWFtbGVzcycsXG4gICAgc2hhcGU6ICdzaGFwZScsXG4gICAgc2l6ZTogJ3NpemUnLFxuICAgIHNpemVzOiAnc2l6ZXMnLFxuICAgIHNwYW46ICdzcGFuJyxcbiAgICBzcGVsbENoZWNrOiAnc3BlbGxDaGVjaycsXG4gICAgc3JjOiAnc3JjJyxcbiAgICBzcmNTZXQ6ICdzcmNTZXQnLFxuICAgIHN0YXJ0OiAnc3RhcnQnLFxuICAgIHN0ZXA6ICdzdGVwJyxcbiAgICBzdHlsZTogJ3N0eWxlJyxcbiAgICB0YWJJbmRleDogJ3RhYkluZGV4JyxcbiAgICB0YXJnZXQ6ICd0YXJnZXQnLFxuICAgIHRpdGxlOiAndGl0bGUnLFxuICAgIHR5cGU6ICd0eXBlJyxcbiAgICB1c2VNYXA6ICd1c2VNYXAnLFxuICAgIHdpZHRoOiAnd2lkdGgnLFxuICAgIHdtb2RlOiAnd21vZGUnLFxuICAgIGF1dG9DYXBpdGFsaXplOiAnYXV0b0NhcGl0YWxpemUnLFxuICAgIGF1dG9Db3JyZWN0OiAnYXV0b0NvcnJlY3QnLFxuICAgIGl0ZW1Qcm9wOiAnaXRlbVByb3AnLFxuICAgIGl0ZW1TY29wZTogJ2l0ZW1TY29wZScsXG4gICAgaXRlbVR5cGU6ICdpdGVtVHlwZScsXG4gICAgaXRlbUlEOiAnaXRlbUlEJyxcbiAgICBpdGVtUmVmOiAnaXRlbVJlZicsXG4gICAgcHJvcGVydHk6ICdwcm9wZXJ0eScsXG4gICAgc2VjdXJpdHk6ICdzZWN1cml0eScsXG4gICAgdW5zZWxlY3RhYmxlOiAndW5zZWxlY3RhYmxlJyxcbn07XG5cbmV4cG9ydCBsZXQgcHJvcHMgPSB7XG4gICAgY2hlY2tlZDogJ2NoZWNrZWQnLFxuICAgIGNsYXNzTmFtZTogJ2NsYXNzTmFtZScsXG4gICAgY29udHJvbHM6ICdjb250cm9scycsXG4gICAgaWQ6ICdpZCcsXG4gICAgbG9vcDogJ2xvb3AnLFxuICAgIG11bHRpcGxlOiAnbXVsdGlwbGUnLFxuICAgIG11dGVkOiAnbXV0ZWQnLFxuICAgIHJlYWRPbmx5OiAncmVhZE9ubHknLFxuICAgIHNlbGVjdGVkOiAnc2VsZWN0ZWQnLFxuICAgIHNyY0RvYzogJ3NyY2RvYycsXG4gICAgdmFsdWU6ICd2YWx1ZSdcbn07XG5cbmV4cG9ydCBsZXQgbm90UHggPSB7XG4gICAgYm94RmxleDogdHJ1ZSxcbiAgICBib3hGbGV4R3JvdXA6IHRydWUsXG4gICAgY29sdW1uQ291bnQ6IHRydWUsXG4gICAgZmlsbE9wYWNpdHk6IHRydWUsXG4gICAgZmxleDogdHJ1ZSxcbiAgICBmbGV4R3JvdzogdHJ1ZSxcbiAgICBmbGV4UG9zaXRpdmU6IHRydWUsXG4gICAgZmxleFNocmluazogdHJ1ZSxcbiAgICBmbGV4TmVnYXRpdmU6IHRydWUsXG4gICAgZm9udFdlaWdodDogdHJ1ZSxcbiAgICBsaW5lQ2xhbXA6IHRydWUsXG4gICAgbGluZUhlaWdodDogdHJ1ZSxcbiAgICBvcGFjaXR5OiB0cnVlLFxuICAgIG9yZGVyOiB0cnVlLFxuICAgIG9ycGhhbnM6IHRydWUsXG4gICAgc3Ryb2tlT3BhY2l0eTogdHJ1ZSxcbiAgICB3aWRvd3M6IHRydWUsXG4gICAgekluZGV4OiB0cnVlLFxuICAgIHpvb206IHRydWVcbn07XG5cbmV4cG9ydCBsZXQgZXZlbnRzID0ge1xuICAgIG9uUmVuZGVyOiBcInJlbmRlclwiLFxuICAgIG9uQ2xpY2s6ICgoJ29udG91Y2hlbmQnIGluIHdpbmRvdykpID8gJ3RvdWNoZW5kJyA6ICdjbGljaycsXG4gICAgb25EYmxDbGljazogJ2RibGNsaWNrJyxcblxuICAgIG9uTW91c2VEb3duOiAnbW91c2Vkb3duJyxcbiAgICBvbk1vdXNlVXA6ICdtb3VzZXVwJyxcbiAgICBvbk1vdXNlTW92ZTogJ21vdXNlbW92ZScsXG4gICAgb25Nb3VzZUVudGVyOiAnbW91c2VlbnRlcicsXG4gICAgb25Nb3VzZUxlYXZlOiAnbW91c2VsZWF2ZScsXG4gICAgb25Nb3VzZU92ZXI6ICdtb3VzZW92ZXInLFxuICAgIG9uTW91c2VPdXQ6ICdtb3VzZW91dCcsXG5cbiAgICBvblRvdWNoU3RhcnQ6ICd0b3VjaHN0YXJ0JyxcbiAgICBvblRvdWNoRW5kOiAndG91Y2hlbmQnLFxuICAgIG9uVG91Y2hNb3ZlOiAndG91Y2htb3ZlJyxcbiAgICBvblRvdWNoQ2FuY2VsOiAndG91Y2hjYW5jZWwnLFxuICAgIG9uVG91Y2hMZWF2ZTogJ3RvdWNobGVhdmUnLFxuXG4gICAgb25Db250ZXh0TWVudTogJ2NvbnRleHRtZW51JyxcblxuICAgIG9uSW5wdXQ6ICdpbnB1dCcsXG4gICAgb25Gb2N1czogJ2ZvY3VzJyxcbiAgICBvbkNoYW5nZTogJ2NoYW5nZScsXG5cbiAgICBvbktleURvd246ICdrZXlkb3duJyxcbiAgICBvbktleVByZXNzOiAna2V5cHJlc3MnLFxuICAgIG9uS2V5VXA6ICdrZXl1cCdcbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9hdHRycy5qc1xuICoqLyIsImltcG9ydCB7Z2V0VGV4dE5vZGUsIFZGcmFnbWVudE5vZGV9IGZyb20gJy4vbm9kZSc7XG5cbmV4cG9ydCBsZXQgREVCVUcgPSBmYWxzZTtcbmV4cG9ydCBmdW5jdGlvbiBub3JtQ2hpbGQodmRvbSwgaSkge1xuICAgIHZhciBjaGlsZCA9IHZkb20uY2hpbGRyZW5baV07XG4gICAgaWYgKHR5cGVvZiBjaGlsZCA9PSAnc3RyaW5nJyB8fCB0eXBlb2YgY2hpbGQgPT0gJ251bWJlcicpIHtcbiAgICAgICAgdmRvbS5jaGlsZHJlbltpXSA9IGdldFRleHROb2RlKGNoaWxkKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoY2hpbGQgPT0gbnVsbCkge1xuICAgICAgICB2ZG9tLmNoaWxkcmVuW2ldID0gZ2V0VGV4dE5vZGUoJycpO1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgY2hpbGQgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIGlmIChjaGlsZCBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICB2ZG9tLmNoaWxkcmVuW2ldID0gbmV3IFZGcmFnbWVudE5vZGUoJ21hcCcsIG51bGwsIGNoaWxkLCBudWxsKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZkb20uY2hpbGRyZW5baV0gPSBnZXRUZXh0Tm9kZShKU09OLnN0cmluZ2lmeShjaGlsZCkpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiBjaGlsZCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB2ZG9tLmNoaWxkcmVuW2ldID0gZ2V0VGV4dE5vZGUoJ0Z1bmN0aW9uJyk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB2ZG9tLmNoaWxkcmVuW2ldID0gZ2V0VGV4dE5vZGUoJycpO1xuICAgIH1cbiAgICAvL3JldHVybiB2ZG9tLmNoaWxkcmVuW2ldO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Rmlyc3RDaGlsZChvbGQpIHtcbiAgICB2YXIgYmVmb3JlQ2hpbGQgPSBvbGQuY2hpbGRyZW5bMF07XG4gICAgd2hpbGUgKGJlZm9yZUNoaWxkICYmIGJlZm9yZUNoaWxkLmZyYWdtZW50KSB7XG4gICAgICAgIGJlZm9yZUNoaWxkID0gYmVmb3JlQ2hpbGQuY2hpbGRyZW5bMF07XG4gICAgfVxuICAgIHJldHVybiBiZWZvcmVDaGlsZDtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3V0aWxzLmpzXG4gKiovIiwidmFyIGlkID0gMTtcblxudmFyIHByb3RvID0ge1xuICAgIHRleHQ6IG51bGwsXG4gICAgZG9tOiBudWxsLFxuICAgIHRhZzogbnVsbCxcbiAgICBhdHRyczogbnVsbCxcbiAgICBjaGlsZHJlbjogbnVsbCxcbiAgICBhbGxBdHRyczogbnVsbCxcbiAgICBmcmFnbWVudDogZmFsc2UsXG4gICAgY29tcG9uZW50OiBudWxsLFxuICAgIGtleTogbnVsbCxcbiAgICBrZXlNYXA6IG51bGwsXG4gICAgdm5vZGU6IHRydWUsXG4gICAgZGVzdHJveWVkOiBudWxsLFxuICAgIGRlc3Ryb3k6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5kb20gPSBudWxsO1xuICAgICAgICB0aGlzLmNoaWxkcmVuID0gbnVsbDtcbiAgICAgICAgdGhpcy5hdHRycyA9IG51bGw7XG4gICAgICAgIC8vdGhpcy5kZXN0cm95ZWQgPSB0cnVlO1xuICAgICAgICAvL3RoaXMucGFyZW50ID0gbnVsbDtcbiAgICB9XG59O1xuXG5mdW5jdGlvbiBjbGFzc0V4dGVuZChDbGFzcywgcHJvdG8sIG92ZXJyaWRlcykge1xuICAgIGZvciAodmFyIHByb3AgaW4gcHJvdG8pIHtcbiAgICAgICAgQ2xhc3MucHJvdG90eXBlW3Byb3BdID0gcHJvdG9bcHJvcF07XG4gICAgfVxuICAgIGZvciAocHJvcCBpbiBvdmVycmlkZXMpIHtcbiAgICAgICAgQ2xhc3MucHJvdG90eXBlW3Byb3BdID0gb3ZlcnJpZGVzW3Byb3BdO1xuICAgIH1cbn1cblxuLy92YXIgY2FjaGVGcmFtZW50cyA9IFtdO1xuLy92YXIgY2FjaGVDb21wb25lbnQgPSBbXTtcbnZhciBjYWNoZU5vZGUgPSBbXTtcbnZhciBjYWNoZVRleHROb2RlID0gW107XG5cblxuZXhwb3J0IGZ1bmN0aW9uIFZGcmFnbWVudE5vZGUodGFnLCBhdHRycywgY2hpbGRyZW4sIGtleSkge1xuICAgIHRoaXMuaWQgPSBpZCsrO1xuICAgIHRoaXMudGFnID0gdGFnO1xuICAgIGlmICh0YWcgPT0gJ21hcCcpIHtcbiAgICAgICAgdGhpcy5rZXlNYXAgPSB7fTtcbiAgICB9XG4gICAgdGhpcy5jaGlsZHJlbiA9IGNoaWxkcmVuO1xuICAgIGlmIChrZXkpIHtcbiAgICAgICAgdGhpcy5rZXkgPSBrZXk7XG4gICAgfVxuICAgIC8vdGhpcy5wYXJlbnQgPSBudWxsO1xuICAgIHRoaXMuZG9tID0gbnVsbDtcbiAgICB0aGlzLmF0dHJzID0gYXR0cnM7XG59XG5jbGFzc0V4dGVuZChWRnJhZ21lbnROb2RlLCBwcm90bywge2ZyYWdtZW50OiB0cnVlfSk7XG5cblxuZXhwb3J0IGZ1bmN0aW9uIFZDb21wb25lbnQodGFnLCBhdHRycywgY2hpbGRyZW4sIGtleSkge1xuICAgIC8vb2JqZWN0cy5wdXNoKHRoaXMpO1xuICAgIHRoaXMuaWQgPSBpZCsrO1xuICAgIHRoaXMudGFnID0gdGFnO1xuICAgIHRoaXMuY2hpbGRyZW4gPSBjaGlsZHJlbjtcbiAgICB0aGlzLmZyYWdtZW50ID0gdHJ1ZTtcbiAgICBpZiAoa2V5KSB7XG4gICAgICAgIHRoaXMua2V5ID0ga2V5O1xuICAgIH1cbiAgICAvL3RoaXMucGFyZW50ID0gbnVsbDtcbiAgICB0aGlzLmRvbSA9IG51bGw7XG4gICAgdGhpcy5hdHRycyA9IGF0dHJzO1xuICAgIC8vdGhpcy5kZXN0cm95ZWQgPSBudWxsO1xuICAgIC8vdGhpcy5kZXN0cm95ZWQgPSBudWxsO1xufVxuY2xhc3NFeHRlbmQoVkNvbXBvbmVudCwgcHJvdG8sIHtmcmFnbWVudDogdHJ1ZX0pO1xuXG5cbnZhciBub2Rlc0NhY2hlID0gbmV3IEFycmF5KDEwMDAwMDApO1xubm9kZXNDYWNoZS5sZW4gPSAwO1xuXG5mdW5jdGlvbiBOTm9kZSh0YWcsIGF0dHJzLCBjaGlsZHJlbiwga2V5LCB0ZXh0KSB7XG4gICAgLy9vYmplY3RzLnB1c2godGhpcyk7XG4gICAgdGhpcy5pZCA9IGlkKys7XG4gICAgdGhpcy50YWcgPSB0YWc7XG4gICAgdGhpcy5hdHRycyA9IGF0dHJzO1xuICAgIHRoaXMuY2hpbGRyZW4gPSBjaGlsZHJlbjtcbiAgICBpZiAodGV4dCkge1xuICAgICAgICB0aGlzLnRleHQgPSB0ZXh0O1xuICAgIH1cbiAgICB0aGlzLmFsbEF0dHJzID0gJyc7XG4gICAgdGhpcy5rZXkgPSBrZXk7XG4gICAgdGhpcy5kb20gPSBudWxsO1xuICAgIC8vdGhpcy5wYXJlbnQgPSBudWxsO1xuICAgIC8vdGhpcy5kZXN0cm95ZWQgPSBudWxsO1xufVxuY2xhc3NFeHRlbmQoTk5vZGUsIHByb3RvLCB7XG4gICAgZGVzdHJveTogZnVuY3Rpb24gKCkge1xuICAgICAgICAvL3RoaXMuZG9tID0gbnVsbDtcbiAgICAgICAgLy90aGlzLmNoaWxkcmVuID0gbnVsbDtcbiAgICAgICAgLy90aGlzLmF0dHJzID0gbnVsbDtcbiAgICAgICAgbm9kZXNDYWNoZVtub2Rlc0NhY2hlLmxlbisrXSA9IHRoaXM7XG5cbiAgICAgICAgLy90aGlzLmRlc3Ryb3llZCA9IHRydWU7XG4gICAgICAgIC8vdGhpcy5wYXJlbnQgPSBudWxsO1xuICAgIH1cbn0pO1xuZXhwb3J0IGZ1bmN0aW9uIGdldE5Ob2RlKHRhZywgYXR0cnMsIGNoaWxkcmVuLCBrZXksIHRleHQpIHtcbiAgICBpZiAobm9kZXNDYWNoZS5sZW4gPT0gMCkge1xuICAgICAgICByZXR1cm4gbmV3IE5Ob2RlKHRhZywgYXR0cnMsIGNoaWxkcmVuLCBrZXksIHRleHQpO1xuICAgIH1cbiAgICB2YXIgaXRlbSA9IG5vZGVzQ2FjaGVbLS1ub2Rlc0NhY2hlLmxlbl07XG4gICAgaXRlbS50YWcgPSB0YWc7XG4gICAgaXRlbS5hdHRycyA9IGF0dHJzO1xuICAgIGl0ZW0uY2hpbGRyZW4gPSBjaGlsZHJlbjtcbiAgICBpdGVtLmtleSA9IGtleTtcbiAgICBpdGVtLnRleHQgPSB0ZXh0O1xuICAgIHJldHVybiBpdGVtO1xufVxuXG5cbnZhciB0ZXh0Tm9kZXNDYWNoZSA9IG5ldyBBcnJheSgxMDAwMDAwKTtcbnRleHROb2Rlc0NhY2hlLmxlbiA9IDA7XG5cbmZ1bmN0aW9uIFZUZXh0Tm9kZSh0ZXh0KSB7XG4gICAgdGhpcy5pZCA9IGlkKys7XG4gICAgdGhpcy5kb20gPSBudWxsO1xuICAgIHRoaXMudGV4dCA9IHRleHQ7XG4gICAgLy90aGlzLnBhcmVudCA9IG51bGw7XG4gICAgLy90aGlzLmRlc3Ryb3llZCA9IG51bGw7XG59XG5jbGFzc0V4dGVuZChWVGV4dE5vZGUsIHByb3RvLCB7XG4gICAgdGFnOiAnIycsXG4gICAgZGVzdHJveTogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmRvbSA9IG51bGw7XG4gICAgICAgIHRleHROb2Rlc0NhY2hlW3RleHROb2Rlc0NhY2hlLmxlbisrXSA9IHRoaXM7XG4gICAgICAgIC8vdGhpcy5kZXN0cm95ZWQgPSB0cnVlO1xuICAgICAgICAvL3RoaXMucGFyZW50ID0gbnVsbDtcbiAgICB9XG59KTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldFRleHROb2RlKHRleHQpIHtcbiAgICBpZiAodGV4dE5vZGVzQ2FjaGUubGVuID09IDApIHtcbiAgICAgICAgcmV0dXJuIG5ldyBWVGV4dE5vZGUodGV4dCk7XG4gICAgfVxuICAgIHZhciBpdGVtID0gdGV4dE5vZGVzQ2FjaGVbLS10ZXh0Tm9kZXNDYWNoZS5sZW5dO1xuICAgIGl0ZW0udGV4dCA9IHRleHQ7XG4gICAgcmV0dXJuIGl0ZW07XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9ub2RlLmpzXG4gKiovIiwiLyoqXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0gVGhlIExpZmUtQ3ljbGUgb2YgYSBDb21wb3NpdGUgQ29tcG9uZW50IC0tLS0tLS0tLS0tLS0tLS0tLVxuICpcbiAqICsgY29uc3RydWN0b3I6IEluaXRpYWxpemF0aW9uIG9mIHN0YXRlLiBUaGUgaW5zdGFuY2UgaXMgbm93IHJldGFpbmVkLlxuICogICArIGNvbXBvbmVudFdpbGxNb3VudFxuICogICArIHJlbmRlclxuICogICArIFtjaGlsZHJlbidzIGNvbnN0cnVjdG9yc11cbiAqICAgICArIFtjaGlsZHJlbidzIGNvbXBvbmVudFdpbGxNb3VudCBhbmQgcmVuZGVyXVxuICogICAgICsgW2NoaWxkcmVuJ3MgY29tcG9uZW50RGlkTW91bnRdXG4gKiAgICAgKyBjb21wb25lbnREaWRNb3VudFxuICpcbiAqICAgICAgIFVwZGF0ZSBQaGFzZXM6XG4gKiAgICAgICArIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMgKG9ubHkgY2FsbGVkIGlmIHBhcmVudCB1cGRhdGVkKVxuICogICAgICAgLSBzaG91bGRDb21wb25lbnRVcGRhdGVcbiAqICAgICAgICAgKyBjb21wb25lbnRXaWxsVXBkYXRlXG4gKiAgICAgICAgICAgKyByZW5kZXJcbiAqICAgICAgICAgICArIFtjaGlsZHJlbidzIGNvbnN0cnVjdG9ycyBvciByZWNlaXZlIHByb3BzIHBoYXNlc11cbiAqICAgICAgICAgKyBjb21wb25lbnREaWRVcGRhdGVcbiAqXG4gKiAgICAgKyBjb21wb25lbnRXaWxsVW5tb3VudFxuICogICAgICsgW2NoaWxkcmVuJ3MgY29tcG9uZW50V2lsbFVubW91bnRdXG4gKiAgIC0gW2NoaWxkcmVuIGRlc3Ryb3llZF1cbiAqIC0gKGRlc3Ryb3llZCk6IFRoZSBpbnN0YW5jZSBpcyBub3cgYmxhbmssIHJlbGVhc2VkIGJ5IFJlYWN0IGFuZCByZWFkeSBmb3IgR0MuXG4gKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuaW1wb3J0IHt1cGRhdGVDaGlsZHJlbn0gZnJvbSAnLi91cGRhdGUnO1xuaW1wb3J0IHtWQ29tcG9uZW50fSBmcm9tICcuL25vZGUnO1xuaW1wb3J0IHtERUJVR30gZnJvbSAnLi91dGlscyc7XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGZpbmRET01Ob2RlKHZkb20pIHtcbiAgICByZXR1cm4gdmRvbS5kb207XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBDb21wb25lbnQocHJvcHMpIHtcbiAgICB0aGlzLnByb3BzID0gcHJvcHM7XG59XG5cbkNvbXBvbmVudC5wcm90b3R5cGUuY29tcG9uZW50V2lsbE1vdW50ID0gZnVuY3Rpb24gKCkge307XG5Db21wb25lbnQucHJvdG90eXBlLmNvbXBvbmVudERpZE1vdW50ID0gZnVuY3Rpb24gKCkge307XG5cbkNvbXBvbmVudC5wcm90b3R5cGUuY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyA9IGZ1bmN0aW9uICgpIHt9O1xuQ29tcG9uZW50LnByb3RvdHlwZS5jb21wb25lbnRXaWxsVXBkYXRlID0gZnVuY3Rpb24gKCkge307XG5Db21wb25lbnQucHJvdG90eXBlLmNvbXBvbmVudERpZFVwZGF0ZSA9IGZ1bmN0aW9uICgpIHt9O1xuXG5Db21wb25lbnQucHJvdG90eXBlLmNvbXBvbmVudFdpbGxVbm1vdW50ID0gZnVuY3Rpb24gKCkge307XG5cblxuQ29tcG9uZW50LnByb3RvdHlwZS51cGRhdGVQcm9wcyA9IGZ1bmN0aW9uIChwcm9wcykge1xuICAgIHRoaXMuY29tcG9uZW50V2lsbFVwZGF0ZShwcm9wcyk7XG4gICAgLy92YXIgb2xkUHJvcHMgPSB0aGlzLnByb3BzO1xuICAgIHRoaXMucHJvcHMgPSBwcm9wcztcbiAgICB2YXIgbmV3Tm9kZSA9IG5ldyBWQ29tcG9uZW50KHRoaXMuY29uc3RydWN0b3IsIG51bGwsIFt0aGlzLnJlbmRlcigpXSwgbnVsbCk7XG4gICAgdXBkYXRlQ2hpbGRyZW4odGhpcy5ub2RlLCBuZXdOb2RlKTtcbiAgICB0aGlzLm5vZGUuY2hpbGRyZW4gPSBuZXdOb2RlLmNoaWxkcmVuO1xuICAgIC8vdG9kbzpjb21wb25lbnREaWRVcGRhdGUob2JqZWN0IHByZXZQcm9wcywgb2JqZWN0IHByZXZTdGF0ZSlcbiAgICB0aGlzLmNvbXBvbmVudERpZFVwZGF0ZSh0aGlzLnByb3BzKTtcbn07XG5cbkNvbXBvbmVudC5wcm90b3R5cGUuZm9yY2VVcGRhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy51cGRhdGVQcm9wcyh0aGlzLnByb3BzKTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVDb21wb25lbnQob2xkLCB2ZG9tKSB7XG4gICAgdmRvbS5jb21wb25lbnQgPSBvbGQuY29tcG9uZW50O1xuICAgIHZhciBwcm9wcyA9IHZkb20uYXR0cnMgfHwge307XG4gICAgcHJvcHMuY2hpbGRyZW4gPSB2ZG9tLmNoaWxkcmVuO1xuICAgIHZkb20uY29tcG9uZW50LmNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMocHJvcHMpO1xuICAgIHZkb20uY29tcG9uZW50LnVwZGF0ZVByb3BzKHByb3BzKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUNvbXBvbmVudCh2ZG9tKSB7XG4gICAgdmFyIHByb3BzID0gdmRvbS5hdHRycyB8fCB7fTtcbiAgICBwcm9wcy5jaGlsZHJlbiA9IHZkb20uY2hpbGRyZW47XG4gICAgdmRvbS5jb21wb25lbnQgPSBuZXcgdmRvbS50YWcocHJvcHMpO1xuICAgIHZkb20uY29tcG9uZW50LmNvbXBvbmVudFdpbGxNb3VudCgpO1xuICAgIHZkb20uY2hpbGRyZW4gPSBbdmRvbS5jb21wb25lbnQucmVuZGVyKCldO1xuICAgIHZkb20uY29tcG9uZW50Lm5vZGUgPSB2ZG9tO1xuICAgIERFQlVHICYmIGNvbnNvbGUubG9nKHZkb20pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVzdHJveUNvbXBvbmVudCh2ZG9tKSB7XG4gICAgdmRvbS5jb21wb25lbnQuY29tcG9uZW50V2lsbFVubW91bnQoKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1vdW50Q29tcG9uZW50KHZkb20pIHtcbiAgICB2ZG9tLmNvbXBvbmVudC5jb21wb25lbnREaWRNb3VudCgpO1xufVxuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9jb21wb25lbnQuanNcbiAqKi8iLCJpbXBvcnQge2F0dHJzLCBwcm9wcywgZXZlbnRzfSBmcm9tICcuL2F0dHJzJztcbmltcG9ydCB7dXBkYXRlQ29tcG9uZW50LCBkZXN0cm95Q29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudCc7XG5pbXBvcnQge25vcm1DaGlsZCwgZ2V0Rmlyc3RDaGlsZCwgREVCVUd9IGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0IHtjcmVhdGV9IGZyb20gJy4vY3JlYXRlJztcblxuXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlKG9sZCwgdmRvbSkge1xuICAgIERFQlVHICYmIGNvbnNvbGUubG9nKFwidXBkYXRlXCIsIHZkb20pO1xuXG4gICAgdmFyIGRvbSA9IG9sZC5kb207XG4gICAgZG9tLnVwZGF0ZWQgPSB0cnVlO1xuICAgIHZkb20uZG9tID0gZG9tO1xuICAgIC8vdmRvbS5wYXJlbnQgPSBvbGQucGFyZW50O1xuICAgIGlmIChvbGQudGFnICE9PSB2ZG9tLnRhZykge1xuICAgICAgICByZXBsYWNlTm9kZShvbGQsIHZkb20pO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChvbGQudGFnID09ICcjJykge1xuICAgICAgICBpZiAob2xkLnRleHQgIT09IHZkb20udGV4dCkge1xuICAgICAgICAgICAgZG9tLnRleHRDb250ZW50ID0gdmRvbS50ZXh0O1xuICAgICAgICB9XG4gICAgICAgIG9sZC5kZXN0cm95KCk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKG9sZC50ZXh0ICE9PSB2ZG9tLnRleHQpIHtcbiAgICAgICAgZG9tLnRleHRDb250ZW50ID0gdmRvbS50ZXh0O1xuICAgIH1cblxuICAgIGlmICh2ZG9tLmZyYWdtZW50KSB7XG4gICAgICAgIGlmICh2ZG9tLmtleSAhPT0gb2xkLmtleSkge1xuICAgICAgICAgICAgcmVwbGFjZU5vZGUob2xkLCB2ZG9tKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdmRvbS5hbGxBdHRycyA9ICcnO1xuICAgICAgICBpZiAodmRvbS5hdHRycyAmJiBvbGQuYXR0cnMpIHtcbiAgICAgICAgICAgIGZvckF0dHJzKG9sZCwgdmRvbSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKChvbGQuYXR0cnMgJiYgIXZkb20uYXR0cnMpIHx8ICghb2xkLmF0dHJzICYmIHZkb20uYXR0cnMpIHx8IG9sZC5hbGxBdHRycyAhPT0gdmRvbS5hbGxBdHRycykge1xuICAgICAgICAgICAgcmVwbGFjZU5vZGUob2xkLCB2ZG9tKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAob2xkLmNvbXBvbmVudCkge1xuICAgICAgICB1cGRhdGVDb21wb25lbnQob2xkLCB2ZG9tKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICghdmRvbS50ZXh0KSB7XG4gICAgICAgIHZhciByZXMgPSB1cGRhdGVDaGlsZHJlbihvbGQsIHZkb20pO1xuICAgICAgICBpZiAocmVzKXtcbiAgICAgICAgICAgIG9sZC5kZXN0cm95KCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBvbGQuZGVzdHJveSgpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlQ2hpbGRyZW4ob2xkLCB2ZG9tKSB7XG4gICAgdmFyIG9sZExlbiA9IG9sZC5jaGlsZHJlbiA/IG9sZC5jaGlsZHJlbi5sZW5ndGggOiAwO1xuICAgIHZhciBuZXdMZW4gPSB2ZG9tLmNoaWxkcmVuID8gdmRvbS5jaGlsZHJlbi5sZW5ndGggOiAwO1xuICAgIGlmIChvbGRMZW4pIHtcbiAgICAgICAgdmFyIHBhcmVudERvbSA9IG9sZC5kb207XG4gICAgICAgIHZhciBiZWZvcmVDaGlsZCA9IGdldEZpcnN0Q2hpbGQob2xkKTtcbiAgICAgICAgaWYgKCh2ZG9tLnRhZyA9PSAnbWFwJyAmJiBvbGQudGFnICE9ICdtYXAnKSB8fCAodmRvbS50YWcgIT0gJ21hcCcgJiYgb2xkLnRhZyA9PSAnbWFwJykpIHtcbiAgICAgICAgICAgIHJlcGxhY2VOb2RlKG9sZCwgdmRvbSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodmRvbS50YWcgPT0gJ21hcCcgJiYgb2xkLnRhZyA9PSAnbWFwJykge1xuICAgICAgICAgICAgdmFyIHJlcyA9IG1hcENoaWxkcmVuKG9sZCwgdmRvbSwgYmVmb3JlQ2hpbGQpO1xuICAgICAgICAgICAgaWYgKHJlcyA9PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIHJlcGxhY2VOb2RlKG9sZCwgdmRvbSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKG9sZExlbiA9PT0gbmV3TGVuKSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBuZXdMZW47IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXZkb20uY2hpbGRyZW5baV0gfHwgIXZkb20uY2hpbGRyZW5baV0udGFnKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vcm1DaGlsZCh2ZG9tLCBpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB1cGRhdGUob2xkLmNoaWxkcmVuW2ldLCB2ZG9tLmNoaWxkcmVuW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJDaGlsZChvbGQsIGkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBuZXdMZW47IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXZkb20uY2hpbGRyZW5baV0gfHwgIXZkb20uY2hpbGRyZW5baV0udGFnKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vcm1DaGlsZCh2ZG9tLCBpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB2YXIgbmV3Q2hpbGQgPSB2ZG9tLmNoaWxkcmVuW2ldO1xuICAgICAgICAgICAgICAgICAgICBjcmVhdGUobmV3Q2hpbGQsIHZkb20uZG9tKTtcbiAgICAgICAgICAgICAgICAgICAgaW5zZXJ0KHBhcmVudERvbSwgbmV3Q2hpbGQsIGJlZm9yZUNoaWxkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IG9sZExlbjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZShvbGQuY2hpbGRyZW5baV0pO1xuICAgICAgICAgICAgICAgICAgICBjbGVhckNoaWxkKG9sZCwgaSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAob2xkTGVuICE9PSBuZXdMZW4pIHtcbiAgICAgICAgcmVwbGFjZU5vZGUob2xkLCB2ZG9tKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbn1cblxuXG5mdW5jdGlvbiBtYXBDaGlsZHJlbihvbGQsIHZkb20sIGJlZm9yZUNoaWxkKSB7XG4gICAgdmFyIHBhcmVudERvbSA9IG9sZC5kb207XG4gICAgdmFyIGtleU1hcCA9IG9sZC5rZXlNYXA7XG4gICAgdmFyIG5ld0tleU1hcCA9IHZkb20ua2V5TWFwO1xuICAgIHZhciBuZXdDaGlsZHJlbiA9IHZkb20uY2hpbGRyZW47XG4gICAgdmFyIG5ld0xlbiA9IG5ld0NoaWxkcmVuLmxlbmd0aDtcbiAgICB2YXIgb2xkTGVuID0gb2xkLmNoaWxkcmVuLmxlbmd0aDtcbiAgICB2YXIgZm91bmQgPSAwO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbmV3TGVuOyBpKyspIHtcbiAgICAgICAgaWYgKCF2ZG9tLmNoaWxkcmVuW2ldIHx8ICF2ZG9tLmNoaWxkcmVuW2ldLnRhZyl7XG4gICAgICAgICAgICBub3JtQ2hpbGQodmRvbSwgaSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIG5ld0NoaWxkID0gbmV3Q2hpbGRyZW5baV07XG4gICAgICAgIHZhciBvbGRDaGlsZCA9IG9sZC5jaGlsZHJlbltpXTtcbiAgICAgICAgdmFyIG5ld0tleSA9IG5ld0NoaWxkLmtleTtcbiAgICAgICAgaWYgKG5ld0tleSA9PSBudWxsKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ21hcCB3aXRob3V0IGtleXMnLCB2ZG9tKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIga2V5Q2hpbGQgPSBvbGQuY2hpbGRyZW5ba2V5TWFwW25ld0tleV1dO1xuICAgICAgICBpZiAoa2V5Q2hpbGQpIHtcbiAgICAgICAgICAgIGZvdW5kKys7XG4gICAgICAgICAgICBpZiAoa2V5Q2hpbGQgIT09IG9sZENoaWxkKSB7XG4gICAgICAgICAgICAgICAgaW5zZXJ0KHBhcmVudERvbSwga2V5Q2hpbGQsIGJlZm9yZUNoaWxkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHVwZGF0ZShrZXlDaGlsZCwgbmV3Q2hpbGQpO1xuICAgICAgICAgICAgaWYgKGtleUNoaWxkID09IG9sZENoaWxkKSB7XG4gICAgICAgICAgICAgICAgY2xlYXJDaGlsZChvbGQsIGkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAga2V5TWFwW25ld0tleV0gPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY3JlYXRlKG5ld0NoaWxkLCB2ZG9tLmRvbSk7XG4gICAgICAgICAgICBpbnNlcnQocGFyZW50RG9tLCBuZXdDaGlsZCwgYmVmb3JlQ2hpbGQpO1xuICAgICAgICB9XG4gICAgICAgIGJlZm9yZUNoaWxkID0gbmV3Q2hpbGQuZG9tLm5leHRTaWJsaW5nO1xuICAgICAgICBuZXdLZXlNYXBbbmV3S2V5XSA9IGk7XG4gICAgfVxuICAgIC8vb2xkLmtleU1hcCA9IG51bGw7XG5cbiAgICBpZiAoZm91bmQgIT09IG9sZExlbikge1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgb2xkTGVuOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBjaGlsZCA9IG9sZC5jaGlsZHJlbltpXTtcbiAgICAgICAgICAgIGlmIChjaGlsZCAmJiBuZXdLZXlNYXBbY2hpbGQua2V5XSA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmVtb3ZlKGNoaWxkKTtcbiAgICAgICAgICAgICAgICBjbGVhckNoaWxkKG9sZCwgaSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIHJlcGxhY2VOb2RlKG9sZCwgdmRvbSkge1xuICAgIHZhciBwYXJlbnREb20gPSBvbGQuZnJhZ21lbnQgPyBvbGQuZG9tIDogb2xkLmRvbS5wYXJlbnROb2RlO1xuICAgIGNyZWF0ZSh2ZG9tLCBwYXJlbnREb20pO1xuICAgIGluc2VydChwYXJlbnREb20sIHZkb20sIG9sZC5mcmFnbWVudCA/IGdldEZpcnN0Q2hpbGQob2xkKSA6IG9sZCk7XG4gICAgcmVtb3ZlKG9sZCk7XG4gICAgcmV0dXJuIHZkb207XG5cbn1cblxuZnVuY3Rpb24gZm9yQXR0cnMob2xkLCB2ZG9tKSB7XG4gICAgdmFyIGF0dHI7XG4gICAgdmFyIGlzTm90U2FtZTtcbiAgICB2YXIgZG9tID0gdmRvbS5kb207XG4gICAgZm9yICh2YXIgYXR0ck5hbWUgaW4gdmRvbS5hdHRycykge1xuICAgICAgICB2ZG9tLmFsbEF0dHJzICs9IGF0dHJOYW1lO1xuICAgICAgICB2YXIgYXR0clZhbCA9IHZkb20uYXR0cnNbYXR0ck5hbWVdO1xuICAgICAgICBpZiAoYXR0ck5hbWUgPT0gJ2tleScpIHt9XG4gICAgICAgIGVsc2UgaWYgKChpc05vdFNhbWUgPSBhdHRyVmFsICE9PSBvbGQuYXR0cnNbYXR0ck5hbWVdKSAmJiAoYXR0ciA9IHByb3BzW2F0dHJOYW1lXSkpIHtcbiAgICAgICAgICAgIGRvbVthdHRyXSA9IGF0dHJWYWw7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoKGF0dHIgPSBhdHRyc1thdHRyTmFtZV0pICYmIGlzTm90U2FtZSkge1xuICAgICAgICAgICAgaWYgKGF0dHJWYWwgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgZG9tLnJlbW92ZUF0dHJpYnV0ZShhdHRyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGRvbS5zZXRBdHRyaWJ1dGUoYXR0ciwgYXR0clZhbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoYXR0ciA9IGV2ZW50c1thdHRyTmFtZV0gJiYgaXNOb3RTYW1lKSB7XG4gICAgICAgICAgICBkb21bJ29uJyArIGF0dHJdID0gYXR0clZhbDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChhdHRyTmFtZVswXSA9PT0gJ28nICYmIGF0dHJOYW1lWzFdID09PSAnbicgJiYgaXNOb3RTYW1lKSB7XG4gICAgICAgICAgICBhdHRyID0gYXR0ck5hbWUuc3Vic3RyaW5nKDIpLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICBkb21bJ29uJyArIGF0dHJdID0gYXR0clZhbDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChhdHRyTmFtZVswXSA9PT0gJ2QnICYmIGF0dHJOYW1lWzFdID09PSAnYScgJiYgYXR0ck5hbWVbMl0gPT09ICd0JyAmJiBhdHRyTmFtZVszXSA9PT0gJ2EnICYmIGlzTm90U2FtZSkge1xuICAgICAgICAgICAgaWYgKGF0dHJWYWwgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgZG9tLnJlbW92ZUF0dHJpYnV0ZShhdHRyTmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBkb20uc2V0QXR0cmlidXRlKGF0dHJOYW1lLCBhdHRyVmFsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChhdHRyTmFtZSA9PT0gJ3JlZicgJiYgdHlwZW9mIGF0dHJWYWwgPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgLy9kZWJ1Z2dlcjtcbiAgICAgICAgICAgIGF0dHJWYWwodmRvbSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIGluc2VydChwYXJlbnREb20sIHZkb20sIGJlZm9yZSkge1xuICAgIGlmICh2ZG9tLmZyYWdtZW50KSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdmRvbS5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaW5zZXJ0KHZkb20uZG9tLCB2ZG9tLmNoaWxkcmVuW2ldLCBiZWZvcmUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgREVCVUcgJiYgY29uc29sZS5sb2coXCJJbnNlcnRcIiwgdmRvbSk7XG4gICAgcGFyZW50RG9tLmluc2VydEJlZm9yZSh2ZG9tLmRvbSwgYmVmb3JlICYmIGJlZm9yZS5kb20pO1xufVxuXG5cbmZ1bmN0aW9uIGNsZWFyQ2hpbGQob2xkLCBpKXtcbiAgICBvbGQuY2hpbGRyZW5baV0gPSBudWxsO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlKG9sZCkge1xuICAgIERFQlVHICYmIGNvbnNvbGUubG9nKFwicmVtb3ZlXCIsIG9sZCk7XG5cbiAgICBpZiAob2xkLmNvbXBvbmVudCkge1xuICAgICAgICBkZXN0cm95Q29tcG9uZW50KG9sZCk7XG4gICAgfVxuICAgIGlmIChvbGQuY2hpbGRyZW4pIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBvbGQuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHJlbW92ZShvbGQuY2hpbGRyZW5baV0pO1xuICAgICAgICAgICAgY2xlYXJDaGlsZChvbGQsIGkpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmICghb2xkLmZyYWdtZW50KSB7XG4gICAgICAgIG9sZC5kb20ucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChvbGQuZG9tKTtcbiAgICB9XG4gICAgb2xkLmRlc3Ryb3koKTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3VwZGF0ZS5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=