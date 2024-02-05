var withdrawableRewards;
$.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null) {
       return null;
    }
    return decodeURI(results[1]) || 0;
}
$(document).ready(function(){
    var isNetwork= false;
    var address ="";
    var minimumStakingAmount=0;
    var waitingWithdrawProfit=0;
    var waitingUnstaking=0;
    var waitingWithdrawStaking=0;
    var waitingBlocksForUnstake=0;
    var stakedAmount =0;
    if (window.location.href.indexOf('address') > 0) {
        address = $.urlParam('address');
      }
    if(address!=""){
        
        $('#staking_address').html('<a target="_blank" href="'+explorerURL+'/address/'+contractAddress+'/contracts">'+contractAddress+'</a>');
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
            //console.log(validatorSpecificInfo1);
            waitingBlocksForUnstake = validatorSpecificInfo1.waitingBlocksForUnstake;
            waitingBlocksForUnstake = waitingBlocksForUnstake/Math.pow(10,decimals);
            waitingBlocksForUnstake = waitingBlocksForUnstake.toFixed(0);
            if(waitingBlocksForUnstake>0){
                $('#waitingBlocksForUnstake').html(waitingBlocksForUnstake+' ');
            }
            
            if(validatorSpecificInfo1.identityName==""){
                $('#delegatorName').html(address);
            }else{
                $('#delegatorName').html(validatorSpecificInfo1.identityName);
            }
            $('#validator_address').html(address);
            if(validatorSpecificInfo1.website!=""){
                $('#weburl').html('<a target="_blank" href="https://'+validatorSpecificInfo1.website+'">'+validatorSpecificInfo1.website+'</a>');
            }
            if(validatorSpecificInfo1.otherDetails!=""){
                $('#otherDetails').html(validatorSpecificInfo1.otherDetails);
            }
            $('#stakingContract').html('<a target="_blank" href="'+explorerURL+'/address/'+contractAddress+'">'+contractAddress+'</a>')
            var delegatorsData = "";
            $('#validator_address').html('<a target="_blank" href="'+explorerURL+'/address/'+address+'/transactions">'+address+'</a>');
            //myAccountAddress = '0x651fC908C2b145c771bD633D0bA0513aab290cA9'
           // myAccountAddress = '0x9fc47a7d69d3914a1592783e752bbc0f7cf9ebae'
            var checkValidator = await contractInstance.methods.isActiveValidator(myAccountAddress).call();
            console.log(checkValidator)
            if(checkValidator==true){
                stakedAmount = validatorSpecificInfo1.stakedCoins;
                stakedAmount = stakedAmount/Math.pow(10,decimals);
                stakedAmount = stakedAmount.toFixed(4);
                $('#stakedAmount').html(stakedAmount+' '); 
                withdrawableRewards = validatorSpecificInfo1.withdrawableRewards;
                
                withdrawableRewards = withdrawableRewards/Math.pow(10,decimals);
                
                withdrawableRewards = withdrawableRewards.toFixed(4);                
                $('#rewardAmount').html(withdrawableRewards+' ');


            }
            if(checkValidator==false){
                    var stakeTime = await contractInstance.methods.stakeTime(myAccountAddress,address).call();                
                    var viewStakeReward = await contractInstance.methods.viewStakeReward(myAccountAddress,address).call();
                    console.log(viewStakeReward)
                    withdrawableRewards = viewStakeReward/Math.pow(10,decimals);
                    withdrawableRewards = withdrawableRewards.toFixed(4);                                    
                    if(stakeTime>0){
                        $('#rewardAmount').html(withdrawableRewards+' ');
                    }else{
                        $('#rewardAmount').html('0.0000');
                    }
                

                var getStakingInfo = await contractInstance.methods.getStakingInfo(myAccountAddress,address).call();
                console.log(getStakingInfo)
                stakedAmount = getStakingInfo[0]
                var isUnstaked = getStakingInfo[1]
                stakedAmount = stakedAmount/Math.pow(10,decimals);
                stakedAmount = stakedAmount.toFixed(4);
                
                if(isUnstaked==0){
                    $('#stakedAmount').html(stakedAmount+' '); 
                    $('#waitingBlocksForUnstake').html('0.0000'); 
                }else{
                    $('#stakedAmount').html('0.0000'); 
                    $('#waitingBlocksForUnstake').html(stakedAmount+' '); 
                }
                
            }

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
            if(status==2 && parseInt(self_stake)>0){
                $('#status').html('<span class="badge bg-success text-light rounded-pill">Active</span>');
                $('#btnStake').removeAttr('disabled');
            }else{
                $('#status').html('<span class="badge bg-danger text-light rounded-pill">Inactive</span>');
                $('#btnStake').attr('disabled','disabled');
            }
            //$('#masterVoters').html(validatorSpecificInfo2.masterVoters); 
            getstakingTxs();
            getUnstakingTxs(); 
            
        }
        setTimeout(init,500);
        setInterval(init,5000);

        window.ethereum.on('accountsChanged', handleAccountsChanged);
        function handleAccountsChanged(accounts) {
        if (accounts.length === 0) {
            // MetaMask is locked or the user has not connected any accounts.
            console.log('Please connect to MetaMask.');
        } else if (accounts[0] !== myAccountAddress) {
            // Reload your interface with accounts[0].
            myAccountAddress = accounts[0]
            console.log(accounts[0]);
            isLoggedIn==true;
            const shortAddress = getUserAddress(myAccountAddress);
            $('#connectWallet').html(shortAddress);
            $('#connectWallet').attr("href", explorerURL+"/address/"+myAccountAddress).attr('target','_blank');
            var pathname = window.location.pathname;
            var appDomainEndding = '/gdo/staking/staking.mainnetz.io/'
            if (pathname.toLowerCase().indexOf("validators.html") > -1 || pathname.indexOf(appDomainEndding, pathname.length - appDomainEndding.length) > -1){
            init();
            }
            
            
        }
        }


        async function getstakingTxs(){
            var topic2 = '0x'+'000000000000000000000000'+address.substr(2);
            topic2 = topic2.toLowerCase();
            var topic1 = '0x'+'000000000000000000000000'+myAccountAddress.substr(2);
            topic1 = topic1.toLowerCase();
            const eventURL =  explorerURL+"/api?module=logs&action=getLogs&fromBlock=0&toBlock=latest&address="+contractAddress+"&topic0="+stakingText+"&topic2="+topic2+"&topic1="+topic1+"&topic0_1_opr=and&topic0_2_opr=and&topic1_2_opr=and";
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
                                        '<td><a target="_blank" href="'+explorerURL+'/tx/'+transactionHash+'"><i class="fa fa-external-link-square" aria-hidden="true"></i></a></td>'+
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
            const eventURL =  explorerURL+"/api?module=logs&action=getLogs&fromBlock=0&toBlock=latest&address="+contractAddress+"&topic0="+unstakingText+"&topic2="+topic2+"&topic1="+topic1+"&topic0_1_opr=and&topic0_2_opr=and&topic1_2_opr=and";
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
                                        '<td><a target="_blank" href="'+explorerURL+'/tx/'+transactionHash+'"><i class="fa fa-external-link-square" aria-hidden="true"></i></a></td>'+
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
                var stakingWaiting = await viewContractInstance.methods.stakingValidations(myAccountAddress,validatorAddress).call();
                stakingWaiting = stakingWaiting.stakingWaiting;
                
                if(stakingWaiting==0){ 
                    var payableAmount = value * Math.pow(10,decimals);
                    payableAmount = logEtoLongNumber(payableAmount);
                    //const maxValidators = await contractInstance.methods.stake('0xBFb9B248D0e735032a70826572f79381dDC7F0De').send();
                    const web3GasPrice = await myweb3.eth.getGasPrice();
                    var data =  contractInstance.methods.stake(validatorAddress).encodeABI();
                    processTx(data,contractAddress,web3GasPrice,gasLimit,payableAmount,explorerURL);
                    $('#stakeAmount').val('');
                   // init();
                }else{
                    var seconds = secondsToDhms(stakingWaiting);                
                    alertify.alert('Warning','Waiting time before stake is '+seconds);
                    return false;
                }              
            }       
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

                var getStakingInfo = await contractInstance.methods.getStakingInfo(myAccountAddress,address).call();
                var isUnstaked = getStakingInfo[1]
                console.log(isUnstaked)
                if(isUnstaked>0){
                    alertify.alert('Warning','You have not staked, so you cant unstake.');
                    return false;
                }
                if(stakedAmount>0){
                    var validatorAddress = $.urlParam('address');
                    if(validatorAddress==myAccountAddress){
                        alertify.alert('Warning','You can not unstake until 1 year.');
                        return false;
                    }

                    var checkValidator = await contractInstance.methods.isActiveValidator(myAccountAddress).call();
                    console.log(checkValidator)
                    if(checkValidator==true){
                        alertify.alert('Warning','You can not unstake until 1 year.');
                        return false;
                    }
                    const web3GasPrice = await myweb3.eth.getGasPrice();
                    var data =  viewContractInstance.methods.unstake(validatorAddress).encodeABI();
                    processTx(data,dataViewContractAddress,web3GasPrice,gasLimit,0,explorerURL);
                    init();
                }else{
                    alertify.alert('Warning','You have not staked, so you cant unstake.');
                    return false;
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
                var validatorAddress = $.urlParam('address');
                //console.log(address)
               // alert("validatorAddress : " + validatorAddress + " ---  myAccountAddress : " + myAccountAddress);                
                if(myAccountAddress.toLowerCase() !=validatorAddress.toLowerCase()){
                  //alert("staker");
                    waitingWithdrawProfit = await viewContractInstance.methods.waitingWithdrawProfit(myAccountAddress,validatorAddress).call(); 
                    if(waitingWithdrawProfit>1){
                        var seconds = secondsToDhms(waitingWithdrawProfit);   
                        alertify.alert('Warning','Waiting time before withdraw profit is '+seconds);
                        return false;
                    }
                    if(withdrawableRewards>0){                        
                        const web3GasPrice = await myweb3.eth.getGasPrice();
                        var data =  contractInstance.methods.withdrawStakingReward(validatorAddress).encodeABI();
                        processTx(data,contractAddress,web3GasPrice,gasLimit,0,explorerURL);
                        init();
                    }else{
                        alertify.alert('Warning','You do not have any profit to withdraw.');
                    }
                }else{
                //alert("validator");
                
                    waitingWithdrawProfit = await viewContractInstance.methods.waitingWithdrawProfit(myAccountAddress,validatorAddress).call(); 
                    if(waitingWithdrawProfit>1){
                        var seconds = secondsToDhms(waitingWithdrawProfit);   
                        alertify.alert('Warning','Waiting time before withdraw profit is '+seconds);
                        return false;
                    }
                    if(withdrawableRewards>0){
                        console.log('validatorAddress => ' + validatorAddress);
                        console.log('myAccountAddress => ' + myAccountAddress);
                        
                        const web3GasPrice = await myweb3.eth.getGasPrice();
                        const estimateGas = await viewContractInstance.methods.withdrawStakingReward(validatorAddress).estimateGas();
                        console.log('gas price => ' + web3GasPrice )
                        console.log('gas estimate => ' + estimateGas);
                        console.log('gas limit => ' + gasLimit);
                        var data =  viewContractInstance.methods.withdrawStakingReward(myAccountAddress).encodeABI();
                        processTx(data,dataViewContractAddress,web3GasPrice,gasLimit,0,explorerURL);
                        //var data =  contractInstance.methods.withdrawProfits(validatorAddress).encodeABI();
                       // setTimeout(processTx(data,contractAddress,web3GasPrice,gasLimit,0,explorerURL),2000);
                        init();
                    }else{
                        alertify.alert('Warning','You do not have any profit to withdraw.');
                    }
                }
                
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
                
                if(parseFloat(waitingBlocksForUnstake)==0){
                    var validatorAddress = $.urlParam('address');
                    const web3GasPrice = await myweb3.eth.getGasPrice();
                    var data =  contractInstance.methods.withdrawStaking(validatorAddress).encodeABI();
                    processTx(data,contractAddress,web3GasPrice,gasLimit,0,explorerURL);
                    init();
                }else{
                    alertify.alert('Warning','You can not withdraw becuase you have not UnStaked.');
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
    $('#addBNINetwork').click(function(){
        addNetwork();
    })

     //auto refresh after network select in mm
     setInterval(async function(){
        const chainID = await myweb3.eth.getChainId();
        if(chainID==CHAIN_ID && isNetwork==false){
            //init();
            isNetwork=true;
        }
    },1000);

});
