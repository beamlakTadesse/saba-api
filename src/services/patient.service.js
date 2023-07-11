const httpStatus = require('http-status');
const { Patient } = require("../models");
const ApiError = require("../utils/ApiError");

/**
 * Create a patient
 * @param {Object} patientbody
 * @returns {Promise<Patient>}
 */
const createPatient = async (patientbody) => {
  return Patient.create(patientbody);
};

/**
 * Query for Patient
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryPatient = async (filter, options) => {
  const patient = await Patient.paginate(filter, options);
  return patient;
};

/**
 * Get Patient by id
 * @param {ObjectId} id
 * @returns {Promise<Patient>}
 */
const getPatientById = async (id) => {
  return Patient.findById(id);
};

/**
 * Get patient by phone
 * @param {string} phone
 * @returns {Promise<Patient>}
 */
const getPatientByPhone = async (phone) => {
  return Patient.findOne({ phone });
};

/**
 * Update Patient by id
 * @param {ObjectId} patientId
 * @param {Object} updateBody
 * @returns {Promise<Patient>}
 */
const updatePatientById = async (patientId, updateBody) => {
  const patient = await getPatientById(patientId);
  if (!patient) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Patient not found');
  }
  //   if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
  //     throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  //   }
  Object.assign(patient, updateBody);
  await patient.save();
  return patient;
};


/**
 * Update Patient by phone
 * @param {ObjectId} phone
 * @param {Object} updateBody
 * @returns {Promise<Patient>}
 */
const updatePatientByPhone = async (phone, updateBody) => {
  const patient = await getPatientByPhone(phone);
  if (!patient) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Patient not found');
  }
  //   if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
  //     throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  //   }
  Object.assign(patient, updateBody);
  await patient.save();
  return patient;
};


/**
 * Delete user by id
 * @param {ObjectId} bookId
 * @returns {Promise<Book>}
 */
const deletePatientByPhone = async (phone) => {
  const patient = await getPatientByPhone(phone);
  console.log(patient)
  if (!patient) {
    throw new ApiError(httpStatus.NOT_FOUND, "Patient not found");
  }
  await patient.remove();
  return patient;
};

/**
 * Delete user by id
 * @param {ObjectId} bookId
 * @returns {Promise<Book>}
 */
const deletePatientById = async (patientId) => {
  const patient = await getPatientById(patientId);
  if (!patient) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  await patient.remove();
  return patient;
};

module.exports = {
  createPatient,
  queryPatient,
  getPatientById,
  updatePatientById,
  deletePatientById,
  getPatientByPhone,
  updatePatientByPhone,
  deletePatientByPhone
};
