$(document).ready(function(){
    var address ="";
    if (window.location.href.indexOf('address') > 0) {
        address = window.location.href.substr(51) // 48
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
        var stakingData = "";
        var delegatorsData = "";
            $('#delegatorName').html(edata.delegater_name);
            $('#voting_power').html(edata.voting_power.voting_power);
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
            const stakings = edata.staking;
            if(delegators.length>0){
                delegators.forEach(element => {
                    delegatorsData+='<tr>'+
                                '<td>'+element.stakerAddress+'</td>'+
                                '<td>'+element.sum_stake+' DTH</td>'+
                            '</tr>';
                });
                $("#delegatorsTable").html(delegatorsData);
            }
            if(stakings.length>0){
                stakings.forEach(element => {
                    stakingData+='<tr>'+
                                '<td>'+getUserAddress(element.stakerAddress)+'</td>'+
                                '<td>'+element.stakeAmount+' DTH</td>'+
                                '<td>Delegate</td>'+
                                '<td>'+element.timeStamp+'</td>'+
                                '<td><a href="#"><i class="fa fa-external-link-square" aria-hidden="true"></i></a></td>'+
                            '</tr>';
                });
                $("#stakingsTable").html(stakingData);
            }       
    }
    setTimeout(init,1000);

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
            var result = await contractInstance.methods.stake('0xBFb9B248D0e735032a70826572f79381dDC7F0De').send({
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