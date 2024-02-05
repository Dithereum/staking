$(document).ready(function(){
    var isNetwork= false;
    async function init(){
        contractInstance = new myweb3.eth.Contract(ABI, contractAddress, {
            from: myAccountAddress, // default from address
        });
        viewContractInstance = new myweb3.eth.Contract(dataViewABI, dataViewContractAddress, {
            from: myAccountAddress, // default from address
        });
        
        //validators Table data
        const getAllValidatorInfo = await viewContractInstance.methods.getAllValidatorInfo().call();
        var totalValidatorCount = 0; //var totalValidatorCount = getAllValidatorInfo.totalValidatorCount;
        var totalStakedCoins = getAllValidatorInfo.totalStakedCoins;
        
        var bondedTokens = totalStakedCoins/Math.pow(10,decimals);
        $('#bondedTokens').html(bondedTokens.toFixed(2));
        
        var tblData = "";
        getAllValidatorInfo[2].forEach((getValidator) => {
            totalValidatorCount = parseInt(totalValidatorCount) + 1;            
          });
        $('#validatorsText').html(totalValidatorCount+'/100');
        for(var i=0;i<totalValidatorCount;i++){
            var staked = getAllValidatorInfo[4][i];
            staked = staked/Math.pow(10,decimals);
            staked = staked.toFixed(4);
            var status = getAllValidatorInfo[3][i];
            var validatorName =  getAllValidatorInfo[5][i];
            if(validatorName==""){
                validatorName = getAllValidatorInfo[2][i];
            }
            var validatorWeb =  getAllValidatorInfo[6][i];
            if(status==2){
                status = '<span class="badge bg-success">Active</span>';
            }else{
                status = '<span class="badge bg-danger">Inactive</span>';
            }
            tblData+='<tr>'+
                                 '<td><a href="validators.html?address='+getAllValidatorInfo[2][i]+'" class=""><img src="https://raw.githubusercontent.com/binance-chain/validator-directory/main/validators/bva1z0g0cg8dkgczr6r8t6khva3srn5mwj8w5tlu7h/logo.png" class="gYNxxe" style="width: 24px;"> '+validatorName+'</a></td>'+
                                 '<td>'+validatorWeb+'</td>'+
                                 '<td>'+staked+' '+symbol+'</td>'+

                                 '<td>'+status+'</td>'+
                                 //'<td><a href="validators.html?address='+getAllValidatorInfo[2][i]+'" class=""><button class="btn btn-outline-primary btn-sm">Stake</button></a></td>'+
                             '</tr>';
        }
        $("#validatorsTable").html(tblData);
    
    }

    $('#becomeValidatorButton').click(function(){
        var dlgContentHTML = $('#dlgContent').html();
        $('#dlgContent').html("");
        alertify.confirm(dlgContentHTML).set('onok',async function(closeevent, value) {
          var feeAddr = $('#feeAddr').val();
          var moniker = $('#moniker').val();
          var identity = $('#identity').val();
          var website = $('#website').val();
          var email = $('#email').val();
          var details = $('#details').val();
          var payableAmount = 10000*1e18;
          payableAmount = logEtoLongNumber(payableAmount);
          
          const web3GasPrice =await myweb3.eth.getGasPrice();
        
          var checkValidator = await viewContractInstance.methods.checkValidator(myAccountAddress).call();
          if(checkValidator==false){
            alertify.alert('Warning','You are not authorized to become a validator yet. Please contact us and get the authorization first and then proceed here. Thank you!');
            return false;
          }else{
            var valInfo = await viewContractInstance.methods.validatorSpecificInfo2(myAccountAddress,myAccountAddress).call();
            if(valInfo.status == 0){
              var data =  contractInstance.methods.createOrEditValidator(feeAddr,moniker,identity,website,email,details).encodeABI();
              processTx(data,contractAddress,web3GasPrice,gasLimit,payableAmount,explorerURL);
            }
            else if(valInfo.status == 1 || valInfo.status == 2)
            {
              var data =  contractInstance.methods.createOrEditValidator(feeAddr,moniker,identity,website,email,details).encodeABI();
              processTx(data,contractAddress,web3GasPrice,gasLimit,0,explorerURL);
            }
            else if(valInfo.status == 3 || valInfo.status == 4)
            {
              alertify.alert('Warning','You cannot use Unstaked/Jailed wallet address. Please use different wallet address');
              return false;
            }
          }

          

    }).set('title', "Enter Validator Info.");

        
        
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

    $('#addNetwork').click(function(){
        addNetwork();
    })
});
