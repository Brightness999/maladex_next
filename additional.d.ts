interface Window {
  cardano?: {
    nami?: {
      enable?: (...args: any[]) => Promise<any>
      isEnabled?: (...args: any[]) => Promise<boolean>
    }
    yoroi?: {
      enable?: (...args: any[]) => Promise<any>
      isEnabled?: (...args: any[]) => Promise<boolean>
    }
    ccvault?: {
      enable?: (...args: any[]) => Promise<any>
      isEnabled?: (...args: any[]) => Promise<boolean>
    }
    gerowallet?: {
      enable?: (...args: any[]) => Promise<any>
      experimental?: {
        on?: (...args: any[]) => Promise<any>
        off?: (...args: any[]) => Promise<any>
        getCollateral?: (...args: any[]) => Promise<any>
      }
      getBalance?: (...args: any[]) => Promise<any>
      getChangeAddress?: (...args: any[]) => Promise<any>
      getCollateral?: (...args: any[]) => Promise<any>
      getNetworkId?: (...args: any[]) => Promise<any>
      getRewardAddresses?: (...args: any[]) => Promise<any>
      getUnusedAddresses?: (...args: any[]) => Promise<any>
      getUsedAddresses?: (...args: any[]) => Promise<any>
      getUtxos?: (...args: any[]) => Promise<any>
      isEnabled?: (...args: any[]) => Promise<boolean>
      onAccountChange?: (...args: any[]) => Promise<any>
      onNetworkChange?: (...args: any[]) => Promise<any>
      signData?: (...args: any[]) => Promise<any>
      signTx?: (...args: any[]) => Promise<any>
      submitTx?: (...args: any[]) => Promise<any>
    }
  }
}