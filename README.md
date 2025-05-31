# Projet GraphQL avec MongoDB et Visualisation de Données

Ce projet consiste en une application GraphQL qui interagit avec une base de données MongoDB pour fournir des données sur des prestations de service, avec une interface de visualisation basée sur D3.js.

## Architecture du projet

- **Backend**: Serveur GraphQL (Node.js/Apollo)
- **Base de données**: MongoDB
- **Frontend**: Visualisations avec D3.js servies via Apache

## Fonctionnalités

1. **API GraphQL** avec les requêtes suivantes :
   - Liste des prestations, départements et régions
   - Prestations par heure, région, département
   - Clients par département
   - Chiffre d'affaires par région

2. **Visualisations** :
   - Carte interactive des départements/régions
   - Diagramme circulaire des prestations
   - Graphique en barres des prestations par heure
   - Tableaux de données interactifs

3. **Filtres et interactions** :
   - Filtrage par département, région, description
   - Tri des données
   - Tooltips d'information

## Prérequis
- Docker
- Docker Compose

## Installation et lancement

1. Cloner le dépôt
2. Lancer les conteneurs :
   ```bash
   docker-compose up -d --build
3. Accéder aux services :
    - GraphQL: http://localhost:4000

    - Interface web: http://localhost

    - MongoDB Express: http://localhost:8081

## Configuration MongoDB
Les identifiants par défaut sont :

- Utilisateur: root

- Mot de passe: example

- Base de données: bda

- Collection: sales

## Points d'accès
- GraphQL Playground: http://localhost:4000

- Tableau de bord principal: http://localhost/dashboard.html

- Clients par département: http://localhost/client_dpt.html?department=[NUM_DEPARTEMENT]

- Prestations par région/année: http://localhost/prestation_region_year.html?region=[NUM_REGION]

## Technologies utilisées
- Backend: Node.js, Apollo Server, MongoDB

- Frontend: D3.js, HTML5, CSS3

- Conteneurisation: Docker, Docker Compose

## Auteurs
**Channel NIANGA**
