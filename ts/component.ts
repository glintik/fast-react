import {NodeType, VText, VTagNode, VNode, VComponent, VFragment} from './node';
import {append} from './append';
import {update} from './update';
import {updateChildren} from './update-children';
import {normChild, destroy} from './utils';
export let globs:{component: Component} = {component: null};

export interface IComponent {
    new(props:any): Component;
}

export interface Props {
    children: VNode[];
}

export class Component {
    node:VComponent;
    props:Props;
    refs:{[index: string]: VNode};

    constructor(props:Props) {
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
        var temp = <any>{type: NodeType.COMPONENT, lastNode: this.node.firstNode, firstNode: this.node.lastNode, ctor: null, component: null, attrs: null, children: children, key: null, dom: this.node.dom};
        let prevComponent = globs.component;
        globs.component = this;
        updateChildren(this.node, temp); // clear this.node.children
        globs.component = prevComponent;
        this.node.children = temp.children;
        this.componentDidUpdate();
        destroy(temp);
    }
}

export function findDOMNode(node:VTagNode | VText) {
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
    let prevComponent = globs.component;
    globs.component = component;
    if (node.children) {
        for (var i = 0; i < node.children.length; i++) {
            normChild(node, i);
            append(node, i);
        }
    }
    globs.component = prevComponent;
    node.component.componentDidMount();
}

export function updateComponent(old:VComponent, parent:VNode, childPos:number) {
    var newNode = <VComponent>parent.children[childPos];
    var props = newNode.attrs || {};
    props.children = newNode.children;
    old.component.componentWillReceiveProps(props);
    old.component.props = props;
    old.component.forceUpdate();	 // affect node children
    parent.children[childPos] = old;
    destroy(newNode);
    //newNode.destroy();
    //no destroy old
}
