import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Slider from "react-slick";
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Box,
    Button,
    CircularProgress,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Grid,
    Paper
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import productsData from "../components/product.metadata.json";

const ProductDetails = () => {
    const { id } = useParams();
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        const product = productsData.find((product) => product.id === parseInt(id, 10));
        setSelectedProduct(product);
    }, [id]);

    if (!selectedProduct) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
                <CircularProgress />
            </Box>
        );
    }

    // Slick settings
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        // autoplay: true,
        autoplaySpeed: 3000,
        arrows: true
    };

    return (
        <Box sx={{ mx: "auto", p: 3 }}>
            <Card sx={{ p: 3, borderRadius: 3 }}>
                <Grid container spacing={4}>
                    {/* Left Side - Image Carousel */}
                    <Grid item xs={12} md={6}>
                        <Slider {...settings}>
                            {selectedProduct.images.length > 0 ? (
                                selectedProduct.images.map((img, index) => (
                                    <Card key={index} sx={{ borderRadius: 2 }}>
                                        <CardMedia
                                            component="img"
                                            image={img}
                                            alt={`Kurta ${index + 1}`}
                                            sx={{ height: "auto", objectFit: "cover", borderRadius: 2 }}
                                        />
                                    </Card>
                                ))
                            ) : (
                                <Typography variant="body1">No Images Available</Typography>
                            )}
                        </Slider>
                    </Grid>

                    {/* Right Side - Product Details */}
                    <Grid item xs={12} md={6}>
                        <CardContent>
                            <Typography variant="h4" fontWeight="bold">{selectedProduct.name}</Typography>
                            <Typography variant="h5" color="error" sx={{ my: 1 }}>
                                {selectedProduct.price}
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 2 }}>{selectedProduct.description}</Typography>

                            {/* Size Selection */}
                            <Typography variant="h6" sx={{ mb: 1 }}>Select Size:</Typography>
                            <Grid container spacing={1}>
                                {selectedProduct.sizes.map((size) => (
                                    <Grid item key={size}>
                                        <Button
                                            variant={selectedSize === size ? "contained" : "outlined"}
                                            color="primary"
                                            onClick={() => setSelectedSize(size)}
                                        >
                                            {size}
                                        </Button>
                                    </Grid>
                                ))}
                            </Grid>

                            {/* Product Details Accordion */}
                            <Accordion elevation={2} sx={{ mt: 3 }}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography variant="h6">Product Description</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    Product details will come here...
                                </AccordionDetails>
                            </Accordion>
                            <Accordion>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography variant="h6">Product Specification</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography><strong>Material:</strong> {selectedProduct.details.material}</Typography>
                                    <Typography><strong>Wash Care:</strong> {selectedProduct.details.washCare}</Typography>
                                    <Typography><strong>Return Policy:</strong> {selectedProduct.details.returnPolicy}</Typography>
                                    <Typography><strong>Shipping:</strong> {selectedProduct.details.shipping}</Typography>
                                </AccordionDetails>
                            </Accordion>

                        </CardContent>
                    </Grid>
                </Grid>
            </Card>
        </Box>
    );
};

export default ProductDetails;
