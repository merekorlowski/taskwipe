export default class Employee {
    constructor(id, first_name, last_name, email) {
        this.id=id;
        this.firstName=first_name;
        this.lastName=last_name;
        this.email=email;
    }

    modifyEmployee(first_name, last_name, email) {
        this.firstName=first_name;
        this.lastName=last_name;
        this.email=email;
    }
}