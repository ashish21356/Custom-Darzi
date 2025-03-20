import React from "react";
import { Grid2 as Grid, Card, CardMedia, CardContent, Typography, Button } from "@mui/material";
import products from '../components/product.metadata.json';
import ProductCard from "./common-components/Card";


const Body = () => {
    return (
       

        <Grid container spacing={2} justifyContent={{ md: "center" }} sx={{ padding: { xs: 1, sm: 3 } }}>
           <Grid item xs={12}>
        <h1 className="text-4xl font-bold text-center text-blue-600">Our New Products</h1>
           </Grid>
            {products.map((product) => (
                <Grid item key={product.id} xs={6} sm={6} md={2}>
                    <Card className="body-card" sx={{ height: "100%", textAlign: "center", display: "flex", flexDirection: "column", boxShadow: 3, minWidth: { xs: 180, sm: 250, md: 220 }, maxWidth: { xs: 180, sm: 250, md: 300 }, margin: "auto" }}>
                        <ProductCard key={product.id} product={product} />
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default Body;
