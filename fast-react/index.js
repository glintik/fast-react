!function (global) {
    /**-------------------------------------**
     * Globals
     **-------------------------------------**/
    var DEBUG_MODE = false;
    var id = 1;
    var REF_RETURN_NODE = false;
    var componentContext = null;
    var prevContext = null;

    var baseType = '\u2425';
    var VTag = baseType + 'T';
    var VText = baseType + '#';
    var VComponent = baseType + 'C';
    var VArray = baseType + 'A';
    var VChildren = baseType + 'F';
    var spreadType = null;

    var fastAttrs = {
        acceptCharset: 'accept-charset',
        className: 'class',
        htmlFor: 'for',
        httpEquiv: 'http-equiv',
        id: 'id',

        alt: 'alt',
        disabled: 'disabled',
        height: 'height',
        hidden: 'hidden',
        href: 'href',
        max: 'max',
        maxLength: 'maxLength',
        media: 'media',
        min: 'min',
        minLength: 'minLength',
        name: 'name',
        pattern: 'pattern',
        placeholder: 'placeholder',
        rel: 'rel',
        required: 'required',
        src: 'src',
        srcSet: 'srcSet',
        tabIndex: 'tabIndex',
        target: 'target',
        title: 'title',
        type: 'type',
        width: 'width',


        //svg attrs
        clipPath: 'clip-path',
        fillOpacity: 'fill-opacity',
        fontFamily: 'font-family',
        fontSize: 'font-size',
        markerEnd: 'marker-end',
        markerMid: 'marker-mid',
        markerStart: 'marker-start',
        stopColor: 'stop-color',
        stopOpacity: 'stop-opacity',
        strokeDasharray: 'stroke-dasharray',
        strokeLinecap: 'stroke-linecap',
        strokeOpacity: 'stroke-opacity',
        strokeWidth: 'stroke-width',
        textAnchor: 'text-anchor',
    };

    var constProps = {
        checked: 'checked',
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

    const svgElements = {
        circle: 'circle',
        clipPath: 'clipPath',
        defs: 'defs',
        ellipse: 'ellipse',
        g: 'g',
        image: 'image',
        line: 'line',
        linearGradient: 'linearGradient',
        mask: 'mask',
        path: 'path',
        pattern: 'pattern',
        polygon: 'polygon',
        polyline: 'polyline',
        radialGradient: 'radialGradient',
        rect: 'rect',
        stop: 'stop',
        svg: 'svg',
        text: 'text',
        tspan: 'tspan',
    }


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

    const svgNS = 'http://www.w3.org/2000/svg';

    /**
     * VTagTuple[type, node, tag, key, attrsHash, attrsLen, constAttrsLen, ...attrs, ...children]
     **/
    // 0/*type*/
    // 1/*node*/
    // 2/*tag*/
    // 3/*key*/
    // 4/*attrsHash*/
    // 5/*attrsLen*/
    // 6/*constAttrsLen*/
    // 7/*attrsStartPos*/

    /**
     * VTextTuple[type, node, value]
     */
    // 0/*type*/
    // 1/*node*/
    // 2/*text*/

    /**
     * VArrayTuple[type, parentNode, keyMap, sourceArray, ...values]
     */
    // 0/*type*/
    // 1/*parentNode*/
    // 2/*keymap*/
    // 3/*sourceArray*/
    // 4/*arrayFirstNode*/

    /**
     * VChildren[type, parentNode, refComponent, ...values]
     */
    // 0/*type*/
    // 1/*parentNode*/
    // 2/*refComponent*/
    // 3/*VChildrenFirstNode*/

    /**
     * VComponentTuple[type, parentNode, Ctor, key, ref, instance, children, props, propsChildren?]
     */
    // 0/*type*/
    // 1/*parentNode*/
    // 2/*Ctor*/
    // 3/*key*/
    // 4/*ref*/
    // 5/*instance*/
    // 6/*children*/
    // 7/*props*/
    // 8/*propsChildren*/
    //var hasPropsChildrenLen = 9;


    /**-------------------------------------**
     * Creating
     **-------------------------------------**/
    function create(vdom, rootNode, before, topComponent) {
        if (DEBUG_MODE) {
            vdom.id = id++;
        }

        if (vdom[0/*type*/] == VText) {
            //VTextTuple[type, node, value]
            vdom[1/*node*/] = document.createTextNode(vdom[2/*text*/]);
            rootNode.insertBefore(vdom[1/*node*/], before);
        }
        else if (vdom[0/*type*/] == VTag) {
            // isSvg
            if (typeof svgElements[vdom[2/*tag*/]] == 'string'){
                var node = document.createElementNS(svgNS, vdom[2/*tag*/]);
            } else {
                var node = document.createElement(vdom[2/*tag*/]);
            }
            vdom[1/*node*/] = rootNode.insertBefore(node, before);

            if (vdom[5/*attrsLen*/] == 1 && vdom[7/*attrsStartPos*/] == spreadType) {
                setSpreadAttrs(node, vdom, null, false);
            }
            else {
                var attrsStart = 7/*attrsStartPos*/;
                var attrsEnd = 7/*attrsStartPos*/ + vdom[5/*attrsLen*/] * 2;
                if (attrsEnd - attrsStart > 0) {
                    setAttrs(false, node, vdom, null, attrsStart, attrsEnd, vdom);
                }
            }

            for (var i = 7/*attrsStartPos*/ + vdom[5/*attrsLen*/] * 2; i < vdom.length; i++) {
                vdom[i] = create(norm(vdom[i]), node, null, topComponent);
            }


            if (typeof vdom.ref != 'undefined') {
                setRef(vdom, vdom.ref, topComponent, false);
            }
        }
        else if (vdom[0/*type*/] == VArray) {
            //VArrayTuple[type, node, parentNode, keyMap, sourceArray, ...values]
            vdom[1/*parentNode*/] = rootNode;
            vdom[2/*keymap*/] = {};
            //iterate source array
            var sourceArray = vdom[3/*sourceArray*/];
            var keyMap = vdom[2/*keymap*/];
            for (i = 0; i < sourceArray.length; i++) {
                var vdomPos = i + 4/*arrayFirstNode*/;
                var child = norm(sourceArray[i]);
                vdom[vdomPos] = create(child, rootNode, before, topComponent);
                var key = getKey(child);
                if (key != null) {
                    keyMap[key] = vdomPos;
                }
            }
            vdom[3/*sourceArray*/] = null;
        }
        else if (vdom[0/*type*/] == VComponent) {
            vdom = createComponent(vdom, rootNode, before, topComponent);
        }
        else if (vdom[0/*type*/] == VChildren) {
            vdom[1/*parentNode*/] = rootNode;
            for (i = 3/*VChildrenFirstNode*/; i < vdom.length; i++) {
                vdom[i] = create(norm(vdom[i]), rootNode, before, vdom[2/*refComponent*/]);
            }
        }
        return vdom;
    }

    function createComponent(vdom, rootNode, before, topComponent) {
        var Ctor = vdom[2/*Ctor*/];
        vdom[1/*parentNode*/] = rootNode;
        var props = vdom.length == 8/*propsChildren*/ + 1 ? prepareSpreadComponentProps(vdom) : vdom[7/*props*/];
        var component = vdom[5/*instance*/] = new Ctor(props);
        component.node = vdom;
        if (component.componentWillMount) {
            component.componentWillMount();
        }
        if (typeof component.getChildContext == 'function') {
            prevContext = componentContext;
            componentContext = component.getChildContext();
        }
        var children = norm(component.render());
        vdom[6/*children*/] = create(children, vdom[1/*parentNode*/], before, component);
        if (typeof component.getChildContext == 'function') {
            componentContext = prevContext;
        }
        if (component.componentDidMount) {
            component.componentDidMount();
        }
        if (vdom[4/*ref*/] != null) {
            setRef(vdom, vdom[4/*ref*/], topComponent, false);
        }
        return vdom;
    }


    /**-------------------------------------**
     * Updating
     **-------------------------------------**/
    function update(old, vdom, topComponent) {
        var type = vdom[0/*type*/];
        if (DEBUG_MODE && !vdom.id) {
            vdom.id = id++;
        }
        // don't update the same node
        // happens when we use {this.props.children}
        if (vdom === old) {
            return vdom;
        }
        if (type !== old[0/*type*/]) {
            return replace(old, vdom, topComponent);
        }
        else if (type == VText) {
            return updateText(old, vdom);
        }
        else if (type == VTag) {
            return updateTag(old, vdom, topComponent);
        }
        else if (type == VArray) {
            return updateArray(old, vdom, topComponent);
        }
        else if (type == VComponent) {
            return updateComponent(old, vdom, topComponent);
        }
        else if (type == VChildren) {
            return updateComponentChildren(old, vdom, topComponent);
        }
    }

    function updateText(old, vdom) {
        //VTextTuple[type, node, value]
        vdom[1/*node*/] = old[1/*node*/];
        if (vdom[2/*text*/] !== old[2/*text*/]) {
            vdom[1/*node*/].textContent = vdom[2/*text*/];
        }
        return vdom;
    }

    function updateTag(old, vdom, topComponent) {
        //VTagTuple[type, node, tag, key, attrsHash, attrsLen, constAttrsLen, ...attrs, ...children]
        var node = vdom[1/*node*/] = old[1/*node*/];
        if (vdom[2/*tag*/] !== old[2/*tag*/]) {
            return replace(old, vdom, topComponent);
        }
        if (vdom[4/*attrsHash*/] !== old[4/*attrsHash*/]) {
            return replace(old, vdom, topComponent);
        }
        if (vdom.length !== old.length) {
            return replace(old, vdom, topComponent);
        }
        //spread
        if (vdom[5/*attrsLen*/] == 1 && vdom[7/*attrsStartPos*/] == spreadType) {
            setSpreadAttrs(node, vdom, old, true);
        }
        else {
            var attrsStart = 7/*attrsStartPos*/ + vdom[6/*constAttrsLen*/] * 2;
            var attrsEnd = 7/*attrsStartPos*/ + vdom[5/*attrsLen*/] * 2;
            if (attrsEnd - attrsStart > 0) {
                setAttrs(true, node, vdom, old, attrsStart, attrsEnd, vdom);
            }
        }
        for (var i = 7/*attrsStartPos*/ + vdom[5/*attrsLen*/] * 2; i < vdom.length; i++) {
            vdom[i] = update(old[i], norm(vdom[i]), topComponent);
        }
        if (typeof vdom.ref != 'undefined') {
            setRef(vdom, vdom.ref, topComponent, false);
        }
        return vdom;
    }

    function updateComponentChildren(old, vdom, topComponent) {
        //VChildren[type, parentNode, refComponent, ...values]
        vdom[1/*parentNode*/] = old[1/*parentNode*/];
        if (vdom.length !== old.length) {
            return replace(old, vdom, topComponent);
        }
        for (var i = 3/*VChildrenFirstNode*/; i < vdom.length; i++) {
            old[i] = update(old[i], norm(vdom[i]), old[2/*refComponent*/]);
        }
        return old;
    }

    function updateComponent(old, vdom, topComponent) {
        //VComponentTuple[type, parentNode, Ctor, key, ref, instance, children, props, propsChildren?]
        if (old[2/*Ctor*/] !== vdom[2/*Ctor*/]) {
            vdom = replace(old, vdom, topComponent);
        }
        else {
            vdom[1/*parentNode*/] = old[1/*parentNode*/];
            var component = vdom[5/*instance*/] = old[5/*instance*/];
            var props = vdom.length == 8/*propsChildren*/ + 1 ? prepareSpreadComponentProps(vdom) : vdom[7/*props*/];
            if (component.componentWillReceiveProps) {
                component.componentWillReceiveProps(props);
            }
            component.props = vdom[7/*props*/] = props;

            if (component.componentWillUpdate) {
                component.componentWillUpdate();
            }
            if (typeof component.getChildContext == 'function') {
                prevContext = componentContext;
                componentContext = component.getChildContext();
            }
            var children = norm(component.render());
            vdom[6/*children*/] = update(old[6/*children*/], children, component);
            if (typeof component.getChildContext == 'function') {
                componentContext = prevContext;
            }
            component.node = vdom;
            if (component.componentDidUpdate) {
                component.componentDidUpdate();
            }
            if (vdom[4/*ref*/] != null) {
                setRef(vdom, vdom[4/*ref*/], topComponent, false);
            }
        }
        return vdom;
    }

    function updateArray(old, vdom, topComponent) {
        //VArrayTuple[type, node, parentNode, keyMap, sourceArray, ...values]
        var rootNode = vdom[1/*parentNode*/] = old[1/*parentNode*/];
        var keyMap = vdom[2/*keymap*/] = old[2/*keymap*/];
        var oldLen = old.length;
        var sourceArray = vdom[3/*sourceArray*/];
        //todo:maybe slow speed
        var lastNextNode = getChildNode(old, true).nextSibling;
        var inserts = null;

        var fitCount = 0;
        for (var i = 4/*arrayFirstNode*/; i < vdom.length; i++) {
            var newChild = vdom[i] = norm(sourceArray[i - 4/*arrayFirstNode*/]);
            var oldChild = oldLen > i ? old[i] : null;
            var newKey = getKey(newChild);
            if (newKey != null) {
                var fitPos = keyMap[newKey];
            }
            else {
                if (oldChild && getKey(oldChild) == null) {
                    fitPos = i;
                }
                else {
                    fitPos = null;
                }
            }

            if (fitPos != null) {
                fitCount++;
                vdom[i] = update(old[fitPos], newChild, topComponent);
                if (fitPos !== i) {
                    if (inserts == null) {
                        inserts = [];
                    }
                    inserts.push(i);
                }
                old[fitPos] = null;
            }
            else {
                if (inserts == null) {
                    inserts = [];
                }
                inserts.push(i);
            }
            if (newKey != null) {
                keyMap[newKey] = i;
            }
        }
        vdom[3/*sourceArray*/] = null;

        var oldLenFull = oldLen - 4/*arrayFirstNode*/;
        if (oldLenFull > fitCount) {
            for (i = 4/*arrayFirstNode*/; i < oldLen; i++) {
                oldChild = old[i];
                if (oldChild) {
                    var key = getKey(oldChild);
                    if (key != null) {
                        keyMap[key] = null;
                    }
                    remove(rootNode, oldChild, true);
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
                    beforeChild = getChildNode(vdom[pos + 1], false);
                }

                if (child[1/*node*/]) {
                    move(rootNode, child, beforeChild);
                }
                else {
                    child = vdom[pos] = create(child, rootNode, beforeChild, topComponent);
                }
            }
        }
        return vdom;
    }


    /**-------------------------------------**
     * Attrs
     **-------------------------------------**/
    function setStyle(node, oldStyles, newStyles) {
        if (oldStyles) {
            for (var prop in oldStyles) {
                node.style[prop] = "";
            }
        }
        var val;
        for (prop in newStyles) {
            val = newStyles[prop];
            if (val == +val && typeof isUnitlessNumber[prop] == 'undefined') {
                val = val + 'px';
            }
            node.style[prop] = val;
        }
    }

    function setSpreadAttrs(node, vdom, old) {
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
        }

        var isUpdate = old ? true : false;
        if (removed.length) {
            setAttrs(isUpdate, node, removed, null, 0, removed.length, vdom);
        }
        if (changed.length) {
            setAttrs(isUpdate, node, changed, null, 0, changed.length, vdom);
        }
    }

    function setAttrs(isUpdate, node, attrs, oldAttrs, startPos, endPos, vdom) {
        var normAttr;
        for (var i = startPos; i < endPos; i += 2) {
            var attr = attrs[i];
            var val = attrs[i + 1];

            if (isUpdate && oldAttrs) {
                if (oldAttrs[i + 1] === val) {
                    continue;
                }
            }
            if (normAttr = fastAttrs[attr]) {
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
                node[normAttr] = val;
            }
            else if ((normAttr = constEvents[attr]) || ((normAttr = attr.toLowerCase()) && normAttr in document && normAttr.substr(0, 2) == 'on')) {
                node[normAttr] = val;
            }
            else if (attr == 'style') {
                setStyle(node, oldAttrs ? oldAttrs.style : null, val);
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
                vdom.ref = val;
            }
            else if (attr == 'dangerouslySetInnerHTML') {
                if (isUpdate && oldAttrs) {
                    if (oldAttrs[i + 1].__html === val.html) {
                        continue;
                    }
                }
                node.innerHTML = val.__html;
            }
            else {
                if (val == null || val === false) {
                    if (isUpdate) {
                        node.removeAttribute(attr);
                    }
                }
                else {
                    node.setAttribute(attr, val);
                }
            }
        }
    }


    /**-------------------------------------**
     * Move, Remove, Replace
     **-------------------------------------**/
    function replace(old, vdom, topComponent) {
        var type = old[0/*type*/];
        if (type == VComponent || type == VArray || type == VChildren) {
            var parentNode = old[1/*parentNode*/];
            var before = getChildNode(old, false);
        }
        else {
            parentNode = old[1/*node*/].parentNode;
            before = old[1/*node*/];
        }
        vdom = create(vdom, parentNode, before, topComponent);
        remove(parentNode, old, true);
        return vdom;
    }

    function remove(parentNode, vdom, removeFromDom) {
        var type = vdom[0/*type*/];
        if (type == VComponent || type == VArray || type == VChildren) {
            if (type == VArray) {
                //VArrayTuple[type, node, parentNode, keyMap, sourceArray, ...values]
                for (var i = 4/*arrayFirstNode*/; i < vdom.length; i++) {
                    remove(vdom[1/*parentNode*/], vdom[i], removeFromDom);
                }
            }
            else if (type == VComponent) {
                if (vdom[5/*instance*/].componentWillUnmount) {
                    vdom[5/*instance*/].componentWillUnmount();
                }
                remove(vdom[1/*parentNode*/], vdom[6/*children*/], removeFromDom);
            }
            else if (type == VChildren) {
                for (i = 3/*VChildrenFirstNode*/; i < vdom.length; i++) {
                    remove(vdom[1/*parentNode*/], vdom[i], removeFromDom);
                }
            }
        }
        else {
            if (type == VTag) {
                for (i = 7/*attrsStartPos*/ + vdom[5/*attrsLen*/] * 2; i < vdom.length; i++) {
                    remove(vdom[1/*node*/], vdom[i], false);
                }
            }
            if (removeFromDom) {
                parentNode.removeChild(vdom[1/*node*/]);
            }
        }
    }

    function move(parentNode, vdom, beforeChild) {
        var node = getChildNode(vdom, false);
        if (node.nextSibling !== beforeChild) {
            parentNode.insertBefore(node, beforeChild);
        }
    }


    /**-------------------------------------**
     * Utils
     **-------------------------------------**/
    function norm(child) {
        if (!(typeof child == 'object' && child && typeof child[0] == 'string' && child[0][0] == baseType)) {
            child = normOnly(child);
        }
        if (child[0/*type*/] == VComponent) {
            if (typeof child[2/*Ctor*/] == 'string') {
                child = convertComponentToTag(child);
            }
        }
        return child;
    }

    function normOnly(child) {
        if (child == null || typeof child == 'boolean') {
            return [VText, null, ''];
        }

        if (child.constructor == Array) {
            if (child.length == 0) {
                return [VText, null, ''];
            }
            var p = new Array(child.length + 4/*arrayFirstNode*/);
            p[0/*type*/] = VArray;
            p[2/*keymap*/] = {};
            p[3/*sourceArray*/] = child;
            if (DEBUG_MODE) {
                p.id = id++;
            }

            return p;
        }
        return [VText, null, child];
    }

    function setRef(vdom, val, topComponent) {
        if (!topComponent.refs) {
            topComponent.refs = {};
        }
        if (typeof val == 'function') {
            val(REF_RETURN_NODE ? vdom[1/*node*/] : vdom);
        }
        else {
            if (vdom[0/*type*/] == VComponent) {
                topComponent.refs[val] = vdom[5/*instance*/];
            }
            else {
                topComponent.refs[val] = REF_RETURN_NODE ? vdom[1/*node*/] : vdom;
            }
        }
    }

    function getKey(vdom) {
        if (vdom[0/*type*/] == VTag) {
            if (vdom[3/*key*/] == null && vdom[5/*attrsLen*/] == 1 && vdom[7/*attrsStartPos*/] == null) {
                var spread = vdom[7/*attrsStartPos*/ + 1];
                if (typeof spread.key != 'undefined' && spread.key != null) {
                    vdom[3/*key*/] = spread.key;
                }
            }
            return vdom[3/*key*/];
        }
        else if (vdom[0/*type*/] == VComponent) {
            if (vdom[3/*key*/] == null && vdom.length - 1 == 8/*propsChildren*/) {
                spread = vdom[7/*props*/];
                if (typeof spread.key != 'undefined' && spread.key != null) {
                    vdom[3/*key*/] = spread.key;
                }
            }
            return vdom[3/*key*/];
        }
        return null;
    }

    function getChildNode(vdom, isLast) {
        while (true) {
            var type = vdom[0/*type*/];
            if (type != VComponent && type != VArray && type != VChildren) {
                break;
            }
            if (type == VArray) {
                vdom = vdom[isLast ? vdom.length - 1 : 4/*arrayFirstNode*/];
            }
            else if (type == VComponent) {
                vdom = vdom[6/*children*/];
            }
            else if (type == VChildren) {
                vdom = vdom[isLast ? vdom.length - 1 : 3/*VChildrenFirstNode*/];
            }
        }
        return vdom[1/*node*/];
    }

    function prepareSpreadComponentProps(vdom) {
        var props = vdom[7/*props*/];
        var _props = {children: vdom[8/*propsChildren*/]};
        for (var prop in props) {
            var val = props[prop];
            // don't copy sended props.children into our props if we have own children
            if (prop == 'children' && vdom[8/*propsChildren*/][0/*type*/] == VChildren) {
                continue;
            }
            if (prop == 'key') {
                vdom[3/*key*/] = val;
                continue;
            }
            if (prop == 'ref') {
                vdom[4/*ref*/] = val;
                continue;
            }
            _props[prop] = val;
        }
        return _props;
    }

    function convertComponentToTag(vdom) {
        var props = vdom[7/*props*/];
        if (vdom[8/*propsChildren*/]) {
            var children = vdom[8/*propsChildren*/];
        }
        else {
            children = props.children;
        }
        props.children = null;
        var tag = vdom[2/*Ctor*/];
        var newVdom = [];
        newVdom.length = 0;
        newVdom[0/*type*/] = VTag;
        newVdom[1/*node*/] = null;
        newVdom[2/*tag*/] = tag;
        newVdom[3/*key*/] = null;
        newVdom[4/*attrsHash*/] = '&';
        newVdom[5/*attrsLen*/] = 1;
        newVdom[6/*constAttrsLen*/] = 0;
        newVdom[7/*attrsStartPos*/] = null;
        newVdom[7/*attrsStartPos*/ + 1] = props;
        if (DEBUG_MODE) {
            newVdom.id = id++;
        }

        if (children) {
            for (var i = 3/*VChildrenFirstNode*/; i < children.length; i++) {
                newVdom.push(children[i]);
            }
        }
        return newVdom;
    }


    /**-------------------------------------**
     * Top Level
     **-------------------------------------**/
    function findDOMNode(vdom) {
        if (vdom[0/*type*/] == VComponent) {
            return vdom[5/*instance*/];
        }
        return vdom[1/*node*/];
    }


    /**-------------------------------------**
     * Component
     **-------------------------------------**/
    function Component(props) {
        this.props = props;
        this.node = null;
        //noinspection JSUnusedGlobalSymbols
        this.context = componentContext;
    }

    var ComponentProto = Component.prototype;
/*
    ComponentProto.componentWillMount = function () {};
    ComponentProto.componentDidMount = function () {};
    ComponentProto.componentWillUpdate = function () {};
    ComponentProto.componentDidUpdate = function () {};
    ComponentProto.componentWillReceiveProps = function () {};
    ComponentProto.componentWillUnmount = function () {};
*/
    ComponentProto.setState = function (state) {
        if (this.state) {
            for (var key in state) {
                this.state[key] = state[key];
            }
        }
        else {
            this.state = state;
        }
        this.forceUpdate();
    };
    ComponentProto.render = function () {
        return null;
    };
    ComponentProto.getChildContext = null;
    ComponentProto.forceUpdate = function () {
        //VComponentTuple[type, node, parentNode, Ctor, instance, props, children, ref, key?]
        if (this.componentWillUpdate) {
            this.componentWillUpdate();
        }
        componentContext = this.context;
        if (typeof this.getChildContext == 'function') {
            componentContext = this.getChildContext();
        }
        var children = norm(this.render());
        this.node[6/*children*/] = update(this.node[6/*children*/], children, this);
        if (typeof this.getChildContext == 'function') {
            componentContext = prevContext;
        }
        if (this.componentDidUpdate) {
            this.componentDidUpdate();
        }
    };

    //noinspection JSUnusedGlobalSymbols
    /**-------------------------------------**
     * Export
     **-------------------------------------**/
    module.exports = {
        Component: Component,
        findDOMNode: findDOMNode,
        createElement: function (tag, attrs, child) {
            if (typeof tag == 'function') {
                // 0/*type*/
                // 1/*parentNode*/
                // 2/*Ctor*/
                // 3/*key*/
                // 4/*ref*/
                // 5/*instance*/
                // 6/*children*/
                // 7/*props*/
                // 8/*propsChildren*/
                return [VComponent, null, tag, null, null, null, null, attrs, child];
            }
            // 0/*type*/
            // 1/*node*/
            // 2/*tag*/
            // 3/*key*/
            // 4/*attrsHash*/
            // 5/*attrsLen*/
            // 6/*constAttrsLen*/
            var d = [];
            if (attrs != null){
                d.push(VTag, null, tag, null, '&', 1, 0, spreadType, attrs);
            } else {
                d.push(VTag, null, tag, null, '', 0, 0);
            }
            for (var i = 2; i < arguments.length; i++) {
                d.push(arguments[i]);
            }
            return d;
        },
        cloneElement: function (el) {
            return el.slice()
        },
        render: function (vdom, rootNode) {
            if (typeof rootNode._vdom == 'undefined') {
                return rootNode._vdom = create(norm(vdom), rootNode, null, null);
            }
            var old = rootNode._vdom;
            return rootNode._vdom = update(old, norm(vdom), null);
        }
    };
}();
//a.match(/\d+\/\*\w+\*\//g).filter(function(value, index, self) {return self.indexOf(value) === index})
