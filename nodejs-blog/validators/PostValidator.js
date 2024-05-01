const User = require("../models/User");

module.exports = class CreatePostValidator {
  #input = null;
  #errors = [];
  constructor(input) {
    this.#input = input;
  }

  fails() {
    if (this.#input.title == null) {
      this.#errors.push({
        name: "title",
        message: "The Title field is required",
      });
    }

    if (this.#input.title.trim().length < 5) {
      this.#errors.push({
        name: "title",
        message: "The title should be greater than 5",
      });
    }

    if (this.#input.body == null) {
      this.#errors.push({
        name: "body",
        message: "The Post body field is required",
      });
    }

    if (this.#input.body.trim().length < 100) {
      this.#errors.push({
        name: "body",
        message:
          "The Post body should be greater than or equal to 100 characters",
      });
    }

    if (this.#errors.length > 0) return true;
    return false;
  }

  reason() {
    return this.#errors.length > 0 ? this.#errors : null;
  }

  getTitle() {
    return this.#input.title;
  }

  getBody() {
    return this.#input.body;
  }

  getAuthorId() {
    return this.#input.authorId;
  }

  async getAuthor() {
    if (this.#input.authorId) {
      const author = await User.findById({ _id: this.#input.authorId });
      return author;
    }

    return null;
  }
};
