import { Wallet, TrendingUp, TrendingDown, Clock3 } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Card, PageHeader, MiniKpi, Tag } from '../ui';

const cashflow = [
  { month: 'Fev', receita: 142000, despesa: 98000 },
  { month: 'Mar', receita: 156000, despesa: 101000 },
  { month: 'Abr', receita: 138000, despesa: 104000 },
  { month: 'Mai', receita: 168000, despesa: 112000 },
  { month: 'Jun', receita: 174000, despesa: 109000 },
  { month: 'Jul', receita: 189000, despesa: 118000 },
];

const transactions = [
  { date: '14/07', desc: 'OS #1041 — Toyota Corolla', category: 'Serviço', value: 1240, type: 'in' as const },
  { date: '14/07', desc: 'Fornecedor AutoPeças Center', category: 'Peças', value: -3400, type: 'out' as const },
  { date: '13/07', desc: 'OS #1039 — VW Polo', category: 'Serviço', value: 890, type: 'in' as const },
  { date: '13/07', desc: 'Folha de pagamento', category: 'Pessoal', value: -18200, type: 'out' as const },
  { date: '12/07', desc: 'OS #1037 — Honda HR-V', category: 'Serviço', value: 2150, type: 'in' as const },
];

const currency = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });

const Financial = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Financeiro"
        subtitle="Caixa, contas e margem por ordem de serviço — sem depender de planilha."
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <MiniKpi label="Receita (Mês)" value="R$ 189.000" icon={<TrendingUp size={18} />} tone="good" />
        <MiniKpi label="Despesas (Mês)" value="R$ 118.000" icon={<TrendingDown size={18} />} tone="alert" />
        <MiniKpi label="Lucro Líquido" value="R$ 71.000" icon={<Wallet size={18} />} tone="good" />
        <MiniKpi label="A Receber" value="R$ 24.300" icon={<Clock3 size={18} />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <h3 className="text-white font-semibold mb-1">Receita x Despesa — 6 meses</h3>
          <p className="text-neutral-500 text-sm mb-5">Comparativo mensal</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cashflow} margin={{ top: 4, right: 4, left: 4, bottom: 0 }} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="#262626" vertical={false} />
                <XAxis dataKey="month" tick={{ fill: '#737373', fontSize: 12 }} axisLine={{ stroke: '#262626' }} tickLine={false} />
                <YAxis tick={{ fill: '#737373', fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v / 1000}k`} width={36} />
                <Tooltip
                  contentStyle={{ background: '#171717', border: '1px solid #262626', borderRadius: 12, fontSize: 13 }}
                  labelStyle={{ color: '#e5e5e5', fontWeight: 600 }}
                  formatter={(v: any) => [currency(Number(v)), '']}
                />
                <Bar dataKey="receita" fill="#FF6B1A" radius={[3, 3, 0, 0]} name="Receita" />
                <Bar dataKey="despesa" fill="#525252" radius={[3, 3, 0, 0]} name="Despesa" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="lg:col-span-1">
          <h3 className="text-white font-semibold mb-1">Últimas Transações</h3>
          <p className="text-neutral-500 text-sm mb-5">Atualizado em tempo real</p>

          <div className="space-y-3">
            {transactions.map((t, i) => (
              <div key={i} className="flex items-center justify-between gap-3 bg-neutral-950/60 border border-neutral-800 rounded-xl p-3.5">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-white truncate">{t.desc}</p>
                  <p className="text-xs text-neutral-500 mt-0.5">{t.date} · {t.category}</p>
                </div>
                <span className={`text-sm font-bold font-mono shrink-0 ${t.type === 'in' ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {t.type === 'in' ? '+' : ''}{currency(t.value)}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-end">
            <Tag tone="up">Caixa saudável</Tag>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Financial;
