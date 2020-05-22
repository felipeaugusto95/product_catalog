

import React, { Component } from 'react';

import api from '../../services/api';
import { Link } from 'react-router-dom';
import { Toast, 
         ToastBody, 
         ToastHeader 
} from 'reactstrap';

import Header from '../Header';

const statusProduct = ['Pendente', 
                       'Em analise', 
                       'Aprovado', 
                       'Reprovado'];

class Home extends Component{

  constructor(props){
    super(props);

    this.state = {
      products: []
    }
  }

  async componentDidMount(){
    const response = await api.get('product/list');
    this.setState({  products: response.data });
  }

  render(){

    const { products } = this.state;

    return (
      <div>
        <Header />
        <div className="p-3 my-4 rounded ">
        { products && products.map(product => (
          <Link key={product._id} to={`/product/save/${product._id}`} style={{ textDecoration: 'none' }}>
            <Toast>
              <ToastHeader>
                {product.name} [{statusProduct.filter((value, index) => product.status === index)}]
              </ToastHeader>
              <ToastBody>
                <img src={product.imageUrl} alt="" width="300" height="300"/>
              </ToastBody>
            </Toast>
          </Link>
        ))
        }
        </div>
      </div>
    );
  };
}

export default Home;


