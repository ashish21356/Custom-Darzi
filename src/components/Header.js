import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Box, Drawer, List, ListItem, ListItemText } from "@mui/material";
// import logo from '../assets/Shiirt-wala_logo.png';
import { useNavigate } from "react-router-dom";

const Header = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const navigate = useNavigate();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const navItems = [
        // "Home", "Men", "Women", "New Arrivals", "Contact"
    ];

    return (
        <AppBar position="fixed" sx={{ backgroundColor: "white", boxShadow: 1, minHeight: 2 }}>
            <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                {/* Mobile Menu Button
                <IconButton edge="start" sx={{ display: { xs: "block", md: "none" } }} onClick={handleDrawerToggle}>
                    <MenuIcon sx={{ color: "black" }} />
                </IconButton> */}
                
                {/* Logo */}
                <Box width={100} height={100}>
                    <img onClick={() => navigate('/')} src={'https://s6.imgcdn.dev/YjM48D.png'} alt="Logo" style={{ width: '100%', height: '100%' }} />
                    {/* <Typography onClick={() => navigate('/')} variant="h6" sx={{ color: "black", fontWeight: "bold", flexGrow: { xs: 1, md: 0 } }}>
                        Kurta-wala
                    </Typography> */}
                </Box>

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
                {/* <IconButton>
                    <Badge badgeContent={3} color="error">
                        <ShoppingCartIcon sx={{ color: "gray", "&:hover": { color: "black" } }} />
                    </Badge>
                </IconButton> */}
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
