import { AnalysisResult } from '@/features/email-analysis/domain/email.types';

export interface HistoryItem extends AnalysisResult {
  id: string;
  timestamp: Date;
  preview: string;
}
