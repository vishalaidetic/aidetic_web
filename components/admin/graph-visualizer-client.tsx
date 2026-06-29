'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import type { GraphData, GraphNode, GraphLink } from '@/lib/api/brain-client'
import { RefreshCw, ZoomIn, ZoomOut, Maximize2, Info, X } from 'lucide-react'

// Label → color mapping (matches original visualizer)
const NODE_COLORS: Record<string, string> = {
  Employee:    '#3b82f6',
  Department:  '#10b981',
  Project:     '#f59e0b',
  Designation: '#8b5cf6',
  Client:      '#ec4899',
  Vendor:      '#f97316',
}
const DEFAULT_NODE_COLOR = '#6366f1'

function nodeColor(label: string) {
  return NODE_COLORS[label] ?? DEFAULT_NODE_COLOR
}

function getNodeLabel(n: GraphNode): string {
  const p = n.properties as Record<string, string>
  return p?.name ?? p?.first_name ?? n.label
}

interface Props {
  initialData: GraphData
}

interface SelectedNode {
  node: GraphNode
  x: number
  y: number
}

export default function GraphVisualizerClient({ initialData }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const graphRef = useRef<unknown>(null)
  const [graphData, setGraphData] = useState<GraphData>(initialData)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selected, setSelected] = useState<SelectedNode | null>(null)
  const [stats, setStats] = useState({ nodes: initialData.nodes.length, links: initialData.links.length })
  const [ForceGraph, setForceGraph] = useState<React.ComponentType<Record<string, unknown>> | null>(null)
  const [dims, setDims] = useState({ w: 800, h: 600 })

  // Dynamically import ForceGraph2D (canvas, only in browser)
  useEffect(() => {
    import('react-force-graph-2d').then((mod) => {
      setForceGraph(() => mod.default as React.ComponentType<Record<string, unknown>>)
    }).catch(() => setError('Graph library failed to load'))
  }, [])

  // Responsive sizing
  useEffect(() => {
    if (!containerRef.current) return
    const ro = new ResizeObserver((entries) => {
      const entry = entries[0]
      if (entry) setDims({ w: entry.contentRect.width, h: Math.max(entry.contentRect.height, 500) })
    })
    ro.observe(containerRef.current)
    return () => ro.disconnect()
  }, [])

  // Pre-process: add degree-based sizing
  const preprocess = useCallback((data: GraphData): GraphData => {
    const nodes = data.nodes.map((n) => {
      const degree = data.links.filter((l) => l.source === n.id || l.target === n.id).length
      return { ...n, val: Math.max(degree * 1.5, 4) }
    })
    return { nodes, links: data.links }
  }, [])

  const refresh = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/brain/analytics/graph-data')
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const json = await res.json()
      const processed = preprocess(json)
      setGraphData(processed)
      setStats({ nodes: processed.nodes.length, links: processed.links.length })
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to refresh graph')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setGraphData(preprocess(initialData))
  }, [initialData, preprocess])

  const labelColors = Object.entries(NODE_COLORS)

  return (
    <div className="flex flex-col gap-4 w-full h-full">
      {/* Controls bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white border border-slate-200 rounded-xl px-5 py-3 shadow-sm">
        <div className="flex items-center gap-4 flex-wrap">
          {/* Legend */}
          <div className="flex flex-wrap gap-2">
            {labelColors.map(([label, color]) => (
              <span key={label} className="flex items-center gap-1.5 text-xs text-[#6B7280] font-medium">
                <span className="w-3 h-3 rounded-full inline-block shrink-0" style={{ backgroundColor: color }} />
                {label}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-[#6B7280] bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-full font-medium">
            {stats.nodes} nodes · {stats.links} edges
          </span>
          <button
            onClick={refresh}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-[#1B2340] text-white rounded-lg hover:bg-[#2a3460] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
            Refresh
          </button>
        </div>
      </div>

      {/* Error banner */}
      {error && (
        <div className="rounded-xl bg-red-50 border border-red-200 px-5 py-3 text-sm text-red-700 flex items-center gap-3">
          <X size={16} className="shrink-0" />
          {error}
        </div>
      )}

      {/* Graph canvas */}
      <div
        ref={containerRef}
        className="flex-1 min-h-[560px] border border-slate-200 rounded-2xl overflow-hidden bg-[#0d1117] shadow-inner relative"
      >
        {!ForceGraph ? (
          <div className="flex flex-col items-center justify-center h-full text-slate-400 gap-3">
            <RefreshCw size={28} className="animate-spin" />
            <span className="text-sm">Loading graph engine…</span>
          </div>
        ) : graphData.nodes.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-slate-500 gap-3">
            <span className="text-4xl">🕸️</span>
            <p className="font-medium text-slate-300">No graph data</p>
            <p className="text-sm text-slate-500">Run the Neo4j sync script or check your backend connection.</p>
          </div>
        ) : (
          <ForceGraph
            ref={graphRef as React.Ref<unknown>}
            width={dims.w}
            height={dims.h}
            graphData={graphData}
            backgroundColor="#0d1117"
            nodeLabel={(node: unknown) => {
              const n = node as GraphNode
              return `${n.label}: ${getNodeLabel(n)}`
            }}
            nodeColor={(node: unknown) => nodeColor((node as GraphNode).label)}
            nodeRelSize={6}
            nodeCanvasObjectMode={() => 'after'}
            nodeCanvasObject={(node: unknown, ctx: CanvasRenderingContext2D, globalScale: number) => {
              const n = node as GraphNode & { x?: number; y?: number }
              if (globalScale < 1.2) return
              const label = getNodeLabel(n)
              const fontSize = 12 / globalScale
              ctx.font = `${fontSize}px Inter, sans-serif`
              ctx.textAlign = 'center'
              ctx.textBaseline = 'middle'
              ctx.fillStyle = '#94a3b8'
              const r = Math.sqrt((n.val ?? 1)) * 6
              ctx.fillText(label, n.x ?? 0, (n.y ?? 0) + r + fontSize)
            }}
            onNodeClick={(node: unknown) => {
              const n = node as GraphNode & { x?: number; y?: number }
              setSelected({ node: n, x: n.x ?? 0, y: n.y ?? 0 })
            }}
            linkColor={(link: unknown) => {
              const l = link as GraphLink
              if (l.type === 'WORKS_IN') return '#3b82f655'
              if (l.type === 'BELONGS_TO') return '#10b98155'
              if (l.type === 'ASSIGNED_TO') return '#f59e0b55'
              return '#6b728055'
            }}
            linkWidth={(link: unknown) => (link as GraphLink).type === 'WORKS_IN' ? 2 : 1}
            linkDirectionalArrowLength={3.5}
            linkDirectionalArrowRelPos={1}
            linkDirectionalParticles={2}
            linkDirectionalParticleWidth={2}
            linkCurvature={0.25}
            linkLabel={(link: unknown) => (link as GraphLink).type}
            d3AlphaDecay={0.02}
            d3VelocityDecay={0.3}
          />
        )}

        {/* Node detail panel */}
        {selected && (
          <div className="absolute top-4 right-4 w-72 bg-[#161b22] border border-slate-700 rounded-2xl shadow-2xl p-5 z-20 text-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{ backgroundColor: nodeColor(selected.node.label) }}
                />
                <span className="font-semibold text-white">{selected.node.label}</span>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X size={16} />
              </button>
            </div>
            <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
              {Object.entries(selected.node.properties as Record<string, unknown>).map(([k, v]) => (
                <div key={k} className="flex gap-2 text-xs">
                  <span className="text-slate-400 font-mono shrink-0 min-w-[80px]">{k}</span>
                  <span className="text-slate-200 break-all">{String(v)}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tip overlay */}
        <div className="absolute bottom-4 left-4 text-xs text-slate-600 flex items-center gap-1.5">
          <Info size={12} />
          Scroll to zoom · Drag to pan · Click node for details
        </div>
      </div>
    </div>
  )
}
