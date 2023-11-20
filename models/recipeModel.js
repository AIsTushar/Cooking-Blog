const mongoose = require("mongoose");
const schema = mongoose.Schema;

const recipeSchema = new schema({
  name: {
    type: String,
    required: [true, "Recipe name is required"],
  },

  description: {
    type: String,
    required: [true, "Recipe description is required"],
  },

  email: {
    type: String,
    required: [true, "Email is required"],
  },

  ingredients: {
    type: Array,
    required: [true, "Recipe ingredients are required"],
  },

  category: {
    type: String,
    enum: [
      "Thai",
      "American",
      "Chinese",
      "Mexican",
      "Indian",
      "Spanish",
      "Bengali",
    ],
    required: [true, "Recipe category is required"],
    index: true,
  },

  image: {
    type: String,
    required: [true, "Recipe image is required"],
  },
});

recipeSchema.index({ name: "text", description: "text" });

const Recipe = mongoose.model("Recipe", recipeSchema);
module.exports = Recipe;
