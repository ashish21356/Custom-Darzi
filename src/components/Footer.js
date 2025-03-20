import React from "react";
import { Box, Container, Typography, Grid2 as Grid, Link } from "@mui/material";

const Footer = () => {
    return (
        <Box component="footer" sx={{ backgroundColor: "#f8f8f8", padding: 3, marginTop: 5 }}>
            <Container maxWidth="lg">
                <Grid container spacing={3}>
                    {/* About Section */}
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6" gutterBottom>
                            About Us
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            We offer a wide range of premium quality Shirts, Kurtas, Pyjama that blend tradition with modern styles.
                        </Typography>
                    </Grid>

                    {/* Quick Links */}
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6" gutterBottom>
                            Quick Links
                        </Typography>
                        <Link href="#" color="inherit" display="block" underline="hover">Home</Link>
                        <Link href="#" color="inherit" display="block" underline="hover">Shop</Link>
                        <Link href="#" color="inherit" display="block" underline="hover">Contact</Link>
                    </Grid>

                    {/* Contact Section */}
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6" gutterBottom>
                            Contact Us
                        </Typography>
                        <Typography variant="body2" color="textSecondary">Email: enquiry.shirtwala@gmail.com</Typography>
                        <Typography variant="body2" color="textSecondary">Phone: +91 70476 26500</Typography>
                    </Grid>
                </Grid>
                
                {/* Copyright */}
                <Box sx={{ textAlign: "center", marginTop: 3 }}>
                    <Typography variant="body2" color="textSecondary">
                        &copy; {new Date().getFullYear()} KurtaShop. All rights reserved.
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;
