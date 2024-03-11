import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './screens/Home';
import ContactUs from './screens/ContactUs';
import Return from './screens/Return';
import Navbar from './components/NavBar';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/return" element={<Return />} />
        {/* Other routes can be defined here */}
      </Routes>
    </Router>
  );
};

export default App;