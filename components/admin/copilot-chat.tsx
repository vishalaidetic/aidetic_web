'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { Send, Bot, User, Zap, BookOpen, Loader2, ChevronDown, ChevronUp, Database, AlertTriangle, CheckCircle, XCircle } from 'lucide-react'

// ─── Types ───────────────────────────────────────────────────────────────────

interface Step {
  title: string
  content: string
  duration_ms?: number
}

interface ConfirmAction {
  action_description: string
  method: string
  endpoint: string
  payload: Record<string, unknown>
}

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  sql?: string
  steps?: Step[]
  total_duration_ms?: number
  confirmAction?: ConfirmAction
  confirmResolved?: boolean
}

type Mode = 'READ' | 'ACTION'

const METHOD_COLORS: Record<string, string> = {
  GET:    'bg-blue-100 text-blue-700 border-blue-200',
  POST:   'bg-emerald-100 text-emerald-700 border-emerald-200',
  PATCH:  'bg-amber-100 text-amber-700 border-amber-200',
  DELETE: 'bg-red-100 text-red-700 border-red-200',
}

const READ_SUGGESTIONS = [
  'Show all departments',
  'List all active projects',
  'How many employees do we have?',
  'Which projects are over budget?',
]

const ACTION_SUGGESTIONS = [
  "Create a new department called Marketing",
  "Update employee status to inactive",
  "Add a vendor called CloudInfra",
]

// ─── Step expander ───────────────────────────────────────────────────────────

function StepDetails({ step, isLive }: { step: Step; isLive: boolean }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-slate-100 rounded-lg overflow-hidden text-xs">
      <button
        onClick={() => setOpen((o) => !o)}
        className={`w-full flex items-center justify-between px-3 py-2 text-left transition-colors ${
          isLive ? 'bg-blue-50 text-blue-700' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
        }`}
      >
        <span className="flex items-center gap-2 font-medium">
          {isLive && <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />}
          {step.title}
          {step.duration_ms != null ? (
            <span className="font-normal text-slate-400">({(step.duration_ms / 1000).toFixed(2)}s)</span>
          ) : isLive ? (
            <span className="font-normal text-slate-400">running…</span>
          ) : null}
        </span>
        {open ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
      </button>
      {open && (
        <div className="px-3 py-2 bg-white border-t border-slate-100 font-mono text-[11px] text-slate-600 whitespace-pre-wrap overflow-x-auto max-h-40">
          {step.content}
        </div>
      )}
    </div>
  )
}

// ─── Message bubble ───────────────────────────────────────────────────────────

