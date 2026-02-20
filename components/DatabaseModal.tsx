"use client";

import { useState } from "react";
import { X, Zap, Check } from "lucide-react";

interface DatabaseModalProps {
  onClose: () => void;
}

export default function DatabaseModal({ onClose }: DatabaseModalProps) {
  const [formData, setFormData] = useState({
    host: "",
    username: "",
    password: "",
    database: "",
    dbType: "PostgreSQL",
  });
  const [testing, setTesting] = useState(false);
  const [testSuccess, setTestSuccess] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const API_URL = "http://localhost:5000";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // const handleTestConnection = async () => {
  //   setTesting(true);
  //   await new Promise((resolve) => setTimeout(resolve, 1500));
  //   setTesting(false);
  //   setTestSuccess(true);
  // };
  const handleTestConnection = async () => {
    try {
      setTesting(true);
      setTestSuccess(false);

      const response = await fetch(`${API_URL}/api/metadata/extract`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          host: formData.host,
          user: formData.username,
          password: formData.password,
          database: formData.database,
        }),
      });

      if (!response.ok) throw new Error("Connection Failed");

      setTestSuccess(true);
    } catch (error) {
      console.error(error);
      alert("Connection Failed ❌");
    } finally {
      setTesting(false);
    }
  };

  // const handleConnect = async () => {
  //   setConnecting(true);
  //   await new Promise((resolve) => setTimeout(resolve, 1500));
  //   setConnecting(false);
  //   onClose();
  // };
  const handleConnect = async () => {
    try {
      setConnecting(true);

      const response = await fetch(`${API_URL}/api/metadata/extract`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          host: formData.host,
          user: formData.username,
          password: formData.password,
          database: formData.database,
        }),
      });

      const data = await response.json();

      console.log("FULL METADATA:", data);

      // 👉 Later we push this to dashboard state/store
      onClose();
    } catch (error) {
      console.error(error);
      alert("Failed to fetch metadata ❌");
    } finally {
      setConnecting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in-scale">
      <div className="glass-effect-neon rounded-2xl p-6 sm:p-8 w-full max-w-md shadow-2xl animate-slide-in-up transform hover:scale-105 transition-transform duration-300">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Connect Database
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Add a new data source to analyze
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Form */}
        <form className="space-y-4 animate-slide-in-up">
          {/* Database Type */}
          <div
            className="animate-slide-in-up"
            style={{ animationDelay: "50ms" }}
          >
            <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
              Database Type
            </label>
            <select
              name="dbType"
              value={formData.dbType}
              onChange={handleChange}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/30 transition hover:bg-white/15"
            >
              <option value="PostgreSQL" className="bg-gray-800">
                PostgreSQL
              </option>
              <option value="MySQL" className="bg-gray-800">
                MySQL
              </option>
              <option value="Snowflake" className="bg-gray-800">
                Snowflake
              </option>
            </select>
          </div>

          {/* Host */}
          <div
            className="animate-slide-in-up"
            style={{ animationDelay: "100ms" }}
          >
            <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
              Host
            </label>
            <input
              type="text"
              name="host"
              value={formData.host}
              onChange={handleChange}
              placeholder="db.example.com"
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-600 text-sm focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/30 transition hover:bg-white/15"
            />
          </div>

          {/* Username */}
          <div
            className="animate-slide-in-up"
            style={{ animationDelay: "150ms" }}
          >
            <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="admin"
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-600 text-sm focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/30 transition hover:bg-white/15"
            />
          </div>

          {/* Password */}
          <div
            className="animate-slide-in-up"
            style={{ animationDelay: "200ms" }}
          >
            <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-600 text-sm focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/30 transition hover:bg-white/15"
            />
          </div>

          {/* Database Name */}
          <div
            className="animate-slide-in-up"
            style={{ animationDelay: "250ms" }}
          >
            <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
              Database Name
            </label>
            <input
              type="text"
              name="database"
              value={formData.database}
              onChange={handleChange}
              placeholder="production"
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-600 text-sm focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/30 transition hover:bg-white/15"
            />
          </div>

          {/* Test Connection Status */}
          {testSuccess && (
            <div className="flex items-center gap-2 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
              <Check className="w-5 h-5 text-green-400" />
              <span className="text-sm text-green-400">
                Connection successful!
              </span>
            </div>
          )}

          {/* Action Buttons */}
          <div
            className="flex flex-col sm:flex-row gap-3 pt-4 sm:pt-6 animate-slide-in-up"
            style={{ animationDelay: "300ms" }}
          >
            <button
              type="button"
              onClick={handleTestConnection}
              disabled={testing}
              className="flex items-center justify-center gap-2 px-4 py-2.5 sm:py-3 bg-white/10 border border-white/20 rounded-lg text-white font-semibold text-sm sm:text-base hover:bg-white/15 hover:border-cyan-500/30 transition-all duration-200 disabled:opacity-50 group"
            >
              {testing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span className="hidden sm:inline">Testing...</span>
                  <span className="sm:hidden">Test...</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span className="hidden sm:inline">Test Connection</span>
                  <span className="sm:hidden">Test</span>
                </>
              )}
            </button>
            <button
              type="button"
              onClick={handleConnect}
              disabled={connecting || !testSuccess}
              className="flex-1 sm:flex-none relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg blur opacity-75 group-hover:opacity-100 transition group-disabled:opacity-30" />
              <div className="relative flex items-center justify-center gap-2 px-4 py-2.5 sm:py-3 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg text-white font-semibold text-sm sm:text-base group-disabled:opacity-70 group-hover:shadow-lg group-hover:shadow-cyan-500/50 transition-all">
                {connecting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span className="hidden sm:inline">Connecting...</span>
                    <span className="sm:hidden">Connect...</span>
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span className="hidden sm:inline">Connect</span>
                    <span className="sm:hidden">Done</span>
                  </>
                )}
              </div>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
