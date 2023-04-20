//ConnectWalletButton.tsx
import React from 'react';
import { Button } from 'react-bootstrap';

interface ConnectWalletButtonProps {
  onClick: () => void;
  connected: boolean;
  obfuscatedAddress: string;
}

export const ConnectWalletButton: React.FC<ConnectWalletButtonProps> = ({
  onClick,
  connected,
  obfuscatedAddress,
}) => {
  return (
    <Button className="connect-wallet-btn" onClick={onClick}>
      {connected ? obfuscatedAddress : 'Connect Wallet'}
    </Button>
  );
};

export default ConnectWalletButton;
