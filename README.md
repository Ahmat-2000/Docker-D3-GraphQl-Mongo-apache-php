# Visualisation de Données

## Description
Ce projet est une application web de visualisation de données utilisant D3.js pour le front-end, GraphQL pour le back-end, et diverses autres technologies. Il est conçu pour être exécuté dans un environnement Docker avec des conteneurs pour GraphQL, MongoDB, Mongo Express, et Apache-PHP Server.

## Technologies Utilisées
- **Front-end:**
  - D3.js
  - HTML
  - CSS
  - JavaScript
  - Bootstrap

- **Back-end:**
  - GraphQL (Port 4000)
  - MongoDB (Port 2717)
  - Mongo Express (Port 8081)
  - Apache-PHP Server (Port 80)

## Prérequis
- [Docker](https://www.docker.com/get-started)
- Docker-compoose

## Installation et Utilisation

1. **Cloner le Projet**
2. **Configurer l'Environnement Docker**
    - docker-compose -f stack.yml up -d --build
    - Importer les Données dans MongoDB
      docker exec -i mongo-dev sh -c 'mongoimport -d bda -c sales --authenticationDatabase admin -u root -p example' < ui/data/sales.bson

# Accéder à l'Application
    Front-end: Ouvrez votre navigateur et allez à http://localhost
    Back-end GraphQL: http://localhost:4000
    Mongo Express (Interface d'administration MongoDB): http://localhost:8081

Structure du Projet

    frontend/: Contient le code source du front-end.
    backend/: Contient le code source du back-end (GraphQL).
    docker-compose.yml: Configuration Docker pour les conteneurs.
    data/: Dossier pour stocker les données (si applicable).
    scripts/: Scripts utiles (si applicable).

Contribuer

    Forkez le projet
    Créez votre branche (git checkout -b feature/ma-fonctionnalite)
    Committez vos changements (git commit -am 'Ajouter une nouvelle fonctionnalité')
    Pushez vers la branche (git push origin feature/ma-fonctionnalite)
    Ouvrez une Pull Request

Auteur

Ahmat Mahamat Ahmat
License

Ce projet est en open source sous licence MIT - voir le fichier LICENSE pour plus de détails.


