import React, { lazy } from "react";
import { Box, Typography, Grid2 as Grid, Card, CardMedia, CardContent, Button, Container } from "@mui/material";
import Slider from "react-slick";
import products from "../components/product.metadata.json";

const Home = ({ setRoute }) => {
    const topSelling = products.products.slice(0, 2);

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
        { name: "Indo Western", image: 'https://tse4.mm.bing.net/th?id=OIP.MFsqir6hdKfytY8g3OdyhwHaLZ&pid=Api&P=0&h=180' },
        { name: "Women", image: "https://tse4.mm.bing.net/th?id=OIP.MFsqir6hdKfytY8g3OdyhwHaLZ&pid=Api&P=0&h=180" },
        { name: "Kids", image: "https://tse4.mm.bing.net/th?id=OIP.MFsqir6hdKfytY8g3OdyhwHaLZ&pid=Api&P=0&h=180" },
        { name: "Accessories", image: "https://tse4.mm.bing.net/th?id=OIP.MFsqir6hdKfytY8g3OdyhwHaLZ&pid=Api&P=0&h=180" }
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
            <Box sx={{ display: "flex", overflowX: "auto", gap: 2, pb: 2, justifyContent: { xs: "flex-start", md: "center" } }}>
                {categories.map((category) => (
                    <Box key={category.name} sx={{ flex: "0 0 auto", scrollSnapAlign: "start" }}>
                        <Card onClick={() => setRoute('/shop')} key={category.name} sx={{ borderRadius: "50%", overflow: "hidden", width: 150, height: 150, minWidth: 100, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: 3, position: "relative" }}>
                            <CardMedia component="img" image={category.image} alt={category.name} sx={{ opacity: '1', width: "100%", height: "100%", filter: "grayscale(50%) blur(2px)" }} />
                            <Typography variant="caption" sx={{ position: "absolute", top: '50%', textAlign: 'center', transform: 'translateX(0%)', color: "white", padding: "2px 5px", borderRadius: "5px", backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
                                {category.name}
                            </Typography>
                        </Card>
                    </Box>
                ))}
            </Box>

            {/* Top Selling Section */}
            <Typography variant="h5" sx={{ mt: 4, mb: 2, textAlign: "center" }}>Top Selling Products</Typography>
            <Grid container spacing={2} justifyContent={{ xs: "space-around", md: "center" }}>
                {topSelling.map((product) => (
                    <Grid item key={product.id} display="flex" justifyContent={{ xs: "space-around", md: "center" }}>
                        <Card sx={{ textAlign: "center", boxShadow: 3, width: "100%", minWidth: { xs: 150, sm: 250, md: 300 }, maxWidth: { xs: 150, sm: 250, md: 300 } }}>
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
