const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { questionService } = require('../services');

const createquestion = catchAsync(async (req, res) => {
  const question = await questionService.createquestion(req.body);
  res.status(httpStatus.CREATED).send(question);
});

const getquestions = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await questionService.queryquestions(filter, options);
  res.send(result);
});

const getquestion = catchAsync(async (req, res) => {
  const question = await questionService.getquestionById(req.params.questionId);
  if (!question) {
    throw new ApiError(httpStatus.NOT_FOUND, 'question not found');
  }
  res.send(question);
});

const updatequestion = catchAsync(async (req, res) => {
  const question = await questionService.updatequestionById(req.params.questionId, req.body);
  res.send(question);
});

const deletequestion = catchAsync(async (req, res) => {
  await questionService.deletequestionById(req.params.questionId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createquestion,
  getquestions,
  getquestion,
  updatequestion,
  deletequestion,
};