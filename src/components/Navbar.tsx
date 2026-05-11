import React, { useState } from 'react';
import { Plane, Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const links = [
    { href: '#summary', label: 'Summary' },
    { href: '#architecture', label: 'Architecture' },
    { href: '#workflows', label: 'Workflows' },
    { href: '#routing', label: 'Routing' },
    { href: '#labels', label: 'Labels' },
    { href: '#dashboards', label: 'Dashboards' },
  ];
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 font-bold text-slate-900">
          <Plane className="w-5 h-5 text-red-700" />
          <span>PNG Air Freight</span>
          <span className="hidden sm:inline text-xs text-slate-500 font-normal">— Tech Doc</span>
        </a>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-slate-600 hover:text-red-700 font-medium">
              {l.label}
            </a>
          ))}
        </nav>
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 text-slate-700"
          aria-label="Menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>
      {open && (
        <nav className="md:hidden border-t border-slate-200 bg-white">
          <div className="container mx-auto px-6 py-3 flex flex-col gap-2">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-slate-700 hover:text-red-700 py-1.5 text-sm font-medium"
              >
                {l.label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
