describe("Simple", function () {

    it('child types', function () {
        var node = render(
            d('div', null,
                'string',
                0,
                false,
                true,
                null,
                void 0,
                1,
                Infinity,
                -Infinity,
                1 / "abc",
                +0,
                -0,
                1.1,
                function () {},
                /abc/,
                {my: true}
            ), document.body);
        compare(node.dom, div(
            text('string'),
            text('0'),
            text(''),
            text(''),
            text(''),
            text(''),
            text('1'),
            text('Infinity'),
            text('-Infinity'),
            text('NaN'),
            text('0'),
            text('0'),
            text('1.1'),
            text('Function'),
            text('{}'),
            text('{"my":true}')
        ));
    });



    it('ref callback', function () {
        var divRef;
        var origDiv;
        var node = render(
            origDiv = d('div', {className: 'wow1', ref: function(d){divRef = d}}, 0), document.body);
        expect(divRef.dom.className).toBe('wow1');

        node = update(node,
            d('div', {className: 'wow2', ref: function(d){divRef = d}}, 0));

        expect(divRef.dom.className).toBe('wow2');
    });

    it('replace children with empty', function () {
        var node = render(
            d('div', null, 0), document.body);

        compare(node.dom, div(text('0')));

        node = update(node,
            d('div'));

        compare(node.dom, udiv());
    });
    it('replace empty children', function () {
        var node = render(
            d('div'), document.body);

        compare(node.dom, div());

        node = update(node,
            d('div', null, 0));

        compare(node.dom, udiv(text('0')));
    });

});
