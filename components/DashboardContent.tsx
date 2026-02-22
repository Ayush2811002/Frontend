"use client";

import { useEffect, useState } from "react";
import {
  Database,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Columns,
  Rows,
  Clock,
  Zap,
} from "lucide-react";
import MetadataExplorer from "./MetadataExplorer";
import DataQuality from "./DataQuality";
import AIChatInterface from "./AIChatInterface";
import AlertsPanel from "./AlertsPanel";
import DataLineage from "./DataLineage";
import { Island_Moments } from "next/font/google";

interface DashboardContentProps {
  activeSection: string;
  setShowDatabaseModal: (show: boolean) => void;
  dbMetadata: any[] | null; // 🔥 NEW PROP
  isLoading: boolean;
}

export default function DashboardContent({
  activeSection,
  setShowDatabaseModal,
  dbMetadata,

  isLoading,
}: DashboardContentProps) {
  // const loading = !dbMetadata;
  if (isLoading) {
    return (
      <div className="flex item-center justify-center h-full text-gray-400">
        loding/......
      </div>
    );
  }

  //
  const hoursBetween = (date: Date) =>
    (Date.now() - date.getTime()) / (1000 * 60 * 60);

  const freshnessScore = (lastUpdated: string) => {
    const hours = hoursBetween(new Date(lastUpdated));

    if (hours <= 24) return 100;
    if (hours <= 72) return 80;
    if (hours <= 168) return 60;
    return 40;
  }; // --- HEALTH CALCULATION ---
  //freshnessScore can be used in the health calculation for each table, along with completeness and uniqueness, to give a more holistic view of data quality.

  //last
  const timeAgo = (date: Date) => {
    const mins = Math.floor((Date.now() - date.getTime()) / 60000);
    if (mins < 1) return "Just now";
    if (mins < 60) return `${mins} min ago`;
    if (mins < 1440) return `${Math.floor(mins / 60)} hrs ago`;
    return `${Math.floor(mins / 1440)} days ago`;
  };
  const freshnessValues =
    dbMetadata?.map((table) => freshnessScore(table.freshness?.lastUpdated)) ??
    [];

  const avgFreshness =
    freshnessValues.length > 0
      ? Math.round(
          freshnessValues.reduce((a, b) => a + b, 0) / freshnessValues.length,
        )
      : 0;
  //

  const lastSyncDate =
    dbMetadata
      ?.map((t) => new Date(t.freshness?.lastUpdated))
      .sort((a, b) => b.getTime() - a.getTime())[0] ?? null;
  const topTables =
    dbMetadata
      ?.map((table) => {
        const columnCount = table.columns?.length ?? 0;

        // --- HEALTH CALCULATION ---
        const avgCompleteness =
          table.dataQuality?.reduce(
            (sum: number, col: any) => sum + col.completeness,
            0,
          ) / (table.dataQuality?.length || 1);

        const avgUniqueness =
          table.dataQuality?.reduce(
            (sum: number, col: any) => sum + col.uniqueness,
            0,
          ) / (table.dataQuality?.length || 1);
        const riskPenalty = table.risks?.length ? table.risks.length * 10 : 0;

        const health = Math.max(
          0,
          Math.min(
            100,
            Math.round((avgCompleteness + avgUniqueness) / 2 - riskPenalty),
          ),
        );

        // --- SIZE ESTIMATION ---
        const estimatedSizeMB = (columnCount * 0.18).toFixed(2);

        return {
          name: table.tableName,
          size: `${estimatedSizeMB} MB`,
          health,
        };
      })
      .sort((a, b) => parseFloat(b.size) - parseFloat(a.size))
      .slice(0, 5) ?? [];
  const totalTables = dbMetadata?.length ?? 0;
  const totalColumns =
    dbMetadata?.reduce((sum, table) => sum + (table.columns?.length || 0), 0) ??
    0;

  const metrics = [
    {
      label: "Total Tables",
      value: totalTables,
      icon: Database,
      color: "from-cyan-500 to-blue-500",
    },
    {
      label: "Healthy Tables",
      value: Math.floor(totalTables * 0.75),
      icon: CheckCircle,
      color: "from-green-500 to-emerald-500",
    },
    {
      label: "Risky Tables",
      value: Math.floor(totalTables * 0.25),
      icon: AlertTriangle,
      color: "from-yellow-500 to-orange-500",
    },
    {
      label: "Avg Freshness",
      value: `${avgFreshness}%`,
      icon: TrendingUp,
      color: "from-purple-500 to-pink-500",
    },
  ];
  const detailedMetrics = [
    {
      label: "Total Columns",
      value: totalColumns.toLocaleString(),
      icon: Columns,
      color: "from-blue-500 to-cyan-500",
      change: "+12",
    },
    {
      label: "Total Records",
      value: "—", // optional: compute later if you add row counts
      icon: Rows,
      color: "from-green-500 to-emerald-500",
      change: "+2.5M",
    },
    {
      label: "Last Sync",
      value: lastSyncDate ? timeAgo(lastSyncDate) : "—",
      icon: Clock,
      color: "from-orange-500 to-red-500",
      change: "ago",
    },
    {
      label: "Data Quality",
      value: "92%",
      icon: Zap,
      color: "from-violet-500 to-purple-500",
      change: "+3%",
    },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case "explorer":
        return <MetadataExplorer />;
      case "quality":
        return <DataQuality metadata={dbMetadata || []} />;
      case "chat":
        return <AIChatInterface />;
      case "alerts":
        return <AlertsPanel metadata={dbMetadata || []} />;
      case "lineage":
        return <DataLineage />;
      default:
        return (
          <div className="space-y-6 sm:space-y-8 animate-slide-in-up">
            <div className="animate-slide-in-left">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-1 sm:mb-2">
                Dashboard
              </h2>
              <p className="text-xs sm:text-sm md:text-base text-gray-400">
                Welcome to NoMoreNulls - Your AI-Powered Data Intelligence
                Platform
              </p>
            </div>

            {/* Main metrics grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
              {metrics.map((metric, idx) => {
                const Icon = metric.icon;
                return (
                  <div
                    key={idx}
                    style={{ animationDelay: `${idx * 80}ms` }}
                    className="group glass-effect rounded-xl p-3 sm:p-4 hover:bg-white/15 transition-all duration-500 ease-out animate-slide-in-up cursor-pointer transform hover:scale-105 hover:-translate-y-2 active:scale-95"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div
                        className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br ${metric.color} p-2 sm:p-3 group-hover:shadow-lg group-hover:shadow-cyan-500/50 group-hover:scale-110 transition-all duration-500 ease-out animate-glow-pulse`}
                      >
                        <Icon className="w-full h-full text-white" />
                      </div>
                    </div>
                    <p className="text-gray-400 text-xs sm:text-sm font-medium mb-1 truncate">
                      {metric.label}
                    </p>
                    <p className="text-lg sm:text-xl md:text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">
                      {metric.value}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Detailed metrics grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
              {detailedMetrics.map((metric, idx) => {
                const Icon = metric.icon;
                return (
                  <div
                    key={idx}
                    style={{ animationDelay: `${(idx + 4) * 80}ms` }}
                    className="group glass-effect rounded-xl p-3 sm:p-4 hover:bg-white/15 transition-all duration-500 ease-out animate-slide-in-up cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div
                        className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br ${metric.color} p-2 sm:p-3 group-hover:shadow-lg group-hover:scale-110 transition-all duration-500 ease-out`}
                      >
                        <Icon className="w-full h-full text-white" />
                      </div>
                      <span className="text-xs font-semibold text-green-400 bg-green-500/20 px-2 py-1 rounded-full">
                        {metric.change}
                      </span>
                    </div>
                    <p className="text-gray-400 text-xs sm:text-sm font-medium mb-1 truncate">
                      {metric.label}
                    </p>
                    <p className="text-base sm:text-lg md:text-xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">
                      {metric.value}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {/* Recent Activity */}
              <div
                className="glass-effect rounded-xl sm:rounded-2xl p-4 sm:p-6 animate-slide-in-up"
                style={{ animationDelay: "80ms" }}
              >
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-white mb-3 sm:mb-4">
                  Recent Activity
                </h3>
                <div className="space-y-2 sm:space-y-4">
                  {[
                    {
                      action: "Database connected",
                      time: "2 hours ago",
                      status: "success",
                    },
                    {
                      action: "Quality scan completed",
                      time: "4 hours ago",
                      status: "success",
                    },
                    {
                      action: "Alert triggered on users_table",
                      time: "6 hours ago",
                      status: "warning",
                    },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between pb-2 sm:pb-4 border-b border-white/5 last:border-0 hover:bg-white/5 p-2 rounded transition-all duration-300 ease-out group"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="text-gray-200 text-xs sm:text-sm group-hover:text-white transition-colors duration-300 truncate">
                          {item.action}
                        </p>
                        <p className="text-gray-500 text-xs">{item.time}</p>
                      </div>
                      <div
                        className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full flex-shrink-0 ml-2 animate-scale-bounce ${item.status === "success" ? "bg-green-500" : "bg-yellow-500"}`}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Tables */}
              <div
                className="glass-effect rounded-xl sm:rounded-2xl p-4 sm:p-6 animate-slide-in-up"
                style={{ animationDelay: "160ms" }}
              >
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-white mb-3 sm:mb-4">
                  Top Tables by Size
                </h3>
                <div className="space-y-2 sm:space-y-4">
                  {topTables.map((table, idx) => (
                    <div
                      key={idx}
                      className="pb-2 sm:pb-4 border-b border-white/5 last:border-0 group hover:bg-white/5 p-2 rounded transition-all duration-300 ease-out"
                    >
                      <div className="flex items-center justify-between mb-1 sm:mb-2 gap-2">
                        <p className="text-gray-200 text-xs sm:text-sm font-medium group-hover:text-cyan-400 transition-colors duration-300 truncate">
                          {table.name}
                        </p>
                        <p className="text-gray-500 text-xs flex-shrink-0">
                          {table.size}
                        </p>
                      </div>

                      <div className="w-full h-1.5 sm:h-2 bg-white/5 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            table.health > 80
                              ? "bg-gradient-to-r from-green-500 to-emerald-500"
                              : table.health > 50
                                ? "bg-gradient-to-r from-yellow-500 to-orange-500"
                                : "bg-gradient-to-r from-red-500 to-pink-500"
                          }`}
                          style={{ width: `${table.health}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-3 sm:p-4 md:p-6 lg:p-8">{renderContent()}</div>
    </div>
  );
}
