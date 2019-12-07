const ingredients = require("./data/ingredients");
const recipies= require("./data/recipies")
const connection = require("./config/mongoConnection")

let sashsId= null
let lucyId=null

async function main() {

        try {
            let allIng = await ingredients.getAll()
            console.log(allIng)
        }
        catch(e){
            console.log(e)
        }

        try {
            let allRec = await recipies.getAll()
            console.log(allRec)
        }
        catch(e){
            console.log(e)
        }

    // try{
    //     let m="In a large skillet, combine scallions, 1/2 teaspoon salt, 1/4 teaspoon pepper, and 1/2 cup water; cook over medium-high heat, stirring often, until scallions wilt and pan is almost dry, 8 to 10 minutes.||Add cream; stir to coat. Cover; reduce heat to low, and cook at a bare simmer (cream will separate if boiled), stirring occasionally, until scallions are tender, 20 minutes.|| Meanwhile, cook pasta in a large pot of boiling salted water until al dente, according to package instructions. Reserve 1/4 cup pasta water; drain pasta, and return to pot.||Toss pasta with warm sauce and reserved pasta water; season with salt and pepper. Serve immediately."
    //     let spaghetti = await recipies.create("spaghetti", ["5db0b7752a0781fa57e2e8c6","5db0b77f2a0781fa57e2e8c9","5db0b7142a0781fa57e2e8b0"], 35, m);
    //     // lemonId=animalSasha._id.toString()
    //     console.log(spaghetti);
    // }
    // catch(e){
    //     console.log (e);
    // }

    // try{
    //     let lemon = await ingredients.create("spaghetti", []);
    //     // lemonId=animalSasha._id.toString()
    //     console.log(lemon);
    // }
    // catch(e){
    //     console.log (e);
    // }

    // try{
    //     let lemon = await ingredients.create("spaghetti", []);
    //     // lemonId=animalSasha._id.toString()
    //     console.log(lemon);
    // }
    // catch(e){
    //     console.log (e);
    // }
    // try{
    //     let apple = await ingredients.create("apple", "Fruits");
    //     // lucyId=animalLucy._id.toString()
    //     console.log(apple)
    // }
    // catch(e){
    //     console.log (e);
    // }
    
    // let allMyAnimals = await animals.getAll();
    // console.log(allMyAnimals);

    // try{
    //     let animalDuke = await animals.create("Duke", "Walrus");
    //     console.log(animalDuke)
    // }
    // catch(e){
    //     console.log (e);
    // }
    
    // try{
    //     let renameSasha = await animals.rename(sashsId, "Sashita");
    //     console.log(renameSasha)
    // }
    // catch(e){
    //     console.log (e);
    // }

    // try{
    //     let removeLucy = await animals.remove(lucyId);
    // }
    // catch(e){
    //     console.log (e);
    // }

    // let MyAnimals = await animals.getAll();
    // console.log(MyAnimals);
    
    const db = await connection();
    await db.serverConfig.close();
}

main();