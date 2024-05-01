import React from 'react';
import styled from 'styled-components';
import { envVars } from '../../envConfig';

const PricingPolicy = () => {
    return (
        <Container>
            <Title>Pricing Policy</Title>
            <Paragraph>
                Our pricing is based on hourly rates for booking spaces. The hourly rate may vary depending on the type of space and its amenities.
            </Paragraph>

            <SubTitle>Types of fees</SubTitle>
            <Paragraph>
                Platform fee: This helps ensure everything at {envVars.REACT_APP_NAME} run smoothly.
            </Paragraph>
            <Paragraph>
                Cleaning fee: Charged by some Hosts to cover the cost of cleaning their space after the booking.
            </Paragraph>
            <Paragraph>
                Pet fee: Some Hosts allow pets in their listings for an additional charge which may be separate from cleaning fees.
            </Paragraph>
            <Paragraph>
                Value Added Tax (VAT, JCT and GST): Charged to guests who live in certain countries.
            </Paragraph>
            <Paragraph>
                Local taxes: Charged based on the location of the Host's space.
            </Paragraph>
        </Container>
    );
};

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

const Link = styled.a`
  text-decoration: underline;
  color: #007bff;
  cursor: pointer;
`;

export default PricingPolicy;
