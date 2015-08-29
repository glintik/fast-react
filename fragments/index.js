!function (global) {
    var baseType = '\u2425';
    var VTag = baseType + 'T';
    var VText = baseType + '#';
    var VComponent = baseType + 'C';
    var VArray = baseType + 'A';
    //VTagTuple[type, node, tag, key, attrsLen, constAttrsLen, ...attrs, ...children]
    // 0/*type*/
    // 1/*node*/
    // 2/*tag*/
    // 3/*key*/
    // 4/*attrsLen*/
    // 5/*constAttrsLen*/
    var attrsStartPos = 6;

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
    // 5/*props*/
    // 7/*children*/
    // 8/*propsChildren*/
    var hasPropsChildrenLen = 9;

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

    function create(vdom, parent, pos, rootNode, before, topComponent) {

        //console.log("create", vdom);
        var type = vdom[0/*type*/];

        if (type == VText) {
            //VTextTuple[type, node, value]
            vdom[1/*node*/] = document.createTextNode(vdom[2/*text*/]);
            rootNode.insertBefore(vdom[1/*node*/], before);
        }
        else if (type == VArray) {
            //VArrayTuple[type, node, parentNode, keyMap, sourceArray, ...values]
            vdom[1/*parentNode*/] = rootNode;
            vdom[2/*keymap*/] = {};
            //vdom[1/*node*/] = rootNode.insertBefore(document.createComment('array'), before);
            //iterate source array
            var sourceArray = vdom[3/*sourceArray*/];
            for (var i = 0; i < sourceArray.length; i++) {
                var vdomPos = i + arrayStartPos;
                var _child = sourceArray[i];
                if (typeof _child == 'object' && _child && typeof _child[0] == 'string' && _child[0][0] == baseType) {
                    var child = vdom[vdomPos] = _child;
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
        //VArrayTuple[type, node, parentNode, keyMap, sourceArray, ...values]
        var rootNode = old[1/*parentNode*/];
        vdom[1/*parentNode*/] = rootNode;
        var keyMap = old[2/*keymap*/];
        vdom[2/*keymap*/] = keyMap;
        var oldLen = old.length;
        var sourceArray = vdom[3/*sourceArray*/];
        var lastNode = old[old.length - 1];
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
            var props = vdom[5/*props*/];
            component.componentWillReceiveProps(props);
            component.props = old[5/*props*/] = props;
            component.forceUpdate();
            //destroy(newNode);
        }
    }

    function createComponent(vdom, rootNode, before) {
        //todo: extend props
        var Ctor = vdom[2/*Ctor*/];
        //VComponentTuple[type, node, parentNode, Ctor, instance, props, children, ref, key?]
        vdom[1/*parentNode*/] = rootNode;
        var props = vdom[5/*props*/];
        var component = vdom[5/*instance*/] = new Ctor(props);
        component.node = vdom;
        component.componentWillMount();
        //todo: maybe norm?
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
        //todo: maybe norm?
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
                //todo: maybe norm?
                return create(vdom, null, null, rootNode, null);
            }
            var old = rootNode._vdom;
            return rootNode._vdom = update([VTag, null, old], 2/*templateFirstValue*/, old, vdom, null);
        }
    };
}(window);
