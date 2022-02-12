const express = require("express")
const bodyParser = require("body-parser")
const Sequelize = require("sequelize")
const cors = require("cors")
const querystring = require("querystring")

const fastcsv = require("fast-csv");
const fs = require("fs");
const ws = fs.createWriteStream("data.csv");

// function exportDB(data){
//     fastcsv
//     .write(data, { headers: true })
//     .on("finish", function() {
//       console.log("Write to CSV successfully!");
//     })
//     .pipe(ws);
// }

let sequelize = new Sequelize({
    dialect: "sqlite",
    storage : "myDb.db",
    define : {
        timestamps : false
}});

const Article = sequelize.define("article",{
    id: {
        type : Sequelize.INTEGER,
        primaryKey : true
    },
    titlu : {
        type : Sequelize.STRING,
        validate : {
            min : 5
        }
    
    },
    rezumat : {
        type : Sequelize.STRING,
        validate : {
            min : 10
        }
    },
    data:{
        type : Sequelize.DATE
    }

})

const Reference = sequelize.define("reference",{
    id: {
        type : Sequelize.INTEGER,
        primaryKey : true
    },
    titlu : {
        type : Sequelize.STRING,
        validate : {
            min : 5
        }
    },
   
    data:{
        type : Sequelize.DATE
    },

    listaAutori:{
        type : Sequelize.STRING
    }

})

Article.hasMany(Reference)

const app = express()
app.use(cors())
app.use(bodyParser.json())

sequelize.sync({force : false}).then(()=>{"db connection sucessful"}, (err)=>{
    console.log(err);
})

app.get("/articles", async (req, res,next)=>{
    try{  
        if(req.query){
            const titlu = req.query.titlu;
            console.log(titlu);
            const an = req.query.an;
            const criteriu = req.query.criteriu;  
            const tipSortare = req.query.order;  
            if(an || titlu){
               if(titlu){
                    const filteredArticles = await Article.findAll({where : {titlu:`${titlu}`}});
                    res.status(200).json(filteredArticles);
               }
            }
                if(criteriu && tipSortare){
                    const sortedArticles = await Article.findAll({order : [[`${criteriu}`,`${tipSortare}`]]})

                    res.status(200).json(sortedArticles);}
            }
               
    
        next();
    }
    catch(e){
        console.warn(e);
        res.status(500).json({message : "server error"});
    }
})

app.get("/articles", async (req, res)=>{
    try{
        const articles = await Article.findAll();
        console.log(articles);
        res.status(200).json(articles);
    }
    catch(e){
        console.warn(e);
        res.status(500).json({message : "server error"});
    }
})

app.get("/articles/:id", async (req,res)=>{
    try{
        const article = await Article.findByPk(req.params.id);
        if(article){
            res.status(200).json(article)
        }
        else {
            res.status(404).json({message:"not found"})
        }
       
    } 
    catch(error){
        console.warn(error);
        res.status(500).json({message:"server error"})
    }
})

app.post('/articles', async (req, res) => {
    try {
        
        await Article.create(req.body)
        res.status(201).json({ message: 'created' })
      
    } catch (error) {
      console.warn(error)
      res.status(500).json({ message: 'server error' })
    }
})

app.put("/articles/:id", async (req,res)=>{
    try{
        const article = await Article.findByPk(req.params.id);
        if(article){
            await article.update(req.body);
            res.status(202).json({message:"accepted"})
        }
        else {
            res.status(404).json({message:"not found"})
        }
       
    } 
    catch(error){
        console.warn(error);
        res.status(500).json({message:"server error"})
    }
})

app.delete("/articles/:id", async (req,res)=>{
    try{
        const article = await Article.findByPk(req.params.id);
        if(article){
            await article.destroy();
            res.status(202).json({message:"accepted"})
        }
        else {
            res.status(404).json({message:"not found"})
        }
       
    } 
    catch(error){
        console.warn(error);
        res.status(500).json({message:"server error"})
    }
})

app.get("/articles/:aid/references", async(req,res)=>{
    try{
        const article  =  await Article.findByPk(req.params.aid)
        if(article){
            const references =  await article.getReferences()
            console.log(references)
            res.status(200).json(references)
        }
        else {
            res.status(404).json({message : "not found"})
        }
    }
    catch(error){
        console.warn(error);
        res.status(500).json("server error")
    }
})

app.get("/articles/:aid/references/:rid", async(req,res)=>{
    try{
       
        const article  = await Article.findByPk(req.params.aid)
        if(article){
            const references =  await article.getReferences({where : {id : req.params.rid}})
            res.status(200).json(references);
        }
        else {
            res.status(404).json({message : "not found"})
        }
    }
    catch(error){
        console.warn(error);
        res.status(500).json("server error")
    }
})

app.post("/articles/:aid/references", async(req,res)=>{
    try{
        const article  =  await Article.findByPk(req.params.aid)
        console.log(article);
        if(article){ 
            const reference = req.body;
            reference.articleId = article.id;
            await Reference.create(reference);
            res.status(200).json({message : "accepted"})
        }
        else {
            res.status(404).json({message : "not found"})
        }
    }
    catch(error){
        console.warn(error);
        res.status(500).json("server error")
}})

app.put("/articles/:aid/references/:rid", async(req,res)=>{
    try{
        const article  = await Article.findByPk(req.params.aid)
        if(article){
            const references =  await article.getReferences({where : {id : req.params.rid}})
            const reference = references.shift();
            if(reference){
                await reference.update(req.body)
                res.status(200).json({message : "accepted"})
            }
            else{
                res.status(404).json({message : "not found"})
            }
        }
        else {
            res.status(404).json({message : "not found"})
        }
    }
    catch(error){
        console.warn(error);
        res.status(500).json("server error")
}})

app.delete("/articles/:aid/references/:rid", async(req,res)=>{
    try{
        const article  = await Article.findByPk(req.params.aid)
        if(article){
            const references =  await article.getReferences({where : {id : req.params.rid}})
            const reference = references.shift();
            if(reference){
                await reference.destroy()
                res.status(200).json({message : "accepted"})
            }
            else{
                res.status(404).json({message : "not found"})
            }
        }
        else {
            res.status(404).json({message : "not found"})
        }
    }
    catch(error){
        console.warn(error);
        res.status(500).json("server error")
    }})

app.listen(8080, ()=> console.log("server running"));
