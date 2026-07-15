import {
  TrendingUp,
  TrendingDown,
  PackageMinus,
  CheckCircle2,
  Wrench,
  MessageCircle,
  ArrowUpRight,
  UserCheck,
  CarFront,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

// ---------------------------------------------------------------------------
// Dados fictícios para demonstração
// ---------------------------------------------------------------------------

const revenueData = [
  { day: '01/07', valor: 8200 },
  { day: '02/07', valor: 9100 },
  { day: '03/07', valor: 7600 },
  { day: '04/07', valor: 10400 },
  { day: '05/07', valor: 11200 },
  { day: '06/07', valor: 6800 },
  { day: '07/07', valor: 5900 },
  { day: '08/07', valor: 9800 },
  { day: '09/07', valor: 12100 },
  { day: '10/07', valor: 13400 },
  { day: '11/07', valor: 11900 },
  { day: '12/07', valor: 14200 },
  { day: '13/07', valor: 10600 },
  { day: '14/07', valor: 12450 },
];

const statusData = [
  { name: 'Aguardando', value: 6, color: '#737373' },
  { name: 'Em Análise', value: 3, color: '#FDBA74' },
  { name: 'Orçamento Enviado', value: 5, color: '#FBBF24' },
  { name: 'Em Execução', value: 4, color: '#FF6B1A' },
  { name: 'Finalizado', value: 12, color: '#34D399' },
];

const bays = [
  { label: 'Elevador 01', vehicle: 'Honda Civic — ABC-1234', occupancy: 90 },
  { label: 'Elevador 02', vehicle: 'VW Polo — XYZ-9876', occupancy: 65 },
  { label: 'Elevador 03', vehicle: 'Livre', occupancy: 0 },
  { label: 'Elevador 04', vehicle: 'Toyota Corolla — GHI-9012', occupancy: 30 },
  { label: 'Box Alinhamento', vehicle: 'Ford Ka — DEF-5555', occupancy: 55 },
  { label: 'Box Lavagem', vehicle: 'Jeep Compass — JKL-3344', occupancy: 15 },
];

const mechanics = [
  { name: 'Rafael Souza', initials: 'RS', completed: 18, efficiency: 96 },
  { name: 'Bruno Lima', initials: 'BL', completed: 15, efficiency: 88 },
  { name: 'Diego Alves', initials: 'DA', completed: 12, efficiency: 81 },
  { name: 'Marcos Vieira', initials: 'MV', completed: 9, efficiency: 74 },
];

const activity = [
  { icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-500/10', text: 'OS #1041 finalizada — Toyota Corolla (Ana Clara)', time: 'há 8 min' },
  { icon: MessageCircle, color: 'text-orange-400', bg: 'bg-orange-500/10', text: 'Orçamento enviado via WhatsApp — OS #1045', time: 'há 22 min' },
  { icon: UserCheck, color: 'text-sky-300', bg: 'bg-sky-400/10', text: 'Novo cliente cadastrado — Patrícia Nogueira', time: 'há 41 min' },
  { icon: PackageMinus, color: 'text-rose-400', bg: 'bg-rose-500/10', text: 'Estoque crítico: Pastilha de freio dianteira (2 un.)', time: 'há 1h' },
  { icon: Wrench, color: 'text-neutral-300', bg: 'bg-neutral-500/10', text: 'OS #1043 movida para "Em Execução"', time: 'há 1h 30min' },
  { icon: CarFront, color: 'text-orange-400', bg: 'bg-orange-500/10', text: 'Check-in realizado — VW Polo Highline (Maria Souza)', time: 'há 2h' },
];

const currency = (v: number) =>
  v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });

const Overview = () => {
  return (
    <div className="space-y-8">
      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <KpiCard
          title="Faturamento (Hoje)"
          value="R$ 12.450"
          trend="+15%"
          trendUp
          icon={<TrendingUp size={20} />}
        />
        <KpiCard
          title="Ticket Médio"
          value="R$ 850"
          trend="+5%"
          trendUp
          icon={<TrendingUp size={20} />}
        />
        <KpiCard
          title="Aprovação de Orçamentos"
          value="78%"
          subtitle="Via WhatsApp Link"
          icon={<CheckCircle2 size={20} />}
        />
        <KpiCard
          title="Alertas Críticos"
          value="3 Peças"
          subtitle="Faltando p/ OS Ativas"
          icon={<PackageMinus size={20} />}
          alert
        />
      </div>

      {/* Faturamento + Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-white font-semibold text-lg">Faturamento — Últimos 14 dias</h3>
              <p className="text-neutral-500 text-sm mt-1">Total acumulado no período: <span className="text-neutral-300 font-semibold">{currency(revenueData.reduce((a, b) => a + b.valor, 0))}</span></p>
            </div>
            <span className="flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-400/10 px-3 py-1.5 rounded-full">
              <ArrowUpRight size={14} /> 12,4% vs. período anterior
            </span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 4, right: 4, left: 4, bottom: 0 }}>
                <defs>
                  <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#FF6B1A" stopOpacity={0.28} />
                    <stop offset="100%" stopColor="#FF6B1A" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#262626" vertical={false} />
                <XAxis
                  dataKey="day"
                  tick={{ fill: '#737373', fontSize: 12 }}
                  axisLine={{ stroke: '#262626' }}
                  tickLine={false}
                  interval={1}
                />
                <YAxis
                  tick={{ fill: '#737373', fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `${v / 1000}k`}
                  width={36}
                />
                <Tooltip
                  contentStyle={{ background: '#171717', border: '1px solid #262626', borderRadius: 12, fontSize: 13 }}
                  labelStyle={{ color: '#e5e5e5', fontWeight: 600 }}
                  itemStyle={{ color: '#FF8C42' }}
                  formatter={(v: any) => [currency(Number(v)), 'Faturamento']}
                />
                <Area type="monotone" dataKey="valor" stroke="#FF6B1A" strokeWidth={2.5} fill="url(#revenueFill)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <h3 className="text-white font-semibold text-lg mb-1">OS por Status</h3>
          <p className="text-neutral-500 text-sm mb-4">30 ordens de serviço ativas</p>
          <div className="h-40 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={48}
                  outerRadius={68}
                  paddingAngle={3}
                  stroke="none"
                >
                  {statusData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-black text-white">30</span>
              <span className="text-[11px] text-neutral-500 font-medium">OS ativas</span>
            </div>
          </div>
          <div className="space-y-2.5 mt-4">
            {statusData.map((s) => (
              <div key={s.name} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-neutral-400">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: s.color }} />
                  {s.name}
                </span>
                <span className="text-neutral-200 font-semibold">{s.value}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Pátio + Mecânicos + Atividade */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <h3 className="text-white font-semibold text-lg mb-1">Ocupação do Pátio</h3>
          <p className="text-neutral-500 text-sm mb-5">4 de 6 posições ocupadas agora</p>
          <div className="space-y-4">
            {bays.map((bay) => (
              <div key={bay.label}>
                <div className="flex items-center justify-between text-sm mb-1.5">
                  <span className="text-neutral-300 font-medium">{bay.label}</span>
                  <span className="text-neutral-500">{bay.occupancy}%</span>
                </div>
                <div className="w-full bg-neutral-800 rounded-full h-1.5">
                  <div
                    className={`h-1.5 rounded-full ${bay.occupancy === 0 ? 'bg-neutral-700' : 'bg-orange-500'}`}
                    style={{ width: `${bay.occupancy}%` }}
                  />
                </div>
                <p className="text-xs text-neutral-600 mt-1 truncate">{bay.vehicle}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="lg:col-span-1">
          <h3 className="text-white font-semibold text-lg mb-1">Ranking de Mecânicos</h3>
          <p className="text-neutral-500 text-sm mb-5">OS concluídas — mês atual</p>
          <div className="space-y-5">
            {mechanics.map((m, i) => (
              <div key={m.name} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center text-xs font-bold text-neutral-300 shrink-0">
                  {m.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold text-neutral-200 truncate">{i === 0 && '🏆 '}{m.name}</span>
                    <span className="text-xs text-neutral-500 shrink-0 ml-2">{m.completed} OS</span>
                  </div>
                  <div className="w-full bg-neutral-800 rounded-full h-1.5">
                    <div className="h-1.5 rounded-full bg-orange-500" style={{ width: `${m.efficiency}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="lg:col-span-1">
          <h3 className="text-white font-semibold text-lg mb-1">Atividade Recente</h3>
          <p className="text-neutral-500 text-sm mb-5">Últimos eventos do sistema</p>
          <div className="space-y-4">
            {activity.map((a, i) => {
              const Icon = a.icon;
              return (
                <div key={i} className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-lg ${a.bg} flex items-center justify-center shrink-0 mt-0.5`}>
                    <Icon size={15} className={a.color} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm text-neutral-300 leading-snug">{a.text}</p>
                    <span className="text-xs text-neutral-600">{a.time}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Componentes de apoio
// ---------------------------------------------------------------------------

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-neutral-900/60 border border-neutral-800 rounded-2xl p-6 ${className}`}>
      {children}
    </div>
  );
}

function KpiCard({ title, value, trend, trendUp, subtitle, icon, alert = false }: any) {
  return (
    <div className={`relative p-6 rounded-2xl border bg-neutral-900/60 overflow-hidden ${alert ? 'border-rose-900/40' : 'border-neutral-800'}`}>
      <span className={`absolute left-0 top-0 h-full w-[3px] ${alert ? 'bg-rose-500' : 'bg-orange-500'}`} />
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-neutral-400 text-sm font-semibold">{title}</h3>
        <div className={`${alert ? 'text-rose-400' : 'text-orange-400'}`}>{icon}</div>
      </div>
      <div className="flex items-baseline gap-2 flex-wrap">
        <span className={`text-2xl font-black tracking-tight ${alert ? 'text-rose-400' : 'text-white'}`}>{value}</span>
        {trend && (
          <span className={`text-xs font-bold flex items-center gap-0.5 px-2 py-0.5 rounded-md ${trendUp ? 'text-emerald-400 bg-emerald-400/10' : 'text-rose-400 bg-rose-400/10'}`}>
            {trendUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />} {trend}
          </span>
        )}
        {subtitle && <span className="text-xs font-medium text-neutral-500">{subtitle}</span>}
      </div>
    </div>
  );
}

export default Overview;
