'use client';

import { AlertTriangle, Clock, Zap, TrendingDown } from 'lucide-react';

interface Alert {
  id: string;
  severity: 'critical' | 'warning' | 'info';
  title: string;
  description: string;
  table: string;
  timestamp: string;
  icon: any;
}

export default function AlertsPanel() {
  const alerts: Alert[] = [
    {
      id: '1',
      severity: 'critical',
      title: 'Low Completeness',
      description: 'user_id column has missing values in orders table',
      table: 'orders',
      timestamp: '1 hour ago',
      icon: AlertTriangle,
    },
    {
      id: '2',
      severity: 'critical',
      title: 'Data Freshness Issue',
      description: 'analytics_events table not updated for 3 days',
      table: 'analytics_events',
      timestamp: '2 hours ago',
      icon: Clock,
    },
    {
      id: '3',
      severity: 'warning',
      title: 'Duplicate Records Detected',
      description: '245 duplicate records found in customer_data table',
      table: 'customer_data',
      timestamp: '4 hours ago',
      icon: Zap,
    },
    {
      id: '4',
      severity: 'warning',
      title: 'Quality Degradation',
      description: 'Data quality score dropped 15% in transactions table',
      table: 'transactions',
      timestamp: '6 hours ago',
      icon: TrendingDown,
    },
    {
      id: '5',
      severity: 'info',
      title: 'Scheduled Scan Completed',
      description: 'Daily quality scan completed for all tables',
      table: 'system',
      timestamp: '8 hours ago',
      icon: Zap,
    },
  ];

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

  const criticalCount = alerts.filter((a) => a.severity === 'critical').length;
  const warningCount = alerts.filter((a) => a.severity === 'warning').length;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Alerts & Risks</h2>
        <p className="text-gray-400">Monitor data quality issues and warnings</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="backdrop-blur-xl bg-red-500/10 border border-red-500/30 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-400 text-sm font-medium">Critical Issues</p>
              <p className="text-3xl font-bold text-white mt-1">{criticalCount}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-400 opacity-50" />
          </div>
        </div>

        <div className="backdrop-blur-xl bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-400 text-sm font-medium">Warnings</p>
              <p className="text-3xl font-bold text-white mt-1">{warningCount}</p>
            </div>
            <Clock className="w-8 h-8 text-yellow-400 opacity-50" />
          </div>
        </div>

        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium">Total Alerts</p>
              <p className="text-3xl font-bold text-white mt-1">{alerts.length}</p>
            </div>
            <Zap className="w-8 h-8 text-cyan-400 opacity-50" />
          </div>
        </div>
      </div>

      {/* Alerts list */}
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
                <div className={`w-12 h-12 rounded-lg ${getSeverityIcon(alert.severity)} flex items-center justify-center flex-shrink-0`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-1">
                    <h4 className="font-semibold">{alert.title}</h4>
                    <span className="text-xs opacity-75">{alert.timestamp}</span>
                  </div>
                  <p className="text-sm opacity-80 mb-2">{alert.description}</p>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 bg-white/10 rounded text-xs opacity-75">
                      {alert.table}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recommendations */}
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Recommendations</h3>
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <div className="w-2 h-2 bg-cyan-400 rounded-full mt-1.5 flex-shrink-0" />
            <span className="text-gray-300 text-sm">Review the orders table for missing user_id values and implement validation</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-2 h-2 bg-cyan-400 rounded-full mt-1.5 flex-shrink-0" />
            <span className="text-gray-300 text-sm">Update the analytics_events pipeline to ensure regular data ingestion</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-2 h-2 bg-cyan-400 rounded-full mt-1.5 flex-shrink-0" />
            <span className="text-gray-300 text-sm">Run deduplication process on customer_data table and add duplicate detection</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
