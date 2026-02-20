'use client';

import { BarChart3, TrendingUp, AlertTriangle } from 'lucide-react';

export default function DataQuality() {
  const qualityMetrics = [
    { name: 'transactions', completeness: 98, uniqueness: 99, freshness: 95 },
    { name: 'user_profiles', completeness: 94, uniqueness: 96, freshness: 92 },
    { name: 'orders', completeness: 87, uniqueness: 88, freshness: 78 },
    { name: 'analytics_events', completeness: 76, uniqueness: 82, freshness: 45 },
    { name: 'customer_data', completeness: 99, uniqueness: 98, freshness: 88 },
  ];

  const renderProgressBar = (value: number, color: string) => (
    <div className="flex items-center gap-2 group cursor-pointer">
      <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden hover:h-3 transition-all group-hover:bg-white/15">
        <div
          className={`h-full ${color} group-hover:shadow-lg transition-all duration-300 rounded-full`}
          style={{ width: `${value}%` }}
        />
      </div>
      <span className="text-white text-xs sm:text-sm font-semibold min-w-10 sm:min-w-12 group-hover:text-cyan-400 transition-colors">{value}%</span>
    </div>
  );

  const getColor = (value: number) => {
    if (value >= 90) return 'bg-gradient-to-r from-green-500 to-emerald-500';
    if (value >= 75) return 'bg-gradient-to-r from-yellow-500 to-orange-500';
    return 'bg-gradient-to-r from-red-500 to-pink-500';
  };

  return (
    <div className="space-y-6 animate-slide-in-up">
      <div className="animate-slide-in-left">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">Data Quality Dashboard</h2>
        <p className="text-sm sm:text-base text-gray-400">Monitor table and column quality metrics</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="glass-effect rounded-2xl p-6 group hover:bg-white/15 transition-all animate-slide-in-up transform hover:scale-105 hover:-translate-y-2 transition-3d" style={{ animationDelay: '100ms' }}>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center group-hover:scale-110 transition-transform animate-glow-pulse">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-gray-400 text-xs sm:text-sm">Avg Completeness</p>
              <p className="text-2xl sm:text-3xl font-bold text-white group-hover:text-green-400 transition-colors">91%</p>
            </div>
          </div>
        </div>

        <div className="glass-effect rounded-2xl p-6 group hover:bg-white/15 transition-all animate-slide-in-up transform hover:scale-105 hover:-translate-y-2 transition-3d" style={{ animationDelay: '150ms' }}>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center group-hover:scale-110 transition-transform animate-glow-pulse">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-gray-400 text-xs sm:text-sm">Avg Uniqueness</p>
              <p className="text-2xl sm:text-3xl font-bold text-white group-hover:text-cyan-400 transition-colors">93%</p>
            </div>
          </div>
        </div>

        <div className="glass-effect rounded-2xl p-6 group hover:bg-white/15 transition-all animate-slide-in-up transform hover:scale-105 hover:-translate-y-2 transition-3d" style={{ animationDelay: '200ms' }}>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center group-hover:scale-110 transition-transform animate-glow-pulse">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-gray-400 text-xs sm:text-sm">Avg Freshness</p>
              <p className="text-2xl sm:text-3xl font-bold text-white group-hover:text-orange-400 transition-colors">80%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quality Details Table */}
      <div className="glass-effect rounded-2xl p-6 sm:p-8 overflow-x-auto animate-slide-in-up" style={{ animationDelay: '250ms' }}>
        <h3 className="text-lg sm:text-xl font-semibold text-white mb-6">Quality by Table</h3>
        <div className="space-y-6">
          {qualityMetrics.map((metric, idx) => (
            <div key={idx} className="pb-6 border-b border-white/10 last:border-0 hover:bg-white/5 p-4 rounded transition-colors group">
              <h4 className="text-white font-semibold mb-4">{metric.name}</h4>
              <div className="space-y-3">
                <div>
                  <p className="text-gray-400 text-sm mb-2">Completeness</p>
                  {renderProgressBar(metric.completeness, getColor(metric.completeness))}
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-2">Uniqueness</p>
                  {renderProgressBar(metric.uniqueness, getColor(metric.uniqueness))}
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-2">Freshness</p>
                  {renderProgressBar(metric.freshness, getColor(metric.freshness))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Health Distribution</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Healthy (≥90%)</span>
              <span className="text-green-400 font-semibold">3 tables</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Warning (75-90%)</span>
              <span className="text-yellow-400 font-semibold">1 table</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Critical (&lt;75%)</span>
              <span className="text-red-400 font-semibold">1 table</span>
            </div>
          </div>
        </div>

        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Recent Changes</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-gray-300 text-sm">orders table quality decreased</span>
              <span className="text-xs text-gray-500">2h ago</span>
            </div>
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-gray-300 text-sm">transactions freshness improved</span>
              <span className="text-xs text-gray-500">4h ago</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300 text-sm">analytics_events scan completed</span>
              <span className="text-xs text-gray-500">6h ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
