'use client';

import { History, Trash2 } from 'lucide-react';
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
          items.slice(0, 8).map((item) => (
            <div key={item.id} className="history-item">
              <div className="flex justify-between items-center mb-1">
                <span className={item.classification === 'Produtivo' ? 'badge-produtivo !text-[10px] !px-1.5 !py-0' : 'badge-improdutivo !text-[10px] !px-1.5 !py-0'}>
                  {item.classification}
                </span>
                <span className="text-[10px] text-muted-foreground tabular-nums">
                  {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <p className="text-xs text-muted-foreground truncate mt-1">{item.preview}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
