import React from 'react';
import {Button, Column, Columns, Container} from 'trunx'
import '../App.css';
import 'bulma/css/bulma.css'
import '../css/pokemon.css'

interface ITestProps {
}

interface ITestState {
    pokemons: [];
    delete_info: string
}

export default class PokemonDetails extends React.Component<ITestProps, ITestState> {
    constructor(props: ITestProps) {
        super(props);

        this.state = {
            pokemons: [],
            delete_info: ""
        };
    }

    componentDidMount() {
        this.getPokemonById()
    }

    getPokemonById() {
        const id = window.location.pathname.split("/")

        fetch(`http://localhost:8080/pokemons/${id[2]}`)
            .then(res => res.json())
            .then(pokemon => {
                this.setState({pokemons: pokemon})
            })
            .catch(error => {
                window.location.href = "/notfound"
            });
    }

    deletePokemonById() {
        const id = window.location.pathname.split("/")

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Accept", "application/json");

        const requestOptions: object = {
            method: 'DELETE',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`http://localhost:8080/pokemons/${id[2]}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                this.setState({delete_info: result})
                alert("Pokemon is deleted")
                window.location.href = "/pokemons"
            })
            .catch(error => console.log('error', error));
    }


    render() {
        return (
            <Container isWidescreen>
                <a href="/pokemons"><h1
                  className="title"> Pokedex</h1></a>
                {this.state.pokemons.map((pokemon: {
                        id: number; name: string, image: string, num: number, types: [string],
                        description: string, species: string, height: string, weight: string, gen: string, candy: string,
                        candy_count: number, egg: string, spawn_chance: number, spawn_time: string
                    }) =>
                        <li className="list" key={pokemon.id}>
                            <Columns isDesktop>
                                <Column>
                                    <div className="border1_image">
                                        <a className="img_margin" href={`/pokemons/${pokemon.id}`}> <img
                                            src={pokemon.image} width="300" height="200"/></a>
                                    </div>
                                    <div className="border1_details">
                                        <p className="num_pokemon_details">{pokemon.num}</p>
                                        <p className="name_pokemon_details">{pokemon.name}</p>
                                    </div>
                                    <div className="container"></div>
                                    <Columns isDesktop>
                                        <Column>
                                            <Button isDanger onClick={() => this.deletePokemonById()}>Delete</Button>
                                        </Column>
                                        <Column>
                                            <Button isInfo
                                                    onClick={() => window.location.href = `/pokemons/edit/${pokemon.id}`}>Edit</Button>
                                        </Column>
                                    </Columns>
                                </Column>
                                <Column>
                                    <div className="border_feature">
                                        <h1 className="title1_details"> Feature </h1>
                                        <p className="text_details">Génération
                                            : {pokemon.gen}</p>
                                        <p className="text_details">Species
                                            : {pokemon.species}</p>
                                        <p className="text_details">Description
                                            : {pokemon.description}</p>
                                        <p className="text_details">Height
                                            : {pokemon.height}</p>
                                        <p className="text_details">Weigth
                                            : {pokemon.weight}</p>
                                    </div>
                                    <div className="container"></div>
                                    <div className="border_feature">
                                        <h1 className="title1_details"> Candy et eggs </h1>
                                        <p className="text_details">Candy
                                            : {pokemon.candy}</p>
                                        <p className="text_details">Egg
                                            : {pokemon.egg}</p>
                                    </div>
                                    <div className="container"></div>
                                    <div className="border_feature">
                                        <h1 className="title1_details"> Drop rate </h1>
                                        <p className="text_details">Candy Count
                                            : {pokemon.candy_count}</p>
                                        <p className="text_details">Spawn Chance
                                            : {pokemon.spawn_chance}</p>
                                        <p className="text_details">Spawn Time
                                            : {pokemon.spawn_time}</p>
                                    </div>
                                </Column>
                            </Columns>
                        </li>
                )}
            </Container>

        );
    }
}