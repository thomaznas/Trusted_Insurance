var port = 8000;
var contractAddress = "0x8301e49bf9746b1f20bd0520f980d14ded9eb1e9";
var express = require('express');
var app = express();
var myParser = require("body-parser");

// setup directory used to serve static files
// YOUR CODE
app.use(express.static('public'));

// setup data store
// YOUR CODE
var low = require('lowdb');
var fs = require('lowdb/adapters/FileSync');
var adapter = new fs('db.json');
var db = low(adapter);

// required data store structure
// YOUR CODE
db.defaults({
               factualnews:[
/*                   {id          : '',
                    status      : '', 
                    title       : '',
                    newsBody   : '',
                    newsRev    : '',
                    originator : '',
                    reviewer    : '',
                    auditors    : [] ,
                    funds       : 0,
                    auditorsApprovalStatus : []
                 }  */
                ] ,
                originators:[
/*                    {email       : '',
                     password    : ''} */
                 ] ,
                 reviewers:[
/*                    {email       : '',
                     password    : ''}  */
                 ] ,
                auditors:[
/*                    {email       : '',
                     password    : ''}  */
                 ]  
  
} ).write();

// Useful functions
function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

function toMoney(num) {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'ETH' }).format(num);
}

function type2table(type) {
    switch(type) {
        case 'O':
            table = 'originators';
            break;
        case 'R':
            table = 'reviewers';
            break;
        case 'A':
            table = 'auditors';
            break;
        default:
            table = '';
       }
    return table;
}

// Find a user on a specific table
function findUser(email, type) {
   var user,table;

   user = null;
   table = type2table(type);
   if (table != '') {
        user = db.get(table).find({ email: email.toUpperCase() }).value();
   }

   return user;
}

// Find a user on a specific table
function findUserMetaMask(MMAccount) {
    var user;
    
    user = null;
    user = db.get('originators').find({ MMAccount: MMAccount }).value();
    if (isEmpty(user)) {
        user = db.get('reviewers').find({ MMAccount: MMAccount }).value();
        if (isEmpty(user)) {
            user = db.get('auditors').find({ MMAccount: MMAccount }).value();
            if (isEmpty(user)) {
                return null;
            }
            else {
                user.type = 'A';
            }
        }    
        else {
            user.type = 'R';
        }
    }
    else {
        user.type = 'O';
    }
 
    return user;
 }
 
 

// Create user on a specific table
function createUser(email, password, type, MMAccount) {
    var user,table;
    var ret;
 
    ret = false;
    table = type2table(type);
    if (table != '') {
       user = {"email" : email.toUpperCase() , "password" : password , "MMAccount" : MMAccount } 
       db.get(table).push(user).write();
       ret = true;
    }
 
    return ret;
 }
 
// Find a specific FactualNews
function findFactualNews(id) {
    var news;
 
    news = db.get('factualnews').find({ id: id }).value();
 
    return news;
 }

 // Create a new Factual News 
function createFactualNews(id, status, title, newsBody, newsRev,originator, reviewer, auditors, funds, auditorsApprovalStatus) {

    var news;
    var ret;
 
    ret = false;
    news = { "id" : String(id) , "status" : status , "title" : title , "newsBody" : newsBody , 
             "newsRev" : newsRev , "originator": originator.toUpperCase(), "reviewer" : reviewer.toUpperCase() , 
             "auditors" : auditors , "funds": funds , "auditorsApprovalStatus" : auditorsApprovalStatus} 
    db.get('factualnews').push(news).write();
    ret = true;
 
    return ret;
 }

