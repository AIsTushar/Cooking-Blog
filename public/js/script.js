// Get the element with the id 'addIngredientsBtn'
let addIngredientsBtn = document.getElementById("addIngredientsBtn");

// Get the element with the class 'ingredientList'
let ingredientList = document.querySelector(".ingredientList");

// Get the first element with the class 'ingredeintDiv'
let ingredeintDiv = document.querySelectorAll(".ingredeintDiv")[0];

// Add an event listener to the button with the id 'addIngredientsBtn'
addIngredientsBtn.addEventListener("click", function () {
  // Clone the first 'ingredeintDiv' element, along with its children
  let newIngredients = ingredeintDiv.cloneNode(true);

  // Get the input element inside the cloned 'ingredeintDiv'
  let input = newIngredients.getElementsByTagName("input")[0];

  // Set the value of the input to an empty string
  input.value = "";

  // Append the cloned 'ingredeintDiv' to the 'ingredientList'
  ingredientList.appendChild(newIngredients);
});
