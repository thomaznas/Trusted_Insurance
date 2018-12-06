var contractAddress = "0x8301e49bf9746b1f20bd0520f980d14ded9eb1e9";

var configData = { id: 1, network: "Rinkeby",
                   contractAddress: contractAddress } ;

var ui = {};

ui.navigation = `
<!-- ------------- YOUR CODE: Navigation UI ------------- --> 
<a class="navbar-brand" href="#" onclick="defaultModule();" >
  <img src="/factualnews_icon.png" width="50" height="50" class="d-inline-block align-center" alt=""  >
   Factual News</a>
<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
 <span class="navbar-toggler-icon"></span>
</button>

<div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
        <a class="nav-link" href="#" onclick="loadViewFactualNewsParamOpened('','',['Approved'],'loadNewsClickParam')" id="navViewApprovedFactualNews">Factual News </a>
        </li>

        <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Requesters
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <a class="dropdown-item" href="#" onclick="loadLoginParam('O')">Login</a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#" onclick="loadViewFactualNewsParam('Current','O','','loadNewsClickParam')">View my News Review Requests</a>
                <a class="dropdown-item" href="#" onclick="loadCreateNewNewsParam()">Create News Review Requests</a>
                <a class="dropdown-item" href="#" onclick="loadViewFactualNewsParam('','O',['Blank' , 'Requested'],'loadAddFundsNewsClickParam')">Add Funds to a News Review Request</a>
                <a class="dropdown-item" href="#" onclick="loadViewFactualNewsParam('Current','O',['Approve Reviewer'],'loadApproveRevAudClickParam')">Approve Reviewer and Auditors </a>
            </div>
        </li>
        <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Reviewers
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <a class="dropdown-item" href="#" onclick="loadLoginParam('R')">Login</a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#" onclick="loadViewFactualNewsParam('Current','R','','loadNewsClickParam')">View my News Review Requests</a>
                <a class="dropdown-item" href="#" onclick="loadViewFactualNewsParam('','R',['Requested'],'loadApplyForReviewClickParam')">Apply for a Review</a>
                <a class="dropdown-item" href="#" onclick="loadViewFactualNewsParam('Current','R',['Reviewing'],'loadCompleteReviewClickParam')">Complete a Review</a>
            </div>
        </li>
        <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Auditors
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <a class="dropdown-item" href="#" onclick="loadLoginParam('A')">Login</a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#" onclick="loadViewFactualNewsParam('Current','A','','loadNewsClickParam')">View my News Review Requests</a>
                <a class="dropdown-item" href="#" onclick="loadViewFactualNewsParam('','A',['Requested' , 'Approve Reviewer'],'loadApplyForAuditClickParam')">Apply for a Audit</a>
                <a class="dropdown-item" href="#" onclick="loadViewFactualNewsParam('Current','A',['Auditing'],'loadApproveDenyReviewClickParam')">Approve or Deny a Review</a>
            </div>
        </li>
        <li class="nav-item active">
        <a class="nav-link" href="#" onclick="loadLogoutParam()" id="navLogout">Logout</a>
        </li>
        <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Join us !
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <a class="dropdown-item" href="#" onclick="loadJoinUsParam('O')">Join us As Requester</a>
                <a class="dropdown-item" href="#" onclick="loadUpdateMMAccParam('O')">Update Requester Account</a>
                <div class="dropdown-divider"></div>

                <a class="dropdown-item" href="#" onclick="loadJoinUsParam('R')">Join us as a Reviewer</a>
                <a class="dropdown-item" href="#" onclick="loadUpdateMMAccParam('R')">Update Reviewer Account</a>
                <div class="dropdown-divider"></div>

                <a class="dropdown-item" href="#" onclick="loadJoinUsParam('A')">Join us as an Auditor</a>
                <a class="dropdown-item" href="#" onclick="loadUpdateMMAccParam('A')">Update Auditor Account</a>
            </div>
        </li>

        <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Adm
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <a class="dropdown-item" href="#" onclick="loadViewFactualNewsParamOpened('','','','loadNewsClickParam')" id="navViewlAllFactualNews">View All Factual News </a>
                <a class="dropdown-item" href="#" onclick="loadConfigParam()">Config</a>
            </div>
        </li>

    </ul>
    <form class="form-inline my-2 my-lg-0">
            <b id="contractInfo"> SC - ERROR </b>
            <input type="checkbox" name="syncMetaMask" id="syncMetaMask" value="">Sync MetaMask ? -  
            <b id="loggedin"> ? </b>
    </form>
</div>

`;

