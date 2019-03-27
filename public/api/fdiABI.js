parametricInsuranceABI = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "id",
				"type": "string"
			}
		],
		"name": "addFundsFDI",
		"outputs": [
			{
				"name": "_ret",
				"type": "string"
			}
		],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "id",
				"type": "string"
			}
		],
		"name": "buyFDI",
		"outputs": [
			{
				"name": "_ret",
				"type": "string"
			}
		],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "id",
				"type": "string"
			}
		],
		"name": "createFDI",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "id",
				"type": "string"
			},
			{
				"name": "oracleDelayed",
				"type": "bool"
			},
			{
				"name": "oracleDelayValue",
				"type": "uint256"
			},
			{
				"name": "oracleName",
				"type": "string"
			}
		],
		"name": "inputOracleInfoFDI",
		"outputs": [
			{
				"name": "_ret",
				"type": "string"
			}
		],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "pOracleNum",
				"type": "uint256"
			},
			{
				"name": "pValuePerMinute",
				"type": "uint256"
			},
			{
				"name": "pMaxMinutes",
				"type": "uint256"
			},
			{
				"name": "pPremiumFee",
				"type": "uint256"
			}
		],
		"name": "setFDIParameters",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getFDIAppParameters",
		"outputs": [
			{
				"name": "rOracleNum",
				"type": "uint256"
			},
			{
				"name": "rValuePerMinute",
				"type": "uint256"
			},
			{
				"name": "rMaxMinutes",
				"type": "uint256"
			},
			{
				"name": "rPremiumFee",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "id",
				"type": "string"
			}
		],
		"name": "getFDIContractParameters",
		"outputs": [
			{
				"name": "rOracleNum",
				"type": "uint256"
			},
			{
				"name": "rValuePerMinute",
				"type": "uint256"
			},
			{
				"name": "rMaxMinutes",
				"type": "uint256"
			},
			{
				"name": "rPremiumFee",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "id",
				"type": "string"
			}
		],
		"name": "getFDIInfo1",
		"outputs": [
			{
				"name": "_id",
				"type": "string"
			},
			{
				"name": "_status",
				"type": "string"
			},
			{
				"name": "_creator",
				"type": "address"
			},
			{
				"name": "_contractFunds",
				"type": "uint256"
			},
			{
				"name": "_totalCoverageFunds",
				"type": "uint256"
			},
			{
				"name": "_passPremiumAmounts",
				"type": "uint256[]"
			},
			{
				"name": "_passAddrs",
				"type": "address[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "id",
				"type": "string"
			}
		],
		"name": "getFDIInfo2",
		"outputs": [
			{
				"name": "_delay",
				"type": "uint256"
			},
			{
				"name": "_delayed",
				"type": "bool"
			},
			{
				"name": "_oracleDelayeds",
				"type": "bool[]"
			},
			{
				"name": "_oracleDelayValues",
				"type": "uint256[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]