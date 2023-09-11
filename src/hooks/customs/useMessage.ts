import { useState } from 'react'

const useMessage = <T>(messageState: T) => {
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

export default useMessage
