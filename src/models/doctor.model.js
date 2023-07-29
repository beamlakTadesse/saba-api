const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const doctorSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      trim: true,
    },
    alive: {
      type: Boolean,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      required: true,
      trim: true,
    },
    language: {
      type: String,
      required: true,
      trim: true,
      default:"English"
    },
    telegramId: {
      type: String,
      required: true,
      trim: true, 
      default:-1

    },
    patientId: {
      type: String,
      required: true,
      trim: true,
      default:-1
    },
  },
  
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
doctorSchema.plugin(toJSON);
doctorSchema.plugin(paginate);

/**
 * @typedef Doctor
 */
const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;
