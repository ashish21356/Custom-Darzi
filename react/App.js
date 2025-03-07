import React from 'react';
import Header from './src/components/Header';
import Footer from './src/components/Footer';
import Body from './src/components/Body';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './src/components/Home';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const App = () => {
  return (
    <React.Fragment>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Body />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </React.Fragment>
  );
};

export default App;