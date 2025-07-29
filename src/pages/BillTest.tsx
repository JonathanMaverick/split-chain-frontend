import { useState } from "react";
import Bill from "../components/Bill";

const BillTest = () => {
  const [receipt, setReceipt] = useState<Receipt>({
    items: [
      {
        name: "Nasi Goreng",
        quantity: 2,
        unitPrice: 25,
        totalPrice: 50,
        priceAfterTax: 55,
        priceInHBAR: 0,
      },
      {
        name: "Es Teh Manis",
        quantity: 2,
        unitPrice: 40,
        totalPrice: 80,
        priceAfterTax: 90,
        priceInHBAR: 0,
      },
      {
        name: "Ayam Bakar",
        quantity: 1,
        unitPrice: 35,
        totalPrice: 35,
        priceAfterTax: 40,
        priceInHBAR: 0,
      },
    ],
    tax: 20,
    storeName: "Warung Makan Enak",
    date: "2023-10-01",
    totalAmount: 55000,
  });

  return (
    <div className="">
      <Bill receipt={receipt} />
    </div>
  );
};

export default BillTest;
