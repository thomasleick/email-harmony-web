import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2, XCircle, Copy, Sparkles, Check, Download, 
  AlertTriangle, MessageSquare, ShieldAlert,
  Smile, Meh, Frown
} from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { AnalysisResult } from '../domain/email.types';

interface ResultsPanelProps {
  result: AnalysisResult | null;
  loading: boolean;
  onUpdateResponse: (text: string) => void;
}

function exportAnalysis(result: AnalysisResult) {
  const content = [
    '═══════════════════════════════════════════',
    '    EMAIL HARMONY — Relatório de Inteligência',
    '═══════════════════════════════════════════',
    '',
    `Classificação: ${result.classification}`,
    `Urgência:      ${result.urgency} (Score: ${result.urgency_score})`,
    `Sentimento:    ${result.sentiment} (Score: ${result.sentiment_score})`,
    `Prioridade:    ${(result.priority_score * 100).toFixed(0)}%`,
    `Confiança:     ${(result.confidence * 100).toFixed(1)}%`,
    '',
    '───────────────────────────────────────────',
    'Análise (Reasoning):',
    result.reasoning,
    '',
    '───────────────────────────────────────────',
    'Resposta Sugerida:',
    '───────────────────────────────────────────',
    '',
    result.suggestedResponse,
    '',
    '───────────────────────────────────────────',
    `Gerado em: ${new Date().toLocaleString('pt-BR')}`,
    '═══════════════════════════════════════════',
  ].join('\n');

  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `analise-inteligente-${Date.now()}.txt`;
  a.click();
  URL.revokeObjectURL(url);
  toast.success('Relatório completo exportado!');
}

const getSentimentIcon = (sentiment: string) => {
  switch (sentiment) {
    case 'Positivo': return <Smile className="w-3.5 h-3.5" />;
    case 'Negativo': return <Frown className="w-3.5 h-3.5 text-destructive" />;
    default: return <Meh className="w-3.5 h-3.5" />;
  }
};

const getUrgencyColor = (urgency: string) => {
  switch (urgency) {
    case 'Alta': return 'text-destructive bg-destructive/10 border-destructive/20';
    case 'Média': return 'text-amber-600 bg-amber-500/10 border-amber-500/20';
    default: return 'text-slate-500 bg-slate-500/10 border-slate-500/20';
  }
};

