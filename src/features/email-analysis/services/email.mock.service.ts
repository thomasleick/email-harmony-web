import { AnalysisResult, EmailPayload } from '../domain/email.types';
import { IEmailService } from './email.service';

/**
 * Mock implementation of EmailService for development and testing.
 * Updated to remove all line breaks (\n) for cleaner UI presentation as per user request.
 */
export class EmailMockService implements IEmailService {
  async analyzeEmail(payload: EmailPayload): Promise<AnalysisResult> {
    // Simular delay de processamento
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const content = payload.text || '';
    
    // Novas lógicas para bater com os exemplos da IA
    const isPassword = content.toLowerCase().includes('senha');
    const isTransf = content.toLowerCase().includes('comprovante') || content.toLowerCase().includes('ted') || content.toLowerCase().includes('pix');
    const isUrgent = content.toLowerCase().includes('urgente') || content.toLowerCase().includes('hoje') || isPassword;
    const isProdutivo = content.length > 20 || isPassword || isTransf;

    let reasoning = 'Análise simulada pelo MockService para fins de demonstração de UI/UX.';
    let suggestedResponse = 'Prezado, agradecemos o seu contato. Sua solicitação foi recebida e encaminhada ao setor responsável. Retornaremos em breve. Atenciosamente, Equipe de Suporte.';

    if (isPassword) {
      reasoning = 'Identificada solicitação de suporte técnico para recuperação de acesso ou senha.';
      suggestedResponse = 'Olá! Para recuperar sua senha, basta clicar em "Esqueci minha senha" na tela inicial do app. Enviamos um link de recuperação para seu email cadastrado.';
    } else if (isTransf) {
      reasoning = 'Detectado envio de comprovante financeiro de rotina operacional.';
      suggestedResponse = 'Recebemos seu comprovante com sucesso. O valor será processado e creditado em sua conta conforme os prazos padrão. Obrigado!';
    } else if (!isProdutivo) {
      suggestedResponse = 'Olá, agradecemos o envio do seu email. No momento não identificamos uma ação necessária, mas ficamos à disposição. Atenciosamente.';
    }

    return {
      classification: isProdutivo ? 'Produtivo' : 'Improdutivo',
      confidence: 0.82 + Math.random() * 0.15,
      sentiment: isProdutivo ? 'Positivo' : (isUrgent ? 'Negativo' : 'Neutro'),
      sentiment_score: isProdutivo ? 0.6 : (isUrgent ? -0.5 : 0.0),
      urgency: isUrgent ? 'Alta' : (isProdutivo ? 'Média' : 'Baixa'),
      urgency_score: isUrgent ? 0.9 : (isProdutivo ? 0.5 : 0.2),
      priority_score: isUrgent ? 0.85 : (isProdutivo ? 0.45 : 0.3),
      reasoning,
      suggestedResponse,
    };
  }
}
