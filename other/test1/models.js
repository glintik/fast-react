var defaultFields = ["projectShortName", "numberInProject", "summary", "description", "created", "updated", "resolved",
    "updaterName", "updaterFullName", "reporterName", "reporterFullName", "commentsCount", "votes", "attachments", "links"];

class User {
    firstName;
    lastName;

    constructor(obj) {
        this.firstName = obj.firstName;
        this.lastName = obj.lastName;
    }
}


class UserComment {
    author;
    authorFullName;
    created;
    deleted;
    updated;
    id;
    text;

    constructor(obj) {
        this.author = obj.author;
        this.authorFullName = obj.authorFullName;
        this.created = obj.created;
        this.deleted = obj.deleted;
        this.updated = obj.updated;
        this.id = obj.id;
        this.text = obj.text;
    }
}

class IssueLink {
    url;
    value;

    constructor(obj) {
        this.url = 'http://youtrack.jetbrains.com/issue/' + obj.value;
        this.value = obj.value;
    }
}

class IssueAttachment {
    url;
    value;

    constructor(obj) {
        this.url = obj.url;
        this.value = obj.value;
    }
}

export class Issue {
    id;
    projectShortName;
    numberInProject;
    summary;
    description;
    created;
    updated;
    updaterName;
    updaterFullName;
    reporterName;
    reporterFullName;
    priority;
    type;
    state;
    assignee;
    subsystem;
    fixVersions;
    affectedVersion;
    severity;

    votes;
    commentsCount;

    comments = [];
    links = [];
    attachments = [];

    constructor(obj) {
        var fields = {};
        obj.field.forEach(function (field) {
            fields[field.name] = field.value;
        });
        this.id = obj.id;
        this.summary = fields.summary;
        this.description = fields.description || '';
        this.created = fields.created;
        this.projectShortName = fields.projectShortName;
        this.numberInProject = fields.numberInProject;
        this.updated = fields.updated;
        this.updaterName = fields.updaterName;
        this.updaterFullName = fields.updaterFullName;
        this.reporterName = fields.reporterName;
        this.reporterFullName = fields.reporterFullName;
        this.votes = fields.votes;
        this.commentsCount = fields.commentsCount;

        this.priority = fields.Priority[0];
        this.state = fields.State[0];
        this.type = fields.Type[0];
        this.assignee = fields.Assignee && fields.Assignee[0].fullName;
        this.subsystem = fields.Subsystem[0];
        this.fixVersions = fields['Fix versions'] && fields['Fix versions'][0];
        this.affectedVersion = fields['Affected versions'] && fields['Affected versions'][0];
        this.severity = fields.Severity;

        if (obj.comment) {
            for (var i = 0; i < obj.comment.length; i++) {
                this.comments.push(new UserComment(obj.comment[i]));
            }
        }

        if (fields.attachments) {
            for (var i = 0; i < fields.attachments.length; i++) {
                this.attachments.push(new IssueAttachment(fields.attachments[i]));
            }
        }

        if (fields.links) {
            for (var i = 0; i < fields.links.length; i++) {
                this.links.push(new IssueLink(fields.links[i]));
            }
        }

    }
}