ui.viewFactualNews = `
    <!-- View Factual News --> 

`;

ui.JoinUs = `
    <div class="card bg-light mb-3" style="max-width: 35rem;"  >
        <div class="card-header" id="joinUsTitle"> Join_us </div>
            <div class="card-body" id="joinUsBody">
                Name: <br> <input type="input" id="addEmail" placeholder="" size=40>  <br>
                MetaMask Account: <br> <input type="input" id="addMMAcount" placeholder="" value="<-MM->" size=60>  <br>
                Password: <br> <input type="password" id="addPassword" placeholder="" >  <br>
                Re-type your Password: <br> <input type="password" id="addPassword2" placeholder="" >  
                <br><br>
                <button type="button" class="btn btn-info" onclick="loadJoinUs()">Join us</button>
        </div>        
    </div>    

`;

ui.UpdateMMAccount = `
    <div class="card bg-light mb-3" style="max-width: 35rem;"  >
        <div class="card-header" id="updateMMAccTitle"> Update_MMAcc </div>
            <div class="card-body" id="updateMMAccBody">
                Name: <br> <input type="input" id="updateEmail" placeholder="" value="<-MMemail->" size=40>  <br>
                MetaMask Account: <br> <input type="input" id="updateMMAcount" placeholder="" value="<-MM->" size=60>  <br>
                Password: <br> <input type="password" id="updatePassword" placeholder="" >  <br>
                <br><br>
                <button type="button" class="btn btn-info" onclick="loadUpdateMMAcc()">Update MetaMask Account</button>
        </div>        
    </div>    

`;

ui.Config = `
    <div class="card bg-light mb-3" style="max-width: 35rem;"  >
        <div class="card-header" id="configTitle"> App Configuration </div>
            <div class="card-body" id="configBody">
                Ethereum Net - optional-: <br> <input type="input" id="configNet" placeholder="" value="<-NET->"size=40>  <br>
                Smart Contract Address: <br> <input type="input" id="configSCAddr" placeholder="" value="<-ADDR->" size=60>  <br>
                <br><br>
                <button type="button" class="btn btn-info" onclick="loadConfig()">Update Configuration</button>
        </div>        
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
    <button class="tablinks" onclick="openTab(event, 'bodyRab')">News Body</button>
    <button class="tablinks" onclick="openTab(event, 'reviewTab')">News Review</button>
    </div>

    <!-- Tab content -->
    <div id="generalTab" class="tabcontent">
        <-GI->
    </div>

    <div id="bodyRab" class="tabcontent">
        <-B->
    </div>

    <div id="reviewTab" class="tabcontent">
        <-R->
    </div>
`; 

ui.default = `
    <!-- ------------- YOUR CODE: Default UI -------------  --> 
    <div class="card bg-light mb-3" style="max-width: 35rem;" >
        <div class="card-header">Factual News Home </div>
        <div class="card-body">
          <h5 class="card-title">Welcome ! Stay safe validating your news.</h5>
          <img src="/factualnews.png" width="500" height="400" class="d-inline-block align-center" alt="">
        </div>
    </div>
`; 

ui.login = `
    <div class="card bg-light mb-3" style="max-width: 15rem;"  >
        <div class="card-header">Factual News Login </div>
        <div class="card-body" id="loginBody">
                Email: <br> <input type="input" id="loginEmail" value="originator1" >  <br>
                Password: <br> <input type="password" id="loginPassword" value="o1" >  <br><br>
                <button type="button" class="btn btn-info" onclick="loginClick()">Log in</button>
        </div>        
    </div>    
`;

