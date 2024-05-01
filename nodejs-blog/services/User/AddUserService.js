const bcryprt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");

module.exports = class AddUserService {
  #fullname = null;
  #email = null;
  #username = null;
  #password = null;
  #password_confirm = null;
  #userValidator = null;
  #response = null;

  constructor() {
    return this;
  }

  setFullName(fullname) {
    this.#fullname = fullname;
    return this;
  }

  setEmail(email) {
    this.#email = email;
    return this;
  }

  setUsername(username) {
    this.#username = username;
    return this;
  }

  setPassword(password) {
    this.#password = password;
    return this;
  }
  setConfirmPassword(confirmPassword) {
    this.#password_confirm = confirmPassword;
    return this;
  }

  setResponse(response) {
    this.#response = response;
    return this;
  }

  setValidator(validator) {
    this.#userValidator = new validator({
      fullname: this.#fullname,
      email: this.#email,
      username: this.#username,
      password: this.#password,
      password_confirm: this.#password_confirm,
    });

    return this;
  }

  async process() {
    if (!this.#userValidator) throw Error("User validator not set");
    if (this.#userValidator.fails()) {
      return this.#response.status(400)
        .json({
          message: 'Validation failed',
          reason: this.#userValidator.reason()
        });
    }

    const hashedPassword = await bcryprt.hash(
      this.#userValidator.getPassword(),
      10
    );

    try {
      const user = await User.create({
        fullname: this.#userValidator.getFullname(),
        email: this.#userValidator.getEmail(),
        username: this.#userValidator.getUsername(),
        password: hashedPassword,
        role: "user",
      });

      return this.#response
        .status(201)
        .json({ message: "User created", user });
    } catch (error) {
      console.error(error);
      if (error.code === 11000) {
        return this.#response.status(409).json({
          message: "User is already in use",
        });
      }
      return this.#response.status(500).json({
        message: "Internal server error",
      });
    }
  }
};
