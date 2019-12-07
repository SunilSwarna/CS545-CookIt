const mongoCollections = require("../config/mongoCollections");
const recipies = mongoCollections.recipies;
const ingredients = mongoCollections.ingredients;

const { ObjectId } = require('mongodb');

module.exports = {

    async create(name, type) {
        if (!name) throw "You must provide a name for the ingredient";
        if(typeof name!='string') throw "Name is not string";
    
        if (!type) throw "You must provide type of the ingredient";
        if (typeof type!='string') throw "Ingredient Type is not string";


        const ingredientCollection = await ingredients();
    
        let newIngredient = {
          'name' : name.toLowerCase(), 
          'type' : type.toLowerCase()
        };
        const ingredientCount = await ingredientCollection.findOne(newIngredient);
        if(ingredientCount === null){
          
          const insertInfo = await ingredientCollection.insertOne(newIngredient);
          if (insertInfo.insertedCount === 0){
            throw "Could not add the  Ingredient";
          } 
      
          const newId = insertInfo.insertedId;
          const ingredient = await this.get(newId.toString());
          return ingredient;
        }
        throw "Already existing in the database!..."

      },  


  async get(id) {
    if (!id) throw "You must provide an id to search for";
    if(typeof id!='string') throw "Id is not string";

    const ingredientCollection = await ingredients();
    const objId = ObjectId.createFromHexString(id);
    const ingredientById = await ingredientCollection.findOne({ _id: objId });
    if (ingredientById === null) {
      throw "No ingredient with that id";
    }

    return ingredientById;
  },

  async getAll() {
    const ingredientCollection = await ingredients();

    const allIngredients = await ingredientCollection.find({}).toArray();

    return allIngredients;
  },

  
  async remove(id) {
    if (!id) throw "You must provide an id to search for";
    if(typeof id!='string') throw "Id is not string";

    const animalCollection = await animals();
    const objId = ObjectId.createFromHexString(id);
    const removedAnimal = await this.get(id);

    const deletionInfo = await animalCollection.removeOne({ _id: objId });

    if (deletionInfo.deletedCount === 0) {
      throw `Could not delete animal with id of ${id}`;
    }
    return removedAnimal;
  },

  async rename(id, newName) {
    if (!id) throw "You must provide an id to search for";
    if(typeof id!='string') throw "Id is not string";

    if (!newName) throw "You must provide a name to rename the animal";
    if(typeof newName!='string') throw "newName is not string";

    const animalCollection = await animals();
    const objId = ObjectId.createFromHexString(id);

    const updateAnimal = {
        $set:{ name: newName }
    };
    const updateInfo = await animalCollection.updateOne({ _id: objId  }, updateAnimal);

    if (updateInfo.modifiedCount === 0) throw "could not rename animal  successfully";

    return await this.get(id);
  }

};