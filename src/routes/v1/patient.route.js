const express = require("express");
// const auth = require("../../middlewares/auth");
// const validate = require("../../middlewares/validate");
// const bookValidation = require("../../validations/book.validation");
const { patientController } = require("../../controllers/index");

const router = express.Router();

router
  .route("/")
  .post(patientController.createPatient)
  .get(patientController.getPatients);
  router
  .route("/:phone")
  
  .get(patientController.getPatientByPhone)
  .patch(patientController.updatePatientByPhone)
  .delete(patientController.deletePatientByPhone);

 
router
  .route("/:patientId")
  
  .get(patientController.getPatient)
  .patch(patientController.updatePatient)
  .delete(patientController.deletePatient);

module.exports = router;
