import { useEffect, useState } from "react";
import {
  FileText,
  Calendar,
  DollarSign,
  Package,
  Loader2,
  AlertCircle,
  ChevronRight,
} from "lucide-react";
import { BillService } from "../services/billService";
import { useNavigate } from "react-router-dom";

export default function CreatedBills() {
  const [bills, setBills] = useState<Receipt[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBills = async () => {
      try {
        setLoading(true);
        setError(null);
        const billsData = await BillService.getBillsByCurrentCreator();
        setBills(billsData);
        console.log("fff:", billsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch bills");
      } finally {
        setLoading(false);
      }
    };

    fetchBills();
  }, []);

  const calculateTotalAmount = (bill: Receipt) => {
    const subtotal = bill.items.reduce((sum, item) => sum + item.price, 0);
    return subtotal + (bill.tax || 0);
  };

  const formatCurrency = (amount: number) => {
    return amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleBillClick = (billId: string) => {
    navigate(`/view-bill/${billId}`);
    console.log("Navigate to bill detail:", billId);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-2xl">
          <div className="flex items-center gap-4">
            <Loader2 className="w-8 h-8 text-purple-300 animate-spin" />
            <span className="text-white text-xl font-semibold">
              Loading bills...
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center">
        <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-2xl max-w-md w-full">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-red-500/20 rounded-full">
              <AlertCircle className="w-8 h-8 text-red-400" />
            </div>
            <div>
              <h3 className="text-white text-xl font-bold">Error</h3>
              <p className="text-red-200">{error}</p>
            </div>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 rounded-xl font-semibold text-white transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Created Bills</h1>
          <p className="text-purple-200">
            {bills == null || bills.length === 0
              ? "No bills found"
              : `${bills.length} bill${bills.length !== 1 ? "s" : ""} created`}
          </p>
        </div>

        {bills == null || bills.length === 0 ? (
          <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-12 shadow-2xl text-center">
            <div className="p-4 bg-white/10 rounded-full inline-block mb-6">
              <FileText className="w-12 h-12 text-purple-300" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">
              No Bills Created Yet
            </h3>
            <p className="text-purple-200 text-lg">
              Start creating bills to see them appear here
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {bills.map((bill, index) => {
              const totalAmount = calculateTotalAmount(bill);

              return (
                <div key={index} className="group">
                  <div
                    onClick={() => handleBillClick(bill.billId!)}
                    className="bg-gradient-to-r from-purple-600/20 to-fuchsia-600/20 border backdrop-blur-sm border-white/20 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-purple-400/30 cursor-pointer hover:brightness-110"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-gradient-to-r from-purple-600/20 to-fuchsia-600/20 rounded-xl">
                          <FileText className="w-6 h-6 text-purple-300" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white mb-1">
                            {bill.storeName}
                          </h3>
                          <div className="flex items-center gap-4 text-sm text-purple-200">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              <span>
                                {new Date(bill.billDate).toLocaleDateString(
                                  "en-US",
                                  {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                  }
                                )}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Package className="w-4 h-4" />
                              <span>{bill.items.length} items</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="text-2xl font-bold text-white flex items-center gap-0">
                            <DollarSign className="w-5 h-5 text-purple-300 translate-y-0.5" />
                            {formatCurrency(totalAmount)}
                          </div>
                          <div className="text-purple-200 text-sm">Total</div>
                        </div>
                        <ChevronRight className="w-6 h-6 text-purple-300 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
