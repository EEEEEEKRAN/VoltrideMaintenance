import { Controller, Post, HttpException, HttpStatus } from '@nestjs/common';
import { MaintenanceAlertUseCase } from '../../domain/maintenance/maintenance-alert/maintenance-alert.use-case';

@Controller('maintenance-alerts')
export class MaintenanceAlertController {
  constructor(
    private readonly maintenanceAlertUseCase: MaintenanceAlertUseCase,
  ) {}

  @Post('send')
  async envoyerAlertes() {
    try {
      const result =
        await this.maintenanceAlertUseCase.verifierEtEnvoyerAlertesMaintenances();
      return {
        success: true,
        message: `${result.scootersAlertes} scooters identifiés pour maintenance, ${result.emailsEnvoyes} alertes envoyées`,
        ...result,
      };
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new HttpException(
          error.message,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      throw new HttpException(
        "Une erreur est survenue lors de l'envoi des alertes",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
