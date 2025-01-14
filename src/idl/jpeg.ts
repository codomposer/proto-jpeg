export type Jpeg = {
  "version": "0.1.0",
  "name": "jpeg",
  "constants": [
    {
      "name": "PROTOCOL_SEED",
      "type": "bytes",
      "value": "[80, 82, 79, 84, 79, 67, 79, 76]"
    }
  ],
  "instructions": [
    {
      "name": "initializeProtocol",
      "accounts": [
        {
          "name": "protocol",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "InitializeProtocolParams"
          }
        }
      ]
    },
    {
      "name": "updateProtocol",
      "accounts": [
        {
          "name": "protocol",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "UpdateProtocolParams"
          }
        }
      ]
    },
    {
      "name": "createMarket",
      "accounts": [
        {
          "name": "protocol",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "market",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "feeWallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lpTokenMint",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "CreateMarketParams"
          }
        }
      ]
    },
    {
      "name": "updateMarket",
      "accounts": [
        {
          "name": "protocol",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "market",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "UpdateMarketParams"
          }
        }
      ]
    },
    {
      "name": "buyTokens",
      "accounts": [
        {
          "name": "protocol",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "market",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buyer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "feeWallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lpTokenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buyerTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "BuyTokensParams"
          }
        }
      ]
    },
    {
      "name": "sellTokens",
      "accounts": [
        {
          "name": "protocol",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "market",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "seller",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "feeWallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lpTokenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "sellerTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "SellTokensParams"
          }
        }
      ]
    },
    {
      "name": "withdrawFromMarket",
      "accounts": [
        {
          "name": "protocol",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "market",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "backend",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "treasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "closePda",
      "accounts": [
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "pda",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "protocol",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "treasury",
            "type": "publicKey"
          },
          {
            "name": "feeWallet",
            "type": "publicKey"
          },
          {
            "name": "backendWallet",
            "type": "publicKey"
          },
          {
            "name": "minFee",
            "type": "u64"
          },
          {
            "name": "maxFee",
            "type": "u64"
          },
          {
            "name": "creationFee",
            "type": "u64"
          },
          {
            "name": "marketsCount",
            "type": "u64"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "market",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "nftUrl",
            "type": "string"
          },
          {
            "name": "targetPrice",
            "type": "u64"
          },
          {
            "name": "initialSupply",
            "type": "u64"
          },
          {
            "name": "currentSupply",
            "type": "u64"
          },
          {
            "name": "feePercentage",
            "type": "u64"
          },
          {
            "name": "lpTokenMint",
            "type": "publicKey"
          },
          {
            "name": "marketNumber",
            "type": "u64"
          },
          {
            "name": "status",
            "type": "u8"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "BuyTokensParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "amount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "CreateMarketParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "nftUrl",
            "type": "string"
          },
          {
            "name": "targetPrice",
            "type": "u64"
          },
          {
            "name": "initialSupply",
            "type": "u64"
          },
          {
            "name": "feePercentage",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "InitializeProtocolParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "treasury",
            "type": "publicKey"
          },
          {
            "name": "feeWallet",
            "type": "publicKey"
          },
          {
            "name": "backendWallet",
            "type": "publicKey"
          },
          {
            "name": "minFee",
            "type": "u64"
          },
          {
            "name": "maxFee",
            "type": "u64"
          },
          {
            "name": "creationFee",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "UpdateProtocolParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "treasury",
            "type": "publicKey"
          },
          {
            "name": "feeWallet",
            "type": "publicKey"
          },
          {
            "name": "backendWallet",
            "type": "publicKey"
          },
          {
            "name": "minFee",
            "type": "u64"
          },
          {
            "name": "maxFee",
            "type": "u64"
          },
          {
            "name": "creationFee",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "SellTokensParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "amount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "UpdateMarketParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "newTargetPrice",
            "type": {
              "option": "u64"
            }
          },
          {
            "name": "newFeePercentage",
            "type": {
              "option": "u64"
            }
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "Unauthorized",
      "msg": "You are not authorized to perform this action"
    },
    {
      "code": 6001,
      "name": "UnauthorizedFeeWallet",
      "msg": "The provided fee wallet does not match the expected fee wallet."
    },
    {
      "code": 6002,
      "name": "InvalidFeePercentage",
      "msg": "Invalid fee percentage"
    },
    {
      "code": 6003,
      "name": "InvalidNFTUrl",
      "msg": "Invalid NFT URL"
    },
    {
      "code": 6004,
      "name": "Overflow",
      "msg": "Arithmetic overflow"
    },
    {
      "code": 6005,
      "name": "InvalidMarketStatus",
      "msg": "Market is already closed"
    },
    {
      "code": 6006,
      "name": "InvalidPriceCalculation",
      "msg": "Invalid price calculation"
    },
    {
      "code": 6007,
      "name": "UnauthorizedTreasury",
      "msg": "Invalid treasury account"
    },
    {
      "code": 6008,
      "name": "InsufficientMarketBalance",
      "msg": "Market balance must be greater than target price + 10% to withdraw"
    },
    {
      "code": 6009,
      "name": "UnauthorizedBackendWallet",
      "msg": "The provided backend wallet does not match the protocol's authorized backend wallet"
    }
  ]
};

export const IDL: Jpeg = {
  "version": "0.1.0",
  "name": "jpeg",
  "constants": [
    {
      "name": "PROTOCOL_SEED",
      "type": "bytes",
      "value": "[80, 82, 79, 84, 79, 67, 79, 76]"
    }
  ],
  "instructions": [
    {
      "name": "initializeProtocol",
      "accounts": [
        {
          "name": "protocol",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "InitializeProtocolParams"
          }
        }
      ]
    },
    {
      "name": "updateProtocol",
      "accounts": [
        {
          "name": "protocol",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "UpdateProtocolParams"
          }
        }
      ]
    },
    {
      "name": "createMarket",
      "accounts": [
        {
          "name": "protocol",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "market",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "feeWallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lpTokenMint",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "CreateMarketParams"
          }
        }
      ]
    },
    {
      "name": "updateMarket",
      "accounts": [
        {
          "name": "protocol",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "market",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "UpdateMarketParams"
          }
        }
      ]
    },
    {
      "name": "buyTokens",
      "accounts": [
        {
          "name": "protocol",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "market",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buyer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "feeWallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lpTokenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buyerTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "BuyTokensParams"
          }
        }
      ]
    },
    {
      "name": "sellTokens",
      "accounts": [
        {
          "name": "protocol",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "market",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "seller",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "feeWallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lpTokenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "sellerTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "SellTokensParams"
          }
        }
      ]
    },
    {
      "name": "withdrawFromMarket",
      "accounts": [
        {
          "name": "protocol",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "market",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "backend",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "treasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "closePda",
      "accounts": [
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "pda",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "protocol",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "treasury",
            "type": "publicKey"
          },
          {
            "name": "feeWallet",
            "type": "publicKey"
          },
          {
            "name": "backendWallet",
            "type": "publicKey"
          },
          {
            "name": "minFee",
            "type": "u64"
          },
          {
            "name": "maxFee",
            "type": "u64"
          },
          {
            "name": "creationFee",
            "type": "u64"
          },
          {
            "name": "marketsCount",
            "type": "u64"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "market",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "nftUrl",
            "type": "string"
          },
          {
            "name": "targetPrice",
            "type": "u64"
          },
          {
            "name": "initialSupply",
            "type": "u64"
          },
          {
            "name": "currentSupply",
            "type": "u64"
          },
          {
            "name": "feePercentage",
            "type": "u64"
          },
          {
            "name": "lpTokenMint",
            "type": "publicKey"
          },
          {
            "name": "marketNumber",
            "type": "u64"
          },
          {
            "name": "status",
            "type": "u8"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "BuyTokensParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "amount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "CreateMarketParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "nftUrl",
            "type": "string"
          },
          {
            "name": "targetPrice",
            "type": "u64"
          },
          {
            "name": "initialSupply",
            "type": "u64"
          },
          {
            "name": "feePercentage",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "InitializeProtocolParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "treasury",
            "type": "publicKey"
          },
          {
            "name": "feeWallet",
            "type": "publicKey"
          },
          {
            "name": "backendWallet",
            "type": "publicKey"
          },
          {
            "name": "minFee",
            "type": "u64"
          },
          {
            "name": "maxFee",
            "type": "u64"
          },
          {
            "name": "creationFee",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "UpdateProtocolParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "treasury",
            "type": "publicKey"
          },
          {
            "name": "feeWallet",
            "type": "publicKey"
          },
          {
            "name": "backendWallet",
            "type": "publicKey"
          },
          {
            "name": "minFee",
            "type": "u64"
          },
          {
            "name": "maxFee",
            "type": "u64"
          },
          {
            "name": "creationFee",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "SellTokensParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "amount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "UpdateMarketParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "newTargetPrice",
            "type": {
              "option": "u64"
            }
          },
          {
            "name": "newFeePercentage",
            "type": {
              "option": "u64"
            }
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "Unauthorized",
      "msg": "You are not authorized to perform this action"
    },
    {
      "code": 6001,
      "name": "UnauthorizedFeeWallet",
      "msg": "The provided fee wallet does not match the expected fee wallet."
    },
    {
      "code": 6002,
      "name": "InvalidFeePercentage",
      "msg": "Invalid fee percentage"
    },
    {
      "code": 6003,
      "name": "InvalidNFTUrl",
      "msg": "Invalid NFT URL"
    },
    {
      "code": 6004,
      "name": "Overflow",
      "msg": "Arithmetic overflow"
    },
    {
      "code": 6005,
      "name": "InvalidMarketStatus",
      "msg": "Market is already closed"
    },
    {
      "code": 6006,
      "name": "InvalidPriceCalculation",
      "msg": "Invalid price calculation"
    },
    {
      "code": 6007,
      "name": "UnauthorizedTreasury",
      "msg": "Invalid treasury account"
    },
    {
      "code": 6008,
      "name": "InsufficientMarketBalance",
      "msg": "Market balance must be greater than target price + 10% to withdraw"
    },
    {
      "code": 6009,
      "name": "UnauthorizedBackendWallet",
      "msg": "The provided backend wallet does not match the protocol's authorized backend wallet"
    }
  ]
};
