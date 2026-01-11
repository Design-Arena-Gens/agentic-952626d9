import { TrendingUp, TrendingDown, Activity, DollarSign, Globe, Bitcoin } from 'lucide-react'
import { Signal } from '../types'

export function SignalCard({ signal }: { signal: Signal }) {
  const isBuy = signal.action === 'BUY'
  const profitPotential = ((Math.abs(signal.takeProfit - signal.entryPrice) / signal.entryPrice) * 100).toFixed(2)
  const riskAmount = ((Math.abs(signal.entryPrice - signal.stopLoss) / signal.entryPrice) * 100).toFixed(2)
  const riskRewardRatio = (Number(profitPotential) / Number(riskAmount)).toFixed(2)

  const getTypeIcon = () => {
    switch (signal.type) {
      case 'stock':
        return <DollarSign className="w-5 h-5" />
      case 'forex':
        return <Globe className="w-5 h-5" />
      case 'crypto':
        return <Bitcoin className="w-5 h-5" />
    }
  }

  const getTypeColor = () => {
    switch (signal.type) {
      case 'stock':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/30'
      case 'forex':
        return 'bg-green-500/10 text-green-400 border-green-500/30'
      case 'crypto':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/30'
    }
  }

  return (
    <div className="bg-slate-900/50 rounded-lg p-5 border border-slate-700/50 hover:border-slate-600/50 transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg border ${getTypeColor()}`}>
            {getTypeIcon()}
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">{signal.symbol}</h3>
            <p className="text-sm text-gray-400">{signal.name}</p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <span
            className={`px-4 py-1.5 rounded-full font-bold text-sm flex items-center gap-2 ${
              isBuy
                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                : 'bg-red-500/20 text-red-400 border border-red-500/30'
            }`}
          >
            {isBuy ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            {signal.action}
          </span>
          <span className="text-sm text-gray-400">{signal.timeframe}</span>
        </div>
      </div>

      <div className="bg-slate-800/50 rounded-lg p-4 mb-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-gray-400 mb-1">Current Price</p>
            <p className="text-lg font-semibold text-white">${signal.currentPrice.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-1">Entry Price</p>
            <p className="text-lg font-semibold text-blue-400">${signal.entryPrice.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-1">Stop Loss</p>
            <p className="text-lg font-semibold text-red-400">${signal.stopLoss.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-1">Take Profit</p>
            <p className="text-lg font-semibold text-green-400">${signal.takeProfit.toLocaleString()}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="bg-slate-800/30 rounded-lg p-3 text-center">
          <p className="text-xs text-gray-400 mb-1">Confidence</p>
          <p className="text-lg font-bold text-blue-400">{signal.confidence}%</p>
        </div>
        <div className="bg-slate-800/30 rounded-lg p-3 text-center">
          <p className="text-xs text-gray-400 mb-1">Profit Potential</p>
          <p className="text-lg font-bold text-green-400">{profitPotential}%</p>
        </div>
        <div className="bg-slate-800/30 rounded-lg p-3 text-center">
          <p className="text-xs text-gray-400 mb-1">R:R Ratio</p>
          <p className="text-lg font-bold text-purple-400">1:{riskRewardRatio}</p>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-300 mb-3">{signal.analysis}</p>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex justify-between bg-slate-800/30 rounded px-3 py-2">
            <span className="text-gray-400">RSI:</span>
            <span className={`font-semibold ${
              signal.indicators.rsi < 30 ? 'text-green-400' :
              signal.indicators.rsi > 70 ? 'text-red-400' : 'text-yellow-400'
            }`}>{signal.indicators.rsi}</span>
          </div>
          <div className="flex justify-between bg-slate-800/30 rounded px-3 py-2">
            <span className="text-gray-400">MACD:</span>
            <span className="font-semibold text-blue-400">{signal.indicators.macd}</span>
          </div>
          <div className="flex justify-between bg-slate-800/30 rounded px-3 py-2">
            <span className="text-gray-400">Volume:</span>
            <span className="font-semibold text-purple-400">{signal.indicators.volume}</span>
          </div>
          <div className="flex justify-between bg-slate-800/30 rounded px-3 py-2">
            <span className="text-gray-400">Trend:</span>
            <span className="font-semibold text-green-400">{signal.indicators.trend}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>Generated: {signal.timestamp.toLocaleTimeString()}</span>
        <span className="text-blue-400 font-medium">For Pivex Platform</span>
      </div>
    </div>
  )
}
