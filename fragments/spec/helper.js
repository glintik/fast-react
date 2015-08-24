export let Component = FastReact.Component;
export let render = FastReact.render;
export class Test {
    constructor(vdom) {}

    create(vdom, html) {
        this.div = document.body.appendChild(document.createElement('div'));
        this.node = render(vdom, this.div);
        this.toBe(html);
        return this;
    }

    toBe(html) {
        var realHTML = this.div.innerHTML.replace(/\s+/, ' ');
        var expectedHTML = html.replace(/\s+/, ' ');
        expect(realHTML).toBe(expectedHTML);
        return this;
    }

    debug(){
        this.div;
        this.node;
        debugger;
        return this;
    }

    update(vdom, html) {
        this.node = render(vdom, this.div);
        this.toBe(html);
        return this;
    }
}