ui.createNewNews = `
    <div class="card bg-light mb-3" style="max-width: 80rem;"  >
        <div class="card-header">Factual News - New news review request </div>
        <div class="card-body" id="createNewNewsBody">
            <b>ID: - </b>  
            <br> <br> <b>STATUS: - </b> <tr> BlanK 
            <br><br> <b>TITLE: - </b>  
            <br> <input type="input" id="newNewsTitle" size=120 value="" > 
            <br><br> <b>BODY: - </b> 
            <br> <input type="input" id="newNewsBody" size=120 value="" >   
            <br><br>
            <button type="button" class="btn btn-info" onclick="createNewNewsBlankClick()">Create</button>
        </div>        
    </div>    
`
//            <br> <input type="input" id="newNewsId" value="GH25454241FB300" > 
;

ui.newsAddFundsParam = `
    <div class="card-body" id="newsAddFundsParam">
        <br>
        <b>FUNDS TO BE ADDED (ETH): </b>  
        <br> <input type="input" id="addFundsAmount" value="0.01" > <b>  </b> 
        <br>
        <button type="button" class="btn btn-info" onclick="newsAddFundsClick()">Add Funds</button>
    </div>        
`;

ui.applyReviewParam = `
    <div class="card-body" id="applyReviewParam">
        <br>
        <button type="button" class="btn btn-info" onclick="applyReviewClick()">Apply to review this News</button>
    </div>        
`;

ui.applyAuditParam = `
    <div class="card-body" id="applyAuditParam">
        <br>
        <button type="button" class="btn btn-info" onclick="applyAuditClick()">Apply to audit this News</button>
    </div>        
`;

ui.approveRevAudParam = `
    <div class="card-body" id="approveRevAudParam">
        <br>
        <button type="button" class="btn btn-info" onclick="approveRevAudClick()">Approve Reviewer and Auditors for this News</button>
    </div>        
`;

ui.completeReviewParam = `
    <div class="card-body" id="completeReviewParam">
        <br>
        <b>ADD YOUR REVIEW TEXT: </b>  
        <br> <input type="input" id="reviewBody" value="" size=120 > <b>  </b> 
        <br> <br>
        <button type="button" class="btn btn-info" onclick="completeReviewClick()">Complete the review proces for this News</button>
    </div>        
`;

ui.approveDenyParam = `
    <div class="card-body" id="approveDenyParam">
        <br>
        <button type="button" class="btn btn-info" onclick="approveReviewClick()">Approve Review</button> 
        <b> OR </b>  
        <button type="button" class="btn btn-info" onclick="denyReviewClick()">Deny Review</button>
    </div>        
`;

var target     = document.getElementById('target');
var navigation = document.getElementById('navigation');
var loggedin;
var contractInfo;
var activeNavButton;
var lastRetMsg;
var lastRetObj;
var currentLoginType = "";
var currentUser;
var currentNews = null;
var lastViewParam = null;
var joinUsUserType = "";
var updateMMAccUserType = "";

navigation.innerHTML += ui.navigation;

var setActiveNavBar = function(id){
    // set active marker
    activeNavButton.classList.remove("active");
    activeNavButton = document.getElementById(id);
    activeNavButton.classList.add("active");
}

var loadViewFactualNewsParamOpened = function(userName,userType,newsStatus,detailFunctionName){

    if (userName != '') {
        target.innerHTML = "FAILURE: No user logged in ...";
        return;
    }

    loadViewFactualNewsParamInternal(userName,userType,newsStatus,detailFunctionName);
}


var loadViewFactualNewsParam = function(userName,userType,newsStatus,detailFunctionName){

    if ((userType != '') && (isEmpty(currentUser)) ) {
            target.innerHTML = "FAILURE: No user logged in ...";
            return;
    }
    if ((userType != '') && (!isEmpty(currentUser)) ) {
        if (userType != currentUser.type) {
            target.innerHTML = "FAILURE: No user logged in ...";
            return;
        }
    }
    if (userName != '') {
        if (isEmpty(currentUser))  {
            target.innerHTML = "FAILURE: No user logged in ...";
            return;
        }
        userName = currentUser.email;            
    }


    if (userName == '') {
        userType = '';
    }
    
    loadViewFactualNewsParamInternal(userName,userType,newsStatus,detailFunctionName);

}

