import { AnalysisResult, EmailPayload } from '../domain/email.types';
import { EmailMockService } from './email.mock.service';

/**
 * Interface que define o contrato do serviço de e-mail.
 * Isso garante que a camada de UI permaneça agnóstica em relação à implementação real.
 */
export interface IEmailService {
  analyzeEmail(payload: EmailPayload): Promise<AnalysisResult>;
}

// Quando a API real estiver pronta, basta trocar para EmailApiService
export const emailService: IEmailService = new EmailMockService();
