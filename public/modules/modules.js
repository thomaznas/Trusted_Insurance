var contractAddress = "0x4a20394dbf7835acbc2d283f4d46c1cab65f4240";

var configData = { id: 1, network: "Rinkeby",
                   contractAddress: contractAddress,
                   oracleNum: 3,
                   valuePerMinute: 0.1,
                   maxMinutes: 120,
                   premiumFee: 1
                 } ;

var firstTimeAccountChanged = true;

var ui = {};

ui.navigation = `
<!-- ------------- YOUR CODE: Navigation UI ------------- --> 
<a class="navbar-brand" href="#" onclick="defaultModule();" >
  <img src="/fdi_icon.png" width="50" height="50" class="d-inline-block align-center" alt=""  >
   Flight Delay Insurance</a>
<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
 <span class="navbar-toggler-icon"></span>
</button>

<div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">

    <li class="nav-item active">
    </li>
    <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Passenger
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <a class="dropdown-item" href="#" onclick="loadViewFDIParam('',['Open'],'','loadBuyFDIClickParam')" id="navViewFDI">Buy an Insurance</a>
        </div>
    </li>
   
    <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Insurer
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <a class="dropdown-item" href="#" onclick="loadCreateFDIParam()" id="navNewFDI">New Flight Delay Insurance </a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#" onclick="loadViewFDIParam('',[],'<CurrentUser>','loadFDIClickParam')" id="navViewFDI">My Flight Delay Insurance</a>
        </div>
    </li>

    <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Trusted ORACLES
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <a class="dropdown-item" href="#" onclick="loadViewFDIParam('',['Open' , 'Reporting'],'','loadInputDelayClickParam')" id="navViewFDIInputDelay">Input Flight Delay Info </a>
        </div>
    </li>

    <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Login / Logout
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <a class="dropdown-item" href="#" onclick="loadLoginParam()">Login</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#" onclick="loadLogoutParam()" id="navLogout">Logout</a>
        </div>
    </li>

    <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Administration
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <a class="dropdown-item" href="#"  onclick="loadViewFDIParam('',[],'','loadFDIClickParam')" id="navViewFDI">All Flight Delay Insurance - FDI </a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#" onclick="loadCreateUserParam()">Create a New User</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#" onclick="loadUpdateMMAccParam()">Update an Account</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#" onclick="loadConfigParam()">Config</a>
        </div>
    </li>

    </ul>
    <form class="form-inline my-2 my-lg-0">
            <b id="contractInfo"> SC - ERROR </b>
            <input type="checkbox" name="syncMetaMask" id="syncMetaMask" value="" checked="checked">Sync MetaMask ? -  
            <b id="loggedin"> ? </b>
    </form>
</div>

`;

