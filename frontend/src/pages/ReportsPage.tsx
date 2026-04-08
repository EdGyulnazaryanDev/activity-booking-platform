import React, { useState, useEffect } from 'react';
import { reportsAPI } from '../services/api';

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

function Bar({ value, max, color }: { value: number; max: number; color: string }) {
  const pct = max > 0 ? (value / max) * 100 : 0;
  return (
    <div className="w-full bg-gray-100 rounded-full h-2">
      <div className={`h-2 rounded-full ${color}`} style={{ width: `${pct}%` }} />
    </div>
  );
}

const ReportsPage: React.FC = () => {
  const now = new Date();
  const [year, setYear] = useState(now.getUTCFullYear());
  const [month, setMonth] = useState(now.getUTCMonth() + 1);
  const [monthly, setMonthly] = useState<any>(null);
  const [yearly, setYearly] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([reportsAPI.monthly(year, month), reportsAPI.yearly(year)])
      .then(([m, y]) => { setMonthly(m); setYearly(y); })
      .finally(() => setLoading(false));
  }, [year, month]);

  const maxRevenue = Math.max(...yearly.map((m: any) => m.revenue), 1);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <h1 className="text-2xl font-bold text-gray-900">Monthly Reports</h1>
          <div className="flex gap-2">
            <select className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={month} onChange={e => setMonth(Number(e.target.value))}>
              {MONTHS.map((m, i) => <option key={i} value={i + 1}>{m}</option>)}
            </select>
            <select className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={year} onChange={e => setYear(Number(e.target.value))}>
              {[2024, 2025, 2026, 2027].map(y => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-16">
            <div className="animate-spin rounded-full h-10 w-10 border-4 border-indigo-500 border-t-transparent" />
          </div>
        ) : monthly && (
          <>
            {/* Summary cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: 'Revenue', value: `${monthly.summary.revenue.toLocaleString()} AMD`, color: 'text-green-600' },
                { label: 'Paid Bookings', value: monthly.summary.paid, color: 'text-blue-600' },
                { label: 'Pending', value: monthly.summary.pending, color: 'text-yellow-600' },
                { label: 'Avg Value', value: `${monthly.summary.avgBookingValue} AMD`, color: 'text-indigo-600' },
              ].map(c => (
                <div key={c.label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                  <p className="text-xs text-gray-500 mb-1">{c.label}</p>
                  <p className={`text-2xl font-bold ${c.color}`}>{c.value}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Yearly bar chart */}
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                <h2 className="font-semibold text-gray-800 mb-4">{year} Revenue Overview</h2>
                <div className="space-y-2">
                  {yearly.map((m: any) => (
                    <div key={m.month} className="flex items-center gap-3">
                      <span className={`text-xs w-8 font-medium ${m.month === month ? 'text-indigo-600' : 'text-gray-500'}`}>
                        {MONTHS[m.month - 1]}
                      </span>
                      <div className="flex-1">
                        <Bar value={m.revenue} max={maxRevenue} color={m.month === month ? 'bg-indigo-500' : 'bg-gray-300'} />
                      </div>
                      <span className="text-xs text-gray-600 w-20 text-right font-mono">
                        {m.revenue.toLocaleString()} AMD
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Revenue by resource */}
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                <h2 className="font-semibold text-gray-800 mb-4">Revenue by Resource</h2>
                {monthly.byResource.length === 0 ? (
                  <p className="text-gray-400 text-sm">No paid bookings this month</p>
                ) : (
                  <div className="space-y-3">
                    {monthly.byResource.map((r: any) => (
                      <div key={r.name}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="font-medium text-gray-700">{r.name}</span>
                          <span className="text-gray-500">{r.count} bookings · {r.revenue.toLocaleString()} AMD</span>
                        </div>
                        <Bar value={r.revenue} max={monthly.byResource[0].revenue} color="bg-green-400" />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Daily revenue */}
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                <h2 className="font-semibold text-gray-800 mb-4">Daily Revenue — {MONTHS[month-1]} {year}</h2>
                {monthly.daily.length === 0 ? (
                  <p className="text-gray-400 text-sm">No revenue this month</p>
                ) : (
                  <div className="space-y-1.5">
                    {monthly.daily.map((d: any) => (
                      <div key={d.date} className="flex items-center gap-3">
                        <span className="text-xs text-gray-500 w-20">{d.date.slice(5)}</span>
                        <div className="flex-1">
                          <Bar value={d.revenue} max={Math.max(...monthly.daily.map((x: any) => x.revenue))} color="bg-blue-400" />
                        </div>
                        <span className="text-xs font-mono text-gray-600 w-24 text-right">{d.revenue.toLocaleString()} AMD</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Payment methods */}
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                <h2 className="font-semibold text-gray-800 mb-4">Payment Methods</h2>
                {monthly.byPaymentMethod.length === 0 ? (
                  <p className="text-gray-400 text-sm">No payments this month</p>
                ) : (
                  <div className="space-y-3">
                    {monthly.byPaymentMethod.map((p: any) => {
                      const icons: Record<string, string> = { WALLET: '💳', IDRAM: '🇦🇲', TELCELL: '📱', CASH: '💵', BANK: '🏦' };
                      const total = monthly.byPaymentMethod.reduce((s: number, x: any) => s + x.revenue, 0);
                      const pct = total > 0 ? Math.round((p.revenue / total) * 100) : 0;
                      return (
                        <div key={p.method}>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium text-gray-700">
                              {icons[p.method] ?? '💰'} {p.method}
                            </span>
                            <span className="text-sm text-gray-600 font-mono">
                              {p.revenue.toLocaleString()} AMD
                              <span className="text-gray-400 ml-1 text-xs">({pct}%)</span>
                            </span>
                          </div>
                          <Bar value={p.revenue} max={Math.max(...monthly.byPaymentMethod.map((x: any) => x.revenue))} color="bg-indigo-400" />
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ReportsPage;
