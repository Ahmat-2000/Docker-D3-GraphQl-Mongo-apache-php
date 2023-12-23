# Visualisation de Données

## Description
Bienvenue dans le projet Visualisation de Données. 
Cette application web est dédiée à la visualisation de données, exploitant D3.js pour la partie frontend, GraphQL pour le backend, et 
d'autres technologies variées. Le dépôt est conçu pour fonctionner de manière optimale dans un environnement Docker, avec des conteneurs dédiés pour GraphQL, MongoDB, Mongo Express, et Apache-PHP Server.

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
# Nom de Votre Projet

Bienvenue dans le projet **Nom de Votre Projet**. Ce dépôt contient les sources pour le backend GraphQL et l'interface utilisateur.

## Structure du Projet

```plaintext
.
├── README.md
├── graphql
│   ├── Dockerfile
│   ├── index.js
│   ├── model.graphql
│   ├── package-lock.json
│   ├── package.json
│   └── resolvers.js
├── stack.yml
├── ui
│   ├── Ahmed-memar.jpg
│   ├── Moi.jpg
│   ├── bootstrap-5.3.2-dist
│   │   ├── css
│   │   │   └── bootstrap.css
│   │   └── js
│   │       └── bootstrap.js
│   ├── css
│   │   ├── colorbrewer.css
│   │   ├── style.css
│   │   └── test.js
│   ├── data
│   │   ├── countries.json
│   │   ├── departments.json
│   │   ├── population.csv
│   │   ├── population.json
│   │   └── sales.bson
│   ├── departements.html
│   ├── france.html
│   ├── index.html
│   ├── js
│   │   ├── barChart.js
│   │   ├── d3.min.js
│   │   ├── d3.v7.min.js
│   │   ├── multiLineChart.js
│   │   ├── queries.js
│   │   └── simpleVisualisation.js
│   ├── pirate.svg
│   ├── prestation.html
│   ├── regions.html
│   └── sequence.png
└── Commande-utile.md
```

### Description
- **graphql/:** Contient les fichiers GraphQL et le code associé.
- **ui/:** Contient le code source du front-end, y compris les fichiers HTML, CSS, JavaScript, et les données.
  - **data/:** Dossier pour stocker les données.
  - **js/:** Dossier pour les scripts JavaScript.
  - **css/:** Dossier pour les fichiers CSS.
- **stack.yml:** Configuration Docker pour les conteneurs.
- - **Dockerfile:** Configuration Docker pour les conteneurs.
- **Commande-utile.md:** Documentation ou informations utiles supplémentaires.

## Contribuer

1. Forkez le projet.
2. Créez votre branche (`git checkout -b feature/ma-fonctionnalite`).
3. Committez vos changements (`git commit -am 'Ajouter une nouvelle fonctionnalité'`).
4. Pushez vers la branche (`git push origin feature/ma-fonctionnalite`).
5. Ouvrez une Pull Request.

## Auteur

Ahmat Mahamat Ahmat

Master 1 cybersécurité à l'université de Caen

## Contacts

Pour des questions, contactez [ahmatmhtlouky@gmail.com](mailto:ahmatmhtlouky@gmail.com).

## License

Ce projet est en open source
