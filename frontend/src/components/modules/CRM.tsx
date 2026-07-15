import { useRef } from 'react';
import { Users, AlertCircle, Star, MessageCircle, Upload } from 'lucide-react';
import { Card, PageHeader, MiniKpi, Tag } from '../ui';

const customers = [
  { name: 'Ana Clara', vehicle: 'Toyota Corolla Altis', lastVisit: 'há 2 meses', tag: 'vip' as const, label: 'VIP' },
  { name: 'Carlos Mendes', vehicle: 'Ford Ka SE', lastVisit: 'há 7 meses', tag: 'risco' as const, label: 'Em risco' },
  { name: 'Maria Souza', vehicle: 'VW Polo Highline', lastVisit: 'em execução', tag: 'ok' as const, label: 'Ativo' },
  { name: 'Patrícia Nogueira', vehicle: 'Chevrolet Onix LTZ', lastVisit: 'há 3 dias', tag: 'ok' as const, label: 'Ativo' },
  { name: 'Rodrigo Farias', vehicle: 'Jeep Compass Longitude', lastVisit: 'há 5 meses', tag: 'risco' as const, label: 'Em risco' },
  { name: 'Lucas Andrade', vehicle: 'Honda HR-V EXL', lastVisit: 'há 1 mês', tag: 'vip' as const, label: 'VIP' },
];

const followUps = [
  { customer: 'Carlos Mendes', reason: 'Revisão dos 40 mil km atrasada', channel: 'WhatsApp' },
  { customer: 'Rodrigo Farias', reason: 'Sem visita há 5 meses', channel: 'WhatsApp' },
  { customer: 'Beatriz Nunes', reason: 'Aniversário de cliente esta semana', channel: 'E-mail' },
];

const CRM = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      alert(`Simulando upload da planilha: ${file.name}\nEm breve, esse arquivo irá alimentar o nosso banco de dados automaticamente!`);
      // Reset input para permitir selecionar o mesmo arquivo novamente se necessário
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="CRM & Pós-Venda"
        subtitle="Relacionamento e reativação de clientes, com follow-up automático."
        action={
          <div className="flex items-center gap-3">
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
              onChange={handleFileUpload} 
            />
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-neutral-200 px-4 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors"
            >
              <Upload size={16} /> Importar Planilha
            </button>
            <button className="bg-orange-600 hover:bg-orange-500 text-white px-4 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors">
              <Users size={16} /> Novo Cliente
            </button>
          </div>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <MiniKpi label="Clientes Ativos" value="312" icon={<Users size={18} />} tone="good" />
        <MiniKpi label="Em Risco de Churn" value="18" icon={<AlertCircle size={18} />} tone="alert" />
        <MiniKpi label="Clientes VIP" value="46" icon={<Star size={18} />} />
        <MiniKpi label="NPS Médio" value="82" icon={<Star size={18} />} tone="good" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <h3 className="text-white font-semibold mb-1">Base de Clientes</h3>
          <p className="text-neutral-500 text-sm mb-5">312 clientes cadastrados</p>

          <div className="space-y-3">
            {customers.map((c) => (
              <div key={c.name} className="flex items-center gap-3 bg-neutral-950/60 border border-neutral-800 rounded-xl p-4">
                <div className="w-9 h-9 rounded-full bg-orange-600/20 text-orange-400 flex items-center justify-center text-xs font-bold shrink-0">
                  {c.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-white truncate">{c.name}</p>
                  <p className="text-xs text-neutral-500">{c.vehicle} · {c.lastVisit}</p>
                </div>
                <Tag tone={c.tag}>{c.label}</Tag>
              </div>
            ))}
          </div>
        </Card>

        <Card className="lg:col-span-1">
          <h3 className="text-white font-semibold mb-1">Follow-ups de Hoje</h3>
          <p className="text-neutral-500 text-sm mb-5">Sugeridos automaticamente pela IA</p>

          <div className="space-y-3">
            {followUps.map((f) => (
              <div key={f.customer} className="bg-neutral-950/60 border border-neutral-800 rounded-xl p-4">
                <p className="text-sm font-bold text-white">{f.customer}</p>
                <p className="text-xs text-neutral-500 mt-1">{f.reason}</p>
                <button className="mt-3 w-full flex items-center justify-center gap-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 py-2 rounded-lg text-xs font-bold transition-colors">
                  <MessageCircle size={13} /> Enviar via {f.channel}
                </button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CRM;
