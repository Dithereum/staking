const db = require("../models"); // models path depend on your structure
const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('mysql::memory:');
const Validator = db.validators;
console.log(">>>>>> Validator >>>>", Validator);
exports.create = (req, res) => {
  // Validate request
  if (!req.body.validatorName) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Validator
  const validator = {
    validatorName: req.body.validatorName,
    validatorDescription: req.body.validatorDescription,
    validatorWalletAddress: req.body.validatorWalletAddress,
    validatorFeeAddress: req.body.validatorFeeAddress,
    validatorSelfStaked: req.body.validatorSelfStaked,
	 validatorDeligatorStaked: req.body.validatorDeligatorStaked,    
    validatorAPR: req.body.validatorAPR,
    validatorCommission: req.body.validatorCommission,
    joiningTimestamp: req.body.joiningTimestamp,
    status: req.body.status
  };


  // Save validator in the database
  Validator.create(validator)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Validator."
      });
    });
};

//http://localhost:9980/api/validators/activevalidators
exports.activevalidators = (req, res)=>{
	Validator.count({
		attributes: ['validatorName'],
		group: 'validatorName',
		where: { status: "Active"}
	}).then(data =>{
		//console.log("DATA, ActiveValidators >>>", data, data.length);
		res.send({"ActiveValidators": data.length});
	}).catch(err=>{
		res.status(500).send({
				message:
         	 err.message || "Some error occurred while retrieving validators."
		});
	});
}

//http://localhost:9980/api/validators/bondedtokens
exports.bondedTokens = (req, res)=>{
	Validator.findAll({
		attributes: [
			[ 
				sequelize.fn('SUM',(sequelize.fn('COALESCE', (sequelize.col('validatorSelfStaked')), 0))), 'sum_selfstake'
			],
   		[ 
				sequelize.fn('SUM',(sequelize.fn('COALESCE', (sequelize.col('validatorDeligatorStaked')), 0))), 'sum_deligatorstake'
			],
		], 
	})
	.then(data =>{
		//console.log("sum_selfstake,sum_deligatorstake >>>",data[0].dataValues.sum_selfstake, data[0].dataValues.sum_deligatorstake);
		var bonded_tokens = parseInt(data[0].dataValues.sum_selfstake) + parseInt(data[0].dataValues.sum_deligatorstake);
		res.send({ "bonded_tokens": bonded_tokens	});
	}).catch(err=>{
		res.status(500).send({
				message:
         	 err.message || "Some error occurred while retrieving validators."
		});
	});
}

//http://localhost:9980/api/validators/getValidators
exports.getAll = (req, res)=>{
	Validator.findAll({
		attributes: [ 'validatorName', 'validatorCommission', 'validatorAPR', 'status', 'validatorSelfStaked', 'validatorDeligatorStaked' ],
	})
	.then(data =>{
		var validatorslist = [];
		data.forEach((myvalidator)=>{
			//console.log(">>>",myvalidator.dataValues);
			var vpower = parseInt(myvalidator.dataValues.validatorSelfStaked) + parseInt(myvalidator.dataValues.validatorDeligatorStaked);
			var vperc = vpower/100;
			var myob = {
					"validatorName": myvalidator.dataValues.validatorName,
					"validatorCommission": myvalidator.dataValues.validatorCommission.toString() +"%",
					"validatorAPR": myvalidator.dataValues.validatorAPR.toString() +"%",
					"status": myvalidator.dataValues.status,
					"validatorSelfStaked": myvalidator.dataValues.validatorSelfStaked,
					"validatorDeligatorStaked": myvalidator.dataValues.validatorDeligatorStaked,
					"votingpower": vpower.toString() +" / "+ vperc.toString() +"%"
			}			
			validatorslist.push(myob);
		});
		//console.log("validatorslist >>>>",validatorslist);
		res.send({ "validators_list": validatorslist });
	}).catch(err=>{
		res.status(500).send({
				message:
         	 err.message || "Some error occurred while retrieving validators."
		});
	});
}


//getAllValidators  - single request to get all data
//http://localhost:9980/api/validators/getallvalidators
exports.getAllValidators = (req, res)=>{	
	async function  myfunction(){
		var data = {};
		data['activeValidators'] = '';
		data['bondedtokens'] = '';
		data["validators_list"] = [];	
		var activeValidators = await Validator.count({
			attributes: ['validatorName'],
			group: 'validatorName',
			where: { status: "Active"}
		}).catch(err=>{
			res.status(500).send({
					message:
	         	 err.message || "Some error occurred while retrieving validators."
			});
		});
		data['activeValidators'] = activeValidators.length;
		
		/////---
		var bt = await Validator.findAll({
			attributes: [
				[ 
					sequelize.fn('SUM',(sequelize.fn('COALESCE', (sequelize.col('validatorSelfStaked')), 0))), 'sum_selfstake'
				],
   			[ 
					sequelize.fn('SUM',(sequelize.fn('COALESCE', (sequelize.col('validatorDeligatorStaked')), 0))), 'sum_deligatorstake'
				],
			], 
		}).catch(err=>{
			res.status(500).send({
					message:
	         	 err.message || "Some error occurred while retrieving validators."
			});
		});	

		var bondedtokens = parseInt(bt[0].dataValues.sum_selfstake) + parseInt(bt[0].dataValues.sum_deligatorstake);	
		data['bondedtokens']=bondedtokens;		
		/////---
		////###
		var validatorslist = [];
		var v = await Validator.findAll({
			attributes: [ 'validatorName', 'validatorWalletAddress', 'validatorCommission', 'validatorAPR', 'status', 'validatorSelfStaked', 'validatorDeligatorStaked' ],
		}).catch(err=>{
			res.status(500).send({
					message:
	         	 err.message || "Some error occurred while retrieving validators."
			});
		});
		
		v.forEach((myvalidator)=>{		
			var vpower = parseInt(myvalidator.dataValues.validatorSelfStaked) + parseInt(myvalidator.dataValues.validatorDeligatorStaked);
			var vperc = vpower/100;
			var myob = {
					"validatorName": myvalidator.dataValues.validatorName,
				        "validatorWalletAddress": myvalidator.dataValues.validatorWalletAddress, 
					"validatorCommission": myvalidator.dataValues.validatorCommission.toString() +"%",
					"validatorAPR": myvalidator.dataValues.validatorAPR.toString() +"%",
					"status": myvalidator.dataValues.status,
					"validatorSelfStaked": myvalidator.dataValues.validatorSelfStaked,
					"validatorDeligatorStaked": myvalidator.dataValues.validatorDeligatorStaked,
					"votingpower": vpower.toString() +" / "+ vperc.toString() +"%"
			}			
			validatorslist.push(myob);			
		});
		data["validators_list"]=validatorslist;   		
		///###
		return data;
	}
	myfunction().then((x)=>{
		res.send(x);
	});
}
