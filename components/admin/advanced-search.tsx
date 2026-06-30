'use client'

import { useState } from 'react'
import { Search, Loader2, Database, ChevronRight, ChevronDown, FileJson } from 'lucide-react'

type SearchType = 'employee' | 'department' | 'designation' | 'project' | 'vendor' | 'client' | 'invoice' | 'reimbursement'

const SEARCH_TYPES: { value: SearchType; label: string }[] = [
  { value: 'employee', label: 'Employee' },
  { value: 'department', label: 'Department' },
  { value: 'designation', label: 'Designation' },
  { value: 'project', label: 'Project' },
  { value: 'vendor', label: 'Vendor' },
  { value: 'client', label: 'Client' },
  { value: 'invoice', label: 'Invoice' },
  { value: 'reimbursement', label: 'Reimbursement' },
]

export default function AdvancedSearch() {
  const [searchType, setSearchType] = useState<SearchType>('employee')
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<any[]>([])
  const [hasSearched, setHasSearched] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  // Keep track of expanded JSON nodes
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({})

  const toggleNode = (nodeId: string) => {
    setExpandedNodes(prev => ({
      ...prev,
      [nodeId]: !prev[nodeId]
    }))
  }

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (!query.trim()) return

    setIsLoading(true)
    setError(null)
    setHasSearched(true)
    
    try {
      const response = await fetch(`/api/brain/analytics/search?q=${encodeURIComponent(query)}&type=${searchType}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })
      
      const data = await response.json()
      if (response.ok) {
        setResults(data.data || [])
      } else {
        setError(data.error || data.message || 'An error occurred during search')
        setResults([])
      }
    } catch (err: any) {
      setError(err.message || 'Failed to connect to search service')
      setResults([])
    } finally {
      setIsLoading(false)
    }
  }

  const renderJsonViewer = (data: any, path: string = 'root') => {
    if (data === null) {
      return <span className="text-slate-400 italic font-mono text-xs">null</span>
    }
    
    if (typeof data !== 'object') {
      const type = typeof data
      let colorClass = 'text-slate-600'
      if (type === 'string') colorClass = 'text-emerald-600'
      if (type === 'number') colorClass = 'text-blue-600'
      if (type === 'boolean') colorClass = 'text-purple-600'
      
      return (
        <span className={`font-mono text-xs ${colorClass}`}>
          {type === 'string' ? `"${data}"` : String(data)}
        </span>
      )
    }

    const isArray = Array.isArray(data)
    const keys = Object.keys(data)
    const isExpanded = expandedNodes[path] !== false // Default expanded

    if (keys.length === 0) {
      return <span className="text-slate-400 font-mono text-xs">{isArray ? '[]' : '{}'}</span>
    }

    return (
      <div className="pl-4 border-l border-slate-200 mt-1">
        {keys.map((key) => {
          const newPath = `${path}.${key}`
          const isObjectOrArray = data[key] !== null && typeof data[key] === 'object'
          
          return (
            <div key={key} className="my-1 flex items-start">
              {isObjectOrArray ? (
                <button
                  onClick={() => toggleNode(newPath)}
                  className="mt-0.5 mr-1 text-slate-400 hover:text-slate-600 focus:outline-none shrink-0"
                >
                  {expandedNodes[newPath] !== false ? (
                    <ChevronDown size={14} />
                  ) : (
                    <ChevronRight size={14} />
                  )}
                </button>
              ) : (
                <div className="w-5 shrink-0" />
              )}
              
              <div className="flex-1">
                {!isArray && (
                  <span className="font-mono text-xs font-semibold text-[#DC2626] mr-2">
                    {key}:
                  </span>
                )}
                
                {isObjectOrArray ? (
                  expandedNodes[newPath] !== false ? (
                    renderJsonViewer(data[key], newPath)
                  ) : (
                    <span className="text-xs text-slate-500 italic font-mono bg-slate-100 px-1.5 py-0.5 rounded cursor-pointer" onClick={() => toggleNode(newPath)}>
                      {Array.isArray(data[key]) ? `[Array of ${data[key].length}]` : '{Object}'}
                    </span>
                  )
                ) : (
                  renderJsonViewer(data[key], newPath)
                )}
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
      {/* Search Header */}
      <div className="p-6 border-b border-slate-200 bg-[#F5F5F5]/60 shrink-0">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
          <div className="sm:w-64 shrink-0">
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Entity Type</label>
            <select
              value={searchType}
              onChange={(e) => setSearchType(e.target.value as SearchType)}
              className="w-full bg-white border border-slate-200 text-[#1A1A1A] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#DC2626] focus:border-transparent transition-all"
            >
              {SEARCH_TYPES.map((t) => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </div>
          
          <div className="flex-1 flex flex-col">
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Search Query</label>
            <div className="flex gap-3">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={`Search by name, ID, code, etc. for ${SEARCH_TYPES.find(t => t.value === searchType)?.label}...`}
                className="flex-1 bg-white border border-slate-200 text-[#1A1A1A] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#DC2626] focus:border-transparent transition-all"
              />
              <button
                type="submit"
                disabled={isLoading || !query.trim()}
                className="px-6 py-3 rounded-xl font-semibold text-sm bg-[#DC2626] hover:bg-[#B91C1C] text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shrink-0"
              >
                {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Search size={16} />}
                <span>Search</span>
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Results Area */}
      <div className="flex-1 overflow-y-auto p-6 bg-slate-50">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-full gap-4 text-slate-400">
            <Loader2 size={32} className="animate-spin text-[#DC2626]" />
            <p className="text-sm font-medium">Searching across relationships...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center h-full gap-3 text-red-500 bg-red-50 rounded-xl p-8 max-w-lg mx-auto border border-red-100 text-center">
            <Database size={32} className="text-red-400" />
            <h3 className="font-semibold text-lg">Search Failed</h3>
            <p className="text-sm">{error}</p>
          </div>
        ) : !hasSearched ? (
          <div className="flex flex-col items-center justify-center h-full text-center gap-4 text-slate-500">
            <div className="w-16 h-16 bg-white shadow-sm rounded-full flex items-center justify-center border border-slate-100">
              <Search size={28} className="text-slate-300" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-[#1B2340]">Universal Entity Search</h3>
              <p className="text-sm mt-1 max-w-md mx-auto">
                Select an entity type and enter a search query to retrieve the full relational graph for that record.
              </p>
            </div>
          </div>
        ) : results.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center gap-4 text-slate-500 bg-white rounded-2xl border border-slate-200 border-dashed p-10 max-w-xl mx-auto shadow-sm">
            <Search size={32} className="text-slate-300" />
            <div>
              <h3 className="text-lg font-medium text-[#1B2340]">No Results Found</h3>
              <p className="text-sm mt-1">We couldn't find any {searchType}s matching "{query}".</p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-[#1B2340]">Search Results</h3>
              <span className="text-sm bg-white border border-slate-200 px-3 py-1 rounded-full text-slate-600 font-medium shadow-sm">
                {results.length} record{results.length === 1 ? '' : 's'} found
              </span>
            </div>
            
            <div className="space-y-6">
              {results.map((result, i) => (
                <div key={i} className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                  <div className="bg-[#1B2340] px-4 py-3 flex items-center gap-2 text-white border-b border-slate-200">
                    <FileJson size={16} className="text-blue-400" />
                    <span className="text-sm font-semibold capitalize tracking-wide">{searchType} Entity</span>
                    {result.id && (
                      <span className="ml-auto text-xs font-mono text-slate-400 bg-black/20 px-2 py-0.5 rounded">ID: {result.id}</span>
                    )}
                  </div>
                  <div className="p-4 overflow-x-auto">
                    {renderJsonViewer(result, `result-${i}`)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
