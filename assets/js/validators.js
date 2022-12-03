$.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null) {
       return null;
    }
    return decodeURI(results[1]) || 0;
}
$(document).ready(function(){
    var address ="";
    var minimumStakingAmount=0;
    var waitingWithdrawProfit=0;
    var waitingUnstaking=0;
    var waitingWithdrawStaking=0;
    var waitingBlocksForUnstake=0;
    if (window.location.href.indexOf('address') > 0) {
        address = $.urlParam('address');
      }
    if(address!=""){
        
        $('#staking_address').html('<a target="_blank" href="'+explorerURL+'address/'+contractAddress+'/contracts">'+contractAddress+'</a>');
        async function init(){
            contractInstance = new myweb3.eth.Contract(ABI, contractAddress, {
                from: myAccountAddress, // default from address
            });
            viewContractInstance = new myweb3.eth.Contract(dataViewABI, dataViewContractAddress, {
                from: myAccountAddress, // default from address
            });
            
            minimumStakingAmount = await viewContractInstance.methods.minimumStakingAmount().call(); 
            minimumStakingAmount = minimumStakingAmount/Math.pow(10,decimals);

            //validators Table data
            const validatorSpecificInfo1 = await viewContractInstance.methods.validatorSpecificInfo1(address,myAccountAddress).call();
            waitingBlocksForUnstake = validatorSpecificInfo1.waitingBlocksForUnstake;
            waitingBlocksForUnstake = waitingBlocksForUnstake/Math.pow(10,decimals);
            waitingBlocksForUnstake = waitingBlocksForUnstake.toFixed(4);
            if(waitingBlocksForUnstake>0){
                $('#waitingBlocksForUnstake').html(waitingBlocksForUnstake+' '+symbol);
            }
            if(validatorSpecificInfo1.identityName==""){
                $('#delegatorName').html(address);
            }else{
                $('#delegatorName').html(validatorSpecificInfo1.identityName);
            }
            $('#validator_address').html(address);
            if(validatorSpecificInfo1.website!=""){
                $('#weburl').html('<a target="_blank" href="'+validatorSpecificInfo1.website+'">'+validatorSpecificInfo1.website+'</a>');
            }
            if(validatorSpecificInfo1.otherDetails!=""){
                $('#otherDetails').html(validatorSpecificInfo1.otherDetails);
            }
            $('#stakingContract').html('<a target="_blank" href="'+explorerURL+'address/'+contractAddress+'">'+contractAddress+'</a>')
            var delegatorsData = "";
            $('#validator_address').html('<a target="_blank" href="'+explorerURL+'address/'+address+'/transactions">'+address+'</a>');
            var stakedAmount = validatorSpecificInfo1.stakedCoins;
            stakedAmount = stakedAmount/Math.pow(10,decimals);
            stakedAmount = stakedAmount.toFixed(4);
            $('#stakedAmount').html(stakedAmount+' '+symbol); 
            var withdrawableRewards = validatorSpecificInfo1.withdrawableRewards;
            withdrawableRewards = withdrawableRewards/Math.pow(10,decimals);
            withdrawableRewards = withdrawableRewards.toFixed(4);                    
            $('#rewardAmount').html(withdrawableRewards+' '+symbol);

            const validatorSpecificInfo2 = await viewContractInstance.methods.validatorSpecificInfo2(address,myAccountAddress).call();
            var self_stake = validatorSpecificInfo2.selfStakedCoins;
            if(self_stake>0){
                self_stake = self_stake/Math.pow(10,decimals);
                self_stake = self_stake.toFixed(4);
            }
            $('#self_stake').html(self_stake+' '+symbol);
            $('#totalStakers').html(validatorSpecificInfo2.stakers);
            var totalStaked = validatorSpecificInfo2.totalStakedCoins;
            totalStaked = totalStaked/Math.pow(10,decimals);
            totalStaked = totalStaked.toFixed(4);
            $('#totalStaked').html(totalStaked+' '+symbol);
            var status = validatorSpecificInfo2.status;
            if(status==2){
                $('#status').html('<span class="badge bg-success text-light rounded-pill">Active</span>');
            }else{
                $('#status').html('<span class="badge bg-danger text-light rounded-pill">Inactive</span>');
            }
            $('#masterVoters').html(validatorSpecificInfo2.masterVoters); 
            getstakingTxs();
            getUnstakingTxs(); 
            
        }
        setTimeout(init,1000);
        async function getstakingTxs(){
            var topic2 = '0x'+'000000000000000000000000'+address.substr(2);
            topic2 = topic2.toLowerCase();
            var topic1 = '0x'+'000000000000000000000000'+myAccountAddress.substr(2);
            topic1 = topic1.toLowerCase();
            const eventURL =  explorerURL+"api?module=logs&action=getLogs&fromBlock=0&toBlock=latest&address="+contractAddress+"&topic0="+stakingText+"&topic2="+topic2+"&topic1="+topic1+"&topic0_1_opr=and&topic0_2_opr=and&topic1_2_opr=and";
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
                            amount = amount /Math.pow(10,decimals);
                            var transactionHash = element.transactionHash;
                            stakingData+='<tr>'+
                                        '<td>'+userWallet+'</td>'+
                                        '<td>'+amount+' ' +symbol+'</td>'+
                                        '<td>'+timestamp+'</td>'+
                                        '<td><a target="_blank" href="'+explorerURL+'tx/'+transactionHash+'"><i class="fa fa-external-link-square" aria-hidden="true"></i></a></td>'+
                                    '</tr>';
                        });
                        $("#stakingsTxTable").html(stakingData);
                    }  else{
                        $("#stakingsTxTable").html('<tr><td colspan="4" style="text-align: center;">No Data Found.</td></tr>');
                    }    
            }
        }
        async function getUnstakingTxs(){
            var topic2 = '0x'+'000000000000000000000000'+address.substr(2);
            topic2 = topic2.toLowerCase();
            var topic1 = '0x'+'000000000000000000000000'+myAccountAddress.substr(2);
            topic1 = topic1.toLowerCase();
            const eventURL =  explorerURL+"api?module=logs&action=getLogs&fromBlock=0&toBlock=latest&address="+contractAddress+"&topic0="+unstakingText+"&topic2="+topic2+"&topic1="+topic1+"&topic0_1_opr=and&topic0_2_opr=and&topic1_2_opr=and";
            const fetchResponse2 =  await fetch(eventURL);
            const edata2 = await fetchResponse2.json();   
            if(edata2.message="OK"){
                const stakings = edata2.result;
                if(stakings.length>0){
                    var UnstakingData = "";
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
                            amount = amount /Math.pow(10,decimals);
                            var transactionHash = element.transactionHash;
                            UnstakingData+='<tr>'+
                                        '<td>'+userWallet+'</td>'+
                                        '<td>'+amount+' ' +symbol+'</td>'+
                                        '<td>'+timestamp+'</td>'+
                                        '<td><a target="_blank" href="'+explorerURL+'tx/'+transactionHash+'"><i class="fa fa-external-link-square" aria-hidden="true"></i></a></td>'+
                                    '</tr>';
                        });
                        $("#UnstakingsTxTable").html(UnstakingData);
                    } else{
                        $("#UnstakingsTxTable").html('<tr><td colspan="4" style="text-align: center;">No Data Found.</td></tr>');
                    }    
            }
        }
        $('#btnStake').click(async function(){
            var value = $('#stakeAmount').val();
            if($.isNumeric(value)==false){alert('Please enter Valid Amount.'); return false;}
            //
            if(value<minimumStakingAmount){ alert('Minimum amount is '+minimumStakingAmount); return false; }
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
               
                var payableAmount = value * Math.pow(10,decimals);
                payableAmount = logEtoLongNumber(payableAmount);
                //const maxValidators = await contractInstance.methods.stake('0xBFb9B248D0e735032a70826572f79381dDC7F0De').send();
                const web3GasPrice = await myweb3.eth.getGasPrice();
                var data =  contractInstance.methods.stake(validatorAddress).encodeABI();
                processTx(data,contractAddress,web3GasPrice,gasLimit,payableAmount,explorerURL);
                init();
              
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
                waitingUnstaking = await viewContractInstance.methods.waitingUnstaking(myAccountAddress,address).call(); 
                if(waitingUnstaking>1){
                    var seconds = secondsToDhms(waitingUnstaking);                
                    alertify.alert('Warning','Waiting time before unstake is '+seconds);
                    return false;
                }
                var validatorAddress = $.urlParam('address');
                const web3GasPrice = await myweb3.eth.getGasPrice();
                var data =  contractInstance.methods.unstake(validatorAddress).encodeABI();
                processTx(data,contractAddress,web3GasPrice,gasLimit,0,explorerURL);
                init();
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
                waitingWithdrawProfit = await viewContractInstance.methods.waitingWithdrawProfit(myAccountAddress,address).call(); 
                if(waitingWithdrawProfit>1){
                    var seconds = secondsToDhms(waitingWithdrawProfit);   
                    alertify.alert('Warning','Waiting time before withdraw profit is '+seconds);
                    return false;
                }
                var validatorAddress = $.urlParam('address');
                const web3GasPrice = await myweb3.eth.getGasPrice();
                var data =  contractInstance.methods.withdrawProfits(validatorAddress).encodeABI();
                processTx(data,contractAddress,web3GasPrice,gasLimit,0,explorerURL);
                init();
            }
            //
       
        });
        //withdraw STAKINGS
        $('#btnWithdrawStaking').click(async function(){
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
                waitingWithdrawStaking = await viewContractInstance.methods.waitingWithdrawStaking(myAccountAddress,address).call(); 
                if(waitingWithdrawStaking>1){
                    var seconds = secondsToDhms(waitingWithdrawStaking);   
                    alertify.alert('Warning','Waiting time before withdraw staking is '+seconds);
                    return false;
                }
               if(waitingBlocksForUnstake>0){
                    var validatorAddress = $.urlParam('address');
                    const web3GasPrice = await myweb3.eth.getGasPrice();
                    var data =  contractInstance.methods.withdrawStaking(validatorAddress).encodeABI();
                    processTx(data,contractAddress,web3GasPrice,gasLimit,0,explorerURL);
                    init();
                }else{
                    alertify.alert('Warning','You can not withdraw becuase you have not Staked.');
                }
            }
            //
       
        });
    }//address ends
    
    $.urlParam = function(name){
        var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
        if (results==null) {
           return null;
        }
        return decodeURI(results[1]) || 0;
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
    addNetwork();
},false);


