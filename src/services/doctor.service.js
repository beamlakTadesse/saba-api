const httpStatus = require('http-status');
const { Doctor } = require("../models");
const ApiError = require("../utils/ApiError");

/**
 * Create a patient
 * @param {Object} doctorbody
 * @returns {Promise<Doctor>}
 */
const createDoctor = async (doctorbody) => {
  if(await getDoctorByPhone(doctorbody.phone)){
  console.log(getDoctorByPhone(doctorbody.phone))
      throw new ApiError(httpStatus.ALREADY_REPORTED, 'Doctor with phone number already found');
    
  }
  return Doctor.create(doctorbody);
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
const queryDoctor = async (filter, options) => {
  const doctor = await Doctor.paginate(filter, options);
  return doctor;
};

/**
 * Get doctor by id
 * @param {ObjectId} id
 * @returns {Promise<Doctor>}
 */
const getDoctorById = async (id) => {
  return Doctor.findById(id);
};

/**
 * Get doctor by phone
 * @param {string} phone
 * @returns {Promise<Doctor>}
 */
const getDoctorByPhone = async (phone) => {
    return Doctor.findOne({ phone });
  };

/**
 * Update Doctor by id
 * @param {ObjectId} doctorId
 * @param {Object} updateBody
 * @returns {Promise<Doctor>}
 */
const updateDoctorById = async (doctorId, updateBody) => {
  const doctor = await getDoctorById(doctorId);
  if (!doctor) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Doctor not found');
  }
  //   if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
  //     throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  //   }
  Object.assign(doctor, updateBody);
  await doctor.save();
  return doctor;
};

/**
 * Update Doctor by phone
 * @param {ObjectId} phone
 * @param {Object} updateBody
 * @returns {Promise<Doctor>}
 */
const updateDoctorByPhone = async (phone, updateBody) => {
    const doctor = await getDoctorByPhone(phone);
    if (!doctor) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Doctor not found');
    }
    //   if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
    //     throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
    //   }
    Object.assign(doctor, updateBody);
    await doctor.save();
    return doctor;
  };

/**
 * Delete user by id
 * @param {ObjectId} doctorId
 * @returns {Promise<Doctor>}
 */
const deleteDoctorById = async (doctorId) => {
  const doctor = await getDoctorById(doctorId);
  if (!doctor) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  await doctor.remove();
  return doctor;
};

/**
 * Delete user by phone
 * @param {ObjectId} doctorId
 * @returns {Promise<Doctor>}
 */
const deleteDoctorByPhone = async (phone) => {
    const doctor = await getDoctorByPhone(phone);
    if (!doctor) {
      throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }
    await doctor.remove();
    return doctor;
  };

module.exports = {
  createDoctor,
  queryDoctor,
  getDoctorById,
  updateDoctorById,
  deleteDoctorById,
  getDoctorByPhone,
  updateDoctorByPhone,
  deleteDoctorByPhone
};
