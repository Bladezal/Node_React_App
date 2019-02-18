import React, { Component } from 'react';
import logo from './logo-stycky.png';
import './App.css';

class App extends Component {
    state = {
        response: '',
        post: '',
        responseToPost: '',
    };
    componentDidMount() {
        this.callApi()
            .then(res => this.setState({ response: res.express }))
            .catch(err => console.log(err));
    }
    callApi = async() => {
        const response = await fetch('http://localhost:3000/hola');
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
    };
    handleSubmit = async e => {
        e.preventDefault();
        const response = await fetch('http://localhost:3000/texto', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data: this.state.post }),
        });
        const body = await response.text();
        this.setState({ responseToPost: body });
    };

    render() {
        return ( <div className = "App">
                    <div className = "container">
                        <div className = "row justify-content-md-center">
                            <div className = "card">
                            <img src={logo} className="App-logo" alt="logo"/>
                                <div className = "card-header"> 
                                { this.state.response } </div>
                                <div className = "card-body">
                                    <form className = "form-inline" onSubmit = { this.handleSubmit }>
                                        <div className = "form-group">
                                            <label className = "mb-2 mr-sm-2"><strong> Texto a enviar al Server: </strong></label >
                                            <div class = "input-group mb-3">
                                                <input type = "text" className = "form-control" value = { this.state.post }
                                                onChange = { e => this.setState({ post: e.target.value }) }/>
                                                <div className = "input-group-append"><button type = "submit" className = "btn btn-primary"> Enviar </button></div>
                                            </div>
                                        </div>
                                    </form>
                                    <fieldset disabled>
                                        <label> Respuesta: </label>
                                        <input type = "text" className = "form-control" value = { this.state.responseToPost }/>
                                    </fieldset >
                                </div>
                            </div>
                        </div>
                    </div>
                </div> );
        }
    }

    export default App;
