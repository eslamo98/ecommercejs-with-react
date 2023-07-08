import React, {useState, useEffect} from 'react'
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
import { Link } from "react-router-dom"
import {commerce} from "../Commerce/Commerce"
import FormInput from './CustomTextField'


const AddressForm = ({checkoutTokken, next}) => {
  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState('');
  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
  const [shippingSubdivision, setShippingSubdivision] = useState('');
  const methods = useForm();

  const countries = Object.entries(shippingCountries).map(([code, name])=>({id: code, label: name}));
  const subdivisions = Object.entries(shippingSubdivisions).map(([code, name])=>({id: code, label: name}));
  
  const fetchShippingCountries = async (checkoutTokkenId) => {
    const {countries} = await commerce.services.localeListCountries(checkoutTokkenId)
    setShippingCountries(countries);
    setShippingCountry(Object.keys(countries)[0])
  }


  const fetchShippingSubdivisions = async (countryId) => {
    const {subdivisions} = await commerce.services.localeListSubdivisions(countryId)
    setShippingSubdivisions(subdivisions);
    setShippingSubdivision(Object.keys(subdivisions)[0])
  }



  useEffect(() => {
    fetchShippingCountries(checkoutTokken.id);
  }, [])

  useEffect(() => {
    if(shippingCountry) fetchShippingSubdivisions(shippingCountry);
  }, [shippingCountry])


  

  return (
    <>
      <Typography variant='h6' gutterBottom>
        address Form
      </Typography>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit((data)=>{
          next({...data,shippingCountry,shippingSubdivision})
        })}>
          <Grid container spacing={3}>
            <FormInput fullWidth required label="First Name" name="firstName" />
            <FormInput fullWidth required label="Last Name" name="lastName" />
            <FormInput fullWidth required label="Address" name="address1" />
            <FormInput fullWidth required label="Email" name="email" />
            <FormInput fullWidth required label="City" name="city" />
            <FormInput fullWidth required label="Zip Code" name="zipCode" />
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Country</InputLabel>
              <Select 
              value={shippingCountry} 
              onChange={
                (event)=>{setShippingCountry(event.target.value);
                 
                 }}>
                {countries.map((subdivision)=>{
                  return (
                    <MenuItem key={subdivision.id} value={subdivision.id} name={subdivision.label}>
                      {subdivision.label} 
                    </MenuItem>
                  )
                })}
              </Select>
            </Grid>

            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Subdivisions</InputLabel>
              <Select 
              value={shippingSubdivision} 
              onChange={
                (event)=>{setShippingSubdivision(event.target.value);
                 
                 }}>
                {subdivisions.map((subdivision)=>{
                  return (
                    <MenuItem key={subdivision.id} value={subdivision.id} name={subdivision.label}>
                      {subdivision.label} 
                    </MenuItem>
                  )
                })}
              </Select>
            </Grid>
            
          </Grid>
          <br />
          <div className="form-control-btns">
            <Button variant='contained' color='primary' component={Link} to="/cart">Back to Cart</Button>
            <Button type='submit' variant='contained' color='secondary'>Next</Button>
          </div>
        </form>
      </FormProvider>
    </>
  )
}

export default AddressForm