import React from 'react';
import '../App.css';
import 'bulma/css/bulma.css'
import { Container, Columns, Column, Button } from 'trunx'

interface ITestProps {}

interface ITestState {
    pokemons: [];
    delete_info: string
}
export default class PokemonDetails extends React.Component<ITestProps, ITestState> {
    constructor(props: ITestProps) {
        super(props);

        this.state = {
            pokemons: [],
            delete_info : ""
        };
    }

    componentDidMount() {
         this.getPokemonById()
    }

    getPokemonById() {
        const id=window.location.pathname.split("/")

        fetch(`http://localhost:8080/pokemons/${id[2]}`)
            .then(res => res.json())
            .then(pokemon =>
            {
                this.setState({pokemons: pokemon})
            })
            .catch(error => {
             window.location.href='/notfound'
            });
    }

    deletePokemonById()
    {
        const id=window.location.pathname.split("/")

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Accept", "application/json");

        const requestOptions:object = {
            method: 'DELETE',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`http://localhost:8080/pokemons/${id[2]}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                this.setState({delete_info: result})
                alert("Pokemon is deleted")
                window.location.href="/pokemons"
            })
            .catch(error => console.log('error', error));
    }


        render() {
      return (
          <Container isWidescreen>
              <a href="/pokemons" target="_blank"><h1 style={{fontSize:45, marginLeft: '30%', marginTop: '1%'}}> Pokedex</h1></a>
              {this.state.pokemons.map((pokemon: { id: number; name: string, image: string, num: number, types: [string],
                description: string, species: string, height: string, weight: string, gen: string, candy: string,
                candy_count : number, egg: string, spawn_chance: number, spawn_time: string}) =>
                <li style={{marginRight:"5%", display:"inline-block", marginTop:20}} key={pokemon.id}>
                <Columns>
                <Column>
                <div style={{borderColor: '6px solid #585858', backgroundColor: '#585858', height: 300, width: 400}}>
                <a style={{marginLeft:60}} href={`/pokemons/${pokemon.id}`}> <img src={pokemon.image} width="300" height="200"/></a>
                </div>
                <div style={{borderColor: '6px solid #BDBDBD', backgroundColor: '#BDBDBD', height: 100, width: 400}}>
                <p style={{marginLeft:160, fontSize: 30}}>{pokemon.num}</p>
                <p style={{marginLeft:140, fontSize:30}}>{pokemon.name}</p>
                </div>
                <div style={{marginTop:20}}> </div>
                <Columns>
                <Column>
                <Button isDanger onClick={()=> this.deletePokemonById()}>Delete</Button>
                </Column>
                <Column>
                <Button isInfo onClick={() => window.location.href=`/pokemons/edit/${pokemon.id}`}>Edit</Button>
                </Column>
                </Columns>
                </Column>
                <Column>
                <div style={{borderColor: "2px solid grey", backgroundColor: "grey", width: 500, height: 250, marginLeft: 10}}>
                <h1 style={{color: "black", fontSize: 30, marginLeft: 140}}> Feature </h1>
                <p style={{marginLeft: 10, marginBottom: 20, color: "white"}}>Génération :  {pokemon.gen}</p>
                <p style={{marginLeft: 10, marginBottom: 20, color: "white"}}>Species :  {pokemon.species}</p>
                <p style={{marginLeft: 10, marginBottom: 20, color: "white"}}>Description :  {pokemon.description}</p>
                <p style={{marginLeft: 10, marginBottom: 20, color: "white"}}>Height :  {pokemon.height}</p>
                <p style={{marginLeft: 10, marginBottom: 20, color: "white"}}>Weigth :  {pokemon.weight}</p>
                </div>
                <div style={{marginTop:20}}></div>
                <div style={{borderColor: "2px solid grey", backgroundColor: "grey", width: 500, height: 120, marginLeft: 10}}>
                <h1 style={{color: "black", fontSize: 30, marginLeft: 140}}> Candy et  eggs </h1>
                <p style={{marginLeft: 10, marginBottom: 20, color: "white"}}>Candy :  {pokemon.candy}</p>
                <p style={{marginLeft: 10, marginBottom: 20, color: "white"}}>Egg :  {pokemon.egg}</p>
                </div>
                <div style={{marginTop:20}}></div>
                <div style={{borderColor: "2px solid grey", backgroundColor: "grey", width: 500, height: 160, marginLeft: 10}}>
                <h1 style={{color: "black", fontSize: 30, marginLeft: 140}}> Drop rate </h1>
                <p style={{marginLeft: 10, marginBottom: 20, color: "white"}}>Candy Count :  {pokemon.candy_count}</p>
                <p style={{marginLeft: 10, marginBottom: 20, color: "white"}}>Spawn Chance :  {pokemon.spawn_chance}</p>
                <p style={{marginLeft: 10, marginBottom: 20, color: "white"}}>Spawn Time :  {pokemon.spawn_time}</p>
                </div>
                </Column>
                </Columns>
                </li>
                )}
          </Container>

    );
  }
}