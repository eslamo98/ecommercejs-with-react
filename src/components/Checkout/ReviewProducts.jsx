import React from 'react';
import { Typography, List, ListItem, ListItemText } from '@material-ui/core';

const ReviewProducts = ({ checkoutTokken }) => (
  <>
    <Typography variant="h6" gutterBottom>Order summary</Typography>
    <List disablePadding>
      {checkoutTokken.line_items.map((product) => (
        <ListItem style={{ padding: '10px 0' }} key={product.name}>
          <ListItemText primary={product.name} secondary={`Quantity: ${product.quantity}`} />
          <Typography variant="body2">{product.line_total.formatted_with_symbol}</Typography>
        </ListItem>
      ))}
      <ListItem style={{ padding: '10px 0' }}>
        <ListItemText primary="Total" />
        <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>
          {checkoutTokken.subtotal.formatted_with_symbol}
        </Typography>
      </ListItem>
    </List>
  </>
);

export default ReviewProducts;