const Post = require("../models/Post");
const User = require("../models/User");
const AddUserService = require("../services/User/AddUserService");
const AddUserValidator = require("../validators/AddUserValidator");
const AuthUserService = require("../services/User/AuthUserService");
const AuthUserValidator = require("../validators/AuthUserValidator");
const CreatePostService = require("../services/Post/CreatePostService");
const PostValidator = require("../validators/PostValidator");
const UpdatePostService = require("../services/Post/UpdatePostService");
const layout = "layouts/admin";

module.exports = {
  index(req, res) {
    const showRegisterForm = process.env.SHOW_REGISTER_FORM === "true";
    const content = {
      title: "Admin",
      description: "Your admin dashboard",
      showRegisterForm: showRegisterForm || false,
    };

    res.render("admin/index", { content, layout });
  },
  async login(req, res) {
    try {
      const { username, password } = req.body;
      new AuthUserService()
        .setUsername(username)
        .setPassword(password)
        .setAuthUserValidator(AuthUserValidator)
        .setResponse(res)
        .process();
    } catch (error) {
      console.error(error);
    }
  },
  async register(req, res) {
    try {
      const { fullname, email, username, password, password_confirm } =
        req.body;
      new AddUserService()
        .setFullName(fullname)
        .setEmail(email)
        .setUsername(username)
        .setPassword(password)
        .setConfirmPassword(password_confirm)
        .setValidator(AddUserValidator)
        .setResponse(res)
        .process();
    } catch (error) {
      console.error(error);
    }
  },
  async dashboard(req, res) {
    try {
      const content = {
        title: "Dashboard",
        description: "Simple Blog created with NodeJS, Express and MongoDB",
      };
      const posts = await Post.find();

      res.render("admin/dashboard", {
        content,
        posts,
        layout,
      });
    } catch (err) {
      console.error(err);
    }
  },
  async create(req, res) {
    try {
      const content = {
        title: "Add new post",
        description: "Simple Blog created with NodeJS, Express and MongoDB",
      };

      res.render("admin/create-post", {
        content,
        layout,
      });
    } catch (err) {
      console.error(err);
    }
  },
  async store(req, res) {
    try {
      new CreatePostService()
        .setAuthorId(req.userId)
        .setTitle(req.body.title)
        .setBody(req.body.body)
        .setCreatePostValidator(PostValidator)
        .setResponse(res)
        .process();
    } catch (err) {
      console.error(err);
    }
  },
  async edit(req, res) {
    try {
      const post = await Post.findOne({ _id: req.params.id });
      const content = {
        title: `Edit - ${post.title}`,
        description: "NodeJS BLog: Edit your post",
      };
      res.render("admin/edit-post", {
        content,
        post,
        layout,
      });
    } catch (err) {
      console.error(err);
    }
  },
  async update(req, res) {
    try {
      new UpdatePostService()
        .setId(req.params.id)
        .setTitle(req.body.title)
        .setBody(req.body.body)
        .setResponse(res)
        .setUpdatePostValidator(PostValidator)
        .process();
    } catch (err) {
      console.error(err);
    }
  },
  async delete(req, res) {
    try {
      await Post.deleteOne({_id: req.params.id });
      res.redirect('/admin/dashboard')
    } catch (err) {
      console.error(err);
    }
  },
  async logout(req, res) {
    try {
      res.clearCookie('token');
      res.redirect('/');
    } catch (err) {
      console.error(err);
    }
  },
};
