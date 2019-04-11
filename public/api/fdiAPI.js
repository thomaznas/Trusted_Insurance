var currentMAAccount = "0x1111_thomaz";
var FDIContractAddress = "0x23320fcca5de92e3d95c8266ca31d6ba40fe88da";
var FDIContract;
var accounts;
var callbackAccountChanged;

function generateId() {
    return web3.utils.hexToNumber(web3.utils.randomHex(4));
}

async function setupWeb3(configData,callbackFunctionAccountChanged,callbackProcess,callAccountChange) {
    try {

    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
        if (typeof web3 !== 'undefined') {
            // Use Mist/MetaMask's provider
            web3 = new Web3(window.web3.currentProvider);    
        } else {
            // Handle the case where the user doesn't have Metamask installed
            // Probably show them a message prompting them to install Metamask
        }
        
        currentMAAccount = await getCurentMAAccount();
        web3.eth.defaultAccount = currentMAAccount;

        callbackAccountChanged = callbackFunctionAccountChanged;

        FDIContract = new web3.eth.Contract(parametricInsuranceABI, configData.contractAddress);

        if (!isMobile()) {
            web3.currentProvider.publicConfigStore.on('update', accountChanged);
        }

        if (callAccountChange) {
            callbackFunctionAccountChanged(currentMAAccount)
        }


    } catch (err) {
        callbackProcess(err.message);
        return ; 
    }
    callbackProcess("OK");        
}

async function accountChanged() {
    var account;
        
    account = await getCurentMAAccount();
    if (account != currentMAAccount) {
        currentMAAccount = account;
        web3.eth.defaultAccount = account;
        callbackFunctionAccountChanged(account);
    }
}

async function getCurentMAAccount() {
    var acc;
    try {
        let acc = await web3.eth.getAccounts();
        return acc[0];
    } catch (err) {
        return err.message; 
    }

}

async function buyFDIContractAPI(id,value) {
    var result;
    try {
        let result = await FDIContract.methods.buyFDI(id).send({from : currentMAAccount,
                                                                     value: web3.utils.toWei(String(value), "ether")});
        return "SUCCESS";

    } catch (err) {
        return err.message; 
    }
}

async function setConfigContractAPI(configParam) {
    var result;
    try {
        var valuePerMinute = parseInt(configParam.valuePerMinute*1e8)
        var valuePremiumFee = parseInt(configParam.premiumFee*1e8)
        let result = await FDIContract.methods.setFDIParameters(configParam.oracleNum,valuePerMinute,
                                                                configParam.maxMinutes,valuePremiumFee).send({from : currentMAAccount});
        return "SUCCESS";

    } catch (err) {
        return err.message; 
    }
}

async function inputDelayContractAPI(IDInputDelayInfo) {
    
    var result;
    try {
        let result = await FDIContract.methods.inputOracleInfoFDI(IDInputDelayInfo.id,
                                                                  IDInputDelayInfo.inputDelayInfo.isDelayed,
                                                                  IDInputDelayInfo.inputDelayInfo.delayValue,
                                                                  IDInputDelayInfo.inputDelayInfo.oracleName).send({from : currentMAAccount});
        return "SUCCESS";

    } catch (err) {
        return err.message; 
    }

/*
    let tx_builder = FDIContract.methods.inputOracleInfoFDI(IDInputDelayInfo.id,
                                            IDInputDelayInfo.inputDelayInfo.isDelayed,
                                            IDInputDelayInfo.inputDelayInfo.delayValue,
                                            IDInputDelayInfo.inputDelayInfo.oracleName);
    let encoded_tx = tx_builder.encodeABI();
    let transactionObject = {
        gas: 3000000,
        data: encoded_tx,
        from: currentMAAccount,
        to: configData.contractAddress
    }    

    var signedTx;

    try {
        private_key = "7D3BC904427DEAD602A4F63A7C691C7F239B7AA196D863B01AA9D984D191BDAF"
        signedTx = await web3.eth.accounts.signTransaction(transactionObject, private_key)
    } 
    catch (err) {
        return err.message; 
    }
    
    try {
        let result = await web3.eth.sendSignedTransaction(signedTx.rawTransaction)
        return "SUCCESS";

    } catch (err) {
        return err.message; 
    }
*/    
}

async function createNewFDIContractAPI(fdi) {
    var result;
    try {
        let result = await FDIContract.methods.createFDI(fdi.id).send({from : currentMAAccount,
                                                                    value: web3.utils.toWei(String(fdi.funds), "ether")});
        return "SUCCESS";

    } catch (err) {
        return err.message; 
    }
}



