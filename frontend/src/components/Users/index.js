import React, { Component } from 'react';
import { ListGroup, 
         ListGroupItem,
} from 'reactstrap';

import api from '../../services/api';
import Header from '../Header';

class User extends Component{

    constructor(props) {
        super(props);
        this.state = {users: []};
    }

    async componentDidMount () {
      const response = await api.get('/user/list'); 
      this.setState({  users: response.data });
    }

    render(){

        const { users } = this.state;

        return (
            <div>
                <Header />                
                <h3 className="p-3 my-4">Usuários</h3>
                <ListGroup className="p-4 my-4">
                    {users && users.map(u => (
                        <ListGroupItem key={ u._id }>[{ u.email }] { u.name }</ListGroupItem>
                    ))}
                </ListGroup>
            </div>
        )
    }
}

export default User;