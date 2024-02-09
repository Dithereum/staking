$(document).ready(function(){
    var isNetwork= false;
    var proposalContract = '0x000000000000000000000000000000000000F002';
    var APIURL = 'https://egonproposal-api.egonscan.com/';
    var proposalABI = JSON.parse('[ { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "bytes32", "name": "id", "type": "bytes32" }, { "indexed": true, "internalType": "address", "name": "proposer", "type": "address" }, { "indexed": true, "internalType": "address", "name": "dst", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "time", "type": "uint256" } ], "name": "LogCreateProposal", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "bytes32", "name": "id", "type": "bytes32" }, { "indexed": true, "internalType": "address", "name": "dst", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "time", "type": "uint256" } ], "name": "LogPassProposal", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "bytes32", "name": "id", "type": "bytes32" }, { "indexed": true, "internalType": "address", "name": "dst", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "time", "type": "uint256" } ], "name": "LogRejectProposal", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "val", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "time", "type": "uint256" } ], "name": "LogSetUnpassed", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "bytes32", "name": "id", "type": "bytes32" }, { "indexed": true, "internalType": "address", "name": "voter", "type": "address" }, { "indexed": false, "internalType": "bool", "name": "auth", "type": "bool" }, { "indexed": false, "internalType": "uint256", "name": "time", "type": "uint256" } ], "name": "LogVote", "type": "event" }, { "inputs": [], "name": "MaxValidators", "outputs": [ { "internalType": "uint16", "name": "", "type": "uint16" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "MinimalStakingCoin", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "ProposalAddr", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "PunishContractAddr", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "StakingLockPeriod", "outputs": [ { "internalType": "uint64", "name": "", "type": "uint64" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "ValidatorContractAddr", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "WithdrawProfitPeriod", "outputs": [ { "internalType": "uint64", "name": "", "type": "uint64" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "burnPartPercent", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "burnStopAmount", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "contractPartPercent", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "dst", "type": "address" }, { "internalType": "string", "name": "details", "type": "string" } ], "name": "createProposal", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address[]", "name": "vals", "type": "address[]" } ], "name": "initialize", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "initialized", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "minimumValidatorStaking", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "", "type": "address" } ], "name": "pass", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "proposalLastingPeriod", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "bytes32", "name": "", "type": "bytes32" } ], "name": "proposals", "outputs": [ { "internalType": "address", "name": "proposer", "type": "address" }, { "internalType": "address", "name": "dst", "type": "address" }, { "internalType": "string", "name": "details", "type": "string" }, { "internalType": "uint256", "name": "createTime", "type": "uint256" }, { "internalType": "uint16", "name": "agree", "type": "uint16" }, { "internalType": "uint16", "name": "reject", "type": "uint16" }, { "internalType": "bool", "name": "resultExist", "type": "bool" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "val", "type": "address" } ], "name": "setUnpassed", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "stakerPartPercent", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalBurnt", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "validatorPartPercent", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "bytes32", "name": "id", "type": "bytes32" }, { "internalType": "bool", "name": "auth", "type": "bool" } ], "name": "voteProposal", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "", "type": "address" }, { "internalType": "bytes32", "name": "", "type": "bytes32" } ], "name": "votes", "outputs": [ { "internalType": "address", "name": "voter", "type": "address" }, { "internalType": "uint256", "name": "voteTime", "type": "uint256" }, { "internalType": "bool", "name": "auth", "type": "bool" } ], "stateMutability": "view", "type": "function" } ]');
    async function init(){
        proposalContractInstance = new myweb3.eth.Contract(proposalABI, proposalContract, {
            from: myAccountAddress, // default from address
        });

         var tblData = "";
        //validators Table data
        $.getJSON( APIURL, {
          tags: "",
          tagmode: "any",
          format: "json"
        })
          .done(function( APIdata ) {
          if(APIdata.data!="No records found"){
            for(i=0 ; i < APIdata.data.length ;i++)
            {

              var item = APIdata.data[i];
              var pstatus = "InActive";
              if(item.isActive == 1) {pstatus = 'Active';}
              console.log(" tx id: " + item.txnHash);
              tblData +='<tr>'+
                       '<td>'+item.dst+'</a></td>'+
                       '<td>'+item.proposer+'</td>'+
                       '<td>'+getDateString(new Date(item.logdatetime), "d-M-y at h:m:s") +'</td>'+
                       '<td>'+pstatus+'</td>'+
                       '<td><button class="btn btn-outline-primary btn-sm btnVote"  data="'+item.pId+'">Vote</button></td>'+
                   '</tr>';
                   //$("#proposalTable").append(tblData);
            }
            $("#proposalTable").html(tblData);
            $("#proposalcnt").html(APIdata.data.length);
              $('.btnVote').click(async function(){
                var proposalId= $(this).attr("data");
                const web3GasPrice =await myweb3.eth.getGasPrice();
                var data =  proposalContractInstance.methods.voteProposal(proposalId,true).encodeABI();
                processTx(data,proposalContract,web3GasPrice,gasLimit,0,explorerURL);

              });
          }
          });

    }

    $('#addproposal').click(function(){
        var dlgContentHTML = $('#dlgContent').html();
        $('#dlgContent').html("");
        alertify.confirm(dlgContentHTML).set('onok',async function(closeevent, value) {
        var valAdd = $('#valAdd').val();
        var propdetails = $('#propdetails').val();

        const web3GasPrice =await myweb3.eth.getGasPrice();

        var data =  proposalContractInstance.methods.createProposal(valAdd,propdetails).encodeABI();
        processTx(data,proposalContract,web3GasPrice,gasLimit,0,explorerURL);

    }).set('title', "Add Proposal");



    });


    setTimeout(init,1000);
    //auto refresh after network select in mm
    setInterval(async function(){
        const chainID = await myweb3.eth.getChainId();
        if(chainID==CHAIN_ID && isNetwork==false){
            init();
            isNetwork=true;
        }
    },1000);

    $('#addBNINetwork').click(function(){
        addNetwork();
    })
    var  getDateString = function(date, format) {
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        getPaddedComp = function(comp) {
            return ((parseInt(comp) < 10) ? ('0' + comp) : comp)
        },
        formattedDate = format,
        o = {
            "y+": date.getFullYear(), // year
            "M+": months[date.getMonth()], //month
            "d+": getPaddedComp(date.getDate()), //day
            "h+": getPaddedComp((date.getHours() > 12) ? date.getHours() % 12 : date.getHours()), //hour
             "H+": getPaddedComp(date.getHours()), //hour
            "m+": getPaddedComp(date.getMinutes()), //minute
            "s+": getPaddedComp(date.getSeconds()), //second
            "S+": getPaddedComp(date.getMilliseconds()), //millisecond,
            "b+": (date.getHours() >= 12) ? 'PM' : 'AM'
        };

        for (var k in o) {
            if (new RegExp("(" + k + ")").test(format)) {
                formattedDate = formattedDate.replace(RegExp.$1, o[k]);
            }
        }
        return formattedDate;
    };


});
