
/// TEST  /// TEST/// TEST  /// TEST  /// TEST  /// TEST  /// TEST  /// TEST  /// TEST  
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    function applyForReviewT(address s) private {
        if (keccak256(requestStatus) == keccak256("Requested")) {
            requestStatus = "Approve Reviewer";
            uint _id = reviewerToId[s];
            if (_id == 0) {
                _id = reviewStatus.push(false);
                reviewersList.push(s);
                reviewerToId[s] = _id;
            }
            else {
                reviewStatus[_id-1] = false;
                reviewersList[_id-1] = s;
            }   
        }
        else {
            revert();
        }
    }

    function applyForAuditingT(address s) private {
        if ((keccak256(requestStatus) == keccak256("Requested")) ||
            (keccak256(requestStatus) == keccak256("Approve Reviewer")) ) {
            uint _id = auditorToId[msg.sender];
            if (_id == 0) {
                _id = auditorStatus.push("Not initiated");
                auditorsList.push(s);
                auditorToId[s] = _id;
            }
            else {
                auditorStatus[_id-1] = "Not initiated";
                auditorsList[_id-1] = s;
            }  
            totalAuditors++; 
        }
        else {
            revert();
        }
    }

    function finishReviewT(address s) private {
        if ((keccak256(requestStatus) == keccak256("Reviewing")) && 
            (reviewerToId[s] == 1) ) {
            requestStatus = "Auditing";
        }
        else {
            revert();
        }
    }


 function bytesToAddress(bytes _address) private returns (address) {
    uint160 m = 0;
    uint160 b = 0;

    for (uint8 i = 0; i < 20; i++) {
      m *= 256;
      b = uint160(_address[i]);
      m += (b);
    }

    return address(m);
  }
  
    function batchTransactions1(uint _idReq) public {
     
     

        createRequest(_idReq);   

        addReviewFunds();

        address add1  = bytesToAddress("0x6DcF93423d24AD3F270dD64D3888D28C533D79B1" ) ;
        
        applyForReviewT(add1);

        address add2=  bytesToAddress("0x219600C4666E253A60c79F84227a6E65bbf37C2a");
        applyForAuditingT(add2);

        address add3= bytesToAddress("0x8c856F02038721e6E48B04A7A67b56FCC391d0Ff");
        applyForAuditingT(add3);

        approveReviewerAuditors();    

        finishReviewT(add1);
        
    }