export function ResultsPanel({ result, loading, onUpdateResponse }: ResultsPanelProps) {
  const [showExplanation, setShowExplanation] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(result.suggestedResponse);
    setCopied(true);
    toast.success('Resposta copiada!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence mode="wait">
      {!result && !loading ? (
        <motion.div
          key="empty"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="h-full min-h-[420px] border-2 border-dashed border-border rounded-2xl flex flex-col items-center justify-center p-12 text-center"
        >
          <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-4">
            <Sparkles className="w-7 h-7 text-muted-foreground/30" />
          </div>
          <h3 className="text-foreground font-semibold">Triagem Inteligente</h3>
          <p className="text-sm text-muted-foreground mt-2 max-w-[260px]">
            Insira um email para análise multidimensional de sentimento, urgência e prioridade.
          </p>
        </motion.div>
      ) : loading ? (
        <motion.div
          key="loading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="space-y-5"
        >
          <div className="card-surface p-6 space-y-4 animate-pulse-soft">
            <div className="h-4 w-32 bg-secondary rounded" />
            <div className="h-10 w-48 bg-secondary rounded-lg" />
            <div className="flex gap-2">
               <div className="h-6 w-20 bg-secondary rounded-full" />
               <div className="h-6 w-20 bg-secondary rounded-full" />
            </div>
          </div>
          <div className="card-surface p-6 space-y-3 animate-pulse-soft" style={{ animationDelay: '200ms' }}>
            <div className="h-4 w-40 bg-secondary rounded" />
            <div className="h-3 w-full bg-secondary rounded" />
            <div className="h-3 w-4/5 bg-secondary rounded" />
          </div>
        </motion.div>
      ) : result ? (
        <motion.div
          key="result"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          {/* Header Card: Main Status & Priority */}
          <div className="card-surface p-5 relative overflow-hidden">
            {/* Priority Pulse Background Effect */}
            {result.priority_score > 0.7 && (
              <div className="absolute top-0 right-0 p-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-destructive"></span>
                </span>
              </div>
            )}

            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="section-label mb-1 block uppercase tracking-wider text-[10px]">Status da Triagem</span>
                <div className="flex items-center gap-3">
                  <div className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-1.5 ${
                    result.classification === 'Produtivo' ? 'badge-produtivo' : 'badge-improdutivo'
                  }`}>
                    {result.classification === 'Produtivo' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                    {result.classification}
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-1.5 ${getUrgencyColor(result.urgency)}`}>
                    <ShieldAlert className="w-3.5 h-3.5" />
                    Urgência {result.urgency}
                  </div>
                </div>
              </div>

              <div className="text-right">
                <span className="section-label mb-1 block uppercase tracking-wider text-[10px]">Prioridade</span>
                <div className="text-2xl font-black text-foreground tabular-nums">
                  {(result.priority_score * 100).toFixed(0)}%
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2 border-t border-border/50">
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] font-bold text-muted-foreground uppercase">
                  <span>Sentimento</span>
                  <span className="flex items-center gap-1 font-mono">{getSentimentIcon(result.sentiment)} {result.sentiment}</span>
                </div>
                <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-1000 ${result.sentiment_score > 0 ? 'bg-success' : 'bg-destructive'}`} 
                    style={{ width: `${Math.abs(result.sentiment_score) * 100}%` }} 
                  />
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] font-bold text-muted-foreground uppercase">
                  <span>Confiança IA</span>
                  <span className="font-mono">{(result.confidence * 100).toFixed(0)}%</span>
                </div>
                <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary transition-all duration-1000" 
                    style={{ width: `${result.confidence * 100}%` }} 
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Response Text Card */}
          <div className="card-surface overflow-hidden border border-primary/10 shadow-lg shadow-primary/5">
            <div className="px-5 py-3 border-b border-border/50 flex items-center justify-between bg-primary/5">
              <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-primary" /> Sugestão de Resposta
              </h3>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => exportAnalysis(result)}
                  className="p-2 hover:bg-white dark:hover:bg-slate-800 rounded-lg transition-all text-muted-foreground hover:text-primary active:scale-95"
                  title="Exportar Inteligência (.txt)"
                >
                  <Download className="w-4 h-4" />
                </button>
                <div className="w-px h-4 bg-border/50 mx-1" />
                <button
                  onClick={handleCopy}
                  className="p-2 hover:bg-white dark:hover:bg-slate-800 rounded-lg transition-all text-muted-foreground hover:text-primary active:scale-95"
                  title="Copiar resposta"
                >
                  {copied ? <Check className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div className="p-5">
              <textarea
                spellCheck={false}
                className="w-full h-40 text-sm font-medium leading-relaxed text-foreground/90 bg-transparent border-none focus:ring-0 resize-none outline-none scrollbar-hide"
                value={result.suggestedResponse}
                onChange={(e) => onUpdateResponse(e.target.value)}
              />
            </div>
          </div>

          {/* AI Reasoning / Insights */}
          <div className="card-surface p-4 bg-slate-500/[0.02]">
            <button 
              onClick={() => setShowExplanation(!showExplanation)}
              className="w-full flex items-center justify-between text-xs font-bold text-muted-foreground hover:text-foreground transition-colors"
            >
              <div className="flex items-center gap-2">
                <div className="w-1 h-4 bg-primary/40 rounded-full" />
                LOG DE RACIOCÍNIO DA IA
              </div>
              <motion.span animate={{ rotate: showExplanation ? 180 : 0 }}>▼</motion.span>
            </button>
            <AnimatePresence>
              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-3 text-xs leading-relaxed text-muted-foreground bg-white/50 dark:bg-black/20 p-3 rounded-lg border border-border/30"
                >
                  {result.reasoning}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
