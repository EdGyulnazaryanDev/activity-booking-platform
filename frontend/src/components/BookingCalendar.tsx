import React, { useState } from 'react';
import { Booking, Resource, Staff } from '../types';
import { bookingsAPI } from '../services/api';

// ── Constants ─────────────────────────────────────────────────────────────────
const HOUR_START = 8;
const HOUR_END = 23;
const HOURS = Array.from({ length: HOUR_END - HOUR_START }, (_, i) => HOUR_START + i);
const CELL_WIDTH = 64; // px per hour column
const ROW_HEIGHT = 56; // px per resource row — will expand if multiple bookings overlap

// ── Helpers ───────────────────────────────────────────────────────────────────
function toMinutes(date: Date) {
  return date.getUTCHours() * 60 + date.getUTCMinutes();
}

function statusStyle(status: string): string {
  switch (status) {
    case 'PENDING':  return 'bg-yellow-400 border-yellow-500 text-yellow-900';
    case 'APPROVED': return 'bg-green-400 border-green-500 text-green-900';
    case 'PAID':     return 'bg-blue-400 border-blue-500 text-blue-900';
    case 'REJECTED': return 'bg-red-300 border-red-400 text-red-900 opacity-60';
    default:         return 'bg-gray-300 border-gray-400 text-gray-800';
  }
}

function statusDot(status: string): string {
  switch (status) {
    case 'PENDING':  return 'bg-yellow-500';
    case 'APPROVED': return 'bg-green-500';
    case 'PAID':     return 'bg-blue-500';
    case 'REJECTED': return 'bg-red-400';
    default:         return 'bg-gray-400';
  }
}

// ── Types ─────────────────────────────────────────────────────────────────────
interface Props {
  resources: Resource[];
  bookings: Booking[];
  staff: Staff[];
  selectedDate: Date;
  onBookingUpdated: () => void;
}

interface TooltipState {
  booking: Booking;
  x: number;
  y: number;
}

