import { PROJECT } from '../constants';

class Project {
    constructor(projectId, title, status, comments) {
        this.projectId = projectId;
        this.title = title;
        this.status = status;
        this.comments = comments;
    }

    get isCompleted() {
        return this.status === PROJECT.COMPLETED;
    }

    get isPaused() {
        return this.status === PROJECT.PAUSED;
    }

    get isInProgress() {
        return this.status === PROJECT.IN_PROGRESS;
    }
}

export default Project;
