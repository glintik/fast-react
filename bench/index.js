import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class Test extends Component {

}

var name = "name";
var value = "value";
var k = "key";
var r = "ref";
var a1 = <Test/>
var a1 = <Test key="k"/>
var a1 = <Test ref="r"/>
var a1 = <Test key="k" ref="r"/>
var a1 = <Test name="wow"/>
var a1 = <Test name="wow" key="k"/>
var a1 = <Test name="wow" value="value" ref="r"/>
var a1 = <Test name="wow" key="k" ref="r"/>
var a1 = <Test key={k}/>
var a1 = <Test ref={r}/>
var a1 = <Test key={k} ref={r}/>
var a1 = <Test name={name}/>
var a1 = <Test name={name} key={k}/>
var a1 = <Test name="wow" ref="r"/>
var a1 = <Test name="wow" value={value} key={k} ref={r}/>

var props = {a: 1};
var a1 = <Test {...props}/>
var a1 = <Test {...props} key="k"/>
var a1 = <Test {...props} name="wow" key={k}/>
var a1 = <Test {...props} name={name} key={k}/>


var a1 = <Test></Test>
var a1 = <Test>1</Test>
var a1 = <Test key="k">1 {2}</Test>
var a1 = <Test name="wow" key={k}></Test>
var a1 = <Test name={name} key={k}>{"abc"} cde</Test>
var a1 = <Test name={name} key={k}>{null}</Test>
var a1 = <Test name={name} children={{x: 1, y: 2}} key={k}/>
var a1 = <Test name={name} children={{x: 1, y: 2}} key={k}></Test>
var a1 = <Test name={name} c1hildren={{x: 1, y: 2}} key={k}>{1}2</Test>


var a1 = <Test {...props}>1</Test>
var a1 = <Test {...props} key="k">1 {2}</Test>
var a1 = <Test {...props} name="wow" key={k}></Test>
var a1 = <Test {...props} name={name} key={k}>{null}</Test>
var a1 = <Test {...props} name={name} key={k}>{"yow"} wtf</Test>


var a1 = <div/>
var a1 = <div key="k"/>
var a1 = <div ref="r"/>
var a1 = <div key="k" ref="r"/>
var a1 = <div name="wow"/>
var a1 = <div name="wow" key="k"/>
var a1 = <div name="wow" value="value" ref="r"/>
var a1 = <div name="wow" key="k" ref="r"/>
var a1 = <div key={k}/>
var a1 = <div ref={r}/>
var a1 = <div key={k} ref={r}/>
var a1 = <div name={name}/>
var a1 = <div name={name} key={k}/>
var a1 = <div name="wow" ref="r"/>
var a1 = <div name="wow" value={value} key={k} ref={r}/>

var props = {a: 1};
var a1 = <div {...props}/>
var a1 = <div {...props} key="k"/>
var a1 = <div {...props} name="wow" key={k}/>
var a1 = <div {...props} name={name} key={k}/>


var a1 = <div></div>
var a1 = <div>1</div>
var a1 = <div key="k">1 {2}</div>
var a1 = <div name="wow" key={k}></div>
var a1 = <div name={name} key={k}>{"abc"} cde</div>
var a1 = <div name={name} key={k}>{null}</div>
var a1 = <div name={name} children={{x: 1, y: 2}} key={k}/>
var a1 = <div name={name} children={{x: 1, y: 2}} key={k}></div>
var a1 = <div name={name} c1hildren={{x: 1, y: 2}} key={k}>{1}2</div>


var a1 = <div {...props}>1</div>
var a1 = <div {...props} key="k">1 {2}</div>
var a1 = <div {...props} name="wow" key={k}></div>
var a1 = <div {...props} name={name} key={k}>{null}</div>
var a1 = <div {...props} name={name} key={k}>{"yow"} wtf</div>

function generate(count, fn) {
    var data = [];
    for (let i = 0; i < count; i++) {
        data[i] = fn(i);
    }
    return data;
}

const dt = new Date();
var x = 0;
function genJson() {
    return {
        dayGroup: generate(50, (i) => ({
            id: i,
            events: generate(50, (i)=>({
                id: i,
                title: 'Event ' + x++,
                startedAt: dt,
                endedAt: dt,
                teams: [
                    {id: 1, name: 'AB'},
                    {id: 2, name: 'BC'},
                ]
            }))
        })),
    };
}
var json = genJson();

class App extends Component {
    render() {
        return <div className="days">{json.dayGroup.map(day =>
            <DateGroup key={day.id} day={day}/>
        )}
        </div>;
    }
}

class DateGroup extends Component {
    render() {
        return <div className="day">
            {this.props.day.events.map(event =>
                <Game key={event.id} event={event}/>
            )}
        </div>;
    }
}

class Game extends Component {
    render() {
        var event = this.props.event;
        return <div className="event">
            <div className="title">{event.title}</div>
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


const div = document.createElement('div');
document.body.appendChild(div);
function profiler(isProfile) {
    if (isProfile) {
        console.profile('perf');
    } else {
        console.time('perf');
    }
    ReactDOM.render(<App/>, div);
    if (isProfile) {
        console.profileEnd('perf');
    } else {
        console.timeEnd('perf');
    }
}
window.profiler = profiler;

var k = 0;
var stack = [];
window.stack = stack;
var stackSize = 20;
function repeat() {
    json = genJson();
    var time = Date.now();
    ReactDOM.render(<App/>, div);
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

