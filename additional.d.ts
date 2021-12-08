interface Window {
  cardano?: {
    enable?: (...args: any[]) => Promise<boolean>
    getBalance?: (...args: any[]) => Promise<boolean>
    getChangedAddress?: (...args: any[]) => Promise<string>
    getCollateral?: (...args: any[]) => Promise<Array>
    getNetworkId?: (...args: any[]) => Promise<number>
    getRewardAddress?: (...args: any[]) => Promise<string>
    getUnusedAddresses?: (...args: any[]) => Promise<Array<string>>
    getUsedAddresses?: (...args: any[]) => Promise<Array<string>>
    getUtxos?: (...args: any[]) => Promise<Array<string>>
    isEnabled?: (...args: any[]) => Promise<boolean>
    onAccountChange?: (...args: any[]) => Promise<void>
    onNetworkChange?: (...args: any[]) => Promise<void>
    signData?: (...args: any[]) => Promise<string>
    signTx?: (...args: any[]) => Promise<string>
    submitTx?: (...args: any[]) => Promise<string>
    yoroi?: {
      enable?: (...args: any[]) => Promise<any>
      isEnabled?: (...args: any[]) => Promise<boolean>
    }
  }
  ergo_check_read_access?: (...args: any[]) => Promise<void>
  ergo_request_read_access?: (...args: any[]) => Promise<void>
}