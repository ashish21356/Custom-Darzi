import React, { Fragment, lazy, Suspense, useState } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Grid2, Skeleton } from '@mui/material';

const Body = lazy(() => import('./components/Body'));
const Home = lazy(() => import('./components/Home'));
const ProductDetails = lazy(() => import('./components/ProductDetails'));

const ShimmerCards = () => {
  return (
    <Grid2 container spacing={2} justifyContent={{ md: "center" }} sx={{ padding: { xs: 1, sm: 4, md: 4 } }}>
      <Skeleton animation="wave" variant="rectangular" sx={{height: 400, minWidth: { xs: 180, sm: 250, md: 220 }, maxWidth: { xs: 180, sm: 250, md: 300 }}}/>
      <Skeleton animation="wave" variant="rectangular" sx={{height: 400, minWidth: { xs: 180, sm: 250, md: 220 }, maxWidth: { xs: 180, sm: 250, md: 300 }}}/>
      <Skeleton animation="wave" variant="rectangular" sx={{height: 400, minWidth: { xs: 180, sm: 250, md: 220 }, maxWidth: { xs: 180, sm: 250, md: 300 }}}/>
      <Skeleton animation="wave" variant="rectangular" sx={{height: 400, minWidth: { xs: 180, sm: 250, md: 220 }, maxWidth: { xs: 180, sm: 250, md: 300 }}}/>
      <Skeleton animation="wave" variant="rectangular" sx={{height: 400, minWidth: { xs: 180, sm: 250, md: 220 }, maxWidth: { xs: 180, sm: 250, md: 300 }}}/>
      <Skeleton animation="wave" variant="rectangular" sx={{height: 400, minWidth: { xs: 180, sm: 250, md: 220 }, maxWidth: { xs: 180, sm: 250, md: 300 }}}/>
    </Grid2>
  );
}

const App = () => {
  return (
    <React.Fragment>
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path='/' element={
            <Suspense fallback={<ShimmerCards />}>
              <Body />
              {/* <ShimmerCards /> */}
            </Suspense>
          } />
          <Route path='/shop' element={
            <Suspense fallback={<div>Loading....</div>}>
              <Body />
            </Suspense>
          } />
          <Route path='/shop/:id' element={
            <Suspense fallback={<div>Loading....</div>}>
              <ProductDetails />
            </Suspense>
          } />
        </Routes>
      </BrowserRouter>
      <Footer />
    </React.Fragment>
  );
};

export default App;