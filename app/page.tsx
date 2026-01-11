'use client'

import { useState, useEffect } from 'react'
import { TrendingUp, TrendingDown, Bell, Activity, DollarSign, Bitcoin, Globe } from 'lucide-react'
import { SignalCard } from './components/SignalCard'
import { MarketOverview } from './components/MarketOverview'
import { NotificationPanel } from './components/NotificationPanel'
import type { Signal, Notification } from './types'
import { generateSignals, generateNotification } from './utils/signalGenerator'

export default function Home() {
  const [signals, setSignals] = useState<Signal[]>([])
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [notificationsEnabled, setNotificationsEnabled] = useState(false)
  const [selectedMarket, setSelectedMarket] = useState<'all' | 'stocks' | 'forex' | 'crypto'>('all')

  useEffect(() => {
    // Initial load
    setSignals(generateSignals())

    // Update signals every 30 seconds
    const signalInterval = setInterval(() => {
      const newSignals = generateSignals()
      setSignals(newSignals)

      // Generate notification for a random new signal
      if (notificationsEnabled && Math.random() > 0.7) {
        const randomSignal = newSignals[Math.floor(Math.random() * newSignals.length)]
        const notification = generateNotification(randomSignal)
        setNotifications(prev => [notification, ...prev].slice(0, 20))

        // Browser notification if permitted
        if ('Notification' in window && Notification.permission === 'granted') {
          new Notification(`New ${randomSignal.type.toUpperCase()} Signal: ${randomSignal.symbol}`, {
            body: `${randomSignal.action} - Confidence: ${randomSignal.confidence}%`,
            icon: '/notification-icon.png'
          })
        }
      }
    }, 30000)

    return () => clearInterval(signalInterval)
  }, [notificationsEnabled])

  const requestNotificationPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission()
      if (permission === 'granted') {
        setNotificationsEnabled(true)
      }
    } else {
      setNotificationsEnabled(true)
    }
  }

  const filteredSignals = selectedMarket === 'all'
    ? signals
    : signals.filter(s => s.type === selectedMarket.slice(0, -1))

  const marketStats = {
    stocks: signals.filter(s => s.type === 'stock').length,
    forex: signals.filter(s => s.type === 'forex').length,
    crypto: signals.filter(s => s.type === 'crypto').length,
    total: signals.length
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-white flex items-center gap-3">
                <Activity className="w-10 h-10 text-blue-500" />
                Trading Signals Dashboard
              </h1>
              <p className="text-gray-400 mt-2">Real-time market analysis for Pivex trading platform</p>
            </div>
            <button
              onClick={requestNotificationPermission}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                notificationsEnabled
                  ? 'bg-green-600 hover:bg-green-700 text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              <Bell className="w-5 h-5" />
              {notificationsEnabled ? 'Notifications Active' : 'Enable Notifications'}
            </button>
          </div>

          {/* Market Filter */}
          <div className="flex gap-3 mt-6">
            {(['all', 'stocks', 'forex', 'crypto'] as const).map((market) => (
              <button
                key={market}
                onClick={() => setSelectedMarket(market)}
                className={`px-6 py-2.5 rounded-lg font-medium transition-all flex items-center gap-2 ${
                  selectedMarket === market
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                    : 'bg-slate-800 text-gray-300 hover:bg-slate-700'
                }`}
              >
                {market === 'stocks' && <DollarSign className="w-4 h-4" />}
                {market === 'forex' && <Globe className="w-4 h-4" />}
                {market === 'crypto' && <Bitcoin className="w-4 h-4" />}
                {market === 'all' && <Activity className="w-4 h-4" />}
                {market.charAt(0).toUpperCase() + market.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Market Overview */}
        <MarketOverview stats={marketStats} />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          {/* Signals Panel */}
          <div className="lg:col-span-2">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Active Signals</h2>
                <span className="text-sm text-gray-400">
                  {filteredSignals.length} signals • Updated every 30s
                </span>
              </div>

              <div className="space-y-4 max-h-[800px] overflow-y-auto pr-2">
                {filteredSignals.map((signal) => (
                  <SignalCard key={signal.id} signal={signal} />
                ))}
              </div>
            </div>
          </div>

          {/* Notifications Panel */}
          <div className="lg:col-span-1">
            <NotificationPanel notifications={notifications} enabled={notificationsEnabled} />
          </div>
        </div>
      </div>
    </div>
  )
}
