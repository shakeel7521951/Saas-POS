import React, { useState } from "react";
import { Maximize, Minimize } from "lucide-react";

const FullscreenWrapper = ({ children, activeTab, transactionTypes }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      document.documentElement.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
    setIsFullscreen(!isFullscreen);
  };

  const getCurrentTabGradient = () => {
    const currentTab = transactionTypes.find((tab) => tab.id === activeTab);
    if (!currentTab) return "from-blue-400 via-blue-500 to-blue-600";

    switch (currentTab.id) {
      case "quotation":
        return "from-gray-400 via-gray-500 to-gray-600";
      case "order":
        return "from-yellow-400 via-yellow-500 to-yellow-600";
      case "sales":
        return "from-blue-400 via-blue-500 to-blue-600";
      case "returns":
        return "from-red-400 via-red-500 to-red-600";
      default:
        return "from-blue-400 via-blue-500 to-blue-600";
    }
  };

  // Get gradient classes for current tab
  const gradientClasses = getCurrentTabGradient();

  return (
    <div
      className={`${
        isFullscreen
          ? `fixed inset-0 z-50 bg-gradient-to-br ${gradientClasses}`
          : `relative bg-gradient-to-br ${gradientClasses}`
      } min-h-screen transition-all duration-500 ease-in-out`}
      style={{
        backgroundImage: `
                radial-gradient(circle at 20% 50%, rgba(255,255,255,0.4) 0%, transparent 60%),
                radial-gradient(circle at 80% 20%, rgba(255,255,255,0.3) 0%, transparent 60%),
                radial-gradient(circle at 40% 80%, rgba(255,255,255,0.2) 0%, transparent 60%)
            `,
      }}
    >
      {/* Fullscreen Toggle Button */}
      <div className="absolute right-0 z-50 ">
        <button
          onClick={toggleFullscreen}
          className={`
                    group relative overflow-hidden 
                    ${
                      isFullscreen
                        ? "bg-black hover:bg-black text-white shadow-2xl top-4.5 right-4.5"
                        : " bg-black hover:bg-black text-white top-0.5 shadow-lg hover:shadow-xl right-2"
                    }
                    backdrop-blur-md border border-white/20
                    px-4 py-3 rounded-xl
                    transition-all duration-300 ease-out
                    transform hover:scale-105 active:scale-95
                    flex items-center gap-2
                    font-medium text-sm
                `}
          title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
        >
          <div className="flex items-center gap-2">
            {isFullscreen ? (
              <>
                <Minimize className="h-4 w-4 transition-transform group-hover:scale-110" />
                <span className="hidden sm:inline">Exit Fullscreen</span>
              </>
            ) : (
              <>
                <Maximize className="h-4 w-4 transition-transform group-hover:scale-110" />
                <span className="hidden sm:inline">Fullscreen</span>
              </>
            )}
          </div>

          {/* Subtle animation background */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
        </button>
      </div>

      {/* Content with fullscreen styling */}
      <div className={`h-full`}>
        {isFullscreen ? (
          <div
            className={`backdrop-blur-sm p-2 h-full shadow-2xl border border-white/30 bg-gradient-to-br ${gradientClasses}`}
          >
            {children}
          </div>
        ) : (
          <div
            className={`bg-gradient-to-br ${gradientClasses} backdrop-blur-sm h-full rounded-lg shadow-lg`}
          >
            {children}
          </div>
        )}
      </div>
    </div>
  );
};

export default FullscreenWrapper;
