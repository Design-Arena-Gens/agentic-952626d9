import { DollarSign, Globe, Bitcoin, Activity } from 'lucide-react'
import { MarketStats } from '../types'

export function MarketOverview({ stats }: { stats: MarketStats }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="bg-gradient-to-br from-blue-600/20 to-blue-700/10 rounded-xl p-6 border border-blue-500/30">
        <div className="flex items-center justify-between mb-3">
          <div className="p-3 bg-blue-500/20 rounded-lg">
            <DollarSign className="w-6 h-6 text-blue-400" />
          </div>
          <span className="text-3xl font-bold text-white">{stats.stocks}</span>
        </div>
        <h3 className="text-sm font-medium text-gray-300">Stock Signals</h3>
        <p className="text-xs text-gray-400 mt-1">Active opportunities</p>
      </div>

      <div className="bg-gradient-to-br from-green-600/20 to-green-700/10 rounded-xl p-6 border border-green-500/30">
        <div className="flex items-center justify-between mb-3">
          <div className="p-3 bg-green-500/20 rounded-lg">
            <Globe className="w-6 h-6 text-green-400" />
          </div>
          <span className="text-3xl font-bold text-white">{stats.forex}</span>
        </div>
        <h3 className="text-sm font-medium text-gray-300">Forex Signals</h3>
        <p className="text-xs text-gray-400 mt-1">Currency pairs</p>
      </div>

      <div className="bg-gradient-to-br from-purple-600/20 to-purple-700/10 rounded-xl p-6 border border-purple-500/30">
        <div className="flex items-center justify-between mb-3">
          <div className="p-3 bg-purple-500/20 rounded-lg">
            <Bitcoin className="w-6 h-6 text-purple-400" />
          </div>
          <span className="text-3xl font-bold text-white">{stats.crypto}</span>
        </div>
        <h3 className="text-sm font-medium text-gray-300">Crypto Signals</h3>
        <p className="text-xs text-gray-400 mt-1">Digital assets</p>
      </div>

      <div className="bg-gradient-to-br from-orange-600/20 to-orange-700/10 rounded-xl p-6 border border-orange-500/30">
        <div className="flex items-center justify-between mb-3">
          <div className="p-3 bg-orange-500/20 rounded-lg">
            <Activity className="w-6 h-6 text-orange-400" />
          </div>
          <span className="text-3xl font-bold text-white">{stats.total}</span>
        </div>
        <h3 className="text-sm font-medium text-gray-300">Total Signals</h3>
        <p className="text-xs text-gray-400 mt-1">All markets</p>
      </div>
    </div>
  )
}
