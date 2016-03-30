import React, {Component} from 'react';
import ReactDOM from 'react-dom';

function generate(count, fn) {
    var data = [];
    for (let i = 0; i < count; i++) {
        data[i] = fn(i);
    }
    return data;
}
var json = {
    dayGroup: generate(50, (i) => ({
        events: generate(50, (i)=>({
            id: i,
            title: 'Event ' + i,
            startedAt: new Date(),
            endedAt: new Date(Date.now() + 1000000),
            teams: [
                {id: 1, name: 'AB'},
                {id: 2, name: 'BC'},
            ]
        }))
    })),
};

class App extends Component {
    render() {
        return <div className="days">{json.dayGroup.map(day =>
            <DateGroup day={day}/>
        )}
        </div>;
    }
}

class DateGroup extends Component {
    render() {
        return <div className="day">
            {this.props.day.events.map(event =>
                <Game event={event}/>
            )}
        </div>;
    }
}

class Game extends Component {
    render() {
        var event = this.props.event;
        return <div className="event">
            <div className="started-at">{event.startedAt.getTime()}</div>
            <Team team={event.teams[0]}/>
            <Team team={event.teams[1]}/>
        </div>;
    }
}
class Team extends Component {
    render() {
        var team = this.props.team;
        return <div className="team">
            {team.name}
        </div>;
    }
}


function profiler(isProfile){
    if (isProfile) {
        console.profile('perf');
    } else {
        console.time('perf');
    }
    ReactDOM.render(<App/>, document.body);
    if (isProfile) {
        console.profileEnd('perf');
    } else {
        console.timeEnd('perf');
    }
}
window.profiler = profiler;

var k = 0;
var stack = [];
var stackSize = 20;
function repeat() {
    var time = Date.now();
    ReactDOM.render(<App/>, document.body);
    stack[k++ % stackSize] = Date.now() - time;
    setTimeout(repeat, 20);
}

setInterval(()=> {
    var sum = 0;
    for (let i = 0; i < stack.length; i++) {
        sum += stack[i];
    }
    sum = sum / stackSize | 0;
    console.log(sum);
}, 1000);

setTimeout(repeat, 1000);

