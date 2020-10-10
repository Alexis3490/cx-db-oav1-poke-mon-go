import React from 'react';
import '../App.css';
import 'bulma/css/bulma.css'
import { Container } from 'trunx'

interface ITestProps {}

interface ITestState {
    pokemons: [];
    data: string;
}
export default class Pokemon extends React.Component<ITestProps, ITestState> {
    constructor(props: ITestProps) {
        super(props);

        this.state = {
            pokemons: [],
            data: ""
        };
    }

    componentDidMount() {
        this.getAllPokemon()
        if( this.state.pokemons.length === 0)
        {
            this.addAllPokemon()
            if(this.state.data === "Data inserted Pokemon")
            {
                this.getAllPokemon()
            }
        }
    }

    getAllPokemon() {
        fetch(`http://localhost:8080/pokemons/`)
            .then(res => res.json())
            .then(pokemon => this.setState({pokemons: pokemon}))
    }

    addAllPokemon()
    {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({"path":"./db/pokemon.json"});

        const requestOptions:object = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:8080/pokemons", requestOptions)
            .then(response => response.text())
            .then(result =>this.setState({data: result}))
            .catch(error => console.log('error', error));
    }


        render() {
      return (
        <Container isWidescreen>
           <a href="/pokemons" target="_blank"><h1 style={{fontSize:45, marginLeft: '30%', marginTop: '1%'}}> Pokedex</h1></a>
            {this.state.pokemons.map((pokemon: { id: number; name: string, image: string, num: number, types: [string] }) =>
                    <li style={{marginRight:"5%", display:"inline-block", marginTop:20}} key={pokemon.id}>
                        <div style={{borderColor: '6px solid #585858', backgroundColor: '#585858', height: 140, width: 170}}>
                        <a style={{marginLeft:20}} href={`/pokemons/${pokemon.id}`}> <img src={pokemon.image}/></a>
                        </div>
                        <div style={{borderColor: '6px solid #BDBDBD', backgroundColor: '#BDBDBD', height: 100, width: 170}}>
                        <p style={{marginLeft:60}}>{pokemon.num}</p>
                        <p style={{marginLeft:50}}>{pokemon.name}</p>
                        </div>
                    </li>
                        )}
        </Container>
    );
  }
}