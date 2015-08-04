!function (global) {
    var undef = 'undefined';
    var typeText = new VText();
    var typeArray = new VArray();
    var typeTemplate = new VTemplate(null, null);
    var NodeProto = Node.prototype;

    function VDom() {}

    function VText() {}

    VText.prototype = new VDom();
    VText.prototype.constructor = VText;

    function VArray() {}

    VArray.prototype = new VDom();
    VArray.prototype.constructor = VArray;
    function VTemplate(render, argTypes, len, hasKey, refs) {
        this.render = render;
        this.argTypes = argTypes;
        this.len = len;
        this.hasKey = hasKey;
        this.refs = refs;
    }

    VTemplate.prototype = new VDom();
    VTemplate.prototype.constructor = VTemplate;

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
    NodeProto.setRef = function (vdom, i) {
        vdom[i] = this;
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
            vdom[pos] = [typeText, null, ''];
            return;
        }
        if (typeof child == 'object' && child.constructor === Array && child[0] instanceof VDom) {
            return;
        }
        if (child instanceof Array) {
            vdom[pos] = new Array(child.length + 3);
            vdom[pos][0] = typeArray;
            vdom[pos][2] = {};
            for (var j = 0; j < child.length; j++) {
                vdom[pos][j + 3] = child[j];
            }
            return;
        }
        vdom[pos] = [typeText, null, child];
    }

    function create(parent, pos, rootNode) {
        norm(parent, pos);
        var vdom = parent[pos];
        console.log("create", vdom);
        var type = vdom[0];
        var typeCtor = type.constructor;

        if (typeCtor == VTemplate) {
            //[type, node, ...values, ...refs, key]
            type.render(vdom, rootNode);
            if (rootNode) {
                rootNode.appendChild(vdom[1]);
            }
            if (type.hasKey > -1) {
                //parent should be array type
                parent[2/*keymap*/][vdom[type.hasKey]] = pos;
            }
        }
        else if (typeCtor == VText) {
            //[type, node, value]
            vdom[1] = document.createTextNode(vdom[2]);
            if (rootNode) {
                rootNode.appendChild(vdom[1]);
            }
        }
        else if (typeCtor == VArray) {
            //[type, node, keyMap, ...values]
            vdom[1] = rootNode;
            for (var i = 3; i < vdom.length; i++) {
                create(vdom, i, rootNode);
            }
        }
        return vdom;
    }

    function update(oldParent, oldPos, parent, pos) {
        norm(parent, pos);
        var old = oldParent[oldPos];
        var vdom = parent[pos];
        console.log("update", old, vdom);
        var type = vdom[0/*type*/];
        var typeCtor = type.constructor;
        //console.log("Update", vdom);
        if (typeCtor !== old[0/*type*/].constructor) {
            replace(oldParent, oldPos, parent, pos);
        }
        else if (typeCtor == VTemplate) {
            for (var i = 2; i < type.len + 2; i++) {
                var argType = type.argTypes[i - 2];
                var domEl = old[type.refs[i - 2]];
                console.log('argType', argType);
                if (argType[0] == 'attr') {
                    console.log("change attr");
                    if (vdom[i] !== old[i]) {
                        old[i] = vdom[i];
                        domEl.setAttribute(argType[1], vdom[i]);
                    }
                }
                else if (argType[0] == 'style') {
                    console.log("change style");
                    if (vdom[i] !== old[i]) {
                        old[i] = vdom[i];
                        domEl.style[argType[1]] = vdom[i];
                    }
                }
                else if (argType[0] == 'attrs') {
                    console.log("change attrs");
                    //todo: check diff
                    old[i] = vdom[i];
                    for (var attr in vdom[i]) {
                        if (vdom[i][attr] !== old[i][attr]) {
                            domEl.setAttribute(attr, vdom[i][attr]);
                        }
                    }
                }
                else if (argType[0] == 'children') {
                    update(old, i, vdom, i);
                }
            }
        }
        else if (typeCtor == VText) {
            if (vdom[2/*children*/] !== old[2/*children*/]) {
                old[2] = vdom[2];
                old[1].textContent = vdom[2];
            }
        }
        else if (typeCtor == VArray) {
            //updateChildren(old, vdom);
        }
        return old;
    }

    function replace(oldParent, oldPos, parent, pos) {
        create(parent, pos, null);
        old.node.parentNode.replaceChild(parent[pos].node, oldParent[oldPos].node);
        oldParent[oldPos] = parent[pos];
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
                    update(oldChildren, fitPos, vdom, i);
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
            return create([typeTemplate, null, vdom], 2, rootNode);
        },
        update: function (old, vdom) {
            return update([typeTemplate, null, old], 2, [typeTemplate, null, vdom], 2);
        }
    };
}(window);
