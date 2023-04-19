// App.tsx
import React, { useState, useEffect, useCallback } from 'react';
import Web3 from 'web3';
import axios from 'axios';
import { Container, Row, Col, Card, Button, ListGroup } from 'react-bootstrap';

import './App.css';

const BSCSCAN_API_KEY = process.env.REACT_APP_BSCSCAN_API_KEY || '';
const BSCSCAN_API_BASE_URL = process.env.REACT_APP_BSCSCAN_API_BASE_URL;
const BSCSCAN_API_MODULE = 'account';

interface Transaction {
  hash: string;
}

export const App: React.FC = () => {
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [account, setAccount] = useState<string>('');
  const [balance, setBalance] = useState<string>('0');
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [darkMode, setDarkMode] = useState<boolean>(false);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        setAccount(accounts[0]);
      } catch (error) {
        console.error('User denied account access');
      }
    } else {
      console.error('No Ethereum provider found. Install MetaMask.');
    }
  };

  const loadWeb3 = async () => {
    if (window.ethereum) {
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);

      // Add this code to listen for account changes
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        setAccount(accounts[0]);
      });
    } else {
      console.error('No Ethereum provider found. Install MetaMask.');
    }
  };

  const loadAccountData = useCallback(async () => {
    if (web3 && account) {
      const balance = await web3.eth.getBalance(account);
      setBalance(web3.utils.fromWei(balance, 'ether'));

      const txListResponse = await axios.get(
        `${BSCSCAN_API_BASE_URL}?module=${BSCSCAN_API_MODULE}&action=txlist&address=${account}&startblock=1&endblock=latest&sort=desc&apikey=${BSCSCAN_API_KEY}`
      );

      if (txListResponse.data.result) {
        const txList = txListResponse.data.result.slice(0, 10);
        setTransactions(txList);
      } else {
        console.error('Failed to fetch transactions. Please check the BSCSCAN_API_KEY and try again.');
      }
    }
  }, [web3, account]);

  useEffect(() => {
    loadWeb3();
  }, []);

  useEffect(() => {
    loadAccountData();
  }, [account, loadAccountData]);

  return (
    <div className={`app ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className="app-wrapper">
        <Container>
          <Row className="justify-content-between align-items-center">
            <Col>
              <h1 className="mb-0">BSC Wallet Info</h1>
            </Col>
            <Col xs="auto">
              <Button className="connect-wallet-btn" onClick={connectWallet}>
                Connect Wallet
              </Button>
            </Col>
            <Col xs="auto">
              <Button
                className={`toggle-dark-mode-btn ${darkMode ? 'dark-mode-icon' : 'light-mode-icon'}`}
                onClick={toggleDarkMode}
              >
                {darkMode ? '🌞' : '🌙'}
              </Button>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col md={8}>
              <Card className="mt-5">
                <Card.Header>
                  <div className="d-flex justify-content-between align-items-center">
                    <p className="mb-0">Address: {account}</p>
                    <p className="mb-0">Balance: {balance} BNB</p>
                  </div>
                </Card.Header>
                <Card.Body>
                  <h2>Last 10 transactions:</h2>
                  <ListGroup>
                    {transactions.map((tx, index) => (
                      <ListGroup.Item key={index}>
                        <a
                          href={`https://testnet.bscscan.com/tx/${tx.hash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {tx.hash}
                        </a>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default App;