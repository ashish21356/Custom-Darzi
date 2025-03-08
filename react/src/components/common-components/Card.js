import React, { Fragment } from "react";
import {Card, CardMedia, CardContent, Typography, Button, CardActions} from '@mui/material';

export default ({product}) => {
    return (
        <Fragment>
            <CardMedia component="img" height="150" image={product.image} alt={product.name} />
            <CardContent sx={{ display: "flex", flexDirection: "column", flexGrow: 1, justifyContent: "space-between" }}>
                <Typography variant="body1">{product.name}</Typography>
                <Typography variant="body2" color="textSecondary">{product.price}</Typography>
            </CardContent>
            <CardActions sx={{textAlign: 'center', justifyContent: 'center'}}>
                <Button variant="contained" sx={{ mt: 1, backgroundColor: "black", color: "white" }}>Buy Now</Button>
            </CardActions>
        </Fragment>
        
    );
}