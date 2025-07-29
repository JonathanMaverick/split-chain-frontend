interface ReceiptItem {
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  priceAfterTax: number;
  priceInHBAR: number;
  friends?: Friend[];
}
