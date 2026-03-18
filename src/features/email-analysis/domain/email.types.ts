export type Classification = 'Produtivo' | 'Improdutivo';

export interface AnalysisResult {
  classification: Classification;
  confidence: number;
  suggestedResponse: string;
}

export interface EmailPayload {
  text?: string;
  file?: File;
}

export interface EmailAnalysisError {
  message: string;
}
