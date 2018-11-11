pragma solidity ^0.4.19;

import "./ownable.sol";
import "./safemath.sol";

contract FactualNews is ownable {

    // Request Status
    uint8 requestStatus; // 

    // Data structures associated to the reviewers
    mapping (address => uint256) funderToAmount;
    uint requestReviewId;


}