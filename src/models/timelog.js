
class Timelog {
	constructor(taskId, start, end) {
		this.taskId = taskId;
		this.start = start;
		this.end = end;
	}

	get isOnGoing() {			
		return this.start && !this.end;
	}
}

export default Timelog;
