var id, status, title, newsBody, newsRev, originator, reviewer, auditors;
var user, news;
var email, password;

mail = "a1@acme.com";
password = "a1";
type = "O";
user = findUser(email, type);
if (isEmpty(user)) {
    createUser(email,password,type);
}
user = findUser(email, type);

email = "r1@acme.com";
password = "r1";
type = "R";
user = findUser(email, type);
if (isEmpty(user)) {
    createUser(email,password,type);
}
user = findUser(email, type);

email = "aud1@acme.com";
password = "aud1";
type = "A";
user = findUser(email, type);
if (isEmpty(user)) {
    createUser(email,password,type);
}
user = findUser(email, type);

email = "aud2@acme.com";
password = "aud1";
type = "A";
user = findUser(email, type);
if (isEmpty(user)) {
    createUser(email,password,type);
} 


id = "ab3341bb39ef"; 
status = "Requested"; 
title = "TESTE 1";
newsBody = "nononononononno";
newsRev = ""
originator = "r2@acme.com";
reviewer = "r1@acme.com"; 
auditors = [];
auditors.push("aud2@acme.com");

news = findFactualNews(id);
if (isEmpty(news)) {
    createFactualNews(id, status, title, newsBody, newsRev,originator,reviewer, auditors);
}

news = findFactualNews(id);
title = "";
newsBody = "";
newsRev = "";
status = "";
originator = "";
reviewer = "";
auditors = news.auditors;
auditors.push("auditor4@rem.edu");
updateFactualNews(id, status, title, newsBody, newsRev, originator, reviewer, auditors);
news = findFactualNews(id);


findNewsFromOriginator("a1@acme.com");

findNewsFromAuditor("auditor3@rem.edu");

assignReviewerToFactualNews("Ef3323541BB39Ec", "r1@acme.com" );

assignAuditorToFactualNews("Ef3323541BB39Ec", "AUD2@ACME.COM");

checkUserLogin("a1@acme.com","a1","O");

checkUserLogin("a1@acme.com","a441","O");

checkUserLogin("AUDITOR3@ERM.EDU","aud3","A");

createRequest("gh25454241fB39ad");

curl http://localhost:8000/approve_reviewer_auditors/cdef41BB092539B

curl http://localhost:8000/login/a1@acme.com/a1/O



