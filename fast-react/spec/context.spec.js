import React from 'react';
import ReactDOM from 'react-dom';

const colorPurple = {color: 'purple'}
const colorRed = {color: 'red'};
const colorYellow = {color: 'yellow'};

const nameJames = {name: 'james'};
const nameBrown = {name: 'brown'};

let messageCurrentContext;
let messageNextContext;

let buttonCurrentContext;
let buttonNextContext;

let messageListChildContext;
let messageChildContext;
let messageInnerChildContext;
let buttonWrapperNextContext;

class Button extends React.Component {

    componentWillReceiveProps(nextProps, nextContext) {
        expect(this.context).toEqual(buttonCurrentContext);
        expect(nextContext).toEqual(buttonNextContext);
    }

    componentDidUpdate(prevProps, prevState, prevContext) {
        expect(this.context).toEqual(buttonNextContext);
        expect(prevContext).toEqual(buttonCurrentContext);
    }

    constructor(props, context) {
        super(props);
        expect(this.context).toEqual(void 0);
        expect(context).toEqual(buttonNextContext);
    }

    render() {
        expect(this.context).toEqual(buttonNextContext);
        return null;
    }

    static contextTypes = {
        color: React.PropTypes.string,
        name: React.PropTypes.string,
        // bar: React.PropTypes.string
    }
}


const ButtonWrapper = function (props, context) {
    expect(context).toEqual(buttonWrapperNextContext);
    return <ButtonWrapperInner/>
}

ButtonWrapper.contextTypes = {
    color: React.PropTypes.string,
}

const ButtonWrapperInner = function (props, context) {
    expect(context).toEqual({});
    return <Button/>
}



class MessageInner extends React.Component {
    getChildContext() {
        return messageInnerChildContext;
    }

    static childContextTypes = {
        color: React.PropTypes.string,
    }

    render() {
        return <ButtonWrapper/>;
    }
}


class Message extends React.Component {
    getChildContext() {
        expect(this.context).toEqual(messageNextContext);
        return messageChildContext;
    }

    static childContextTypes = {
        name: React.PropTypes.string,
        bar: React.PropTypes.string
    }

    static contextTypes = {
        color: React.PropTypes.string
    }

    constructor(props, context) {
        super(props);
        expect(this.context).toEqual(void 0);
        expect(context).toEqual(messageNextContext);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        expect(this.context).toEqual(messageCurrentContext);
        expect(nextContext).toEqual(nextContext);
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        expect(this.context).toEqual(messageCurrentContext);
        expect(nextContext).toEqual(nextContext);
        return true;
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        expect(this.context).toEqual(messageCurrentContext);
        expect(nextContext).toEqual(nextContext);
    }

    componentDidUpdate(prevProps, prevState, prevContext) {
        expect(this.context).toEqual(messageNextContext);
        expect(prevContext).toEqual(messageCurrentContext);
    }


    render() {
        expect(this.context).toEqual(messageNextContext);
        return <MessageInner/>;
    }
}

class MessageListInner extends React.Component {
    constructor(props, context) {
        super(props);
        expect(this.context).toEqual(undefined);
        expect(context).toEqual({});
    }

    componentWillReceiveProps(nextProps, nextContext) {
        expect(this.context).toEqual({});
        expect(nextContext).toEqual({});
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        expect(this.context).toEqual({});
        expect(nextContext).toEqual({});
        return true;
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        expect(this.context).toEqual({});
        expect(nextContext).toEqual({});
    }

    componentDidUpdate(prevProps, prevState, prevContext) {
        expect(this.context).toEqual({});
        expect(prevContext).toEqual({});
    }


    render() {
        expect(this.context).toEqual({});
        return <Message ref={this.props.onMessageRef}/>;
    }
}

class MessageList extends React.Component {

    getChildContext() {
        return messageListChildContext;
    }

    render() {
        return <MessageListInner {...this.props}/>;
    }

    static childContextTypes = {
        color: React.PropTypes.string,
        foo: React.PropTypes.string
    }
}




