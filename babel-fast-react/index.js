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
        var attrsArg = callArgs[1];
        var key = null;
        var ref = null;
        var isComponent = t.isIdentifier(tag) || t.isMemberExpression(tag);
        var base = '¨';
        var VT = { COMPONENT: base + 'C', TAG: base + 'T', TEXT: base + '#', COMPONENT_CHILDREN: base + 'F' };

        // type
        array.push(t.literal(isComponent ? VT.COMPONENT : VT.TAG));
        // node
        array.push(t.literal(null));
        // tag
        array.push(tag);

        var children = [];
        for (var i = 2; i < callArgs.length; i++) {
            var child = callArgs[i];
            if (t.isLiteral(child)) {
                var value = (child.value == null || typeof child.value == 'boolean') ? '' : child.value + '';
                //child = t.arrayExpression([t.literal(VT.TEXT), t.literal(null), t.literal(value)]);
            }
            children.push(child);
        }

        if (isComponent) {
            var newProps = [];
            if (t.isLiteral(attrsArg)) {

            }
            else if (t.isObjectExpression(attrsArg)) {
                var props = attrsArg.properties;
                for (var i = 0; i < props.length; i++) {
                    var keyNode = props[i].key;
                    var valueNode = props[i].value;
                    if (keyNode.name == 'key') {
                        key = valueNode;
                        continue;
                    }
                    if (keyNode.name == 'ref') {
                        ref = valueNode;
                        continue;
                    }
                    newProps.push(t.Property('init', keyNode, valueNode));
                }
            }
            else {
                return callExpr;
            }
            array.push(key || t.literal(null));
            array.push(ref || t.literal(null));
            // owner
            array.push(ref ? t.thisExpression() : t.literal(null));
            // instance
            array.push(t.literal(null));
            // children
            array.push(t.literal(null));

            if (children.length > 0) {
                newProps.push(t.Property('init', t.Identifier('children'), t.arrayExpression(children)));
            }
            // props
            var newPropsExpr = t.objectExpression(newProps);
            newPropsExpr._compact = true;
            array.push(newPropsExpr);
        }
        else {
            var constAttrs = [];
            var varAttrs = [];
            var hash = [];
            if (t.isLiteral(attrsArg)) {

            }
            else if (t.isObjectExpression(attrsArg)) {
                var attrs = attrsArg.properties;
                for (var i = 0; i < attrs.length; i++) {
                    var keyNode = attrs[i].key;
                    var valueNode = attrs[i].value;
                    if (keyNode.name == 'key') {
                        key = valueNode;
                        continue;
                    }
                    if (keyNode.name == 'ref') {
                        ref = valueNode;
                        continue;
                    }
                    if (keyNode.name == 'children') {
                        return callExpr;
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
            } else {
                return callExpr;
            }

            array.push(key || t.literal(null));
            array.push(ref || t.literal(null));
            // owner
            array.push(ref ? t.thisExpression() : t.literal(null));
            // hash
            array.push(t.literal(hash.join()));
            // len
            array.push(t.literal(varAttrs.length / 2 + constAttrs.length / 2));
            // const len
            array.push(t.literal(constAttrs.length / 2));
            // const attrs
            array = array.concat(constAttrs);
            // var attrs
            array = array.concat(varAttrs);
            // children
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
