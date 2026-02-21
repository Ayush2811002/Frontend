'use client';
//testing
import { useState } from 'react';
import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

export default function DataLineage() {
  const [zoom, setZoom] = useState(100);

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 20, 200));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 20, 50));
  const handleReset = () => setZoom(100);

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Data Lineage</h2>
        <p className="text-gray-400">Visualize table relationships and data flow</p>
      </div>

      {/* Visualization area */}
      <div className="flex-1 backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl overflow-hidden flex flex-col">
        {/* Controls */}
        <div className="flex items-center gap-2 p-4 border-b border-white/10">
          <button
            onClick={handleZoomOut}
            className="p-2 hover:bg-white/10 rounded-lg transition text-gray-400 hover:text-white"
          >
            <ZoomOut className="w-5 h-5" />
          </button>
          <span className="text-sm text-gray-400 min-w-12">{zoom}%</span>
          <button
            onClick={handleZoomIn}
            className="p-2 hover:bg-white/10 rounded-lg transition text-gray-400 hover:text-white"
          >
            <ZoomIn className="w-5 h-5" />
          </button>
          <div className="flex-1 h-px bg-white/10" />
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-3 py-2 hover:bg-white/10 rounded-lg transition text-gray-400 hover:text-white text-sm"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
        </div>

        {/* Canvas */}
        <div className="flex-1 overflow-auto p-8 flex items-center justify-center">
          <svg
            viewBox="0 0 1000 600"
            style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'center' }}
            className="w-full h-full min-w-full min-h-full"
          >
            {/* Connection lines */}
            <defs>
              <marker
                id="arrowhead"
                markerWidth="10"
                markerHeight="10"
                refX="9"
                refY="3"
                orient="auto"
              >
                <polygon points="0 0, 10 3, 0 6" fill="#00d4ff" />
              </marker>
              <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{ stopColor: '#00d4ff', stopOpacity: 0.5 }} />
                <stop offset="100%" style={{ stopColor: '#7c3aed', stopOpacity: 0.5 }} />
              </linearGradient>
            </defs>

            {/* Lines */}
            <line x1="150" y1="150" x2="350" y2="150" stroke="url(#grad1)" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <line x1="350" y1="180" x2="550" y2="150" stroke="url(#grad1)" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <line x1="350" y1="180" x2="550" y2="250" stroke="url(#grad1)" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <line x1="550" y1="300" x2="750" y2="250" stroke="url(#grad1)" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <line x1="150" y1="150" x2="150" y2="350" stroke="url(#grad1)" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <line x1="150" y1="350" x2="550" y2="350" stroke="url(#grad1)" strokeWidth="2" markerEnd="url(#arrowhead)" />

            {/* Nodes */}
            {/* Source tables */}
            <g>
              <rect x="80" y="120" width="140" height="60" rx="8" fill="rgba(0, 212, 255, 0.1)" stroke="#00d4ff" strokeWidth="2" />
              <text x="150" y="145" textAnchor="middle" fill="#00d4ff" fontSize="14" fontWeight="bold">
                raw_transactions
              </text>
              <text x="150" y="162" textAnchor="middle" fill="#888" fontSize="12">
                Source
              </text>
            </g>

            <g>
              <rect x="80" y="320" width="140" height="60" rx="8" fill="rgba(0, 212, 255, 0.1)" stroke="#00d4ff" strokeWidth="2" />
              <text x="150" y="345" textAnchor="middle" fill="#00d4ff" fontSize="14" fontWeight="bold">
                user_profiles
              </text>
              <text x="150" y="362" textAnchor="middle" fill="#888" fontSize="12">
                Source
              </text>
            </g>

            {/* Processing layer */}
            <g>
              <rect x="280" y="120" width="140" height="60" rx="8" fill="rgba(124, 58, 237, 0.1)" stroke="#7c3aed" strokeWidth="2" />
              <text x="350" y="145" textAnchor="middle" fill="#a78bfa" fontSize="14" fontWeight="bold">
                cleaned_trans
              </text>
              <text x="350" y="162" textAnchor="middle" fill="#888" fontSize="12">
                Transform
              </text>
            </g>

            <g>
              <rect x="480" y="120" width="140" height="60" rx="8" fill="rgba(124, 58, 237, 0.1)" stroke="#7c3aed" strokeWidth="2" />
              <text x="550" y="145" textAnchor="middle" fill="#a78bfa" fontSize="14" fontWeight="bold">
                daily_summary
              </text>
              <text x="550" y="162" textAnchor="middle" fill="#888" fontSize="12">
                Aggregate
              </text>
            </g>

            <g>
              <rect x="480" y="220" width="140" height="60" rx="8" fill="rgba(124, 58, 237, 0.1)" stroke="#7c3aed" strokeWidth="2" />
              <text x="550" y="245" textAnchor="middle" fill="#a78bfa" fontSize="14" fontWeight="bold">
                customer_seg
              </text>
              <text x="550" y="262" textAnchor="middle" fill="#888" fontSize="12">
                Enrich
              </text>
            </g>

            <g>
              <rect x="480" y="320" width="140" height="60" rx="8" fill="rgba(124, 58, 237, 0.1)" stroke="#7c3aed" strokeWidth="2" />
              <text x="550" y="345" textAnchor="middle" fill="#a78bfa" fontSize="14" fontWeight="bold">
                ml_features
              </text>
              <text x="550" y="362" textAnchor="middle" fill="#888" fontSize="12">
                Feature Eng
              </text>
            </g>

            {/* Analytics layer */}
            <g>
              <rect x="680" y="220" width="140" height="60" rx="8" fill="rgba(34, 197, 94, 0.1)" stroke="#22c55e" strokeWidth="2" />
              <text x="750" y="245" textAnchor="middle" fill="#86efac" fontSize="14" fontWeight="bold">
                analytics_db
              </text>
              <text x="750" y="262" textAnchor="middle" fill="#888" fontSize="12">
                Warehouse
              </text>
            </g>
          </svg>
        </div>
      </div>

      {/* Legend */}
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded border-2 border-cyan-400 bg-cyan-400/10" />
            <span className="text-sm text-gray-300">Source Tables</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded border-2 border-purple-400 bg-purple-400/10" />
            <span className="text-sm text-gray-300">Processing Layer</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded border-2 border-green-400 bg-green-400/10" />
            <span className="text-sm text-gray-300">Analytics Output</span>
          </div>
        </div>
      </div>
    </div>
  );
}
