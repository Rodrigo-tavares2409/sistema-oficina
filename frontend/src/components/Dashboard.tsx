import { useState } from 'react';
import {
  Search,
  Settings,
  Grid,
  Kanban,
  Plus,
  Package,
  HeartHandshake,
  Landmark,
  Building2,
  Cpu
} from 'lucide-react';
import KanbanBoard from './KanbanBoard';
import Overview from './Overview';
import Reception from './modules/Reception';
import Inventory from './modules/Inventory';
import CRM from './modules/CRM';
import Financial from './modules/Financial';
import FleetPortal from './modules/FleetPortal';
import TelemetryAI from './modules/TelemetryAI';

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
    <div className="flex h-screen bg-neutral-950 text-neutral-200 font-sans selection:bg-orange-500/30">
      {/* Sidebar - Smart Tabs */}
      <aside className="w-[280px] bg-neutral-900 border-r border-neutral-800 flex flex-col relative z-10">
        <div className="h-24 flex items-center px-8 border-b border-neutral-800">
          <div className="w-10 h-10 bg-orange-600 rounded-lg mr-4 flex items-center justify-center">
            <TriFoldIcon className="text-white w-6 h-6" />
          </div>
          <div>
             <span className="font-bold text-2xl tracking-tight text-white block leading-none" style={{ fontFamily: 'var(--font-heading)' }}>3Fold</span>
             <span className="text-xs text-orange-400 font-semibold uppercase tracking-widest mt-1 block">Mecânica</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-hide py-6">
          <nav className="px-6 space-y-1">
            <p className="px-4 text-xs font-bold text-neutral-500 uppercase tracking-wider mb-4 mt-2">Módulos Principais</p>
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
             <p className="px-4 text-xs font-bold text-neutral-500 uppercase tracking-wider mb-4">Administração</p>
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
        {/* Header - Ações Rápidas (Fat Finger Friendly) */}
        <header className="h-20 bg-neutral-900 border-b border-neutral-800 flex items-center justify-between px-10 sticky top-0 z-20">
          <div className="relative w-[420px]">
            <input
              type="text"
              placeholder="Placa, Cliente ou Código de Erro (OBD2)..."
              className="w-full pl-12 pr-5 py-3 bg-neutral-950 border border-neutral-800 rounded-lg text-sm font-medium focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500/50 transition-colors text-white placeholder-neutral-600"
            />
            <Search className="absolute left-4 top-3.5 text-neutral-600" size={17} />
          </div>

          {/* Quick Action Hub */}
          <div className="flex items-center gap-3">
             <button className="bg-neutral-950 hover:bg-neutral-800 text-neutral-300 px-4 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2 transition-colors border border-neutral-800">
              <Package size={16} /> Pedir Peça
            </button>
            <button className="bg-neutral-950 hover:bg-neutral-800 text-neutral-300 px-4 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2 transition-colors border border-neutral-800">
              <CameraIcon size={16} /> DVI Check-in
            </button>
            <button className="bg-orange-600 hover:bg-orange-500 text-white px-4 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors">
              <Plus size={16} strokeWidth={3} /> Orçamento Express
            </button>

            <div className="w-10 h-10 ml-3 bg-neutral-800 rounded-full border border-neutral-700 flex items-center justify-center cursor-pointer hover:border-neutral-600 transition-colors">
              <span className="font-bold text-neutral-300 text-sm">AD</span>
            </div>
          </div>
        </header>

        {/* Scrollable Area - Conteúdo Dinâmico Baseado na Aba */}
        <div className="flex-1 overflow-auto p-8 relative z-10">
          <div className="max-w-[1600px] mx-auto">

            {activeTab === 'Visão Geral' && <Overview />}
            {activeTab === 'Pátio' && <KanbanBoard />}
            {activeTab === 'Recepção' && <Reception />}
            {activeTab === 'Estoque' && <Inventory />}
            {activeTab === 'CRM' && <CRM />}
            {activeTab === 'Financeiro' && <Financial />}
            {activeTab === 'B2B' && <FleetPortal />}
            {activeTab === 'IA' && <TelemetryAI />}

            {activeTab === 'Config' && (
               <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-16 flex flex-col items-center justify-center text-center h-[60vh]">
                  <div className="w-16 h-16 bg-neutral-800 rounded-xl flex items-center justify-center mb-6">
                     <WrenchIcon className="text-neutral-500 w-8 h-8" />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-3">Módulo: {activeTab}</h2>
                  <p className="text-neutral-500 max-w-lg">
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
      className={`w-full flex items-center px-4 py-3 rounded-lg text-sm font-semibold transition-colors ${active ? 'bg-orange-600/10 text-orange-400' : 'text-neutral-400 hover:bg-neutral-800/60 hover:text-neutral-200'}`}
    >
      <span className={`mr-3.5 ${active ? 'text-orange-500' : ''}`}>{icon}</span> {label}
    </button>
  );
}

// Custom SVG Icons that aren't native in lucide or need a specific look
function TriFoldIcon(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3 L21 19 L3 19 Z"/><path d="M12 8 L17.5 17.5 L6.5 17.5 Z" opacity="0.5"/></svg>
}
function WrenchIcon(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
}
function ClipboardCheckIcon(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/></svg>
}
function CameraIcon(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
}
export default Dashboard;
