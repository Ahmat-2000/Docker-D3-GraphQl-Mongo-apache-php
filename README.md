# Il suffit d'utiliser ces deux commandes
docker-compose -f stack.yml up -d --build <br>
docker exec -i mongo-dev sh -c 'mongoimport -d bda -c sales --authenticationDatabase admin -u root -p example' < ui/data/sales.bson

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
  - GraphQL
  - MongoDB

- **Environnement Docker:**
  - GraphQL (Port 4000)
  - MongoDB (Port 2717)
  - Mongo Express (Port 8081)
  - Apache-PHP Server (Port 80)

## Prérequis
- [Docker](https://www.docker.com/get-started)

## Installation et Utilisation

1. **Cloner le Projet**
   ```bash
   git clone https://github.com/ahmatmahamatahmat/visualisation-de-donnees.git
   cd visualisation-de-donnees
