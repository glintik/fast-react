class Hello {
    render() {
        var title = 'hello';
        var props = {};
        var items = [];
        return <div className="wow" title={title} {...props}>
            <div>
                <span>What do you mean</span>
                <span>No mean</span>
                {items.map(item => <div className={item.cls}>{item.value} {item.score}</div>)}
            </div>
        </div>;
    }
}