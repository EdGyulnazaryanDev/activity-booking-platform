import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useI18n } from '../contexts/I18nContext';
import { bookingsAPI } from '../services/api';
import { Booking } from '../types';
import { CalendarIcon, ClockIcon, DollarSignIcon, UserIcon, CheckCircleIcon, XCircleIcon } from 'lucide-react';

const STATUS_STYLES: Record<string, string> = {
  PENDING: 'bg-yellow-100 text-yellow-800', APPROVED: 'bg-green-100 text-green-800',
  PAID: 'bg-blue-100 text-blue-800', REJECTED: 'bg-red-100 text-red-700',
};

const BookingsPage: React.FC = () => {
  const { user } = useAuth();
  const { t } = useI18n();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) return;
    bookingsAPI.getMyBookings().then(setBookings).catch((e: any) => setError(e.response?.data?.message || 'Failed')).finally(() => setLoading(false));
  }, [user]);

  const fmt = (d: string) => new Date(d).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', timeZone: 'UTC' });
  const fmtTime = (d: string) => new Date(d).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', timeZone: 'UTC', hour12: false });

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-16 w-16 border-4 border-indigo-500 border-t-transparent" /></div>;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">{t('myBookings')}</h1>
        {error && <div className="bg-red-50 text-red-600 px-4 py-3 rounded mb-6">{error}</div>}
        {bookings.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <CalendarIcon className="h-12 w-12 mx-auto mb-3" />
            <p className="font-medium">{t('noBooksYet')}</p>
            <a href="/activities" className="mt-4 inline-block text-indigo-600 hover:underline text-sm">{t('browseResourcesLink')}</a>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map(b => (
              <div key={b.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900">{b.resource?.name ?? b.resourceId}</h3>
                    <span className="text-xs text-gray-400 uppercase">{b.resource?.type}</span>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${STATUS_STYLES[b.status] ?? 'bg-gray-100 text-gray-600'}`}>
                    {t(b.status.toLowerCase() as any)}
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm text-gray-600">
                  <div className="flex items-center gap-1.5"><CalendarIcon className="h-4 w-4 text-gray-400" />{fmt(b.startTime)}</div>
                  <div className="flex items-center gap-1.5"><ClockIcon className="h-4 w-4 text-gray-400" />{fmtTime(b.startTime)} – {fmtTime(b.endTime)}</div>
                  <div className="flex items-center gap-1.5"><DollarSignIcon className="h-4 w-4 text-gray-400" />${b.totalPrice}</div>
                  {b.staff && <div className="flex items-center gap-1.5"><UserIcon className="h-4 w-4 text-gray-400" />{b.staff.name}</div>}
                </div>
                {b.notes && <p className="mt-2 text-xs text-gray-400">Notes: {b.notes}</p>}
                {b.status === 'PENDING' && <div className="mt-3 text-xs bg-yellow-50 border border-yellow-200 text-yellow-800 px-3 py-2 rounded">{t('waitingApproval')}</div>}
                {b.status === 'APPROVED' && <div className="mt-3 text-xs bg-green-50 border border-green-200 text-green-800 px-3 py-2 rounded flex items-center gap-1"><CheckCircleIcon className="h-3.5 w-3.5" />{t('approvedAllSet')}</div>}
                {b.status === 'REJECTED' && <div className="mt-3 text-xs bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded flex items-center gap-1"><XCircleIcon className="h-3.5 w-3.5" />{t('bookingRejected')}</div>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingsPage;
