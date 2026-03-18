'use client';

import { toast } from 'sonner';
import { useEmailAnalysis } from '../hooks/useEmailAnalysis';
import { useHistoryStore } from '@/features/history/store/useHistoryStore';
import { EmailInput } from '../components/EmailInput';
import { ResultsPanel } from '../components/ResultsPanel';
import { EmailPayload } from '../domain/email.types';
import { HistorySidebar } from '@/features/history/components/HistorySidebar';

export function EmailAnalysisContainer() {
  const { loading, result, analyze, updateSuggestedResponse } = useEmailAnalysis();
  const { addItem } = useHistoryStore();

  const handleSubmit = async (payload: EmailPayload) => {
    if (!payload.text?.trim() && !payload.file) return;

    try {
      const data = await analyze(payload);
      
      addItem({
        ...data,
        id: crypto.randomUUID(),
        timestamp: new Date(),
        preview: (payload.text ?? payload.file?.name ?? '').substring(0, 50) + '…',
      });
      
      toast.success(`Email classificado como ${data.classification}`);
    } catch {
      toast.error('Erro ao processar o email. Tente novamente.');
    }
  };

  return (
    <main className="max-w-[1400px] mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
      <section className="lg:col-span-7">
        <EmailInput onSubmit={handleSubmit} loading={loading} />
      </section>

      <section className="lg:col-span-5 space-y-6">
        <ResultsPanel result={result} loading={loading} onUpdateResponse={updateSuggestedResponse} />
        <HistorySidebar />
      </section>
    </main>
  );
}
