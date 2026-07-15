import { useState } from 'react';
import { 
  Search, 
  Settings, 
  Grid, 
  Kanban, 
  Users, 
  Car, 
  TrendingUp, 
  PackageMinus, 
  FileCheck,
  Plus,
  Briefcase,
  Wrench,
  Package,
  HeartHandshake,
  Landmark,
  Building2,
  Cpu
} from 'lucide-react';
import KanbanBoard from './KanbanBoard';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('Visão Geral');

  // As novas abas estruturadas com base no documento do usuário
  const menuItems = [
    { label: 'Visão Geral', icon: <Grid size={22} />, id: 'Visão Geral' },
    { label: 'Recepção (Check-in)', icon: <ClipboardCheckIcon size={22} />, id: 'Recepção' },
    { label: 'Pátio & Produção', icon: <Kanban size={22} />, id: 'Pátio' },
    { label: 'Estoque & Compras', icon: <Package size={22} />, id: 'Estoque' },
    { label: 'CRM & Pós-Venda', icon: <HeartHandshake size={22} />, id: 'CRM' },
    { label: 'Financeiro', icon: <Landmark size={22} />, id: 'Financeiro' },
    { label: 'Portal Frotistas (B2B)', icon: <Building2 size={22} />, id: 'B2B' },
  ];

  const configItems = [
    { label: 'Telemetria & IA', icon: <Cpu size={22} />, id: 'IA' },
    { label: 'Configurações', icon: <Settings size={22} />, id: 'Config' },
  ];

  return (
    <div className="flex h-screen bg-slate-950 text-slate-200 font-sans selection:bg-blue-500/30">
      {/* Sidebar - Smart Tabs */}
      <aside className="w-[300px] bg-slate-900 border-r border-slate-800 flex flex-col relative z-10">
        <div className="h-24 flex items-center px-8 border-b border-slate-800/50">
          <div className="w-10 h-10 bg-blue-600 rounded-xl mr-4 shadow-lg shadow-blue-500/20 flex items-center justify-center">
            <WrenchIcon className="text-white w-6 h-6" />
          </div>
          <div>
             <span className="font-bold text-2xl tracking-tight text-white block leading-none">AutoSmart</span>
             <span className="text-xs text-blue-400 font-semibold uppercase tracking-widest mt-1 block">Oficina Inteligente</span>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto scrollbar-hide py-6">
          <nav className="px-6 space-y-1">
            <p className="px-4 text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 mt-2">Módulos Principais</p>
            {menuItems.map(item => (
              <NavItem 
                key={item.id}
                icon={item.icon} 
                label={item.label} 
                active={activeTab === item.id}
                onClick={() => setActiveTab(item.id)}
              />
            ))}
          </nav>

          <nav className="px-6 space-y-1 mt-8">
             <p className="px-4 text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Administração</p>
             {configItems.map(item => (
               <NavItem 
                 key={item.id}
                 icon={item.icon} 
                 label={item.label} 
                 active={activeTab === item.id}
                 onClick={() => setActiveTab(item.id)}
               />
             ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>

        {/* Header - Ações Rápidas (Fat Finger Friendly) */}
        <header className="h-24 bg-slate-900/50 backdrop-blur-md border-b border-slate-800/50 flex items-center justify-between px-10 sticky top-0 z-20">
          <div className="relative w-[480px]">
            <input 
              type="text" 
              placeholder="Placa, Cliente ou Código de Erro (OBD2)..." 
              className="w-full pl-14 pr-6 py-4 bg-slate-800 border border-slate-700 rounded-2xl text-base font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-inner text-white placeholder-slate-400"
            />
            <Search className="absolute left-5 top-4.5 text-slate-400" size={20} />
          </div>
          
          {/* Quick Action Hub */}
          <div className="flex items-center gap-4">
             <button className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-5 py-3.5 rounded-xl font-bold flex items-center gap-2 transition-all border border-slate-700 hover:border-slate-500">
              <Package size={20} /> Pedir Peça
            </button>
            <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-emerald-600/20 hover:scale-105 active:scale-95">
              <CameraIcon size={20} /> DVI Check-in (OCR)
            </button>
            <button className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-blue-600/20 hover:scale-105 active:scale-95">
              <Plus size={20} strokeWidth={3} /> Orçamento Express
            </button>
            
            <div className="w-12 h-12 ml-4 bg-slate-800 rounded-full border-2 border-slate-700 flex items-center justify-center cursor-pointer hover:border-slate-500 transition-colors">
              <span className="font-bold text-slate-300">AD</span>
            </div>
          </div>
        </header>

        {/* Scrollable Area - Conteúdo Dinâmico Baseado na Aba */}
        <div className="flex-1 overflow-auto p-10 relative z-10">
          <div className="max-w-[1600px] mx-auto space-y-10">
            
            {activeTab === 'Visão Geral' && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  <KpiCard 
                    title="Faturamento (Hoje)" 
                    value="R$ 12.450,00" 
                    trend="+15%" 
                    icon={<TrendingUp className="text-emerald-400" size={24} />} 
                  />
                  <KpiCard 
                    title="Ticket Médio" 
                    value="R$ 850,00" 
                    trend="+5%" 
                    icon={<TrendingUp className="text-emerald-400" size={24} />} 
                  />
                  <KpiCard 
                    title="Aprovação de Orçamentos" 
                    value="78%" 
                    subtitle="Via WhatsApp Link" 
                    icon={<CheckBadgeIcon className="text-blue-400" size={24} />} 
                  />
                  <KpiCard 
                    title="Alertas Críticos" 
                    value="3 Peças" 
                    subtitle="Faltando p/ OS Ativas" 
                    icon={<PackageMinus className="text-rose-400" size={24} />} 
                    alert
                  />
                </div>
                
                {/* Opcional: um preview do pátio aqui na visão geral */}
                <div className="mt-8">
                   <h2 className="text-xl font-bold text-white mb-6">Visão Resumida do Pátio (Hoje)</h2>
                   <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 flex items-center justify-center text-slate-500 h-40">
                      [Gráficos de Ocupação dos Elevadores entrarão aqui]
                   </div>
                </div>
              </>
            )}

            {activeTab === 'Pátio' && (
               <KanbanBoard />
            )}

            {activeTab !== 'Visão Geral' && activeTab !== 'Pátio' && (
               <div className="bg-slate-900 border border-slate-800 rounded-3xl p-16 flex flex-col items-center justify-center text-center h-[60vh]">
                  <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mb-6">
                     <WrenchIcon className="text-slate-500 w-10 h-10" />
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-4">Módulo: {activeTab}</h2>
                  <p className="text-slate-400 max-w-lg text-lg">
                    A interface deste módulo está sendo construída. Ela seguirá os princípios de 
                    alta velocidade, legibilidade extrema e inteligência automatizada.
                  </p>
               </div>
            )}

          </div>
        </div>
      </main>
    </div>
  );
};

// Helper Components
function NavItem({ icon, label, active = false, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center px-4 py-3.5 rounded-xl font-semibold transition-all ${active ? 'bg-blue-600/10 text-blue-400 shadow-inner' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}
    >
      <span className={`mr-4 ${active ? 'text-blue-500' : ''}`}>{icon}</span> {label}
    </button>
  );
}

function KpiCard({ title, value, trend, subtitle, icon, alert = false }: any) {
  return (
    <div className={`p-8 rounded-3xl border shadow-xl bg-slate-900 ${alert ? 'border-rose-900/50 shadow-rose-900/10' : 'border-slate-800'}`}>
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-slate-400 font-semibold">{title}</h3>
        <div className={`p-2 rounded-lg ${alert ? 'bg-rose-950/50' : 'bg-slate-800'}`}>{icon}</div>
      </div>
      <div className="flex items-baseline gap-3">
        <span className={`text-3xl font-black tracking-tight ${alert ? 'text-rose-400' : 'text-white'}`}>{value}</span>
        {trend && (
          <span className="text-sm font-bold text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-md">
            {trend}
          </span>
        )}
        {subtitle && (
          <span className={`text-sm font-semibold ${alert ? 'text-rose-500/70' : 'text-slate-500'}`}>
            {subtitle}
          </span>
        )}
      </div>
    </div>
  );
}

// Custom SVG Icons that aren't native in lucide or need a specific look
function WrenchIcon(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
}
function ClipboardCheckIcon(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/></svg>
}
function CameraIcon(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
}
function CheckBadgeIcon(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22l-3.17-1.12-3.32.48-.96-3.23L1.5 15l2.25-2.5L1.5 10l3.05-3.13.96-3.23 3.32.48L12 3l3.17 1.12 3.32-.48.96 3.23L22.5 10l-2.25 2.5 2.25 2.5-3.05 3.13-.96 3.23-3.32-.48L12 22z"/><path d="M9 12l2 2 4-4"/></svg>
}

export default Dashboard;
