import React, { useState, useEffect } from "react";
import {
  Users,
  UserPlus,
  X,
  Check,
  FileText,
  ArrowLeft,
  Search,
} from "lucide-react";

interface Friend {
  friend_wallet_address: string;
  id: string;
  nickname: string;
}

interface ItemAssignment {
  itemIndex: number;
  assignedFriends: string[]; // friend IDs
  portions: { [friendId: string]: number }; // how much each friend owes
}

interface BillProps {
  receipt: Receipt;
  onBack?: () => void;
  onSave?: (assignments: ItemAssignment[]) => void;
}

const Bill: React.FC<BillProps> = ({ receipt, onBack, onSave }) => {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [assignments, setAssignments] = useState<ItemAssignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [showFriendSelector, setShowFriendSelector] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const initialAssignments = receipt.items.map((_, index) => ({
      itemIndex: index,
      assignedFriends: [],
      portions: {},
    }));
    setAssignments(initialAssignments);
  }, [receipt.items]);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        setLoading(true);

        const mockFriends: Friend[] = [
          {
            id: "1",
            nickname: "John Doe",
            friend_wallet_address: "0x1234...5678",
          },
          {
            id: "2",
            nickname: "Jane Smith",
            friend_wallet_address: "0x8765...4321",
          },
          {
            id: "3",
            nickname: "Bob Johnson",
            friend_wallet_address: "0xabcd...efgh",
          },
          {
            id: "4",
            nickname: "Alice Brown",
            friend_wallet_address: "0x9876...1234",
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

  const assignFriendToItem = (itemIndex: number, friendId: string) => {
    setAssignments((prev) => {
      const newAssignments = [...prev];
      const assignment = newAssignments[itemIndex];

      if (!assignment.assignedFriends.includes(friendId)) {
        assignment.assignedFriends.push(friendId);
        const totalFriends = assignment.assignedFriends.length;
        const itemPrice = receipt.items[itemIndex].totalPrice;
        const portionPerFriend = itemPrice / totalFriends;

        assignment.portions = {};
        assignment.assignedFriends.forEach((id) => {
          assignment.portions[id] = portionPerFriend;
        });
      }

      return newAssignments;
    });
  };

  const removeFriendFromItem = (itemIndex: number, friendId: string) => {
    setAssignments((prev) => {
      const newAssignments = [...prev];
      const assignment = newAssignments[itemIndex];

      assignment.assignedFriends = assignment.assignedFriends.filter(
        (id) => id !== friendId
      );
      delete assignment.portions[friendId];

      if (assignment.assignedFriends.length > 0) {
        const itemPrice = receipt.items[itemIndex].totalPrice;
        const portionPerFriend = itemPrice / assignment.assignedFriends.length;
        assignment.assignedFriends.forEach((id) => {
          assignment.portions[id] = portionPerFriend;
        });
      }

      return newAssignments;
    });
  };

  const getFriendById = (friendId: string) => {
    return friends.find((f) => f.id === friendId);
  };

  const calculateFriendTotal = (friendId: string) => {
    return assignments.reduce((total, assignment) => {
      return total + (assignment.portions[friendId] || 0);
    }, 0);
  };

  const getTotalAssigned = () => {
    return assignments.reduce((total, assignment) => {
      return (
        total +
        Object.values(assignment.portions).reduce(
          (sum, portion) => sum + portion,
          0
        )
      );
    }, 0);
  };

  const subtotal = receipt.items.reduce(
    (sum, item) => sum + item.totalPrice,
    0
  );
  const totalAssigned = getTotalAssigned();
  const unassigned = subtotal - totalAssigned;

  const filteredFriends = friends.filter(
    (friend) =>
      friend.nickname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      friend.friend_wallet_address
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
  );

  const closeModal = () => {
    setShowFriendSelector(false);
    setSelectedItem(null);
    setSearchQuery("");
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
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600/20 to-fuchsia-600/20 px-6 py-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            {onBack && (
              <button
                onClick={onBack}
                className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-5 h-5 text-purple-300" />
              </button>
            )}
            <div className="p-2 bg-white/10 rounded-lg">
              <Users className="w-6 h-6 text-purple-300" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Split Bill</h3>
              <p className="text-purple-200 text-sm">
                Assign friends to items • {receipt.storeName}
              </p>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Items List */}
          <div className="space-y-4 mb-8">
            <h4 className="text-lg font-semibold text-white mb-4">
              Assign Items
            </h4>
            {receipt.items.map((item, itemIndex) => {
              const assignment = assignments[itemIndex];
              const assignedFriends = assignment?.assignedFriends || [];

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
                        {item.quantity}× ${item.unitPrice.toFixed(2)} = $
                        {item.totalPrice.toFixed(2)}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedItem(itemIndex);
                        setShowFriendSelector(true);
                      }}
                      className="p-2 bg-purple-600/20 text-purple-300 rounded-lg border border-purple-400/30 hover:bg-purple-600/30 transition-colors cursor-pointer"
                    >
                      <UserPlus className="w-4 h-4" />
                    </button>
                  </div>

                  {assignedFriends.length > 0 ? (
                    <div className="space-y-2">
                      {assignedFriends.map((friendId) => {
                        const friend = getFriendById(friendId);
                        const portion = assignment.portions[friendId] || 0;

                        return (
                          <div
                            key={friendId}
                            className="flex items-center justify-between bg-white/10 rounded-lg p-3 animate-in slide-in-from-left duration-200"
                          >
                            <div>
                              <span className="text-white font-medium">
                                {friend?.nickname}
                              </span>
                              <span className="text-purple-200 text-sm ml-2">
                                ${portion.toFixed(2)}
                              </span>
                            </div>
                            <button
                              onClick={() =>
                                removeFriendFromItem(itemIndex, friendId)
                              }
                              className="p-1 text-red-400 hover:bg-red-500/20 rounded cursor-pointer"
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

          {/* Summary */}
          <div className="bg-white/5 rounded-xl p-4 border border-white/10 mb-6">
            <h4 className="text-lg font-semibold text-white mb-4">Summary</h4>

            <div className="space-y-2 mb-4">
              {friends.map((friend) => {
                const total = calculateFriendTotal(friend.id);
                if (total === 0) return null;

                return (
                  <div
                    key={friend.id}
                    className="flex justify-between items-center"
                  >
                    <span className="text-white font-medium">
                      {friend.nickname}
                    </span>
                    <span className="text-purple-200 font-semibold">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="border-t border-white/10 pt-4 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-white">Subtotal</span>
                <span className="text-white">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white">Assigned</span>
                <span className="text-green-400">
                  ${totalAssigned.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white">Unassigned</span>
                <span
                  className={
                    unassigned > 0 ? "text-yellow-400" : "text-green-400"
                  }
                >
                  ${unassigned.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center font-semibold text-lg pt-2 border-t border-white/10">
                <span className="text-white">Tax & Fees</span>
                <span className="text-white">${receipt.tax.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => onSave?.(assignments)}
              disabled={unassigned > 0}
              className="flex-1 px-6 py-3.5 bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed rounded-xl font-semibold text-white transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer"
            >
              {unassigned > 0
                ? "Assign All Items First"
                : "Continue to Payment"}
            </button>
          </div>
        </div>
      </div>

      {showFriendSelector && selectedItem !== null && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl max-w-md w-full overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="bg-gradient-to-r from-purple-600/20 to-fuchsia-600/20 px-6 py-4 border-b border-white/10">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold text-white">
                  Select Friends
                </h4>
                <button
                  onClick={closeModal}
                  className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                <input
                  type="text"
                  placeholder="Search friends..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 text-white rounded-xl border border-white/20 focus:border-purple-400 focus:bg-white/15 outline-none placeholder-white/50"
                  autoFocus
                />
              </div>

              <div className="max-h-80 overflow-y-auto">
                <div className="space-y-3">
                  {filteredFriends.length > 0 ? (
                    filteredFriends.map((friend) => {
                      const isAssigned = assignments[
                        selectedItem
                      ]?.assignedFriends.includes(friend.id);

                      return (
                        <button
                          key={friend.id}
                          onClick={() => {
                            if (isAssigned) {
                              removeFriendFromItem(selectedItem, friend.id);
                            } else {
                              assignFriendToItem(selectedItem, friend.id);
                            }
                          }}
                          className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all duration-200 cursor-pointer animate-in slide-in-from-bottom duration-200 ${
                            isAssigned
                              ? "bg-purple-600/20 border-purple-400/50 text-white"
                              : "bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-white/20"
                          }`}
                        >
                          <div className="text-left">
                            <div className="font-medium">{friend.nickname}</div>
                            <div className="text-sm opacity-75">
                              {friend.friend_wallet_address}
                            </div>
                          </div>
                          {isAssigned && (
                            <Check className="w-5 h-5 text-purple-300" />
                          )}
                        </button>
                      );
                    })
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-white/60">No friends found</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bill;
