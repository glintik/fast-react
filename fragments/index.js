!function (global) {
    var undef = 'undefined';
    var typeText = new VText();
    var typeArray = new VArray();
    var typeTemplate = new VTemplate(null, null);
    var NodeProto = Node.prototype;

    function VDom() {}

    function VText() {}

    VText.prototype = new VDom();
    function VArray() {}

    VArray.prototype = new VDom();
    function VTemplate(render, argTypes) {
        this.render = render;
        this.argTypes = argTypes;
    }

    VTemplate.prototype = new VDom();

    NodeProto.setAttr = function (attrName, attrVal) {
        this.setAttribute(attrName, attrVal);
        return this;
    };
    NodeProto.setStyle = function (attrName, attrVal) {
        this.style[attrName] = attrVal;
        return this;
    };
    NodeProto.setAttrs = function (attrs) {
        for (var i in attrs) {
            this.setAttribute(i, attrs[i]);
        }
        return this;
    };
    NodeProto.setRef = function (args, i) {
        args.domNodes[i] = this;
        return this;
    };

    NodeProto.addValueChild = function (parent, i) {
        create(parent, i, this);
        return this;
    };

    NodeProto.addChild = function (child) {
        if (child instanceof Node) {
            this.appendChild(child);
            return this;
        }
        this.appendChild(document.createTextNode(child));
        return this;
    };

    function norm(vdom, pos) {
        var child = vdom[pos];
        if (child == null) {
            vdom[pos] = ['', typeText];
            return;
        }
        if (typeof child == 'object' && child.constructor === Array && child[child.length - 1] instanceof VDom) {
            return;
        }
        if (child instanceof Array) {
            vdom[pos] = [child, {}, typeArray];
            return;
        }
        vdom[pos] = [child, typeText];
    }


    function create(parent, pos, rootNode) {
        norm(parent, pos);
        var vdom = parent[pos];
        var type = vdom[vdom.length - 1/*type*/].constructor;
        //console.log("create", vdom, rootNode);

        if (vdom[vdom.length - 2/*key*/] !== null) {
            parent[parent.length - 2/*keymap*/][vdom[vdom.length - 2/*key*/]] = pos;
        }

        if (type == VTemplate) {
            vdom[vdom.length - 1/*type*/].render(vdom, rootNode);
        }
        else if (type == VText) {
            vdom.node = document.createTextNode(vdom[0/*children*/]);
            if (rootNode) {
                rootNode.appendChild(vdom.node);
            }
        }
        else if (type == VArray) {
            vdom.node = rootNode;
            for (var i = 0; i < vdom.length; i++) {
                create(vdom, i, rootNode);
            }
        }
        return vdom;
    }

    function update(old, parent, pos) {
        norm(parent, pos);
        var vdom = parent[pos];
        var type = vdom[vdom.length - 1/*type*/].constructor;
        //console.log("Update", vdom);
        if (type !== old[old.length - 1/*type*/].constructor) {
            replace(old, parent, pos);
        }
        else if (type == VTemplate) {
            for (var i = 0; i < vdom.length - 2; i++) {
                var argType = vdom[vdom.length - 1/*type*/].argTypes[i];
                var dom = vdom.domNodes[i] = old.domNodes[i];
                var val = vdom[i];
                var oldVal = old[i];
                if (argType[0] == 'attr') {
                    if (val !== oldVal) {
                        dom.setAttribute(argType[1], val);
                    }
                }
                else if (argType[0] == 'style') {
                    if (val !== oldVal) {
                        dom.style[argType[1]] = val;
                    }
                }
                else if (argType[0] == 'attrs') {
                    for (var attr in val) {
                        if (val[attr] !== oldVal[attr]) {
                            this.setAttribute(attr, val[attr]);
                        }
                    }
                }
                else if (argType[0] == 'children') {
                    update(oldVal, vdom, i);
                }
            }
        }
        else if (type == VText) {
            if (vdom[0/*children*/] !== old[0/*children*/]) {
                vdom.node.textContent = vdom[0];
            }
        }
        else if (type == VArray) {
            //updateChildren(old, vdom);
        }
        return vdom;
    }

    function replace(old, parent, pos) {
        create(parent, pos, null);
        old.node.parentNode.replaceChild(parent[pos].node, old.node);
    }


    function updateChildren(old, vdom) {
        var oldChildren = old;
        var newChildren = vdom;
        var inserts = [];
        if (newChildren) {
            var fitCount = 0;
            for (var i = 0; i < newChildren.length; i++) {
                var fitPos = null;
                var newChild = newChildren[i]; // only use before update
                var oldChild = oldChildren && oldChildren[i];
                if (typeof old.keyMap == 'object') {
                    if (typeof newChild.key != undef) {
                        fitPos = old.keyMap[newChild.key];
                    }
                    else {
                        if (oldChild && typeof oldChild.key == undef) {
                            fitPos = i;
                        }
                    }
                }
                else if (oldChild) {
                    fitPos = i;
                }

                if (fitPos != null) {
                    fitCount++;
                    vdom[vdom.length - 2/*keymap*/][vdom[i][vdom[i].length - 2/*key*/]] = i;
                    update(oldChildren[fitPos], vdom, i);
                    if (fitPos !== i) {
                        inserts.push(i);
                    }
                    oldChildren[fitPos] = null;
                }
                else {
                    inserts.push(i);
                }
            }
        }

        if (oldChildren && oldChildren.length !== fitCount) {
            for (var i = 0; i < oldChildren.length; i++) {
                var oldChild = oldChildren[i];
                if (oldChild) {
                    remove(oldChild, old, i)
                }
                oldChildren[i] = null;
            }
        }


        for (var i = inserts.length - 1; i >= 0; i--) {
            var pos = inserts[i];

            if (i == newChildren.length - 1) {
                var beforeChild = null;
            }
            else {
                beforeChild = newChildren[pos + 1].node;
            }

            if (newChildren[pos].node) {
                move(vdom, newChildren[pos], beforeChild);
            }
            else {
                create(vdom, pos, null);
                move(vdom, newChildren[pos], beforeChild);
            }
        }
    }

    function remove(vdom) {
        vdom.node.parentNode.removeChild(vdom.node);
    }

    function move(parent, vdom, beforeChild) {
        if (vdom.node.nextSibling !== beforeChild) {
            parent.node.insertBefore(vdom.node, beforeChild);
        }
    }

    global.FastReact = {
        VTemplate: VTemplate,
        render: function (vdom, rootNode) {
            var parent = [vdom, typeTemplate];
            return create(parent, 0, rootNode);
        },
        update: function (old, vdom) {
            var parent = [vdom, typeTemplate];
            return update(old, parent, 0);
        }
    };
}(window);
