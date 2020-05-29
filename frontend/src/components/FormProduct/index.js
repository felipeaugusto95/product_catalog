import React, { Component } from 'react';

import { Button, 
         Form, 
         FormGroup, 
         Label, 
         Input 
} from 'reactstrap';

import api from '../../services/api';

const statusProduct = ['Pendente', 
                       'Em analise', 
                       'Aprovado', 
                       'Reprovado'];

import Header from '../Header';

class FormProduct extends Component{

    constructor(props) {
        super(props);
        this.state = {product: '',file: null, message: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fileUpload = this.fileUpload.bind(this);
    }

    handleChange(event) {
        let {name, value, files} = event.target;
        const test = (files) ? {file: files[0]} : {[name] : value};
        this.setState(test);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.fileUpload(this.state.file, this.state.product);
    }

    fileUpload(file, product){
        const formData = new FormData();
        formData.append('file', file);
        formData.append('name', product);

        api.post('/product/add', formData)
        .then(function (response) {
            if(response.status !== 200){
                alert('Problema ao inserir. Tente novamente!');
            }
        })
        .catch(function (error) {
            alert(error);
        });

        this.setState({message: 'Produto inserido com sucesso!'});
    }

    render(){

        const { message } = this.state;
        
        return (
            <div>
                <Header />
                <div className="p-3 my-4 w-100 rounded customized">
                    <h2>Novo Produto</h2>
                    <Form>
                        <FormGroup>
                            <Label for="product">Produto</Label>
                            <Input type="text" className="w-75" name="product" id="product" onChange={this.handleChange}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="file">Escolha uma imagem</Label>
                            <Input type="file" className="w-100" name="file" id="file" onChange={this.handleChange} />
                        </FormGroup>
                        <Button onClick={this.handleSubmit} type="submit" color="info">Salvar</Button>
                    </Form>
                    {message && (
                        <div className="alert-success">{message}</div>
                    )}
                </div>
            </div>
        )
    }
}

class FormEdit extends Component{

    constructor(props) {
        super(props);
        this.state = {product: '', status: 0, message: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        let {name, value} = event.target;
        this.setState({[name] : value});
    }
    
    handleSubmit(event) {
        event.preventDefault();
        const handle  = this.props.match.params.id;
        api.put(`/product/save/${handle}`, {
            name: this.state.product,
            status: this.state.status
        })
        .then(function (response) {
            if(response.status !== 200){
                alert(response);
            }
        })
        .catch(function (error) {
            alert(error);
        });

        this.setState({message: 'Produto atualizado com sucesso!'});
    }

    render(){

        const { message } = this.state;
        
        return (
            <div>
                <Header />
                <div className="p-3 my-4 w-100 rounded customized">
                    <h2>Editar Produto</h2>
                    <Form>
                        <FormGroup>
                            <Label for="product">Produto</Label>
                            <Input type="text" className="w-75" name="product" id="product" onChange={this.handleChange}/>
                        </FormGroup>
                        <FormGroup>
                        <Label for="usuario">Status</Label>
                        <Input type="select" className="w-75" name="status" id="status" onChange={this.handleChange}>
                            <option value="0">Selecione um Status...</option>
                            {statusProduct.map((st, index) => (
                            <option key={index} value={index}>{st} </option>
                            ))}
                        </Input>
                        </FormGroup>
                        <Button onClick={this.handleSubmit} type="submit" color="info">Salvar</Button>
                    </Form>
                    {message && (
                        <div className="alert-success">{message}</div>
                    )}
                </div>
            </div>
        
        )
    }
}

export {FormProduct, FormEdit};