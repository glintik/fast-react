import {render, createElement, Component} from './ts/index';

class App extends Component {
    counter = 0;

    click() {
        this.counter++;
        this.forceUpdate();
    }

    render() {
        return createElement('div', {title: this.counter}, 'Hello',
            createElement('button', {onClick: ()=>this.click()}, 'SuperClick'),
            this.counter,
            this.counter % 2 ?
                createElement(Wow)
                : [1,2,3]
        );
    }
}

class Wow extends Component {
    counter = 0;

    click() {
        this.counter++;
        this.forceUpdate();
    }

    render() {
        return createElement('div', {id: this.counter},
            createElement('button', {onClick: ()=>this.click()}, 'Click'),
            'Wow', [1, 2, 3], [4, 5, 6], this.counter);
    }
}

render(createElement(App), document.body);

