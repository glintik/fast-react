import {Test} from './helper';
import React,{findDOMNode, Component} from 'react';

var realMountNodes = [];
var expectMountNodes = [];

class Comp extends Component {
    render() {
        return <div ref={onMount}>{this.props.value}</div>;
    }
}

function RD(value) {
    expectMountNodes.push(`<div>${value}</div>`);
    return `<div>${value}</div>`;
}

function onMount(vdom) {
    realMountNodes.push(findDOMNode(vdom).outerHTML);
}

function d(value) {
    return <div ref={onMount}>{value}</div>;
}
function dk(value) {
    return <div ref={onMount} key={value}>{value}</div>;
}

function c(value) {
    return <Comp value={value}></Comp>;
}

function ck(value) {
    return <Comp key={value} value={value}></Comp>;
}

function rd(value) {
    return `<div>${value}</div>`;
}


class Top extends Component {
    render() {
        return <div>{this.props.values}</div>
    }
}


describe("Movings", () => {
    it('div with key and without', () => {
        new Test().clearMount(expectMountNodes, realMountNodes)
            .create(<Top values={[dk(0), dk(1), dk(2), dk(3), dk(4), dk(5)]}/>,
            rd([rd(0), rd(1), rd(2), rd(3), rd(4), rd(5)].join('')))

            .update(<Top values={[dk(0), dk(1), dk(2), dk(6), dk(3), dk(4), dk(5)]}/>,
            rd([rd(0), rd(1), rd(2), rd(6), rd(3), rd(4), rd(5)].join('')))

            .update(<Top values={[dk(5), d(7), dk(4), dk(6), dk(2), dk(1), dk(0)]}/>,
            rd([rd(5), rd(7), rd(4), rd(6), rd(2), rd(1), rd(0)].join('')))

            .update(<Top values={[dk(0), dk(1), d(2), dk(3), dk(4), dk(7), d(5)]}/>,
            rd([rd(0), rd(1), rd(2), rd(3), rd(4), rd(7), rd(5)].join('')))

            .update(<Top values={[d(7), dk(3), dk(2), dk(4), dk(0), dk(1), dk(5), d(6)]}/>,
            rd([rd(7), rd(3), rd(2), rd(4), rd(0), rd(1), rd(5), rd(6)].join('')))
    });

    it('components with key and without', () => {
        new Test().clearMount(expectMountNodes, realMountNodes)
            .create(<Top values={[ck(0), ck(1), ck(2), ck(3), ck(4), ck(5)]}/>,
            rd([rd(0), rd(1), rd(2), rd(3), rd(4), rd(5)].join('')))

            .update(<Top values={[ck(0), ck(1), ck(2), ck(6), ck(3), ck(4), ck(5)]}/>,
            rd([rd(0), rd(1), rd(2), rd(6), rd(3), rd(4), rd(5)].join('')))

            .update(<Top values={[ck(5), c(7), ck(4), ck(6), ck(2), ck(1), ck(0)]}/>,
            rd([rd(5), rd(7), rd(4), rd(6), rd(2), rd(1), rd(0)].join('')))

            .update(<Top values={[ck(0), ck(1), c(2), ck(3), ck(4), ck(7), c(5)]}/>,
            rd([rd(0), rd(1), rd(2), rd(3), rd(4), rd(7), rd(5)].join('')))

            .update(<Top values={[c(7), ck(3), ck(2), ck(4), ck(0), ck(1), ck(5), c(6)]}/>,
            rd([rd(7), rd(3), rd(2), rd(4), rd(0), rd(1), rd(5), rd(6)].join('')))
    });

    it('mix', () => {
        new Test().clearMount(expectMountNodes, realMountNodes)
            .create(<Top values={[ck(0), [ck(1)], ck(2), ck(3), dk(4), d(5)]}/>,
            rd([RD(0), RD(1), RD(2), RD(3), RD(4), RD(5)].join(''))).checkMount(expectMountNodes, realMountNodes)

            .update(<Top values={[c(0), [dk(1), ck(2)], [], dk(6), c(3), dk(4), ck(5)]}/>,
            rd([RD(0), RD(1), RD(2), RD(6), RD(3), rd(4), RD(5)].join(''))).checkMount(expectMountNodes, realMountNodes)

            .update(<Top values={[ck(5), [c(7), d(4), []], ck(6), ck(2), [], d(1), dk(0)]}/>,
            rd([rd(5), RD(7), RD(4), RD(6), RD(2), RD(1), RD(0)].join(''))).checkMount(expectMountNodes, realMountNodes)

            .update(<Top values={[[], dk(0), [ck(1), []], d(2), dk(3), dk(4), c(7), ck(5)]}/>,
            rd([rd(0), RD(1), RD(2), RD(3), RD(4), RD(7), rd(5)].join(''))).checkMount(expectMountNodes, realMountNodes)

            .update(<Top values={[d(7), dk(3), ck(2), dk(4), d(0), ck(1), dk(5), c(6)]}/>,
            rd([RD(7), rd(3), RD(2), rd(4), RD(0), RD(1), RD(5), RD(6)].join(''))).checkMount(expectMountNodes, realMountNodes)
    });

    it('spread mix', () => {
        function dk(value) {
            var props = {key: value, ref: onMount};
            return <div {...props}>{value}</div>;
        }

        function d(value) {
            var props = {ref: onMount};
            return <div {...props}>{value}</div>;
        }

        function ck(value) {
            var props = {key: value};
            return <Comp {...props} value={value}></Comp>;
        }

        function c(value) {
            var props = {};
            return <Comp {...props} value={value}></Comp>;
        }

        new Test().clearMount(expectMountNodes, realMountNodes)
            .create(<Top values={[ck(0), [ck(1)], ck(2), ck(3), dk(4), d(5)]}/>,
            rd([RD(0), RD(1), RD(2), RD(3), RD(4), RD(5)].join(''))).checkMount(expectMountNodes, realMountNodes)
            .update(<Top values={[c(0), [dk(1), ck(2)], [], dk(6), c(3), dk(4), ck(5)]}/>,
            rd([RD(0), RD(1), RD(2), RD(6), RD(3), rd(4), RD(5)].join(''))).checkMount(expectMountNodes, realMountNodes)

            .update(<Top values={[ck(5), [c(7), d(4), []], ck(6), ck(2), [], d(1), dk(0)]}/>,
            rd([rd(5), RD(7), RD(4), RD(6), RD(2), RD(1), RD(0)].join(''))).checkMount(expectMountNodes, realMountNodes)

            .update(<Top values={[[], dk(0), [ck(1), []], d(2), dk(3), dk(4), c(7), ck(5)]}/>,
            rd([rd(0), RD(1), RD(2), RD(3), RD(4), RD(7), rd(5)].join(''))).checkMount(expectMountNodes, realMountNodes)

            .update(<Top values={[d(7), dk(3), ck(2), dk(4), d(0), ck(1), dk(5), c(6)]}/>,
            rd([RD(7), rd(3), RD(2), rd(4), RD(0), RD(1), RD(5), RD(6)].join(''))).checkMount(expectMountNodes, realMountNodes)

    });
});