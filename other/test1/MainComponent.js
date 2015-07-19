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
            value: issue=>issue.links.map(link=>
                <a href={link.url} target="_blank">{link.value}</a>)
        },
        {
            name: 'Attachments',
            value: issue=>issue.attachments.map(attach=>
                <a href={attach.url} target="_blank">{attach.value}</a>)
        },
        {
            name: 'Comments',
            value: issue=>
                <div className="comments">
                    {issue.comment.map(comment=>
                        <div className="comment">
                            <div className="author">{comment.authorFullName}</div>
                            <div className="text">{comment.text}</div>

                        </div>)}
                </div>
        }
    ];

    render() {
        return <div className="issues">
            {this.props.issues.map(issue =>
                <div key={issue.id} className="issue">
                    {this.fields.map(field =>
                        <Line field={field} issue={issue}/>)}
                </div>)
            }
        </div>;

    }
}

class Line extends React.Component {
    render() {
        return (
            <div className="line">
                <span className="field">{this.props.field.name}:</span>
                <span className="value">{this.props.field.value(this.props.issue)}</span>
            </div>
        );
    }
}

var issues = data.map(json => new Issue(json));
React.render(<TestApp issues={issues}/>, document.body.appendChild(document.createElement('div')));