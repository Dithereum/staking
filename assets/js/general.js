var myAccountAddress,contractInstance,viewContractInstance;
var isLoggedIn = false;
   //validator/staking contract address
       var contractAddress = '0x000000000000000000000000000000000000f000';
    // var contractAddress ='0x000000000000000000000000000000000000F000';
      var dataViewContractAddress = '0x3e90263D46b1193A8fD6c78506A1085D0b900De8';
      const explorerURL = 'https://explorer.securechain.ai'; // explorer url 
      const CHAIN_ID = 34; //chain id of specific chain
      const chainName = 'TestChain Mainnet';
      const decimals = 18;
      const chainIDHex = '0x22';
      const symbol = 'TST';
      const rpcURL = 'https://mainnet-rpc.scai.network';
      const stakingText = '0xb9ba725934532316cffe10975da6eb25ad49c2d1c294d982c46c9f8d684ee075';
      const unstakingText = '0x449002ae18e748d69a55f38514400d64f966492e593e32d6e9b8b24db98a0bc1';
      const gas_limit = 500000;
      const gasLimit = gas_limit.toString();
    var ABI = JSON.parse('[ { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "val", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "time", "type": "uint256" } ], "name": "LogAddToTopValidators", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "val", "type": "address" }, { "indexed": true, "internalType": "address", "name": "fee", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "time", "type": "uint256" } ], "name": "LogCreateValidator", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "coinbase", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "blockReward", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "time", "type": "uint256" }, { "indexed": false, "internalType": "address[]", "name": "To", "type": "address[]" }, { "indexed": false, "internalType": "uint64[]", "name": "Gass", "type": "uint64[]" } ], "name": "LogDistributeBlockReward", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "val", "type": "address" }, { "indexed": true, "internalType": "address", "name": "fee", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "time", "type": "uint256" } ], "name": "LogEditValidator", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "val", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "time", "type": "uint256" } ], "name": "LogReactive", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "val", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "time", "type": "uint256" } ], "name": "LogRemoveFromTopValidators", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "val", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "hb", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "time", "type": "uint256" } ], "name": "LogRemoveValidator", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "val", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "hb", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "time", "type": "uint256" } ], "name": "LogRemoveValidatorIncoming", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "staker", "type": "address" }, { "indexed": true, "internalType": "address", "name": "val", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "staking", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "time", "type": "uint256" } ], "name": "LogStake", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "staker", "type": "address" }, { "indexed": true, "internalType": "address", "name": "val", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "time", "type": "uint256" } ], "name": "LogUnstake", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "address[]", "name": "newSet", "type": "address[]" } ], "name": "LogUpdateValidator", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "val", "type": "address" }, { "indexed": true, "internalType": "address", "name": "fee", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "hb", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "time", "type": "uint256" } ], "name": "LogWithdrawProfits", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "staker", "type": "address" }, { "indexed": true, "internalType": "address", "name": "val", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "time", "type": "uint256" } ], "name": "LogWithdrawStaking", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "address", "name": "user", "type": "address" }, { "indexed": false, "internalType": "address", "name": "validator", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "reward", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "timeStamp", "type": "uint256" } ], "name": "withdrawStakingRewardEv", "type": "event" }, { "inputs": [], "name": "MaxValidators", "outputs": [ { "internalType": "uint16", "name": "", "type": "uint16" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "MinimalStakingCoin", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "ProposalAddr", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "PunishContractAddr", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "StakingLockPeriod", "outputs": [ { "internalType": "uint64", "name": "", "type": "uint64" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "ValidatorContractAddr", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "WithdrawProfitPeriod", "outputs": [ { "internalType": "uint64", "name": "", "type": "uint64" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "burnPartPercent", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "burnStopAmount", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "", "type": "address" } ], "name": "contractCreator", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "contractPartPercent", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address payable", "name": "feeAddr", "type": "address" }, { "internalType": "string", "name": "moniker", "type": "string" }, { "internalType": "string", "name": "identity", "type": "string" }, { "internalType": "string", "name": "website", "type": "string" }, { "internalType": "string", "name": "email", "type": "string" }, { "internalType": "string", "name": "details", "type": "string" } ], "name": "createOrEditValidator", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "name": "currentValidatorSet", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address[]", "name": "_to", "type": "address[]" }, { "internalType": "uint64[]", "name": "_gass", "type": "uint64[]" } ], "name": "distributeBlockReward", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [], "name": "getActiveValidators", "outputs": [ { "internalType": "address[]", "name": "", "type": "address[]" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "staker", "type": "address" }, { "internalType": "address", "name": "val", "type": "address" } ], "name": "getStakingInfo", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getTopValidators", "outputs": [ { "internalType": "address[]", "name": "", "type": "address[]" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getTotalStakeOfActiveValidators", "outputs": [ { "internalType": "uint256", "name": "total", "type": "uint256" }, { "internalType": "uint256", "name": "len", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "val", "type": "address" } ], "name": "getValidatorDescription", "outputs": [ { "internalType": "string", "name": "", "type": "string" }, { "internalType": "string", "name": "", "type": "string" }, { "internalType": "string", "name": "", "type": "string" }, { "internalType": "string", "name": "", "type": "string" }, { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "val", "type": "address" } ], "name": "getValidatorInfo", "outputs": [ { "internalType": "address payable", "name": "", "type": "address" }, { "internalType": "enum Validators.Status", "name": "", "type": "uint8" }, { "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "address[]", "name": "", "type": "address[]" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "name": "highestValidatorsSet", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address[]", "name": "vals", "type": "address[]" } ], "name": "initialize", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "initialized", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "who", "type": "address" } ], "name": "isActiveValidator", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "who", "type": "address" } ], "name": "isTopValidator", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "", "type": "address" } ], "name": "lastRewardTime", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "", "type": "address" }, { "internalType": "uint256", "name": "", "type": "uint256" } ], "name": "reflectionPercentSum", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "val", "type": "address" } ], "name": "removeValidator", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "val", "type": "address" } ], "name": "removeValidatorIncoming", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "_contract", "type": "address" } ], "name": "setContractCreator", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "validator", "type": "address" } ], "name": "stake", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "payable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "", "type": "address" }, { "internalType": "address", "name": "", "type": "address" } ], "name": "stakeTime", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "stakerPartPercent", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalBurnt", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalJailedHB", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalStake", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "validator", "type": "address" } ], "name": "tryReactive", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "validator", "type": "address" } ], "name": "unstake", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address[]", "name": "newSet", "type": "address[]" }, { "internalType": "uint256", "name": "epoch", "type": "uint256" } ], "name": "updateActiveValidatorSet", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "string", "name": "moniker", "type": "string" }, { "internalType": "string", "name": "identity", "type": "string" }, { "internalType": "string", "name": "website", "type": "string" }, { "internalType": "string", "name": "email", "type": "string" }, { "internalType": "string", "name": "details", "type": "string" } ], "name": "validateDescription", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "pure", "type": "function" }, { "inputs": [], "name": "validatorPartPercent", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "_staker", "type": "address" }, { "internalType": "address", "name": "_validator", "type": "address" } ], "name": "viewStakeReward", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "validator", "type": "address" } ], "name": "withdrawProfits", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "validator", "type": "address" } ], "name": "withdrawStaking", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "validator", "type": "address" } ], "name": "withdrawStakingReward", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "nonpayable", "type": "function" } ]'); 

    var dataViewABI = JSON.parse('[{"type":"function","stateMutability":"view","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"checkValidator","inputs":[{"type":"address","name":"user","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"totalValidatorCount","internalType":"uint256"},{"type":"uint256","name":"totalStakedCoins","internalType":"uint256"},{"type":"address[]","name":"","internalType":"address[]"},{"type":"uint8[]","name":"","internalType":"enum InterfaceValidator.Status[]"},{"type":"uint256[]","name":"","internalType":"uint256[]"},{"type":"string[]","name":"","internalType":"string[]"},{"type":"string[]","name":"","internalType":"string[]"}],"name":"getAllValidatorInfo","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"minimumStakingAmount","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"minimumStakingAmt","internalType":"uint256"},{"type":"uint256","name":"stakingWaiting","internalType":"uint256"}],"name":"stakingValidations","inputs":[{"type":"address","name":"user","internalType":"address"},{"type":"address","name":"validatorAddress","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract InterfaceValidator"}],"name":"valContract","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"string","name":"identityName","internalType":"string"},{"type":"string","name":"website","internalType":"string"},{"type":"string","name":"otherDetails","internalType":"string"},{"type":"uint256","name":"withdrawableRewards","internalType":"uint256"},{"type":"uint256","name":"stakedCoins","internalType":"uint256"},{"type":"uint256","name":"waitingBlocksForUnstake","internalType":"uint256"}],"name":"validatorSpecificInfo1","inputs":[{"type":"address","name":"validatorAddress","internalType":"address"},{"type":"address","name":"user","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"totalStakedCoins","internalType":"uint256"},{"type":"uint8","name":"status","internalType":"enum InterfaceValidator.Status"},{"type":"uint256","name":"selfStakedCoins","internalType":"uint256"},{"type":"uint256","name":"masterVoters","internalType":"uint256"},{"type":"uint256","name":"stakers","internalType":"uint256"},{"type":"address","name":"","internalType":"address"}],"name":"validatorSpecificInfo2","inputs":[{"type":"address","name":"validatorAddress","internalType":"address"},{"type":"address","name":"user","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"waitingUnstaking","inputs":[{"type":"address","name":"user","internalType":"address"},{"type":"address","name":"validator","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"waitingWithdrawProfit","inputs":[{"type":"address","name":"user","internalType":"address"},{"type":"address","name":"validatorAddress","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"waitingWithdrawStaking","inputs":[{"type":"address","name":"user","internalType":"address"},{"type":"address","name":"validatorAddress","internalType":"address"}]}]');

    if(window.ethereum){
        var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
          if (isMobile && window.ethereum.isMetaMask==true){
               var myweb3 = new Web3( window.ethereum);
         }else{
             const oldProvider = window.ethereum; // keep a reference to metamask provider
             var myweb3 = new Web3(oldProvider);
         }        
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
            var myweb3 = new Web3( window.ethereum);
            const oldProvider = myweb3.currentProvider; // keep a reference to metamask provider
            var myweb3 = new Web3(oldProvider);
    }

    async function checkChainID(){
      const chainID = await myweb3.eth.getChainId();
      if(chainID!=CHAIN_ID){
        alert('Add '+chainName+' Network & Switch to '+chainName+' Network.');
        addNetwork();
      }
    }
    setTimeout(checkChainID,3000);
    async function addNetwork(){
      if(window.ethereum) {
        try {
          await ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: chainIDHex }],
          });
      } catch (switchError) {
          // This error code indicates that the chain has not been added to MetaMask.
          if (switchError.code === 4902) {
          try {
              await ethereum.request({
                  method: 'wallet_addEthereumChain',
                  params: [{chainId: chainIDHex,
                  chainName: chainName,
                  nativeCurrency: {
                  name: chainName,
                  symbol: symbol,
                  decimals: decimals
                },
                rpcUrls: [rpcURL],blockExplorerUrls: [explorerURL]                    
                }]                      
              });
              
          } catch (addError) {
              // handle "add" error
          }
          }
          // handle other "switch" errors
      }
            
      }
    }

    async function checkAccount() {
      var x = getCookie('isLoggedIn');
      if(x!=null){
      if (window.ethereum) {
          const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      
              if (accounts == null || accounts.length == 0) {
                  console.log("NO ACCOUNT CONNECTED");
              } else {
                  if (myAccountAddress != accounts[0]) {
                      myAccountAddress = accounts[0];                    
                      isLoggedIn==true;
                      const shortAddress = getUserAddress(myAccountAddress);
                      $('#connectWallet').html(shortAddress);
                      $('#connectWallet').attr("href", explorerURL+"/address/"+myAccountAddress).attr('target','_blank');
                      $('#logout').show();
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
                              isLoggedIn=true;
                              const shortAddress = getUserAddress(myAccountAddress);
                              $('#connectWallet').html(shortAddress);
                              $('#connectWallet').attr("href", explorerURL+"/address/"+myAccountAddress).attr('target','_blank');
                              $('#logout').show();
                          }
                          
                      }
          } 
      }
    }
    }

