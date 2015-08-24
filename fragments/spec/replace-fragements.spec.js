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

describe("Replace Components", () => {
    it('same component with changed props', () => {
        new Test()
            .create(<Foo text="wow">Foo {123} {456}</Foo>, `<div>Bar Foo 123 456 wow</div>`)
            .update(<Foo></Foo>, `<div>Bar </div>`)
            .update(<Foo text="me">{123}</Foo>, `<div>Bar 123 me</div>`)
            .update(<Foo text="me">{123} {456}</Foo>, `<div>Bar 123 456 me</div>`)
    });
});