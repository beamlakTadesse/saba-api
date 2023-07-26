const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const questionController= require('../../controllers/question.controller')

const router = express.Router();

router
  .route('/')
  .post( questionController.createquestion)
  .get(questionController.getquestions);

router
  .route('/:questionId')
  .get(questionController.getquestion)
  .patch( questionController.updatequestion)
  .delete(questionController.deletequestion);

module.exports = router;