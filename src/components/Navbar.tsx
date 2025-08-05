import { LogOut, Plus, Receipt, Users } from "lucide-react";
import { useWallet } from "../contexts/WalletContext";
import { useNavigate, useLocation } from "react-router-dom";
import InboxBell from "./InboxBell";

export default function Navbar() {
  const { balance, disconnectWallet, isAuthLoading } = useWallet();
  const navigate = useNavigate();
  const location = useLocation();

  const getActiveTab = () => {
    if (location.pathname === "/new-bill") return "new-bill";
    if (
      location.pathname === "/friends" ||
      location.pathname === "/manage-friends"
    )
      return "friends";
    if (
      location.pathname === "/created-bills" ||
      location.pathname === "/assign-participants/:billId"
    )
      return "created-bills";
    if (location.pathname === "/participated-bills")
      return "participated-bills";
    return "";
  };

  const activeTab = getActiveTab();

  const handleLogout = async () => {
    await disconnectWallet();
  };

  const handleNavigateToNewBill = () => {
    navigate("/new-bill");
  };

  const handleNavigateToFriends = () => {
    navigate("/friends");
  };

  const handleNavigateToCreatedBill = () => {
    navigate("/created-bills");
  };

  const handleNavigateToParticipatedBills = () => {
    navigate("/participated-bills");
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
    <header className="relative z-10 px-6 py-4 border-purple-700/50 backdrop-blur-sm">
      <nav className="flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-3 cursor-pointer">
            <div className="relative">
              <img
                className="w-8 h-8 text-fuchsia-400 animate-spin"
                style={{ animationDuration: "3s" }}
                src="https://rcxelnfhvbqszzccltry.supabase.co/storage/v1/object/sign/logo/SplitChain.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV81MDYxNWEyMi0yMDRlLTQzYzMtYjgwNy1lYTllZGI1YjgzMTMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJsb2dvL1NwbGl0Q2hhaW4ucG5nIiwiaWF0IjoxNzU0MzczNzA1LCJleHAiOjE4MTc0NDU3MDV9.3w7qGG5bAaOJS4b6aTUc_gR3HutrmWRoXIVIDrgoys0"
                alt=""
              />
              <div className="absolute inset-0 bg-fuchsia-400 blur-md opacity-50 animate-pulse"></div>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-200 to-purple-100 bg-clip-text text-transparent">
              Split Chain
            </h1>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={handleNavigateToNewBill}
              className={`relative flex items-center space-x-2 px-2 py-3 transition-all duration-300 cursor-pointer group ${
                activeTab === "new-bill"
                  ? "text-white"
                  : "text-purple-300 hover:text-purple-100"
              }`}
            >
              <Plus className="w-4 h-4" />
              <span>New Bill</span>
              <div
                className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-fuchsia-400 to-purple-400 transition-all duration-300 ${
                  activeTab === "new-bill" ? "w-full" : "w-0 group-hover:w-full"
                }`}
              ></div>
            </button>

            <button
              onClick={handleNavigateToFriends}
              className={`relative flex items-center space-x-2 px-2 py-3 transition-all duration-300 cursor-pointer group ${
                activeTab === "friends"
                  ? "text-white"
                  : "text-purple-300 hover:text-purple-100"
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Manage Friends</span>
              <div
                className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-fuchsia-400 to-purple-400 transition-all duration-300 ${
                  activeTab === "friends" ? "w-full" : "w-0 group-hover:w-full"
                }`}
              ></div>
            </button>

            <button
              onClick={handleNavigateToCreatedBill}
              className={`relative flex items-center space-x-2 px-2 py-3 transition-all duration-300 cursor-pointer group ${
                activeTab === "created-bills"
                  ? "text-white"
                  : "text-purple-300 hover:text-purple-100"
              }`}
            >
              <Receipt className="w-4 h-4" />
              <span>Created Bills</span>
              <div
                className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-fuchsia-400 to-purple-400 transition-all duration-300 ${
                  activeTab === "created-bills"
                    ? "w-full"
                    : "w-0 group-hover:w-full"
                }`}
              ></div>
            </button>

            <button
              onClick={handleNavigateToParticipatedBills}
              className={`relative flex items-center space-x-2 px-2 py-3 transition-all duration-300 cursor-pointer group ${
                activeTab === "participated-bills"
                  ? "text-white"
                  : "text-purple-300 hover:text-purple-100"
              }`}
            >
              <Receipt className="w-4 h-4" />
              <span>Participated Bills</span>
              <div
                className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-fuchsia-400 to-purple-400 transition-all duration-300 ${
                  activeTab === "participated-bills"
                    ? "w-full"
                    : "w-0 group-hover:w-full"
                }`}
              ></div>
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <InboxBell />
          <div className="hidden md:block text-right cursor-default">
            <div className="text-sm text-purple-200">Balance</div>
            <div className="font-semibold text-fuchsia-400 flex items-center">
              {balance?.hbars ? (
                `${balance.hbars}`
              ) : (
                <>
                  <svg
                    className="mr-2 size-5 animate-spin"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
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
                  Loading...
                </>
              )}
            </div>
          </div>
          <button
            onClick={handleLogout}
            disabled={isAuthLoading}
            className={`flex items-center space-x-2 px-4 py-2 bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 hover:text-purple-200 rounded-lg transition-all duration-300 border border-purple-500/30 cursor-pointer hover:border-purple-400/50 hover:shadow-lg hover:shadow-purple-500/20 ${
              isAuthLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isAuthLoading ? (
              <LoadingSpinner />
            ) : (
              <LogOut className="w-4 h-4" />
            )}
            <span className="hidden md:inline">
              {isAuthLoading ? "" : "Disconnect"}
            </span>
          </button>
        </div>
      </nav>
    </header>
  );
}
