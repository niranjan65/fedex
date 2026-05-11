import React, { useState } from 'react';
import { Plane, Mail, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    try {
      await fetch('https://famous.ai/api/crm/6a018fa7141d5abce1e18124/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          source: 'footer-signup',
          tags: ['png-air-freight', 'tech-doc'],
        }),
      });
    } catch {
      /* swallow */
    }
    setDone(true);
    setEmail('');
  };

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="container mx-auto px-6 py-14">
        <div className="grid md:grid-cols-4 gap-8 mb-10">
          <div>
            <div className="flex items-center gap-2 text-white font-bold text-lg mb-3">
              <Plane className="w-5 h-5 text-orange-400" /> PNG Air Freight
            </div>
            <p className="text-sm text-slate-400">
              Pre-development technical blueprint for the Frappe/ERPNext-based logistics platform.
            </p>
          </div>
          <div>
            <div className="font-semibold text-white mb-3">Document</div>
            <ul className="space-y-2 text-sm">
              <li><a href="#summary" className="hover:text-orange-300">Executive Summary</a></li>
              <li><a href="#architecture" className="hover:text-orange-300">Architecture</a></li>
              <li><a href="#workflows" className="hover:text-orange-300">Workflows</a></li>
              <li><a href="#routing" className="hover:text-orange-300">Routing &amp; Dispatch</a></li>
              <li><a href="#labels" className="hover:text-orange-300">Barcode Labels</a></li>
              <li><a href="#dashboards" className="hover:text-orange-300">Dashboards</a></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold text-white mb-3">Tech Stack</div>
            <ul className="space-y-2 text-sm">
              <li>Frappe Framework v16</li>
              <li>ERPNext v16</li>
              <li>MariaDB / Redis</li>
              <li>bwip-js · qrcode</li>
              <li>Zebra ZPL II</li>
              <li>FedEx WebServices</li>
            </ul>
          </div>
          <div>
            <div className="font-semibold text-white mb-3 flex items-center gap-2">
              <Mail className="w-4 h-4" /> Document Updates
            </div>
            {done ? (
              <div className="text-emerald-400 text-sm flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> Subscribed — we'll be in touch.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-2">
                <Input
                  type="email"
                  required
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                />
                <Button type="submit" className="w-full bg-red-700 hover:bg-red-800">
                  Subscribe
                </Button>
              </form>
            )}
          </div>
        </div>
        <div className="border-t border-slate-800 pt-6 flex flex-col md:flex-row justify-between text-xs text-slate-500">
          <div>© {new Date().getFullYear()} PNG Air Freight — Pre-Development Technical Document v1.0</div>
         
        </div>
      </div>
    </footer>
  );
};

export default Footer;
