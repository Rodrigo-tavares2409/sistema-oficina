import { Camera, ScanLine, CheckCircle2, Clock } from 'lucide-react';
import { Card, PageHeader, Tag } from '../ui';

const checkins = [
  { time: '08:12', plate: 'ABC-1234', vehicle: 'Honda Civic Touring', customer: 'João Silva', status: 'Concluído' as const },
  { time: '08:47', plate: 'MNO-4471', vehicle: 'Chevrolet Onix LTZ', customer: 'Patrícia Nogueira', status: 'Concluído' as const },
  { time: '09:20', plate: 'JKL-3344', vehicle: 'Jeep Compass Longitude', customer: 'Rodrigo Farias', status: 'Concluído' as const },
  { time: '09:55', plate: 'PQR-8821', vehicle: 'Hyundai HB20 Vision', customer: 'Fernanda Lima', status: 'Em andamento' as const },
];

const checklist = [
  { item: 'Fotos do veículo (4 ângulos)', done: true },
  { item: 'Nível de combustível', done: true },
  { item: 'Riscos e avarias registradas', done: true },
  { item: 'Itens pessoais no interior', done: false },
  { item: 'Assinatura digital do cliente', done: false },
];

const Reception = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Recepção — Check-in Digital"
        subtitle="Entrada do veículo com foto, OCR de placa e checklist em menos de 1 minuto."
        action={
          <button className="bg-orange-600 hover:bg-orange-500 text-white px-4 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors">
            <Camera size={16} /> Novo Check-in
          </button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-white font-semibold">Check-in em andamento</h3>
            <Tag tone="ok">OS #1049</Tag>
          </div>

          <div className="aspect-video bg-neutral-950 border border-dashed border-neutral-700 rounded-xl flex flex-col items-center justify-center gap-2 mb-5">
            <Camera className="text-neutral-600" size={28} />
            <span className="text-xs text-neutral-500">Foto do veículo — 4 ângulos</span>
          </div>

          <div className="space-y-3 mb-5">
            <div className="flex items-center justify-between text-sm border-b border-neutral-800 pb-2.5">
              <span className="text-neutral-500 flex items-center gap-2"><ScanLine size={14} /> Placa (OCR)</span>
              <span className="font-mono font-bold text-white">PQR-8821</span>
            </div>
            <div className="flex items-center justify-between text-sm border-b border-neutral-800 pb-2.5">
              <span className="text-neutral-500">Veículo</span>
              <span className="font-semibold text-white">Hyundai HB20 Vision</span>
            </div>
            <div className="flex items-center justify-between text-sm border-b border-neutral-800 pb-2.5">
              <span className="text-neutral-500">Cliente</span>
              <span className="font-semibold text-white">Fernanda Lima</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-neutral-500">KM atual</span>
              <span className="font-mono font-semibold text-white">41.230</span>
            </div>
          </div>

          <div className="space-y-2">
            {checklist.map((c) => (
              <div key={c.item} className="flex items-center gap-2.5 text-sm">
                <CheckCircle2 size={16} className={c.done ? 'text-emerald-400' : 'text-neutral-700'} />
                <span className={c.done ? 'text-neutral-300' : 'text-neutral-600'}>{c.item}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="lg:col-span-2">
          <h3 className="text-white font-semibold mb-1">Check-ins de hoje</h3>
          <p className="text-neutral-500 text-sm mb-5">4 veículos recebidos</p>

          <div className="space-y-3">
            {checkins.map((c) => (
              <div key={c.plate} className="flex items-center gap-4 bg-neutral-950/60 border border-neutral-800 rounded-xl p-4">
                <div className="flex items-center gap-1.5 text-neutral-500 text-xs font-mono w-12 shrink-0">
                  <Clock size={12} /> {c.time}
                </div>
                <span className="text-xs font-mono px-2.5 py-1 bg-neutral-900 rounded border border-neutral-800 text-neutral-400 shrink-0">
                  {c.plate}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-white truncate">{c.vehicle}</p>
                  <p className="text-xs text-neutral-500">{c.customer}</p>
                </div>
                <Tag tone={c.status === 'Concluído' ? 'up' : 'due'}>{c.status}</Tag>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Reception;
