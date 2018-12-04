var currentMAAccount;
var factualNewsContractAddress = "0x8301e49bf9746b1f20bd0520f980d14ded9eb1e9";
var factualNewsContract;
var accounts;
var callbackAccountChanged;

function generateId() {
    return web3.utils.hexToNumber(web3.utils.randomHex(4));
}

async function setupWeb3(configData,callbackFunctionAccountChanged,callbackProcess) {
    try {

    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
        if (typeof web3 !== 'undefined') {
            // Use Mist/MetaMask's provider
            web3 = new Web3(web3.currentProvider);
        } else {
            // Handle the case where the user doesn't have Metamask installed
            // Probably show them a message prompting them to install Metamask
        }
        
        currentMAAccount = await getCurentMAAccount();
        web3.eth.defaultAccount = currentMAAccount;

        callbackAccountChanged = callbackFunctionAccountChanged;

        factualNewsContract = new web3.eth.Contract(factualNewsABI, configData.contractAddress);

        web3.currentProvider.publicConfigStore.on('update', accountChanged);
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

async function createRequestFNAPI(newsId) {
    var result;
    try {
        let result = await factualNewsContract.methods.createRequest(newsId,newsId).send({from : currentMAAccount});
        return "SUCCESS";

    } catch (err) {
        return err.message; 
    }
}

async function addReviewFundsFNAPI(newsId,value) {
    var result;
    try {
        let result = await factualNewsContract.methods.addReviewFunds(newsId).send({from : currentMAAccount,
                                                                                    value: web3.utils.toWei(String(value), "ether")});
        return "SUCCESS";

    } catch (err) {
        return err.message; 
    }
}

async function applyForReviewFNAPI(newsId) {
    var result;
    try {
        let result = await factualNewsContract.methods.applyForReview(newsId).send({from : currentMAAccount});
        return "SUCCESS";

    } catch (err) {
        return err.message; 
    }
}

async function applyForAuditingFNAPI(newsId) {
    var result;
    try {
        let result = await factualNewsContract.methods.applyForAuditing(newsId).send({from : currentMAAccount});
        return "SUCCESS";

    } catch (err) {
        return err.message; 
    }
}

async function approveReviewerAuditorsFNAPI(newsId) {
    var result;
    try {
        let result = await factualNewsContract.methods.approveReviewerAuditors(newsId).send({from : currentMAAccount});
        return "SUCCESS";

    } catch (err) {
        return err.message; 
    }
}

async function finishReviewFNAPI(newsId) {
    var result;
    try {
        let result = await factualNewsContract.methods.finishReview(newsId).send({from : currentMAAccount});
        return "SUCCESS";

    } catch (err) {
        return err.message; 
    }
}

async function auditReviewFNAPI(newsId,decision) {
    var result;
    try {
        let result = await factualNewsContract.methods.auditReview(newsId,decision).send({from : currentMAAccount});
        return "SUCCESS";

    } catch (err) {
        return err.message; 
    }
}

