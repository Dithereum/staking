module.exports = {
	HOST: "localhost",
	USER: "root",
	PASSWORD: "Admin@1234",
	DB: "VALIDATOR_DB",
	dialect: "mysql",
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000
	}
};
