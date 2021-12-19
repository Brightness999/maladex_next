import React, { useState, useEffect, createContext } from "react";

type TradingType = {
  symboltype: string;
  slug: string;
}

const TradingContext = createContext({
  symboltype: '',
  slug: ''
} as TradingType)

const TradingContextProvider = ({children}) => {
  const [symboltype, setSymbolType] = useState<string>("");
  const [slug, setSlug] = useState<string>("");

  return (
    <TradingContext.Provider value={{symboltype, slug}}>
      {children}
    </TradingContext.Provider>
  );
}

export { TradingContext, TradingContextProvider}