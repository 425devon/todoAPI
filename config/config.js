const config = {
	port: process.env.PORT || 8000,
	db: "mongodb://localhost/tda",
	test_port: 8001,
	test_db: "mongodb://localhost/todoapi_test"
}
module.exports = config;