// updade the object based on what is going to change
function updateFactualNewsFields(news, id, status, title, newsBody, newsRev, originator, reviewer, auditors, funds, auditorsApprovalStatus) {

//    if (id != '') { 
//        news.id = id;
//    }
    if ((status != '') && (!isEmpty(status))) {
        news.status = status;
    }
    if ((title != '') && (!isEmpty(title))) {
        news.title = title;
    }
    if ((newsBody != '') && (!isEmpty(newsBody))) {
        news.newsBody = newsBody;
    }
    if ((newsRev != '') && (!isEmpty(newsRev))) {
        news.newsRev = newsRev;
    }
    if ((originator != '') && (!isEmpty(originator))) {
        news.originator = originator.toUpperCase();
    }
    if ((reviewer != '') && (!isEmpty(reviewer))) {
        news.reviewer = reviewer.toUpperCase();
    }
    if ( !isEmpty(auditors)) {
        var len = auditors.length;
        for (i=0;i<len;i++) {
            auditors[i] = auditors[i].toUpperCase();
        }
        news.auditors = auditors;
    }
    if (!isEmpty(funds)) {
        news.funds = funds;
    } 
    if ( !isEmpty(auditorsApprovalStatus)) {
        news.auditorsApprovalStatus = auditorsApprovalStatus;
    }

    return news;
}
  // Update Factual News 
function updateFactualNews(id, status, title, newsBody, newsRev, originator, reviewer, auditors, funds, auditorsApprovalStatus) {

    var news;
    var ret;
 
    ret = false;
    news = findFactualNews(id);
    if (!isEmpty(news)) {
        updateFactualNewsFields(news,id, status, title, newsBody, newsRev, originator, reviewer, auditors,funds,auditorsApprovalStatus);
        db.write();
        ret = true;
    }
 
    return ret;
 }

 function writeToDbNewsPointer(news) {
    var ret;
 
    ret = false;
    if (!isEmpty(news)) {
        db.write();
        ret = true;
    }
    return ret;
 }
  
 // Return a list of FactualNews that belongs to the originator
 function findNewsFromOriginator(originator) {
    var newsList;

    newsList = db.get('factualnews')
             .filter(news => news.originator == originator ) 
             .value();
            
    return newsList;             
 }

 // Return a list of FactualNews that belongs to the reviewer
 function findNewsFromReviewer(reviewer) {
    var newsList;

    newsList = db.get('factualnews')
             .filter(news => news.reviewer == reviewer ) 
             .value();
            
    return newsList;             
 }

 function isInAuditorList(auditorList,auditor) {
     if (isEmpty(auditorList)) {
         return false;
     }
     var len = auditorList.length
     for(i=0;i<len;i++) {
         if (auditorList[i] == auditor ) {
            return true;
         }
     }
     return false;
 }

 function countAuditors(auditorList) {
    if (isEmpty(auditorList)) {
        return 0;
    }
    var len = auditorList.length
    return len;
 }

// Return a list of FactualNews that belongs to the auditor
function findNewsFromAuditor(auditor) {
     var newsList;

     newsList = db.get('factualnews')
                 .filter(news => isInAuditorList(news.auditors,auditor) ) 
                 .value();
    
    return newsList;             
 }

//Retrieve all news
function getAllNews() {
    return db.get('factualnews').value();
}

function viewParamFilter(news,viewParam) {
    var len;
    switch(viewParam.userType) {
        case 'O':
            if (viewParam.userName != news.originator) {
                return false;
            }
            break;
        case 'R':
            if (viewParam.userName != news.reviewer) {
                return false;
            }
            break;
        case 'A':
            if (!isInAuditorList(news.auditors,viewParam.userName)) {
                return false;
            }
            break;
        default:
       }
    len = viewParam.newsStatus.length;
    if (len > 0) {
        var statusInTheList = false;
        for (var i=0; i<len; i++) {
            if (viewParam.newsStatus[i] == news.status) {
                statusInTheList = true;
            }
        }
        if (!statusInTheList) {
            return false;
        }
    }    
    return true;
}


// Retrive news according to the parameters --> var viewParam = { "userName": '', "userType": '', "newsStatus": '' };
// All users must 
function getViewParamNews(viewParam) {
    var newsList;

    newsList = db.get('factualnews')
                .filter(news => viewParamFilter(news,viewParam) ) 
                .value();
   
   return newsList;             
}

// check if the user can be authenticated 
function checkUserLogin(email,password,type) {
    var ret = false;
    var user;

    user = findUser(email.toUpperCase(),type);
    if (!isEmpty(user)) {
        if (user.password == password) {
            ret = true;
        }
    }

    return ret;
} 

