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
```bash
docker-compose -f stack.yml up -d --build
```
4. **Importer les Données dans MongoDB**
```bash
docker exec -i mongo-dev sh -c 'mongoimport -d bda -c sales --authenticationDatabase admin -u root -p example' < ui/data/sales.bson
```
## Accéder à l'Application

- **Front-end:** Ouvrez votre navigateur et allez à [http://localhost](http://localhost).
- **Back-end GraphQL:** [http://localhost:4000](http://localhost:4000).
- **Mongo Express (Interface d'administration MongoDB):** [http://localhost:8081](http://localhost:8081).

## Structure du Projet

- **graphql/:** Contient les fichiers GraphQL et le code associé.
- **ui/:** Contient le code source du front-end, y compris les fichiers HTML, CSS, JavaScript, et les données.
  - **data/:** Dossier pour stocker les données.
  - **js/:** Dossier pour les scripts JavaScript.
  - **css/:** Dossier pour les fichiers CSS.
- **stack.yml:** Configuration Docker pour les conteneurs.
- **utile.md:** Documentation ou informations utiles supplémentaires.

## Contribuer

1. Forkez le projet.
2. Créez votre branche (`git checkout -b feature/ma-fonctionnalite`).
3. Committez vos changements (`git commit -am 'Ajouter une nouvelle fonctionnalité'`).
4. Pushez vers la branche (`git push origin feature/ma-fonctionnalite`).
5. Ouvrez une Pull Request.

## Auteur

Ahmat Mahamat Ahmat

## Contacts

Pour des questions, contactez [Gmail](mailto:ahmatmhtlouky@gmail.com).

## License

Ce projet est en open source
