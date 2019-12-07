const mongoCollections = require("../config/mongoCollections");
const recipies = mongoCollections.recipies;

const { ObjectId } = require('mongodb');

module.exports = {

  async create(name, ingredients, time, description) {
    if (!name) throw "You must provide a name for the recipie";
    if (typeof name != 'string') throw "Name is not string";

    if (!ingredients) throw "You must provide type of the recipie";
    if (!Array.isArray(ingredients)) throw "Ingredient Type is not Array";

    if (!time) throw "You must provide time for the recipie";
    if (!Number.isInteger(time)) throw "Time is not of integer type";

    if (!description) throw "You must provide description of the recipie";
    if (typeof description != 'string') throw "description is not string";


    const recipieCollection = await recipies();

    let newRecipie = {
      'name': name.toLowerCase()
      //   'ingredients' : ingredients
    };
    const recipieCount = await recipieCollection.findOne(newRecipie);
    if (recipieCount === null) {
      newRecipie['ingredients'] = ingredients
      newRecipie['time'] = time
      newRecipie['description'] = description

      const insertInfo = await recipieCollection.insertOne(newRecipie);
      if (insertInfo.insertedCount === 0) {
        throw "Could not add the  Recipie";
      }

      const newId = insertInfo.insertedId;
      const recipie = await this.get(newId.toString());
      return recipie;
    }
    throw "Already existing in the database!..."

  },
  async getAll() {
    const recipieCollection = await recipies();

    const allrecipies = await recipieCollection.find({}).toArray();

    return allrecipies;
  },

  async get(id) {
    if (!id) throw "You must provide an id to search for";
    if (typeof id != 'string') throw "Id is not string";

    const recipieCollection = await recipies();
    const objId = ObjectId.createFromHexString(id);
    const recipieById = await recipieCollection.findOne({ _id: objId });
    if (recipieById === null) {
      throw "No recipie with that id";
    }

    return recipieById;
  },

}