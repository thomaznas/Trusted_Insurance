pragma solidity ^0.4.19;
//pragma experimental ABIEncoderV2;

import "./ownable.sol";
import "./safemath.sol";

contract FactualNews {

    // Parameters
    uint percentageAuditors = 10; // in %
    uint percentageCompany = 5; // in %

    struct newsRequestContractType {
        string retMsg;
        string _statusTemp;

        // Request Status
        string requestStatus; //  This status can be "Blank", "Requested", "Approve Reviewer", "Reviewing" , "Auditing" , "Approved" or "Denied"

        // Data structures associated to originators 
        //mapping (address => uint) originatorToId;  // links originator, person who created the request, address to id in the fundAmount array
        uint[] fundAmount; // carries the actual ammount
        address[] originatorsList;
        uint totalFundAmount;
        uint requestReviewId;  // carries the request Id

        // Data structures associated to reviewers
        //mapping (address => uint) reviewerToId; // links reviewer to id in reviewStatus array
        bool[] reviewStatus; // status of revision - true is done and false is in progress
        address[] reviewersList;

        // Data structures associated to auditors
        //mapping (address => uint) auditorToId; // links auditor to id in auditorStatus array
        string[] auditorStatus; // status of auditing - "Not initiated" , "Approved" or "Denied"
        address[] auditorsList;
        uint totalAuditors;
    }

    mapping (uint => newsRequestContractType) news; // links news to contract data



    // Iniitate a review request
    function createRequest(uint _id,uint _requestReviewId) public {
        news[_id].requestStatus = "Requested";
        news[_id].requestReviewId = _requestReviewId;
        news[_id].totalFundAmount = 0;
        news[_id].totalAuditors = 0;
    }

    // Get to total amount committed in this request
    function getTotalRequestInfo(uint _id) external view returns(
                                                         string _requestStatus, 
                                                         uint _requestReviewId, 
                                                         uint _totalFundAmount,
                                                         uint[] _fundAmount,
                                                         address[] _originatorsList) {
        _requestStatus = news[_id].requestStatus;
        _requestReviewId = news[_id].requestReviewId;
        _totalFundAmount = news[_id].totalFundAmount;
        _fundAmount = news[_id].fundAmount;
        _originatorsList = news[_id].originatorsList;
    }

    modifier nonZeroValue() { if (!(msg.value > 0)) revert(); _; }

    function findOriginator(uint _id,address addr) internal view returns (uint) {
        uint i;
        uint len;
        len = news[_id].originatorsList.length;
        for (i=0;i<len;i++) {
            if (addr == news[_id].originatorsList[i]) {
                return (i+1);
            }
        }
        return 0;
    }

 // Add funds
    function addReviewFunds(uint _id) public payable  {
        if (keccak256(news[_id].requestStatus) == keccak256("Requested")) {
            uint id = findOriginator(_id,msg.sender);
            if (id == 0) {
               id = news[_id].fundAmount.push(msg.value);
               news[_id].originatorsList.push(msg.sender);
            }
            else {
                news[_id].fundAmount[id-1] += msg.value;
                news[_id].originatorsList[id-1] = msg.sender;
            }   
            news[_id].totalFundAmount += msg.value;
        }
        else {
            revert();
        }
    }

    // Withdrawal all money
    function withdrawal(uint _id,uint _amount, address _recipient) external {
        uint transferAmount;
        transferAmount = _amount;
        if ( (_amount > news[_id].totalFundAmount) || (_amount == 0) ) {
            transferAmount = news[_id].totalFundAmount;
        }
        news[_id].totalFundAmount -= transferAmount;
        _recipient.send(transferAmount);
    }
    
    //demo only allows ANYONE to withdraw
    function withdrawAll(uint _id) external {
        news[_id].totalFundAmount = 0;
        require(msg.sender.send(this.balance));
    }

    function findReviewer(uint _id,address addr) internal view returns (uint) {
        uint i;
        uint len;
        len = news[_id].reviewersList.length;
        for (i=0;i<len;i++) {
            if (addr == news[_id].reviewersList[i]) {
                return (i+1);
            }
        }
        return 0;
    }

    // Reviewers candidatate apply to review.
    function applyForReview(uint _id) public {
        if (keccak256(news[_id].requestStatus) == keccak256("Requested")) {
            news[_id].requestStatus = "Approve Reviewer";
            uint id = findReviewer(_id,msg.sender);
            if (id == 0) {
                id = news[_id].reviewStatus.push(false);
                news[_id].reviewersList.push(msg.sender);
            }
            else {
                news[_id].reviewStatus[id-1] = false;
                news[_id].reviewersList[id-1] = msg.sender;
            }   
        }
        else {
            revert();
        }
    }

   // Get review status
    function getReviewStatusInfo(uint _id) external view returns(bool[] _reviewStatus, address[] _reviewersList) {
        _reviewStatus = news[_id].reviewStatus;
        _reviewersList = news[_id].reviewersList;
    }


    function findAuditor(uint _id,address addr) internal view returns (uint) {
        uint i;
        uint len;
        len = news[_id].auditorsList.length;
        for (i=0;i<len;i++) {
            if (addr == news[_id].auditorsList[i]) {
                return (i+1);
            }
        }
        return 0;
    }

    // Apply for Auditors
    function applyForAuditing(uint _id) external {
        if ((keccak256(news[_id].requestStatus) == keccak256("Requested")) ||
            (keccak256(news[_id].requestStatus) == keccak256("Approve Reviewer")) ) {
            uint id = findAuditor(_id,msg.sender);
            if (id == 0) {
                id = news[_id].auditorStatus.push("Not initiated");
                news[_id].auditorsList.push(msg.sender);
                news[_id].totalAuditors++; 
            }
            else {
                news[_id].auditorStatus[id-1] = "Not initiated";
                news[_id].auditorsList[id-1] = msg.sender;
            }  
        }
        else {
            revert();
        }
    }

    // Get auditor status
    function getAuditorStatusInfo(uint _id) external view returns(uint _totalAuditors, address[] _auditorsList) {
        _totalAuditors = news[_id].totalAuditors;
        _auditorsList = news[_id].auditorsList;
    }

    // Only the originator can approve Reviewers and Auditors
    function approveReviewerAuditors(uint _id) {
        if ((keccak256(news[_id].requestStatus) == keccak256("Approve Reviewer")) && 
            (news[_id].totalAuditors > 0) ) {
            news[_id].requestStatus = "Reviewing";
        }
        else {
            revert();
        }
    }

    // Only first reviewer can trigger the auditing
    function finishReview(uint _id) public {
        if ((keccak256(news[_id].requestStatus) == keccak256("Reviewing")) && 
            (news[_id].reviewersList[0] == msg.sender) ) {
            news[_id].requestStatus = "Auditing";
        }
        else {
            revert();
        }
    }

    // Counts how many auditors have already approved
    function _countStatus(uint _id,string _status) private view returns (uint) {
        uint count = 0;
        for (uint i=0; i < news[_id].totalAuditors; i++) {
            if (keccak256(news[_id].auditorStatus[i]) == keccak256(_status)) {
                count++;    
            }            
        }
        return count;
    }

    //Check the outcome of auditing - Approved, Denied, Undefined
    function _checkAuditingStatus(uint _id) private view returns (string) {
        uint _countApproved;
        uint _countDenied;
        uint tempTotalAuditors;

        _countApproved = _countStatus(_id,"Approved");
        _countDenied = _countStatus(_id,"Denied");

        // case which is tied
        if ( ((news[_id].totalAuditors % 2) == 0) &&
             (news[_id].totalAuditors == (_countApproved + _countDenied)) &&
             (_countApproved == _countDenied) ) {
            return "Denied";
        }

        if ((news[_id].totalAuditors % 2) != 0) {
            tempTotalAuditors = news[_id].totalAuditors + 1;
        }
        else {
            tempTotalAuditors = news[_id].totalAuditors;          
        }

        // Majority denied
        if (_countDenied >= (tempTotalAuditors/2)) {
            return "Denied";
        } 
        // Majority Approved
        if (_countApproved >= (tempTotalAuditors/2)) {
            return "Approved";
        } 
        return "Undefined";
    }

    // This function process all payments refering to the end o review process
    function _finalizeRequestReview(uint _id,string _status) private  {
        uint auditorsValue;
        uint i;
        uint remainder;
        uint remainderOriginators;
        uint totalOriginators;
        uint originatorPart;
        uint totalReviewers;
        uint reviewerPart;

        if (news[_id].totalAuditors == 0) {
            auditorsValue = 0;
        } 
        else {
            auditorsValue = (news[_id].totalFundAmount * percentageAuditors / 100) / news[_id].totalAuditors; 
        }

        remainder = news[_id].totalFundAmount;

        for (i=0; i < news[_id].totalAuditors; i++) {
           news[_id].auditorsList[i].transfer(auditorsValue); 
           remainder -= auditorsValue;
        }
    
        // Company should get paid here
        remainder -= (news[_id].totalFundAmount * percentageCompany / 100) / news[_id].totalAuditors; 

        // Pay the reviewers in case that review was approved
        if (keccak256(_status) == keccak256("Approved")) {
            totalReviewers = news[_id].reviewersList.length;
            reviewerPart = remainder / totalReviewers;
            for (i=0; i < totalReviewers; i++) {
                news[_id].reviewersList[i].transfer(reviewerPart);
                remainder -= reviewerPart;
            }
        }
        // Or return the funds to the originators 
        else {
            totalOriginators = news[_id].originatorsList.length;
            remainderOriginators = remainder;
            for (i=0; i < totalOriginators; i++) {
                originatorPart = news[_id].fundAmount[i]*remainderOriginators/news[_id].totalFundAmount;
                news[_id].originatorsList[i].transfer(originatorPart);
                remainder -= originatorPart;
            }
        }
        news[_id].totalFundAmount = remainder;

    }

    function toString(address x) internal pure returns (string) {
        bytes memory b = new bytes(20);
        for (uint i = 0; i < 20; i++)
            b[i] = byte(uint8(uint(x) / (2**(8*(19 - i)))));
        return string(b);
    }
    
    function uint2str(uint i) internal pure returns (string){
        if (i == 0) return "0";
        uint j = i;
        uint length;
        while (j != 0){
            length++;
            j /= 10;
        }
        bytes memory bstr = new bytes(length);
        uint k = length - 1;
        while (i != 0){
            bstr[k--] = byte(48 + i % 10);
            i /= 10;
        }
        return string(bstr);
    }
    
    function strConcat(string _a, string _b, string _c, string _d, string _e) internal pure returns (string){
        bytes memory _ba = bytes(_a);
        bytes memory _bb = bytes(_b);
        bytes memory _bc = bytes(_c);
        bytes memory _bd = bytes(_d);
        bytes memory _be = bytes(_e);
        string memory abcde = new string(_ba.length + _bb.length + _bc.length + _bd.length + _be.length);
        bytes memory babcde = bytes(abcde);
        uint k = 0;
        for (uint i = 0; i < _ba.length; i++) babcde[k++] = _ba[i];
        for (i = 0; i < _bb.length; i++) babcde[k++] = _bb[i];
        for (i = 0; i < _bc.length; i++) babcde[k++] = _bc[i];
        for (i = 0; i < _bd.length; i++) babcde[k++] = _bd[i];
        for (i = 0; i < _be.length; i++) babcde[k++] = _be[i];
        return string(babcde);
    }

    // Auditors give their appreciation on the review
    function auditReview(uint _id,string _decision) external payable returns (string) {

        news[_id].retMsg = "";
        if ((keccak256(news[_id].requestStatus) == keccak256("Auditing")) 
          && (findAuditor(_id,msg.sender) != 0) 
            ) {
            uint id = findAuditor(_id,msg.sender) - 1;    
            if (keccak256(_decision) == keccak256("Approved")) {
                news[_id].auditorStatus[id] = "Approved";    
            }
            else {
                news[_id].auditorStatus[id] = "Denied";    
            }

            // Check auditing status
            news[_id]._statusTemp = string(_checkAuditingStatus(_id));    
            if (keccak256(news[_id]._statusTemp) != keccak256("Undefined")) {
                _finalizeRequestReview(_id,news[_id]._statusTemp);
                news[_id].requestStatus = news[_id]._statusTemp;
            }
            
        }
        else {
          news[_id].retMsg = string(strConcat(toString(msg.sender), " - ", uint2str(findAuditor(_id,msg.sender)), "",""));
        }
        return string(news[_id].retMsg);
    }    


}