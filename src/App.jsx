import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { ApartmentDetail } from './components/ApartmentDetail';
import { AnimatePresence } from 'framer-motion';

function ScrollToTop() {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/apartment/:id" element={<ApartmentDetail />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
