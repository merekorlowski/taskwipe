
export default class Task {
	/**
	 * An Task
	 * @constructor
	 * @param {string} id - The id of this task
	 * @param {string} title - The title of this task
	 * @param {string} description - The description of this task
	 * @param {string} priority - The priority of this task
	 * @param {array} employees - The employees assigned to this task
	 * @param {string} deadline - The deadline of this task
	 */
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

	/**
	 * Assign an employee to this task
	 * @param {Employee} employee - The employee to assign to this task
	 */
	addEmployee(employee) {
		this.employees.push(employee);
		this.assigned = true;
	}

	/**
	 * Unassign an employee from this task
	 * @param {number} index - The index of the employee to unassing from this task
	 */
	removeEmployee(index) {
		this.employees.splice(index, 1);
        
		if (this.employees.length === 0) {
			this.assigned = false;
		}
	}

	/**
	 * Add a time log to this task
	 * @param {TimeLog} timelog - The time log to add to this task
	 */
	addTimeLog(timeLog) {
		this.timeLogs.push(timeLog);
	}

	/**
	 * Remove a time log from this task
	 * @param {number} index - The index of the time log to remove from this task
	 */
	removeTimelog(index) {
		this.timeLogs.splice(index, 1);
	}

	/**
	 * Add a comment to this task
	 * @param {string} comment - The comment to add to this task
	 */
	addComment(comment) {
		this.comments.push(comment);
	}

	/**
	 * Remove a comment from this task
	 * @param {number} index - The index of the comment to remove from this task
	 */
	removeComment(index) {
		this.comments.splice(index, 1);
	}

	/**
	 * Modify the attributes of this task
	 * @param {number} title - The new title of this task
	 * @param {number} description - The new description of this task
	 * @param {number} priority - The new priority of this task
	 * @param {number} deadline - The new deadline of this task
	 */
	modify(title, description, priority, deadline) {
		this.title = title;
		this.description = description;
		this.priority = priority;
		this.deadline = deadline;
	}
}
