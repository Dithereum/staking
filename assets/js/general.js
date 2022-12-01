var myAccountAddress,contractInstance,viewContractInstance;
   //validator/staking contract address
       var contractAddress = '0x10075Fbe6f6c807C13b417913b617aBA55e2b88E';//'0x698CBc3C881880E5F4f8EF57f42c2e23BaD7975A';
    // var contractAddress ='0x000000000000000000000000000000000000F000';
      var dataViewContractAddress = '0xF30f509B09C12971a42f1a17c2c97dFD193d47bB';//'0xAF90281E561CB190935F3bBe4d3DC784cb4Bd621';
      const explorerURL = 'https://testnet.hyperonchain.com/'; // explorer url //'https://testnet.dthscan.io/'
      const CHAIN_ID = 400; //chain id of specific chain  //34
      const chainName = 'Dithereum';
      const decimals = 18;
      const chainIDHex = '0x190'; //'0x22'
      const symbol = 'DTH';
      const rpcURL = 'https://testnet-rpc.hyperonchain.com/'; //'https://node-testnet.dithereum.io/'
      const stakingText = '0xc338ea79856529abf732de0efd650be44151412a2aed88f514a4f1248c912d25';
      const unstakingText = '0x449002ae18e748d69a55f38514400d64f966492e593e32d6e9b8b24db98a0bc1';
      const gas_limit = 500000;
      const gasLimit = gas_limit.toString();
    var ABI = JSON.parse('[ { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "val", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "time", "type": "uint256" } ], "name": "LogAddToTopValidators", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "val", "type": "address" }, { "indexed": true, "internalType": "address", "name": "fee", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "time", "type": "uint256" } ], "name": "LogCreateValidator", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "coinbase", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "blockReward", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "time", "type": "uint256" } ], "name": "LogDistributeBlockReward", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "val", "type": "address" }, { "indexed": true, "internalType": "address", "name": "fee", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "time", "type": "uint256" } ], "name": "LogEditValidator", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "val", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "time", "type": "uint256" } ], "name": "LogReactive", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "val", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "time", "type": "uint256" } ], "name": "LogRemoveFromTopValidators", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "val", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "hb", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "time", "type": "uint256" } ], "name": "LogRemoveValidator", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "val", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "hb", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "time", "type": "uint256" } ], "name": "LogRemoveValidatorIncoming", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "staker", "type": "address" }, { "indexed": true, "internalType": "address", "name": "val", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "staking", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "time", "type": "uint256" } ], "name": "LogStake", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "staker", "type": "address" }, { "indexed": true, "internalType": "address", "name": "_masterVoter", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "staking", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "time", "type": "uint256" } ], "name": "LogStakeForMaster", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "staker", "type": "address" }, { "indexed": true, "internalType": "address", "name": "val", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "time", "type": "uint256" } ], "name": "LogUnstake", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "address[]", "name": "newSet", "type": "address[]" } ], "name": "LogUpdateValidator", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "val", "type": "address" }, { "indexed": true, "internalType": "address", "name": "fee", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "hb", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "time", "type": "uint256" } ], "name": "LogWithdrawProfits", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "staker", "type": "address" }, { "indexed": true, "internalType": "address", "name": "val", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "time", "type": "uint256" } ], "name": "LogWithdrawStaking", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "address", "name": "user", "type": "address" }, { "indexed": false, "internalType": "address", "name": "validator", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "reward", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "timeStamp", "type": "uint256" } ], "name": "withdrawStakingRewardEv", "type": "event" }, { "inputs": [], "name": "MaxValidators", "outputs": [ { "internalType": "uint16", "name": "", "type": "uint16" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "MinimalStakingCoin", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "ProposalAddr", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "PunishContractAddr", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "StakingLockPeriod", "outputs": [ { "internalType": "uint64", "name": "", "type": "uint64" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "ValidatorContractAddr", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "WHPN", "outputs": [ { "internalType": "contract IHPN", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "WithdrawProfitPeriod", "outputs": [ { "internalType": "uint64", "name": "", "type": "uint64" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "_totalAmount", "type": "uint256" }, { "internalType": "uint256", "name": "_rewardAmount", "type": "uint256" } ], "name": "calculateReflectionPercent", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "pure", "type": "function" }, { "inputs": [ { "internalType": "address payable", "name": "feeAddr", "type": "address" }, { "internalType": "string", "name": "moniker", "type": "string" }, { "internalType": "string", "name": "identity", "type": "string" }, { "internalType": "string", "name": "website", "type": "string" }, { "internalType": "string", "name": "email", "type": "string" }, { "internalType": "string", "name": "details", "type": "string" } ], "name": "createOrEditValidator", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "name": "currentValidatorSet", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "defaultMaster", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "distributeBlockReward", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "_user", "type": "address" }, { "internalType": "address", "name": "validator", "type": "address" } ], "name": "dividendsOf", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getActiveValidators", "outputs": [ { "internalType": "address[]", "name": "", "type": "address[]" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "masterVoter", "type": "address" } ], "name": "getMasterVoterInfo", "outputs": [ { "internalType": "address[]", "name": "", "type": "address[]" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getTopValidators", "outputs": [ { "internalType": "address[]", "name": "", "type": "address[]" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getTotalStakeOfActiveValidators", "outputs": [ { "internalType": "uint256", "name": "total", "type": "uint256" }, { "internalType": "uint256", "name": "len", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "val", "type": "address" } ], "name": "getValidatorInfo", "outputs": [ { "internalType": "address[]", "name": "", "type": "address[]" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "name": "highestValidatorsSet", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address[]", "name": "vals", "type": "address[]" } ], "name": "initialize", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "initialized", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "who", "type": "address" } ], "name": "isActiveValidator", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "who", "type": "address" } ], "name": "isTopValidator", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "", "type": "address" } ], "name": "lastRewardTime", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "magnitude", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "", "type": "address" } ], "name": "masterVoterInfo", "outputs": [ { "internalType": "address", "name": "validator", "type": "address" }, { "internalType": "uint256", "name": "coins", "type": "uint256" }, { "internalType": "uint256", "name": "unstakeBlock", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "", "type": "address" } ], "name": "payoutsTo_", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "profitPerShare_", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "proposal", "outputs": [ { "internalType": "contract IProposal", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "punish", "outputs": [ { "internalType": "contract IPunish", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "", "type": "address" }, { "internalType": "uint256", "name": "", "type": "uint256" } ], "name": "reflectionMasterPerent", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "val", "type": "address" } ], "name": "removeValidator", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "val", "type": "address" } ], "name": "removeValidatorIncoming", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "validator", "type": "address" } ], "name": "stake", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "payable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "_masterVoter", "type": "address" } ], "name": "stakeForMaster", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "payable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "", "type": "address" }, { "internalType": "address", "name": "", "type": "address" } ], "name": "stakeTime", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "", "type": "address" }, { "internalType": "address", "name": "", "type": "address" } ], "name": "staked", "outputs": [ { "internalType": "uint256", "name": "coins", "type": "uint256" }, { "internalType": "uint256", "name": "unstakeBlock", "type": "uint256" }, { "internalType": "uint256", "name": "index", "type": "uint256" }, { "internalType": "uint256", "name": "stakeTime", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "", "type": "address" }, { "internalType": "address", "name": "", "type": "address" } ], "name": "stakedMaster", "outputs": [ { "internalType": "uint256", "name": "coins", "type": "uint256" }, { "internalType": "uint256", "name": "unstakeBlock", "type": "uint256" }, { "internalType": "uint256", "name": "index", "type": "uint256" }, { "internalType": "uint256", "name": "stakeTime", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalJailedHB", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalStake", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalsupply", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "validator", "type": "address" } ], "name": "tryReactive", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "validator", "type": "address" } ], "name": "unstake", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address[]", "name": "newSet", "type": "address[]" }, { "internalType": "uint256", "name": "epoch", "type": "uint256" } ], "name": "updateActiveValidatorSet", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "string", "name": "moniker", "type": "string" }, { "internalType": "string", "name": "identity", "type": "string" }, { "internalType": "string", "name": "website", "type": "string" }, { "internalType": "string", "name": "email", "type": "string" }, { "internalType": "string", "name": "details", "type": "string" } ], "name": "validateDescription", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "pure", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "", "type": "address" } ], "name": "validatorInfo", "outputs": [ { "internalType": "address payable", "name": "feeAddr", "type": "address" }, { "internalType": "enum Validators.Status", "name": "status", "type": "uint8" }, { "internalType": "uint256", "name": "coins", "type": "uint256" }, { "components": [ { "internalType": "string", "name": "moniker", "type": "string" }, { "internalType": "string", "name": "identity", "type": "string" }, { "internalType": "string", "name": "website", "type": "string" }, { "internalType": "string", "name": "email", "type": "string" }, { "internalType": "string", "name": "details", "type": "string" } ], "internalType": "struct Validators.Description", "name": "description", "type": "tuple" }, { "internalType": "uint256", "name": "hbIncoming", "type": "uint256" }, { "internalType": "uint256", "name": "totalJailedHB", "type": "uint256" }, { "internalType": "uint256", "name": "lastWithdrawProfitsBlock", "type": "uint256" }, { "internalType": "uint256", "name": "masterCoins", "type": "uint256" }, { "internalType": "uint256", "name": "masterStakerCoins", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "validator", "type": "address" } ], "name": "withdrawProfits", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "validator", "type": "address" } ], "name": "withdrawStaking", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "validatorOrMastervoter", "type": "address" } ], "name": "withdrawStakingReward", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "validator", "type": "address" }, { "internalType": "address", "name": "_user", "type": "address" } ], "name": "withdrawableReward", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" } ]'); 

    var dataViewABI = JSON.parse('[ { "inputs": [], "name": "getAllMasterVotersInfo", "outputs": [ { "internalType": "uint8", "name": "totalMasterVoters", "type": "uint8" }, { "internalType": "address[]", "name": "", "type": "address[]" }, { "internalType": "address[]", "name": "", "type": "address[]" }, { "internalType": "uint256[]", "name": "", "type": "uint256[]" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getAllValidatorInfo", "outputs": [ { "internalType": "uint256", "name": "totalValidatorCount", "type": "uint256" }, { "internalType": "uint256", "name": "totalStakedCoins", "type": "uint256" }, { "internalType": "address[]", "name": "", "type": "address[]" }, { "internalType": "enum InterfaceValidator.Status[]", "name": "", "type": "uint8[]" }, { "internalType": "uint256[]", "name": "", "type": "uint256[]" }, { "internalType": "string[]", "name": "", "type": "string[]" }, { "internalType": "string[]", "name": "", "type": "string[]" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "masterVoter", "type": "address" }, { "internalType": "address", "name": "user", "type": "address" } ], "name": "masterVoterSpecificInfo", "outputs": [ { "internalType": "uint256", "name": "withdrawableRewards", "type": "uint256" }, { "internalType": "uint256", "name": "stakedCoins", "type": "uint256" }, { "internalType": "uint256", "name": "waitingBlocksForUnstake", "type": "uint256" }, { "internalType": "uint256", "name": "totalStakedCoins", "type": "uint256" }, { "internalType": "uint256", "name": "totalStakers", "type": "uint256" }, { "internalType": "uint256", "name": "selfStakedMaster", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "minimumStakingAmount", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "valContract", "outputs": [ { "internalType": "contract InterfaceValidator", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "validatorAddress", "type": "address" }, { "internalType": "address", "name": "user", "type": "address" } ], "name": "validatorSpecificInfo1", "outputs": [ { "internalType": "string", "name": "identityName", "type": "string" }, { "internalType": "string", "name": "website", "type": "string" }, { "internalType": "string", "name": "otherDetails", "type": "string" }, { "internalType": "uint256", "name": "withdrawableRewards", "type": "uint256" }, { "internalType": "uint256", "name": "stakedCoins", "type": "uint256" }, { "internalType": "uint256", "name": "waitingBlocksForUnstake", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "validatorAddress", "type": "address" }, { "internalType": "address", "name": "user", "type": "address" } ], "name": "validatorSpecificInfo2", "outputs": [ { "internalType": "uint256", "name": "totalStakedCoins", "type": "uint256" }, { "internalType": "enum InterfaceValidator.Status", "name": "status", "type": "uint8" }, { "internalType": "uint256", "name": "selfStakedCoins", "type": "uint256" }, { "internalType": "uint256", "name": "masterVoters", "type": "uint256" }, { "internalType": "uint256", "name": "stakers", "type": "uint256" }, { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "user", "type": "address" }, { "internalType": "address", "name": "validatorOrMaster", "type": "address" } ], "name": "waitingUnstaking", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "user", "type": "address" }, { "internalType": "address", "name": "validatorOrMaster", "type": "address" } ], "name": "waitingWithdrawProfit", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "user", "type": "address" }, { "internalType": "address", "name": "validatorOrMaster", "type": "address" } ], "name": "waitingWithdrawStaking", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" } ]');

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
                  chainName: chainName+ " Testnet",
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
              alertify.alert('Transaction Success', 'Your transaction is processing.<br>'+"Please check the status of transaction <a href='"+TX_URL+'tx/'+hash+"' target='_blank'> Here</a>", function(){});  
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
            alertify.alert('Transaction Success', 'Your transaction is processing.<br>'+"Please check the status of transaction <a href='"+TX_URL+'tx/'+hash+"' target='_blank'> Here</a>", function(){});  
          }).on('receipt', function(receipt){
            alertify.alert('Transaction Success', 'Your transaction is confirmed successfully.<br>'+"Please check the status of transaction <a href='"+TX_URL+'tx/'+hash+"' target='_blank'> Here</a>", function(){});  
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
