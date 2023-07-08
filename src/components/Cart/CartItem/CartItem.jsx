import React from 'react';
import { Typography, Button, Card, CardActions, CardContent, CardMedia } from '@material-ui/core';

import useStyles from './styles';

import "./cartitem.css"

const CartItem = ({item, updateCart, removeItem}) => {
  const classes = useStyles();

  // const handleUpdateCartQty = (lineItemId, newQuantity) => onUpdateCartQty(lineItemId, newQuantity);

  // const handleRemoveFromCart = (lineItemId) => onRemoveFromCart(lineItemId);

  return (
    <Card className="cart-item">
      <CardMedia image={item.image.url} alt={item.name} className={classes.media} />
      <CardContent className="item-card-content">
        <Typography variant="h5">{item.name}</Typography>
        <Typography variant="h6">{item.line_total.formatted_with_symbol}</Typography>
      </CardContent>
      <CardActions className="cart-item-actions">
        <div className="cart-item-btns">
          <Button type="button" size="small"
          onClick={()=>{updateCart(item.id, (item.quantity - 1))}}
           >-</Button>
          <Typography>&nbsp;{item.quantity}&nbsp;</Typography>
          <Button type="button" size="small" 
          onClick={()=>{updateCart(item.id, (item.quantity + 1))}}
          >+</Button>
        </div>
        <Button variant="contained" className='remove-btn' type="button" color="secondary" 
        onClick={()=>{removeItem(item.id)}}
        >Remove</Button>
      </CardActions>
    </Card>
  );
};

export default CartItem;
