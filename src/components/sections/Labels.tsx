import React from 'react';
import { Card } from '@/components/ui/card';
import { QrCode, Barcode, Plane, Printer, FileCode } from 'lucide-react';

/* ------------------------------------------------------------------ */
/* Reusable barcode + QR mocks                                         */
/* ------------------------------------------------------------------ */
const FakeBarcode: React.FC<{ height?: number; bars?: number; seed?: number }> = ({
  height = 56,
  bars = 70,
  seed = 13,
}) => (
  <div className="flex items-end gap-[1px] bg-white" style={{ height }}>
    {Array.from({ length: bars }).map((_, i) => {
      const w = ((i * seed) % 4) + 1;
      const h = 55 + ((i * seed * 3) % 45);
      return <div key={i} className="bg-black" style={{ width: `${w}px`, height: `${h}%` }} />;
    })}
  </div>
);

const FakeQR: React.FC<{ size?: number; seed?: number }> = ({ size = 70, seed = 7 }) => (
  <div
    className="bg-white p-[2px] border border-black"
    style={{ width: size, height: size }}
  >
    <div className="grid grid-cols-12 grid-rows-12 gap-0 w-full h-full">
      {Array.from({ length: 144 }).map((_, i) => {
        // Finder squares (3 corners)
        const row = Math.floor(i / 12);
        const col = i % 12;
        const inTL = row < 3 && col < 3;
        const inTR = row < 3 && col > 8;
        const inBL = row > 8 && col < 3;
        const finder = inTL || inTR || inBL;
        const on = finder ? (Math.abs(row - 1) <= 1 && Math.abs(col - 1) <= 1) || (Math.abs(row - 1) <= 1 && Math.abs(col - 10) <= 1) || (Math.abs(row - 10) <= 1 && Math.abs(col - 1) <= 1) ? true : (row === 0 || col === 0 || col === 2 || row === 2 || col === 8 || col === 11 || col === 10 || row === 8 || row === 10 || row === 11) : ((i * seed * 11) % 7) % 2 === 0;
        return <div key={i} className={on ? 'bg-black' : 'bg-white'} />;
      })}
    </div>
  </div>
);

