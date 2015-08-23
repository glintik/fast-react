!function (global) {
    function VDom() {}

    VDom.prototype.vdom = true;
    VDom.prototype.fragment = false;

    function VText() {}

    VText.prototype = new VDom();
    VText.prototype.constructor = VText;

    function VArray() {}

    VArray.prototype = new VDom();
    VArray.prototype.constructor = VArray;
    VArray.prototype.fragment = true;
    var arrayStart = 4;


    function VComponent() {}

    VComponent.prototype = new VDom();
    VComponent.prototype.constructor = VComponent;
    VComponent.prototype.fragment = true;

    function VTemplate(render, argTypes, len, keyPos, refs, origin) {
        this.render = render;
        this.argTypes = argTypes;
        this.len = len;
        this.keyPos = keyPos;
        this.refs = refs;
        this.origin = origin;
    }

    VTemplate.prototype = new VDom();
    VTemplate.prototype.constructor = VTemplate;

    //VTemplateTuple[type, node, ...values, ...refs, key?]
    // 0/*type*/
    // 1/*node*/
    // 2/*templateFirstValue*/
    // len - 1/*key*/

    //VTextTuple[type, node, value]
    // 0/*type*/
    // 1/*node*/
    // 2/*text*/

    //VArrayTuple[type, parentNode, keyMap, sourceArray, ...values]
    // 0/*type*/
    // 1/*parentNode*/
    // 2/*keymap*/
    // 3/*sourceArray*/

    // VComponentTuple[VComponent, parentNode, Ctor, instance, props, children, key?]
    // 0/*type*/
    // 1/*parentNode*/
    // 2/*Ctor*/
    // 3/*instance*/
    // 4/*props*/
    // 5/*children*/
    // len - 1/*key*/

    var typeText = new VText();
    var typeArray = new VArray();
    var typeComponent = new VComponent();
    var typeTemplate = new VTemplate(null, null);

    function norm(child, vdom, pos) {
        var newChild;
        if (child == null) {
            newChild = vdom[pos] = [typeText, null, 'Null'];
            return newChild;
        }
        if (typeof child == 'object' && child.constructor === Array && child.length > 0 && typeof child[0/*type*/].vdom == 'boolean') {
            return child;
        }
        if (child.constructor == Array) {
            //todo
            child.unshift(null);
            var p = new Array(child.length + arrayStart);
            p[0/*type*/] = typeArray;
            //p[2/*keymap*/] = {};
            p[3/*sourceArray*/] = child;
            vdom[pos] = p;
            return p;
        }
        newChild = vdom[pos] = [typeText, null, child];
        return newChild;
    }

    function setAttrs(dom, attrs) {
        for (var attr in attrs) {
            dom.setAttribute(attr, attrs[attr]);
        }
    }

    function create(vdom, parent, pos, rootNode, before) {
        //vdom = norm(vdom, parent, pos);

        //console.log("create", vdom);
        var type = vdom[0/*type*/];
        var typeCtor = type.constructor;

        if (typeCtor == VTemplate) {
            //VTemplateTuple[type, node, ...values, ...refs, key]
            type.render(vdom, rootNode);
            rootNode.insertBefore(vdom[1/*node*/], before);
            if (parent && type.keyPos > -1) {
                //parent should be array type
                parent[2/*keymap*/][vdom[vdom.length - 1/*key*/]] = pos;
            }
        }
        else if (typeCtor == VText) {
            //VTextTuple[type, node, value]
            vdom[1/*node*/] = document.createTextNode(vdom[2/*text*/]);
            rootNode.insertBefore(vdom[1/*node*/], before);
        }
        else if (typeCtor == VArray) {
            //VArrayTuple[type, node, keyMap, sourceArray,...values]
            vdom[1/*parentNode*/] = rootNode;
            vdom[2/*keymap*/] = {};
            //iterate source array
            var sourceArray = vdom[3/*sourceArray*/];
            for (var i = 0; i < sourceArray.length; i++) {
                var child = vdom[i + arrayStart] = norm(sourceArray[i], vdom, i + arrayStart);
                create(child, vdom, i + arrayStart, rootNode, before);
            }
            vdom[3/*sourceArray*/] = null;
        }
        else if (typeCtor == VComponent) {
            createComponent(vdom, rootNode, before);
        }
        return vdom;
    }

    function update(oldParent, oldPos, old, vdom) {
        //vdom = norm(vdom, parent, pos);
        //console.log("update", old, vdom);
        var type = vdom[0/*type*/];
        var typeCtor = type.constructor;
        //console.log("Update", vdom);
        if (typeCtor !== old[0/*type*/].constructor) {
            replace(oldParent, oldPos, old, vdom);
        }
        else if (typeCtor == VTemplate) {
            //VTemplateTuple[type, node, ...values, ...refs, key]
            for (var i = 2; i < type.len + 2; i++) {
                var argType = type.argTypes[i - 2];
                var domEl = old[type.refs[i - 2]];
                //console.log('argType', argType);
                var child = vdom[i];
                var oldChild = old[i];
                var argName = argType[0];
                if (argName == 'children') {
                    update(old, i, oldChild, norm(child, vdom, i));
                }
                else if (argName == 'attr') {
                    //console.log("change attr");
                    if (child !== oldChild) {
                        old[i] = child;
                        domEl.setAttribute(argType[1], child);
                    }
                }
                else if (argName == 'attrs') {
                    //console.log("change attrs");
                    //todo: check diff
                    old[i] = child;
                    for (var attr in child) {
                        if (child[attr] !== oldChild[attr]) {
                            domEl.setAttribute(attr, child[attr]);
                        }
                    }
                }
            }
        }
        else if (typeCtor == VText) {
            if (vdom[2/*text*/] !== old[2/*text*/]) {
                old[2/*text*/] = vdom[2/*text*/];
                old[1/*node*/].textContent = vdom[2/*text*/];
            }
        }
        else if (typeCtor == VArray) {
            //replace old child with new
            updateChildren(oldParent, oldPos, vdom);
        }
        else if (typeCtor == VComponent) {
            updateComponent(oldParent, oldPos, old, vdom);
        }
        return old;
    }

    function updateChildren(oldParent, oldPos, vdom) {
        //VArrayTuple[type, node, keyMap, sourceArray, ...values]
        var old = oldParent[oldPos];
        var rootNode = old[1/*parentNode*/];
        vdom[1/*parentNode*/] = rootNode;
        var keyMap = old[2/*keymap*/];
        vdom[2/*keymap*/] = keyMap;
        var oldLen = old.length;
        var sourceArray = vdom[3/*sourceArray*/];
        if (oldLen == arrayStart) {
            for (var i = arrayStart; i < sourceArray.length + arrayStart; i++) {
                create(vdom[i] = norm(sourceArray[i - arrayStart], vdom, i), vdom, i, rootNode, null);
            }
            oldParent[oldPos] = vdom;
            return;
        }
        if (vdom.length ==arrayStart) {
            for (var i = arrayStart; i < old.length; i++) {
                remove(old[i]);
            }
            oldParent[oldPos] = vdom;
            return;
        }

        var inserts = null;

        var fitCount = 0;
        var sourceArray = vdom[3/*sourceArray*/];
        for (var i = arrayStart; i < vdom.length; i++) {
            var newChild = norm(vdom[i] = sourceArray[i - arrayStart], vdom, i);
            var oldChild = old[i];
            var fitPos = null;
            var newKey = null;
            var newChildType = newChild[0/*type*/];
            if (old.length > i && oldChild != null) {
                var oldChildType = oldChild[0/*type*/];
            }
            if (newChildType.constructor == VTemplate && newChildType.keyPos > -1) {
                newKey = newChild[newChild.length - 1/*key*/];
                // fitPos = old.keyMap[newKey];
                fitPos = keyMap[newKey];
            }
            else {
                if (oldChildType && (oldChildType.constructor !== VTemplate || oldChildType.keyPos == -1)) {
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
                vdom[i] = update(old, fitPos, old[fitPos], newChild);
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
                keyMap[newKey] = i;
                if (inserts == null) {
                    inserts = [];
                }
                inserts.push(i);
            }
        }
        vdom[3/*sourceArray*/] = null; // clear source array

        var oldLenFull = oldLen - arrayStart;
        if (oldLenFull > fitCount) {
            for (var i = arrayStart; i < oldLen; i++) {
                var oldChild = old[i];
                if (oldChild) {
                    keyMap[oldChild[oldChild.length - 1/*key*/]] = null;
                    remove(oldChild);
                    old[i] = null;
                    if (oldLenFull == ++fitCount) {
                        break;
                    }
                }
            }
        }

        if (inserts) {
            for (var i = inserts.length - 1; i >= 0; i--) {
                var pos = inserts[i];
                var child = vdom[pos];

                if (pos == vdom.length - 1) {
                    var beforeChild = null;
                }
                else {
                    //todo: what if child is Component
                    beforeChild = vdom[pos + 1][1/*node*/];
                }

                if (child[1/*node*/]) {
                    move(rootNode, child, beforeChild);
                }
                else {
                    create(child, vdom, pos, rootNode, beforeChild);
                }
            }
        }
        oldParent[oldPos] = vdom;
    }


    function replace(oldParent, oldPos, old, vdom) {
        var Ctor = old[0/*type*/].constructor;
        if (old[0/*type*/].fragment) {
            var parentNode = old[1/*parentNode*/];
            if (Ctor == VArray) {
                //VArrayTuple[type, node, keyMap, sourceArray, ...values]
                var before = old[4/*arrayFirstNode*/][1/*node*/];
            }
            else if (Ctor == VComponent) {
                //VComponentTuple[VComponent, node, Ctor, instance, props, children, key]
                //todo: what if first Children is other component
                before = old[5/*children*/][1/*node*/];
            }
        }
        else {
            parentNode = old[1/*node*/].parentNode;
            before = old[1/*node*/];
        }
        create(vdom, null, null, parentNode, before);
        remove(old);
        oldParent[oldPos] = vdom;
    }

    function remove(vdom) {
        var type = vdom[0/*type*/];
        var Ctor = type.constructor;
        if (type.fragment) {
            if (Ctor == VArray) {
                //[type, node, keyMap, sourceArray, ...values]
                for (var i = arrayStart; i < vdom.length; i++) {
                    remove(vdom[i]);
                }
            }
            else if (Ctor == VComponent) {
                remove(vdom[5/*children*/]);
            }
        }
        else {
            vdom[1/*node*/].parentNode.removeChild(vdom[1/*node*/]);
        }
    }

    function move(parentNode, vdom, beforeChild) {
        if (vdom[0/*type*/].constructor == VComponent) {
            var node = vdom[5/*children*/][1/*node*/];
        }
        else {
            node = vdom[1/*node*/];
        }
        if (node.nextSibling !== beforeChild) {
            parentNode.insertBefore(node, beforeChild);
        }
    }


    function updateComponent(oldParent, oldPos, old, vdom) {
        //VComponentTuple[VComponent, node, Ctor, instance, props, children, key]
        if (old[2/*Ctor*/] !== vdom[2/*Ctor*/]) {
            replace(oldParent, oldPos, old, vdom);
        }
        else {
            var component = old[3/*instance*/];
            var props = vdom[4/*props*/];
            component.componentWillReceiveProps(props);
            component.props = old[4/*props*/] = props;
            component.forceUpdate();
            //destroy(newNode);
        }
    }

    function createComponent(vdom, rootNode, before) {
        //VComponentTuple[VComponent, node, Ctor, instance, props, children, key]
        vdom[1/*parentNode*/] = rootNode;
        var props = vdom[4/*props*/];
        var component = vdom[3/*instance*/] = new vdom[2/*Ctor*/](props);
        component.node = vdom;
        component.componentWillMount();
        vdom[5/*children*/] = norm(component.render(), vdom, 5/*children*/);
        var prevComponent = globs.component;
        globs.component = component;
        create(vdom[5/*children*/], null, null, vdom[1/*parentNode*/], before);
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
        //VComponentTuple[VComponent, node, Ctor, instance, props, children, key]
        this.componentWillUpdate();
        var prevComponent = globs.component;
        globs.component = this;
        update(this.node, 5/*children*/, this.node[5/*children*/], this.render());
        globs.component = prevComponent;
        this.componentDidUpdate();
    };

    var globs = {component: null};
    global.FastReact = {
        VTemplate: VTemplate,
        create: function (vdom, parent, pos, rootNode, before) {return create(norm(vdom, parent, pos), parent, pos, rootNode, before)},
        VComponent: typeComponent,
        Component: Component,
        findDOMNode: findDOMNode,
        setAttrs: setAttrs,
        render: function (vdom, rootNode) {
            return create(vdom, null, null, rootNode, null);
        },
        update: function (old, vdom) {
            return update([typeTemplate, null, old], 2/*templateFirstValue*/, old, vdom);
        }
    };
}(window);
