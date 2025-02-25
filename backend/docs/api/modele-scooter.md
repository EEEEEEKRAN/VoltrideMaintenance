# API Modèles de Scooters

## Endpoints

### Créer un modèle de scooter
```http
POST /modele-scooters
```

**Corps de la requête :**
```json
{
  "nom": "Model X Pro",
  "description": "Version premium du Model X avec batterie longue durée"
}
```

**Réponse (201) :**
```json
{
  "id": 1,
  "nom": "Model X Pro",
  "description": "Version premium du Model X avec batterie longue durée",
  "scooters": []
}
```

### Récupérer tous les modèles
```http
GET /modele-scooters
```

**Réponse (200) :**
```json
[
  {
    "id": 1,
    "nom": "Model X Pro",
    "description": "Version premium du Model X avec batterie longue durée",
    "scooters": [
      {
        "id": 1,
        "numeroSerie": "VS-2024-001",
        "statut": "DISPONIBLE"
      }
    ]
  }
]
```

### Récupérer un modèle par ID
```http
GET /modele-scooters/:id
```

**Réponse (200) :**
```json
{
  "id": 1,
  "nom": "Model X Pro",
  "description": "Version premium du Model X avec batterie longue durée",
  "scooters": [
    {
      "id": 1,
      "numeroSerie": "VS-2024-001",
      "statut": "DISPONIBLE"
    }
  ]
}
```

### Mettre à jour un modèle
```http
PUT /modele-scooters/:id
```

**Corps de la requête :**
```json
{
  "nom": "Model X Pro Max",
  "description": "Version ultra premium avec batterie longue durée"
}
```

**Réponse (200) :**
```json
{
  "id": 1,
  "nom": "Model X Pro Max",
  "description": "Version ultra premium avec batterie longue durée",
  "scooters": [
    {
      "id": 1,
      "numeroSerie": "VS-2024-001",
      "statut": "DISPONIBLE"
    }
  ]
}
```

### Supprimer un modèle
```http
DELETE /modele-scooters/:id
```

**Réponse (204)**

## Validation

### Création et Mise à jour
- `nom` : Chaîne de caractères, minimum 3 caractères, unique
- `description` : Chaîne de caractères, obligatoire

## Codes d'erreur

- 400 : Requête invalide
  - Données manquantes ou invalides
  - Nom de modèle déjà utilisé
  - Format de nom invalide
- 404 : Modèle non trouvé
- 409 : Conflit
  - Tentative de suppression d'un modèle utilisé par des scooters
- 500 : Erreur serveur

## Règles métier

1. Le nom du modèle doit être unique
2. Un modèle ne peut pas être supprimé s'il est associé à des scooters
3. Le nom doit avoir au moins 3 caractères
4. La description est obligatoire 