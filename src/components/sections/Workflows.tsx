import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Truck, PlaneTakeoff, PlaneLanding, ArrowRight, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

type Flow = {
  id: string;
  title: string;
  icon: React.ElementType;
  color: string;
  steps: { actor: string; action: string; doctype: string; state: string }[];
};

const flows: Flow[] = [
  {
    id: 'domestic',
    title: 'Domestic Logistics',
    icon: Truck,
    color: 'red',
    steps: [
      { actor: 'Customer / CSR', action: 'Create Pickup Request via portal or counter', doctype: 'Pickup Request', state: 'Draft' },
      { actor: 'Dispatcher', action: 'Auto-assign Route, Zone, Vehicle & Driver', doctype: 'Delivery Run', state: 'Scheduled' },
      { actor: 'Driver', action: 'Scan QR at pickup, capture POP photo & signature', doctype: 'Tracking Event', state: 'Picked Up' },
      { actor: 'Warehouse', action: 'Sort, weigh, generate In-house AWB + barcode label', doctype: 'Airway Bill', state: 'In Transit' },
      { actor: 'Hub Agent', action: 'Build Manifest for outbound flight (POM/LAE/HGU)', doctype: 'Manifest', state: 'Manifested' },
      { actor: 'Destination Driver', action: 'Scan QR on delivery, capture POD', doctype: 'Tracking Event', state: 'Delivered' },
      { actor: 'System', action: 'Trigger invoice in ERPNext Sales Invoice', doctype: 'Sales Invoice', state: 'Billed' },
    ],
  },
  {
    id: 'imports',
    title: 'International Imports (Inbound)',
    icon: PlaneLanding,
    color: 'orange',
    steps: [
      { actor: 'FedEx Origin', action: 'Pre-alert received via FedEx WebService (EDI)', doctype: 'Airline AWB', state: 'Pre-Alert' },
      { actor: 'System', action: 'Auto-create In-house AWB linked to FedEx MAWB', doctype: 'Airway Bill', state: 'Expected' },
      { actor: 'Warehouse', action: 'Flight arrives, scan barcodes, check-in pieces', doctype: 'Tracking Event', state: 'Arrived' },
      { actor: 'Customs Agent', action: 'Lodge SAD/Import Entry with PNG Customs', doctype: 'Customs Declaration', state: 'Lodged' },
      { actor: 'Customs Agent', action: 'Pay duties, release cargo', doctype: 'Customs Declaration', state: 'Cleared' },
      { actor: 'Dispatcher', action: 'Assign to local Route / Zone / Vehicle', doctype: 'Delivery Run', state: 'Out for Delivery' },
      { actor: 'Driver', action: 'Deliver, scan, collect POD', doctype: 'Tracking Event', state: 'Delivered' },
    ],
  },
  {
    id: 'exports',
    title: 'International Exports (Outbound)',
    icon: PlaneTakeoff,
    color: 'blue',
    steps: [
      { actor: 'Customer', action: 'Book shipment via portal with commercial invoice', doctype: 'Pickup Request', state: 'Booked' },
      { actor: 'Driver', action: 'Pickup goods, scan barcode, deliver to depot', doctype: 'Tracking Event', state: 'Received' },
      { actor: 'Operations', action: 'Generate In-house AWB + FedEx/Airline AWB label', doctype: 'Airline AWB', state: 'Labelled' },
      { actor: 'Customs Agent', action: 'Lodge Export Entry, obtain clearance', doctype: 'Customs Declaration', state: 'Cleared' },
      { actor: 'Operations', action: 'Build Manifest, tender to PNG Air / Air Niugini', doctype: 'Manifest', state: 'Tendered' },
      { actor: 'System', action: 'Track via FedEx WebService until POD at destination', doctype: 'Tracking Event', state: 'Delivered' },
    ],
  },
];

const Workflows: React.FC = () => {
  const [active, setActive] = useState('domestic');
  const flow = flows.find((f) => f.id === active)!;

  return (
    <section id="workflows" className="py-20 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-12">
          <div className="text-sm font-semibold text-red-700 uppercase tracking-wider mb-2">03 — Operational Workflows</div>
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Three Operations, One Platform</h2>
          <p className="text-slate-600 text-lg">
            Each workflow is enforced by Frappe's Workflow Engine with strict state transitions, role-based actions, and audit trails.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 mb-8">
          {flows.map((f) => (
            <button
              key={f.id}
              onClick={() => setActive(f.id)}
              className={cn(
                'flex items-center gap-2 px-5 py-3 rounded-lg font-medium transition-all border-2',
                active === f.id
                  ? 'bg-red-700 text-white border-red-700 shadow-lg'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-red-300'
              )}
            >
              <f.icon className="w-4 h-4" />
              {f.title}
            </button>
          ))}
        </div>

        <Card className="p-8 bg-white">
          <div className="flex items-center gap-3 mb-6">
            <flow.icon className="w-7 h-7 text-red-700" />
            <h3 className="text-2xl font-bold text-slate-900">{flow.title} — State Flow</h3>
          </div>
          <div className="space-y-3">
            {flow.steps.map((s, i) => (
              <div key={i} className="flex items-start gap-4 p-4 rounded-lg bg-slate-50 hover:bg-red-50 transition-colors border border-slate-200">
                <div className="flex-shrink-0 w-9 h-9 rounded-full bg-red-700 text-white flex items-center justify-center font-bold text-sm">
                  {i + 1}
                </div>
                <div className="flex-1 grid md:grid-cols-12 gap-3 items-center">
                  <div className="md:col-span-3">
                    <div className="text-xs uppercase text-slate-500 font-semibold">Actor</div>
                    <div className="font-medium text-slate-900">{s.actor}</div>
                  </div>
                  <div className="md:col-span-5">
                    <div className="text-xs uppercase text-slate-500 font-semibold">Action</div>
                    <div className="text-slate-700">{s.action}</div>
                  </div>
                  <div className="md:col-span-2">
                    <div className="text-xs uppercase text-slate-500 font-semibold">DocType</div>
                    <code className="text-xs text-red-700 bg-red-50 px-2 py-0.5 rounded">{s.doctype}</code>
                  </div>
                  <div className="md:col-span-2 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span className="text-sm font-medium text-emerald-700">{s.state}</span>
                  </div>
                </div>
                {i < flow.steps.length - 1 && <ArrowRight className="w-4 h-4 text-slate-300 hidden md:block" />}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
};

export default Workflows;
