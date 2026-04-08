import React, { useState, useEffect, useCallback } from 'react';
import { bookingsAPI, resourcesAPI, staffAPI } from '../services/api';
import { Booking, Resource, Staff, DashboardStats } from '../types';
import BookingCalendar from '../components/BookingCalendar';

const POLL_INTERVAL = 15_000; // 15 seconds

function StatCard({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex items-center gap-4">
      <span className={`text-3xl font-bold ${color}`}>{value}</span>
      <span className="text-sm text-gray-500 font-medium">{label}</span>
    </div>
  );
}

function formatDate(d: Date) {
  return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', timeZone: 'UTC' });
}

const AdminDashboard: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const [staff, setStaff] = useState<Staff[]>([]);
  const [stats, setStats] = useState<DashboardStats['stats'] | null>(null);
  const [selectedDate, setSelectedDate] = useState(() => {
    const now = new Date();
    return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  });
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const fetchAll = useCallback(async () => {
    try {
      const [bookingData, resourceData, statsData] = await Promise.all([
        bookingsAPI.findAll(1, 200),
        resourcesAPI.getAll(),
        bookingsAPI.getDashboardStats(),
      ]);

      setBookings(bookingData.items);
      setResources(resourceData);
      setStats(statsData.stats);
      setLastUpdated(new Date());

      // Fetch staff separately (admin endpoint)
      try {
        const staffData = await staffAPI.getAll();
        setStaff(Array.isArray(staffData) ? staffData : (staffData as any).items ?? []);
      } catch {
        // staff endpoint may not be available to all roles
      }
    } catch (err) {
      console.error('Failed to fetch dashboard data', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => { fetchAll(); }, [fetchAll]);

  // Polling for real-time updates
  useEffect(() => {
    const interval = setInterval(fetchAll, POLL_INTERVAL);
    return () => clearInterval(interval);
  }, [fetchAll]);

  // Navigate date — work in UTC to match booking storage
  function changeDate(delta: number) {
    setSelectedDate((d) => {
      const next = new Date(d);
      next.setUTCDate(next.getUTCDate() + delta);
      return next;
    });
  }

  function goToday() {
    const now = new Date();
    // Create a UTC-midnight date for today
    setSelectedDate(new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())));
  }

  // Filter bookings for table view
  const filteredBookings = bookings.filter((b) =>
    statusFilter === 'all' ? true : b.status === statusFilter.toUpperCase(),
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-indigo-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-sm text-gray-400 mt-0.5">
              Auto-refreshes every 15s · Last updated {lastUpdated.toLocaleTimeString()}
            </p>
          </div>
          <span className="flex items-center gap-1.5 text-xs text-green-600 bg-green-50 border border-green-200 px-3 py-1 rounded-full font-medium">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Live
          </span>
        </div>

        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            <StatCard label="Pending" value={stats.pending} color="text-yellow-500" />
            <StatCard label="Approved" value={stats.approved} color="text-green-500" />
            <StatCard label="Paid" value={stats.paid} color="text-blue-500" />
            <StatCard label="Rejected" value={stats.rejected} color="text-red-400" />
            <StatCard label="Upcoming" value={stats.upcoming} color="text-indigo-500" />
          </div>
        )}

        {/* Calendar section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          {/* Date nav */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-gray-800">Booking Calendar</h2>
            <div className="flex items-center gap-3">
              <button
                onClick={() => changeDate(-1)}
                className="p-1.5 rounded hover:bg-gray-100 text-gray-500 hover:text-gray-800 transition-colors"
              >
                ‹
              </button>
              <span className="text-sm font-medium text-gray-700 min-w-[180px] text-center">
                {formatDate(selectedDate)}
              </span>
              <button
                onClick={() => changeDate(1)}
                className="p-1.5 rounded hover:bg-gray-100 text-gray-500 hover:text-gray-800 transition-colors"
              >
                ›
              </button>
              <button
                onClick={goToday}
                className="text-xs text-indigo-600 hover:text-indigo-800 font-medium px-2 py-1 border border-indigo-200 rounded hover:bg-indigo-50 transition-colors"
              >
                Today
              </button>
              <button
                onClick={fetchAll}
                className="text-xs text-gray-500 hover:text-gray-800 font-medium px-2 py-1 border border-gray-200 rounded hover:bg-gray-50 transition-colors"
                title="Refresh"
              >
                ↻
              </button>
            </div>
          </div>

          <BookingCalendar
            resources={resources}
            bookings={bookings}
            staff={staff}
            selectedDate={selectedDate}
            onBookingUpdated={fetchAll}
          />
        </div>

        {/* Bookings table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-base font-semibold text-gray-800">
              All Bookings
              <span className="ml-2 text-sm font-normal text-gray-400">({filteredBookings.length})</span>
            </h2>
            {/* Status filter */}
            <div className="flex gap-1">
              {['all', 'PENDING', 'APPROVED', 'PAID', 'REJECTED'].map((s) => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={`text-xs px-3 py-1 rounded-full font-medium transition-colors ${
                    statusFilter === s
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {s === 'all' ? 'All' : s.charAt(0) + s.slice(1).toLowerCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wider">
                  <th className="px-5 py-3 text-left font-medium">Resource</th>
                  <th className="px-5 py-3 text-left font-medium">User</th>
                  <th className="px-5 py-3 text-left font-medium">Date & Time</th>
                  <th className="px-5 py-3 text-left font-medium">Qty</th>
                  <th className="px-5 py-3 text-left font-medium">Price</th>
                  <th className="px-5 py-3 text-left font-medium">Staff</th>
                  <th className="px-5 py-3 text-left font-medium">Status</th>
                  <th className="px-5 py-3 text-left font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3 font-medium text-gray-900">
                      {b.resource?.name ?? b.resourceId}
                    </td>
                    <td className="px-5 py-3 text-gray-600">
                      <div>{b.user?.name ?? '—'}</div>
                      <div className="text-xs text-gray-400">{b.user?.email}</div>
                    </td>
                    <td className="px-5 py-3 text-gray-600">
                      <div>{new Date(b.startTime).toLocaleDateString(undefined, { timeZone: 'UTC' })}</div>
                      <div className="text-xs text-gray-400">
                        {new Date(b.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', timeZone: 'UTC', hour12: false })}
                        {' – '}
                        {new Date(b.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', timeZone: 'UTC', hour12: false })}
                      </div>
                    </td>
                    <td className="px-5 py-3 text-gray-600">{b.quantity}</td>
                    <td className="px-5 py-3 font-semibold text-gray-800">${b.totalPrice}</td>
                    <td className="px-5 py-3 text-gray-500 text-xs">
                      {b.staff?.name ?? <span className="text-gray-300">—</span>}
                    </td>
                    <td className="px-5 py-3">
                      <StatusBadge status={b.status} />
                    </td>
                    <td className="px-5 py-3">
                      <QuickActions booking={b} onDone={fetchAll} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredBookings.length === 0 && (
              <div className="text-center py-12 text-gray-400 text-sm">
                No bookings found
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ── Sub-components ────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    PENDING:  'bg-yellow-100 text-yellow-800',
    APPROVED: 'bg-green-100 text-green-800',
    PAID:     'bg-blue-100 text-blue-800',
    REJECTED: 'bg-red-100 text-red-700',
  };
  return (
    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${styles[status] ?? 'bg-gray-100 text-gray-600'}`}>
      {status.charAt(0) + status.slice(1).toLowerCase()}
    </span>
  );
}

function QuickActions({ booking, onDone }: { booking: Booking; onDone: () => void }) {
  const [loading, setLoading] = useState(false);

  async function act(fn: () => Promise<any>) {
    setLoading(true);
    try { await fn(); onDone(); } finally { setLoading(false); }
  }

  if (loading) return <span className="text-xs text-gray-400">…</span>;

  return (
    <div className="flex gap-1">
      {booking.status === 'PENDING' && (
        <>
          <button
            onClick={() => act(() => bookingsAPI.approveBooking(booking.id))}
            className="text-xs bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded font-medium transition-colors"
          >
            ✓
          </button>
          <button
            onClick={() => act(() => bookingsAPI.rejectBooking(booking.id))}
            className="text-xs bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded font-medium transition-colors"
          >
            ✕
          </button>
        </>
      )}
      {booking.status === 'APPROVED' && (
        <button
          onClick={() => act(() => bookingsAPI.markAsPaid(booking.id))}
          className="text-xs bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded font-medium transition-colors"
        >
          $
        </button>
      )}
    </div>
  );
}

export default AdminDashboard;
