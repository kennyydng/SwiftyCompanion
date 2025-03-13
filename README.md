# 42 Mobile - Consultation des profils étudiants

Cette application mobile permet de consulter les profils des étudiants de 42. Elle utilise l'API de l'intranet 42 pour afficher les informations des utilisateurs.

## Fonctionnalités

- Recherche d'utilisateurs par login
- Affichage détaillé du profil utilisateur incluant :
  - Informations personnelles (login, email, téléphone, niveau, localisation)
  - Photo de profil
  - Compétences avec niveaux et pourcentages
  - Projets complétés (réussis et échoués)
- Navigation entre les vues
- Gestion des erreurs (login inexistant, erreurs réseau)
- Interface responsive adaptée aux différentes tailles d'écran

## Configuration requise

Avant de commencer, assurez-vous d'avoir :
- Un compte développeur 42 pour accéder à l'API
- Les identifiants client (UID et Secret) de l'API 42

## Installation et démarrage

1. Installez les dépendances
   ```bash
   npm install
   ```

2. Démarrez l'application
   ```bash
   npx expo start
   ```