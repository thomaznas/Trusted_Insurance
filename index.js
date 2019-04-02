var port = 9000;
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
               fdi:[
/*               {
                    id          : '',
                    status      : '', 
                    funds       : 0,
                    coverageNum : 0,
                    delay       : 0,
                    oracleNum   : 3,
                    valuePerMinute : 0.1,
                    maxMinutes  : 120,
                    premiumFee  : 1,
                    insurer     : '',
                    coverages   : [],
                    oracleInputDelay : [] 
                 }  */
                ] ,
                users:[
/*                   { 
                        userId      : '',
                        password    : '',
                        MMAccount   : '',
                        type        : ''   // 'P' -> Passenger , 'I' -> Insurer , 'O' -> Oracle 
                   }       */
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

function writeToDbFDIPointer(FDI) {
    var ret;
 
    ret = false;
    if (!isEmpty(FDI)) {
        db.write();
        ret = true;
    }
    return ret;
 }
 
// User management funcions
// Find a user on a specific table
function findUser(userId) {
    var user,table;
 
    user = null;
    user = db.get('users').find({ userId: userId.toUpperCase() }).value();
    
    return user;
 }
 
 function findUserMetaMask(MMAccount) {
     var user;
     
     user = null;
     user = db.get('users').find({ MMAccount: MMAccount }).value();
  
     return user;
  }
 
 function createUser(user) {
    var ret;
  
    ret = false;
    db.get('users').push(user).write();
    ret = true;
  
    return ret;
}

function checkUserLogin(userId,password) {
    var ret = false;
    var user;

    user = findUser(userId.toUpperCase());
    if (!isEmpty(user)) {
        if (user.password == password) {
            ret = true;
        }
    }

    return ret;
} 
  
// Application functions
function viewParamFilter(fdi,viewParam) {
    var len;

    if (viewParam.id != '') {
        if (viewParam.id != fdi.id) {
            return false;
        }
    }

    if (viewParam.insurer != '') {
        if (viewParam.insurer != fdi.insurer) {
            return false;
        }
    }

    len = viewParam.statusList.length;
    if (len > 0) {
        var statusInTheList = false;
        for (var i=0; i<len; i++) {
            if (viewParam.statusList[i] == fdi.status) {
                statusInTheList = true;
            }
        }
        if (!statusInTheList) {
            return false;
        }
    }    
    return true;
}

// Retrive fdi according to the parameters --> var viewParam = { "id": '', "status": '' };
// All users must 
function getViewParamFDI(fdiParam) {
    var fdiList;

    fdiList = db.get('fdi')
                .filter(fdi => viewParamFilter(fdi,fdiParam) ) 
                .value();
   
   return fdiList;             
}

// Find a specific FDI
function findFDI(id) {
    var FDI;
 
    FDI = db.get('fdi').find({ id: id }).value();
 
    return FDI;
 }

 function buyFDI(id,account,amount) {
    var FDI;
    var ret = false;
    var coverage = { 
        account : '',
        amount  : 0 ,
        type    : ''
    }

    FDI = findFDI(id);
    if (!isEmpty(FDI)) {
        FDI.coverageNum -= 1;
        coverage.account = account;
        coverage.amount = amount;
        FDI.coverages.push(coverage);
        ret = writeToDbFDIPointer(FDI);
    }
    return ret;
 }

function createOracleInputDelay(IDInputDelayInfo) {
    var FDI;
    var ret = false;
    var coverage = { 
        account : '',
        amount  : 0 ,
        type    : ''
    }

    FDI = findFDI(IDInputDelayInfo.id);
    if (!isEmpty(FDI)) {        
        if (FDI.oracleNum == (FDI.oracleInputDelay.length+1)) {
            FDI.status = "Finalized";
        }
        else {
            FDI.status = "Reporting";
        }
        FDI.oracleInputDelay.push(IDInputDelayInfo.inputDelayInfo);
        ret = writeToDbFDIPointer(FDI);
    }
    return ret;
}

function createNewFDI(fdi) {
    var otherFDI;

    otherFDI = findFDI(fdi.id);
    if (!isEmpty(otherFDI)) {
        return "FAILURE: ID already exists";
    }

    db.get('fdi').push(fdi).write();

    return "SUCCESS: New Flight Delay Insurance was created !";
}

 app.get('/find_FDI/:id', function (req, res) {
    var msg;
    var FDI;
    var id;

    msg = "FAILURE: FDI is not avaiable !";
    if (!isEmpty(req.params.id)) {
        id = req.params.id;
        FDI = findFDI(id); 
        if (!isEmpty(FDI)) {
            msg = "SUCCESS: FDI was loaded ! ";
            res.send(FDI);
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

app.get('/buy_FDI/:id/:account/:amount', function (req, res) {
    var msg;
    var id,account,amount;
    var FDI;

    msg = "FAILURE: FDI is not avaiable !";
    if (!isEmpty(req.params.id)) {
        id = req.params.id;
        account = req.params.account;
        amount = Number(req.params.amount);
        FDI = findFDI(id);
        if (!isEmpty(FDI)) {
            if (FDI.status == "Open") {
                if (FDI.coverageNum > 0) {
                    if (buyFDI(id,account,amount)) { 
                        msg = "SUCCESS: Coverage was sold to " + account;
                        res.send(msg);
                    }
                    else {
                        msg = "FAILURE: Error processing buyFDI !";
                        res.send(msg);
                    }
                }
                else {
                    msg = "FAILURE: There is no coverage available to buy !";
                    res.send(msg);
                }
            }
            else {
                msg = "FAILURE: This is flight is not available to coverage purchases !";
                res.send(msg);
            }
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

app.use(myParser.urlencoded({extended : true}));
app.use(myParser.json());

// Config information
var configDataFoundconfigData = {   id: 1, 
                                    Network: "Rinkeby",
                                    contractAddress: contractAddress ,
                                    oracleNum: 3,
                                    valuePerMinute: 0.1,
                                    maxMinutes: 120,
                                    premiumFee: 1
                                    } ;

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
        configDataFound.oracleNum = configDataParam.oracleNum;
        configDataFound.valuePerMinute = configDataParam.valuePerMinute;
        configDataFound.maxMinutes = configDataParam.maxMinutes;
        configDataFound.premiumFee = configDataParam.premiumFee;
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

// Check login and password
app.post('/createuser', function (req, res) {
    var msg;
    
    user = req.body;
    
    if (createUser(user)) {
        msg = "SUCCESS: User - "+user.userId+ ", type - " + user.type + ", created !";
        res.send(msg);
    }
    else {
        msg = "FAILURE: User - "+user.userId+ " WAS NOT created !!!";
        res.send(msg);
    }
    console.log(msg);   
});

app.post('/login_user', function (req, res) {
    var msg;
    var user;

    msg = "FAILURE: login could not be completed !!!";
    user = req.body;
    if (!isEmpty(user)) {

        if (checkUserLogin(user.userId,user.password)) {
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

    msg = "FAILURE: login could not be completed !!!";
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

app.post('/update_user_metamask', function (req, res) {
    var msg;
    var user,tmpUser;

    msg = "FAILURE: update MetaMask account could not be completed !!!";
    user = req.body;
    if (!isEmpty(user)) {

        tmpUser = findUser(user.userId.toUpperCase());
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

app.post('/get_view_param_fdi', function (req, res) {
    var msg;
    var viewParam

    var fdiList;

    viewParam = req.body;
    fdiList = getViewParamFDI(viewParam);
    if (isEmpty(fdiList)) {
        msg = "FAILURE: no flight delay insurance is avaiable !";
        res.send(msg);
    }
    else {
        msg = "SUCCESS: All flight delay insurance are loaded ! ";
        res.send(fdiList);
    }

    console.log(msg);   
}); 

app.post('/input_delay', function (req, res) {
    var msg;
    var IDInputDelayInfo

    IDInputDelayInfo = req.body;
    if (createOracleInputDelay(IDInputDelayInfo)) {
        msg = "SUCCESS: Oracle input fligh delay updated!";
        res.send(msg);
    } 
    else {
        msg = "FAILURE: Oracle input flight delay failed !!!";
        res.send(msg);
    }

    console.log(msg);   
}); 

app.post('/create_new_fdi', function (req, res) {
    var msg;
    var fdi;

    fdi = req.body;
    msg = createNewFDI(fdi)
    res.send(msg);
    console.log(msg);   
}); 

app.listen(port,function () { 
    console.log('Flight Delay Insurance http server is ready at ' + String(port))
});

