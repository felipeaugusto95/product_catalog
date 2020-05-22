import React, { Component } from 'react';

import { Button, 
         Form, 
         FormGroup, 
         Label, 
         Input 
} from 'reactstrap';

import api from '../../services/api';
// import { useHistory } from 'react-router-dom';

class Login extends Component{

    constructor(props) {
        super(props);
        this.state = {email: '', password: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        let {name, value} = event.target;
        this.setState({[name] : value});
    }

    async handleSubmit(event) {
        //const history =  useHistory();
        event.preventDefault();

        try{
            await api.post('/auth/authenticate', {
                email: this.state.email,
                password: this.state.password
            });
            //return history.push("/");
        } catch(e){
            alert(e);
        }
    }

    render(){
        
        return (
        <div className="p-3 my-4 w-100 rounded customized">
            <h2>Entrar</h2>
            <Form>
                <FormGroup>
                    <Label for="email">Email</Label>
                    <Input type="text" className="w-75" name="email" id="email" onChange={this.handleChange}/>
                </FormGroup>
                <FormGroup>
                    <Label for="Senha">Senha</Label>
                    <Input type="password" className="w-75" name="password" id="password" onChange={this.handleChange}/>
                </FormGroup>
                <Button onClick={this.handleSubmit} type="submit" color="info">Salvar</Button>
            </Form>
        </div>
        )
    }
}

export default Login;