"use client";

import { useState } from "react";
import {
  Search,
  ChevronRight,
  CheckCircle,
  AlertTriangle,
  Clock,
} from "lucide-react";
import TableDetailsView from "./TableDetailsView";

interface Table {
  id: string;
  name: string;
  status: "healthy" | "risk" | "stale";
  rowCount: number;
  columns: number;
  lastUpdated: string;
}

const tables: Table[] = [
  {
    id: "1",
    name: "transactions",
    status: "healthy",
    rowCount: 2400000,
    columns: 15,
    lastUpdated: "2 hours ago",
  },
  {
    id: "2",
    name: "user_profiles",
    status: "healthy",
    rowCount: 850000,
    columns: 22,
    lastUpdated: "1 hour ago",
  },
  {
    id: "3",
    name: "orders",
    status: "risk",
    rowCount: 1200000,
    columns: 18,
    lastUpdated: "12 hours ago",
  },
  {
    id: "4",
    name: "analytics_events",
    status: "stale",
    rowCount: 5600000,
    columns: 25,
    lastUpdated: "3 days ago",
  },
  {
    id: "5",
    name: "customer_data",
    status: "healthy",
    rowCount: 450000,
    columns: 12,
    lastUpdated: "30 mins ago",
  },
];

export default function MetadataExplorer() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTable, setSelectedTable] = useState<Table | null>(tables[0]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "healthy":
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case "risk":
        return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
      case "stale":
        return <Clock className="w-5 h-5 text-red-400" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "bg-green-500/10 text-green-400";
      case "risk":
        return "bg-yellow-500/10 text-yellow-400";
      case "stale":
        return "bg-red-500/10 text-red-400";
      default:
        return "";
    }
  };

  const filteredTables = tables.filter((t) =>
    t.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="space-y-6 animate-slide-in-up">
      <div className="animate-slide-in-left">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">
          Metadata Explorer
        </h2>
        <p className="text-sm sm:text-base text-gray-400">
          Browse and explore your database metadata
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Table List */}
        <div
          className="lg:col-span-1 glass-effect rounded-2xl p-6 animate-slide-in-left"
          style={{ animationDelay: "100ms" }}
        >
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tables..."
                className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/30 transition text-sm"
              />
            </div>
          </div>

          <div className="space-y-2 max-h-96 overflow-y-auto">
            {filteredTables.map((table, idx) => (
              <button
                key={table.id}
                onClick={() => setSelectedTable(table)}
                style={{ animationDelay: `${idx * 50}ms` }}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all animate-slide-in-left group transform hover:scale-105 ${
                  selectedTable?.id === table.id
                    ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 shadow-lg shadow-cyan-500/20"
                    : "hover:bg-white/10 border border-white/10 hover:border-cyan-500/30"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium truncate group-hover:text-cyan-400 transition-colors">
                      {table.name}
                    </p>
                    <p className="text-gray-500 text-xs">
                      {table.columns} cols
                    </p>
                  </div>
                  <div className="group-hover:scale-110 transition-transform">
                    {getStatusIcon(table.status)}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Table Details */}
        <div
          className="lg:col-span-2 animate-slide-in-up"
          style={{ animationDelay: "200ms" }}
        >
          {selectedTable ? (
            <TableDetailsView table={selectedTable} />
          ) : (
            <div className="glass-effect rounded-2xl p-8 sm:p-12 text-center">
              <p className="text-gray-400 text-sm sm:text-base">
                Select a table to view details
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
