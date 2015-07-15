
!function (global) {
    var DEBUG = false;

    var hits = {
        updateChildren: 0,
        mapChildren: 0,
        update: 0,
        fullUpdate: 0,
        create: 0,
        replaceNode: 0,
        normChild: 0,
        compRender: 0,
        forAttrs: 0,
    };

    global.hits = hits;
    global.Component = Component;
    global.createElement = d;
    global.d = d;
    global.render = render;
    global.create = create;
    global.update = update;
    global.FastReact = {
        Component: Component,
        createElement: d,
        createElementArray: dArray,
        render: render,
        findDOMNode: findDOMNode
    };

    var currentComponent;

    function findDOMNode(vdom) {
        return vdom.dom;
    }

    function Component(props) {
        this.props = props;
    }

    Component.prototype.componentWillMount = function () {
    };
    Component.prototype.componentDidMount = function () {
    };

    Component.prototype.componentWillReceiveProps = function () {
    };
    Component.prototype.componentWillUpdate = function () {
    };
    Component.prototype.componentDidUpdate = function () {
    };

    Component.prototype.componentWillUnmount = function () {
    };


    Component.prototype.updateProps = function (props) {
        this.componentWillUpdate(props);
        //var oldProps = this.props;
        this.props = props;
        hits.compRender++;
        var newNode = new VComponent(this.constructor, null, [this.render()], null);
        updateChildren(this.node, newNode);
        this.node.children = newNode.children;
        //todo:componentDidUpdate(object prevProps, object prevState)
        this.componentDidUpdate(this.props);
    };

    Component.prototype.forceUpdate = function () {
        this.updateProps(this.props);
    };

    function VNode() {

    }

    VNode.prototype.text = null;
    VNode.prototype.dom = null;
    VNode.prototype.tag = '#';
    VNode.prototype.attrs = null;
    VNode.prototype.children = null;
    VNode.prototype.allAttrs = null;
    VNode.prototype.fragment = false;
    VNode.prototype.key = null;
    VNode.prototype.vnode = true;

    //var cacheFraments = [];
    //var cacheComponent = [];
    var cacheNode = [];
    var cacheTextNode = [];
    //global.cacheTextNode = cacheTextNode;
    //global.cacheNode = cacheNode;


    function VFragmentNode(tag, attrs, children, key) {
        this.id = id++;
        this.tag = tag;
        if (tag == 'map') {
            this.keyMap = {};
        }
        this.children = children;
        this.fragment = true;
        if (key) {
            this.key = key;
        }
        this.parent = null;
        this.dom = null;
        this.attrs = attrs;
    }

    VFragmentNode.prototype = VNode.prototype;

    function VComponent(tag, attrs, children, key) {
        //objects.push(this);
        this.id = id++;
        this.tag = tag;
        this.children = children;
        this.fragment = true;
        if (key) {
            this.key = key;
        }
        this.parent = null;
        this.dom = null;
        this.attrs = attrs;
        //this.destroyed = null;
    }

    VComponent.prototype = VNode.prototype;

    var id = 1;

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
        this.parent = null;
    }

    function getNNode(tag, attrs, children, key, text) {
        if (cacheNode.length > 0) {
            var item = cacheNode.pop();
            item.tag = tag;
            item.attrs = attrs;
            item.children = children;
            item.key = key;
            item.text = text;
            item.allAttrs = '';
            return item;
        }
        else {
            return new NNode(tag, attrs, children, key, text);
        }
    }

    NNode.prototype = VNode.prototype;

    function VTextNode(text) {
//        this.id = id++;
        this.dom = null;
        this.text = text;
        //this.parent = null;
    }

    function getVTextNode(text) {
        if (cacheTextNode.length > 0) {
            var item = cacheTextNode.pop();
            item.text = text;
            return item;
        }
        else {
            return new VTextNode(text);
        }
    }

    global.getVTextNode = getVTextNode;

    VTextNode.prototype = VNode.prototype;

    function dArray(tag, attrs, children) {
        var isFragment = tag == '@' || typeof tag == 'function';
//        var text = (children && !isFragment && (typeof children[0] == 'string' || typeof children[0] == 'number')) ? children[0] + '' : null;
        if (isFragment) {
            if (typeof tag == 'function') {
                return new VComponent(tag, attrs, children, attrs ? attrs.key : null);
            }
            else {
                return new VFragmentNode(tag, attrs, children, attrs ? attrs.key : null);
            }
        }
        else {
            return new NNode(tag, attrs, children, attrs ? attrs.key : null, null);
        }
    }

    function d(tag, attrs) {
        var len = arguments.length;
        var isFragment = tag == '@' || typeof tag == 'function';
        var text = (len == 3 && !isFragment && (typeof arguments[2] == 'string' || typeof arguments[2] == 'number')) ? arguments[2] + '' : null;
        var children = null;
        if (!text && len > 2) {
            children = Array(len - 2);
            for (var i = 2; i < len; i++) {
                children[i - 2] = arguments[i];
            }
        }

        if (isFragment) {
            if (typeof tag == 'function') {
                return new VComponent(tag, attrs, children, attrs ? attrs.key : null);
            }
            else {
                return new VFragmentNode(tag, attrs, children, attrs ? attrs.key : null);
            }
        }
        else {
            return new NNode(tag, attrs, children, attrs ? attrs.key : null, text);
        }
    }

    function render(vdom, dom) {
        dom.appendChild(create(vdom, {dom: dom}));
        if (vdom.component) {
            vdom.component.componentDidMount();
        }
        return vdom;
    }

    function createComponent(vdom) {
        var props = vdom.attrs || {};
        props.children = vdom.children;
        vdom.component = new vdom.tag(props);
        vdom.component.componentWillMount();
        hits.compRender++;
        vdom.children = [vdom.component.render()];
        vdom.component.node = vdom;
        DEBUG && console.log(vdom);
    }

    function create(vdom, parent) {
        hits.create++;

        DEBUG && console.log("Create", vdom);
        vdom.parent = parent;
        if (vdom.tag == '#') {
            vdom.dom = document.createTextNode(vdom.text);
            //vdom.dom.virtual = vdom;
            return vdom.dom;
        }
        var dom;
        if (vdom.fragment) {
            if (typeof vdom.tag === 'function') {
                createComponent(vdom);
            }
            dom = document.createDocumentFragment();
            vdom.dom = parent.dom;
        }
        else {
            dom = document.createElement(vdom.tag);
            vdom.dom = dom;
            //dom.virtual = vdom;
        }

        if (vdom.children) {
            for (var i = 0; i < vdom.children.length; i++) {
                normChild(vdom, i);
                var child = vdom.children[i];
                if (vdom.tag === 'map' && child.attrs) {
                    vdom.keyMap[child.key] = i;
                }
                dom.appendChild(create(child, vdom));
                if (child.component) {
                    child.component.componentDidMount();
                }
            }
        }
        else if (vdom.text) {
            dom.textContent = vdom.text;
        }
        vdom.allAttrs = '';
        if (vdom.attrs && !vdom.fragment) {
            if (vdom.attrs.ref) {
                if (typeof vdom.attrs.ref === 'function') {
                    vdom.attrs.ref(vdom);
                }
                else if (currentComponent) {
                    currentComponent.refs = currentComponent.refs || {};
                    currentComponent.refs[vdom.attrs.ref] = vdom;
                }
            }

            var attr;
            var prop;
            var event;
            for (var attrName in vdom.attrs) {
                vdom.allAttrs += attrName;
                var attrVal = vdom.attrs[attrName];
                if ((prop = globProps[attrName]) && attrVal !== false) {
                    dom[prop] = attrVal;
                }
                else if ((attr = globAttrs[attrName]) && attrVal !== false) {
                    dom.setAttribute(attr, attrVal);
                }
                else if (event = events[attrName]) {
                    //dom.addEventListener(event, eventHandler(attrVal));
                    dom['on' + event] = attrVal;
                }
                else if (attrName[0] === 'o' && attrName[1] === 'n') {
                    event = attrName.substring(2).toLowerCase();
                    dom['on' + event] = attrVal;
                    //dom.addEventListener(event, eventHandler(attrVal));
                }
                else if (attrName[0] === 'd' && attrName[1] === 'a' && attrName[2] === 't' && attrName[3] === 'a' && attrVal !== false) {
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

    function normChild(vdom, i) {
        hits.normChild++;
        if (!vdom.children[i] || !vdom.children[i].tag) {
            var child = vdom.children[i];
            if (typeof child == 'string' || typeof child == 'number') {
                vdom.children[i] = getVTextNode(child);
            }
            else if (child == null) {
                vdom.children[i] = getVTextNode('');
            }
            else if (typeof child === 'object') {
                if (child instanceof Array) {
                    vdom.children[i] = new VFragmentNode('map', null, child, null);
                }
                else {
                    vdom.children[i] = getVTextNode(JSON.stringify(child));
                }
            }
            else if (typeof child === 'function') {
                vdom.children[i] = getVTextNode('Function');
            }
            else {
                vdom.children[i] = getVTextNode('');
            }
        }

        //return vdom.children[i];
    }

    function updateComponent(old, vdom) {
        vdom.component = old.component;
        var props = vdom.attrs || {};
        props.children = vdom.children;
        vdom.component.componentWillReceiveProps(props);
        vdom.component.updateProps(props);
    }

    function getFirstChild(old) {
        var beforeChild = old.children[0];
        while (beforeChild && beforeChild.fragment) {
            beforeChild = beforeChild.children[0];
        }
        return beforeChild;
    }

    function update(old, vdom) {
        DEBUG && console.log("update", vdom);

        hits.update++;
        var dom = old.dom;
        dom.updated = true;
        vdom.dom = dom;
        vdom.parent = old.parent;
        if (old.tag !== vdom.tag) {
            return replaceNode(old, vdom);
        }
        if (old.tag == '#') {
            if (old.text !== vdom.text) {
                dom.textContent = vdom.text;
            }
            //todo:
            //old.parent = null;
            //old.dom = null;
            cacheTextNode.push(old);
            return vdom;
        }
        if (old.text !== vdom.text) {
            dom.textContent = vdom.text;
            //dom.firstChild.updated = true;
        }

        if (vdom.fragment) {
            if (vdom.key !== old.key) {
                return replaceNode(old, vdom);
            }
        }
        else {
            hits.fullUpdate++;
            vdom.allAttrs = '';
            if (vdom.attrs && old.attrs) {
                forAttrs(old, vdom);
            }
            if ((old.attrs && !vdom.attrs) || (!old.attrs && vdom.attrs) || old.allAttrs !== vdom.allAttrs) {
                return replaceNode(old, vdom);
            }
        }
        if (old.component) {
            updateComponent(old, vdom);
        }
        else if (!vdom.text) {
            updateChildren(old, vdom);
        }
        //old.attrs = null;
        //todo:broke tests
        //old.children = null;
        //old.dom = null;
        //old.parent = null;
        return vdom;
    }

    function updateChildren(old, vdom) {
        hits.updateChildren++;
        var oldLen = old.children ? old.children.length : 0;
        var newLen = vdom.children ? vdom.children.length : 0;
        if (oldLen) {
            var parentDom = old.dom;
            var beforeChild = getFirstChild(old);
            if ((vdom.tag == 'map' && old.tag != 'map') || (vdom.tag != 'map' && old.tag == 'map')) {
                return replaceNode(old, vdom);
            }
            else if (vdom.tag == 'map' && old.tag == 'map') {
                var res = mapChildren(old, vdom, beforeChild);
                if (res == false) {
                    return replaceNode(old, vdom);
                }
            }
            else {
                if (oldLen === newLen) {
                    for (var i = 0; i < newLen; i++) {
                        normChild(vdom, i);
                        update(old.children[i], vdom.children[i]);
                        //old.children[i] = null;
                    }
                }
                else {
                    for (i = 0; i < newLen; i++) {
                        normChild(vdom, i);
                        var newChild = vdom.children[i];
                        create(newChild, vdom);
                        insert(parentDom, newChild, beforeChild);
                    }
                    for (i = 0; i < oldLen; i++) {
                        removeChild(old, i);
                        //todo:
                        //old.children[i] = null;
                    }
                }
            }
        }
        else if (oldLen !== newLen) {
            return replaceNode(old, vdom);
        }
        //old.children = null;
    }

    function mapChildren(old, vdom, beforeChild) {
        hits.mapChildren++;
        var parentDom = old.dom;
        var keyMap = old.keyMap;
        var newKeyMap = vdom.keyMap;
        var newChildren = vdom.children;
        var newLen = newChildren.length;
        var oldLen = old.children.length;
        var found = 0;
        for (var i = 0; i < newLen; i++) {
            normChild(vdom, i);
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
                    //old.children[i] = null;
                }
                keyMap[newKey] = null;
            }
            else {
                create(newChild, vdom);
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
                    removeChild(old, i);
                    //old.children[i] = null;
                }
            }
        }
        return true;
    }

    function replaceNode(old, vdom) {
        hits.replaceNode++;
        var parentDom = old.fragment ? old.dom : old.dom.parentNode;
        create(vdom, old.parent);
        insert(parentDom, vdom, old.fragment ? getFirstChild(old) : old);
        remove(old);
        return vdom;

    }

    function forAttrs(old, vdom) {
        var attr;
        var isNotSame;
        var dom = vdom.dom;
        for (var attrName in vdom.attrs) {
            //hits.forAttrs++;
            vdom.allAttrs += attrName;
            var attrVal = vdom.attrs[attrName];
            if (attrName == 'key') {
            }
            else if ((isNotSame = attrVal !== old.attrs[attrName]) && (attr = globProps[attrName])) {
                dom[attr] = attrVal;
            }
            else if ((attr = globAttrs[attrName]) && isNotSame) {
                if (attrVal === false) {
                    dom.removeAttribute(attr);
                }
                else {
                    dom.setAttribute(attr, attrVal);
                }
            }
            else if (attr = events[attrName] && isNotSame) {
                dom['on' + attr] = attrVal;
            }
            else if (attrName[0] === 'o' && attrName[1] === 'n' && isNotSame) {
                attr = attrName.substring(2).toLowerCase();
                dom['on' + attr] = attrVal;
            }
            else if (attrName[0] === 'd' && attrName[1] === 'a' && attrName[2] === 't' && attrName[3] === 'a' && isNotSame) {
                if (attrVal === false) {
                    dom.removeAttribute(attrName);
                }
                else {
                    dom.setAttribute(attrName, attrVal);
                }
            }
        }
    }

    function removeChild(vdom, i) {
        remove(vdom.children[i]);
    }

    function remove(old) {
        DEBUG && console.log("remove", old);
        if (old.component) {
            old.component.componentWillUnmount();
        }
        if (old.children) {
            for (var i = 0; i < old.children.length; i++) {
                remove(old.children[i]);
                //old.children[i] = null;
            }
        }
        if (!old.fragment) {
            old.dom.parentNode.removeChild(old.dom);
        }
        //old.dom = null;
        //old.attrs = null;
        //old.children = null;
        //old.parent = null;
    }

    function insert(parentDom, vdom, before) {
        if (vdom.fragment) {
            for (var i = 0; i < vdom.children.length; i++) {
                insert(vdom.dom, vdom.children[i], before);
            }
            return;
        }
        DEBUG && console.log("Insert", vdom);
        parentDom.insertBefore(vdom.dom, before && before.dom);
    }

    function destroy(vdom) {
        if (vdom.component) {
            vdom.component.componentWillUnmount();
        }
        if (vdom.children) {
            for (var i = 0; i < vdom.children.length; i++) {
                destroy(vdom.children[i]);
            }
        }
    }


    var globAttrs = {
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

    var globProps = {
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

    var events = {
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
}(window);
