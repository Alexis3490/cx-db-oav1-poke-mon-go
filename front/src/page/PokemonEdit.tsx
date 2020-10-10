import React from 'react';
import '../App.css';
import 'bulma/css/bulma.css'
import { Container, Columns, Column, Field, Control, Input, Label, Button } from 'trunx'

interface ITestProps {}

interface ITestState {
    pokemon: [];
    gen: number;
    species: string;
    description : string;
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
        const id=window.location.pathname.split("/")

        fetch(`http://localhost:8080/pokemons/${id[3]}`)
            .then(res => res.json())
            .then(pokemon =>
            {
                this.setState({pokemon: pokemon})
            })
            .catch(error => {
             window.location.href="/notfound"
            });

    }

    modifyPokemonById()
    {
        const {gen, species, description, height, weight, candy, egg, candy_count, spawn_chance, spawn_time} = this.state

        let field : any [] = [gen, species, description, height, weight, candy, egg, candy_count, spawn_chance, spawn_time]
        let data : string [] = ["gen", "species", "description", "height", "weight", "candy", "egg", "candy_count", "spawn_chance", "spawn_time"]
        let array_title=[];
        let array_data=[];
        for(let i=0; i<field.length; i++)
        {
            if(typeof(field[i]) === "string")
            {
                if(field[i] !== "")
                {
                    array_title.push(data[i])
                    array_data.push(field[i])
                }
            }
            if(typeof(field[i]) === "number")
            {
                if(field[i] !== 0)
                {
                    array_title.push(data[i])
                    array_data.push(field[i])
                }
            }
        }

        let text_data=""
        let object;
        for(let i=0; i<array_data.length; i++)
        {
            let text_back=""
            if(typeof(array_data[i])=== "number")
            {
                text_back=`"${array_title[i]}":${array_data[i]},`
            }
            else if(typeof(array_data[i])=== "string")
            {
                text_back=`"${array_title[i]}":"${array_data[i]}",`
            }
            text_data=text_back+text_data
        }
        object=text_data.substr(0, text_data.length-1)
        object=`{${object}}`
        let json=JSON.parse(object)

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify(json);

        const requestOptions:object = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        const id=window.location.pathname.split("/")
        fetch(`http://localhost:8080/pokemons/${id[3]}`, requestOptions)
            .then(response => response.text())
            .then(result =>
            {
                console.log(result)
                alert("Votre update à réussit")
            })
            .catch(error => console.log('error', error));
    }

        render() {
      return (
        <Container isWidescreen>
            <a href="/pokemons" target="_blank"><h1 style={{fontSize:45, marginLeft: '30%', marginTop: '1%'}}> Pokedex</h1></a>
                {this.state.pokemon.map((pokemon: { id: number; name: string, image: string, num: number, types: [string],
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
                            </Column>
                            <Column>
                                <div style={{marginLeft:20}}>
                                    <h1 style={{color: "black", fontSize: 30, marginLeft: 100}}> Feature </h1>
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
                                <div style={{marginTop:20}}></div>
                                <div style={{marginLeft:20}}>
                                    <h1 style={{color: "black", fontSize: 30, marginLeft: 100}}> Candy et  eggs </h1>
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
                                <div style={{marginTop:20}}></div>
                                <div style={{marginLeft:20}}>
                                    <h1 style={{color: "black", fontSize: 30, marginLeft: 100}}> Drop rate </h1>
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
                                        <Button  style={{marginTop: 10}}  onClick={() => this.modifyPokemonById()} isInfo>Save</Button>
                                    </Column>
                                    <Column>
                                        <Button  style={{marginTop: 10}}  onClick={() => window.location.href=`/pokemons/${(window.location.pathname.split("/"))[3]}`} isDanger>Cancel</Button>
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