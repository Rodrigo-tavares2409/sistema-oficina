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
  { id: '1044', vehicle: 'Ford Ka SE', plate: 'DEF-5555', status: 'WAITING', customer: 'Carlos Mendes' },
  { id: '1048', vehicle: 'Chevrolet Onix LTZ', plate: 'MNO-4471', status: 'WAITING', customer: 'Patrícia Nogueira' },
  { id: '1046', vehicle: 'Jeep Compass Longitude', plate: 'JKL-3344', status: 'ANALYZING', customer: 'Rodrigo Farias' },
  { id: '1049', vehicle: 'Hyundai HB20 Vision', plate: 'PQR-8821', status: 'ANALYZING', customer: 'Fernanda Lima' },
  { id: '1045', vehicle: 'Toyota Corolla Altis', plate: 'GHI-9012', status: 'BUDGET_SENT', customer: 'Ana Clara' },
  { id: '1050', vehicle: 'Fiat Argo Trekking', plate: 'STU-1290', status: 'BUDGET_SENT', customer: 'Eduardo Ramos' },
  { id: '1043', vehicle: 'VW Polo Highline', plate: 'XYZ-9876', status: 'IN_PROGRESS', customer: 'Maria Souza', progress: 65 },
  { id: '1047', vehicle: 'Renault Kwid Zen', plate: 'VWX-5567', status: 'IN_PROGRESS', customer: 'Camila Torres', progress: 30 },
  { id: '1039', vehicle: 'Toyota Corolla Altis', plate: 'GHI-9012', status: 'COMPLETED', customer: 'Ana Clara', progress: 100 },
  { id: '1040', vehicle: 'Honda HR-V EXL', plate: 'BCD-6612', status: 'COMPLETED', customer: 'Lucas Andrade', progress: 100 },
  { id: '1041', vehicle: 'Toyota Corolla Altis', plate: 'EFG-7723', status: 'COMPLETED', customer: 'Beatriz Nunes', progress: 100 },
];

const KanbanBoard = () => {
  const [orders] = useState<ServiceOrder[]>(initialOS);

  const columns: { title: string; status: OSStatus; headerColor: string; icon: React.ReactNode }[] = [
    { title: 'Aguardando', status: 'WAITING', headerColor: 'text-neutral-300 border-neutral-700', icon: <Clock size={18} className="text-neutral-400" /> },
    { title: 'Em Análise', status: 'ANALYZING', headerColor: 'text-orange-400 border-orange-900', icon: <Search size={18} className="text-orange-400" /> },
    { title: 'Orçamento Enviado', status: 'BUDGET_SENT', headerColor: 'text-amber-400 border-amber-900', icon: <MessageCircle size={18} className="text-amber-400" /> },
    { title: 'Em Execução', status: 'IN_PROGRESS', headerColor: 'text-emerald-400 border-emerald-900', icon: <Wrench size={18} className="text-emerald-400" /> },
    { title: 'Finalizado', status: 'COMPLETED', headerColor: 'text-gray-400 border-gray-800', icon: <CheckCircle2 size={18} className="text-gray-400" /> },
  ];

  return (
    <div className="bg-neutral-900/60 rounded-2xl border border-neutral-800 p-6 font-sans">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Fluxo de Serviços
          </h2>
          <p className="text-neutral-500 mt-1 text-sm">Visão em tempo real do pátio da oficina.</p>
        </div>
      </div>

      <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide">
        {columns.map((col) => (
          <div key={col.status} className="flex-1 min-w-[300px] bg-neutral-950/60 rounded-xl p-3.5 border border-neutral-800">
            <div className={`flex items-center justify-between mb-5 pb-3 border-b ${col.headerColor}`}>
              <div className="flex items-center gap-2.5">
                {col.icon}
                <h3 className="text-sm font-semibold tracking-wide">{col.title}</h3>
              </div>
              <span className="bg-neutral-900 text-neutral-300 px-2.5 py-0.5 rounded-full text-xs font-bold border border-neutral-800">
                {orders.filter(o => o.status === col.status).length}
              </span>
            </div>

            <div className="space-y-3">
              {orders
                .filter((o) => o.status === col.status)
                .map((order) => (
                  <motion.div
                    whileHover={{ y: -2 }}
                    key={order.id}
                    className="bg-neutral-900 p-4 rounded-lg border border-neutral-800 cursor-pointer group hover:border-neutral-600 transition-colors relative overflow-hidden"
                  >
                    {order.urgent && (
                      <div className="absolute top-0 right-0 bg-red-500/20 text-red-400 text-[10px] font-bold px-3 py-1 rounded-bl-lg border-b border-l border-red-500/30 flex items-center gap-1">
                        <AlertTriangle size={10} /> PRIORIDADE
                      </div>
                    )}

                    <div className="flex justify-between items-center mb-2.5">
                      <span className="text-xs font-bold text-neutral-500">#{order.id}</span>
                      <span className="text-xs px-2.5 py-0.5 bg-neutral-950 rounded text-neutral-400 font-mono tracking-widest border border-neutral-800">
                        {order.plate}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-white mb-0.5 truncate">{order.vehicle}</h4>
                    <p className="text-neutral-500 text-sm font-medium mb-3">{order.customer}</p>

                    {order.progress !== undefined && order.status !== 'COMPLETED' && (
                      <div className="mb-3">
                        <div className="flex justify-between text-xs text-neutral-500 mb-1 font-semibold">
                          <span>Progresso</span>
                          <span>{order.progress}%</span>
                        </div>
                        <div className="w-full bg-neutral-950 rounded-full h-1.5 border border-neutral-800">
                          <div className="bg-orange-500 h-1.5 rounded-full" style={{ width: `${order.progress}%` }}></div>
                        </div>
                      </div>
                    )}

                    <div className="pt-3 border-t border-neutral-800 flex gap-2">
                       <button className="flex-1 bg-orange-600 hover:bg-orange-500 text-white py-2 rounded-md text-xs font-bold flex items-center justify-center gap-1.5 transition-colors">
                         <PenTool size={14} /> Abrir
                       </button>
                       {order.status === 'BUDGET_SENT' && (
                          <button className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white py-2 rounded-md text-xs font-bold flex items-center justify-center gap-1.5 transition-colors">
                            <MessageCircle size={14} /> Zap
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
