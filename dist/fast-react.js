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
	    dom.appendChild(create(vdom, { dom: dom }));
	    if (vdom.component) {
	        (0, _component.mountComponent)(vdom);
	    }
	    return vdom;
	}
	
	function create(vdom, parent) {
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
	        vdom.dom = parent.dom;
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
	            dom.appendChild(create(child, vdom));
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
	        return new _node.NNode(tag, attrs, children, attrs ? attrs.key : null, null);
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
	        return new _node.NNode(tag, attrs, children, attrs ? attrs.key : null, text);
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
	            vdom.children[i] = new _node.VTextNode(child);
	        } else if (child == null) {
	            vdom.children[i] = new _node.VTextNode('');
	        } else if (typeof child === 'object') {
	            if (child instanceof Array) {
	                vdom.children[i] = new _node.VFragmentNode('map', null, child, null);
	            } else {
	                vdom.children[i] = new _node.VTextNode(JSON.stringify(child));
	            }
	        } else if (typeof child === 'function') {
	            vdom.children[i] = new _node.VTextNode('Function');
	        } else {
	            vdom.children[i] = new _node.VTextNode('');
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
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	exports.VFragmentNode = VFragmentNode;
	exports.VComponent = VComponent;
	exports.NNode = NNode;
	exports.VTextNode = VTextNode;
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
	    this.destroyed = null;
	    //this.destroyed = null;
	}
	
	classExtend(VComponent, proto, { fragment: true });
	
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
	
	classExtend(NNode, proto);
	
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
	        //this.destroyed = true;
	        //this.parent = null;
	    }
	});

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
	                    (0, _utils.normChild)(vdom, i);
	                    update(old.children[i], vdom.children[i]);
	                    old.children[i] = null;
	                }
	            } else {
	                for (i = 0; i < newLen; i++) {
	                    (0, _utils.normChild)(vdom, i);
	                    var newChild = vdom.children[i];
	                    (0, _create.create)(newChild, vdom);
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
	            (0, _create.create)(newChild, vdom);
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
	    (0, _create.create)(vdom, old.parent);
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
	        for (var i = 0; i < vdom.children.length; i++) {
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
	        for (var i = 0; i < old.children.length; i++) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNmJmMjQ0MjA5NDRhMDBmOWNiMjYiLCJ3ZWJwYWNrOi8vLy4vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Zhc3QtcmVhY3QuanM/N2RjOSIsIndlYnBhY2s6Ly8vLi9zcmMvZmFzdC1yZWFjdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY3JlYXRlLmpzIiwid2VicGFjazovLy8uL3NyYy9hdHRycy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL25vZGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXBkYXRlLmpzIiwid2VicGFjazovLy8uL3NyYy9yZW1vdmUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7OztBQ3RDQSxvQkFBTyxDQUFDLENBQXNDLENBQUMsQzs7Ozs7O0FDQS9DLDJHQUFrSyxFOzs7Ozs7Ozs7Ozs7O21DQ0E1SCxDQUFVOzs7OztvQkFBdkMsTUFBTTs7Ozs7O29CQUFFLGFBQWE7Ozs7c0NBQ1MsQ0FBYTs7Ozs7dUJBQTNDLFNBQVM7Ozs7Ozt1QkFBRSxXQUFXOzs7O21DQUNSLENBQVU7Ozs7O29CQUF4QixNQUFNOzs7Ozs7Ozs7Ozs7O1NDR0MsTUFBTSxHQUFOLE1BQU07U0FRTixNQUFNLEdBQU4sTUFBTTtTQXdGTixrQkFBa0IsR0FBbEIsa0JBQWtCO1NBZ0JsQixhQUFhLEdBQWIsYUFBYTs7a0NBckhNLENBQVM7O2tDQUNiLENBQVM7O2lDQUNPLENBQVE7O3NDQUNULENBQWE7O0FBRXBE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R0FBRyxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQzs7QUFFcEMsU0FBSSxHQUFHLENBQUMsU0FBUyxFQUFFO0FBQ2Ysd0JBUEEsZ0JBQWdCLEVBT0MsR0FBRyxDQUFDLENBQUM7TUFDekI7QUFDRCxTQUFJLEdBQUcsQ0FBQyxRQUFRLEVBQUU7QUFDZCxjQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDMUMsd0JBQVcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7VUFDdkI7TUFDSjtBQUNELFNBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFO0FBQ2YsWUFBRyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztNQUMzQztBQUNELFFBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztFQUNqQjs7QUFFTSxVQUFTLFdBQVcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFO0FBQ2hDLFdBQU0sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDeEIsUUFBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMiLCJmaWxlIjoiZmFzdC1yZWFjdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgNmJmMjQ0MjA5NDRhMDBmOWNiMjZcbiAqKi8iLCJyZXF1aXJlKFwiZXhwb3NlP0Zhc3RSZWFjdCEuL3NyYy9mYXN0LXJlYWN0LmpzXCIpO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9pbmRleC5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZ2xvYmFsW1wiRmFzdFJlYWN0XCJdID0gcmVxdWlyZShcIi0hL1VzZXJzL2NvZHkvZGV2L2JldHB1Yi9mcm9udGVuZC9kZGQvbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9pbmRleC5qcz97XFxcInN0YWdlXFxcIjowLFxcXCJsb29zZVxcXCI6W1xcXCJlczYuY2xhc3Nlc1xcXCJdfSEvVXNlcnMvY29keS9kZXYvYmV0cHViL2Zyb250ZW5kL2RkZC9zcmMvZmFzdC1yZWFjdC5qc1wiKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9leHBvc2UtbG9hZGVyP0Zhc3RSZWFjdCEuL3NyYy9mYXN0LXJlYWN0LmpzXG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZXhwb3J0IHsgcmVuZGVyLCBjcmVhdGVFbGVtZW50IH0gZnJvbSAnLi9jcmVhdGUnO1xuZXhwb3J0IHsgQ29tcG9uZW50LCBmaW5kRE9NTm9kZSB9IGZyb20gJy4vY29tcG9uZW50JztcbmV4cG9ydCB7IHVwZGF0ZSB9IGZyb20gJy4vdXBkYXRlJztcblxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvZmFzdC1yZWFjdC5qc1xuICoqLyIsImltcG9ydCB7YXR0cnMsIHByb3BzLCBldmVudHN9IGZyb20gJy4vYXR0cnMnO1xuaW1wb3J0IHtERUJVRywgbm9ybUNoaWxkfSBmcm9tICcuL3V0aWxzJztcbmltcG9ydCB7VkZyYWdtZW50Tm9kZSwgVkNvbXBvbmVudCwgTk5vZGV9IGZyb20gJy4vbm9kZSc7XG5pbXBvcnQge2NyZWF0ZUNvbXBvbmVudCwgbW91bnRDb21wb25lbnR9IGZyb20gJy4vY29tcG9uZW50JztcblxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlcih2ZG9tLCBkb20pIHtcbiAgICBkb20uYXBwZW5kQ2hpbGQoY3JlYXRlKHZkb20sIHtkb206IGRvbX0pKTtcbiAgICBpZiAodmRvbS5jb21wb25lbnQpIHtcbiAgICAgICAgbW91bnRDb21wb25lbnQodmRvbSk7XG4gICAgfVxuICAgIHJldHVybiB2ZG9tO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlKHZkb20sIHBhcmVudCkge1xuICAgIERFQlVHICYmIGNvbnNvbGUubG9nKFwiQ3JlYXRlXCIsIHZkb20pO1xuICAgIC8vdmRvbS5wYXJlbnQgPSBwYXJlbnQ7XG4gICAgaWYgKHZkb20udGFnID09ICcjJykge1xuICAgICAgICB2ZG9tLmRvbSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHZkb20udGV4dCk7XG4gICAgICAgIC8vdmRvbS5kb20udmlydHVhbCA9IHZkb207XG4gICAgICAgIHJldHVybiB2ZG9tLmRvbTtcbiAgICB9XG4gICAgdmFyIGRvbTtcbiAgICBpZiAodmRvbS5mcmFnbWVudCkge1xuICAgICAgICBpZiAodHlwZW9mIHZkb20udGFnID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjcmVhdGVDb21wb25lbnQodmRvbSk7XG4gICAgICAgIH1cbiAgICAgICAgZG9tID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICAgICAgICB2ZG9tLmRvbSA9IHBhcmVudC5kb207XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBkb20gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHZkb20udGFnKTtcbiAgICAgICAgdmRvbS5kb20gPSBkb207XG4gICAgICAgIC8vZG9tLnZpcnR1YWwgPSB2ZG9tO1xuICAgIH1cblxuICAgIGlmICh2ZG9tLmNoaWxkcmVuKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdmRvbS5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbm9ybUNoaWxkKHZkb20sIGkpO1xuICAgICAgICAgICAgdmFyIGNoaWxkID0gdmRvbS5jaGlsZHJlbltpXTtcbiAgICAgICAgICAgIGlmICh2ZG9tLnRhZyA9PT0gJ21hcCcgJiYgY2hpbGQuYXR0cnMpIHtcbiAgICAgICAgICAgICAgICB2ZG9tLmtleU1hcFtjaGlsZC5rZXldID0gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRvbS5hcHBlbmRDaGlsZChjcmVhdGUoY2hpbGQsIHZkb20pKTtcbiAgICAgICAgICAgIGlmIChjaGlsZC5jb21wb25lbnQpIHtcbiAgICAgICAgICAgICAgICBtb3VudENvbXBvbmVudChjaGlsZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAodmRvbS50ZXh0KSB7XG4gICAgICAgIGRvbS50ZXh0Q29udGVudCA9IHZkb20udGV4dDtcbiAgICB9XG4gICAgdmRvbS5hbGxBdHRycyA9ICcnO1xuICAgIGlmICh2ZG9tLmF0dHJzICYmICF2ZG9tLmZyYWdtZW50KSB7XG4gICAgICAgIGlmICh2ZG9tLmF0dHJzLnJlZikge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB2ZG9tLmF0dHJzLnJlZiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIHZkb20uYXR0cnMucmVmKHZkb20pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy90b2RvOlxuLypcbiAgICAgICAgICAgIGVsc2UgaWYgKGN1cnJlbnRDb21wb25lbnQpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50Q29tcG9uZW50LnJlZnMgPSBjdXJyZW50Q29tcG9uZW50LnJlZnMgfHwge307XG4gICAgICAgICAgICAgICAgY3VycmVudENvbXBvbmVudC5yZWZzW3Zkb20uYXR0cnMucmVmXSA9IHZkb207XG4gICAgICAgICAgICB9XG4qL1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGF0dHI7XG4gICAgICAgIHZhciBwcm9wO1xuICAgICAgICB2YXIgZXZlbnQ7XG4gICAgICAgIGZvciAodmFyIGF0dHJOYW1lIGluIHZkb20uYXR0cnMpIHtcbiAgICAgICAgICAgIHZkb20uYWxsQXR0cnMgKz0gYXR0ck5hbWU7XG4gICAgICAgICAgICB2YXIgYXR0clZhbCA9IHZkb20uYXR0cnNbYXR0ck5hbWVdO1xuICAgICAgICAgICAgaWYgKChwcm9wID0gcHJvcHNbYXR0ck5hbWVdKSAmJiBhdHRyVmFsICE9PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIGRvbVtwcm9wXSA9IGF0dHJWYWw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICgoYXR0ciA9IGF0dHJzW2F0dHJOYW1lXSkgJiYgYXR0clZhbCAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICBkb20uc2V0QXR0cmlidXRlKGF0dHIsIGF0dHJWYWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoZXZlbnQgPSBldmVudHNbYXR0ck5hbWVdKSB7XG4gICAgICAgICAgICAgICAgLy9kb20uYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgZXZlbnRIYW5kbGVyKGF0dHJWYWwpKTtcbiAgICAgICAgICAgICAgICBkb21bJ29uJyArIGV2ZW50XSA9IGF0dHJWYWw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChhdHRyTmFtZVswXSA9PT0gJ28nICYmIGF0dHJOYW1lWzFdID09PSAnbicpIHtcbiAgICAgICAgICAgICAgICBldmVudCA9IGF0dHJOYW1lLnN1YnN0cmluZygyKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgICAgIGRvbVsnb24nICsgZXZlbnRdID0gYXR0clZhbDtcbiAgICAgICAgICAgICAgICAvL2RvbS5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBldmVudEhhbmRsZXIoYXR0clZhbCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoYXR0ck5hbWVbMF0gPT09ICdkJyAmJiBhdHRyTmFtZVsxXSA9PT0gJ2EnICYmIGF0dHJOYW1lWzJdID09PSAndCcgJiYgYXR0ck5hbWVbM10gPT09ICdhJyAmJiBhdHRyVmFsICE9PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIGRvbS5zZXRBdHRyaWJ1dGUoYXR0ck5hbWUsIGF0dHJWYWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLypcbiAgICAgICAgICAgICBlbHNlIGlmIChrZXkgPT09ICdzdHlsZScpIHtcbiAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgKi9cblxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBkb207XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnRBcnJheSh0YWcsIGF0dHJzLCBjaGlsZHJlbikge1xuICAgIHZhciBpc0ZyYWdtZW50ID0gdGFnID09ICdAJyB8fCB0eXBlb2YgdGFnID09ICdmdW5jdGlvbic7XG4vLyAgICAgICAgdmFyIHRleHQgPSAoY2hpbGRyZW4gJiYgIWlzRnJhZ21lbnQgJiYgKHR5cGVvZiBjaGlsZHJlblswXSA9PSAnc3RyaW5nJyB8fCB0eXBlb2YgY2hpbGRyZW5bMF0gPT0gJ251bWJlcicpKSA/IGNoaWxkcmVuWzBdICsgJycgOiBudWxsO1xuICAgIGlmIChpc0ZyYWdtZW50KSB7XG4gICAgICAgIGlmICh0eXBlb2YgdGFnID09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgVkNvbXBvbmVudCh0YWcsIGF0dHJzLCBjaGlsZHJlbiwgYXR0cnMgPyBhdHRycy5rZXkgOiBudWxsKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgVkZyYWdtZW50Tm9kZSh0YWcsIGF0dHJzLCBjaGlsZHJlbiwgYXR0cnMgPyBhdHRycy5rZXkgOiBudWxsKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG5ldyBOTm9kZSh0YWcsIGF0dHJzLCBjaGlsZHJlbiwgYXR0cnMgPyBhdHRycy5rZXkgOiBudWxsLCBudWxsKTtcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVFbGVtZW50KHRhZywgYXR0cnMpIHtcbiAgICB2YXIgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICB2YXIgaXNGcmFnbWVudCA9IHRhZyA9PSAnQCcgfHwgdHlwZW9mIHRhZyA9PSAnZnVuY3Rpb24nO1xuICAgIHZhciB0ZXh0ID0gKGxlbiA9PSAzICYmICFpc0ZyYWdtZW50ICYmICh0eXBlb2YgYXJndW1lbnRzWzJdID09ICdzdHJpbmcnIHx8IHR5cGVvZiBhcmd1bWVudHNbMl0gPT0gJ251bWJlcicpKSA/IGFyZ3VtZW50c1syXSArICcnIDogbnVsbDtcbiAgICB2YXIgY2hpbGRyZW4gPSBudWxsO1xuICAgIGlmICghdGV4dCAmJiBsZW4gPiAyKSB7XG4gICAgICAgIGNoaWxkcmVuID0gQXJyYXkobGVuIC0gMik7XG4gICAgICAgIGZvciAodmFyIGkgPSAyOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIGNoaWxkcmVuW2kgLSAyXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlmIChpc0ZyYWdtZW50KSB7XG4gICAgICAgIGlmICh0eXBlb2YgdGFnID09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgVkNvbXBvbmVudCh0YWcsIGF0dHJzLCBjaGlsZHJlbiwgYXR0cnMgPyBhdHRycy5rZXkgOiBudWxsKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgVkZyYWdtZW50Tm9kZSh0YWcsIGF0dHJzLCBjaGlsZHJlbiwgYXR0cnMgPyBhdHRycy5rZXkgOiBudWxsKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG5ldyBOTm9kZSh0YWcsIGF0dHJzLCBjaGlsZHJlbiwgYXR0cnMgPyBhdHRycy5rZXkgOiBudWxsLCB0ZXh0KTtcbiAgICB9XG59XG5cblxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvY3JlYXRlLmpzXG4gKiovIiwiZXhwb3J0IGxldCBhdHRycyA9IHtcbiAgICBhY2NlcHQ6ICdhY2NlcHQnLFxuICAgIGFjY2VwdENoYXJzZXQ6ICdhY2NlcHQtY2hhcnNldCcsXG4gICAgYWNjZXNzS2V5OiAnYWNjZXNzS2V5JyxcbiAgICBhY3Rpb246ICdhY3Rpb24nLFxuICAgIGFsbG93RnVsbFNjcmVlbjogJ2FsbG93RnVsbFNjcmVlbicsXG4gICAgYWxsb3dUcmFuc3BhcmVuY3k6ICdhbGxvd1RyYW5zcGFyZW5jeScsXG4gICAgYWx0OiAnYWx0JyxcbiAgICBhc3luYzogJ2FzeW5jJyxcbiAgICBhdXRvQ29tcGxldGU6ICdhdXRvQ29tcGxldGUnLFxuICAgIGF1dG9QbGF5OiAnYXV0b1BsYXknLFxuICAgIGNhcHR1cmU6ICdjYXB0dXJlJyxcbiAgICBjZWxsUGFkZGluZzogJ2NlbGxQYWRkaW5nJyxcbiAgICBjZWxsU3BhY2luZzogJ2NlbGxTcGFjaW5nJyxcbiAgICBjaGFyU2V0OiAnY2hhclNldCcsXG4gICAgY2hhbGxlbmdlOiAnY2hhbGxlbmdlJyxcbiAgICBjbGFzc0lEOiAnY2xhc3NJRCcsXG4gICAgY29sczogJ2NvbHMnLFxuICAgIGNvbFNwYW46ICdjb2xTcGFuJyxcbiAgICBjb250ZW50OiAnY29udGVudCcsXG4gICAgY29udGVudEVkaXRhYmxlOiAnY29udGVudEVkaXRhYmxlJyxcbiAgICBjb250ZXh0TWVudTogJ2NvbnRleHRNZW51JyxcbiAgICBjb29yZHM6ICdjb29yZHMnLFxuICAgIGNyb3NzT3JpZ2luOiAnY3Jvc3NPcmlnaW4nLFxuICAgIGRhdGE6ICdkYXRhJyxcbiAgICBkYXRlVGltZTogJ2RhdGVUaW1lJyxcbiAgICBkZWZlcjogJ2RlZmVyJyxcbiAgICBkaXI6ICdkaXInLFxuICAgIGRpc2FibGVkOiAnZGlzYWJsZWQnLFxuICAgIGRvd25sb2FkOiAnZG93bmxvYWQnLFxuICAgIGRyYWdnYWJsZTogJ2RyYWdnYWJsZScsXG4gICAgZW5jVHlwZTogJ2VuY1R5cGUnLFxuICAgIGZvcm06ICdmb3JtJyxcbiAgICBmb3JtQWN0aW9uOiAnZm9ybUFjdGlvbicsXG4gICAgZm9ybUVuY1R5cGU6ICdmb3JtRW5jVHlwZScsXG4gICAgZm9ybU1ldGhvZDogJ2Zvcm1NZXRob2QnLFxuICAgIGZvcm1Ob1ZhbGlkYXRlOiAnZm9ybU5vVmFsaWRhdGUnLFxuICAgIGZvcm1UYXJnZXQ6ICdmb3JtVGFyZ2V0JyxcbiAgICBmcmFtZUJvcmRlcjogJ2ZyYW1lQm9yZGVyJyxcbiAgICBoZWFkZXJzOiAnaGVhZGVycycsXG4gICAgaGVpZ2h0OiAnaGVpZ2h0JyxcbiAgICBoaWRkZW46ICdoaWRkZW4nLFxuICAgIGhpZ2g6ICdoaWdoJyxcbiAgICBocmVmOiAnaHJlZicsXG4gICAgaHJlZkxhbmc6ICdocmVmTGFuZycsXG4gICAgaHRtbEZvcjogJ2ZvcicsXG4gICAgaHR0cEVxdWl2OiAnaHR0cC1lcXVpdicsXG4gICAgaWNvbjogJ2ljb24nLFxuICAgIGlucHV0TW9kZTogJ2lucHV0TW9kZScsXG4gICAgaXM6ICdpcycsXG4gICAga2V5UGFyYW1zOiAna2V5UGFyYW1zJyxcbiAgICBrZXlUeXBlOiAna2V5VHlwZScsXG4gICAgbGFiZWw6ICdsYWJlbCcsXG4gICAgbGFuZzogJ2xhbmcnLFxuICAgIGxpc3Q6ICdsaXN0JyxcbiAgICBsb3c6ICdsb3cnLFxuICAgIG1hbmlmZXN0OiAnbWFuaWZlc3QnLFxuICAgIG1hcmdpbkhlaWdodDogJ21hcmdpbkhlaWdodCcsXG4gICAgbWFyZ2luV2lkdGg6ICdtYXJnaW5XaWR0aCcsXG4gICAgbWF4OiAnbWF4JyxcbiAgICBtYXhMZW5ndGg6ICdtYXhMZW5ndGgnLFxuICAgIG1lZGlhOiAnbWVkaWEnLFxuICAgIG1lZGlhR3JvdXA6ICdtZWRpYUdyb3VwJyxcbiAgICBtZXRob2Q6ICdtZXRob2QnLFxuICAgIG1pbjogJ21pbicsXG4gICAgbWluTGVuZ3RoOiAnbWluTGVuZ3RoJyxcbiAgICBuYW1lOiAnbmFtZScsXG4gICAgbm9WYWxpZGF0ZTogJ25vVmFsaWRhdGUnLFxuICAgIG9wZW46ICdvcGVuJyxcbiAgICBvcHRpbXVtOiAnb3B0aW11bScsXG4gICAgcGF0dGVybjogJ3BhdHRlcm4nLFxuICAgIHBsYWNlaG9sZGVyOiAncGxhY2Vob2xkZXInLFxuICAgIHBvc3RlcjogJ3Bvc3RlcicsXG4gICAgcHJlbG9hZDogJ3ByZWxvYWQnLFxuICAgIHJhZGlvR3JvdXA6ICdyYWRpb0dyb3VwJyxcbiAgICByZWw6ICdyZWwnLFxuICAgIHJlcXVpcmVkOiAncmVxdWlyZWQnLFxuICAgIHJvbGU6ICdyb2xlJyxcbiAgICByb3dzOiAncm93cycsXG4gICAgcm93U3BhbjogJ3Jvd1NwYW4nLFxuICAgIHNhbmRib3g6ICdzYW5kYm94JyxcbiAgICBzY29wZTogJ3Njb3BlJyxcbiAgICBzY29wZWQ6ICdzY29wZWQnLFxuICAgIHNjcm9sbGluZzogJ3Njcm9sbGluZycsXG4gICAgc2VhbWxlc3M6ICdzZWFtbGVzcycsXG4gICAgc2hhcGU6ICdzaGFwZScsXG4gICAgc2l6ZTogJ3NpemUnLFxuICAgIHNpemVzOiAnc2l6ZXMnLFxuICAgIHNwYW46ICdzcGFuJyxcbiAgICBzcGVsbENoZWNrOiAnc3BlbGxDaGVjaycsXG4gICAgc3JjOiAnc3JjJyxcbiAgICBzcmNTZXQ6ICdzcmNTZXQnLFxuICAgIHN0YXJ0OiAnc3RhcnQnLFxuICAgIHN0ZXA6ICdzdGVwJyxcbiAgICBzdHlsZTogJ3N0eWxlJyxcbiAgICB0YWJJbmRleDogJ3RhYkluZGV4JyxcbiAgICB0YXJnZXQ6ICd0YXJnZXQnLFxuICAgIHRpdGxlOiAndGl0bGUnLFxuICAgIHR5cGU6ICd0eXBlJyxcbiAgICB1c2VNYXA6ICd1c2VNYXAnLFxuICAgIHdpZHRoOiAnd2lkdGgnLFxuICAgIHdtb2RlOiAnd21vZGUnLFxuICAgIGF1dG9DYXBpdGFsaXplOiAnYXV0b0NhcGl0YWxpemUnLFxuICAgIGF1dG9Db3JyZWN0OiAnYXV0b0NvcnJlY3QnLFxuICAgIGl0ZW1Qcm9wOiAnaXRlbVByb3AnLFxuICAgIGl0ZW1TY29wZTogJ2l0ZW1TY29wZScsXG4gICAgaXRlbVR5cGU6ICdpdGVtVHlwZScsXG4gICAgaXRlbUlEOiAnaXRlbUlEJyxcbiAgICBpdGVtUmVmOiAnaXRlbVJlZicsXG4gICAgcHJvcGVydHk6ICdwcm9wZXJ0eScsXG4gICAgc2VjdXJpdHk6ICdzZWN1cml0eScsXG4gICAgdW5zZWxlY3RhYmxlOiAndW5zZWxlY3RhYmxlJyxcbn07XG5cbmV4cG9ydCBsZXQgcHJvcHMgPSB7XG4gICAgY2hlY2tlZDogJ2NoZWNrZWQnLFxuICAgIGNsYXNzTmFtZTogJ2NsYXNzTmFtZScsXG4gICAgY29udHJvbHM6ICdjb250cm9scycsXG4gICAgaWQ6ICdpZCcsXG4gICAgbG9vcDogJ2xvb3AnLFxuICAgIG11bHRpcGxlOiAnbXVsdGlwbGUnLFxuICAgIG11dGVkOiAnbXV0ZWQnLFxuICAgIHJlYWRPbmx5OiAncmVhZE9ubHknLFxuICAgIHNlbGVjdGVkOiAnc2VsZWN0ZWQnLFxuICAgIHNyY0RvYzogJ3NyY2RvYycsXG4gICAgdmFsdWU6ICd2YWx1ZSdcbn07XG5cbmV4cG9ydCBsZXQgbm90UHggPSB7XG4gICAgYm94RmxleDogdHJ1ZSxcbiAgICBib3hGbGV4R3JvdXA6IHRydWUsXG4gICAgY29sdW1uQ291bnQ6IHRydWUsXG4gICAgZmlsbE9wYWNpdHk6IHRydWUsXG4gICAgZmxleDogdHJ1ZSxcbiAgICBmbGV4R3JvdzogdHJ1ZSxcbiAgICBmbGV4UG9zaXRpdmU6IHRydWUsXG4gICAgZmxleFNocmluazogdHJ1ZSxcbiAgICBmbGV4TmVnYXRpdmU6IHRydWUsXG4gICAgZm9udFdlaWdodDogdHJ1ZSxcbiAgICBsaW5lQ2xhbXA6IHRydWUsXG4gICAgbGluZUhlaWdodDogdHJ1ZSxcbiAgICBvcGFjaXR5OiB0cnVlLFxuICAgIG9yZGVyOiB0cnVlLFxuICAgIG9ycGhhbnM6IHRydWUsXG4gICAgc3Ryb2tlT3BhY2l0eTogdHJ1ZSxcbiAgICB3aWRvd3M6IHRydWUsXG4gICAgekluZGV4OiB0cnVlLFxuICAgIHpvb206IHRydWVcbn07XG5cbmV4cG9ydCBsZXQgZXZlbnRzID0ge1xuICAgIG9uUmVuZGVyOiBcInJlbmRlclwiLFxuICAgIG9uQ2xpY2s6ICgoJ29udG91Y2hlbmQnIGluIHdpbmRvdykpID8gJ3RvdWNoZW5kJyA6ICdjbGljaycsXG4gICAgb25EYmxDbGljazogJ2RibGNsaWNrJyxcblxuICAgIG9uTW91c2VEb3duOiAnbW91c2Vkb3duJyxcbiAgICBvbk1vdXNlVXA6ICdtb3VzZXVwJyxcbiAgICBvbk1vdXNlTW92ZTogJ21vdXNlbW92ZScsXG4gICAgb25Nb3VzZUVudGVyOiAnbW91c2VlbnRlcicsXG4gICAgb25Nb3VzZUxlYXZlOiAnbW91c2VsZWF2ZScsXG4gICAgb25Nb3VzZU92ZXI6ICdtb3VzZW92ZXInLFxuICAgIG9uTW91c2VPdXQ6ICdtb3VzZW91dCcsXG5cbiAgICBvblRvdWNoU3RhcnQ6ICd0b3VjaHN0YXJ0JyxcbiAgICBvblRvdWNoRW5kOiAndG91Y2hlbmQnLFxuICAgIG9uVG91Y2hNb3ZlOiAndG91Y2htb3ZlJyxcbiAgICBvblRvdWNoQ2FuY2VsOiAndG91Y2hjYW5jZWwnLFxuICAgIG9uVG91Y2hMZWF2ZTogJ3RvdWNobGVhdmUnLFxuXG4gICAgb25Db250ZXh0TWVudTogJ2NvbnRleHRtZW51JyxcblxuICAgIG9uSW5wdXQ6ICdpbnB1dCcsXG4gICAgb25Gb2N1czogJ2ZvY3VzJyxcbiAgICBvbkNoYW5nZTogJ2NoYW5nZScsXG5cbiAgICBvbktleURvd246ICdrZXlkb3duJyxcbiAgICBvbktleVByZXNzOiAna2V5cHJlc3MnLFxuICAgIG9uS2V5VXA6ICdrZXl1cCdcbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9hdHRycy5qc1xuICoqLyIsImltcG9ydCB7VlRleHROb2RlLCBWRnJhZ21lbnROb2RlfSBmcm9tICcuL25vZGUnO1xuXG5leHBvcnQgbGV0IERFQlVHID0gZmFsc2U7XG5leHBvcnQgZnVuY3Rpb24gbm9ybUNoaWxkKHZkb20sIGkpIHtcbiAgICBpZiAoIXZkb20uY2hpbGRyZW5baV0gfHwgIXZkb20uY2hpbGRyZW5baV0udGFnKSB7XG4gICAgICAgIHZhciBjaGlsZCA9IHZkb20uY2hpbGRyZW5baV07XG4gICAgICAgIGlmICh0eXBlb2YgY2hpbGQgPT0gJ3N0cmluZycgfHwgdHlwZW9mIGNoaWxkID09ICdudW1iZXInKSB7XG4gICAgICAgICAgICB2ZG9tLmNoaWxkcmVuW2ldID0gbmV3IFZUZXh0Tm9kZShjaGlsZCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoY2hpbGQgPT0gbnVsbCkge1xuICAgICAgICAgICAgdmRvbS5jaGlsZHJlbltpXSA9IG5ldyBWVGV4dE5vZGUoJycpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiBjaGlsZCA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIGlmIChjaGlsZCBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICAgICAgdmRvbS5jaGlsZHJlbltpXSA9IG5ldyBWRnJhZ21lbnROb2RlKCdtYXAnLCBudWxsLCBjaGlsZCwgbnVsbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB2ZG9tLmNoaWxkcmVuW2ldID0gbmV3IFZUZXh0Tm9kZShKU09OLnN0cmluZ2lmeShjaGlsZCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiBjaGlsZCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdmRvbS5jaGlsZHJlbltpXSA9IG5ldyBWVGV4dE5vZGUoJ0Z1bmN0aW9uJyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2ZG9tLmNoaWxkcmVuW2ldID0gbmV3IFZUZXh0Tm9kZSgnJyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy9yZXR1cm4gdmRvbS5jaGlsZHJlbltpXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEZpcnN0Q2hpbGQob2xkKSB7XG4gICAgdmFyIGJlZm9yZUNoaWxkID0gb2xkLmNoaWxkcmVuWzBdO1xuICAgIHdoaWxlIChiZWZvcmVDaGlsZCAmJiBiZWZvcmVDaGlsZC5mcmFnbWVudCkge1xuICAgICAgICBiZWZvcmVDaGlsZCA9IGJlZm9yZUNoaWxkLmNoaWxkcmVuWzBdO1xuICAgIH1cbiAgICByZXR1cm4gYmVmb3JlQ2hpbGQ7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy91dGlscy5qc1xuICoqLyIsInZhciBpZCA9IDE7XG5cbnZhciBwcm90byA9IHtcbiAgICB0ZXh0OiBudWxsLFxuICAgIGRvbTogbnVsbCxcbiAgICB0YWc6IG51bGwsXG4gICAgYXR0cnM6IG51bGwsXG4gICAgY2hpbGRyZW46IG51bGwsXG4gICAgYWxsQXR0cnM6IG51bGwsXG4gICAgZnJhZ21lbnQ6IGZhbHNlLFxuICAgIGNvbXBvbmVudDogbnVsbCxcbiAgICBrZXk6IG51bGwsXG4gICAga2V5TWFwOiBudWxsLFxuICAgIHZub2RlOiB0cnVlLFxuICAgIGRlc3Ryb3llZDogbnVsbCxcbiAgICBkZXN0cm95OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuZG9tID0gbnVsbDtcbiAgICAgICAgdGhpcy5jaGlsZHJlbiA9IG51bGw7XG4gICAgICAgIHRoaXMuYXR0cnMgPSBudWxsO1xuICAgICAgICAvL3RoaXMuZGVzdHJveWVkID0gdHJ1ZTtcbiAgICAgICAgLy90aGlzLnBhcmVudCA9IG51bGw7XG4gICAgfVxufTtcblxuZnVuY3Rpb24gY2xhc3NFeHRlbmQoQ2xhc3MsIHByb3RvLCBvdmVycmlkZXMpIHtcbiAgICBmb3IgKHZhciBwcm9wIGluIHByb3RvKSB7XG4gICAgICAgIENsYXNzLnByb3RvdHlwZVtwcm9wXSA9IHByb3RvW3Byb3BdO1xuICAgIH1cbiAgICBmb3IgKHByb3AgaW4gb3ZlcnJpZGVzKSB7XG4gICAgICAgIENsYXNzLnByb3RvdHlwZVtwcm9wXSA9IG92ZXJyaWRlc1twcm9wXTtcbiAgICB9XG59XG5cbi8vdmFyIGNhY2hlRnJhbWVudHMgPSBbXTtcbi8vdmFyIGNhY2hlQ29tcG9uZW50ID0gW107XG52YXIgY2FjaGVOb2RlID0gW107XG52YXIgY2FjaGVUZXh0Tm9kZSA9IFtdO1xuXG5cbmV4cG9ydCBmdW5jdGlvbiBWRnJhZ21lbnROb2RlKHRhZywgYXR0cnMsIGNoaWxkcmVuLCBrZXkpIHtcbiAgICB0aGlzLmlkID0gaWQrKztcbiAgICB0aGlzLnRhZyA9IHRhZztcbiAgICBpZiAodGFnID09ICdtYXAnKSB7XG4gICAgICAgIHRoaXMua2V5TWFwID0ge307XG4gICAgfVxuICAgIHRoaXMuY2hpbGRyZW4gPSBjaGlsZHJlbjtcbiAgICBpZiAoa2V5KSB7XG4gICAgICAgIHRoaXMua2V5ID0ga2V5O1xuICAgIH1cbiAgICAvL3RoaXMucGFyZW50ID0gbnVsbDtcbiAgICB0aGlzLmRvbSA9IG51bGw7XG4gICAgdGhpcy5hdHRycyA9IGF0dHJzO1xufVxuY2xhc3NFeHRlbmQoVkZyYWdtZW50Tm9kZSwgcHJvdG8sIHtmcmFnbWVudDogdHJ1ZX0pO1xuXG5cbmV4cG9ydCBmdW5jdGlvbiBWQ29tcG9uZW50KHRhZywgYXR0cnMsIGNoaWxkcmVuLCBrZXkpIHtcbiAgICAvL29iamVjdHMucHVzaCh0aGlzKTtcbiAgICB0aGlzLmlkID0gaWQrKztcbiAgICB0aGlzLnRhZyA9IHRhZztcbiAgICB0aGlzLmNoaWxkcmVuID0gY2hpbGRyZW47XG4gICAgdGhpcy5mcmFnbWVudCA9IHRydWU7XG4gICAgaWYgKGtleSkge1xuICAgICAgICB0aGlzLmtleSA9IGtleTtcbiAgICB9XG4gICAgLy90aGlzLnBhcmVudCA9IG51bGw7XG4gICAgdGhpcy5kb20gPSBudWxsO1xuICAgIHRoaXMuYXR0cnMgPSBhdHRycztcbiAgICB0aGlzLmRlc3Ryb3llZCA9IG51bGw7XG4gICAgLy90aGlzLmRlc3Ryb3llZCA9IG51bGw7XG59XG5jbGFzc0V4dGVuZChWQ29tcG9uZW50LCBwcm90bywge2ZyYWdtZW50OiB0cnVlfSk7XG5cblxuZXhwb3J0IGZ1bmN0aW9uIE5Ob2RlKHRhZywgYXR0cnMsIGNoaWxkcmVuLCBrZXksIHRleHQpIHtcbiAgICAvL29iamVjdHMucHVzaCh0aGlzKTtcbiAgICB0aGlzLmlkID0gaWQrKztcbiAgICB0aGlzLnRhZyA9IHRhZztcbiAgICB0aGlzLmF0dHJzID0gYXR0cnM7XG4gICAgdGhpcy5jaGlsZHJlbiA9IGNoaWxkcmVuO1xuICAgIGlmICh0ZXh0KSB7XG4gICAgICAgIHRoaXMudGV4dCA9IHRleHQ7XG4gICAgfVxuICAgIHRoaXMuYWxsQXR0cnMgPSAnJztcbiAgICB0aGlzLmtleSA9IGtleTtcbiAgICB0aGlzLmRvbSA9IG51bGw7XG4gICAgLy90aGlzLnBhcmVudCA9IG51bGw7XG4gICAgLy90aGlzLmRlc3Ryb3llZCA9IG51bGw7XG59XG5jbGFzc0V4dGVuZChOTm9kZSwgcHJvdG8pO1xuXG5cbmV4cG9ydCBmdW5jdGlvbiBWVGV4dE5vZGUodGV4dCkge1xuICAgIHRoaXMuaWQgPSBpZCsrO1xuICAgIHRoaXMuZG9tID0gbnVsbDtcbiAgICB0aGlzLnRleHQgPSB0ZXh0O1xuICAgIC8vdGhpcy5wYXJlbnQgPSBudWxsO1xuICAgIC8vdGhpcy5kZXN0cm95ZWQgPSBudWxsO1xufVxuY2xhc3NFeHRlbmQoVlRleHROb2RlLCBwcm90bywge1xuICAgIHRhZzogJyMnLFxuICAgIGRlc3Ryb3k6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5kb20gPSBudWxsO1xuICAgICAgICAvL3RoaXMuZGVzdHJveWVkID0gdHJ1ZTtcbiAgICAgICAgLy90aGlzLnBhcmVudCA9IG51bGw7XG4gICAgfVxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9ub2RlLmpzXG4gKiovIiwiLyoqXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0gVGhlIExpZmUtQ3ljbGUgb2YgYSBDb21wb3NpdGUgQ29tcG9uZW50IC0tLS0tLS0tLS0tLS0tLS0tLVxuICpcbiAqICsgY29uc3RydWN0b3I6IEluaXRpYWxpemF0aW9uIG9mIHN0YXRlLiBUaGUgaW5zdGFuY2UgaXMgbm93IHJldGFpbmVkLlxuICogICArIGNvbXBvbmVudFdpbGxNb3VudFxuICogICArIHJlbmRlclxuICogICArIFtjaGlsZHJlbidzIGNvbnN0cnVjdG9yc11cbiAqICAgICArIFtjaGlsZHJlbidzIGNvbXBvbmVudFdpbGxNb3VudCBhbmQgcmVuZGVyXVxuICogICAgICsgW2NoaWxkcmVuJ3MgY29tcG9uZW50RGlkTW91bnRdXG4gKiAgICAgKyBjb21wb25lbnREaWRNb3VudFxuICpcbiAqICAgICAgIFVwZGF0ZSBQaGFzZXM6XG4gKiAgICAgICArIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMgKG9ubHkgY2FsbGVkIGlmIHBhcmVudCB1cGRhdGVkKVxuICogICAgICAgLSBzaG91bGRDb21wb25lbnRVcGRhdGVcbiAqICAgICAgICAgKyBjb21wb25lbnRXaWxsVXBkYXRlXG4gKiAgICAgICAgICAgKyByZW5kZXJcbiAqICAgICAgICAgICArIFtjaGlsZHJlbidzIGNvbnN0cnVjdG9ycyBvciByZWNlaXZlIHByb3BzIHBoYXNlc11cbiAqICAgICAgICAgKyBjb21wb25lbnREaWRVcGRhdGVcbiAqXG4gKiAgICAgKyBjb21wb25lbnRXaWxsVW5tb3VudFxuICogICAgICsgW2NoaWxkcmVuJ3MgY29tcG9uZW50V2lsbFVubW91bnRdXG4gKiAgIC0gW2NoaWxkcmVuIGRlc3Ryb3llZF1cbiAqIC0gKGRlc3Ryb3llZCk6IFRoZSBpbnN0YW5jZSBpcyBub3cgYmxhbmssIHJlbGVhc2VkIGJ5IFJlYWN0IGFuZCByZWFkeSBmb3IgR0MuXG4gKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuaW1wb3J0IHt1cGRhdGVDaGlsZHJlbn0gZnJvbSAnLi91cGRhdGUnO1xuaW1wb3J0IHtWQ29tcG9uZW50fSBmcm9tICcuL25vZGUnO1xuaW1wb3J0IHtERUJVR30gZnJvbSAnLi91dGlscyc7XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGZpbmRET01Ob2RlKHZkb20pIHtcbiAgICByZXR1cm4gdmRvbS5kb207XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBDb21wb25lbnQocHJvcHMpIHtcbiAgICB0aGlzLnByb3BzID0gcHJvcHM7XG59XG5cbkNvbXBvbmVudC5wcm90b3R5cGUuY29tcG9uZW50V2lsbE1vdW50ID0gZnVuY3Rpb24gKCkge307XG5Db21wb25lbnQucHJvdG90eXBlLmNvbXBvbmVudERpZE1vdW50ID0gZnVuY3Rpb24gKCkge307XG5cbkNvbXBvbmVudC5wcm90b3R5cGUuY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyA9IGZ1bmN0aW9uICgpIHt9O1xuQ29tcG9uZW50LnByb3RvdHlwZS5jb21wb25lbnRXaWxsVXBkYXRlID0gZnVuY3Rpb24gKCkge307XG5Db21wb25lbnQucHJvdG90eXBlLmNvbXBvbmVudERpZFVwZGF0ZSA9IGZ1bmN0aW9uICgpIHt9O1xuXG5Db21wb25lbnQucHJvdG90eXBlLmNvbXBvbmVudFdpbGxVbm1vdW50ID0gZnVuY3Rpb24gKCkge307XG5cblxuQ29tcG9uZW50LnByb3RvdHlwZS51cGRhdGVQcm9wcyA9IGZ1bmN0aW9uIChwcm9wcykge1xuICAgIHRoaXMuY29tcG9uZW50V2lsbFVwZGF0ZShwcm9wcyk7XG4gICAgLy92YXIgb2xkUHJvcHMgPSB0aGlzLnByb3BzO1xuICAgIHRoaXMucHJvcHMgPSBwcm9wcztcbiAgICB2YXIgbmV3Tm9kZSA9IG5ldyBWQ29tcG9uZW50KHRoaXMuY29uc3RydWN0b3IsIG51bGwsIFt0aGlzLnJlbmRlcigpXSwgbnVsbCk7XG4gICAgdXBkYXRlQ2hpbGRyZW4odGhpcy5ub2RlLCBuZXdOb2RlKTtcbiAgICB0aGlzLm5vZGUuY2hpbGRyZW4gPSBuZXdOb2RlLmNoaWxkcmVuO1xuICAgIC8vdG9kbzpjb21wb25lbnREaWRVcGRhdGUob2JqZWN0IHByZXZQcm9wcywgb2JqZWN0IHByZXZTdGF0ZSlcbiAgICB0aGlzLmNvbXBvbmVudERpZFVwZGF0ZSh0aGlzLnByb3BzKTtcbn07XG5cbkNvbXBvbmVudC5wcm90b3R5cGUuZm9yY2VVcGRhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy51cGRhdGVQcm9wcyh0aGlzLnByb3BzKTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVDb21wb25lbnQob2xkLCB2ZG9tKSB7XG4gICAgdmRvbS5jb21wb25lbnQgPSBvbGQuY29tcG9uZW50O1xuICAgIHZhciBwcm9wcyA9IHZkb20uYXR0cnMgfHwge307XG4gICAgcHJvcHMuY2hpbGRyZW4gPSB2ZG9tLmNoaWxkcmVuO1xuICAgIHZkb20uY29tcG9uZW50LmNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMocHJvcHMpO1xuICAgIHZkb20uY29tcG9uZW50LnVwZGF0ZVByb3BzKHByb3BzKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUNvbXBvbmVudCh2ZG9tKSB7XG4gICAgdmFyIHByb3BzID0gdmRvbS5hdHRycyB8fCB7fTtcbiAgICBwcm9wcy5jaGlsZHJlbiA9IHZkb20uY2hpbGRyZW47XG4gICAgdmRvbS5jb21wb25lbnQgPSBuZXcgdmRvbS50YWcocHJvcHMpO1xuICAgIHZkb20uY29tcG9uZW50LmNvbXBvbmVudFdpbGxNb3VudCgpO1xuICAgIHZkb20uY2hpbGRyZW4gPSBbdmRvbS5jb21wb25lbnQucmVuZGVyKCldO1xuICAgIHZkb20uY29tcG9uZW50Lm5vZGUgPSB2ZG9tO1xuICAgIERFQlVHICYmIGNvbnNvbGUubG9nKHZkb20pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVzdHJveUNvbXBvbmVudCh2ZG9tKSB7XG4gICAgdmRvbS5jb21wb25lbnQuY29tcG9uZW50V2lsbFVubW91bnQoKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1vdW50Q29tcG9uZW50KHZkb20pIHtcbiAgICB2ZG9tLmNvbXBvbmVudC5jb21wb25lbnREaWRNb3VudCgpO1xufVxuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9jb21wb25lbnQuanNcbiAqKi8iLCJpbXBvcnQge2F0dHJzLCBwcm9wcywgZXZlbnRzfSBmcm9tICcuL2F0dHJzJztcbmltcG9ydCB7dXBkYXRlQ29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudCc7XG5pbXBvcnQge3JlbW92ZSwgcmVtb3ZlQ2hpbGR9IGZyb20gJy4vcmVtb3ZlJztcbmltcG9ydCB7bm9ybUNoaWxkLCBnZXRGaXJzdENoaWxkLCBERUJVR30gZnJvbSAnLi91dGlscyc7XG5pbXBvcnQge2NyZWF0ZX0gZnJvbSAnLi9jcmVhdGUnO1xuXG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGUob2xkLCB2ZG9tKSB7XG4gICAgREVCVUcgJiYgY29uc29sZS5sb2coXCJ1cGRhdGVcIiwgdmRvbSk7XG5cbiAgICB2YXIgZG9tID0gb2xkLmRvbTtcbiAgICBkb20udXBkYXRlZCA9IHRydWU7XG4gICAgdmRvbS5kb20gPSBkb207XG4gICAgLy92ZG9tLnBhcmVudCA9IG9sZC5wYXJlbnQ7XG4gICAgaWYgKG9sZC50YWcgIT09IHZkb20udGFnKSB7XG4gICAgICAgIHJldHVybiByZXBsYWNlTm9kZShvbGQsIHZkb20pO1xuICAgIH1cbiAgICBpZiAob2xkLnRhZyA9PSAnIycpIHtcbiAgICAgICAgaWYgKG9sZC50ZXh0ICE9PSB2ZG9tLnRleHQpIHtcbiAgICAgICAgICAgIGRvbS50ZXh0Q29udGVudCA9IHZkb20udGV4dDtcbiAgICAgICAgfVxuICAgICAgICBvbGQuZGVzdHJveSgpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChvbGQudGV4dCAhPT0gdmRvbS50ZXh0KSB7XG4gICAgICAgIGRvbS50ZXh0Q29udGVudCA9IHZkb20udGV4dDtcbiAgICB9XG5cbiAgICBpZiAodmRvbS5mcmFnbWVudCkge1xuICAgICAgICBpZiAodmRvbS5rZXkgIT09IG9sZC5rZXkpIHtcbiAgICAgICAgICAgIHJlcGxhY2VOb2RlKG9sZCwgdmRvbSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHZkb20uYWxsQXR0cnMgPSAnJztcbiAgICAgICAgaWYgKHZkb20uYXR0cnMgJiYgb2xkLmF0dHJzKSB7XG4gICAgICAgICAgICBmb3JBdHRycyhvbGQsIHZkb20pO1xuICAgICAgICB9XG4gICAgICAgIGlmICgob2xkLmF0dHJzICYmICF2ZG9tLmF0dHJzKSB8fCAoIW9sZC5hdHRycyAmJiB2ZG9tLmF0dHJzKSB8fCBvbGQuYWxsQXR0cnMgIT09IHZkb20uYWxsQXR0cnMpIHtcbiAgICAgICAgICAgIHJlcGxhY2VOb2RlKG9sZCwgdmRvbSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKG9sZC5jb21wb25lbnQpIHtcbiAgICAgICAgdXBkYXRlQ29tcG9uZW50KG9sZCwgdmRvbSk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoIXZkb20udGV4dCkge1xuICAgICAgICB1cGRhdGVDaGlsZHJlbihvbGQsIHZkb20pO1xuICAgIH1cbiAgICBvbGQuZGVzdHJveSgpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlQ2hpbGRyZW4ob2xkLCB2ZG9tKSB7XG4gICAgdmFyIG9sZExlbiA9IG9sZC5jaGlsZHJlbiA/IG9sZC5jaGlsZHJlbi5sZW5ndGggOiAwO1xuICAgIHZhciBuZXdMZW4gPSB2ZG9tLmNoaWxkcmVuID8gdmRvbS5jaGlsZHJlbi5sZW5ndGggOiAwO1xuICAgIGlmIChvbGRMZW4pIHtcbiAgICAgICAgdmFyIHBhcmVudERvbSA9IG9sZC5kb207XG4gICAgICAgIHZhciBiZWZvcmVDaGlsZCA9IGdldEZpcnN0Q2hpbGQob2xkKTtcbiAgICAgICAgaWYgKCh2ZG9tLnRhZyA9PSAnbWFwJyAmJiBvbGQudGFnICE9ICdtYXAnKSB8fCAodmRvbS50YWcgIT0gJ21hcCcgJiYgb2xkLnRhZyA9PSAnbWFwJykpIHtcbiAgICAgICAgICAgIHJlcGxhY2VOb2RlKG9sZCwgdmRvbSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodmRvbS50YWcgPT0gJ21hcCcgJiYgb2xkLnRhZyA9PSAnbWFwJykge1xuICAgICAgICAgICAgdmFyIHJlcyA9IG1hcENoaWxkcmVuKG9sZCwgdmRvbSwgYmVmb3JlQ2hpbGQpO1xuICAgICAgICAgICAgaWYgKHJlcyA9PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIHJlcGxhY2VOb2RlKG9sZCwgdmRvbSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKG9sZExlbiA9PT0gbmV3TGVuKSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBuZXdMZW47IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBub3JtQ2hpbGQodmRvbSwgaSk7XG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZShvbGQuY2hpbGRyZW5baV0sIHZkb20uY2hpbGRyZW5baV0pO1xuICAgICAgICAgICAgICAgICAgICBvbGQuY2hpbGRyZW5baV0gPSBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBuZXdMZW47IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBub3JtQ2hpbGQodmRvbSwgaSk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBuZXdDaGlsZCA9IHZkb20uY2hpbGRyZW5baV07XG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZShuZXdDaGlsZCwgdmRvbSk7XG4gICAgICAgICAgICAgICAgICAgIGluc2VydChwYXJlbnREb20sIG5ld0NoaWxkLCBiZWZvcmVDaGlsZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBvbGRMZW47IGkrKykge1xuICAgICAgICAgICAgICAgICAgICByZW1vdmVDaGlsZChvbGQsIGkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmIChvbGRMZW4gIT09IG5ld0xlbikge1xuICAgICAgICByZXBsYWNlTm9kZShvbGQsIHZkb20pO1xuICAgICAgICByZXR1cm47XG4gICAgfVxufVxuXG5cbmZ1bmN0aW9uIG1hcENoaWxkcmVuKG9sZCwgdmRvbSwgYmVmb3JlQ2hpbGQpIHtcbiAgICB2YXIgcGFyZW50RG9tID0gb2xkLmRvbTtcbiAgICB2YXIga2V5TWFwID0gb2xkLmtleU1hcDtcbiAgICB2YXIgbmV3S2V5TWFwID0gdmRvbS5rZXlNYXA7XG4gICAgdmFyIG5ld0NoaWxkcmVuID0gdmRvbS5jaGlsZHJlbjtcbiAgICB2YXIgbmV3TGVuID0gbmV3Q2hpbGRyZW4ubGVuZ3RoO1xuICAgIHZhciBvbGRMZW4gPSBvbGQuY2hpbGRyZW4ubGVuZ3RoO1xuICAgIHZhciBmb3VuZCA9IDA7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBuZXdMZW47IGkrKykge1xuICAgICAgICBub3JtQ2hpbGQodmRvbSwgaSk7XG4gICAgICAgIHZhciBuZXdDaGlsZCA9IG5ld0NoaWxkcmVuW2ldO1xuICAgICAgICB2YXIgb2xkQ2hpbGQgPSBvbGQuY2hpbGRyZW5baV07XG4gICAgICAgIHZhciBuZXdLZXkgPSBuZXdDaGlsZC5rZXk7XG4gICAgICAgIGlmIChuZXdLZXkgPT0gbnVsbCkge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKCdtYXAgd2l0aG91dCBrZXlzJywgdmRvbSk7XG4gICAgICAgICAgICBkZWJ1Z2dlcjtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIga2V5Q2hpbGQgPSBvbGQuY2hpbGRyZW5ba2V5TWFwW25ld0tleV1dO1xuICAgICAgICBpZiAoa2V5Q2hpbGQpIHtcbiAgICAgICAgICAgIGZvdW5kKys7XG4gICAgICAgICAgICBpZiAoa2V5Q2hpbGQgIT09IG9sZENoaWxkKSB7XG4gICAgICAgICAgICAgICAgaW5zZXJ0KHBhcmVudERvbSwga2V5Q2hpbGQsIGJlZm9yZUNoaWxkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHVwZGF0ZShrZXlDaGlsZCwgbmV3Q2hpbGQpO1xuICAgICAgICAgICAgaWYgKGtleUNoaWxkID09IG9sZENoaWxkKSB7XG4gICAgICAgICAgICAgICAgb2xkLmNoaWxkcmVuW2ldID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGtleU1hcFtuZXdLZXldID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNyZWF0ZShuZXdDaGlsZCwgdmRvbSk7XG4gICAgICAgICAgICBpbnNlcnQocGFyZW50RG9tLCBuZXdDaGlsZCwgYmVmb3JlQ2hpbGQpO1xuICAgICAgICB9XG4gICAgICAgIGJlZm9yZUNoaWxkID0gbmV3Q2hpbGQuZG9tLm5leHRTaWJsaW5nO1xuICAgICAgICBuZXdLZXlNYXBbbmV3S2V5XSA9IGk7XG4gICAgfVxuICAgIC8vb2xkLmtleU1hcCA9IG51bGw7XG5cbiAgICBpZiAoZm91bmQgIT09IG9sZExlbikge1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgb2xkTGVuOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBjaGlsZCA9IG9sZC5jaGlsZHJlbltpXTtcbiAgICAgICAgICAgIGlmIChjaGlsZCAmJiBuZXdLZXlNYXBbY2hpbGQua2V5XSA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmVtb3ZlQ2hpbGQob2xkLCBpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gcmVwbGFjZU5vZGUob2xkLCB2ZG9tKSB7XG4gICAgdmFyIHBhcmVudERvbSA9IG9sZC5mcmFnbWVudCA/IG9sZC5kb20gOiBvbGQuZG9tLnBhcmVudE5vZGU7XG4gICAgY3JlYXRlKHZkb20sIG9sZC5wYXJlbnQpO1xuICAgIGluc2VydChwYXJlbnREb20sIHZkb20sIG9sZC5mcmFnbWVudCA/IGdldEZpcnN0Q2hpbGQob2xkKSA6IG9sZCk7XG4gICAgcmVtb3ZlKG9sZCk7XG4gICAgcmV0dXJuIHZkb207XG5cbn1cblxuZnVuY3Rpb24gZm9yQXR0cnMob2xkLCB2ZG9tKSB7XG4gICAgdmFyIGF0dHI7XG4gICAgdmFyIGlzTm90U2FtZTtcbiAgICB2YXIgZG9tID0gdmRvbS5kb207XG4gICAgZm9yICh2YXIgYXR0ck5hbWUgaW4gdmRvbS5hdHRycykge1xuICAgICAgICB2ZG9tLmFsbEF0dHJzICs9IGF0dHJOYW1lO1xuICAgICAgICB2YXIgYXR0clZhbCA9IHZkb20uYXR0cnNbYXR0ck5hbWVdO1xuICAgICAgICBpZiAoYXR0ck5hbWUgPT0gJ2tleScpIHt9XG4gICAgICAgIGVsc2UgaWYgKChpc05vdFNhbWUgPSBhdHRyVmFsICE9PSBvbGQuYXR0cnNbYXR0ck5hbWVdKSAmJiAoYXR0ciA9IHByb3BzW2F0dHJOYW1lXSkpIHtcbiAgICAgICAgICAgIGRvbVthdHRyXSA9IGF0dHJWYWw7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoKGF0dHIgPSBhdHRyc1thdHRyTmFtZV0pICYmIGlzTm90U2FtZSkge1xuICAgICAgICAgICAgaWYgKGF0dHJWYWwgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgZG9tLnJlbW92ZUF0dHJpYnV0ZShhdHRyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGRvbS5zZXRBdHRyaWJ1dGUoYXR0ciwgYXR0clZhbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoYXR0ciA9IGV2ZW50c1thdHRyTmFtZV0gJiYgaXNOb3RTYW1lKSB7XG4gICAgICAgICAgICBkb21bJ29uJyArIGF0dHJdID0gYXR0clZhbDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChhdHRyTmFtZVswXSA9PT0gJ28nICYmIGF0dHJOYW1lWzFdID09PSAnbicgJiYgaXNOb3RTYW1lKSB7XG4gICAgICAgICAgICBhdHRyID0gYXR0ck5hbWUuc3Vic3RyaW5nKDIpLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICBkb21bJ29uJyArIGF0dHJdID0gYXR0clZhbDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChhdHRyTmFtZVswXSA9PT0gJ2QnICYmIGF0dHJOYW1lWzFdID09PSAnYScgJiYgYXR0ck5hbWVbMl0gPT09ICd0JyAmJiBhdHRyTmFtZVszXSA9PT0gJ2EnICYmIGlzTm90U2FtZSkge1xuICAgICAgICAgICAgaWYgKGF0dHJWYWwgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgZG9tLnJlbW92ZUF0dHJpYnV0ZShhdHRyTmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBkb20uc2V0QXR0cmlidXRlKGF0dHJOYW1lLCBhdHRyVmFsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gaW5zZXJ0KHBhcmVudERvbSwgdmRvbSwgYmVmb3JlKSB7XG4gICAgaWYgKHZkb20uZnJhZ21lbnQpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB2ZG9tLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpbnNlcnQodmRvbS5kb20sIHZkb20uY2hpbGRyZW5baV0sIGJlZm9yZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBERUJVRyAmJiBjb25zb2xlLmxvZyhcIkluc2VydFwiLCB2ZG9tKTtcbiAgICBwYXJlbnREb20uaW5zZXJ0QmVmb3JlKHZkb20uZG9tLCBiZWZvcmUgJiYgYmVmb3JlLmRvbSk7XG59XG5cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3VwZGF0ZS5qc1xuICoqLyIsImltcG9ydCB7ZGVzdHJveUNvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnQnO1xuaW1wb3J0IHtERUJVR30gZnJvbSAnLi91dGlscyc7XG5cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmUob2xkKSB7XG4gICAgREVCVUcgJiYgY29uc29sZS5sb2coXCJyZW1vdmVcIiwgb2xkKTtcblxuICAgIGlmIChvbGQuY29tcG9uZW50KSB7XG4gICAgICAgIGRlc3Ryb3lDb21wb25lbnQob2xkKTtcbiAgICB9XG4gICAgaWYgKG9sZC5jaGlsZHJlbikge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9sZC5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgcmVtb3ZlQ2hpbGQob2xkLCBpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAoIW9sZC5mcmFnbWVudCkge1xuICAgICAgICBvbGQuZG9tLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQob2xkLmRvbSk7XG4gICAgfVxuICAgIG9sZC5kZXN0cm95KCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVDaGlsZChvbGQsIGkpIHtcbiAgICByZW1vdmUob2xkLmNoaWxkcmVuW2ldKTtcbiAgICBvbGQuY2hpbGRyZW5baV0gPSBudWxsO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvcmVtb3ZlLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==