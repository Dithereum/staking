#!/usr/bin/env nodejs
const http = require('http');
const querystring = require('querystring');
const mysql = require('mysql');
const util = require('util');
require('dotenv').config();



 /// DB Connection Config Obj
 var DB_CONFIG = {
	host: process.env.DB_HOST.toString(),
	user: process.env.DB_USER.toString(),
	password: process.env.DB_PASSWORD.toString(),
	database: process.env.DB_DATABASE.toString(),
	connectTimeout: 50000,
	port: process.env.DB_PORT
};

/*===========================================================
//=================  REQUEST AND RESPONSE  ==================
//===========================================================

API Endpoint URL:  http://localhost:8082

Response JSON Structure:

Success:  {"result":"success", "data":"{JSON_FOR_DATA}"}

Error:    {"result":"error", "data":"Error occured"}
*/



http.createServer(function (req, res) {
console.log(" in egon proposal api script ...");
async function execute(){
	if (req.url != '/favicon.ico') {
        // Just in case we needed to call this from browser and browser calls this script twice due to favicon
        res.writeHead(200, {'Content-Type': 'text/html'});		
		
					
			var con5 = mysql.createConnection(DB_CONFIG);
			const query5 = util.promisify(con5.query).bind(con5);	
			try{					
					var select_wallet_query = "SELECT pId,dst,proposer,logdatetime,isActive=1 FROM tbl_proposals ";	
					var TxnData = await query5(select_wallet_query).catch(console.log);
						
					if(TxnData[0]){						
						let array = {result:"success", data:TxnData};
						res.write(JSON.stringify(array));
						res.end();
					}else{							
						let array = {"result":"error", "data":"No records found"};
						res.write(JSON.stringify(array));
						res.end();													
					}		
			}catch(e){
					console.log("ERROR SQL>>Catch",e);
					let array = {"result":"error", "data":"Database error"};
					res.write(JSON.stringify(array));
					res.end();
						
			}finally{
					con5.end();		
					res.end();
			}					
		
	}
}

execute();

}).listen(8082);
