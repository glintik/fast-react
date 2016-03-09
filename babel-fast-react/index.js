function fastReact(obj) {
    var Plugin = obj.Plugin;
    var t = obj.types;

    function getFullName(node) {
        if (t.isMemberExpression(node)) {
            return getFullName(node.object) + '.' + getFullName(node.property);
        }
        if (t.isIdentifier(node)) {
            return node.name;
        }
        if (t.isLiteral(node)) {
            return node.value;
        }
        return '';
    }

    function React(callExpr) {
        var array = [];
        var callArgs = callExpr.arguments;
        var tag = callArgs[0];
        var attrs = callArgs[1];
        var key = t.literal(null);
        var ref = t.literal(null);
        var isComponent = t.isIdentifier(tag) || t.isMemberExpression(tag);
        var base = '¨';
        var VT = { COMPONENT: base + 'C', TAG: base + 'T', TEXT: base + '#', COMPONENT_CHILDREN: base + 'F' };

        array.push(t.literal(isComponent ? VT.COMPONENT : VT.TAG));
        //node
        array.push(t.literal(null));
        array.push(tag);
        var children = [];
        for (var i = 2; i < callArgs.length; i++) {
            var child = callArgs[i];
            if (t.isLiteral(child)) {
                var value = (child.value == null || typeof child.value == 'boolean') ? '' : child.value + '';
                child = t.arrayExpression([t.literal(VT.TEXT), t.literal(null), t.literal(value)]);
            }
            children.push(child);
        }

        var isSpread = false;
        if (isComponent) {
            if (children.length > 0) {
                children.unshift(t.thisExpression());
                //parentNode
                children.unshift(t.literal(null));
                children.unshift(t.literal(VT.COMPONENT_CHILDREN));
                var childrenExpr = t.arrayExpression(children);
            } else {
                childrenExpr = t.arrayExpression([t.literal(VT.TEXT), t.literal(null), t.literal('')]);
            }
            // instance
            array.push(t.literal(null));
            // children
            array.push(t.literal(null));

            if (t.isLiteral(attrs)) {
                attrs = t.objectExpression([]);
            }
            var isObject = t.isObjectExpression(attrs);
            if (isObject) {
                var _attrs = attrs.properties;
                for (var i = 0; i < _attrs.length; i++) {
                    var keyNode = _attrs[i].key;
                    var valueNode = _attrs[i].value;
                    if (keyNode.name == 'key') {
                        key = valueNode;
                        _attrs.splice(i, 1);
                        i--;
                    }
                    if (keyNode.name == 'ref') {
                        ref = valueNode;
                        _attrs.splice(i, 1);
                        i--;
                    }
                }
                attrs.properties.push(t.Property('init', t.Identifier('children'), childrenExpr));
            }
            array.push(attrs);

            if (!isObject) {
                array.push(childrenExpr);
            }

            array.splice(3, 0, key);
            array.splice(4, 0, ref);
        } else {
            var constAttrs = [];
            var varAttrs = [];
            var hash = [];
            if (t.isObjectExpression(attrs)) {
                var _attrs = attrs.properties;
                for (var i = 0; i < _attrs.length; i++) {
                    if (_attrs[i].key.name == 'ref') {
                        isSpread = true;
                        break;
                    }
                }
                if (!isSpread) {
                    for (var i = 0; i < _attrs.length; i++) {
                        var keyNode = _attrs[i].key;
                        var valueNode = _attrs[i].value;
                        if (keyNode.name == 'key') {
                            key = valueNode;
                            continue;
                        }
                        keyNode = t.isLiteral(keyNode) ? keyNode : t.literal(keyNode.name);

                        if (t.isLiteral(valueNode)) {
                            constAttrs.push(keyNode);
                            constAttrs.push(valueNode);
                            hash.push(keyNode.value + '=' + valueNode.value);
                        } else {
                            varAttrs.push(keyNode);
                            varAttrs.push(valueNode);
                            hash.push('&' + keyNode.value);
                        }
                    }
                }
            } else {
                isSpread = true;
            }
            if (isSpread && !t.isLiteral(attrs)) {
                var prop = t.Property('init', t.Identifier('$refComponent'), t.thisExpression());
                var obj = t.ObjectExpression([prop]);
                if (t.isObjectExpression(attrs)) {
                    //attrs.properties.push(prop);
                } else if (t.isCallExpression(attrs)) {
                    //attrs.arguments.push(obj);
                } else if (t.isIdentifier(attrs) || t.isMemberExpression(attrs)) {
                    //todo
                    //attrs = attrs;//t.callExpression(t.identifier('_extends'), [t.objectExpression([]), attrs, obj]);
                }
                varAttrs.push(t.literal(null));
                varAttrs.push(attrs);
                hash.push("~");
            }
            array.push(t.literal(hash.join()));
            array.push(t.literal(varAttrs.length / 2 + constAttrs.length / 2));
            array.push(t.literal(constAttrs.length / 2));
            array = array.concat(constAttrs);
            array = array.concat(varAttrs);
            array.splice(3, 0, key);
            array = array.concat(children);
        }
        return t.arrayExpression(array);
    }

    return new Plugin("babel-fast-react", {
        visitor: {
            CallExpression: function (node, parent, scope, file) {
                var name = getFullName(node.callee);
                if (name == 'React.createElement' || name == '_react2.default.createElement') {
                    return React(node);
                }
            }
        }
    });
}
module.exports = fastReact;
