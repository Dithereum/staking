var myAccountAddress,contractInstance;
   //test 
    var contractAddress ='0x4C0dBfCBb15EFf9fD812975Ad0d0D7d65f23B8A5';
   //dth 
   // var contractAddress ='0x000000000000000000000000000000000000F000';
      const explorerURL = 'https://testnet.dthscan.io/';
    const apiURL = 'https://api.dithereum.io/'; 
    var ABI = JSON.parse('[{"inputs":[{"internalType":"addresspayable","name":"feeAddr","type":"address"},{"internalType":"string","name":"moniker","type":"string"},{"internalType":"string","name":"identity","type":"string"},{"internalType":"string","name":"website","type":"string"},{"internalType":"string","name":"email","type":"string"},{"internalType":"string","name":"details","type":"string"}],"name":"createOrEditValidator","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"distributeBlockReward","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address[]","name":"vals","type":"address[]"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"val","type":"address"},{"indexed":false,"internalType":"uint256","name":"time","type":"uint256"}],"name":"LogAddToTopValidators","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"val","type":"address"},{"indexed":true,"internalType":"address","name":"fee","type":"address"},{"indexed":false,"internalType":"uint256","name":"time","type":"uint256"}],"name":"LogCreateValidator","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"coinbase","type":"address"},{"indexed":false,"internalType":"uint256","name":"blockReward","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"time","type":"uint256"}],"name":"LogDistributeBlockReward","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"val","type":"address"},{"indexed":true,"internalType":"address","name":"fee","type":"address"},{"indexed":false,"internalType":"uint256","name":"time","type":"uint256"}],"name":"LogEditValidator","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"val","type":"address"},{"indexed":false,"internalType":"uint256","name":"time","type":"uint256"}],"name":"LogReactive","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"val","type":"address"},{"indexed":false,"internalType":"uint256","name":"time","type":"uint256"}],"name":"LogRemoveFromTopValidators","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"val","type":"address"},{"indexed":false,"internalType":"uint256","name":"hb","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"time","type":"uint256"}],"name":"LogRemoveValidator","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"val","type":"address"},{"indexed":false,"internalType":"uint256","name":"hb","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"time","type":"uint256"}],"name":"LogRemoveValidatorIncoming","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"staker","type":"address"},{"indexed":true,"internalType":"address","name":"val","type":"address"},{"indexed":false,"internalType":"uint256","name":"staking","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"time","type":"uint256"}],"name":"LogStake","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"staker","type":"address"},{"indexed":true,"internalType":"address","name":"val","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"time","type":"uint256"}],"name":"LogUnstake","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address[]","name":"newSet","type":"address[]"}],"name":"LogUpdateValidator","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"val","type":"address"},{"indexed":true,"internalType":"address","name":"fee","type":"address"},{"indexed":false,"internalType":"uint256","name":"hb","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"time","type":"uint256"}],"name":"LogWithdrawProfits","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"staker","type":"address"},{"indexed":true,"internalType":"address","name":"val","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"time","type":"uint256"}],"name":"LogWithdrawStaking","type":"event"},{"inputs":[{"internalType":"address","name":"val","type":"address"}],"name":"removeValidator","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"val","type":"address"}],"name":"removeValidatorIncoming","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"validator","type":"address"}],"name":"stake","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"validator","type":"address"}],"name":"tryReactive","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"validator","type":"address"}],"name":"unstake","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"newSet","type":"address[]"},{"internalType":"uint256","name":"epoch","type":"uint256"}],"name":"updateActiveValidatorSet","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"validator","type":"address"}],"name":"withdrawProfits","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"validator","type":"address"}],"name":"withdrawStaking","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"currentValidatorSet","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getActiveValidators","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"staker","type":"address"},{"internalType":"address","name":"val","type":"address"}],"name":"getStakingInfo","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTopValidators","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTotalStakeOfActiveValidators","outputs":[{"internalType":"uint256","name":"total","type":"uint256"},{"internalType":"uint256","name":"len","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"val","type":"address"}],"name":"getValidatorDescription","outputs":[{"internalType":"string","name":"","type":"string"},{"internalType":"string","name":"","type":"string"},{"internalType":"string","name":"","type":"string"},{"internalType":"string","name":"","type":"string"},{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"val","type":"address"}],"name":"getValidatorInfo","outputs":[{"internalType":"addresspayable","name":"","type":"address"},{"internalType":"enumValidators.Status","name":"","type":"uint8"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"highestValidatorsSet","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"initialized","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"who","type":"address"}],"name":"isActiveValidator","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"who","type":"address"}],"name":"isTopValidator","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MaxValidators","outputs":[{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MinimalStakingCoin","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"ProposalAddr","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PunishContractAddr","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"StakingLockPeriod","outputs":[{"internalType":"uint64","name":"","type":"uint64"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalJailedHB","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalStake","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"moniker","type":"string"},{"internalType":"string","name":"identity","type":"string"},{"internalType":"string","name":"website","type":"string"},{"internalType":"string","name":"email","type":"string"},{"internalType":"string","name":"details","type":"string"}],"name":"validateDescription","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"ValidatorContractAddr","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"viewReward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"WithdrawProfitPeriod","outputs":[{"internalType":"uint64","name":"","type":"uint64"}],"stateMutability":"view","type":"function"}] '); 

    if(window.ethereum){
        var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
          if (isMobile && window.ethereum.isMetaMask==true){
                //var myweb3 = new Web3("https://api.infura.io/v1/jsonrpc/mainnet");
               // var myweb3 = new Web3("https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161");
               var myweb3 = new Web3( window.ethereum);
         }else{
             const oldProvider = window.ethereum; // keep a reference to metamask provider
             var myweb3 = new Web3(oldProvider);
         }
         
        //const oldProvider = web3.currentProvider; // keep a reference to metamask provider
        //var myweb3 = new Web3(oldProvider);
         ethereum.on('accountsChanged', handleAccountsChanged);
         function handleAccountsChanged (accounts) {
           if (accounts.length === 0) {    
             // MetaMask is locked or the user has not connected any accounts
             console.log('Please connect to MetaMask.')
           } else if (accounts[0] !== myAccountAddress) {
               window.location.href = "";
           }
        }
    }else{
            //var myweb3 = new Web3( Web3.givenProvider || "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161");
            var myweb3 = new Web3( window.ethereum);
            const oldProvider = myweb3.currentProvider; // keep a reference to metamask provider
            var myweb3 = new Web3(oldProvider);
    }


    async function checkChainID(){
      const chainID = await myweb3.eth.getChainId();
      if(chainID!=34){
        alert('Add Dithereum Network & Switch to Dithereum Network.');
        addNetwork();
      }
    }
    setTimeout(checkChainID,3000);
    function addNetwork(){
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
    }

    function logEtoLongNumber(amountInLogE){
    
      amountInLogE = amountInLogE.toString();
      var noDecimalDigits = "";
    
      if(amountInLogE.includes("e-")){
        var splitString = amountInLogE.split("e-"); //split the string from 'e-'
        noDecimalDigits = splitString[0].replace(".", ""); //remove decimal point
        //how far decimals to move
        var zeroString = "";
        for(var i=1; i < splitString[1]; i++){
          zeroString += "0";
        }
        return  "0."+zeroString+noDecimalDigits;
      }else if(amountInLogE.includes("e+")){
        var splitString = amountInLogE.split("e+"); //split the string from 'e+'
        var ePower = parseInt(splitString[1]);
        noDecimalDigits = splitString[0].replace(".", ""); //remove decimal point
        if(ePower >= noDecimalDigits.length-1){
          var zerosToAdd = ePower  - noDecimalDigits.length;
          for(var i=0; i <= zerosToAdd; i++){
            noDecimalDigits += "0";
          }
        }else{
          //this condition will run if the e+n is less than numbers
          var stringFirstHalf = noDecimalDigits.slice(0, ePower+1);
          var stringSecondHalf = noDecimalDigits.slice(ePower+1);
          return stringFirstHalf+"."+stringSecondHalf;
        }
        return noDecimalDigits;
      }
      return amountInLogE;  //by default it returns stringify value of original number if its not logarithm number
    }


async function checkAccount() {
  if (window.ethereum) {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
  
          if (accounts == null || accounts.length == 0) {
              console.log("NO ACCOUNT CONNECTED");
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
                  } else {
                      if (myAccountAddress != accounts_[0]) {
                          myAccountAddress = accounts_[0];                    
                      }
                  }
      } 
  }
}

setTimeout(checkAccount, 500);
