//Transactions.tsx
import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';

interface TransactionsProps {
  transactions: { hash: string }[];
}

const Transactions: React.FC<TransactionsProps> = ({ transactions }) => {
  return (
    <Card.Body>
      <h2>Last 10 transactions:</h2>
      <ListGroup>
        {transactions.map((tx, index) => (
          <ListGroup.Item key={index}>
            <a href={`https://testnet.bscscan.com/tx/${tx.hash}`} target="_blank" rel="noopener noreferrer">
              {tx.hash}
            </a>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Card.Body>
  );
};

export default Transactions;
