const Post = require("../models/Post");

async function index(req, res) {
  try {
    const content = {
      title: "NodeJS Blog",
      description: "Simple blog created with NodeJs, Express & MongoDB",
    };

    let perPage = 5;
    let page = req.query.page || 1;

    const data = await Post.aggregate([{ $sort: { createdAt: -1 } }])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();

    const count = await Post.countDocuments();
    const nextPage = parseInt(page) + 1;
    const hasNextPage = nextPage <= Math.ceil(count / perPage);

    res.render("index", {
      content,
      data,
      current: page,
      nextPage: hasNextPage ? nextPage : null,
      currentRoute: '/',
    });
  } catch (err) {
    console.error(err);
  }
}

async function post(req, res) {
  try {
    const slug = req.params.id;
    const post = await Post.findById({ _id: slug });
    const content = {
      title: post.title,
      description: "Simple blog created with NodeJs, Express & MongoDB",
    };

    res.render("post", {
      content,
      post,
      currentRoute: `/post/${slug}`
    });
  } catch (err) {
    console.error(err);
  }
}

async function search(req, res) {
  try {
    const content = {
      title: "Search",
      description: "Simple blog created with NodeJs, Express & MongoDB",
    };
    const searchTerm = req.body["search-term"].replace(/[^a-zA-Z0-9 ]/g, "");

    const posts = await Post.find({
      $or: [
        { title: { $regex: new RegExp(searchTerm, "i") } },
        { body: { $regex: new RegExp(searchTerm, "i") } },
      ],
    });

    res.render("search", {
      content,
      posts,
    });
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  index,
  post,
  search,
};
