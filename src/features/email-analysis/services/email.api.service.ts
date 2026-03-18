import { AnalysisResult, EmailPayload } from '../domain/email.types';
import { IEmailService } from './email.service';

export class EmailApiService implements IEmailService {
  async analyzeEmail(payload: EmailPayload): Promise<AnalysisResult> {
    const formData = new FormData();
    if (payload.text) {
      formData.append('text', payload.text);
    }
    if (payload.file) {
      formData.append('file', payload.file);
    }

    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
    
    const response = await fetch(`${baseUrl}/api/v1/analyze-email`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || 'Ocorreu um erro ao analisar o e-mail na API real.');
    }

    const data = await response.json();
    return {
      classification: data.classification,
      confidence: data.confidence,
      sentiment: data.sentiment,
      sentiment_score: data.sentiment_score,
      urgency: data.urgency,
      urgency_score: data.urgency_score,
      priority_score: data.priority_score,
      reasoning: data.reasoning,
      suggestedResponse: data.suggested_response,
    };
  }
}
