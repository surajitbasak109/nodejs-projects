module.exports = class AddUserValidator {
  #input = null;
  #errors = [];
  constructor(input) {
    this.#input = input;
  }

  fails() {
    if (this.#input.fullname == null || this.#input.fullname.length < 3) {
      this.#errors.push({
        name: "fullname",
        message: "Fullname field is required",
      });
    }

    if (this.#input.email == null) {
      this.#errors.push({
        name: "email",
        message: "Email field is required",
      });
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isValid = emailPattern.test(this.#input.email);

    if (!isValid) {
      this.#errors.push({
        name: "email",
        message: "Email is not valid",
      });
    }

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

    if (this.#input.password_confirm == null) {
      this.#errors.push({
        name: "password_confirm",
        message: "Confirm password field is required",
      });
    }

    if (this.#input.password_confirm.length < 8) {
      this.#errors.push({
        name: "password_confirm",
        message:
          "The confirm password field should be greater than 8 characters",
      });
    }

    if (this.#input.password_confirm !== this.#input.password) {
      this.#errors.push({
        name: "password_confirm",
        message: "The password and confirm password field should match",
      });
    }

    if (this.#errors.length > 0) return true;
  }

  reason() {
    return this.#errors.length > 0 ? this.#errors : null;
  }

  getFullname() {
    return this.#input.fullname;
  }

  getEmail() {
    return this.#input.email;
  }

  getUsername() {
    return this.#input.username;
  }

  getPassword() {
    return this.#input.password;
  }
};
