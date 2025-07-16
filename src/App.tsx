import { useState } from "react";
import { WalletService } from "./services/walletService";

function App() {
  const [accountId, setAccountId] = useState<string | null>(null);
  const [balance, setBalance] = useState<{
    hbars: string;
  }>();

  const connectWallet = async () => {
    await WalletService.init();

    const checkConnected = setInterval(() => {
      console.log("Checking connection...", WalletService.isConnected());
      if (WalletService.isConnected()) {
        setAccountId(WalletService.getAccountId());
        WalletService.checkBalance().then((res) => setBalance(res));
        clearInterval(checkConnected);
      }
    }, 500);
  };

  const disconnect = async () => {
    await WalletService.disconnect();
    if (!WalletService.isConnected()) {
      setAccountId(null);
    }
  };

  const transfer = async () => {
    WalletService.sendTransaction();
    WalletService.checkBalance().then((res) => setBalance(res));
  };

  return (
    <div>
      <h1>test</h1>
      {accountId ? (
        <p>
          Wallet Connected: <strong>{accountId}</strong>
          <button onClick={disconnect}>Disconnect</button>
          <button onClick={transfer}>Transfer</button>
          {balance && <>Balance: {balance.hbars}</>}
        </p>
      ) : (
        <button onClick={connectWallet}>Connect Wallet</button>
      )}
    </div>
  );
}

export default App;
