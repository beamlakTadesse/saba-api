const express = require('express');
// const auth = require("../../middlewares/auth");
// const validate = require("../../middlewares/validate");
// const bookValidation = require("../../validations/book.validation");
const { doctorController } = require('../../controllers/index');
const multerInstance = require('../../middlewares/multer')
const router = express.Router();
// multerInstance.upload.fields([{ name: 'degree', maxCount: 1 }, { name: 'license', maxCount: 1 }])
router.post('/',doctorController.createDoctor);
router.route('/').get(doctorController.getDoctors);
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
