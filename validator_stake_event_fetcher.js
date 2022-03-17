/*
ALTER TABLE `stakings` ADD CONSTRAINT UNIQUE (transHash)
ALTER TABLE `lastblock_fetched` ADD CONSTRAINT UNIQUE (lastblock_pair)
*/

//#!/usr/bin/nodejs

const mysql = require('like-mysql');
const util = require('util');
require('dotenv').config();
const Web3 = require("web3");
var Tx = require('ethereumjs-tx').Transaction;
var Contract = require('web3-eth-contract');
var CronJob = require('cron').CronJob;

var VALIDATOR_CONTRACT_ABI = JSON.parse(JSON.stringify(
[{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"val","type":"address"},{"indexed":false,"internalType":"uint256","name":"time","type":"uint256"}],"name":"LogAddToTopValidators","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"val","type":"address"},{"indexed":true,"internalType":"address","name":"fee","type":"address"},{"indexed":false,"internalType":"uint256","name":"time","type":"uint256"}],"name":"LogCreateValidator","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"coinbase","type":"address"},{"indexed":false,"internalType":"uint256","name":"blockReward","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"time","type":"uint256"}],"name":"LogDistributeBlockReward","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"val","type":"address"},{"indexed":true,"internalType":"address","name":"fee","type":"address"},{"indexed":false,"internalType":"uint256","name":"time","type":"uint256"}],"name":"LogEditValidator","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"val","type":"address"},{"indexed":false,"internalType":"uint256","name":"time","type":"uint256"}],"name":"LogReactive","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"val","type":"address"},{"indexed":false,"internalType":"uint256","name":"time","type":"uint256"}],"name":"LogRemoveFromTopValidators","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"val","type":"address"},{"indexed":false,"internalType":"uint256","name":"hb","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"time","type":"uint256"}],"name":"LogRemoveValidator","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"val","type":"address"},{"indexed":false,"internalType":"uint256","name":"hb","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"time","type":"uint256"}],"name":"LogRemoveValidatorIncoming","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"staker","type":"address"},{"indexed":true,"internalType":"address","name":"val","type":"address"},{"indexed":false,"internalType":"uint256","name":"staking","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"time","type":"uint256"}],"name":"LogStake","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"staker","type":"address"},{"indexed":true,"internalType":"address","name":"val","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"time","type":"uint256"}],"name":"LogUnstake","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address[]","name":"newSet","type":"address[]"}],"name":"LogUpdateValidator","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"val","type":"address"},{"indexed":true,"internalType":"address","name":"fee","type":"address"},{"indexed":false,"internalType":"uint256","name":"hb","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"time","type":"uint256"}],"name":"LogWithdrawProfits","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"staker","type":"address"},{"indexed":true,"internalType":"address","name":"val","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"time","type":"uint256"}],"name":"LogWithdrawStaking","type":"event"},{"inputs":[],"name":"MaxValidators","outputs":[{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MinimalStakingCoin","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"ProposalAddr","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PunishContractAddr","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"StakingLockPeriod","outputs":[{"internalType":"uint64","name":"","type":"uint64"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"ValidatorContractAddr","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"WithdrawProfitPeriod","outputs":[{"internalType":"uint64","name":"","type":"uint64"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address payable","name":"feeAddr","type":"address"},{"internalType":"string","name":"moniker","type":"string"},{"internalType":"string","name":"identity","type":"string"},{"internalType":"string","name":"website","type":"string"},{"internalType":"string","name":"email","type":"string"},{"internalType":"string","name":"details","type":"string"}],"name":"createOrEditValidator","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"currentValidatorSet","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"distributeBlockReward","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"getActiveValidators","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"staker","type":"address"},{"internalType":"address","name":"val","type":"address"}],"name":"getStakingInfo","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTopValidators","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTotalStakeOfActiveValidators","outputs":[{"internalType":"uint256","name":"total","type":"uint256"},{"internalType":"uint256","name":"len","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"val","type":"address"}],"name":"getValidatorDescription","outputs":[{"internalType":"string","name":"","type":"string"},{"internalType":"string","name":"","type":"string"},{"internalType":"string","name":"","type":"string"},{"internalType":"string","name":"","type":"string"},{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"val","type":"address"}],"name":"getValidatorInfo","outputs":[{"internalType":"address payable","name":"","type":"address"},{"internalType":"enum Validators.Status","name":"","type":"uint8"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"highestValidatorsSet","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address[]","name":"vals","type":"address[]"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"initialized","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"who","type":"address"}],"name":"isActiveValidator","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"who","type":"address"}],"name":"isTopValidator","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"val","type":"address"}],"name":"removeValidator","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"val","type":"address"}],"name":"removeValidatorIncoming","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"validator","type":"address"}],"name":"stake","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"totalJailedHB","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalStake","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"validator","type":"address"}],"name":"tryReactive","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"validator","type":"address"}],"name":"unstake","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"newSet","type":"address[]"},{"internalType":"uint256","name":"epoch","type":"uint256"}],"name":"updateActiveValidatorSet","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"moniker","type":"string"},{"internalType":"string","name":"identity","type":"string"},{"internalType":"string","name":"website","type":"string"},{"internalType":"string","name":"email","type":"string"},{"internalType":"string","name":"details","type":"string"}],"name":"validateDescription","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"validator","type":"address"}],"name":"withdrawProfits","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"validator","type":"address"}],"name":"withdrawStaking","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}]
));
    
