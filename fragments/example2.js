class Item extends FastReact.Component{
    render(){
        return <div>Hello</div>;
    }
}
var pp = {Item};
var value = "Me";
var hint = "Kiss";
var attrs = {id: "test", title: "Who", className: "Peop", "data-boom": 123};
var click = ()=>console.log('Click');
var item = <div title={hint} data-hey="asdf" onclick={click} {...attrs} className="wow">Hello {value}</div>;
FastReact.render(item, document.body);


hint = 'GGg';
value = 'Foot';
var attrs = {id: "test", title: "Who", className: "Peop", "data-be": 456};
var item = <div title={console.log('hoy')} data-hey="asdf" {...attrs} onClick={click} className="wow">Hello {value}</div>;
FastReact.render(item, document.body);

function abc() {
    var abc = () => {
        var item = <pp.Item {...attrs}>Hello {value}</pp.Item>;
        var item = <this.Item>Hello {value}</this.Item>;
        var item = <pp.Item name="adsf">Hello {value}</pp.Item>;
    }
}
