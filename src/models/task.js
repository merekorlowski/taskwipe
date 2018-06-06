import { TASK, DATE_FORMAT } from '../constants';
import moment from 'moment';

class Task {
	constructor(taskId, userId, title, date, deadline, type, projectId, comments) {
		this.taskId = taskId;
		this.userId = userId;
		this.title = title;
		this.date = date;
		this.deadline = deadline;
		this.type = type;
		this.projectId = projectId;
		this.comments = comments;
	}

	get isPriority() {
		return this.type === TASK.TYPE.PRIORITY;
	}

	get isOptional() {
		return this.type === TASK.TYPE.OPTIONAL;
	}

	get isNormal() {
		return this.type === TASK.TYPE.NORMAL;
	}

	get isValidTitle() {
		return this.title !== '';
	}

	get isValidDate() {
		return !moment(this.date, DATE_FORMAT)
			.isBefore(moment());
	}

	get isValidDeadline() {
		return !moment(this.deadline, DATE_FORMAT)
			.isBefore(moment(this.date, DATE_FORMAT));
	}
}

export default Task;