var loadViewFactualNewsParamInternal = function(userName,userType,newsStatus,detailFunctionName) {
    var viewParam = { "userName": '', "userType": '', "newsStatus": [] , "detailFunctionName": '' };

    if (userName != '') {
        userName = currentUser.email;
    }
    viewParam.userName = userName;
    viewParam.userType = userType;
    if (newsStatus != '')
       viewParam.newsStatus = newsStatus;
    if (detailFunctionName == '') {
        detailFunctionName = 'loadNewsClickParam';
    }
    viewParam.detailFunctionName = detailFunctionName;
    setActiveNavBar("navViewlAllFactualNews");
    lastViewParam = viewParam;
    loadViewFactualNewsAPI(viewParam);
};

var loadViewFactualNews = function(){
    var news;

    if (lastRetMsg.includes('FAILURE')) {
        target.innerHTML = lastRetMsg;
    } 
    else {
        news = lastRetObj;
        target.innerHTML = allNewsTablify(news);
    }
};

var loadCreateNewNewsParam = function() {
    if (isEmpty(currentUser))  {
        target.innerHTML = "FAILURE: No user logged in ...";
        return;
    }
    if (currentUser.type != 'O') {
        target.innerHTML = "FAILURE: No user logged in ...";
        return;
    }

    target.innerHTML = ui.createNewNews;
}

async function createNewNewsBlankClick() {
    var news = {id          : '',
                status      : '', 
                title       : '',
                newsBody    : '',
                newsRev     : '',
                originator  : '',
                reviewer    : '',
                auditors    : [] , 
                funds       : 0  ,
                auditorsApprovalStatus    : [] };
    if ( isEmpty(currentUser)) {
        target.innerHTML = "FAILURE: No user logged in ...";
        return;
    }
            
            
   // news.id = document.getElementById('newNewsId').value;
    news.id = generateId();
    news.status = "Blank";
    news.title = document.getElementById('newNewsTitle').value;
    news.newsBody = document.getElementById('newNewsBody').value;
    news.originator = currentUser.email;
    news.funds = 0;

    let msg = await createRequestFNAPI(news.id);
    if (!msg.includes("SUCCESS")) {
        target.innerHTML = "FAILURE: News request was not created ..." + msg;
        return;
    }

    loadCreateNewNewsAPI(news);
   
}

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

function allNewsTablify(news) {
    var len;
    var html = "";
    
    if (!isEmpty(news)) {
        len = news.length;
        for (var i=0; i < len; i++) {
            html += '<br>' + putAnchor(retDefaultStr(news[i].title,"NO TITLE"),lastViewParam.detailFunctionName,"\'"+news[i].id+"\'") + ' - ' + 
                             retDefaultStr(news[i].originator,"NO TITLE") + ' - ' + news[i].status + ' - ' + toMoney(news[i].funds);
        }
    }
    return html;
}

function showUrlBody(title,body) {
    var html = '';
    var str;

    html +=  '<b>' + title + ':  </b>';
    var str = JSON.stringify(body);
    if (str.includes("http")) {
/*            html +=  `<object data=`;
        html += news.newsBody;
        html +=  ` width=”650″ height=”500″> <embed src=`;
        html += news.newsBody;
        html +=  ` width=”650″ height=”500″> </embed></object>`; */

        html += `<a href="` ;
        html += body;
        html += `" target="_blank">Link</a>`;

        html +=  `
                    <iframe id="` + title + `" width="1200" height="450" frameborder="0" title="description" src="`
        html += body;
        html += `" > </iframe>
                `;               
    }
    else {
        html += body;
    }    
    return html;
}

