import {Component} from 'react';
import {render, findDOMNode} from 'react-dom';
export class Test {
    constructor(vdom) {}

    create(vdom, html, props) {
        this.div = document.body.appendChild(document.createElement('div'));
        this.node = render(vdom, this.div);
        if (html) {
            this.toBe(html, props);
        }
        return this;
    }

    prepareHTML(html){
        return html.replace(/ :=".*?"/g, '').replace(/ data-reactroot=""/g, '').replace(/<!-(.*?)->/g, '').replace(/\s+/g, ' ')
    }

    checkMount(expectMountNodes, realMountNodes){
        expectMountNodes = expectMountNodes.map(node => this.prepareHTML(node));
        realMountNodes = realMountNodes.map(node => this.prepareHTML(node));
        for (var i = 0; i < expectMountNodes.length; i++) {
            var eNode = expectMountNodes[i];
            var found = realMountNodes.indexOf(eNode) > -1;
            if (!found){
                expect(null).toBe(eNode);
            }
        }
        for (var i = 0; i < realMountNodes.length; i++) {
            var eNode = realMountNodes[i];
            var found = expectMountNodes.indexOf(eNode) > -1;
            if (!found){
                expect(eNode).toBe(null);
            }
        }
        //expect(expectMountNodes).toEqual(realMountNodes);
        expectMountNodes.length = 0;
        realMountNodes.length = 0;
        return this;
    }

    clearMount(expectMountNodes, realMountNodes){
        expectMountNodes.length = 0;
        realMountNodes.length = 0;
        return this;
    }

    toBe(html, props) {
        var realHTML = this.prepareHTML(this.div.innerHTML);
        var expectedHTML = this.prepareHTML(html);
        expect(realHTML).toBe(expectedHTML);
        var dom = findDOMNode(this.node);
        for (var prop in props){
            expect(dom[prop]).toBe(props[prop]);
        }
        return this;
    }

    debug() {
        this.div;
        this.node;
        debugger;
        return this;
    }

    update(vdom, html, props) {
        this.node = render(vdom, this.div);
        if (html) {
            this.toBe(html, props);
        }
        return this;
    }
}