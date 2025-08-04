import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWallet } from "../contexts/WalletContext";
import { BillService } from "../services/billService";
import type { Receipt } from "../models/receipt";

const ParticipatedBills = () => {
  const { accountId } = useWallet();
  const [bills, setBills] = useState<Receipt[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBills = async () => {
      if (!accountId) return;
      setLoading(true);
      try {
        // Asumsikan BillService punya method getBillsByParticipantId
        const data = await BillService.getBillsByParticipantId(accountId);
        setBills(data);
      } catch (error) {
        setBills([]);
      } finally {
        setLoading(false);
      }
    };
    fetchBills();
  }, [accountId]);

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-6 text-white">
        Bills You Participated In
      </h2>
      {loading ? (
        <div className="text-center text-white">Loading...</div>
      ) : bills.length === 0 ? (
        <div className="text-center text-white/60">
          No participated bills found.
        </div>
      ) : (
        <div className="space-y-4">
          {bills.map((bill) => (
            <div
              key={bill.billId}
              className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-xl p-6 flex flex-col md:flex-row md:items-center md:justify-between hover:bg-white/20 transition cursor-pointer"
              onClick={() => navigate(`/payment-status/${bill.billId}`)}
            >
              <div>
                <div className="text-lg font-semibold text-white">
                  {bill.storeName}
                </div>
                <div className="text-purple-200 text-sm">
                  {new Date(bill.billDate).toLocaleDateString()} •{" "}
                  {bill.items.length} items
                </div>
              </div>
              <div className="mt-2 md:mt-0 text-right">
                <div className="text-white font-bold text-lg">
                  $
                  {bill.items.reduce((sum, item) => sum + item.price, 0) +
                    bill.tax}
                </div>
                <div className="text-purple-300 text-xs">
                  Bill ID: {bill.billId}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ParticipatedBills;
