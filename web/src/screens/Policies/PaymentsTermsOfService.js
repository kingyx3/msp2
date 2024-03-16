import React from 'react';
import styled from 'styled-components';
import { envVars } from '../../envConfig';

const PaymentsTermsOfService = () => {
    return (
        <Container>
            <Title>Payments Terms of Service</Title>
            <Paragraph>
                Welcome to {envVars.REACT_APP_NAME} Payments, a service that facilitates payments between users and hosts on our platform. These Payments Terms of Service govern your use of our payment services, so please read them carefully. By using our payment services, you agree to be bound by these Payments Terms of Service.
            </Paragraph>
            <SectionTitle>1. Overview</SectionTitle>
            <Paragraph>
                {envVars.REACT_APP_NAME} Payments provides payment processing services to users and hosts on our platform. These Payments Terms of Service, along with our general Terms of Service and Privacy Policy, constitute a legally binding agreement between you and {envVars.REACT_APP_NAME} regarding your use of our payment services.
            </Paragraph>
            <SectionTitle>2. Payment Processing</SectionTitle>
            <Paragraph>
                When you make a payment on our platform, {envVars.REACT_APP_NAME} Payments processes your payment using third-party payment processors. By using our payment services, you authorize us to process your payment on your behalf.
            </Paragraph>
            <SectionTitle>3. Payment Methods</SectionTitle>
            <Paragraph>
                We accept various payment methods, including credit/debit cards, bank transfers, and third-party payment services. You agree to provide accurate and up-to-date payment information when making a payment on our platform.
            </Paragraph>
            <SectionTitle>4. Payment Authorization</SectionTitle>
            <Paragraph>
                By making a payment on our platform, you authorize {envVars.REACT_APP_NAME} Payments to charge your chosen payment method for the total amount of the transaction, including any applicable fees or taxes.
            </Paragraph>
            <SectionTitle>5. Payment Disputes</SectionTitle>
            <Paragraph>
                If you have a dispute regarding a payment made on our platform, please contact our customer support team for assistance. We will work to resolve the dispute in a timely manner.
            </Paragraph>
            <SectionTitle>6. Refunds</SectionTitle>
            <Paragraph>
                Refunds for payments made on our platform are subject to the refund policy set by the host or service provider. If you believe you are entitled to a refund, please contact the host or service provider directly.
            </Paragraph>
            <SectionTitle>7. Payment Security</SectionTitle>
            <Paragraph>
                {envVars.REACT_APP_NAME} Payments takes the security of your payment information seriously. We use industry-standard security measures to protect your payment information from unauthorized access or use.
            </Paragraph>
            <SectionTitle>8. Prohibited Activities</SectionTitle>
            <Paragraph>
                You agree not to engage in any of the following prohibited activities in connection with our payment services:
            </Paragraph>
            <ul>
                <li>Using stolen or fraudulent payment information</li>
                <li>Attempting to circumvent payment processing security measures</li>
                <li>Engaging in any illegal or fraudulent activities</li>
            </ul>
            <SectionTitle>9. Limitation of Liability</SectionTitle>
            <Paragraph>
                To the fullest extent permitted by law, {envVars.REACT_APP_NAME} shall not be liable for any direct, indirect, incidental, special, or consequential damages arising out of or in any way connected with your use of our payment services.
            </Paragraph>
            <SectionTitle>10. Indemnification</SectionTitle>
            <Paragraph>
                You agree to indemnify and hold {envVars.REACT_APP_NAME} and its officers, directors, employees, and agents harmless from any claims, liabilities, damages, losses, or expenses arising out of or in any way related to your use of our payment services or violation of these Payments Terms of Service.
            </Paragraph>
            <SectionTitle>11. Modifications to Payments Terms of Service</SectionTitle>
            <Paragraph>
                {envVars.REACT_APP_NAME} reserves the right to modify or update these Payments Terms of Service at any time, with or without prior notice. Any changes to these Payments Terms of Service will be effective immediately upon posting on our platform. Your continued use of our payment services after the posting of any revised Payments Terms of Service constitutes your acceptance of such changes.
            </Paragraph>
            <SectionTitle>12. Governing Law</SectionTitle>
            <Paragraph>
                These Payments Terms of Service shall be governed by and construed in accordance with the laws of Singapore, without regard to its conflict of law principles.
            </Paragraph>
            <SectionTitle>13. Contact Information</SectionTitle>
            <Paragraph>
                If you have any questions or concerns about these Payments Terms of Service, please contact us at <Link href={"mailto:" + process.env.REACT_APP_SUPPORT_EMAIL}>{process.env.REACT_APP_SUPPORT_EMAIL}</Link>.
            </Paragraph>
            <Paragraph>
                By using our payment services, you acknowledge that you have read, understood, and agree to be bound by these Payments Terms of Service. If you do not agree to these Payments Terms of Service, you may not use our payment services.
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

const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin-top: 20px;
  margin-bottom: 10px;
`;

const Paragraph = styled.p`
  margin-bottom: 10px;
`;

const Link = styled.a`
  color: blue;
  text-decoration: underline;
`;

export default PaymentsTermsOfService;
