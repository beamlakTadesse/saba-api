const httpStatus = require("http-status");
 const pick = require('../utils/pick');
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { patientService } = require("../services");

const createPatient = catchAsync(async (req, res) => {
  const book = await patientService.createPatient(req.body);
  res.status(httpStatus.CREATED).send(book);
});

const getPatients = catchAsync(async (req, res) => {
  const filter = pick(req.query, ["name", "role"]);
  const options = pick(req.query, ["sortBy", "limit", "page"]);
  const result = await patientService.queryPatient(filter, options);
  res.send(result);
});

const getPatient = catchAsync(async (req, res) => {
  const patient = await patientService.getPatientById(req.params.patientId);
  if (!patient) {
    throw new ApiError(httpStatus.NOT_FOUND, "Patient not found");
  }
  res.send(patient);
});

const getPatientByPhone = catchAsync(async (req, res) => {
  const patient = await patientService.getPatientByPhone(req.params.phone);
  if (!patient) {
    throw new ApiError(httpStatus.NOT_FOUND, "Patient not found");
  }
  res.send(patient);
});


const updatePatientByPhone = catchAsync(async (req, res) => {
  const patient = await patientService.updatePatientByPhone(
    req.params.phone,
    req.body
  );
  res.send(patient);
});

const updatePatient = catchAsync(async (req, res) => {
  const patient = await patientService.updatePatientById(
    req.params.patientId,
    req.body
  );
  res.send(patient);
});

const deletePatient = catchAsync(async (req, res) => {
  await patientService.deletePatientById(req.params.patientId);
  res.status(httpStatus.NO_CONTENT).send();
});

const deletePatientByPhone = catchAsync(async (req, res) => {
  await patientService.deletePatientByPhone(req.params.phone);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createPatient,
  getPatient,
  getPatients,
  updatePatient,
  deletePatient,
  getPatientByPhone,
  updatePatientByPhone,
  deletePatientByPhone
};
