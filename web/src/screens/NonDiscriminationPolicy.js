import React from 'react';
import styled from 'styled-components';

const NonDiscriminationPolicy = () => {
    return (
        <Container>
            <Title>Nondiscrimination Policy</Title>
            <Paragraph>
                {process.env.REACT_APP_NAME} is committed to providing a welcoming and inclusive environment for all users of our platform. We do not tolerate discrimination of any kind, including but not limited to discrimination based on race, ethnicity, color, national origin, religion, age, sex, sexual orientation, gender identity, marital status, disability, or any other protected characteristic.
            </Paragraph>
            <Paragraph>
                All users, hosts, and service providers on our platform are expected to adhere to this Nondiscrimination Policy in all interactions and transactions. Discriminatory behavior will not be tolerated and may result in the suspension or termination of your account.
            </Paragraph>
            <Paragraph>
                If you believe you have been subjected to discrimination on our platform, please contact our customer support team immediately. We take all reports of discrimination seriously and will investigate them thoroughly.
            </Paragraph>
            <Paragraph>
                By using our platform, you acknowledge that you have read, understood, and agree to abide by our Nondiscrimination Policy. If you do not agree to this policy, you may not use our platform.
            </Paragraph>
            <Paragraph>
                If you have any questions or concerns about our Nondiscrimination Policy, please contact us at <Link href={"mailto:" + process.env.REACT_APP_SUPPORT_EMAIL}>{process.env.REACT_APP_SUPPORT_EMAIL}</Link>.
            </Paragraph>
        </Container>
    );
};

const Container = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Paragraph = styled.p`
  margin-bottom: 10px;
`;

const Link = styled.a`
  color: blue;
  text-decoration: underline;
`;

export default NonDiscriminationPolicy;