let VALIDATOR_CONTRACT_ADDRESS = '0x000000000000000000000000000000000000f000';	  // Dithereum TestNet
					
var DB_CONFIG = {
  		host: process.env.DB_HOST.toString(),
  		user: process.env.DB_USER.toString(),
  		password: process.env.DB_PASSWORD.toString(),
  		database: 'myvalidators',
  		connectTimeout: 100000,
  		port: process.env.DB_PORT
};

const db = mysql('127.0.0.1:3306', 'root', 'Admin@1234', 'myvalidators');

async function setme(){
	return await db.ready();
}

setme();

setTimeout(()=>{},4000);

const options = {
    timeout: 90000,
    reconnect: {
      auto: true,
      delay: 5000,
      maxAttempts: 20,
      onTimeout: true,
    },
    clientConfig: {
      keepalive: true,
      keepaliveInterval: 120000,
      maxReceivedFrameSize: 100000000,
      maxReceivedMessageSize: 100000000,
    },
};	 

 
let web3 = new Web3(new Web3.providers.HttpProvider("https://node-testnet.dithereum.io", options));
     

async function getStakeEvents(){
	const instance1 = new web3.eth.Contract(VALIDATOR_CONTRACT_ABI, VALIDATOR_CONTRACT_ADDRESS.toString());	 
	//await myinstance.getPastEvents('stake',{ fromBlock: _fromBlock, toBlock: _toBlock },function(error,myevents){
	var blk = process.env.workingBlockPairs.split(",");
	// LogUnstake, LogStake
	await instance1.getPastEvents(['LogStake','LogUnstake'],{ fromBlock: parseInt(blk[0]), toBlock: parseInt(blk[1]) },function(error, events){
		console.log("<<<<< Error >>>>>",error);
		events.forEach((event)=>{
			//console.log("<<<<< event >>>>", event);
			//console.log("staker >>>>", event.returnValues.staker, "val >>>>", event.returnValues.val, "staking >>>>", event.returnValues.staking, "time >>>>", event.returnValues.time, "txhash >>>", event.transactionHash);
		   var status = ''; 
		   var amt = '';
         if(event.event.toString() == 'LogStake'){
	         status = "Staked";
	         amt = event.returnValues.staking;
         } else if(event.event.toString() == 'LogUnstake'){
         	status = "Unstaked";
         	amt = event.returnValues.amount;
         } else{
				console.log(">>>> Different event status >>>", event.event.toString());         
         }
         var q = new Date();						
			var mydate = q.getFullYear()+"-"+q.getMonth()+"-"+q.getDay()+" "+q.getHours()+":"+q.getMinutes()+":"+q.getSeconds();
			var myObj = {
				"stakerAddress": event.returnValues.staker.toString(), 
			   "validatorAddress": event.returnValues.val.toString(),
			   "stakeAmount": amt, 
			   "timeStamp": event.returnValues.time.toString(), 
			   "status": status, 
			   "transHash": event.transactionHash.toString(),
			   "createdAt": mydate,
			   "updatedAt": mydate
         };
		   //console.log(">>>> MYOBJ >>>>", myObj);
			db.insert('stakings', myObj).then(console.log).catch(console.log);
		});
		
		db.insert('lastblock_fetched', {'timestamp1': Date.now(),'lastblock_pair': process.env.workingBlockPairs}).catch(console.log);
	});
	console.log("Working on process.env.workingBlockPairs >>>", process.env.workingBlockPairs);		
}

async function myfunction() {
	const rows = await db.select('lastblock_fetched', ['lastblock_pair'], "ORDER BY timestamp1 DESC LIMIT 1");	
	if(typeof process.env.workingBlockPairs == "undefined"){	
		if(rows.length == 0){			
			process.env.workingBlockPairs = "0,500";
		}else{	
			var db_blk = rows[0].lastblock_pair.split(",");
			var fromblock = parseInt(db_blk[1])+1;
			var toblock = parseInt(db_blk[1])+500;
			process.env.workingBlockPairs = fromblock.toString()+","+toblock.toString();
		}
	}else{
		console.log(">>>> Else loop >>>");
		//var blk = process.env.workingBlockPairs.split(",");
		var db_blk = rows[0].lastblock_pair.split(",");
		var fromblock = parseInt(db_blk[1])+1;
		var toblock = parseInt(db_blk[1])+500;
		process.env.workingBlockPairs = fromblock.toString()+","+toblock.toString();
		console.log(">>>>> process.env.workingBlockPairs <<<<<<<", process.env.workingBlockPairs);
	}
	setTimeout(()=>{},4000);
	var z = await getStakeEvents();
} 


var job = new CronJob('50 * * * * *', function() {  
	  console.log("@@@@@@>> process.env.workingBlockPairs >>>", process.env.workingBlockPairs);
	  myfunction();
}, null, true, 'America/Los_Angeles');
job.start();









