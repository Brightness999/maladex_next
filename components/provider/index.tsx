import React from 'react'

import { TradingContextProvider } from './TradingContextProvider';
const Providers: React.FC = ({ children }) => {
  return (
    <TradingContextProvider>{children}</TradingContextProvider>
  )
}

export default Providers
