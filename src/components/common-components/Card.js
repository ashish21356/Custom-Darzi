import React, { Fragment, memo, useCallback, useMemo, useState } from "react";
import { Box, MobileStepper, Button, CardMedia, CardContent, Typography, Stack, Skeleton, useMediaQuery, CardActions } from '@mui/material';
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { Link } from "react-router-dom";

const BASE_URL = 'https://mmg.whatsapp.net/v/t45.5328-4';

const ProductImage = memo(({ product }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [loaded, setLoaded] = useState(false);

    const images = useMemo(() => product.media.images.map(img => BASE_URL + img.original_image_url), [product]);

    const handleNext = useCallback(() => {
        setActiveStep((prevStep) => (prevStep < images.length - 1 ? prevStep + 1 : 0));
    }, []);

    const handleBack = useCallback(() => {
        setActiveStep((prevStep) => (prevStep > 0 ? prevStep - 1 : images.length - 1));
    }, []);

    return (
        <Box sx={{ width: "100%", position: "relative" }}>
            {/* Image Display */}
            <Button 
                size="small" 
                sx={{
                    position: "absolute",
                    left: 0,
                    top: "50%",
                    transform: "translateY(-50%)",
                    zIndex: 10,
                    minWidth: "32px",
                    padding: "4px",
                    background: "rgba(0, 0, 0, 0.5)",
                    color: "white",
                    "&:hover": { background: "rgba(0, 0, 0, 0.8)" },
                  }}
                onClick={handleBack}
            >
                <KeyboardArrowLeft />
            </Button>
            {
                !loaded ?
                    <Skeleton variant="rectangular" width="100%" height={150}>
                        <CardMedia
                            sx={{ height: "auto", objectFit: "cover" }}
                            component="img"
                            height="150"
                            onLoad={() => setLoaded(true)}
                            image={BASE_URL + product.media.images[0].original_image_url}
                            alt={product.name}
                        />
                    </Skeleton> :
                    <CardMedia
                        component="img"
                        image={images[activeStep]}
                        alt={`Product Image ${activeStep + 1}`}
                        sx={{ height: "120", }}
                        onLoad={() => setLoaded(true)}
                    />
            }
            <Button
                size="small"
                sx={{
                    position: "absolute",
                    right: 0,
                    top: "50%",
                    transform: "translateY(-50%)",
                    zIndex: 10,
                    minWidth: "32px",
                    padding: "4px",
                    background: "rgba(0, 0, 0, 0.5)",
                    color: "white",
                    "&:hover": { background: "rgba(0, 0, 0, 0.8)" },
                  }}
                onClick={handleNext}
            >
                <KeyboardArrowRight />
            </Button>

            <MobileStepper
                steps={images.length}
                position="static"
                activeStep={activeStep}
                sx={{
                    background: "transparent",
                    justifyContent: "center",
                    padding: "8px",
                    mt: 1,
                }}
            />
        </Box>
    );
});

export default ({ product }) => {
    return (
        <Fragment>
            {/* <Link to={`https://wa.me/p/${product.id}/917047626500`} target="_blank"> */}
            <ProductImage product={product} />
            <CardContent sx={{ display: "flex", flexDirection: "column", flexGrow: 1, justifyContent: "space-between", textAlign: 'left' }}>
                <Typography variant="body1">{product.name}</Typography>
                <Stack direction="row" spacing={0.5}>
                    {product.sale_price.price && <Typography variant="body2" color="textSecondary" sx={{ textDecoration: 'line-through' }}>₹{(product.price) / 1000}</Typography>}
                    <Typography variant="body2" color="textSecondary">₹{(product.sale_price.price || product.price) / 1000}</Typography>
                </Stack>
            </CardContent>
            <CardActions sx={{ textAlign: 'center', justifyContent: 'center' }}>
                <Link to={`https://wa.me/p/${product.id}/917047626500`} target="_blank">
                    <Button variant="contained" sx={{ mt: 1, backgroundColor: "black", color: "white" }}>Enquire now</Button>
                </Link>
            </CardActions>
        </Fragment>

    );
}
