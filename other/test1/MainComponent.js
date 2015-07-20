import {data} from './webstorm-issues';
import {Issue} from './models';


function wrapText(text, len) {
    return text && text.length > len ? text.substr(0, len) + '...' : text;
}
class TestApp extends React.Component {
    fields = [
        {name: 'ID', value: issue=>issue.id},
        {name: 'Summary', value: issue=>issue.summary},
        {name: 'Description', value: issue=>wrapText(issue.description, 100)},
        {name: 'Reporter', value: issue=>issue.reporterFullName},
        {name: 'Updater', value: issue=>issue.updaterFullName},
        {name: 'Priority', value: issue=>issue.priority},
        {name: 'Type', value: issue=>issue.type},
        {name: 'State', value: issue=>issue.state},
        {name: 'Assignee', value: issue=>issue.assignee},
        {name: 'Subsystem', value: issue=>issue.subsystem},
        {name: 'Fix versions', value: issue=>issue.fixVersions},
        {name: 'Affected versions', value: issue=>issue.affectedVersion},
        {name: 'Severity', value: issue=>issue.severity},
        {
            name: 'Links',
            value: issue=>
                <span className="links">
                    {issue.links.map((link, i) =>
                        <span>
                            {i > 0 && ', '}
                            <a href={link.url} className="link" target="_blank">{link.value}</a>
                        </span>)
                    }
                </span>
        },
        {
            name: 'Attachments',
            value: issue=>
                <span className="attachments">
                    {issue.attachments.map((attach, i)=>
                        <span>
                            {i > 0 && ', '}
                            <a href={attach.url} className="attachment" target="_blank">{attach.value}</a>
                        </span>)
                    }
                </span>
        },
        {
            name: 'Comments',
            value: issue=>
                <div className="comments">
                    {issue.comments.map(comment=>
                        <div className="comment">
                            <div className="author">{comment.authorFullName}</div>
                            <div className="text">{wrapText(comment.text, 100)}</div>
                        </div>)}
                </div>
        }
    ];

    state = {shown: true};

    toggle(state, substate) {
        var start = Date.now();
        this.state.shown = state;
        this.state.subshown = substate;
        this.forceUpdate();
        console.profile('perf');
        setTimeout(()=> {
            console.profileEnd('perf');
            var dur = Date.now() - start;
            React.findDOMNode(this.refs.toogleTime).textContent = dur + 'ms';
        });
    }


    render() {
        console.log("Render", this.state.shown);

        return <div>
            <button onClick={()=>this.toggle(!this.state.shown, true)}>Toggle</button>
            <button onClick={()=>this.toggle(true, !this.state.subshown)}>SubShown</button>
            <button onClick={()=>this.toggle(true, true)}>Empty Update</button>
            <span ref="toogleTime"></span>
            {this.state.shown ?
                <div className="issues">
                    {this.props.issues.map(issue =>
                        <div key={issue.id} className="issue">
                            {this.fields.map(field =>
                                <Line shown={this.state.subshown} field={field} issue={issue}/>)}
                        </div>)
                    }
                </div> : null}
        </div>;

    }
}

class Line extends React.Component {
    render() {
        //console.log("Line");

        var val = this.props.field.value(this.props.issue);
        return (
            val ?
                <div className="line">
                    <span className="field">{this.props.field.name}:</span>
                    {this.props.shown ? <span>Wow</span> : null}
                    <span className="value">{this.props.field.value(this.props.issue)}</span>
                </div> : null
        );
    }
}

var issues = data.map(json => new Issue(json));
React.render(<TestApp issues={issues}/>, document.body.appendChild(document.createElement('div')));