const metadata_psp22 = {
  "source": {
    "hash": "0x0aedeeccb1ce02c852cc0aa2b78d26837d464fa93857123fd726ca52a9a6b364",
    "language": "ink! 4.3.0",
    "compiler": "rustc 1.70.0-nightly",
    "build_info": {
      "build_mode": "Release",
      "cargo_contract_version": "2.2.1",
      "rust_toolchain": "nightly-x86_64-unknown-linux-gnu",
      "wasm_opt_settings": {
        "keep_debug_symbols": false,
        "optimization_passes": "Z"
      }
    }
  },
  "contract": {
    "name": "base_token",
    "version": "1.0.0",
    "authors": [
      "Irfi M. <mrizkyirfianto@gmail.com>"
    ]
  },
  "spec": {
    "constructors": [
      {
        "args": [
          {
            "label": "initial_supply",
            "type": {
              "displayName": [
                "Balance"
              ],
              "type": 0
            }
          },
          {
            "label": "name",
            "type": {
              "displayName": [
                "Option"
              ],
              "type": 8
            }
          },
          {
            "label": "symbol",
            "type": {
              "displayName": [
                "Option"
              ],
              "type": 8
            }
          },
          {
            "label": "decimals",
            "type": {
              "displayName": [
                "u8"
              ],
              "type": 3
            }
          },
          {
            "label": "is_pausable",
            "type": {
              "displayName": [
                "bool"
              ],
              "type": 4
            }
          },
          {
            "label": "is_mintable",
            "type": {
              "displayName": [
                "bool"
              ],
              "type": 4
            }
          },
          {
            "label": "is_burnable",
            "type": {
              "displayName": [
                "bool"
              ],
              "type": 4
            }
          },
          {
            "label": "is_sale",
            "type": {
              "displayName": [
                "bool"
              ],
              "type": 4
            }
          }
        ],
        "default": false,
        "docs": [],
        "label": "new",
        "payable": false,
        "returnType": {
          "displayName": [
            "ink_primitives",
            "ConstructorResult"
          ],
          "type": 9
        },
        "selector": "0x9bae9d5e"
      }
    ],
    "docs": [],
    "environment": {
      "accountId": {
        "displayName": [
          "AccountId"
        ],
        "type": 5
      },
      "balance": {
        "displayName": [
          "Balance"
        ],
        "type": 0
      },
      "blockNumber": {
        "displayName": [
          "BlockNumber"
        ],
        "type": 25
      },
      "chainExtension": {
        "displayName": [
          "ChainExtension"
        ],
        "type": 26
      },
      "hash": {
        "displayName": [
          "Hash"
        ],
        "type": 24
      },
      "maxEventTopics": 4,
      "timestamp": {
        "displayName": [
          "Timestamp"
        ],
        "type": 7
      }
    },
    "events": [
      {
        "args": [
          {
            "docs": [],
            "indexed": false,
            "label": "sale_rate",
            "type": {
              "displayName": [
                "Balance"
              ],
              "type": 0
            }
          },
          {
            "docs": [],
            "indexed": false,
            "label": "max_supply",
            "type": {
              "displayName": [
                "Balance"
              ],
              "type": 0
            }
          },
          {
            "docs": [],
            "indexed": false,
            "label": "start_at",
            "type": {
              "displayName": [
                "Timestamp"
              ],
              "type": 7
            }
          },
          {
            "docs": [],
            "indexed": false,
            "label": "end_at",
            "type": {
              "displayName": [
                "Timestamp"
              ],
              "type": 7
            }
          }
        ],
        "docs": [],
        "label": "SetSaleOptions"
      },
      {
        "args": [
          {
            "docs": [],
            "indexed": true,
            "label": "receiver_address",
            "type": {
              "displayName": [
                "AccountId"
              ],
              "type": 5
            }
          },
          {
            "docs": [],
            "indexed": true,
            "label": "amount",
            "type": {
              "displayName": [
                "Balance"
              ],
              "type": 0
            }
          }
        ],
        "docs": [],
        "label": "TokenBought"
      }
    ],
    "lang_error": {
      "displayName": [
        "ink",
        "LangError"
      ],
      "type": 10
    },
    "messages": [
      {
        "args": [],
        "default": false,
        "docs": [],
        "label": "get_is_sale",
        "mutates": false,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 11
        },
        "selector": "0x8c66749f"
      },
      {
        "args": [],
        "default": false,
        "docs": [],
        "label": "get_is_pausable",
        "mutates": false,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 11
        },
        "selector": "0xc64ffeb2"
      },
      {
        "args": [],
        "default": false,
        "docs": [],
        "label": "get_is_mintable",
        "mutates": false,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 11
        },
        "selector": "0x61234c15"
      },
      {
        "args": [],
        "default": false,
        "docs": [],
        "label": "get_is_burnable",
        "mutates": false,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 11
        },
        "selector": "0xd0e5ffcd"
      },
      {
        "args": [],
        "default": false,
        "docs": [],
        "label": "get_sale_rate",
        "mutates": false,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 14
        },
        "selector": "0xf14df3d6"
      },
      {
        "args": [],
        "default": false,
        "docs": [],
        "label": "get_start_at",
        "mutates": false,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 16
        },
        "selector": "0x48b8cae5"
      },
      {
        "args": [],
        "default": false,
        "docs": [],
        "label": "get_end_at",
        "mutates": false,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 16
        },
        "selector": "0x21ec4ab8"
      },
      {
        "args": [],
        "default": false,
        "docs": [],
        "label": "get_max_supply",
        "mutates": false,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 14
        },
        "selector": "0x62032e0e"
      },
      {
        "args": [
          {
            "label": "sale_rate",
            "type": {
              "displayName": [
                "Balance"
              ],
              "type": 0
            }
          },
          {
            "label": "max_supply",
            "type": {
              "displayName": [
                "Balance"
              ],
              "type": 0
            }
          },
          {
            "label": "start_at",
            "type": {
              "displayName": [
                "Timestamp"
              ],
              "type": 7
            }
          },
          {
            "label": "end_at",
            "type": {
              "displayName": [
                "Timestamp"
              ],
              "type": 7
            }
          }
        ],
        "default": false,
        "docs": [],
        "label": "set_sale_options",
        "mutates": true,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 18
        },
        "selector": "0xce1a7031"
      },
      {
        "args": [],
        "default": false,
        "docs": [],
        "label": "buy",
        "mutates": true,
        "payable": true,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 14
        },
        "selector": "0x15d62801"
      },
      {
        "args": [],
        "default": false,
        "docs": [],
        "label": "change_state",
        "mutates": true,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 18
        },
        "selector": "0x300f90c8"
      },
      {
        "args": [
          {
            "label": "account",
            "type": {
              "displayName": [
                "AccountId"
              ],
              "type": 5
            }
          },
          {
            "label": "amount",
            "type": {
              "displayName": [
                "Balance"
              ],
              "type": 0
            }
          }
        ],
        "default": false,
        "docs": [],
        "label": "mint_to",
        "mutates": true,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 18
        },
        "selector": "0x1d2f13c5"
      },
      {
        "args": [
          {
            "label": "amount",
            "type": {
              "displayName": [
                "Balance"
              ],
              "type": 0
            }
          }
        ],
        "default": false,
        "docs": [],
        "label": "burn",
        "mutates": true,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 18
        },
        "selector": "0xb1efc17b"
      },
      {
        "args": [
          {
            "label": "to",
            "type": {
              "displayName": [
                "psp22_external",
                "TransferInput1"
              ],
              "type": 5
            }
          },
          {
            "label": "value",
            "type": {
              "displayName": [
                "psp22_external",
                "TransferInput2"
              ],
              "type": 0
            }
          },
          {
            "label": "data",
            "type": {
              "displayName": [
                "psp22_external",
                "TransferInput3"
              ],
              "type": 2
            }
          }
        ],
        "default": false,
        "docs": [
          " Transfers `value` amount of tokens from the caller's account to account `to`",
          " with additional `data` in unspecified format.",
          "",
          " On success a `Transfer` event is emitted.",
          "",
          " # Errors",
          "",
          " Returns `InsufficientBalance` error if there are not enough tokens on",
          " the caller's account Balance.",
          "",
          " Returns `ZeroSenderAddress` error if sender's address is zero.",
          "",
          " Returns `ZeroRecipientAddress` error if recipient's address is zero."
        ],
        "label": "PSP22::transfer",
        "mutates": true,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 18
        },
        "selector": "0xdb20f9f5"
      },
      {
        "args": [],
        "default": false,
        "docs": [
          " Returns the total token supply."
        ],
        "label": "PSP22::total_supply",
        "mutates": false,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 20
        },
        "selector": "0x162df8c2"
      },
      {
        "args": [
          {
            "label": "owner",
            "type": {
              "displayName": [
                "psp22_external",
                "AllowanceInput1"
              ],
              "type": 5
            }
          },
          {
            "label": "spender",
            "type": {
              "displayName": [
                "psp22_external",
                "AllowanceInput2"
              ],
              "type": 5
            }
          }
        ],
        "default": false,
        "docs": [
          " Returns the amount which `spender` is still allowed to withdraw from `owner`.",
          "",
          " Returns `0` if no allowance has been set `0`."
        ],
        "label": "PSP22::allowance",
        "mutates": false,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 20
        },
        "selector": "0x4d47d921"
      },
      {
        "args": [
          {
            "label": "from",
            "type": {
              "displayName": [
                "psp22_external",
                "TransferFromInput1"
              ],
              "type": 5
            }
          },
          {
            "label": "to",
            "type": {
              "displayName": [
                "psp22_external",
                "TransferFromInput2"
              ],
              "type": 5
            }
          },
          {
            "label": "value",
            "type": {
              "displayName": [
                "psp22_external",
                "TransferFromInput3"
              ],
              "type": 0
            }
          },
          {
            "label": "data",
            "type": {
              "displayName": [
                "psp22_external",
                "TransferFromInput4"
              ],
              "type": 2
            }
          }
        ],
        "default": false,
        "docs": [
          " Transfers `value` tokens on the behalf of `from` to the account `to`",
          " with additional `data` in unspecified format.",
          "",
          " This can be used to allow a contract to transfer tokens on ones behalf and/or",
          " to charge fees in sub-currencies, for example.",
          "",
          " On success a `Transfer` and `Approval` events are emitted.",
          "",
          " # Errors",
          "",
          " Returns `InsufficientAllowance` error if there are not enough tokens allowed",
          " for the caller to withdraw from `from`.",
          "",
          " Returns `InsufficientBalance` error if there are not enough tokens on",
          " the the account Balance of `from`.",
          "",
          " Returns `ZeroSenderAddress` error if sender's address is zero.",
          "",
          " Returns `ZeroRecipientAddress` error if recipient's address is zero."
        ],
        "label": "PSP22::transfer_from",
        "mutates": true,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 18
        },
        "selector": "0x54b3c76e"
      },
      {
        "args": [
          {
            "label": "spender",
            "type": {
              "displayName": [
                "psp22_external",
                "DecreaseAllowanceInput1"
              ],
              "type": 5
            }
          },
          {
            "label": "delta_value",
            "type": {
              "displayName": [
                "psp22_external",
                "DecreaseAllowanceInput2"
              ],
              "type": 0
            }
          }
        ],
        "default": false,
        "docs": [
          " Atomically decreases the allowance granted to `spender` by the caller.",
          "",
          " An `Approval` event is emitted.",
          "",
          " # Errors",
          "",
          " Returns `InsufficientAllowance` error if there are not enough tokens allowed",
          " by owner for `spender`.",
          "",
          " Returns `ZeroSenderAddress` error if sender's address is zero.",
          "",
          " Returns `ZeroRecipientAddress` error if recipient's address is zero."
        ],
        "label": "PSP22::decrease_allowance",
        "mutates": true,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 18
        },
        "selector": "0xfecb57d5"
      },
      {
        "args": [
          {
            "label": "spender",
            "type": {
              "displayName": [
                "psp22_external",
                "IncreaseAllowanceInput1"
              ],
              "type": 5
            }
          },
          {
            "label": "delta_value",
            "type": {
              "displayName": [
                "psp22_external",
                "IncreaseAllowanceInput2"
              ],
              "type": 0
            }
          }
        ],
        "default": false,
        "docs": [
          " Atomically increases the allowance granted to `spender` by the caller.",
          "",
          " An `Approval` event is emitted.",
          "",
          " # Errors",
          "",
          " Returns `ZeroSenderAddress` error if sender's address is zero.",
          "",
          " Returns `ZeroRecipientAddress` error if recipient's address is zero."
        ],
        "label": "PSP22::increase_allowance",
        "mutates": true,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 18
        },
        "selector": "0x96d6b57a"
      },
      {
        "args": [
          {
            "label": "owner",
            "type": {
              "displayName": [
                "psp22_external",
                "BalanceOfInput1"
              ],
              "type": 5
            }
          }
        ],
        "default": false,
        "docs": [
          " Returns the account Balance for the specified `owner`.",
          "",
          " Returns `0` if the account is non-existent."
        ],
        "label": "PSP22::balance_of",
        "mutates": false,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 20
        },
        "selector": "0x6568382f"
      },
      {
        "args": [
          {
            "label": "spender",
            "type": {
              "displayName": [
                "psp22_external",
                "ApproveInput1"
              ],
              "type": 5
            }
          },
          {
            "label": "value",
            "type": {
              "displayName": [
                "psp22_external",
                "ApproveInput2"
              ],
              "type": 0
            }
          }
        ],
        "default": false,
        "docs": [
          " Allows `spender` to withdraw from the caller's account multiple times, up to",
          " the `value` amount.",
          "",
          " If this function is called again it overwrites the current allowance with `value`.",
          "",
          " An `Approval` event is emitted.",
          "",
          " # Errors",
          "",
          " Returns `ZeroSenderAddress` error if sender's address is zero.",
          "",
          " Returns `ZeroRecipientAddress` error if recipient's address is zero."
        ],
        "label": "PSP22::approve",
        "mutates": true,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 18
        },
        "selector": "0xb20f1bbd"
      },
      {
        "args": [],
        "default": false,
        "docs": [
          " Returns the token name."
        ],
        "label": "PSP22Metadata::token_name",
        "mutates": false,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 21
        },
        "selector": "0x3d261bd4"
      },
      {
        "args": [],
        "default": false,
        "docs": [
          " Returns the token symbol."
        ],
        "label": "PSP22Metadata::token_symbol",
        "mutates": false,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 21
        },
        "selector": "0x34205be5"
      },
      {
        "args": [],
        "default": false,
        "docs": [
          " Returns the token decimals."
        ],
        "label": "PSP22Metadata::token_decimals",
        "mutates": false,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 22
        },
        "selector": "0x7271b782"
      },
      {
        "args": [],
        "default": false,
        "docs": [
          " Returns true if the contract is paused, and false otherwise."
        ],
        "label": "Pausable::paused",
        "mutates": false,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 23
        },
        "selector": "0xd123ce11"
      }
    ]
  },
  "storage": {
    "root": {
      "layout": {
        "struct": {
          "fields": [
            {
              "layout": {
                "struct": {
                  "fields": [
                    {
                      "layout": {
                        "leaf": {
                          "key": "0x00000000",
                          "ty": 0
                        }
                      },
                      "name": "supply"
                    },
                    {
                      "layout": {
                        "root": {
                          "layout": {
                            "leaf": {
                              "key": "0x1d458d3b",
                              "ty": 0
                            }
                          },
                          "root_key": "0x1d458d3b"
                        }
                      },
                      "name": "balances"
                    },
                    {
                      "layout": {
                        "root": {
                          "layout": {
                            "leaf": {
                              "key": "0x0abd72fb",
                              "ty": 0
                            }
                          },
                          "root_key": "0x0abd72fb"
                        }
                      },
                      "name": "allowances"
                    },
                    {
                      "layout": {
                        "enum": {
                          "dispatchKey": "0x00000000",
                          "name": "Option",
                          "variants": {
                            "0": {
                              "fields": [],
                              "name": "None"
                            },
                            "1": {
                              "fields": [
                                {
                                  "layout": {
                                    "leaf": {
                                      "key": "0x00000000",
                                      "ty": 1
                                    }
                                  },
                                  "name": "0"
                                }
                              ],
                              "name": "Some"
                            }
                          }
                        }
                      },
                      "name": "_reserved"
                    }
                  ],
                  "name": "Data"
                }
              },
              "name": "psp22"
            },
            {
              "layout": {
                "struct": {
                  "fields": [
                    {
                      "layout": {
                        "enum": {
                          "dispatchKey": "0x00000000",
                          "name": "Option",
                          "variants": {
                            "0": {
                              "fields": [],
                              "name": "None"
                            },
                            "1": {
                              "fields": [
                                {
                                  "layout": {
                                    "leaf": {
                                      "key": "0x00000000",
                                      "ty": 2
                                    }
                                  },
                                  "name": "0"
                                }
                              ],
                              "name": "Some"
                            }
                          }
                        }
                      },
                      "name": "name"
                    },
                    {
                      "layout": {
                        "enum": {
                          "dispatchKey": "0x00000000",
                          "name": "Option",
                          "variants": {
                            "0": {
                              "fields": [],
                              "name": "None"
                            },
                            "1": {
                              "fields": [
                                {
                                  "layout": {
                                    "leaf": {
                                      "key": "0x00000000",
                                      "ty": 2
                                    }
                                  },
                                  "name": "0"
                                }
                              ],
                              "name": "Some"
                            }
                          }
                        }
                      },
                      "name": "symbol"
                    },
                    {
                      "layout": {
                        "leaf": {
                          "key": "0x00000000",
                          "ty": 3
                        }
                      },
                      "name": "decimals"
                    },
                    {
                      "layout": {
                        "enum": {
                          "dispatchKey": "0x00000000",
                          "name": "Option",
                          "variants": {
                            "0": {
                              "fields": [],
                              "name": "None"
                            },
                            "1": {
                              "fields": [
                                {
                                  "layout": {
                                    "leaf": {
                                      "key": "0x00000000",
                                      "ty": 1
                                    }
                                  },
                                  "name": "0"
                                }
                              ],
                              "name": "Some"
                            }
                          }
                        }
                      },
                      "name": "_reserved"
                    }
                  ],
                  "name": "Data"
                }
              },
              "name": "metadata"
            },
            {
              "layout": {
                "struct": {
                  "fields": [
                    {
                      "layout": {
                        "leaf": {
                          "key": "0x00000000",
                          "ty": 4
                        }
                      },
                      "name": "is_pausable"
                    },
                    {
                      "layout": {
                        "leaf": {
                          "key": "0x00000000",
                          "ty": 4
                        }
                      },
                      "name": "is_mintable"
                    },
                    {
                      "layout": {
                        "leaf": {
                          "key": "0x00000000",
                          "ty": 4
                        }
                      },
                      "name": "is_burnable"
                    },
                    {
                      "layout": {
                        "enum": {
                          "dispatchKey": "0x00000000",
                          "name": "Option",
                          "variants": {
                            "0": {
                              "fields": [],
                              "name": "None"
                            },
                            "1": {
                              "fields": [
                                {
                                  "layout": {
                                    "leaf": {
                                      "key": "0x00000000",
                                      "ty": 5
                                    }
                                  },
                                  "name": "0"
                                }
                              ],
                              "name": "Some"
                            }
                          }
                        }
                      },
                      "name": "owner_addresss"
                    },
                    {
                      "layout": {
                        "leaf": {
                          "key": "0x00000000",
                          "ty": 4
                        }
                      },
                      "name": "is_sale"
                    },
                    {
                      "layout": {
                        "enum": {
                          "dispatchKey": "0x00000000",
                          "name": "Option",
                          "variants": {
                            "0": {
                              "fields": [],
                              "name": "None"
                            },
                            "1": {
                              "fields": [
                                {
                                  "layout": {
                                    "leaf": {
                                      "key": "0x00000000",
                                      "ty": 0
                                    }
                                  },
                                  "name": "0"
                                }
                              ],
                              "name": "Some"
                            }
                          }
                        }
                      },
                      "name": "sale_rate"
                    },
                    {
                      "layout": {
                        "enum": {
                          "dispatchKey": "0x00000000",
                          "name": "Option",
                          "variants": {
                            "0": {
                              "fields": [],
                              "name": "None"
                            },
                            "1": {
                              "fields": [
                                {
                                  "layout": {
                                    "leaf": {
                                      "key": "0x00000000",
                                      "ty": 0
                                    }
                                  },
                                  "name": "0"
                                }
                              ],
                              "name": "Some"
                            }
                          }
                        }
                      },
                      "name": "max_supply"
                    },
                    {
                      "layout": {
                        "enum": {
                          "dispatchKey": "0x00000000",
                          "name": "Option",
                          "variants": {
                            "0": {
                              "fields": [],
                              "name": "None"
                            },
                            "1": {
                              "fields": [
                                {
                                  "layout": {
                                    "leaf": {
                                      "key": "0x00000000",
                                      "ty": 7
                                    }
                                  },
                                  "name": "0"
                                }
                              ],
                              "name": "Some"
                            }
                          }
                        }
                      },
                      "name": "start_at"
                    },
                    {
                      "layout": {
                        "enum": {
                          "dispatchKey": "0x00000000",
                          "name": "Option",
                          "variants": {
                            "0": {
                              "fields": [],
                              "name": "None"
                            },
                            "1": {
                              "fields": [
                                {
                                  "layout": {
                                    "leaf": {
                                      "key": "0x00000000",
                                      "ty": 7
                                    }
                                  },
                                  "name": "0"
                                }
                              ],
                              "name": "Some"
                            }
                          }
                        }
                      },
                      "name": "end_at"
                    }
                  ],
                  "name": "EnabledFeatures"
                }
              },
              "name": "features"
            },
            {
              "layout": {
                "struct": {
                  "fields": [
                    {
                      "layout": {
                        "leaf": {
                          "key": "0x00000000",
                          "ty": 4
                        }
                      },
                      "name": "paused"
                    },
                    {
                      "layout": {
                        "enum": {
                          "dispatchKey": "0x00000000",
                          "name": "Option",
                          "variants": {
                            "0": {
                              "fields": [],
                              "name": "None"
                            },
                            "1": {
                              "fields": [
                                {
                                  "layout": {
                                    "leaf": {
                                      "key": "0x00000000",
                                      "ty": 1
                                    }
                                  },
                                  "name": "0"
                                }
                              ],
                              "name": "Some"
                            }
                          }
                        }
                      },
                      "name": "_reserved"
                    }
                  ],
                  "name": "Data"
                }
              },
              "name": "pause"
            }
          ],
          "name": "Contract"
        }
      },
      "root_key": "0x00000000"
    }
  },
  "types": [
    {
      "id": 0,
      "type": {
        "def": {
          "primitive": "u128"
        }
      }
    },
    {
      "id": 1,
      "type": {
        "def": {
          "tuple": []
        }
      }
    },
    {
      "id": 2,
      "type": {
        "def": {
          "sequence": {
            "type": 3
          }
        }
      }
    },
    {
      "id": 3,
      "type": {
        "def": {
          "primitive": "u8"
        }
      }
    },
    {
      "id": 4,
      "type": {
        "def": {
          "primitive": "bool"
        }
      }
    },
    {
      "id": 5,
      "type": {
        "def": {
          "composite": {
            "fields": [
              {
                "type": 6,
                "typeName": "[u8; 32]"
              }
            ]
          }
        },
        "path": [
          "ink_primitives",
          "types",
          "AccountId"
        ]
      }
    },
    {
      "id": 6,
      "type": {
        "def": {
          "array": {
            "len": 32,
            "type": 3
          }
        }
      }
    },
    {
      "id": 7,
      "type": {
        "def": {
          "primitive": "u64"
        }
      }
    },
    {
      "id": 8,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "index": 0,
                "name": "None"
              },
              {
                "fields": [
                  {
                    "type": 2
                  }
                ],
                "index": 1,
                "name": "Some"
              }
            ]
          }
        },
        "params": [
          {
            "name": "T",
            "type": 2
          }
        ],
        "path": [
          "Option"
        ]
      }
    },
    {
      "id": 9,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "fields": [
                  {
                    "type": 1
                  }
                ],
                "index": 0,
                "name": "Ok"
              },
              {
                "fields": [
                  {
                    "type": 10
                  }
                ],
                "index": 1,
                "name": "Err"
              }
            ]
          }
        },
        "params": [
          {
            "name": "T",
            "type": 1
          },
          {
            "name": "E",
            "type": 10
          }
        ],
        "path": [
          "Result"
        ]
      }
    },
    {
      "id": 10,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "index": 1,
                "name": "CouldNotReadInput"
              }
            ]
          }
        },
        "path": [
          "ink_primitives",
          "LangError"
        ]
      }
    },
    {
      "id": 11,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "fields": [
                  {
                    "type": 12
                  }
                ],
                "index": 0,
                "name": "Ok"
              },
              {
                "fields": [
                  {
                    "type": 10
                  }
                ],
                "index": 1,
                "name": "Err"
              }
            ]
          }
        },
        "params": [
          {
            "name": "T",
            "type": 12
          },
          {
            "name": "E",
            "type": 10
          }
        ],
        "path": [
          "Result"
        ]
      }
    },
    {
      "id": 12,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "fields": [
                  {
                    "type": 4
                  }
                ],
                "index": 0,
                "name": "Ok"
              },
              {
                "fields": [
                  {
                    "type": 13
                  }
                ],
                "index": 1,
                "name": "Err"
              }
            ]
          }
        },
        "params": [
          {
            "name": "T",
            "type": 4
          },
          {
            "name": "E",
            "type": 13
          }
        ],
        "path": [
          "Result"
        ]
      }
    },
    {
      "id": 13,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "fields": [
                  {
                    "type": 2,
                    "typeName": "String"
                  }
                ],
                "index": 0,
                "name": "Custom"
              },
              {
                "index": 1,
                "name": "InsufficientBalance"
              },
              {
                "index": 2,
                "name": "InsufficientAllowance"
              },
              {
                "index": 3,
                "name": "ZeroRecipientAddress"
              },
              {
                "index": 4,
                "name": "ZeroSenderAddress"
              },
              {
                "fields": [
                  {
                    "type": 2,
                    "typeName": "String"
                  }
                ],
                "index": 5,
                "name": "SafeTransferCheckFailed"
              }
            ]
          }
        },
        "path": [
          "openbrush_contracts",
          "traits",
          "errors",
          "psp22",
          "PSP22Error"
        ]
      }
    },
    {
      "id": 14,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "fields": [
                  {
                    "type": 15
                  }
                ],
                "index": 0,
                "name": "Ok"
              },
              {
                "fields": [
                  {
                    "type": 10
                  }
                ],
                "index": 1,
                "name": "Err"
              }
            ]
          }
        },
        "params": [
          {
            "name": "T",
            "type": 15
          },
          {
            "name": "E",
            "type": 10
          }
        ],
        "path": [
          "Result"
        ]
      }
    },
    {
      "id": 15,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "fields": [
                  {
                    "type": 0
                  }
                ],
                "index": 0,
                "name": "Ok"
              },
              {
                "fields": [
                  {
                    "type": 13
                  }
                ],
                "index": 1,
                "name": "Err"
              }
            ]
          }
        },
        "params": [
          {
            "name": "T",
            "type": 0
          },
          {
            "name": "E",
            "type": 13
          }
        ],
        "path": [
          "Result"
        ]
      }
    },
    {
      "id": 16,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "fields": [
                  {
                    "type": 17
                  }
                ],
                "index": 0,
                "name": "Ok"
              },
              {
                "fields": [
                  {
                    "type": 10
                  }
                ],
                "index": 1,
                "name": "Err"
              }
            ]
          }
        },
        "params": [
          {
            "name": "T",
            "type": 17
          },
          {
            "name": "E",
            "type": 10
          }
        ],
        "path": [
          "Result"
        ]
      }
    },
    {
      "id": 17,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "fields": [
                  {
                    "type": 7
                  }
                ],
                "index": 0,
                "name": "Ok"
              },
              {
                "fields": [
                  {
                    "type": 13
                  }
                ],
                "index": 1,
                "name": "Err"
              }
            ]
          }
        },
        "params": [
          {
            "name": "T",
            "type": 7
          },
          {
            "name": "E",
            "type": 13
          }
        ],
        "path": [
          "Result"
        ]
      }
    },
    {
      "id": 18,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "fields": [
                  {
                    "type": 19
                  }
                ],
                "index": 0,
                "name": "Ok"
              },
              {
                "fields": [
                  {
                    "type": 10
                  }
                ],
                "index": 1,
                "name": "Err"
              }
            ]
          }
        },
        "params": [
          {
            "name": "T",
            "type": 19
          },
          {
            "name": "E",
            "type": 10
          }
        ],
        "path": [
          "Result"
        ]
      }
    },
    {
      "id": 19,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "fields": [
                  {
                    "type": 1
                  }
                ],
                "index": 0,
                "name": "Ok"
              },
              {
                "fields": [
                  {
                    "type": 13
                  }
                ],
                "index": 1,
                "name": "Err"
              }
            ]
          }
        },
        "params": [
          {
            "name": "T",
            "type": 1
          },
          {
            "name": "E",
            "type": 13
          }
        ],
        "path": [
          "Result"
        ]
      }
    },
    {
      "id": 20,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "fields": [
                  {
                    "type": 0
                  }
                ],
                "index": 0,
                "name": "Ok"
              },
              {
                "fields": [
                  {
                    "type": 10
                  }
                ],
                "index": 1,
                "name": "Err"
              }
            ]
          }
        },
        "params": [
          {
            "name": "T",
            "type": 0
          },
          {
            "name": "E",
            "type": 10
          }
        ],
        "path": [
          "Result"
        ]
      }
    },
    {
      "id": 21,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "fields": [
                  {
                    "type": 8
                  }
                ],
                "index": 0,
                "name": "Ok"
              },
              {
                "fields": [
                  {
                    "type": 10
                  }
                ],
                "index": 1,
                "name": "Err"
              }
            ]
          }
        },
        "params": [
          {
            "name": "T",
            "type": 8
          },
          {
            "name": "E",
            "type": 10
          }
        ],
        "path": [
          "Result"
        ]
      }
    },
    {
      "id": 22,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "fields": [
                  {
                    "type": 3
                  }
                ],
                "index": 0,
                "name": "Ok"
              },
              {
                "fields": [
                  {
                    "type": 10
                  }
                ],
                "index": 1,
                "name": "Err"
              }
            ]
          }
        },
        "params": [
          {
            "name": "T",
            "type": 3
          },
          {
            "name": "E",
            "type": 10
          }
        ],
        "path": [
          "Result"
        ]
      }
    },
    {
      "id": 23,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "fields": [
                  {
                    "type": 4
                  }
                ],
                "index": 0,
                "name": "Ok"
              },
              {
                "fields": [
                  {
                    "type": 10
                  }
                ],
                "index": 1,
                "name": "Err"
              }
            ]
          }
        },
        "params": [
          {
            "name": "T",
            "type": 4
          },
          {
            "name": "E",
            "type": 10
          }
        ],
        "path": [
          "Result"
        ]
      }
    },
    {
      "id": 24,
      "type": {
        "def": {
          "composite": {
            "fields": [
              {
                "type": 6,
                "typeName": "[u8; 32]"
              }
            ]
          }
        },
        "path": [
          "ink_primitives",
          "types",
          "Hash"
        ]
      }
    },
    {
      "id": 25,
      "type": {
        "def": {
          "primitive": "u32"
        }
      }
    },
    {
      "id": 26,
      "type": {
        "def": {
          "variant": {}
        },
        "path": [
          "ink_env",
          "types",
          "NoChainExtension"
        ]
      }
    }
  ],
  "version": "4"
}

export default metadata_psp22