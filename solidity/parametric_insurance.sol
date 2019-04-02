pragma solidity ^0.4.19;

import "./safemath.sol";

contract ParametricInsurance {
    
    uint oracleNum = 1;
    uint valuePerMinute = 1e17;
    uint maxMinutes = 120;
    uint premiumFee = 1e18;

    struct FDIContractType {

        // Configurable coded paramters
        uint oracleNum;
        uint valuePerMinute;
        uint maxMinutes;
        uint premiumFee;

        string id;

        address creator;

        // Request Status
        string status; //  This status can be "Open", "Reporting" or "Finalized"
        
        uint contractFunds;

        // Data structures associated to the insurance 
        uint totalCoverageFunds;
        uint[] passPremiumAmounts; 
        address[] passAddrs;

        uint delay;
        bool delayed;
        
        // Data structures associated to the Oracle 
        bool[] oracleDelayeds; 
        uint[] oracleDelayValues;
        string[] oracleNames;

    }
    
    mapping (string => FDIContractType) FDIs; // links news to contract data
    
    function setFDIParameters(uint pOracleNum, uint pValuePerMinute,uint pMaxMinutes, uint pPremiumFee) public {
    
        if (pOracleNum > 0) {
            oracleNum = pOracleNum;
        }
        if (pValuePerMinute > 0) {
            valuePerMinute = pValuePerMinute*1e10;
        }
        if (pMaxMinutes > 0) {
            maxMinutes = pMaxMinutes;
        }
        if (pPremiumFee > 0) {
            premiumFee = pPremiumFee*1e10;
        }
    }

    function getFDIAppParameters() external view 
       returns(uint rOracleNum, uint rValuePerMinute,uint rMaxMinutes, uint rPremiumFee) {
        rOracleNum = oracleNum;
        rValuePerMinute = valuePerMinute;
        rMaxMinutes = maxMinutes;
        rPremiumFee = premiumFee; 
    }
    
    function getFDIContractParameters(string id) external view 
       returns(uint rOracleNum, uint rValuePerMinute,uint rMaxMinutes, uint rPremiumFee) {
        rOracleNum = FDIs[id].oracleNum;
        rValuePerMinute = FDIs[id].valuePerMinute;
        rMaxMinutes = FDIs[id].maxMinutes;
        rPremiumFee = FDIs[id].premiumFee; 
    }

    function createFDI(string id) public payable returns (string) {
        
        if (keccak256(FDIs[id].id) != keccak256("")) {
            return "";
        }    
        
        FDIs[id].id = id;
        FDIs[id].status = "Open";
        FDIs[id].contractFunds = msg.value;
        FDIs[id].creator = msg.sender;
        
        FDIs[id].delay = 0;
        FDIs[id].delayed = false;
        
        // Hard coded values
        FDIs[id].oracleNum = oracleNum;
        FDIs[id].valuePerMinute = valuePerMinute;
        FDIs[id].maxMinutes = maxMinutes;
        FDIs[id].premiumFee = premiumFee;
        
        return id;
    }

    function addFundsFDI(string id) public payable returns (string _ret) {
        
        if (keccak256(FDIs[id].id) != keccak256(id)) {
            _ret = "FAILURE: ID not found!";
            revert();
        }    
        

        if (keccak256(FDIs[id].status) != keccak256("Open")) {
            _ret = "FAILURE: ID not found!";
            revert();
        }    
        
        FDIs[id].contractFunds += msg.value;
        
        _ret = "SUCESS!";
    }

    function getFDIInfo1(string id) external view 
       returns(string _id, string _status, address _creator, uint _contractFunds,uint _totalCoverageFunds,
               uint[] _passPremiumAmounts, address[] _passAddrs) {
        _id = FDIs[id].id;
        _status = FDIs[id].status;
        _creator = FDIs[id].creator; 
        _contractFunds = FDIs[id].contractFunds;
        _totalCoverageFunds = FDIs[id].totalCoverageFunds;
        _passPremiumAmounts = FDIs[id].passPremiumAmounts;
        _passAddrs = FDIs[id].passAddrs;
    }

    function getFDIInfo2(string id) external view 
       returns(uint _delay, bool _delayed,
               bool[] _oracleDelayeds, uint[] _oracleDelayValues) {
        _delay = FDIs[id].delay;
        _delayed = FDIs[id].delayed;
        _oracleDelayeds = FDIs[id].oracleDelayeds;
        _oracleDelayValues = FDIs[id].oracleDelayValues;
        // _oracleNames = FDIs[id].oracleNames;
    }

    
    function buyFDI(string id) public payable returns (string _ret) {

        if (keccak256(FDIs[id].id) != keccak256(id)) {
            _ret = "FAILURE: ID not found!";
            revert();
        }    
        

        if (keccak256(FDIs[id].status) != keccak256("Open")) {
            _ret = "FAILURE: status is not open!";
            revert();
        }    
        
        FDIs[id].totalCoverageFunds += msg.value;
        FDIs[id].passPremiumAmounts.push(msg.value); 
        FDIs[id].passAddrs.push(msg.sender);
        
        _ret = "SUCESS!";
    }
    
     function inputOracleInfoFDI(string id,bool oracleDelayed,uint oracleDelayValue, 
                                 string oracleName) public payable returns (string _ret) {

        if (keccak256(FDIs[id].id) != keccak256(id)) {
            _ret = "FAILURE: ID not found!";
            revert();
        }    
        

        if (!( (keccak256(FDIs[id].status) == keccak256("Open")) || 
               (keccak256(FDIs[id].status) == keccak256("Reporting")) ) ){
            _ret = "FAILURE: status is not open or repoting!";
            revert();
        }    
        
        FDIs[id].oracleDelayeds.push(oracleDelayed); 
        FDIs[id].oracleDelayValues.push(oracleDelayValue);
        FDIs[id].oracleNames.push(oracleName);
        FDIs[id].status = "Reporting";
        
        if (FDIs[id].oracleNum == FDIs[id].oracleDelayValues.length) {
            _processOracleInputs(id);
        }            

        _ret = "SUCESS!";
    }
    
    function _processOracleInputs(string id) private {
        _processFDICheckDelay(id);   
        _processFDIDelayed(id);
    }    
        
    function _processFDICheckDelay(string id) private {
        uint i;
        uint numOracle;
        uint numDelay;
        uint totalDelay;
        uint _countDelayed;
        uint _countNonDelayed;
        
        numOracle = FDIs[id].oracleNum;
        numDelay = 0;
        totalDelay = 0;
        for (i=0; i < numOracle; i++) {
            if (FDIs[id].oracleDelayeds[i]) {
                numDelay += 1;
            }
            totalDelay += FDIs[id].oracleDelayValues[i];
        }

        _countDelayed = numDelay;
        _countNonDelayed = numOracle - numDelay;

        // case which is tied
        if ( ((numOracle % 2) == 0) &&
              (numOracle == (_countDelayed + _countNonDelayed)) &&
              (_countDelayed == _countDelayed) ) {
            FDIs[id].delayed = true;
            FDIs[id].delay = totalDelay / numDelay;
        }

        if (_countNonDelayed > _countDelayed) {
            FDIs[id].delayed = false;
            FDIs[id].delay = 0;
        } 
        else {
            FDIs[id].delayed = true;
            FDIs[id].delay = totalDelay / numDelay;
        }
        
        FDIs[id].status = "Finalized";

    }

    function _processFDIDelayed(string id) private {
        uint totalNominalPayout;
        uint nominalDelay;
        uint totalPayoutToBePaid;
        uint contractValue;
        uint i;
        uint numPass;
        uint payoutPerPass;
        uint amountPaid;
        
        contractValue = FDIs[id].totalCoverageFunds + FDIs[id].contractFunds;
        // If flight is not delayed return all contract funds to the Insurer
        if (!FDIs[id].delayed) {
            FDIs[id].creator.transfer(contractValue);
            return;
        }
        
        numPass = FDIs[id].passPremiumAmounts.length;
        
        // Calculate the nominal delay considering the cap
        if (FDIs[id].delay > FDIs[id].maxMinutes) {
            nominalDelay = FDIs[id].maxMinutes; 
        }
        else {
            nominalDelay = FDIs[id].delay; 
        }
        
        // calculate the totalPayout
        totalNominalPayout = 0;
        for (i=0; i< numPass; i++) {
            // calculate the payout of each passenger assuming a proportion of his premium paid and premiumFee
            totalNominalPayout += nominalDelay*FDIs[id].valuePerMinute*FDIs[id].passPremiumAmounts[i]/FDIs[id].premiumFee;
        }
        
        // If contract value is lower then the nominal payout, payment is capped on the contract value
        if (totalNominalPayout > contractValue) { 
            totalPayoutToBePaid = contractValue;
        }
        else {
            totalPayoutToBePaid = totalNominalPayout;
        }
        
        // Pay each passenger
        amountPaid = 0;
        if (totalNominalPayout > 0) {
            for (i=0; i < numPass; i++) {
                payoutPerPass = totalPayoutToBePaid * 
                   (nominalDelay*FDIs[id].valuePerMinute*FDIs[id].passPremiumAmounts[i]/FDIs[id].premiumFee)
                   / totalNominalPayout;
                if (payoutPerPass > 0) {
                    FDIs[id].passAddrs[i].transfer(payoutPerPass); 
                    amountPaid += payoutPerPass;
                }
            }
        }

        // Pay the reminder to the Insurer
        if ((contractValue - amountPaid) > 0) {
            FDIs[id].creator.transfer(contractValue - amountPaid);
        }
        
    }
    
}