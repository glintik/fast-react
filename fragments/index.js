!function (global) {
    var undef = 'undefined';
    var typeText = '#';
    var typeTemplate = 'template';
    var typeArray = 'array';
    var NodeProto = Node.prototype;
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
        norm(parent, i);
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

    function norm(vdom, i) {
        var child = vdom.values[i];
        if (typeof child == 'object' && child && typeof child.tag !== undef) {
            return;
        }
        if (child instanceof Array) {
            vdom.values[i] = {tag: typeArray, keyMap: {}, node: vdom.node, values: child};
            return;
        }
        vdom.values[i] = {tag: typeText, node: null, children: child};
    }


    function create(parent, pos, rootNode) {
        var vdom = parent.values[pos];
        //console.log("create", vdom, rootNode);
        if (typeof vdom.key !== undef) {
            parent.keyMap[vdom.key] = pos;
        }

        if (vdom.tag == typeTemplate) {
            vdom.template.render(vdom, rootNode);
        }
        else if (vdom.tag == typeText) {
            vdom.node = document.createTextNode(vdom.children);
            if (rootNode) {
                rootNode.appendChild(vdom.node);
            }
        }
        else if (vdom.tag == typeArray) {
            vdom.node = rootNode;
            for (var i = 0; i < vdom.values.length; i++) {
                create(vdom, i, rootNode);
            }
        }
        return vdom;
    }

    function update(old, parent, i) {
        var vdom = parent.values[i];
        //console.log("Update", vdom);
        vdom.node = old.node;
        if (vdom.tag !== old.tag) {
            replace(old, parent, i);
        }
        else if (vdom.tag == typeTemplate) {
            for (var i = 0; i < vdom.values.length; i++) {
                var type = vdom.template.argTypes[i];
                var dom = vdom.domNodes[i] = old.domNodes[i];
                var val = vdom.values[i];
                var oldVal = old.values[i];
                if (type[0] == 'attr') {
                    if (val !== oldVal) {
                        dom.setAttribute(type[1], val);
                    }
                }
                else if (type[0] == 'style') {
                    if (val !== oldVal) {
                        dom.style[type[1]] = val;
                    }
                }
                else if (type[0] == 'attrs') {
                    for (var attr in val) {
                        if (val[attr] !== oldVal[attr]) {
                            this.setAttribute(attr, val[attr]);
                        }
                    }
                }
                else if (type[0] == 'children') {
                    norm(vdom, i);
                    update(oldVal, vdom, i);
                }
            }
        }
        else if (vdom.tag == typeText) {
            if (vdom.children !== old.children) {
                vdom.node.textContent = vdom.children;
            }
        }
        else if (vdom.tag == typeArray) {
            updateChildren(old, vdom);
        }
        return vdom;
    }

    function replace(old, parent, i) {
        create(parent, i, null);
        old.node.parentNode.replaceChild(parent.values[i].node, old.node);
    }


    function updateChildren(old, vdom) {
        var oldChildren = old.values;
        var newChildren = vdom.values;
        var inserts = [];
        if (newChildren) {
            var fitCount = 0;
            for (var i = 0; i < newChildren.length; i++) {
                norm(vdom, i);
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
                    vdom.keyMap[vdom.values[i].key] = i;
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
        render: function (vdom, rootNode) {
            return create({values: [vdom]}, 0, rootNode);
        },
        update: function (old, vdom) {
            return update(old, {values: [vdom]}, 0);
        }
    };
}(window);
