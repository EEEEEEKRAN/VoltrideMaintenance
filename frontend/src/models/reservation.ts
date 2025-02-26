export interface Reservation {
    id: number;
    date_debut: string; // Assurez-vous que le format de date est compatible avec ce que vous recevez de l'API
    date_fin: string;
    lieu: string;
    statut: string;

  }