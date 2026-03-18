export type ClassificationType = 'Produtivo' | 'Improdutivo';
export type SentimentType = 'Positivo' | 'Neutro' | 'Negativo';
export type UrgencyType = 'Alta' | 'Média' | 'Baixa';

export interface AnalysisResult {
  classification: ClassificationType;
  confidence: number;
  sentiment: SentimentType;
  sentiment_score: number;
  urgency: UrgencyType;
  urgency_score: number;
  priority_score: number;
  reasoning: string;
  suggestedResponse: string;
}

export interface EmailPayload {
  text: string;
  file?: File;
}
