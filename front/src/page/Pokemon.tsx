import React from 'react';
import {Container} from 'trunx'
import '../App.css';
import 'bulma/css/bulma.css'
import '../css/pokemon.css'

interface ITestProps {
}

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
        if (this.state.pokemons.length === 0) {
            this.addAllPokemon()
            if (this.state.data === "Data inserted Pokemon") {
                this.getAllPokemon()
            }
        }
    }

    getAllPokemon() {
        fetch(`http://localhost:8080/pokemons/`)
            .then(res => res.json())
            .then(pokemon => this.setState({pokemons: pokemon}))
    }

    addAllPokemon() {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({"path": "./db/pokemon.json"});

        const requestOptions: object = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:8080/pokemons", requestOptions)
            .then(response => response.text())
            .then(result => this.setState({data: result}))
            .catch(error => console.log('error', error));
    }


    render() {
        return (
            <Container isWidescreen>
                <a href="/pokemons"><h1 className="title"> Pokedex</h1></a>
                {this.state.pokemons.map((pokemon: { id: number; name: string, image: string, num: number, types: [string] }) =>
                    <li className="list" key={pokemon.id}>
                        <div className="border1">
                            <a className="img" href={`/pokemons/${pokemon.id}`}> <img src={pokemon.image}/></a>
                        </div>
                        <div className="border2">
                            <p className="num_pokemon_home">{pokemon.num}</p>
                            <p className="name_pokemon_home">{pokemon.name}</p>
                        </div>
                    </li>
                )}
            </Container>
        );
    }
}