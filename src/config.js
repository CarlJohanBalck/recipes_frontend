var config = {};

config.pi_address = "http://192.168.0.4:5001"
config.pi_get_recepies = config.pi_address + "/Siri/Recepies"
config.pi_post_selection = config.pi_address + "/Siri/ReactRecepies"
config.mock_api = "http://localhost:3000/"

module.exports = config;