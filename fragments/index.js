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
    function VTemplate(render, argTypes, len, keyPos, refs) {
        this.render = render;
        this.argTypes = argTypes;
        this.len = len;
        this.keyPos = keyPos;
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
        create(parent[i], parent, i, this);
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

    function norm(child, vdom, pos) {
        if (child == null) {
            vdom[pos] = [typeText, null, ''];
            return vdom[pos];
        }
        if (typeof child == 'object' && child.constructor === Array && child[0] instanceof VDom) {
            return child;
        }
        if (child instanceof Array) {
            var p = new Array(child.length + 4);
            p[0] = typeArray;
            //p[2] = {};
            p[3] = child;
            return vdom[pos] = p;
        }
        vdom[pos] = [typeText, null, child];
        return vdom[pos];
    }

    function create(vdom, parent, pos, rootNode, before) {
        vdom = norm(vdom, parent, pos);

        //console.log("create", vdom);
        var type = vdom[0];
        var typeCtor = type.constructor;

        if (typeCtor == VTemplate) {
            //[type, node, ...values, ...refs, key]
            type.render(vdom, rootNode);
            if (rootNode) {
                rootNode.insertBefore(vdom[1], before);
            }
            if (type.keyPos > -1) {
                //parent should be array type
                parent[2/*keymap*/][vdom[type.keyPos]] = pos;
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
            //[type, node, keyMap, sourceArray,...values]
            vdom[1] = rootNode;
            vdom[2] = {};
            //iterate source array
            var sourceArray = vdom[3];
            for (var i = 0; i < sourceArray.length; i++) {
                vdom[i + 4] = sourceArray[i];
                create(sourceArray[i], vdom, i + 4, rootNode);
            }
            vdom[3] = null;
        }
        return vdom;
    }

    function update(oldParent, oldPos, parent, pos, old, vdom) {
        vdom = norm(vdom, parent, pos);
        //console.log("update", old, vdom);
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
                //console.log('argType', argType);
                if (argType[0] == 'children') {
                    update(old, i, vdom, i, old[i], vdom[i]);
                }
                else if (argType[0] == 'attr') {
                    //console.log("change attr");
                    if (vdom[i] !== old[i]) {
                        old[i] = vdom[i];
                        domEl.setAttribute(argType[1], vdom[i]);
                    }
                }
                else if (argType[0] == 'style') {
                    //console.log("change style");
                    if (vdom[i] !== old[i]) {
                        old[i] = vdom[i];
                        domEl.style[argType[1]] = vdom[i];
                    }
                }
                else if (argType[0] == 'attrs') {
                    //console.log("change attrs");
                    //todo: check diff
                    old[i] = vdom[i];
                    for (var attr in vdom[i]) {
                        if (vdom[i][attr] !== old[i][attr]) {
                            domEl.setAttribute(attr, vdom[i][attr]);
                        }
                    }
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
            //replace old child with new
            updateChildren(oldParent, oldPos, vdom);
        }
        return old;
    }

    function replace(oldParent, oldPos, parent, pos) {
        create(parent[pos], parent, pos, null);
        oldParent[oldPos][1].parentNode.replaceChild(parent[pos][1], oldParent[oldPos][1]);
        oldParent[oldPos] = parent[pos];
    }


    function updateChildren(oldParent, oldPos, vdom) {
        var old = oldParent[oldPos];
        vdom[1] = old[1];
        var keyMap = old[2];
        vdom[2] = keyMap;


        //[type, node, keyMap, sourceArray, ...values]
        var inserts = null;

        var fitCount = 0;
        var sourceArray = vdom[3];
        for (var i = 4; i < vdom.length; i++) {
            vdom[i] = sourceArray[i - 4];
            var newChild = norm(vdom[i], vdom, i);
            var fitPos = null;
            var newKey = null;
            var newChildType = newChild[0];
            if (old.length > i && old[i] != null) {
                var oldChildType = old[i][0];
            }
            if (newChildType.constructor == VTemplate && newChildType.keyPos > -1) {
                newKey = newChild[newChildType.keyPos];
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
                update(old, fitPos, vdom, i, old[fitPos], vdom[i]);
                //after update restore old
                vdom[i] = old[fitPos];
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
        vdom[3] = null; // clear source array

        if (old.length - 4 !== fitCount) {
            for (var i = 4; i < old.length; i++) {
                var oldChild = old[i];
                if (oldChild) {
                    keyMap[oldChild[keyMap.length - 1]] = null;
                    remove(oldChild, old, i)
                }
                old[i] = null;
            }
        }

        if (inserts) {
            for (var i = inserts.length - 1; i >= 0; i--) {
                var pos = inserts[i];

                if (pos == vdom.length - 1) {
                    var beforeChild = null;
                }
                else {
                    beforeChild = vdom[pos + 1][1];
                }

                if (vdom[pos][1]) {
                    move(old[1], vdom[pos], beforeChild);
                }
                else {
                    create(vdom[pos], vdom, pos, old[1], beforeChild);
                }
            }
        }
        oldParent[oldPos] = vdom;
    }

    function remove(vdom) {
        vdom[1].parentNode.removeChild(vdom[1]);
    }

    function move(parentNode, vdom, beforeChild) {
        if (vdom[1].nextSibling !== beforeChild) {
            parentNode.insertBefore(vdom[1], beforeChild);
        }
    }

    global.FastReact = {
        VTemplate: VTemplate,
        create: create,
        render: function (vdom, rootNode) {
            return create(vdom, [typeTemplate, null, vdom], 2, rootNode);
        },
        update: function (old, vdom) {
            return update([typeTemplate, null, old], 2, [typeTemplate, null, vdom], 2, old, vdom);
        }
    };
}(window);