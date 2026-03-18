import { AnalysisResult, EmailPayload } from '../domain/email.types';
import { IEmailService } from './email.service';

/**
 * Mock implementation of EmailService for development and testing.
 */
export class EmailMockService implements IEmailService {
  async analyzeEmail(payload: EmailPayload): Promise<AnalysisResult> {
    // Simular delay de processamento
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const content = payload.text || '';
    const isProdutivo = content.length > 50;
    const isUrgent = content.toLowerCase().includes('urgente') || content.toLowerCase().includes('hoje');

    return {
      classification: isProdutivo ? 'Produtivo' : 'Improdutivo',
      confidence: 0.82 + Math.random() * 0.15,
      sentiment: isProdutivo ? 'Positivo' : 'Neutro',
      sentiment_score: isProdutivo ? 0.6 : 0.0,
      urgency: isUrgent ? 'Alta' : 'Baixa',
      urgency_score: isUrgent ? 0.9 : 0.2,
      priority_score: isUrgent ? 0.85 : 0.3,
      reasoning: 'Análise simulada pelo MockService para fins de demonstração de UI/UX.',
      suggestedResponse: isProdutivo
        ? 'Prezado,\n\nAgradecemos o seu contato. Sua solicitação foi recebida e encaminhada ao setor responsável. Retornaremos em breve.\n\nAtenciosamente,\nEquipe de Suporte.'
        : 'Olá,\n\nAgradecemos o envio do seu email. No momento não identificamos uma ação necessária, mas ficamos à disposição.\n\nAtenciosamente.',
    };
  }
}
