import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import {
  LayoutDashboard, User, TrendingUp, Package, Clock, AlertTriangle, DollarSign, Plane,
  Truck, Globe, MapPin, Activity, Users, FileText, Bell, CheckCircle2, ArrowUpRight, ArrowDownRight,
  Calendar, Search, Download, Printer, MessageSquare, CreditCard
} from 'lucide-react';
import { cn } from '@/lib/utils';

const Dashboards: React.FC = () => {
  const [tab, setTab] = useState<'admin' | 'customer'>('admin');

  return (
    <section id="dashboards" className="py-20 bg-gradient-to-b from-white via-slate-50 to-white">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-10">
          <div className="text-sm font-semibold text-red-700 uppercase tracking-wider mb-2">06 — Dashboards</div>
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Administration &amp; Customer Dashboards</h2>
          <p className="text-slate-600 text-lg">
            Two role-gated experiences built on Frappe Workspace + Custom Page, rendered with Chart.js, Frappe Charts and live websocket updates.
          </p>
        </div>

        <div className="flex gap-3 mb-8">
          <button
            onClick={() => setTab('admin')}
            className={cn(
              'flex items-center gap-2 px-6 py-3 rounded-xl font-semibold border-2 transition shadow-sm',
              tab === 'admin'
                ? 'bg-gradient-to-r from-red-700 to-red-600 text-white border-red-700 shadow-red-200'
                : 'bg-white text-slate-700 border-slate-200 hover:border-red-300'
            )}
          >
            <LayoutDashboard className="w-4 h-4" /> Admin Dashboard
          </button>
          <button
            onClick={() => setTab('customer')}
            className={cn(
              'flex items-center gap-2 px-6 py-3 rounded-xl font-semibold border-2 transition shadow-sm',
              tab === 'customer'
                ? 'bg-gradient-to-r from-red-700 to-red-600 text-white border-red-700 shadow-red-200'
                : 'bg-white text-slate-700 border-slate-200 hover:border-red-300'
            )}
          >
            <User className="w-4 h-4" /> Customer Dashboard
          </button>
        </div>

        {tab === 'admin' ? <AdminPreview /> : <CustomerPreview />}
      </div>
    </section>
  );
};

