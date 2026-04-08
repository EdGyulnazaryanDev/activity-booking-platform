import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useI18n } from '../contexts/I18nContext';
import { notificationsAPI } from '../services/api';
import { CalendarIcon, BellIcon, LogOutIcon, MenuIcon, XIcon } from 'lucide-react';

const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { lang, setLang, t } = useI18n();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const navigate = useNavigate();
  const isAdmin = user?.role === 'ADMIN';

  useEffect(() => {
    if (!isAuthenticated) return;
    const fetch = () => notificationsAPI.getUnreadCount().then(setUnreadCount).catch(() => {});
    fetch();
    const interval = setInterval(fetch, 15_000);
    return () => clearInterval(interval);
  }, [isAuthenticated]);

  const handleLogout = () => { logout(); navigate('/'); };
  const lnk = 'text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors';

  const LangSwitcher = () => (
    <div className="relative group">
      <button className="flex items-center gap-1 px-2 py-1.5 rounded-lg text-sm text-gray-600 hover:bg-gray-100 transition-colors">
        <span>{lang === 'en' ? '🇬🇧' : '🇦🇲'}</span>
        <span className="text-xs font-semibold">{lang === 'en' ? 'EN' : 'ՀՅ'}</span>
        <span className="text-gray-400 text-xs">▾</span>
      </button>
      <div className="absolute right-0 mt-1 w-36 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150">
        <button onClick={() => setLang('en')} className={`flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-gray-50 ${lang === 'en' ? 'text-indigo-700 font-semibold' : 'text-gray-700'}`}>
          🇬🇧 English
        </button>
        <button onClick={() => setLang('hy')} className={`flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-gray-50 ${lang === 'hy' ? 'text-indigo-700 font-semibold' : 'text-gray-700'}`}>
          🇦🇲 Հայերեն
        </button>
      </div>
    </div>
  );

  const Bell = () => (
    <Link to="/notifications" className="relative p-2 text-gray-600 hover:text-indigo-600 transition-colors">
      <BellIcon className="h-5 w-5" />
      {unreadCount > 0 && (
        <span className="absolute top-0 right-0 bg-red-500 text-white text-[9px] font-bold rounded-full min-w-[15px] h-[15px] flex items-center justify-center px-0.5">
          {unreadCount > 99 ? '99+' : unreadCount}
        </span>
      )}
    </Link>
  );

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to={isAdmin ? '/admin' : '/'} className="flex items-center gap-2 shrink-0">
            <CalendarIcon className="h-7 w-7 text-indigo-600" />
            <span className="text-lg font-bold text-gray-900 hidden sm:block">Activity Booking</span>
          </Link>

          {/* Center nav */}
          <div className="hidden md:flex items-center gap-1">
            {!isAdmin && isAuthenticated && (
              <>
                <Link to="/" className={lnk}>{t('home')}</Link>
                <Link to="/activities" className={lnk}>{t('activities')}</Link>
                <Link to="/bookings" className={lnk}>{t('myBookings')}</Link>
              </>
            )}
            {!isAuthenticated && (
              <>
                <Link to="/" className={lnk}>{t('home')}</Link>
                <Link to="/activities" className={lnk}>{t('activities')}</Link>
              </>
            )}
            {isAdmin && (
              <>
                <Link to="/admin" className={lnk}>{t('dashboard')}</Link>
                <Link to="/admin/manage" className={lnk}>{t('manage')}</Link>
                <Link to="/admin/reports" className={lnk}>{t('reports')}</Link>
              </>
            )}
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-2">
            {isAuthenticated ? (
              <>
                <Link to="/wallet" className={lnk}>{t('wallet')}</Link>
                <LangSwitcher />
                <Bell />
                {/* Profile dropdown */}
                <div className="relative group">
                  <button className="flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg text-sm font-medium text-gray-700 transition-colors">
                    <span className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold">
                      {(user?.name ?? user?.email ?? '?')[0].toUpperCase()}
                    </span>
                    <span className="max-w-[100px] truncate">{user?.name ?? 'Profile'}</span>
                  </button>
                  <div className="absolute right-0 mt-1 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150">
                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">{t('profileSettings')}</Link>
                    <hr className="my-1 border-gray-100" />
                    <button onClick={handleLogout} className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                      <LogOutIcon className="h-4 w-4" />{t('logout')}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <LangSwitcher />
                <Link to="/login" className={lnk}>{t('login')}</Link>
                <Link to="/register" className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors">{t('signUp')}</Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 text-gray-600">
            {isMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-3 space-y-1">
          {!isAdmin && (
            <>
              <Link to="/" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg" onClick={() => setIsMenuOpen(false)}>{t('home')}</Link>
              <Link to="/activities" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg" onClick={() => setIsMenuOpen(false)}>{t('activities')}</Link>
              {isAuthenticated && <Link to="/bookings" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg" onClick={() => setIsMenuOpen(false)}>{t('myBookings')}</Link>}
            </>
          )}
          {isAdmin && (
            <>
              <Link to="/admin" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg" onClick={() => setIsMenuOpen(false)}>{t('dashboard')}</Link>
              <Link to="/admin/manage" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg" onClick={() => setIsMenuOpen(false)}>{t('manage')}</Link>
              <Link to="/admin/reports" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg" onClick={() => setIsMenuOpen(false)}>{t('reports')}</Link>
            </>
          )}
          {isAuthenticated && (
            <>
              <Link to="/wallet" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg" onClick={() => setIsMenuOpen(false)}>{t('wallet')}</Link>
              <Link to="/notifications" className="flex items-center justify-between px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg" onClick={() => setIsMenuOpen(false)}>
                {t('notifications')}
                {unreadCount > 0 && <span className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">{unreadCount}</span>}
              </Link>
              <Link to="/profile" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg" onClick={() => setIsMenuOpen(false)}>{t('profileSettings')}</Link>
            </>
          )}
          <div className="flex gap-2 px-3 py-2">
            {(['en', 'hy'] as const).map(l => (
              <button key={l} onClick={() => setLang(l)}
                className={`flex-1 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${lang === l ? 'bg-indigo-600 text-white border-indigo-600' : 'border-gray-200 text-gray-600'}`}>
                {l === 'en' ? '🇬🇧 English' : '🇦🇲 Հայերեն'}
              </button>
            ))}
          </div>
          {isAuthenticated
            ? <button onClick={handleLogout} className="block w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg">{t('logout')}</button>
            : <div className="flex gap-2 pt-1">
                <Link to="/login" className="flex-1 text-center py-2 text-sm border border-gray-200 rounded-lg" onClick={() => setIsMenuOpen(false)}>{t('login')}</Link>
                <Link to="/register" className="flex-1 text-center py-2 text-sm bg-indigo-600 text-white rounded-lg" onClick={() => setIsMenuOpen(false)}>{t('signUp')}</Link>
              </div>
          }
        </div>
      )}
    </nav>
  );
};

export default Navbar;
