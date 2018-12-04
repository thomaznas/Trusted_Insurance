pragma solidity ^0.4.19;
//pragma experimental ABIEncoderV2;

import "./ownable.sol";
import "./safemath.sol";

contract FactualNews is Ownable {

    // Parameters
    uint percentageAuditors = 10; // in %
    uint percentageCompany = 5; // in %
    string retMsg;
    string _statusTemp;

    // Request Status
    string requestStatus = "Blank"; //  This status can be "Blank", "Requested", "Approve Reviewer", "Reviewing" , "Auditing" , "Approved" or "Denied"

    // Data structures associated to originators 
    mapping (address => uint) originatorToId;  // links originator, person who created the request, address to id in the fundAmount array
    uint[] fundAmount; // carries the actual ammount
    address[] originatorsList;
    uint totalFundAmount;
    uint requestReviewId;  // carries the request Id

    // Data structures associated to reviewers
    mapping (address => uint) reviewerToId; // links reviewer to id in reviewStatus array
    bool[] reviewStatus; // status of revision - true is done and false is in progress
    address[] reviewersList;

    // Data structures associated to auditors
    mapping (address => uint) auditorToId; // links auditor to id in auditorStatus array
    string[] auditorStatus; // status of auditing - "Not initiated" , "Approved" or "Denied"
    address[] auditorsList;
    uint totalAuditors;

    // Iniitate a review request
    function createRequest(uint _requestReviewId) public {
        if (keccak256(requestStatus) == keccak256("Blank")) {
            requestStatus = "Requested";
            requestReviewId = _requestReviewId;
            totalFundAmount = 0;
            totalAuditors = 0;
        }
        else {
            revert();
        }
    }

    // Get to total amount committed in this request
    function getTotalRequestInfo() external view returns(string _requestStatus, 
                                                         uint _requestReviewId, 
                                                         uint _totalFundAmount,
                                                         uint[] _fundAmount,
                                                         address[] _originatorsList) {
        _requestStatus = requestStatus;
        _requestReviewId = requestReviewId;
        _totalFundAmount = totalFundAmount;
        _fundAmount = fundAmount;
        _originatorsList = originatorsList;
    }

    modifier nonZeroValue() { if (!(msg.value > 0)) revert(); _; }

    function findOriginator(address addr) internal returns (uint) {
        uint i;
        uint len;
        len = originatorsList.length;
        for (i=0;i<len;i++) {
            if (addr == originatorsList[i]) {
                return (i+1);
            }
        }
        return i;
    }

 // Add funds
    function addReviewFunds() public payable  {
    //    if (keccak256(requestStatus) == keccak256("Requested")) {
        createRequest(1);
            uint _id = findOriginator(msg.sender);
            if (_id == 0) {
               _id = fundAmount.push(msg.value);
               originatorsList.push(msg.sender);
               originatorToId[msg.sender] = _id;
            }
            else {
                fundAmount[_id-1] += msg.value;
                originatorsList[_id-1] = msg.sender;
            }   
            totalFundAmount += msg.value;
  /*      }
        else {
            revert();
        } */
    }

    // Withdrawal all money
    function withdrawal(uint _amount, address _recipient) external onlyOwner {
        uint transferAmount;
        transferAmount = _amount;
        if ( (_amount > totalFundAmount) || (_amount == 0) ) {
            transferAmount = totalFundAmount;
        }
        totalFundAmount -= transferAmount;
        _recipient.send(transferAmount);
    }
    
    //demo only allows ANYONE to withdraw
    function withdrawAll() external {
        totalFundAmount = 0;
        require(msg.sender.send(this.balance));
    }

    function findReviewer(address addr) internal returns (uint) {
        uint i;
        uint len;
        len = reviewersList.length;
        for (i=0;i<len;i++) {
            if (addr == reviewersList[i]) {
                return (i+1);
            }
        }
        return i;
    }

    // Reviewers candidatate apply to review.
    function applyForReview() public {
        if (keccak256(requestStatus) == keccak256("Requested")) {
            requestStatus = "Approve Reviewer";
            uint _id = findReviewer(msg.sender);
            if (_id == 0) {
                _id = reviewStatus.push(false);
                reviewersList.push(msg.sender);
                reviewerToId[msg.sender] = _id;
            }
            else {
                reviewStatus[_id-1] = false;
                reviewersList[_id-1] = msg.sender;
            }   
        }
        else {
            revert();
        }
    }

   // Get review status
    function getReviewStatusInfo() external view returns(bool[] _reviewStatus, address[] _reviewersList) {
        _reviewStatus = reviewStatus;
        _reviewersList = reviewersList;
    }


    function findAuditor(address addr) internal returns (uint) {
        uint i;
        uint len;
        len = auditorsList.length;
        for (i=0;i<len;i++) {
            if (addr == auditorsList[i]) {
                return (i+1);
            }
        }
        return i;
    }

    // Apply for Auditors
    function applyForAuditing() external {
        if ((keccak256(requestStatus) == keccak256("Requested")) ||
            (keccak256(requestStatus) == keccak256("Approve Reviewer")) ) {
            uint _id = findAuditor(msg.sender);
            if (_id == 0) {
                _id = auditorStatus.push("Not initiated");
                auditorsList.push(msg.sender);
                auditorToId[msg.sender] = _id;
                totalAuditors++; 
            }
            else {
                auditorStatus[_id-1] = "Not initiated";
                auditorsList[_id-1] = msg.sender;
            }  
        }
        else {
            revert();
        }
    }

    // Get auditor status
    function getAuditorStatusInfo() external view returns(uint _totalAuditors, address[] _auditorsList) {
        _totalAuditors = totalAuditors;
        _auditorsList = auditorsList;
    }

    // Only the originator can approve Reviewers and Auditors
    function approveReviewerAuditors() public onlyOwner {
        if ((keccak256(requestStatus) == keccak256("Approve Reviewer")) && 
            (totalAuditors > 0) ) {
            requestStatus = "Reviewing";
        }
        else {
            revert();
        }
    }

    // Only first reviewer can trigger the auditing
    function finishReview() public {
        if ((keccak256(requestStatus) == keccak256("Reviewing")) && 
            (reviewersList[0] == msg.sender) ) {
            requestStatus = "Auditing";
        }
        else {
            revert();
        }
    }

    // Counts how many auditors have already approved
    function _countStatus(string _status) private returns (uint) {
        uint count = 0;
        for (uint i=0; i < totalAuditors; i++) {
            if (keccak256(auditorStatus[i]) == keccak256(_status)) {
                count++;    
            }            
        }
        return count;
    }

    //Check the outcome of auditing - Approved, Denied, Undefined
    function _checkAuditingStatus() private returns (string) {
        uint _countApproved;
        uint _countDenied;
        uint tempTotalAuditors;

        _countApproved = _countStatus("Approved");
        _countDenied = _countStatus("Denied");

        // case which is tied
        if ( ((totalAuditors % 2) == 0) &&
             (totalAuditors == (_countApproved + _countDenied)) &&
             (_countApproved == _countDenied) ) {
            return "Denied";
        }

        if ((totalAuditors % 2) != 0) {
            tempTotalAuditors = totalAuditors + 1;
        }
        else {
            tempTotalAuditors = totalAuditors;          
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
    function _finalizeRequestReview(string _status) private  {
        uint auditorsValue;
        uint i;
        uint remainder;
        uint remainderOriginators;
        uint totalOriginators;
        uint originatorPart;
        uint totalReviewers;
        uint reviewerPart;

        if (totalAuditors == 0) {
            auditorsValue = 0;
        } 
        else {
            auditorsValue = (totalFundAmount * percentageAuditors / 100) / totalAuditors; 
        }

        remainder = totalFundAmount;

        for (i=0; i < totalAuditors; i++) {
           auditorsList[i].transfer(auditorsValue); 
           remainder -= totalFundAmount;
        }
    

        // Company should get paid here
        remainder -= (totalFundAmount * percentageCompany / 100) / totalAuditors; 

        // Pay the reviewers in case that review was approved
        if (keccak256(_status) == keccak256("Approved")) {
            totalReviewers = reviewersList.length;
            reviewerPart = remainder / totalReviewers;
            for (i=0; i < totalReviewers; i++) {
                reviewersList[i].transfer(reviewerPart);
                remainder -= reviewerPart;
            }
        }
        // Or return the funds to the originators 
        else {
            totalOriginators = originatorsList.length;
            remainderOriginators = remainder;
            for (i=0; i < totalOriginators; i++) {
                originatorPart = fundAmount[i]*remainderOriginators/totalFundAmount;
                originatorsList[i].transfer(originatorPart);
                remainder -= originatorPart;
            }
        }
        totalFundAmount = remainder;

    }

    function toString(address x) internal returns (string) {
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
    
    function strConcat(string _a, string _b, string _c, string _d, string _e) internal returns (string){
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
    function auditReview(string decision) external payable returns (string) {

        retMsg = "";
        if ((keccak256(requestStatus) == keccak256("Auditing")) 
          && (findAuditor(msg.sender) != 0) 
            ) {
            uint _id = findAuditor(msg.sender) - 1;    
            if (keccak256(decision) == keccak256("Approved")) {
                auditorStatus[_id] = "Approved";    
            }
            else {
                auditorStatus[_id] = "Denied";    
            }

            // Check auditing status
            _statusTemp = string(_checkAuditingStatus());    
            if (keccak256(_statusTemp) != keccak256("Undefined")) {
                _finalizeRequestReview(_statusTemp);
                requestStatus = _statusTemp;
            }
            
        }
        else {
          retMsg = string(strConcat(toString(msg.sender), " - ", uint2str(findAuditor(msg.sender)), "",""));
        }
        return string(retMsg);
    }    

  // This function process all payments refering to the end o review process
    function test(uint amount) public  {
        uint auditorsValue;
        uint i;
        uint remainder;
        uint remainderOriginators;
        uint totalOriginators;
        uint originatorPart;
        uint totalReviewers;
        uint reviewerPart;

        if (totalAuditors == 0) {
            auditorsValue = 0;
        } 
        else {
            auditorsValue = (totalFundAmount * percentageAuditors / 100) / totalAuditors; 
        }

        remainder = totalFundAmount;

        for (i=0; i < totalAuditors; i++) {
           auditorsList[i].transfer(auditorsValue); 
           remainder -= totalFundAmount;
        }
    

        // Company should get paid here
        remainder -= (totalFundAmount * percentageCompany / 100) / totalAuditors; 

        // Pay the reviewers in case that review was approved
        if (keccak256(_status) == keccak256("Approved")) {
            totalReviewers = reviewersList.length;
            reviewerPart = remainder / totalReviewers;
            for (i=0; i < totalReviewers; i++) {
                reviewersList[i].transfer(reviewerPart);
                remainder -= reviewerPart;
            }
        }
        // Or return the funds to the originators 
        else {
            totalOriginators = originatorsList.length;
            remainderOriginators = remainder;
            for (i=0; i < totalOriginators; i++) {
                originatorPart = fundAmount[i]*remainderOriginators/totalFundAmount;
                originatorsList[i].transfer(originatorPart);
                remainder -= originatorPart;
            }
        }
        totalFundAmount = remainder;

    }



}