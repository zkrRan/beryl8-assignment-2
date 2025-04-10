import { usDollar, krWon, jpYen } from '../exchange-rate'

describe('Currency Converter Test', () => {
  let consoleLogSpy: jest.SpyInstance

  beforeEach(() => {
    jest.resetModules()
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {})
  })

  // Class Tests
  // [T1]: check if USD conversion is valid
  it('should convert THB to USD correctly', () => {
    const amount = 1000
    const convertedAmount = usDollar.calculateExchange(amount)
    expect(convertedAmount).toBeCloseTo(28.0, 2)
  })

  // [T2]: check if WON conversion is valid
  it('should convert THB to WON correctly', () => {
    const amount = 1000
    const convertedAmount = krWon.calculateExchange(amount)
    expect(convertedAmount).toBeCloseTo(33720, 2)
  })

  // [T3]: check if YEN conversion is valid
  it('should convert THB to YEN correctly', () => {
    const amount = 1000
    const convertedAmount = jpYen.calculateExchange(amount)
    expect(convertedAmount).toBeCloseTo(3400, 2)
  })

  // [T4]: check if USD conversion is valid if using float number
  it('should convert THB to USD correctly with float number', () => {
    const amount = 1000.5
    const convertedAmount = usDollar.calculateExchange(amount)
    expect(convertedAmount).toBeCloseTo(28.01, 2)
  })

  // [T5]: check if WON conversion is valid if using float number
  it('should convert THB to WON correctly with float number', () => {
    const amount = 1000.5
    const convertedAmount = krWon.calculateExchange(amount)
    expect(convertedAmount).toBeCloseTo(33736.86, 2)
  })

  // [T6]: check if YEN conversion is valid if using float number
  it('should convert THB to YEN correctly with float number', () => {
    const amount = 1000.5
    const convertedAmount = jpYen.calculateExchange(amount)
    expect(convertedAmount).toBeCloseTo(3401.7, 2)
  })

    // Main Program Tests
    // [T7]: check if the main program works correctly
  it('should convert 100 THB to USD correctly using main program', () => {
    const mockInput = jest
      .fn()
      .mockReturnValueOnce('100')
      .mockReturnValueOnce('USD')

    // mocking the prompt-sync module (console input)
    jest.mock('prompt-sync', () => jest.fn(() => mockInput))

    const mockUSD = {
      calculateExchange: (amount: number) => amount * 1.1,
      currencyCode: 'USD',
    }

    // mock usd to the one in jest to return amount * 1.1
    jest.mock('../exchange-rate', () => ({
      krWon: {
        calculateExchange: jest.fn(),
        currencyCode: 'KRW',
      },
      jpYen: {
        calculateExchange: jest.fn(),
        currencyCode: 'JPY',
      },
      usDollar: mockUSD,
    }))

    require('../index')

    expect(consoleLogSpy).toHaveBeenCalledWith('Converted amount: 110.00 USD')
  })
    
    // [T8]: check if the main program throws an error for invalid currency
    it('should throw an error for invalid currency', () => { 
        const mockInput = jest
            .fn()
            .mockReturnValueOnce('100')
            .mockReturnValueOnce('SGD')
    
        // mocking the prompt-sync module (console input)
        jest.mock('prompt-sync', () => jest.fn(() => mockInput))

        // mock the exchange-rate module
        jest.mock('../exchange-rate', () => ({
            krWon: {
            calculateExchange: jest.fn(),
            currencyCode: 'KRW',
            },
            jpYen: {
            calculateExchange: jest.fn(),
            currencyCode: 'JPY',
            },
            usDollar: {
            calculateExchange: jest.fn(),
            currencyCode: 'USD',
            },
        }))
    
        require('../index')
    
        expect(consoleLogSpy).toHaveBeenCalledWith(
            'Invalid currency code. Please use KRW, JPY, or USD.',
        )
    })
})
