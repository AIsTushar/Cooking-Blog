const express = require("express");
const router = express.Router();
const recipeController = require("../controllers/recipeController");

/* GET home page. */
router.route("/").get(recipeController.homePage);

// Get all categories
router.route("/categories").get(recipeController.exploreCategories);

// Get recipes by category
router
  .route("/categories/:category")
  .get(recipeController.getRecipesByCategory);

// Get recipes by id
router.get("/recipe/:id", recipeController.getRecipeById);
// Get latest recipes
router.get("/explore-latest", recipeController.getLatestRecipes);
// Get random recipes
router.get("/explore-random", recipeController.getRandomRecipes);

// Get submit recipe form && submit recipe
router
  .route("/submit-recipe")
  .get(recipeController.getsubmitRrecipeForm)
  .post(recipeController.submitNewRecipe);

// Get search recipe
router.post("/search-recipe", recipeController.searchRecipe);

// Get insert dummy data
// router.get("/insert-dummy-data", recipeController.insertDummyData);

module.exports = router;
