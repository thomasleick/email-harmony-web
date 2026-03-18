import { AnalysisResult, EmailPayload } from '../domain/email.types';
import { EmailApiService } from './email.api.service';

/**
 * Interface que define o contrato do serviço de e-mail.
 * Isso garante que a camada de UI permaneça agnóstica em relação à implementação real.
 */
export interface IEmailService {
  analyzeEmail(payload: EmailPayload): Promise<AnalysisResult>;
}

// Trocado para o Backend API FastAPI Real!
export const emailService: IEmailService = new EmailApiService();
