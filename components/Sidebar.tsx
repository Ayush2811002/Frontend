"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  Database,
  BarChart3,
  MessageCircle,
  AlertCircle,
  Network,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  setShowDatabaseModal: (show: boolean) => void;
}

export default function Sidebar({
  activeSection,
  setActiveSection,
  setShowDatabaseModal,
}: SidebarProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "explorer", label: "Metadata Explorer", icon: Database },
    { id: "quality", label: "Data Quality", icon: BarChart3 },
    { id: "chat", label: "AI Chat", icon: MessageCircle },
    { id: "alerts", label: "Alerts", icon: AlertCircle },
    { id: "lineage", label: "Data Lineage", icon: Network },
  ];

  return (
    <div className="w-64 glass-effect border-r border-white/10 flex flex-col transition-all duration-500 ease-out h-full overflow-hidden">
      {/* Logo */}
      <div className="p-4 sm:p-6 border-b border-white/10 flex items-center gap-2 sm:gap-3">
        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center animate-glow-pulse transition-transform duration-500 group hover:scale-110 flex-shrink-0">
          <span className="text-white font-bold text-sm sm:text-base">▧</span>
        </div>
        <div className="animate-slide-in-left min-w-0 flex-1">
          <h1 className="text-base sm:text-lg font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent truncate">
            NoMoreNulls
          </h1>
          <p className="text-xs text-gray-500 truncate">Intelligence</p>
        </div>
      </div>

      {/* Menu items */}
      <nav className="flex-1 p-3 sm:p-4 space-y-1.5 sm:space-y-2 overflow-y-auto">
        {menuItems.map((item, idx) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              style={{ animationDelay: `${idx * 40}ms` }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-500 ease-out animate-slide-in-left group ${
                isActive
                  ? "bg-gradient-to-r from-cyan-500/25 to-blue-500/25 border border-cyan-500/40 text-cyan-400 shadow-lg shadow-cyan-500/20"
                  : "text-gray-400 hover:text-gray-300 hover:bg-white/10 hover:border hover:border-cyan-500/20"
              } active:scale-95`}
            >
              <Icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-300 flex-shrink-0" />
              <span className="text-sm font-medium truncate">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Database connection */}
      <div className="p-4 border-t border-white/10">
        <button
          onClick={() => setShowDatabaseModal(true)}
          className="w-full flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg text-white text-sm font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 group animate-slide-in-up"
        >
          <Database className="w-5 h-5 group-hover:scale-110 transition-transform flex-shrink-0" />
          <span className="truncate">Connect</span>
        </button>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-white/10 space-y-2">
        <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-gray-300 hover:bg-white/10 rounded-lg transition-all duration-200 text-sm group">
          <Settings className="w-5 h-5 group-hover:rotate-90 transition-transform flex-shrink-0" />
          <span className="truncate">Settings</span>
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all duration-200 text-sm group">
          <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform flex-shrink-0" />
          <span className="truncate">Logout</span>
        </button>
      </div>
    </div>
  );
}
