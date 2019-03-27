function loadCreateUserAPI(user) {
    var url = "";

    lastRetMsg = "";
    lastRetObj = null;
    url = '/createuser';
    superagent
    .post(url)
    .set('Content-Type', 'application/json')
    .send(user)
    .end(function(err, res){
        if(err){
            console.log(err);
        }
        else{
            console.log(res);
            lastRetMsg = res.text;
            lastRetObj = res.body;
        }
        loadCreateUserProcess();
    });
}

function loadLoginAPI(user) {
    var url = "";

    lastRetMsg = "";
    lastRetObj = null;
    url = '/login_user';
    superagent
    .post(url)
    .set('Content-Type', 'application/json')
    .send(user)
    .end(function(err, res){
        if(err){
            console.log(err);
        }
        else{
            console.log(res);
            lastRetMsg = res.text;
            lastRetObj = res.body;
        }
        loadLogin();
    });
}

function loadLoginMetaMaskAPI(user) {
    var url = "";

    lastRetMsg = "";
    lastRetObj = null;
    url = '/login_user_metamask';
    superagent
    .post(url)
    .set('Content-Type', 'application/json')
    .send(user)
    .end(function(err, res){
        if(err){
            console.log(err);
        }
        else{
            console.log(res);
            lastRetMsg = res.text;
            lastRetObj = res.body;
        }
        loadLoginMetaMask();
    });
}

function loadUpdateMMAccAPI(user) {
    var url = "";

    lastRetMsg = "";
    lastRetObj = null;
    url = '/update_user_metamask';
    superagent
    .post(url)
    .set('Content-Type', 'application/json')
    .send(user)
    .end(function(err, res){
        if(err){
            console.log(err);
        }
        else{
            console.log(res);
            lastRetMsg = res.text;
            lastRetObj = res.body;
        }
        loadUpdateMMAccProcess();
    });
}

function loadViewFDIAPI(viewParam) {
    var url = "";

    lastRetMsg = "";
    lastRetObj = null;
    url = '/get_view_param_fdi';
    superagent
    .post(url)
    .set('Content-Type', 'application/json')
    .send(viewParam)
    .end(function(err, res){
        if(err){
            console.log(err);
        }
        else{
            console.log(res);
            lastRetMsg = res.text;
            lastRetObj = res.body;
        }
        loadViewFDI();
    });
}

function getConfigDataAPI(callbackFunction) {
    var url = "";

    lastRetMsg = "";
    lastRetObj = null;
    url = '/getconfigdata';
    superagent
    .post(url)
    .set('Content-Type', 'application/json')
    .end(function(err, res){
        if(err){
            console.log(err);
        }
        else{
            console.log(res);
            lastRetMsg = res.text;
            lastRetObj = res.body;
        }
        callbackFunction();
    });
}

function setConfigDataAPI(configDataParam,callbackFunction) {
    var url = "";

    lastRetMsg = "";
    lastRetObj = null;
    url = '/setconfigdata';
    superagent
    .post(url)
    .set('Content-Type', 'application/json')
    .send(configDataParam)
    .end(function(err, res){
        if(err){
            console.log(err);
        }
        else{
            console.log(res);
            lastRetMsg = res.text;
            lastRetObj = res.body;
        }
        callbackFunction();
    });
}

function loadFDIAPI(id,callbackNewsProcessing) {
    var url = "";

    lastRetMsg = "";
    lastRetObj = null;
    url = '/find_FDI/'+id;
    superagent
    .get(url)
    .set('Accept', 'application/json')
    .end(function(err, res){
        if(err){
            console.log(err);
            currentFDI = null;
        }
        else{
            console.log(res);
            lastRetMsg = res.text;
            lastRetObj = res.body;
            currentFDI = lastRetObj;
        }
        callbackNewsProcessing();
    });
}

function buyFDIAPI(id,account,amount) {
    var url = "";

    lastRetMsg = "";
    lastRetObj = null;
    url = '/buy_FDI/'+id+'/'+account+'/'+amount;
    superagent
    .get(url)
    .end(function(err, res){
        if(err){
            console.log(err);
            currentNews = null;
        }
        else{
            console.log(res);
            lastRetMsg = res.text;
            lastRetObj = res.body;
        }
        buyFDIProcess();
    });
}

function inputDelayAPI(IDInputDelayInfo) {
    var url = "";

    lastRetMsg = "";
    lastRetObj = null;
    url = '/input_delay';
    superagent
    .post(url)
    .set('Content-Type', 'application/json')
    .send(IDInputDelayInfo)
    .end(function(err, res){
        if(err){
            console.log(err);
        }
        else{
            console.log(res);
            lastRetMsg = res.text;
            lastRetObj = res.body;
        }
        inputDelayProcess();
    });
}

function loadCreateNewFDIAPI(fdi) {
    var url = "";

    lastRetMsg = "";
    lastRetObj = null;
    url = '/create_new_fdi';
    superagent
    .post(url)
    .set('Content-Type', 'application/json')
    .send(fdi)
    .end(function(err, res){
        if(err){
            console.log(err);
        }
        else{
            console.log(res);
            lastRetMsg = res.text;
            lastRetObj = res.body;
        }
        newFDIProcess();
    });
}




