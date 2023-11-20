const mongoose = require("mongoose");
const schema = mongoose.Schema;

const categorySchema = new schema({
  name: {
    type: String,
    required: [true, "Category name is required"],
  },

  image: {
    type: String,
    required: [true, "Category image is required"],
  },
});

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
