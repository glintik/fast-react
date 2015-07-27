describe("Map", function () {

    beforeEach(function () {
        render('-------------', document.body);
    });

    function keyDiv(item) {
        return d('div', {key: item}, item);
    }

    function r() {
        var args = [].slice.call(arguments);
        args.unshift(null);
        args.unshift('div');
        return render(dv.apply(null, args), document.body);
    }

    function f() {
        var args = [].slice.call(arguments);
        args.unshift(null);
        args.unshift('@');
        return d.apply(null, args);
    }

    function dv() {
        var args = [].slice.call(arguments);
        args.unshift(null);
        args.unshift('div');
        return d.apply(null, args);
    }

    it('empty map', function () {
        var node = render(
            d('div', null, []), document.body);
        compare(node.dom, div());
    });

    it('simple same map', function () {
        var items = [1, 2, 3];
        var node = render(
            d('div', null,
                items.map(function (item) {
                    return d('div', {key: item}, item)
                })
            ), document.body);
        compare(node.dom, div(div(text(1)), div(text(2)), div(text(3))));

        items = [1, 2, 3];
        node = update(node,
            d('div', null,
                items.map(function (item) {
                    return d('div', {key: item}, item)
                })
            ));
        compare(node.dom, udiv(udiv(utext(1)), udiv(utext(2)), udiv(utext(3))));

    });

    it('reoder map 2', function () {
        var items = [1, 5, 4, 2, 7];
        var node = render(d('div', items.map(keyDiv)), document.body);

        items = [3, 2, 4, 1];
        node = update(node, d('div', null, items.map(keyDiv)));

        compare(node.dom, udiv(div(text(3)), udiv(utext(2)), udiv(utext(4)), udiv(utext(1))));
    });

    it('reoder map 3', function () {
        var items = [7, 1, 2, 3];
        var node = render(d('div', items.map(keyDiv)), document.body);

        items = [7, 2, 1];
        node = update(node, d('div', null, items.map(keyDiv)));

        compare(node.dom, udiv(div(text(7)), udiv(utext(2)), udiv(utext(1))));
    });

    it('reoder map 4', function () {
        var items = [];
        var node = render(
            dv(keyDiv(1), items.map(keyDiv)),
            document.body);

        items = [1, 2];
        node = update(node, d('div', null, items.map(keyDiv)));
        compare(node.dom, div(div(text(1)), div(text(2))));
    });

    it('reoder map 5', function () {
        var items = [2, 1];
        var node = render(d('div', items.map(keyDiv)), document.body);

        items = [1, 2];
        node = update(node, d('div', null, items.map(keyDiv)));
        compare(node.dom, div(div(text(1)), div(text(2))));
    });

    it('reoder map with fragment 1', function () {
        var node = update(
            r(dv(1), keyDiv(2), keyDiv(3)),
            dv(dv(1), dv(2), dv(3))
        );
        compare(node.dom, div(div(text(1)), div(text(2)), div(text(3))));
    });

    it('reoder map with fragment 2', function () {
        var node = update(
            r(dv(1), f(keyDiv(2), keyDiv(3))),
            dv(dv(1), f(dv(2), dv(3)))
        );
        compare(node.dom, div(div(text(1)), div(text(2)), div(text(3))));
    });

    it('reoder map with fragment 3', function () {
        var node = update(
            r(f(keyDiv(2), keyDiv(3)), dv(1)),
            dv(dv(1), f(dv(2), dv(3)))
        );
        compare(node.dom, div(div(text(1)), div(text(2)), div(text(3))));
    });

    it('reoder map with fragment 4', function () {
        var node = update(
            r(f(keyDiv(2), keyDiv(3)), dv(1)),
            dv(f(dv(1)), f(dv(2), dv(3)))
        );
        compare(node.dom, div(div(text(1)), div(text(2)), div(text(3))));
    });

    it('reoder map with fragment 5', function () {
        var node = update(
            r(f(keyDiv(2), keyDiv(6)), dv(1)),
            dv(f(dv(1)), f(dv(2), dv(3)))
        );
        compare(node.dom, div(div(text(1)), div(text(2)), div(text(3))));
    });

    it('reoder map with fragment 6', function () {
        var node = update(
            r(f(keyDiv(1), keyDiv(3)), dv(1)),
            dv(f(dv(1)), f(dv(2), dv(3)))
        );
        compare(node.dom, div(div(text(1)), div(text(2)), div(text(3))));
    });

    it('reoder map with fragment 7', function () {
        var node = update(
            r(f(f(dv(1))), f(keyDiv(3)), dv(f(1))),
            dv(dv(1), f(dv(2), dv(3)))
        );
        compare(node.dom, div(div(text(1)), div(text(2)), div(text(3))));
    });


    it('changed map', function () {
        var items = [1, 2, 3];
        var node = render(
            d('div', null,
                items.map(function (item) {
                    return d('div', {key: item}, item)
                })
            ), document.body);
        compare(node.dom, div(div(text(1)), div(text(2)), div(text(3))));

        items = [5, 3, 1, 4];
        node = update(node,
            d('div', null,
                items.map(function (item) {
                    return d('div', {key: item}, item)
                })
            ));
        compare(node.dom, udiv(div(text(5)), udiv(utext(3)), udiv(utext(1)), div(text(4))));


        items = [5, 2];
        var pp = d('div', null,
            items.map(function (item) {
                return d('div', {key: item}, 'b', d('@', null, item), 'a')
            })
        );
        node = update(node, pp);
        compare(node.dom,
            udiv(
                udiv(
                    text('b'), text(5), text('a')
                ),
                div(
                    text('b'), text(2), text('a')
                )
            )
        );

        items = [1, 2, 3];
        node = update(node,
            d('div', null,
                items.map(function (item) {
                    return d('div', {key: item}, item)
                })
            ));
        compare(node.dom, udiv(div(text(1)), udiv(text(2)), div(text(3))));
    });

    /* it('map without keys', function () {
         var node = render(
             d('div', null, [0, 1, 2, 3]), document.body);

         node = update(node,
             d('div', null, [0, 1, 2, 3]));

         compare(node.dom, udiv(text(0), text(1), text(2), text(3)));
     });*/
});
