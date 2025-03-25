import React, { useEffect, useState } from "react";
import { Grid2 as Grid, Card, Breadcrumbs, Typography } from "@mui/material";
import products from '../components/product.metadata.json';
import ProductCard from "./common-components/Card";
import { Link, useLocation } from "react-router-dom";

const Body = () => {
    const { search } = useLocation();
    const [localProds, setLocalProds] = useState([]);

    useEffect(() => {
        sortProductByType(products);
    }, []);

    useEffect(() => {
        let tempProducts = products;
        if (search?.split('=')?.[1]) {
            tempProducts = products.filter(prod => prod.belongs_to === search.split('=')[1]);
        }
        sortProductByType(tempProducts);
    }, [search])

    const sortProductByType = (products) => {
        let tempProducts = products.sort((p1, p2) => p2.belongs_to.localeCompare(p1.belongs_to));
        setLocalProds(tempProducts);
    }

    return (
        <Grid container direction={"column"} sx={{ padding: { xs: 1, sm: 3, md: 3 } }}>
            <Grid sx={{ paddingTop: { xs: 3, sm: 3, md: 3 } }} justifyContent="left">
                <Breadcrumbs>
                    <Typography><Link style={{ textDecoration: "none", color: "inherit" }} underline="none" color="inherit" to={'/'}>Home</Link></Typography>
                    <Typography sx={{ color: "text.primary" }}>Shop</Typography>
                    <Typography>{search?.split('=')?.[1]}</Typography>
                </Breadcrumbs>
            </Grid>
            <Grid container spacing={2} justifyContent={{ md: "center" }}>
                {localProds.map((product) => (
                    <Grid item key={product.id} xs={6} sm={6} md={2}>
                        <Card className="" sx={{ height: "100%", textAlign: "center", display: "flex", flexDirection: "column", minWidth: { xs: 180, sm: 250, md: 220 }, maxWidth: { xs: 180, sm: 250, md: 220 }, margin: "auto" }}>
                            <ProductCard key={product.id} product={product} />
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Grid>
    );
};

export default Body;
