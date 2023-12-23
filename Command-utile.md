# Pour importer les deonnées sur mongodb
```bash
docker exec -i mongo-dev sh -c 'mongoimport -d bda -c sales --authenticationDatabase admin -u root -p example' < sales.bson
```
# Pour connaitre l'addresse du conttainer mongo-dv
docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' mongo-dev
```
# Pour entrer dans le container mongo-dev
docker exec -it mongo-dev bash
```
# Quand on est dans le container, on peut se connecter au serveur mongo :
mongosh --authenticationDatabase admin -u root -p example
```
# Pour démarrer une pile de containers
docker-compose -f stack.yml up -d
```
docker-compose -f stack.yml up -d --build
```
# Pour arrêter une pile de containers
docker-compose -f stack.yml down
```
# pour installer les modules de graphql
```bash
npm install mongodb @apollo/server graphql --save  --no-bin-links
```

# query mongodb

db.sales.aggregate([ { $match: { "address.department.id": 14 } }, { $group: { _id: "$prestation.id", description: { $first: "$prestation.description" }, sum: { $sum: "$price" }, avg: { $avg: "$price" }, count: { $sum: 1 } } },{ $project: {prestation_id: "$_id",description: 1, sum: 1, avg: 1, count: 1, _id: 0 } }])
```
# visialusation par mois
db.sales.aggregate([{ $match: { "address.department.id": 14 } }, { $group: { _id: { id: "$prestation.id", month: "$date.month" }, description: { $first: "$prestation.description" }, sum: { $sum: "$price" }, avg: { $avg: "$price" }, count: { $sum: 1 } } }, { $sort: { description: 1, "_id.month": 1 } }, { $project: { prestation_id: "$_id.id", description: 1, sum: 1, avg: 1, count: 1, _id: 0, month: "$_id.month" } }] )
```
# Trier par description puis date en convertisant year par "year-00-00"
db.sales.aggregate([ { $match: { "address.department.id": 14 } }, { $group: { _id: { id: "$prestation.id", year: "$date.year" }, description: { $first: "$prestation.description" }, sum: { $sum: "$price" }, avg: { $avg: "$price" }, count: { $sum: 1 } } }, { $sort: { description: 1, "_id.year": 1 } }, { $project: { date: { $concat: [{ $toString: "$_id.year" }, "-00-00"] }, prestation_id: "$_id.id", description: 1, sum: 1, avg: 1, count: 1, _id: 0 } }] );
```
#--------------------------------------------------------------------------------------

# trie par description puis date en convertisant year par "year-00-00" version reduite
db.sales.aggregate([ { $match: { "address.department.id": 14 } }, { $group: { _id: { id: "$prestation.id", year: "$date.year" }, description: { $first: "$prestation.description" }, count: { $sum: 1 } } }, { $sort: { description: 1, "_id.year": 1 } }, { $project: { date: { $concat: [{ $toString: "$_id.year" }, "-00-00"] }, description: 1,count: 1, _id: 0 } }] );
```
# Trier par description puis par date 
db.sales.aggregate([ { $match: { "address.department.id": 14 } }, { $group: { _id: { id: "$prestation.id", year: "$date.year" }, description: { $first: "$prestation.description" }, sum: { $sum: "$price" }, avg: { $avg: "$price" }, count: { $sum: 1 } } }, { $sort: { description: 1 ,"_id.year":1} }, { $project: { date: "$date", prestation_id: "$_id.id",date:"$_id.year", description: 1, sum: 1, avg: 1, count: 1, _id: 0 } }] );
```
# trie par date non utiliser
db.sales.aggregate([ { $match: { "address.department.id": 14 } }, { $group: { _id: { id: "$prestation.id", year: "$date.year" }, description: { $first: "$prestation.description" }, sum: { $sum: "$price" }, avg: { $avg: "$price" }, count: { $sum: 1 } } }, { $sort: { "_id.year": 1 } }, { $project: { date: "$date", prestation_id: "$_id.id",date:"$_id.year", description: 1, sum: 1, avg: 1, count: 1, _id: 0 } }] );
```
# trie par date non utilise
db.sales.aggregate([ { $match: { "address.department.id": 14 } }, { $group: { _id: { id: "$prestation.id", year: "$date.year" }, description: { $first: "$prestation.description" }, sum: { $sum: "$price" }, avg: { $avg: "$price" }, count: { $sum: 1 } } }, { $sort: { "_id.year": 1 } }, { $project: { date: "$date", prestation_id: "$_id", description: 1, sum: 1, avg: 1, count: 1, _id: 0 } }] );
