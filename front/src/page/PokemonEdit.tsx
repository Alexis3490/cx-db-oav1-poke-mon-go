import React from 'react';
import {Button, Column, Columns, Container, Control, Field, Input, Label} from 'trunx'
import '../App.css';
import 'bulma/css/bulma.css'
import '../css/pokemon.css'

interface ITestProps {
}

interface ITestState {
    pokemon: [];
    gen: number;
    species: string;
    description: string;
    height: string;
    weight: string;
    candy: string;
    egg: string;
    candy_count: number;
    spawn_chance: number;
    spawn_time: string;
}

export default class PokemonEdit extends React.Component<ITestProps, ITestState> {
    constructor(props: ITestProps) {
        super(props);

        this.state = {
            pokemon: [],
            gen: 0,
            species: "",
            description: "",
            height: "",
            weight: "",
            candy: "",
            egg: "",
            candy_count: 0,
            spawn_chance: 0,
            spawn_time: "",
        };
    }

    componentDidMount() {
        this.getPokemonById()
    }

    getPokemonById() {
        const id = window.location.pathname.split("/")

        fetch(`http://localhost:8080/pokemons/${id[3]}`)
            .then(res => res.json())
            .then(pokemon => {
                this.setState({pokemon: pokemon})
            })
            .catch(error => {
                window.location.href = "/notfound"
            });

    }

    modifyPokemonById() {
        const {gen, species, description, height, weight, candy, egg, candy_count, spawn_chance, spawn_time} = this.state

        let field: any [] = [gen, species, description, height, weight, candy, egg, candy_count, spawn_chance, spawn_time]
        let data: string [] = ["gen", "species", "description", "height", "weight", "candy", "egg", "candy_count", "spawn_chance", "spawn_time"]
        let array_title = [];
        let array_data = [];
        for (let i = 0; i < field.length; i++) {
            if (typeof (field[i]) === "string") {
                if (field[i] !== "") {
                    array_title.push(data[i])
                    array_data.push(field[i])
                }
            }
            if (typeof (field[i]) === "number") {
                if (field[i] !== 0) {
                    array_title.push(data[i])
                    array_data.push(field[i])
                }
            }
        }

        let text_data = ""
        let object;
        for (let i = 0; i < array_data.length; i++) {
            let text_back = ""
            if (typeof (array_data[i]) === "number") {
                text_back = `"${array_title[i]}":${array_data[i]},`
            } else if (typeof (array_data[i]) === "string") {
                text_back = `"${array_title[i]}":"${array_data[i]}",`
            }
            text_data = text_back + text_data
        }
        object = text_data.substr(0, text_data.length - 1)
        object = `{${object}}`
        let json = JSON.parse(object)

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify(json);

        const requestOptions: object = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        const id = window.location.pathname.split("/")
        fetch(`http://localhost:8080/pokemons/${id[3]}`, requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result)
                alert("Votre update à réussit")
            })
            .catch(error => console.log('error', error));
    }

    render() {
        return (
            <Container isWidescreen>
                <a href="/pokemons"><h1
                   className="title"> Pokedex</h1></a>
                {this.state.pokemon.map((pokemon: {
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
                                </Column>
                                <Column>
                                    <div className="container_other">
                                        <h1 className="title_edit"> Feature </h1>
                                        <Field>
                                            <Label>Géneration</Label>
                                            <Control>
                                                <Input type='text' placeholder='' defaultValue={pokemon.gen}
                                                       onChange={(e) => this.setState({gen: parseInt(e.target.value)})}
                                                />
                                            </Control>
                                        </Field>
                                        <Field>
                                            <Label>Species</Label>
                                            <Control>
                                                <Input type='text' placeholder='' defaultValue={pokemon.species}
                                                       onChange={(e) => this.setState({species: e.target.value})}
                                                />
                                            </Control>
                                        </Field>
                                        <Field>
                                            <Label>Description</Label>
                                            <Control>
                                                <Input type='text' placeholder='' defaultValue={pokemon.description}
                                                       onChange={(e) => this.setState({description: e.target.value})}
                                                />
                                            </Control>
                                        </Field>
                                        <Field>
                                            <Label>height</Label>
                                            <Control>
                                                <Input type='text' placeholder='' defaultValue={pokemon.height}
                                                       onChange={(e) => this.setState({height: e.target.value})}
                                                />
                                            </Control>
                                        </Field>
                                        <Field>
                                            <Label>Weight</Label>
                                            <Control>
                                                <Input type='text' placeholder='' defaultValue={pokemon.weight}
                                                       onChange={(e) => this.setState({weight: e.target.value})}
                                                />
                                            </Control>
                                        </Field>
                                    </div>
                                    <div className="container"></div>
                                    <div className="container_other">
                                        <h1 className="title_edit"> Candy et eggs </h1>
                                        <Field>
                                            <Label>Candy</Label>
                                            <Control>
                                                <Input type='text' placeholder='' defaultValue={pokemon.candy}
                                                       onChange={(e) => this.setState({candy: e.target.value})}
                                                />
                                            </Control>
                                        </Field>
                                        <Field>
                                            <Label>Egg</Label>
                                            <Control>
                                                <Input type='text' placeholder='' defaultValue={pokemon.egg}
                                                       onChange={(e) => this.setState({egg: e.target.value})}
                                                />
                                            </Control>
                                        </Field>
                                    </div>
                                    <div className="container"></div>
                                    <div className="container_other">
                                        <h1 className="title_edit"> Drop rate </h1>
                                        <Field>
                                            <Label>Candy Count</Label>
                                            <Control>
                                                <Input type='text' placeholder='' defaultValue={pokemon.candy_count}
                                                       onChange={(e) => this.setState({candy_count: parseInt(e.target.value)})}
                                                />
                                            </Control>
                                        </Field>
                                        <Field>
                                            <Label>Spawn Chance</Label>
                                            <Control>
                                                <Input type='text' placeholder='' defaultValue={pokemon.spawn_chance}
                                                       onChange={(e) => this.setState({spawn_chance: parseFloat(e.target.value)})}
                                                />
                                            </Control>
                                        </Field>
                                        <Field>
                                            <Label>Spawn Time</Label>
                                            <Control>
                                                <Input type='text' placeholder='' defaultValue={pokemon.spawn_time}
                                                       onChange={(e) => this.setState({spawn_time: e.target.value})}
                                                />
                                            </Control>
                                        </Field>
                                    </div>
                                    <Columns>
                                        <Column>
                                            <Button className="border_button" onClick={() => this.modifyPokemonById()}
                                                    isInfo>Save</Button>
                                        </Column>
                                        <Column>
                                            <Button className="border_button"
                                                    onClick={() => window.location.href = `/pokemons/${(window.location.pathname.split("/"))[3]}`}
                                                    isDanger>Cancel</Button>
                                        </Column>
                                    </Columns>
                                </Column>
                            </Columns>
                        </li>
                )}
            </Container>
        );
    }
}