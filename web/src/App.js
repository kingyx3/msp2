import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './screens/Home';
import ContactUs from './screens/ContactUs';
import Return from './screens/Return';
import Navbar from './components/NavBar';
import PrivacyPolicy from './screens/PrivacyPolicy';
import TermsOfService from './screens/TermsOfService';
import PaymentsTermsOfService from './screens/PaymentsTermsOfService';
import NonDiscriminationPolicy from './screens/NonDiscriminationPolicy';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/return" element={<Return />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/payments-terms-of-service" element={<PaymentsTermsOfService />} />
        <Route path="/non-discrimination-policy" element={<NonDiscriminationPolicy />} />
        {/* Other routes can be defined here */}
      </Routes>
    </Router>
  );
};

export default App;