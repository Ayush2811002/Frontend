"use client";

import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import DashboardContent from "@/components/DashboardContent";
import DatabaseModal from "@/components/DatabaseModal";
import { DashboardSkeleton } from "@/components/SkeletonLoader";
import ProfileModal from "@/components/ProfileModal";
export default function DashboardPage() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [showDatabaseModal, setShowDatabaseModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#001a33] via-[#000a15] to-[#0a0015] flex overflow-hidden">
      {/* Animated background orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -right-40 w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-gradient-to-bl from-cyan-500 to-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob" />
        <div
          className="absolute -bottom-40 -left-40 w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-gradient-to-tr from-violet-500 to-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-gradient-to-tr from-pink-500 to-rose-500 rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-blob"
          style={{ animationDelay: "4s" }}
        />
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-30 lg:hidden backdrop-blur-sm transition-opacity duration-300 ease-out"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Desktop always visible, Mobile/Tablet as drawer */}
      <div
        className={`fixed lg:relative z-40 lg:z-20 h-screen transition-all duration-500 ease-out transform lg:transform-none ${
          sidebarOpen
            ? "w-64 translate-x-0 shadow-2xl"
            : "-translate-x-full lg:translate-x-0 w-64"
        }`}
      >
        <Sidebar
          activeSection={activeSection}
          setActiveSection={(section) => {
            setActiveSection(section);
            setSidebarOpen(false);
          }}
          setShowDatabaseModal={setShowDatabaseModal}
          setShowProfileModal={setShowProfileModal}
        />
      </div>

      {/* Main content */}
      <div className="flex-1 relative z-10 w-full h-screen overflow-hidden flex flex-col">
        {/* Mobile/Tablet header */}
        <div className="lg:hidden sticky top-0 z-20 flex items-center justify-between px-4 py-3 bg-gradient-to-b from-[#000a15] via-[#000a15]/80 to-transparent backdrop-blur-md border-b border-white/10 transition-all duration-300">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-white/10 rounded-lg transition-all duration-200 active:scale-95"
          >
            <Menu className="w-6 h-6 text-cyan-400 hover:text-cyan-300 transition-colors" />
          </button>
          <div className="flex items-center gap-2 flex-1 justify-center">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center animate-glow-pulse">
              <span className="text-white font-bold text-sm">▧</span>
            </div>
            <span className="text-sm font-semibold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              NoMoreNulls
            </span>
          </div>
          <div className="w-10" />
        </div>

        {/* Content area */}
        {isLoading ? (
          <div className="flex-1 overflow-y-auto">
            <div className="p-3 sm:p-4 lg:p-8">
              <DashboardSkeleton />
            </div>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto">
            <DashboardContent
              activeSection={activeSection}
              setShowDatabaseModal={setShowDatabaseModal}
            />
          </div>
        )}
      </div>

      {/* Modal */}
      {showDatabaseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ease-out">
          <DatabaseModal
            onClose={() => setShowDatabaseModal(false)}
            onConnected={(metadata) => {
              console.log(metadata); // or save it in state
            }}
          />
        </div>
      )}
      {showProfileModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <ProfileModal onClose={() => setShowProfileModal(false)} />
        </div>
      )}
    </div>
  );
}
