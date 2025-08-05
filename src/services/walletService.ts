import {
  AccountBalanceQuery,
  AccountId,
  Client,
  LedgerId,
  TransferTransaction,
} from "@hashgraph/sdk";
import {
  HashConnect,
  HashConnectConnectionState,
  type SessionData,
} from "hashconnect";

const appMetadata = {
  name: "SplitChain",
  description: "Your Split Bills With Crypto",
  icons: [
    "https://rcxelnfhvbqszzccltry.supabase.co/storage/v1/object/sign/logo/SplitChain.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV81MDYxNWEyMi0yMDRlLTQzYzMtYjgwNy1lYTllZGI1YjgzMTMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJsb2dvL1NwbGl0Q2hhaW4ucG5nIiwiaWF0IjoxNzU0MzczNzA1LCJleHAiOjE4MTc0NDU3MDV9.3w7qGG5bAaOJS4b6aTUc_gR3HutrmWRoXIVIDrgoys0",
  ],
  url: "http://localhost:5173/",
};

const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID;

let hashconnect: HashConnect;
let state: HashConnectConnectionState = HashConnectConnectionState.Disconnected;
let pairingData: SessionData | null = null;

export const WalletService = {
  async init() {
    hashconnect = new HashConnect(
      LedgerId.TESTNET,
      projectId,
      appMetadata,
      true
    );

    this.setUpHashConnectEvents();

    await hashconnect.init();

    if (!hashconnect.connectedAccountIds[0]) {
      hashconnect.openPairingModal();
    }
  },

  setUpHashConnectEvents() {
    hashconnect.pairingEvent.on((newPairing) => {
      console.log("Paired:", newPairing);
      pairingData = newPairing;
      localStorage.setItem("wallet_account_id", newPairing.accountIds[0]);
    });

    hashconnect.disconnectionEvent.on(() => {
      console.log("Disconnected");
      state = HashConnectConnectionState.Disconnected;
      pairingData = null;
    });

    hashconnect.connectionStatusChangeEvent.on((connectionStatus) => {
      console.log("Connection state:", connectionStatus);
      state = connectionStatus;
    });
  },

  async disconnect() {
    await hashconnect.disconnect();
  },

  getAccountId(): string | null {
    return pairingData?.accountIds[0] ?? null;
  },

  isConnected(): boolean {
    return state === HashConnectConnectionState.Paired && pairingData !== null;
  },

  async sendTransaction(toAddress: string, amount: number): Promise<string | null> {
    const accountIdStr = this.getAccountId();
    if (accountIdStr !== null) {
      const accountId = AccountId.fromString(accountIdStr);
      const signer = hashconnect.getSigner(accountId);
  
      const transaction = await new TransferTransaction()
        .addHbarTransfer(accountId, -amount)
        .addHbarTransfer(toAddress, amount)
        .freezeWithSigner(signer);
  
      const response = await transaction.executeWithSigner(signer);
      const receipt = await response.getReceiptWithSigner(signer);
  
      console.log("receipt: ", receipt);
      console.log("response: ", response);
      console.log("Transaction ID:", response.transactionId.toString());
  
      return response.transactionId.toString();
    }
  
    return null;
  }
  ,

  async checkBalance() {
    const accountIdStr = this.getAccountId();
    if (accountIdStr !== null) {
      const accountId = AccountId.fromString(accountIdStr);

      const balanceQuery = new AccountBalanceQuery().setAccountId(accountId);
      const client = Client.forTestnet();

      const balance = await balanceQuery.execute(client);

      client.close();
      return {
        hbars: balance.hbars.toString(),
      };
    } else {
      throw new Error("Account Id not found!");
    }
  },
};
