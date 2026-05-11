import React from 'react';
import { Plane, FileText, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-red-700 via-red-800 to-orange-700 text-white">
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.3" />
          </pattern>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
      </div>
      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="flex items-center gap-2 text-sm uppercase tracking-widest text-orange-200 mb-4">
          <Plane className="w-4 h-4" /> Pre-Development Technical Document
        </div>
        <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6 max-w-4xl">
          PNG Air Freight
          <span className="block text-orange-200 text-3xl md:text-4xl mt-2 font-light">
            Logistics Management System on Frappe / ERPNext
          </span>
        </h1>
        <p className="text-lg md:text-xl text-orange-50 max-w-3xl mb-8 leading-relaxed">
          Exclusive FedEx Country Agent — Domestic Logistics, International Imports & Exports.
          Unified Frappe-based platform with barcode/QR-enabled AWB labelling, route &amp; driver
          dispatch, and dual-facing dashboards.
        </p>
        <div className="flex flex-wrap gap-4">
          <Button
            size="lg"
            className="bg-white text-red-800 hover:bg-orange-100"
            onClick={() => document.getElementById('summary')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <FileText className="w-4 h-4 mr-2" /> Read Document
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-red-800 bg-transparent"
            onClick={() => window.print()}
          >
            <Download className="w-4 h-4 mr-2" /> Export PDF
          </Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          {[
            { label: 'Operations', value: '3 Streams' },
            { label: 'AWB Types', value: 'Dual (In-house + Airline)' },
            { label: 'Platform', value: 'Frappe v15 / ERPNext' },
            { label: 'Region', value: 'Papua New Guinea' },
          ].map((s) => (
            <div key={s.label} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="text-xs uppercase tracking-wider text-orange-200">{s.label}</div>
              <div className="text-lg font-semibold mt-1">{s.value}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
