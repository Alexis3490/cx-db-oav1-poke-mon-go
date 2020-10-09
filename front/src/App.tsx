import React from 'react';
import './App.css';
import 'bulma/css/bulma.css'
import { Container } from 'trunx'

interface ITestProps {}

interface ITestState {
    pokemons: [];
}
export default class Pokemon extends React.Component<ITestProps, ITestState> {
    constructor(props: ITestProps) {
        super(props);

        this.state = {
            pokemons: []
        };
    }

    componentDidMount() {
        this.getAllPokemon()
    }

    getAllPokemon() {
        fetch(`http://localhost:8080/pokemons/`)
            .then(res => res.json())
            .then(pokemon => this.setState({pokemons: pokemon}))
    }


        render() {
      return (
        <Container isWidescreen>
            <h1 style={{fontSize:45, marginLeft: '30%', marginTop: '1%'}}> Pokedex</h1>
            {this.state.pokemons.map((pokemon: { id: number; name: string, image: string, num: number }) =>


                    <li style={{marginRight:"5%", display:"inline-block", marginTop:20}} key={pokemon.id}>
                        <div style={{borderColor: '6px solid grey', backgroundColor: 'grey', height: 220, width: 170}}>
                        <a style={{marginLeft:20}}> <img src={pokemon.image}/></a>
                        <p style={{marginLeft:60}}>{pokemon.num}</p>
                        <p style={{marginLeft:50}}>{pokemon.name}</p>
                        </div>
                    </li>
                        )}
        </Container>
    );
  }
}