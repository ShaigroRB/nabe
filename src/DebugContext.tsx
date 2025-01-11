import { createContext, ReactNode, useContext, useState } from 'react'

export type DebugFunc = (str: string) => void

type DebugInformation = {
  debug: string
  setDebug: DebugFunc
}

const DebugContext = createContext<DebugInformation | null>(null)

export const DebugContextProvider = ({ children }: { children: ReactNode }) => {
  const [debug, setDebug] = useState('debug info')
  return (
    <DebugContext.Provider value={{ debug, setDebug }}>
      <div
        style={{
          backgroundColor: 'red',
          position: 'absolute',
          bottom: 0,
          width: '100%',
        }}
      >
        Debug: {debug}
      </div>
      {children}
    </DebugContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useDebugContext = () => {
  const context = useContext(DebugContext)

  if (context === null) {
    throw new Error(
      'DebugContext: Component is not a child of a DebugContextProvider',
    )
  }

  return context
}
