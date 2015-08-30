!function (global) {
    var constAttrs = {
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

    var constProps = {
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

    //noinspection JSUnusedLocalSymbols
    var isUnitlessNumber = {
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

    var constEvents = {
        onClick: 'onclick',
        onDblClick: 'ondblclick',

        onMouseDown: 'onmousedown',
        onMouseUp: 'onmouseup',
        onMouseMove: 'onmousemove',
        onMouseEnter: 'onmouseenter',
        onMouseLeave: 'onmouseleave',
        onMouseOver: 'onmouseover',
        onMouseOut: 'onmouseout',

        onTouchStart: 'ontouchstart',
        onTouchEnd: 'ontouchend',
        onTouchMove: 'ontouchmove',
        onTouchCancel: 'ontouchcancel',
        onTouchLeave: 'ontouchleave',

        onContextMenu: 'oncontextmenu',

        onInput: 'oninput',
        onFocus: 'onfocus',
        onChange: 'onchange',

        onKeyDown: 'onkeydown',
        onKeyPress: 'onkeypress',
        onKeyUp: 'onkeyup'
    };


    var baseType = '\u2425';
    var VTag = baseType + 'T';
    var VText = baseType + '#';
    var VComponent = baseType + 'C';
    var VArray = baseType + 'A';

    //a.match(/\d+\/\*\w+\*\//g).filter(function(value, index, self) {return self.indexOf(value) === index})
    //VTagTuple[type, node, tag, key, attrsHash, attrsLen, constAttrsLen, ...attrs, ...children]
    // 0/*type*/
    // 1/*node*/
    // 2/*tag*/
    // 3/*key*/
    // 4/*attrsHash*/
    // 5/*attrsLen*/
    // 6/*constAttrsLen*/
    // 7/*attrsStartPos*/

    //VTextTuple[type, node, value]
    // 0/*type*/
    // 1/*node*/
    // 2/*text*/

    //VArrayTuple[type, parentNode, keyMap, sourceArray, ...values]
    // 0/*type*/
    // 1/*parentNode*/
    // 2/*keymap*/
    // 3/*sourceArray*/
    // 4/*arrayFirstNode*/
    var arrayStartPos = 4;

    //VComponentTuple[type, parentNode, Ctor, key, ref, instance, children, props, propsChildren?]
    // 0/*type*/
    // 1/*parentNode*/
    // 2/*Ctor*/
    // 3/*key*/
    // 4/*ref*/
    // 5/*instance*/
    // 6/*props*/
    // 7/*children*/
    // 8/*propsChildren*/
    //var hasPropsChildrenLen = 9;

    function normOnly(child) {
        if (child == null) {
            return [VText, null, ''];
        }
        if (child.constructor == Array) {
            if (child.length == 0) {
                child = [null];
            }
            var p = new Array(child.length + arrayStartPos);
            p[0/*type*/] = VArray;
            //p[2/*keymap*/] = {};
            p[3/*sourceArray*/] = child;
            return p;
        }
        return [VText, null, child];
    }

    function setRef(vdom, val, topComponent) {
        //todo:
    }

    function setStyle(node, val) {
        //todo:
    }

    function setSpreadAttrs(node, vdom, old, topComponent) {
        var newAttrs = vdom[7/*attrsStartPos*/ + 1];
        var oldAttrs = old ? old[7/*attrsStartPos*/ + 1] : null;
        var changed = [];
        var removed = [];
        for (var attr in newAttrs) {
            if (oldAttrs && oldAttrs[attr] === newAttrs[attr]) {
                continue;
            }
            changed.push(attr);
            changed.push(newAttrs[attr]);
        }
        if (oldAttrs) {
            for (attr in oldAttrs) {
                if (!(attr in newAttrs)) {
                    removed.push(attr);
                    removed.push(null);
                }
            }
            old[7/*attrsStartPos*/ + 1] = newAttrs;
        }

        var isUpdate = old ? true : false;
        if (removed.length) {
            setAttrs(isUpdate, node, removed, null, 0, removed.length, vdom, topComponent);
        }
        if (changed.length) {
            setAttrs(isUpdate, node, changed, null, 0, changed.length, vdom, topComponent);
        }
    }

    function setAttrs(isUpdate, node, attrs, oldAttrs, startPos, endPos, vdom, topComponent) {
        var normAttr;
        for (var i = startPos; i < endPos; i += 2) {
            var attr = attrs[i];
            var val = attrs[i + 1];

            if (isUpdate && oldAttrs) {
                if (oldAttrs[i + 1] === val) {
                    continue;
                }
                oldAttrs[i + 1] = val;
            }
            if (normAttr = constAttrs[attr]) {
                if (val == null || val === false) {
                    if (isUpdate) {
                        node.removeAttribute(normAttr);
                    }
                }
                else {
                    node.setAttribute(normAttr, val);
                }
            }
            else if (normAttr = constProps[attr]) {
                //todo: how to remove?
                node[normAttr] = val;
            }
            else if ((normAttr = constEvents[attr]) || ((normAttr = attr.toLowerCase()) && normAttr in document)) {
                node[normAttr] = val;
            }
            else if (attr == 'style') {
                setStyle(node, val);
            }
            else if (attr.substring(0, 4) == 'data') {
                if (val == null || val === false) {
                    if (isUpdate) {
                        node.removeAttribute(attr);
                    }
                }
                else {
                    node.setAttribute(attr, val);
                }
            }
            else if (attr == 'key') {
                vdom[3/*key*/] = val;
            }
            else if (attr == 'ref') {
                //todo:check
                if (!isUpdate) {
                    setRef(vdom, val, topComponent);
                }
            }
        }
    }

    function create(vdom, parent, pos, rootNode, before, topComponent) {

        if (vdom[0/*type*/] == VTag || vdom[0/*type*/] == VComponent) {
            if (vdom[3/*key*/] != null) {
                if (parent[0/*type*/] != VArray) {
                    console.error('Keys supports only in arrays');
                }
                if (typeof parent[2/*keymap*/] != 'object') {
                    parent[2/*keymap*/] = {};
                }
                parent[2/*keymap*/][vdom[3/*key*/]] = pos;
            }
        }

        //console.log("create", vdom);
        var type = vdom[0/*type*/];
        var child;
        var i;

        if (type == VText) {
            //VTextTuple[type, node, value]
            vdom[1/*node*/] = document.createTextNode(vdom[2/*text*/]);
            rootNode.insertBefore(vdom[1/*node*/], before);
        }
        else if (type == VTag) {
            //VTagTuple[type, node, tag, key, attrsLen, constAttrsLen, ...attrs, ...children]
            // 0/*type*/
            // 1/*node*/
            // 2/*tag*/
            // 3/*key*/
            // 5/*attrsLen*/
            // 6/*constAttrsLen*/
            // 7/*attrsStartPos*/
            var node = vdom[1/*node*/] = rootNode.insertBefore(document.createElement(vdom[2/*tag*/]), before);

            //todo: attrs hash
            if (vdom[5/*attrsLen*/] == 1 && vdom[7/*attrsStartPos*/] == null) {
                setSpreadAttrs(node, vdom, null, topComponent);
            }
            else {
                var attrsStart = 7/*attrsStartPos*/;
                var attrsEnd = 7/*attrsStartPos*/ + vdom[5/*attrsLen*/] * 2;
                if (attrsEnd - attrsStart > 0) {
                    setAttrs(false, node, vdom, null, attrsStart, attrsEnd, vdom, topComponent);
                }
            }

            for (i = 7/*attrsStartPos*/ + vdom[5/*attrsLen*/] * 2; i < vdom.length; i++) {
                child = vdom[i];
                if (!(typeof child == 'object' && child && typeof child[0] == 'string' && child[0][0] == baseType)) {
                    child = vdom[i] = normOnly(child);
                }
                create(child, vdom, i, node, null, topComponent);
            }

        }
        else if (type == VArray) {
            //VArrayTuple[type, node, parentNode, keyMap, sourceArray, ...values]
            vdom[1/*parentNode*/] = rootNode;
            vdom[2/*keymap*/] = {};
            //vdom[1/*node*/] = rootNode.insertBefore(document.createComment('array'), before);
            //iterate source array
            var sourceArray = vdom[3/*sourceArray*/];
            for (i = 0; i < sourceArray.length; i++) {
                var vdomPos = i + arrayStartPos;
                var _child = sourceArray[i];
                if (typeof _child == 'object' && _child && typeof _child[0] == 'string' && _child[0][0] == baseType) {
                    child = vdom[vdomPos] = _child;
                }
                else {
                    child = vdom[vdomPos] = normOnly(_child);
                }
                create(child, vdom, vdomPos, rootNode, before, topComponent);
            }
            vdom[3/*sourceArray*/] = null;
        }
        else if (type == VComponent) {
            createComponent(vdom, rootNode, before);
        }
        return vdom;
    }

    function update(oldParent, oldPos, old, vdom, topComponent) {
        //vdom = norm(vdom, parent, pos);
        //console.log("update", old, vdom);
        var type = vdom[0/*type*/];
        //console.log("Update", vdom);
        if (type !== old[0/*type*/]) {
            replace(oldParent, oldPos, old, vdom, topComponent);
        }
        else if (type == VText) {
            if (vdom[2/*text*/] !== old[2/*text*/]) {
                old[2/*text*/] = old[1/*node*/].textContent = vdom[2/*text*/];
            }
        }
        else if (type == VTag) {
            var node = old[1/*node*/];
            if (vdom[4/*attrsHash*/] !== old[4/*attrsHash*/]) {
                replace(oldParent, oldPos, old, vdom, topComponent);
                console.log("Replaced cause attrs hash", vdom[4], old[4]);

                return oldParent[oldPos];
            }
            //spread
            if (vdom[5/*attrsLen*/] == 1 && vdom[7/*attrsStartPos*/] == null) {
                setSpreadAttrs(node, vdom, old, topComponent, true);
            }
            else {
                var attrsStart = 7/*attrsStartPos*/ + vdom[6/*constAttrsLen*/] * 2;
                var attrsEnd = 7/*attrsStartPos*/ + vdom[5/*attrsLen*/] * 2;
                if (attrsEnd - attrsStart > 0) {
                    setAttrs(true, node, vdom, old, attrsStart, attrsEnd, vdom, topComponent);
                }
            }

            for (var i = 7/*attrsStartPos*/ + vdom[5/*attrsLen*/] * 2; i < vdom.length; i++) {
                var child = vdom[i];
                if (!(typeof child == 'object' && child && typeof child[0] == 'string' && child[0][0] == baseType)) {
                    child = vdom[i] = normOnly(child);
                }
                update(old, i, old[i], child, topComponent);
            }
        }
        else if (type == VArray) {
            //replace old child with new
            updateChildren(oldParent, oldPos, old, vdom, topComponent);
        }
        else if (type == VComponent) {
            updateComponent(oldParent, oldPos, old, vdom);
        }
        return oldParent[oldPos];
    }

    function updateChildren(oldParent, oldPos, old, vdom, topComponent) {
        //var originalOld = old.slice();
        //VArrayTuple[type, node, parentNode, keyMap, sourceArray, ...values]
        var rootNode = old[1/*parentNode*/];
        vdom[1/*parentNode*/] = rootNode;
        var keyMap = old[2/*keymap*/];
        vdom[2/*keymap*/] = keyMap;
        var oldLen = old.length;
        var sourceArray = vdom[3/*sourceArray*/];
        //todo:maybe slow speed
        var lastNextNode = getLastNode(old).nextSibling;
        /*if (oldLen == arrayStartPos) {
         for (var i = arrayStartPos; i < sourceArray.length + arrayStartPos; i++) {
         create(vdom[i] = norm(sourceArray[i - arrayStartPos], vdom, i), vdom, i, rootNode, null);
         }
         oldParent[oldPos] = vdom;
         return;
         }
         if (vdom.length == arrayStartPos) {
         for (var i = arrayStartPos; i < old.length; i++) {
         remove(rootNode, old[i]);
         }
         oldParent[oldPos] = vdom;
         return;
         }
         */
        var inserts = null;

        var fitCount = 0;
        for (var i = arrayStartPos; i < vdom.length; i++) {
            vdom[i] = sourceArray[i - arrayStartPos];
            var _child = sourceArray[i - arrayStartPos];
            if (typeof _child == 'object' && _child && typeof _child[0] == 'string' && _child[0][0] == baseType) {
                var newChild = vdom[i] = _child;
            }
            else {
                newChild = vdom[i] = normOnly(_child);
            }


            //todo: maybe read unexist val
            var oldChild = old[i];
            var fitPos = null;
            var newKey = null;
            var oldChildType = null;
            var newChildType = newChild[0/*type*/];
            if (old.length > i && oldChild != null && typeof oldChild == 'object') {
                oldChildType = oldChild[0/*type*/];
            }
            if (newChildType == VTag) {
                newKey = newChild[3/*key*/];
                // fitPos = old.keyMap[newKey];
                fitPos = keyMap[newKey];
            }
            else {
                if (oldChildType && ((oldChild != VTag && oldChild != VComponent) || oldChild[3/*key*/] == null)) {
                    fitPos = i;
                }
            }

            if (fitPos != null) {
                fitCount++;
                if (newKey != null) {
                    // vdom.keymap[newKey] = i;
                    keyMap[newKey] = i;
                }
                //todo:check
                vdom[i] = update(old, fitPos, old[fitPos], newChild, topComponent);
                //after update restore old
                //vdom[i] = old[fitPos];
                if (fitPos !== i) {
                    if (inserts == null) {
                        inserts = [];
                    }
                    inserts.push(i);
                }
                old[fitPos] = null;
            }
            else {
                //todo: newKey maybe null
                keyMap[newKey] = i;
                if (inserts == null) {
                    inserts = [];
                }
                inserts.push(i);
            }
        }
        vdom[3/*sourceArray*/] = null; // clear source array

        var oldLenFull = oldLen - arrayStartPos;
        if (oldLenFull > fitCount) {
            for (i = arrayStartPos; i < oldLen; i++) {
                oldChild = old[i];
                if (oldChild) {
                    keyMap[oldChild[3/*key*/]] = null;
                    remove(rootNode, oldChild);
                    old[i] = null;
                    if (oldLenFull == ++fitCount) {
                        break;
                    }
                }
            }
        }

        if (inserts) {
            for (i = inserts.length - 1; i >= 0; i--) {
                var pos = inserts[i];
                var child = vdom[pos];

                if (pos == vdom.length - 1) {
                    var beforeChild = lastNextNode;
                }
                else {
                    beforeChild = getFirstNode(vdom[pos + 1]);
                }

                if (child[1/*node*/]) {
                    move(rootNode, child, beforeChild);
                }
                else {
                    create(child, vdom, pos, rootNode, beforeChild, topComponent);
                }
            }
        }
        oldParent[oldPos] = vdom;
    }

    function getFirstNode(vdom) {
        while (true) {
            var type = vdom[0/*type*/];
            if (type != VComponent && type != VArray) {
                break;
            }
            if (type == VArray) {
                vdom = vdom[4/*arrayFirstNode*/];
            }
            else if (type == VComponent) {
                vdom = vdom[7/*children*/];
            }
        }
        return vdom[1/*node*/];
    }

    function getLastNode(vdom) {
        while (true) {
            var type = vdom[0/*type*/];
            if (type != VComponent && type != VArray) {
                break;
            }
            if (type == VArray) {
                vdom = vdom[vdom.length - 1];
            }
            else if (type == VComponent) {
                vdom = vdom[7/*children*/];
            }
        }
        return vdom[1/*node*/];
    }

    function replace(oldParent, oldPos, old, vdom, topComponent) {
        var type = old[0/*type*/];
        if (type == VComponent || type == VArray) {
            var parentNode = old[1/*parentNode*/];
            var before = getFirstNode(old);
        }
        else {
            parentNode = old[1/*node*/].parentNode;
            before = old[1/*node*/];
        }
        create(vdom, null, null, parentNode, before, topComponent);
        remove(parentNode, old);
        oldParent[oldPos] = vdom;
    }

    function remove(parentNode, vdom) {
        //todo deep remove
        //todo componentWillUnmount
        var type = vdom[0/*type*/];
        if (type == VComponent || type == VArray) {
            if (type == VArray) {
                //VArrayTuple[type, node, parentNode, keyMap, sourceArray, ...values]
                for (var i = arrayStartPos; i < vdom.length; i++) {
                    remove(vdom[1/*parentNode*/], vdom[i]);
                }
            }
            else if (type == VComponent) {
                remove(vdom[1/*parentNode*/], vdom[7/*children*/]);
            }
        }
        else {
            parentNode.removeChild(vdom[1/*node*/]);
        }
    }

    function move(parentNode, vdom, beforeChild) {
        var node = getFirstNode(vdom);
        if (node.nextSibling !== beforeChild) {
            parentNode.insertBefore(node, beforeChild);
        }
    }

    function updateComponent(oldParent, oldPos, old, vdom) {
        //VComponentTuple[type, node, parentNode, Ctor, instance, props, children, ref, key?]
        //todo: extend props
        var component = old[5/*instance*/];
        if (old[2/*Ctor*/] !== vdom[2/*Ctor*/]) {
            replace(oldParent, oldPos, old, vdom, component);
        }
        else {
            var props = vdom[6/*props*/];
            component.componentWillReceiveProps(props);
            component.props = old[6/*props*/] = props;
            component.forceUpdate();
            //destroy(newNode);
        }
    }

    function createComponent(vdom, rootNode, before) {
        //todo: extend props
        var Ctor = vdom[2/*Ctor*/];
        //VComponentTuple[type, node, parentNode, Ctor, instance, props, children, ref, key?]
        vdom[1/*parentNode*/] = rootNode;
        var props = vdom[6/*props*/];
        var component = vdom[5/*instance*/] = new Ctor(props);
        component.node = vdom;
        component.componentWillMount();
        vdom[7/*children*/] = component.render();
        var prevComponent = globs.component;
        globs.component = component;
        create(vdom[7/*children*/], null, null, vdom[1/*parentNode*/], before, component);
        globs.component = prevComponent;
        component.componentDidMount();
    }

    function findDOMNode(vdom) {
        //todo what if component?
        return vdom[1/*node*/];
    }

    function Component(props) {this.props = props}

    var ComponentProto = Component.prototype;
    ComponentProto.componentWillMount = function () {};
    ComponentProto.componentDidMount = function () {};
    ComponentProto.componentWillUpdate = function () {};
    ComponentProto.componentDidUpdate = function () {};
    ComponentProto.componentWillReceiveProps = function () {};
    ComponentProto.componentWillUnmount = function () {}; //todo
    ComponentProto.setState = function () {}; //todo
    ComponentProto.render = function () {return null};
    ComponentProto.forceUpdate = function () {
        //VComponentTuple[type, node, parentNode, Ctor, instance, props, children, ref, key?]
        this.componentWillUpdate();
        var prevComponent = globs.component;
        globs.component = this;
        update(this.node, 7/*children*/, this.node[7/*children*/], this.render(), this);
        globs.component = prevComponent;
        this.componentDidUpdate();
    };

    var globs = {component: null};
    global.FastReact = {
        Component: Component,
        findDOMNode: findDOMNode,
        render: function (vdom, rootNode) {
            if (typeof rootNode._vdom == 'undefined') {
                rootNode._vdom = vdom;
                return create(vdom, null, null, rootNode, null);
            }
            var old = rootNode._vdom;
            return rootNode._vdom = update([old], 0, old, vdom, null);
        }
    };
}(window);