//Create a review request
function createRequest(id) {
    var ret = false;
    var auditorList;

    auditorList = [];
    auditorsApprovalStatusList = [];
    ret = createFactualNews(String(id),"Blank","","","","","",auditorList,0,auditorsApprovalStatusList);
    return ret;
}    

//Request a review 
function requestReview(id,newsBody) {
    var news = findFactualNews(id);
    var ret = false;

    if (!isEmpty(news)) {
        if (news.status == "Blank") {
            if (newsBody != "") {
                ret = updateFactualNews(id,"Auditing","",newsBody);
            }
        }
    }

    return ret;
}    

// Assign a reviewer to the news
function assignReviewerToFactualNews(id,reviewer) {
    var ret = false;
    var user;

    user = findUser(reviewer,"R");
    if (!isEmpty(user)) {
        ret = updateFactualNews(id,"","","","","",reviewer);
        if (ret) {
            validateAndUpdateStatus(id,"Approve Reviewer");
        }
    }
    return ret;
}

// Assign an auditor to the news
function assignAuditorToFactualNews(id,auditor) {
    var ret = false;
    var news;
    var auditorList,auditorsApprovalStatusList;

    ret = false;
    user = findUser(auditor,"A");
    if (!isEmpty(user)) {
        news = findFactualNews(id);
        if (!isEmpty(news)) {
            if (!isInAuditorList(news.auditors,auditor))  {
                auditorList = [];
                auditorList = news.auditors;
                auditorList.push(auditor);
                auditorsApprovalStatusList = [];                
                auditorsApprovalStatusList = news.auditorsApprovalStatus;
                auditorsApprovalStatusList.push(-1);
                ret = updateFactualNews(id,"","","","","","",auditorList,null,auditorsApprovalStatusList);    
            }
        }
    }    

    return ret;
}

// validate status change 
function validateStatusChange(id,newStatus) {
    var news = findFactualNews(id);
    var ret = false;

    if (!isEmpty(news)) {
//  This status can be "Blank", "Requested", "Approve Reviewer", "Reviewing" , "Auditing" , "Approved" or "Denied"        
        switch (newStatus) {
            case 'Requested':
                if (news.status == 'Blank') {
                    ret = true;
                }
                break;
            case 'Approve Reviewer':
                if (news.status == 'Requested') {
                    ret = true;
                }
                break;
            case 'Reviewing':
                if (news.status == 'Approve Reviewer') {
                    if (news.reviewer != "") {
                        if (!isEmpty(news.auditors)) {
                            if (news.auditors.length > 0) {
                                ret = true;
                            }
                        }
                    }
                }
                break;
            case 'Auditing':
                if (news.status == 'Reviewing') {
                    ret = true;
                }
                break;
            case 'Approved':
                if (news.status == 'Auditing') {
                    ret = true;
                }
                break;
            case 'Denied':
                if (news.status == 'Auditing') {
                    ret = true;
                }
                break;
            default:
                ret = false;
        }
    }
    else {
        ret = false;
    }
    return ret;
}

// update FactualNews Status
function updateNewsStatus(id,status) {
    var ret = false;

    ret = updateFactualNews(id,status);

    return ret;
}

function validateAndUpdateStatus(id,newStatus) {
    var ret=false;
    if (validateStatusChange(id,newStatus)) {
        if (updateNewsStatus(id,newStatus)) {
            ret = true;
        }
    }
    return ret;
}

function addFundsToFactualNews(id,amount) {
    var news;
    var ret = false;

    news = findFactualNews(id);
    if (!isEmpty(news)) {
        news.funds += Number(amount);
        writeToDbNewsPointer(news);
        validateAndUpdateStatus(id,"Requested");
        ret = true;
    }
    return ret;
}

// approve Reviewer and Auditors
function appproveReviewerAuditors(id) {
    var news = findFactualNews(id);
    var ret = false;

    if (!isEmpty(news)) {
        if ((news.status == "Approve Reviewer") || (news.status == "Requested")) {
            if (countAuditors(news.auditors) > 0) {
                ret = validateAndUpdateStatus(id,"Reviewing");
            }
        }
    }

    return ret;
}    

