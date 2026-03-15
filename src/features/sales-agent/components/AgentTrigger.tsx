import { MessageSquareText, X } from 'lucide-react'
import { useAgentStore } from '@/stores/agent.store'
import { cn } from '@/lib/utils'

export const AgentTrigger = () => {
  const { isOpen, toggle } = useAgentStore()

  return (
    <button
      onClick={toggle}
      className={cn(
        'fixed z-50 flex h-12 items-center gap-2.5 rounded-full px-5 shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95',
        'sm:bottom-6 sm:right-6 bottom-4 right-4',
        isOpen ? 'bg-foreground text-background' : 'bg-black text-white',
      )}
    >
      {isOpen ? (
        <>
          <X className="h-5 w-5" />
          <span className="text-sm font-bold tracking-tight">Close Agent</span>
        </>
      ) : (
        <>
          <MessageSquareText className="h-5 w-5" />
          <span className="text-sm font-bold tracking-tight">Sales Agent</span>
        </>
      )}
    </button>
  )
}
