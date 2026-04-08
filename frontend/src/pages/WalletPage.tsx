import React, { useState, useEffect, useCallback } from 'react';
import { walletAPI, bookingsAPI, paymentsAPI } from '../services/api';
import { Booking } from '../types';

/** Auto-submits a hidden form to redirect user to IDram payment page */
function redirectToIdram(paymentUrl: string, fields: Record<string, string>) {
  const form = document.createElement('form');
  form.method = 'POST';
  form.action = paymentUrl;
  form.style.display = 'none';
  Object.entries(fields).forEach(([name, value]) => {
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = name;
    input.value = value;
    form.appendChild(input);
  });
  document.body.appendChild(form);
  form.submit();
}

const METHOD_INFO: Record<string, { label: string; icon: string; desc: string; available: boolean }> = {
  WALLET:  { label: 'Wallet',         icon: '💳', desc: 'Pay instantly from your balance',                    available: true  },
  IDRAM:   { label: 'IDram',          icon: '🇦🇲', desc: 'Armenian e-wallet — redirects to IDram payment page', available: true  },
  TELCELL: { label: 'Telcell',        icon: '📱', desc: 'Telcell wallet payment',                             available: false },
  CASH:    { label: 'Cash on arrival',icon: '💵', desc: 'Pay at the venue — admin will confirm',              available: true  },
  BANK:    { label: 'Bank transfer',  icon: '🏦', desc: 'Transfer to our account — admin confirms',           available: true  },
};

const BANK_DETAILS = {
  bank: 'Ameriabank',
  account: '1570013456789012',
  beneficiary: 'Activity Booking Platform LLC',
  swift: 'ARMIAM22',
};

