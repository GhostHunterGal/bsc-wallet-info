import React from 'react';
import { Card } from 'react-bootstrap';

interface WalletInfoProps {
  account: string;
  balance: string;
}

const WalletInfo: React.FC<WalletInfoProps> = ({ account, balance }) => {
  return (
    <Card.Header>
      <div className="d-flex justify-content-between align-items-center">
        <p className="mb-0">Address: {account}</p>
        <p className="mb-0">Balance: {balance} BNB</p>
      </div>
    </Card.Header>
  );
};

export default WalletInfo;
