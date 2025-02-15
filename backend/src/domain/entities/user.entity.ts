export class Utilisateur {
    id?: number;
    nom: string;
    email: string;
    telephone: string;
    numeroPermis: string;
  
    constructor(nom: string, email: string, telephone: string, numeroPermis: string, id?: number) {
      this.id = id;
      this.nom = nom;
      this.email = email;
      this.telephone = telephone;
      this.numeroPermis = numeroPermis;
    }
  }