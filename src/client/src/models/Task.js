import {TimeLog} from './TimeLog';

export default class Task {
    constructor(id, title, description, colour) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.colour = colour;
        this.status = status;
        this.employees = [];
        this.assigned = false;
        this.inProgress = false;
        this.finished = false;
        this.timeLogs = [];
    }

    addEmployee(employee) {
        this.employees.push(employee);
        this.assigned = true;
    }

    removeEmployee(employee) {
        for (let i = 0; i < this.employees.length; i++) {
            if (employee.id == this.employees[i].id) {
                this.employees.splice(i, 1);
                break;
            }
        }
        
        if (this.employees.length === 0) {
            this.assigned = false;
        }
    }

    addTimeLog(timeLog) {
        this.timeLogs.push(timeLog);
    }

    modifyTask(title, description) {
        this.title = title;
        this.description = description;
    }
}