setTimeout(checkAccount, 500);
//function for tx alert etc
async function processTx(data,contractAddress,web3GasPrice,gasLimit,value,TX_URL){
  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  
  if (isMobile && window.ethereum.isMetaMask==true) {
          web3GasPrice = web3GasPrice.toString();
          gasLimit = gasLimit.toString();
          web3GasPrice =  myweb3.utils.toHex(web3GasPrice);
          gasLimit =  myweb3.utils.toHex(gasLimit);
          value = value.toString();
          value = myweb3.utils.toHex(value);
          var nonce = await myweb3.eth.getTransactionCount(myAccountAddress, 'pending');
          nonce= myweb3.utils.toHex(nonce);
          console.log(nonce);
          const transactionParameters = {
              nonce: nonce, // ignored by MetaMask
              gasPrice: web3GasPrice, // customizable by user during MetaMask confirmation.
              gas: gasLimit, // customizable by user during MetaMask confirmation.
              to: contractAddress, // Required except during contract publications.
              from: myAccountAddress, // must match user's active address.
              value: value, // Only required to send ether to the recipient from the initiating external account.
              data: data, // Optional, but used for defining smart contract creation and interaction.
              //chainId: '0x3', // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
          };
      
          // txHash is a hex string
          // As with any RPC call, it may throw an error
          const txHash = await ethereum.request({
              method: 'eth_sendTransaction',
              params: [transactionParameters],
          });
          if(txHash){
              alertify.alert('Transaction Success', 'Your transaction is processing.<br>'+"Please check the status of transaction <a href='"+TX_URL+'/tx/'+txHash+"' target='_blank'> Here</a>", function(){});  
          }
  }else{   
      value = logEtoLongNumber(value);
      myweb3.eth.sendTransaction({
          from: myAccountAddress,
          to: contractAddress,
          //gasPrice: localStorage.getItem('ethGasPrice'),
          gasPrice : web3GasPrice,
          gasLimit: gasLimit,
          data: data, // deploying a contracrt
          value : value,
          }).on('transactionHash',function(hash){
            alertify.alert('Transaction Success', 'Your transaction is processing.<br>'+"Please check the status of transaction <a href='"+TX_URL+'/tx/'+hash+"' target='_blank'> Here</a>", function(){});  
          }).on('receipt', function(receipt){
		console.log(receipt);
            alertify.alert('Transaction Success', 'Your transaction is confirmed successfully.<br>'+"Please check the status of transaction <a href='"+TX_URL+'/tx/'+receipt.transactionHash+"' target='_blank'> Here</a>", function(){});  
          }).on('error',function(error){
              var ErrorMsg=error.message;
              alertify.alert('Error', ""+ErrorMsg, function(){});
          });
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

function secondsToDhms(seconds) {
    seconds = Number(seconds);
    var d = Math.floor(seconds / (3600*24));
    var h = Math.floor(seconds % (3600*24) / 3600);
    var m = Math.floor(seconds % 3600 / 60);
    var s = Math.floor(seconds % 60);
    
    var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
    var hDisplay = h > 0 ? h + (h == 1 ? ":" : ":") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? ":" : ":") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? "" : "") : "";
    return dDisplay + hDisplay + mDisplay + sDisplay;
  }
  function getUserAddress(userAddress){
    firstFive   = userAddress.substring(0 , 5); 
    lastFive    = userAddress.substr(userAddress.length - 5);
    return firstFive+'...'+lastFive;
}
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
  }
}

