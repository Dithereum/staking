$(document).ready(function(){

    async function init(){
        contractInstance = new myweb3.eth.Contract(ABI, contractAddress, {
            from: myAccountAddress, // default from address
        });
        viewContractInstance = new myweb3.eth.Contract(dataViewABI, dataViewContractAddress, {
            from: myAccountAddress, // default from address
        });
        //validators Table data
        const getAllValidatorInfo = await viewContractInstance.methods.getAllValidatorInfo().call();
        var totalValidatorCount = getAllValidatorInfo.totalValidatorCount;
        var totalStakedCoins = getAllValidatorInfo.totalStakedCoins;
        $('#validatorsText').html(totalValidatorCount+'/21');
        $('#bondedTokens').html(totalStakedCoins/Math.pow(10,decimals));
        
        var tblData = "";
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
                                 '<td><a href="validators.html?address='+getAllValidatorInfo[2][i]+'" class=""><button class="btn btn-outline-primary btn-sm">Stake</button></a></td>'+
                             '</tr>';
        }
        $("#validatorsTable").html(tblData);
        //Master Voters Table data
        const getAllMasterVotersInfo = await viewContractInstance.methods.getAllMasterVotersInfo().call();
       
        var totalMasterVoters = getAllMasterVotersInfo.totalMasterVoters;
        $('#masterVoters').html(totalMasterVoters);
        tblData = "";
        for(var i=0;i<totalMasterVoters;i++){
            var staked = getAllMasterVotersInfo[3][i];
            staked = staked/Math.pow(10,decimals);
            staked = staked.toFixed(4);
            tblData+='<tr>'+
                                 '<td><a href="masters.html?address='+getAllMasterVotersInfo[2][i]+'&validator='+getAllMasterVotersInfo[1][i]+'" class="">'+getAllMasterVotersInfo[2][i]+'</a></td>'+
                                 '<td><a href="validators.html?address='+getAllMasterVotersInfo[1][i]+'" class="">'+getAllMasterVotersInfo[1][i]+'</a></td>'+
                                 '<td>'+staked+' '+symbol+'</td>'+
                                 '<td><span class="badge bg-success">Active</span></td>'+
                                 '<td><a href="masters.html?address='+getAllMasterVotersInfo[2][i]+'" class=""><button class="btn btn-outline-primary btn-sm">Stake</button></a></td>'+
                             '</tr>';
        }
        $("#mastersTable").html(tblData);

        
    }
    setTimeout(init,1000);
});

var button = document.getElementById("addDTHNetwork");
button.addEventListener("click",function(e){
    addNetwork();
},false);    
