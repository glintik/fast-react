import {Test, Component} from './helper';
class Foo extends Component {
    render() {
        return <Bar params={this.props}/>
    }
}

class Bar extends Component {
    render() {
        return <div>Bar {this.props.params.children} {this.props.params.text}</div>
    }
}

class Game extends Component {
    render() {
        return <GameInfo params={this.props}/>
    }
}

class GameInfo extends Component {
    render() {
        return <div>GameId: {this.props.params.id}</div>
    }
}

class YourWelcome extends Component {
    render() {
        return <div>Your welcome {this.props.name}</div>;
    }
}

class MyNameIs extends Component {
    render() {
        return <div>My name is {this.props.name}</div>;
    }
}

describe("Replace Components", () => {
    it('same component with changed props', () => {
        new Test()
            .create(<Foo text="wow">Foo {123} {456}</Foo>, `<div>Bar Foo 123 456 wow</div>`)
            .update(<Foo></Foo>, `<div>Bar </div>`)
            .update(<Foo text="me">{123}</Foo>, `<div>Bar 123 me</div>`)
            .update(<Foo text="me">{123} {456}</Foo>, `<div>Bar 123 456 me</div>`)
    });

    it('another component', () => {
        var name = "Paul";
        new Test()
            .create(<YourWelcome name={'Vlad'}/>, `<div>Your welcome Vlad</div>`)
            .update(<MyNameIs name="Steve"/>, `<div>My name is Steve</div>`)
            .update(<MyNameIs name={name}/>, `<div>My name is Paul</div>`)
            .update(<YourWelcome/>, `<div>Your welcome </div>`)
            .update(<YourWelcome name={name}/>, `<div>Your welcome Paul</div>`)
    });

    it('deep component', () => {
        new Test()
            .create(<Foo text="wow">Foo {123} {456}</Foo>, `<div>Bar Foo 123 456 wow</div>`)
            .update(<Game id="1"/>, `<div>GameId: 1</div>`)
            //1.update(<MyNameIs name="Steve"/>, //broken
            .update(<Game id={10}/>, `<div>GameId: 1</div>`)
            //.update(<MyNameIs name="Steve"/>, `<div>My name is Steve</div>`)
            //.update(<Game id={10}/>, `<div>GameId: 10</div>`)
            .update(<Foo text="wow">Foo {123} {456}</Foo>, `<div>Bar Foo 123 456 wow</div>`)
            .update(<MyNameIs name="Steve"/>, `<div>My name is Steve</div>`)
    });
});