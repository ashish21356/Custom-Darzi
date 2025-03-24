import React, { Fragment, useState } from "react";
import { Box, MobileStepper, Button, CardMedia, CardContent, Typography, Stack, Skeleton } from '@mui/material';
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { Link } from "react-router-dom";

const BASE_URL = 'https://mmg.whatsapp.net/v/t45.5328-4';

const ProductImage = ({ product }) => {
    const [activeStep, setActiveStep] = useState(0);
    const images = product.media.images.map(img => BASE_URL + img.original_image_url);
  
    const handleNext = () => {
      setActiveStep((prevStep) => (prevStep < images.length - 1 ? prevStep + 1 : 0));
    };
  
    const handleBack = () => {
      setActiveStep((prevStep) => (prevStep > 0 ? prevStep - 1 : images.length - 1));
    };
  
    return (
      <Box sx={{ width: "100%", position: "relative" }}>
        {/* Image Display */}
        <CardMedia
          component="img"
          image={images[activeStep]}
          alt={`Product Image ${activeStep + 1}`}
          sx={{ height: "120", }}
        //   sx={{ width: "100%", height: "150px", objectFit: "cover" }}
        />
  
        {/* Navigation Buttons */}
        <MobileStepper
          steps={images.length}
          position="static"
          activeStep={activeStep}
        //   nextButton={
        //     <Button size="small" onClick={handleNext}>
        //       <KeyboardArrowRight />
        //     </Button>
        //   }
        //   backButton={
        //     <Button size="small" onClick={handleBack}>
        //       <KeyboardArrowLeft />
        //     </Button>
        //   }
          sx={{
            background: "transparent",
            justifyContent: "center",
            padding: "8px",
            mt: 1,
          }}
        />
      </Box>
    );
  };

export default ({ product }) => {
    const [loaded, setLoaded] = useState(false);
    
    return (
        <Fragment>
            {/* <Link to={`https://wa.me/p/${product.id}/917047626500`} target="_blank"> */}
                {!loaded ? <Skeleton variant="rectangular" width="100%" height={150}>
                    <CardMedia
                        sx={{ height: "auto", objectFit: "cover" }}
                        component="img"
                        height="150"
                        onLoad={() => setLoaded(true)}
                        image={BASE_URL + product.media.images[0].original_image_url}
                        alt={product.name}
                    />
                </Skeleton> :
                    <ProductImage product={product} />}
            {/* </Link> */}
            <CardContent sx={{ display: "flex", flexDirection: "column", flexGrow: 1, justifyContent: "space-between", textAlign: 'left' }}>
                <Typography variant="body1">{product.name}</Typography>
                <Stack direction="row" spacing={0.5}>
                    {product.sale_price.price && <Typography variant="body2" color="textSecondary" sx={{ textDecoration: 'line-through' }}>₹{(product.price) / 1000}</Typography>}
                    <Typography variant="body2" color="textSecondary">₹{(product.sale_price.price || product.price) / 1000}</Typography>
                </Stack>
            </CardContent>
            {/* <CardActions sx={{textAlign: 'center', justifyContent: 'center'}}>
                <Button variant="contained" sx={{ mt: 1, backgroundColor: "black", color: "white" }}>Buy Now</Button>
            </CardActions> */}
        </Fragment>

    );
}
