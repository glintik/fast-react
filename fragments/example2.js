class Item extends FastReact.Component{
    render(){
        return <div>Hello</div>;
    }
}
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

var item = <FF {...attrs}>Hello {value}</FF>;
var item = <FF>Hello {value}</FF>;
var item = <FF name="adsf">Hello {value}</FF>;