fdescribe("context", function () {

    let MessageListInstance;
    let MessageInstance;
    const root = document.body.appendChild(document.createElement('div'));

    function render(cb) {
        ReactDOM.render(<MessageList ref={cmp => MessageListInstance = cmp}
                                     onMessageRef={cmp => MessageInstance = cmp}/>, root, cb);
    }

    function destroy() {
        ReactDOM.unmountComponentAtNode(root);
    }

    afterEach(function () {
        destroy();
    });

    function mainRender(done) {
        messageCurrentContext = null;
        messageNextContext = {...colorPurple};

        buttonWrapperNextContext = {...colorPurple}

        buttonCurrentContext = null;
        buttonNextContext = {...colorPurple, ...nameJames};

        messageInnerChildContext = {...colorPurple};
        // buttonWrapperNextContext = {...colorPurple, ...nameJames};

        messageListChildContext = {...colorPurple};
        messageChildContext = {...nameJames};
        render(done);
    }

    function updateRender(done) {
        messageCurrentContext = {...colorPurple};
        messageNextContext = {...colorRed};

        buttonWrapperNextContext = {...colorRed}
        messageInnerChildContext = {...colorRed};


        buttonCurrentContext = {...colorPurple, ...nameJames};
        buttonNextContext = {...colorRed, ...nameJames};

        messageListChildContext = {...colorRed};
        messageChildContext = {...nameJames};
        render(done);
    }

    it("should be correct context providing into child components on first render", function (done) {
        mainRender(done);
    });

    it("should be correct context providing into child components on update", function (done) {
        mainRender();
        updateRender(done);
    });

    it("should be correct context after message.forceUpdate", function (done) {
        mainRender(()=>updateRender(()=> {
            messageCurrentContext = messageNextContext = {...colorRed};
            buttonCurrentContext = buttonNextContext = {...colorRed, ...nameJames};
            MessageListInstance.forceUpdate(done);
        }));
    });

    it("should be correct context after message.setState", function (done) {
        mainRender(()=>updateRender(()=> {
            messageCurrentContext = messageNextContext = {...colorRed};
            buttonCurrentContext = buttonNextContext = {...colorRed, ...nameJames};

            MessageListInstance.setState({foo: 1}, done);
        }));
    });

    it("should be correct button context after message.forceUpdate", function (done) {
        mainRender(()=>updateRender(()=> {
            messageCurrentContext = messageNextContext = {...colorRed};

            messageChildContext = {...nameBrown};
            messageInnerChildContext = {...colorYellow};

            buttonWrapperNextContext = {...colorYellow}

            buttonCurrentContext = {...colorRed, ...nameJames};
            buttonNextContext = {...colorYellow, ...nameBrown}

            MessageListInstance.forceUpdate(done);
        }));
    });

    it("should be correct button context after message.setState", function (done) {
        mainRender(()=>updateRender(()=> {
            messageCurrentContext = messageNextContext = {...colorRed};

            messageChildContext = {...nameBrown};
            messageInnerChildContext = {...colorYellow};

            buttonWrapperNextContext = {...colorYellow}

            buttonCurrentContext = {...colorRed, ...nameJames};
            buttonNextContext = {...colorYellow, ...nameBrown}

            MessageListInstance.setState({a: 1}, done);
        }));
    });


    it("should be correct context null providing", function (done) {

        buttonCurrentContext = {...colorPurple, ...nameJames};
        buttonNextContext = {...colorRed, ...nameJames};

        messageListChildContext = null;

        messageCurrentContext = messageNextContext = {color: undefined};

        messageChildContext = {};
        messageInnerChildContext = null;

        buttonWrapperNextContext = {color: undefined}

        buttonCurrentContext = {};
        buttonNextContext = {color: undefined, name: undefined}

        render(()=>{
            buttonCurrentContext = {color: undefined, name: undefined};
            buttonNextContext = {color: undefined, name: undefined}
            render(done)
        })
    });
});



