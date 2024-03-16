import React from 'react';
import styled from 'styled-components';

const PrivacyPolicy = () => {
    return (
        <PrivacyPolicyContainer>
            <Heading1>Privacy Policy</Heading1>

            <Paragraph>
                This privacy policy outlines the information we collect and how we use
                it. Our policy is simple: we only collect information that is necessary
                to provide our services to you, and we never share it with anyone.
            </Paragraph>

            <Heading2>Information We Collect</Heading2>
            <Paragraph>We may collect the following types of information:</Paragraph>
            <UnorderedList>
                <ListItem>
                    Contact information, such as your name, email address, and phone
                    number.
                </ListItem>
                <ListItem>
                    Demographic information, such as your age, gender, and location.
                </ListItem>
                <ListItem>
                    Information about your use of our services, such as the pages you
                    visit and the actions you take.
                </ListItem>
            </UnorderedList>

            <Heading2>How We Use Your Information</Heading2>
            <Paragraph>
                We use your information to provide, improve, and personalize our
                services. This includes:
            </Paragraph>
            <UnorderedList>
                <ListItem>Communicating with you about your account and our services.</ListItem>
                <ListItem>Providing customer support and responding to your requests and inquiries.</ListItem>
                <ListItem>Conducting research and analysis to improve our services.</ListItem>
            </UnorderedList>

            <Heading2>Data Security</Heading2>
            <Paragraph>
                We take the security of your data very seriously and use appropriate
                technical and organizational measures to protect it. Despite our
                efforts, no security measures are perfect or impenetrable.
            </Paragraph>

            <Heading2>Changes to This Policy</Heading2>
            <Paragraph>
                We may update this policy from time to time to reflect changes to our
                practices or for other operational, legal, or regulatory reasons.
            </Paragraph>

            <Heading2>Contact Us</Heading2>
            <Paragraph>
                If you have any questions about this policy, please contact us at [insert
                contact information].
            </Paragraph>
        </PrivacyPolicyContainer>
    );
};

const PrivacyPolicyContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const Heading1 = styled.h1`
  color: #333;
`;

const Heading2 = styled.h2`
  color: #333;
`;

const Paragraph = styled.p`
  line-height: 1.5;
`;

const UnorderedList = styled.ul`
  list-style-type: disc;
  padding-left: 20px;
`;

const ListItem = styled.li`
  margin-bottom: 5px;
`;

export default PrivacyPolicy;
