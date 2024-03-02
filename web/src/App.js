import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './screens/Home';
import ContactUs from './screens/ContactUs';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact-us" element={<ContactUs />} />
          {/* Other routes can be defined here */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;