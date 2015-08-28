class FF extends FastReact.Component {
    render() {
        return <span></span>;
    }
}
FastReact.render(<div>
    {console.log("arg1")}
    {console.log("arg2")}
    <FF name={console.log("arg3")}>
        <div name={console.log("arg4")}>
            <div name={console.log("arg5")}></div>
        </div>
    </FF>
</div>, document.body);
