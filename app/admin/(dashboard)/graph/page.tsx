import { graphApi } from '@/lib/api/brain-client'
import type { Metadata } from 'next'
import { GitBranch, XCircle } from 'lucide-react'
import GraphVisualizerClient from '@/components/admin/graph-visualizer-client'
import type { GraphData } from '@/lib/api/brain-client'

export const metadata: Metadata = {
  title: 'Knowledge Graph - Admin Dashboard',
  description: 'Visualize relationships between employees, departments, and projects in the Neo4j knowledge graph',
}

const EMPTY_GRAPH: GraphData = { nodes: [], links: [] }

export default async function GraphPage() {
  let graphData: GraphData = EMPTY_GRAPH
  let backendOffline = false

  try {
    const res = await graphApi.getData() as any
    if (res && res.nodes && res.links) {
      graphData = res
    } else if (res.data && res.data.nodes) {
      // In case it ever gets wrapped in a custom response
      graphData = res.data
    } else {
      backendOffline = true
    }
  } catch {
    backendOffline = true
  }

  return (
    <div className="space-y-6 h-full flex flex-col">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 shadow-md shrink-0">
            <GitBranch size={22} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#1B2340]">Knowledge Graph</h1>
            <p className="text-sm text-[#6B7280] mt-0.5">
              Neo4j visualization of employees, departments, projects &amp; their relationships
            </p>
          </div>
        </div>

        {/* Quick stats */}
        <div className="flex gap-3 shrink-0">
          <div className="bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-center shadow-sm">
            <p className="text-lg font-bold text-[#1A1A1A]">{graphData.nodes.length}</p>
            <p className="text-xs text-[#6B7280]">Nodes</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-center shadow-sm">
            <p className="text-lg font-bold text-[#1A1A1A]">{graphData.links.length}</p>
            <p className="text-xs text-[#6B7280]">Relationships</p>
          </div>
          {backendOffline && (
            <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-xl px-4 py-2.5 text-sm text-amber-800">
              <XCircle size={16} className="text-amber-500 shrink-0" />
              <span>
                <strong>Backend offline</strong> — connect Neo4j &amp; restart the API
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Graph canvas — takes remaining height */}
      <div className="flex-1 min-h-0">
        <GraphVisualizerClient initialData={graphData} />
      </div>
    </div>
  )
}
