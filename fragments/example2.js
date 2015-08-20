class Hello {
    render() {
        var title = 'hello';
        var props = {};
        var items = [];
        return <div key={1} className="wow" title={title} {...props}>
            <div>
                <span>What do you mean</span>
                <span>No mean {1} {2} </span>
                {items.map(item => <div key={item.id} className={item.cls}>{item.value} {item.score}</div>)}
            </div>
        </div>;
    }
}