// ── Component ─────────────────────────────────────────────────────────────────
const BookingCalendar: React.FC<Props> = ({
  resources, bookings, staff, selectedDate, onBookingUpdated,
}) => {
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);
  const [assigningBooking, setAssigningBooking] = useState<string | null>(null);
  const [loadingAction, setLoadingAction] = useState<string | null>(null);
  const [assignError, setAssignError] = useState<string | null>(null);

  // Filter bookings for the selected date — compare in UTC
  const dayBookings = bookings.filter((b) => {
    const d = new Date(b.startTime);
    return (
      d.getUTCFullYear() === selectedDate.getUTCFullYear() &&
      d.getUTCMonth()    === selectedDate.getUTCMonth() &&
      d.getUTCDate()     === selectedDate.getUTCDate()
    );
  });

  const dayStart = HOUR_START * 60; // minutes from midnight

  function getBookingStyle(booking: Booking) {
    const start = toMinutes(new Date(booking.startTime));
    const end = toMinutes(new Date(booking.endTime));
    const left = ((start - dayStart) / 60) * CELL_WIDTH;
    const width = Math.max(((end - start) / 60) * CELL_WIDTH - 4, 20);
    return { left, width };
  }

  async function handleApprove(id: string) {
    setLoadingAction(id + '-approve');
    try {
      await bookingsAPI.approveBooking(id);
      onBookingUpdated();
    } finally {
      setLoadingAction(null);
      setTooltip(null);
    }
  }

  async function handleReject(id: string) {
    setLoadingAction(id + '-reject');
    try {
      await bookingsAPI.rejectBooking(id);
      onBookingUpdated();
    } finally {
      setLoadingAction(null);
      setTooltip(null);
    }
  }

  async function handleAssignStaff(bookingId: string, staffId: string) {
    setLoadingAction(bookingId + '-staff');
    setAssignError(null);
    try {
      await bookingsAPI.approveBooking(bookingId, staffId);
      onBookingUpdated();
      setAssigningBooking(null);
      setTooltip(null);
    } catch (err: any) {
      setAssignError(err.response?.data?.message ?? 'Failed to assign staff');
    } finally {
      setLoadingAction(null);
    }
  }

  async function handleMarkPaid(id: string) {
    setLoadingAction(id + '-paid');
    try {
      await bookingsAPI.markAsPaid(id);
      onBookingUpdated();
    } finally {
      setLoadingAction(null);
      setTooltip(null);
    }
  }

  const totalWidth = HOURS.length * CELL_WIDTH;

  return (
    <div className="relative overflow-auto rounded-xl border border-gray-200 bg-white shadow-sm">
      {/* Legend */}
      <div className="flex items-center gap-4 px-4 py-2 border-b border-gray-100 bg-gray-50 text-xs font-medium">
        {[
          { label: 'Pending', dot: 'bg-yellow-400' },
          { label: 'Approved', dot: 'bg-green-400' },
          { label: 'Paid', dot: 'bg-blue-400' },
          { label: 'Rejected', dot: 'bg-red-300' },
        ].map(({ label, dot }) => (
          <span key={label} className="flex items-center gap-1.5 text-gray-600">
            <span className={`inline-block w-3 h-3 rounded-sm ${dot}`} />
            {label}
          </span>
        ))}
      </div>

      <div className="flex">
        {/* Resource labels column */}
        <div className="sticky left-0 z-20 bg-white border-r border-gray-200 min-w-[160px]">
          {/* Header spacer */}
          <div className="h-8 border-b border-gray-100" />
          {resources.map((r) => {
            const laneCount = Math.max(dayBookings.filter(b => b.resourceId === r.id).length > 0
              ? (() => {
                  const rb = dayBookings.filter(b => b.resourceId === r.id);
                  const lanes: any[][] = [];
                  for (const b of rb) {
                    const bStart = new Date(b.startTime).getTime();
                    let placed = false;
                    for (const lane of lanes) {
                      if (new Date(lane[lane.length-1].endTime).getTime() <= bStart) { lane.push(b); placed = true; break; }
                    }
                    if (!placed) lanes.push([b]);
                  }
                  return lanes.length;
                })()
              : 1, 1);
            return (
              <div
                key={r.id}
                style={{ height: laneCount * ROW_HEIGHT }}
                className="flex flex-col justify-center px-3 border-b border-gray-100"
              >
                <span className="text-sm font-semibold text-gray-800 truncate">{r.name}</span>
                <span className="text-xs text-gray-400 capitalize">{r.type.toLowerCase()}</span>
              </div>
            );
          })}
        </div>

        {/* Scrollable grid */}
        <div className="overflow-x-auto flex-1">
          <div style={{ width: totalWidth }}>
            {/* Hour headers */}
            <div className="flex h-8 border-b border-gray-100 sticky top-0 bg-white z-10">
              {HOURS.map((h) => (
                <div
                  key={h}
                  style={{ width: CELL_WIDTH }}
                  className="flex-shrink-0 text-xs text-gray-400 font-medium border-r border-gray-100 flex items-center justify-center"
                >
                  {String(h).padStart(2, '0')}:00
                </div>
              ))}
            </div>

            {/* Resource rows */}
            {resources.map((resource) => {
              const rowBookings = dayBookings.filter((b) => b.resourceId === resource.id);

              // Assign each booking to a lane (row within the resource row)
              // so overlapping bookings don't cover each other
              const lanes: Booking[][] = [];
              for (const booking of rowBookings) {
                const bStart = new Date(booking.startTime).getTime();
                let placed = false;
                for (const lane of lanes) {
                  const lastInLane = lane[lane.length - 1];
                  if (new Date(lastInLane.endTime).getTime() <= bStart) {
                    lane.push(booking); placed = true; break;
                  }
                }
                if (!placed) lanes.push([booking]);
              }

              const laneCount = Math.max(lanes.length, 1);
              const rowH = laneCount * ROW_HEIGHT;
              const laneH = ROW_HEIGHT - 8;

              return (
                <div
                  key={resource.id}
                  style={{ height: rowH, width: totalWidth }}
                  className="relative border-b border-gray-100 flex"
                >
                  {/* Hour grid lines */}
                  {HOURS.map((h) => (
                    <div key={h} style={{ width: CELL_WIDTH }} className="flex-shrink-0 border-r border-gray-50 h-full" />
                  ))}

                  {/* Booking blocks — one per lane */}
                  {lanes.map((lane, laneIdx) =>
                    lane.map((booking) => {
                      const { left, width } = getBookingStyle(booking);
                      if (left + width < 0 || left > totalWidth) return null;
                      const top = laneIdx * ROW_HEIGHT + 4;

                      return (
                        <div
                          key={booking.id}
                          style={{ left, width, top, height: laneH }}
                          className={`absolute rounded border cursor-pointer select-none flex flex-col justify-center px-1.5 text-xs font-medium overflow-hidden transition-opacity hover:opacity-90 ${statusStyle(booking.status)}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setTooltip({ booking, x: e.clientX, y: e.clientY });
                            setAssigningBooking(null);
                          }}
                        >
                          <span className="truncate leading-tight">
                            {booking.user?.name ?? booking.user?.email ?? 'User'}
                          </span>
                          {width > 80 && (
                            <span className="truncate opacity-75 text-[10px]">
                              {booking.quantity > 1 ? `×${booking.quantity} ` : ''}
                              ${booking.totalPrice}
                            </span>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tooltip / Action popup */}
      {tooltip && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-30"
            onClick={() => { setTooltip(null); setAssigningBooking(null); }}
          />
          <div
            className="fixed z-40 bg-white rounded-xl shadow-2xl border border-gray-200 p-4 w-72"
            style={{ top: Math.min(tooltip.y, window.innerHeight - 320), left: Math.min(tooltip.x + 8, window.innerWidth - 300) }}
          >
            {/* Booking info */}
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="font-semibold text-gray-900 text-sm">
                  {tooltip.booking.resource?.name ?? 'Resource'}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {tooltip.booking.user?.name ?? tooltip.booking.user?.email}
                </p>
              </div>
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${statusStyle(tooltip.booking.status)}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${statusDot(tooltip.booking.status)}`} />
                {tooltip.booking.status}
              </span>
            </div>

            <div className="text-xs text-gray-600 space-y-1 mb-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Time</span>
                <span>
                  {new Date(tooltip.booking.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', timeZone: 'UTC', hour12: false })}
                  {' – '}
                  {new Date(tooltip.booking.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', timeZone: 'UTC', hour12: false })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Qty</span>
                <span>{tooltip.booking.quantity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Price</span>
                <span className="font-semibold">${tooltip.booking.totalPrice}</span>
              </div>
              {tooltip.booking.staff && (
                <div className="flex justify-between">
                  <span className="text-gray-400">Staff</span>
                  <span>{tooltip.booking.staff.name}</span>
                </div>
              )}
              {tooltip.booking.notes && (
                <div className="flex justify-between">
                  <span className="text-gray-400">Notes</span>
                  <span className="text-right max-w-[140px] truncate">{tooltip.booking.notes}</span>
                </div>
              )}
            </div>

            {/* Quick Assign Staff */}
            {staff.length > 0 && tooltip.booking.status !== 'REJECTED' && (
              <div className="mb-3">
                {assigningBooking === tooltip.booking.id ? (
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-gray-600 mb-1">Assign staff:</p>
                    {assignError && (
                      <div className="text-xs text-red-600 bg-red-50 border border-red-200 px-2 py-1.5 rounded mb-1">
                        {assignError}
                      </div>
                    )}
                    {(() => {
                      const bookingStart = new Date(tooltip.booking.startTime).getTime();
                      const bookingEnd   = new Date(tooltip.booking.endTime).getTime();
                      const resourceType = tooltip.booking.resource?.type;

                      // Filter: must be active, allowed resource type, not already busy
                      const availableStaff = staff.filter(s => {
                        if (!s.isActive) return false;
                        // Resource type check
                        if (s.allowedResourceTypes?.length > 0 && resourceType && !s.allowedResourceTypes.includes(resourceType as any)) return false;
                        // Busy check — already assigned to another booking in this time slot
                        const isBusy = bookings.some(b =>
                          b.staffId === s.id &&
                          b.id !== tooltip.booking.id &&
                          ['PENDING', 'APPROVED'].includes(b.status) &&
                          new Date(b.startTime).getTime() < bookingEnd &&
                          new Date(b.endTime).getTime()   > bookingStart,
                        );
                        return !isBusy;
                      });

                      const busyStaff = staff.filter(s => {
                        if (!s.isActive) return false;
                        if (s.allowedResourceTypes?.length > 0 && resourceType && !s.allowedResourceTypes.includes(resourceType as any)) return false;
                        return !availableStaff.includes(s);
                      });

                      return (
                        <>
                          {availableStaff.length === 0 && (
                            <p className="text-xs text-gray-400 italic py-1">No available staff for this time slot</p>
                          )}
                          {availableStaff.map(s => (
                            <button key={s.id} onClick={() => handleAssignStaff(tooltip.booking.id, s.id)}
                              disabled={loadingAction === tooltip.booking.id + '-staff'}
                              className="w-full text-left text-xs px-2 py-1.5 rounded hover:bg-gray-100 flex items-center gap-2">
                              <span className="w-6 h-6 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold text-[10px]">{s.name[0]}</span>
                              <span>{s.name}</span>
                              {s.specialty && <span className="text-gray-400 ml-auto">{s.specialty}</span>}
                              <span className="text-green-500 text-[10px]">✓ free</span>
                            </button>
                          ))}
                          {busyStaff.map(s => (
                            <div key={s.id} className="w-full text-xs px-2 py-1.5 flex items-center gap-2 opacity-40 cursor-not-allowed">
                              <span className="w-6 h-6 rounded-full bg-red-100 text-red-500 flex items-center justify-center font-bold text-[10px]">{s.name[0]}</span>
                              <span>{s.name}</span>
                              {s.specialty && <span className="text-gray-400 ml-auto">{s.specialty}</span>}
                              <span className="text-red-400 text-[10px]">busy</span>
                            </div>
                          ))}
                        </>
                      );
                    })()}
                    <button onClick={() => { setAssigningBooking(null); setAssignError(null); }}
                      className="text-xs text-gray-400 hover:text-gray-600 mt-1">Cancel</button>
                  </div>
                ) : (
                  <button onClick={() => { setAssigningBooking(tooltip.booking.id); setAssignError(null); }}
                    className="w-full text-xs text-indigo-600 hover:text-indigo-800 font-medium py-1 border border-indigo-200 rounded hover:bg-indigo-50 transition-colors">
                    {tooltip.booking.staff ? '↺ Reassign Staff' : '+ Assign Staff'}
                  </button>
                )}
              </div>
            )}

            {/* Action buttons */}
            <div className="flex gap-2">
              {tooltip.booking.status === 'PENDING' && (
                <>
                  <button
                    onClick={() => handleApprove(tooltip.booking.id)}
                    disabled={!!loadingAction}
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white text-xs font-semibold py-1.5 rounded transition-colors disabled:opacity-50"
                  >
                    {loadingAction === tooltip.booking.id + '-approve' ? '…' : '✓ Approve'}
                  </button>
                  <button
                    onClick={() => handleReject(tooltip.booking.id)}
                    disabled={!!loadingAction}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white text-xs font-semibold py-1.5 rounded transition-colors disabled:opacity-50"
                  >
                    {loadingAction === tooltip.booking.id + '-reject' ? '…' : '✕ Reject'}
                  </button>
                </>
              )}
              {tooltip.booking.status === 'APPROVED' && (
                <button
                  onClick={() => handleMarkPaid(tooltip.booking.id)}
                  disabled={!!loadingAction}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-xs font-semibold py-1.5 rounded transition-colors disabled:opacity-50"
                >
                  {loadingAction === tooltip.booking.id + '-paid' ? '…' : '$ Mark Paid'}
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default BookingCalendar;
