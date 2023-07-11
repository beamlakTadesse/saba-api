const express = require('express');
// const auth = require("../../middlewares/auth");
// const validate = require("../../middlewares/validate");
// const bookValidation = require("../../validations/book.validation");
const { doctorController } = require('../../controllers/index');

const router = express.Router();

router.route('/').post(doctorController.createDoctor).get(doctorController.getDoctors);
router
  .route('/:phone')
  .get(doctorController.getDoctorByPhone)
  .patch(doctorController.updateDoctorByPhone)
  .delete(doctorController.deleteDoctorByPhone);
router.route('/:phone/status').get(doctorController.getDoctorStatus);
router
  .route('/:patientId')

  .get(doctorController.getDoctor)
  .patch(doctorController.updateDoctor)
  .delete(doctorController.deleteDoctor);

module.exports = router;
