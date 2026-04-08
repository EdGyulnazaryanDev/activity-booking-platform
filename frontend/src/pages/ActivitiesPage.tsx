import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { resourcesAPI } from '../services/api';
import { Resource } from '../types';
import { SearchIcon, CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

const TYPE_LABELS: Record<string, string> = {
  COURT: 'Courts',
  ROOM: 'Rooms',
  EQUIPMENT: 'Equipment',
};

const ActivitiesPage: React.FC = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState('');
  const PER_PAGE = 9;

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const data = await resourcesAPI.getAll(selectedType || undefined);
        setResources(data);
      } catch (e: any) {
        setError(e.response?.data?.message || 'Failed to load resources');
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [selectedType]);

  const filtered = resources.filter((r) =>
    r.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paginated = filtered.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-16 w-16 border-4 border-indigo-500 border-t-transparent" />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Book a Resource</h1>
          <p className="text-gray-500 mt-1">Courts, rooms, and equipment — all in one place</p>
        </div>

        {/* Search + filter */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-8 flex flex-wrap gap-4 items-center">
          <div className="relative flex-1 min-w-[200px]">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search resources..."
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            />
          </div>
          <div className="flex gap-2">
            {['', 'COURT', 'ROOM', 'EQUIPMENT'].map((t) => (
              <button
                key={t}
                onClick={() => { setSelectedType(t); setCurrentPage(1); }}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  selectedType === t
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {t === '' ? 'All' : TYPE_LABELS[t]}
              </button>
            ))}
          </div>
        </div>

        {error && <div className="bg-red-50 text-red-600 px-4 py-3 rounded mb-6">{error}</div>}

        {paginated.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <CalendarIcon className="h-12 w-12 mx-auto mb-3" />
            <p>No resources found</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {paginated.map((r) => (
                <div key={r.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                  <div className={`h-3 ${r.type === 'COURT' ? 'bg-green-400' : r.type === 'ROOM' ? 'bg-indigo-400' : 'bg-orange-400'}`} />
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{r.name}</h3>
                      <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{r.type}</span>
                    </div>
                    <p className="text-sm text-gray-500 mb-4">
                      {r.isQuantifiable
                        ? `Up to ${r.totalCapacity} units available`
                        : 'Single-unit booking'}
                    </p>
                    <Link
                      to={`/activities/${r.id}`}
                      className="block w-full text-center bg-indigo-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
                    >
                      View & Book
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2">
                <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1} className="p-2 rounded border disabled:opacity-40">
                  <ChevronLeftIcon className="h-4 w-4" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button key={p} onClick={() => setCurrentPage(p)} className={`px-3 py-1 rounded border text-sm ${currentPage === p ? 'bg-indigo-600 text-white border-indigo-600' : 'hover:bg-gray-50'}`}>{p}</button>
                ))}
                <button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages} className="p-2 rounded border disabled:opacity-40">
                  <ChevronRightIcon className="h-4 w-4" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ActivitiesPage;
