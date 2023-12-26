const httpStatus = require("http-status");
 const pick = require('../utils/pick');
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { doctorService } = require("../services");

const createDoctor = catchAsync(async (req, res) => {
  console.log(req)
  const newDoctor = {
    "name": req.body.name,
    "phone": req.body.phone,
    "sex": req.body.sex,
    "age": req.body.age,
    "yearOfGratulation": req.body.yearOfGratulation,
    // "degree": req.files['degree'][0].path,
    // "license":req.files['license'][0].path,
    "role": req.body.role,
    "alive": req.body.alive,
    "status": req.body.status,
    "language": req.body.language,
    "telegramId": req.body.telegramId,
    "patientId": req.body.patientId
  }
  console.log(newDoctor)
  const book = await doctorService.createDoctor(newDoctor);
  res.status(httpStatus.CREATED).send(book);
});

const getDoctors = catchAsync(async (req, res) => {
  const filter = pick(req.query, ["name", "role","alive","status","language"]);
  const options = pick(req.query, ["sortBy", "limit", "page"]);
  const result = await doctorService.queryDoctor(filter, options);
  res.send(result);
});

const getDoctor = catchAsync(async (req, res) => {
  const doctor = await doctorService.getDoctorById(req.params.doctorId);
  if (!doctor) {
    throw new ApiError(httpStatus.NOT_FOUND, "Doctor not found");
  }
  res.send(doctor);
});

const getDoctorByPhone = catchAsync(async (req, res) => {
    const doctor = await doctorService.getDoctorByPhone(req.params.phone);
    if (!doctor) {
      throw new ApiError(httpStatus.NOT_FOUND, "Doctor not found");
    }
    res.send(doctor);
  });

  const getDoctorStatus = catchAsync(async (req, res) => {
    const doctor = await doctorService.getDoctorByPhone(req.params.phone);
    if (!doctor) {
      throw new ApiError(httpStatus.NOT_FOUND, "Doctor not found");
    }else{
        res.send(doctor.alive)
    }
    // res.send(doctor);
  });


const updateDoctor = catchAsync(async (req, res) => {
  const doctor = await doctorService.updateDoctorById(
    req.params.doctorId,
    req.body
  );
  res.send(doctor);
});

const updateDoctorByPhone = catchAsync(async (req, res) => {
    const doctor = await doctorService.updateDoctorByPhone(
      req.params.phone,
      req.body
    );
    res.send(doctor);
  });

const deleteDoctor = catchAsync(async (req, res) => {
  await doctorService.deleteDoctorById(req.params.doctorId);
  res.status(httpStatus.NO_CONTENT).send();
});

const deleteDoctorByPhone = catchAsync(async (req, res) => {
    await doctorService.deleteDoctorById(req.params.phone);
    res.status(httpStatus.NO_CONTENT).send();
  });



module.exports = {
  createDoctor,
  getDoctor,
  getDoctors,
  updateDoctor,
  deleteDoctor,
  getDoctorByPhone,
  updateDoctorByPhone,
  deleteDoctorByPhone,
  getDoctorStatus
};
