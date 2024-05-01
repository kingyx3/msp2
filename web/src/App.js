import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './screens/Home';
import ContactUs from './screens/ContactUs';
import Return from './screens/Return';
import Navbar from './components/NavBar';
import Policy from './screens/Policies/Policy';
import PrivacyPolicy from './screens/Policies/PrivacyPolicy';
import TermsOfService from './screens/Policies/TermsOfService';
import PaymentsTermsOfService from './screens/Policies/PaymentsTermsOfService';
import NonDiscriminationPolicy from './screens/Policies/NonDiscriminationPolicy';
import CancellationPolicy from './screens/Policies/CancellationPolicy';
import HostCancellationPolicy from './screens/Policies/HostCancellationPolicy';
import HostingRules from './screens/Policies/HostingRules';
import PricingPolicy from './screens/Policies/PricingPolicy';
import HostingFees from './screens/Policies/HostingFees';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/return" element={<Return />} />
        <Route path="/policies" element={<Policy />} />
        <Route path="/pricing-policy" element={<PricingPolicy />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/payments-terms-of-service" element={<PaymentsTermsOfService />} />
        <Route path="/non-discrimination-policy" element={<NonDiscriminationPolicy />} />
        <Route path="/cancellation-policy" element={<CancellationPolicy />} />
        <Route path="/host-cancellation-policy" element={<HostCancellationPolicy />} />
        <Route path="/hosting-rules" element={<HostingRules />} />
        <Route path="/hosting-fees" element={<HostingFees />} />
        {/* Other routes can be defined here */}
      </Routes>
    </Router>
  );
};

export default App;
