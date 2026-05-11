import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, Layers, Users, Workflow } from 'lucide-react';

const Summary: React.FC = () => {
  const items = [
    {
      icon: Target,
      title: 'Objective',
      body: 'Deliver an end-to-end logistics platform on Frappe/ERPNext that unifies domestic dispatch, international import clearance, and export forwarding under a single FedEx-aligned operating model for PNG Air Freight.',
    },
    {
      icon: Layers,
      title: 'Scope',
      body: 'Custom DocTypes for AWBs (In-house, PNG Air, Air Niugini), Routes/Zones, Vehicles, Drivers, Pickups, Deliveries, Manifests, Customs, plus barcode/QR label generation and dashboards.',
    },
    {
      icon: Users,
      title: 'Stakeholders',
      body: 'Operations team, Drivers, Customs agents, Customer Service, Finance, Corporate & Walk-in Customers, FedEx integration touchpoints, and Executive Management.',
    },
    {
      icon: Workflow,
      title: 'Approach',
      body: 'Customisation-first using Frappe Framework Custom Apps. Avoid core ERPNext changes. Use Frappe Print Formats with bwip-js for barcodes and qrcode.js for QR codes.',
    },
  ];
  return (
    <section id="summary" className="py-20 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-12">
          <div className="text-sm font-semibold text-red-700 uppercase tracking-wider mb-2">01 — Executive Summary</div>
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Project Overview</h2>
          <p className="text-slate-600 text-lg">
            This document defines the technical blueprint required prior to development kickoff. It captures the
            operating context, custom data model, workflow states, label/printing strategy and dashboard composition.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {items.map((it) => (
            <Card key={it.title} className="border-slate-200 hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center gap-3 pb-3">
                <div className="w-10 h-10 rounded-lg bg-red-100 text-red-700 flex items-center justify-center">
                  <it.icon className="w-5 h-5" />
                </div>
                <CardTitle className="text-xl">{it.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 leading-relaxed">{it.body}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Summary;
