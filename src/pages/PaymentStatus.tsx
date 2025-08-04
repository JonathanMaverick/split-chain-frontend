import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle, Clock, DollarSign, Users } from "lucide-react";
import { BillService } from "../services/billService";
import { UserService } from "../services/userService";
import { useWallet } from "../contexts/WalletContext";
import type { Receipt } from "../models/receipt";
import type { Friend } from "../models/friend";
import { FriendService } from "../services/friendService";

const PaymentStatus = () => {
  const { billId } = useParams<{ billId: string }>();
  const navigate = useNavigate();
  const { accountId } = useWallet();
  const [bill, setBill] = useState<Receipt | null>(null);
  const [friends, setFriends] = useState<Friend[]>([]);
  const [HBAR_RATE, setHBAR_RATE] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!billId || !accountId) return;
      
      try {
        setLoading(true);
        
        // Fetch bill data
        const billData = await BillService.getBillByBillId(billId);
        setBill(billData);
        
        // Fetch friends
        const friendsData = await FriendService.getFriends(accountId);
        setFriends(friendsData);
        
        // Fetch HBAR rate
        const rate = await UserService.getRate();
        setHBAR_RATE(rate);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [billId, accountId]);

  const currentUserFriend: Friend = {
    ID: "current_user",
    friend_wallet_address: accountId || "",
    nickname: "You",
  };

  const allParticipants = [currentUserFriend, ...friends];

  const calculateFriendTotal = (friendWalletAddress: string) => {
    if (!bill) return 0;
    
    return bill.items.reduce((total, item) => {
      if (!item.participants) return total;
      const participantInItem = item.participants.find(
        (p) => p.participantId === friendWalletAddress
      );
      if (participantInItem) {
        const itemPrice = item.price;
        const portionPerParticipant = itemPrice / item.participants.length;
        return total + portionPerParticipant;
      }
      return total;
    }, 0);
  };

  const getPaymentStatus = (friendWalletAddress: string) => {
    // This would be replaced with actual payment status logic
    // For now, returning mock data
    const isCurrentUser = friendWalletAddress === accountId;
    return isCurrentUser ? "paid" : "pending";
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "paid":
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case "pending":
        return <Clock className="w-5 h-5 text-yellow-400" />;
      default:
        return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-500/20 text-green-300 border-green-400/30";
      case "pending":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-400/30";
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-400/30";
    }
  };

  if (loading) {
    return (
      <div className="max-w-2xl w-full mx-auto -mt-4">
        <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400 mx-auto mb-4"></div>
            <p className="text-white">Loading payment status...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!bill) {
    return (
      <div className="max-w-2xl w-full mx-auto -mt-4">
        <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-8">
          <div className="text-center">
            <p className="text-white">Bill not found</p>
          </div>
        </div>
      </div>
    );
  }

  const subtotal = bill.items.reduce((sum, item) => sum + item.price, 0);
  const grandTotal = subtotal + bill.tax;

  return (
    <div className="max-w-2xl w-full mx-auto -mt-4">
      <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600/20 to-fuchsia-600/20 px-6 py-4 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate(-1)}
                className="p-2 bg-white/10 rounded-lg text-purple-300 hover:bg-white/20 hover:text-purple-200 transition-all duration-200"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-3">
                  <DollarSign className="w-6 h-6 text-purple-300" />
                  Payment Status
                </h3>
                <p className="text-purple-200 text-sm">
                  {bill.storeName} • {new Date(bill.billDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Payment Summary */}
          <div className="bg-white/5 rounded-xl p-4 border border-white/10 mb-6">
            <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-purple-300" />
              Payment Summary
            </h4>

            <div className="space-y-3">
              {allParticipants.map((friend) => {
                const total = calculateFriendTotal(friend.friend_wallet_address);
                if (total === 0) return null;

                const status = getPaymentStatus(friend.friend_wallet_address);
                const isCurrentUser = friend.ID === "current_user";

                return (
                  <div
                    key={friend.friend_wallet_address}
                    className={`flex items-center justify-between p-4 rounded-lg border ${
                      isCurrentUser
                        ? "bg-violet-500/10 border-violet-400/30"
                        : "bg-white/5 border-white/10"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          isCurrentUser
                            ? "bg-gradient-to-br from-violet-400 to-purple-400"
                            : "bg-gradient-to-br from-purple-400 to-fuchsia-400"
                        }`}
                      >
                        <span className="text-white font-bold">
                          {friend.nickname.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <div
                          className={`font-semibold ${
                            isCurrentUser ? "text-violet-200" : "text-white"
                          }`}
                        >
                          {friend.nickname}
                        </div>
                        <div className="text-sm text-purple-200">
                          ${total.toFixed(2)} ({(total * HBAR_RATE).toFixed(2)} ℏ)
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
                          status
                        )}`}
                      >
                        {status === "paid" ? "Paid" : "Pending"}
                      </span>
                      {getStatusIcon(status)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bill Details */}
          <div className="bg-white/5 rounded-xl p-4 border border-white/10 mb-6">
            <h4 className="text-lg font-semibold text-white mb-4">Bill Details</h4>

            <div className="space-y-2 mb-4">
              {bill.items.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center text-sm"
                >
                  <span className="text-purple-200">
                    {item.name} × {item.quantity}
                  </span>
                  <span className="text-white font-medium">
                    ${item.price.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-4"></div>

            <div className="space-y-2">
              <div className="flex justify-between items-center text-white">
                <span className="font-semibold">Subtotal</span>
                <span className="font-semibold">
                  ${subtotal.toFixed(2)} ({(subtotal * HBAR_RATE).toFixed(2)} ℏ)
                </span>
              </div>

              <div className="flex justify-between items-center text-purple-200">
                <span className="font-semibold">Tax & Fees</span>
                <span className="font-semibold">
                  ${bill.tax.toFixed(2)} ({(bill.tax * HBAR_RATE).toFixed(2)} ℏ)
                </span>
              </div>

              <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-4"></div>

              <div className="flex justify-between items-center">
                <span className="font-semibold text-lg text-white">Total</span>
                <span className="font-semibold text-lg text-white">
                  ${grandTotal.toFixed(2)} ({(grandTotal * HBAR_RATE).toFixed(2)} ℏ)
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => navigate(`/view-bill/${billId}`)}
              className="flex-1 px-6 py-3.5 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 rounded-xl font-semibold text-white transition-all duration-300"
            >
              Back to Bill
            </button>
            <button
              onClick={() => navigate("/history")}
              className="flex-1 px-6 py-3.5 bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 rounded-xl font-semibold text-white transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              View History
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentStatus; 