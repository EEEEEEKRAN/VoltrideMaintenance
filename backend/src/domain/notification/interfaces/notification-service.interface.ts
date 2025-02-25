export interface EmailOptions {
  to: string | string[];
  subject: string;
  html?: string;
  text?: string;
  cc?: string | string[];
  bcc?: string | string[];
  attachments?: Array<{
    filename: string;
    content: Buffer | string;
    contentType?: string;
  }>;
}

export interface INotificationService {
  sendEmail(options: EmailOptions): Promise<boolean>;
  sendMaintenanceAlert(
    email: string,
    scooterInfo: {
      id: number;
      numeroSerie: string;
      modele: string;
    },
    maintenanceInfo: {
      type: string;
      recommandationDate: Date;
    }
  ): Promise<boolean>;
} 