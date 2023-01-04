const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");

const categoriesController = require("./categories/CategoriesController");
const articlesController = require("./articles/ArticlesController");

const Article = require("./articles/Article");
const Category = require("./categories/Category");

//View Engine
app.set("view engine", "ejs");

//Static
app.use(express.static('public'));

//Body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//DataBase

connection
  .authenticate()
  .then(()=>{
    console.log("Conexão feita com sucesso!");
  }).catch((error) =>{
    console.log(error);
  })
  
app.use("/", categoriesController);
app.use("/", articlesController);

app.get("/", (req, res) => {
  Article.findAll({
    order:[
        ['id','DESC']
    ],
    limit: 4
}).then(articles => {
    Category.findAll().then(categories => {
        res.render("index", {articles: articles, categories: categories});
    });
});
})

app.listen(8080, () => {
  console.log("O servidor está rodando!")
})

