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
            .update(<Game id={10}/>, `<div>GameId: 10</div>`)
            .update(<Foo text="wow">Foo {123} {456}</Foo>, `<div>Bar Foo 123 456 wow</div>`)
            .update(<MyNameIs name="Steve"/>, `<div>My name is Steve</div>`)
    });

    it('component <=> array', () => {
        new Test()
            .create(<MyNameIs name={[1,[2],3]}/>, `<div>My name is 123</div>`)
            .update(<MyNameIs name={[[4,5,6]]}/>, `<div>My name is 456</div>`)
            .update(<MyNameIs name={[3,[4,[5],6],7]}/>, `<div>My name is 34567</div>`)
            .update(<MyNameIs name={[1,[<MyNameIs name={[2,3,4]}/>],5]}/>, `<div>My name is 1<div>My name is 234</div>5</div>`)
            .update(<MyNameIs name={[1,<Foo text="wow">Foo {123} {456}</Foo>, 7]}/>, `<div>My name is 1<div>Bar Foo 123 456 wow</div>7</div>`)
            .update(<MyNameIs name={[1,[2,[3,[4]]],5]}/>, `<div>My name is 12345</div>`)
            .update(<MyNameIs name={[1,2,3,4]}/>, `<div>My name is 1234</div>`)
    });
});