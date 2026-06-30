import type { Metadata } from 'next'
import { Bot, Zap, BookOpen, Database } from 'lucide-react'
import CopilotChat from '@/components/admin/copilot-chat'
export const metadata: Metadata = {
  title: 'AI Copilot - Admin Dashboard',
  description: 'Chat with your data using natural language — powered by the Brain AI Copilot',
}

export default function CopilotPage() {
  return (
    <div className="space-y-6 h-full flex flex-col">

      {/* Chat interface — takes remaining space */}
      <div className="flex-1 min-h-0" style={{ minHeight: '500px' }}>
        <CopilotChat />
      </div>
    </div>
  )
}
