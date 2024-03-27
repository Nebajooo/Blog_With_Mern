import BlogModel from "../models/BlogModel.js";
import RegisterModel from "../models/RegisterModel.js";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

export const getBlog = async (req, res) => {
  const { title, body, firstname } = req.body;
  if (!title || !body || !firstname) {
    return res.status(204).json("Invalid Input");
  }

  const blogExist = await BlogModel.findOne({ title });
  if (blogExist) {
    return res.status(403).json("Blog Already exist");
  }
  try {
    await BlogModel.create({
      title,
      body,
      createBy: firstname,
      like: false,
      save: false,
      comment: [],
      isChecked: false,
    });
    return res.status(201).json({ message: "Blog posted" });
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

export const getData = async (req, res) => {
  try {
    const models = await BlogModel.find(); // Retrieve all models from the database
    const blogModel = models.map((item) => item);

    return res.json({ myBlogs: blogModel }); // Send the models as a JSON response
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getBlogData = async (req, res) => {
  try {
    const id = req.params.id;
    const blog = await BlogModel.findone({ _id: id });
    const { _id, title, body } = blog;

    return (
      res,
      json({
        title: title,
        id: _id,
        body: body,
        message: "Blog Sent Successfully",
      })
    );
  } catch (e) {
    res.status(400).json({ message: e });
  }
};

export const postLikeData = async (req, res) => {
  try {
    const { _id } = req.body;
    const blog = await BlogModel.findOne({ _id });

    if (!blog) {
      return res.json({ message: "Blog not found in server" });
    }
    const updateBlog = await BlogModel.findByIdAndUpdate(
      _id,
      { like: !blog.like },
      { new: true }
    );
  } catch (e) {
    console.log(e);
    res.json(400).json({ message: e });
  }
};

export const postSaveData = async (req, res) => {
  try {
    // const id = JSON.parse(req.body.id);4
    const { _id } = req.body;
    // console.log(json);
    const blog = await BlogModel.findOne({ _id });
    if (!blog) {
      return res.json({ message: "Blog not found in server" });
    }

    const updatedBlog = await BlogModel.findByIdAndUpdate(
      _id,
      { save: !blog.save },
      { new: true }
    );

    return res.json(updatedBlog);
  } catch (e) {
    console.log(e);
    res.json({ message: e });
  }
};
