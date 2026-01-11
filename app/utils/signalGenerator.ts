import { Signal, Notification } from '../types'

const stockSymbols = [
  { symbol: 'AAPL', name: 'Apple Inc.' },
  { symbol: 'GOOGL', name: 'Alphabet Inc.' },
  { symbol: 'MSFT', name: 'Microsoft Corp.' },
  { symbol: 'TSLA', name: 'Tesla Inc.' },
  { symbol: 'NVDA', name: 'NVIDIA Corp.' },
  { symbol: 'META', name: 'Meta Platforms' },
  { symbol: 'AMZN', name: 'Amazon.com Inc.' },
  { symbol: 'JPM', name: 'JPMorgan Chase' },
]

const forexPairs = [
  { symbol: 'EUR/USD', name: 'Euro vs US Dollar' },
  { symbol: 'GBP/USD', name: 'British Pound vs US Dollar' },
  { symbol: 'USD/JPY', name: 'US Dollar vs Japanese Yen' },
  { symbol: 'AUD/USD', name: 'Australian Dollar vs US Dollar' },
  { symbol: 'USD/CAD', name: 'US Dollar vs Canadian Dollar' },
  { symbol: 'NZD/USD', name: 'New Zealand Dollar vs US Dollar' },
]

const cryptoSymbols = [
  { symbol: 'BTC/USD', name: 'Bitcoin' },
  { symbol: 'ETH/USD', name: 'Ethereum' },
  { symbol: 'SOL/USD', name: 'Solana' },
  { symbol: 'ADA/USD', name: 'Cardano' },
  { symbol: 'XRP/USD', name: 'Ripple' },
  { symbol: 'MATIC/USD', name: 'Polygon' },
]

const timeframes = ['5m', '15m', '1h', '4h', '1D']

const trendTypes = ['Strong Uptrend', 'Uptrend', 'Consolidation', 'Downtrend', 'Strong Downtrend']

const macdStates = ['Bullish', 'Bearish', 'Neutral']

const volumeStates = ['High', 'Average', 'Low', 'Increasing', 'Decreasing']

function generatePrice(basePrice: number, variance: number): number {
  return Number((basePrice * (1 + (Math.random() - 0.5) * variance)).toFixed(2))
}

function generateSignal(symbol: any, type: 'stock' | 'forex' | 'crypto'): Signal {
  const action: 'BUY' | 'SELL' = Math.random() > 0.5 ? 'BUY' : 'SELL'

  let basePrice: number
  if (type === 'stock') {
    basePrice = 100 + Math.random() * 400
  } else if (type === 'forex') {
    basePrice = 0.8 + Math.random() * 0.5
  } else {
    basePrice = 100 + Math.random() * 50000
  }

  const currentPrice = generatePrice(basePrice, 0.02)
  const entryPrice = generatePrice(currentPrice, 0.005)

  const stopLoss = action === 'BUY'
    ? Number((entryPrice * 0.97).toFixed(2))
    : Number((entryPrice * 1.03).toFixed(2))

  const takeProfit = action === 'BUY'
    ? Number((entryPrice * 1.05).toFixed(2))
    : Number((entryPrice * 0.95).toFixed(2))

  const rsi = 20 + Math.random() * 60
  const confidence = Math.floor(65 + Math.random() * 30)

  const analyses = [
    'Strong momentum detected with volume confirmation',
    'Price breaking through key resistance level',
    'Multiple indicators showing convergence',
    'Trend reversal pattern forming',
    'Support level holding with bullish divergence',
    'Moving averages aligned for continuation',
    'Price action showing strong momentum',
    'Technical indicators confirming trend'
  ]

  return {
    id: `${type}-${symbol.symbol}-${Date.now()}-${Math.random()}`,
    symbol: symbol.symbol,
    name: symbol.name,
    type,
    action,
    currentPrice,
    entryPrice,
    stopLoss,
    takeProfit,
    confidence,
    timeframe: timeframes[Math.floor(Math.random() * timeframes.length)],
    analysis: analyses[Math.floor(Math.random() * analyses.length)],
    indicators: {
      rsi: Number(rsi.toFixed(2)),
      macd: macdStates[Math.floor(Math.random() * macdStates.length)],
      volume: volumeStates[Math.floor(Math.random() * volumeStates.length)],
      trend: trendTypes[Math.floor(Math.random() * trendTypes.length)]
    },
    timestamp: new Date()
  }
}

export function generateSignals(): Signal[] {
  const signals: Signal[] = []

  // Generate 3-4 stock signals
  const numStocks = 3 + Math.floor(Math.random() * 2)
  for (let i = 0; i < numStocks; i++) {
    const stock = stockSymbols[Math.floor(Math.random() * stockSymbols.length)]
    signals.push(generateSignal(stock, 'stock'))
  }

  // Generate 2-3 forex signals
  const numForex = 2 + Math.floor(Math.random() * 2)
  for (let i = 0; i < numForex; i++) {
    const forex = forexPairs[Math.floor(Math.random() * forexPairs.length)]
    signals.push(generateSignal(forex, 'forex'))
  }

  // Generate 2-3 crypto signals
  const numCrypto = 2 + Math.floor(Math.random() * 2)
  for (let i = 0; i < numCrypto; i++) {
    const crypto = cryptoSymbols[Math.floor(Math.random() * cryptoSymbols.length)]
    signals.push(generateSignal(crypto, 'crypto'))
  }

  // Sort by confidence
  return signals.sort((a, b) => b.confidence - a.confidence)
}

export function generateNotification(signal: Signal): Notification {
  const messages = [
    `New ${signal.action} opportunity detected for ${signal.symbol}`,
    `High confidence ${signal.action} signal: ${signal.symbol}`,
    `${signal.symbol} showing strong ${signal.action.toLowerCase()} setup`,
    `Alert: ${signal.symbol} ${signal.action} signal - ${signal.confidence}% confidence`
  ]

  return {
    id: `notif-${Date.now()}-${Math.random()}`,
    signal,
    message: messages[Math.floor(Math.random() * messages.length)],
    timestamp: new Date(),
    read: false
  }
}
