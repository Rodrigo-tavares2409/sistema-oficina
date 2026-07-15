import { Package, AlertTriangle, ShoppingCart, DollarSign } from 'lucide-react';
import { Card, PageHeader, MiniKpi, Tag } from '../ui';

const parts = [
  { name: 'Pastilha de freio dianteira', category: 'Freios', stock: 2, min: 8, supplier: 'AutoPeças Center' },
  { name: 'Óleo 5W30 sintético (L)', category: 'Lubrificantes', stock: 34, min: 15, supplier: 'Lubrimax' },
  { name: 'Filtro de ar', category: 'Motor', stock: 11, min: 10, supplier: 'AutoPeças Center' },
  { name: 'Correia dentada', category: 'Motor', stock: 3, min: 5, supplier: 'Distribel' },
  { name: 'Amortecedor traseiro', category: 'Suspensão', stock: 6, min: 4, supplier: 'Distribel' },
  { name: 'Bateria 60Ah', category: 'Elétrica', stock: 9, min: 6, supplier: 'Voltz Baterias' },
  { name: 'Pastilha de freio traseira', category: 'Freios', stock: 14, min: 8, supplier: 'AutoPeças Center' },
];

function statusOf(stock: number, min: number) {
  if (stock <= min * 0.4) return { label: 'Crítico', tone: 'risco' as const };
  if (stock <= min) return { label: 'Baixo', tone: 'due' as const };
  return { label: 'OK', tone: 'up' as const };
}

const suggestions = [
  { part: 'Pastilha de freio dianteira', qty: 12, supplier: 'AutoPeças Center', eta: '2 dias úteis' },
  { part: 'Correia dentada', qty: 6, supplier: 'Distribel', eta: '3 dias úteis' },
];

const Inventory = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Estoque & Compras"
        subtitle="Nível de peças em tempo real e reposição sugerida automaticamente."
        action={
          <button className="bg-orange-600 hover:bg-orange-500 text-white px-4 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors">
            <ShoppingCart size={16} /> Novo Pedido
          </button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <MiniKpi label="Itens em Estoque" value="248" icon={<Package size={18} />} />
        <MiniKpi label="Abaixo do Mínimo" value="3 itens" icon={<AlertTriangle size={18} />} tone="alert" />
        <MiniKpi label="Pedidos em Aberto" value="2" icon={<ShoppingCart size={18} />} />
        <MiniKpi label="Valor em Estoque" value="R$ 86.200" icon={<DollarSign size={18} />} tone="good" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <h3 className="text-white font-semibold mb-1">Peças e Materiais</h3>
          <p className="text-neutral-500 text-sm mb-5">Ordenado por criticidade de estoque</p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-neutral-500 text-xs uppercase tracking-wide">
                  <th className="pb-3 font-semibold">Peça</th>
                  <th className="pb-3 font-semibold">Categoria</th>
                  <th className="pb-3 font-semibold">Estoque</th>
                  <th className="pb-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {parts
                  .slice()
                  .sort((a, b) => a.stock / a.min - b.stock / b.min)
                  .map((p) => {
                    const s = statusOf(p.stock, p.min);
                    return (
                      <tr key={p.name} className="border-t border-neutral-800">
                        <td className="py-3 font-semibold text-white">{p.name}</td>
                        <td className="py-3 text-neutral-400">{p.category}</td>
                        <td className="py-3 text-neutral-300 font-mono">{p.stock} un.</td>
                        <td className="py-3"><Tag tone={s.tone}>{s.label}</Tag></td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="lg:col-span-1">
          <h3 className="text-white font-semibold mb-1">Sugestões de Compra</h3>
          <p className="text-neutral-500 text-sm mb-5">Geradas automaticamente pelo sistema</p>

          <div className="space-y-3">
            {suggestions.map((s) => (
              <div key={s.part} className="bg-neutral-950/60 border border-neutral-800 rounded-xl p-4">
                <p className="text-sm font-bold text-white">{s.part}</p>
                <p className="text-xs text-neutral-500 mt-1">{s.qty} un. · {s.supplier}</p>
                <p className="text-xs text-orange-400 mt-2 font-semibold">Entrega em {s.eta}</p>
              </div>
            ))}
            <button className="w-full bg-neutral-800 hover:bg-neutral-700 text-neutral-200 py-2.5 rounded-lg text-sm font-semibold transition-colors">
              Aprovar todos os pedidos
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Inventory;
