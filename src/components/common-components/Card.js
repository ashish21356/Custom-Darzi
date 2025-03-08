import React, { Fragment } from "react";
import {Card, CardMedia, CardContent, Typography, Button, CardActions} from '@mui/material';

const DUMMY_PRODUCT_IMAGE = 'https://kisah.in/cdn/shop/files/KA-0994-5590-T301.jpg?crop=region&crop_height=1920&crop_left=76&crop_top=0&crop_width=1286&v=1740653159&width=480'
export default ({product}) => {
    return (
        <Fragment>
            <CardMedia sx={{height: "auto"}} component="img" height="150" image={DUMMY_PRODUCT_IMAGE} alt={product.name} />
            <CardContent sx={{ display: "flex", flexDirection: "column", flexGrow: 1, justifyContent: "space-between", textAlign: 'left' }}>
                <Typography variant="body1">{product.name}</Typography>
                <Typography variant="body2" color="textSecondary">{product.price}</Typography>
            </CardContent>
            {/* <CardActions sx={{textAlign: 'center', justifyContent: 'center'}}>
                <Button variant="contained" sx={{ mt: 1, backgroundColor: "black", color: "white" }}>Buy Now</Button>
            </CardActions> */}
        </Fragment>
        
    );
}