function oneNewsTablify(news) {
    var len;
    var html = "";
    var htmlGI = "";
    var htmlB = "";
    var htmlR = "";
    var param;
    
    if (!isEmpty(news)) {
        if (lastViewParam.userName != '') {
            param = "\'Current\',";
        }
        else {
            param = "\'\',"
        }
        param += "\'" + lastViewParam.userType + "\',";
        param += "[";
        var len = lastViewParam.newsStatus.length;
        for (i=0;i<len;i++) {
            param += "\'" + lastViewParam.newsStatus[i] + "\'";
            if (i<(len-1)) {
                param += " , ";
            }
        }
        param += "],";
        param += "\'" + lastViewParam.detailFunctionName + "\'";
        
        html += putAnchor("Back","loadViewFactualNewsParam",param);

        html += '<br><br>';
        html += ui.tabCode;

        htmlGI += '<b>ID:</b>' + ' - ' + news.id;

        htmlGI += '' + '<b> STATUS:</b>' + ' - ' + news.status;

        htmlGI += '' + '<b> FUNDS:</b>' + ' - ' + toMoney(news.funds);

        htmlGI += '<br><br>' + '<b>TITLE:</b>' + 
                ' ' + news.title;

        htmlB += showUrlBody("NEWS BODY",news.newsBody);

        htmlR += showUrlBody("NEWS REVIEW",news.newsRev);

        htmlGI += '<br><br>' + '<b>REQUESTER:</b>' + 
                '<br> ' + news.originator;

        htmlGI += '<br>' + '<b>REVIEWER:</b>' + 
                '<br> ' + news.reviewer;
        
        htmlGI += '<br>' + '<b>AUDITORS:</b>';
        if (!isEmpty(news.auditors)) {
            len = news.auditors.length;
            for (var i=0; i < len; i++) {
                htmlGI += '<br> ' + news.auditors[i];
            }                    
        }
    }

    html = html.replace("<-GI->",htmlGI);
    html = html.replace("<-B->",htmlB);
    html = html.replace("<-R->",htmlR);
    return html;
}

var loadNewsClickParam = function(id){
    loadNewsAPI(id,loadNewsClick);
}

var loadNewsClick = function(){
    var news;

    if (lastRetMsg.includes('FAILURE')) {
        target.innerHTML = lastRetMsg;
    } 
    else {
        news = lastRetObj;
        target.innerHTML = oneNewsTablify(news);
        document.getElementById("defaultOpen").click();
    }
};

// ADD FUNDS 
var loadAddFundsNewsClickParam = function(id) {
    loadNewsAPI(id,loadAddFundsNewsClick);    
}

var loadAddFundsNewsClick = function(){
    var news;
    var html;

    if (lastRetMsg.includes('FAILURE')) {
        target.innerHTML = lastRetMsg;
    } 
    else {
        news = lastRetObj;
        html = oneNewsTablify(news);
        html += ui.newsAddFundsParam;
        target.innerHTML = html;
        document.getElementById("defaultOpen").click();
    }
};

async function newsAddFundsClick() {
    var amount = Number(document.getElementById('addFundsAmount').value);

    if (isNaN(amount)) {
        alert("Funds needs to be a valid number !");
        return;
    }
    
    if (amount <=0) {
        alert("Funds needs to be greater than zero !");
        return;
    }

    var msg = await addReviewFundsFNAPI(currentNews.id,amount);
    if (!msg.includes("SUCCESS")) {
        target.innerHTML = "FAILURE: Transaction did not complete ! - " + msg;
        return;
    }

    addFundsNewsAPI(currentNews.id,amount);
}

var newsAddFundsProcess = function() {
    var msgRetArea = document.getElementById('newsAddFundsParam');

    if (lastRetMsg.includes('FAILURE')) {
        msgRetArea.innerHTML = lastRetMsg;
    } 
    else {
        msgRetArea.innerHTML = lastRetMsg;
    }
}
 
// APPLY FOR A REVIEW
var loadApplyForReviewClickParam = function(id) {
    loadNewsAPI(id,loadApplyForReviewClick);    
}

var loadApplyForReviewClick = function(){
    var news;
    var html;

    if (lastRetMsg.includes('FAILURE')) {
        target.innerHTML = lastRetMsg;
    } 
    else {
        news = lastRetObj;
        html = oneNewsTablify(news);
        html += ui.applyReviewParam;
        target.innerHTML = html;
        document.getElementById("defaultOpen").click();
    }
};

async function applyReviewClick() {
    
    var msg = await applyForReviewFNAPI(currentNews.id);
    if (!msg.includes("SUCCESS")) {
        target.innerHTML = "FAILURE: Transaction did not complete ! - " + msg;
        return;
    }

    applyReviewAPI(currentNews.id,currentUser.email);
}

