# Documentation du Projet AQ54

## Table des Matières
1. [Introduction](#introduction)
2. [Structure du Projet](#structure-du-projet)
3. [Configuration et Installation](#configuration-et-installation)
4. [Backend](#backend)
   - [Points de Terminaison de l'API](#points-de-termination-de-lapi)
   - [Agrégation des Données](#aggregation-des-donnees)
5. [Frontend](#frontend)
   - [Interface Utilisateur](#interface-utilisateur)
   - [Visualisation des Données](#visualisation-des-donnees)
6. [Dockerisation](#dockerisation)
7. [Améliorations Futures](#ameliorations-futures)

## Introduction
Le projet AQ54 est conçu pour récupérer, stocker et visualiser les données sur la qualité de l'air. L'application se compose d'un service backend construit avec NestJS et d'une interface frontend qui permet aux utilisateurs de sélectionner un jour et de visualiser les indicateurs de qualité de l'air à travers des graphiques en barres.

## Structure du Projet
```
AQ54/
├── backend/
│   ├── src/
│   ├── test/
│   ├── .env
│   ├── nest-cli.json
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── public/
│   ├── src/
│   ├── .env
│   ├── package.json
│   └── tsconfig.json
├── docker-compose.yml
└── README.md
```

## Configuration et Installation

### Prérequis
- Node.js et npm installés
- Docker et Docker Compose installés

### Configuration du Backend
1. Naviguez vers le répertoire backend :
   ```sh
   cd AQ54/backend/aq54
   ```
2. Installez les dépendances :
   ```sh
   npm install
   ```
3. Configurez les variables d'environnement dans le fichier `.env`.
4. Lancez le serveur backend :
   ```sh
   npm run start
   ```

### Configuration du Frontend
1. Naviguez vers le répertoire frontend :
   ```sh
   cd AQ54/frontend/aq54-front
   ```
2. Installez les dépendances :
   ```sh
   npm install
   ```
3. Configurez les variables d'environnement dans le fichier `.env`.
4. Lancez le serveur frontend :
   ```sh
   npm start
   ```

## Backend

### Points de Terminaison de l'API
- **GET** `/sensor-data` : Récupère toutes les données des capteurs dans la base de données.
- **GET** `/aggregated-data/hourly-averages` : Déclenche la récupération des données aggrégés pour la visalization.

### Agrégation des Données
La logique d'agrégation des données est implémentée dans le backend pour fournir des données agrégées horaires et quotidiennes. Cela inclut l'arrondissement des valeurs agrégées à deux décimales.

## Frontend

### Interface Utilisateur
- Champ de calendrier pour sélectionner un jour spécifique.
- Boutons de sélection de métriques pour choisir les indicateurs de qualité de l'air (CO, O3, PM2.5, etc.).
- Visualisation des indicateurs sélectionnés à l'aide de graphiques en barres.

### Visualisation des Données
- Les graphiques en barres affichent 24 barres pour chaque heure de la journée, représentant les différentes métriques.

## Dockerisation

### Configuration de Docker
1. Créez un `Dockerfile` pour le backend et le frontend.
2. Utilisez un fichier `docker-compose.yml` pour gérer les applications multi-conteneurs.

### Exemples de Commandes Docker
- Construire et exécuter les conteneurs :
  ```sh
  docker-compose up --build
  ```
- Arrêter et supprimer les conteneurs :
  ```sh
  docker-compose down
  ```

## Améliorations Futures
- Améliorer l'authentification et l'autorisation des utilisateurs.
- Optimiser les processus de récupération et d'agrégation des données.