// Finalize a review
function completeReview(id,newsRev) {
    var news = findFactualNews(id);
    var ret = false;

    if (!isEmpty(news)) {
        if (news.status == "Reviewing") {
            if (newsRev != "") {
                ret = updateFactualNews(id,"Auditing","","",newsRev);
            }
        }
    }

    return ret;
}    

// status = -1 (undefined) 0 = Denied and 1 = approved
function updateAuditorStatus(news,auditor,status) {

    if (isEmpty(news)) {
        return false;
    }

    if (isEmpty(news.auditors)) {
        return false;
    }
    var len = news.auditors.length;
    for(i=0;i<len;i++) {
        if (news.auditors[i] == auditor ) {
            news.auditorsApprovalStatus[i] = status;
            return true;
        }
    }
    return false;
}

function countAuditorApprovalStatus(news,status) {
    var len = news.auditorsApprovalStatus.length;
    var count=0;
    for(i=0;i<len;i++) {
        if (news.auditorsApprovalStatus[i] == status ) {
            count++;
        }
    }
    return count;
}

function checkStatus(news) {
    var countApproved,countDenied;
    var totalAuditors,tempTotalAuditors;

    countApproved = countAuditorApprovalStatus(news,1);
    countDenied = countAuditorApprovalStatus(news,0);

    totalAuditors = countAuditors(news.auditors);

    if ( ((totalAuditors % 2) == 0) &&
         (totalAuditors == (countApproved + countDenied)) &&
         (countApproved == countDenied)  
       ) {
        return 0;
    }

    if ((totalAuditors % 2) != 0) {
        tempTotalAuditors = totalAuditors + 1;
    }
    else {
        tempTotalAuditors = totalAuditors;
    }
    
    if (countDenied >= (tempTotalAuditors/2)) {
        return 0;
    }

    if (countApproved > (tempTotalAuditors/2)) {
        return 1;
    }

    return -1;
}

// Return -2 - error -1 - undefined 0 - denied and 1 - approved
function approveOrDenyReview(id,auditor,newStatus) {
    var news = findFactualNews(id);
    var ret = -2;

    if (!isEmpty(news)) {
        if (updateAuditorStatus(news,auditor,newStatus)) {
            writeToDbNewsPointer(news);

            switch (checkStatus(news)) {
                case 1:
                    if (news.status == "Auditing") {
                        if (updateFactualNews(id,"Approved"))  {
                            ret = 1;
                        }
                    }
                    break;
                case 0:
                    if (news.status == "Auditing") {
                        if (updateFactualNews(id,"Denied")) {
                            ret = 0;
                        }
                    }
                    break;
                default:
                    ret = -1
                    break;
            }
        }
    }
    return ret;
}    

// Approve a review
function approveReview(id,auditor) {
    return approveOrDenyReview(id,auditor,1);
}

// Denial a review
function denyReview(id,auditor) {
    return approveOrDenyReview(id,auditor,0);
}    

// Apply for review
app.get('/apply_review/:id/:email', function (req, res) {
    var msg;

    ret = assignReviewerToFactualNews(req.params.id,req.params.email);
    if (!ret) {
        msg = "FAILURE: reviewer cannot be assigned !";
    }
    else {
        msg = "SUCCESS: reviewer was assigned";
    }

    console.log(msg);   
    res.send(msg);
});

// Apply for audit
app.get('/apply_audit/:id/:email', function (req, res) {
    var msg;

    ret = assignAuditorToFactualNews(req.params.id,req.params.email);
    if (!ret) {
        msg = "FAILURE: auditor cannot be assigned !";
    }
    else {
        msg = "SUCCESS: Auditor was assigned";
    }

    console.log(msg);   
    res.send(msg);
});
app.get('/approve_reviewer_auditors/:id', function (req, res) {
    var msg;

    ret = appproveReviewerAuditors(req.params.id);
    if (!ret) {
        msg = "FAILURE: reviewer and auditor cannot be approved !";
    }
    else {
        msg = "SUCCESS: Review request is approved ! ";
    }

    console.log(msg);   
    res.send(msg);
});

