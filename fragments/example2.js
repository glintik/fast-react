class Item extends FastReact.Component{
    render(){
        return <div>Hello</div>;
    }
}
var value = "Me";
var hint = "Kiss";
var attrs = {id: "test", title: "Who", className: "Peop"};
var click = ()=>console.log('Click');
var item = <div title={hint} data-hey="asdf" onclick={click} className="wow">Hello {value}</div>;
FastReact.render(item, document.body);


hint = 'GGg';
value = 'Foot';
var item = <div title={console.log('hoy')} data-hey="asdf" onClick={click} className="wow">Hello {value}</div>;
FastReact.render(item, document.body);

