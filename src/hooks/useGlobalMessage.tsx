import {message} from 'antd'
import {createContext, useContext, ReactNode} from 'react'

type MessageApi = ReturnType<typeof message.useMessage>[0]
const MessageContext = createContext<MessageApi | null>(null)

export const GlobalMessageProvider = ({children}: {children: ReactNode}) => {
  const [api, holder] = message.useMessage()

  return (
    <MessageContext.Provider value={api}>
      {children}
      {holder}
    </MessageContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useGlobalMessage = (): MessageApi => {
  const context = useContext(MessageContext)
  if (!context) {
    throw new Error('useGlobalMessage must be used within a GlobalMessageProvider')
  }
  return context
}
