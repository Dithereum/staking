module.exports = (sequelize, Sequelize) => {

const Validator = sequelize.define("validator", {
	validatorName: {
		type: Sequelize.STRING
	},
	validatorDescription: {
		type: Sequelize.STRING
	},
	validatorWalletAddress: {
		type: Sequelize.STRING	
	},
	validatorFeeAddress: {
		type: Sequelize.STRING
	},
	validatorSelfStaked: {
		type: Sequelize.BIGINT
	},
	validatorDeligatorStaked: {
		type: Sequelize.BIGINT
	},
	validatorAPR: {
		type: Sequelize.FLOAT
	},
	validatorCommission: {
		type: Sequelize.FLOAT
	},
	joiningTimestamp: {
		type: Sequelize.DATE(6)
	},
	status: {
		type: Sequelize.STRING
	},
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	}
});
	return Validator;
};
