import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useI18n } from '../contexts/I18nContext';
import { authAPI } from '../services/api';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const { lang, setLang, t } = useI18n();

  const [name, setName] = useState(user?.name ?? '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true); setSuccess(''); setError('');
    try {
      const payload: any = { name };
      if (newPassword) {
        if (!currentPassword) { setError('Enter current password to change it'); setSaving(false); return; }
        payload.password = newPassword;
      }
      await authAPI.updateProfile(payload);
      setSuccess('Profile updated!');
      setCurrentPassword(''); setNewPassword('');
      // Refresh user in context
      const updated = await authAPI.getProfile();
      localStorage.setItem('user', JSON.stringify(updated));
    } catch (err: any) {
      setError(err.response?.data?.message || 'Update failed');
    } finally { setSaving(false); }
  }

  const inp = 'w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400';

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">{t('profileSettings')}</h1>

        {/* Account info card */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center text-2xl font-bold text-indigo-600">
              {(user?.name ?? user?.email ?? '?')[0].toUpperCase()}
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-lg">{user?.name ?? '—'}</p>
              <p className="text-sm text-gray-500">{user?.email}</p>
              <span className={`text-xs px-2 py-0.5 rounded-full font-semibold mt-1 inline-block ${user?.role === 'ADMIN' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-600'}`}>
                {user?.role}
              </span>
            </div>
          </div>

          {success && <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-2 rounded-lg text-sm mb-4">{success}</div>}
          {error && <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-lg text-sm mb-4">{error}</div>}

          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">{t('fullName')}</label>
              <input className={inp} value={name} onChange={e => setName(e.target.value)} placeholder="Your name" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">{t('email')}</label>
              <input className={`${inp} bg-gray-50 cursor-not-allowed`} value={user?.email ?? ''} disabled />
            </div>

            <hr className="border-gray-100" />
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{t('security')}</p>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">{t('currentPassword')}</label>
              <input className={inp} type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} placeholder="Leave blank to keep current" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">{t('newPassword')}</label>
              <input className={inp} type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="New password" />
            </div>

            <button type="submit" disabled={saving}
              className="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-medium text-sm hover:bg-indigo-700 disabled:opacity-50 transition-colors">
              {saving ? t('saving') : t('saveChanges')}
            </button>
          </form>
        </div>

        {/* Language card */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-semibold text-gray-800 mb-4">{t('language')}</h2>
          <div className="flex gap-3">
            {([['en', '🇬🇧 English'], ['hy', '🇦🇲 Հայերեն']] as const).map(([code, label]) => (
              <button
                key={code}
                onClick={() => setLang(code)}
                className={`flex-1 py-3 rounded-xl border-2 text-sm font-medium transition-colors ${
                  lang === code
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                    : 'border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Member info */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-semibold text-gray-800 mb-3">{t('accountInfo')}</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">{t('role')}</span>
              <span className="font-medium text-gray-800">{user?.role}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">{t('memberSince')}</span>
              <span className="font-medium text-gray-800">
                {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : '—'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
