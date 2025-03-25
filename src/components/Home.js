import React, { useEffect, useRef, useState } from "react";
import {useNavigate} from 'react-router-dom';
import { Box, Typography, Card, CardMedia, Container, IconButton, MobileStepper } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import products from "../components/product.metadata.json";
import ProductCard from "./common-components/Card";
import CardV2 from "./common-components/CardV2";

const Home = () => {
    const navigate = useNavigate();
    const [activeStep, setActiveStep] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveStep(prevStep => prevStep >= BannerImages.length - 1 ? 0 : prevStep + 1);
        }, 3000);

        return () => {
            clearInterval(interval);
        }
    }, []);

    const categories = [
        { name: "Shirts", type: "shirt", image: 'https://tse4.mm.bing.net/th?id=OIP.MFsqir6hdKfytY8g3OdyhwHaLZ&pid=Api&P=0&h=180' },
        { name: "Kurtas", type: "kurta", image: "https://tse4.mm.bing.net/th?id=OIP.MFsqir6hdKfytY8g3OdyhwHaLZ&pid=Api&P=0&h=180" },
        // { name: "Kids", image: "https://tse4.mm.bing.net/th?id=OIP.MFsqir6hdKfytY8g3OdyhwHaLZ&pid=Api&P=0&h=180" },
        // { name: "Accessories", image: "https://tse4.mm.bing.net/th?id=OIP.MFsqir6hdKfytY8g3OdyhwHaLZ&pid=Api&P=0&h=180" }
    ];

    const BannerImages = ['https://s6.imgcdn.dev/YjUBKg.jpg', 'https://s6.imgcdn.dev/YjU7hn.jpg'];

    return (
        <Container maxWidth="md" sx={{ overflowX: "hidden", marginTop: "64px" }}>
            {/* Banner Slider */}
            <Box sx={{ width: "100%", mx: "auto", overflow: "hidden" }}>
                <Box sx={{ backgroundColor: "#f8f8f8", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <CardMedia component="img" image={BannerImages[activeStep]} alt={"banner Image"} sx={{ opacity: '1', width: "100%", height: "100%" }} />
                </Box>
            </Box>
            <MobileStepper
                steps={BannerImages.length}
                position="static"
                activeStep={activeStep}
                color="black"
                sx={{
                    background: "transparent",
                    color: 'black',
                    justifyContent: "center",
                    padding: "8px",
                    mt: 1,
                    '& .MuiMobileStepper-dot': {
                        backgroundColor: 'darkgray',
                    },
                    '& .MuiMobileStepper-dotActive': {
                        backgroundColor: 'black',
                    },
                }}
            />


            {/* Categories Section */}
            <Typography variant="h5" sx={{ mt: 4, mb: 2, textAlign: "center" }}>Shop by Category</Typography>
            <Box sx={{ display: "flex", overflowX: "auto", gap: 2, pb: 2, justifyContent: { xs: "center", md: "center" } }}>
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
                    {topSelling.filter(prod => prod).map((product) => (
                        // <CardV2 key={product.id} product={product} />
                        <Card key={product.id} sx={{
                            flex: "0 0 auto",
                            textAlign: "center",
                            // boxShadow: 3,
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
