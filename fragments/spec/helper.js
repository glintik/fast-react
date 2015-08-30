export let Component = FastReact.Component;
export let findDOMNode = FastReact.findDOMNode;
export let render = FastReact.render;
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

    toBe(html, props) {
        var realHTML = this.div.innerHTML.replace(/\s+/, ' ');
        var expectedHTML = html.replace(/\s+/, ' ');
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