import React, { useContext, useState } from 'react';

import { Button, 
         Form, 
         FormGroup, 
         Label, 
         Input 
} from 'reactstrap';

import { useHistory, Link } from 'react-router-dom';

import api from '../../services/api';
import StoreContext from '../Store/context';

function initialState() {
    return { name: '', email: '', password: '' };
}

const Register = () => {
    const [values, setValues] = useState(initialState);
    const { setToken } = useContext(StoreContext);
    const history = useHistory();
  
    function onChange(event) {
      const { value, name } = event.target;
  
      setValues({
        ...values,
        [name]: value
      });
    }
  
    function onSubmit(event) {
      event.preventDefault();
      const formData = {
          name: values.name,
          email: values.email,
          password: values.password
      }

      api.post('/auth/register', formData)
      .then(function (response) {
          if (response.data.token) {
              setToken(response.data.token);
              return history.push('/');
          }
      })
      .catch(function (error) {
          alert(error);
      });

      setValues(initialState);
    }
  
    return (
        <div className="p-3 my-4 w-100 rounded customized">
            <h2>Login</h2>
            <Form onSubmit={onSubmit}>
                <FormGroup>
                    <Label for="name">Nome</Label>
                    <Input type="text" className="w-75" name="name" id="name" onChange={onChange} value={values.name} />
                </FormGroup>
                <FormGroup>
                    <Label for="email">Email</Label>
                    <Input type="text" className="w-75" name="email" id="email" onChange={onChange} value={values.email} />
                </FormGroup>
                <FormGroup>
                    <Label for="Senha">Senha</Label>
                    <Input type="password" className="w-75" name="password" id="password" onChange={onChange} value={values.password} />
                </FormGroup>
                <Button type="submit" color="info">Registrar</Button>
            </Form>
            <Link to={'/login'} style={{ textDecoration: 'none' }}>
                Já possui conta? Fazer Login
            </Link>
        </div>
        )
  };

export default Register;