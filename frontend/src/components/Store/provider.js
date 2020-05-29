import React from 'react';
import Context from './context';
import useStorage from '../../utils/useStorage';

import api from '../../services/api';

 const StoreProvider = ( { children }) => {

    const [ token, setToken ] = useStorage('token');
    api.defaults.headers.Authorization = `Bearer ${token}`;

    return (
        <Context.Provider value={{token, setToken}}>
            { children }
        </Context.Provider>
    );
 };

 export default StoreProvider