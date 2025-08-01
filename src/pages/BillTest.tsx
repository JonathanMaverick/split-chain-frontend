import { useState } from "react";
import Bill from "../components/Bill";

const BillTest = () => {
  const [receipt] = useState<Receipt>({
    items: [
      {
        name: "Nasi Goreng",
        quantity: 2,
        price: 25,
      },
      {
        name: "Es Teh Manis",
        quantity: 2,
        price: 40,
      },
      {
        name: "Ayam Bakar",
        quantity: 1,
        price: 35,
      },
    ],
    tax: 20,
    service: 10,
    storeName: "Warung Makan Enak",
    billDate: "2023-10-01",
    totalAmount: 55000,
    creatorId: "0.0.12345678",
  });

  return (
    <div className="">
      <Bill receipt={receipt} />
    </div>
  );
};

export default BillTest;
