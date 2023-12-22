# Il suffit d'utiliser ces deux commandes
docker-compose -f stack.yml up -d --build <br>
docker exec -i mongo-dev sh -c 'mongoimport -d bda -c sales --authenticationDatabase admin -u root -p example' < ui/data/sales.bson
