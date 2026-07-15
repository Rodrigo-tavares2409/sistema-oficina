import { Bot, MessageSquareText, Zap, Timer } from 'lucide-react';
import { Card, PageHeader, MiniKpi } from '../ui';

const chat = [
  { from: 'user', text: 'Bom dia! Meu orçamento da OS #1045 já foi aprovado?', time: '08:52' },
  { from: 'bot', text: 'Bom dia, Eduardo! Sim — orçamento do Fiat Argo aprovado. Já entrou na fila de execução, previsão de entrega amanhã às 17h.', time: '08:52 · resposta automática' },
  { from: 'user', text: 'Perfeito, obrigado!', time: '08:53' },
  { from: 'bot', text: 'Por nada! Qualquer coisa é só chamar por aqui. 🙂', time: '08:53 · resposta automática' },
];

const alerts = [
  { text: 'Estoque de pastilha dianteira abaixo do mínimo — pedido sugerido para 3 fornecedores.', time: 'há 20 min', tone: 'alert' as const },
  { text: 'Cliente Rodrigo Farias sem visita há 5 meses — follow-up de reativação sugerido.', time: 'há 1h', tone: 'default' as const },
  { text: 'OS #1045 com orçamento parado há 40h sem resposta — lembrete enviado automaticamente.', time: 'há 2h', tone: 'default' as const },
  { text: 'Elevador 03 ocioso há 3h — oportunidade de encaixe de serviço rápido.', time: 'há 3h', tone: 'default' as const },
];

const TelemetryAI = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Telemetria & IA"
        subtitle="A inteligência que acompanha prazos, estoque e conversas — 24 horas por dia."
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <MiniKpi label="Mensagens Respondidas (IA)" value="187" icon={<MessageSquareText size={18} />} tone="good" />
        <MiniKpi label="Orçamentos Qualificados" value="34" icon={<Zap size={18} />} />
        <MiniKpi label="Alertas Gerados (7d)" value="12" icon={<Bot size={18} />} />
        <MiniKpi label="Tempo Médio de Resposta" value="8 seg" icon={<Timer size={18} />} tone="good" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <div className="flex items-center gap-2.5 mb-1">
            <div className="w-7 h-7 rounded-lg bg-orange-600/20 text-orange-400 flex items-center justify-center">
              <Bot size={15} />
            </div>
            <h3 className="text-white font-semibold">Assistente 3Fold — WhatsApp</h3>
          </div>
          <p className="text-neutral-500 text-sm mb-5 ml-9">Conversa automática com cliente</p>

          <div className="space-y-3 max-w-lg">
            {chat.map((m, i) => (
              <div key={i} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${m.from === 'bot' ? 'bg-orange-600 text-white rounded-bl-sm' : 'bg-neutral-800 text-neutral-100 rounded-br-sm'}`}>
                  <p>{m.text}</p>
                  <span className={`block text-[10px] mt-1 ${m.from === 'bot' ? 'text-orange-100/70' : 'text-neutral-500'}`}>{m.time}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="lg:col-span-1">
          <h3 className="text-white font-semibold mb-1">Alertas Automáticos</h3>
          <p className="text-neutral-500 text-sm mb-5">Gerados pela IA em tempo real</p>

          <div className="space-y-3">
            {alerts.map((a, i) => (
              <div key={i} className={`rounded-xl p-3.5 border ${a.tone === 'alert' ? 'bg-rose-500/5 border-rose-900/40' : 'bg-neutral-950/60 border-neutral-800'}`}>
                <p className="text-sm text-neutral-200 leading-snug">{a.text}</p>
                <span className="text-xs text-neutral-600 mt-2 block">{a.time}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TelemetryAI;
