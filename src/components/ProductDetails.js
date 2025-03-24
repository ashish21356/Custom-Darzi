import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
    Divider
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import productsData from "../components/product.metadata.json";

const ProductDetails = () => {
    const { id } = useParams();
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        const product = productsData.find((product) => product.id === id);
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
                            {selectedProduct?.media?.images.length > 0 ? (
                                selectedProduct?.media?.images.map((img, index) => (
                                    <Card key={index} sx={{ borderRadius: 2 }}>
                                        <CardMedia
                                            component="img"
                                            image={img.original_image_url}
                                            // height={100}
                                            sx={{ objectFit: "contain", maxHeight: 500 }}
                                            alt={`Kurta ${index + 1}`}
                                        // sx={{ height: "100", objectFit: "fill", borderRadius: 2 }}
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
                            <Typography variant="h6" fontWeight="bold">{selectedProduct.name}</Typography>
                            <Typography variant="body2" color="error" sx={{ my: 1 }}>
                                ₹{selectedProduct.price / 1000}
                            </Typography>
                            <Typography variant="body2" color="success" sx={{ my: 1 }}>
                                Incl of all taxes
                            </Typography>

                            {/* Size Selection */}
                            {/* <Typography variant="h6" sx={{ mb: 1 }}>Select Size:</Typography> */}
                            <Grid container spacing={1} mb={2}>
                                {selectedProduct.sizes && selectedProduct.sizes.map((size) => (
                                    <Grid item key={size}>
                                        <Button
                                            variant={selectedSize === size ? "contained" : "outlined"}
                                            color="primary"
                                            sx={{
                                                fontSize: '12px',
                                                borderRadius: '50%',
                                                minWidth: '40px',  // Ensures a round shape
                                                height: '40px',     // Same as minWidth for circular shape
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}
                                            onClick={() => setSelectedSize(size)}
                                        >
                                            {size}
                                        </Button>
                                    </Grid>
                                ))}
                            </Grid>

                            {/* Product Details Accordion */}
                            <Divider />
                            <Accordion sx={{ boxShadow: "none", background: "none", "&:before": { display: "none" } }}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography variant="body2" fontWeight="bold">Product Description</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    {selectedProduct.description}
                                </AccordionDetails>
                            </Accordion>
                            <Divider />
                            {
                                selectedProduct.details ?
                                    <Accordion sx={{ boxShadow: "none", background: "none", "&:before": { display: "none" } }}>
                                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                            <Typography variant="body2" fontWeight="bold">Product Specification</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography variant="body2"><strong>Material:</strong> {selectedProduct.details.material}</Typography>
                                            <Typography variant="body2"><strong>Wash Care:</strong> {selectedProduct.details.washCare}</Typography>
                                            <Typography variant="body2"><strong>Return Policy:</strong> {selectedProduct.details.returnPolicy}</Typography>
                                            <Typography variant="body2"><strong>Shipping:</strong> {selectedProduct.details.shipping}</Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                    : null}
                            <Divider />

                        </CardContent>
                    </Grid>
                </Grid>
            </Card>
        </Box>
    );
};

export default ProductDetails;
