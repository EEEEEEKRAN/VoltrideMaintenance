# API Scooters

## Endpoints

### Créer un scooter
```http
POST /scooters
```

**Corps de la requête :**
```json
{
  "numeroSerie": "VS-2024-001",
  "modeleScooterId": 1
}
```

**Réponse (201) :**
```json
{
  "id": 1,
  "numeroSerie": "VS-2024-001",
  "modeleScooter": {
    "id": 1,
    "nom": "Model X"
  },
  "statut": "DISPONIBLE",
  "kilometrageTotal": 0,
  "cyclesCharge": 0
}
```

### Récupérer tous les scooters
```http
GET /scooters
```

**Réponse (200) :**
```json
[
  {
    "id": 1,
    "numeroSerie": "VS-2024-001",
    "statut": "DISPONIBLE",
    "kilometrageTotal": 1500,
    "cyclesCharge": 50
  }
]
```

### Récupérer les scooters disponibles
```http
GET /scooters/disponibles
```

### Mettre à jour le kilométrage
```http
PUT /scooters/:id/kilometrage
```

**Corps de la requête :**
```json
{
  "kilometrage": 1500
}
```

### Changer le statut
```http
PUT /scooters/:id/statut
```

**Corps de la requête :**
```json
{
  "statut": "EN_MAINTENANCE"
}
```

**Statuts possibles :**
- DISPONIBLE
- EN_MAINTENANCE
- RESERVE
- HORS_SERVICE

### Incrémenter les cycles de charge
```http
PUT /scooters/:id/cycles-charge
```

### Supprimer un scooter
```http
DELETE /scooters/:id
```

## Codes d'erreur

- 400 : Requête invalide (données manquantes ou invalides)
- 404 : Scooter non trouvé
- 409 : Conflit (ex: numéro de série déjà utilisé)
- 500 : Erreur serveur
