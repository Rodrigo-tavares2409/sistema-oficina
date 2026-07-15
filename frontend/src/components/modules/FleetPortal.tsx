import { Building2, Truck, FileCheck2, AlertTriangle } from 'lucide-react';
import { Card, PageHeader, MiniKpi, Tag } from '../ui';

const companies = [
  { name: 'Transportadora Rota Sul', vehicles: 18, upToDate: 15, pending: 3, contact: 'financeiro@rotasul.com.br' },
  { name: 'Distribuidora Nortemix', vehicles: 9, upToDate: 9, pending: 0, contact: 'frota@nortemix.com.br' },
  { name: 'Grupo Vale Logística', vehicles: 27, upToDate: 21, pending: 6, contact: 'manutencao@valelog.com.br' },
];

const fleet = [
  { vehicle: 'Fiat Strada', plate: 'STU-1290', status: 'up' as const, label: 'Em dia' },
  { vehicle: 'Renault Kwid', plate: 'VWX-5567', status: 'due' as const, label: 'Revisão em 5 dias' },
  { vehicle: 'Chevrolet Onix', plate: 'MNO-4471', status: 'up' as const, label: 'Em dia' },
  { vehicle: 'VW Saveiro', plate: 'RTY-2298', status: 'risco' as const, label: 'Revisão atrasada' },
];

const FleetPortal = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Portal Frotistas (B2B)"
        subtitle="Empresas com frota própria acompanham cada veículo, sem precisar ligar."
        action={
          <button className="bg-orange-600 hover:bg-orange-500 text-white px-4 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors">
            <Building2 size={16} /> Nova Empresa
          </button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <MiniKpi label="Empresas Parceiras" value="3" icon={<Building2 size={18} />} />
        <MiniKpi label="Veículos Monitorados" value="54" icon={<Truck size={18} />} />
        <MiniKpi label="Revisões em Dia" value="45" icon={<FileCheck2 size={18} />} tone="good" />
        <MiniKpi label="Pendências" value="9 veículos" icon={<AlertTriangle size={18} />} tone="alert" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <h3 className="text-white font-semibold mb-1">Empresas Parceiras</h3>
          <p className="text-neutral-500 text-sm mb-5">Contratos ativos de frota</p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-neutral-500 text-xs uppercase tracking-wide">
                  <th className="pb-3 font-semibold">Empresa</th>
                  <th className="pb-3 font-semibold">Veículos</th>
                  <th className="pb-3 font-semibold">Em dia</th>
                  <th className="pb-3 font-semibold">Pendentes</th>
                </tr>
              </thead>
              <tbody>
                {companies.map((c) => (
                  <tr key={c.name} className="border-t border-neutral-800">
                    <td className="py-3">
                      <p className="font-semibold text-white">{c.name}</p>
                      <p className="text-xs text-neutral-500">{c.contact}</p>
                    </td>
                    <td className="py-3 text-neutral-300 font-mono">{c.vehicles}</td>
                    <td className="py-3 text-emerald-400 font-mono">{c.upToDate}</td>
                    <td className="py-3 font-mono">
                      {c.pending > 0 ? <span className="text-rose-400">{c.pending}</span> : <span className="text-neutral-600">0</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="lg:col-span-1">
          <h3 className="text-white font-semibold mb-1">Grupo Vale Logística</h3>
          <p className="text-neutral-500 text-sm mb-5">Frota em detalhe</p>

          <div className="space-y-3">
            {fleet.map((f) => (
              <div key={f.plate} className="flex items-center justify-between bg-neutral-950/60 border border-neutral-800 rounded-xl p-3.5">
                <div>
                  <p className="text-sm font-bold text-white">{f.vehicle}</p>
                  <p className="text-xs text-neutral-500 font-mono">{f.plate}</p>
                </div>
                <Tag tone={f.status}>{f.label}</Tag>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default FleetPortal;
