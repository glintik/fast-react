/**
 * ------------------ The Life-Cycle of a Composite Component ------------------
 *
 * + constructor: Initialization of state. The instance is now retained.
 *   + componentWillMount
 *   + render
 *   + [children's constructors]
 *     + [children's componentWillMount and render]
 *     + [children's componentDidMount]
 *     + componentDidMount
 *
 *       Update Phases:
 *       + componentWillReceiveProps (only called if parent updated)
 *       - shouldComponentUpdate
 *         + componentWillUpdate
 *           + render
 *           + [children's constructors or receive props phases]
 *         + componentDidUpdate
 *
 *     + componentWillUnmount
 *     + [children's componentWillUnmount]
 *   - [children destroyed]
 * - (destroyed): The instance is now blank, released by React and ready for GC.
 *
 * -----------------------------------------------------------------------------
 */
import {updateChildren, updateDom} from './update';
import {VComponent, VFragmentNode} from './node';
import {DEBUG} from './utils';


export function findDOMNode(vdom) {
    return vdom.dom;
}

export function Component(props) {
    this.props = props;
}

Component.prototype.componentWillMount = function () {};
Component.prototype.componentDidMount = function () {};

Component.prototype.componentWillReceiveProps = function () {};
Component.prototype.componentWillUpdate = function () {};
Component.prototype.componentDidUpdate = function () {};

Component.prototype.componentWillUnmount = function () {};

Component.prototype.forceUpdate = function () {
    this.updateProps(this.props);
};

Component.prototype.updateProps = function (props) {
    this.componentWillUpdate(props);
    //var oldProps = this.props;
    this.props = props;
    var newNode = new VComponent(this.constructor, null, [this.render()], null);
    updateDom(this.node, newNode);
    updateChildren(this.node, newNode);
    this.node.children = newNode.children;
    //todo:componentDidUpdate(object prevProps, object prevState)
    this.componentDidUpdate(this.props);
};


export function updateComponent(old, vdom) {
    vdom.component = old.component;
    var props = vdom.attrs || {};
    props.children = vdom.children ? new VFragmentNode('@', null, vdom.children) : null;
    vdom.component.componentWillReceiveProps(props);
    vdom.component.updateProps(props);
    //vdom.children = vdom.component.node.children;
}

export function createComponent(vdom) {
    var props = vdom.attrs || {};
    props.children = vdom.children;
    vdom.component = new vdom.tag(props);
    vdom.component.componentWillMount();
    vdom.children = [vdom.component.render()];
    vdom.component.node = vdom;
    DEBUG && console.log(vdom);
}

export function destroyComponent(vdom) {
    vdom.component.componentWillUnmount();
}

export function mountComponent(vdom) {
    vdom.component.componentDidMount();
}

