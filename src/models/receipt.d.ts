interface Receipt {
  billId?: string;
  storeName: string;
  billDate: string;
  tax: number;
  service?: number;
  totalAmount: number;
  items: ReceiptItem[];
  creatorId: string;
}
