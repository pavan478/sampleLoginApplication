const express = require('express');

const { body } = require('express-validator');

const postsController = require('../controllers/posts');

const auth = require('../middleware/auth');

const router = express.Router();
console.log('test')
router.get('/', auth, postsController.fetchAll);

router.post(
  '/',
  [
    auth,
    body('name').trim().isLength({ min: 5 }).not().isEmpty(),
    body('department').trim().isLength({ min: 2 }).not().isEmpty(),
    body('description').trim().isLength({ min: 2 }).not().isEmpty(),
    body('section').trim().isLength({ min: 2 }).not().isEmpty(),
    body('notes').trim().isLength({ min: 2 }).not().isEmpty(),
    body('user').trim().not().isEmpty(),
  ],
  postsController.postPost
);

router.delete('/:id', auth, postsController.deletePost);

module.exports = router;
