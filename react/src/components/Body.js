import React from "react";
import { Grid2 as Grid, Card, CardMedia, CardContent, Typography, Button } from "@mui/material";
import products from '../components/product.metadata.json';

const CURRENCY = '₹';

const Body = () => {
    return (
        <Grid container spacing={2} sx={{ padding: { xs: 1, sm: 3 } }}>
            {products.products.map((product) => (
                <Grid item key={product.id} xs={6} sm={6} md={2}>
                    <Card sx={{ height: "100%", textAlign: "center", display: "flex", flexDirection: "column", boxShadow: 3, minWidth: { xs: 150, sm: 250, md: 220 }, maxWidth: { xs: 150, sm: 250, md: 300 }, margin: "auto" }}>
                        <CardMedia component="img" height="150" image={product.image} alt={product.name} sx={{ objectFit: "contain" }} />
                        <CardContent>
                            <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: "0.9rem", sm: "1.00rem" } }}>
                                {product.name}
                            </Typography>
                            <Typography variant="body1" color="textSecondary" sx={{ fontSize: { xs: "0.75rem", sm: "0.8rem" } }}>
                                {CURRENCY}{product.price}
                            </Typography>
                            <Button variant="contained" sx={{ mt: 1, backgroundColor: "black", color: "white", fontSize: { xs: "0.7rem", sm: "0.75rem" }, padding: { xs: "4px 8px", sm: "6px 16px" } }}>
                                Enquire Now
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default Body;