var applyReviewProcess = function() {
    var msgRetArea = document.getElementById('applyReviewParam');

    if (lastRetMsg.includes('FAILURE')) {
        msgRetArea.innerHTML = lastRetMsg;
    } 
    else {
        msgRetArea.innerHTML = lastRetMsg;
    }
}

// APPLY FOR A AUDIT
function loadApplyForAuditClickParam(id) {
    loadNewsAPI(id,loadApplyForAuditClick);    
}

var loadApplyForAuditClick = function(){
    var news;
    var html;

    if (lastRetMsg.includes('FAILURE')) {
        target.innerHTML = lastRetMsg;
    } 
    else {
        news = lastRetObj;
        html = oneNewsTablify(news);
        html += ui.applyAuditParam;
        target.innerHTML = html;
        document.getElementById("defaultOpen").click();
    }
};

async function applyAuditClick() {
    var msg = await applyForAuditingFNAPI(currentNews.id);
    if (!msg.includes("SUCCESS")) {
        target.innerHTML = "FAILURE: Transaction did not complete ! - " + msg;
        return;
    }

    applyAuditAPI(currentNews.id,currentUser.email);
}

var applyAuditProcess = function() {
    var msgRetArea = document.getElementById('applyAuditParam');

    if (lastRetMsg.includes('FAILURE')) {
        msgRetArea.innerHTML = lastRetMsg;
    } 
    else {
        msgRetArea.innerHTML = lastRetMsg;
    }
}

// APPROVE REVIEWER AND AUDITORS
var loadApproveRevAudClickParam = function(id) {
    loadNewsAPI(id,loadApproveRevAudClick);    
}

var loadApproveRevAudClick = function(){
    var news;
    var html;

    if (lastRetMsg.includes('FAILURE')) {
        target.innerHTML = lastRetMsg;
    } 
    else {
        news = lastRetObj;
        html = oneNewsTablify(news);
        html += ui.approveRevAudParam;
        target.innerHTML = html;
        document.getElementById("defaultOpen").click();
    }
};

async function approveRevAudClick() {
    var msg = await approveReviewerAuditorsFNAPI(currentNews.id);
    if (!msg.includes("SUCCESS")) {
        target.innerHTML = "FAILURE: Transaction did not complete ! - " + msg;
        return;
    }

    approveRevAudAPI(currentNews.id);
}

var approveRevAudProcess = function() {
    var msgRetArea = document.getElementById('approveRevAudParam');

    if (lastRetMsg.includes('FAILURE')) {
        msgRetArea.innerHTML = lastRetMsg;
    } 
    else {
        msgRetArea.innerHTML = lastRetMsg;
    }
}


// COMPLETE A REVIEW
var loadCompleteReviewClickParam = function(id) {
    loadNewsAPI(id,loadCompleteReviewClick);    
}

var loadCompleteReviewClick = function(){
    var news;
    var html;

    if (lastRetMsg.includes('FAILURE')) {
        target.innerHTML = lastRetMsg;
    } 
    else {
        news = lastRetObj;
        html = oneNewsTablify(news);
        html += ui.completeReviewParam;
        target.innerHTML = html;
        document.getElementById("defaultOpen").click();
    }
};

async function completeReviewClick() {
    currentNews.newsRev = document.getElementById('reviewBody').value;
    
    if (currentNews.newsRev == "") {
        alert("Input some review text !");
        return;
    }

    var msg = await finishReviewFNAPI(currentNews.id);
    if (!msg.includes("SUCCESS")) {
        target.innerHTML = "FAILURE: Transaction did not complete ! - " + msg;
        return;
    }

    completeReviewAPI(currentNews.id,currentNews);
}

var completeReviewProcess = function() {
    var msgRetArea = document.getElementById('completeReviewParam');

    if (lastRetMsg.includes('FAILURE')) {
        msgRetArea.innerHTML = lastRetMsg;
    } 
    else {
        msgRetArea.innerHTML = lastRetMsg;
    }
}

