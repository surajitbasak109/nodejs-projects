const bcryprt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");

module.exports = class AuthUserService {
  #username = null;
  #password = null;
  #authUserValidator = null;
  #response = null;
  #jwtSecret = null;

  constructor() {
    this.#jwtSecret = process.env.JWT_SECRET;
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

  setResponse(response) {
    this.#response = response;
    return this;
  }

  setAuthUserValidator(validator) {
    this.#authUserValidator = new validator({
      username: this.#username,
      password: this.#password,
    });

    return this;
  }

  async process() {
    if (!this.#authUserValidator) throw Error("Auth user validator not set");

    if (this.#authUserValidator.fails()) {
      this.#response.status(400).json({
        message: "Validation failed",
        errors: this.#authUserValidator.reason(),
      });
    }

    const user = await User.findOne({
      username: this.#authUserValidator.getUsername(),
    });

    if (!user) {
      return this.#response.status(401).json({
        message: "Invalid credentials",
      });
    }

    const isPasswordValid = await bcryprt.compare(
      this.#authUserValidator.getPassword(),
      user.password
    );

    if (!isPasswordValid) {
      return this.#response.status(401).json({
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      {
        userId: user._id,
      },
      this.#jwtSecret
    );

    this.#response.cookie("token", token, { httpOnly: true });

    return this.#response.redirect('/admin/dashboard');
  }
};
