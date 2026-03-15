import { SendHorizontal, Sparkles } from 'lucide-react'
import { useAgentStore } from '@/stores/agent.store'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'

export const AgentChatWindow = () => {
  const { isOpen } = useAgentStore()

  if (!isOpen) return null

  return (
    <div
      className={cn(
        'fixed z-50 flex flex-col overflow-hidden border bg-background shadow-2xl transition-all duration-300 animate-in fade-in slide-in-from-bottom-4',
        'bg-white/95 backdrop-blur-xl rounded-2xl',
        // Desktop
        'sm:bottom-24 sm:right-6 sm:h-[600px] sm:w-[400px] sm:left-auto',
        // Mobile (Floating & Responsive)
        'bottom-20 right-4 left-4 h-[75vh]',
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-3 border-b px-6 py-4 bg-foreground text-background">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 ring-1 ring-background/20">
          <Sparkles className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="text-sm font-bold uppercase tracking-widest">Rio Agent</h3>
          <p className="text-[10px] text-background/60 flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span>
            AI Shopping Assistant
          </p>
        </div>
      </div>

      {/* Messages Area */}
      <ScrollArea className="flex-1 p-6">
        <div className="space-y-4">
          {/* Welcome Message */}
          <div className="flex flex-col gap-2 max-w-[80%]">
            <div className="rounded-2xl rounded-tl-none bg-muted px-4 py-3 text-sm">
              Hello! I'm Rio's AI assistant. I can help you find the perfect outfit, check stock, or
              answer any questions about our style. What's on your mind today?
            </div>
            <span className="text-[10px] text-muted-foreground px-1">Just now</span>
          </div>

          {/* Suggestion Chips */}
          <div className="flex flex-wrap gap-2 pt-2">
            {['Show me hoodies', 'Trending now', 'Check my cart'].map((chip) => (
              <button
                key={chip}
                className="px-3 py-1.5 rounded-full border bg-white text-xs font-bold uppercase tracking-wider hover:bg-muted transition-colors cursor-pointer"
              >
                {chip}
              </button>
            ))}
          </div>
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="border-t p-4 bg-muted/30">
        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="Ask me anything..."
            className="w-full rounded-xl border bg-white px-4 py-3 pr-12 text-sm shadow-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          />
          <Button
            size="icon"
            className="absolute right-1.5 h-9 w-9 bg-foreground hover:bg-foreground/90 text-background rounded-lg transition-all"
          >
            <SendHorizontal className="h-4 w-4" />
          </Button>
        </div>
        <p className="mt-2 text-center text-[10px] text-muted-foreground">
          Powered by Advanced Coding Agent
        </p>
      </div>
    </div>
  )
}
