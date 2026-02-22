"use client";

import { useState, useMemo } from "react";
import { ZoomIn, ZoomOut, RotateCcw } from "lucide-react";

export default function DataLineage({ metadata }: any) {
  const [zoom, setZoom] = useState(100);

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 20, 200));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 20, 50));
  const handleReset = () => setZoom(100);
  interface LineageNode {
    tableName: string;
    relationships?: { references: string }[];
    x: number;
    y: number;
  }
  /*
   ✅ AUTO NODE POSITIONING (GRID)
  */
  const nodes = useMemo<LineageNode[]>(() => {
    if (!metadata) return [];

    const spacingX = 260;
    const spacingY = 140;

    return metadata.map((table: any, index: number) => {
      const col = index % 3;
      const row = Math.floor(index / 3);

      return {
        ...table,
        x: 80 + col * spacingX,
        y: 80 + row * spacingY,
      };
    });
  }, [metadata]);

  /*
   ✅ GENERATE RELATIONSHIP LINES
  */
  const connections = useMemo(() => {
    if (!metadata || !nodes.length) return [];

    const lines: any[] = [];

    metadata.forEach((table: any) => {
      table.relationships?.forEach((rel: any) => {
        const targetTable = rel.references?.split(".")[0];

        const sourceNode = nodes.find((n) => n.tableName === table.tableName);

        const targetNode = nodes.find((n) => n.tableName === targetTable);

        if (sourceNode && targetNode) {
          lines.push({
            x1: sourceNode.x + 140,
            y1: sourceNode.y + 30,
            x2: targetNode.x,
            y2: targetNode.y + 30,
          });
        }
      });
    });

    return lines;
  }, [metadata, nodes]);

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Data Lineage</h2>
        <p className="text-gray-400">
          Visualize table relationships and data flow
        </p>
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
            style={{
              transform: `scale(${zoom / 100})`,
              transformOrigin: "center",
            }}
            className="w-full h-full min-w-full min-h-full"
          >
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
                <stop
                  offset="0%"
                  style={{ stopColor: "#00d4ff", stopOpacity: 0.5 }}
                />
                <stop
                  offset="100%"
                  style={{ stopColor: "#7c3aed", stopOpacity: 0.5 }}
                />
              </linearGradient>
            </defs>

            {/* ✅ DYNAMIC LINES */}
            {connections.map((line, idx) => (
              <line
                key={idx}
                x1={line.x1}
                y1={line.y1}
                x2={line.x2}
                y2={line.y2}
                stroke="url(#grad1)"
                strokeWidth="2"
                markerEnd="url(#arrowhead)"
              />
            ))}

            {/* ✅ DYNAMIC NODES */}
            {nodes.map((node: LineageNode, idx: number) => (
              <g key={idx}>
                <rect
                  x={node.x}
                  y={node.y}
                  width="140"
                  height="60"
                  rx="8"
                  fill="rgba(124, 58, 237, 0.1)"
                  stroke="#7c3aed"
                  strokeWidth="2"
                />

                <text
                  x={node.x + 70}
                  y={node.y + 26}
                  textAnchor="middle"
                  fill="#c4b5fd"
                  fontSize="13"
                  fontWeight="bold"
                >
                  {node.tableName}
                </text>

                <text
                  x={node.x + 70}
                  y={node.y + 44}
                  textAnchor="middle"
                  fill="#888"
                  fontSize="11"
                >
                  {node.relationships?.length
                    ? `${node.relationships.length} links`
                    : "No links"}
                </text>
              </g>
            ))}
          </svg>
        </div>
      </div>

      {/* Legend */}
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Legend color="cyan" label="Source Tables" />
          <Legend color="purple" label="Processing Layer" />
          <Legend color="green" label="Analytics Output" />
        </div>
      </div>
    </div>
  );
}

function Legend({ color, label }: any) {
  const colors: any = {
    cyan: "border-cyan-400 bg-cyan-400/10",
    purple: "border-purple-400 bg-purple-400/10",
    green: "border-green-400 bg-green-400/10",
  };

  return (
    <div className="flex items-center gap-3">
      <div className={`w-8 h-8 rounded border-2 ${colors[color]}`} />
      <span className="text-sm text-gray-300">{label}</span>
    </div>
  );
}
