describe("Component", function () {
    var callstack = [];
    DEBUG = false;
    var Constructor = 'constructor', Render = 'Render', WillMount = 'WillMount', didMount = 'didMount', willReceiveProps = 'willReceiveProps', willUpdate = 'willUpdate', didUpdate = 'didUpdate', willUnmount = 'willUnmount';
    Component.prototype.componentWillMount = function () {callstack.push([WillMount, this.constructor])};
    Component.prototype.componentDidMount = function () {callstack.push([didMount, this.constructor])};

    Component.prototype.componentWillReceiveProps = function () {callstack.push([willReceiveProps, this.constructor])};
    Component.prototype.componentWillUpdate = function () {callstack.push([willUpdate, this.constructor])};
    Component.prototype.componentDidUpdate = function () {callstack.push([didUpdate, this.constructor])};

    Component.prototype.componentWillUnmount = function () {callstack.push([willUnmount, this.constructor])};

    function createComponent(cmp, name) {
        var fn = function (props) {
            callstack.push([Constructor, this.constructor]);
            Component.call(this, props);
            cmp.init && cmp.init.call(this);
        };
        fn.prototype = new Component();
        fn.prototype.constructor = fn;
        for (var method in cmp) {
            fn.prototype[method] = cmp[method];
        }
        var render = fn.prototype.render;
        fn.prototype.render = function () {
            callstack.push([Render, fn]);
            return render();
        };
        fn.displayName = name;
        return fn;
    }

    var cmp;
    var subcmp;

    var CmpSimple = createComponent({
        render: function () {
            return d('div', null, 1, 2, 3);
        }
    }, 'CmpSimple');


    var Cmp = createComponent({
        init: function () {
            cmp = this;
            this.counter = 0;
        },
        render: function () {
            this.counter++;
            return d('div', null, 'cmp', 1, d(SubCmp, {subprop: this.counter}), 3);
        }
    }, 'Cmp');

    var SubCmp = createComponent({
        init: function () {
            subcmp = this;
        },
        render: function () {
            return d('div', null, 'subcmp', 4, 5, 6);
        }
    }, 'SubCmp');

    beforeEach(function () {
        callstack = [];
    });

    it('rerender component', function () {
        var node = render(
            d('div', null, d(CmpSimple)), document.body);
        compare(node.dom, div(div(text(1), text(2), text(3))));
        expect(callstack).toEqual([
            [Constructor, CmpSimple],
            [WillMount, CmpSimple],
            [Render, CmpSimple],
            [didMount, CmpSimple]
        ]);

        callstack = [];
        node = update(node,
            d('div', null, d(CmpSimple)));

        compare(node.dom, udiv(udiv(utext(1), utext(2), utext(3))));
        expect(callstack).toEqual([
            [willReceiveProps, CmpSimple],
            [willUpdate, CmpSimple],
            [Render, CmpSimple],
            [didUpdate, CmpSimple]
        ]);


    });


    it('sub component', function () {
        var node = render(
            d('div', null, d(Cmp)), document.body);

        expect(callstack).toEqual([
            [Constructor, Cmp],
            [WillMount, Cmp],
            [Render, Cmp],
            [Constructor, SubCmp],
            [WillMount, SubCmp],
            [Render, SubCmp],
            [didMount, SubCmp],
            [didMount, Cmp],
        ]);
    });


    it('component props', function () {

        var node = render(
            d('div', null, d(Cmp)), document.body);

        expect(cmp.props.children).toBeFalsy();
        cmp.forceUpdate();
        expect(cmp.props.children).toBeFalsy();
        expect(cmp.props).toEqual({children: null});

        node = update(node,
            d('div', null, d(Cmp, {hello: true}, 1, 2, 3)));

        expect(cmp.props.hello).toBe(true);
        expect(cmp.props.children).not.toBeFalsy();
    });


    it('component forceUpdate', function () {

        var node = render(
            d('div', null, d(Cmp)), document.body);

        callstack = [];
        cmp.forceUpdate();

        expect(callstack).toEqual([
            [willUpdate, Cmp],
            [Render, Cmp],

            [willReceiveProps, SubCmp],
            [willUpdate, SubCmp],
            [Render, SubCmp],
            [didUpdate, SubCmp],

            [didUpdate, Cmp],
        ]);

        callstack = [];
        subcmp.forceUpdate();

        expect(callstack).toEqual([
            [willUpdate, SubCmp],
            [Render, SubCmp],
            [didUpdate, SubCmp],
        ]);
    });

    it('unmount', function () {
        var node = render(
            d('div', null, d(Cmp)), document.body);

        callstack = [];
        cmp.forceUpdate();

        expect(callstack).toEqual([
            [willUpdate, Cmp],
            [Render, Cmp],

            [willReceiveProps, SubCmp],
            [willUpdate, SubCmp],
            [Render, SubCmp],
            [didUpdate, SubCmp],

            [didUpdate, Cmp],
        ]);

        callstack = [];

        node = update(node, d('div'));
        compare(node.dom, udiv());

        //subcmp.forceUpdate();

        expect(callstack).toEqual([
            [willUnmount, Cmp],
            [willUnmount, SubCmp],
        ]);
    });

    it('replace component with unique', function () {
        var node = render(
            d('div', null, d(CmpSimple, {key: 1})), document.body);

        node = update(node,
            d('div', null, d(CmpSimple, {key: 2})));

        compare(node.dom, udiv(div(text(1), text(2), text(3))));
    });


});
