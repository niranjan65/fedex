import React from 'react';
import { Card } from '@/components/ui/card';
import { MapPin, Truck, User, Route as RouteIcon } from 'lucide-react';

const Routing: React.FC = () => {
  const zones = [
    { name: 'POM-Z1 Downtown', area: 'Town, Konedobu, Koki', cap: '180 stops/day' },
    { name: 'POM-Z2 Boroko', area: 'Boroko, Gordons, Hohola', cap: '220 stops/day' },
    { name: 'POM-Z3 Waigani', area: 'Waigani, Tokarara, Gerehu', cap: '160 stops/day' },
    { name: 'POM-Z4 7-Mile', area: '7-Mile, 9-Mile, Airport', cap: '140 stops/day' },
    { name: 'LAE-Z1 CBD', area: 'Top Town, China Town', cap: '120 stops/day' },
    { name: 'LAE-Z2 Industrial', area: 'Voco Point, Eriku', cap: '150 stops/day' },
  ];

  const vehicles = [
    { rego: 'BCM-123', type: '3-Ton Truck', cap: '3000 kg / 12m³', driver: 'John Kila', zone: 'POM-Z1' },
    { rego: 'BAX-887', type: 'Van', cap: '1200 kg / 6m³', driver: 'Peter Mond', zone: 'POM-Z2' },
    { rego: 'CDN-441', type: 'Hilux 4x4', cap: '800 kg / 3m³', driver: 'Mary Tau', zone: 'POM-Z3' },
    { rego: 'BLA-205', type: '5-Ton Truck', cap: '5000 kg / 20m³', driver: 'Samuel Aiwa', zone: 'POM-Z4' },
  ];

  return (
    <section id="routing" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-12">
          <div className="text-sm font-semibold text-red-700 uppercase tracking-wider mb-2">04 — Route, Zone, Vehicle &amp; Driver</div>
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Local Dispatch &amp; Assignment</h2>
          <p className="text-slate-600 text-lg">
            A rules-based dispatcher matches each Pickup/Delivery to a Zone, then to an available Vehicle (capacity + type) and Driver
            (license + roster). All assignments are recorded on the daily <code className="text-red-700 bg-red-50 px-1.5 py-0.5 rounded text-sm">Delivery Run</code> DocType.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-10">
          {/* Zone Cards */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-red-700" />
              <h3 className="font-bold text-lg">Delivery Zones (Sample)</h3>
            </div>
            <div className="space-y-2">
              {zones.map((z) => (
                <div key={z.name} className="flex items-center justify-between p-3 bg-slate-50 rounded-md border border-slate-200">
                  <div>
                    <div className="font-medium text-slate-900 text-sm">{z.name}</div>
                    <div className="text-xs text-slate-500">{z.area}</div>
                  </div>
                  <span className="text-xs font-medium text-red-700 bg-red-50 px-2 py-1 rounded">{z.cap}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Vehicle Cards */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Truck className="w-5 h-5 text-red-700" />
              <h3 className="font-bold text-lg">Fleet Assignment (Sample)</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs uppercase text-slate-500 border-b">
                    <th className="py-2">Rego</th>
                    <th className="py-2">Type</th>
                    <th className="py-2">Driver</th>
                    <th className="py-2">Zone</th>
                  </tr>
                </thead>
                <tbody>
                  {vehicles.map((v) => (
                    <tr key={v.rego} className="border-b border-slate-100">
                      <td className="py-3 font-mono text-xs">{v.rego}</td>
                      <td className="py-3 text-slate-700">{v.type}</td>
                      <td className="py-3 text-slate-700 flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {v.driver}
                      </td>
                      <td className="py-3">
                        <span className="text-xs bg-orange-50 text-orange-700 px-2 py-1 rounded">{v.zone}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Assignment Algorithm */}
        <Card className="p-8 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
          <div className="flex items-center gap-2 mb-4">
            <RouteIcon className="w-5 h-5 text-orange-300" />
            <h3 className="font-bold text-lg">Auto-Assignment Algorithm (Server Script)</h3>
          </div>
          <pre className="text-xs md:text-sm font-mono leading-relaxed overflow-x-auto text-slate-100">{`# png_freight/api.py
@frappe.whitelist()
def assign_pickup(pickup_name):
    pickup = frappe.get_doc("Pickup Request", pickup_name)

    # 1. Resolve Zone from suburb/postcode mapping
    zone = frappe.db.get_value("Zone Mapping",
        {"suburb": pickup.pickup_suburb}, "zone")

    # 2. Find candidate Vehicles (capacity >= weight, type ok, on shift today)
    vehicles = frappe.db.sql("""
        SELECT v.name, v.capacity_kg, d.driver_name
        FROM \`tabVehicle\` v
        JOIN \`tabDriver\` d ON d.name = v.assigned_driver
        WHERE v.assigned_zone = %s
          AND v.capacity_kg >= %s
          AND v.status = 'Available'
          AND d.on_duty_date = CURDATE()
        ORDER BY v.current_load_kg ASC LIMIT 1
    """, (zone, pickup.total_weight), as_dict=True)

    if not vehicles:
        frappe.throw(_("No vehicle available in zone {0}").format(zone))

    # 3. Append to today's Delivery Run for that vehicle
    run = get_or_create_delivery_run(vehicles[0].name)
    run.append("stops", {"pickup_request": pickup_name, "stop_type": "Pickup"})
    run.save()

    pickup.db_set("status", "Assigned")
    return run.name`}</pre>
        </Card>
      </div>
    </section>
  );
};

export default Routing;
