import type { ReactNode } from 'react';

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`bg-neutral-900/60 border border-neutral-800 rounded-2xl p-6 ${className}`}>
      {children}
    </div>
  );
}

export function PageHeader({ title, subtitle, action }: { title: string; subtitle: string; action?: ReactNode }) {
  return (
    <div className="flex items-start justify-between mb-6 flex-wrap gap-4">
      <div>
        <h2 className="text-xl font-bold text-white">{title}</h2>
        <p className="text-neutral-500 text-sm mt-1">{subtitle}</p>
      </div>
      {action}
    </div>
  );
}

export function MiniKpi({ label, value, icon, tone = 'default' }: { label: string; value: string; icon: ReactNode; tone?: 'default' | 'alert' | 'good' }) {
  const toneColor = tone === 'alert' ? 'text-rose-400' : tone === 'good' ? 'text-emerald-400' : 'text-orange-400';
  const barColor = tone === 'alert' ? 'bg-rose-500' : tone === 'good' ? 'bg-emerald-500' : 'bg-orange-500';
  return (
    <div className="relative bg-neutral-900/60 border border-neutral-800 rounded-2xl p-5 overflow-hidden">
      <span className={`absolute left-0 top-0 h-full w-[3px] ${barColor}`} />
      <div className="flex items-center justify-between mb-3">
        <span className="text-neutral-400 text-xs font-semibold">{label}</span>
        <span className={toneColor}>{icon}</span>
      </div>
      <span className="text-2xl font-black text-white tracking-tight">{value}</span>
    </div>
  );
}

export function Tag({ children, tone = 'neutral' }: { children: ReactNode; tone?: 'neutral' | 'vip' | 'risco' | 'ok' | 'due' | 'up' }) {
  const styles: Record<string, string> = {
    neutral: 'bg-neutral-800 text-neutral-300',
    vip: 'bg-amber-500/15 text-amber-400',
    risco: 'bg-rose-500/15 text-rose-400',
    ok: 'bg-orange-500/15 text-orange-400',
    due: 'bg-amber-500/15 text-amber-400',
    up: 'bg-emerald-500/15 text-emerald-400',
  };
  return (
    <span className={`text-[10.5px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full ${styles[tone]}`}>
      {children}
    </span>
  );
}
