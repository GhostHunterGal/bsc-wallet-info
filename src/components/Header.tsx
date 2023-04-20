// Header.tsx
import React from 'react';
import { Row, Col } from 'react-bootstrap';
import ConnectWalletButton from './ConnectWalletButton';
import DarkModeToggle from './DarkModeToggle';

interface HeaderProps {
  title: string;
  darkMode: boolean;
  onClickDarkMode: () => void;
  account: string;
  getObfuscatedAddress: (address: string) => string;
  connectWallet: () => void;
}

const Header: React.FC<HeaderProps> = ({
  title,
  darkMode,
  onClickDarkMode,
  account,
  getObfuscatedAddress,
  connectWallet,
}) => {
  return (
    <Row className="justify-content-between align-items-center">
      <Col>
        <h1 className="mb-0">{title}</h1>
      </Col>
      <Col xs="auto">
        <ConnectWalletButton
          onClick={connectWallet}
          connected={account.length > 0}
          obfuscatedAddress={getObfuscatedAddress(account)}
        />
        <DarkModeToggle darkMode={darkMode} onClick={onClickDarkMode} />
      </Col>
    </Row>
  );
};

export default Header;
