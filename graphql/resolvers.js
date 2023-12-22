import { MongoClient } from 'mongodb';

// Connection URI
// version container
const uri = 'mongodb://root:example@mongodb:27017'
// version runtime
//const uri = 'mongodb://root:example@localhost:27017';

// Database Name
const dbName = 'bda';

// Collection Name
const collectionName = 'sales';

// Create a new MongoClient
const client = new MongoClient(uri);

await client.connect();
console.log('Connected successfully to the server');
const db = client.db(dbName);
const collection = db.collection(collectionName);


/*
  Par exemple, faites en sorte qu'un clic sur un département de la 
  carte de France affiche le détails sur les prestations effectuées 
  dans ce département.
*/
const aggregatePrestation = [
  {$group: {
    _id: {
      prestation_id: '$prestation.id',
      prestation_description: '$prestation.description'
    },
    sum: { $sum: '$price'}, avg: { $avg: '$price' },
    count: { $sum: 1}
  }
},
{ $project: {id: '$_id.prestation_id',description: '$_id.prestation_description',sum: 1, avg: 1, count: 1, _id: 0}}
]

const aggregateDepartments = [
  {$group: {
      _id: { prestation_department: '$address.department.id', departnom:'$address.department.name'},
      sum: { $sum: '$price'}, avg: { $avg: '$price' },
      count: { $sum: 1}
    }
  },
  { $project: {department: '$_id.prestation_department', nom:'$_id.departnom',sum: 1, avg: 1, count: 1, _id: 0 } }
];
// mes propres aggregations
// pour la visialusation de prestations par année
const aggregateDepartmentByIdSorted = (departmentId) => [
  { $match: { "address.department.id": departmentId } }, 
  { $group: { _id: { id: "$prestation.id", year: "$date.year" }, 
    description: { $first: "$prestation.description" }, sum: { $sum: "$price" }, avg: { $avg: "$price" }, count: { $sum: 1 } 
  } }, 
  { $sort: { "_id.year": 1, description: 1 } }, 
  { $project: { date: "$_id.year",//{ $concat: [{ $toString: "$_id.year" }, "-01-01"] }, 
    prestation_id: "$_id.id", description: 1, sum: 1, avg: 1, count: 1, _id: 0 
  } }
];
// pour la visialusation de prestations par mois
const aggregateDepartmentByMonth = (departmentId) => [
  { $match: { "address.department.id": departmentId } }, 
  { $group: { _id: { id: "$prestation.id", month: "$date.month" }, 
    description: { $first: "$prestation.description" }, sum: { $sum: "$price" }, avg: { $avg: "$price" }, count: { $sum: 1 } } 
  }, 
  { $sort: { "_id.month": 1 , description: 1} }, 
  { 
  $project: { prestation_id: "$_id.id", description: 1, sum: 1, avg: 1, count: 1, _id: 0 , month: "$_id.month"}
  }
];
// pour la visialusation global des prestation d'un departement
const aggregateDetailsByDepartment = (departmentId) => [ 
{ $match: { "address.department.id": departmentId } }, 
{ $group: {_id: "$prestation.id", description: { $first: "$prestation.description" }, sum: { $sum: "$price" }, 
avg: { $avg: "$price" }, count: { $sum: 1 } } 
}, 
{ $project: {id: "$_id" , description: 1, sum: 1, avg: 1, count: 1, _id: 0 } }
];



const aggregateRegion = [
  {
    $group:{
      _id:{
      region_id: "$address.region.id",
      region_name: "$address.region.name",
    },
    sum: {
        $sum: '$price'
      },
    avg: {
        $avg: '$price'
      },
    count:{
        $sum:1
    }
    }
    },
  {
    $project:{
        id: "$_id.region_id",
        nom: "$_id.region_name",
    count:1,
    sum:1,
    avg: 1,
    _id:1
    }
  }
]

// on définit une fonction qui effectue l'aggrégation voulue
async function aggregate(aggregation) {
    const result = await collection.aggregate(aggregation).toArray();
    return result;
}

const resolvers = {
    Query: {
      regions (root, args, context) {
        return aggregate(aggregateRegion)
      },
      prestations (root, args, context) {
        return aggregate(aggregatePrestation)
      },
      departments (root, args, context) {
        return aggregate(aggregateDepartments)
      },
      departmentById (root, args, context) {
        return aggregate(aggregateDetailsByDepartment(args.departmentId))
      },
      departmentByIdForYear (root, args, context) {
        return aggregate(aggregateDepartmentByIdSorted(args.departmentId))
      },
      departmentByIdForMonth (root, args, context) {
        return aggregate(aggregateDepartmentByMonth(args.departmentId))
      }
    }
}

// on exporte la définition de 'resolvers'
export default resolvers;
