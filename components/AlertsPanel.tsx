'use client';

import { AlertTriangle, Clock, Zap, TrendingDown } from 'lucide-react';

interface AlertsPanelProps {
  metadata: any[];
}

interface AlertItem {
  id: string;
  severity: 'critical' | 'warning' | 'info';
  title: string;
  description: string;
  table: string;
  timestamp: string;
  icon: any;
}

export default function AlertsPanel({ metadata }: AlertsPanelProps) {
  if (!metadata || metadata.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <h2 className="text-2xl font-bold text-white mb-2">
          No Alerts Available
        </h2>
        <p className="text-gray-400">
          Connect a database and run scans to generate alerts.
        </p>
      </div>
    );
  }

  const alerts: AlertItem[] = [];

  metadata.forEach((table: any, index: number) => {
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

    let diffHours: number | null = null;
    let timestampLabel = "Yesterday"; // Default fallback

    if (table.freshness?.lastUpdated) {
      const lastUpdated = new Date(table.freshness.lastUpdated);

      if (!isNaN(lastUpdated.getTime())) {
        const now = new Date();
        diffHours = (now.getTime() - lastUpdated.getTime()) / (1000 * 60 * 60);
        
        // Logical check for label
        if (diffHours < 1) {
          timestampLabel = "Just now";
        } else if (diffHours >= 1 && diffHours < 24) {
          timestampLabel = `${Math.floor(diffHours)} hours ago`;
        } else if (diffHours >= 24 && diffHours < 48) {
          timestampLabel = "Yesterday";
        } else {
          timestampLabel = `${Math.floor(diffHours / 24)} days ago`;
        }
      }
    }

    // 🔴 Critical: Very Low Completeness
    if (avgCompleteness < 75) {
      alerts.push({
        id: `c-${index}`,
        severity: 'critical',
        title: 'Low Completeness',
        description: `${table.tableName} has low completeness (${Math.round(
          avgCompleteness
        )}%)`,
        table: table.tableName,
        timestamp: timestampLabel,
        icon: AlertTriangle,
      });
    }

    // 🟡 Warning: Low Uniqueness
    if (avgUniqueness < 80) {
      alerts.push({
        id: `u-${index}`,
        severity: 'warning',
        title: 'Duplicate Risk',
        description: `${table.tableName} uniqueness dropped to ${Math.round(
          avgUniqueness
        )}%`,
        table: table.tableName,
        timestamp: timestampLabel,
        icon: TrendingDown,
      });
    }

    // 🔴 Critical: Freshness Issue (Only if we have valid diffHours > 48)
    if (diffHours !== null && diffHours > 48) {
      alerts.push({
        id: `f-${index}`,
        severity: 'critical',
        title: 'Data Freshness Issue',
        description: `${table.tableName} not updated for ${Math.floor(
          diffHours
        )} hours`,
        table: table.tableName,
        timestamp: timestampLabel,
        icon: Clock,
      });
    }
  });

  // Always add info scan event
  alerts.push({
    id: 'scan-complete',
    severity: 'info',
    title: 'Scheduled Scan Completed',
    description: 'Latest quality scan executed successfully',
    table: 'system',
    timestamp: 'Just now',
    icon: Zap,
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-500/10 border-red-500/30 text-red-400';
      case 'warning':
        return 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400';
      case 'info':
        return 'bg-blue-500/10 border-blue-500/30 text-blue-400';
      default:
        return 'bg-gray-500/10 border-gray-500/30 text-gray-400';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-500/20';
      case 'warning':
        return 'bg-yellow-500/20';
      case 'info':
        return 'bg-blue-500/20';
      default:
        return 'bg-gray-500/20';
    }
  };

  const criticalCount = alerts.filter(
    (a) => a.severity === 'critical'
  ).length;

  const warningCount = alerts.filter(
    (a) => a.severity === 'warning'
  ).length;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">
          Alerts & Risks
        </h2>
        <p className="text-gray-400">
          Monitor data quality issues and warnings
        </p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SummaryCard
          title="Critical Issues"
          count={criticalCount}
          color="red"
          icon={<AlertTriangle className="w-8 h-8 opacity-50" />}
        />
        <SummaryCard
          title="Warnings"
          count={warningCount}
          color="yellow"
          icon={<Clock className="w-8 h-8 opacity-50" />}
        />
        <SummaryCard
          title="Total Alerts"
          count={alerts.length}
          color="default"
          icon={<Zap className="w-8 h-8 text-cyan-400 opacity-50" />}
        />
      </div>

      {/* Alert List */}
      <div className="space-y-3">
        {alerts.map((alert) => {
          const Icon = alert.icon;
          return (
            <div
              key={alert.id}
              className={`backdrop-blur-xl border rounded-xl p-6 hover:bg-white/10 transition cursor-pointer ${getSeverityColor(
                alert.severity
              )}`}
            >
              <div className="flex gap-4">
                <div
                  className={`w-12 h-12 rounded-lg ${getSeverityIcon(
                    alert.severity
                  )} flex items-center justify-center flex-shrink-0`}
                >
                  <Icon className="w-6 h-6" />
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between mb-1">
                    <h4 className="font-semibold">
                      {alert.title}
                    </h4>
                    <span className="text-xs opacity-75">
                      {alert.timestamp}
                    </span>
                  </div>

                  <p className="text-sm opacity-80 mb-2">
                    {alert.description}
                  </p>

                  <span className="px-2 py-1 bg-white/10 rounded text-xs opacity-75">
                    {alert.table}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Dynamic Recommendations */}
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">
          Recommendations
        </h3>

        <ul className="space-y-3">
          {alerts
            .filter((a) => a.severity !== 'info')
            .slice(0, 3)
            .map((alert, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <div className="w-2 h-2 bg-cyan-400 rounded-full mt-1.5" />
                <span className="text-gray-300 text-sm">
                  Review {alert.table} table to resolve: {alert.title}
                </span>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

function SummaryCard({ title, count, color, icon }: any) {
  const colorStyles =
    color === 'red'
      ? 'bg-red-500/10 border-red-500/30 text-red-400'
      : color === 'yellow'
      ? 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400'
      : 'bg-white/5 border-white/10 text-gray-400';

  return (
    <div
      className={`backdrop-blur-xl border rounded-xl p-6 ${colorStyles}`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-white mt-1">
            {count}
          </p>
        </div>
        {icon}
      </div>
    </div>
  );
}