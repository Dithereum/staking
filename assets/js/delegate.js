$(document).ready(function(){
    var address ="";
    if (window.location.href.indexOf('address') > 0) {
        address = window.location.href.substr(52) // 48
      }
    if(address!=""){
        const apiURL = 'https://api.dithereum.io/getstaker/'+address;
    
        async function init(){
            contractInstance = new myweb3.eth.Contract(ABI, contractAddress, {
                from: myAccountAddress, // default from address
            });
            const fetchResponse =  await fetch(apiURL);
            const edata = await fetchResponse.json();   
            //console.log(edata);
            $('#validator_address').html(address);
            var delegatorsData = "";
            // $('#delegatorName').html(edata.delegater_name);
                $('#voting_power').html(edata.left_panel[0][0].Voting_Power);
                $('#totalDelegators').html(edata.left_panel[1].total_delegators);
                $('#status').html(edata.left_panel[0][0].Status);
                $('#commision_rate').html(edata.left_panel[0][0].Commission_Rate+ "%");
                $('#apr').html(edata.left_panel[0][0].APR+'%');
                $('#self_stake').html(edata.left_panel[0][0].Self_Staked);
                $('#delegators').html(edata.left_panel[1].total_delegators);
                var timeStamp = edata.left_panel[0][0].Since_Time;
                timeStamp = new Date(timeStamp);
            console.log(timeStamp);
                var hours = timeStamp.getHours();
                var minutes = timeStamp.getMinutes();
                var seconds = timeStamp.getSeconds();
                var months = timeStamp.getMonth();
                months = parseInt(months) + 1;
                if(hours<10){ hours = '0' + hours; }
                if(minutes<10){ minutes = '0' + minutes;  }
                if(seconds<10){ seconds = '0' + seconds ; }  
                var date_time = timeStamp.getFullYear() + '-' +months + '-' + timeStamp.getDate() +  ' ' + hours + ':'+ minutes + ':' + seconds;
                console.log(date_time);    
            $('#timestamp').html(date_time);
                //$('#fee_address').html(edata.left_panel[0][0].Fee_Address);
                        
                const delegators = edata.delegator_tab;
                //const stakings = edata.staking;
                if(delegators.length>0){
                    delegators.forEach(element => {
                        delegatorsData+='<tr>'+
                                    '<td>'+element.validatorWalletAddress+'</td>'+
                                    '<td>'+element.Amount+' DTH</td>'+
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
            var encodedAddress = '0x'+'000000000000000000000000'+address.substr(2);
            encodedAddress = encodedAddress.toLowerCase();
            const eventURL =  "https://testnet.dthscan.io/api?module=logs&action=getLogs&fromBlock=0&toBlock=latest&address="+contractAddress+"&topic0=0xb9ba725934532316cffe10975da6eb25ad49c2d1c294d982c46c9f8d684ee075&topic2="+encodedAddress+"&topic0_2_opr=and";
            const fetchResponse2 =  await fetch(eventURL);
            const edata2 = await fetchResponse2.json();   
        
            if(edata2.message="OK"){
                const stakings = edata2.result;
                if(stakings.length>0){
                    var stakingData = "";
                        stakings.forEach(element => {
                            var timeStamp = parseInt(element.timeStamp)*1000;
                            var d = new Date(timeStamp);
                            var hours = d.getHours();
                            var minutes = d.getMinutes();
                            var seconds = d.getSeconds();
                            var months = d.getMonth();
                            months = parseInt(months) + 1;
                            if(hours<10){ hours = '0' + hours; }
                            if(minutes<10){ minutes = '0' + minutes;  }
                            if(seconds<10){ seconds = '0' + seconds ; }            
                            timestamp = d.getFullYear() + '-' +months + '-' + d.getDate() +  ' ' + hours + ':'+ minutes + ':' + seconds;
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
        $('#btnStake').click(async function(){
            var value = $('#stakeAmount').val();
            if($.isNumeric(value)==false){alert('Please enter Valid Amount.'); return false;}
            //
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
            
                var validatorAddress = $.urlParam('address');
                var gasLimit = 300000;
                gasLimit = gasLimit.toString();
                var payableAmount = value * 1e18;
                payableAmount = logEtoLongNumber(payableAmount);
                //const maxValidators = await contractInstance.methods.stake('0xBFb9B248D0e735032a70826572f79381dDC7F0De').send();
                const web3GasPrice = await myweb3.eth.getGasPrice();
                var result = await contractInstance.methods.stake(validatorAddress).send({
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
            //
       
        });
        //unstake 
        $('#btnUnStake').click(async function(){
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
                var validatorAddress = $.urlParam('address');
                const web3GasPrice = await myweb3.eth.getGasPrice();
                var result = await contractInstance.methods.unstake(validatorAddress).send({
                    from: myAccountAddress,
                    to: contractAddress,
                    //gasPrice: 100,
                    gasPrice: web3GasPrice,
                    gasLimit: gasLimit,
                    value : 0,       
                });
        
                if(result){
                    alertify.alert("Success !", "Successfully UnStaked.", "success");
                }

            }
            //
       
        });
        //withdraw profits
        $('#btnWithdrawProfits').click(async function(){
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
                var validatorAddress = $.urlParam('address');
                const web3GasPrice = await myweb3.eth.getGasPrice();
                var result = await contractInstance.methods.withdrawProfits(validatorAddress).send({
                    from: myAccountAddress,
                    to: contractAddress,
                    //gasPrice: 100,
                    gasPrice: web3GasPrice,
                    gasLimit: gasLimit,
                    value : 0,       
                });
        
                if(result){
                    alertify.alert("Success !", "Successfully Withdrawn Profits.", "success");
                }

            }
            //
       
        });
    }//address ends
    setTimeout(getStakingInfo,2000);
    setInterval(getStakingInfo,10000);
    setInterval(getRewardsInfo,10000);
    $.urlParam = function(name){
        var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
        if (results==null) {
           return null;
        }
        return decodeURI(results[1]) || 0;
    }
    
    async function getStakingInfo(){
        var validatorAddress = $.urlParam('address');
        var stakingInfo = await contractInstance.methods.getStakingInfo(myAccountAddress,validatorAddress).call();
        var stakedAmount = stakingInfo[0]/1e18;
        $('#stakedAmount').html(stakedAmount+' DTH');
    }

    async function getRewardsInfo(){
        var rewardsInfo = await contractInstance.methods.viewReward(myAccountAddress).call();
        var rewardAmount = rewardsInfo/1e18;
        $('#rewardAmount').html(rewardAmount+' DTH');
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