function setCookie(name,value,days) {
  var expires = "";
  if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days*24*60*60*1000));
      expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}
function eraseCookie(name) {   
  document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}


//connect to metamask wallet 
$("#connectWallet").click(async function(e){
  e.preventDefault();
  var accounts_;
  if(window.ethereum){
      window.ethereum.enable();
      var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      if (isMobile && window.ethereum.isMetaMask==true){
              accounts_ = await window.ethereum.request({ method: 'eth_requestAccounts' });
              //alert(accounts_);
              if (myAccountAddress != accounts_[0]) {
                  myAccountAddress = accounts_[0];                    
              }
              const shortAddress = getUserAddress(myAccountAddress);
              $('#connectWallet').html(shortAddress);
              $('#connectWallet').attr("href", explorerURL+"/address/"+myAccountAddress).attr('target','_blank');
              $('#logout').show();
              isLoggedIn=true;
              setCookie('isLoggedIn','true',30);
              
      }else{
          accounts_ = await ethereum.request({ method: 'eth_accounts' });
            console.log(accounts_);
            if (myAccountAddress != accounts_[0]) {
              myAccountAddress = accounts_[0];                    
          }
          const shortAddress = getUserAddress(myAccountAddress);
          $('#connectWallet').html(shortAddress);
          $('#connectWallet').attr("href", explorerURL+"/address/"+myAccountAddress).attr('target','_blank');
          $('#logout').show();
          isLoggedIn=true;
          setCookie('isLoggedIn','true',30);
         
      }
      //const accounts_ = await ethereum.request({ method: 'eth_accounts' });
      //if(accounts_!=""){
      //    window.location.href = "";
     // }
  }
});

//disconnect wallet
$("#logout").click(async function(e){
  e.preventDefault();
  $('#connectWallet').html('Connect Wallet');
  $('#logout').hide();
  eraseCookie('isLoggedIn');
  isLoggedIn=false;
  window.location.href = "";
});