// APPROVE OR DENY REVIEW
var loadApproveDenyReviewClickParam = function(id) {
    loadNewsAPI(id,loadApproveDenyReviewClick);    
}

var loadApproveDenyReviewClick = function(){
    var news;
    var html;

    if (lastRetMsg.includes('FAILURE')) {
        target.innerHTML = lastRetMsg;
    } 
    else {
        news = lastRetObj;
        html = oneNewsTablify(news);
        html += ui.approveDenyParam;
        target.innerHTML = html;
        document.getElementById("defaultOpen").click();
    }
};

async function approveReviewClick() {
    var msg = await auditReviewFNAPI(currentNews.id,"Approved");
    if (!msg.includes("SUCCESS")) {
        target.innerHTML = "FAILURE: Transaction did not complete ! - " + msg;
        return;
    }

    approveReviewAPI(currentNews.id,currentUser.email);
}

var approveReviewProcess = function() {
    var msgRetArea = document.getElementById('approveDenyParam');

    if (lastRetMsg.includes('FAILURE')) {
        msgRetArea.innerHTML = lastRetMsg;
    } 
    else {
        msgRetArea.innerHTML = lastRetMsg;
    }
}

async function denyReviewClick() {
    var msg = await auditReviewFNAPI(currentNews.id,"Denied");
    if (!msg.includes("SUCCESS")) {
        target.innerHTML = "FAILURE: Transaction did not complete ! - " + msg;
        return;
    }

    denyReviewAPI(currentNews.id,currentUser.email);
}

var denyReviewProcess = function() {
    var msgRetArea = document.getElementById('approveDenyParam');

    if (lastRetMsg.includes('FAILURE')) {
        msgRetArea.innerHTML = lastRetMsg;
    } 
    else {
        msgRetArea.innerHTML = lastRetMsg;
    }
}

// LOGIN
var loadLoginParam = function(loginType) {

    currentLoginType = loginType;
    target.innerHTML = ui.login;

}

function setLoggedUser(user) {
    var ret = false;
    var str = "?";

    if (!isEmpty(user)) {
        switch (user.type) {
            case 'O' :
                str = 'REQUESTER - ';
                break;
            case 'R' :
                str = 'REVIEWER - ';
                break;
            case 'A' :
                str = 'AUDITOR - ';
                break;
            default:
                str = '';
        }
        str += user.email;
        loggedin.innerHTML = str;    
        ret = true;
    }
    else {
        loggedin.innerHTML = "?";    
    }
    return ret;
}

var loginClick = function(){
    var user = { "email" : '', "password" : '' , "type": '' };

    user.email = document.getElementById('loginEmail').value;
    user.email = user.email.toUpperCase();
    user.password = document.getElementById('loginPassword').value;
    user.type = currentLoginType;

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
    lastRetMsg = "SUCCESS: " + currentUser.email + " is logged out";
    lastRetObj = null;
    currentUser = null
    target.innerHTML = lastRetMsg;
    loggedin.innerHTML = "-"

}

var loginClick = function(){
    var user = { "email" : '', "password" : '' , "type": '' , "MMAccount": ''};

    user.email = document.getElementById('loginEmail').value;
    user.email = user.email.toUpperCase();
    user.password = document.getElementById('loginPassword').value;
    user.type = currentLoginType;

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
    lastRetMsg = "SUCCESS: " + currentUser.email + " is logged out";
    lastRetObj = null;
    currentUser = null
    target.innerHTML = lastRetMsg;
    loggedin.innerHTML = "-"

}

var loginMetaMaskChanged = function(newMMAccount){
    var user = { "email" : '', "password" : '' , "type": '' , "MMAccount": ''};

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
}

var loadLogoutParam = function() {

    if (isEmpty(currentUser)) {
        alert("You must be logged in to perform this operation !");
        return;
    }
    lastRetMsg = "SUCCESS: " + currentUser.email + " is logged out";
    lastRetObj = null;
    currentUser = null
    target.innerHTML = lastRetMsg;
    loggedin.innerHTML = "-"

}

