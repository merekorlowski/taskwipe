export default class Employee {
    constructor(id, firstName, lastName, email, roles) {
        this.id=id;
        this.firstName=firstName;
        this.lastName=lastName;
        this.email=email;
        this.roles=roles;
    }

    modify(firstName, lastName, email, roles) {
        this.firstName=firstName;
        this.lastName=lastName;
        this.email=email;
        this.roles=roles;
    }
}
