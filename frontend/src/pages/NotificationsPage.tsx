import React, { useState, useEffect, useCallback } from 'react';
import { notificationsAPI } from '../services/api';
import { Notification } from '../types';
import { useI18n } from '../contexts/I18nContext';

const TYPE_STYLES: Record<string, { bg: string; icon: string }> = {
  INFO: { bg: 'bg-blue-50 border-blue-200', icon: 'ℹ️' },
  SUCCESS: { bg: 'bg-green-50 border-green-200', icon: '✅' },
  WARNING: { bg: 'bg-yellow-50 border-yellow-200', icon: '⚠️' },
  ERROR: { bg: 'bg-red-50 border-red-200', icon: '❌' },
  BOOKING_APPROVED: { bg: 'bg-green-50 border-green-200', icon: '✅' },
  BOOKING_REJECTED: { bg: 'bg-red-50 border-red-200', icon: '❌' },
  BOOKING_CONFIRMED: { bg: 'bg-green-50 border-green-200', icon: '📅' },
  BOOKING_CANCELLED: { bg: 'bg-gray-50 border-gray-200', icon: '🚫' },
};

const NTFY_BASE = process.env.REACT_APP_NTFY_URL || 'https://ntfy.sh';
const NTFY_ADMIN_TOPIC = process.env.REACT_APP_NTFY_ADMIN_TOPIC || 'booking-platform-admin';

const NotificationsPage: React.FC = () => {
  const { t } = useI18n();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const load = useCallback(async () => {
    try {
      const data = filter === 'unread' ? await notificationsAPI.getUnread() : await notificationsAPI.getAll();
      setNotifications(data);
    } finally { setLoading(false); }
  }, [filter]);

  useEffect(() => { load(); }, [load]);
  useEffect(() => { const i = setInterval(load, 10_000); return () => clearInterval(i); }, [load]);

  async function handleMarkRead(id: string) {
    await notificationsAPI.markAsRead(id);
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  }

  async function handleMarkAllRead() {
    await notificationsAPI.markAllAsRead();
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  }

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{t('notifications')}</h1>
            {unreadCount > 0 && <p className="text-sm text-gray-500 mt-0.5">{unreadCount} {t('unread')}</p>}
          </div>
          <div className="flex gap-2">
            <button onClick={() => setFilter(f => f === 'all' ? 'unread' : 'all')}
              className={`text-xs px-3 py-1.5 rounded-full border font-medium transition-colors ${filter === 'unread' ? 'bg-indigo-600 text-white border-indigo-600' : 'border-gray-200 text-gray-600 hover:bg-gray-100'}`}>
              {filter === 'unread' ? t('showAll') : t('unreadOnly')}
            </button>
            {unreadCount > 0 && (
              <button onClick={handleMarkAllRead} className="text-xs px-3 py-1.5 rounded-full border border-gray-200 text-gray-600 hover:bg-gray-100 font-medium">{t('markAllRead')}</button>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-indigo-100 shadow-sm p-5">
          <div className="flex items-start gap-3">
            <span className="text-2xl">📱</span>
            <div className="flex-1">
              <h2 className="font-semibold text-gray-900 text-sm mb-1">{t('pushNotifications')}</h2>
              <p className="text-xs text-gray-500 mb-3">{t('ntfyDesc')} <a href="https://ntfy.sh" target="_blank" rel="noreferrer" className="text-indigo-600 hover:underline">ntfy.sh</a></p>
              <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
                <span className="text-xs text-gray-500 shrink-0">{t('ntfyTopic')}</span>
                <code className="text-xs font-mono text-indigo-700 flex-1 truncate">{NTFY_ADMIN_TOPIC}</code>
                <button onClick={() => navigator.clipboard.writeText(NTFY_ADMIN_TOPIC)} className="text-xs text-gray-400 hover:text-gray-700 shrink-0">{t('ntfyCopy')}</button>
                <a href={`${NTFY_BASE}/${NTFY_ADMIN_TOPIC}`} target="_blank" rel="noreferrer" className="text-xs text-indigo-600 hover:underline shrink-0">{t('ntfyOpen')}</a>
              </div>
              <p className="text-xs text-gray-400 mt-2">{t('ntfyInstructions')}</p>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-4 border-indigo-500 border-t-transparent" /></div>
        ) : notifications.length === 0 ? (
          <div className="text-center py-16 text-gray-400"><span className="text-4xl block mb-3">🔔</span><p className="font-medium">{t('noNotifications')}</p></div>
        ) : (
          <div className="space-y-2">
            {notifications.map(n => {
              const style = TYPE_STYLES[n.type] ?? TYPE_STYLES.INFO;
              return (
                <div key={n.id} className={`rounded-xl border p-4 flex gap-3 transition-opacity ${style.bg} ${n.isRead ? 'opacity-60' : ''}`}>
                  <span className="text-lg shrink-0">{style.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className={`text-sm text-gray-900 ${!n.isRead ? 'font-semibold' : ''}`}>
                        {n.title}
                        {!n.isRead && <span className="ml-2 inline-block w-2 h-2 rounded-full bg-indigo-500 align-middle" />}
                      </p>
                      <span className="text-xs text-gray-400 shrink-0">{new Date(n.createdAt).toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    <p className="text-xs text-gray-600 mt-0.5">{n.message}</p>
                  </div>
                  {!n.isRead && <button onClick={() => handleMarkRead(n.id)} className="text-xs text-gray-400 hover:text-gray-700 shrink-0 self-start mt-0.5">{t('markAsRead')}</button>}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
