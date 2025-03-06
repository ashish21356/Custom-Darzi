import React from "react";
import { Grid, Card, CardMedia, CardContent, Typography, Button } from "@mui/material";
import {products} from '../components/product.metadata.json'

// const products = [
//     { id: 1, name: "Kurta 1", price: "$49", image: "https://via.placeholder.com/150" },
//     { id: 2, name: "Kurta 2", price: "$59", image: "https://via.placeholder.com/150" },
//     { id: 3, name: "Kurta 3", price: "$69", image: "https://via.placeholder.com/150" },
//     { id: 4, name: "Kurta 4", price: "$79", image: "https://via.placeholder.com/150" },
    
// ];

const Body = () => {
    return (
        <Grid container spacing={3} sx={{ padding: 3 }}>
            {products.map((product) => (
                <Grid item key={product.id} xs={12} sm={6} md={3}>
                    <Card sx={{ maxWidth: 300, textAlign: "center", boxShadow: 3 }}>
                        <CardMedia component="img" height="200" image={product.image} alt={product.name} />
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                {product.name}
                            </Typography>
                            <Typography variant="body1" color="textSecondary">
                                {product.price}
                            </Typography>
                            <Button variant="contained" sx={{ mt: 2, backgroundColor: "black", color: "white" }}>
                                Add to Cart
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default Body;