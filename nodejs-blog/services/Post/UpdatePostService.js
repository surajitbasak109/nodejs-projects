const Post = require("../../models/Post");

module.exports = class UpdatePostService {
  #id = null;
  #title = null;
  #body = null;
  #updatePostValidator = null;
  #response = null;

  constructor() {
    return this;
  }

  setId(id) {
    this.#id = id;
    return this;
  }

  setTitle(title) {
    this.#title = title;
    return this;
  }

  setBody(body) {
    this.#body = body;
    return this;
  }

  setUpdatePostValidator(validator) {
    this.#updatePostValidator = new validator({
      title: this.#title,
      body: this.#body,
    });
    return this;
  }

  setResponse(response) {
    this.#response = response;
    return this;
  }

  async process() {
    if (!this.#updatePostValidator)
      throw Error("The update post validator not set");
    if (this.#updatePostValidator.fails()) {
      return this.#response.status(400).json({
        message: "Validation failed",
        reason: this.#updatePostValidator.reason(),
      });
    }

    try {
      // const newPost = new Post({
      //   title: this.#updatePostValidator.getTitle(),
      //   body: this.#updatePostValidator.getBody(),
      //   author: await this.#updatePostValidator.getAuthor(),
      // });
      await Post.findByIdAndUpdate(this.#id, {
        title: this.#updatePostValidator.getTitle(),
        body: this.#updatePostValidator.getBody(),
        updatedAt: Date.now(),
      })

      return this.#response.redirect(`/admin/edit-post/${this.#id}`);
    } catch (error) {
      console.error(error);
      return this.#response
        .status(400)
        .json({ message: "Unable to create post" });
    }
  }
};
