This app is a simple dApp that connects your wallet to the testnet on BSC and displays your last 10 transactions.

App component
│
├── useEffect (loadWeb3)
│   │
│   └── Called when the component mounts (empty dependency array)
│       │
│       └── loadWeb3()
│           │
│           ├── Initialize and set Web3 instance
│           │
│           └── Set up listener for account changes
│
└── useEffect (loadAccountData)
    │
    └── Called when 'account' or 'loadAccountData' changes
        │
        └── loadAccountData()
            │
            ├── Fetch account balance
            │
            └── Fetch last 10 transactions
