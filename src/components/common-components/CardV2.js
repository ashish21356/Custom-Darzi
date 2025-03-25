import React, { Fragment, memo, useCallback, useEffect, useMemo, useState } from "react";
import { Box, MobileStepper, Button, CardMedia, CardContent, Typography, Stack, Skeleton, CardActions, Tooltip, Card } from '@mui/material';
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

    useEffect(() => {
        setLoaded(false);
    }, [activeStep]);

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
            {!loaded && (
                <Skeleton
                    variant="rectangular"
                    width="100%"
                    height="100%"
                    sx={{ position: "absolute", top: 0, left: 0, zIndex: 1 }}
                />
            )}
            <CardMedia
                component="img"
                image={images[activeStep]}
                loading="lazy"
                alt={`Product Image ${activeStep + 1}`}
                sx={{
                    alignContent: "center",
                    height: "250px", // Fixed height
                    width: "100%",
                    objectFit: "cover", // Ensures image scales without distortion
                    backgroundColor: "#f5f5f5", // Adds a background to fill empty spaces
                }}
                onLoad={() => setLoaded(true)}
            />
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

const CardV2 = ({product}) => {
    return (
        <Card sx={{
            maxWidth: '250',
            boxShadow: "none",
            // border: '1px solid black'
        }}>
            <CardContent>
                <ProductImage product={product} />
                <Tooltip title={product.name}>
                    <Typography variant="body1" textTransform="uppercase" sx={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        fontWeight: "bold",
                        maxWidth: "200px" // Adjust width as needed
                    }}>
                        {product.name}
                    </Typography>
                </Tooltip>
            </CardContent>
        </Card>
    );
}

export default CardV2;