import express from 'express';
import cors from 'cors';
import { error, info, success } from './helpers/display'
import checkEnv from './helpers/checkEnv'
import { connect } from './database';
import Pokemon from './database/schemas/pokemon'
import fs from 'fs'

const app = express();
const PORT = 8080;

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
  if(list.length >= 1)
  {
    const json=fs.readFileSync(path)
    const list_pokemon=JSON.parse(String(json))
    Pokemon.insertMany(list_pokemon).then(function(){
      res.json("Data inserted")  // Success
    }).catch(function(error){
      res.json(error)      // Failure
    });
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

app.listen(PORT, async function() {
  console.log(`Listening on ${PORT}`);
  checkEnv(['PORT', 'HOST', 'DATABASE_URI'])
  info('Server initialization...')
  await connect(process.env.DATABASE_URI as string).then(async () => {
    console.log('MongoDb connected');
  });
});
