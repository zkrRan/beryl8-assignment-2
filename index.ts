import { Currency } from './currency'
import promptSync from 'prompt-sync'
import { krWon, jpYen, usDollar } from './exchange-rate'

const input = promptSync()

// map currency to each currency instances
const currencyMap = {
  WON: krWon,
  YEN: jpYen,
  USD: usDollar,
} as const

const amount = Number(input('Number in THB: '))
const conversionCurrency = input(
  'Currency to convert to (KRW, JPY, USD): ',
).toUpperCase()

// get currency from map
const currency = currencyMap[conversionCurrency as keyof typeof currencyMap]

if (!currency) {
  console.log('Invalid currency code. Please use KRW, JPY, or USD.')
}

const convertedAmount = currency.calculateExchange(amount).toFixed(2)
console.log(`Converted amount: ${convertedAmount} ${currency.currencyCode}`)
