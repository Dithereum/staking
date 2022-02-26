$(document).ready(function(){
    var address ="";
    if (window.location.href.indexOf('address') > 0) {
        address = window.location.href.substr(52) // 48
      }
    console.log(address);
    if(address!=""){
    const apiURL = 'https://api.dithereum.io/getstaker/'+address;
   
    async function init(){
        contractInstance = new myweb3.eth.Contract(ABI, contractAddress, {
            from: myAccountAddress, // default from address
        });
        const fetchResponse =  await fetch(apiURL);
        const edata = await fetchResponse.json();   
        
        var delegatorsData = "";
            $('#delegatorName').html(edata.delegater_name);
            $('#voting_power').html(edata.voting_power[0].voting_power);
            $('#totalDelegators').html(edata.total_delegators);
            $('#status').html(edata.status);
            $('#commision_rate').html(edata.commission_rate);
            $('#apr').html(edata.APR+'%');
            $('#self_stake').html(edata.SELF_STAKE);
            $('#delegators').html(edata.Delegators);
            $('#timestamp').html(edata.Since_Time);
            $('#operator_address').html(edata.Operator_Address);
            $('#self_delegate_address').html(edata.Self_Delegate_Address);
            $('#fee_address').html(edata.Fee_Address);
            $('#consensus_address').html(edata.Consensus_Address);
                       
            const delegators = edata.delegators;
            //const stakings = edata.staking;
            if(delegators.length>0){
                delegators.forEach(element => {
                    delegatorsData+='<tr>'+
                                '<td>'+element.stakerAddress+'</td>'+
                                '<td>'+element.sum_stake+' DTH</td>'+
                            '</tr>';
                });
                $("#delegatorsTable").html(delegatorsData);
            }
            // if(stakings.length>0){
            //     stakings.forEach(element => {
            //         stakingData+='<tr>'+
            //                     '<td>'+getUserAddress(element.stakerAddress)+'</td>'+
            //                     '<td>'+element.stakeAmount+' DTH</td>'+
            //                     '<td>Delegate</td>'+
            //                     '<td>'+element.timeStamp+'</td>'+
            //                     '<td><a href="#"><i class="fa fa-external-link-square" aria-hidden="true"></i></a></td>'+
            //                 '</tr>';
            //     });
            //     $("#stakingsTable").html(stakingData);
            // }   
            
            
            
    }
    setTimeout(init,1000);

    $('#pills-stakings-tab').click(async function(){
        //staking api
        const eventURL =  "https://testnet.dthscan.io/api?module=logs&action=getLogs&fromBlock=0&toBlock=latest&address="+contractAddress+"&topic0=0xb9ba725934532316cffe10975da6eb25ad49c2d1c294d982c46c9f8d684ee075";
        const fetchResponse2 =  await fetch(eventURL);
        const edata2 = await fetchResponse2.json();   
       
        if(edata2.message="OK"){
            const stakings = edata2.result;
            if(stakings.length>0){
                var stakingData = "";
                    stakings.forEach(element => {
                        var timeStamp = myweb3.utils.hexToNumber(element.timeStamp);
                        var d = new Date(timeStamp);
                        var hours = d.getHours();
                        var minutes = d.getMinutes();
                        var seconds = d.getSeconds();
                        if(hours<10){ hours = '0' + hours; }
                        if(minutes<10){ minutes = '0' + minutes;  }
                        if(seconds<10){ seconds = '0' + seconds ; }            
                        timestamp = (d.getFullYear() + '-' +d.getMonth()+1) + '-' + d.getDate() +  ' ' + hours + ':'+ minutes + ':' + seconds;
                        var userWallet = element.topics[1];
                        userWallet = '0x'+userWallet.substr(26);
                        userWallet = getUserAddress(userWallet);
                        var data = element.data;
                        var amount = data.substr(0,66);
                        amount = '0x'+amount.substr(26);
                        amount = amount /1e18;
                        var transactionHash = element.transactionHash;
                        stakingData+='<tr>'+
                                    '<td>'+userWallet+'</td>'+
                                    '<td>'+amount+' DTH</td>'+
                                    '<td>Delegate</td>'+
                                    '<td>'+timestamp+'</td>'+
                                    '<td><a target="_blank" href="https://testnet.dthscan.io/tx/'+transactionHash+'"><i class="fa fa-external-link-square" aria-hidden="true"></i></a></td>'+
                                '</tr>';
                    });
                    $("#stakingsTable").html(stakingData);
                }   
        }
    });
    $('#delegateBtn').click(async function(){
        if (window.ethereum) {
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
                if (accounts == null || accounts.length == 0) {
                    console.log("NO ACCOUNT CONNECTED");
                    alert('Please connect with Metamask');
                    return false;
                } else {
                    if (myAccountAddress != accounts[0]) {
                        myAccountAddress = accounts[0];                    
                    }                   
                 }
            
            var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
                if (isMobile && window.ethereum.isMetaMask==true){
                         const accounts_ = await window.ethereum.request({ method: 'eth_requestAccounts' });
                         if (accounts_ == null || accounts_.length == 0) {
                            console.log("NO ACCOUNT CONNECTED");
                            alert('Please connect with Metamask');
                            return false;
                        } else {
                            if (myAccountAddress != accounts_[0]) {
                                myAccountAddress = accounts_[0];                    
                            }
                    }   
            }
            

           
            var gasLimit = 300000;
            gasLimit = gasLimit.toString();
            var payableAmount = 32 * 1e18;
            console.log(myAccountAddress)
            //const maxValidators = await contractInstance.methods.stake('0xBFb9B248D0e735032a70826572f79381dDC7F0De').send();
            const web3GasPrice = await myweb3.eth.getGasPrice();
            var result = await contractInstance.methods.stake(address).send({
                from: myAccountAddress,
                to: contractAddress,
                //gasPrice: 100,
                gasPrice: web3GasPrice,
                gasLimit: gasLimit,
                value : payableAmount,       
            });
    
            if(result){
                alertify.alert("Success !", "Successfully Staked.", "success");
            }

        }
    });
    }
});
//get short user address
function getUserAddress(userAddress){
    firstFive   = userAddress.substring(0 , 5); 
    lastFive    = userAddress.substr(userAddress.length - 5);
    return firstFive+'...'+lastFive;
}

var button = document.getElementById("addDTHNetwork");
button.addEventListener("click",function(e){
     if(window.ethereum) {
               
        window.ethereum.request({method: 'eth_requestAccounts'})
        window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{chainId: '0x22', //testnet '0x61',
                chainName: "Dithereum Testnet",
                nativeCurrency: {
                name: "Binance Chain",
                symbol: "DTH",
                decimals: 18
                },
                rpcUrls: ['https://node-testnet.dithereum.io/'],     blockExplorerUrls: ['https://testnet.dthscan.io/']                    
            }]
        })
            
      }
},false);
