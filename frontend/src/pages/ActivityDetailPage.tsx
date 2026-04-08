import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { resourcesAPI, bookingsAPI } from '../services/api';
import { Resource } from '../types';
import { ArrowLeftIcon, ClockIcon, UsersIcon } from 'lucide-react';

const ActivityDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [resource, setResource] = useState<Resource | null>(null);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [startHour, setStartHour] = useState('09');
  const [endHour, setEndHour] = useState('10');
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');
  const [isOpenForPartners, setIsOpenForPartners] = useState(false);

  useEffect(() => {
    if (!id) return;
    resourcesAPI.getById(id)
      .then(setResource)
      .catch(() => setError('Resource not found'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleBooking = async () => {
    if (!isAuthenticated) { navigate('/login'); return; }
    if (!selectedDate) { setError('Please select a date'); return; }
    if (!resource) return;

    const startTime = `${selectedDate}T${startHour}:00:00.000Z`;
    const endTime = `${selectedDate}T${endHour}:00:00.000Z`;

    try {
      setBookingLoading(true);
      setError('');
      await bookingsAPI.create({
        resourceId: resource.id,
        startTime,
        endTime,
        quantity: resource.isQuantifiable ? quantity : 1,
        notes: notes || undefined,
        isOpenForPartners,
      });
      navigate('/bookings', { state: { message: 'Booking created!' } });
    } catch (e: any) {
      setError(e.response?.data?.message || 'Failed to create booking');
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-16 w-16 border-4 border-indigo-500 border-t-transparent" />
    </div>
  );

  if (!resource) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-gray-500 mb-4">Resource not found</p>
        <Link to="/activities" className="text-indigo-600 hover:underline">Back to resources</Link>
      </div>
    </div>
  );

  const hours = Array.from({ length: 15 }, (_, i) => String(i + 8).padStart(2, '0'));

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/activities" className="inline-flex items-center text-gray-500 hover:text-gray-800 mb-6 text-sm">
          <ArrowLeftIcon className="h-4 w-4 mr-1" /> Back to resources
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{resource.name}</h1>
                  <span className="text-sm text-gray-400 uppercase tracking-wide">{resource.type}</span>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${resource.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                  {resource.isActive ? 'Available' : 'Unavailable'}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <UsersIcon className="h-4 w-4 text-gray-400" />
                  {resource.isQuantifiable
                    ? `Up to ${resource.totalCapacity} units`
                    : 'Single unit (exclusive booking)'}
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <ClockIcon className="h-4 w-4 text-gray-400" />
                  Hourly booking
                </div>
              </div>
            </div>

            {/* Pricing rules */}
            {resource.pricingRules && resource.pricingRules.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="font-semibold text-gray-800 mb-3">Pricing</h2>
                <div className="space-y-2">
                  {resource.pricingRules.map((rule) => (
                    <div key={rule.id} className="flex justify-between text-sm">
                      <span className="text-gray-500">{rule.label ?? `${rule.startTime} – ${rule.endTime}`}</span>
                      <span className="font-semibold text-gray-800">${rule.hourlyRate}/hr</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Booking form */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-fit sticky top-6">
            <h2 className="font-semibold text-gray-800 mb-4">Book this resource</h2>

            {error && <div className="bg-red-50 text-red-600 text-sm px-3 py-2 rounded mb-4">{error}</div>}

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Date</label>
                <input
                  type="date"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  value={selectedDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Start</label>
                  <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400" value={startHour} onChange={(e) => setStartHour(e.target.value)}>
                    {hours.map(h => <option key={h} value={h}>{h}:00</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">End</label>
                  <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400" value={endHour} onChange={(e) => setEndHour(e.target.value)}>
                    {hours.map(h => <option key={h} value={h}>{h}:00</option>)}
                  </select>
                </div>
              </div>

              {resource.isQuantifiable && (
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Quantity (max {resource.totalCapacity})
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={resource.totalCapacity}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Notes (optional)</label>
                <textarea
                  rows={2}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>

              <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isOpenForPartners}
                  onChange={(e) => setIsOpenForPartners(e.target.checked)}
                  className="rounded"
                />
                Open for partner matching
              </label>

              <button
                onClick={handleBooking}
                disabled={bookingLoading || !selectedDate || !resource.isActive}
                className="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-medium text-sm hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {bookingLoading ? 'Booking…' : 'Book Now'}
              </button>

              {!isAuthenticated && (
                <p className="text-xs text-gray-400 text-center">You must be logged in to book</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityDetailPage;
