import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import {
  EmailOptions,
  INotificationService,
} from '../../../domain/notification/interfaces/notification-service.interface';

@Injectable()
export class MailHogNotificationService implements INotificationService {
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    const host = configService.get<string>('MAIL_HOST', 'mailhog');
    const port = configService.get<number>('MAIL_PORT', 1025);

    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure: false,
      ignoreTLS: true,
    } as nodemailer.TransportOptions);
  }

  async sendEmail(options: EmailOptions): Promise<boolean> {
    try {
      await this.transporter.sendMail({
        from: this.configService.get<string>('EMAIL_FROM', 'maintenance@voltride.com'),
        to: options.to,
        subject: options.subject,
        text: options.text,
        html: options.html,
        cc: options.cc,
        bcc: options.bcc,
        attachments: options.attachments,
      });
      return true;
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'email:", error);
      return false;
    }
  }

  async sendMaintenanceAlert(
    email: string,
    scooterInfo: {
      id: number;
      numeroSerie: string;
      modele: string;
    },
    maintenanceInfo: {
      type: string;
      recommandationDate: Date;
    },
  ): Promise<boolean> {
    const subject = `Alerte maintenance requise - Scooter ${scooterInfo.numeroSerie}`;
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #3366cc;">Alerte de maintenance VoltRide</h2>
        <p>Une maintenance de type <strong>${maintenanceInfo.type}</strong> est requise pour le scooter suivant :</p>
        
        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 15px 0;">
          <p><strong>ID Scooter:</strong> ${scooterInfo.id}</p>
          <p><strong>Numéro de série:</strong> ${scooterInfo.numeroSerie}</p>
          <p><strong>Modèle:</strong> ${scooterInfo.modele}</p>
        </div>
        
        <p>Date recommandée: <strong>${maintenanceInfo.recommandationDate.toLocaleDateString('fr-FR')}</strong></p>
        
        <p>Veuillez planifier cette maintenance dès que possible pour garantir la sécurité et les performances du véhicule.</p>
        
        <div style="margin-top: 30px; padding-top: 15px; border-top: 1px solid #ddd; color: #666; font-size: 12px;">
          <p>Ce message est généré automatiquement par le système de gestion de maintenance VoltRide.</p>
        </div>
      </div>
    `;
    const text = `
      Alerte de maintenance VoltRide
      
      Une maintenance de type ${maintenanceInfo.type} est requise pour le scooter suivant :
      
      ID Scooter: ${scooterInfo.id}
      Numéro de série: ${scooterInfo.numeroSerie}
      Modèle: ${scooterInfo.modele}
      
      Date recommandée: ${maintenanceInfo.recommandationDate.toLocaleDateString('fr-FR')}
      
      Veuillez planifier cette maintenance dès que possible pour garantir la sécurité et les performances du véhicule.
      
      Ce message est généré automatiquement par le système de gestion de maintenance VoltRide.
    `;
    return this.sendEmail({
      to: email,
      subject,
      html,
      text,
    });
  }
}
