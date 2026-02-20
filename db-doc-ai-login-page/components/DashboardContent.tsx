'use client';

import { Database, CheckCircle, AlertTriangle, TrendingUp, Columns, Rows, Clock, Zap } from 'lucide-react';
import MetadataExplorer from './MetadataExplorer';
import DataQuality from './DataQuality';
import AIChatInterface from './AIChatInterface';
import AlertsPanel from './AlertsPanel';
import DataLineage from './DataLineage';

interface DashboardContentProps {
  activeSection: string;
  setShowDatabaseModal: (show: boolean) => void;
}

export default function DashboardContent({ activeSection, setShowDatabaseModal }: DashboardContentProps) {
  const metrics = [
    { label: 'Total Tables', value: '24', icon: Database, color: 'from-cyan-500 to-blue-500' },
    { label: 'Healthy Tables', value: '18', icon: CheckCircle, color: 'from-green-500 to-emerald-500' },
    { label: 'Risky Tables', value: '4', icon: AlertTriangle, color: 'from-yellow-500 to-orange-500' },
    { label: 'Avg Freshness', value: '94%', icon: TrendingUp, color: 'from-purple-500 to-pink-500' },
  ];

  const detailedMetrics = [
    { label: 'Total Columns', value: '2,847', icon: Columns, color: 'from-blue-500 to-cyan-500', change: '+12' },
    { label: 'Total Records', value: '456.2M', icon: Rows, color: 'from-green-500 to-emerald-500', change: '+2.5M' },
    { label: 'Last Sync', value: '2 mins', icon: Clock, color: 'from-orange-500 to-red-500', change: 'ago' },
    { label: 'Data Quality', value: '92%', icon: Zap, color: 'from-violet-500 to-purple-500', change: '+3%' },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'explorer':
        return <MetadataExplorer />;
      case 'quality':
        return <DataQuality />;
      case 'chat':
        return <AIChatInterface />;
      case 'alerts':
        return <AlertsPanel />;
      case 'lineage':
        return <DataLineage />;
      default:
        return (
          <div className="space-y-6 sm:space-y-8 animate-slide-in-up">
            <div className="animate-slide-in-left">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-1 sm:mb-2">Dashboard</h2>
              <p className="text-xs sm:text-sm md:text-base text-gray-400">Welcome to DB-DOC-AI - Your AI-Powered Data Intelligence Platform</p>
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
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br ${metric.color} p-2 sm:p-3 group-hover:shadow-lg group-hover:shadow-cyan-500/50 group-hover:scale-110 transition-all duration-500 ease-out animate-glow-pulse`}>
                        <Icon className="w-full h-full text-white" />
                      </div>
                    </div>
                    <p className="text-gray-400 text-xs sm:text-sm font-medium mb-1 truncate">{metric.label}</p>
                    <p className="text-lg sm:text-xl md:text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">{metric.value}</p>
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
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br ${metric.color} p-2 sm:p-3 group-hover:shadow-lg group-hover:scale-110 transition-all duration-500 ease-out`}>
                        <Icon className="w-full h-full text-white" />
                      </div>
                      <span className="text-xs font-semibold text-green-400 bg-green-500/20 px-2 py-1 rounded-full">{metric.change}</span>
                    </div>
                    <p className="text-gray-400 text-xs sm:text-sm font-medium mb-1 truncate">{metric.label}</p>
                    <p className="text-base sm:text-lg md:text-xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">{metric.value}</p>
                  </div>
                );
              })}
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {/* Recent Activity */}
              <div className="glass-effect rounded-xl sm:rounded-2xl p-4 sm:p-6 animate-slide-in-up" style={{ animationDelay: '80ms' }}>
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-white mb-3 sm:mb-4">Recent Activity</h3>
                <div className="space-y-2 sm:space-y-4">
                  {[
                    { action: 'Database connected', time: '2 hours ago', status: 'success' },
                    { action: 'Quality scan completed', time: '4 hours ago', status: 'success' },
                    { action: 'Alert triggered on users_table', time: '6 hours ago', status: 'warning' },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between pb-2 sm:pb-4 border-b border-white/5 last:border-0 hover:bg-white/5 p-2 rounded transition-all duration-300 ease-out group">
                      <div className="min-w-0 flex-1">
                        <p className="text-gray-200 text-xs sm:text-sm group-hover:text-white transition-colors duration-300 truncate">{item.action}</p>
                        <p className="text-gray-500 text-xs">{item.time}</p>
                      </div>
                      <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full flex-shrink-0 ml-2 animate-scale-bounce ${item.status === 'success' ? 'bg-green-500' : 'bg-yellow-500'}`} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Tables */}
              <div className="glass-effect rounded-xl sm:rounded-2xl p-4 sm:p-6 animate-slide-in-up" style={{ animationDelay: '160ms' }}>
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-white mb-3 sm:mb-4">Top Tables by Size</h3>
                <div className="space-y-2 sm:space-y-4">
                  {[
                    { name: 'transactions', size: '2.4 GB', health: 95 },
                    { name: 'user_profiles', size: '1.8 GB', health: 88 },
                    { name: 'analytics_events', size: '1.2 GB', health: 76 },
                  ].map((table, idx) => (
                    <div key={idx} className="pb-2 sm:pb-4 border-b border-white/5 last:border-0 group hover:bg-white/5 p-2 rounded transition-all duration-300 ease-out">
                      <div className="flex items-center justify-between mb-1 sm:mb-2 gap-2">
                        <p className="text-gray-200 text-xs sm:text-sm font-medium group-hover:text-cyan-400 transition-colors duration-300 truncate">{table.name}</p>
                        <p className="text-gray-500 text-xs flex-shrink-0">{table.size}</p>
                      </div>
                      <div className="w-full h-1.5 sm:h-2 bg-white/5 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 group-hover:shadow-lg group-hover:shadow-cyan-500/50 transition-all duration-500 ease-out rounded-full"
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
      <div className="p-3 sm:p-4 md:p-6 lg:p-8">
        {renderContent()}
      </div>
    </div>
  );
}