const ReportsPage: React.FC = () => {
  const [wallet, setWallet] = useState<any>(null);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [unpaidBookings, setUnpaidBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [topUpAmount, setTopUpAmount] = useState('');
  const [topUpLoading, setTopUpLoading] = useState(false);
  const [payModal, setPayModal] = useState<Booking | null>(null);
  const [selectedMethod, setSelectedMethod] = useState<string>('WALLET');
  const [payLoading, setPayLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const load = useCallback(async () => {
    try {
      const [w, tx, bookings] = await Promise.all([
        walletAPI.get(),
        walletAPI.getTransactions(),
        bookingsAPI.getMyBookings(),
      ]);
      setWallet(w);
      setTransactions(tx.items ?? []);
      setUnpaidBookings((bookings as Booking[]).filter(b => b.status === 'APPROVED'));
    } finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);

  async function handleTopUp(e: React.FormEvent) {
    e.preventDefault();
    setTopUpLoading(true); setError(''); setSuccess('');
    try {
      await walletAPI.topUp(Number(topUpAmount), 'Manual top-up');
      setTopUpAmount('');
      setSuccess('Wallet topped up successfully!');
      load();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Top-up failed');
    } finally { setTopUpLoading(false); }
  }

  async function handlePay() {
    if (!payModal) return;
    setPayLoading(true); setError('');
    try {
      if (selectedMethod === 'WALLET') {
        await walletAPI.pay(payModal.id);
        setSuccess(`Paid ${payModal.totalPrice} AMD from wallet!`);
      } else if (selectedMethod === 'IDRAM') {
        const { paymentUrl, fields } = await paymentsAPI.idramInitBooking(payModal.id);
        redirectToIdram(paymentUrl, fields);
        return; // page will redirect
      } else {
        setSuccess(`Please complete payment via ${METHOD_INFO[selectedMethod].label}. Admin will confirm.`);
      }
      setPayModal(null);
      load();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Payment failed');
    } finally { setPayLoading(false); }
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-10 w-10 border-4 border-indigo-500 border-t-transparent" />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">My Wallet</h1>

        {error && <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">{error}</div>}
        {success && <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl text-sm">{success}</div>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Balance card */}
          <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-2xl p-6 text-white shadow-lg">
            <p className="text-indigo-200 text-sm mb-1">Available Balance</p>
            <p className="text-4xl font-bold mb-4">{wallet?.balance?.toLocaleString() ?? 0} <span className="text-xl font-normal">AMD</span></p>
            <div className="space-y-2">
              <form onSubmit={handleTopUp} className="flex gap-2">
                <input
                  type="number" min="100" step="100" required
                  placeholder="Amount (AMD)"
                  value={topUpAmount}
                  onChange={e => setTopUpAmount(e.target.value)}
                  className="flex-1 bg-white/20 border border-white/30 rounded-lg px-3 py-2 text-sm text-white placeholder-indigo-200 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <button type="submit" disabled={topUpLoading}
                  className="bg-white text-indigo-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-50 disabled:opacity-50">
                  {topUpLoading ? '…' : '+ Manual'}
                </button>
              </form>
              <button
                onClick={async () => {
                  if (!topUpAmount || Number(topUpAmount) < 100) { setError('Enter amount (min 100 AMD)'); return; }
                  setTopUpLoading(true); setError('');
                  try {
                    const { paymentUrl, fields } = await paymentsAPI.idramInitTopUp(Number(topUpAmount));
                    redirectToIdram(paymentUrl, fields);
                  } catch (err: any) {
                    setError(err.response?.data?.message || 'IDram unavailable');
                    setTopUpLoading(false);
                  }
                }}
                disabled={topUpLoading}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg text-sm font-semibold disabled:opacity-50 flex items-center justify-center gap-2"
              >
                🇦🇲 Pay via IDram
              </button>
            </div>
          </div>

          {/* Unpaid bookings */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h2 className="font-semibold text-gray-800 mb-3">Approved — Awaiting Payment</h2>
            {unpaidBookings.length === 0 ? (
              <p className="text-gray-400 text-sm">No pending payments 🎉</p>
            ) : (
              <div className="space-y-2">
                {unpaidBookings.map(b => (
                  <div key={b.id} className="flex items-center justify-between bg-yellow-50 border border-yellow-200 rounded-lg px-3 py-2">
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{b.resource?.name}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(b.startTime).toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' })}
                        {' · '}
                        {new Date(b.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', timeZone: 'UTC', hour12: false })}
                        {' – '}
                        {new Date(b.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', timeZone: 'UTC', hour12: false })}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-gray-800">{b.totalPrice} AMD</span>
                      <button onClick={() => { setPayModal(b); setSelectedMethod('WALLET'); setError(''); }}
                        className="bg-indigo-600 text-white text-xs px-3 py-1.5 rounded-lg hover:bg-indigo-700 font-medium">
                        Pay
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Transaction history */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-800">Transaction History</h2>
          </div>
          {transactions.length === 0 ? (
            <div className="p-8 text-center text-gray-400 text-sm">No transactions yet</div>
          ) : (
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
                <tr>
                  <th className="px-5 py-3 text-left">Type</th>
                  <th className="px-5 py-3 text-left">Reservation</th>
                  <th className="px-5 py-3 text-left">Date</th>
                  <th className="px-5 py-3 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {transactions.map((t: any) => (
                  <tr key={t.id} className="hover:bg-gray-50">
                    <td className="px-5 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                        t.type === 'TOPUP'   ? 'bg-green-100 text-green-700' :
                        t.type === 'PAYMENT' ? 'bg-red-100 text-red-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>{t.type}</span>
                    </td>
                    <td className="px-5 py-3">
                      {t.booking ? (
                        <div>
                          <p className="font-medium text-gray-900">{t.booking.resource?.name}</p>
                          <p className="text-xs text-gray-400">
                            {new Date(t.booking.startTime).toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' })}
                            {' · '}
                            {new Date(t.booking.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', timeZone: 'UTC', hour12: false })}
                            {' – '}
                            {new Date(t.booking.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', timeZone: 'UTC', hour12: false })}
                          </p>
                        </div>
                      ) : (
                        <span className="text-gray-600">{t.description ?? '—'}</span>
                      )}
                    </td>
                    <td className="px-5 py-3 text-gray-400 text-xs">
                      {new Date(t.createdAt).toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className={`px-5 py-3 text-right font-semibold font-mono ${t.type === 'TOPUP' || t.type === 'REFUND' ? 'text-green-600' : 'text-red-600'}`}>
                      {t.type === 'TOPUP' || t.type === 'REFUND' ? '+' : '-'}{t.amount.toLocaleString()} AMD
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Payment modal */}
      {payModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-gray-900">Pay for Booking</h3>
              <button onClick={() => setPayModal(null)} className="text-gray-400 hover:text-gray-600 text-xl">×</button>
            </div>

            <div className="bg-gray-50 rounded-xl p-3 mb-4 text-sm">
              <p className="font-semibold text-gray-900 text-base">{payModal.resource?.name}</p>
              <p className="text-gray-500 text-xs mt-1">
                📅 {new Date(payModal.startTime).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' })}
              </p>
              <p className="text-gray-500 text-xs">
                🕐 {new Date(payModal.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', timeZone: 'UTC', hour12: false })}
                {' – '}
                {new Date(payModal.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', timeZone: 'UTC', hour12: false })}
              </p>
              <p className="text-xl font-bold text-indigo-700 mt-2">{payModal.totalPrice.toLocaleString()} AMD</p>
            </div>

            <p className="text-xs font-medium text-gray-600 mb-2">Select payment method:</p>
            <div className="space-y-2 mb-4">
              {Object.entries(METHOD_INFO).map(([key, info]) => (
                <label key={key} className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
                  selectedMethod === key ? 'border-indigo-400 bg-indigo-50' : 'border-gray-200 hover:bg-gray-50'
                } ${!info.available ? 'opacity-50 cursor-not-allowed' : ''}`}>
                  <input type="radio" name="method" value={key} checked={selectedMethod === key}
                    onChange={() => info.available && setSelectedMethod(key)}
                    disabled={!info.available} className="mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{info.icon} {info.label}
                      {!info.available && <span className="ml-2 text-xs text-gray-400">(coming soon)</span>}
                    </p>
                    <p className="text-xs text-gray-500">{info.desc}</p>
                    {key === 'WALLET' && selectedMethod === 'WALLET' && (
                      <p className={`text-xs mt-0.5 font-medium ${wallet?.balance >= payModal.totalPrice ? 'text-green-600' : 'text-red-500'}`}>
                        Balance: {wallet?.balance?.toLocaleString()} AMD
                        {wallet?.balance < payModal.totalPrice && ' — insufficient'}
                      </p>
                    )}
                    {key === 'BANK' && selectedMethod === 'BANK' && (
                      <div className="mt-2 text-xs text-gray-600 space-y-0.5 bg-white rounded-lg p-2 border border-gray-200">
                        <p><span className="text-gray-400">Bank:</span> {BANK_DETAILS.bank}</p>
                        <p><span className="text-gray-400">Account:</span> <code>{BANK_DETAILS.account}</code></p>
                        <p><span className="text-gray-400">Beneficiary:</span> {BANK_DETAILS.beneficiary}</p>
                        <p><span className="text-gray-400">SWIFT:</span> {BANK_DETAILS.swift}</p>
                      </div>
                    )}
                  </div>
                </label>
              ))}
            </div>

            {error && <div className="text-red-600 text-sm bg-red-50 px-3 py-2 rounded mb-3">{error}</div>}

            <div className="flex gap-2">
              <button onClick={handlePay} disabled={payLoading}
                className="flex-1 bg-indigo-600 text-white py-2.5 rounded-xl font-semibold text-sm hover:bg-indigo-700 disabled:opacity-50">
                {payLoading ? 'Processing…' : `Confirm Payment`}
              </button>
              <button onClick={() => setPayModal(null)}
                className="flex-1 border border-gray-200 py-2.5 rounded-xl text-sm text-gray-600 hover:bg-gray-50">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportsPage;
