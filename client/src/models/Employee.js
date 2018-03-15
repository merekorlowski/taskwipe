
class Employee {
	/**
	 * An Employee
	 * @constructor
	 * @param {string} id - The id of this employee
	 * @param {string} firstName - The first name of this employee
	 * @param {string} lastName - The last name of this employee
	 * @param {string} email - The email of this employee
	 */
	constructor(id, firstName, lastName, email) {
		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.roles = [];
	}

	/**
	 * Modify the attributes of an employee
	 * @param {string} firstName - The modified first name of the employee
	 * @param {string} lastName - The modified last name of the employee
	 * @param {string} email - The modified email of the employee
	 */
	modify(firstName, lastName, email) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
	}

	/**
	 * Assign a role to an employee
	 * @param {string} role - The role to assign to an employee
	 */
	assignRoles(role) {
		this.roles.push(role);
	}

	/**
	 * Remove a role from an employee
	 * @param {number} index - The role to remove from an employee
	 */
	removeRoles(index) {
		this.roles.splice(index, 1);
	}
}

export default Employee;
