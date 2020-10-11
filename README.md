# Pokemon Go


## Download project

- `git clone https://github.com/Alexis3490/cx-db-oav1-poke-mon-go.git`

## Launching with docker compose

- `docker-compose up -d`or `docker-compose up`

## Before request postman
Be careful before launching get/post/put/delete requests on postman. You have to do the post on postman or launch the react with the url : http://localhost/pokemons

## Connect to express with docker

### All router in express

#### Route with the GET Method

- no parameters in body
- http://localhost:8080/pokemons (list of all pokemons)
- ex: http://localhost:8080/pokemons/1
>
- no parameters in body
- http://localhost:8080/pokemons/:id (list of pokemons by id)
- ex: http://localhost:8080/pokemons/1

#### Route with the POST Method

- parameters is path with data pokemon.json
- http://localhost:8080/pokemons (add all pokemons)
- ex: http://localhost:8080/pokemons/1

#### Route with the DELETE Method

- no parameters in body
- http://localhost:8080/pokemons/:id (delete of pokemon by id)
- ex: http://localhost:8080/pokemons/1

#### Route with the PUT Method

- parameters are information want to modify with pokemon
- http://localhost:8080/pokemons/:id (modify of pokemon by id)
- ex: http://localhost:8080/pokemons/1

## Connection to react with docker 

### All router

- http://localhost/pokemons (list of all pokemon)
- ex: http://localhost/pokemons
>
- http://localhost/pokemons/:id (details of pokemon by id)
- ex: http://localhost/pokemons/1
>
- http://localhost/pokemons/edit/:id (modified details of pokemon by id)
- ex: http://localhost/pokemons/edit/1
