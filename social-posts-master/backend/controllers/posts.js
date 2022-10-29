const { validationResult } = require('express-validator');

const Post = require('../models/post');

exports.fetchAll = async (req, res, next) => {
  try {
    const [allPosts] = await Post.fetchAll();
    res.status(200).json(allPosts);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.postPost = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) return;

  const name = req.body.name;
  const department = req.body.department;
  const description = req.body.description;
  const section = req.body.section;
  const notes = req.body.notes;
  const user =req.body.user;

  try {
    const post = {
      name: name,
      department: department,
      description: description,
      section: section,
      notes:notes,
      user:user
      
    }
    console.log(post)
    const result = await Post.save(post);
    console.log(result)
    res.status(201).json({ message: 'Posted!' });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const deleteResponse = await Post.delete(req.params.id);
    res.status(200).json(deleteResponse);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
