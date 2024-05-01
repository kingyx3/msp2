import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Policy = () => {
    return (
        <Container>
            <Title>Policies</Title>
            <PolicyList>
                <PolicyItem>
                    <PolicyLink><Link to="/privacy-policy" style={styles.link}>Privacy Policy</Link></PolicyLink>
                </PolicyItem>
                <PolicyItem>
                    <Link to="/terms-of-service" style={styles.link}>Terms of Service</Link>
                </PolicyItem>
                <PolicyItem>
                    <PolicyLink href="/payments-terms-of-service" target="_blank">Payments Terms of Service</PolicyLink>
                </PolicyItem>
                <PolicyItem>
                    <PolicyLink href="/pricing-policy" target="_blank">Pricing Policy</PolicyLink>
                </PolicyItem>
                <PolicyItem>
                    <PolicyLink href="/cancellation-policy" target="_blank">Cancellation Policy</PolicyLink>
                </PolicyItem>
                <PolicyItem>
                    <PolicyLink href="/hosting-rules" target="_blank">Hosting Rules</PolicyLink>
                </PolicyItem>
                <PolicyItem>
                    <PolicyLink href="/hosting-fees" target="_blank">Hosting Fees</PolicyLink>
                </PolicyItem>
                <PolicyItem>
                    <PolicyLink href="/host-cancellation-policy" target="_blank">Host Cancellation Policy</PolicyLink>
                </PolicyItem>
                <PolicyItem>
                    <PolicyLink href="/non-discrimination-policy" target="_blank">Non-Discrimination Policy</PolicyLink>
                </PolicyItem>
            </PolicyList>
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

const PolicyList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const PolicyItem = styled.li`
  margin-bottom: 10px;
`;

const PolicyLink = styled.a`
  text-decoration: underline;
  color: #007bff;
  cursor: pointer;
`;



export default Policy;
