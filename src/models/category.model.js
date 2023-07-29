const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const categorySchema = mongoose.Schema(
  {
    category_name: {
      type: String,
      required: true,
      trim: true,
    },
    category_description: {
      type: String,
      required: true,
      trim: true,
    },
    is_top_category: {
      type: String,
      required: true,
      trim: true,
    },
    encoder_ID:{
        type: String,
      required: true,
      trim: true,
      default:"123457"
    }
  },
  
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
categorySchema.plugin(toJSON);
categorySchema.plugin(paginate);

/**
 * @typedef Doctor
 */
const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