app.get('/approve_review/:id/:auditor', function (req, res) {
    var msg;
    var ret;

    ret = approveReview(req.params.id,req.params.auditor);
    switch (ret) {
        case 1:
            msg = "SUCCESS: Auditor response registered - NEWS WAS APPROVED!!!";
            break;
        case 0:
            msg = "SUCCESS: Auditor response registered - News was DENIED :-(";
            break;
        case -1:
            msg = "SUCCESS: Auditor response registered - News still under auditing status";
            break;
        default:
            msg = "FAILURE: Auditor response was not computed properly";
            break;

    }
    console.log(msg);   
    res.send(msg);
});

app.get('/deny_review/:id/:auditor', function (req, res) {
    var msg;
    var ret;

    ret = denyReview(req.params.id,req.params.auditor);
    switch (ret) {
        case 1:
            msg = "SUCCESS: Auditor response registered - NEWS WAS APPROVED!!!";
            break;
        case 0:
            msg = "SUCCESS: Auditor response registered - News was DENIED :-(";
            break;
        case -1:
            msg = "SUCCESS: Auditor response registered - News still under auditing status";
            break;
        default:
            msg = "FAILURE: Auditor response was not computed properly";
            break;

    }
    console.log(msg);   
    res.send(msg);

}); 

app.get('/find_news/:id', function (req, res) {
    var msg;
    var news;
    var id;

    msg = "FAILURE: news is not avaiable !";
    if (!isEmpty(req.params.id)) {
        id = req.params.id;
        news = findFactualNews(id);
        if (!isEmpty(news)) {
            msg = "SUCCESS: News was loaded ! ";
            res.send(news);
        }
        else {
            res.send(msg);
        }
    }
    else {
        res.send(msg);
    }

    console.log(msg);   
}); 

app.get('/add_funds_news/:id/:fundAmount', function (req, res) {
    var msg;
    var id,amount;

    msg = "FAILURE: news is not avaiable !";
    if (!isEmpty(req.params.id)) {
        id = req.params.id;
        amount = Number(req.params.fundAmount);;
        if (addFundsToFactualNews(id,amount)) {
            msg = "SUCCESS: Funds added to this News Review Request - " + toMoney(amount);
            res.send(msg);
        }
        else {
            res.send(msg);
        }
    }
    else {
        res.send(msg);
    }

    console.log(msg);   
}); 

app.get('/apply_review/:id/:reviewer', function (req, res) {
    var msg;
    var id,reviewer;

    msg = "FAILURE: news is not avaiable !";
    if (!isEmpty(req.params.id)) {
        id = req.params.id;
        reviewer = req.params.reviewer;
        if (assignReviewerToFactualNews(id,reviewer)) {
            msg = "SUCCESS: " + reviewer + " is the reviewer for News " +id;
            res.send(msg);
        }
    }

    res.send(msg);
    console.log(msg);   
}); 

// Check login and password
app.get('/joinus/:email/:password/:type/:MMAccount', function (req, res) {
    var msg;
    
    if (createUser(req.params.email,req.params.password,req.params.type,req.params.MMAccount)) {
        msg = "SUCCESS: User - "+req.params.email+ ", type - " + req.params.type + ", created !";
        res.send(msg);
    }
    else {
        res.send(msg);
    }
    console.log(msg);   
});

app.use(myParser.urlencoded({extended : true}));
app.use(myParser.json());

app.post('/get_view_param_news', function (req, res) {
    var msg;
    var viewParam

    var newsList;

    viewParam = req.body;
    newsList = getViewParamNews(viewParam);
    if (isEmpty(newsList)) {
        msg = "FAILURE: no news is avaiable !";
        res.send(msg);
    }
    else {
        msg = "SUCCESS: All news are loaded ! ";
        res.send(newsList);
    }

    console.log(msg);   
}); 

