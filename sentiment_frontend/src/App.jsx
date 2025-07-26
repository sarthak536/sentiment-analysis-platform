import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import ProductsPage from './pages/ProductsPage';
import Product from './pages/Product';

const ScrollToSection = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return null;
};

const HomePage = () => (
  <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50">
    <Navbar />
    <ScrollToSection />
    <Home />
    <About />
    <Contact />
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={
          <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50">
            <Navbar />
            <main className="py-8 px-4 md:px-16">
              <ProductsPage />
            </main>
          </div>
        } />
        <Route path="/product/:productType" element={
          <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50">
            <Navbar />
            <main className="py-8 px-4 md:px-16">
              <Product />
            </main>
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;