const Post = require("../../models/Post");

module.exports = class CreatePostService {
  #title = null;
  #body = null;
  #authorId = null;
  #createPostValidator = null;
  #response = null;

  constructor() {
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

  setAuthorId(authorId) {
    this.#authorId = authorId;
    return this;
  }

  setCreatePostValidator(validator) {
    this.#createPostValidator = new validator({
      title: this.#title,
      body: this.#body,
      authorId: this.#authorId,
    });
    return this;
  }

  setResponse(response) {
    this.#response = response;
    return this;
  }

  async process() {
    if (!this.#createPostValidator)
      throw Error("Create Post validator not set");
    if (this.#createPostValidator.fails()) {
      return this.#response.status(400).json({
        message: "Validation failed",
        reason: this.#createPostValidator.reason(),
      });
    }

    try {
      const newPost = new Post({
        title: this.#createPostValidator.getTitle(),
        body: this.#createPostValidator.getBody(),
        author: await this.#createPostValidator.getAuthor(),
      });
      await Post.create(newPost);

      return this.#response.redirect("/admin/dashboard");
    } catch (error) {
      console.error(error);
      return this.#response
        .status(400)
        .json({ message: "Unable to create post" });
    }
  }
};
