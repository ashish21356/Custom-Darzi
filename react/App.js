import React, { useState } from 'react';
import Header from './src/components/Header';
import Footer from './src/components/Footer';
import Body from './src/components/Body';
import Home from './src/components/Home';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const App = () => {
  const [route, setRoute] = useState('/');

  return (
    <React.Fragment>
      <Header setRoute={setRoute} />
      {route === '/' && <Home setRoute={setRoute} />}
      {route === '/shop' && <Body setRoute={setRoute} />}
      <Footer />
    </React.Fragment>
  );
};

export default App;