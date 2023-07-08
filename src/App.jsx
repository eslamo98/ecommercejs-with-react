import React from 'react';
import "./App.css";
import Navbar from './components/Navbar/Navbar';
import Products from './components/products/Products';
import Cart from './components/Cart/Cart';
import Checkout from './components/Checkout/Checkout';
import {commerce} from "./components/Commerce/Commerce"
import { useState, useContext } from 'react';
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { myContext } from './components/Toggle/Switch';



export default function App() {
  const theme = useContext(myContext);
  const darkMode = theme.state.darkMode;
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState('');


  
  
  const fetchProducts = async () => {
    const {data} = await commerce.products.list();
    setProducts(data);
    
  }

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  };

  useEffect(()=>{
    fetchProducts();
    fetchCart();
    
  },[])


  

 

  const addToCart =  async (productId, quantity) => {
    setCart(await commerce.cart.add(productId, quantity));   
  }

  const handleUpdateQuantity =  async (productId, quantity) => {
    setCart(await commerce.cart.update(productId, {quantity}));   
  }

  const handleRemoveItem =  async (productId) => {
    setCart(await commerce.cart.remove(productId));   
  }

  const emptyCart = async () => {
    setCart(await commerce.cart.empty());
  };

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();
    setCart(newCart);
  };

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);

      setOrder(incomingOrder);

      refreshCart();
    } catch (error) {
      setErrorMessage(error.data.error.message);
    }
  };

  return (
    <Router>
      <div className="App" style={
      {background: darkMode ? "#000" : "#fff",
      color: darkMode ? "#fff" : "#000",
      
      
    }
    }>
        <Navbar  totalItems={cart.total_items }/>
        
        <Routes>
          <Route exact path="/" element ={<Products products={products} onAddToCart={addToCart} />} />
          <Route exact path="/cart" element={ 
          <Cart 
          cart={cart} 
          updateCart={handleUpdateQuantity}
          removeItem={handleRemoveItem}
          emptyCart={emptyCart}
          /> 
          } />

          <Route exact path="/checkout" element ={<Checkout order={order} cart={cart} error={errorMessage} onCaptureCheckout={handleCaptureCheckout} />} />
        </Routes>
      </div>
    </Router>

  );

}


