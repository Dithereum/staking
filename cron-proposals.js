#!/usr/bin/env nodejs
const mysql = require('mysql');
const util = require('util');
const Web3 = require("web3");
require('dotenv').config();
var CronJob = require('cron').CronJob;


/// DB Connection Config Obj
if((process.env.DB_HOST) && (process.env.DB_USER) && (process.env.DB_PASSWORD) && (process.env.DB_DATABASE) && (process.env.DB_PORT)){
    var DB_CONFIG = {
        host: process.env.DB_HOST.toString(),
        user: process.env.DB_USER.toString(),
        password: process.env.DB_PASSWORD.toString(),
        database: process.env.DB_DATABASE.toString(),
        connectTimeout: 50000,
        port: process.env.DB_PORT
    };
}else{
    console.error(">Error occured ...",Date())
    console.error(">> please check all env data is coming properly .. existing script ..");
    process.exit(1)
}
//
setTimeout (()=>{}, 4000);
//console.log(">> DB_CONFIG ...", DB_CONFIG)

const options = {
    timeout: 30000,
    reconnect: {
        auto: true,
        delay: 5000,
        maxAttempts: 10,
        onTimeout: true,
    },
    clientConfig: {
        keepalive: true,
        keepaliveInterval: 60000,
        maxReceivedFrameSize: 100000000,
        maxReceivedMessageSize: 100000000,
    },
};


var ProposalContract = '0x000000000000000000000000000000000000F002';
var Web3Provider = process.env.CUSTOM_NETWORK_WEB3_PROVIDER;
var fromWeb3 = new Web3(new Web3.providers.HttpProvider(Web3Provider, options));

var CONTRACT_ABI = JSON.parse(process.env.Proposal_ABI);


const contractInstance = new fromWeb3.eth.Contract(CONTRACT_ABI, ProposalContract.toString());
async function getEventData_Proposal(_fromBlock, _toBlock) {
 var ChainCurrentBlock = await fromWeb3.eth.getBlockNumber();
 try {

        await contractInstance.getPastEvents('LogCreateProposal', {
            fromBlock: _fromBlock,
            toBlock: _toBlock
        }, async function(error, events) {
            try {
                console.log(error);
                var eventlen = events.length;
                console.log("LogCreateProposal from >> to  >>> eventlen >>>>", _fromBlock, _toBlock, eventlen);
                const waitsec = (ms) => new Promise(resolve => setTimeout(resolve, ms));
                for (var i = 0; i < eventlen; i++) {
                    await waitsec(3500);
                    var eve = events[i];
                    console.log(eve);
                    var _blkNumber = eve.blockNumber;
                    var _txnHash = eve.transactionHash;
                    var proposalId = eve.returnValues.id;
                    var proposer = eve.returnValues.proposer;
                    var dst = eve.returnValues.dst;
                    var time = eve.returnValues.time;
                     try {
                            var sp_query = "INSERT INTO `tbl_proposals` (`pId`,`proposer`,`dst`,`logdatetime`,isActive) VALUES ('" + proposalId + "','" + proposer + "','" + dst + "',CAST(FROM_UNIXTIME(" + time + ") AS DATETIME),1)";
                            console.log("-----------------------------------------------------------------------------");
                            console.log(">>>>> SP_Query >>>>>", sp_query);
                            console.log("-----------------------------------------------------------------------------");
                            await db_query(sp_query).catch(console.log);
                        } catch (e) {
                            console.error("2 Date() -->>", Date());
                            console.error("2>>>Error -->>", e);
                        }
                }

            } catch (e) {
                console.error("1 Date() -->>", Date());
                console.error("1>>>Error -->>", e);
            }
        });
        ////
    } catch (e) {
        console.error("3 Date() -->>", Date());
        console.error("3>>>Error -->>", e);
    }
}

