describe("Attrs", function () {

    it('all attributes', function () {
        var attrs = Object.keys({
            accept: 'accept',
            acceptCharset: 'accept-charset',
            'accept-charset': 'accept-charset',
            accessKey: 'accesskey',
            accesskey: 'accesskey',
            action: 'action',
            allowFullScreen: 'allowfullscreen',
            allowfullscreen: 'allowfullscreen',
            allowTransparency: 'allowtransparency',
            allowtransparency: 'allowtransparency',
            alt: 'alt',
            async: 'async',
            autoComplete: 'autocomplete',
            autocomplete: 'autocomplete',
            autoPlay: 'autoplay',
            autoplay: 'autoplay',
            capture: 'capture',
            cellPadding: 'cellpadding',
            cellpadding: 'cellpadding',
            cellSpacing: 'cellspacing',
            cellspacing: 'cellspacing',
            charSet: 'charset',
            charset: 'charset',
            challenge: 'challenge',
            checked: 'checked',
            classID: 'classid',
            classid: 'classid',
            className: 'className',
            'class': 'className',
            cols: 'cols',
            colSpan: 'colspan',
            colspan: 'colspan',
            content: 'content',
            contentEditable: 'contenteditable',
            contenteditable: 'contenteditable',
            contextMenu: 'contextmenu',
            contextmenu: 'contextmenu',
            controls: 'controls',
            coords: 'coords',
            crossOrigin: 'crossorigin',
            crossorigin: 'crossorigin',
            dateTime: 'datetime',
            datetime: 'datetime',
            defer: 'defer',
            dir: 'dir',
            disabled: 'disabled',
            download: 'download',
            draggable: 'draggable',
            encType: 'enctype',
            enctype: 'enctype',
            form: 'form',
            formAction: 'formaction',
            formaction: 'formaction',
            formEncType: 'formenctype',
            formenctype: 'formenctype',
            formMethod: 'formmethod',
            formmethod: 'formmethod',
            formNoValidate: 'formnovalidate',
            formnovalidate: 'formnovalidate',
            formTarget: 'formtarget',
            formtarget: 'formtarget',
            frameBorder: 'frameborder',
            frameborder: 'frameborder',
            headers: 'headers',
            height: 'height',
            hidden: 'hidden',
            high: 'high',
            href: 'href',
            hrefLang: 'hreflang',
            hreflang: 'hreflang',
            htmlFor: 'for',
            'for': 'for',
            httpEquiv: 'httpequiv',
            'http-equiv': 'http-equiv',
            icon: 'icon',
            id: 'id',
            is: 'is',
            keyParams: 'keyparams',
            keyparams: 'keyparams',
            keyType: 'keytype',
            keytype: 'keytype',
            label: 'label',
            lang: 'lang',
            list: 'list',
            loop: 'loop',
            low: 'low',
            manifest: 'manifest',
            marginHeight: 'marginheight',
            marginheight: 'marginheight',
            marginWidth: 'marginwidth',
            marginwidth: 'marginwidth',
            max: 'max',
            maxLength: 'maxlength',
            maxlength: 'maxlength',
            media: 'media',
            mediaGroup: 'mediagroup',
            mediagroup: 'mediagroup',
            method: 'method',
            min: 'min',
            minLength: 'minlength',
            minlength: 'minlength',
            multiple: 'multiple',
            muted: 'muted',
            name: 'name',
            noValidate: 'novalidate',
            novalidate: 'novalidate',
            open: 'open',
            optimum: 'optimum',
            pattern: 'pattern',
            placeholder: 'placeholder',
            poster: 'poster',
            preload: 'preload',
            radioGroup: 'radiogroup',
            radiogroup: 'radiogroup',
            readOnly: 'readonly',
            readonly: 'readonly',
            rel: 'rel',
            required: 'required',
            role: 'role',
            rows: 'rows',
            rowSpan: 'rowspan',
            rowspan: 'rowspan',
            sandbox: 'sandbox',
            scope: 'scope',
            scoped: 'scoped',
            scrolling: 'scrolling',
            seamless: 'seamless',
            selected: 'selected',
            shape: 'shape',
            size: 'size',
            sizes: 'sizes',
            span: 'span',
            spellCheck: 'spellcheck',
            spellcheck: 'spellcheck',
            src: 'src',
            srcDoc: 'srcdoc',
            srcdoc: 'srcdoc',
            srcSet: 'srcset',
            srcset: 'srcset',
            start: 'start',
            step: 'step',
            tabIndex: 'tabindex',
            tabindex: 'tabindex',
            target: 'target',
            title: 'title',
            type: 'type',
            useMap: 'usemap',
            usemap: 'usemap',
            value: 'value',
            width: 'width',
            wmode: 'wmode',
            autoCapitalize: 'autocapitalize',
            autocapitalize: 'autocapitalize',
            autoCorrect: 'autocorrect',
            autocorrect: 'autocorrect',
            itemProp: 'itemprop',
            itemprop: 'itemprop',
            itemScope: 'itemscope',
            itemscope: 'itemscope',
            itemType: 'itemtype',
            itemtype: 'itemtype',
            itemID: 'itemid',
            itemid: 'itemid',
            itemRef: 'itemref',
            itemref: 'itemref',
            property: 'property',
            unselectable: 'unselectable'
        });
        var attrObj = {};
        attrs.map(function (attr) {
            attrObj[attr] = '123';
        });


        var node = render(
            d('div', attrObj, 'ALL_ATTRS'), document.body);

        attrs.map(function (attr) {
            //expect(attr + '=' + node.dom.getAttribute(attr)).toBe(attr + '=123');
        });

        attrs.map(function (attr) {
            attrObj[attr] = '456';
        });
        node = update(node,
            d('div', attrObj, 'ALL_ATTRS'));

        attrs.map(function (attr) {
            //expect(attr + '='+ node.dom.getAttribute(attr)).toBe(attr + '=456');
        });
    });


    it('events', function () {
        var node = render(
            d('div', {
                onClick: function () {
                    console.log('clicked')
                }
            }, 'Click'), document.body);
    });

    it('attrs', function () {
        var node = render(
            d('div', {
                className: 'cls',
                wow: 'yes',
                onClick: function () {
                },
                id: 'my',
                title: 'test',
                'data-title': 'test'
            }, 0), document.body);

        var dom = node.dom;
        expect(dom.className).toBe('cls');
        expect(dom.id).toBe('my');
        expect(dom.title).toBe('test');
        expect(dom.getAttribute('wow')).toBeFalsy();
        expect(dom.getAttribute('onclick')).toBeFalsy();
        expect(dom.dataset.title).toBe('test');
    });

    it('replace attrs', function () {
        var node = render(
            d('div', {
                className: 'class1',
                id: 'id1',
                'data-title': 'data-title1'
            }, 0), document.body);

        node = update(node,
            d('div', {
                className: 'class2',
                id: 'id2',
                'data-title': 'data-title2'
            }, 1));


        expect(node.dom.id).toBe('id2');
        expect(node.dom.className).toBe('class2');
        expect(node.dom.dataset.title).toBe('data-title2');
        compare(node.dom, udiv(utext(1)));
    });


    it('reorder attrs', function () {
        var node = render(
            d('div', {
                className: 'class1',
                id: 'id1',
                'data-title': 'data-title1'
            }, 0), document.body);

        node = update(node,
            d('div', {
                id: 'id2',
                className: 'class2',
                'data-title': 'data-title2'
            }, 1));


        expect(node.dom.id).toBe('id2');
        expect(node.dom.className).toBe('class2');
        expect(node.dom.dataset.title).toBe('data-title2');
        compare(node.dom, div(text(1)));
    });

    it('replace attrs with other', function () {
        var node = render(
            d('div', {
                className: 'class1',
                title: 'title1',
                'data-title': 'data-title1'
            }, 0), document.body);

        node = update(node,
            d('div', {
                className: 'wtf',
                id: 'my'
            }, 1));


        expect(node.dom.className).toBe('wtf');
        expect(node.dom.id).toBe('my');
        expect(node.dom.title).toBeFalsy();
        expect(node.dom.dataset.title).toBeFalsy();
        compare(node.dom, div(text(1)));
    });

    it('replace empty attrs with full', function () {
        var node = render(
            d('div', null, 0), document.body);

        node = update(node,
            d('div', {
                className: 'wtf',
                id: 'my'
            }, 1));


        expect(node.dom.className).toBe('wtf');
        expect(node.dom.id).toBe('my');
        expect(node.dom.title).toBeFalsy();
        expect(node.dom.dataset.title).toBeFalsy();
        compare(node.dom, div(text(1)));
    });

    it('replace full attrs with empty', function () {
        var node = render(
            d('div', {
                className: 'wtf',
                id: 'my'
            }, 0), document.body);

        node = update(node,
            d('div', null, 1));

        expect(node.dom.className).toBeFalsy();
        expect(node.dom.id).toBeFalsy();
        compare(node.dom, div(text(1)));
    });

    it('emptify attrs', function () {
        var node = render(
            d('div', {
                className: 'cls',
                title: 'wtf',
                'data-name': 'my'
            }, 0), document.body);

        node = update(node,
            d('div', {
                className: null,
                title: null,
                rel: false,
                'data-name': null,
                'data-rel': false
            }, 1));

        expect(node.dom.className).toBe('');
        expect(node.dom.title).toBeFalsy();
        expect(node.dom.rel).toBeFalsy();
        expect(node.dom.dataset.name).toBeFalsy();
        expect(node.dom.dataset.rel).toBeFalsy();
        compare(node.dom, udiv(utext(1)));
    });



});
