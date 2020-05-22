import React, { Component } from 'react';

import { Button, 
         Form, 
         FormGroup, 
         Label, 
         Input 
} from 'reactstrap';

import api from '../../services/api';

class Register extends Component{

    constructor(props) {
        super(props);
        this.state = {name: '', email: '', password: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        let {name, value} = event.target;
        this.setState({[name] : value});
    }

    handleSubmit(event) {
        event.preventDefault();
        api.post('/auth/register', {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
          })
          .then(function (response) {
            if(response.status !== 200){
              alert(response);
              event.preventDefault();
            }
          })
          .catch(function (error) {
            alert(error);
            event.preventDefault();
        });
    }

    render(){
        
        return (
        <div className="p-3 my-4 w-100 rounded customized">
            <h2>Registre-se</h2>
            <Form>
                <FormGroup>
                    <Label for="name">Nome</Label>
                    <Input type="text" className="w-75" name="name" id="name" onChange={this.handleChange}/>
                </FormGroup>
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

export default Register;