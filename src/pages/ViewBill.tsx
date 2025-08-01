import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Bill from "../components/Bill";
import { BillService } from "../services/billService";

const ViewBill = () => {
  const { billId } = useParams<{ billId: string }>();
  const [bill, setBill] = useState<Receipt | null>(null);

  useEffect(() => {
    const fetchBills = async () => {
      if (!billId) return;
      try {
        const bill = await BillService.getBillByBillId(billId);
        setBill(bill);
      } catch (err) {}
    };

    fetchBills();
  }, [billId]);

  return <div className="">{bill && <Bill receipt={bill} />}</div>;
};

export default ViewBill;
