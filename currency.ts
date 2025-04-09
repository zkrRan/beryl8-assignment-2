export class Currency {
  currencyCode: string
  exchangeRate: number

  constructor(currencyCode: string, exchangeRate: number) {
    this.currencyCode = currencyCode
    this.exchangeRate = exchangeRate
  }

  calculateExchange(amount: number): number {
    return amount * this.exchangeRate
  }
}
