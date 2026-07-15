import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Clock, CheckCircle2, Wrench, AlertTriangle, PenTool } from 'lucide-react';

type OSStatus = 'WAITING' | 'ANALYZING' | 'BUDGET_SENT' | 'IN_PROGRESS' | 'COMPLETED';

interface ServiceOrder {
  id: string;
  vehicle: string;
  plate: string;
  status: OSStatus;
  customer: string;
  urgent?: boolean;
  progress?: number;
}

const initialOS: ServiceOrder[] = [
  { id: '1042', vehicle: 'Honda Civic Touring', plate: 'ABC-1234', status: 'WAITING', customer: 'João Silva', urgent: true },
  { id: '1043', vehicle: 'VW Polo Highline', plate: 'XYZ-9876', status: 'IN_PROGRESS', customer: 'Maria Souza', progress: 65 },
  { id: '1044', vehicle: 'Ford Ka SE', plate: 'DEF-5555', status: 'WAITING', customer: 'Carlos Mendes' },
  { id: '1045', vehicle: 'Toyota Corolla Altis', plate: 'GHI-9012', status: 'BUDGET_SENT', customer: 'Ana Clara' },
];

const KanbanBoard = () => {
  const [orders] = useState<ServiceOrder[]>(initialOS);

  const columns: { title: string; status: OSStatus; headerColor: string; icon: React.ReactNode }[] = [
    { title: 'Aguardando', status: 'WAITING', headerColor: 'text-slate-300 border-slate-700', icon: <Clock size={18} className="text-slate-400" /> },
    { title: 'Em Análise', status: 'ANALYZING', headerColor: 'text-blue-400 border-blue-900', icon: <Search size={18} className="text-blue-400" /> },
    { title: 'Orçamento Enviado', status: 'BUDGET_SENT', headerColor: 'text-amber-400 border-amber-900', icon: <MessageCircle size={18} className="text-amber-400" /> },
    { title: 'Em Execução', status: 'IN_PROGRESS', headerColor: 'text-emerald-400 border-emerald-900', icon: <Wrench size={18} className="text-emerald-400" /> },
    { title: 'Finalizado', status: 'COMPLETED', headerColor: 'text-gray-400 border-gray-800', icon: <CheckCircle2 size={18} className="text-gray-400" /> },
  ];

  return (
    <div className="bg-slate-900 rounded-3xl border border-slate-800 p-8 font-sans shadow-2xl">
      <div className="mb-10 flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            Fluxo de Serviços
          </h2>
          <p className="text-slate-400 mt-2 text-lg">Visão em tempo real do pátio da oficina.</p>
        </div>
      </div>

      <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide">
        {columns.map((col) => (
          <div key={col.status} className="flex-1 min-w-[340px] bg-slate-800/50 rounded-2xl p-4 border border-slate-700/50">
            <div className={`flex items-center justify-between mb-6 pb-4 border-b ${col.headerColor}`}>
              <div className="flex items-center gap-3">
                {col.icon}
                <h3 className="text-lg font-semibold tracking-wide">{col.title}</h3>
              </div>
              <span className="bg-slate-800 text-slate-300 px-3 py-1 rounded-full text-sm font-bold border border-slate-700">
                {orders.filter(o => o.status === col.status).length}
              </span>
            </div>
            
            <div className="space-y-4">
              {orders
                .filter((o) => o.status === col.status)
                .map((order) => (
                  <motion.div 
                    whileHover={{ scale: 1.02, y: -2 }}
                    key={order.id} 
                    className="bg-slate-800 p-5 rounded-xl border border-slate-700 shadow-lg cursor-pointer group hover:border-slate-500 transition-colors relative overflow-hidden"
                  >
                    {order.urgent && (
                      <div className="absolute top-0 right-0 bg-red-500/20 text-red-400 text-[10px] font-bold px-3 py-1 rounded-bl-lg border-b border-l border-red-500/30 flex items-center gap-1">
                        <AlertTriangle size={10} /> PRIORIDADE
                      </div>
                    )}
                    
                    <div className="flex justify-between items-center mb-3 mt-1">
                      <span className="text-sm font-bold text-slate-500">#{order.id}</span>
                      <span className="text-sm px-3 py-1 bg-slate-900 rounded-md text-slate-300 font-mono tracking-widest border border-slate-800">
                        {order.plate}
                      </span>
                    </div>
                    
                    <h4 className="text-xl font-bold text-white mb-1 truncate">{order.vehicle}</h4>
                    <p className="text-slate-400 font-medium mb-4">{order.customer}</p>

                    {order.progress !== undefined && (
                      <div className="mb-4">
                        <div className="flex justify-between text-xs text-slate-400 mb-1 font-semibold">
                          <span>Progresso</span>
                          <span>{order.progress}%</span>
                        </div>
                        <div className="w-full bg-slate-900 rounded-full h-2.5 border border-slate-800">
                          <div className="bg-emerald-500 h-2.5 rounded-full" style={{ width: `${order.progress}%` }}></div>
                        </div>
                      </div>
                    )}

                    <div className="pt-4 border-t border-slate-700/50 flex gap-2">
                       <button className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-2.5 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-colors">
                         <PenTool size={16} /> Abrir
                       </button>
                       {order.status === 'BUDGET_SENT' && (
                          <button className="flex-1 bg-green-600 hover:bg-green-500 text-white py-2.5 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-colors">
                            <MessageCircle size={16} /> Zap
                          </button>
                       )}
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Simple search icon for the column since it wasn't imported at top
function Search(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
}

export default KanbanBoard;
