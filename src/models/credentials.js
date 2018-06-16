
class Credentials {
	get isEmailValid() {
		return this.email !== '';
	}

	get isPasswordValid() {
		return this.password !== '';
	}
}

export default Credentials;
