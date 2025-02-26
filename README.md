# Bienvenue dans votre application Expo 👋

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

## Pour commencer

1. Installez les dépendances

   ```bash
   npm install
   ```

2. Démarrez l'application

   ```bash
    npx expo start
   ```

Dans la sortie console, vous trouverez des options pour ouvrir l'application dans :

- Un [build de développement](https://docs.expo.dev/develop/development-builds/introduction/)
- Un [émulateur Android](https://docs.expo.dev/workflow/android-studio-emulator/)
- Un [simulateur iOS](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), un environnement limité pour tester le développement d'applications avec Expo

Vous pouvez commencer à développer en modifiant les fichiers dans le répertoire **app**. Ce projet utilise le [routage basé sur les fichiers](https://docs.expo.dev/router/introduction).

## Obtenir un projet vierge

Quand vous êtes prêt, exécutez :

```bash
npm run reset-project
```

Cette commande déplacera le code de démarrage vers le répertoire **app-example** et créera un répertoire **app** vide où vous pourrez commencer à développer.

## En savoir plus

Pour en savoir plus sur le développement de votre projet avec Expo, consultez les ressources suivantes :

- [Documentation Expo](https://docs.expo.dev/) : Apprenez les fondamentaux ou approfondissez vos connaissances avec nos [guides](https://docs.expo.dev/guides).
- [Tutoriel Learn Expo](https://docs.expo.dev/tutorial/introduction/) : Suivez un tutoriel étape par étape pour créer un projet qui fonctionne sur Android, iOS et le web.

## Rejoignez la communauté

Rejoignez notre communauté de développeurs qui créent des applications universelles.

- [Expo sur GitHub](https://github.com/expo/expo) : Consultez notre plateforme open source et contribuez.
- [Communauté Discord](https://chat.expo.dev) : Discutez avec les utilisateurs d'Expo et posez vos questions.
