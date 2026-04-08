import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { resourcesAPI } from '../services/api';
import { Resource } from '../types';
import { SearchIcon } from 'lucide-react';
import { useI18n } from '../contexts/I18nContext';

const TYPE_COLORS: Record<string, string> = { COURT: 'bg-green-400', ROOM: 'bg-indigo-400', EQUIPMENT: 'bg-orange-400' };

const HomePage: React.FC = () => {
  const { t } = useI18n();
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    resourcesAPI.getAll().then(setResources).catch(console.error).finally(() => setLoading(false));
  }, []);

  const featured = resources.filter(r => r.name.toLowerCase().includes(search.toLowerCase())).slice(0, 6);

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-indigo-600 to-indigo-800 text-white py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('heroTitle')}</h1>
          <p className="text-indigo-200 text-lg mb-8">{t('heroSubtitle')}</p>
          <div className="bg-white rounded-xl shadow-lg p-2 flex max-w-xl mx-auto">
            <input type="text" placeholder={t('searchPlaceholder')} className="flex-1 px-4 py-2 text-gray-800 text-sm focus:outline-none" value={search} onChange={e => setSearch(e.target.value)} />
            <button className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition-colors"><SearchIcon className="h-4 w-4" /></button>
          </div>
        </div>
      </section>

      <section className="py-10 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 flex justify-center gap-4 flex-wrap">
          {(['COURT', 'ROOM', 'EQUIPMENT'] as const).map(type => (
            <Link key={type} to={`/activities?type=${type}`} className="px-6 py-3 rounded-xl border-2 border-gray-200 hover:border-indigo-400 hover:bg-indigo-50 transition-all text-sm font-medium text-gray-700">
              {type === 'COURT' ? t('courts') : type === 'ROOM' ? t('rooms') : t('equipment')}
            </Link>
          ))}
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">{t('availableResources')}</h2>
            <Link to="/activities" className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">{t('viewAll')}</Link>
          </div>
          {loading ? (
            <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-10 w-10 border-4 border-indigo-500 border-t-transparent" /></div>
          ) : featured.length === 0 ? (
            <p className="text-center text-gray-400 py-12">{t('noResourcesFound')}</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map(r => (
                <div key={r.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                  <div className={`h-2 ${TYPE_COLORS[r.type] ?? 'bg-gray-300'}`} />
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-900">{r.name}</h3>
                      <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{r.type}</span>
                    </div>
                    <p className="text-sm text-gray-500 mb-4">{r.isQuantifiable ? `${r.totalCapacity} ${t('unitsAvailable')}` : t('exclusiveBooking')}</p>
                    <Link to={`/activities/${r.id}`} className="block text-center bg-indigo-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors">{t('bookNow')}</Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="bg-indigo-600 text-white py-16 text-center">
        <h2 className="text-3xl font-bold mb-3">{t('readyToBook')}</h2>
        <p className="text-indigo-200 mb-6">{t('joinPlatform')}</p>
        <Link to="/activities" className="bg-white text-indigo-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors">{t('browseResources')}</Link>
      </section>
    </div>
  );
};

export default HomePage;
