import React from 'react';
import './App.css';
import 'bulma/css/bulma.css'
import { Container } from 'trunx'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Pokemon from "./page/Pokemon";
import PokemonDetails from "./page/PokemonDetails";
import PokemonEdit from "./page/PokemonEdit";
import NotFound from "./page/NotFound";

interface ITestProps {}

interface ITestState {
}
export default class App extends React.Component<ITestProps, ITestState> {
    constructor(props: ITestProps) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
    }
        render() {

            return (
        <Container isWidescreen>
            <Router>
                <Switch>
                    <Route exact path='/pokemons' component={Pokemon}/>
                    <Route exact path='/pokemons/:id' component={PokemonDetails}/>
                    <Route exact path='/pokemons/edit/:id' component={PokemonEdit}/>
                    <Route path="*" component={NotFound}/>
                </Switch>
            </Router>
        </Container>
    );
  }
}