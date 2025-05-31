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

const aggregatePrestation = [
  {
    $group: {
      _id: {
        prestation_id: '$prestation.id',
        prestation_description: '$prestation.description',
      },
      sum: {
        $sum: '$price'
      },
      avg: {
        $avg: '$price'
      },
      count: {
        $sum: 1
      }
    }
  },
  {
    $project: {
      id: '$_id.prestation_id',
      description: '$_id.prestation_description',
      sum: 1,
      avg: 1,
      count: 1,
      _id: 0
    }
  }
]

const aggregateDepartments = [
  {
    $group: {
      _id: {
        prestation_department: '$address.department.id',
        prestation_department_nom: '$address.department.name'
      },
      sum: {
        $sum: '$price'
      },
      avg: {
        $avg: '$price'
      },
      count: {
        $sum: 1
      }
    }
  },
  {
    $project: {
      department: '$_id.prestation_department',
      name: '$_id.prestation_department_nom',
      sum: 1,
      avg: 1,
      count: 1,
      _id: 0
    }
  }
]

const aggregateRegions = [
  {
    $group: {
      _id: {
        prestation_region: '$address.region.id',
        prestation_region_nom: '$address.region.name'
      },
      sum: {
        $sum: '$price'
      },
      avg: {
        $avg: '$price'
      },
      count: {
        $sum: 1
      }
    }
  },
  {
    $project: {
      id: '$_id.prestation_region',
      name: '$_id.prestation_region_nom',
      sum: 1,
      avg: 1,
      count: 1,
      _id: 0
    }
  }
]

const aggregateClient = [
  {
    $group: {
      _id: {
        client_id: '$client.id',
        client_firstname: '$client.firstname',
        client_lastname: '$client.lastname',
        prestation_description: '$prestation.description',
        client_street: '$client.street',
        client_city: '$client.city.name',
        client_zip: '$client.zip', 
        prestation_city: '$address.city',
        prestation_department: '$address.department.id',
        department_name: '$address.department.name',
        price: '$price',
        date: '$date.text'
      },
    }
  },
  {
    $project: {
      id: '$_id.client_id',
      firstname: '$_id.client_firstname',
      lastname: '$_id.client_lastname',
      description: '$_id.prestation_description',
      street: '$_id.client_street',
      cli_city: '$_id.client_city',
      pre_city: '$_id.prestation_city',
      zip: '$_id.client_zip',
      department: '$_id.prestation_department',
      d_name: '$_id.department_name',
      date: '$_id.date',
      price: '$_id.price',
      _id: 0
    }
  }
]

const aggregatePrestationbyRegionAndYearCA = [
  {
    $group: {
      _id: {
        year:'$date.year',
        month:'$date.month',
        region: '$address.region.id',
        region_name: '$address.region.name'
      },
      sum: {
        $sum: '$price'
      },
      avg: {
        $avg: '$price'
      },
      count: {
        $sum: 1
      }
    }
  },
  {
    $project: {
      year: '$_id.year',
      month: '$_id.month',
      name: '$_id.region_name',
      id:'$_id.region',
      sum: 1,
      avg: 1,
      count: 1,
      _id: 0
    }
  }
]

const aggregatePrestationByDepartment = [
  {
    $group: {
      _id: {
        prestation_id: '$prestation.id',
        prestation_description: '$prestation.description',
        department: '$address.department.name'
      },
      sum: {
        $sum: '$price'
      },
      avg: {
        $avg: '$price'
      },
      count: {
        $sum: 1
      }
    }
  },
  {
    $project: {
      id: '$_id.prestation_id',
      description: '$_id.prestation_description',
      department:'$_id.department',
      sum: 1,
      avg: 1,
      count: 1,
      _id: 0
    }
  }
]
const aggregatePrestationByHour = [

  {

    $group: {

      _id: {

        hour: '$date.hour',

      },

      sum: {

        $sum: '$price'

      },

      avg: {

        $avg: '$price'

      },

      count: {

        $sum: 1

      }

    }

  },

  {

    $project: {

      hour: '$_id.hour',

      sum: 1,

      avg: 1,

      count: 1,

      _id: 0

    }

  }

]



const aggregatePrestationbyRegionAndYear = [
  {
    $group: {
      _id: {
        prestation_id: '$prestation.id',
        prestation_description: '$prestation.description',
        year:'$date.year',
        trimester:'$date.trimester',
        region: '$address.region.id',
        region_name: '$address.region.name'
      },
      sum: {
        $sum: '$price'
      },
      avg: {
        $avg: '$price'
      },
      count: {
        $sum: 1
      }
    }
  },
  {
    $project: {
      id: '$_id.prestation_id',
      description: '$_id.prestation_description',
      year: '$_id.year',
      trimester: '$_id.trimester',
      region:'$_id.region',
      r_nom:'$_id.region_name',
      sum: 1,
      avg: 1,
      count: 1,
      _id: 0
    }
  }
]


// on définit une fonction qui effectue l'aggrégation voulue
async function aggregate(aggregation) {
  const result = await collection.aggregate(aggregation).toArray();
  return result;
}

//on définit une fonction qui effectue l'aggrégation voulue avec paramètre
async function aggregateWithValue(aggregation, key, value) {
  let newAggregation = [{$match: { [key] : value}}, ...aggregation]
  const result = await collection.aggregate(newAggregation).toArray();
  return result;
}

// un résolveur simple pour la requête 'books' de type Query
// qui renvoie la variable 'books'
const resolvers = {
  Query: {
    prestations (root, args, context) {
      return aggregate(aggregatePrestation)
    },
    departments (root, args, context) {
      return aggregate(aggregateDepartments)
    },
    regions (root, args, context) {
      return aggregate(aggregateRegions)
    },
    prestationsByHour(root, args, context) {
      return aggregate(aggregatePrestationByHour)
    },
    CAByRegion(root, args, context) {
      return aggregateWithValue(aggregatePrestationbyRegionAndYearCA, 'address.region.id', args.region)
    },
    clientByDepartment (root, args, context) {
      return aggregateWithValue(aggregateClient, 'address.department.id', args.department)
    },
    prestationsByDpt (root, args, context) {
      return aggregateWithValue(aggregatePrestationByDepartment, 'address.department.name', args.department)
    },
    prestationsByRegionAndYear: async (_, { region, year }) => {
      const aggregation = [...aggregatePrestationbyRegionAndYear]
      aggregation.unshift({ $match: { 'address.region.id': region,'date.year':year} })
      return aggregate(aggregation)
    },
  }
}

// on exporte la définition de 'resolvers'
export default resolvers;
