import React from 'react';
import styled from 'styled-components';
import { envVars } from '../../envConfig';

const HostingFees = () => {
  return (
    <Container>
      <Title>Hosting Fees</Title>
      <Paragraph>
        Our hosting fees is designed to cover the platform's operational costs, including services like payment processing, customer support, and marketing.
        This helps ensure everything at {envVars.REACT_APP_NAME} run smoothly.
      </Paragraph>

      <SubTitle>Types of fees</SubTitle>
      <Paragraph>
        Platform fee: It typically ranges between 8-15% of the booking subtotal, with a minimum of SGD 1.50 per booking.
      </Paragraph>
    </Container>
  );
};

// Booking Subtotal     Host Fee Rate         Gross Host Fee
// First SGD 10         15%                   SGD 1.50 (Fixed)
// Next SGD 40          12%                   SGD 4.80 (Booking subtotal up to SGD 50)
// Next SGD 50          10%                   SGD 5.00 (Booking subtotal up to SGD 100)
// Beyond SGD 100       8%

// Styled components
const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

const SubTitle = styled.h2`
  font-size: 20px;
  margin-top: 20px;
  margin-bottom: 10px;
`;

const Paragraph = styled.p`
  margin-bottom: 15px;
`;

// const Link = styled.a`
//   text-decoration: underline;
//   color: #007bff;
//   cursor: pointer;
// `;

export default HostingFees;
