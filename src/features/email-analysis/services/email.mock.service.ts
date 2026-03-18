import { AnalysisResult, EmailPayload } from '../domain/email.types';
import { IEmailService } from './email.service';

export class EmailMockService implements IEmailService {
  async analyzeEmail(payload: EmailPayload): Promise<AnalysisResult> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 2200));

    const content = payload.text ?? '';
    const isProdutivo = content.length > 50;

    return {
      classification: isProdutivo ? 'Produtivo' : 'Improdutivo',
      confidence: 0.82 + Math.random() * 0.15,
      suggestedResponse: isProdutivo
        ? 'Prezado cliente,\n\nAgradecemos o seu contato. Recebemos sua solicitação referente aos documentos financeiros e nossa equipe de análise já está processando as informações.\n\nRetornaremos com o posicionamento em até 24 horas úteis.\n\nAtenciosamente,\nEquipe de Operações Financeiras'
        : 'Este email foi classificado como informativo/spam. Nenhuma ação é necessária no momento. O conteúdo foi registrado para fins de auditoria.',
    };
  }
}
