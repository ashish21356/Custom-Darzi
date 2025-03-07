import React from "react";
import { Box, Typography, Grid, Card, CardMedia, CardContent, Button, Container } from "@mui/material";
import Slider from "react-slick";
import products from "../components/product.metadata.json";

const Home = ({setRoute}) => {
    const topSelling = products.products.slice(0, 4);

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    const categories = [
        { name: "Men", image: "https://via.placeholder.com/100" },
        { name: "Women", image: "https://via.placeholder.com/100" },
        { name: "Kids", image: "https://via.placeholder.com/100" },
        { name: "Accessories", image: "https://via.placeholder.com/100" }
    ];

    return (
        <Container maxWidth="md" sx={{ overflowX: "hidden" }}>
            {/* Banner Slider */}
            <Box sx={{ width: "100%", maxWidth: 900, mx: "auto", overflow: "hidden" }}>
                <Slider {...sliderSettings}>
                    <Box sx={{ height: 200, backgroundColor: "#f8f8f8", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Typography variant="h4" fontWeight="bold">Exclusive Kurta Collection!</Typography>
                    </Box>
                    <Box sx={{ height: 200, backgroundColor: "#e0e0e0", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Typography variant="h4" fontWeight="bold">Festive Sale - Flat 30% Off!</Typography>
                    </Box>
                </Slider>
            </Box>


            {/* Categories Section */}
            <Typography variant="h5" sx={{ mt: 4, mb: 2, textAlign: "center" }}>Shop by Category</Typography>
            <Box sx={{ display: "flex", overflowX: "auto", gap: 2, p: 2, justifyContent: "center" }}>
                {categories.map((category) => (
                    <Box key={category.name} sx={{ textAlign: "center", minWidth: 120 }}>
                        <Card onClick={() => setRoute('/shop')} sx={{ borderRadius: "50%", overflow: "hidden", width: 100, height: 100, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: 3 }}>
                            <CardMedia component="img" image={category.image} alt={category.name} sx={{ width: "100%", height: "100%" }} />
                        </Card>
                        <Typography variant="body1" sx={{ mt: 1 }}>{category.name}</Typography>
                    </Box>
                ))}
            </Box>

            {/* Top Selling Section */}
            <Typography variant="h5" sx={{ mt: 4, mb: 2, textAlign: "center" }}>Top Selling Products</Typography>
            <Grid container spacing={2} justifyContent="center">
                {topSelling.map((product) => (
                    <Grid item key={product.id} xs={6} sm={3}>
                        <Card sx={{ textAlign: "center", boxShadow: 3 }}>
                            <CardMedia component="img" height="150" image={product.image} alt={product.name} />
                            <CardContent>
                                <Typography variant="body1">{product.name}</Typography>
                                <Typography variant="body2" color="textSecondary">{product.price}</Typography>
                                <Button variant="contained" sx={{ mt: 1, backgroundColor: "black", color: "white" }}>Buy Now</Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default Home;
