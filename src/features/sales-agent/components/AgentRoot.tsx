import { AgentTrigger } from './AgentTrigger'
import { AgentChatWindow } from './AgentChatWindow'

export const AgentRoot = () => {
  return (
    <>
      <AgentTrigger />
      <AgentChatWindow />
    </>
  )
}
