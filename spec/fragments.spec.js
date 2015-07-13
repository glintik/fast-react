describe("Fragments", function () {

    it('replace node with fragment', function () {
        var node = render(
            d('div', null,
                'Hello',
                d('div', null, 'World')
            ), document.body);
        compare(node.dom, div(text('Hello'), div(text('World'))));

        node = update(node,
            d('div', null,
                d('@', null, 1, 2, 3),
                'Boom'
            ));
        compare(node.dom, udiv(text(1), text(2), text(3), text('Boom')));
    });

    it('replace fragment with fragment', function () {
        var node = render(
            d('div', null,
                'Hello',
                d('@', null, 1, 2, 3),
                'World'
            ), document.body);
        compare(node.dom, div(text('Hello'), text(1), text(2), text(3), text('World')));

        node = update(node,
            d('div', null,
                'Hello',
                d('@', null, 4, 5, 6),
                'World'
            ));
        compare(node.dom, udiv(utext('Hello'), utext(4), utext(5), utext(6), utext('World')));
    });


    it('replace deep fragment with deep fragment', function () {
        var node = render(
            d('div', null,
                'Hello',
                0,
                d('@', null,
                    1,
                    d('@', null,
                        4,
                        d('@', null, 7, 8),
                        5),
                    3),
                'World'), document.body);
        compare(node.dom, div(text('Hello'), text(0), text(1), text(4), text(7), text(8), text(5), text(3), text('World')));

        node = update(node,
            d('div', null,
                'Hello',
                d('@', null, 3, 4),
                d('@', null,
                    1,
                    d('@', null,
                        d('@', null, 7, 8),
                        4,
                        5),
                    3),
                'World'));
        compare(node.dom, udiv(utext('Hello'), text(3), text(4), utext(1), text(7), text(8), text(4), utext(5), utext(3), utext('World')));
    });

    it("replace fragment with node", function () {
        var node = render(
            d('div', null,
                d('@', null,
                        1,
                        d('@', null, 4, 5, 6),
                        3
                )), document.body);

        compare(node.dom, div(text(1), text(4), text(5), text(6), text(3)));

        node = update(node,
            d('div', null,
                d('@', null,
                    1, 2, 3)));
        compare(node.dom, udiv(utext(1), text(2), utext(3)));
    });

    it("set attrs", function () {
        var node = render(
            d('div', null,
                d('@', {class: 'cls'}, 1, 2)), document.body);

        compare(node.dom, div(text(1), text(2)));

        node = update(node, d('div', null,
            d('@', {class: 'cls'}, 1, 2)));
        compare(node.dom, udiv(utext(1), utext(2)));
    });
});
