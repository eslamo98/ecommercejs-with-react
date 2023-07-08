import React, { Fragment, useContext } from 'react';
import { Container, Typography, Button, Grid } from '@material-ui/core';
import { Link} from "react-router-dom";
import "./cart.css"
import { myContext } from '../Toggle/Switch';
import CartItem from './CartItem/CartItem';


const Cart = ({ cart,updateCart, removeItem, emptyCart }) => {
  const theme = useContext(myContext);
  const darkMode = theme.state.darkMode;

  const EmptyCart = () => (
    <Typography  variant="subtitle1">You don't have items in your shopping cart,
      <Link className="shopping-link" to="/">Go to shopping</Link>
    </Typography>
  );



  const FilledCart = () => (
    <Fragment>
      <Grid container id='cart-items-container' spacing={3} >
        {cart.line_items.map((item) => (
          <Grid  item  xs={12} sm={8} md={5} lg={4} key={item.id}>
            <CartItem 
            updateCart={updateCart}
            removeItem={removeItem}
            item={item}  />
          </Grid>
        ))}
      </Grid>
      <div className="subtotal">
        <Typography variant="h4">Subtotal: {cart.subtotal.formatted_with_symbol}</Typography>
        <div className='cart-btns'>
          <Button className="empty-btn" size="large" type="button" variant="contained" color="secondary" onClick={emptyCart}>Empty cart</Button>
          <Button component={Link} to="/checkout" className="checkout-btn"  size="large" type="button" variant="contained" color="primary">Checkout</Button>
        </div>
      </div>
    </Fragment>
  );

  if (!cart.line_items) return 'Loading';
  return (
    <Container className=' my-container' style={{height: (darkMode && cart.line_items.length==0) ?  "calc(100vh - 200px)" : "auto"}} id="my-cart-component">
      <div className="my-toolbar" />
      <Typography className="" variant="h3" gutterBottom>Your Shopping Cart</Typography>
      { !cart.line_items.length ? <EmptyCart /> : <FilledCart /> }
    </Container>
  );
};

export default Cart;
