$(document).ready(function(){
apiURL = 'https://api.dithereum.io/getallvalidators';

    async function init(){
        const fetchResponse =  await fetch(apiURL);
        const edata = await fetchResponse.json();   
        var tblData = "";
        
            const total_validators = edata.activeValidators;
            const validators = edata.validators_list;
            $('#validatorsText').html(validators.length+'/'+total_validators);
            $('#bondedTokens').html(edata.bondedtokens);
            if(validators.length>0){
                validators.forEach(element => {
                    const apr = element.validatorAPR;
                    const comission =element.validatorCommission;
                    const status = element.status;
                    const validator = element.validatorName;
                    const voting_power = element.votingpower;
                    const voting_percent = element.voting_percent;
                    

                    tblData+='<tr>'+
                                '<td><a class=""><img src="https://raw.githubusercontent.com/binance-chain/validator-directory/main/validators/bva1z0g0cg8dkgczr6r8t6khva3srn5mwj8w5tlu7h/logo.png" class="gYNxxe" style="width: 24px;"> '+validator+'</a></td>'+
                                '<td>'+voting_power+' / '+voting_percent+'%</td>'+
                                '<td>'+comission+'%</td>'+
                                '<td>'+apr+'%</td>'+
                                '<td><span class="badge bg-success">'+status+'</span></td>'+
                                '<td>Delegate</td>'+
                            '</tr>';
                });
                $("#validatorsTable").html(tblData);
            }
        
    }
    setTimeout(init,1000);
});