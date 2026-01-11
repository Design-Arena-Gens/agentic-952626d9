export interface Signal {
  id: string
  symbol: string
  name: string
  type: 'stock' | 'forex' | 'crypto'
  action: 'BUY' | 'SELL'
  currentPrice: number
  entryPrice: number
  stopLoss: number
  takeProfit: number
  confidence: number
  timeframe: string
  analysis: string
  indicators: {
    rsi: number
    macd: string
    volume: string
    trend: string
  }
  timestamp: Date
}

export interface Notification {
  id: string
  signal: Signal
  message: string
  timestamp: Date
  read: boolean
}

export interface MarketStats {
  stocks: number
  forex: number
  crypto: number
  total: number
}