function MessageBubble({
  msg,
  isStreaming,
  currentStatus,
  onConfirm,
}: {
  msg: Message
  isStreaming: boolean
  currentStatus: string
  onConfirm: (id: string, approved: boolean) => void
}) {
  const [stepsOpen, setStepsOpen] = useState(false)
  const [sqlOpen, setSqlOpen] = useState(false)
  const isUser = msg.role === 'user'

  if (isUser) {
    return (
      <div className="flex justify-end">
        <div className="max-w-[80%] bg-[#1B2340] text-white rounded-2xl rounded-tr-sm px-4 py-3 shadow-sm">
          <div className="flex items-center gap-2 mb-1">
            <User size={13} className="text-blue-300 shrink-0" />
            <span className="text-xs text-blue-300 font-medium">You</span>
          </div>
          <p className="text-sm leading-relaxed">{msg.content}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex justify-start">
      <div className="max-w-[85%] bg-white border border-slate-200 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-[#DC2626] flex items-center justify-center shrink-0">
            <Bot size={12} className="text-white" />
          </div>
          <span className="text-xs text-[#6B7280] font-medium">AI Copilot</span>
          {isStreaming && (
            <span className="inline-flex items-center gap-1 text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full font-medium">
              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
              {currentStatus || 'Thinking…'}
            </span>
          )}
        </div>

        {/* Steps */}
        {msg.steps && msg.steps.length > 0 && (
          <div className="space-y-1">
            <button
              onClick={() => setStepsOpen((o) => !o)}
              className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 hover:text-slate-600 transition-colors"
            >
              {isStreaming
                ? <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
                : '🔗'}
              Agent Steps
              <span className="font-normal text-slate-300 normal-case">({msg.steps.length})</span>
              {stepsOpen ? <ChevronUp size={11} /> : <ChevronDown size={11} />}
            </button>
            {stepsOpen && (
              <div className="space-y-1 mt-1">
                {msg.steps.map((step, i) => (
                  <StepDetails
                    key={i}
                    step={step}
                    isLive={isStreaming && i === msg.steps!.length - 1}
                  />
                ))}
                {msg.sql && (
                  <div className="border border-slate-100 rounded-lg overflow-hidden text-xs">
                    <button
                      onClick={() => setSqlOpen((o) => !o)}
                      className="w-full flex items-center justify-between px-3 py-2 bg-slate-50 text-slate-600 hover:bg-slate-100 font-medium"
                    >
                      <span className="flex items-center gap-2">
                        <Database size={11} />
                        Generated SQL
                      </span>
                      {sqlOpen ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                    </button>
                    {sqlOpen && (
                      <div className="px-3 py-2 bg-white border-t border-slate-100 font-mono text-[11px] text-slate-700 whitespace-pre-wrap overflow-x-auto max-h-40">
                        {msg.sql}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Main content */}
        {msg.content && (
          <div className={`text-sm text-[#1A1A1A] leading-relaxed whitespace-pre-wrap ${msg.steps && msg.steps.length > 0 ? 'pt-2 border-t border-slate-100' : ''}`}>
            {msg.content}
            {isStreaming && (
              <span className="inline-block w-0.5 h-4 bg-slate-400 animate-pulse ml-0.5 align-middle" />
            )}
          </div>
        )}

        {/* Confirmation card */}
        {msg.confirmAction && !msg.confirmResolved && (
          <div className="border border-amber-300 bg-amber-50 rounded-xl p-4 space-y-3">
            <div className="flex items-center gap-2">
              <AlertTriangle size={16} className="text-amber-500" />
              <p className="text-sm font-semibold text-amber-800">Confirm Action</p>
            </div>
            <p className="text-sm text-[#6B7280]">{msg.confirmAction.action_description}</p>
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`px-2 py-0.5 text-xs font-bold rounded font-mono border ${METHOD_COLORS[msg.confirmAction.method] ?? 'bg-slate-100 text-slate-700 border-slate-200'}`}>
                {msg.confirmAction.method}
              </span>
              <code className="text-xs text-[#6B7280] bg-slate-100 px-2 py-0.5 rounded">
                {msg.confirmAction.endpoint}
              </code>
            </div>
            {Object.keys(msg.confirmAction.payload).length > 0 && (
              <div className="bg-white rounded-lg border border-amber-200 p-2">
                <p className="text-xs font-medium text-slate-400 mb-1">Payload</p>
                <table className="text-xs w-full">
                  <tbody>
                    {Object.entries(msg.confirmAction.payload).map(([k, v]) => (
                      <tr key={k}>
                        <td className="text-slate-400 pr-3 py-0.5 font-mono">{k}</td>
                        <td className="text-[#1A1A1A] font-medium">{String(v)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            <div className="flex gap-2">
              <button
                onClick={() => onConfirm(msg.id, true)}
                className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg transition-colors"
              >
                <CheckCircle size={14} /> Confirm
              </button>
              <button
                onClick={() => onConfirm(msg.id, false)}
                className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2 bg-slate-200 hover:bg-slate-300 text-[#1A1A1A] text-sm font-medium rounded-lg transition-colors"
              >
                <XCircle size={14} /> Cancel
              </button>
            </div>
          </div>
        )}

        {msg.confirmAction && msg.confirmResolved && (
          <div className="border border-slate-200 rounded-xl p-3 text-xs text-slate-400 flex items-center gap-2">
            🔒 Confirmation resolved
          </div>
        )}

        {/* Duration */}
        {msg.total_duration_ms != null && (
          <div className="flex justify-end pt-1 border-t border-slate-100">
            <span className="text-[10px] text-slate-400 font-mono">
              {(msg.total_duration_ms / 1000).toFixed(2)}s
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function CopilotChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [mode, setMode] = useState<Mode>('READ')
  const [currentStatus, setCurrentStatus] = useState('')
  const [streamingId, setStreamingId] = useState<string | null>(null)
  const endRef = useRef<HTMLDivElement>(null)
  const wsRef = useRef<WebSocket | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleConfirm = useCallback((msgId: string, approved: boolean) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ approved }))
    }
    setMessages((prev) => prev.map((m) => m.id === msgId ? { ...m, confirmResolved: true } : m))
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: input.trim() }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setIsLoading(true)

    const assistantId = (Date.now() + 1).toString()
    setStreamingId(assistantId)
    setCurrentStatus('')
    setMessages((prev) => [...prev, { id: assistantId, role: 'assistant', content: '' }])

    try {
      const tokenRes = await fetch('/api/auth/token')
      const tokenData = await tokenRes.json()
      const authToken = tokenData.token || ''

      const wsBase = process.env.NEXT_PUBLIC_BRAIN_WS_URL ?? 'ws://localhost:8000'
      const ws = new WebSocket(`${wsBase}/api/v1/copilot/ws/query`)
      wsRef.current = ws

      ws.onopen = () => {
        const history = messages.map((m) => ({ role: m.role, content: m.content }))
        ws.send(JSON.stringify({ query: userMsg.content, token: authToken, history, mode }))
      }

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data)

        setMessages((prev) => prev.map((msg) => {
          if (msg.id !== assistantId) return msg
          if (data.type === 'status') { setCurrentStatus(data.content); return msg }
          if (data.type === 'step') return { ...msg, steps: [...(msg.steps ?? []), { title: data.title, content: data.content, duration_ms: data.duration_ms }] }
          if (data.type === 'sql') return { ...msg, sql: data.content }
          if (data.type === 'content') return { ...msg, content: msg.content + data.content }
          if (data.type === 'error') return { ...msg, content: msg.content + '\n\n**Error:** ' + data.content }
          if (data.type === 'confirm') return { ...msg, confirmAction: { action_description: data.action_description, method: data.method, endpoint: data.endpoint, payload: data.payload }, confirmResolved: false }
          return msg
        }))

        if (data.type === 'done' || data.type === 'error') {
          if (data.type === 'done' && data.total_duration_ms !== undefined) {
            setMessages((prev) => prev.map((m) => m.id === assistantId ? { ...m, total_duration_ms: data.total_duration_ms } : m))
          }
          ws.close()
          wsRef.current = null
          setIsLoading(false)
          setStreamingId(null)
          setCurrentStatus('')
        }
      }

      ws.onerror = () => {
        setMessages((prev) => prev.map((m) => m.id === assistantId ? { ...m, content: m.content + '\n\n**WebSocket connection error.** Make sure the Brain API is running.' } : m))
        setIsLoading(false)
      }

      ws.onclose = () => setIsLoading(false)
    } catch (err) {
      console.error('Copilot error:', err)
      setMessages((prev) => prev.map((m) => m.id === assistantId ? { ...m, content: 'Sorry, something went wrong.' } : m))
      setIsLoading(false)
    }
  }

  const suggestions = mode === 'READ' ? READ_SUGGESTIONS : ACTION_SUGGESTIONS

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0 mb-6">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#DC2626] shadow-md shrink-0">
            <Bot size={22} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#1B2340]">AI Copilot</h1>
            <p className="text-sm text-[#6B7280] mt-0.5">
              Talk to your data in plain English — powered by the Brain AI engine
            </p>
          </div>
        </div>

        {/* Mode toggle */}
        <div className="flex items-center gap-1 bg-slate-200 p-1 rounded-lg">
          <button
            onClick={() => setMode('READ')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
              mode === 'READ' ? 'bg-white text-[#1B2340] shadow-sm' : 'text-[#6B7280] hover:text-[#1B2340]'
            }`}
          >
            <BookOpen size={12} /> Read Data
          </button>
          <button
            onClick={() => setMode('ACTION')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
              mode === 'ACTION' ? 'bg-orange-500 text-white shadow-sm' : 'text-[#6B7280] hover:text-orange-600'
            }`}
          >
            <Zap size={12} /> Take Action
          </button>
        </div>
      </div>

      <div className="flex flex-col flex-1 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

      {/* Chat area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-5">
        {messages.length === 0 ? (
          /* Empty state */
          <div className="flex flex-col items-center justify-center h-full text-center gap-5">
            <div className="w-16 h-16 bg-[#DC2626]/10 rounded-full flex items-center justify-center">
              <Bot size={32} className="text-[#DC2626]" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[#1B2340]">Welcome to AI Copilot</h3>
              <p className="text-sm text-[#6B7280] max-w-sm mt-1">
                {mode === 'READ'
                  ? 'Ask questions about your data in plain English.'
                  : 'Tell me what to create, update or delete — with confirmation before any change.'}
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-2 max-w-lg">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => { setInput(s); inputRef.current?.focus() }}
                  className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
                    mode === 'ACTION'
                      ? 'bg-orange-50 border-orange-200 text-orange-700 hover:bg-orange-100'
                      : 'bg-white border-slate-200 text-[#6B7280] hover:bg-slate-50'
                  }`}
                >
                  "{s}"
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((msg) => (
            <MessageBubble
              key={msg.id}
              msg={msg}
              isStreaming={msg.id === streamingId}
              currentStatus={currentStatus}
              onConfirm={handleConfirm}
            />
          ))
        )}

        {/* Typing indicator */}
        {isLoading && !messages.find((m) => m.id === streamingId && (m.steps?.length ?? 0) > 0) && (
          <div className="flex justify-start">
            <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm flex items-center gap-2">
              <div className="flex gap-1">
                {[0, 150, 300].map((delay) => (
                  <div
                    key={delay}
                    className="w-2 h-2 bg-[#DC2626] rounded-full animate-bounce"
                    style={{ animationDelay: `${delay}ms` }}
                  />
                ))}
              </div>
              <span className="text-sm text-[#6B7280]">
                {currentStatus || (mode === 'ACTION' ? 'Planning action…' : 'Analyzing…')}
              </span>
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      {/* Input */}
      <div className="shrink-0 border-t border-slate-200 bg-white px-5 py-4">
        <form onSubmit={handleSubmit} className="flex gap-3">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              mode === 'ACTION'
                ? 'e.g. "Create a department called Marketing"'
                : 'Ask a question about your data…'
            }
            disabled={isLoading}
            className="flex-1 bg-[#F5F5F5] border border-slate-200 text-[#1A1A1A] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#DC2626] focus:border-transparent transition-all disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className={`px-5 py-3 rounded-xl font-semibold text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 ${
              mode === 'ACTION'
                ? 'bg-orange-500 hover:bg-orange-600 text-white'
                : 'bg-[#DC2626] hover:bg-[#B91C1C] text-white'
            }`}
          >
            {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
            <span className="hidden sm:inline">{mode === 'ACTION' ? 'Execute' : 'Send'}</span>
          </button>
        </form>
        <p className="text-center text-xs text-[#6B7280] mt-2">
          {mode === 'ACTION'
            ? '⚠️ Action Mode — all changes require manual confirmation before execution.'
            : 'AI can make mistakes. Verify important information.'}
        </p>
      </div>
    </div>
    </div>
  )
}
