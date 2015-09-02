import {Test, Component} from './helper';

class Comp extends Component{
    render(){
        return <div>{this.props.value}</div>;
    }
}

function dk(value) {
    return <div key={value}>{value}</div>;
}
function d(value) {
    return <div>{value}</div>;
}
function ck(value) {
    return <Comp key={value} value={value}></Comp>;
}
function c(value) {
    return <Comp value={value}></Comp>;
}

function rd(value) {
    return `<div>${value}</div>`;
}





class Top extends Component {
    render() {
        return <div>{this.props.values}</div>
    }
}


describe("Movings", () => {
    it('div with key and without', () => {
        new Test()
            .create(<Top values={[dk(0), dk(1), dk(2), dk(3), dk(4), dk(5)]}/>,
            rd([rd(0), rd(1), rd(2), rd(3), rd(4), rd(5)].join('')))

            .update(<Top values={[dk(0), dk(1), dk(2), dk(6), dk(3), dk(4), dk(5)]}/>,
            rd([rd(0), rd(1), rd(2), rd(6), rd(3), rd(4), rd(5)].join('')))

            .update(<Top values={[dk(5), d(7), dk(4), dk(6), dk(2), dk(1), dk(0)]}/>,
            rd([rd(5), rd(7), rd(4), rd(6), rd(2), rd(1), rd(0)].join('')))

            .update(<Top values={[dk(0), dk(1), d(2), dk(3), dk(4), dk(7), d(5)]}/>,
            rd([rd(0), rd(1), rd(2), rd(3), rd(4), rd(7), rd(5)].join('')))

            .update(<Top values={[d(7), dk(3), dk(2), dk(4), dk(0), dk(1), dk(5), d(6)]}/>,
            rd([rd(7), rd(3), rd(2), rd(4), rd(0), rd(1), rd(5), rd(6)].join('')))
    });

    it('components with key and without', () => {
        new Test()
            .create(<Top values={[ck(0), ck(1), ck(2), ck(3), ck(4), ck(5)]}/>,
            rd([rd(0), rd(1), rd(2), rd(3), rd(4), rd(5)].join('')))

            .update(<Top values={[ck(0), ck(1), ck(2), ck(6), ck(3), ck(4), ck(5)]}/>,
            rd([rd(0), rd(1), rd(2), rd(6), rd(3), rd(4), rd(5)].join('')))

            .update(<Top values={[ck(5), c(7), ck(4), ck(6), ck(2), ck(1), ck(0)]}/>,
            rd([rd(5), rd(7), rd(4), rd(6), rd(2), rd(1), rd(0)].join('')))

            .update(<Top values={[ck(0), ck(1), c(2), ck(3), ck(4), ck(7), c(5)]}/>,
            rd([rd(0), rd(1), rd(2), rd(3), rd(4), rd(7), rd(5)].join('')))

            .update(<Top values={[c(7), ck(3), ck(2), ck(4), ck(0), ck(1), ck(5), c(6)]}/>,
            rd([rd(7), rd(3), rd(2), rd(4), rd(0), rd(1), rd(5), rd(6)].join('')))
    });

    it('mix', () => {
        new Test()
            .create(<Top values={[ck(0), [ck(1)], ck(2), ck(3), dk(4), d(5)]}/>,
            rd([rd(0), rd(1), rd(2), rd(3), rd(4), rd(5)].join('')))

            .update(<Top values={[c(0), [dk(1), ck(2)], [], dk(6), c(3), dk(4), ck(5)]}/>,
            rd([rd(0), rd(1), rd(2), rd(6), rd(3), rd(4), rd(5)].join('')))

            .update(<Top values={[ck(5), [c(7), d(4), []], ck(6), ck(2), [], d(1), dk(0)]}/>,
            rd([rd(5), rd(7), rd(4), rd(6), rd(2), rd(1), rd(0)].join('')))

            .update(<Top values={[[], dk(0), [ck(1), []], d(2), dk(3), dk(4), c(7), ck(5)]}/>,
            rd([rd(0), rd(1), rd(2), rd(3), rd(4), rd(7), rd(5)].join('')))

            .update(<Top values={[d(7), dk(3), ck(2), dk(4), d(0), ck(1), dk(5), c(6)]}/>,
            rd([rd(7), rd(3), rd(2), rd(4), rd(0), rd(1), rd(5), rd(6)].join('')))
    });

    //todo movings with spread
});