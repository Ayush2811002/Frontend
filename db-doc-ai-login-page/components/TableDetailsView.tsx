'use client';

import { CheckCircle, AlertTriangle, TrendingUp, Zap } from 'lucide-react';

interface Table {
  id: string;
  name: string;
  status: 'healthy' | 'risk' | 'stale';
  rowCount: number;
  columns: number;
  lastUpdated: string;
}

interface TableDetailsViewProps {
  table: Table;
}

export default function TableDetailsView({ table }: TableDetailsViewProps) {
  const sampleColumns = [
    { name: 'id', type: 'bigint', nullable: false, completeness: 100 },
    { name: 'user_id', type: 'bigint', nullable: false, completeness: 98 },
    { name: 'amount', type: 'decimal', nullable: false, completeness: 100 },
    { name: 'status', type: 'varchar', nullable: false, completeness: 95 },
    { name: 'created_at', type: 'timestamp', nullable: false, completeness: 100 },
    { name: 'updated_at', type: 'timestamp', nullable: true, completeness: 87 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">{table.name}</h3>
            <p className="text-gray-400 text-sm">
              {table.rowCount.toLocaleString()} rows · {table.columns} columns
            </p>
          </div>
          <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
            table.status === 'healthy' ? 'bg-green-500/20 text-green-400' :
            table.status === 'risk' ? 'bg-yellow-500/20 text-yellow-400' :
            'bg-red-500/20 text-red-400'
          }`}>
            {table.status.charAt(0).toUpperCase() + table.status.slice(1)}
          </div>
        </div>
        <p className="text-gray-500 text-sm">Last updated: {table.lastUpdated}</p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-4">
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-4 text-center">
          <div className="flex justify-center mb-2">
            <CheckCircle className="w-6 h-6 text-green-400" />
          </div>
          <p className="text-gray-400 text-xs font-medium">Completeness</p>
          <p className="text-2xl font-bold text-white mt-1">98%</p>
        </div>
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-4 text-center">
          <div className="flex justify-center mb-2">
            <TrendingUp className="w-6 h-6 text-cyan-400" />
          </div>
          <p className="text-gray-400 text-xs font-medium">Uniqueness</p>
          <p className="text-2xl font-bold text-white mt-1">99.2%</p>
        </div>
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-4 text-center">
          <div className="flex justify-center mb-2">
            <Zap className="w-6 h-6 text-yellow-400" />
          </div>
          <p className="text-gray-400 text-xs font-medium">Freshness</p>
          <p className="text-2xl font-bold text-white mt-1">94%</p>
        </div>
      </div>

      {/* Columns Table */}
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-6 overflow-x-auto">
        <h4 className="text-lg font-semibold text-white mb-4">Columns</h4>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left py-3 px-4 text-gray-400 font-medium">Column</th>
              <th className="text-left py-3 px-4 text-gray-400 font-medium">Type</th>
              <th className="text-left py-3 px-4 text-gray-400 font-medium">Nullable</th>
              <th className="text-left py-3 px-4 text-gray-400 font-medium">Completeness</th>
            </tr>
          </thead>
          <tbody>
            {sampleColumns.map((col, idx) => (
              <tr key={idx} className="border-b border-white/5 hover:bg-white/5 transition">
                <td className="py-3 px-4 text-white font-medium">{col.name}</td>
                <td className="py-3 px-4 text-gray-400">
                  <span className="px-2 py-1 bg-white/5 rounded text-xs">{col.type}</span>
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
                        style={{ width: `${col.completeness}%` }}
                      />
                    </div>
                    <span className="text-gray-400 text-xs">{col.completeness}%</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Business Summary */}
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-6">
        <h4 className="text-lg font-semibold text-white mb-4">Business Summary</h4>
        <p className="text-gray-400 text-sm leading-relaxed">
          This table stores transaction records including user information, amounts, and status tracking. Used by the billing and reporting systems. Updated hourly from the main transactional database.
        </p>
      </div>
    </div>
  );
}
