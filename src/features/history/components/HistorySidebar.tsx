'use client';

import { History, Trash2, Zap } from 'lucide-react';
import { useHistoryStore } from '../store/useHistoryStore';

export function HistorySidebar() {
  const { items, clearHistory } = useHistoryStore();

  return (
    <div className="card-surface p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="section-label flex items-center gap-2">
          <History className="w-3.5 h-3.5" /> Histórico Recente
        </h3>
        {items.length > 0 && (
          <button
            onClick={clearHistory}
            className="text-[10px] font-medium text-muted-foreground hover:text-destructive transition-colors flex items-center gap-1"
          >
            <Trash2 className="w-3 h-3" />
            Limpar
          </button>
        )}
      </div>
      <div className="space-y-2">
        {items.length === 0 ? (
          <p className="text-xs text-muted-foreground/60 italic">Nenhum processamento recente.</p>
        ) : (
          items.map((item) => (
            <div key={item.id} className="history-item relative overflow-hidden group">
              {/* Priority Indicator Line */}
              <div 
                className="absolute left-0 top-0 bottom-0 w-1 bg-primary/20 group-hover:bg-primary transition-colors" 
                style={{ opacity: item.priority_score }}
              />

              <div className="flex justify-between items-center mb-1 pl-1">
                <div className="flex items-center gap-2">
                    <span className={item.classification === 'Produtivo' ? 'badge-produtivo !text-[10px] !px-1.5 !py-0' : 'badge-improdutivo !text-[10px] !px-1.5 !py-0'}>
                    {item.classification}
                    </span>
                    {item.priority_score > 0.7 && (
                        <span className="flex items-center gap-0.5 text-[9px] font-black text-destructive uppercase">
                            <Zap className="w-2.5 h-2.5 fill-current" /> Alt
                        </span>
                    )}
                </div>
                <span className="text-[10px] text-muted-foreground tabular-nums">
                  {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <p className="text-xs text-muted-foreground truncate mt-1 pl-1">{item.preview}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
