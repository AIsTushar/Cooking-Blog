const Category = require("../models/categoryModel");
const Recipe = require("../models/recipeModel");

// Get home page
module.exports.homePage = async (req, res) => {
  try {
    const limit = 5;
    const categories = await Category.find().limit(limit);
    const latest = await Recipe.find().sort({ _id: -1 }).limit(limit);
    const Thai = await Recipe.find({ category: "Thai" }).limit(limit);
    const American = await Recipe.find({ category: "American" }).limit(limit);
    const Chinese = await Recipe.find({ category: "Chinese" }).limit(limit);

    const food = { latest, Thai, American, Chinese };
    res.render("index", { title: "Cooking Blog", categories, food });
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || "Something went wrong. 😡" });
  }
};

// Get recipe by Id
module.exports.getRecipeById = async (req, res) => {
  try {
    const recipeId = req.params.id;
    const recipe = await Recipe.findById(recipeId);

    res.status(200).render("recipe", {
      title: "Cooking Blog",
      recipe,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || "Something went wrong. 😡" });
  }
};

// Get submit recipe form
module.exports.getsubmitRrecipeForm = async (req, res) => {
  const infoErrorObj = req.flash("infoErrorObj");
  const infoSubmitObj = req.flash("infoSubmitObj");
  res.render("submit-recipe", {
    title: "Cooking Blog",
    infoErrorObj,
    infoSubmitObj,
  });
};

/**
 * POST /submit-recipe
 * Submit Recipe
 */
module.exports.submitNewRecipe = async (req, res) => {
  try {
    let imageUploadFile;
    let uploadPath;
    let newImageName;

    if (!req.files || Object.keys(req.files).length === 0) {
      console.log("No file was uploded!");
    } else {
      imageUploadFile = req.files.image;
      newImageName = req.body.category + Date.now() + imageUploadFile.name;
      uploadPath = __dirname + "/../public/uploads/" + newImageName;

      imageUploadFile.mv(uploadPath, function (err) {
        if (err) return res.satus(500).send(err);
      });
    }

    const newRecipe = new Recipe({
      name: req.body.name,
      description: req.body.description,
      email: req.body.email,
      ingredients: req.body.ingredients,
      category: req.body.category,
      image: newImageName,
    });

    await newRecipe.save();

    req.flash("infoSubmitObj", "Recipe Submitted Successfully");
    res.status(200).redirect("/submit-recipe");
  } catch (error) {
    req.flash("infoErrorObj", error.message);
    res.status(200).redirect("/submit-recipe");
  }
};

/**
 * Get /categories
 * Categories
 */
module.exports.exploreCategories = async (req, res) => {
  try {
    const limit = 20;
    const categories = await Category.find().limit(limit);
    res.render("categories", { title: "All Categories", categories });
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || "Something went wrong. 😡" });
  }
};

/**
 * Get /categories/:category
 * Recipes by Category
 */
module.exports.getRecipesByCategory = async (req, res) => {
  try {
    const categoryName = req.params.category;
    const limit = 20;
    const recipes = await Recipe.find({ category: categoryName }).limit(limit);

    res.status(200).render("categories", {
      title: `Cooking Blog - ${categoryName}`,
      recipes,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || "Something went wrong. 😡" });
  }
};

/**
 * POST /search
 * Search recipes
 */
module.exports.searchRecipe = async (req, res) => {
  try {
    let searchItem = req.body.searchTerm;
    const recipes = await Recipe.find({
      $text: { $search: searchItem, $diacriticSensitive: true },
    });

    res.status(200).render("search", {
      title: `Cooking Blog - ${searchItem}`,
      recipes,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || "Something went wrong. 😡" });
  }
};

// Get latest recipes
module.exports.getLatestRecipes = async (req, res) => {
  try {
    const limit = 20;
    const recipes = await Recipe.find().sort({ _id: -1 }).limit(limit);

    res.status(200).render("latest", {
      title: "Cooking Blog - Latest Recipes",
      recipes,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || "Something went wrong. 😡" });
  }
};

// Get random recipes
module.exports.getRandomRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.aggregate([{ $sample: { size: 20 } }]);
    res.status(200).render("random", {
      title: "Cooking Blog - Random Recipes",
      recipes,
    });
  } catch (error) {}
};

// dummy data
// module.exports.insertDummyData = async (req, res) => {
//   try {
//     const newRecipe = new Recipe();
//     const savedRecipe = await newRecipe.save();

//     res.send(savedRecipe);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: err.message });
//   }
// };
