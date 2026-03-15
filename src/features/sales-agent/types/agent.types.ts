export type MessageRole = 'user' | 'assistant' | 'tool_result'

export interface AgentMessage {
  id: string
  role: MessageRole
  content: string
  toolCall?: {
    name: string
    args: unknown
    result?: unknown
  }
  timestamp: Date
}

export interface AgentState {
  messages: AgentMessage[]
  isThinking: boolean
  isOpen: boolean
  sessionId: string | null
}
