import React, { lazy, useRef } from "react";
import {useNavigate} from 'react-router-dom';
import { Box, Typography, Grid2 as Grid, Card, CardMedia, Container, IconButton } from "@mui/material";
import Slider from "react-slick";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import products from "../components/product.metadata.json";
import ProductCard from "./common-components/Card";

const Home = () => {
    const navigate = useNavigate();
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
        { name: "Shirts", type: "shirt", image: 'https://tse4.mm.bing.net/th?id=OIP.MFsqir6hdKfytY8g3OdyhwHaLZ&pid=Api&P=0&h=180' },
        { name: "Kurtas", type: "kurta", image: "https://tse4.mm.bing.net/th?id=OIP.MFsqir6hdKfytY8g3OdyhwHaLZ&pid=Api&P=0&h=180" },
        // { name: "Kids", image: "https://tse4.mm.bing.net/th?id=OIP.MFsqir6hdKfytY8g3OdyhwHaLZ&pid=Api&P=0&h=180" },
        // { name: "Accessories", image: "https://tse4.mm.bing.net/th?id=OIP.MFsqir6hdKfytY8g3OdyhwHaLZ&pid=Api&P=0&h=180" }
    ];

    return (
        <Container maxWidth="md" sx={{ overflowX: "hidden", marginTop: "64px" }}>
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
                        <Card onClick={() => navigate('/shop?category=' + category.type)} key={category.name} sx={{ borderRadius: "50%", overflow: "hidden", width: 150, height: 150, minWidth: 100, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: 3, position: "relative" }}>
                            <CardMedia component="img" image={category.image} alt={category.name} sx={{ opacity: '1', width: "100%", height: "100%", filter: "grayscale(50%) blur(2px)" }} />
                            <Typography variant="caption" sx={{ position: "absolute", top: '50%', textAlign: 'center', transform: 'translateX(0%)', color: "white", padding: "2px 5px", borderRadius: "5px", backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
                                {category.name}
                            </Typography>
                        </Card>
                    </Box>
                ))}
            </Box>

            {/* Top Selling Section */}
            <TopSelling />
        </Container>
    );
};

const TopSelling = () => {
    const topSelling = [...products.filter(prod => prod.belongs_to === 'shirt').slice(0, 3), products.filter(prod => prod.belongs_to === 'kurta')[0]]; // More products for scrolling
    const scrollRef = useRef(null);
    
    const scrollLeft = () => {
        scrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
    };

    const scrollRight = () => {
        scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
    };

    return (
        <Container maxWidth="md">
            {/* Top Selling Products */}
            <Typography variant="h5" sx={{ mt: 4, mb: 2, textAlign: "center" }}>Top Selling Products</Typography>

            <Box sx={{ display: "flex", alignItems: "center", position: "relative" }}>
                <IconButton onClick={scrollLeft} sx={{ position: "absolute", left: -30, zIndex: 2, backgroundColor: "white" }}>
                    <ArrowBackIosIcon />
                </IconButton>

                <Box ref={scrollRef} sx={{
                    display: "flex",
                    overflowX: "auto",
                    scrollBehavior: "smooth",
                    gap: 2,
                    paddingBottom: 2,
                    scrollbarWidth: "none",
                    "&::-webkit-scrollbar": { display: "none" },
                }}>
                    {topSelling.map((product) => (
                        <Card key={product.id} sx={{
                            flex: "0 0 auto",
                            textAlign: "center",
                            boxShadow: 3,
                            width: 200,
                        }}>
                            <ProductCard key={product.id} product={product} />
                        </Card>
                    ))}
                </Box>

                <IconButton onClick={scrollRight} sx={{ position: "absolute", right: -30, zIndex: 2, backgroundColor: "white" }}>
                    <ArrowForwardIosIcon />
                </IconButton>
            </Box>
        </Container>
    );
};


export default Home;
