
function loadViewFactualNewsAPI(viewParam) {
    var url = "";

    lastRetMsg = "";
    lastRetObj = null;
    url = '/get_view_param_news';
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
        loadViewFactualNews();
    });
}

function loadCreateNewNewsAPI(news) {
    var url = "";

    lastRetMsg = "";
    lastRetObj = null;
    url = '/create_new_news';
    superagent
    .post(url)
    .set('Content-Type', 'application/json')
    .send(news)
    .end(function(err, res){
        if(err){
            console.log(err);
        }
        else{
            console.log(res);
            lastRetMsg = res.text;
            lastRetObj = res.body;
        }
        loadViewFactualNewsParam('Current','O',['Blank'],'');
    });
}

function loadNewsAPI(id,callbackNewsProcessing) {
    var url = "";

    lastRetMsg = "";
    lastRetObj = null;
    url = '/find_news/'+id;
    superagent
    .get(url)
    .set('Accept', 'application/json')
    .end(function(err, res){
        if(err){
            console.log(err);
            currentNews = null;
        }
        else{
            console.log(res);
            lastRetMsg = res.text;
            lastRetObj = res.body;
            currentNews = lastRetObj;
        }
        callbackNewsProcessing();
    });
}

function addFundsNewsAPI(id,amount) {
    var url = "";

    lastRetMsg = "";
    lastRetObj = null;
    url = '/add_funds_news/'+id+'/'+amount;
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
        newsAddFundsProcess();
    });
}

function applyReviewAPI(id,reviewer) {
    var url = "";

    lastRetMsg = "";
    lastRetObj = null;
    url = '/apply_review/'+id+'/'+reviewer;
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
        applyReviewProcess();
    });
}

function applyAuditAPI(id,auditor) {
    var url = "";

    lastRetMsg = "";
    lastRetObj = null;
    url = '/apply_audit/'+id+'/'+auditor;
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
        applyAuditProcess();
    });
}

function approveRevAudAPI(id) {
    var url = "";

    lastRetMsg = "";
    lastRetObj = null;
    url = '/approve_reviewer_auditors/'+id;
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
        approveRevAudProcess();
    });
}

function completeReviewAPI(id,news) {
    var url = "";

    lastRetMsg = "";
    lastRetObj = null;
    url = '/complete_review';
    superagent
    .post(url)
    .set('Content-Type', 'application/json')
    .send(news)
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
        completeReviewProcess();
    });
}

function approveReviewAPI(id,auditor) {
    var url = "";

    lastRetMsg = "";
    lastRetObj = null;
    url = '/approve_review/'+id+'/'+auditor;
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
        approveReviewProcess();
    });
}

function denyReviewAPI(id,auditor) {
    var url = "";

    lastRetMsg = "";
    lastRetObj = null;
    url = '/deny_review/'+id+'/'+auditor;
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
        denyReviewProcess();
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

function loadJoinUsAPI(email,pass,joinUsUserType,MMAccount) {
    var url = "";

    lastRetMsg = "";
    lastRetObj = null;
    url = '/joinus/'+email+'/'+pass+'/'+joinUsUserType+'/'+MMAccount;
    superagent
    .get(url)
    .set('Accept', 'application/json')
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
        loadJoinUsProcess();
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

