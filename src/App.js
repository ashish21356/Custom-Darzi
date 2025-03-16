import React, { lazy, Suspense, useState } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Body = lazy(() => import('./components/Body'));
const Home = lazy(() => import('./components/Home'));
const ProductDetails = lazy(() => import('./components/ProductDetails'));

const App = () => {
  return (
    <React.Fragment>
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path='/' element={
            <Suspense fallback={<div>Loading....</div>}>
              <Body />
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