This app is a simple dApp that connects your wallet to the testnet on BSC and displays your last 10 transactions.

Web3 (MetaMask) ───────────────────────────────┐
                                                ▼
App ──────────────────────────────────────────────────────────────────────┐
│     │                              │               │                     │
│  setWeb3                    setAccount      setBalance         setTransactions
│     │                              │               │                     │
▼     │                              ▼               ▼                     ▼
Header ────────┐               ConnectWalletButton    DarkModeToggle       Card
│              │                       │
└── onClickDarkMode ──────┐      onClick ──────┐
                          │                   │
                          ▼                   ▼
                    setDarkMode          loadWeb3
                    toggleDarkMode     connectWallet

In this diagram, the arrows represent the flow of data and actions between the components. The App component manages the state and passes it down to the child components, such as Header, ConnectWalletButton, DarkModeToggle, and Card. The Web3 instance (MetaMask) is connected to the App component, which sets the web3, account, balance, and transactions states. The Header component receives the darkMode state and toggleDarkMode action, while the ConnectWalletButton receives the account state and connectWallet action.