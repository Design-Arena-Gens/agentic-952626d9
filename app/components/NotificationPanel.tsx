import { Bell, TrendingUp, TrendingDown, Clock } from 'lucide-react'
import { Notification } from '../types'
import { formatDistanceToNow } from 'date-fns'

export function NotificationPanel({ notifications, enabled }: { notifications: Notification[], enabled: boolean }) {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 sticky top-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Bell className="w-6 h-6" />
          Notifications
        </h2>
        {enabled && (
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
        )}
      </div>

      {!enabled ? (
        <div className="text-center py-12">
          <Bell className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">Enable notifications to receive real-time alerts</p>
        </div>
      ) : notifications.length === 0 ? (
        <div className="text-center py-12">
          <Clock className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">Waiting for new signals...</p>
        </div>
      ) : (
        <div className="space-y-3 max-h-[700px] overflow-y-auto pr-2">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50 hover:border-slate-600/50 transition-all"
            >
              <div className="flex items-start gap-3 mb-2">
                <div className={`p-2 rounded-lg ${
                  notification.signal.action === 'BUY'
                    ? 'bg-green-500/20 text-green-400'
                    : 'bg-red-500/20 text-red-400'
                }`}>
                  {notification.signal.action === 'BUY' ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-white mb-1">
                    {notification.signal.symbol}
                  </p>
                  <p className="text-xs text-gray-400">{notification.message}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 mb-2 text-xs">
                <div className="bg-slate-800/50 rounded px-2 py-1.5">
                  <span className="text-gray-500">Entry:</span>{' '}
                  <span className="text-blue-400 font-semibold">
                    ${notification.signal.entryPrice.toLocaleString()}
                  </span>
                </div>
                <div className="bg-slate-800/50 rounded px-2 py-1.5">
                  <span className="text-gray-500">TP:</span>{' '}
                  <span className="text-green-400 font-semibold">
                    ${notification.signal.takeProfit.toLocaleString()}
                  </span>
                </div>
                <div className="bg-slate-800/50 rounded px-2 py-1.5">
                  <span className="text-gray-500">SL:</span>{' '}
                  <span className="text-red-400 font-semibold">
                    ${notification.signal.stopLoss.toLocaleString()}
                  </span>
                </div>
                <div className="bg-slate-800/50 rounded px-2 py-1.5">
                  <span className="text-gray-500">Conf:</span>{' '}
                  <span className="text-purple-400 font-semibold">
                    {notification.signal.confidence}%
                  </span>
                </div>
              </div>

              <div className="text-xs text-gray-500 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