app.post('/create_new_news', function (req, res) {
    var msg;
    var news;

    msg = "FAILURE: new news could not be created !";
    news = req.body;
    if (!isEmpty(news)) {

        if (createFactualNews(news.id,news.status,news.title,news.newsBody,news.newsRev,news.originator,news.reviewer,news.auditors,news.funds,news.auditorsApprovalStatus)) {
            msg = "SUCCESS: News was created ! ";
            res.send(msg);
        }
        else {
            res.send(msg);
        }
    }
    else {
        res.send(msg);
    }

    console.log(msg);   
}); 


app.post('/complete_review', function (req, res) {
    var msg;
    var news;

    msg = "FAILURE: news review could not be completed !";
    news = req.body;
    if (!isEmpty(news)) {

        if (completeReview(news.id,news.newsRev)) {
            msg = "SUCCESS: Review was completed ! ";
            res.send(msg);
        }
        else {
            res.send(msg);
        }
    }
    else {
        res.send(msg);
    }

    console.log(msg);   
}); 


app.post('/login_user', function (req, res) {
    var msg;
    var user;

    msg = "FAILURE: login could not be completed !";
    user = req.body;
    if (!isEmpty(user)) {

        if (checkUserLogin(user.email,user.password,user.type)) {
            msg = "SUCCESS: User logged in ! ";
            res.send(user);
        }
        else {
            res.send(msg);
        }
    }
    else {
        res.send(msg);
    }

    console.log(msg);   
}); 

app.post('/login_user_metamask', function (req, res) {
    var msg;
    var user,tmpUser;

    msg = "FAILURE: login could not be completed !";
    user = req.body;
    if (!isEmpty(user)) {

        tmpUser = findUserMetaMask(user.MMAccount);
        if (!isEmpty(tmpUser)) {
            user = tmpUser;
            msg = "SUCCESS: User logged in ! ";
            res.send(user);
        }
        else {
            res.send(msg);
        }
    }
    else {
        res.send(msg);
    }
    console.log(msg);   
}); 

var configDataFoundconfigData = { id: 1, Network: "Rinkeby",
                   contractAddress: contractAddress } ;

function findConfigData() {
    var configData,table;

    configData = null;
    table = "config";
    configData = db.get(table).find({ id: 1 }).value();

    return configData;
}
                 
function updateConfigData(configDataParam) {
    var table,configDataFound;
    var ret;
 
    ret = false;
    table = "config";

    configDataFound = db.get(table).find({ id: 1 }).value();
    if ( isEmpty(configDataFound) ) {
        db.get(table).push(configDataParam).write();
        ret = true;    
    } 
    else {
        configDataFound.network = configDataParam.network;
        configDataFound.contractAddress = configDataParam.contractAddress;
        db.write();
        ret = true;    
    }

    return ret;
 }

app.post('/getconfigdata', function (req, res) {
    var msg;
    var configDataFound;

    msg = "FAILURE: config data could not be retrieved !";
    configDataFound = findConfigData();
    if (!isEmpty(configDataFound)) {
        msg = "SUCCESS: config data was got successfully ! ";
        res.send(configDataFound);
    }
    else {
        res.send(msg);
    }

    console.log(msg);   
}); 
                
app.post('/setconfigdata', function (req, res) {
    var msg;
    var configDataParam;

    msg = "FAILURE: config data could not be retrieved !";
    configDataParam = req.body;
    if (updateConfigData(configDataParam)) {
        msg = "SUCCESS: ConfigData was update successfully ! ";
        res.send(configDataParam);
    }
    else {
        res.send(msg);
    }

    console.log(msg);   
}); 
                
app.post('/update_user_metamask', function (req, res) {
    var msg;
    var user,tmpUser;

    msg = "FAILURE: update MetaMask account could not be completed !";
    user = req.body;
    if (!isEmpty(user)) {

        tmpUser = findUser(user.email.toUpperCase(),user.type);
        if (!isEmpty(tmpUser)) {
            if (user.password == tmpUser.password) {
                tmpUser.MMAccount = user.MMAccount;
                db.write();
                msg = "SUCCESS: User MMAcount updated ! ";
            }
        }
    }
    res.send(msg);
    console.log(msg);   
}); 

app.listen(port,function () { 
    console.log('FactualNews http server is ready at ' + String(port))
});

