# 42 Mobile - Consultation des profils étudiants

Cette application mobile permet de consulter les profils des étudiants de 42. Elle utilise l'API de l'intranet 42 pour afficher les informations des utilisateurs.

## Fonctionnalités

- Recherche d'utilisateurs par login
- Affichage détaillé du profil utilisateur incluant :
  - Informations personnelles (Nom, Prénom, login)
  - Stats (niveau, rang, points d'évaluation, wallet)
  - Photo de profil et coalition
  - Compétences avec niveaux
  - Projets complétés (réussis et échoués)
- Navigation entre les vues
- Gestion des erreurs
- Interface responsive adaptée aux différentes tailles d'écran

## Technologies utilisées

- React Native avec Expo
- TypeScript
- Context API pour la gestion d'état
- Axios pour les requêtes HTTP
- React Navigation pour la navigation

## Configuration requise

Avant de commencer, assurez-vous d'avoir :
- Node.js (version 14 ou supérieure)
- npm ou yarn
- Expo CLI (`npm install -g expo-cli`)
- Un compte développeur 42 pour accéder à l'API
- Les identifiants client (UID et Secret) de l'API 42

## Installation et démarrage

1. Installez les dépendances
   ```bash
   npm install
   ```

2. Configurez les variables d'environnement
   - Créez un fichier `.env` à la racine du projet
   - Ajoutez vos identifiants API :
     ```
     API42_UID=votre_uid
     API42_SECRET=votre_secret
     ```

3. Démarrez l'application
   ```bash
   npx expo start
   ```

## Structure du projet

```
42-mobile-app/
├── app/                   # Pages de l'application
├── components/           # Composants réutilisables
├── contexts/            # Contextes React (Auth, Theme)
├── services/           # Services (API, Storage)
├── types/              # Types TypeScript
└── utils/              # Fonctions utilitaires
```