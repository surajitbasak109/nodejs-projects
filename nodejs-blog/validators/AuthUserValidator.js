module.exports = class AddUserValidator {
  #input = null;
  #errors = [];
  constructor(input) {
    this.#input = input;
  }

  fails() {
    if (this.#input.username == null || this.#input.username.length < 3) {
      this.#errors.push({
        name: "username",
        message: "Username field is required",
      });
    }

    if (this.#input.password == null) {
      this.#errors.push({
        name: "password",
        message: "Password field is required",
      });
    }

    if (this.#input.password.length < 8) {
      this.#errors.push({
        name: "password",
        message: "The password should be greater than 8 characters",
      });
    }

    if (this.#errors.length > 0) return true;
  }

  reason() {
    return this.#errors.length > 0 ? this.#errors : null;
  }

  getUsername() {
    return this.#input.username;
  }

  getPassword() {
    return this.#input.password;
  }
};
