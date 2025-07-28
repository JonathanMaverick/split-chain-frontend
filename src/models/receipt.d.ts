interface Receipt {
  storeName: string;
  date: string;
  tax: number;
  totalAmount: number;
  items: ReceiptItem[];
}
