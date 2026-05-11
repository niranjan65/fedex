import React from 'react';
import { Card } from '@/components/ui/card';
import { Server, Database, Smartphone, Printer, Globe, Shield } from 'lucide-react';

const Architecture: React.FC = () => {
  const layers = [
    {
      icon: Globe,
      title: 'Presentation Layer',
      color: 'bg-blue-50 text-blue-700 border-blue-200',
      items: ['Desk (Operations)', 'Customer Portal (Web)', 'Driver Mobile PWA', 'Public Tracking Page'],
    },
    {
      icon: Server,
      title: 'Application Layer (Frappe App: png_freight)',
      color: 'bg-red-50 text-red-700 border-red-200',
      items: ['Custom DocTypes', 'Workflow Engine', 'Server Scripts & Hooks', 'REST API / Webhooks'],
    },
    {
      icon: Printer,
      title: 'Services Layer',
      color: 'bg-orange-50 text-orange-700 border-orange-200',
      items: ['Barcode/QR Generator (bwip-js)', 'Print Format Engine', 'Label Printer Queue', 'SMS/Email Notifier'],
    },
    {
      icon: Shield,
      title: 'Integration Layer',
      color: 'bg-purple-50 text-purple-700 border-purple-200',
      items: ['FedEx Web Services', 'Airline Cargo APIs', 'PNG Customs (PNGCS)', 'Payment Gateway'],
    },
    {
      icon: Database,
      title: 'Data Layer',
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      items: ['MariaDB (Frappe)', 'Redis (Cache/Queue)', 'File Store (Labels/Docs)', 'Audit Log'],
    },
    {
      icon: Smartphone,
      title: 'Edge Devices',
      color: 'bg-slate-50 text-slate-700 border-slate-200',
      items: ['Zebra ZT411 Printers', 'Honeywell Scanners', 'Driver Android Devices', 'Warehouse Tablets', 'Network Weighing Scale'],
    },
  ];

  return (
    <section id="architecture" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-12">
          <div className="text-sm font-semibold text-red-700 uppercase tracking-wider mb-2">02 — System Architecture</div>
          <h2 className="text-4xl font-bold text-slate-900 mb-4">High-Level Architecture</h2>
          <p className="text-slate-600 text-lg">
            Layered architecture built around a single Frappe custom app <code className="bg-slate-100 px-2 py-1 rounded text-red-700">png_freight</code>
            that extends ERPNext's Stock, Selling, and Accounts modules.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {layers.map((l) => (
            <Card key={l.title} className={`p-6 border-2 ${l.color}`}>
              <div className="flex items-center gap-3 mb-4">
                <l.icon className="w-6 h-6" />
                <h3 className="font-bold text-base">{l.title}</h3>
              </div>
              <ul className="space-y-2">
                {l.items.map((i) => (
                  <li key={i} className="text-sm flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-current flex-shrink-0" />
                    <span className="text-slate-700">{i}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>

        <div className="mt-12 bg-slate-900 text-slate-100 rounded-xl p-8 font-mono text-sm overflow-x-auto">
          <div className="text-orange-300 mb-3"># Frappe Custom App Structure</div>
          <pre className="text-xs leading-relaxed">{`png_freight/
├── png_freight/
│   ├── doctype/
│   │   ├── airway_bill/              # In-house AWB master
│   │   ├── airline_awb/              # PNG Air / Air Niugini AWB
│   │   ├── shipment_piece/           # Child table for pieces
│   │   ├── route/                    # Local route master
│   │   ├── zone/                     # Delivery zone
│   │   ├── vehicle/                  # Fleet registry
│   │   ├── driver/                   # Driver master
│   │   ├── pickup_request/           # Pickup booking
│   │   ├── delivery_run/             # Daily dispatch sheet
│   │   ├── manifest/                 # Flight manifest
│   │   ├── customs_declaration/      # Import/Export customs
│   │   └── tracking_event/           # Scan history
│   ├── print_format/                 # AWB labels (4x6 ZPL)
│   ├── workflow/                     # State machines
│   ├── dashboard/                    # Admin & Customer dashboards
│   ├── api.py                        # REST endpoints
│   └── hooks.py`}</pre>
        </div>
      </div>
    </section>
  );
};

export default Architecture;
