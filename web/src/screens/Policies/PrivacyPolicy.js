import React from 'react';
import styled from 'styled-components';
import { envVars } from '../../envConfig';

const PrivacyPolicyScreen = () => {
    return (
        <Container>
            <Title>Privacy Policy</Title>
            <Paragraph>
                This Privacy Policy describes how {envVars.REACT_APP_NAME} collects, uses, and shares your personal information when you use our platform. By using our platform, you agree to the collection and use of your information in accordance with this Privacy Policy.
            </Paragraph>
            <Paragraph>
                **1. Information Collection**
                We collect personal information that you provide to us when you register an account, use our platform, or communicate with us. This may include your name, email address, contact information, and any other information you choose to provide.
            </Paragraph>
            <Paragraph>
                **2. Information Use**
                We may use your personal information to provide and improve our platform, communicate with you, process transactions, and enforce our policies. We may also use your information for marketing purposes, such as sending you promotional emails or newsletters. You can opt out of receiving marketing communications at any time.
            </Paragraph>
            <Paragraph>
                **3. Information Sharing**
                We may share your personal information with third-party service providers that assist us in providing our platform or performing other business functions. We may also share your information in response to legal requests or to protect our rights or property.
            </Paragraph>
            <Paragraph>
                **4. Data Security**
                We take the security of your personal information seriously and use industry-standard security measures to protect it from unauthorized access or use.
            </Paragraph>
            <Paragraph>
                **5. Data Retention**
                We will retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.
            </Paragraph>
            <Paragraph>
                **6. Your Choices**
                You can update or delete your account information at any time by logging into your account settings. You can also opt out of receiving marketing communications by following the instructions in the emails we send you.
            </Paragraph>
            <Paragraph>
                **7. Children's Privacy**
                Our platform is not intended for children under the age of 18, and we do not knowingly collect personal information from children under the age of 18. If you believe we have collected personal information from a child under the age of 18, please contact us immediately.
            </Paragraph>
            <Paragraph>
                **8. Changes to this Privacy Policy**
                We may update this Privacy Policy from time to time, and any changes will be posted on our platform. Your continued use of our platform after the posting of any revised Privacy Policy constitutes your acceptance of such changes.
            </Paragraph>
            <Paragraph>
                **9. Contact Information**
                If you have any questions or concerns about this Privacy Policy, please contact us at <Link href={"mailto:" + process.env.REACT_APP_SUPPORT_EMAIL}>{process.env.REACT_APP_SUPPORT_EMAIL}</Link>.
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

export default PrivacyPolicyScreen;
