import React from 'react';
import {Button, Container} from 'trunx'
import '../App.css';
import 'bulma/css/bulma.css'
import '../css/pokemon.css'

interface ITestProps {
}

interface ITestState {
}

export default class NotFounds extends React.Component<ITestProps, ITestState> {
    constructor(props: ITestProps) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
    }

    render() {

        return (
            <Container isWidescreen>
                <h1 className="text_notfound"> Page not found</h1>
                <Button className="text_notfound" onClick={() => window.location.href = '/pokemons'}
                        isLink>Go to Front</Button>

            </Container>
        );
    }
}