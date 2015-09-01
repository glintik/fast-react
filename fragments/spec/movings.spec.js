import {Test, Component} from './helper';

function dk(value) {
    return <div key={value}>{value}</div>;
}
function d(value) {
    return <div>{value}</div>;
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
    fit('div with key and without', () => {
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

    fit('div and fragments with key and without', () => {
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
});