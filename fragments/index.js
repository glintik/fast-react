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

    //VArrayTuple[type, node, parentNode, keyMap, sourceArray, ...values]
    // 0/*type*/
    // 1/*node*/
    // 2/*parentNode*/
    // 3/*keymap*/
    // 4/*sourceArray*/
    // 5/*arrayFirstNode*/

    //VComponentTuple[type, node, parentNode, Ctor, instance, props, children, ref, key?]
    // 0/*type*/
    // 1/*node*/
    // 2/*parentNode*/
    // 3/*Ctor*/
    // 4/*instance*/
    // 5/*props*/
    // 6/*children*/
    // 7/*ref*/
    // len - 1/*key*/

    var arrayStart = 5;

    var typeText = new VText();
    var typeArray = new VArray();
    var typeComponent = new VComponent();
    var typeTemplate = new VTemplate(null, null);

    function norm(child, vdom, pos) {
        var newChild;
        if (child == null) {
            newChild = vdom[pos] = [typeText, null, ''];
            return newChild;
        }
        if (typeof child == 'object' && child.constructor === Array && child.length > 0 && typeof child[0/*type*/].vdom == 'boolean') {
            return child;
        }
        if (child.constructor == Array) {
            if (child.length == 0) {
                child = [null];
            }
            var p = new Array(child.length + arrayStart);
            p[0/*type*/] = typeArray;
            //p[3/*keymap*/] = {};
            p[4/*sourceArray*/] = child;
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

    function setRef(component, name, node) {
        if (!component.refs) {
            component.refs = {};
        }
        component.refs[name] = node;
    }

    function create(vdom, parent, pos, rootNode, before, topComponent) {
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
                parent[3/*keymap*/][vdom[vdom.length - 1/*key*/]] = pos;
            }
        }
        else if (typeCtor == VText) {
            //VTextTuple[type, node, value]
            vdom[1/*node*/] = document.createTextNode(vdom[2/*text*/]);
            rootNode.insertBefore(vdom[1/*node*/], before);
        }
        else if (typeCtor == VArray) {
            //VArrayTuple[type, node, parentNode, keyMap, sourceArray, ...values]
            vdom[2/*parentNode*/] = rootNode;
            vdom[3/*keymap*/] = {};
            //vdom[1/*node*/] = rootNode.insertBefore(document.createComment('array'), before);
            //iterate source array
            var sourceArray = vdom[4/*sourceArray*/];
            for (var i = 0; i < sourceArray.length; i++) {
                var child = vdom[i + arrayStart] = norm(sourceArray[i], vdom, i + arrayStart);
                create(child, vdom, i + arrayStart, rootNode, before, topComponent);
            }
            vdom[4/*sourceArray*/] = null;
        }
        else if (typeCtor == VComponent) {
            createComponent(vdom, rootNode, before);
        }
        return vdom;
    }

    function update(oldParent, oldPos, old, vdom, topComponent) {
        //vdom = norm(vdom, parent, pos);
        //console.log("update", old, vdom);
        var type = vdom[0/*type*/];
        var typeCtor = type.constructor;
        //console.log("Update", vdom);
        if (typeCtor !== old[0/*type*/].constructor) {
            replace(oldParent, oldPos, old, vdom, topComponent);
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
                    update(old, i, oldChild, norm(child, vdom, i), topComponent);
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
            updateChildren(oldParent, oldPos, old, vdom, topComponent);
        }
        else if (typeCtor == VComponent) {
            updateComponent(oldParent, oldPos, old, vdom);
        }
        return oldParent[oldPos];
    }

    function updateChildren(oldParent, oldPos, old, vdom, topComponent) {
        //VArrayTuple[type, node, parentNode, keyMap, sourceArray, ...values]
        var rootNode = old[2/*parentNode*/];
        vdom[2/*parentNode*/] = rootNode;
        var keyMap = old[3/*keymap*/];
        vdom[3/*keymap*/] = keyMap;
        var oldLen = old.length;
        var sourceArray = vdom[4/*sourceArray*/];
        var lastNode = old[old.length - 1];
        /*if (oldLen == arrayStart) {
         for (var i = arrayStart; i < sourceArray.length + arrayStart; i++) {
         create(vdom[i] = norm(sourceArray[i - arrayStart], vdom, i), vdom, i, rootNode, null);
         }
         oldParent[oldPos] = vdom;
         return;
         }
         if (vdom.length == arrayStart) {
         for (var i = arrayStart; i < old.length; i++) {
         remove(rootNode, old[i]);
         }
         oldParent[oldPos] = vdom;
         return;
         }
         */
        var inserts = null;

        var fitCount = 0;
        for (var i = arrayStart; i < vdom.length; i++) {
            vdom[i] = sourceArray[i - arrayStart];
            var newChild = norm(vdom[i], vdom, i);
            var oldChild = old[i];
            var fitPos = null;
            var newKey = null;
            var oldChildType = null;
            var newChildType = newChild[0/*type*/];
            if (old.length > i && oldChild != null) {
                oldChildType = oldChild[0/*type*/];
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
                keyMap[newKey] = i;
                if (inserts == null) {
                    inserts = [];
                }
                inserts.push(i);
            }
        }
        vdom[4/*sourceArray*/] = null; // clear source array

        var oldLenFull = oldLen - arrayStart;
        if (oldLenFull > fitCount) {
            for (i = arrayStart; i < oldLen; i++) {
                oldChild = old[i];
                if (oldChild) {
                    keyMap[oldChild[oldChild.length - 1/*key*/]] = null;
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
                    var beforeChild = getLastNode(lastNode).nextSibling;
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
        if (vdom[0/*type*/].fragment) {
            while (true) {
                var type = vdom[0/*type*/];
                if (type.constructor == VArray) {
                    vdom = vdom[5/*arrayFirstNode*/];
                }
                else if (type.constructor == VComponent) {
                    vdom = vdom[6/*children*/];
                }
                if (!vdom[0/*type*/].fragment) {
                    break;
                }
            }
        }
        return vdom[1/*node*/];
    }

    function getLastNode(vdom) {
        if (vdom[0/*type*/].fragment) {
            while (true) {
                var type = vdom[0/*type*/];
                if (type.constructor == VArray) {
                    vdom = vdom[vdom.length - 1];
                }
                else if (type.constructor == VComponent) {
                    vdom = vdom[6/*children*/];
                }
                if (!vdom[0/*type*/].fragment) {
                    break;
                }
            }
        }
        return vdom[1/*node*/];
    }

    function replace(oldParent, oldPos, old, vdom, topComponent) {
        if (old[0/*type*/].fragment) {
            var parentNode = old[2/*parentNode*/];
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
        var Ctor = type.constructor;
        if (type.fragment) {
            if (Ctor == VArray) {
                //VArrayTuple[type, node, parentNode, keyMap, sourceArray, ...values]
                for (var i = arrayStart; i < vdom.length; i++) {
                    remove(vdom[2/*parentNode*/], vdom[i]);
                }
            }
            else if (Ctor == VComponent) {
                remove(vdom[2/*parentNode*/], vdom[6/*children*/]);
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
        var component = old[4/*instance*/];
        if (old[3/*Ctor*/] !== vdom[3/*Ctor*/]) {
            replace(oldParent, oldPos, old, vdom, component);
        }
        else {
            var props = vdom[5/*props*/];
            component.componentWillReceiveProps(props);
            component.props = old[5/*props*/] = props;
            component.forceUpdate();
            //destroy(newNode);
        }
    }

    function createComponent(vdom, rootNode, before) {
        var Ctor = vdom[3/*Ctor*/];
        //VComponentTuple[type, node, parentNode, Ctor, instance, props, children, ref, key?]
        //vdom[1/*node*/] = rootNode.insertBefore(document.createComment(Ctor.name), before);
        vdom[2/*parentNode*/] = rootNode;
        var props = vdom[5/*props*/];
        var component = vdom[4/*instance*/] = new Ctor(props);
        component.node = vdom;
        component.componentWillMount();
        vdom[6/*children*/] = norm(component.render(), vdom, 6/*children*/);
        var prevComponent = globs.component;
        globs.component = component;
        create(vdom[6/*children*/], null, null, vdom[2/*parentNode*/], before, component);
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
        update(this.node, 6/*children*/, this.node[6/*children*/], this.render(), this);
        globs.component = prevComponent;
        this.componentDidUpdate();
    };

    var globs = {component: null};
    global.FastReact = {
        VTemplate: VTemplate,
        create: function (vdom, parent, pos, rootNode, before) {return create(norm(vdom, parent, pos), parent, pos, rootNode, before, null)},
        VComponent: typeComponent,
        Component: Component,
        findDOMNode: findDOMNode,
        setAttrs: setAttrs,
        setRef: setRef,
        render: function (vdom, rootNode) {
            if (typeof rootNode._vdom == 'undefined') {
                rootNode._vdom = vdom;
                return global.FastReact.create(vdom, null, null, rootNode, null);
            }
            var old = rootNode._vdom;
            return rootNode._vdom = update([typeTemplate, null, old], 2/*templateFirstValue*/, old, vdom, null);
        },
        update: function (old, vdom) {
            return update([typeTemplate, null, old], 2/*templateFirstValue*/, old, vdom, null);
        }
    };
}(window);