async function getEventData_PassProposal(_fromBlock, _toBlock) {
 var ChainCurrentBlock = await fromWeb3.eth.getBlockNumber();
 try {

        await contractInstance.getPastEvents('LogPassProposal', {
            fromBlock: _fromBlock,
            toBlock: _toBlock
        }, async function(error, events) {
            try {
                console.log(error);
                var eventlen = events.length;
                console.log("LogPassProposal from >> to  >>> eventlen >>>>", _fromBlock, _toBlock, eventlen);
                const waitsec = (ms) => new Promise(resolve => setTimeout(resolve, ms));
                for (var i = 0; i < eventlen; i++) {
                    await waitsec(3500);
                    var eve = events[i];
                   // console.log(eve);
                    var proposalId = eve.returnValues.id;
                    var dst = eve.returnValues.dst;
                     try {
                            var sp_query = "UPDATE `tbl_proposals` set isActive = 0 where `pId`='" + proposalId + "' and dst='" + dst + "'";
                            console.log(sp_query)
                            await db_query(sp_query).catch(console.log);
                        } catch (e) {
                            console.error("4 Date() -->>", Date());
                            console.error("4>>>Error -->>", e);
                        }
                }

            } catch (e) {
                console.error("5 Date() -->>", Date());
                console.error("5>>>Error -->>", e);
            }
        });
        ////
    } catch (e) {
        console.error("6 Date() -->>", Date());
        console.error("6>>>Error -->>", e);
    }
}
  async function getEventData_RejectProposal(_fromBlock, _toBlock) {
 var ChainCurrentBlock = await fromWeb3.eth.getBlockNumber();
 try {

        await contractInstance.getPastEvents('LogRejectProposal', {
            fromBlock: _fromBlock,
            toBlock: _toBlock
        }, async function(error, events) {
            try {
                console.log(error);
                var eventlen = events.length;
                console.log("LogRejectProposal from >> to  >>> eventlen >>>>", _fromBlock, _toBlock, eventlen);
                const waitsec = (ms) => new Promise(resolve => setTimeout(resolve, ms));
                for (var i = 0; i < eventlen; i++) {
                    await waitsec(3500);
                    var eve = events[i];
                    console.log(eve);
                    var proposalId = eve.returnValues.id;
                    var dst = eve.returnValues.dst;
                     try {
                            var sp_query = "UPDATE `tbl_proposals` set isActive = 0 where `pId`='" + proposalId + "' and dst='" + dst + "'";
                            console.log(sp_query)
                            await db_query(sp_query).catch(console.log);
                        } catch (e) {
                            console.error("7 Date() -->>", Date());
                            console.error("7 >>>Error -->>", e);
                        }
                }

            } catch (e) {
                console.error("8 Date() -->>", Date());
                console.error("8>>>Error -->>", e);
            }
        });
        ////
    } catch (e) {
        console.error("9 Date() -->>", Date());
        console.error("9>>>Error -->>", e);
    }
}

async function execute() {
    var CurrentBlock = await fromWeb3.eth.getBlockNumber();

    var dbConn = mysql.createConnection(DB_CONFIG);
    try {
        const myquery = util.promisify(dbConn.query).bind(dbConn);
        var select_wallet_query = "SELECT egonlastblock FROM lastblock";
        console.log(select_wallet_query)
        var lastBlockData = await myquery(select_wallet_query).catch(console.log);

        if (lastBlockData[0]) {

//=================================================================================
//   Change following networks accordingly when changing network in the script
//=================================================================================
            var LastBlockDB = lastBlockData[0].egonlastblock;

            //updating the current block in the database
            await lastBlockWorked(CurrentBlock);

            //toChainLastBlockDB = 3345470

            await getEventData_Proposal(LastBlockDB,CurrentBlock);
            await getEventData_PassProposal(LastBlockDB,CurrentBlock);
            await getEventData_RejectProposal(LastBlockDB,CurrentBlock);

        }

    } catch (e) {
        console.error("10 Date() -->>", Date());
        console.error("10>>>Error -->>", e);
    } finally {
        dbConn.end();
    }
}

async function lastBlockWorked(CurrentBlock) {


//=================================================================================
//   Change following table field accordingly when changing network in the script
//=================================================================================

    var sql = "UPDATE lastblock SET egonlastblock=" + CurrentBlock + " LIMIT 1";
    console.log("<<< SQL >>>", sql);
    return db_query(sql, "UpdateQuery");
}
async function db_query(_sql, _querytype) {
    var con = mysql.createConnection(DB_CONFIG);
    try {
        con.connect(function(err) {
            if (err) {
                console.log(">>> Error DB connect:", err);
            }
            console.log(">>> Connected to database:>>>");
            try {
                con.query(_sql, function(err, result) {
                    if (err) {
                        console.error("11 Date() -->>", Date());
                        console.error("11>>>Error -->>", e);
                    } else {
                        console.log(">>> Query Executed >>", _querytype);
                        con.end();
                    }
                    setTimeout(() => {}, 2000);
                });
            } catch (e) {
                console.error("12 Date() -->>", Date());
                console.error("12>>>Error -->>", e);
            }
        });
    } catch (e) {
        console.error("13 Date() -->>", Date());
        console.error("13>>>Error -->>", e);
    }
}

//Cron running Every 1 min
var job = new CronJob('0 * * * * *', function() {
    // console.log("-------------------------------------");
    // console.log('Cron running, every 1 min');
    // console.log("-------------------------------------");
        execute();

}, null, true, 'America/Los_Angeles');

job.start();
