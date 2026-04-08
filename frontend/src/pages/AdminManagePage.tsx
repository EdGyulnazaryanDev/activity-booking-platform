import React, { useState, useEffect, useCallback } from 'react';
import { staffAPI, usersAPI, pricingAPI, resourcesAPI, adminPaymentsAPI } from '../services/api';
import { Staff, User, Resource } from '../types';

type Tab = 'resources' | 'pricing' | 'staff' | 'users' | 'payments';

function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-gray-900">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl leading-none">×</button>
        </div>
        {children}
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
      {children}
    </div>
  );
}

const inp = 'w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400';

const AdminManagePage: React.FC = () => {
  const [tab, setTab] = useState<Tab>('resources');
  const tabs: { key: Tab; label: string }[] = [
    { key: 'resources', label: '🏟 Resources' },
    { key: 'pricing',   label: '💰 Pricing' },
    { key: 'staff',     label: '👤 Staff' },
    { key: 'users',     label: '🧑 Users' },
    { key: 'payments',  label: '💳 Payments' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Admin — Manage</h1>
        <div className="flex gap-1 mb-6 bg-white rounded-xl border border-gray-100 p-1 w-fit shadow-sm flex-wrap">
          {tabs.map(t => (
            <button key={t.key} onClick={() => setTab(t.key)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors ${tab === t.key ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
              {t.label}
            </button>
          ))}
        </div>
        {tab === 'resources' && <ResourcesTab />}
        {tab === 'pricing'   && <PricingTab />}
        {tab === 'staff'     && <StaffTab />}
        {tab === 'users'     && <UsersTab />}
        {tab === 'payments'  && <PaymentsTab />}
      </div>
    </div>
  );
};

// ── Resources Tab ─────────────────────────────────────────────────────────────
function ResourcesTab() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: '', type: 'COURT', isQuantifiable: false, totalCapacity: 1 });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    try { setResources(await resourcesAPI.getAll()); } finally { setLoading(false); }
  }, []);
  useEffect(() => { load(); }, [load]);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault(); setSaving(true); setError('');
    try {
      await resourcesAPI.create({ ...form, type: form.type as 'COURT' | 'ROOM' | 'EQUIPMENT', totalCapacity: Number(form.totalCapacity) });
      setShowModal(false); setForm({ name: '', type: 'COURT', isQuantifiable: false, totalCapacity: 1 }); load();
    } catch (err: any) { setError(err.response?.data?.message || 'Failed'); }
    finally { setSaving(false); }
  }

  async function handleToggle(r: Resource) {
    await resourcesAPI.update(r.id, { isActive: !r.isActive }); load();
  }

  const TYPE_COLOR: Record<string, string> = { COURT: 'bg-green-100 text-green-700', ROOM: 'bg-indigo-100 text-indigo-700', EQUIPMENT: 'bg-orange-100 text-orange-700' };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="flex justify-between items-center px-5 py-4 border-b border-gray-100">
        <h2 className="font-semibold text-gray-800">Resources <span className="text-gray-400 font-normal text-sm">({resources.length})</span></h2>
        <button onClick={() => setShowModal(true)} className="bg-indigo-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-indigo-700">+ Add Resource</button>
      </div>
      {loading ? <div className="p-8 text-center text-gray-400">Loading…</div> : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-5">
          {resources.map(r => (
            <div key={r.id} className={`rounded-xl border p-4 ${r.isActive ? 'border-gray-200' : 'border-gray-100 opacity-60'}`}>
              <div className="flex items-start justify-between mb-2">
                <span className="font-semibold text-gray-900 text-sm">{r.name}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${TYPE_COLOR[r.type] ?? 'bg-gray-100 text-gray-600'}`}>{r.type}</span>
              </div>
              <p className="text-xs text-gray-500 mb-3">{r.isQuantifiable ? `${r.totalCapacity} units` : 'Single unit (exclusive)'}</p>
              <button onClick={() => handleToggle(r)} className={`text-xs font-medium px-3 py-1 rounded-full border transition-colors ${r.isActive ? 'border-red-200 text-red-600 hover:bg-red-50' : 'border-green-200 text-green-600 hover:bg-green-50'}`}>
                {r.isActive ? 'Deactivate' : 'Activate'}
              </button>
            </div>
          ))}
        </div>
      )}
      {showModal && (
        <Modal title="Add Resource" onClose={() => setShowModal(false)}>
          <form onSubmit={handleCreate} className="space-y-3">
            {error && <div className="text-red-600 text-sm bg-red-50 px-3 py-2 rounded">{error}</div>}
            <Field label="Name *"><input className={inp} required value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="e.g. Tennis Court C" /></Field>
            <Field label="Type *">
              <select className={inp} value={form.type} onChange={e => setForm({...form, type: e.target.value})}>
                <option value="COURT">Court</option>
                <option value="ROOM">Room</option>
                <option value="EQUIPMENT">Equipment</option>
              </select>
            </Field>
            <Field label="Capacity *"><input className={inp} type="number" min={1} required value={form.totalCapacity} onChange={e => setForm({...form, totalCapacity: Number(e.target.value)})} /></Field>
            <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
              <input type="checkbox" checked={form.isQuantifiable} onChange={e => setForm({...form, isQuantifiable: e.target.checked})} className="rounded" />
              Quantifiable (multiple units, e.g. PCs, bikes)
            </label>
            <div className="flex gap-2 pt-2">
              <button type="submit" disabled={saving} className="flex-1 bg-indigo-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 disabled:opacity-50">{saving ? 'Creating…' : 'Create'}</button>
              <button type="button" onClick={() => setShowModal(false)} className="flex-1 border border-gray-200 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-50">Cancel</button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

// ── Pricing Tab ───────────────────────────────────────────────────────────────
const DAY_START = 6;
const DAY_END = 23;

function timeToPercent(t: string) {
  const [h, m] = t.split(':').map(Number);
  return ((h + m / 60 - DAY_START) / (DAY_END - DAY_START)) * 100;
}

const RATE_COLORS = ['bg-blue-400', 'bg-green-400', 'bg-yellow-400', 'bg-orange-400', 'bg-red-400', 'bg-purple-400'];

function PricingTab() {
  const [rules, setRules] = useState<any[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editRule, setEditRule] = useState<any | null>(null);
  const [form, setForm] = useState({ resourceId: '', startTime: '06:00', endTime: '12:00', hourlyRate: '', label: '' });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    try {
      const [r, res] = await Promise.all([pricingAPI.getAll(), resourcesAPI.getAll()]);
      setRules(r); setResources(res);
    } finally { setLoading(false); }
  }, []);
  useEffect(() => { load(); }, [load]);

  function openCreate() {
    setEditRule(null);
    setForm({ resourceId: resources[0]?.id ?? '', startTime: '06:00', endTime: '12:00', hourlyRate: '', label: '' });
    setError(''); setShowModal(true);
  }
  function openEdit(rule: any) {
    setEditRule(rule);
    setForm({ resourceId: rule.resourceId, startTime: rule.startTime, endTime: rule.endTime, hourlyRate: String(rule.hourlyRate), label: rule.label ?? '' });
    setError(''); setShowModal(true);
  }
  async function handleSave(e: React.FormEvent) {
    e.preventDefault(); setSaving(true); setError('');
    try {
      const { resourceId, ...updatePayload } = { ...form, hourlyRate: parseFloat(form.hourlyRate) };
      if (editRule) await pricingAPI.update(editRule.id, updatePayload);
      else await pricingAPI.create({ ...form, hourlyRate: parseFloat(form.hourlyRate) });
      setShowModal(false); load();
    } catch (err: any) { setError(err.response?.data?.message || 'Failed'); }
    finally { setSaving(false); }
  }
  async function handleDelete(id: string) {
    if (!window.confirm('Delete this rule?')) return;
    await pricingAPI.remove(id); load();
  }

  // Group rules by resource
  const grouped = resources.map(res => ({
    resource: res,
    rules: rules.filter(r => r.resourceId === res.id).sort((a, b) => a.startTime.localeCompare(b.startTime)),
  })).filter(g => g.rules.length > 0);

  const hours = Array.from({ length: DAY_END - DAY_START + 1 }, (_, i) => DAY_START + i);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-gray-800">Pricing Rules</h2>
        <button onClick={openCreate} className="bg-indigo-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-indigo-700">+ Add Rule</button>
      </div>

      {loading ? <div className="p-8 text-center text-gray-400">Loading…</div> : grouped.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 p-8 text-center text-gray-400">No pricing rules yet</div>
      ) : grouped.map(({ resource, rules: ruleList }) => (
        <div key={resource.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-100 flex items-center gap-2">
            <span className="font-semibold text-gray-800">{resource.name}</span>
            <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{resource.type}</span>
          </div>

          {/* Visual timeline */}
          <div className="px-5 pt-4 pb-2">
            <div className="relative h-10 bg-gray-100 rounded-lg overflow-hidden mb-1">
              {ruleList.map((rule, i) => {
                const left = timeToPercent(rule.startTime);
                const width = timeToPercent(rule.endTime) - left;
                return (
                  <div
                    key={rule.id}
                    className={`absolute top-0 h-full ${RATE_COLORS[i % RATE_COLORS.length]} flex items-center justify-center text-white text-xs font-semibold cursor-pointer hover:opacity-80 transition-opacity`}
                    style={{ left: `${left}%`, width: `${width}%` }}
                    onClick={() => openEdit(rule)}
                    title={`${rule.label ?? ''} $${rule.hourlyRate}/hr`}
                  >
                    {width > 8 ? `$${rule.hourlyRate}` : ''}
                  </div>
                );
              })}
            </div>
            {/* Hour ticks */}
            <div className="relative h-4">
              {hours.filter((_, i) => i % 2 === 0).map(h => (
                <span key={h} className="absolute text-[10px] text-gray-400 -translate-x-1/2"
                  style={{ left: `${((h - DAY_START) / (DAY_END - DAY_START)) * 100}%` }}>
                  {String(h).padStart(2, '0')}
                </span>
              ))}
            </div>
          </div>

          {/* Rule list */}
          <div className="px-5 pb-4 flex flex-wrap gap-2">
            {ruleList.map((rule, i) => (
              <div key={rule.id} className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 text-xs">
                <span className={`w-2.5 h-2.5 rounded-full ${RATE_COLORS[i % RATE_COLORS.length]}`} />
                <span className="font-medium text-gray-700">{rule.label ?? `${rule.startTime}–${rule.endTime}`}</span>
                <span className="text-gray-500 font-mono">{rule.startTime}–{rule.endTime}</span>
                <span className="font-semibold text-gray-800">${rule.hourlyRate}/hr</span>
                <button onClick={() => openEdit(rule)} className="text-indigo-500 hover:text-indigo-700 ml-1">✎</button>
                <button onClick={() => handleDelete(rule.id)} className="text-red-400 hover:text-red-600">×</button>
              </div>
            ))}
          </div>
        </div>
      ))}

      {showModal && (
        <Modal title={editRule ? 'Edit Pricing Rule' : 'Add Pricing Rule'} onClose={() => setShowModal(false)}>
          <form onSubmit={handleSave} className="space-y-3">
            {error && <div className="text-red-600 text-sm bg-red-50 px-3 py-2 rounded">{error}</div>}
            <Field label="Resource *">
              <select className={inp} required value={form.resourceId} onChange={e => setForm({...form, resourceId: e.target.value})}>
                <option value="">Select resource</option>
                {resources.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
              </select>
            </Field>
            <Field label="Label"><input className={inp} value={form.label} onChange={e => setForm({...form, label: e.target.value})} placeholder="e.g. Morning Rate" /></Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Start *"><input className={inp} type="time" required value={form.startTime} onChange={e => setForm({...form, startTime: e.target.value})} /></Field>
              <Field label="End *"><input className={inp} type="time" required value={form.endTime} onChange={e => setForm({...form, endTime: e.target.value})} /></Field>
            </div>
            <Field label="Rate ($/hr) *"><input className={inp} type="number" min="0" step="0.01" required value={form.hourlyRate} onChange={e => setForm({...form, hourlyRate: e.target.value})} placeholder="10.00" /></Field>
            <div className="flex gap-2 pt-2">
              <button type="submit" disabled={saving} className="flex-1 bg-indigo-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 disabled:opacity-50">{saving ? 'Saving…' : editRule ? 'Update' : 'Create'}</button>
              <button type="button" onClick={() => setShowModal(false)} className="flex-1 border border-gray-200 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-50">Cancel</button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

// ── Staff Tab ─────────────────────────────────────────────────────────────────
function StaffTab() {
  const [staff, setStaff] = useState<Staff[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', specialty: '', phone: '' });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    try { setStaff(await staffAPI.getAll()); } finally { setLoading(false); }
  }, []);
  useEffect(() => { load(); }, [load]);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault(); setSaving(true); setError('');
    try { await staffAPI.create(form); setShowModal(false); setForm({ name: '', email: '', specialty: '', phone: '' }); load(); }
    catch (err: any) { setError(err.response?.data?.message || 'Failed'); }
    finally { setSaving(false); }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="flex justify-between items-center px-5 py-4 border-b border-gray-100">
        <h2 className="font-semibold text-gray-800">Staff <span className="text-gray-400 font-normal text-sm">({staff.length})</span></h2>
        <button onClick={() => setShowModal(true)} className="bg-indigo-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-indigo-700">+ Add Staff</button>
      </div>
      {loading ? <div className="p-8 text-center text-gray-400">Loading…</div> : (
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
            <tr>
              <th className="px-5 py-3 text-left">Name</th>
              <th className="px-5 py-3 text-left">Email</th>
              <th className="px-5 py-3 text-left">Specialty</th>
              <th className="px-5 py-3 text-left">Status</th>
              <th className="px-5 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {staff.map(s => (
              <tr key={s.id} className="hover:bg-gray-50">
                <td className="px-5 py-3 font-medium text-gray-900">{s.name}</td>
                <td className="px-5 py-3 text-gray-600">{s.email}</td>
                <td className="px-5 py-3 text-gray-500">{s.specialty ?? '—'}</td>
                <td className="px-5 py-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${s.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                    {s.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-5 py-3 flex gap-2">
                  <button onClick={() => staffAPI.update(s.id, { isActive: !s.isActive }).then(load)} className="text-xs text-indigo-600 hover:underline">{s.isActive ? 'Deactivate' : 'Activate'}</button>
                  <button onClick={() => window.confirm('Delete?') && staffAPI.remove(s.id).then(load)} className="text-xs text-red-500 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {showModal && (
        <Modal title="Add Staff" onClose={() => setShowModal(false)}>
          <form onSubmit={handleCreate} className="space-y-3">
            {error && <div className="text-red-600 text-sm bg-red-50 px-3 py-2 rounded">{error}</div>}
            <Field label="Name *"><input className={inp} required value={form.name} onChange={e => setForm({...form, name: e.target.value})} /></Field>
            <Field label="Email *"><input className={inp} type="email" required value={form.email} onChange={e => setForm({...form, email: e.target.value})} /></Field>
            <Field label="Specialty"><input className={inp} value={form.specialty} onChange={e => setForm({...form, specialty: e.target.value})} placeholder="e.g. Tennis" /></Field>
            <Field label="Phone"><input className={inp} value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} /></Field>
            <div className="flex gap-2 pt-2">
              <button type="submit" disabled={saving} className="flex-1 bg-indigo-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 disabled:opacity-50">{saving ? 'Creating…' : 'Create'}</button>
              <button type="button" onClick={() => setShowModal(false)} className="flex-1 border border-gray-200 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-50">Cancel</button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

// ── Users Tab ─────────────────────────────────────────────────────────────────
function UsersTab() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ email: '', password: '', name: '', role: 'USER' });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    try { setUsers(await usersAPI.getAll()); } finally { setLoading(false); }
  }, []);
  useEffect(() => { load(); }, [load]);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault(); setSaving(true); setError('');
    try { await usersAPI.create(form); setShowModal(false); setForm({ email: '', password: '', name: '', role: 'USER' }); load(); }
    catch (err: any) { setError(err.response?.data?.message || 'Failed'); }
    finally { setSaving(false); }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="flex justify-between items-center px-5 py-4 border-b border-gray-100">
        <h2 className="font-semibold text-gray-800">Users <span className="text-gray-400 font-normal text-sm">({users.length})</span></h2>
        <button onClick={() => setShowModal(true)} className="bg-indigo-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-indigo-700">+ Add User</button>
      </div>
      {loading ? <div className="p-8 text-center text-gray-400">Loading…</div> : (
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
            <tr>
              <th className="px-5 py-3 text-left">Name</th>
              <th className="px-5 py-3 text-left">Email</th>
              <th className="px-5 py-3 text-left">Role</th>
              <th className="px-5 py-3 text-left">Joined</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {users.map(u => (
              <tr key={u.id} className="hover:bg-gray-50">
                <td className="px-5 py-3 font-medium text-gray-900">{u.name ?? '—'}</td>
                <td className="px-5 py-3 text-gray-600">{u.email}</td>
                <td className="px-5 py-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${u.role === 'ADMIN' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-600'}`}>{u.role}</span>
                </td>
                <td className="px-5 py-3 text-gray-400">{new Date(u.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {showModal && (
        <Modal title="Add User" onClose={() => setShowModal(false)}>
          <form onSubmit={handleCreate} className="space-y-3">
            {error && <div className="text-red-600 text-sm bg-red-50 px-3 py-2 rounded">{error}</div>}
            <Field label="Name"><input className={inp} value={form.name} onChange={e => setForm({...form, name: e.target.value})} /></Field>
            <Field label="Email *"><input className={inp} type="email" required value={form.email} onChange={e => setForm({...form, email: e.target.value})} /></Field>
            <Field label="Password *"><input className={inp} type="password" required value={form.password} onChange={e => setForm({...form, password: e.target.value})} /></Field>
            <Field label="Role">
              <select className={inp} value={form.role} onChange={e => setForm({...form, role: e.target.value})}>
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>
              </select>
            </Field>
            <div className="flex gap-2 pt-2">
              <button type="submit" disabled={saving} className="flex-1 bg-indigo-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 disabled:opacity-50">{saving ? 'Creating…' : 'Create'}</button>
              <button type="button" onClick={() => setShowModal(false)} className="flex-1 border border-gray-200 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-50">Cancel</button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

export default AdminManagePage;

// ── Payments Tab ──────────────────────────────────────────────────────────────
function PaymentsTab() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    adminPaymentsAPI.getAll().then(setData).finally(() => setLoading(false));
  }, []);

  const fmtDate = (d: string) => new Date(d).toLocaleString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
    hour: '2-digit', minute: '2-digit', timeZone: 'UTC', hour12: false,
  });

  const METHOD_STYLE: Record<string, { bg: string; icon: string }> = {
    WALLET:  { bg: 'bg-indigo-100 text-indigo-700', icon: '💳' },
    IDRAM:   { bg: 'bg-orange-100 text-orange-700', icon: '🇦🇲' },
    TELCELL: { bg: 'bg-blue-100 text-blue-700',     icon: '📱' },
    CASH:    { bg: 'bg-green-100 text-green-700',   icon: '💵' },
    BANK:    { bg: 'bg-gray-100 text-gray-700',     icon: '🏦' },
  };

  const filtered = data?.items?.filter((b: any) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      b.user?.name?.toLowerCase().includes(q) ||
      b.user?.email?.toLowerCase().includes(q) ||
      b.resource?.name?.toLowerCase().includes(q)
    );
  }) ?? [];

  // Summary by method
  const byMethod: Record<string, number> = {};
  data?.items?.forEach((b: any) => {
    const m = b.paymentMethod ?? 'CASH';
    byMethod[m] = (byMethod[m] ?? 0) + b.totalPrice;
  });

  return (
    <div className="space-y-4">
      {/* Summary row */}
      {data && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <p className="text-xs text-gray-400 mb-1">Total Revenue</p>
            <p className="text-xl font-bold text-green-600">{data.totalRevenue?.toLocaleString()} AMD</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <p className="text-xs text-gray-400 mb-1">Paid Bookings</p>
            <p className="text-xl font-bold text-indigo-600">{data.total}</p>
          </div>
          {Object.entries(byMethod).map(([method, rev]) => (
            <div key={method} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
              <p className="text-xs text-gray-400 mb-1">{METHOD_STYLE[method]?.icon ?? '💰'} {method}</p>
              <p className="text-xl font-bold text-gray-800">{(rev as number).toLocaleString()} AMD</p>
            </div>
          ))}
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 gap-3 flex-wrap">
          <h2 className="font-semibold text-gray-800">Payment History</h2>
          <input
            type="text" placeholder="Search by user or resource…"
            value={search} onChange={e => setSearch(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 w-64"
          />
        </div>

        {loading ? <div className="p-8 text-center text-gray-400">Loading…</div> : filtered.length === 0 ? (
          <div className="p-8 text-center text-gray-400 text-sm">No payments found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
                <tr>
                  <th className="px-5 py-3 text-left">User</th>
                  <th className="px-5 py-3 text-left">Resource</th>
                  <th className="px-5 py-3 text-left">Reservation Time</th>
                  <th className="px-5 py-3 text-left">Paid At</th>
                  <th className="px-5 py-3 text-left">Method</th>
                  <th className="px-5 py-3 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((b: any) => {
                  const style = METHOD_STYLE[b.paymentMethod] ?? METHOD_STYLE.CASH;
                  return (
                    <tr key={b.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2">
                          <span className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold shrink-0">
                            {(b.user?.name ?? b.user?.email ?? '?')[0].toUpperCase()}
                          </span>
                          <div>
                            <p className="font-medium text-gray-900 leading-tight">{b.user?.name ?? '—'}</p>
                            <p className="text-xs text-gray-400">{b.user?.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3">
                        <p className="font-medium text-gray-900">{b.resource?.name}</p>
                        <span className="text-xs text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">{b.resource?.type}</span>
                      </td>
                      <td className="px-5 py-3 text-gray-600">
                        <p className="text-xs font-medium">
                          {new Date(b.startTime).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', timeZone: 'UTC' })}
                        </p>
                        <p className="text-xs text-gray-400">
                          {new Date(b.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', timeZone: 'UTC', hour12: false })}
                          {' – '}
                          {new Date(b.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', timeZone: 'UTC', hour12: false })}
                        </p>
                      </td>
                      <td className="px-5 py-3 text-gray-500 text-xs">
                        {b.paidAt ? fmtDate(b.paidAt) : <span className="text-gray-300">—</span>}
                      </td>
                      <td className="px-5 py-3">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${style.bg}`}>
                          {style.icon} {b.paymentMethod ?? 'CASH'}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-right">
                        <span className="font-bold text-green-600 font-mono">{b.totalPrice?.toLocaleString()}</span>
                        <span className="text-xs text-gray-400 ml-1">AMD</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
