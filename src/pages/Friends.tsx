import { UserPlus, Users } from "lucide-react";
import { useState } from "react";
import { useFriend } from "../contexts/FriendContext";

const Friends = () => {
  const [isOpen, setIsOpen] = useState(false);
  // const { addFriend, error } = useFriend();
  const friends = [
    {
      name: "Alice Johnson",
      address: "0.0.12345",
      status: "online",
    },
    {
      name: "Bob Smith",
      address: "0.0.67890",
      status: "offline",
    },
    {
      name: "Carol Davis",
      address: "0.0.54321",
      status: "online",
    },
  ];

  const handleAddFriend = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const friendWalletAddress = e.currentTarget.FriendWalletAddress.value;
    console.log("Friend Wallet Address: ", friendWalletAddress);
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
          Manage Friends
        </h2>
        <p className="text-purple-200 text-lg">
          Add and manage your Split Chain friends
        </p>
      </div>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="fixed inset-0 bg-black opacity-75"
            onClick={() => setIsOpen(false)}
          />
          <div className="relative bg-gradient-to-r from-purple-600/20 to-fuchsia-600/20 rounded-xl p-6 rounded shadow-lg border border-white/10 w-80">
            <h2 className="text-xl font-semibold mb-4 text-white">Add Friend</h2>
            <form onSubmit={handleAddFriend} className="flex flex-col gap-4">
              <label htmlFor="FriendWalletAddress">Friend Wallet Address</label>
              <input type="text" name="FriendWalletAddress" placeholder="Input your Friend Wallet Address" className="bg-purple-800/30 rounded-lg px-4 py-3 text-white"/>
              <div className="flex gap-4 mt-4 justify-end">
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 bg-purple-600/10 text-white rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-fuchsia-700/50 text-white rounded-lg cursor-pointer">Submit</button>
              </div>
            </form>
          </div>
        </div>
      )}
      <div className="max-w-2xl mx-auto">
        <div className="bg-purple-800/30 rounded-xl p-6 border border-purple-600/30">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold">Your Friends</h3>
            <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-fuchsia-600 rounded-lg hover:from-purple-500 hover:to-fuchsia-500 transition-all duration-300" onClick={() => setIsOpen(true)}>
              <UserPlus className="w-4 h-4" />
              <span>Add Friend</span>
            </button>
          </div>

          <div className="space-y-4">
            {friends.map((friend, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-purple-900/30 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      friend.status === "online"
                        ? "bg-green-400"
                        : "bg-gray-400"
                    }`}
                  ></div>
                  <div>
                    <div className="font-semibold text-purple-100">
                      {friend.name}
                    </div>
                    <div className="text-sm text-purple-300">
                      {friend.address}
                    </div>
                  </div>
                </div>
                <button className="text-purple-300 hover:text-purple-100">
                  <Users className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Friends;
