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
  }
}