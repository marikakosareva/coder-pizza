import React, { useState, useEffect} from 'react';
import { Route, Switch } from "react-router-dom"
import './App.css';
import Main from './components/Main';
import { getData, getPrice } from './services/services';
import Orders from './components/Orders'
import LogIn from './components/LogIn'
import Cart from './components/Cart'

function App({ history }) {

    const [products, setProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [userToken, setUserToken] = useState(null);
    const [currency, setCurrency] = useState('EUR');
    const [coefficient, setCoefficient] = useState(1);

    useEffect(() => {
        getData()
            .then((res) => {
                setProducts(res.Items);
            })
            .catch(err => {
                console.log(err);
            })
    },[]);

    useEffect(() => {
        getPrice()
            .then((res) => {
                if (!res.rates[currency]) setCoefficient(1);
                else setCoefficient(res.rates[currency]);
            })
            .catch(err => {
                console.log(err);
            })
    },[currency]);

    function addProductToCart(item) {
        const newSelectedProducts = selectedProducts.slice(0);
        newSelectedProducts.push(item);
        setSelectedProducts(newSelectedProducts);
    }

    function deleteProductFromCart(id) {
        const deletedIndex = selectedProducts.findIndex(item => item.id === id);
        const newSelectedProducts = [ ...selectedProducts.slice(0,deletedIndex), ...selectedProducts.slice(deletedIndex + 1)];
        setSelectedProducts(newSelectedProducts);
    }

  return (
      <Switch>
          <Route history={history} path='/cart' render={() => (
              <Cart 
                  selectedProducts={selectedProducts}
                  setSelectedProducts={setSelectedProducts} 
                  userToken={userToken}
                  deleteFromCart={deleteProductFromCart}
                  currency={currency}
                  setCurrency={setCurrency}
                  coefficient={coefficient}
              />)}
          />
          <Route history={history} path='/orders' render={() => (
              <Orders 
                  userToken={userToken}
                  selectedProducts={selectedProducts}
                  currency={currency}
                  setCurrency={setCurrency}
              />)}
          />
          <Route history={history} path='/login' render={() => (
              <LogIn 
                  setUserToken={setUserToken}
              />)}  
          />
          <Route  path='/' render={() => (
              <Main 
                  products={products} 
                  selectedProducts={selectedProducts} 
                  addToCart={addProductToCart} 
                  userToken={userToken}
                  currency={currency}
                  setCurrency={setCurrency}
                  coefficient={coefficient}
              />)}    
          />
      </Switch>
  );
}

export default App;
