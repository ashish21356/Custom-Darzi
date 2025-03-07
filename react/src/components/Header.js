import React, { useState } from "react";
import { AppBar, Toolbar, Typography, IconButton, Badge, Box, Drawer, List, ListItem, ListItemText } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuIcon from "@mui/icons-material/Menu";

const Header = () => {
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const navItems = ["Home", "Men", "Women", "New Arrivals", "Contact"];

    return (
        <AppBar position="static" sx={{ backgroundColor: "white", boxShadow: 1 }}>
            <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                {/* Mobile Menu Button */}
                <IconButton edge="start" sx={{ display: { xs: "block", md: "none" } }} onClick={handleDrawerToggle}>
                    <MenuIcon sx={{ color: "black" }} />
                </IconButton>
                
                {/* Logo */}
                <Typography variant="h6" sx={{ color: "black", fontWeight: "bold", flexGrow: { xs: 1, md: 0 } }}>
                    KurtaShop
                </Typography>

                {/* Navigation (Hidden on mobile) */}
                <Box sx={{ display: { xs: "none", md: "flex" }, gap: 4 }}>
                    {navItems.map((item) => (
                        <Typography
                            key={item}
                            variant="body1"
                            sx={{
                                color: "gray",
                                cursor: "pointer",
                                "&:hover": { color: "black" },
                            }}
                        >
                            {item}
                        </Typography>
                    ))}
                </Box>

                {/* Cart Icon */}
                <IconButton>
                    <Badge badgeContent={3} color="error">
                        <ShoppingCartIcon sx={{ color: "gray", "&:hover": { color: "black" } }} />
                    </Badge>
                </IconButton>
            </Toolbar>

            {/* Mobile Drawer */}
            <Drawer anchor="left" open={mobileOpen} onClose={handleDrawerToggle}>
                <Box sx={{ width: 250 }} role="presentation" onClick={handleDrawerToggle} onKeyDown={handleDrawerToggle}>
                    <List>
                        {navItems.map((item) => (
                            <ListItem button key={item}>
                                <ListItemText primary={item} sx={{ textAlign: "center" }} />
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
        </AppBar>
    );
};

export default Header;
