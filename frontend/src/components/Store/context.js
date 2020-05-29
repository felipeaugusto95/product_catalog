import { createContext} from 'react';

const StoreConext = createContext({
    token: null,
    setToken: () => {}
});

export default StoreConext;