/* =========================================================== */
/* ADMIN DASHBOARD                                              */
/* =========================================================== */
const AdminPreview: React.FC = () => {
  const kpis = [
    { label: 'Active Shipments', value: '1,247', delta: '+8.2%', up: true, icon: Package, gradient: 'from-blue-500 to-blue-700', tint: 'bg-blue-50 text-blue-700' },
    { label: 'On-time Delivery', value: '94.2%', delta: '+1.4%', up: true, icon: TrendingUp, gradient: 'from-emerald-500 to-emerald-700', tint: 'bg-emerald-50 text-emerald-700' },
    { label: 'Exceptions', value: '23', delta: '-3', up: false, icon: AlertTriangle, gradient: 'from-orange-500 to-orange-700', tint: 'bg-orange-50 text-orange-700' },
    { label: 'Revenue (PGK)', value: 'K 482K', delta: '+12.6%', up: true, icon: DollarSign, gradient: 'from-red-500 to-red-700', tint: 'bg-red-50 text-red-700' },
    { label: 'Fleet Utilisation', value: '78%', delta: '+4%', up: true, icon: Truck, gradient: 'from-purple-500 to-purple-700', tint: 'bg-purple-50 text-purple-700' },
    { label: 'Int’l Volume', value: '186', delta: '+22', up: true, icon: Globe, gradient: 'from-cyan-500 to-cyan-700', tint: 'bg-cyan-50 text-cyan-700' },
  ];

  return (
    <Card className="p-0 bg-slate-900 border-0 overflow-hidden shadow-2xl rounded-2xl">
      {/* Top bar */}
      <div className="px-6 py-4 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-slate-700 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center font-black text-white text-sm">PAF</div>
          <div>
            <div className="font-bold text-white">PNG Air Freight — Operations Console</div>
            <div className="text-[11px] text-slate-400">Region: PNG · All Branches · Mon 11 May 2026, 08:47</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              placeholder="Search AWB, customer, driver…"
              className="bg-slate-800 border border-slate-700 rounded-md text-xs text-white pl-7 pr-3 py-1.5 w-64 placeholder:text-slate-500"
            />
          </div>
          <button className="p-1.5 rounded-md bg-slate-800 border border-slate-700 text-slate-300 hover:text-white relative">
            <Bell className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-[9px] flex items-center justify-center font-bold text-white">7</span>
          </button>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-red-600 flex items-center justify-center text-white text-xs font-bold">MK</div>
        </div>
      </div>

      <div className="p-6 bg-slate-50 space-y-6">
        {/* KPI grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {kpis.map((k) => (
            <div key={k.label} className="relative bg-white rounded-xl p-4 shadow-sm border border-slate-200 overflow-hidden">
              <div className={cn('absolute -top-8 -right-8 w-24 h-24 rounded-full opacity-10 bg-gradient-to-br', k.gradient)} />
              <div className={cn('inline-flex w-8 h-8 rounded-lg items-center justify-center mb-2', k.tint)}>
                <k.icon className="w-4 h-4" />
              </div>
              <div className="text-xl font-extrabold text-slate-900">{k.value}</div>
              <div className="flex items-center justify-between mt-1">
                <span className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">{k.label}</span>
                <span className={cn('text-[10px] flex items-center font-bold', k.up ? 'text-emerald-600' : 'text-red-600')}>
                  {k.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {k.delta}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Middle row — Operations breakdown */}
        <div className="grid lg:grid-cols-3 gap-4">
          {/* Status pipeline */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="font-bold text-slate-900">Shipment Pipeline (last 7 days)</div>
                <div className="text-xs text-slate-500">Across Domestic, Imports &amp; Exports</div>
              </div>
              <div className="flex gap-1 text-[10px]">
                {['Domestic', 'Imports', 'Exports'].map((t, i) => (
                  <span key={t} className={cn(
                    'px-2 py-1 rounded font-semibold',
                    i === 0 && 'bg-blue-100 text-blue-700',
                    i === 1 && 'bg-purple-100 text-purple-700',
                    i === 2 && 'bg-cyan-100 text-cyan-700'
                  )}>{t}</span>
                ))}
              </div>
            </div>
            <div className="space-y-2.5">
              {[
                { label: 'Booked', icon: FileText, dom: 320, imp: 86, exp: 92, color: 'bg-slate-400' },
                { label: 'Picked Up', icon: Truck, dom: 298, imp: 80, exp: 88, color: 'bg-blue-500' },
                { label: 'At Hub / Sorted', icon: Package, dom: 270, imp: 75, exp: 81, color: 'bg-indigo-500' },
                { label: 'In Transit (Air)', icon: Plane, dom: 240, imp: 70, exp: 76, color: 'bg-orange-500' },
                { label: 'Customs Clearance', icon: Globe, dom: 0, imp: 64, exp: 58, color: 'bg-purple-500' },
                { label: 'Out for Delivery', icon: MapPin, dom: 187, imp: 51, exp: 0, color: 'bg-yellow-500' },
                { label: 'Delivered', icon: CheckCircle2, dom: 1120, imp: 410, exp: 388, color: 'bg-emerald-500' },
                { label: 'Exception', icon: AlertTriangle, dom: 14, imp: 5, exp: 4, color: 'bg-red-500' },
              ].map((r) => {
                const total = r.dom + r.imp + r.exp;
                const max = 1120;
                return (
                  <div key={r.label} className="flex items-center gap-3 text-xs">
                    <div className="w-40 text-slate-700 flex items-center gap-2 font-medium">
                      <r.icon className="w-3.5 h-3.5 text-slate-500" />
                      {r.label}
                    </div>
                    <div className="flex-1 flex h-6 rounded-md overflow-hidden bg-slate-100">
                      <div className="bg-blue-500 flex items-center justify-end pr-1 text-[9px] text-white font-bold" style={{ width: `${(r.dom / max) * 100}%` }}>{r.dom || ''}</div>
                      <div className="bg-purple-500 flex items-center justify-end pr-1 text-[9px] text-white font-bold" style={{ width: `${(r.imp / max) * 100}%` }}>{r.imp || ''}</div>
                      <div className="bg-cyan-500 flex items-center justify-end pr-1 text-[9px] text-white font-bold" style={{ width: `${(r.exp / max) * 100}%` }}>{r.exp || ''}</div>
                    </div>
                    <div className="w-12 text-right font-bold text-slate-900">{total}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Revenue donut + breakdown */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
            <div className="font-bold text-slate-900 mb-1">Revenue Mix (May)</div>
            <div className="text-xs text-slate-500 mb-4">PGK 482,000 collected</div>
            <div className="flex items-center gap-4">
              <div
                className="w-28 h-28 rounded-full relative"
                style={{
                  background: 'conic-gradient(#3b82f6 0% 45%, #a855f7 45% 70%, #06b6d4 70% 92%, #f59e0b 92% 100%)',
                }}
              >
                <div className="absolute inset-3 bg-white rounded-full flex flex-col items-center justify-center">
                  <span className="text-[10px] text-slate-500">Total</span>
                  <span className="font-extrabold text-slate-900 text-sm">K482K</span>
                </div>
              </div>
              <div className="text-xs space-y-2 flex-1">
                {[
                  ['Domestic', 45, '#3b82f6'],
                  ['Imports', 25, '#a855f7'],
                  ['Exports', 22, '#06b6d4'],
                  ['Other Svc', 8, '#f59e0b'],
                ].map(([l, v, c]) => (
                  <div key={l as string} className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-sm" style={{ background: c as string }} />
                    <span className="flex-1 text-slate-700">{l}</span>
                    <span className="font-bold text-slate-900">{v}%</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs">
              <div className="rounded-lg bg-emerald-50 p-2">
                <div className="text-emerald-700 font-bold">K 312K</div>
                <div className="text-[10px] text-emerald-600">Invoiced</div>
              </div>
              <div className="rounded-lg bg-orange-50 p-2">
                <div className="text-orange-700 font-bold">K 170K</div>
                <div className="text-[10px] text-orange-600">In Receivables</div>
              </div>
            </div>
          </div>
        </div>

        {/* Map + Fleet + Customs */}
        <div className="grid lg:grid-cols-3 gap-4">
          {/* PNG geographic map */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 lg:col-span-2">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="font-bold text-slate-900 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-red-700" /> Network Status — Papua New Guinea
                </div>
                <div className="text-[11px] text-slate-500">Live shipment density across hubs · click a pin for branch detail</div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 text-[10px] text-slate-600">
                  <span className="w-2 h-2 rounded-full bg-red-500" /> Hub
                  <span className="w-2 h-2 rounded-full bg-orange-500 ml-2" /> Branch
                  <span className="w-2 h-2 rounded-full bg-blue-500 ml-2" /> Agent
                </div>
                <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live
                </span>
              </div>
            </div>

            <div className="relative h-80 bg-gradient-to-br from-sky-100 via-cyan-50 to-blue-50 rounded-lg border border-slate-200 overflow-hidden">
              {/* Ocean grid */}
              <svg viewBox="0 0 400 220" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet">
                <defs>
                  <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#bae6fd" strokeWidth="0.4" />
                  </pattern>
                  <linearGradient id="land" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#bbf7d0" />
                    <stop offset="100%" stopColor="#86efac" />
                  </linearGradient>
                  <linearGradient id="landHigh" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#fde68a" />
                    <stop offset="100%" stopColor="#fbbf24" />
                  </linearGradient>
                </defs>
                <rect width="400" height="220" fill="url(#grid)" />

                {/* Indonesia/West Papua sliver (border) */}
                <path
                  d="M0,40 L18,38 L22,55 L20,80 L25,110 L18,140 L10,170 L0,180 Z"
                  fill="#e2e8f0" stroke="#94a3b8" strokeWidth="0.5"
                />
                <text x="4" y="100" fontSize="6" fill="#64748b" fontWeight="600">INDONESIA</text>

                {/* PNG MAINLAND — eastern half of New Guinea island */}
                <path
                  d="
                    M22,55
                    Q40,40 60,45
                    L78,48
                    Q95,42 115,46
                    L135,50
                    Q155,46 175,52
                    Q195,58 210,68
                    Q225,80 235,95
                    L240,115
                    Q230,128 215,130
                    L195,128
                    Q175,135 155,145
                    L130,155
                    Q105,162 85,168
                    L65,172
                    Q45,170 30,165
                    L22,150
                    Q15,135 18,118
                    Q12,100 16,82
                    Z
                  "
                  fill="url(#land)" stroke="#15803d" strokeWidth="1"
                />

                {/* Central highlands shading */}
                <path
                  d="M55,88 Q85,80 115,90 Q145,98 165,108 Q140,118 110,115 Q80,112 55,105 Z"
                  fill="url(#landHigh)" opacity="0.55"
                />
                <text x="100" y="105" fontSize="5" fill="#78350f" fontWeight="700" textAnchor="middle">HIGHLANDS</text>

                {/* Gulf of Papua label */}
                <text x="125" y="190" fontSize="6" fill="#0369a1" fontStyle="italic">Gulf of Papua</text>
                <text x="320" y="180" fontSize="6" fill="#0369a1" fontStyle="italic">Solomon Sea</text>
                <text x="220" y="30" fontSize="6" fill="#0369a1" fontStyle="italic">Bismarck Sea</text>

                {/* NEW BRITAIN — large curved island east */}
                <path
                  d="M250,70 Q270,62 295,65 Q320,68 335,78 Q345,88 330,95 Q310,98 285,92 Q260,86 248,80 Z"
                  fill="url(#land)" stroke="#15803d" strokeWidth="1"
                />
                <text x="290" y="84" fontSize="5" fill="#14532d" fontWeight="700" textAnchor="middle">NEW BRITAIN</text>

                {/* NEW IRELAND — long thin island NE */}
                <path
                  d="M275,28 Q290,25 310,30 Q325,35 332,48 Q325,55 308,52 Q290,48 278,42 Z"
                  fill="url(#land)" stroke="#15803d" strokeWidth="1"
                />
                <text x="305" y="42" fontSize="4" fill="#14532d" fontWeight="700" textAnchor="middle">NEW IRELAND</text>

                {/* MANUS — small island N */}
                <path
                  d="M215,18 Q225,15 238,18 Q244,22 238,26 Q225,28 215,25 Z"
                  fill="url(#land)" stroke="#15803d" strokeWidth="0.8"
                />
                <text x="227" y="24" fontSize="3.5" fill="#14532d" fontWeight="700" textAnchor="middle">MANUS</text>

                {/* BOUGAINVILLE — far east */}
                <path
                  d="M362,82 Q372,80 378,90 Q382,105 378,118 Q372,128 365,120 Q358,108 360,95 Z"
                  fill="url(#land)" stroke="#15803d" strokeWidth="1"
                />
                <text x="370" y="105" fontSize="4" fill="#14532d" fontWeight="700" textAnchor="middle">BOUGAINVILLE</text>

                {/* D'Entrecasteaux / Milne Bay islands */}
                <circle cx="235" cy="138" r="3" fill="url(#land)" stroke="#15803d" strokeWidth="0.6" />
                <circle cx="245" cy="142" r="2" fill="url(#land)" stroke="#15803d" strokeWidth="0.6" />

                {/* Flight routes (dashed) */}
                <g stroke="#dc2626" strokeWidth="0.8" strokeDasharray="3 2" fill="none" opacity="0.7">
                  <path d="M155,168 Q140,140 150,114" />
                  <path d="M150,114 Q200,90 290,82" />
                  <path d="M150,114 Q130,100 120,86" />
                  <path d="M155,168 Q220,140 290,82" />
                  <path d="M120,86 Q90,95 80,100" />
                </g>
              </svg>

              {/* Pins overlaid using percentage positions matching SVG viewBox 400x220 */}
              {[
                { city: 'POM', name: 'Port Moresby', x: '38.75%', y: '76.4%', count: 412, color: 'bg-red-500', tier: 'Main Hub' },
                { city: 'LAE', name: 'Lae',          x: '37.5%',  y: '51.8%', count: 318, color: 'bg-red-500', tier: 'Hub' },
                { city: 'MAG', name: 'Madang',       x: '30%',    y: '38.2%', count: 84,  color: 'bg-orange-500', tier: 'Branch' },
                { city: 'HGN', name: 'Mt Hagen',     x: '20%',    y: '44.5%', count: 122, color: 'bg-orange-500', tier: 'Branch' },
                { city: 'GKA', name: 'Goroka',       x: '27.5%',  y: '46.4%', count: 58,  color: 'bg-blue-500', tier: 'Agent' },
                { city: 'WWK', name: 'Wewak',        x: '16.25%', y: '23.6%', count: 41,  color: 'bg-blue-500', tier: 'Agent' },
                { city: 'RAB', name: 'Rabaul',       x: '72.5%',  y: '36.4%', count: 61,  color: 'bg-orange-500', tier: 'Branch' },
                { city: 'KVG', name: 'Kavieng',      x: '76.25%', y: '17.3%', count: 22,  color: 'bg-blue-500', tier: 'Agent' },
                { city: 'BUA', name: 'Buka',         x: '92.5%',  y: '45.5%', count: 18,  color: 'bg-blue-500', tier: 'Agent' },
                { city: 'AOB', name: 'Alotau',       x: '60%',    y: '63.6%', count: 27,  color: 'bg-blue-500', tier: 'Agent' },
                { city: 'DRU', name: 'Daru',         x: '20%',    y: '78.2%', count: 14,  color: 'bg-blue-500', tier: 'Agent' },
              ].map((c) => (
                <div
                  key={c.city}
                  className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                  style={{ left: c.x, top: c.y }}
                >
                  <div className="relative flex flex-col items-center">
                    {/* Pulse ring */}
                    <span className={cn(
                      'absolute inset-0 w-3 h-3 rounded-full animate-ping opacity-60',
                      c.color
                    )} style={{ animationDuration: '2s' }} />
                    {/* Solid pin */}
                    <span className={cn(
                      'relative w-3 h-3 rounded-full ring-2 ring-white shadow-lg',
                      c.color
                    )} />
                    {/* Label badge */}
                    <div className="mt-1 px-1.5 py-0.5 rounded bg-white/95 shadow border border-slate-200 text-[9px] font-bold text-slate-800 whitespace-nowrap">
                      {c.city} · <span className="text-red-700">{c.count}</span>
                    </div>
                    {/* Tooltip on hover */}
                    <div className="absolute bottom-full mb-1 opacity-0 group-hover:opacity-100 transition pointer-events-none z-10 bg-slate-900 text-white text-[10px] rounded-md px-2 py-1 whitespace-nowrap shadow-xl">
                      <div className="font-bold">{c.name} ({c.city})</div>
                      <div className="opacity-80">{c.tier} · {c.count} active</div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Compass */}
              <div className="absolute top-2 right-2 bg-white/80 backdrop-blur rounded-md p-1 shadow text-[8px] font-bold text-slate-700 text-center w-7">
                <div>N</div>
                <div className="w-0.5 h-3 bg-red-600 mx-auto" />
              </div>

              {/* Scale */}
              <div className="absolute bottom-2 left-2 bg-white/80 backdrop-blur rounded px-2 py-1 text-[8px] font-semibold text-slate-700 flex items-center gap-1 shadow">
                <div className="w-10 h-0.5 bg-slate-700" />
                <span>200 km</span>
              </div>
            </div>

            {/* Map summary strip */}
            <div className="mt-3 grid grid-cols-2 md:grid-cols-5 gap-2 text-[10px]">
              <div className="rounded p-2 bg-emerald-50 text-emerald-700 text-center font-semibold">
                <div className="text-base font-extrabold">11</div>Network Points
              </div>
              <div className="rounded p-2 bg-red-50 text-red-700 text-center font-semibold">
                <div className="text-base font-extrabold">3</div>Main Hubs
              </div>
              <div className="rounded p-2 bg-blue-50 text-blue-700 text-center font-semibold">
                <div className="text-base font-extrabold">42</div>Vehicles
              </div>
              <div className="rounded p-2 bg-orange-50 text-orange-700 text-center font-semibold">
                <div className="text-base font-extrabold">3</div>Delays
              </div>
              <div className="rounded p-2 bg-purple-50 text-purple-700 text-center font-semibold">
                <div className="text-base font-extrabold">1,197</div>Shipments
              </div>
            </div>
          </div>

          {/* Right column: Fleet + Exceptions stacked */}
          <div className="space-y-4">
            {/* Fleet utilisation */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
              <div className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                <Truck className="w-4 h-4 text-red-700" /> Fleet &amp; Drivers
              </div>
              <div className="space-y-2.5 text-xs">
                {[
                  { route: 'POM-Z1', vehicle: 'BCM-123', driver: 'P. Mond', pct: 86, status: 'On Route' },
                  { route: 'POM-Z2', vehicle: 'BAX-887', driver: 'S. Aiwa', pct: 72, status: 'On Route' },
                  { route: 'POM-Z3', vehicle: 'CDN-441', driver: 'M. Tau', pct: 54, status: 'At Hub' },
                  { route: 'LAE-Z1', vehicle: 'KAB-303', driver: 'L. Pati', pct: 65, status: 'On Route' },
                ].map((r) => (
                  <div key={r.vehicle} className="border-l-2 border-slate-200 pl-2.5">
                    <div className="flex justify-between mb-1">
                      <div>
                        <span className="font-mono font-bold text-slate-900">{r.route}</span>
                        <span className="text-slate-500"> · {r.vehicle}</span>
                      </div>
                      <span className={cn(
                        'px-1.5 py-0.5 rounded text-[9px] font-semibold',
                        r.status === 'On Route' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                      )}>{r.status}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className={cn('h-full rounded-full', r.pct > 80 ? 'bg-red-500' : r.pct > 60 ? 'bg-orange-500' : 'bg-emerald-500')}
                             style={{ width: `${r.pct}%` }} />
                      </div>
                      <span className="font-bold w-8 text-right">{r.pct}%</span>
                    </div>
                    <div className="text-[10px] text-slate-500 mt-0.5">Driver: {r.driver}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Customs / Exceptions */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
              <div className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-700" /> Active Exceptions
              </div>
              <div className="space-y-2">
                {[
                  { awb: 'FX-7740998812', desc: 'PNG Customs hold — docs needed', sev: 'high', age: '4h' },
                  { awb: 'PAF-2026-00161', desc: 'Address not found — Boroko', sev: 'med', age: '2h' },
                  { awb: 'FX-7740998745', desc: 'Damaged piece — re-pack', sev: 'high', age: '6h' },
                  { awb: 'PAF-2026-00158', desc: 'Recipient unavailable', sev: 'low', age: '1h' },
                ].map((e) => (
                  <div key={e.awb} className="flex items-start gap-2 text-xs border-l-4 pl-2 py-1 rounded-r-md bg-slate-50"
                       style={{ borderColor: e.sev === 'high' ? '#ef4444' : e.sev === 'med' ? '#f97316' : '#eab308' }}>
                    <div className="flex-1">
                      <div className="font-mono font-bold text-slate-900">{e.awb}</div>
                      <div className="text-slate-600 text-[11px]">{e.desc}</div>
                    </div>
                    <div className="text-[10px] text-slate-500 whitespace-nowrap">{e.age} ago</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>


        {/* Live event log */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200">
          <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between">
            <div className="font-bold text-slate-900 flex items-center gap-2">
              <Activity className="w-4 h-4 text-red-700" /> Live Tracking Events
              <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1 ml-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Streaming
              </span>
            </div>
            <button className="text-xs text-red-700 font-semibold hover:underline">View all →</button>
          </div>
          <table className="w-full text-xs">
            <thead className="text-slate-500 uppercase bg-slate-50">
              <tr>
                <th className="text-left px-5 py-2 font-semibold">Time</th>
                <th className="text-left py-2 font-semibold">AWB</th>
                <th className="text-left py-2 font-semibold">Event</th>
                <th className="text-left py-2 font-semibold">Stream</th>
                <th className="text-left py-2 font-semibold">Location</th>
                <th className="text-left py-2 font-semibold">User</th>
                <th className="text-left px-5 py-2 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['08:12', 'PAF-2026-00184', 'Picked Up', 'Domestic', 'Steamships, POM', 'P. Mond', 'success'],
                ['08:09', 'PAF-2026-00183', 'Out for Delivery', 'Domestic', 'LAE Hub', 'S. Aiwa', 'info'],
                ['08:04', 'FX-7740998812', 'Customs Hold', 'Import', 'POM Customs', 'M. Tau', 'warn'],
                ['07:58', 'PAF-2026-00182', 'Delivered', 'Domestic', 'Boroko', 'J. Kila', 'success'],
                ['07:51', 'FX-7740998811', 'Departed Origin', 'Export', 'POM → SYD', 'PX 004', 'info'],
                ['07:44', 'PAF-2026-00178', 'Sorted at Hub', 'Domestic', 'POM Sort Belt 2', 'Scanner-04', 'info'],
              ].map((r) => (
                <tr key={r[1] as string} className="border-t border-slate-100 hover:bg-slate-50">
                  <td className="px-5 py-2 font-mono text-slate-600">{r[0]}</td>
                  <td className="py-2 font-mono text-red-700 font-bold">{r[1]}</td>
                  <td className="py-2 font-medium text-slate-900">{r[2]}</td>
                  <td className="py-2">
                    <span className={cn(
                      'px-2 py-0.5 rounded text-[10px] font-semibold',
                      r[3] === 'Domestic' && 'bg-blue-100 text-blue-700',
                      r[3] === 'Import' && 'bg-purple-100 text-purple-700',
                      r[3] === 'Export' && 'bg-cyan-100 text-cyan-700',
                    )}>{r[3]}</span>
                  </td>
                  <td className="py-2 text-slate-600">{r[4]}</td>
                  <td className="py-2 text-slate-600">{r[5]}</td>
                  <td className="px-5 py-2">
                    <span className={cn(
                      'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold',
                      r[6] === 'success' && 'bg-emerald-100 text-emerald-700',
                      r[6] === 'info' && 'bg-blue-100 text-blue-700',
                      r[6] === 'warn' && 'bg-orange-100 text-orange-700',
                    )}>
                      <span className={cn(
                        'w-1.5 h-1.5 rounded-full',
                        r[6] === 'success' && 'bg-emerald-500',
                        r[6] === 'info' && 'bg-blue-500',
                        r[6] === 'warn' && 'bg-orange-500',
                      )} />
                      {r[6] === 'success' ? 'OK' : r[6] === 'info' ? 'In Progress' : 'Attention'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Card>
  );
};

/* =========================================================== */
/* CUSTOMER DASHBOARD                                           */
/* =========================================================== */
const CustomerPreview: React.FC = () => {
  return (
    <Card className="p-0 bg-slate-900 border-0 overflow-hidden shadow-2xl rounded-2xl">
      {/* Hero banner */}
      <div className="relative px-6 py-5 bg-gradient-to-r from-red-700 via-red-600 to-orange-500 overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, white 0%, transparent 30%), radial-gradient(circle at 80% 30%, white 0%, transparent 30%)'
        }} />
        <div className="relative flex items-center justify-between">
          <div>
            <div className="text-white/80 text-xs font-semibold uppercase tracking-wider">Customer Portal</div>
            <div className="text-white text-xl font-bold">Welcome back, Steamships Ltd</div>
            <div className="text-white/80 text-xs mt-1">Account #C-001284 · Credit Status: Approved K 50,000</div>
          </div>
          <div className="flex gap-2">
            <button className="bg-white/20 backdrop-blur text-white border border-white/30 text-xs font-semibold px-3 py-2 rounded-lg flex items-center gap-1 hover:bg-white/30">
              <Plane className="w-3.5 h-3.5" /> New Shipment
            </button>
            <button className="bg-white text-red-700 text-xs font-bold px-3 py-2 rounded-lg flex items-center gap-1 hover:bg-slate-50">
              <Truck className="w-3.5 h-3.5" /> Book Pickup
            </button>
          </div>
        </div>
      </div>

      <div className="p-6 bg-slate-50 space-y-6">
        {/* KPI cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { l: 'Active Shipments', v: '14', sub: '4 out for delivery', icon: Package, gradient: 'from-blue-500 to-blue-600' },
            { l: 'Delivered This Month', v: '128', sub: '+18% vs Apr', icon: CheckCircle2, gradient: 'from-emerald-500 to-emerald-600' },
            { l: 'In Customs', v: '3', sub: '1 needs action', icon: Globe, gradient: 'from-purple-500 to-purple-600' },
            { l: 'Outstanding', v: 'K 12,480', sub: '2 overdue', icon: CreditCard, gradient: 'from-orange-500 to-red-500' },
          ].map((k) => (
            <div key={k.l} className={cn('rounded-xl p-4 text-white shadow-md bg-gradient-to-br', k.gradient)}>
              <div className="flex items-center justify-between">
                <k.icon className="w-5 h-5 opacity-80" />
                <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
              </div>
              <div className="text-2xl font-extrabold mt-2">{k.v}</div>
              <div className="text-[11px] uppercase tracking-wider opacity-90 font-semibold">{k.l}</div>
              <div className="text-[10px] opacity-75 mt-1">{k.sub}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-4">
          {/* Shipment tracker (large) */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200">
            <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between">
              <div className="font-bold text-slate-900 flex items-center gap-2">
                <Plane className="w-4 h-4 text-red-700" /> Track My Shipments
              </div>
              <div className="flex gap-1 text-[11px]">
                <button className="px-2 py-1 rounded bg-red-700 text-white font-semibold">All</button>
                <button className="px-2 py-1 rounded text-slate-600 hover:bg-slate-100">Active</button>
                <button className="px-2 py-1 rounded text-slate-600 hover:bg-slate-100">Delivered</button>
              </div>
            </div>
            <div className="p-4 space-y-3">
              {[
                { awb: 'PAF-2026-00184', dest: 'LAE', stream: 'Domestic', status: 'In Transit', pct: 60, eta: 'Today 16:30', steps: ['Picked', 'Hub', 'Air', 'Delivery', 'Done'], current: 2 },
                { awb: 'PAF-2026-00179', dest: 'MAG', stream: 'Domestic', status: 'Out for Delivery', pct: 85, eta: 'Today 14:00', steps: ['Picked', 'Hub', 'Air', 'Delivery', 'Done'], current: 3 },
                { awb: 'FX-7740998812', dest: 'SYD', stream: 'Export', status: 'Customs', pct: 40, eta: 'Wed 13/05', steps: ['Picked', 'Hub', 'Customs', 'Air', 'Delivered'], current: 2 },
                { awb: 'FX-7740998755', dest: 'POM', stream: 'Import', status: 'Delivered', pct: 100, eta: 'Delivered 10/05', steps: ['Air', 'Customs', 'Hub', 'Delivery', 'Done'], current: 4 },
              ].map((s) => (
                <div key={s.awb} className="p-3 rounded-lg bg-gradient-to-r from-slate-50 to-white border border-slate-200 hover:border-red-200 transition">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-red-700 text-sm">{s.awb}</span>
                      <span className={cn(
                        'px-1.5 py-0.5 rounded text-[9px] font-bold',
                        s.stream === 'Domestic' && 'bg-blue-100 text-blue-700',
                        s.stream === 'Import' && 'bg-purple-100 text-purple-700',
                        s.stream === 'Export' && 'bg-cyan-100 text-cyan-700',
                      )}>{s.stream.toUpperCase()}</span>
                      <span className="text-xs text-slate-600">→ <strong>{s.dest}</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={cn(
                        'px-2 py-0.5 rounded-full text-[10px] font-bold',
                        s.status === 'Delivered' && 'bg-emerald-100 text-emerald-700',
                        s.status === 'In Transit' && 'bg-orange-100 text-orange-700',
                        s.status === 'Out for Delivery' && 'bg-yellow-100 text-yellow-700',
                        s.status === 'Customs' && 'bg-purple-100 text-purple-700',
                      )}>{s.status}</span>
                      <span className="text-[10px] text-slate-500"><Clock className="w-3 h-3 inline" /> ETA {s.eta}</span>
                    </div>
                  </div>
                  {/* Step indicator */}
                  <div className="flex items-center gap-0.5 mb-1">
                    {s.steps.map((st, i) => (
                      <React.Fragment key={st + i}>
                        <div className={cn(
                          'w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold border-2',
                          i <= s.current ? (s.pct === 100 ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-red-600 border-red-600 text-white') : 'bg-white border-slate-300 text-slate-400'
                        )}>{i + 1}</div>
                        {i < s.steps.length - 1 && (
                          <div className={cn(
                            'flex-1 h-0.5',
                            i < s.current ? (s.pct === 100 ? 'bg-emerald-500' : 'bg-red-600') : 'bg-slate-200'
                          )} />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                  <div className="flex justify-between text-[9px] text-slate-500 font-medium">
                    {s.steps.map((st) => <span key={st}>{st}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Monthly volume chart */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
            <div className="font-bold text-slate-900 mb-1 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-red-700" /> Shipment Volume
            </div>
            <div className="text-xs text-slate-500 mb-3">Last 6 months</div>
            <div className="flex items-end gap-1.5 h-32">
              {[
                { m: 'Dec', v: 72 },
                { m: 'Jan', v: 98 },
                { m: 'Feb', v: 88 },
                { m: 'Mar', v: 104 },
                { m: 'Apr', v: 108 },
                { m: 'May', v: 128 },
              ].map((b, i) => (
                <div key={b.m} className="flex-1 flex flex-col items-center gap-1">
                  <div className="text-[9px] font-bold text-slate-700">{b.v}</div>
                  <div
                    className={cn(
                      'w-full rounded-t-md',
                      i === 5 ? 'bg-gradient-to-t from-red-700 to-red-400' : 'bg-gradient-to-t from-slate-400 to-slate-300'
                    )}
                    style={{ height: `${(b.v / 128) * 100}%` }}
                  />
                  <div className="text-[10px] text-slate-500">{b.m}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-3 gap-2 text-center">
              <div>
                <div className="text-blue-600 font-bold text-sm">62%</div>
                <div className="text-[9px] text-slate-500 uppercase">Domestic</div>
              </div>
              <div>
                <div className="text-cyan-600 font-bold text-sm">24%</div>
                <div className="text-[9px] text-slate-500 uppercase">Export</div>
              </div>
              <div>
                <div className="text-purple-600 font-bold text-sm">14%</div>
                <div className="text-[9px] text-slate-500 uppercase">Import</div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick actions + invoices + address book */}
        <div className="grid lg:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
            <div className="font-bold text-slate-900 mb-3">Quick Actions</div>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: 'Book Pickup', icon: Truck, color: 'from-blue-500 to-blue-600' },
                { label: 'Get Quote', icon: FileText, color: 'from-emerald-500 to-emerald-600' },
                { label: 'Print AWB', icon: Printer, color: 'from-purple-500 to-purple-600' },
                { label: 'Download POD', icon: Download, color: 'from-orange-500 to-orange-600' },
                { label: 'View Invoices', icon: CreditCard, color: 'from-pink-500 to-rose-600' },
                { label: 'Support Chat', icon: MessageSquare, color: 'from-cyan-500 to-cyan-600' },
              ].map((a) => (
                <button key={a.label} className="group rounded-lg p-3 border border-slate-200 hover:border-transparent hover:shadow-md transition text-left bg-white">
                  <div className={cn('w-8 h-8 rounded-lg bg-gradient-to-br flex items-center justify-center text-white mb-2', a.color)}>
                    <a.icon className="w-4 h-4" />
                  </div>
                  <div className="text-xs font-semibold text-slate-900 group-hover:text-red-700">{a.label}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
            <div className="font-bold text-slate-900 mb-3 flex items-center justify-between">
              <span>Recent Invoices</span>
              <span className="text-[10px] text-slate-500 font-normal">3 of 28</span>
            </div>
            <div className="space-y-2">
              {[
                { id: 'INV-026-1184', amt: 'K 1,247.00', status: 'Paid', date: '08 May', due: '08 May' },
                { id: 'INV-026-1180', amt: 'K 3,890.50', status: 'Due', date: '01 May', due: '15 May' },
                { id: 'INV-026-1175', amt: 'K 562.00', status: 'Overdue', date: '22 Apr', due: '07 May' },
              ].map((r) => (
                <div key={r.id} className="flex items-center justify-between p-2.5 rounded-lg border border-slate-100 hover:bg-slate-50">
                  <div>
                    <div className="font-mono text-xs font-bold text-slate-900">{r.id}</div>
                    <div className="text-[10px] text-slate-500">Issued {r.date} · Due {r.due}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-slate-900">{r.amt}</div>
                    <span className={cn(
                      'inline-block px-2 py-0.5 rounded text-[9px] font-bold',
                      r.status === 'Paid' && 'bg-emerald-100 text-emerald-700',
                      r.status === 'Due' && 'bg-orange-100 text-orange-700',
                      r.status === 'Overdue' && 'bg-red-100 text-red-700'
                    )}>{r.status}</span>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-3 text-xs font-semibold text-red-700 hover:underline">View all invoices →</button>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
            <div className="font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Users className="w-4 h-4 text-red-700" /> Saved Addresses
            </div>
            <div className="space-y-2">
              {[
                { name: 'Hornibrook NGI', city: 'LAE', tag: 'Frequent' },
                { name: 'Ingram Micro', city: 'SYD, AU', tag: 'Int’l' },
                { name: 'Brian Bell Group', city: 'POM', tag: 'Local' },
                { name: 'Theodist Ltd', city: 'LAE', tag: 'Frequent' },
              ].map((a) => (
                <div key={a.name} className="flex items-center justify-between p-2 rounded-md border border-slate-100 hover:border-red-200 hover:bg-red-50/30">
                  <div>
                    <div className="text-xs font-semibold text-slate-900">{a.name}</div>
                    <div className="text-[10px] text-slate-500 flex items-center gap-1">
                      <MapPin className="w-2.5 h-2.5" /> {a.city}
                    </div>
                  </div>
                  <span className={cn(
                    'text-[9px] font-bold px-1.5 py-0.5 rounded',
                    a.tag === 'Frequent' && 'bg-emerald-100 text-emerald-700',
                    a.tag === 'Int’l' && 'bg-cyan-100 text-cyan-700',
                    a.tag === 'Local' && 'bg-blue-100 text-blue-700',
                  )}>{a.tag}</span>
                </div>
              ))}
            </div>
            <button className="w-full mt-3 text-xs font-semibold text-red-700 hover:underline">+ Add new address</button>
          </div>
        </div>

        {/* Notification strip */}
        <div className="rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 p-5 text-white shadow-md flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Calendar className="w-8 h-8" />
            <div>
              <div className="font-bold">Schedule a recurring pickup</div>
              <div className="text-xs opacity-90">Save 5% on every shipment with our weekly pickup plan.</div>
            </div>
          </div>
          <button className="bg-white text-red-700 text-xs font-bold px-4 py-2 rounded-lg hover:bg-slate-50">Set Schedule</button>
        </div>
      </div>
    </Card>
  );
};

export default Dashboards;
