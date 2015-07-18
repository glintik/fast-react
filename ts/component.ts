import {VText, VTagNode, VNode, VComponent, VFragment} from './node';
import {append} from './append';
import {update} from './update';
import {updateChildren} from './update-children';
import {normChild} from './utils';

export interface IComponent {
    new(props:any): Component;
}

export interface Props {
    children: VNode[];
}

export class Component {
    node:VComponent;
    props:Props;

    constructor(props: Props){
        this.props = props;
    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    componentWillUpdate() {

    }

    componentDidUpdate() {

    }

    //todo
    componentWillReceiveProps(props:Props) {

    }

    componentWillUnmount() {

    }

    render():VNode {
        return null;
    }

    forceUpdate() {
        this.componentWillUpdate();
        var children = [this.render()];
        var temp = new VComponent(null, null, children, null);
        temp.firstNode = this.node.firstNode;
        temp.lastNode = this.node.lastNode;
        temp.parentDom = this.node.parentDom;
        updateChildren(this.node, temp); // clear this.node.children
        this.node.children = children;
        this.componentDidUpdate();
        temp.destroy()
    }
}

export function findDOMNode(node: VTagNode | VText) {
    return node.dom;
}

export function createComponent(node:VComponent) {
    var props = node.attrs || {};
    props.children = node.children;
    var component = new node.ctor(props);
    component.node = node;
    node.component = component;
    component.componentWillMount();
    node.children = [component.render()];
}

export function updateComponent(old:VComponent, parent:VNode, childPos:number) {
    var newNode = <VComponent>parent.children[childPos];
    var props = newNode.attrs || {};
    props.children = newNode.children;
    old.component.componentWillReceiveProps(props);
    old.component.props = props;
    old.component.forceUpdate();	 // affect node children
    parent.children[childPos] = old;
    newNode.destroy();
    //no destroy old
}