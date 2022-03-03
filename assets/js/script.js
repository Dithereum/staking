$(document).ready(function(){
apiURL = 'https://api.dithereum.io/getallvalidators';

    async function init(){
        contractInstance = new myweb3.eth.Contract(ABI, contractAddress, {
            from: myAccountAddress, // default from address
        });
        const fetchResponse =  await fetch(apiURL);
        const edata = await fetchResponse.json();   
        var tblData = "";
        
            const total_validators = edata.activeValidators;
            const validators = edata.validators_list;
            $('#validatorsText').html(validators.length+'/21');
            $('#bondedTokens').html(edata.bondedtokens);
            if(validators.length>0){
                validators.forEach(element => {
                    const apr = element.validatorAPR;
                    const comission =element.validatorCommission;
                    const status = element.status;
                    const validator = element.validatorName;
                    const voting_power = element.votingpower;
                    const validatorWalletAddress = element.validatorWalletAddress
                    tblData+='<tr>'+
                                '<td><a href="delegate.html?address='+validatorWalletAddress+'" class=""><img src="https://raw.githubusercontent.com/binance-chain/validator-directory/main/validators/bva1z0g0cg8dkgczr6r8t6khva3srn5mwj8w5tlu7h/logo.png" class="gYNxxe" style="width: 24px;"> '+validator+'</a></td>'+
                                '<td>'+voting_power+'</td>'+
                                '<td>'+comission+'</td>'+
                                '<td>'+apr+'</td>'+
                                '<td><span class="badge bg-success">'+status+'</span></td>'+
                                '<td><button style="margin-top: 15px;" class="btnStake btn btn-outline-primary btn-sm">Stake</button></td>'+
                            '</tr>';
                });
                $("#validatorsTable").html(tblData);
            }
        
    }
    setTimeout(init,1000);

    $('.btnStake').click(async function(){
        const validatorAddress = $(this).data('wallet');
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
           // console.log(myAccountAddress)
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
    });
});

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
