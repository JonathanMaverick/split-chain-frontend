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
  name: "ChainLink",
  description: "ChainLink description here",
  icons: [
    "https://avatars.githubusercontent.com/u/114144117?s=400&u=b43effb8c13cfb3971f5dd9f1b10bebbf1e9711c&v=4",
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

  async sendTransaction() {
    let accountIdStr = this.getAccountId();
    if (accountIdStr !== null) {
      const accountId = AccountId.fromString(accountIdStr);
      const signer = hashconnect.getSigner(accountId);

      //TODO: Using backend to create a transaction (Optional)
      let transaction = await new TransferTransaction()
        .addHbarTransfer(accountId, -1)
        .addHbarTransfer("0.0.5166796", 1)
        .freezeWithSigner(signer);

      let response = await transaction.executeWithSigner(signer);
      let receipt = await response.getReceiptWithSigner(signer)

      console.log(receipt);
    }
  },

  async checkBalance() {
    let accountIdStr = this.getAccountId();
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
