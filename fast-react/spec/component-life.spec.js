import {Test} from './helper';
import React,{Component} from 'react';
var Constructor = 'constructor', Render = 'Render', WillMount = 'WillMount', didMount = 'didMount', willReceiveProps = 'willReceiveProps', willUpdate = 'willUpdate', didUpdate = 'didUpdate', willUnmount = 'willUnmount';
var callstack = [];
class TestComponent extends Component {
    constructor(props) {
        super(props);
        callstack.push([Constructor, this.constructor.name]);
    }

    render() {
        callstack.push([Render, this.constructor.name]);
    }

    componentWillMount() {
        callstack.push([WillMount, this.constructor.name]);
    }

    componentDidMount() {
        callstack.push([didMount, this.constructor.name])
    }

    componentWillReceiveProps() {
        callstack.push([willReceiveProps, this.constructor.name])
    }

    componentWillUpdate() {
        callstack.push([willUpdate, this.constructor.name])
    }

    componentDidUpdate() {
        callstack.push([didUpdate, this.constructor.name])
    }

    componentWillUnmount() {
        callstack.push([willUnmount, this.constructor.name])
    }
}

class Parent extends TestComponent {
    render() {
        super.render();
        return <Simple/>;
    }
}
var ParentName = Parent.name;


class Simple extends TestComponent {
    render() {
        super.render();
        return <div></div>;
    }
}
var SimpleName = Simple.name;

describe("Component callstack", function () {
    it('simple', ()=> {
        callstack = [];
        var test = new Test().create(<Simple/>);
        expect(callstack).toEqual([
            [Constructor, SimpleName],
            [WillMount, SimpleName],
            [Render, SimpleName],
            [didMount, SimpleName]
        ]);

        callstack = [];
        test.update(<Simple/>);
        expect(callstack).toEqual([
            [willReceiveProps, SimpleName],
            [willUpdate, SimpleName],
            [Render, SimpleName],
            [didUpdate, SimpleName]
        ]);
    });

    it('complex', ()=> {
        callstack = [];
        var test = new Test().create(<Parent/>);
        expect(callstack).toEqual([
            [Constructor, ParentName],
            [WillMount, ParentName],
            [Render, ParentName],
            [Constructor, SimpleName],
            [WillMount, SimpleName],
            [Render, SimpleName],
            [didMount, SimpleName],
            [didMount, ParentName]
        ]);

        callstack = [];
        test.update(<Parent/>);
        expect(callstack).toEqual([
            [willReceiveProps, ParentName],
            [willUpdate, ParentName],
            [Render, ParentName],
            [willReceiveProps, SimpleName],
            [willUpdate, SimpleName],
            [Render, SimpleName],
            [didUpdate, SimpleName],
            [didUpdate, ParentName]
        ]);
    });
});
