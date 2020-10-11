import Pokemon from "../database/schemas/pokemon";
import fs from "fs";
import express, { Router } from 'express'
import cors from "cors";

const app = Router();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.get('/pokemons', async (req, res) => {
    const pokemon = await Pokemon.find({});
    res.json(pokemon);
});

app.get('/pokemons/:id', async (req, res) => {
    const {id} = req.params
    const pokemon = await Pokemon.find({id : id});
    if(pokemon.length > 0)
    {
        res.json(pokemon);
    }
    else
    {
        res.json("pokemon not found")
    }
});

app.post('/pokemons', async (req, res) => {
    let list= await Pokemon.find({})
    const {path}= req.body
    if(list.length === 0)
    {
        const json=fs.readFileSync(path)
        const list_pokemon=JSON.parse(String(json))
        Pokemon.insertMany(list_pokemon).then(function(){
            res.json("Data inserted Pokemon")  // Success
        }).catch(function(error){
            res.json(error)      // Failure
        });
    }
    else
    {
        res.json("Date pokemon is present")
    }

});

app.put('/pokemons/:id', async function (req, res) {
    const {id} = req.params
    const pokemon = await Pokemon.find({id : id});
    if(pokemon.length > 0)
    {
        Pokemon.update(req.params, req.body).then(function(){
            res.json("Pokemon update success"); // Success
        }).catch(function(error){
            res.json(error); // Failure
        });
    }
    else
    {
        res.json("pokemon not found")
    }
});

app.delete('/pokemons/:id', async function (req, res) {
    const {id} = req.params
    let list= await Pokemon.find({id : id})
    if (list.length > 0)
    {
        Pokemon.deleteOne({ id: id }).then(function(){
            res.json("Pokemon delete success"); // Success
        }).catch(function(error){
            res.json(error); // Failure
        });
    }
    else
    {
        res.json("Pokemon not found")
    }
})

export default app