import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, Copy, Sparkles, Check, Download } from 'lucide-react';
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
    '    EMAIL HARMONY — Relatório de Análise',
    '═══════════════════════════════════════════',
    '',
    `Classificação: ${result.classification}`,
    `Confiança:     ${(result.confidence * 100).toFixed(1)}%`,
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
  a.download = `analise-email-${Date.now()}.txt`;
  a.click();
  URL.revokeObjectURL(url);
  toast.success('Relatório exportado com sucesso!');
}

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
          <h3 className="text-foreground font-semibold">Aguardando Processamento</h3>
          <p className="text-sm text-muted-foreground mt-2 max-w-[260px]">
            Insira um email à esquerda para iniciar a classificação automática por IA.
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
            <div className="h-8 w-48 bg-secondary rounded-full" />
            <div className="h-2 w-full bg-secondary rounded-full" />
          </div>
          <div className="card-surface p-6 space-y-3 animate-pulse-soft" style={{ animationDelay: '200ms' }}>
            <div className="h-4 w-40 bg-secondary rounded" />
            <div className="h-3 w-full bg-secondary rounded" />
            <div className="h-3 w-4/5 bg-secondary rounded" />
            <div className="h-3 w-3/5 bg-secondary rounded" />
          </div>
        </motion.div>
      ) : result ? (
        <motion.div
          key="result"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          className="space-y-5"
        >
          <div className="card-surface p-6">
            <div className="flex items-center justify-between mb-5">
              <span className="section-label">Resultado da Análise</span>
              <div className={result.classification === 'Produtivo' ? 'badge-produtivo' : 'badge-improdutivo'}>
                {result.classification === 'Produtivo'
                  ? <CheckCircle2 className="w-3.5 h-3.5" />
                  : <XCircle className="w-3.5 h-3.5" />
                }
                {result.classification}
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-muted-foreground">Confiança da IA</span>
                <span className="text-foreground tabular-nums">{(result.confidence * 100).toFixed(1)}%</span>
              </div>
              <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${result.confidence * 100}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                  className={`h-full rounded-full ${result.classification === 'Produtivo' ? 'bg-success' : 'bg-primary'}`}
                />
              </div>
            </div>
          </div>

          <div className="card-surface overflow-hidden">
            <div className="px-5 py-3 border-b border-border/50 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-foreground">Sugestão de Resposta</h3>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => exportAnalysis(result)}
                  className="p-2 hover:bg-secondary rounded-lg transition-colors text-muted-foreground hover:text-primary"
                  title="Exportar relatório (.txt)"
                >
                  <Download className="w-4 h-4" />
                </button>
                <button
                  onClick={handleCopy}
                  className="p-2 hover:bg-secondary rounded-lg transition-colors text-muted-foreground hover:text-primary"
                  title="Copiar resposta"
                >
                  {copied ? <Check className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div className="p-5">
              <textarea
                spellCheck={false}
                className="w-full h-44 text-sm font-mono leading-relaxed text-foreground/80 bg-transparent border-none focus:ring-0 resize-none outline-none"
                value={result.suggestedResponse}
                onChange={(e) => onUpdateResponse(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center gap-2 px-1">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-border text-primary focus:ring-primary/20"
                checked={showExplanation}
                onChange={(e) => setShowExplanation(e.target.checked)}
              />
              <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                Mostrar explicação da IA
              </span>
            </label>
          </div>

          <AnimatePresence>
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="card-surface p-5 text-xs text-muted-foreground leading-relaxed">
                  <p className="font-semibold text-foreground mb-2">Explicação do modelo:</p>
                  <p>
                    O email foi classificado como <strong>{result.classification}</strong> com base na análise de
                    palavras-chave financeiras, tom da mensagem e presença de solicitações acionáveis.
                    {result.classification === 'Produtivo'
                      ? ' Foram identificados termos como "solicitação", "resgate", "documentos" que indicam necessidade de ação.'
                      : ' O conteúdo não apresenta solicitações específicas que demandem resposta operacional.'}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
