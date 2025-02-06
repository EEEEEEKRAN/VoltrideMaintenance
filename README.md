# 🛵 VoltRide - Gestion de Flotte de Scooters Électriques

## 📋 À Propos
Application de gestion pour la flotte de scooters électriques VoltRide, développée pour JackSam et Arthur.

## 🚀 Démarrage Rapide

### Prérequis
- Node.js >= 18
- Docker et Docker Compose
- npm

### Installation

1. Cloner le projet
```bash
git clone 
cd voltride
```

2. Configurer les variables d'environnement
```bash
# Pour le backend
cp backend/.env.example backend/.env
# Pour le frontend
cp frontend/.env.example frontend/.env
```

3. Configurer la base de données
```bash
# Copier le fichier exemple de docker-compose
cp docker-compose.example.yml docker-compose.yml
# Modifier les identifiants dans docker-compose.yml si nécessaire
```

4. Installer les dépendances
```bash
npm run install:all
```

5. Démarrer les services
```bash
# Démarrer la base de données
npm run docker:up

# Démarrer l'application (dans un nouveau terminal)
npm start
```

## 🔧 Structure du Projet

```
voltride/
├── backend/          # API Nest.js
│   ├── src/
│   │   ├── domain/        # Entités et règles métier
│   │   ├── application/   # Cas d'utilisation
│   │   ├── infrastructure/# Implémentations techniques
│   │   └── interface/     # Controllers et DTOs
│   └── ...
├── frontend/         # Application React
│   ├── src/
│   │   ├── composants/    # Composants réutilisables
│   │   ├── pages/         # Pages de l'application
│   │   ├── services/      # Services et API
│   │   └── ...
│   └── ...
└── ...
```

## 🌐 Accès aux Services
- Frontend : http://localhost:5173
- API Backend : http://localhost:3000
- Adminer (BDD) : http://localhost:8080

## 📝 Commandes Utiles
- `npm start` : Démarre le frontend et le backend
- `npm run docker:up` : Lance la base de données
- `npm run docker:down` : Arrête la base de données

## 🔒 Fichiers de Configuration
Les fichiers suivants doivent être configurés localement :
- `backend/.env`
- `frontend/.env`
- `docker-compose.yml`

## 👥 Équipe
- JackSam
- Arthur 
- Erkant