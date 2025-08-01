import React, { useState, useEffect } from "react";
import { UserPlus, X, Check, Search, FileText } from "lucide-react";
import type { Friend } from "../models/friend";

interface BillProps {
  receipt: Receipt;
  onBack?: () => void;
  onSave?: (receipt: Receipt) => void;
}

const HBAR_RATE = 3.5;

const Bill: React.FC<BillProps> = ({ receipt, onSave }) => {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [receiptItems, setReceiptItems] = useState<ReceiptItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [showFriendSelector, setShowFriendSelector] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    console.log(receiptItems);
  }, [receiptItems]);

  useEffect(() => {
    const initializedItems = receipt.items.map((item) => ({
      ...item,
      friends: [],
      portions: {},
    }));
    setReceiptItems(initializedItems);
  }, [receipt.items]);

  useEffect(() => {
    if (showFriendSelector) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showFriendSelector]);

  useEffect(() => {
    // const fetchFriends = async () => {
    //   try {
    //     setLoading(true);
    //     const friends = await FriendService.getCurrentUserFriends();
    //     setFriends(friends);
    //   } catch (err) {
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    const fetchFriends = async () => {
      try {
        setLoading(true);

        const mockFriends: Friend[] = [
          {
            ID: "1",
            Nickname: "John Doe",
            FriendWalletAddress: "0x1234...5678",
          },
          {
            ID: "2",
            Nickname: "Jane Smith",
            FriendWalletAddress: "0x8765...4321",
          },
          {
            ID: "3",
            Nickname: "Bob Johnson",
            FriendWalletAddress: "0xabcd...efgh",
          },
          {
            ID: "4",
            Nickname: "Alice Brown",
            FriendWalletAddress: "0x9876...1234",
          },
          {
            ID: "5",
            Nickname: "Michael Chen",
            FriendWalletAddress: "0x2468...1357",
          },
          {
            ID: "6",
            Nickname: "Sarah Wilson",
            FriendWalletAddress: "0x1357...2468",
          },
          {
            ID: "7",
            Nickname: "David Kim",
            FriendWalletAddress: "0x5678...9012",
          },
          {
            ID: "8",
            Nickname: "Emma Davis",
            FriendWalletAddress: "0x9012...3456",
          },
          {
            ID: "9",
            Nickname: "James Taylor",
            FriendWalletAddress: "0x3456...7890",
          },
          {
            ID: "10",
            Nickname: "Lisa Garcia",
            FriendWalletAddress: "0x7890...2345",
          },
          {
            ID: "11",
            Nickname: "Ryan Martinez",
            FriendWalletAddress: "0x2345...6789",
          },
          {
            ID: "12",
            Nickname: "Ashley Lee",
            FriendWalletAddress: "0x6789...0123",
          },
          {
            ID: "13",
            Nickname: "Kevin Wong",
            FriendWalletAddress: "0x0123...4567",
          },
          {
            ID: "14",
            Nickname: "Amanda Clark",
            FriendWalletAddress: "0x4567...8901",
          },
          {
            ID: "15",
            Nickname: "Chris Anderson",
            FriendWalletAddress: "0x8901...2345",
          },
        ];

        setFriends(mockFriends);
      } catch (error) {
        console.error("Failed to fetch friends:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFriends();
  }, []);

  const assignFriendToItem = (itemIndex: number, friend: Friend) => {
    setReceiptItems((prev) => {
      const newItems = [...prev];
      const item = newItems[itemIndex];

      if (!item.friends) item.friends = [];

      if (!item.friends.some((f) => f.ID === friend.ID)) {
        item.friends.push(friend);
      }

      return newItems;
    });
  };

  const removeFriendFromItem = (itemIndex: number, friendID: string) => {
    setReceiptItems((prev) => {
      const newItems = [...prev];
      const item = newItems[itemIndex];

      if (!item.friends) item.friends = [];

      item.friends = item.friends.filter((friend) => friend.ID !== friendID);

      return newItems;
    });
  };

  const calculateFriendTotal = (friendID: string) => {
    return receiptItems.reduce((total, item) => {
      if (!item.friends) return total;
      const friendInItem = item.friends.find((f) => f.ID === friendID);
      if (friendInItem) {
        const itemPrice = item.price;
        const portionPerFriend = itemPrice / item.friends.length;
        return total + portionPerFriend;
      }
      return total;
    }, 0);
  };

  const subtotal = receipt.items.reduce((sum, item) => sum + item.price, 0);

  const grandTotal = subtotal + receipt.tax;

  const filteredFriends = friends.filter(
    (friend) =>
      friend.Nickname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      friend.FriendWalletAddress.toLowerCase().includes(
        searchQuery.toLowerCase()
      )
  );

  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowFriendSelector(false);
      setSelectedItem(null);
      setSearchQuery("");
      setIsClosing(false);
    }, 300);
  };

  if (loading) {
    return (
      <div className="max-w-2xl w-full mx-auto -mt-4">
        <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400 mx-auto mb-4"></div>
            <p className="text-white">Loading friends...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl w-full mx-auto -mt-4">
      <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden shadow-2xl">
        <div className="bg-gradient-to-r from-purple-600/20 to-fuchsia-600/20 px-6 py-4 border-b border-white/10">
          <h3 className="text-xl font-bold text-white flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-lg">
              <FileText className="w-6 h-6 text-purple-300" />
            </div>
            {receipt.storeName}
          </h3>
          <p className="text-purple-200 text-sm ml-[3.35rem]">
            {receipt.items.length} items •{" "}
            {new Date(receipt.billDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        <div className="p-6">
          <div className="space-y-4 mb-8">
            <h4 className="text-lg font-semibold text-white mb-4">
              Assign Items
            </h4>
            {receipt.items.map((item, itemIndex) => {
              const itemWithFriends = receiptItems[itemIndex];
              const assignedFriends = itemWithFriends?.friends || [];

              return (
                <div
                  key={itemIndex}
                  className="bg-white/5 rounded-xl p-4 border border-white/5"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h5 className="text-white font-semibold text-lg">
                        {item.name}
                      </h5>
                      <p className="text-purple-200 text-sm">
                        {item.quantity}× ${item.price.toFixed(2)} = $
                        {item.price.toFixed(2)} (
                        {(item.price * HBAR_RATE).toFixed(2)} ℏ)
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedItem(itemIndex);
                        setShowFriendSelector(true);
                      }}
                      className="p-2.5 rounded-lg bg-white/10 text-purple-300 hover:bg-white/20 hover:text-purple-200 transition-all duration-200 border border-white/10 hover:border-white/30 cursor-pointer"
                    >
                      <UserPlus className="w-4 h-4" />
                    </button>
                  </div>

                  {assignedFriends.length > 0 ? (
                    <div className="space-y-2">
                      {assignedFriends.map((assignedFriend) => {
                        const portion = assignedFriend
                          ? itemWithFriends.price / assignedFriends.length
                          : 0;

                        return (
                          <div
                            key={assignedFriend.ID}
                            className="flex items-center justify-between bg-white/10 rounded-lg p-3 animate-in slide-in-from-left duration-200"
                          >
                            <div>
                              <span className="text-white font-medium">
                                {assignedFriend.Nickname}
                              </span>
                              <span className="text-purple-200 text-sm ml-2">
                                ${portion.toFixed(2)} (
                                {(portion * HBAR_RATE).toFixed(2)} ℏ)
                              </span>
                            </div>
                            <button
                              onClick={() =>
                                removeFriendFromItem(
                                  itemIndex,
                                  assignedFriend.ID
                                )
                              }
                              className="p-1 text-white hover:bg-white/20 rounded cursor-pointer"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-3 border-2 border-dashed border-white/20 rounded-lg">
                      <p className="text-white/60 text-sm">
                        No friends assigned
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="bg-white/5 rounded-xl p-4 border border-white/10 mb-6">
            <h4 className="text-lg font-semibold text-white mb-3">Summary</h4>

            <div className="space-y-2 mb-4">
              {friends.map((friend) => {
                const total = calculateFriendTotal(friend.ID);
                if (total === 0) return null;

                return (
                  <div
                    key={friend.ID}
                    className="flex justify-between items-center text-lg"
                  >
                    <span className="text-purple-200 font-semibold">
                      {friend.Nickname}
                    </span>
                    <span className="text-purple-200 font-semibold">
                      ${total.toFixed(2)} ({(total * HBAR_RATE).toFixed(2)} ℏ)
                    </span>
                  </div>
                );
              })}
            </div>

            <div>
              <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-4"></div>
              <div className="space-y-2">
                <div className="flex justify-between items-center text-white">
                  <span className="font-semibold text-lg">Subtotal</span>
                  <span className="font-semibold text-lg">
                    ${subtotal.toFixed(2)} ({(subtotal * HBAR_RATE).toFixed(2)}{" "}
                    ℏ)
                  </span>
                </div>

                <div className="flex justify-between items-center text-purple-200">
                  <span className="font-semibold text-lg">Tax & Fees</span>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-lg bg-gradient-to-r">
                      ${receipt.tax.toFixed(2)} (
                      {(receipt.tax * HBAR_RATE).toFixed(2)} ℏ)
                    </span>
                  </div>
                </div>

                <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-4"></div>

                <div className="flex justify-between items-center">
                  <span className="font-semibold text-lg text-white">
                    Total
                  </span>
                  <span className="font-semibold text-lg bg-gradient-to-r text-white">
                    ${grandTotal.toFixed(2)} (
                    {(grandTotal * HBAR_RATE).toFixed(2)} ℏ)
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => {
                const updatedReceipt = {
                  ...receipt,
                  items: receiptItems,
                };
                onSave?.(updatedReceipt);
              }}
              className="flex-1 px-6 py-3.5 bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed rounded-xl font-semibold text-white transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer"
            >
              Continue to Payment
            </button>
          </div>
        </div>
      </div>

      {showFriendSelector && selectedItem !== null && (
        <>
          <style>{`
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            @keyframes fadeOut {
              from { opacity: 1; }
              to { opacity: 0; }
            }
            @keyframes slideIn {
              from { 
                opacity: 0;
                transform: scale(0.9) translateY(20px);
              }
              to { 
                opacity: 1;
                transform: scale(1) translateY(0);
              }
            }
            @keyframes slideOut {
              from { 
                opacity: 1;
                transform: scale(1) translateY(0);
              }
              to { 
                opacity: 0;
                transform: scale(0.9) translateY(20px);
              }
            }
            @keyframes slideInUp {
              from {
                opacity: 0;
                transform: translateY(20px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
          `}</style>
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            style={{
              animation: isClosing
                ? "fadeOut 300ms ease-out forwards"
                : "fadeIn 300ms ease-out forwards",
            }}
          >
            <div
              className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl max-w-2xl w-full overflow-hidden"
              style={{
                animation: isClosing
                  ? "slideOut 300ms ease-out forwards"
                  : "slideIn 300ms ease-out forwards",
              }}
            >
              <div className="bg-gradient-to-r from-purple-600/20 to-fuchsia-600/20 px-8 py-5 border-b border-white/10">
                <div className="flex items-center justify-between">
                  <h4 className="text-xl font-semibold text-white">
                    Select Friends
                  </h4>
                  <button
                    onClick={closeModal}
                    className="p-2.5 text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div className="p-8">
                <div className="relative mb-6">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-white/50" />
                  <input
                    type="text"
                    placeholder="Search friends by name or wallet address..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-14 pr-4 py-3 bg-white/10 text-white rounded-xl border border-white/20 focus:border-purple-400 focus:bg-white/15 outline-none placeholder-white/50"
                    autoFocus
                  />
                </div>

                <div className="h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent p-2">
                  <div className="grid grid-cols-3 gap-4">
                    {filteredFriends.length > 0 ? (
                      filteredFriends.map((friend, index) => {
                        const isAssigned =
                          selectedItem !== null &&
                          receiptItems[selectedItem]?.friends?.some(
                            (f) => f.ID === friend.ID
                          );

                        return (
                          <button
                            key={friend.ID}
                            onClick={() => {
                              if (isAssigned) {
                                removeFriendFromItem(selectedItem, friend.ID);
                              } else {
                                assignFriendToItem(selectedItem, friend);
                              }
                            }}
                            className={`relative flex flex-col items-center justify-center p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                              isAssigned
                                ? "bg-purple-600/20 border-purple-400/50 text-white shadow-lg shadow-purple-500/20"
                                : "bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-white/20 hover:shadow-lg hover:shadow-white/10"
                            }`}
                            style={{
                              animationDelay: `${index * 30}ms`,
                              animation: "slideInUp 300ms ease-out forwards",
                            }}
                          >
                            <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-fuchsia-400 rounded-full flex items-center justify-center mb-3 shadow-lg">
                              <span className="text-white font-bold text-lg">
                                {friend.Nickname.charAt(0).toUpperCase()}
                              </span>
                            </div>

                            <div className="text-center flex-1">
                              <div className="font-semibold text-sm mb-1 truncate w-full">
                                {friend.Nickname}
                              </div>
                              <div className="text-xs opacity-75 font-mono truncate w-full">
                                {friend.FriendWalletAddress}
                              </div>
                            </div>

                            {isAssigned && (
                              <div className="absolute -top-2 -right-2 p-1.5 bg-purple-500 rounded-full shadow-lg">
                                <Check className="w-4 h-4 text-white" />
                              </div>
                            )}
                          </button>
                        );
                      })
                    ) : (
                      <div className="col-span-3 text-center pb-20 pt-10">
                        <div className="p-">
                          <p className="text-white/60 text-lg">
                            No friends found matching your search
                          </p>
                          <p className="text-white/40 text-base mt-2">
                            Try adjusting your search terms
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Bill;
