!function (global) {
    /**-------------------------------------**
     * Globals
     **-------------------------------------**/
    var DEBUG_MODE = false;
    var id = 1;
    function debugVNode(node){
        node.id = id++;
    }

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
    function create(vdom, rootNode, before, topComponent, parentComponent) {
        if (DEBUG_MODE) {
            debugVNode(vdom);
        }

        if (vdom[0/*type*/] == VText) {
            //VTextTuple[type, node, value]
            vdom[1/*node*/] = document.createTextNode(vdom[2/*text*/]);
            rootNode.insertBefore(vdom[1/*node*/], before);
        }
        else if (vdom[0/*type*/] == VTag) {
            // isSvg
            if (typeof svgElements[vdom[2/*tag*/]] == 'string') {
                var node = document.createElementNS(svgNS, vdom[2/*tag*/]);
            } else {
                var node = document.createElement(vdom[2/*tag*/]);
            }
            vdom[1/*node*/] = rootNode.insertBefore(node, before);
            var attrsStart = 7/*attrsStartPos*/;
            var attrsEnd = 7/*attrsStartPos*/ + vdom[5/*attrsLen*/] * 2;
            if (attrsEnd - attrsStart > 0) {
                setAttrs(false, node, vdom, null, attrsStart, attrsEnd, vdom);
            }

            for (var i = 7/*attrsStartPos*/ + vdom[5/*attrsLen*/] * 2; i < vdom.length; i++) {
                vdom[i] = create(norm(vdom[i]), node, null, topComponent, parentComponent);
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
                vdom[vdomPos] = create(child, rootNode, before, topComponent, parentComponent);
                var key = getKey(child);
                if (key != null) {
                    keyMap[key] = vdomPos;
                }
            }
            vdom[3/*sourceArray*/] = null;
        }
        else if (vdom[0/*type*/] == VComponent) {
            vdom = createComponent(vdom, rootNode, before, topComponent, parentComponent);
        }
        else if (vdom[0/*type*/] == VChildren) {
            vdom[1/*parentNode*/] = rootNode;
            for (i = 3/*VChildrenFirstNode*/; i < vdom.length; i++) {
                vdom[i] = create(norm(vdom[i]), rootNode, before, vdom[2/*refComponent*/], parentComponent);
            }
        }
        return vdom;
    }

    function createComponent(vdom, rootNode, before, topComponent, parentComponent) {
        var Constructor = vdom[2/*Ctor*/];
        vdom[1/*parentNode*/] = rootNode;
        var props = vdom[7/*props*/];
        if (!Constructor.prototype || !Constructor.prototype.render) {
            var children = norm(Constructor(props));
            vdom[6/*children*/] = create(children, vdom[1/*parentNode*/], before, topComponent, parentComponent);
        }
        else {
            var component = vdom[5/*instance*/] = new Constructor(props);
            component.node = vdom;
            component._internalParentComponent = parentComponent;
            if (component.componentWillMount) {
                component.componentWillMount();
            }
            var children = norm(component.render());
            component._internalContext = typeof component.getChildContext == 'function' ? component.getChildContext() : null;
            vdom[6/*children*/] = create(children, vdom[1/*parentNode*/], before, component, component);
            if (component.componentDidMount) {
                component.componentDidMount();
            }
        }
        if (vdom[4/*ref*/] != null) {
            setRef(vdom, vdom[4/*ref*/], topComponent, false);
        }
        return vdom;
    }


    /**-------------------------------------**
     * Updating
     **-------------------------------------**/
    function update(old, vdom, topComponent, parentComponent) {
        var type = vdom[0/*type*/];
        if (DEBUG_MODE && !vdom.id) {
            debugVNode(vdom);
        }
        // don't update the same node
        // happens when we use {this.props.children}
        if (vdom === old) {
            return vdom;
        }
        if (type !== old[0/*type*/]) {
            return replace(old, vdom, topComponent, parentComponent);
        }
        else if (type == VText) {
            return updateText(old, vdom);
        }
        else if (type == VTag) {
            return updateTag(old, vdom, topComponent, parentComponent);
        }
        else if (type == VArray) {
            return updateArray(old, vdom, topComponent, parentComponent);
        }
        else if (type == VComponent) {
            return updateComponent(old, vdom, topComponent, parentComponent);
        }
        else if (type == VChildren) {
            return updateComponentChildren(old, vdom, topComponent, parentComponent);
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

    function updateTag(old, vdom, topComponent, parentComponent) {
        //VTagTuple[type, node, tag, key, attrsHash, attrsLen, constAttrsLen, ...attrs, ...children]
        var node = vdom[1/*node*/] = old[1/*node*/];
        if (vdom[2/*tag*/] !== old[2/*tag*/]) {
            return replace(old, vdom, topComponent, parentComponent);
        }
        if (vdom[4/*attrsHash*/] !== old[4/*attrsHash*/]) {
            return replace(old, vdom, topComponent, parentComponent);
        }
        if (vdom.length !== old.length) {
            return replace(old, vdom, topComponent, parentComponent);
        }
        var attrsStart = 7/*attrsStartPos*/ + vdom[6/*constAttrsLen*/] * 2;
        var attrsEnd = 7/*attrsStartPos*/ + vdom[5/*attrsLen*/] * 2;
        if (attrsEnd - attrsStart > 0) {
            setAttrs(true, node, vdom, old, attrsStart, attrsEnd, vdom);
        }
        for (var i = 7/*attrsStartPos*/ + vdom[5/*attrsLen*/] * 2; i < vdom.length; i++) {
            vdom[i] = update(old[i], norm(vdom[i]), topComponent, parentComponent);
        }
        if (typeof vdom.ref != 'undefined') {
            setRef(vdom, vdom.ref, topComponent, false);
        }
        return vdom;
    }

    function updateComponentChildren(old, vdom, topComponent, parentComponent) {
        //VChildren[type, parentNode, refComponent, ...values]
        vdom[1/*parentNode*/] = old[1/*parentNode*/];
        if (vdom.length !== old.length) {
            return replace(old, vdom, topComponent, parentComponent);
        }
        for (var i = 3/*VChildrenFirstNode*/; i < vdom.length; i++) {
            old[i] = update(old[i], norm(vdom[i]), old[2/*refComponent*/], parentComponent);
        }
        return old;
    }

    function updateComponent(old, vdom, topComponent, parentComponent) {
        var Ctor = vdom[2/*Ctor*/];
        //VComponentTuple[type, parentNode, Ctor, key, ref, instance, children, props, propsChildren?]
        if (old[2/*Ctor*/] !== Ctor) {
            vdom = replace(old, vdom, topComponent, parentComponent);
        }
        else {
            vdom[1/*parentNode*/] = old[1/*parentNode*/];
            var component = vdom[5/*instance*/] = old[5/*instance*/];
            if (!component) {
                //noinspection JSDuplicatedDeclaration
                var children = norm(Ctor());
                vdom[6/*children*/] = update(old[6/*children*/], children, topComponent, parentComponent);
            }
            else {
                component._internalParentComponent = parentComponent;
                if (component._context) {
                    component._context = null;
                }
                var props = vdom[7/*props*/];
                if (typeof Ctor.defaultProps == 'object' && Ctor.defaultProps) {
                    for (var prop in Ctor.defaultProps) {
                        if (typeof props[prop] == 'undefined') {
                            props[prop] = Ctor.defaultProps[prop];
                        }
                    }
                }
                if (component.componentWillReceiveProps) {
                    // todo: nextState
                    component.componentWillReceiveProps(props);
                }
                var shouldUpdate = true;
                if (component.shouldComponentUpdate) {
                    // todo: nextState
                    shouldUpdate = component.shouldComponentUpdate(props);
                }
                component.props = vdom[7/*props*/] = props;

                if (shouldUpdate) {
                    if (component.componentWillUpdate) {
                        component.componentWillUpdate();
                    }
                    var children = norm(component.render());
                    component._internalContext = typeof component.getChildContext == 'function' ? component.getChildContext() : null;
                    // because child component can still updates
                    vdom[6/*children*/] = update(component.node[6/*children*/], children, component, component);
                    // vdom[6/*children*/] = update(old[6/*children*/], children, component, component);
                    component.node = vdom;
                    if (component.componentDidUpdate) {
                        component.componentDidUpdate();
                    }
                } else {
                    vdom[6/*children*/] = old[6/*children*/];
                }
            }
            if (vdom[4/*ref*/] != null) {
                setRef(vdom, vdom[4/*ref*/], topComponent, false);
            }
        }
        return vdom;
    }

    function updateArray(old, vdom, topComponent, parentComponent) {
        //VArrayTuple[type, node, parentNode, keyMap, sourceArray, ...values]
        var rootNode = vdom[1/*parentNode*/] = old[1/*parentNode*/];
        var keyMap = vdom[2/*keymap*/] = old[2/*keymap*/];
        var oldLen = old.length;
        var sourceArray = vdom[3/*sourceArray*/];
        //todo:maybe slow speed
        var lastNextNode = getChildNode(old, true).nextSibling;
        var inserts = null;

        var fitCount = 0;
        //todo: notify if we have two or more same keys
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
                oldChild = old[fitPos];
                if (!oldChild) {
                    throw new Error('duplicate key: ' + newKey);
                }
                fitCount++;
                vdom[i] = update(oldChild, newChild, topComponent, parentComponent);
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
                    child = vdom[pos] = create(child, rootNode, beforeChild, topComponent, parentComponent);
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
                setStyle(node, oldAttrs ? oldAttrs[i + 1] : null, val);
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
    function replace(old, vdom, topComponent, parentComponent) {
        var type = old[0/*type*/];
        if (type == VComponent || type == VArray || type == VChildren) {
            var parentNode = old[1/*parentNode*/];
            var before = getChildNode(old, false);
        }
        else {
            parentNode = old[1/*node*/].parentNode;
            before = old[1/*node*/];
        }
        vdom = create(vdom, parentNode, before, topComponent, parentComponent);
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
    function norm(vdom) {
        if (!(typeof vdom == 'object' && vdom && typeof vdom[0] == 'string' && vdom[0][0] == baseType)) {
            if (vdom.constructor == Array) {
                return makeVArray(vdom);
            }
            return makeText(vdom == null || typeof vdom == 'boolean' ? '' : vdom);
        }
        var type = vdom[0/*type*/];
        if (type == VComponent) {
            //convertComponentToTag
            if (typeof vdom[2/*Ctor*/] == 'string') {
                return makeTag(vdom[7/*props*/], vdom[2/*Ctor*/], 0, vdom[7/*props*/].children, 0, vdom[7/*props*/].children.length);
            }
            //convertComponentWithSpreadToNormal
            if (vdom.length == 8/*propsChildren*/ + 1) {
                return makeComponent(vdom[2/*Ctor*/], vdom[7/*props*/], vdom[8/*propsChildren*/])
            }
        }
        if (type == VTag) {
            //convertTagWithSpreadToNormal
            if (vdom[5/*attrsLen*/] == 1 && vdom[7/*attrsStartPos*/] == spreadType) {
                return makeTag(vdom[7/*attrsStartPos*/ + 1], vdom[2/*tag*/], vdom.length, vdom, 7/*attrsStartPos*/ + 2, vdom.length);
            }
        }
        return vdom;
    }

    var propsHashCounter = 1;

    function makeTag(tag, attrs, childrenArray, from, to) {
        var pCount = 0;
        var key = null;
        var ref = null;
        var childrenLen = to - from;
        if (childrenLen < 0) {
            childrenLen = 0;
        }
        // var newVdom = new Array(7/*attrsStartPos*/ + 2 + to - from); // min tag array len
        var vdom = [];
        vdom[0/*type*/] = VTag;
        vdom[1/*node*/] = null;
        vdom[2/*tag*/] = tag;
        vdom[6/*constAttrsLen*/] = 0;
        var k = 7/*attrsStartPos*/;
        if (attrs) {
            for (var p in attrs) {
                if (p === 'children') {
                    if (childrenLen == 0) {
                        childrenArray = attrs[p];
                        from = 0;
                        to = childrenArray.length;
                    }
                    continue;
                }
                if (p === 'key') {
                    key = attrs[p];
                    continue;
                }
                if (p === 'ref') {
                    ref = attrs[p];
                    // continue; // todo: wait new design
                }
                pCount++;
                vdom[k++] = p;
                vdom[k++] = attrs[p];
            }
        }
        vdom[3/*key*/] = key;
        vdom[4/*attrsHash*/] = propsHashCounter++;
        vdom[5/*attrsLen*/] = pCount;
        if (childrenLen) {
            // pre create array slots
            vdom[k + childrenLen - 1] = null;
        }
        if (childrenArray) {
            for (var i = from; i < to; i++) {
                vdom[k++] = childrenArray[i];
            }
        }
        if (DEBUG_MODE) {
            debugVNode(vdom);
        }
        return vdom;
    }

    function makeComponent(Ctor, props, childrenArray) {
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
        var key = null;
        var ref = null;
        var newProps = {children: childrenArray};
        if (props) {
            for (var p in props) {
                if (p === 'children' && childrenArray != null) {
                    continue;
                }
                if (p === 'key') {
                    key = props[p];
                    continue;
                }
                if (p === 'ref') {
                    ref = props[p];
                    // continue; // todo: wait new design
                }
                newProps[p] = props[p];
            }
        }
        var vdom = [VComponent, null, Ctor, key, ref, null, null, newProps];
        if (DEBUG_MODE) {
            debugVNode(vdom);
        }
        return vdom;
    }

    function makeVArray(array) {
        if (array.length == 0) {
            return [VText, null, ''];
        }
        var p = new Array(array.length + 4/*arrayFirstNode*/);
        p[0/*type*/] = VArray;
        p[2/*keymap*/] = {};
        p[3/*sourceArray*/] = array;
        if (DEBUG_MODE) {
            debugVNode(p);
        }
        return p;
    }

    function makeText(text) {
        var vdom = [VText, null, text];
        if (DEBUG_MODE) {
            debugVNode(vdom);
        }
        return vdom;
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

    // todo: need rethink
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

    function getRef(vdom) {
        if (vdom[0/*type*/] == VComponent) {
            return vdom[4/*ref*/]
        }
        else if (vdom[0/*type*/] == VTag) {
            if (vdom[5/*attrsLen*/] == 1 && vdom[7/*attrsStartPos*/] == spreadType) {
                return vdom[7/*attrsStartPos*/ + 1].ref;
            }
            else {
                var attrsStart = 7/*attrsStartPos*/;
                var attrsEnd = 7/*attrsStartPos*/ + vdom[5/*attrsLen*/] * 2;
                if (attrsEnd - attrsStart > 0) {
                    for (var i = attrsStart; i < attrsEnd; i += 2) {
                        if (vdom[i] == 'ref') {
                            return vdom[i + 1];
                        }
                    }
                }
            }
        }
    }

    function getProps(vdom) {
        if (vdom[0/*type*/] == VComponent) {
            return vdom[7/*props*/];
        }
        else if (vdom[0/*type*/] == VTag) {
            if (vdom[5/*attrsLen*/] == 1 && vdom[7/*attrsStartPos*/] == spreadType) {
                return vdom[7/*attrsStartPos*/ + 1];
            }
            else {
                var attrsStart = 7/*attrsStartPos*/;
                var attrsEnd = 7/*attrsStartPos*/ + vdom[5/*attrsLen*/] * 2;
                var props = {};
                if (attrsEnd - attrsStart > 0) {
                    for (var i = attrsStart; i < attrsEnd; i += 2) {
                        props[vdom[i]] = vdom[i + 1];
                    }
                }
                return props;
            }
        }
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

        this._internalContext = null;
        this._internalParentComponent = null;
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

    var queue = [];
    var isUpdating = false;

    function runQueue() {
        //todo: main render
        if (!isUpdating && queue.length > 0) {
            isUpdating = true;
            //VComponentTuple[type, node, parentNode, Ctor, instance, props, children, ref, key?]
            var q = queue.shift();
            if (q.type == 'forceUpdate') {
                var component = q.component;
                if (component.componentWillUpdate) {
                    component.componentWillUpdate();
                }
                component._internalContext = typeof component.getChildContext == 'function' ? component.getChildContext() : null;
                var children = norm(component.render());
                component.node[6/*children*/] = update(component.node[6/*children*/], children, component, component);
                if (component.componentDidUpdate) {
                    component.componentDidUpdate();
                }
            }
            isUpdating = false;
            runQueue();
            if (q.callback) {
                q.callback();
            }
        }
    }

    ComponentProto.setState = function (state, callback) {
        if (this.state) {
            for (var key in state) {
                this.state[key] = state[key];
            }
        }
        else {
            this.state = state;
        }
        this.forceUpdate(callback);
    };
    ComponentProto.render = function () {
        return null;
    };
    ComponentProto.getChildContext = null;
    ComponentProto.forceUpdate = function (callback) {
        queue.push({type: 'forceUpdate', component: this, callback: callback});
        runQueue();
    };

    function getContext() {
        if (!this._context) {
            var parentComponent = this;
            var context = {};
            var parents = [];
            while (parentComponent = parentComponent._internalParentComponent) {
                parents.push(parentComponent._internalContext);
            }
            for (var i = 0; i < parents.length; i++) {
                parentComponent = parents[i];
                for (var prop in parentComponent) {
                    context[prop] = parentComponent[prop];
                }
            }
            this._context = context;
        }
        return this._context;
    }

    Object.defineProperty(ComponentProto, 'context', {
        get: getContext
    });

    function propType() {
        return propType;
    }

    propType.isRequired = function () {
    }
    //noinspection JSUnusedGlobalSymbols
    /**-------------------------------------**
     * Export
     **-------------------------------------**/
    var _exports = {
        Component: Component,
        findDOMNode: findDOMNode,
        createElement: function (tag, attrs, child) {
            var argLen = arguments.length;
            if (typeof tag == 'function') {
                var children;
                if (argLen > 2) {
                    children = new Array(argLen - 2 + 3/*VChildrenFirstNode*/);
                    children[0/*type*/] = VChildren;
                    children[1/*parentNode*/] = null;
                    //todo: ref?
                    children[2/*refComponent*/] = null;
                    var k = 3/*VChildrenFirstNode*/;
                    for (var i = 2; i < argLen; i++) {
                        children[k++] = arguments[i];
                    }
                }
                return makeComponent(tag, attrs, children);
            }
            var vdom = makeTag(attrs, tag, 0, null, 2, argLen);
            var vdomLen = vdom.length;
            for (var i = 2; i < argLen; i++) {
                vdom[vdomLen - argLen + i] = arguments[i];
            }
            return vdom;
        },
        render: function (vdom, rootNode) {
            isUpdating = true;
            if (typeof rootNode._vdom == 'undefined') {
                rootNode._vdom = create(norm(vdom), rootNode, null, null, null);
            }
            else {
                var old = rootNode._vdom;
                rootNode._vdom = update(old, norm(vdom), null, null);
            }
            isUpdating = false;
            runQueue();
            return rootNode._vdom;
        },
        PropTypes: {
            array: propType,
            bool: propType,
            func: propType,
            number: propType,
            object: propType,
            string: propType,
            any: propType,
            arrayOf: propType,
            element: propType,
            instanceOf: propType,
            node: propType,
            objectOf: propType,
            oneOf: propType,
            oneOfType: propType,
            shape: propType
        },
        cloneElement: function (el, props) {
            //todo: props?
            return el.slice()
        },
        isValidElement: function (element) {
            return element && typeof element == 'object' && (element[0/*type*/] == VTag || VComponent);
        },
        createClass: function (specification) {
            var defaultProps = specification.getDefaultProps ? specification.getDefaultProps() : null;

            function Comp(props) {
                if (defaultProps) {
                    for (var prop in defaultProps) {
                        if (typeof props[prop] == 'undefined') {
                            props[prop] = defaultProps[prop];
                        }
                    }
                }
                if (specification.getInitialState) {
                    this.state = specification.getInitialState();
                }
                this.props = props;
                this.node = null;
                for (var p in specification) {
                    if (p != 'getDefaultProps' && p != 'getInitialState' && p != 'statics'
                        && p != 'componentWillMount' && p != 'componentDidMount' && p != 'componentWillReceiveProps'
                        && p != 'shouldComponentUpdate' && p != 'componentWillUpdate' && p != 'componentDidUpdate'
                        && p != 'componentWillUnmount' && p != 'render' && p != 'propTypes' && p != 'displayName') {
                        var val = specification[p];
                        this[p] = typeof val == 'function' ? val.bind(this) : val;
                    }
                }

                this._internalContext = null;
                this._internalParentComponent = null;
            }

            for (var method in ComponentProto) {
                Comp.prototype[method] = ComponentProto[method];
            }
            Comp.prototype.componentWillMount = specification.componentWillMount;
            Comp.prototype.componentDidMount = specification.componentDidMount;
            Comp.prototype.componentWillReceiveProps = specification.componentWillReceiveProps;
            Comp.prototype.shouldComponentUpdate = specification.shouldComponentUpdate;
            Comp.prototype.componentWillUpdate = specification.componentWillUpdate;
            Comp.prototype.componentDidUpdate = specification.componentDidUpdate;
            Comp.prototype.componentWillUnmount = specification.componentWillUnmount;
            Comp.prototype.render = specification.render;
            Object.defineProperty(Comp.prototype, 'context', {get: getContext});
            Comp.displayName = specification.displayName;
            Comp.propTypes = specification.propTypes;
            Comp.defaultProps = defaultProps;
            if (specification.statics) {
                for (var i in specification.statics) {
                    Comp[i] = specification.statics[i];
                }
            }
            return Comp;
        },
        unmountComponentAtNode: function (container) {
            _exports.render(null, container);
        },
        createFactory: function (type) {
            return _exports.createElement.bind(null, type);
        },
        Children: {
            map: function (children, fn, thisArg) {
                return _exports.Children.toArray(children).map(fn, thisArg);
            },
            forEach: function (children, fn, thisArg) {
                return _exports.Children.toArray(children).forEach(fn, thisArg);
            },
            count: function (children) {
                return _exports.Children.toArray(children).length;
            },
            toArray: function (children) {
                var vdom = children;
                var ret = [];
                var type = vdom[0/*type*/];
                if (type == VChildren || type == VArray) {
                    var start = type == VArray ? 4/*arrayFirstNode*/ : 3/*VChildrenFirstNode*/;
                    for (var i = start; i < vdom.length; i++) {
                        ret = ret.concat(_exports.Children.toArray(vdom[i]));
                    }
                }
                else {
                    // return [children];
                    var tag = null;
                    var childs = null;
                    if (type == VComponent) {
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

                        tag = vdom[2/*Ctor*/];
                        childs = vdom.length == 8/*propsChildren*/ + 1 ? vdom[8/*propsChildren*/] : (vdom[7/*props*/] ? vdom[7/*props*/].children : null);
                    }
                    else if (type == VTag) {
                        /**
                         * VArrayTuple[type, parentNode, keyMap, sourceArray, ...values]
                         */
                        // 0/*type*/
                        // 1/*parentNode*/
                        // 2/*keymap*/
                        // 3/*sourceArray*/
                        // 4/*arrayFirstNode*/
                        childs = [VArray, null, null, null];
                        for (var i = 7/*attrsStartPos*/ + vdom[5/*attrsLen*/] * 2; i < vdom.length; i++) {
                            childs.push(norm(vdom[i]));
                        }
                        tag = vdom[2/*tag*/];
                    }
                    var props = getProps(vdom);
                    props.key = getKey(vdom);
                    props.ref = getRef(vdom);
                    props.children = childs;

                    return [{type: tag, key: getKey(vdom), ref: getRef(vdom), props: props}];
                }
                return ret;
            },
            only: function (children) {
                if (!_exports.isValidElement(children)) {
                    throw new Error('onlyChild must be passed a children with exactly one child.');
                }
                return children;
            }
        }
    };
    module.exports = _exports;
}();

//a.match(/\d+\/\*\w+\*\//g).filter(function(value, index, self) {return self.indexOf(value) === index})
