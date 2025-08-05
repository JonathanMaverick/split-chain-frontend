import {
  Zap,
  ArrowRight,
  Upload,
  Sparkles,
  Shield,
  Globe,
  Users,
  Receipt,
  Wallet,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useWallet } from "../contexts/WalletContext";

const BUTTON_GRADIENT =
  "bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500";
const BUTTON_BASE =
  "text-white shadow-purple-500/30 transition-all duration-300 transform hover:scale-105 active:scale-95";
const TEXT_GRADIENT =
  "bg-gradient-to-r from-white via-purple-100 to-purple-200 bg-clip-text text-transparent";

export default function Landing() {
  const [isVisible, setIsVisible] = useState(false);
  const { connectWallet, isAuthLoading } = useWallet();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleLogin = async () => {
    await connectWallet();
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
    <div className="min-h-screen bg-transparent text-white overflow-hidden">
      <header className="relative z-10 px-6 py-8">
        <nav
          className={`flex justify-between items-center max-w-7xl mx-auto ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-10"
          }`}
        >
          <div className="flex items-center space-x-3">
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
          <button
            onClick={connectWallet}
            disabled={isAuthLoading}
            className={`px-6 py-3 rounded-full font-semibold ${BUTTON_BASE} ${BUTTON_GRADIENT} shadow-lg hover:shadow-sm ${
              isAuthLoading ? "cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            <div className="flex items-center space-x-2">
              {isAuthLoading ? (
                <LoadingSpinner />
              ) : (
                <Wallet className="w-4 h-4" />
              )}
              <span>
                {isAuthLoading ? "Connecting..." : "Connect HashPack"}
              </span>
            </div>
          </button>
        </nav>
      </header>

      <section className="relative z-10 px-6 pt-20 pb-32">
        <div className="max-w-6xl mx-auto text-center">
          <div
            className={`transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
              <span className={TEXT_GRADIENT}>Split Bills</span>
              <br />
              <span className="bg-gradient-to-r from-purple-300 to-fuchsia-400 bg-clip-text text-transparent">
                with Crypto
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Revolutionary bill splitting powered by Hedera HBAR. Upload
              receipts, let AI handle the OCR, and split payments seamlessly
              with your friends.
            </p>
          </div>

          <div
            className={`transition-all duration-1000 delay-500 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <button
              onClick={handleLogin}
              disabled={isAuthLoading}
              className={`group px-12 py-6 rounded-full font-bold text-xl hover:shadow-sm hover:shadow-purple-400/30 ${BUTTON_BASE} ${BUTTON_GRADIENT} ${
                isAuthLoading ? "cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              <div className="flex items-center space-x-3">
                {isAuthLoading ? (
                  <>
                    <LoadingSpinner />
                    <span>Connecting Wallet...</span>
                  </>
                ) : (
                  <>
                    <span>Get Started</span>
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
                  </>
                )}
              </div>
            </button>
          </div>
        </div>
      </section>

      <section className="relative z-10 px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div
            className={`text-center mb-16 transition-all duration-1000 delay-700 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h3 className="text-4xl font-bold mb-4">
              <span className={TEXT_GRADIENT}>How It Works</span>
            </h3>
            <p className="text-slate-300 text-lg">
              Simple, secure, and seamless bill splitting in three steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Upload,
                title: "Upload Receipt",
                description:
                  "Snap a photo or upload your bill. Our AI OCR technology instantly reads and processes all items.",
                gradient: "from-purple-800/40 to-purple-700/40",
                iconBg: "from-purple-600 to-purple-700",
                borderColor: "border-purple-500/30",
              },
              {
                icon: Users,
                title: "Assign Items",
                description:
                  "Choose who pays for what with our intuitive interface. Split items among multiple people effortlessly.",
                gradient: "from-purple-800/40 to-purple-700/40",
                iconBg: "from-purple-600 to-purple-700",
                borderColor: "border-purple-500/30",
              },
              {
                icon: Wallet,
                title: "Pay with HBAR",
                description:
                  "Secure payments using Hedera HBAR cryptocurrency through your connected HashPack wallet.",
                gradient: "from-purple-800/40 to-purple-700/40",
                iconBg: "from-purple-600 to-purple-700",
                borderColor: "border-purple-500/30",
              },
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className={`group p-8 rounded-2xl bg-gradient-to-br ${
                    feature.gradient
                  } border ${
                    feature.borderColor
                  } transition-all duration-400 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 backdrop-blur-sm ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                  }`}
                >
                  <div className="relative mb-6 flex items-center justify-center">
                    <div
                      className={`w-16 h-16 bg-gradient-to-br ${feature.iconBg} rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300`}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <h4 className="text-xl font-bold mb-4 text-purple-100 text-center">
                    {feature.title}
                  </h4>
                  <p className="text-slate-300 leading-relaxed text-center">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative z-10 px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div
            className={`text-center mb-16 transition-all duration-1000 delay-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h3 className="text-4xl font-bold mb-4">
              <span className={TEXT_GRADIENT}>Why Choose Split Chain?</span>
            </h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Shield,
                title: "Secure",
                desc: "Blockchain-powered security",
                gradient: "from-purple-700/30 to-purple-900/30",
                iconColor: "text-purple-300",
                borderColor: "border-purple-400/20",
              },
              {
                icon: Zap,
                title: "Fast",
                desc: "Instant OCR processing",
                gradient: "from-purple-700/30 to-purple-900/30",
                iconColor: "text-purple-300",
                borderColor: "border-purple-400/20",
              },
              {
                icon: Globe,
                title: "Decentralized",
                desc: "Built on Hedera network",
                gradient: "from-purple-700/30 to-purple-900/30",
                iconColor: "text-purple-300",
                borderColor: "border-purple-400/20",
              },
              {
                icon: Sparkles,
                title: "Smart",
                desc: "AI-powered receipt reading",
                gradient: "from-purple-700/30 to-purple-900/30",
                iconColor: "text-purple-300",
                borderColor: "border-purple-400/20",
              },
            ].map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={index}
                  className={`group p-6 rounded-xl bg-gradient-to-br ${
                    benefit.gradient
                  } backdrop-blur-sm border ${
                    benefit.borderColor
                  } text-center transition-all duration-400 hover:scale-105 hover:shadow-xl delay-${
                    1200 + index * 200
                  } ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                  }`}
                >
                  <Icon
                    className={`w-10 h-10 ${benefit.iconColor} mx-auto mb-4 group-hover:animate-pulse`}
                  />
                  <h4 className="font-bold text-purple-100 mb-2">
                    {benefit.title}
                  </h4>
                  <p className="text-slate-300 text-sm">{benefit.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative z-10 px-6 py-20">
        <div
          className={`max-w-4xl mx-auto text-center transition-all duration-1000 delay-1500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="p-12 rounded-3xl bg-gradient-to-r from-purple-800/30 to-purple-700/30 backdrop-blur-sm border border-purple-400/30 relative overflow-hidden">
            <div className="relative z-10">
              <Receipt className="w-16 h-16 text-purple-300 mx-auto mb-6 animate-bounce" />
              <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-200 to-purple-300 bg-clip-text text-transparent">
                Ready to Split Smart?
              </h3>
              <p className="text-slate-200 text-lg mb-8">
                Join the future of bill splitting with cryptocurrency payments
              </p>
              <button
                onClick={handleLogin}
                disabled={isAuthLoading}
                className={`group px-10 py-4 rounded-full font-bold text-lg hover:shadow-xl hover:shadow-purple-400/30 ${BUTTON_BASE} ${BUTTON_GRADIENT} ${
                  isAuthLoading ? "cursor-not-allowed" : "cursor-pointer"
                }`}
              >
                <div className="flex items-center space-x-3">
                  {isAuthLoading ? (
                    <>
                      <LoadingSpinner />
                      <span>Connecting...</span>
                    </>
                  ) : (
                    <>
                      <span>Start Splitting Now</span>
                      <Sparkles className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                    </>
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>

      <footer className="relative z-10 px-6 py-12">
        <div
          className={`max-w-6xl mx-auto text-center transition-all duration-1000 delay-1700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="relative">
              <img
                className="w-8 h-8 text-fuchsia-400 animate-spin"
                style={{ animationDuration: "3s" }}
                src="https://rcxelnfhvbqszzccltry.supabase.co/storage/v1/object/sign/logo/SplitChain.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV81MDYxNWEyMi0yMDRlLTQzYzMtYjgwNy1lYTllZGI1YjgzMTMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJsb2dvL1NwbGl0Q2hhaW4ucG5nIiwiaWF0IjoxNzU0MzczNzA1LCJleHAiOjE4MTc0NDU3MDV9.3w7qGG5bAaOJS4b6aTUc_gR3HutrmWRoXIVIDrgoys0"
                alt=""
              />
              <div className="absolute inset-0 bg-fuchsia-400 blur-md opacity-50 animate-pulse"></div>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-200 to-purple-300 bg-clip-text text-transparent">
              Split Chain
            </span>
          </div>
          <p className="text-slate-400">
            Powered by Hedera Network • Built for the Future
          </p>
        </div>
      </footer>
    </div>
  );
}
