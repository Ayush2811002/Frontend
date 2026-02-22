'use client';

import { BarChart3, TrendingUp, AlertTriangle } from 'lucide-react';

interface DataQualityProps {
  metadata: any[];
}

export default function DataQuality({ metadata }: DataQualityProps) {
  // ✅ Empty State
  if (!metadata || metadata.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
        <h2 className="text-2xl font-bold text-white mb-2">
          No Database Connected
        </h2>
        <p className="text-gray-400">
          Connect a database to view data quality insights.
        </p>
      </div>
    );
  }

  // ✅ Table Level Metrics
  const qualityMetrics = metadata.map((table) => {
    const avgCompleteness =
      table.dataQuality?.reduce(
        (sum: number, col: any) => sum + col.completeness,
        0
      ) / (table.dataQuality?.length || 1);

    const avgUniqueness =
      table.dataQuality?.reduce(
        (sum: number, col: any) => sum + col.uniqueness,
        0
      ) / (table.dataQuality?.length || 1);

    const lastUpdated = new Date(table.freshness?.lastUpdated);
    const now = new Date();
    const diffHours =
      (now.getTime() - lastUpdated.getTime()) / (1000 * 60 * 60);

    let freshnessScore = 100;
    if (diffHours > 72) freshnessScore = 50;
    else if (diffHours > 24) freshnessScore = 75;

    return {
      name: table.tableName,
      completeness: Math.round(avgCompleteness || 0),
      uniqueness: Math.round(avgUniqueness || 0),
      freshness: freshnessScore,
    };
  });

  // ✅ Global Averages
  const avgCompleteness =
    qualityMetrics.reduce((sum, t) => sum + t.completeness, 0) /
    (qualityMetrics.length || 1);

  const avgUniqueness =
    qualityMetrics.reduce((sum, t) => sum + t.uniqueness, 0) /
    (qualityMetrics.length || 1);

  const avgFreshness =
    qualityMetrics.reduce((sum, t) => sum + t.freshness, 0) /
    (qualityMetrics.length || 1);

  // ✅ Health Distribution
  const healthyTables = qualityMetrics.filter(
    (t) => t.completeness >= 90
  ).length;

  const warningTables = qualityMetrics.filter(
    (t) => t.completeness >= 75 && t.completeness < 90
  ).length;

  const criticalTables = qualityMetrics.filter(
    (t) => t.completeness < 75
  ).length;

  const renderProgressBar = (value: number, color: string) => (
    <div className="flex items-center gap-2 group cursor-pointer">
      <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden hover:h-3 transition-all group-hover:bg-white/15">
        <div
          className={`h-full ${color} group-hover:shadow-lg transition-all duration-300 rounded-full`}
          style={{ width: `${value}%` }}
        />
      </div>
      <span className="text-white text-xs sm:text-sm font-semibold min-w-10 sm:min-w-12 group-hover:text-cyan-400 transition-colors">
        {value}%
      </span>
    </div>
  );

  const getColor = (value: number) => {
    if (value >= 90)
      return 'bg-gradient-to-r from-green-500 to-emerald-500';
    if (value >= 75)
      return 'bg-gradient-to-r from-yellow-500 to-orange-500';
    return 'bg-gradient-to-r from-red-500 to-pink-500';
  };

  return (
    <div className="space-y-6 animate-slide-in-up">
      <div className="animate-slide-in-left">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">
          Data Quality Dashboard
        </h2>
        <p className="text-sm sm:text-base text-gray-400">
          Monitor table and column quality metrics
        </p>
      </div>

      {/* ✅ Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <SummaryCard
          icon={<BarChart3 className="w-6 h-6 text-white" />}
          title="Avg Completeness"
          value={`${Math.round(avgCompleteness)}%`}
          color="from-green-500 to-emerald-500"
          hoverColor="group-hover:text-green-400"
        />

        <SummaryCard
          icon={<TrendingUp className="w-6 h-6 text-white" />}
          title="Avg Uniqueness"
          value={`${Math.round(avgUniqueness)}%`}
          color="from-cyan-500 to-blue-500"
          hoverColor="group-hover:text-cyan-400"
        />

        <SummaryCard
          icon={<AlertTriangle className="w-6 h-6 text-white" />}
          title="Avg Freshness"
          value={`${Math.round(avgFreshness)}%`}
          color="from-yellow-500 to-orange-500"
          hoverColor="group-hover:text-orange-400"
        />
      </div>

      {/* ✅ Quality by Table */}
      <div className="glass-effect rounded-2xl p-6 sm:p-8 overflow-x-auto animate-slide-in-up">
        <h3 className="text-lg sm:text-xl font-semibold text-white mb-6">
          Quality by Table
        </h3>
        <div className="space-y-6">
          {qualityMetrics.map((metric, idx) => (
            <div
              key={idx}
              className="pb-6 border-b border-white/10 last:border-0 hover:bg-white/5 p-4 rounded transition-colors group"
            >
              <h4 className="text-white font-semibold mb-4">
                {metric.name}
              </h4>

              <div className="space-y-3">
                <MetricRow
                  label="Completeness"
                  value={metric.completeness}
                  renderProgressBar={renderProgressBar}
                  getColor={getColor}
                />
                <MetricRow
                  label="Uniqueness"
                  value={metric.uniqueness}
                  renderProgressBar={renderProgressBar}
                  getColor={getColor}
                />
                <MetricRow
                  label="Freshness"
                  value={metric.freshness}
                  renderProgressBar={renderProgressBar}
                  getColor={getColor}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ✅ Distribution + Recent */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">
            Health Distribution
          </h3>

          <DistributionRow label="Healthy (≥90%)" value={healthyTables} color="text-green-400" />
          <DistributionRow label="Warning (75-90%)" value={warningTables} color="text-yellow-400" />
          <DistributionRow label="Critical (<75%)" value={criticalTables} color="text-red-400" />
        </div>

        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">
            Recent Scans
          </h3>

          <div className="space-y-3">
            {qualityMetrics.slice(0, 3).map((metric, index) => (
              <div
                key={index}
                className="flex items-center justify-between pb-3 border-b border-white/10 last:border-0"
              >
                <span className="text-gray-300 text-sm">
                  {metric.name} scanned — {metric.completeness}% completeness
                </span>
                <span className="text-xs text-gray-500">
                  {index + 1}h ago
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================= Reusable Components ================= */

function SummaryCard({ icon, title, value, color, hoverColor }: any) {
  return (
    <div className="glass-effect rounded-2xl p-6 group hover:bg-white/15 transition-all transform hover:scale-105 hover:-translate-y-2 transition-3d">
      <div className="flex items-center gap-4">
        <div
          className={`w-12 h-12 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center group-hover:scale-110 transition-transform`}
        >
          {icon}
        </div>
        <div>
          <p className="text-gray-400 text-xs sm:text-sm">{title}</p>
          <p className={`text-2xl sm:text-3xl font-bold text-white ${hoverColor}`}>
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}

function MetricRow({ label, value, renderProgressBar, getColor }: any) {
  return (
    <div>
      <p className="text-gray-400 text-sm mb-2">{label}</p>
      {renderProgressBar(value, getColor(value))}
    </div>
  );
}

function DistributionRow({ label, value, color }: any) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-gray-400">{label}</span>
      <span className={`${color} font-semibold`}>
        {value} table{value !== 1 ? 's' : ''}
      </span>
    </div>
  );
}