/* ------------------------------------------------------------------ */
/* FedEx-style In-house AWB Label                                      */
/* ------------------------------------------------------------------ */
const InHouseLabel: React.FC = () => {
  return (
    <div className="bg-white border-2 border-black rounded-sm overflow-hidden font-sans text-black"
         style={{ aspectRatio: '4 / 6' }}>
      {/* Top — Sender / Recipient block */}
      <div className="grid grid-cols-3 text-[9px] leading-tight border-b-2 border-black">
        <div className="col-span-2 p-2 border-r border-black">
          <div className="flex justify-between text-[8px] uppercase font-bold">
            <span>ORIGIN ID:POM</span>
            <span>(675) 325-9000</span>
          </div>
          <div className="font-bold mt-0.5 text-[10px]">PNG AIR FREIGHT</div>
          <div>EXCLUSIVE FEDEX COUNTRY AGENT</div>
          <div>SECTION 4 LOT 23, MORATA ROAD</div>
          <div>PORT MORESBY, NCD 121</div>
          <div className="font-bold">PAPUA NEW GUINEA (PG)</div>
        </div>
        <div className="p-2 text-[8px]">
          <div className="font-bold">SHIP DATE: 11MAY26</div>
          <div>ACTWGT: 47.5 KG</div>
          <div>CAD: 482937/SSF02410</div>
          <div className="mt-1">DIMS: 60x40x35 CM</div>
          <div className="font-bold mt-1">BILL SENDER</div>
        </div>
      </div>

      {/* TO block */}
      <div className="p-2 border-b-2 border-black text-[10px] leading-tight">
        <div className="text-[8px] uppercase font-semibold">To</div>
        <div className="font-bold text-[12px]">HORNIBROOK NGI</div>
        <div>WAREHOUSE 4, MILFORDHAVEN ROAD</div>
        <div className="font-bold">LAE, MOROBE 411</div>
        <div className="flex justify-between items-end mt-0.5">
          <div>
            <div className="text-[8px]">(675) 472-1100</div>
            <div className="font-bold">REF: STM-PO-88241</div>
          </div>
          <div className="text-right">
            <div className="text-[8px]">DEPT:</div>
            <div className="text-[8px]">INV:</div>
            <div className="text-[8px] font-bold">(PG)</div>
          </div>
        </div>
      </div>

      {/* Top barcode block */}
      <div className="px-3 py-1.5 border-b-2 border-black">
        <FakeBarcode height={42} bars={60} seed={11} />
        <div className="font-mono text-[9px] tracking-wider text-center mt-0.5">
          TRK# 8187 2023 1525 &nbsp; FORM 0430
        </div>
      </div>

      {/* Big destination band — FedEx style */}
      <div className="relative bg-white">
        <div className="flex items-stretch">
          <div className="flex-1 flex flex-col justify-center px-3 py-2">
            <div className="flex items-end gap-3">
              {/* FedEx-ish logo lockup */}
              <div className="leading-none">
                <span className="font-extrabold text-[26px] text-[#4D148C] tracking-tight">Fed</span>
                <span className="font-extrabold text-[26px] text-[#FF6600] tracking-tight">Ex</span>
                <div className="text-[8px] font-bold text-[#FF6600] -mt-0.5">Express</div>
              </div>
              <div className="ml-auto border-2 border-black flex items-center justify-center w-12 h-12">
                <span className="font-black text-2xl">E</span>
              </div>
            </div>
            <div className="font-black text-[44px] leading-none mt-2 tracking-tight">
              LAE-PG
            </div>
            <div className="flex justify-between items-center text-[10px] mt-1 border-t border-black pt-1">
              <span className="font-bold">FROM PNGAF — POM</span>
              <span>11/05/26 08:12</span>
              <span className="font-bold">Package 1 of 1</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom barcode + QR strip */}
      <div className="border-t-2 border-black p-2">
        <div className="flex items-center justify-between gap-2">
          <div className="flex-1">
            <FakeBarcode height={44} bars={56} seed={17} />
            <div className="font-mono text-[9px] tracking-widest text-center mt-0.5">
              8187 2023 1525 &nbsp; 1 1 &nbsp; POM01
            </div>
          </div>
          <FakeQR size={56} seed={9} />
        </div>
        <div className="flex justify-between text-[8px] mt-1 font-semibold border-t border-black pt-1">
          <span>SVC: DOMESTIC EXPRESS</span>
          <span>ZONE: LAE-Z1</span>
          <span>BIN: 03-A</span>
        </div>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Airline AWB Label (PNG Air / Air Niugini) — FedEx-styled            */
/* ------------------------------------------------------------------ */
const AirlineLabel: React.FC<{
  carrier: 'PNG Air' | 'Air Niugini';
  prefix: string;
  awbNumber: string;
  origin: string;
  destination: string;
  flight: string;
}> = ({ carrier, prefix, awbNumber, origin, destination, flight }) => {
  const accent = carrier === 'Air Niugini' ? '#C8102E' : '#0B5FAE';
  return (
    <div className="bg-white border-2 border-black rounded-sm overflow-hidden font-sans text-black"
         style={{ aspectRatio: '4 / 6' }}>
      {/* Top carrier strip */}
      <div className="flex items-center justify-between px-3 py-1.5 border-b-2 border-black"
           style={{ backgroundColor: accent, color: 'white' }}>
        <div>
          <div className="font-black text-[14px] tracking-tight leading-none uppercase">{carrier} Cargo</div>
          <div className="text-[8px] font-semibold opacity-90">Issued by PNG Air Freight (Agent)</div>
        </div>
        <div className="text-right">
          <div className="text-[8px] uppercase font-semibold">AWB No.</div>
          <div className="font-mono font-bold text-[13px]">{prefix}-{awbNumber}</div>
        </div>
      </div>

      {/* Shipper / Consignee */}
      <div className="grid grid-cols-2 text-[9px] leading-tight border-b-2 border-black">
        <div className="p-2 border-r border-black">
          <div className="text-[8px] uppercase font-bold">Shipper</div>
          <div className="font-bold">THEODIST LTD — LAE</div>
          <div>P.O. BOX 1618, LAE</div>
          <div className="font-bold">PAPUA NEW GUINEA</div>
          <div>TEL: 6754725488</div>
        </div>
        <div className="p-2">
          <div className="text-[8px] uppercase font-bold">Consignee</div>
          <div className="font-bold">INGRAM MICRO</div>
          <div>22-24 WONDERLAND DRIVE</div>
          <div className="font-bold">EASTERN CREEK NSW 2766</div>
          <div>AUSTRALIA</div>
        </div>
      </div>

      {/* Routing grid */}
      <div className="grid grid-cols-4 text-[9px] border-b-2 border-black">
        <div className="p-1.5 border-r border-black">
          <div className="text-[7px] uppercase text-gray-600">Origin</div>
          <div className="font-black text-[14px] leading-none">{origin}</div>
        </div>
        <div className="p-1.5 border-r border-black">
          <div className="text-[7px] uppercase text-gray-600">Dest</div>
          <div className="font-black text-[14px] leading-none">{destination}</div>
        </div>
        <div className="p-1.5 border-r border-black">
          <div className="text-[7px] uppercase text-gray-600">Flight</div>
          <div className="font-bold text-[12px]">{flight}</div>
        </div>
        <div className="p-1.5">
          <div className="text-[7px] uppercase text-gray-600">Date</div>
          <div className="font-bold text-[12px]">11MAY26</div>
        </div>
      </div>

      <div className="grid grid-cols-3 text-[9px] border-b-2 border-black">
        <div className="p-1.5 border-r border-black">
          <div className="text-[7px] uppercase text-gray-600">Pieces</div>
          <div className="font-bold">3</div>
        </div>
        <div className="p-1.5 border-r border-black">
          <div className="text-[7px] uppercase text-gray-600">Gross Wt</div>
          <div className="font-bold">47.5 KG</div>
        </div>
        <div className="p-1.5">
          <div className="text-[7px] uppercase text-gray-600">Chargeable</div>
          <div className="font-bold">52.0 KG</div>
        </div>
      </div>

      {/* Big route band */}
      <div className="px-3 py-2 border-b-2 border-black">
        <div className="flex items-end gap-2">
          <div className="leading-none">
            <span className="font-extrabold text-[26px] text-[#4D148C] tracking-tight">Fed</span>
            <span className="font-extrabold text-[26px] text-[#FF6600] tracking-tight">Ex</span>
            <div className="text-[8px] font-bold text-[#FF6600] -mt-0.5">Int'l Priority</div>
          </div>
          <div className="ml-auto border-2 border-black flex items-center justify-center w-12 h-12">
            <span className="font-black text-2xl">P</span>
          </div>
        </div>
        <div className="font-black text-[42px] leading-none mt-1 tracking-tight">
          {origin}-{destination}
        </div>
        <div className="flex justify-between items-center text-[9px] mt-1 border-t border-black pt-1">
          <span className="font-bold">SCC: GEN</span>
          <span>DG: NO</span>
          <span className="font-bold">Pkg 1 of 1</span>
        </div>
      </div>

      {/* Bottom barcode + QR */}
      <div className="p-2">
        <div className="flex items-center justify-between gap-2">
          <div className="flex-1">
            <FakeBarcode height={44} bars={56} seed={carrier === 'PNG Air' ? 19 : 23} />
            <div className="font-mono text-[9px] tracking-widest text-center mt-0.5">
              {prefix} {awbNumber} &nbsp; 1 1 &nbsp; {origin}01
            </div>
          </div>
          <FakeQR size={56} seed={carrier === 'PNG Air' ? 13 : 17} />
        </div>
        <div className="flex justify-between text-[8px] mt-1 font-semibold border-t border-black pt-1">
          <span>HAWB: PAF-2026-00184</span>
          <span>MAWB: {prefix}-{awbNumber}</span>
          <span>AGT: PNGAF</span>
        </div>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Section                                                              */
/* ------------------------------------------------------------------ */
const Labels: React.FC = () => {
  return (
    <section id="labels" className="py-20 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-12">
          <div className="text-sm font-semibold text-red-700 uppercase tracking-wider mb-2">05 — Barcode &amp; QR Labelling</div>
          <h2 className="text-4xl font-bold text-slate-900 mb-4">AWB Labels — FedEx Style 4&quot;×6&quot; Thermal</h2>
          <p className="text-slate-600 text-lg">
            All labels mirror the FedEx Express thermal layout: sender/recipient header, Code-128 tracking barcode, bold destination band with service indicator, and a QR-encoded payload at the foot for handheld scanners.
          </p>
        </div>

        {/* Three label mocks side-by-side */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Barcode className="w-5 h-5 text-red-700" />
              <h3 className="font-bold text-base">In-House AWB (Domestic)</h3>
            </div>
            <InHouseLabel />
            <div className="mt-3 text-xs text-slate-500">
              Generated on <code className="text-red-700">PAF Shipment.submit()</code>. Tracking# is auto-sequenced through the <code>PAF AWB Series</code> DocType.
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <Plane className="w-5 h-5 text-red-700" />
              <h3 className="font-bold text-base">PNG Air Cargo (CG-prefix)</h3>
            </div>
            <AirlineLabel
              carrier="PNG Air"
              prefix="CG"
              awbNumber="44 1234 5678"
              origin="POM"
              destination="LAE"
              flight="CG 102"
            />
            <div className="mt-3 text-xs text-slate-500">
              IATA 11-digit format: <code className="text-red-700">CG-441234567-8</code> with mod-7 check digit.
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <Plane className="w-5 h-5 text-red-700" />
              <h3 className="font-bold text-base">Air Niugini Cargo (PX 656-prefix)</h3>
            </div>
            <AirlineLabel
              carrier="Air Niugini"
              prefix="PX"
              awbNumber="56 1234 5671"
              origin="POM"
              destination="SYD"
              flight="PX 004"
            />
            <div className="mt-3 text-xs text-slate-500">
              International export to AU — PX <code className="text-red-700">656</code> airline prefix bound to Frappe <code>Airline</code> DocType.
            </div>
          </div>
        </div>

        {/* Anatomy callouts */}
        <Card className="p-6 bg-white mb-8">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <FileCode className="w-5 h-5 text-red-700" /> Label Anatomy (matches FedEx physical reference)
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            {[
              { n: '1', t: 'Sender / Origin Block', d: 'Origin ID, contact, ship date, weight, billing code (CAD).' },
              { n: '2', t: 'Recipient Block', d: 'Bold consignee name + destination, reference (PO/INV).' },
              { n: '3', t: 'Tracking Barcode', d: 'Code-128 with 12-digit FedEx-style tracking number under HRI text.' },
              { n: '4', t: 'Service Indicator', d: 'Boxed letter ("E", "P", "A2") prints the service product code.' },
              { n: '5', t: 'Destination Band', d: 'Large 44pt "DEST-CC" text — sortable from 2m at the hub belt.' },
              { n: '6', t: 'Routing Barcode', d: 'Code-128 with sort/pkg/origin (e.g. 8187…-1 1-POM01).' },
              { n: '7', t: 'QR Code', d: 'JSON payload — AWB, route, zone, pieces — signed with site key.' },
              { n: '8', t: 'Footer Strip', d: 'Service / Zone / Bin (in-house) or HAWB / MAWB / Agent (airline).' },
            ].map((b) => (
              <div key={b.n} className="border-l-4 border-red-600 pl-3">
                <div className="text-[10px] font-bold text-red-700">FIELD {b.n}</div>
                <div className="font-semibold text-slate-900">{b.t}</div>
                <div className="text-slate-600 text-xs mt-1">{b.d}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Generation Stack */}
        <Card className="p-8 bg-white">
          <div className="flex items-center gap-2 mb-4">
            <QrCode className="w-5 h-5 text-red-700" />
            <h3 className="font-bold text-lg">Generation Stack</h3>
          </div>
          <div className="grid md:grid-cols-4 gap-4 text-sm">
            <div>
              <div className="font-semibold text-slate-900 mb-1 flex items-center gap-1"><Barcode className="w-4 h-4" /> Barcode Engine</div>
              <p className="text-slate-600"><code className="text-red-700">python-barcode</code> + <code className="text-red-700">bwip-js</code> render Code-128C into PNG embedded into the Jinja Print Format.</p>
            </div>
            <div>
              <div className="font-semibold text-slate-900 mb-1 flex items-center gap-1"><QrCode className="w-4 h-4" /> QR Engine</div>
              <p className="text-slate-600"><code className="text-red-700">qrcode[pil]</code> generates QR PNG with JSON payload, signed by Frappe site key for tamper-proof scans.</p>
            </div>
            <div>
              <div className="font-semibold text-slate-900 mb-1 flex items-center gap-1"><Printer className="w-4 h-4" /> Printer Output</div>
              <p className="text-slate-600">ZPL II for Zebra ZT411 / GK420t (4×6&quot;) via CUPS direct-IP, with PDF fallback for office printers.</p>
            </div>
            <div>
              <div className="font-semibold text-slate-900 mb-1 flex items-center gap-1"><FileCode className="w-4 h-4" /> Templates</div>
              <p className="text-slate-600">Three Jinja templates: <code>paf_inhouse_awb.html</code>, <code>paf_png_air_awb.html</code>, <code>paf_air_niugini_awb.html</code>.</p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default Labels;
