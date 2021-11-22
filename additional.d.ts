interface Window {
  cardano?: {
    enable?: (...args: any[]) => Promise<void>
    getBalance?: (...args: any[]) => Promise<void>
    getChangedAddress?: (...args: any[]) => Promise<void>
    getCollateral?: (...args: any[]) => Promise<void>
    getNetworkId?: (...args: any[]) => Promise<void>
    getRewardAddress?: (...args: any[]) => Promise<void>
    getUnusedAddresses?: (...args: any[]) => Promise<void>
    getUsedAddresses?: (...args: any[]) => Promise<void>
    getUtxos?: (...args: any[]) => Promise<void>
    isEnabled?: (...args: any[]) => Promise<void>
    onAccountChange?: (...args: any[]) => Promise<void>
    onNetworkChange?: (...args: any[]) => Promise<void>
    signData?: (...args: any[]) => Promise<void>
    signTx?: (...args: any[]) => Promise<void>
    submitTx?: (...args: any[]) => Promise<void>
  }
}