// JoinUs
var loadJoinUsParam = function(userType){
    var html = ui.JoinUs;

    joinUsUserType = userType;
    switch (userType) {
        case 'O':
            html = html.replace("Join_us","Join us as Requester");
            break
        case 'R':
            html = html.replace("Join_us","Join us as Reviewer");
            break;
        case 'A':
            html = html.replace("Join_us","Join us as Auditor");    
            break;
        default:
            html = html.replace("Join_us","Join us ??? ");
            break;
    }
    html = html.replace("<-MM->",currentMAAccount);
    target.innerHTML = html;
}

var loadJoinUs = function() {
    var email = document.getElementById('addEmail').value;
    var password = document.getElementById('addPassword').value;
    var passwordReType = document.getElementById('addPassword2').value;
    var MMAccount = document.getElementById('addMMAcount').value;

    if ((email == "") || (password == "") || (passwordReType == "")) {
        alert("Required parameters can not be blank !");
        return;
    }
    
    if ((password != passwordReType)) {
        alert("Passwords do NOT match !");
        return;
    }
    
    email = email.toUpperCase();

    loadJoinUsAPI(email,password,joinUsUserType,MMAccount);
}

var loadJoinUsProcess = function() {
    var msgRetArea = document.getElementById('joinUsBody');

    if (lastRetMsg.includes('FAILURE')) {
        msgRetArea.innerHTML = lastRetMsg;
    } 
    else {
        msgRetArea.innerHTML = lastRetMsg;
    }
}

var loadUpdateMMAccParam = function(userType){
    var html = ui.UpdateMMAccount;

    updateMMAccUserType = userType;
    switch (userType) {
        case 'O':
            html = html.replace("Update_MMAcc","Update MetaMask REQUESTER Account");
            break
        case 'R':
            html = html.replace("Update_MMAcc","Update MetaMask REVIEWER Account");
            break;
        case 'A':
            html = html.replace("Update_MMAcc","Update MetaMask AUDITOR Account");    
            break;
        default:
            html = html.replace("Update_MMAcc","Update MetaMask ??? Account");
            break;
    } 
    if (!isEmpty(currentUser)) {
        html = html.replace("<-MMemail->",currentUser.email);
    }
    else {
        html = html.replace("<-MMemail->","");
    }
    html = html.replace("<-MM->",currentMAAccount);
    target.innerHTML = html;
}

var loadUpdateMMAcc = function() {
    var user = { "email" : '', "password" : '' , "type": '' , "MMAccount": ''};

    var email = document.getElementById('updateEmail').value;
    var password = document.getElementById('updatePassword').value;
    var newMMAccount = document.getElementById('updateMMAcount').value;

    if ((email == "") || (password == "") || (newMMAccount == "")) {
        alert("Required parameters can not be blank !");
        return;
    }
    
    user.email = email.toUpperCase();
    user.password = password;
    user.MMAccount = newMMAccount;
    user.type = updateMMAccUserType;

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

var loadConfigParam = function(){
    var html = ui.Config;

    html = html.replace("<-NET->",configData.network);
    html = html.replace("<-ADDR->",configData.contractAddress);
    target.innerHTML = html;
}

var loadConfig = function() {
    var configParam = { id: 1, network: "Rinkeby",
                        contractAddress: contractAddress } ;

    configParam.network = document.getElementById('configNet').value;
    configParam.contractAddress = document.getElementById('configSCAddr').value;

    if (configParam.contractAddress == "")  {
        alert("Required parameters can not be blank !");
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
        setupWeb3(configData,callbackFunctionAccountChanged,callbackProcessSetWeb3);
    }
}

var callbackFunctionAccountChanged = function(newAccount) {
    var syncAccount = document.getElementById('syncMetaMask').checked;

    if (syncAccount) {
        loginMetaMaskChanged(newAccount);
    }
}

function callbackSetupWeb3API() {

    if (!lastRetMsg.includes('FAILURE')) {
        configData = lastRetObj;
        setupWeb3(configData,callbackFunctionAccountChanged,callbackProcessSetWeb3);
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

loggedin = document.getElementById('loggedin');
contractInfo = document.getElementById('contractInfo');

defaultModule();

getConfigData(callbackSetupWeb3API); 

console.log('Finished');


