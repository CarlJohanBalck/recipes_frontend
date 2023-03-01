var config = {};

config.pi_address = "http://192.168.0.4:5004"
config.pi_get_recepies = config.pi_address + "/Siri/Recipes"
config.pi_post_selection = config.pi_address + "/Siri/ReactRecipes"
config.pi_post_add_recipe = config.pi_address + "/Siri/AddRecipe"
config.mock_api = "http://localhost:3000/"

module.exports = config;