'use client';

import { motion } from 'framer-motion';
import { 
  BarChart3, TrendingUp, AlertCircle, 
  CheckCircle2, PieChart, Timer, Sparkles
} from 'lucide-react';
import { useHistoryStore } from '../../history/store/useHistoryStore';

export function SessionAnalytics() {
  const { items } = useHistoryStore();

  if (items.length === 0) {
     return (
        <div className="card-surface p-6 flex flex-col items-center justify-center text-center opacity-50 grayscale">
            <BarChart3 className="w-10 h-10 mb-2 text-muted-foreground/40" />
            <p className="text-sm font-medium">Dashboard de Insights</p>
            <p className="text-[10px] text-muted-foreground px-4">As métricas da sua sessão aparecerão aqui após a primeira análise.</p>
        </div>
     );
  }

  const total = items.length;
  const productive = items.filter(i => i.classification === 'Produtivo').length;
  const highUrgency = items.filter(i => i.urgency === 'Alta').length;
  const avgPriority = items.reduce((acc, curr) => acc + (curr.priority_score ?? 0), 0) / total;
  const prodPercent = (productive / total) * 100;

  return (
    <div className="card-surface p-5 border border-primary/5">
      <h3 className="section-label mb-5 flex items-center gap-2">
        <TrendingUp className="w-4 h-4 text-primary" /> Inteligência da Sessão
      </h3>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="space-y-1">
          <p className="text-[10px] font-bold text-muted-foreground uppercase flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-success" /> Produtividade
          </p>
          <div className="flex items-end gap-2">
             <span className="text-xl font-black text-foreground">{prodPercent.toFixed(0)}%</span>
             <span className="text-[10px] text-muted-foreground mb-1">({productive}/{total})</span>
          </div>
          <div className="h-1 w-full bg-secondary rounded-full overflow-hidden">
             <motion.div 
               initial={{ width: 0 }}
               animate={{ width: `${prodPercent}%` }}
               className="h-full bg-success"
             />
          </div>
        </div>

        <div className="space-y-1">
          <p className="text-[10px] font-bold text-muted-foreground uppercase flex items-center gap-1">
            <AlertCircle className="w-3 h-3 text-destructive" /> Críticos (Alta)
          </p>
          <div className="flex items-end gap-2">
             <span className="text-xl font-black text-foreground">{highUrgency}</span>
             <span className="text-[10px] text-muted-foreground mb-1">E-mails</span>
          </div>
          <div className="h-1 w-full bg-secondary rounded-full overflow-hidden">
             <motion.div 
               initial={{ width: 0 }}
               animate={{ width: `${(highUrgency / total) * 100}%` }}
               className="h-full bg-destructive"
             />
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-border/50">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-muted-foreground flex items-center gap-1.5">
            <PieChart className="w-3.5 h-3.5" /> MÉDIA DE PRIORIDADE
          </span>
          <span className="text-xs font-black text-primary font-mono">{(avgPriority * 100).toFixed(1)}%</span>
        </div>
        <div className="h-2 w-full bg-secondary rounded-full p-0.5 flex">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${avgPriority * 100}%` }}
            className="h-full bg-gradient-to-r from-primary to-primary-foreground rounded-full"
          />
        </div>
        <div className="flex justify-between mt-4">
             <div className="flex flex-col">
                <span className="text-[10px] font-bold text-muted-foreground">TOTAL ANALISADO</span>
                <span className="text-sm font-black text-foreground flex items-center gap-1">
                    <Timer className="w-3 h-3" /> {total} Emails
                </span>
             </div>
             <div className="text-right flex flex-col">
                <span className="text-[10px] font-bold text-muted-foreground">AGENTE ATIVO</span>
                <span className="text-sm font-black text-success flex items-center justify-end gap-1">
                    <Sparkles className="w-3 h-3" /> Online
                </span>
             </div>
        </div>
      </div>
    </div>
  );
}
