import React, { Fragment } from "react";
import { CardMedia, CardContent, Typography } from '@mui/material';
import { Link } from "react-router-dom";

const BASE_URL = 'https://mmg.whatsapp.net/v/t45.5328-4';

export default ({ product }) => {
    return (
        <Fragment>
            {/* <Link to={`/shop/${product.id}`}> */}
            <Link to={`https://wa.me/p/${product.id}/917047626500`} target="_blank">
                <CardMedia sx={{ height: "auto" }} component="img" height="150" image={BASE_URL + product.media.images[0].original_image_url} alt={product.name} />
            </Link>
            <CardContent sx={{ display: "flex", flexDirection: "column", flexGrow: 1, justifyContent: "space-between", textAlign: 'left' }}>
                <Typography variant="body1">{product.name}</Typography>
                <Typography variant="body2" color="textSecondary">₹{product.price / 1000}</Typography>
            </CardContent>
            {/* <CardActions sx={{textAlign: 'center', justifyContent: 'center'}}>
                <Button variant="contained" sx={{ mt: 1, backgroundColor: "black", color: "white" }}>Buy Now</Button>
            </CardActions> */}
        </Fragment>

    );
}