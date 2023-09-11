import { useState } from 'react'

export const useMessage = <T>(messageState: T) => {
  const [messages, setMessages] = useState(messageState)

  const resetMessages = () => {
    setMessages(messageState)
  }

  return {
    messages,
    setMessages,
    resetMessages,
  }
}
