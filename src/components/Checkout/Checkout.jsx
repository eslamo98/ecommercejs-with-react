import React, { useEffect } from 'react'
import { CssBaseline, Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button } from '@material-ui/core';
import AddressForm from "./AddressForm"
import PaymentForm from './PaymentForm';
import ConfirmationForm from './ConfirmationForm';
import useStyles from "./styles";
import "./checkout.css"
import { commerce } from '../Commerce/Commerce';

const steps = ["Shipping adress", "Payment details"]
const Checkout = ({ cart, onCaptureCheckout, error, order }) => {
    const [activeStep, setActiveStep] = React.useState(0);
    const [shippingData, setShippingData] = React.useState({});
    const [checkoutTokken, setCheckoutTokken] = React.useState({});
    const classes = useStyles();
    const Form = () => {
        return activeStep === 0 ? <AddressForm next={next} checkoutTokken={checkoutTokken}/> : <PaymentForm error={error} onCaptureCheckout={onCaptureCheckout} backStep={prevStep} nextStep={nextStep} checkoutTokken={checkoutTokken} shippingData={shippingData}/> ;
    }

    const nextStep = () => {
        setActiveStep((prevState)=>{
            return (prevState + 1 )
        })
    }

    const prevStep = () => {
        setActiveStep((prevState)=>{
            return (prevState - 1 )
        })
    }

    const next = (data) => {
        setShippingData(data);
        nextStep();
    }

    const generateTokken = async () => {
            try {
            const tokken = await commerce.checkout.generateToken(cart.id, {type: "cart"});
            setCheckoutTokken(tokken);
            } catch (error) {
                
            }
            
        
    }


    useEffect(() => {
        generateTokken();
        console.log(checkoutTokken);
   
    // fetch("https://api.chec.io/v1/checkouts/cart_N7GKwb76eQo3EX?type=cart",{
    //     method: "GET",
    //     headers: {
    //         "X-Authorization": "pk_454534c4dcebcde1abdf8032ce5e7fcc4c6e5ed5ac019",
    //         "Content-Type": "application/json"
    //     }
    // }).then((res)=> res.json()).then((data)=>{
    //     console.log(data);
    //     setCheckoutTokken(data)
    // })
    }, [cart])
    

  return (
    <div className={classes.layout}>
        <Paper className={` checkout` }>
            <Typography align='center' variant='h4'>
                Checkout
            </Typography>
            <Stepper activeStep={activeStep} className={classes.stepper}>
                {steps.map((step,index)=>{
                    return (
                        <Step key={index}>
                            <StepLabel>
                                {step}
                            </StepLabel>
                        </Step>
                    )
                })}
            </Stepper>
            {activeStep === steps.length ? <ConfirmationForm /> : checkoutTokken && <Form />}
        </Paper>
    </div>
  )
}

export default Checkout