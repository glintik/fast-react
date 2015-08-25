var k = 0;
class Hello extends FastReact.Component {
    componentDidMount() {
        setInterval(()=> {
            this.forceUpdate();
        }, 1000);
    }

    render() {
        var title = 'hello';
        var props = {};
        var items = [{id: 1, cls: 'id1', score: 11, value: 111 + k++}];
        if (k % 2 == 0) {
            items[1] = {id: 2, cls: 'id2', score: 22, value: 222};
        }
        console.log(items);
        var kk = 0;
        var bla = <div key={1} className="wow" title={title} {...props}>
            <div>
                <span>What do you mean</span>
                <span>No mean {1} {2} </span>
                {k % 2 == 0 ? <Fui key={123} title="wow" name={title}>
                    Child1
                    <div>
                        <span>Hello Man</span>
                    </div>
                    {<div>HUI</div>}
                    {console.log(213)}
                </Fui> : console.log(456)}
                {items.map(item => <div key={item.id} className={item.cls}>{item.value} {item.score}</div>)}
            </div>
        </div>;

        console.log(123);
        return bla;
    }
}

class Fui extends FastReact.Component {
    render() {
        return <div>FUck {this.props.children}</div>;
    }
}

FastReact.render(<Hello/>, document.body);
