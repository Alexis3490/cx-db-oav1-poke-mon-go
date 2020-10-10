import React from 'react';
import '../App.css';
import 'bulma/css/bulma.css'
import { Container } from 'trunx'

interface ITestProps {}

interface ITestState {
}
export default class NotFounds extends React.Component<ITestProps, ITestState> {
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
           <h1> Page not founds</h1>
        </Container>
    );
  }
}