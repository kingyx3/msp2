import React from 'react';
import styled from 'styled-components';
import { envVars } from '../../envConfig';

const PrivacyPolicyScreen = () => {
    return (
        <PrivacyPolicyContainer>
            <Title>Privacy Policy</Title>
            <Paragraph>
                At {envVars.REACT_APP_NAME}, we understand the importance of privacy and are committed to protecting the personal information of our users. This Privacy Policy outlines how we collect, use, disclose, and protect your information when you use our platform to connect hosts and users looking to rent spaces on an hourly basis. By accessing or using our website and services, you agree to the terms of this Privacy Policy.
            </Paragraph>

            <SectionTitle>1. Information We Collect:</SectionTitle>
            <Paragraph>
                a. <strong>Personal Information:</strong> When you create an account or use our platform, we may collect personal information such as your name, email address, phone number, billing address, and payment information.
            </Paragraph>
            <Paragraph>
                b. <strong>Listing Information:</strong> Hosts may provide information about their spaces, including photos, descriptions, availability, and pricing.
            </Paragraph>
            <Paragraph>
                c. <strong>Usage Data:</strong> We collect information about how you interact with our platform, such as your browsing history, search queries, IP address, device information, and cookies.
            </Paragraph>

            <SectionTitle>2. How We Use Your Information:</SectionTitle>
            <Paragraph>
                a. <strong>To Provide Services:</strong> We use your personal information to facilitate bookings, communicate with you, process payments, and provide customer support.
            </Paragraph>
            <Paragraph>
                b. <strong>Improvement of Services:</strong> We analyze usage data to improve our platform, develop new features, and enhance user experience.
            </Paragraph>
            <Paragraph>
                c. <strong>Marketing and Promotions:</strong> With your consent, we may use your information to send you promotional emails, newsletters, or offers about our services or third-party products.
            </Paragraph>

            <SectionTitle>3. Information Sharing:</SectionTitle>
            <Paragraph>
                a. <strong>With Hosts and Users:</strong> We share necessary information between hosts and users to facilitate bookings and communication.
            </Paragraph>
            <Paragraph>
                b. <strong>Service Providers:</strong> We may share your information with third-party service providers who assist us in operating our platform, processing payments, or providing customer support.
            </Paragraph>
            <Paragraph>
                c. <strong>Legal Compliance:</strong> We may disclose your information to comply with legal obligations, enforce our policies, respond to legal requests, or protect our rights or the rights of others.
            </Paragraph>

            <SectionTitle>4. Data Security:</SectionTitle>
            <Paragraph>
                We take appropriate measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. These measures include encryption, access controls, and regular security assessments.
            </Paragraph>

            <SectionTitle>5. Your Choices:</SectionTitle>
            <Paragraph>
                a. <strong>Account Information:</strong> You can review, update, or delete your account information at any time by accessing your account settings.
            </Paragraph>
            <Paragraph>
                b. <strong>Marketing Communications:</strong> You can opt out of receiving promotional emails by following the unsubscribe instructions included in each email.
            </Paragraph>

            <SectionTitle>6. Children's Privacy:</SectionTitle>
            <Paragraph>
                Our platform is not intended for use by children under the age of 18. We do not knowingly collect personal information from children, and if we become aware that we have collected such information, we will take steps to delete it.
            </Paragraph>

            <SectionTitle>7. Changes to This Policy:</SectionTitle>
            <Paragraph>
                We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any material changes by posting the updated policy on our website or by other means.
            </Paragraph>

            <SectionTitle>8. Contact Us:</SectionTitle>
            <Paragraph>
                If you have any questions, concerns, or feedback about this Privacy Policy or our practices, please contact us at <Link href={"mailto:" + process.env.REACT_APP_SUPPORT_EMAIL}>{process.env.REACT_APP_SUPPORT_EMAIL}</Link>.
            </Paragraph>
        </PrivacyPolicyContainer>
    );
};

const PrivacyPolicyContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const Title = styled.h2`
  color: #333;
  font-size: 24px;
  margin-bottom: 20px;
`;

const SectionTitle = styled.h3`
  color: #555;
  font-size: 20px;
  margin-top: 30px;
  margin-bottom: 10px;
`;

const Paragraph = styled.p`
  color: #666;
  font-size: 16px;
  margin-bottom: 15px;

  strong {
    font-weight: bold;
  }
`;

const Link = styled.a`
  color: blue;
  text-decoration: underline;
`;

export default PrivacyPolicyScreen;