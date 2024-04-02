import React from 'react';
import styled from 'styled-components';

const Policy = () => {
    return (
        <Container>
            <Title>Policies</Title>
            <PolicyList>
                <PolicyItem>
                    <PolicyLink href="/privacy-policy" target="_blank">Privacy Policy</PolicyLink>
                </PolicyItem>
                <PolicyItem>
                    <PolicyLink href="/terms-of-service" target="_blank">Terms of Service</PolicyLink>
                </PolicyItem>
                <PolicyItem>
                    <PolicyLink href="/payments-terms-of-service" target="_blank">Terms of Service</PolicyLink>
                </PolicyItem>
                <PolicyItem>
                    <PolicyLink href="/cancellation-policy" target="_blank">Cancellation Policy</PolicyLink>
                </PolicyItem>
                <PolicyItem>
                    <PolicyLink href="/host-cancellation-policy" target="_blank">Cancellation Policy</PolicyLink>
                </PolicyItem>
                <PolicyItem>
                    <PolicyLink href="/non-discrimination-policy" target="_blank">Cancellation Policy</PolicyLink>
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
