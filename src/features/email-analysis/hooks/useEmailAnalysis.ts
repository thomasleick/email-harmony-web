import { useState, useCallback } from 'react';
import { emailService } from '../services/email.service';
import { EmailPayload, AnalysisResult } from '../domain/email.types';

export function useEmailAnalysis() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const analyze = useCallback(async (payload: EmailPayload) => {
    setLoading(true);
    setError(null);
    try {
      const data = await emailService.analyzeEmail(payload);
      setResult(data);
      return data;
    } catch (err: any) {
      setError(err.message || 'Erro ao processar e-mail.');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateSuggestedResponse = useCallback((text: string) => {
    setResult((prev) => (prev ? { ...prev, suggestedResponse: text } : null));
  }, []);

  const reset = useCallback(() => {
    setResult(null);
    setError(null);
  }, []);

  return { loading, result, error, analyze, updateSuggestedResponse, reset };
}
