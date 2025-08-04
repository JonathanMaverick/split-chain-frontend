import { UserPlus, Check, X, Pencil } from "lucide-react";
import { useState, useEffect } from "react";
import { useFriend } from "../contexts/FriendContext";
import { useWallet } from "../contexts/WalletContext";
import type { User } from "../models/user";

const Friends = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen1, setIsOpen1] = useState(false);
  const [friendWalletAddress, setFriendWalletAddress] = useState("");
  const [friendNickname, setFriendNickname] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [tabName, setTabName] = useState("Friends");
  const { accountId } = useWallet();
  const {
    addFriend,
    addNickname,
    acceptRequest,
    declineRequest,
    refreshFriendsData,
    friends,
    pendingFriends,
    pendingRequests,
    isLoading,
  } = useFriend();

  useEffect(() => {
    if (!errMsg) return;

    const timeout = setTimeout(() => {
      setErrMsg("");
    }, 5000);

    return () => clearTimeout(timeout);
  }, [errMsg]);

  const handleAddFriend = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const friendWalletAddress = e.currentTarget.FriendWalletAddress.value;

    const currUser: User = {
      wallet_address: accountId!,
    };

    const friend: User = {
      wallet_address: friendWalletAddress,
    };

    const error = await addFriend(currUser, friend);
    if (error != null) {
      setErrMsg(error);
    } else {
      setIsOpen(false);
      setErrMsg("");
      refreshFriendsData();
    }
  };

  const handleAddNickname = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const nickname = e.currentTarget.Nickname.value;

    const error = await addNickname(accountId!, friendWalletAddress, nickname);
    if (error != null) {
      setErrMsg(error);
    } else {
      setIsOpen1(false);
      setErrMsg("");
      refreshFriendsData();
    }
  };

  const handleAcceptRequest = async (id: string) => {
    await acceptRequest(id);
    refreshFriendsData();
  };

  const handleDeclineRequest = async (id: string) => {
    await declineRequest(id);
    refreshFriendsData();
  };

  const LoadingSpinner = () => (
    <svg className="mr-2 size-5 animate-spin" viewBox="0 0 24 24" fill="none">
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
      />
    </svg>
  );

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
          <div className="relative bg-gradient-to-r from-purple-600/30 to-fuchsia-600/30 rounded-xl p-6 shadow-lg border border-white/10 w-80">
            <h2 className="text-xl font-semibold mb-4 text-white">
              Add Friend
            </h2>
            <form onSubmit={handleAddFriend} className="flex flex-col gap-4">
              <label htmlFor="FriendWalletAddress">Friend Wallet Address</label>
              <input
                type="text"
                name="FriendWalletAddress"
                placeholder="Input your Friend Wallet Address"
                className="bg-purple-800/30 rounded-lg px-4 py-3 text-white"
              />
              {errMsg && (
                <div className="text-sm text-red-500 text-center">{errMsg}</div>
              )}
              <div className="flex gap-4 mt-4 justify-end">
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 bg-purple-600/10 hover:bg-purple-600/40 transition-all text-white rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-fuchsia-700/50 hover:bg-fuchsia-700/80 transition-all text-white rounded-lg cursor-pointer"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {isOpen1 && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="fixed inset-0 bg-black opacity-75"
            onClick={() => setIsOpen1(false)}
          />
          <div className="relative bg-gradient-to-r from-purple-600/30 to-fuchsia-600/30 rounded-xl p-6 shadow-lg border border-white/10 w-80">
            <h2 className="text-xl font-semibold mb-4 text-white">
              Edit Friend Nickname
            </h2>
            <form onSubmit={handleAddNickname} className="flex flex-col gap-4">
              <label htmlFor="Nickname">Friend Nickname</label>
              <input
                type="text"
                name="Nickname"
                placeholder="Input your Friend Nickname"
                className="bg-purple-800/30 rounded-lg px-4 py-3 text-white"
                defaultValue={friendNickname}
              />
              {errMsg && (
                <div className="text-sm text-red-500 text-center">{errMsg}</div>
              )}
              <div className="flex gap-4 mt-4 justify-end">
                <button
                  onClick={() => setIsOpen1(false)}
                  className="px-4 py-2 bg-purple-600/10 hover:bg-purple-600/40 transition-all text-white rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-fuchsia-700/50 hover:bg-fuchsia-700/80 transition-all text-white rounded-lg cursor-pointer"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <div className="max-w-2xl mx-auto">
        <div className="bg-purple-800/30 rounded-xl p-6 border border-purple-600/30">
          <div className="flex items-center justify-between mb-6">
            <div className="bg-purple-900 p-2 rounded-xl">
              <div className="flex gap-2">
                {tabName == "Friends" ? (
                  <div className="font-semibold bg-fuchsia-900 py-2 px-4 rounded-lg transition duration-200 ease-in-out">
                    Friends
                  </div>
                ) : (
                  <div
                    className="font-semibold py-2 px-4 rounded-xl cursor-pointer"
                    onClick={() => {
                      setTabName("Friends");
                      refreshFriendsData();
                    }}
                  >
                    Friends
                  </div>
                )}
                {tabName == "Sent" ? (
                  <div className="font-semibold bg-fuchsia-900 py-2 px-4 rounded-lg transition duration-200 ease-in-out">
                    Sent Requests
                  </div>
                ) : (
                  <div
                    className="font-semibold py-2 px-4 rounded-xl cursor-pointer"
                    onClick={() => {
                      setTabName("Sent");
                      refreshFriendsData();
                    }}
                  >
                    Sent Requests
                  </div>
                )}
                {tabName == "Requests" ? (
                  <div className="font-semibold bg-fuchsia-900 py-2 px-4 rounded-lg transition duration-200 ease-in-out flex gap-2">
                    <div>Received Requests</div>
                    {pendingRequests.length !== 0 && (
                      <div>{pendingRequests.length}</div>
                    )}
                  </div>
                ) : (
                  <div
                    className="font-semibold py-2 px-4 rounded-lg cursor-pointer flex gap-2 items-center"
                    onClick={() => {
                      setTabName("Requests");
                      refreshFriendsData();
                    }}
                  >
                    <div>Received Requests</div>
                    {pendingRequests.length !== 0 && (
                      <div className="text-xs p-2 bg-fuchsia-700/50 rounded-full w-5 h-5 flex items-center justify-center">
                        {pendingRequests.length}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            <button
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-fuchsia-600 rounded-lg hover:from-purple-500 hover:to-fuchsia-500 transition-all duration-300"
              onClick={() => setIsOpen(true)}
            >
              <UserPlus className="w-4 h-4" />
              <span>Add Friend</span>
            </button>
          </div>

          {tabName == "Friends" ? (
            <div className="flex flex-col gap-4">
              <div className="text-xl font-semibold">All Friends</div>
              <div className="space-y-4">
                {isLoading ? (
                  <div className="flex items-center p-4 bg-purple-900/30 rounded-lg justify-center">
                    <LoadingSpinner />
                  </div>
                ) : friends.length === 0 ? (
                  <div className="flex items-center p-4 bg-purple-900/30 rounded-lg justify-center">
                    <div className="text-sm text-purple-300">No Data</div>
                  </div>
                ) : (
                  friends.map((friend, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-purple-900/30 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <div>
                          <div className="font-semibold text-purple-100">
                            {friend.nickname ?? "-"}
                          </div>
                          <div className="text-sm text-purple-300">
                            {friend.friend_wallet_address}
                          </div>
                        </div>
                      </div>
                      <div
                        className="p-3 bg-fuchsia-500/20 hover:bg-fuchsia-500/50 transition-all rounded-lg cursor-pointer"
                        onClick={() => {
                          setFriendNickname(friend.nickname);
                          setFriendWalletAddress(friend.friend_wallet_address);
                          setIsOpen1(true);
                        }}
                      >
                        <Pencil size={16} />
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          ) : tabName === "Sent" ? (
            <div className="flex flex-col gap-4">
              <div className="text-xl font-semibold">
                Friend Requests You Sent
              </div>
              <div className="space-y-4">
                {isLoading ? (
                  <div className="flex items-center p-4 bg-purple-900/30 rounded-lg justify-center">
                    <LoadingSpinner />
                  </div>
                ) : pendingFriends.length === 0 ? (
                  <div className="flex items-center p-4 bg-purple-900/30 rounded-lg justify-center">
                    <div className="text-sm text-purple-300">No Data</div>
                  </div>
                ) : (
                  pendingFriends.map((friend, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-purple-900/30 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="text-sm text-purple-300">
                          {friend.friend_wallet_address}
                        </div>
                      </div>
                      <div
                        className={`text-sm px-3 py-1 rounded-full ${
                          friend.status === "Pending"
                            ? "bg-yellow-500/20 text-yellow-300"
                            : "bg-red-800/50 text-red-300"
                        }`}
                      >
                        {friend.status}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <div className="text-xl font-semibold">
                Friend Requests You Received
              </div>
              <div className="space-y-4">
                {isLoading ? (
                  <div className="flex items-center p-4 bg-purple-900/30 rounded-lg justify-center">
                    <LoadingSpinner />
                  </div>
                ) : pendingRequests.length === 0 ? (
                  <div className="flex items-center p-4 bg-purple-900/30 rounded-lg justify-center">
                    <div className="text-sm text-purple-300">No Data</div>
                  </div>
                ) : (
                  pendingRequests.map((req, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-purple-900/30 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="text-sm text-purple-300">
                          {req.user_wallet_address}
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <div
                          className="px-3 py-2 bg-green-500/20 hover:bg-green-500/50 transition-all rounded-lg cursor-pointer"
                          onClick={() => handleAcceptRequest(req.id)}
                        >
                          <Check />
                        </div>
                        <div
                          className="px-3 py-2 bg-red-500/20 hover:bg-red-500/50 transition-all rounded-lg cursor-pointer"
                          onClick={() => handleDeclineRequest(req.id)}
                        >
                          <X />
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Friends;