function openTab(evt, tabName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

ui.tabCode = `
    <!-- Tab links -->
    <div class="tab">
    <button class="tablinks" onclick="openTab(event, 'generalTab')" id="defaultOpen" >General Info</button>
    <button class="tablinks" onclick="openTab(event, 'coverageTab')">Coverages</button>
    <button class="tablinks" onclick="openTab(event, 'oracleTab')">ORACLE</button>
    <button class="tablinks" onclick="openTab(event, 'configTab')">Config</button>
    </div>

    <!-- Tab content -->
    <div id="generalTab" class="tabcontent">
        <-GT->
    </div>

    <div id="coverageTab" class="tabcontent">
        <-CT->
    </div>

    <div id="oracleTab" class="tabcontent">
        <-OT->
    </div>

    <div id="configTab" class="tabcontent">
        <-FT->
    </div>
`; 


ui.default = `
    <!-- ------------- YOUR CODE: Default UI -------------  --> 
    <div class="card bg-light mb-3" style="max-width: 35rem;" >
        <div class="card-header">Flight Insurance Delay Home </div>
        <div class="card-body">
          <h5 class="card-title">Welcome ! Enjoy your hassle free coverage</h5>
          <img src="/fdi.png" width="500" height="400" class="d-inline-block align-center" alt="">
        </div>
    </div>
`; 

ui.login = `
    <div class="card bg-light mb-3" style="max-width: 15rem;"  >
        <div class="card-header">Login </div>
        <div class="card-body" id="loginBody">
                User ID: <br> <input type="input" id="loginUserId" value="" >  <br>
                Password: <br> <input type="password" id="loginPassword" value="" >  <br><br>
                <button type="button" class="btn btn-info" onclick="loginClick()">Log in</button>
        </div>        
    </div>    
`;

ui.Config = `
    <div class="card bg-light mb-3" style="max-width: 35rem;"  >
        <div class="card-header" id="configTitle"> App Configuration </div>
            <div class="card-body" id="configBody">
                Ethereum Net - optional-: <br> <input type="input" id="configNet" placeholder="" value="<-NET->"size=40>  <br>
                Smart Contract Address: <br> <input type="input" id="configSCAddr" placeholder="" value="<-ADDR->" size=60>  <br>
                <br>
                Premium fee: <br> <input type="input" id="configPremiumFee" placeholder="" value="<-PR_FE->"size=40>  <br>
                Number of Oracles: <br> <input type="input" id="configNumOra" placeholder="" value="<-NU_OR->" size=60>  <br>
                Value per Minute Delayed: <br> <input type="input" id="configVaMinDelay" placeholder="" value="<-VA_MI_DE->" size=60>  <br>
                Max Delay Minutes: <br> <input type="input" id="configMaxDeMin" placeholder="" value="<-MA_DE_MI->" size=60>  <br>
                <br>
                <button type="button" class="btn btn-info" onclick="loadConfig()">Update Configuration</button>
        </div>        
    </div>    
`;

ui.CreateUser = `
    <div class="card bg-light mb-3" style="max-width: 35rem;"  >
        <div class="card-header" id="createUserTitle"> Create a New User </div>
            <div class="card-body" id="createUserBody">
                Name: <br> <input type="input" id="createUserId" placeholder="" size=40>  <br>
                MetaMask Account: <br> <input type="input" id="createUserMMAcount" placeholder="" value="<-MM->" size=60>  <br>
                Password: <br> <input type="password" id="createUserPassword" placeholder="" >  <br>
                Re-type your Password: <br> <input type="password" id="createUserPassword2" placeholder="" >  <br>
                User type: <br> 
                <input type="radio" name="createUserType" id="createUserTypePassenger" value="P" checked="checked">Passenger 
                <input type="radio" name="createUserType" id="createUserTypeInsurer" value="I" >Insurer 
                <input type="radio" name="createUserType" id="createUserTypeOracle" value="O" >Trusted Oracle 
                <br><br>
                <button type="button" class="btn btn-info" onclick="loadCreateUser()">Create User</button>
        </div>        
    </div>    

`;

ui.UpdateMMAccount = `
    <div class="card bg-light mb-3" style="max-width: 35rem;"  >
        <div class="card-header" id="updateMMAccTitle"> Update_MMAcc </div>
            <div class="card-body" id="updateMMAccBody">
                Name: <br> <input type="input" id="updateUserId" placeholder="" value="<-MMuserId->" size=40>  <br>
                MetaMask Account: <br> <input type="input" id="updateMMAcount" placeholder="" value="<-MM->" size=60>  <br>
                Password: <br> <input type="password" id="updatePassword" placeholder="" >  <br>
                <br><br>
                <button type="button" class="btn btn-info" onclick="loadUpdateMMAcc()">Update MetaMask Account</button>
        </div>        
    </div>    

`;

ui.buyFDIParam = `
    <div class="card-body" id="buyFDIParam">
        <br>
        <b>DO YOU WANT TO BUY THIS COVERAGE ? : </b>  
        <br>
        <br> Cost: <-FDICost-> 
        <button type="button" class="btn btn-info" onclick="buyFDIClick()">Confirm</button>
    </div>        
`;

ui.inputDelayParam = `
    <div class="card-body" id="inputDelayParam">
        <br>
        <b>IS THIS FLIGHT DELAYED: </b> 
            <input type="radio" name="optDelayed" id="optDelayedYes" value="Yes">Yes
            <input type="radio" name="optDelayed" id="optDelayedNo" value="No" checked="checked">NO 
        <br>
        <br> 
        <b>IF DELAYED, HOW LONG? </b>  
        <br> <input type="input" id="inputDelayValue" value="0" > <b>  minutes
        <br>
        <br>
        <button type="button" class="btn btn-info" onclick="inputDelayClick()">Confirm</button>
    </div>        
`;

ui.createNewFDI = `
    <div class="card bg-light mb-3" style="max-width: 80rem;"  >
        <div class="card-header">New Flight Delay Insurance </div>
        <div class="card-body" id="createNewFDI">
            <b>ID: - </b>  
            <input type="input" id="newFDIID" size=40 value="" > 
            <br> <br> 
            <b>STATUS: - </b> <tr> Open 
            <br><br> 
            <b>TOTAL COMPENSATION: - </b>  
            <input type="input" id="newFDIFunds" size=20 value="0.0" > 
            <br><br> 
            <b>MAXIMUM NUMBER OF COVERAGES: - </b>  
            <input type="input" id="newFDICoverageNum" size=20 value="0" > >   
            <br><br>
            <button type="button" class="btn btn-info" onclick="createNewFDIClick()">Create</button>
        </div>        
    </div>    
`;

var target     = document.getElementById('target');
var navigation = document.getElementById('navigation');
var loggedin;
var contractInfo;
var activeNavButton;
var lastRetMsg;
var lastRetObj;
var currentUser = null;
var currentFDI = null;
var lastViewParam = null;
var updateMMAccUserType = "";

navigation.innerHTML += ui.navigation;

var defaultModule = function(){
    target.innerHTML = ui.default;
    activeNavButton = navigation;
};

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

function retDefaultStr(str, defStr) {
    if (str == "") {
        return defStr;
    }
    return str;
}

function putAnchor(str,funcAnchor,param) {
    var ret = "<a href=\"#\" onclick=\"" + funcAnchor + "("+param+");\">"+str+"</a>" ;
    return ret;
}

function allFDITablify(FDIs) {
    var len;
    var html = "";
    
    if (!isEmpty(FDIs)) {
        len = FDIs.length;
        for (var i=0; i < len; i++) {
            html += '<br>' + putAnchor(retDefaultStr(FDIs[i].id,"NO TITLE"),lastViewParam.detailFunctionName,"\'"+FDIs[i].id+"\'") 
               + ' - ' + FDIs[i].status + ' - ' + FDIs[i].coverageNum;
        }
    }
    return html;
}

function oneFDITablify(FDI) {
    var len;
    var html = "";
    var param;
    var htmlGT,htmlCT,htmlOT,htmlFT;
    
    if (!isEmpty(FDI)) {
        if (lastViewParam.id != '') {
            param = "\'" + lastViewParam.id + "\',";
        }
        else {
            param = "\'\',"
        }
        param += "[";
        var len = lastViewParam.statusList.length;
        for (i=0;i<len;i++) {
            param += "\'" + lastViewParam.statusList[i] + "\'";
            if (i<(len-1)) {
                param += " , ";
            }
        }
        param += "],";
        param += "\'\',";
        param += "\'" + lastViewParam.detailFunctionName + "\'";
        
        html += putAnchor("Back","loadViewFDIParam",param);

        html += '<br><br>';

        html += ui.tabCode;

        htmlGT = '<b>Flight Delay Insurance - FDI - Details<b>';

        htmlGT += '<br><br>';

        htmlGT += '<b>ID:</b>' + ' - ' + FDI.id;

        htmlGT += '<br>';

        htmlGT += '' + '<b> STATUS:</b>' + ' - ' + FDI.status;

        htmlGT += '<br>';

        htmlGT += '' + '<b> AVAILABLE COVERAGES:</b>' + ' - ' + FDI.coverageNum;

        htmlGT += '<br><br>';

        htmlCT = '<br>';

        htmlCT += JSON.stringify(FDI.coverages);

        htmlCT += '<br><br>';

        htmlOT = '<br>';

        htmlOT += JSON.stringify(FDI.oracleInputDelay);

        htmlOT += '<br><br>';

        htmlFT = '<b>Flight Delay Insurance - FDI - Config Data<b>';

        htmlFT += '<br><br>';

        htmlFT += '<b>oracleNum: </b>' + FDI.oracleNum;

        htmlFT += '<br>';

        htmlFT += '' + '<b> valuePerMinute:</b>' +  FDI.valuePerMinute;

        htmlFT += '<br>';

        htmlFT += '' + '<b> maxMinutes:</b>' + FDI.maxMinutes;

        htmlFT += '<br>';

        htmlFT += '' + '<b> premiumFee:</b>' + FDI.premiumFee;
        
        htmlFT += '<br><br>';
    }

    html = html.replace("<-GT->",htmlGT);
    html = html.replace("<-CT->",htmlCT);
    html = html.replace("<-OT->",htmlOT);
    html = html.replace("<-FT->",htmlFT);

    return html;
}

var setActiveNavBar = function(id){
    // set active marker
    activeNavButton.classList.remove("active");
    activeNavButton = document.getElementById(id);
    activeNavButton.classList.add("active");
}

var loadViewFDIParam = function(id,statusList,insurer,detailFunctionName){

    loadViewFDIParamInternal(id,statusList,insurer,detailFunctionName);
}

var loadViewFDIParamInternal = function(id,statusList,insurer,detailFunctionName) {
    var viewParam = { "id": '',  "statusList": [] ,"insurer": '',  "detailFunctionName": '' };

    viewParam.id = id;
    viewParam.statusList = statusList;
    if (insurer == '<CurrentUser>') {
        viewParam.insurer = currentUser.userId;
    }
    if (detailFunctionName == '') {
        detailFunctionName = 'loadFDIClickParam';
    }
    viewParam.detailFunctionName = detailFunctionName;
    lastViewParam = viewParam;
    loadViewFDIAPI(viewParam);
};

var loadViewFDI = function(){
    var FDIids;

    if (lastRetMsg.includes('FAILURE')) {
        target.innerHTML = lastRetMsg;
    } 
    else {
        FDIids = lastRetObj;
        target.innerHTML = allFDITablify(FDIids);
    }
};

var loadFDIClickParam = function(id) {

    loadFDIAPI(id,loadFDIClick);    
}

var loadFDIClick = function(){
    var FDI;
    var html;

    if (lastRetMsg.includes('FAILURE')) {
        target.innerHTML = lastRetMsg;
    } 
    else {
        FDI = lastRetObj;
        html = oneFDITablify(FDI);
        target.innerHTML = html;
        document.getElementById("defaultOpen").click();
    }
};

var loadConfigParam = function(){
    var html = ui.Config;
    
    html = html.replace("<-NET->",configData.network);
    html = html.replace("<-ADDR->",configData.contractAddress);
    html = html.replace("<-PR_FE->",configData.premiumFee);
    html = html.replace("<-NU_OR->",configData.oracleNum);
    html = html.replace("<-VA_MI_DE->",configData.valuePerMinute);
    html = html.replace("<-MA_DE_MI->",configData.maxMinutes);

    target.innerHTML = html;
}

async function loadConfig() {
    var configParam = { id: 1, network: "Rinkeby",
                        contractAddress: contractAddress,
                        oracleNum: 3,
                        valuePerMinute: 0.1,
                        maxMinutes: 120,
                        premiumFee: 1 } ;

    configParam.network = document.getElementById('configNet').value;
    configParam.contractAddress = document.getElementById('configSCAddr').value;

    if (isNaN(document.getElementById('configNumOra').value)) {
        alert("Number of Oracles needs to be a valid number !");
        return;
    }
    configParam.oracleNum = Number(document.getElementById('configNumOra').value);

    if (isNaN(document.getElementById('configVaMinDelay').value)) {
        alert("Value per minute delayed needs to be a valid number !");
        return;
    }
    configParam.valuePerMinute = Number(document.getElementById('configVaMinDelay').value);

    if (isNaN(document.getElementById('configMaxDeMin').value)) {
        alert("Maximum Delayed Minutes delayed needs to be a valid number !");
        return;
    }
    configParam.maxMinutes = Number(document.getElementById('configMaxDeMin').value);

    if (isNaN(document.getElementById('configPremiumFee').value)) {
        alert("Premium fee needs to be a valid number !");
        return;
    }
    configParam.premiumFee = Number(document.getElementById('configPremiumFee').value);

    if (configParam.contractAddress == "")  {
        alert("Required parameters can not be blank !");
        return;
    }

    var msg = await setConfigContractAPI(configParam);
    if (!msg.includes("SUCCESS")) {
        target.innerHTML = "FAILURE: Transaction did not complete ! - " + msg;
        return;
    }

    setConfigDataAPI(configParam,loadConfigProcess);
}

var loadConfigProcess = function() {
    var msgRetArea = document.getElementById('configBody');

    if (lastRetMsg.includes('FAILURE')) {
        msgRetArea.innerHTML = lastRetMsg;
    } 
    else {
        configData = lastRetObj;
        msgRetArea.innerHTML = "SUCCESS: ConfigData was update successfully ! ";
        setupWeb3(configData,callbackFunctionAccountChanged,callbackProcessSetWeb3,false);
    }
}

function callbackSetupWeb3API() {

    if (!lastRetMsg.includes('FAILURE')) {
        configData = lastRetObj;
        setupWeb3(configData,callbackFunctionAccountChanged,callbackProcessSetWeb3,true);
    } 
}

var callbackFunctionAccountChanged = function(newAccount) {
    var syncAccount = document.getElementById('syncMetaMask').checked;

    if (syncAccount) {
        loginMetaMaskChanged(newAccount);
    }
 }

function callbackProcessSetWeb3(msg) {
    contractInfo.innerHTML = "Contract - " + msg + " - ";    
}

function callbackSetupConfigData() {

    if (!lastRetMsg.includes('FAILURE')) {
        configData = lastRetObj;
    } 
}

function getConfigData(callbackfunction) {
    getConfigDataAPI(callbackfunction);
}

// LOGIN
var loadLoginParam = function() {

    target.innerHTML = ui.login;

}

function setLoggedUser(user) {
    var ret = false;
    var str = "?";

    if (!isEmpty(user)) {
        switch (user.type) {
            case 'P' :
                str = 'PASSENGER - ';
                break;
            case 'I' :
                str = 'INSURER - ';
                break;
            case 'O' :
                str = 'ORACLE - ';
                break;
            default:
                str = '';
        }
        str += user.userId;
        loggedin.innerHTML = str;    
        ret = true;
    }
    else {
        loggedin.innerHTML = "?";    
    }
    return ret;
}

var loginClick = function(){
    var user = { 
        userId      : '',
        password    : '',
        MMAccount   : '',
        type        : ''   // 'P' -> Passenger , 'I' -> Insurer , 'O' -> Oracle 
    };       

    user.userId = document.getElementById('loginUserId').value;
    user.userId = user.userId.toUpperCase();
    user.password = document.getElementById('loginPassword').value;

    loadLoginAPI(user);
}

var loadLogin = function() {

    if (lastRetMsg.includes('FAILURE')) {
        target.innerHTML = lastRetMsg;
        currentUser = null;
        setLoggedUser(currentUser);
    } 
    else {
        target.innerHTML = "User logged in !";
        currentUser = lastRetObj;
        setLoggedUser(currentUser);
    }
}

var loadLogoutParam = function() {

    if (isEmpty(currentUser)) {
        alert("You must be logged in to perform this operation !");
        return;
    }
    lastRetMsg = "SUCCESS: " + currentUser.userId + " is logged out";
    lastRetObj = null;
    currentUser = null
    target.innerHTML = lastRetMsg;
    loggedin.innerHTML = "-"

}

var loginMetaMaskChanged = function(newMMAccount){
    var user = { 
        userId      : '',
        password    : '',
        MMAccount   : '',
        type        : ''   // 'P' -> Passenger , 'I' -> Insurer , 'O' -> Oracle 
    };       

    user.MMAccount = newMMAccount;

    loadLoginMetaMaskAPI(user);
}

var loadLoginMetaMask = function() {

    if (lastRetMsg.includes('FAILURE')) {
        target.innerHTML = lastRetMsg;
        currentUser = null;
        setLoggedUser(currentUser);
    } 
    else {
        target.innerHTML = "User logged in !";
        currentUser = lastRetObj;
        setLoggedUser(currentUser);
    }
    if (firstTimeAccountChanged) {
        firstTimeAccountChanged = false;
        defaultModule();
    }
}

// CreateUser
var loadCreateUserParam = function(){
    var html = ui.CreateUser;

    html = html.replace("<-MM->",currentMAAccount);
    target.innerHTML = html;
}

var loadCreateUser = function() {
    var user = { 
        userId      : '',
        password    : '',
        MMAccount   : '',
        type        : ''   // 'P' -> Passenger , 'I' -> Insurer , 'O' -> Oracle 
    };       

    user.userId = document.getElementById('createUserId').value;
    user.password = document.getElementById('createUserPassword').value;
    var passwordReType = document.getElementById('createUserPassword2').value;
    user.MMAccount = document.getElementById('createUserMMAcount').value;
    if (document.getElementById('createUserTypePassenger').checked) {
        user.type = document.getElementById('createUserTypePassenger').value;
    }
    else if (document.getElementById('createUserTypeInsurer').checked) {
        user.type = document.getElementById('createUserTypeInsurer').value;
    }
    else if (document.getElementById('createUserTypeOracle').checked) {
        user.type = document.getElementById('createUserTypeOracle').value;
    }

    if ((user.userId == "") || (user.password == "") || (passwordReType == "")) {
        alert("Required parameters can not be blank !");
        return;
    }
    
    if ((user.type == "")) {
        alert("Select a user type !");
        return;
    }
    
    if ((user.password != passwordReType)) {
        alert("Passwords do NOT match !");
        return;
    }
    
    user.userId = user.userId.toUpperCase();

    loadCreateUserAPI(user);
}

var loadCreateUserProcess = function() {
    var msgRetArea = document.getElementById('createUserBody');

    if (lastRetMsg.includes('FAILURE')) {
        msgRetArea.innerHTML = lastRetMsg;
    } 
    else {
        msgRetArea.innerHTML = lastRetMsg;
    }
}

var loadUpdateMMAccParam = function(userType){
    var html = ui.UpdateMMAccount;

    if (!isEmpty(currentUser)) {
        html = html.replace("<-MMuserId->",currentUser.userId);
    }
    else {
        html = html.replace("<-MMuserId->","");
    }
    html = html.replace("<-MM->",currentMAAccount);
    target.innerHTML = html;
}

var loadUpdateMMAcc = function() {
    var user = { 
        userId      : '',
        password    : '',
        MMAccount   : '',
        type        : ''   // 'P' -> Passenger , 'I' -> Insurer , 'O' -> Oracle 
    };       

    var userId = document.getElementById('updateUserId').value;
    var password = document.getElementById('updatePassword').value;
    var newMMAccount = document.getElementById('updateMMAcount').value;

    if ((userId == "") || (password == "") || (newMMAccount == "")) {
        alert("Required parameters can not be blank !");
        return;
    }
    
    user.userId = userId.toUpperCase();
    user.password = password;
    user.MMAccount = newMMAccount;
    user.type = ''; // user type is not updated

    loadUpdateMMAccAPI(user);
}

var loadUpdateMMAccProcess = function() {
    var msgRetArea = document.getElementById('updateMMAccBody');

    if (lastRetMsg.includes('FAILURE')) {
        msgRetArea.innerHTML = lastRetMsg;
    } 
    else {
        msgRetArea.innerHTML = lastRetMsg;
    }
}

var loadBuyFDIClickParam = function(id) { 

    if (currentUser.type != 'P') {
        target.innerHTML = "FAILURE: function restricted to PASSENGERS !!!";
        return;
    }
    loadFDIAPI(id,loadBuyFDIClick);    
}

var loadBuyFDIClick = function(){
    var FDI;
    var html;

    if (lastRetMsg.includes('FAILURE')) {
        target.innerHTML = lastRetMsg;
    } 
    else {
        FDI = lastRetObj;
        html = oneFDITablify(FDI);
        html += ui.buyFDIParam;
        html = html.replace("<-FDICost->",toMoney(FDI.premiumFee));
        target.innerHTML = html;
        document.getElementById("defaultOpen").click();
    }
};

 
async function buyFDIClick() {
    var amount;
    

    FDI = lastRetObj;
    if (!isEmpty(FDI)) {
        amount = FDI.premiumFee;
    }
    else {
        amount = 1;
    }

    if (isNaN(amount)) {
        alert("Amount needs to be a valid number !");
        return;
    }
    
    if (amount <=0) {
        alert("Amount needs to be greater than zero !");
        return;
    }

    var msg = await buyFDIContractAPI(currentFDI.id,amount);
    if (!msg.includes("SUCCESS")) {
        target.innerHTML = "FAILURE: Transaction did not complete ! - " + msg;
        return;
    }

   buyFDIAPI(currentFDI.id,currentMAAccount,amount);
}

var buyFDIProcess = function() {
    var msgRetArea = document.getElementById('buyFDIParam');

    if (lastRetMsg.includes('FAILURE')) {
        msgRetArea.innerHTML = lastRetMsg;
    } 
    else {
        msgRetArea.innerHTML = lastRetMsg;
    }
}

var loadInputDelayClickParam = function(id) {

    if (currentUser.type != 'O') {
        target.innerHTML = "FAILURE: function restricted to ORACLES !!!";
        return;
    }

    loadFDIAPI(id,loadInputDelayClick);    
}

var loadInputDelayClick = function(){
    var FDI;
    var html;

    if (lastRetMsg.includes('FAILURE')) {
        target.innerHTML = lastRetMsg;
    } 
    else {
        FDI = lastRetObj;
        html = oneFDITablify(FDI);
        html += ui.inputDelayParam;
        target.innerHTML = html;
        document.getElementById("defaultOpen").click();
    }
};
 
async function inputDelayClick() {
    var amount = Number(document.getElementById('inputDelayValue').value);
    var optDelayedYes = document.getElementById('optDelayedYes'); 
    var optDelayed

    if (optDelayedYes.checked) {
        optDelayed = true
    }
    else {
        optDelayed = false
    }
    if (optDelayed) {
        if (isNaN(amount)) {
            alert("Delay info must be a valid number !");
            return;
        }
        
        if (amount <= 0) {
            alert("Delay info cannot be less than or equal to zero !");
            return;
        }
        
    }
    else {
        amount = 0
    }

    var inputDelayInfo = {
        oracleName  : '', 
        isDelayed   : false,
        delayValue  : 0
    };

    inputDelayInfo.oracleName = currentUser.userId;
    inputDelayInfo.isDelayed = optDelayed;
    inputDelayInfo.delayValue = amount;

    var IDInputDelayInfo = {
        id  : '', 
        inputDelayInfo : null
    }

    IDInputDelayInfo.id = currentFDI.id
    IDInputDelayInfo.inputDelayInfo = inputDelayInfo

    var msg = await inputDelayContractAPI(IDInputDelayInfo);
    if (!msg.includes("SUCCESS")) {
        target.innerHTML = "FAILURE: Transaction did not complete ! - " + msg;
        return;
    }

    inputDelayAPI(IDInputDelayInfo);
}

var inputDelayProcess = function() {
    var msgRetArea = document.getElementById('inputDelayParam');

    if (lastRetMsg.includes('FAILURE')) {
        msgRetArea.innerHTML = lastRetMsg;
    } 
    else {
        msgRetArea.innerHTML = lastRetMsg;
    }
}

var loadCreateFDIParam = function() {
    if (isEmpty(currentUser))  {
        target.innerHTML = "FAILURE: No user logged in ...";
        return;
    }

    if (currentUser.type != 'I') {
        target.innerHTML = "FAILURE: function restricted to INSURERS !!!";
        return;
    }

    target.innerHTML = ui.createNewFDI;
}

async function createNewFDIClick() {
    
    var fdi =  {
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
                };          

    if ( isEmpty(currentUser)) {
        target.innerHTML = "FAILURE: No user logged in ...";
        return;
    }

    var funds = document.getElementById('newFDIFunds').value;
    if (isNaN(funds)) {
        alert("Total Compensation needs to be a valid number !");
        return;
    }
    
    if (funds <=0) {
        alert("Total Compensation needs to be greater than zero !");
        return;
    }

    var coverageNum = document.getElementById('newFDICoverageNum').value;
    if (isNaN(coverageNum)) {
        alert("Number of coverages needs to be a valid number !");
        return;
    }
    
    if (coverageNum <=0) {
        alert("Number of coverages needs to be greater than zero !");
        return;
    }

    var id = document.getElementById('newFDIID').value;
    if (id == "") {
        alert("ID cannot be null !");
        return;
    }
                    
    fdi.id = id;
    fdi.status = "Open";
    fdi.funds = funds;
    fdi.coverageNum = coverageNum;
    fdi.oracleNum = configData.oracleNum;
    fdi.valuePerMinute = configData.valuePerMinute;
    fdi.maxMinutes = configData.maxMinutes;
    fdi.premiumFee = configData.premiumFee;
    fdi.insurer = currentUser.userId;

    let msg = await createNewFDIContractAPI(fdi);
    if (!msg.includes("SUCCESS")) {
        target.innerHTML = "FAILURE: New flight delay insurance was not created ..." + msg;
        return;
    }

    loadCreateNewFDIAPI(fdi);
   
}

var newFDIProcess = function() {
    var msgRetArea = document.getElementById('createNewFDI');

    if (lastRetMsg.includes('FAILURE')) {
        msgRetArea.innerHTML = lastRetMsg;
    } 
    else {
        msgRetArea.innerHTML = lastRetMsg;
    }
}

loggedin = document.getElementById('loggedin');
contractInfo = document.getElementById('contractInfo');

getConfigData(callbackSetupWeb3API); 

defaultModule();

console.log('Finished');


