export default class Employee {
    constructor(id, firstName, lastName, email) {
        this.id=id;
        this.firstName=firstName;
        this.lastName=lastName;
        this.email=email;
    }

    modifyEmployee(firstName, lastName, email) {
        this.firstName=firstName;
        this.lastName=lastName;
        this.email=email;
    }
}