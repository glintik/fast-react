describe("Map", function () {


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
        node = update(node,
            d('div', null,
                items.map(function (item) {
                    return d('div', {key: item}, 'b', d('@', null, item), 'a')
                })
            ));
        compare(node.dom, udiv(div(text('b'), text(5), text('a')), div(text('b'), text(2), text('a'))));

        items = [1, 2, 3];
        node = update(node,
            d('div', null,
                items.map(function (item) {
                    return d('div', {key: item}, item)
                })
            ));
        compare(node.dom, udiv(div(text(1)), udiv(text(2)), div(text(3))));
    });

    it('map without keys', function () {
        var node = render(
            d('div', null, [0, 1, 2, 3]), document.body);

        node = update(node,
            d('div', null, [0, 1, 2, 3]));

        compare(node.dom, udiv(text(0), text(1), text(2), text(3)));
    });
});
