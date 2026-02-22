"use client";

import { CheckCircle, TrendingUp, Zap } from "lucide-react";

interface TableDetailsViewProps {
  table: any;
}

export default function TableDetailsView({ table }: TableDetailsViewProps) {
  const status =
    table.freshness?.score < 50
      ? "stale"
      : table.risks?.length > 0
        ? "risk"
        : "healthy";

  // ✅ KEEP VARIABLES HERE (NOT INSIDE JSX)
  const qualityMap = Object.fromEntries(
    table.dataQuality?.map((q: any) => [q.column, q]) || [],
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">
              {table.tableName}
            </h3>

            <p className="text-gray-400 text-sm">
              {(table.rowCount ?? 0).toLocaleString()} rows ·{" "}
              {table.columns?.length ?? 0} columns
            </p>
          </div>

          <div
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              status === "healthy"
                ? "bg-green-500/20 text-green-400"
                : status === "risk"
                  ? "bg-yellow-500/20 text-yellow-400"
                  : "bg-red-500/20 text-red-400"
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </div>
        </div>

        <p className="text-gray-500 text-sm">
          Last updated:{" "}
          {new Date(table.freshness?.lastUpdated).toLocaleString()}
        </p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-4">
        <Metric
          icon={<CheckCircle className="w-6 h-6 text-green-400" />}
          label="Completeness"
          value={table.completeness?.score}
        />
        <Metric
          icon={<TrendingUp className="w-6 h-6 text-cyan-400" />}
          label="Uniqueness"
          value={table.uniqueness?.score}
        />
        <Metric
          icon={<Zap className="w-6 h-6 text-yellow-400" />}
          label="Freshness"
          value={table.freshness?.score}
        />
      </div>

      {/* Columns Table */}
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-6 overflow-x-auto">
        <h4 className="text-lg font-semibold text-white mb-4">Columns</h4>

        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left py-3 px-4 text-gray-400 font-medium">
                Column
              </th>
              <th className="text-left py-3 px-4 text-gray-400 font-medium">
                Type
              </th>
              <th className="text-left py-3 px-4 text-gray-400 font-medium">
                Nullable
              </th>
              <th className="text-left py-3 px-4 text-gray-400 font-medium">
                Completeness
              </th>
            </tr>
          </thead>

          <tbody>
            {table.columns?.map((col: any, idx: number) => {
              const quality = qualityMap[col.name];

              const completeness = quality?.completeness ?? 0;

              return (
                <tr
                  key={idx}
                  className="border-b border-white/5 hover:bg-white/5 transition"
                >
                  <td className="py-3 px-4 text-white font-medium">
                    {col.name}
                  </td>

                  <td className="py-3 px-4 text-gray-400">
                    <span className="px-2 py-1 bg-white/5 rounded text-xs">
                      {col.type}
                    </span>
                  </td>

                  <td className="py-3 px-4">
                    {col.nullable ? (
                      <span className="text-yellow-400 text-xs">Yes</span>
                    ) : (
                      <span className="text-green-400 text-xs">No</span>
                    )}
                  </td>

                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-20 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                          style={{ width: `${completeness}%` }}
                        />
                      </div>
                      <span className="text-gray-400 text-xs">
                        {completeness}%
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Business Summary */}
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-6">
        <h4 className="text-lg font-semibold text-white mb-4">
          Business Summary
        </h4>

        <p className="text-gray-400 text-sm leading-relaxed">
          {table.businessSummary ?? "No business summary available."}
        </p>
      </div>
    </div>
  );
}

function Metric({ icon, label, value }: any) {
  return (
    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-4 text-center">
      <div className="flex justify-center mb-2">{icon}</div>
      <p className="text-gray-400 text-xs font-medium">{label}</p>
      <p className="text-2xl font-bold text-white mt-1">
        {Math.round(value ?? 0)}%
      </p>
    </div>
  );
}
