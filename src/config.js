var config = {};

config.pi_address = "http://192.168.0.34:5002"
config.pi_get_recepies = config.pi_address + "/Siri/Recipes"
config.pi_get_ingredients = config.pi_address + "/Siri/Ingredients"
config.pi_get_units = config.pi_address + "/Siri/Units"
config.pi_get_recipe_ingredients = config.pi_address + "/Siri/RecipeIngredients"
config.pi_post_selection = config.pi_address + "/Siri/ReactRecipes"
config.pi_post_add_recipe = config.pi_address + "/Siri/AddRecipe"
config.pi_post_add_ingredient = config.pi_address + "/Siri/AddIngredient"
config.mock_api = "http://localhost:3000/"

module.exports = config;