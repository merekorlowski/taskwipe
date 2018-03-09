
export default class Task {
	constructor(id, title, description, priority, employees, deadline) {
		this.id = id;
		this.title = title;
		this.description = description;
		this.priority = priority;
		this.colour = colour;
		this.employees = employees;
		this.deadline = deadline;
		this.assigned = false;
		this.inProgress = false;
		this.finished = false;
		this.timeLogs = [];
		this.comments = [];
	}

	addEmployee(employee) {
		this.employees.push(employee);
		this.assigned = true;
	}

	removeEmployee(index) {
		this.employees.splice(index, 1);
        
		if (this.employees.length === 0) {
			this.assigned = false;
		}
	}

	addTimeLog(timeLog) {
		this.timeLogs.push(timeLog);
	}

	removeTimelog(index) {
		this.timeLogs.splice(index, 1);
	}

	addComment(comment) {
		this.comments.push(comment);
	}

	removeComment(index) {
		this.comments.splice(index, 1);
	}

	modify(title, description, priority, deadline) {
		this.title = title;
		this.description = description;
		this.priority = priority;
		this.deadline = deadline;
	}
}
