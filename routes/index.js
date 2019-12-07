
// const loginRoute = require("./login");

const data = require("../ingredients")

const user = require("../data/users")
const constructorMethod = app => {

  app.get("/", async (req, res) => {
    if (req.cookies.user) {
      var msg = req.cookies.user.details
      return res.render("indexpage", { message: "CookIt", "user": msg })
    }
    return res.render("indexpage", { message: "Welcome to CookIt", "show":true });

  });

  app.get("/getrecipies", async (req, res) => {

    var getRecipies = req.cookies.recipies.data

    output = []
    for (let i = 0; i < data.length; i++) {
      const result = data[i].recipies.every(val => getRecipies.includes(val));
      var description = undefined
      if (result) {
        description = data[i].description
        description = description.split("\n")
        description = Array.from(description, value => value.trim())
        data[i].chdescription = description
        output.push(data[i])
      }
    }
    var boolIf = output.length > 0 ? true : false;
    return res.render('recipies', { "data": output, "boolIf": boolIf })
  });

  app.get("/check", async (req, res) => {

    return res.render('recipies', { "data": [{ "recipies": ["Butter", "Egg"], "time": 10, "name": "French Omelette", "description": ["Have a cast iron skillet with a lid and use the clarified butter to coat well the bottom and sides.", "Whip the egg whites with a pinch of salt.Beat the yolks until foamy.Fold egg yolks into egg whites until well incorporated.", "Gently pour the eggs mixture into the heated cast iron skillet. Cover and slowly cook until fluffy and done.", "I loved making this with a chopped onion that had been browned well, before making the omelette. I poured the eggs on top of the onions and cooked. Then I covered in Hollandaise sauce."] }] })

  })

  app.post("/ajax", async (req, res) => {
    console.log(req.body)
    res.cookie("recipies", { "data": req.body.recipies });
    return res.json({ success: true, message: res.cookies });
  })


  app.get('/login', async (req, res) => {
    try {
      if (req.cookies.userData) {
        req.loginMessage = req.cookies.userData.message
        res.clearCookie("userData")
        return res.render("login", { title: "Login Page", "message": req.loginMessage })
      }
      return res.render("login", { title: "Login Page" });
    } catch (e) {
      res.status(404).json({ "error": "Couldn't load page" });
    }
  })

  app.get('/signup', async (req, res) => {
    try {
      res.render("signup", { title: "Signup Page" });
    } catch (e) {
      res.status(404).json({ "error": "Couldn't load page" });
    }
  })

  app.get('/logout', async (req, res) => {
    res.clearCookie("user")
    res.redirect("/");
  });

  app.post('/login', async (req, res) => {
    try {
      if (!req.body) return res.status(400).render("login", { error: "Bad Request" });
      if (!req.body.inputEmail || !req.body.password) {
        return res.status(400).render("login", { error: "One of the fileds is missing" })
      }
      const foundUser = await user.checkUser(req.body.inputEmail, req.body.password);
      if (foundUser.checkValidUser) {
        res.cookie("user", { "details": foundUser.userInfo });

        res.redirect("/");
      } else {
        throw "Email or password not correct!";
      }
    } catch (e) {
      return res.status(404).render("login", { error: e })
    }
  })

  app.post('/signup', async (req, res) => {

    try {
      if (!req.body) return res.status(400).render("signup", { title: "Signup Page", error: "Bad Request" });
      if (!req.body.firstName || !req.body.lastName || !req.body.inputEmail || !req.body.password || !req.body.confirmPassword) {
        return res.status(400).render("signup", { title: "Signup Page", error: "One of the fileds is missing" })
      }
      if (req.body.password != req.body.confirmPassword) {
        return res.status(400).render("signup", { title: "Signup Page", error: "Passwords do not match!" })
      }
      await user.createUser(req.body.firstName, req.body.lastName, req.body.inputEmail.toLowerCase(), req.body.password);
      res.cookie("userData", { "message": req.body.firstName + " is Successfully Signed up!" });
      return res.redirect("/login");
    } catch (e) {
      return res.status(404).render("signup", { title: "Signup Page", error: e })
    }
    // res.redirect('/signup')
  })


  app.use("*", (req, res) => {
    return res.render("indexpage", { message: "Welcome to CookIt! " });
  });
};

module.exports = constructorMethod;